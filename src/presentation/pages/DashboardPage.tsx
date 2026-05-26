import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import toast from 'react-hot-toast';
import { widgetCatalog } from '../../infrastructure/mock/mock';
import { useLayout, useAuth } from '../../application/store/index';
import { getWidgetData } from '../../application/useCases/getWidgetData';
import { getDashboardConfig } from '../../infrastructure/config/dashboardConfigs';
import { WidgetRegistry } from '../components/WidgetRegistry';
import { WidgetPicker } from '../components/WidgetPicker';
import type { LayoutItem, WidgetCatalogItem } from '../../domain/entities';

// Componente wrapper para WidthProvider + Responsive
const ResponsiveGridLayout = WidthProvider(Responsive);

type ButtonState = 'customize' | 'cancel' | 'save';

export function DashboardPage() {
  const { state: layoutState, dispatch: layoutDispatch } = useLayout();
  const { state: authState, dispatch: authDispatch } = useAuth();
  
  // Obtener el dashboard actual
  const currentDashboard = layoutState.dashboards[layoutState.currentDashboardId] || {
    activeWidgets: [],
    layouts: {},
  };
  
  const dashboardConfig = getDashboardConfig(layoutState.currentDashboardId);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg');
  
  // Guardar el estado original al entrar en modo edición
  const [originalLayouts, setOriginalLayouts] = useState<Record<string, LayoutItem[]>>({});
  const [originalActiveWidgets, setOriginalActiveWidgets] = useState<string[]>([]);

  // Detectar cambios de resolución y mostrar toast cuando no es desktop
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newBreakpoint = 'lg';
      
      if (width < 480) newBreakpoint = 'xxs';
      else if (width < 768) newBreakpoint = 'xs';
      else if (width < 996) newBreakpoint = 'sm';
      else if (width < 1200) newBreakpoint = 'md';
      else newBreakpoint = 'lg';
      
      if (newBreakpoint !== currentBreakpoint) {
        setCurrentBreakpoint(newBreakpoint);
        
        // Mostrar toast cuando cambiamos a una resolución que no es desktop
        if (newBreakpoint !== 'lg') {
          const breakpointNames: Record<string, string> = {
            md: 'Tablet',
            sm: 'Mobile Grande',
            xs: 'Mobile',
            xxs: 'Mobile Pequeno',
          };
          
          toast(
            `Você está visualizando em ${breakpointNames[newBreakpoint] || newBreakpoint}. Cada resolução salva seu próprio layout com posições e tamanhos específicos.`,
            {
              duration: 6000,
              icon: 'ℹ️',
            }
          );
        }
      }
    };

    // Detectar breakpoint inicial
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentBreakpoint]);

  // Usar refs para evitar recrear la función cuando layouts cambia
  const layoutsRef = useRef(currentDashboard.layouts);
  layoutsRef.current = currentDashboard.layouts;
  
  const originalLayoutsRef = useRef<Record<string, LayoutItem[]>>({});
  originalLayoutsRef.current = originalLayouts;

  const handleLayoutChange = useCallback((_layout: unknown, layouts: unknown) => {
    // Solo procesar cambios si estamos en modo edición Y el usuario está arrastrando/redimensionando
    // Esto evita guardar cambios automáticos de breakpoint
    if (!isEditMode || !isDraggingOrResizing) return;
    
    const layoutsObj = layouts as Record<string, LayoutItem[]>;
    
    // Guardar el layout de cada breakpoint
    Object.entries(layoutsObj).forEach(([breakpoint, layout]) => {
      const newLayout: LayoutItem[] = layout.map(item => ({
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      }));
      
      layoutDispatch({
        type: 'SET_LAYOUT',
        payload: { breakpoint, layout: newLayout },
      });
    });
    
    // Marcar que hubo cambios
    setHasChanges(true);
  }, [isEditMode, isDraggingOrResizing, layoutDispatch]);

  const handleLogout = useCallback(() => {
    authDispatch({ type: 'LOGOUT' });
  }, [authDispatch]);

  const handleToggleEditMode = useCallback(() => {
    if (!isEditMode) {
      // Entrar en modo edición - guardar estado original
      setOriginalLayouts({ ...currentDashboard.layouts });
      setOriginalActiveWidgets([...currentDashboard.activeWidgets]);
      setHasChanges(false);
      setIsEditMode(true);
    } else if (hasChanges) {
      // Hay cambios, mostrar modal de confirmación
      setIsSaveModalOpen(true);
    } else {
      // No hay cambios, simplemente cancelar
      setIsEditMode(false);
    }
  }, [isEditMode, hasChanges, currentDashboard.layouts, currentDashboard.activeWidgets]);

  const handleConfirmSave = useCallback(() => {
    // Confirmar guardar cambios
    setIsEditMode(false);
    setIsSaveModalOpen(false);
  }, []);

  const handleCancelSave = useCallback(() => {
    // Cancelar y restaurar estado original
    Object.entries(originalLayouts).forEach(([breakpoint, layout]) => {
      layoutDispatch({
        type: 'SET_LAYOUT',
        payload: { breakpoint, layout },
      });
    });
    
    // Restaurar widgets activos
    originalActiveWidgets.forEach(widgetId => {
      if (!currentDashboard.activeWidgets.includes(widgetId)) {
        layoutDispatch({ type: 'ADD_WIDGET', payload: widgetId });
      }
    });
    
    currentDashboard.activeWidgets.forEach(widgetId => {
      if (!originalActiveWidgets.includes(widgetId)) {
        layoutDispatch({ type: 'REMOVE_WIDGET', payload: widgetId });
      }
    });
    
    setIsEditMode(false);
    setIsSaveModalOpen(false);
  }, [originalActiveWidgets, originalLayouts, currentDashboard.activeWidgets, layoutDispatch]);

  const handleRemoveWidget = useCallback((widgetId: string) => {
    layoutDispatch({ type: 'REMOVE_WIDGET', payload: widgetId });
    setHasChanges(true);
  }, [layoutDispatch]);

  const handleAddWidget = useCallback((widgetId: string) => {
    layoutDispatch({ type: 'ADD_WIDGET', payload: widgetId });
    setHasChanges(true);
    setIsPickerOpen(false);
  }, [layoutDispatch]);

  // Filtrar widgets disponibles para el dashboard actual
  const activeCatalog = widgetCatalog.filter(w => currentDashboard.activeWidgets.includes(w.id));
  const availableWidgets = widgetCatalog.filter(w => !currentDashboard.activeWidgets.includes(w.id));

  // Memoizar layouts para evitar ciclos infinitos de renderizado
  const memoizedLayouts = useMemo(() => currentDashboard.layouts, [currentDashboard.layouts]);

  // Determinar el estado del botón
  const buttonState: ButtonState = isEditMode 
    ? (hasChanges ? 'save' : 'cancel')
    : 'customize';

  return (
    <div className={`min-h-screen bg-gray-50 transition-all duration-300 ${isEditMode ? 'bg-gray-100' : ''}`}>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{dashboardConfig?.name || 'Dashboard'}</h1>
            <p className="text-sm text-gray-500">{dashboardConfig?.description || 'Bem-vindo'}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleToggleEditMode}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                buttonState === 'customize'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : buttonState === 'cancel'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {buttonState === 'customize' && 'Personalizar'}
              {buttonState === 'cancel' && 'Cancelar Edição'}
              {buttonState === 'save' && 'Salvar Edição'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResponsiveGridLayout
          className="layout"
          layouts={memoizedLayouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={60}
          verticalCompact={true}
          compactType="vertical"
          margin={[10, 10]}
          containerPadding={[10, 10]}
          onLayoutChange={handleLayoutChange}
          onDragStart={() => setIsDraggingOrResizing(true)}
          onDragStop={() => setIsDraggingOrResizing(false)}
          onResizeStart={() => setIsDraggingOrResizing(true)}
          onResizeStop={() => setIsDraggingOrResizing(false)}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          useCSSTransforms={!isEditMode}
        >
          {activeCatalog.map((widget) => {
            const WidgetComponent = WidgetRegistry[widget.type as keyof typeof WidgetRegistry];
            const data = getWidgetData(widget.id);
            const layoutItem = currentDashboard.layouts.lg?.find((l: LayoutItem) => l.i === widget.id);
            const size = layoutItem ? { w: layoutItem.w, h: layoutItem.h } : { w: 3, h: 2 };

            return (
              <div 
                key={widget.id} 
                className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${
                  isEditMode ? 'widget-edit-mode' : ''
                }`}
              >
                {isEditMode && (
                  <button
                    onClick={() => handleRemoveWidget(widget.id)}
                    className="absolute top-2 right-2 z-10 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                    title="Remover widget"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <WidgetComponent
                  data={data}
                  title={widget.name}
                  size={size}
                />
              </div>
            );
          })}
          
          {isEditMode && (
            <div 
              key="add-widget"
              className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 hover:border-blue-400 transition-all duration-300 min-h-[120px]"
              onClick={() => setIsPickerOpen(true)}
            >
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-blue-600 font-medium text-sm">Adicionar Widget</p>
            </div>
          )}
        </ResponsiveGridLayout>
      </main>

      <WidgetPicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        availableWidgets={availableWidgets as WidgetCatalogItem[]}
        onAddWidget={handleAddWidget}
      />

      {/* Modal de confirmación para guardar cambios */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Salvar Alterações</h2>
            </div>
             
            <p className="text-gray-600 mb-6">
              Deseja salvar as alterações feitas no dashboard? Se cancelar, as mudanças serão descartadas.
            </p>
             
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelSave}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}