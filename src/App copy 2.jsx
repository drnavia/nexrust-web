/**
 * @file App.jsx
 * @description Enrutador principal de Nexrust Web con arquitectura modular estandarizada, 
 * barra de sesión global, proveedores de contexto y diseño UX optimizado.
 * @location /nexrust-web/src/App.jsx
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ApiTest from './components/ApiTest';
import SessionBar from './components/SessionBar';

// Vistas importadas desde los módulos estándar (Arquitectura Espejo del Backend)
import LoginView from './modules/auth/LoginView';
import DashboardView from './modules/dashboard/DashboardView';
import AccessPassesView from './modules/access-passes/AccessPassesView';
import ExpensesView from './modules/expenses/ExpensesView';
import AmenitiesView from './modules/reservations/ReservationsView';
import SecurityAlertsView from './modules/notifications/NotificationsView';
import InfractionsView from './modules/infractions/InfractionsView';
import SuperAdminConfigView from './modules/superadmin/SuperAdminConfigView';

import { Shield, QrCode, FileText, AlertOctagon, LogIn, Settings, Calendar, Activity } from 'lucide-react';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Ruta raíz: Portal de Operaciones y Accesos Rápidos */}
            <Route
              path="/"
              element={
                <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
                  <SessionBar />
                  
                  <div className="flex-1 p-8 max-w-5xl mx-auto w-full flex flex-col justify-center">
                    {/* Encabezado Principal Institucional */}
                    <div className="text-center mb-8">
                      <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2 block">
                        Plataforma Hiperlocal de Gestión y Accesos
                      </span>
                      <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Portal de Operaciones
                      </h1>
                      <p className="text-xs text-slate-400 mt-1">
                        Comunidad San Sebastián • Corredor Ezeiza-Canning
                      </p>
                    </div>

                    {/* Estado del Sistema Backend (Diagnóstico de Conectividad) */}
                    <div className="mb-10 max-w-xl mx-auto w-full bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl text-center">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        Estado del Sistema Backend
                      </h3>
                      <ApiTest />
                    </div>

                    {/* Tarjetas de Accesos Rápidos (Grid UX Optimizada) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <a
                        href="/admin/dashboard"
                        className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl transition-all duration-200 flex flex-col items-center text-center group shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Shield className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-white">Dashboard</span>
                        <span className="text-[11px] text-slate-400 mt-0.5">Panel general</span>
                      </a>

                      <a
                        href="/admin/passes"
                        className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl transition-all duration-200 flex flex-col items-center text-center group shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <QrCode className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-white">Pases QR</span>
                        <span className="text-[11px] text-slate-400 mt-0.5">Visitas y accesos</span>
                      </a>

                      <a
                        href="/admin/expenses"
                        className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl transition-all duration-200 flex flex-col items-center text-center group shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <FileText className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-white">Expensas</span>
                        <span className="text-[11px] text-slate-400 mt-0.5">Pagos y comprobantes</span>
                      </a>

                      <a
                        href="/admin/infractions"
                        className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl transition-all duration-200 flex flex-col items-center text-center group shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <AlertOctagon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-white">Infracciones</span>
                        <span className="text-[11px] text-slate-400 mt-0.5">Multas y apelaciones</span>
                      </a>

                      <a
                        href="/admin/amenities"
                        className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl transition-all duration-200 flex flex-col items-center text-center group shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-white">Amenities</span>
                        <span className="text-[11px] text-slate-400 mt-0.5">Reservas de canchas</span>
                      </a>

                      <a
                        href="/admin/security-alerts"
                        className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl transition-all duration-200 flex flex-col items-center text-center group shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Activity className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-white">Alertas</span>
                        <span className="text-[11px] text-slate-400 mt-0.5">Botón de pánico</span>
                      </a>

                      <a
                        href="/admin/superadmin/config"
                        className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl transition-all duration-200 flex flex-col items-center text-center group shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Settings className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-white">Superadmin</span>
                        <span className="text-[11px] text-slate-400 mt-0.5">Marca blanca</span>
                      </a>

                      <a
                        href="/auth/login"
                        className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 p-5 rounded-2xl transition-all duration-200 flex flex-col items-center text-center group shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <LogIn className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-white">Ingresar</span>
                        <span className="text-[11px] text-blue-300 mt-0.5">Iniciar sesión JWT</span>
                      </a>
                    </div>
                  </div>
                </div>
              }
            />

            {/* Módulos Operativos de la Plataforma */}
            <Route path="/auth/login" element={<LoginView />} />
            <Route path="/admin/dashboard" element={<DashboardView />} />
            <Route path="/admin/passes" element={<AccessPassesView />} />
            <Route path="/admin/expenses" element={<ExpensesView />} />
            <Route path="/admin/amenities" element={<AmenitiesView />} />
            <Route path="/admin/security-alerts" element={<SecurityAlertsView />} />
            <Route path="/admin/infractions" element={<InfractionsView />} />
            <Route path="/admin/superadmin/config" element={<SuperAdminConfigView />} />

            {/* Redirección por defecto ante rutas inexistentes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}