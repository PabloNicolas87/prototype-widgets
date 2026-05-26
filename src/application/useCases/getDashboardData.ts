import { getDataSource } from '../../infrastructure/config/credentials';
import { mockData } from '../../infrastructure/mock/mock';
import { apiGet } from '../../infrastructure/http/apiClient';

/**
 * Caso de uso para obtener datos del dashboard
 */
export async function getDashboardData<T = any[]>(): Promise<T> {
  const dataSource = getDataSource();

  if (dataSource === 'mock') {
    return mockData as T;
  }

  // Si es api, llamar al endpoint correspondiente
  return apiGet<T>('/dashboard');
}