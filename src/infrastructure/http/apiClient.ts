import { ENV } from '../config/env';

const baseUrl = ENV.VITE_API_URL;

/**
 * Cliente HTTP base usando fetch
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  const url = `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}