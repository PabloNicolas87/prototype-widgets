import type { ReactNode } from 'react';

interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

interface TableWidgetProps {
  data: TableData;
  title: string;
  size: { w: number; h: number };
  onDelete?: () => void;
}

export function TableWidget({ data, title, size, onDelete }: TableWidgetProps): ReactNode {
  const maxRows = size.h < 3 ? 3 : data.rows.length;
  const displayRows = data.rows.slice(0, maxRows);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded transition-colors text-xs"
            title="Remover widget"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Remover</span>
          </button>
        )}
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className="text-left py-2 px-2 font-medium text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-100">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="py-2 px-2 text-gray-600"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.rows.length > maxRows && (
          <p className="text-xs text-gray-400 mt-2 text-center">
            Mostrando {maxRows} de {data.rows.length} linhas
          </p>
        )}
      </div>
    </div>
  );
}