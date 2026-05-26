import { mockLogin } from '../../infrastructure/config/credentials';
import type { User } from '../../domain/entities';

/**
 * Caso de uso para autenticar un usuario
 * @param name - Nombre de usuario
 * @param password - Contraseña del usuario
 * @returns El usuario autenticado
 * @throws Error si las credenciales son inválidas
 */
export async function loginUser(name: string, password: string): Promise<User> {
  const user = mockLogin(name, password);
  
  if (!user) {
    throw new Error('Credenciais inválidas');
  }
  
  return user;
}