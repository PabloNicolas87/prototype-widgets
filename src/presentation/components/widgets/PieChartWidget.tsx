import type { ReactNode } from 'react';

interface PieChartData {
  labels: string[];
  values: number[];
  colors: string[];
}

interface PieChartWidgetProps {
  data: PieChartData;
  title: string;
  size: { w: number; h: number };
  onDelete?: () => void;
}

export function PieChartWidget({ data, title, onDelete }: PieChartWidgetProps): ReactNode {
  const total = data.values.reduce((sum, value) => sum + value, 0);
  const radius = 80;
  const innerRadius = 50;
  const centerX = 150;
  const centerY = 120;

  let currentAngle = -90; // Empezar desde arriba

  const slices = data.values.map((value, index) => {
    const sliceAngle = (value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const x3 = centerX + innerRadius * Math.cos(endAngleRad);
    const y3 = centerY + innerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(startAngleRad);
    const y4 = centerY + innerRadius * Math.sin(startAngleRad);
    
    const largeArcFlag = sliceAngle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');
    
    currentAngle += sliceAngle;
    
    return {
      pathData,
      color: data.colors[index],
      label: data.labels[index],
      value,
      percentage: ((value / total) * 100).toFixed(1),
    };
  });

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
      <div className="flex-1 flex items-center justify-center gap-8">
        <svg width={300} height={240} className="overflow-visible">
          {slices.map((slice, index) => (
            <path
              key={index}
              d={slice.pathData}
              fill={slice.color}
              stroke="white"
              strokeWidth={2}
            />
          ))}
        </svg>
        <div className="flex flex-col gap-2">
          {slices.map((slice, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-xs text-gray-600">{slice.label}</span>
              <span className="text-xs text-gray-500 font-medium">
                {slice.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}