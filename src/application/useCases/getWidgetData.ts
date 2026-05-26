import { widgetData } from '../../infrastructure/mock/mock';

/**
 * Caso de uso para obtener los datos de un widget
 * @param widgetId - ID del widget
 * @returns Los datos del widget o null si no existe
 */
export function getWidgetData(widgetId: string): unknown {
  return widgetData[widgetId] || null;
}