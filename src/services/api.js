/**
 * @file api.js
 * @description Configuración centralizada de Axios para la comunicación con el backend.
 * @location /nexrust-web/src/services/api.js
 */

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Cambia el puerto si tu backend corre en otro (ej: 3000)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar token de autenticación si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;