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
}

export function BarChartWidget({ data, title }: BarChartWidgetProps): ReactNode {
  const maxValue = Math.max(...data.values);
  const chartHeight = 200;
  const barWidth = 40;
  const gap = 20;
  const totalWidth = data.labels.length * (barWidth + gap) - gap;

  return (
    <div className="h-full p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
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