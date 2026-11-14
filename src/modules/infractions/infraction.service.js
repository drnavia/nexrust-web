/**
 * @file infraction.service.js
 * @description Servicios HTTP para el módulo de Gestión de Infracciones y Multas.
 * @location /nexrust-web/src/modules/infractions/infraction.service.js
 */

import api from '../../services/api';

/**
 * Obtiene la lista de infracciones registradas.
 * @returns {Promise<Array>} Lista de infracciones
 */
export async function fetchInfractions() {
  const response = await api.get('/infractions');
  return response.data;
}

/**
 * Apela una infracción específica.
 * @param {string} infractionId - ID UUID de la infracción
 * @returns {Promise<Object>} Infracción actualizada
 */
export async function appealInfraction(infractionId) {
  const response = await api.put(`/infractions/${infractionId}/appeal`, {});
  return response.data;
}