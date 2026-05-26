import { useState } from 'react';
import { useLayout } from '../../application/store';
import { dashboardConfigs } from '../../infrastructure/config/dashboardConfigs';

export function Sidebar() {
  const { state: layoutState, dispatch: layoutDispatch } = useLayout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa para mobile/tablet */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-lg p-2 shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay para mobile/tablet */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-64`}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Dashboards</h2>
            <p className="text-sm text-gray-500 mt-1">Selecione um dashboard</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {dashboardConfigs.map((dashboard) => {
            const isActive = layoutState.currentDashboardId === dashboard.id;
            
            return (
              <button
                key={dashboard.id}
                onClick={() => {
                  layoutDispatch({ type: 'SET_CURRENT_DASHBOARD', payload: dashboard.id });
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-2 border-transparent'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${
                  isActive ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
                <div>
                  <div className="font-medium">{dashboard.name}</div>
                  <div className="text-xs opacity-75">{dashboard.description}</div>
                </div>
              </button>
            );
          })}
        </nav>
        
        
      </aside>
    </>
  );
}