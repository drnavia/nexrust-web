/**
 * @file ApiTest.jsx
 * @description Componente de diagnóstico y verificación de conectividad con el backend.
 * @location /nexrust-web/src/components/ApiTest.jsx
 */

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { CheckCircle2, AlertCircle, Loader2, RefreshCw } from 'lucide-react';

export default function ApiTest() {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('Verificando conexión con el servidor...');

  const checkConnection = async () => {
    setStatus('loading');
    setMessage('Comprobando enlace con el backend...');
    try {
      const response = await api.get('/health');
      setStatus('success');
      setMessage(response.data.message || 'Servidor en línea y operativo.');
    } catch (err) {
      console.error('Error de conexión:', err);
      setStatus('error');
      setMessage('No se pudo establecer comunicación con el servidor.');
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {status === 'loading' && (
        <div className="flex items-center space-x-2 text-slate-400 text-xs py-2">
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          <span>{message}</span>
        </div>
      )}

      {status === 'success' && (
        <div className="w-full flex flex-col items-center space-y-3">
          <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center justify-center space-x-2 text-emerald-400 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
          <button
            onClick={checkConnection}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition flex items-center space-x-2 border border-slate-700 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Verificar Estado</span>
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="w-full flex flex-col items-center space-y-3">
          <div className="w-full bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 flex items-center justify-center space-x-2 text-rose-400 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
          <button
            onClick={checkConnection}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl transition flex items-center space-x-2 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reintentar Conexión</span>
          </button>
        </div>
      )}
    </div>
  );
}