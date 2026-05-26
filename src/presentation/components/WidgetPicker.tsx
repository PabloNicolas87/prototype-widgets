import type { WidgetCatalogItem } from '../../domain/entities';

const widgetTypeLabels: Record<string, string> = {
  "kpi": "KPI",
  "bar-chart": "Gráfico de Barras",
  "line-chart": "Gráfico de Linhas",
  "pie-chart": "Gráfico de Pizza",
  "table": "Tabela",
};

interface WidgetPickerProps {
  isOpen: boolean;
  onClose: () => void;
  availableWidgets: WidgetCatalogItem[];
  onAddWidget: (widgetId: string) => void;
}

export function WidgetPicker({ isOpen, onClose, availableWidgets, onAddWidget }: WidgetPickerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">Adicionar Widget</h2>
          <p className="text-sm text-gray-500 mt-1">Selecione um widget para adicionar ao dashboard</p>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          {availableWidgets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Todos os widgets já estão no dashboard</p>
            </div>
          ) : (
            <div className="space-y-4">
              {availableWidgets.map((widget) => {
                return (
                  <div
                    key={widget.id}
                    onClick={() => onAddWidget(widget.id)}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {widgetTypeLabels[widget.type]}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{widget.name}</h3>
                        <p className="text-sm text-gray-500">{widgetTypeLabels[widget.type]}</p>
                      </div>
                    </div>
                    
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}