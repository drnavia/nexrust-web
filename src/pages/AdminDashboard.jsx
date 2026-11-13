// ==========================================
// ARCHIVO: src/pages/AdminDashboard.jsx
// DESCRIPCIÓN: Panel de Administración moderno conectado al Backend de Nexrust
// ==========================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    visitorsToday: 0,
    activeProviders: 0,
    expensesSynced: "94%",
    activeAlerts: 0
  });
  const navigate = useNavigate();

  // 1. Verificación de sesión y carga de estadísticas reales al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(storedUser));

    // Petición fetch al endpoint del backend que acabamos de crear
    fetch('http://localhost:4000/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch((err) => console.error("Error al conectar con la API:", err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* BARRA LATERAL */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/30">
            N
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">Nexrust</h1>
            <p className="text-xs text-blue-400">Panel Admin</p>
          </div>
        </div>

        <nav className="mt-8 flex flex-col gap-2 flex-1">
          <a href="#" className="flex items-center gap-3 rounded-xl bg-blue-600/10 px-4 py-3 text-sm font-semibold text-blue-400">
            📊 Dashboard General
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition">
            🛡️ Garita & Accesos
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition">
            👥 Prestadores Verificados
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition">
            💳 Módulo Expensas
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition">
            🚨 Alertas de Pánico
          </a>
        </nav>

        <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-xs font-semibold text-white">
            {user ? `${user.first_name} ${user.last_name}` : 'Administrador'}
          </p>
          <p className="text-[10px] text-slate-400">Plataforma Global</p>
          <button
            onClick={handleLogout}
            className="mt-3 w-full rounded-xl bg-red-500/10 py-2 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white">Resumen Operativo del Barrio</h2>
            <p className="text-sm text-slate-400 mt-1">Monitoreo en tiempo real de accesos, seguridad y servicios integrados.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistema en Línea
            </span>
          </div>
        </div>

        {/* TARJETAS DE MÉTRICAS DINÁMICAS (Conectadas a PostgreSQL)[cite: 3, 4] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          
          <div className="rounded-3xl border border-blue-500/20 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Ingresos Hoy</span>
              <span className="text-sm">🚗</span>
            </div>
            <p className="text-4xl font-black text-white mt-4">{stats.visitorsToday}</p>
            <p className="text-xs text-slate-400 mt-1">Vehículos validados en garita</p>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Prestadores Activos</span>
              <span className="text-sm">🛠️</span>
            </div>
            <p className="text-4xl font-black text-white mt-4">{stats.activeProviders}</p>
            <p className="text-xs text-slate-400 mt-1">Con antecedentes verificados</p>
          </div>

          <div className="rounded-3xl border border-purple-500/20 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Expensas Al Día</span>
              <span className="text-sm">💳</span>
            </div>
            <p className="text-4xl font-black text-white mt-4">{stats.expensesSynced}</p>
            <p className="text-xs text-slate-400 mt-1">Periodo actual sincronizado</p>
          </div>

          <div className="rounded-3xl border border-amber-500/20 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Alertas de Pánico</span>
              <span className="text-sm">🚨</span>
            </div>
            <p className="text-4xl font-black text-white mt-4">{stats.activeAlerts}</p>
            <p className="text-xs text-slate-400 mt-1">Sin incidencias críticas activas</p>
          </div>

        </div>

      </main>
    </div>
  );
}