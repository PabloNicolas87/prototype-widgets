import type { ReactNode } from 'react';

interface LineChartData {
  labels: string[];
  values: number[];
  color: string;
}

interface LineChartWidgetProps {
  data: LineChartData;
  title: string;
  size: { w: number; h: number };
}

export function LineChartWidget({ data, title }: LineChartWidgetProps): ReactNode {
  const maxValue = Math.max(...data.values);
  const chartHeight = 200;
  const chartWidth = 500;
  const padding = 40;
  const pointRadius = 5;

  const points = data.values.map((value, index) => {
    const x = padding + (index / (data.values.length - 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - (value / maxValue) * (chartHeight - 2 * padding);
    return { x, y, value };
  });

  const pathD = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <div className="h-full p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      <div className="flex-1 flex items-center justify-center">
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Eje X */}
          <line
            x1={padding}
            y1={chartHeight - padding}
            x2={chartWidth - padding}
            y2={chartHeight - padding}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
          
          {/* Eje Y */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={chartHeight - padding}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
          
          {/* Línea del gráfico */}
          <path
            d={pathD}
            fill="none"
            stroke={data.color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Puntos */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r={pointRadius}
                fill={data.color}
              />
              <text
                x={point.x}
                y={point.y - 10}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {point.value.toLocaleString()}
              </text>
              <text
                x={point.x}
                y={chartHeight - padding + 20}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {data.labels[index]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}