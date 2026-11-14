/**
 * @file Login.jsx
 * @description Vista de Autenticación (Inicio de sesión) para Nexrust Web.
 * Conecta el formulario de acceso con el AuthContext y el backend para generar tokens JWT.
 * @location /nexrust-web/src/pages/auth/Login.jsx
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  // Estados locales para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para manejar errores visuales y estado de carga durante la petición
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks de navegación y contexto de autenticación
  const navigate = useNavigate();
  const { login } = useAuth();

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Valida los campos, ejecuta la función login del contexto y redirige al usuario.
   * 
   * @param {React.FormEvent} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validación básica previa
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      setIsSubmitting(false);
      return;
    }

    // Llamada al método login provisto por el AuthContext
    const result = await login(email, password);

    if (result.success) {
      // Redirección exitosa al panel general / dashboard
      navigate('/admin/dashboard');
    } else {
      // Muestra el mensaje de error devuelto por el servidor o contexto
      setError(result.message || 'Credenciales inválidas. Inténtalo nuevamente.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6">
      {/* Contenedor principal de la tarjeta de login */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8">
        
        {/* Encabezado visual */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Nexrust Web</h1>
          <p className="text-sm text-slate-500 mt-1">Plataforma Hiperlocal de Gestión y Accesos</p>
        </div>

        {/* Alerta de error si las credenciales fallan */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center space-x-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario de acceso */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Campo de Correo Electrónico */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@nexrust.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <span>Ingresar al Sistema</span>
            )}
          </button>
        </form>

        {/* Pie de tarjeta con información de soporte zonal */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Corredor Ezeiza - Canning (San Sebastián)[cite: 3, 5]
          </p>
        </div>

      </div>
    </div>
  );
}