import apiClient from './apiClient';

/**
 * Communications API calls, split the same way KYC/payment are
 * (kycApi.js / paymentApi.js): `getOwnOrderCommunications` hits the
 * client-safe /api/client/orders/:id/communications endpoint (no
 * recipient/provider/failure diagnostics), while `getOrderCommunications`
 * hits the internal /api/communications listing endpoint (gated server-side
 * on VIEW_NOTIFICATIONS), filtered down to a single order.
 */

// ---- Client (self-service) ----

export async function getOwnOrderCommunications(orderId) {
  const { data } = await apiClient.get(`/client/orders/${orderId}/communications`);
  return data.data;
}

// ---- Internal (Super Admin / Admin) ----

export async function getOrderCommunications(orderId, { page = 1, limit = 50 } = {}) {
  const { data } = await apiClient.get('/communications', {
    params: { order: orderId, page, limit },
  });
  return data;
}
