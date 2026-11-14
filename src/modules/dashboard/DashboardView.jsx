/**
 * @file DashboardView.jsx
 * @description Panel de control principal para la gestión hiperlocal en Nexrust Web.
 * Muestra las métricas del barrio y la información del usuario autenticado en tiempo real.
 * @location /nexrust-web/src/modules/dashboard/DashboardView.jsx
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Users, FileText, LogOut, PlusCircle, Calendar, UserCheck } from 'lucide-react';

export default function DashboardView() {
  const { user, logout } = useAuth();
  
  const [stats, setStats] = useState({
    passesCount: 3,
    expensesStatus: 'Al día',
    activeAlerts: 0
  });

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Barra lateral */}
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
          </nav>
        </div>

        {/* Sección inferior: Usuario Logueado y Botón de Salida */}
        <div className="p-6 border-t border-slate-800 space-y-4">
          {user && (
            <div className="flex items-center space-x-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
              <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                {user.first_name ? user.first_name.charAt(0) : 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-[10px] text-slate-400 truncate capitalize">
                  {user.role || 'Residente'} • {user.lot_number || 'Lote 42'}
                </p>
              </div>
            </div>
          )}

          <button 
            onClick={logout}
            className="flex items-center space-x-3 text-red-400 hover:text-red-300 text-sm font-medium transition w-full px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Panel de Control</h1>
            <p className="text-sm text-slate-500 mt-0.5">Gestión hiperlocal de accesos y servicios del barrio.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Indicador superior de sesión activa */}
            {user && (
              <div className="flex items-center space-x-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  {user.first_name ? user.first_name.charAt(0) : 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate capitalize">
                    {user.role || 'Residente'} 
                    {user.lot_number ? ` • ${user.lot_number}` : ''}
                    {user.fraction ? ` (${user.fraction})` : ''}
                  </p>
                </div>
              </div>
            )}
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border border-blue-100">
              San Sebastián (Ezeiza-Canning)
            </div>
          </div>
        </header>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pases Activos</p>
              <h3 className="text-3xl font-extrabold text-blue-600 mt-2">{stats.passesCount}</h3>
            </div>
            <p className="text-xs text-emerald-600 mt-4 font-medium">Sincronizados con garita principal</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estado de Expensas</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">{stats.expensesStatus}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-4">Período actual</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Alertas de Seguridad</p>
              <h3 className="text-3xl font-extrabold text-amber-600 mt-2">{stats.activeAlerts}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-4">Sin incidentes críticos reportados</p>
          </div>
        </div>
      </main>
    </div>
  );
}