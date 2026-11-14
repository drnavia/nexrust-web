/**
 * @file SessionBar.jsx
 * @description Indicador global de sesión activa o estado de visitante.
 * @location /nexrust-web/src/components/SessionBar.jsx
 */

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogIn, LogOut } from 'lucide-react';

export default function SessionBar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-full bg-slate-900 text-slate-200 px-6 py-2.5 flex justify-between items-center text-xs shadow-md border-b border-slate-800">
      <div className="flex items-center space-x-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold tracking-wide text-slate-400">NEXRUST WEB</span>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>
                Conectado como: <strong className="text-white">{user.first_name} {user.last_name}</strong> 
                <span className="text-slate-400"> ({user.role || 'Residente'} • {user.lot_number || 'S/L'} {user.fraction ? `- ${user.fraction}` : ''})</span>
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-red-400 hover:text-red-300 font-medium transition px-2 py-1 rounded hover:bg-slate-800"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700">
              Estado: <strong className="text-amber-400">Visitante</strong>
            </span>
            <a
              href="/auth/login"
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg font-medium transition shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Iniciar Sesión</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}