/**
 * @file events.service.js
 * @description Servicio para la gestión de eventos y listas de invitados.
 * @location /nexrust-web/src/modules/events/events.service.js
 */

import api from '../../services/api';

export const eventsService = {
  getEvents: async () => {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  },

  createEvent: async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Error al crear evento:', error);
      throw error;
    }
  }
};