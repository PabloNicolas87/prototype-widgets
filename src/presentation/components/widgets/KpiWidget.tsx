import type { ReactNode } from 'react';

interface KpiData {
  value: string;
  variation: string;
  variationPositive: boolean;
  detail: string;
  subtitle: string;
}

interface KpiWidgetProps {
  data: KpiData;
  title: string;
  size: { w: number; h: number };
  onDelete?: () => void;
}

export function KpiWidget({ data, title, size, onDelete }: KpiWidgetProps): ReactNode {
  const isLarge = size.w >= 4;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
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
      <p className="text-xs text-gray-400 mb-2">{data.subtitle}</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-gray-900">{data.value}</span>
        <span className={`text-sm font-medium ${data.variationPositive ? 'text-green-600' : 'text-red-600'}`}>
          {data.variation}
        </span>
      </div>
      {isLarge && (
        <p className="text-xs text-gray-500 mt-auto">{data.detail}</p>
      )}
    </div>
  );
}