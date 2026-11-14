/**
 * @file tickets.service.js
 * @description Servicio para la gestión de reclamos y ticketera de mantenimiento.
 * @location /nexrust-web/src/modules/tickets/tickets.service.js
 */

import api from '../../services/api';

export const ticketsService = {
  getTickets: async () => {
    try {
      const response = await api.get('/tickets');
      return response.data;
    } catch (error) {
      console.error('Error al obtener tickets:', error);
      throw error;
    }
  },

  createTicket: async (ticketData) => {
    try {
      const response = await api.post('/tickets', ticketData);
      return response.data;
    } catch (error) {
      console.error('Error al crear ticket:', error);
      throw error;
    }
  }
};