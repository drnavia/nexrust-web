/**
 * @file App.jsx
 * @description Enrutador principal de Nexrust Web con arquitectura modular espejo completa
 * y cuadrícula unificada de accesos rápidos.
 * @location /nexrust-web/src/App.jsx
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ApiTest from './components/ApiTest';
import SessionBar from './components/SessionBar';
import ProtectedRoute from './components/ProtectedRoute';

// Vistas importadas desde los módulos estándar espejo
import LoginView from './modules/auth/LoginView';
import DashboardView from './modules/dashboard/DashboardView';
import AccessPassesView from './modules/access-passes/AccessPassesView';
import RecurringPassesView from './modules/recurring-passes/RecurringPassesView';
import ReservationsView from './modules/reservations/ReservationsView';
import NotificationsView from './modules/notifications/NotificationsView';
import InfractionsView from './modules/infractions/InfractionsView';
import ExpensesView from './modules/expenses/ExpensesView';
import VisitorLogsView from './modules/visitor-logs/VisitorLogsView';
import EventsView from './modules/events/EventsView';
import TicketsView from './modules/tickets/TicketsView';
import SuperAdminConfigView from './modules/superadmin/SuperAdminConfigView';

import { 
  Shield, QrCode, Users, Trophy, Bell, AlertOctagon, 
  FileText, ShieldCheck, Calendar, Wrench, Settings, LogIn 
} from 'lucide-react';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Ruta raíz: Portal de Operaciones con la Cuadrícula Completa de Módulos */}
            <Route
              path="/"
              element={
                <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-blue-500 selection:text-white">
                  <SessionBar />
                  <div className="flex-1 p-8 max-w-6xl mx-auto w-full flex flex-col justify-center">
                    
                    {/* Encabezado Institucional */}
                    <div className="text-center mb-6">
                      <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1 block">
                        Plataforma Hiperlocal de Gestión y Accesos
                      </span>
                      <h1 className="text-2xl font-extrabold text-white tracking-tight">
                        Portal de Operaciones
                      </h1>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Comunidad San Sebastián • Corredor Ezeiza-Canning
                      </p>
                    </div>

                    {/* Estado del Sistema Backend */}
                    <div className="mb-8 max-w-md mx-auto w-full bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-xl text-center">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Estado del Sistema Backend
                      </h3>
                      <ApiTest />
                    </div>

                    {/* Cuadrícula Completa de Accesos Rápidos (Espejo Backend) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      
                      <a href="/admin/dashboard" className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <Shield className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Dashboard</span>
                        <span className="text-[10px] text-slate-400">Panel general</span>
                      </a>

                      <a href="/admin/access-passes" className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <QrCode className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Pases QR</span>
                        <span className="text-[10px] text-slate-400">Visitas temporales</span>
                      </a>

                      <a href="/admin/recurring-passes" className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <Users className="w-5 h-5 text-teal-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Personal Habitual</span>
                        <span className="text-[10px] text-slate-400">Pases recurrentes</span>
                      </a>

                      <a href="/admin/reservations" className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <Trophy className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Amenities</span>
                        <span className="text-[10px] text-slate-400">Canchas y SUM</span>
                      </a>

                      <a href="/admin/notifications" className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <Bell className="w-5 h-5 text-yellow-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Notificaciones</span>
                        <span className="text-[10px] text-slate-400">Avisos y alarmas</span>
                      </a>

                      <a href="/admin/infractions" className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <AlertOctagon className="w-5 h-5 text-rose-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Infracciones</span>
                        <span className="text-[10px] text-slate-400">Multas y actas</span>
                      </a>

                      <a href="/admin/expenses" className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <FileText className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Expensas</span>
                        <span className="text-[10px] text-slate-400">Pagos y cuentas</span>
                      </a>

                      <a href="/admin/visitor-logs" className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <ShieldCheck className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Control Garita</span>
                        <span className="text-[10px] text-slate-400">Ingresos y egresos</span>
                      </a>

                      <a href="/admin/events" className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <Calendar className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Eventos</span>
                        <span className="text-[10px] text-slate-400">Listas de invitados</span>
                      </a>

                      <a href="/admin/tickets" className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <Wrench className="w-5 h-5 text-orange-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Ticketera</span>
                        <span className="text-[10px] text-slate-400">Reclamos y obras</span>
                      </a>

                      <a href="/admin/superadmin/config" className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <Settings className="w-5 h-5 text-fuchsia-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Superadmin</span>
                        <span className="text-[10px] text-slate-400">Marca blanca</span>
                      </a>

                      <a href="/auth/login" className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 p-4 rounded-2xl transition flex flex-col items-center text-center group">
                        <LogIn className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-white">Iniciar Sesión</span>
                        <span className="text-[10px] text-blue-300">Acceso seguro</span>
                      </a>

                    </div>

                  </div>
                </div>
              }
            />

            {/* Rutas Públicas */}
            <Route path="/auth/login" element={<LoginView />} />

            {/* Rutas Operativas Protegidas (Espejo Modular) */}
            <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardView /></ProtectedRoute>} />
            <Route path="/admin/access-passes" element={<ProtectedRoute><AccessPassesView /></ProtectedRoute>} />
            <Route path="/admin/recurring-passes" element={<ProtectedRoute><RecurringPassesView /></ProtectedRoute>} />
            <Route path="/admin/reservations" element={<ProtectedRoute><ReservationsView /></ProtectedRoute>} />
            <Route path="/admin/notifications" element={<ProtectedRoute><NotificationsView /></ProtectedRoute>} />
            <Route path="/admin/infractions" element={<ProtectedRoute><InfractionsView /></ProtectedRoute>} />
            <Route path="/admin/expenses" element={<ProtectedRoute><ExpensesView /></ProtectedRoute>} />
            <Route path="/admin/visitor-logs" element={<ProtectedRoute><VisitorLogsView /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute><EventsView /></ProtectedRoute>} />
            <Route path="/admin/tickets" element={<ProtectedRoute><TicketsView /></ProtectedRoute>} />

            {/* Panel de Superadmin (Restringido por rol) */}
            <Route 
              path="/admin/superadmin/config" 
              element={
                <ProtectedRoute requiredRole="superadmin">
                  <SuperAdminConfigView />
                </ProtectedRoute>
              } 
            />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}