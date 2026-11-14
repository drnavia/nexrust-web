/**
 * @file amenity.service.js
 * @description Servicios HTTP para interactuar con las canchas y espacios comunes del country.
 * @location /nexrust-web/src/modules/amenities/amenity.service.js
 */

import api from '../../services/api';

/**
 * Obtiene la lista de amenities (instalaciones) activas.
 * @returns {Promise<Array>} Lista de amenities
 */
export async function fetchAmenities() {
  const response = await api.get('/amenities');
  return response.data;
}

/**
 * Obtiene las reservas realizadas.
 * @returns {Promise<Array>} Lista de reservas
 */
export async function fetchReservations() {
  const response = await api.get('/reservations');
  return response.data;
}

/**
 * Crea una nueva reserva para un amenity específico.
 * @param {Object} reservationData - Datos de la reserva (amenityId, startTime, endTime)
 * @returns {Promise<Object>} Reserva creada
 */
export async function createReservation(reservationData) {
  const response = await api.post('/reservations', reservationData);
  return response.data;
}