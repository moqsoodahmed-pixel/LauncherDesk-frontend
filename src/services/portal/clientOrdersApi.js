import apiClient from './apiClient';

function toQueryString(params) {
  const usable = Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== null && v !== ''));
  return new URLSearchParams(usable).toString();
}

export async function getOwnOrders(params = {}) {
  const { data } = await apiClient.get(`/client/orders?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getOwnOrder(id) {
  const { data } = await apiClient.get(`/client/orders/${id}`);
  return data.data;
}

export async function createOwnOrder(serviceId, orderDetails) {
  const { data } = await apiClient.post('/client/orders', { serviceId, orderDetails });
  return data.data;
}

export async function getOwnOrderStatusHistory(id) {
  const { data } = await apiClient.get(`/client/orders/${id}/status-history`);
  return { items: data.data, meta: data.meta };
}

// Only allowed while the order is still CREATED / PAYMENT_PENDING /
// PAYMENT_CONFIRMED - see backend constants/orderStatus.js's
// CLIENT_CANCELLABLE_STATUSES. The backend is always the final authority.
export async function cancelOwnOrder(id, reason) {
  const { data } = await apiClient.patch(`/client/orders/${id}/cancel`, { reason });
  return data.data;
}
