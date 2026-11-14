/**
 * @file SecurityAlertsView.jsx
 * @description Vista modular para el Botón de Pánico y Alertas de Seguridad Temprana.
 * @location /nexrust-web/src/modules/security-alerts/SecurityAlertsView.jsx
 */

import React, { useState, useEffect } from 'react';
import { fetchSecurityAlerts, createSecurityAlert } from './securityAlert.service';
import { AlertTriangle, ShieldAlert, Flame, Stethoscope, BellRing, CheckCircle2, Loader2, Radio } from 'lucide-react';

export default function SecurityAlertsView() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const data = await fetchSecurityAlerts();
      setAlerts(data);
    } catch (err) {
      console.error('Error al cargar alertas de seguridad:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handlePanicButton = async (alertType) => {
    if (!window.confirm(`¿Estás seguro de emitir una alerta de emergencia por tipo: ${alertType.toUpperCase()}? Esto notificará a la garita de inmediato.`)) {
      return;
    }

    setSubmitting(true);
    setFeedback('');

    try {
      await createSecurityAlert({
        alertType,
        description: `Alerta de emergencia emitida desde el panel web (${alertType})`,
        destinationLot: 'Lote 42',
        destinationFraction: 'Fracción II'
      });
      setFeedback('¡Alerta emitida exitosamente! Seguridad ha sido notificada.');
      loadAlerts();
    } catch (err) {
      console.error('Error al emitir alerta:', err);
      setFeedback('Error al emitir la alerta. Intente nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Centro de Alertas y Botón de Pánico</h1>
          <p className="text-sm text-slate-500 mt-0.5">Comunicación directa e inmediata con la garita de seguridad del country.</p>
        </div>
      </div>

      {feedback && (
        <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-sm flex items-center space-x-3">
          <Radio className="w-5 h-5 animate-pulse text-blue-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Botones de Pánico de Emergencia */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <span>Botones de Emergencia Inmediata</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <button
            onClick={() => handlePanicButton('security')}
            disabled={submitting}
            className="p-4 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-2xl border border-rose-200 transition flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <ShieldAlert className="w-8 h-8 group-hover:scale-110 transition" />
            <span className="text-xs font-bold uppercase tracking-wider">Seguridad</span>
          </button>

          <button
            onClick={() => handlePanicButton('medical')}
            disabled={submitting}
            className="p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-2xl border border-blue-200 transition flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <Stethoscope className="w-8 h-8 group-hover:scale-110 transition" />
            <span className="text-xs font-bold uppercase tracking-wider">Médica</span>
          </button>

          <button
            onClick={() => handlePanicButton('fire')}
            disabled={submitting}
            className="p-4 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-2xl border border-amber-200 transition flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <Flame className="w-8 h-8 group-hover:scale-110 transition" />
            <span className="text-xs font-bold uppercase tracking-wider">Incendio</span>
          </button>

          <button
            onClick={() => handlePanicButton('perimeter')}
            disabled={submitting}
            className="p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-2xl border border-purple-200 transition flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <AlertTriangle className="w-8 h-8 group-hover:scale-110 transition" />
            <span className="text-xs font-bold uppercase tracking-wider">Perímetro</span>
          </button>

          <button
            onClick={() => handlePanicButton('neighbor_alarm')}
            disabled={submitting}
            className="p-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-2xl border border-emerald-200 transition flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <BellRing className="w-8 h-8 group-hover:scale-110 transition" />
            <span className="text-xs font-bold uppercase tracking-wider">Alarma Vecina</span>
          </button>
        </div>
      </div>

      {/* Historial de Alertas */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Historial de Alertas Registradas</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : alerts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm">No hay alertas de seguridad registradas recientemente.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full uppercase">
                      Tipo: {alert.alert_type}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      alert.status === 'active' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {alert.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-md font-bold text-slate-800">{alert.destination_lot} ({alert.destination_fraction || 'General'})</h3>
                  <p className="text-xs text-slate-500 mt-2">{alert.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                  Emitida el: {new Date(alert.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}