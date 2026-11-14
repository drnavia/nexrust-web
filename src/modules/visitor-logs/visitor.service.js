/**
 * @file visitor.service.js
 * @description Servicio para el control de accesos en garita.
 * @location /nexrust-web/src/modules/visitor-logs/visitor.service.js
 */

import api from '../../services/api';

export const visitorService = {
  getLogs: async () => {
    try {
      const response = await api.get('/visitor-logs');
      return response.data;
    } catch (error) {
      console.error('Error al obtener registros de garita:', error);
      throw error;
    }
  },

  registerEntry: async (logData) => {
    try {
      const response = await api.post('/visitor-logs/entry', logData);
      return response.data;
    } catch (error) {
      console.error('Error al registrar ingreso:', error);
      throw error;
    }
  }
};