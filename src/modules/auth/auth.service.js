/**
 * @file auth.service.js
 * @description Servicios de comunicación HTTP para el módulo de Autenticación.
 * @location /nexrust-web/src/modules/auth/auth.service.js
 */

import api from '../../services/api';

/**
 * Envía las credenciales al backend para iniciar sesión.
 * @param {string} email - Correo electrónico del usuario
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} Token JWT y datos del usuario
 */
export async function loginUser(email, password) {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
}

/**
 * Obtiene los datos del usuario autenticado actual utilizando el token JWT.
 * @returns {Promise<Object>} Datos del usuario
 */
export async function getCurrentUser() {
  const response = await api.get('/auth/me');
  return response.data;
}