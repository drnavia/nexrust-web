// ==========================================
// ARCHIVO: src/pages/Login.jsx
// DESCRIPCIÓN: Pantalla de Login para autenticar residentes, administradores y personal de seguridad.
// ==========================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // Estados locales para almacenar lo que el usuario escribe en los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado para manejar mensajes de error en caso de que las credenciales fallen
  const [error, setError] = useState('');
  
  // Hook de React Router para redirigir de página al iniciar sesión con éxito
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // Previene que la página se recargue por defecto
    setError('');       // Limpiamos errores previos

    try {
      // Realizamos una petición HTTP POST a nuestro backend en Node.js (puerto 4000)
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Si el servidor responde con un error (ej. contraseña incorrecta)
      if (!response.ok) {
        throw new Error(data.error || 'Credenciales inválidas o error al iniciar sesión.');
      }

      // Éxito: Guardamos el token JWT y los datos del usuario en el almacenamiento local del navegador
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirigimos al usuario hacia su respectivo panel
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/resident/home'); // Próxima pantalla a desarrollar
      }

    } catch (err) {
      // Capturamos cualquier error de red o del servidor y lo mostramos en pantalla
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        
        {/* Cabecera visual */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Nexrust</h1>
          <p className="mt-2 text-sm text-slate-500">Gestión Inteligente para Barrios Privados</p>
        </div>

        {/* Caja de error condicional */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Formulario de acceso */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Contraseña
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button 
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Iniciar Sesión
          </button>
        </form>

      </div>
    </div>
  );
}