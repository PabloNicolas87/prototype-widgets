import { getDashboardConfig } from '../../infrastructure/config/dashboardConfigs';
import type { LayoutItem } from '../../domain/entities';

/**
 * Caso de uso para obtener el layout de un dashboard
 * @param userId - ID del usuario (para almacenamiento)
 * @param dashboardId - ID del dashboard
 * @returns El layout del dashboard o el layout default del dashboard
 */
export function getUserLayout(
  userId: string,
  dashboardId: string
): { activeWidgets: string[]; layouts: Record<string, LayoutItem[]> } {
  const storageKey = `layout_${userId}_${dashboardId}`;
  const storedLayout = localStorage.getItem(storageKey);
  
  if (storedLayout) {
    try {
      return JSON.parse(storedLayout) as { activeWidgets: string[]; layouts: Record<string, LayoutItem[]> };
    } catch {
      // Si hay error al parsear, usar el default
    }
  }
  
  // Obtener configuración default del dashboard
  const dashboardConfig = getDashboardConfig(dashboardId);
  
  if (dashboardConfig) {
    return {
      activeWidgets: dashboardConfig.defaultWidgets,
      layouts: dashboardConfig.defaultLayouts,
    };
  }
  
  // Retornar layout vacío si no existe el dashboard
  return {
    activeWidgets: [],
    layouts: {},
  };
}