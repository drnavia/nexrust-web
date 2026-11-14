/**
 * @file AuthContext.jsx
 * @description Contexto global para la gestión de autenticación y persistencia de sesión.
 * @location /nexrust-web/src/context/AuthContext.jsx
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, recuperamos la sesión desde localStorage si existe
  useEffect(() => {
    const storedUser = localStorage.getItem('nexrust_user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error al parsear usuario guardado:', e);
        localStorage.removeItem('nexrust_user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // Función de Login
  const login = async (email, password) => {
    try {
      // Ajusta la ruta del endpoint de login según tu backend (ej: /auth/login)
      const response = await api.post('/auth/login', { email, password });
      
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('nexrust_user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (err) {
      console.error('Error en login:', err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Credenciales inválidas o error de servidor.' 
      };
    }
  };

  // Función de Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nexrust_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}