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
}

export function KpiWidget({ data, title, size }: KpiWidgetProps): ReactNode {
  const isLarge = size.w >= 4;

  return (
    <div className="h-full p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
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