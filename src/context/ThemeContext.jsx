/**
 * @file ThemeContext.jsx
 * @description Proveedor de tema visual dinámico (White-Label) basado en la configuración del Country.
 * @location /nexrust-web/src/context/ThemeContext.jsx
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const { user } = useAuth();
  const [theme, setTheme] = useState({
    primaryColor: '#2563eb',
    accentColor: '#1d4ed8',
    brandName: 'San Sebastián'
  });

  useEffect(() => {
    let primaryColor = '#2563eb';
    let accentColor = '#1d4ed8';
    let brandName = 'San Sebastián';

    if (user && user.country_theme) {
      primaryColor = user.country_theme.primaryColor || primaryColor;
      accentColor = user.country_theme.accentColor || accentColor;
      brandName = user.country_theme.brandName || brandName;
    }

    setTheme({ primaryColor, accentColor, brandName });

    // Inyección dinámica de variables CSS personalizadas en la raíz del DOM
    const root = document.documentElement;
    root.style.setProperty('--nexrust-primary', primaryColor);
    root.style.setProperty('--nexrust-accent', accentColor);
  }, [user]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}