import type { LayoutItem } from '../../domain/entities';

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
  const storageKey = `layout_${userId}_${dashboardId}`;
  const dashboardLayout = {
    activeWidgets,
    layouts,
  };
  
  localStorage.setItem(storageKey, JSON.stringify(dashboardLayout));
}