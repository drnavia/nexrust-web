/**
 * @file TicketsView.jsx
 * @description Módulo de ticketera de mantenimiento y reclamos barriales.
 * @location /nexrust-web/src/modules/tickets/TicketsView.jsx
 */

import React, { useState, useEffect } from 'react';
import SessionBar from '../../components/SessionBar';
import { ticketsService } from './tickets.service';
import { Wrench, Plus, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function TicketsView() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    category: 'maintenance',
    priority: 'medium',
    description: ''
  });
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const data = await ticketsService.getTickets();
      setTickets(data || []);
    } catch (err) {
      console.warn('Modo offline para tickets.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    try {
      await ticketsService.createTicket(form);
      setFeedback({ type: 'success', message: '¡Reclamo enviado a la administración con éxito!' });
      loadTickets();
      setForm({ category: 'maintenance', priority: 'medium', description: '' });
    } catch (err) {
      setFeedback({ type: 'error', message: 'Error al enviar el reclamo.' });
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
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Módulo Servicios • Ticketera
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center space-x-3">
            <Wrench className="w-7 h-7 text-indigo-400" />
            <span>Reclamos y Mantenimiento (Ticketera)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Reporta incidencias en espacios comunes, luminarias o servicios de infraestructura.
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
          {/* Formulario de Ticket */}
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 md:col-span-1">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>Nuevo Reclamo</span>
            </h3>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Categoría</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                <option value="lighting">Luminaria / Alumbrado</option>
                <option value="maintenance">Mantenimiento General</option>
                <option value="security">Seguridad / Perímetro</option>
                <option value="water">Agua / Cloacas</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Prioridad</label>
              <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Descripción del Problema</label>
              <textarea rows="4" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" placeholder="Detalle la incidencia..." required />
            </div>

            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/20 mt-2">
              Enviar Reclamo
            </button>
          </form>

          {/* Listado de Tickets */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl md:col-span-2">
            <h3 className="text-sm font-bold text-white mb-4">Estado de Mis Reclamos</h3>
            {loading ? (
              <p className="text-xs text-slate-400">Cargando reclamos...</p>
            ) : tickets.length === 0 ? (
              <p className="text-xs text-slate-500 py-8 text-center">No hay reclamos activos en este momento.</p>
            ) : (
              <div className="space-y-3">
                {tickets.map(t => (
                  <div key={t.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase text-[11px] text-indigo-400">Categoría: {t.category}</h4>
                      <p className="text-xs text-slate-300 mt-1">{t.description}</p>
                      <span className="text-[10px] text-slate-500 mt-2 block">Creado: {new Date(t.created_at).toLocaleDateString()}</span>
                    </div>
                    <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{t.status}</span>
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