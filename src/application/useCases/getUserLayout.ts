import { getDashboardConfig } from '../../infrastructure/config/dashboardConfigs';
import { widgetCatalog } from '../../infrastructure/mock/mock';
import type { LayoutItem } from '../../domain/entities';

/**
 * Valida que un layout tenga la estructura correcta
 */
function validateLayout(layout: any): boolean {
  if (!layout || typeof layout !== 'object') return false;
  if (!Array.isArray(layout.activeWidgets)) return false;
  if (typeof layout.layouts !== 'object') return false;
  
  // Validar cada breakpoint
  for (const [, items] of Object.entries(layout.layouts)) {
    if (!Array.isArray(items)) return false;
    for (const item of items) {
      if (!item.i || typeof item.x !== 'number' || typeof item.y !== 'number' ||
          typeof item.w !== 'number' || typeof item.h !== 'number') {
        return false;
      }
    }
  }
  
  return true;
}

/**
 * Valida que los widgets existan en el catálogo
 */
function validateWidgets(widgetIds: string[]): boolean {
  return widgetIds.every(id => widgetCatalog.some(w => w.id === id));
}

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
      const parsedLayout = JSON.parse(storedLayout);
      
      // Validar estructura del layout
      if (!validateLayout(parsedLayout)) {
        console.warn(`Layout inválido para ${storageKey}, usando default`);
        throw new Error('Invalid layout structure');
      }
      
      // Validar que los widgets existan
      if (!validateWidgets(parsedLayout.activeWidgets)) {
        console.warn(`Widgets inválidos en ${storageKey}, usando default`);
        throw new Error('Invalid widgets');
      }
      
      return parsedLayout as { activeWidgets: string[]; layouts: Record<string, LayoutItem[]> };
    } catch (error) {
      // Si hay error al parsear o validar, usar el default
      console.error('Error al cargar layout:', error);
      // Limpiar localStorage para evitar errores futuros
      localStorage.removeItem(storageKey);
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