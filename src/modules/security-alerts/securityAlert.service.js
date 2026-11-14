/**
 * @file securityAlert.service.js
 * @description Servicios HTTP para el módulo de Alertas de Seguridad y Botón de Pánico.
 * @location /nexrust-web/src/modules/security-alerts/securityAlert.service.js
 */

import api from '../../services/api';

/**
 * Obtiene la lista de alertas de seguridad registradas en el barrio.
 * @returns {Promise<Array>} Lista de alertas
 */
export async function fetchSecurityAlerts() {
  const response = await api.get('/security-alerts');
  return response.data;
}

/**
 * Emite una nueva alerta de emergencia (Botón de pánico).
 * @param {Object} alertData - Datos de la alerta (alertType, description, destinationLot, destinationFraction)
 * @returns {Promise<Object>} Alerta creada
 */
export async function createSecurityAlert(alertData) {
  const response = await api.post('/security-alerts', alertData);
  return response.data;
}