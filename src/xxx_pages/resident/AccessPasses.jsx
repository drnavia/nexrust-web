/**
 * @file AccessPasses.jsx
 * @description Módulo de gestión y generación de pases QR para visitas y prestadores.
 * Permite visualizar los accesos creados y emitir nuevas autorizaciones temporales.
 * @location /nexrust-web/src/pages/resident/AccessPasses.jsx
 */

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { QrCode, Plus, Calendar, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AccessPasses() {
  // Estados para almacenar la lista de pases, estado de carga y control del modal
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para el formulario de nuevo pase
  const [formData, setFormData] = useState({
    providerName: '',
    destinationLot: 'Lote 42',
    destinationFraction: 'Fracción II',
    startDate: '',
    endDate: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  /**
   * Método para obtener los pases de acceso desde el backend.
   */
  const fetchPasses = async () => {
    try {
      setLoading(true);
      // Conexión con el endpoint del backend para listar pases del usuario
      // const response = await api.get('/access-passes');
      // setPasses(response.data);

      // Datos de ejemplo simulados basados en la base de datos PostgreSQL
      setPasses([
        {
          id: '2e074ea8-9851-42c4-9545-7e9fb3e094c9',
          provider_name: 'Carlos Gómez (Electricista)',
          destination_lot: 'Lote 42',
          start_date: '2026-11-12T08:00:00',
          end_date: '2026-11-12T18:00:00',
          status: 'pending',
          qr_token: 'a8da589e00d519699479ff4a3339c89c24e323e803600c3a586a105b6b9e0261'
        }
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar los pases de acceso:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasses();
  }, []);

  /**
   * Maneja el cambio de los inputs en el formulario de creación de pases.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Envía la solicitud para crear un nuevo pase de acceso con token QR.
   */
  const handleCreatePass = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      // Petición POST al backend para registrar el pase en la tabla access_passes
      // await api.post('/access-passes', formData);
      
      // Cerramos modal y recargamos la lista
      setIsModalOpen(false);
      fetchPasses();
      setSubmitting(false);
    } catch (error) {
      console.error('Error al crear el pase:', error);
      setFormError('No se pudo generar el pase. Verifique los datos e intente nuevamente.');
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      
      {/* Encabezado del Módulo */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Control de Pases y Visitas</h1>
          <p className="text-sm text-slate-500 mt-0.5">Autoriza ingresos temporales y genera códigos QR para la garita.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition flex items-center space-x-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Pase QR</span>
        </button>
      </div>

      {/* Listado de Pases */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : passes.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm">No tienes pases de acceso activos en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {passes.map((pass) => (
            <div key={pass.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                    {pass.destination_lot}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center space-x-1 ${
                    pass.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    <span>{pass.status.toUpperCase()}</span>
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800">{pass.provider_name}</h3>
                
                <div className="mt-4 space-y-2 text-xs text-slate-500">
                  <p className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Desde: {new Date(pass.start_date).toLocaleString()}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Hasta: {new Date(pass.end_date).toLocaleString()}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">
                  Token: {pass.qr_token.substring(0, 12)}...
                </span>
                <button
                  onClick={() => alert(`Mostrando código QR dinámico para el pase: ${pass.id}`)}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition flex items-center space-x-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Ver QR</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para Crear Nuevo Pase */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Autorizar Nuevo Ingreso</h3>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreatePass} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Nombre del Prestador / Visita
                </label>
                <input
                  type="text"
                  name="providerName"
                  required
                  value={formData.providerName}
                  onChange={handleInputChange}
                  placeholder="Ej: Juan Pérez (Piletero)"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Fecha y Hora Inicio
                  </label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Fecha y Hora Fin
                  </label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    required
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
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
                  <span>Generar Pase</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}