/**
 * @file superadmin.service.js
 * @description Servicio para gestionar las peticiones HTTP de configuración visual y countries.
 * @location /nexrust-web/src/modules/superadmin/superadmin.service.js
 */

import api from '../../services/api';

export const superAdminService = {
  /**
   * Obtiene la lista de todos los countries registrados.
   * @returns {Promise<Array>} Lista de countries
   */
  getCountries: async () => {
    try {
      const response = await api.get('/admin/countries');
      return response.data;
    } catch (error) {
      console.error('Error al obtener la lista de countries:', error);
      throw error;
    }
  },

  /**
   * Obtiene la configuración actual de marca blanca del Country.
   * @param {string} countryId - ID del country
   * @returns {Promise<Object>} Datos del country y su theme_config
   */
  getCountryConfig: async (countryId) => {
    try {
      const response = await api.get(`/admin/countries/${countryId}/config`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener configuración del country:', error);
      throw error;
    }
  },

  /**
   * Actualiza la configuración de marca blanca del Country.
   * @param {string} countryId - ID del country
   * @param {Object} themeConfig - Objeto con los parámetros de marca blanca
   * @returns {Promise<Object>} Respuesta del servidor
   */
  updateCountryConfig: async (countryId, themeConfig) => {
    try {
      const response = await api.put(`/admin/countries/${countryId}/config`, { theme_config: themeConfig });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar configuración del country:', error);
      throw error;
    }
  }
};