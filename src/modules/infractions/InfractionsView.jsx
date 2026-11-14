/**
 * @file InfractionsView.jsx
 * @description Vista modular para la supervisión y gestión de infracciones y multas del barrio.
 * @location /nexrust-web/src/modules/infractions/InfractionsView.jsx
 */

import React, { useState, useEffect } from 'react';
import { fetchInfractions, appealInfraction } from './infraction.service';
import { AlertOctagon, FileText, CheckCircle2, AlertTriangle, Loader2, ShieldAlert } from 'lucide-react';

export default function InfractionsView() {
  const [infractions, setInfractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const loadInfractions = async () => {
    try {
      setLoading(true);
      const data = await fetchInfractions();
      setInfractions(data);
    } catch (err) {
      console.error('Error al cargar infracciones:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInfractions();
  }, []);

  const handleAppeal = async (id) => {
    if (!window.confirm('¿Deseas enviar una apelación formal para esta infracción?')) return;
    
    setActionLoading(true);
    try {
      await appealInfraction(id);
      loadInfractions();
    } catch (err) {
      console.error('Error al apelar infracción:', err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Infracciones y Sanciones</h1>
          <p className="text-sm text-slate-500 mt-0.5">Control de actas por velocidad, estacionamiento y normas de convivencia.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : infractions.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm">No hay infracciones registradas para tu lote.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infractions.map((infraction) => (
            <div key={infraction.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold px-3 py-1 bg-rose-50 text-rose-700 rounded-full">
                    {infraction.infraction_type}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    infraction.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                    infraction.status === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {infraction.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800">Lote: {infraction.destination_lot}</h3>
                {infraction.license_plate && (
                  <p className="text-xs font-mono text-slate-500 mt-1">Patente involucrada: {infraction.license_plate}</p>
                )}

                <p className="text-xs text-slate-600 mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {infraction.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Severidad: {infraction.severity}
                </span>
                {infraction.status === 'pending' && (
                  <button
                    onClick={() => handleAppeal(infraction.id)}
                    disabled={actionLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-xl transition"
                  >
                    Apelar Sanción
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}