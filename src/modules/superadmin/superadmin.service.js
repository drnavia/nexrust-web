/**
 * @file superadmin.service.js
 * @description Servicio para gestionar la configuración de marca blanca y countries.
 * @location /nexrust-web/src/modules/superadmin/superadmin.service.js
 */

import '../../services/api'; // O api desde tu instancia configurada
import api from '../../services/api';

export const superAdminService = {
  getCountryConfig: async (countryId) => {
    try {
      const response = await api.get(`/countries/${countryId}/config`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener configuración del country:', error);
      throw error;
    }
  },

  updateCountryConfig: async (countryId, themeConfig) => {
    try {
      const response = await api.put(`/countries/${countryId}/config`, { theme_config: themeConfig });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar configuración del country:', error);
      throw error;
    }
  }
};