/**
 * @file ProtectedRoute.jsx
 * @description Restringe el acceso a pantallas protegidas exigiendo autenticación previa.
 * @location /nexrust-web/src/components/ProtectedRoute.jsx
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Si no hay usuario logueado, redirige al login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}