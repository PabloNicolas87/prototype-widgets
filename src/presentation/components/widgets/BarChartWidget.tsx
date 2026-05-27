import type { ReactNode } from 'react';

interface BarChartData {
  labels: string[];
  values: number[];
  colors: string[];
}

interface BarChartWidgetProps {
  data: BarChartData;
  title: string;
  size: { w: number; h: number };
  onDelete?: () => void;
}

export function BarChartWidget({ data, title, onDelete }: BarChartWidgetProps): ReactNode {
  const maxValue = Math.max(...data.values);
  const chartHeight = 200;
  const barWidth = 40;
  const gap = 20;
  const totalWidth = data.labels.length * (barWidth + gap) - gap;

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
      <div className="flex-1 flex items-center justify-center">
        <svg width={totalWidth} height={chartHeight} className="overflow-visible">
          {data.values.map((value, index) => {
            const barHeight = (value / maxValue) * (chartHeight - 30);
            const x = index * (barWidth + gap);
            const y = chartHeight - barHeight - 20;
            
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={data.colors[index]}
                  rx={4}
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {value.toLocaleString()}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {data.labels[index]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}