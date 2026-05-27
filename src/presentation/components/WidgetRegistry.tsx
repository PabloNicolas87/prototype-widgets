import type { FC } from 'react';
import type { WidgetType } from '../../domain/entities';
import { KpiWidget } from './widgets/KpiWidget';
import { BarChartWidget } from './widgets/BarChartWidget';
import { LineChartWidget } from './widgets/LineChartWidget';
import { PieChartWidget } from './widgets/PieChartWidget';
import { TableWidget } from './widgets/TableWidget';

export interface WidgetProps {
  data: unknown;
  title: string;
  size: { w: number; h: number };
  onDelete?: () => void;
}

// Wrapper components para manejar el casting de tipos
const KpiWidgetWrapper: FC<WidgetProps> = (props) => {
  return KpiWidget({ data: props.data as never, title: props.title, size: props.size, onDelete: props.onDelete });
};

const BarChartWidgetWrapper: FC<WidgetProps> = (props) => {
  return BarChartWidget({ data: props.data as never, title: props.title, size: props.size, onDelete: props.onDelete });
};

const LineChartWidgetWrapper: FC<WidgetProps> = (props) => {
  return LineChartWidget({ data: props.data as never, title: props.title, size: props.size, onDelete: props.onDelete });
};

const PieChartWidgetWrapper: FC<WidgetProps> = (props) => {
  return PieChartWidget({ data: props.data as never, title: props.title, size: props.size, onDelete: props.onDelete });
};

const TableWidgetWrapper: FC<WidgetProps> = (props) => {
  return TableWidget({ data: props.data as never, title: props.title, size: props.size, onDelete: props.onDelete });
};

export const WidgetRegistry: Record<WidgetType, FC<WidgetProps>> = {
  "kpi": KpiWidgetWrapper,
  "bar-chart": BarChartWidgetWrapper,
  "line-chart": LineChartWidgetWrapper,
  "pie-chart": PieChartWidgetWrapper,
  "table": TableWidgetWrapper,
};