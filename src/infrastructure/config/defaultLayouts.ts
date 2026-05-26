import type { LayoutItem } from '../../domain/entities';

/**
 * Layouts predefinidos para cada breakpoint
 * Estos layouts definen cómo se organizan los widgets en diferentes tamaños de pantalla
 */
export const defaultLayouts: Record<string, LayoutItem[]> = {
  // Desktop grande (12 columnas) - Layout original optimizado
  lg: [
    { i: "w1", x: 0, y: 0, w: 3, h: 2 },
    { i: "w2", x: 3, y: 0, w: 3, h: 2 },
    { i: "w3", x: 6, y: 0, w: 3, h: 2 },
    { i: "w4", x: 9, y: 0, w: 3, h: 2 },
    { i: "w5", x: 0, y: 2, w: 6, h: 4 },
    { i: "w6", x: 6, y: 2, w: 6, h: 4 },
    { i: "w7", x: 0, y: 6, w: 4, h: 4 },
    { i: "w8", x: 4, y: 6, w: 8, h: 4 },
    { i: "w9", x: 0, y: 10, w: 6, h: 4 },
    { i: "w10", x: 6, y: 10, w: 6, h: 4 },
  ],
  
  // Desktop mediano (10 columnas) - Widgets en 2 columnas
  md: [
    { i: "w1", x: 0, y: 0, w: 5, h: 2 },
    { i: "w2", x: 5, y: 0, w: 5, h: 2 },
    { i: "w3", x: 0, y: 2, w: 5, h: 2 },
    { i: "w4", x: 5, y: 2, w: 5, h: 2 },
    { i: "w5", x: 0, y: 4, w: 10, h: 4 },
    { i: "w6", x: 0, y: 8, w: 10, h: 4 },
    { i: "w7", x: 0, y: 12, w: 10, h: 4 },
    { i: "w8", x: 0, y: 16, w: 10, h: 4 },
    { i: "w9", x: 0, y: 20, w: 10, h: 4 },
    { i: "w10", x: 0, y: 24, w: 10, h: 4 },
  ],
  
  // Tablet (6 columnas) - Widgets en 2 columnas
  sm: [
    { i: "w1", x: 0, y: 0, w: 3, h: 2 },
    { i: "w2", x: 3, y: 0, w: 3, h: 2 },
    { i: "w3", x: 0, y: 2, w: 3, h: 2 },
    { i: "w4", x: 3, y: 2, w: 3, h: 2 },
    { i: "w5", x: 0, y: 4, w: 6, h: 4 },
    { i: "w6", x: 0, y: 8, w: 6, h: 4 },
    { i: "w7", x: 0, y: 12, w: 6, h: 4 },
    { i: "w8", x: 0, y: 16, w: 6, h: 4 },
    { i: "w9", x: 0, y: 20, w: 6, h: 4 },
    { i: "w10", x: 0, y: 24, w: 6, h: 4 },
  ],
  
  // Mobile grande (4 columnas) - Widgets ocupan ancho completo
  xs: [
    { i: "w1", x: 0, y: 0, w: 4, h: 2 },
    { i: "w2", x: 0, y: 2, w: 4, h: 2 },
    { i: "w3", x: 0, y: 4, w: 4, h: 2 },
    { i: "w4", x: 0, y: 6, w: 4, h: 2 },
    { i: "w5", x: 0, y: 8, w: 4, h: 4 },
    { i: "w6", x: 0, y: 12, w: 4, h: 4 },
    { i: "w7", x: 0, y: 16, w: 4, h: 4 },
    { i: "w8", x: 0, y: 20, w: 4, h: 4 },
    { i: "w9", x: 0, y: 24, w: 4, h: 4 },
    { i: "w10", x: 0, y: 28, w: 4, h: 4 },
  ],
  
  // Mobile pequeño (2 columnas) - Widgets ocupan ancho completo
  xxs: [
    { i: "w1", x: 0, y: 0, w: 2, h: 2 },
    { i: "w2", x: 0, y: 2, w: 2, h: 2 },
    { i: "w3", x: 0, y: 4, w: 2, h: 2 },
    { i: "w4", x: 0, y: 6, w: 2, h: 2 },
    { i: "w5", x: 0, y: 8, w: 2, h: 4 },
    { i: "w6", x: 0, y: 12, w: 2, h: 4 },
    { i: "w7", x: 0, y: 16, w: 2, h: 4 },
    { i: "w8", x: 0, y: 20, w: 2, h: 4 },
    { i: "w9", x: 0, y: 24, w: 2, h: 4 },
    { i: "w10", x: 0, y: 28, w: 2, h: 4 },
  ],
};