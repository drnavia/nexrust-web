/**
 * @file SuperAdminConfigView.jsx
 * @description Panel exclusivo para superusuarios para configurar la marca blanca del country.
 * @location /nexrust-web/src/modules/superadmin/SuperAdminConfigView.jsx
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { superAdminService } from './superadmin.service';
import SessionBar from '../../components/SessionBar';
import { Settings, Palette, Building, Save, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function SuperAdminConfigView() {
  const { user } = useAuth();
  const [brandName, setBrandName] = useState('San Sebastián');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [accentColor, setAccentColor] = useState('#1d4ed8');
  const [logoUrl, setLogoUrl] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    // Si el usuario tiene un country configurado, cargamos sus valores
    if (user && user.country_id) {
      loadConfig(user.country_id);
    }
  }, [user]);

  const loadConfig = async (countryId) => {
    try {
      setLoading(true);
      const data = await superAdminService.getCountryConfig(countryId);
      if (data && data.theme_config) {
        setBrandName(data.theme_config.brandName || 'San Sebastián');
        setPrimaryColor(data.theme_config.primaryColor || '#2563eb');
        setAccentColor(data.theme_config.accentColor || '#1d4ed8');
        setLogoUrl(data.theme_config.logoUrl || '');
      }
    } catch (err) {
      console.warn('No se pudo cargar la configuración remota, usando valores por defecto.', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });

    const themeConfig = {
      brandName,
      primaryColor,
      accentColor,
      logoUrl
    };

    try {
      if (user && user.country_id) {
        await superAdminService.updateCountryConfig(user.country_id, themeConfig);
      }
      
      // Actualizamos dinámicamente las variables CSS globales de inmediato
      const root = document.documentElement;
      root.style.setProperty('--nexrust-primary', primaryColor);
      root.style.setProperty('--nexrust-accent', accentColor);

      setFeedback({ type: 'success', message: '¡Configuración de marca blanca guardada y aplicada con éxito!' });
    } catch (err) {
      setFeedback({ type: 'error', message: 'Error al guardar la configuración en el servidor.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      <SessionBar />

      <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
        {/* Navegación superior */}
        <div className="mb-6 flex items-center justify-between">
          <a href="/admin/dashboard" className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Dashboard</span>
          </a>
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Modo Superusuario
          </span>
        </div>

        {/* Título de la sección */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center space-x-3">
            <Settings className="w-7 h-7 text-blue-400" />
            <span>Gestión de Identidad y Marca Blanca</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Personaliza los parámetros visuales institucionales para este barrio sin tocar código fuente.
          </p>
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

        {/* Formulario de Configuración */}
        <form onSubmit={handleSave} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre del Barrio */}
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
                  placeholder="Ej: San Sebastián"
                  required
                />
              </div>
            </div>

            {/* URL del Logotipo */}
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
            {/* Color Primario */}
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

            {/* Color de Acento */}
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

          {/* Vista Previa en Tiempo Real */}
          <div className="pt-4 border-t border-slate-800">
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Vista Previa de Componentes Institucionales
            </span>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{brandName}</h4>
                <p className="text-[10px] text-slate-400">Plataforma Hiperlocal Nexrust</p>
              </div>
              <div className="flex space-x-3">
                <div 
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  Botón Primario
                </div>
                <div 
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: accentColor }}
                >
                  Botón Acento
                </div>
              </div>
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-lg shadow-blue-600/20 disabled:opacity-50"
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