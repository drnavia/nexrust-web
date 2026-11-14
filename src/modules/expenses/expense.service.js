/**
 * @file expense.service.js
 * @description Servicios de comunicación HTTP para el módulo de Expensas y Pagos.
 * @location /nexrust-web/src/modules/expenses/expense.service.js
 */

import api from '../../services/api';

/**
 * Obtiene la lista de expensas asociadas al country y lote.
 * @returns {Promise<Array>} Lista de registros de expensas
 */
export async function fetchExpenses() {
  const response = await api.get('/expenses');
  return response.data;
}

/**
 * Sube o reporta el comprobante de pago de una expensa específica.
 * @param {string} expenseId - ID UUID de la expensa
 * @param {string} paymentProof - Texto o referencia del comprobante
 * @returns {Promise<Object>} Expensa actualizada
 */
export async function uploadPaymentProof(expenseId, paymentProof) {
  const response = await api.put(`/expenses/${expenseId}/proof`, { payment_proof: paymentProof });
  return response.data;
}