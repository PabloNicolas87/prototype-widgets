import type { ReactNode } from 'react';

interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

interface TableWidgetProps {
  data: TableData;
  title: string;
  size: { w: number; h: number };
}

export function TableWidget({ data, title, size }: TableWidgetProps): ReactNode {
  const maxRows = size.h < 3 ? 3 : data.rows.length;
  const displayRows = data.rows.slice(0, maxRows);

  return (
    <div className="h-full p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
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