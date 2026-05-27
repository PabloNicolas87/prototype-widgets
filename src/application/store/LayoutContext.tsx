import { createContext, useContext, useReducer, useEffect, useRef, type Dispatch } from 'react';
import type { ReactNode } from 'react';
import { getUserLayout } from '../useCases/getUserLayout';
import { saveUserLayout } from '../useCases/saveUserLayout';
import { getDefaultDashboard, getDashboardConfig } from '../../infrastructure/config/dashboardConfigs';
import type { LayoutItem } from '../../domain/entities';

type DashboardLayout = {
  activeWidgets: string[];
  layouts: Record<string, LayoutItem[]>;
};

type LayoutState = {
  currentDashboardId: string;
  dashboards: Record<string, DashboardLayout>;
  userId: string | null;
};

type LayoutAction =
  | { type: 'SET_USER_ID'; payload: string | null }
  | { type: 'SET_CURRENT_DASHBOARD'; payload: string }
  | { type: 'SET_DASHBOARD_LAYOUTS'; payload: { dashboardId: string; activeWidgets: string[]; layouts: Record<string, LayoutItem[]> } }
  | { type: 'SET_LAYOUT'; payload: { breakpoint: string; layout: LayoutItem[] } }
  | { type: 'ADD_WIDGET'; payload: string }
  | { type: 'REMOVE_WIDGET'; payload: string }
  | { type: 'CLEAR_DASHBOARDS' };

const defaultDashboard = getDefaultDashboard();

const initialState: LayoutState = {
  currentDashboardId: defaultDashboard.id,
  dashboards: {
    [defaultDashboard.id]: {
      activeWidgets: defaultDashboard.defaultWidgets,
      layouts: defaultDashboard.defaultLayouts,
    },
  },
  userId: null,
};

/**
 * Valida que un layout tenga la estructura correcta
 */
function validateLayout(layout: any): boolean {
  if (!layout || typeof layout !== 'object') return false;
  if (!Array.isArray(layout.activeWidgets)) return false;
  if (typeof layout.layouts !== 'object') return false;
  
  // Validar cada breakpoint
  for (const [, items] of Object.entries(layout.layouts)) {
    if (!Array.isArray(items)) return false;
    for (const item of items) {
      if (!item.i || typeof item.x !== 'number' || typeof item.y !== 'number' ||
          typeof item.w !== 'number' || typeof item.h !== 'number') {
        return false;
      }
    }
  }
  
  return true;
}

function layoutReducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case 'SET_USER_ID':
      return {
        ...state,
        userId: action.payload,
      };
    
    case 'CLEAR_DASHBOARDS':
      return {
        ...state,
        dashboards: {},
      };
    
    case 'SET_CURRENT_DASHBOARD':
      return {
        ...state,
        currentDashboardId: action.payload,
      };
    
    case 'SET_DASHBOARD_LAYOUTS': {
      const { dashboardId, activeWidgets, layouts } = action.payload;
      return {
        ...state,
        dashboards: {
          ...state.dashboards,
          [dashboardId]: {
            activeWidgets,
            layouts,
          },
        },
      };
    }
    
    case 'SET_LAYOUT': {
      const { breakpoint, layout } = action.payload;
      const currentDashboard = state.dashboards[state.currentDashboardId];
      
      return {
        ...state,
        dashboards: {
          ...state.dashboards,
          [state.currentDashboardId]: {
            ...currentDashboard,
            layouts: {
              ...currentDashboard.layouts,
              [breakpoint]: layout,
            },
          },
        },
      };
    }
    
    case 'ADD_WIDGET': {
      const widgetId = action.payload;
      const currentDashboard = state.dashboards[state.currentDashboardId];
      
      // Si el dashboard no existe, no hacer nada
      if (!currentDashboard) {
        return state;
      }
      
      if (currentDashboard.activeWidgets.includes(widgetId)) {
        return state;
      }
      
      const newActiveWidgets = [...currentDashboard.activeWidgets, widgetId];
      const newLayouts: Record<string, LayoutItem[]> = {};
      
      Object.entries(currentDashboard.layouts).forEach(([breakpoint, layout]) => {
        let newLayout = [...layout];
        
        // Calcular posición para el nuevo widget
        const maxY = Math.max(...newLayout.map(item => item.y + item.h), 0);
        newLayout.push({ i: widgetId, x: 0, y: maxY, w: 3, h: 2 });
        
        newLayouts[breakpoint] = newLayout;
      });
      
      return {
        ...state,
        dashboards: {
          ...state.dashboards,
          [state.currentDashboardId]: {
            activeWidgets: newActiveWidgets,
            layouts: newLayouts,
          },
        },
      };
    }
    
    case 'REMOVE_WIDGET': {
      const widgetId = action.payload;
      const currentDashboard = state.dashboards[state.currentDashboardId];
      
      // Si el dashboard no existe, no hacer nada
      if (!currentDashboard) {
        return state;
      }
      
      const newActiveWidgets = currentDashboard.activeWidgets.filter(id => id !== widgetId);
      const newLayouts: Record<string, LayoutItem[]> = {};
      
      Object.entries(currentDashboard.layouts).forEach(([breakpoint, layout]) => {
        newLayouts[breakpoint] = layout.filter(item => item.i !== widgetId);
      });
      
      return {
        ...state,
        dashboards: {
          ...state.dashboards,
          [state.currentDashboardId]: {
            activeWidgets: newActiveWidgets,
            layouts: newLayouts,
          },
        },
      };
    }
    
    default:
      return state;
  }
}

const LayoutContext = createContext<{
  state: LayoutState;
  dispatch: Dispatch<LayoutAction>;
} | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(layoutReducer, initialState);
  
  // Ref para el timeout de debounce
  const saveTimeoutRef = useRef<number | null>(null);

  // Limpiar dashboards cuando cambia el usuario
  useEffect(() => {
    if (state.userId) {
      // Limpiar todos los dashboards anteriores
      dispatch({ type: 'CLEAR_DASHBOARDS' });
      
      // Cargar el dashboard actual del usuario
      const userLayout = getUserLayout(state.userId, state.currentDashboardId);
      dispatch({
        type: 'SET_DASHBOARD_LAYOUTS',
        payload: {
          dashboardId: state.currentDashboardId,
          activeWidgets: userLayout.activeWidgets,
          layouts: userLayout.layouts,
        },
      });
    }
  }, [state.userId]);

  // Cargar layout del dashboard cuando cambia el dashboardId (solo si no existe)
  useEffect(() => {
    const dashboardExists = state.dashboards[state.currentDashboardId];
    
    if (!dashboardExists) {
      let activeWidgets: string[];
      let layouts: Record<string, LayoutItem[]>;
      
      if (state.userId) {
        const userLayout = getUserLayout(state.userId, state.currentDashboardId);
        activeWidgets = userLayout.activeWidgets;
        layouts = userLayout.layouts;
      } else {
        const dashboardConfig = getDashboardConfig(state.currentDashboardId);
        if (dashboardConfig) {
          activeWidgets = dashboardConfig.defaultWidgets;
          layouts = dashboardConfig.defaultLayouts;
        } else {
          activeWidgets = [];
          layouts = {};
        }
      }
      
      dispatch({
        type: 'SET_DASHBOARD_LAYOUTS',
        payload: {
          dashboardId: state.currentDashboardId,
          activeWidgets,
          layouts,
        },
      });
    }
  }, [state.currentDashboardId, state.userId, state.dashboards]);

  // Guardar layout cuando cambia con debounce (1 segundo)
  useEffect(() => {
    // Limpiar timeout anterior
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Configurar nuevo timeout
    saveTimeoutRef.current = setTimeout(() => {
      if (state.userId) {
        const currentDashboard = state.dashboards[state.currentDashboardId];
        
        // Solo guardar si el dashboard existe y es válido
        if (currentDashboard && validateLayout(currentDashboard)) {
          try {
            saveUserLayout(
              state.userId,
              state.currentDashboardId,
              currentDashboard.activeWidgets,
              currentDashboard.layouts
            );
          } catch (error) {
            console.error('Error al guardar layout:', error);
          }
        }
      }
    }, 1000); // 1 segundo de debounce
    
    // Cleanup
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state.userId, state.currentDashboardId, state.dashboards]);

  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}