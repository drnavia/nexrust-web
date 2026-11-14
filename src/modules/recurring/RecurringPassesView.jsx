/**
 * @file RecurringPassesView.jsx
 * @description Vista modular para la administración de personal habitual y accesos recurrentes.
 * @location /nexrust-web/src/modules/recurring/RecurringPassesView.jsx
 */

import React, { useState, useEffect } from 'react';
import SessionBar from '../../components/SessionBar';
import { recurringService } from './recurring.service';
import { Users, Plus, Calendar, Clock, Trash2, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RecurringPassesView() {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    staff_first_name: '',
    staff_last_name: '',
    staff_dni: '',
    staff_role: 'domestic',
    destination_lot: '',
    allowed_days: '1,3,5', // Lunes, Miércoles, Viernes
    start_time: '08:00',
    end_time: '17:00',
    valid_until: ''
  });
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    loadPasses();
  }, []);

  const loadPasses = async () => {
    try {
      setLoading(true);
      const data = await recurringService.getPasses();
      setPasses(data || []);
    } catch (err) {
      console.warn('Usando modo offline / sin conexión a backend para pases recurrentes.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    try {
      await recurringService.createPass(form);
      setFeedback({ type: 'success', message: '¡Pase recurrente registrado con éxito!' });
      loadPasses();
      setForm({
        staff_first_name: '',
        staff_last_name: '',
        staff_dni: '',
        staff_role: 'domestic',
        destination_lot: '',
        allowed_days: '1,3,5',
        start_time: '08:00',
        end_time: '17:00',
        valid_until: ''
      });
    } catch (err) {
      setFeedback({ type: 'error', message: 'Error al registrar el pase recurrente.' });
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
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Módulo Operativo • Staff Habitual
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center space-x-3">
            <Users className="w-7 h-7 text-emerald-400" />
            <span>Autorizaciones Recurrentes (Personal Habitual)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestiona el ingreso programado de personal de servicio, jardineros y profesionales de confianza.
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
          {/* Formulario de Alta */}
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 md:col-span-1">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Nuevo Registro de Staff</span>
            </h3>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Nombre</label>
              <input 
                type="text" value={form.staff_first_name} onChange={e => setForm({...form, staff_first_name: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none" required 
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Apellido</label>
              <input 
                type="text" value={form.staff_last_name} onChange={e => setForm({...form, staff_last_name: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none" required 
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">DNI</label>
              <input 
                type="text" value={form.staff_dni} onChange={e => setForm({...form, staff_dni: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none" required 
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Rol / Ocupación</label>
              <select 
                value={form.staff_role} onChange={e => setForm({...form, staff_role: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="domestic">Personal Doméstico</option>
                <option value="gardener">Jardinero / Paisajista</option>
                <option value="pool_service">Piletero</option>
                <option value="maintenance">Mantenimiento General</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Lote de Destino</label>
              <input 
                type="text" value={form.destination_lot} onChange={e => setForm({...form, destination_lot: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none" placeholder="Ej: Lote 42" required 
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Hora Inicio</label>
                <input type="time" value={form.start_time} onChange={e => setForm({...form, start_time: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-white" required />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Hora Fin</label>
                <input type="time" value={form.end_time} onChange={e => setForm({...form, end_time: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-white" required />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Válido Hasta</label>
              <input type="date" value={form.valid_until} onChange={e => setForm({...form, valid_until: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" required />
            </div>

            <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-600/20 mt-2">
              Autorizar Personal
            </button>
          </form>

          {/* Listado de Pases Activos */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl md:col-span-2">
            <h3 className="text-sm font-bold text-white mb-4">Personal Habitual Autorizado</h3>
            {loading ? (
              <p className="text-xs text-slate-400">Cargando autorizaciones...</p>
            ) : passes.length === 0 ? (
              <p className="text-xs text-slate-500 py-8 text-center">No hay pases recurrentes registrados actualmente.</p>
            ) : (
              <div className="space-y-3">
                {passes.map(p => (
                  <div key={p.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{p.staff_first_name} {p.staff_last_name}</h4>
                      <p className="text-[11px] text-emerald-400 font-medium uppercase mt-0.5">{p.staff_role} • DNI: {p.staff_dni}</p>
                      <div className="flex items-center space-x-4 text-[10px] text-slate-400 mt-2">
                        <span className="flex items-center space-x-1"><Calendar className="w-3 h-3 text-slate-500" /><span>Hasta: {p.valid_until}</span></span>
                        <span className="flex items-center space-x-1"><Clock className="w-3 h-3 text-slate-500" /><span>{p.start_time} - {p.end_time}</span></span>
                      </div>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold">Activo</span>
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