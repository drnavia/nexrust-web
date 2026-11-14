/**
 * @file VisitorLogsView.jsx
 * @description Módulo de control de accesos y garita en tiempo real.
 * @location /nexrust-web/src/modules/visitor-logs/VisitorLogsView.jsx
 */

import React, { useState, useEffect } from 'react';
import SessionBar from '../../components/SessionBar';
import { visitorService } from './visitor.service';
import { ShieldCheck, ArrowLeft, LogIn, Truck, UserCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function VisitorLogsView() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    dni: '',
    first_name: '',
    last_name: '',
    visitor_type: 'guest',
    destination_lot: ''
  });
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await visitorService.getLogs();
      setLogs(data || []);
    } catch (err) {
      console.warn('Modo offline activado para garita.');
    } finally {
      setLoading(false);
    }
  };

  const handleEntry = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    try {
      await visitorService.registerEntry(form);
      setFeedback({ type: 'success', message: '¡Ingreso registrado y validado en garita!' });
      loadLogs();
      setForm({ dni: '', first_name: '', last_name: '', visitor_type: 'guest', destination_lot: '' });
    } catch (err) {
      setFeedback({ type: 'error', message: 'Error al registrar el ingreso.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      <SessionBar />
      <div className="flex-1 p-8 max-w-5xl mx-auto w-full">
        <div className="mb-6 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Portal</span>
          </a>
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Módulo Seguridad • Garita Principal
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center space-x-3">
            <ShieldCheck className="w-7 h-7 text-blue-400" />
            <span>Control de Ingreso y Registro de Visitas</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Registro oficial de ingresos y validación de credenciales para la guardia del country.
          </p>
        </div>

        {feedback.message && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center space-x-3 text-xs font-medium ${
            feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Formulario de Check-in */}
          <form onSubmit={handleEntry} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 md:col-span-1">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
              <LogIn className="w-4 h-4 text-blue-400" />
              <span>Nuevo Check-in en Garita</span>
            </h3>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">DNI del Visitante</label>
              <input type="text" value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Nombre</label>
              <input type="text" value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Apellido</label>
              <input type="text" value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Tipo de Ingreso</label>
              <select value={form.visitor_type} onChange={e => setForm({...form, visitor_type: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                <option value="guest">Visita / Invitado</option>
                <option value="provider">Prestador / Técnico</option>
                <option value="delivery">Delivery / Encomienda</option>
                <option value="taxi">Taxi / Remis</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Lote de Destino</label>
              <input type="text" value={form.destination_lot} onChange={e => setForm({...form, destination_lot: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" placeholder="Ej: Lote 45" required />
            </div>

            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-600/20 mt-2">
              Registrar Acceso
            </button>
          </form>

          {/* Historial de Garita */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl md:col-span-2">
            <h3 className="text-sm font-bold text-white mb-4">Últimos Ingresos Registrados</h3>
            {loading ? (
              <p className="text-xs text-slate-400">Cargando registros...</p>
            ) : logs.length === 0 ? (
              <p className="text-xs text-slate-500 py-8 text-center">No hay ingresos registrados en este turno.</p>
            ) : (
              <div className="space-y-3">
                {logs.map(l => (
                  <div key={l.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{l.first_name} {l.last_name}</h4>
                      <p className="text-[11px] text-blue-400 font-medium uppercase mt-0.5">Destino: {l.destination_lot} • DNI: {l.dni}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Ingreso: {new Date(l.entry_time).toLocaleTimeString()}</span>
                    </div>
                    <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{l.visitor_type}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}