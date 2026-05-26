/**
 * Entidades de dominio
 */

export interface User {
  id: string;
  name: string;
  password: string;
}

export interface WidgetCatalogItem {
  id: string;
  name: string;
  type: WidgetType;
}

export type WidgetType = "kpi" | "bar-chart" | "line-chart" | "pie-chart" | "table";

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface UserLayout {
  userId: string;
  activeWidgets: string[];
  layouts: Record<string, LayoutItem[]>;
}

// Este archivo contendrá las entidades de dominio cuando se definan