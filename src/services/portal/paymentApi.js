import apiClient from './apiClient';

/**
 * Payment API calls, split the same way KYC is (kycApi.js): `client*`/own
 * functions hit /api/client/orders/:id/payment/*, everything else hits
 * /api/orders/:id/payment/* (internal visibility/admin actions).
 */

// ---- Client (self-service) ----

export async function createOwnPaymentOrder(orderId) {
  const { data } = await apiClient.post(`/client/orders/${orderId}/payment/create`);
  return data.data;
}

export async function verifyOwnPayment(orderId, { razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
  const { data } = await apiClient.post(`/client/orders/${orderId}/payment/verify`, {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });
  return data.data;
}

export async function reportOwnPaymentFailure(orderId, razorpay_order_id, reason) {
  const { data } = await apiClient.post(`/client/orders/${orderId}/payment/failed`, { razorpay_order_id, reason });
  return data.data;
}

export async function getOwnPayment(orderId) {
  const { data } = await apiClient.get(`/client/orders/${orderId}/payment`);
  return data.data;
}

// ---- Internal (Super Admin / Admin) ----

export async function getOrderPayment(orderId) {
  const { data } = await apiClient.get(`/orders/${orderId}/payment`);
  return data.data;
}

export async function refundOrderPayment(orderId, reason) {
  const { data } = await apiClient.post(`/orders/${orderId}/payment/refund`, { reason });
  return data.data;
}
