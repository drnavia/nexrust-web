// ==========================================
// ARCHIVO: src/App.jsx
// DESCRIPCIÓN: Enrutador principal de la aplicación web de Nexrust.
// ==========================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importamos las pantallas
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
        <Routes>
          {/* Ruta del Login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta del Panel de Administración */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Redirección por defecto al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}