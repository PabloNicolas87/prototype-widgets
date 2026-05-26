import { ENV } from './env';
import { mockUsers } from '../mock/mock';
import type { User } from '../../domain/entities';

/**
 * Configuración de credenciales y fuente de datos
 */
export const CREDENTIALS = {
  dataSource: ENV.MODE === 'development' ? 'mock' : ENV.VITE_ENV === 'hml' ? 'api' : 'mock',
} as const;

export type DataSource = typeof CREDENTIALS.dataSource;

/**
 * Obtiene la fuente de datos configurada
 * @returns 'mock' o 'api' según el entorno
 */
export function getDataSource(): DataSource {
  return CREDENTIALS.dataSource;
}

/**
 * Función de login mockeada
 * @param name - Nombre de usuario
 * @param password - Contraseña del usuario
 * @returns El usuario si las credenciales son correctas, null en caso contrario
 */
export function mockLogin(name: string, password: string): User | null {
  const user = mockUsers.find(u => u.name === name && u.password === password);
  return user || null;
}