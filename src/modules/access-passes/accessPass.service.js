/**
 * @file accessPass.service.js
 * @description Servicios de comunicación HTTP para el módulo de Pases de Acceso y Códigos QR.
 * @location /nexrust-web/src/modules/access-passes/accessPass.service.js
 */

import api from '../../services/api';

/**
 * Obtiene la lista de pases de acceso registrados.
 * @returns {Promise<Array>} Lista de pases
 */
export async function fetchAccessPasses() {
  const response = await api.get('/access-passes');
  return response.data;
}

/**
 * Registra una nueva autorización de acceso en el backend.
 * @param {Object} passData - Datos del pase (lote, fracción, fechas, prestador)
 * @returns {Promise<Object>} Datos del pase creado con su token QR
 */
export async function createAccessPass(passData) {
  const response = await api.post('/access-passes', passData);
  return response.data;
}