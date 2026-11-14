/**
 * @file SuperAdminConfigView.jsx
 * @description Panel exclusivo para superusuarios para configurar la marca blanca del country con selector global.
 * @location /nexrust-web/src/modules/superadmin/SuperAdminConfigView.jsx
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { superAdminService } from './superadmin.service';
import SessionBar from '../../components/SessionBar';
import { Settings, Palette, Building, Save, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function SuperAdminConfigView() {
  const { user } = useAuth();
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  
  const [brandName, setBrandName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [accentColor, setAccentColor] = useState('#1d4ed8');
  const [logoUrl, setLogoUrl] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Cargar la lista de countries al iniciar la vista
  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      setLoading(true);
      const data = await superAdminService.getCountries();
      setCountries(data);
      
      // Si hay countries disponibles, seleccionamos el primero o el del usuario por defecto
      if (data && data.length > 0) {
        const initialId = user?.country_id || data[0].id;
        setSelectedCountryId(initialId);
        loadConfig(initialId);
      }
    } catch (err) {
      console.error('Error al cargar countries:', err);
      setFeedback({ type: 'error', message: 'No se pudo cargar la lista de countries desde el servidor.' });
    } finally {
      setLoading(false);
    }
  };

  const loadConfig = async (countryId) => {
    if (!countryId) return;
    try {
      setLoading(true);
      const data = await superAdminService.getCountryConfig(countryId);
      if (data && data.theme_config) {
        setBrandName(data.theme_config.brandName || data.name || '');
        setPrimaryColor(data.theme_config.primaryColor || '#2563eb');
        setAccentColor(data.theme_config.accentColor || '#1d4ed8');
        setLogoUrl(data.theme_config.logoUrl || '');
      } else if (data) {
        setBrandName(data.name || '');
      }
    } catch (err) {
      console.warn('No se pudo cargar la configuración para el country seleccionado.', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (e) => {
    const newId = e.target.value;
    setSelectedCountryId(newId);
    loadConfig(newId);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedCountryId) {
      setFeedback({ type: 'error', message: 'Debe seleccionar un Country válido para guardar.' });
      return;
    }

    setLoading(true);
    setFeedback({ type: '', message: '' });

    const themeConfig = {
      brandName,
      primaryColor,
      accentColor,
      logoUrl
    };

    try {
      await superAdminService.updateCountryConfig(selectedCountryId, themeConfig);
      
      const root = document.documentElement;
      root.style.setProperty('--nexrust-primary', primaryColor);
      root.style.setProperty('--nexrust-accent', accentColor);

      setFeedback({ type: 'success', message: '¡Configuración de marca blanca guardada y aplicada con éxito en la base de datos!' });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Error desconocido al guardar';
      setFeedback({ type: 'error', message: `Error al guardar: ${errorMsg}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <SessionBar />
      <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
        <div className="mb-6 flex items-center justify-between">
          <a href="/admin/dashboard" className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Dashboard</span>
          </a>
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Modo Superusuario (Superadmin)
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center space-x-3">
            <Settings className="w-7 h-7 text-blue-400" />
            <span>Gestión Global de Identidad y Marca Blanca</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure los parámetros visuales institucionales para cualquier barrio de la red sin tocar código fuente.
          </p>
        </div>

        {/* Selector Global de Country para el Superadmin */}
        <div className="mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Seleccionar Country / Barrio:</span>
          </div>
          <select 
            value={selectedCountryId}
            onChange={handleCountryChange}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition"
          >
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.zone || 'Sin zona'})
              </option>
            ))}
          </select>
        </div>

        {feedback.message && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center space-x-3 text-xs font-medium ${
            feedback.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Nombre de la Comunidad / Barrio
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                URL del Logotipo Institucional
              </label>
              <input 
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition"
                placeholder="https://ejemplo.com/logo.png"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-2">
                <Palette className="w-4 h-4 text-blue-400" />
                <span>Color Primario (Hexadecimal)</span>
              </label>
              <div className="flex items-center space-x-3">
                <input 
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-10 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
                />
                <input 
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-2">
                <Palette className="w-4 h-4 text-indigo-400" />
                <span>Color de Acento (Hexadecimal)</span>
              </label>
              <div className="flex items-center space-x-3">
                <input 
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-12 h-10 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
                />
                <input 
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading || !selectedCountryId}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-lg disabled:opacity-50"
              style={{ backgroundColor: primaryColor }}
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Guardando...' : 'Guardar Cambios de Marca'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}