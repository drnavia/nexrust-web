/**
 * @file AmenitiesView.jsx
 * @description Vista modular para la reserva de canchas y espacios comunes (Amenities).
 * @location /nexrust-web/src/modules/amenities/AmenitiesView.jsx
 */

import React, { useState, useEffect } from 'react';
import { fetchAmenities, fetchReservations, createReservation } from './amenity.service';
import { Calendar, Clock, Plus, CheckCircle2, AlertCircle, Loader2, Trophy } from 'lucide-react';

export default function AmenitiesView() {
  const [amenities, setAmenities] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    amenityId: '',
    startTime: '',
    endTime: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [amenitiesData, reservationsData] = await Promise.all([
        fetchAmenities(),
        fetchReservations()
      ]);
      setAmenities(amenitiesData);
      setReservations(reservationsData);
    } catch (err) {
      console.error('Error al cargar amenities y reservas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      await createReservation(formData);
      setIsModalOpen(false);
      setFormData({ amenityId: '', startTime: '', endTime: '' });
      loadData();
    } catch (err) {
      console.error('Error al crear reserva:', err);
      setFormError('No se pudo procesar la reserva. Verifique disponibilidad.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reserva de Amenities (Canchas y Deportes)</h1>
          <p className="text-sm text-slate-500 mt-0.5">Gestión de turnos para tenis, pádel y fútbol en el barrio[cite: 11].</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition flex items-center space-x-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Reserva</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Listado de instalaciones disponibles */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">Instalaciones Disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {amenities.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Tipo: {item.type}</p>
                    <span className="inline-block mt-2 text-[10px] font-semibold px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
                      Habilitada
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mis Reservas Activas */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">Mis Reservas Registradas</h2>
            {reservations.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-sm">No tienes reservas activas en este momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reservations.map((res) => (
                  <div key={res.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                          Turno Deportivo
                        </span>
                        <span className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          <span>{res.status.toUpperCase()}</span>
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">Cancha ID: {res.amenity_id.substring(0, 8)}...</h3>
                      <div className="mt-4 space-y-1 text-xs text-slate-500">
                        <p className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>Desde: {new Date(res.start_time).toLocaleString()}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span>Hasta: {new Date(res.end_time).toLocaleString()}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal para Nueva Reserva */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Reservar Cancha / Instalación</h3>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Seleccionar Instalación
                </label>
                <select
                  name="amenityId"
                  required
                  value={formData.amenityId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Selecciona una opción...</option>
                  {amenities.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Hora de Inicio
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  required
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Hora de Finalización
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  required
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl transition flex items-center space-x-2 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Confirmar Reserva</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}