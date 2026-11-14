/**
 * @file EventsView.jsx
 * @description Vista modular para la precarga de invitados y eventos sociales.
 * @location /nexrust-web/src/modules/events/EventsView.jsx
 */

import React, { useState, useEffect } from 'react';
import SessionBar from '../../components/SessionBar';
import { eventsService } from './events.service';
import { Calendar, Plus, Users, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function EventsView() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    event_name: '',
    destination_lot: '',
    start_date: '',
    end_date: ''
  });
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsService.getEvents();
      setEvents(data || []);
    } catch (err) {
      console.warn('Modo offline para eventos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    try {
      await eventsService.createEvent(form);
      setFeedback({ type: 'success', message: '¡Evento y lista de invitados registrados con éxito!' });
      loadEvents();
      setForm({ event_name: '', destination_lot: '', start_date: '', end_date: '' });
    } catch (err) {
      setFeedback({ type: 'error', message: 'Error al registrar el evento.' });
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
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Módulo Social • Eventos
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center space-x-3">
            <Calendar className="w-7 h-7 text-amber-400" />
            <span>Eventos Sociales e Invitados</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organiza reuniones o fiestas precargando invitados para agilizar el acceso en garita.
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
          {/* Formulario de Evento */}
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 md:col-span-1">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Programar Evento</span>
            </h3>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Nombre del Evento</label>
              <input type="text" value={form.event_name} onChange={e => setForm({...form, event_name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" placeholder="Ej: Cumpleaños de Sofía" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Lote / Ubicación</label>
              <input type="text" value={form.destination_lot} onChange={e => setForm({...form, destination_lot: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" placeholder="Ej: Lote 42" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Fecha y Hora de Inicio</label>
              <input type="datetime-local" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Fecha y Hora de Fin</label>
              <input type="datetime-local" value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" required />
            </div>

            <button type="submit" className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-amber-600/20 mt-2">
              Crear Evento y Accesos
            </button>
          </form>

          {/* Listado de Eventos */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl md:col-span-2">
            <h3 className="text-sm font-bold text-white mb-4">Mis Eventos Programados</h3>
            {loading ? (
              <p className="text-xs text-slate-400">Cargando eventos...</p>
            ) : events.length === 0 ? (
              <p className="text-xs text-slate-500 py-8 text-center">No hay eventos sociales programados.</p>
            ) : (
              <div className="space-y-3">
                {events.map(ev => (
                  <div key={ev.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{ev.event_name}</h4>
                      <p className="text-[11px] text-amber-400 font-medium uppercase mt-0.5">Ubicación: {ev.destination_lot}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Desde: {new Date(ev.start_date).toLocaleString()}</span>
                    </div>
                    <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Programado</span>
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