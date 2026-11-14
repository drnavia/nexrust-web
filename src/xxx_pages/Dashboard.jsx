/**
 * @file Dashboard.jsx
 * @description Panel de control principal de Nexrust Web para la gestión hiperlocal.
 * Muestra el estado de accesos, expensas y alertas del country.
 * @location /nexrust-web/src/pages/Dashboard.jsx
 */

import React, { useState, useEffect } from 'react';
import api from '../xxx_services/api';
import { Shield, Users, FileText, AlertTriangle, LogOut, PlusCircle, Calendar } from 'lucide-react';

export default function Dashboard() {
  // Estado para almacenar las métricas generales del dashboard
  const [stats, setStats] = useState({
    passesCount: 3,
    expensesStatus: 'Al día',
    activeAlerts: 0
  });
  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(true);

  /**
   * Método asíncrono para obtener un resumen de datos desde el backend de Nexrust.
   * (Preparado para conectar con endpoints específicos de estadísticas).
   */
  const fetchDashboardData = async () => {
    try {
      // Ejemplo de consumo a futuro: const response = await api.get('/dashboard/summary');
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar la información del dashboard:', error);
      setLoading(false);
    }
  };

  /**
   * Hook useEffect: Ejecuta la carga de datos al montar el componente.
   */
  useEffect(() => {
    fetchDashboardData();
  }, []);

  /**
   * Método para cerrar sesión de forma segura.
   * Elimina el token de autenticación del almacenamiento local y redirige al inicio.
   */
  const handleLogout = () => {
    localStorage.removeItem('nexrust_token');
    window.location.href = '/';
  };

  // Pantalla de carga mientras se obtienen los datos
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <p className="text-slate-500 font-medium animate-pulse">Cargando panel de control Nexrust...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* Barra lateral de navegación (Sidebar) */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between hidden md:flex shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-wider">NEXRUST</h2>
              <p className="text-xs text-slate-400">Ezeiza - Canning</p>
            </div>
          </div>
          
          <nav className="space-y-1.5">
            <a href="#dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium text-sm transition">
              <Shield className="w-4 h-4" />
              <span>Dashboard General</span>
            </a>
            <a href="#access" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300 text-sm transition">
              <Users className="w-4 h-4" />
              <span>Pases y Visitas (QR)</span>
            </a>
            <a href="#expenses" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300 text-sm transition">
              <FileText className="w-4 h-4" />
              <span>Expensas y Pagos</span>
            </a>
          </nav>
        </div>

        {/* Sección inferior con botón de salida */}
        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 text-red-400 hover:text-red-300 text-sm font-medium transition w-full px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenido principal de la vista */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Panel de Control</h1>
            <p className="text-sm text-slate-500 mt-0.5">Gestión hiperlocal de accesos y servicios del barrio.</p>
          </div>
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border border-blue-100">
            San Sebastián (Ezeiza-Canning)[cite: 3, 5]
          </div>
        </header>

        {/* Tarjetas de Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Métrica de Pases */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pases Activos</p>
              <h3 className="text-3xl font-extrabold text-blue-600 mt-2">{stats.passesCount}</h3>
            </div>
            <p className="text-xs text-emerald-600 mt-4 font-medium flex items-center space-x-1">
              <span>Sincronizados con garita principal</span>
            </p>
          </div>

          {/* Métrica de Expensas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estado de Expensas</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">{stats.expensesStatus}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-4">Período actual: Noviembre 2026[cite: 5]</p>
          </div>

          {/* Métrica de Alertas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Alertas de Seguridad</p>
              <h3 className="text-3xl font-extrabold text-amber-600 mt-2">{stats.activeAlerts}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-4">Sin incidentes críticos reportados</p>
          </div>

        </div>

        {/* Sección de Acciones Rápidas */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Acciones Rápidas</h3>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => alert('Abriendo formulario para autorizar nuevo pase QR...')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-3 rounded-xl transition flex items-center space-x-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Autorizar Visita / Prestador</span>
            </button>
            <button 
              onClick={() => alert('Redirigiendo al calendario de reservas de amenities...')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-5 py-3 rounded-xl transition flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Amenities (Canchas / SUM)</span>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}