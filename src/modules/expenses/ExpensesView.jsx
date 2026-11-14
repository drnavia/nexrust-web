/**
 * @file ExpensesView.jsx
 * @description Vista del módulo de expensas y liquidaciones del country.
 * @location /nexrust-web/src/modules/expenses/ExpensesView.jsx
 */

import React, { useState, useEffect } from 'react';
import { fetchExpenses, uploadPaymentProof } from './expense.service';
import { FileText, DollarSign, Calendar, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ExpensesView() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [proofText, setProofText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (err) {
      console.error('Error al cargar expensas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleProofSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExpense || !proofText) return;

    setSubmitting(true);
    setError('');

    try {
      await uploadPaymentProof(selectedExpense.id, proofText);
      setSelectedExpense(null);
      setProofText('');
      loadExpenses();
    } catch (err) {
      console.error('Error al subir comprobante:', err);
      setError('No se pudo procesar el comprobante. Intente nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Expensas y Liquidaciones</h1>
          <p className="text-sm text-slate-500 mt-0.5">Consulta de estados de cuenta y carga de comprobantes de pago.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : expenses.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm">No hay expensas registradas para este lote.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expenses.map((exp) => (
            <div key={exp.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                    Período: {exp.period}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center space-x-1 ${
                    exp.status === 'paid' ? 'bg-emerald-50 text-emerald-700' :
                    exp.status === 'under_review' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    <span>{exp.status ? exp.status.toUpperCase() : 'PENDING'}</span>
                  </span>
                </div>

                <div className="my-3">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Monto Total</p>
                  <h3 className="text-2xl font-extrabold text-slate-900">$ {Number(exp.amount).toLocaleString()} ARS</h3>
                </div>

                <div className="space-y-1 text-xs text-slate-500 mt-4">
                  <p>Lote: <strong className="text-slate-700">{exp.destination_lot}</strong> {exp.destination_fraction ? `(${exp.destination_fraction})` : ''}</p>
                  <p>Vencimiento: <strong className="text-slate-700">{new Date(exp.due_date).toLocaleDateString()}</strong></p>
                  {exp.payment_proof && (
                    <p className="text-blue-600 font-medium mt-2">Comprobante: {exp.payment_proof}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                {exp.status === 'pending' && (
                  <button
                    onClick={() => setSelectedExpense(exp)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-xl transition flex items-center space-x-1.5"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Cargar Comprobante</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para Carga de Comprobante */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Cargar Comprobante de Pago</h3>
            <p className="text-xs text-slate-500 mb-4">Período: {selectedExpense.period} - Monto: ${selectedExpense.amount}</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleProofSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Detalle de Transferencia / Referencia
                </label>
                <input
                  type="text"
                  required
                  value={proofText}
                  onChange={(e) => setProofText(e.target.value)}
                  placeholder="Ej: Transferencia Banco Macro #12345678"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedExpense(null)}
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
                  <span>Enviar Comprobante</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}