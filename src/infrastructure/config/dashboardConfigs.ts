import type { LayoutItem } from '../../domain/entities';

/**
 * Configuración de dashboards globales
 * Cada dashboard tiene sus propios widgets y layouts predeterminados
 */
export interface DashboardConfig {
  id: string;
  name: string;
  description: string;
  defaultWidgets: string[];
  defaultLayouts: Record<string, LayoutItem[]>;
}

export const dashboardConfigs: DashboardConfig[] = [
  {
    id: 'dashboard-vendas',
    name: 'Vendas',
    description: 'Métricas e gráficos de vendas',
    defaultWidgets: ['w1', 'w2', 'w5', 'w6', 'w8', 'w9'],
    defaultLayouts: {
      lg: [
        { i: "w1", x: 0, y: 0, w: 4, h: 2 },
        { i: "w2", x: 4, y: 0, w: 4, h: 2 },
        { i: "w5", x: 0, y: 2, w: 6, h: 4 },
        { i: "w6", x: 6, y: 2, w: 6, h: 4 },
        { i: "w8", x: 0, y: 6, w: 6, h: 4 },
        { i: "w9", x: 6, y: 6, w: 6, h: 4 },
      ],
      md: [
        { i: "w1", x: 0, y: 0, w: 5, h: 2 },
        { i: "w2", x: 5, y: 0, w: 5, h: 2 },
        { i: "w5", x: 0, y: 2, w: 10, h: 4 },
        { i: "w6", x: 0, y: 6, w: 10, h: 4 },
        { i: "w8", x: 0, y: 10, w: 10, h: 4 },
        { i: "w9", x: 0, y: 14, w: 10, h: 4 },
      ],
      sm: [
        { i: "w1", x: 0, y: 0, w: 3, h: 2 },
        { i: "w2", x: 3, y: 0, w: 3, h: 2 },
        { i: "w5", x: 0, y: 2, w: 6, h: 4 },
        { i: "w6", x: 0, y: 6, w: 6, h: 4 },
        { i: "w8", x: 0, y: 10, w: 6, h: 4 },
        { i: "w9", x: 0, y: 14, w: 6, h: 4 },
      ],
      xs: [
        { i: "w1", x: 0, y: 0, w: 4, h: 2 },
        { i: "w2", x: 0, y: 2, w: 4, h: 2 },
        { i: "w5", x: 0, y: 4, w: 4, h: 4 },
        { i: "w6", x: 0, y: 8, w: 4, h: 4 },
        { i: "w8", x: 0, y: 12, w: 4, h: 4 },
        { i: "w9", x: 0, y: 16, w: 4, h: 4 },
      ],
      xxs: [
        { i: "w1", x: 0, y: 0, w: 2, h: 2 },
        { i: "w2", x: 0, y: 2, w: 2, h: 2 },
        { i: "w5", x: 0, y: 4, w: 2, h: 4 },
        { i: "w6", x: 0, y: 8, w: 2, h: 4 },
        { i: "w8", x: 0, y: 12, w: 2, h: 4 },
        { i: "w9", x: 0, y: 16, w: 2, h: 4 },
      ],
    },
  },
  {
    id: 'dashboard-marketing',
    name: 'Marketing',
    description: 'Métricas de marketing e campanhas',
    defaultWidgets: ['w3', 'w4', 'w7', 'w10'],
    defaultLayouts: {
      lg: [
        { i: "w3", x: 0, y: 0, w: 4, h: 2 },
        { i: "w4", x: 4, y: 0, w: 4, h: 2 },
        { i: "w7", x: 0, y: 2, w: 6, h: 4 },
        { i: "w10", x: 6, y: 2, w: 6, h: 4 },
      ],
      md: [
        { i: "w3", x: 0, y: 0, w: 5, h: 2 },
        { i: "w4", x: 5, y: 0, w: 5, h: 2 },
        { i: "w7", x: 0, y: 2, w: 10, h: 4 },
        { i: "w10", x: 0, y: 6, w: 10, h: 4 },
      ],
      sm: [
        { i: "w3", x: 0, y: 0, w: 3, h: 2 },
        { i: "w4", x: 3, y: 0, w: 3, h: 2 },
        { i: "w7", x: 0, y: 2, w: 6, h: 4 },
        { i: "w10", x: 0, y: 6, w: 6, h: 4 },
      ],
      xs: [
        { i: "w3", x: 0, y: 0, w: 4, h: 2 },
        { i: "w4", x: 0, y: 2, w: 4, h: 2 },
        { i: "w7", x: 0, y: 4, w: 4, h: 4 },
        { i: "w10", x: 0, y: 8, w: 4, h: 4 },
      ],
      xxs: [
        { i: "w3", x: 0, y: 0, w: 2, h: 2 },
        { i: "w4", x: 0, y: 2, w: 2, h: 2 },
        { i: "w7", x: 0, y: 4, w: 2, h: 4 },
        { i: "w10", x: 0, y: 8, w: 2, h: 4 },
      ],
    },
  },
  {
    id: 'dashboard-financeiro',
    name: 'Financeiro',
    description: 'Resumo financeiro e transações',
    defaultWidgets: ['w1', 'w2', 'w5', 'w6', 'w7', 'w8', 'w9', 'w10'],
    defaultLayouts: {
      lg: [
        { i: "w1", x: 0, y: 0, w: 3, h: 2 },
        { i: "w2", x: 3, y: 0, w: 3, h: 2 },
        { i: "w5", x: 6, y: 0, w: 3, h: 2 },
        { i: "w6", x: 9, y: 0, w: 3, h: 2 },
        { i: "w7", x: 0, y: 2, w: 4, h: 4 },
        { i: "w8", x: 4, y: 2, w: 4, h: 4 },
        { i: "w9", x: 8, y: 2, w: 4, h: 4 },
        { i: "w10", x: 0, y: 6, w: 6, h: 4 },
      ],
      md: [
        { i: "w1", x: 0, y: 0, w: 5, h: 2 },
        { i: "w2", x: 5, y: 0, w: 5, h: 2 },
        { i: "w5", x: 0, y: 2, w: 5, h: 2 },
        { i: "w6", x: 5, y: 2, w: 5, h: 2 },
        { i: "w7", x: 0, y: 4, w: 10, h: 4 },
        { i: "w8", x: 0, y: 8, w: 10, h: 4 },
        { i: "w9", x: 0, y: 12, w: 10, h: 4 },
        { i: "w10", x: 0, y: 16, w: 10, h: 4 },
      ],
      sm: [
        { i: "w1", x: 0, y: 0, w: 3, h: 2 },
        { i: "w2", x: 3, y: 0, w: 3, h: 2 },
        { i: "w5", x: 0, y: 2, w: 3, h: 2 },
        { i: "w6", x: 3, y: 2, w: 3, h: 2 },
        { i: "w7", x: 0, y: 4, w: 6, h: 4 },
        { i: "w8", x: 0, y: 8, w: 6, h: 4 },
        { i: "w9", x: 0, y: 12, w: 6, h: 4 },
        { i: "w10", x: 0, y: 16, w: 6, h: 4 },
      ],
      xs: [
        { i: "w1", x: 0, y: 0, w: 4, h: 2 },
        { i: "w2", x: 0, y: 2, w: 4, h: 2 },
        { i: "w5", x: 0, y: 4, w: 4, h: 2 },
        { i: "w6", x: 0, y: 6, w: 4, h: 2 },
        { i: "w7", x: 0, y: 8, w: 4, h: 4 },
        { i: "w8", x: 0, y: 12, w: 4, h: 4 },
        { i: "w9", x: 0, y: 16, w: 4, h: 4 },
        { i: "w10", x: 0, y: 20, w: 4, h: 4 },
      ],
      xxs: [
        { i: "w1", x: 0, y: 0, w: 2, h: 2 },
        { i: "w2", x: 0, y: 2, w: 2, h: 2 },
        { i: "w5", x: 0, y: 4, w: 2, h: 2 },
        { i: "w6", x: 0, y: 6, w: 2, h: 2 },
        { i: "w7", x: 0, y: 8, w: 2, h: 4 },
        { i: "w8", x: 0, y: 12, w: 2, h: 4 },
        { i: "w9", x: 0, y: 16, w: 2, h: 4 },
        { i: "w10", x: 0, y: 20, w: 2, h: 4 },
      ],
    },
  },
];

/**
 * Obtiene la configuración de un dashboard por su ID
 */
export function getDashboardConfig(dashboardId: string): DashboardConfig | undefined {
  return dashboardConfigs.find(d => d.id === dashboardId);
}

/**
 * Obtiene el dashboard por defecto
 */
export function getDefaultDashboard(): DashboardConfig {
  return dashboardConfigs[0];
}