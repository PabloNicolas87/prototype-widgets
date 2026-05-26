/**
 * Variables de entorno tipadas
 */
export const ENV = {
  MODE: import.meta.env.MODE as 'development' | 'production' | 'test',
  VITE_API_URL: import.meta.env.VITE_API_URL ?? '',
  VITE_ENV: import.meta.env.VITE_ENV as 'development' | 'hml' | 'production' | undefined,
} as const;