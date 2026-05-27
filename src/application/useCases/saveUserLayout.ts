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
 * Caso de uso para guardar el layout de un dashboard
 * @param userId - ID del usuario (para almacenamiento)
 * @param dashboardId - ID del dashboard
 * @param activeWidgets - Lista de widgets activos
 * @param layouts - Configuración de layouts para cada breakpoint
 */
export function saveUserLayout(
  userId: string,
  dashboardId: string,
  activeWidgets: string[],
  layouts: Record<string, LayoutItem[]>
): void {
  // Validar datos antes de guardar
  const dashboardLayout = {
    activeWidgets,
    layouts,
  };
  
  if (!validateLayout(dashboardLayout)) {
    throw new Error('Invalid layout structure');
  }
  
  if (!validateWidgets(activeWidgets)) {
    throw new Error('Invalid widgets');
  }
  
  const storageKey = `layout_${userId}_${dashboardId}`;
  
  try {
    localStorage.setItem(storageKey, JSON.stringify(dashboardLayout));
  } catch (error) {
    console.error('Error al guardar layout:', error);
    throw new Error('Failed to save layout');
  }
}