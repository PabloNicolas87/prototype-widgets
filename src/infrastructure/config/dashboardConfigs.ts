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
    defaultWidgets: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9'],
    defaultLayouts: {
      // Desktop grande (12 columnas) - Layout optimizado
      lg: [
        { i: "v1", x: 0, y: 0, w: 3, h: 2 },
        { i: "v2", x: 3, y: 0, w: 3, h: 2 },
        { i: "v3", x: 6, y: 0, w: 3, h: 2 },
        { i: "v4", x: 9, y: 0, w: 3, h: 2 },
        { i: "v5", x: 0, y: 2, w: 6, h: 4 },
        { i: "v6", x: 6, y: 2, w: 6, h: 4 },
        { i: "v7", x: 0, y: 6, w: 4, h: 4 },
        { i: "v8", x: 4, y: 6, w: 4, h: 4 },
        { i: "v9", x: 8, y: 6, w: 4, h: 4 },
      ],
      // Desktop mediano (10 columnas) - 2 columnas
      md: [
        { i: "v1", x: 0, y: 0, w: 5, h: 2 },
        { i: "v2", x: 5, y: 0, w: 5, h: 2 },
        { i: "v3", x: 0, y: 2, w: 5, h: 2 },
        { i: "v4", x: 5, y: 2, w: 5, h: 2 },
        { i: "v5", x: 0, y: 4, w: 10, h: 4 },
        { i: "v6", x: 0, y: 8, w: 10, h: 4 },
        { i: "v7", x: 0, y: 12, w: 5, h: 4 },
        { i: "v8", x: 5, y: 12, w: 5, h: 4 },
        { i: "v9", x: 0, y: 16, w: 10, h: 4 },
      ],
      // Tablet (6 columnas) - 2 columnas
      sm: [
        { i: "v1", x: 0, y: 0, w: 3, h: 2 },
        { i: "v2", x: 3, y: 0, w: 3, h: 2 },
        { i: "v3", x: 0, y: 2, w: 3, h: 2 },
        { i: "v4", x: 3, y: 2, w: 3, h: 2 },
        { i: "v5", x: 0, y: 4, w: 6, h: 4 },
        { i: "v6", x: 0, y: 8, w: 6, h: 4 },
        { i: "v7", x: 0, y: 12, w: 3, h: 4 },
        { i: "v8", x: 3, y: 12, w: 3, h: 4 },
        { i: "v9", x: 0, y: 16, w: 6, h: 4 },
      ],
      // Mobile grande (4 columnas) - 1 columna (ancho completo)
      xs: [
        { i: "v1", x: 0, y: 0, w: 4, h: 2 },
        { i: "v2", x: 0, y: 2, w: 4, h: 2 },
        { i: "v3", x: 0, y: 4, w: 4, h: 2 },
        { i: "v4", x: 0, y: 6, w: 4, h: 2 },
        { i: "v5", x: 0, y: 8, w: 4, h: 4 },
        { i: "v6", x: 0, y: 12, w: 4, h: 4 },
        { i: "v7", x: 0, y: 16, w: 4, h: 4 },
        { i: "v8", x: 0, y: 20, w: 4, h: 4 },
        { i: "v9", x: 0, y: 24, w: 4, h: 4 },
      ],
      // Mobile pequeño (2 columnas) - 1 columna (ancho completo)
      xxs: [
        { i: "v1", x: 0, y: 0, w: 2, h: 2 },
        { i: "v2", x: 0, y: 2, w: 2, h: 2 },
        { i: "v3", x: 0, y: 4, w: 2, h: 2 },
        { i: "v4", x: 0, y: 6, w: 2, h: 2 },
        { i: "v5", x: 0, y: 8, w: 2, h: 4 },
        { i: "v6", x: 0, y: 12, w: 2, h: 4 },
        { i: "v7", x: 0, y: 16, w: 2, h: 4 },
        { i: "v8", x: 0, y: 20, w: 2, h: 4 },
        { i: "v9", x: 0, y: 24, w: 2, h: 4 },
      ],
    },
  },
  {
    id: 'dashboard-marketing',
    name: 'Marketing',
    description: 'Métricas de marketing e campanhas',
    defaultWidgets: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'],
    defaultLayouts: {
      // Desktop grande (12 columnas)
      lg: [
        { i: "m1", x: 0, y: 0, w: 3, h: 2 },
        { i: "m2", x: 3, y: 0, w: 3, h: 2 },
        { i: "m3", x: 6, y: 0, w: 3, h: 2 },
        { i: "m4", x: 9, y: 0, w: 3, h: 2 },
        { i: "m5", x: 0, y: 2, w: 6, h: 4 },
        { i: "m6", x: 6, y: 2, w: 6, h: 4 },
        { i: "m7", x: 0, y: 6, w: 4, h: 4 },
        { i: "m8", x: 4, y: 6, w: 4, h: 4 },
        { i: "m9", x: 8, y: 6, w: 4, h: 4 },
      ],
      // Desktop mediano (10 columnas)
      md: [
        { i: "m1", x: 0, y: 0, w: 5, h: 2 },
        { i: "m2", x: 5, y: 0, w: 5, h: 2 },
        { i: "m3", x: 0, y: 2, w: 5, h: 2 },
        { i: "m4", x: 5, y: 2, w: 5, h: 2 },
        { i: "m5", x: 0, y: 4, w: 10, h: 4 },
        { i: "m6", x: 0, y: 8, w: 10, h: 4 },
        { i: "m7", x: 0, y: 12, w: 5, h: 4 },
        { i: "m8", x: 5, y: 12, w: 5, h: 4 },
        { i: "m9", x: 0, y: 16, w: 10, h: 4 },
      ],
      // Tablet (6 columnas)
      sm: [
        { i: "m1", x: 0, y: 0, w: 3, h: 2 },
        { i: "m2", x: 3, y: 0, w: 3, h: 2 },
        { i: "m3", x: 0, y: 2, w: 3, h: 2 },
        { i: "m4", x: 3, y: 2, w: 3, h: 2 },
        { i: "m5", x: 0, y: 4, w: 6, h: 4 },
        { i: "m6", x: 0, y: 8, w: 6, h: 4 },
        { i: "m7", x: 0, y: 12, w: 3, h: 4 },
        { i: "m8", x: 3, y: 12, w: 3, h: 4 },
        { i: "m9", x: 0, y: 16, w: 6, h: 4 },
      ],
      // Mobile grande (4 columnas) - 1 columna
      xs: [
        { i: "m1", x: 0, y: 0, w: 4, h: 2 },
        { i: "m2", x: 0, y: 2, w: 4, h: 2 },
        { i: "m3", x: 0, y: 4, w: 4, h: 2 },
        { i: "m4", x: 0, y: 6, w: 4, h: 2 },
        { i: "m5", x: 0, y: 8, w: 4, h: 4 },
        { i: "m6", x: 0, y: 12, w: 4, h: 4 },
        { i: "m7", x: 0, y: 16, w: 4, h: 4 },
        { i: "m8", x: 0, y: 20, w: 4, h: 4 },
        { i: "m9", x: 0, y: 24, w: 4, h: 4 },
      ],
      // Mobile pequeño (2 columnas) - 1 columna
      xxs: [
        { i: "m1", x: 0, y: 0, w: 2, h: 2 },
        { i: "m2", x: 0, y: 2, w: 2, h: 2 },
        { i: "m3", x: 0, y: 4, w: 2, h: 2 },
        { i: "m4", x: 0, y: 6, w: 2, h: 2 },
        { i: "m5", x: 0, y: 8, w: 2, h: 4 },
        { i: "m6", x: 0, y: 12, w: 2, h: 4 },
        { i: "m7", x: 0, y: 16, w: 2, h: 4 },
        { i: "m8", x: 0, y: 20, w: 2, h: 4 },
        { i: "m9", x: 0, y: 24, w: 2, h: 4 },
      ],
    },
  },
  {
    id: 'dashboard-financeiro',
    name: 'Financeiro',
    description: 'Resumo financeiro e transações',
    defaultWidgets: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9'],
    defaultLayouts: {
      // Desktop grande (12 columnas)
      lg: [
        { i: "f1", x: 0, y: 0, w: 3, h: 2 },
        { i: "f2", x: 3, y: 0, w: 3, h: 2 },
        { i: "f3", x: 6, y: 0, w: 3, h: 2 },
        { i: "f4", x: 9, y: 0, w: 3, h: 2 },
        { i: "f5", x: 0, y: 2, w: 6, h: 4 },
        { i: "f6", x: 6, y: 2, w: 6, h: 4 },
        { i: "f7", x: 0, y: 6, w: 4, h: 4 },
        { i: "f8", x: 4, y: 6, w: 4, h: 4 },
        { i: "f9", x: 8, y: 6, w: 4, h: 4 },
      ],
      // Desktop mediano (10 columnas)
      md: [
        { i: "f1", x: 0, y: 0, w: 5, h: 2 },
        { i: "f2", x: 5, y: 0, w: 5, h: 2 },
        { i: "f3", x: 0, y: 2, w: 5, h: 2 },
        { i: "f4", x: 5, y: 2, w: 5, h: 2 },
        { i: "f5", x: 0, y: 4, w: 10, h: 4 },
        { i: "f6", x: 0, y: 8, w: 10, h: 4 },
        { i: "f7", x: 0, y: 12, w: 5, h: 4 },
        { i: "f8", x: 5, y: 12, w: 5, h: 4 },
        { i: "f9", x: 0, y: 16, w: 10, h: 4 },
      ],
      // Tablet (6 columnas)
      sm: [
        { i: "f1", x: 0, y: 0, w: 3, h: 2 },
        { i: "f2", x: 3, y: 0, w: 3, h: 2 },
        { i: "f3", x: 0, y: 2, w: 3, h: 2 },
        { i: "f4", x: 3, y: 2, w: 3, h: 2 },
        { i: "f5", x: 0, y: 4, w: 6, h: 4 },
        { i: "f6", x: 0, y: 8, w: 6, h: 4 },
        { i: "f7", x: 0, y: 12, w: 3, h: 4 },
        { i: "f8", x: 3, y: 12, w: 3, h: 4 },
        { i: "f9", x: 0, y: 16, w: 6, h: 4 },
      ],
      // Mobile grande (4 columnas) - 1 columna
      xs: [
        { i: "f1", x: 0, y: 0, w: 4, h: 2 },
        { i: "f2", x: 0, y: 2, w: 4, h: 2 },
        { i: "f3", x: 0, y: 4, w: 4, h: 2 },
        { i: "f4", x: 0, y: 6, w: 4, h: 2 },
        { i: "f5", x: 0, y: 8, w: 4, h: 4 },
        { i: "f6", x: 0, y: 12, w: 4, h: 4 },
        { i: "f7", x: 0, y: 16, w: 4, h: 4 },
        { i: "f8", x: 0, y: 20, w: 4, h: 4 },
        { i: "f9", x: 0, y: 24, w: 4, h: 4 },
      ],
      // Mobile pequeño (2 columnas) - 1 columna
      xxs: [
        { i: "f1", x: 0, y: 0, w: 2, h: 2 },
        { i: "f2", x: 0, y: 2, w: 2, h: 2 },
        { i: "f3", x: 0, y: 4, w: 2, h: 2 },
        { i: "f4", x: 0, y: 6, w: 2, h: 2 },
        { i: "f5", x: 0, y: 8, w: 2, h: 4 },
        { i: "f6", x: 0, y: 12, w: 2, h: 4 },
        { i: "f7", x: 0, y: 16, w: 2, h: 4 },
        { i: "f8", x: 0, y: 20, w: 2, h: 4 },
        { i: "f9", x: 0, y: 24, w: 2, h: 4 },
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