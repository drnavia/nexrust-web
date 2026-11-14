/**
 * @file recurring.service.js
 * @description Servicio para gestionar pases recurrentes de personal habitual.
 * @location /nexrust-web/src/modules/recurring/recurring.service.js
 */

import api from '../../services/api';

export const recurringService = {
  // Obtener todos los pases recurrentes del usuario o country
  getPasses: async () => {
    try {
      const response = await api.get('/recurring-passes');
      return response.data;
    } catch (error) {
      console.error('Error al obtener pases recurrentes:', error);
      throw error;
    }
  },

  // Crear un nuevo pase recurrente
  createPass: async (passData) => {
    try {
      const response = await api.post('/recurring-passes', passData);
      return response.data;
    } catch (error) {
      console.error('Error al crear pase recurrente:', error);
      throw error;
    }
  },

  // Suspender o eliminar pase
  deletePass: async (id) => {
    try {
      const response = await api.delete(`/recurring-passes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar pase recurrente:', error);
      throw error;
    }
  }
};