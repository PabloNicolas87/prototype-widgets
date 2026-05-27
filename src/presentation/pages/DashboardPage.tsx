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
import type { LayoutItem } from '../../domain/entities';

// Componente wrapper para WidthProvider + Responsive
const ResponsiveGridLayout = WidthProvider(Responsive);

export function DashboardPage() {
  const { state: layoutState, dispatch: layoutDispatch } = useLayout();
  const { dispatch: authDispatch } = useAuth();
  
  // Obtener el dashboard actual
  const currentDashboard = layoutState.dashboards[layoutState.currentDashboardId] || {
    activeWidgets: [],
    layouts: {},
  };
  
  const dashboardConfig = getDashboardConfig(layoutState.currentDashboardId);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg');
  const [isWidgetListVisible, setIsWidgetListVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Guardar el estado original al entrar en modo edición
  const [originalLayouts, setOriginalLayouts] = useState<Record<string, LayoutItem[]>>({});
  const [originalActiveWidgets, setOriginalActiveWidgets] = useState<string[]>([]);

  // Detectar si es dispositivo táctil
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Filtrar widgets por dashboard actual
  const dashboardWidgets = useMemo(() => {
    return widgetCatalog.filter(w => w.dashboardId === layoutState.currentDashboardId);
  }, [layoutState.currentDashboardId]);

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
        // Usar localStorage para evitar mostrar el mismo toast repetidamente
        const toastKey = `breakpoint-toast-${newBreakpoint}`;
        const hasShownToast = localStorage.getItem(toastKey);
        
        if (newBreakpoint !== 'lg' && !hasShownToast) {
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
          
          localStorage.setItem(toastKey, 'true');
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
      // En dispositivos táctiles, mostrar la lista automáticamente
      if (isTouchDevice) {
        setIsWidgetListVisible(true);
      }
    } else if (hasChanges) {
      // Hay cambios, mostrar modal de confirmación
      setIsSaveModalOpen(true);
    } else {
      // No hay cambios, simplemente cancelar
      setIsEditMode(false);
      setIsWidgetListVisible(false);
    }
  }, [isEditMode, hasChanges, currentDashboard.layouts, currentDashboard.activeWidgets, isTouchDevice]);

  const handleConfirmSave = useCallback(() => {
    // Confirmar guardar cambios
    setIsEditMode(false);
    setIsWidgetListVisible(false);
    setIsSaveModalOpen(false);
    
    // Mostrar toast de confirmación
    toast.success('Alterações salvas com sucesso!', {
      duration: 3000,
    });
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
    setIsWidgetListVisible(false);
    setIsSaveModalOpen(false);
    
    // Mostrar toast de cancelación
    toast('Alterações descartadas', {
      duration: 3000,
      icon: '🗑️',
    });
  }, [originalActiveWidgets, originalLayouts, currentDashboard.activeWidgets, layoutDispatch]);

  const handleRemoveWidget = useCallback((widgetId: string) => {
    layoutDispatch({ type: 'REMOVE_WIDGET', payload: widgetId });
    setHasChanges(true);
  }, [layoutDispatch]);

  const handleAddWidget = useCallback((widgetId: string) => {
    layoutDispatch({ type: 'ADD_WIDGET', payload: widgetId });
    setHasChanges(true);
    
    // Mostrar toast de widget agregado
    toast.success('Widget adicionado com sucesso!', {
      duration: 2000,
    });
  }, [layoutDispatch]);

  // Filtrar widgets disponibles para el dashboard actual
  const activeCatalog = dashboardWidgets.filter(w => currentDashboard.activeWidgets.includes(w.id));
  const availableWidgets = dashboardWidgets.filter(w => !currentDashboard.activeWidgets.includes(w.id));

  // Memoizar layouts para evitar ciclos infinitos de renderizado
  const memoizedLayouts = useMemo(() => currentDashboard.layouts, [currentDashboard.layouts]);

  return (
    <div className={`min-h-screen bg-gray-50 transition-all duration-300 ${isEditMode ? 'bg-gray-100' : ''}`}>
      {/* Header con título y botón de logout */}
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{dashboardConfig?.name || 'Dashboard'}</h1>
            <p className="text-sm text-gray-500">{dashboardConfig?.description || 'Bem-vindo'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Indicador visual cuando la lista está oculta (solo en desktop) */}
      {!isTouchDevice && isEditMode && !isWidgetListVisible && (
        <div
          className="widget-list-indicator"
          onMouseEnter={() => setIsWidgetListVisible(true)}
          title="Mostrar lista de widgets"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
      )}

      {/* Botón flotante de edición */}
      <div className="fixed top-24 right-4 z-50 flex flex-col items-end gap-3">
        {/* Botón flotante principal (editar/salir) */}
        <button
          onClick={handleToggleEditMode}
          className={`floating-button w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
            isEditMode
              ? 'bg-gray-700 hover:bg-gray-800 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          title={isEditMode ? 'Sair do modo de edição' : 'Personalizar dashboard'}
        >
          {isEditMode ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          )}
        </button>

        {/* Lista flotante de widgets (solo visible en modo edición) */}
        {isEditMode && (
          <div
            className={`floating-widget-list rounded-xl border border-gray-200 p-4 w-80 max-h-[70vh] overflow-y-auto ${
              isWidgetListVisible ? 'floating-widget-list-visible' : 'floating-widget-list-hidden'
            }`}
            onMouseEnter={() => !isTouchDevice && setIsWidgetListVisible(true)}
            onMouseLeave={() => !isTouchDevice && setIsWidgetListVisible(false)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Adicionar Widgets</h3>
              {/* Botón de guardar solo cuando hay cambios */}
              {hasChanges && (
                <button
                  onClick={handleToggleEditMode}
                  className="w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition-colors"
                  title="Salvar alterações"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              )}
            </div>
            {availableWidgets.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">Todos os widgets já estão no dashboard</p>
            ) : (
              <div className="space-y-2">
                {availableWidgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xs font-medium">
                          {widget.type === 'kpi' ? 'KPI' : 
                           widget.type === 'bar-chart' ? '📊' :
                           widget.type === 'line-chart' ? '📈' :
                           widget.type === 'pie-chart' ? '🥧' : '📋'}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{widget.name}</span>
                    </div>
                    <button
                      onClick={() => handleAddWidget(widget.id)}
                      className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                      title="Adicionar widget"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* Botón de toggle para dispositivos táctiles */}
            {isTouchDevice && (
              <button
                onClick={() => setIsWidgetListVisible(!isWidgetListVisible)}
                className="w-full mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
              >
                {isWidgetListVisible ? 'Ocultar lista' : 'Mostrar lista'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main content con animación tilt cuando está en modo edición */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isEditMode ? 'dashboard-with-perspective' : ''}`}>
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
                className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 p-4 ${
                  isEditMode ? 'widget-edit-mode' : ''
                }`}
              >
                <WidgetComponent
                  data={data}
                  title={widget.name}
                  size={size}
                  onDelete={isEditMode ? () => handleRemoveWidget(widget.id) : undefined}
                />
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </main>

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