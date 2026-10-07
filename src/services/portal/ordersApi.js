import apiClient from './apiClient';

function toQueryString(params) {
  const usable = Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== null && v !== ''));
  return new URLSearchParams(usable).toString();
}

export async function getOrders(params = {}) {
  const { data } = await apiClient.get(`/orders?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getOrder(id) {
  const { data } = await apiClient.get(`/orders/${id}`);
  return data.data;
}

export async function createOrder(payload) {
  const { data } = await apiClient.post('/orders', payload);
  return data.data;
}

export async function updateOrder(id, changes) {
  const { data } = await apiClient.patch(`/orders/${id}`, changes);
  return data.data;
}

export async function updateOrderStatus(id, status, reason) {
  const { data } = await apiClient.patch(`/orders/${id}/status`, { status, reason });
  return data.data;
}

export async function cancelOrder(id, reason) {
  const { data } = await apiClient.patch(`/orders/${id}/cancel`, { reason });
  return data.data;
}

export async function closeOrder(id) {
  const { data } = await apiClient.patch(`/orders/${id}/close`);
  return data.data;
}

export async function devAdvanceOrderStatus(id, toStatus) {
  const { data } = await apiClient.patch(`/orders/${id}/dev-advance-status`, { toStatus });
  return data.data;
}

export async function updateOrderPaymentStatus(id, paymentStatus, reason) {
  const { data } = await apiClient.patch(`/orders/${id}/payment-status`, { paymentStatus, reason });
  return data.data;
}

export async function assignOrder(id, adminId, reason) {
  const { data } = await apiClient.patch(`/orders/${id}/assign`, { adminId, reason });
  return data.data;
}

export async function reassignOrder(id, adminId, reason) {
  const { data } = await apiClient.patch(`/orders/${id}/reassign`, { adminId, reason });
  return data.data;
}

export async function unassignOrder(id) {
  const { data } = await apiClient.delete(`/orders/${id}/assignment`);
  return data.data;
}

export async function getOrderStatusHistory(id, params = {}) {
  const { data } = await apiClient.get(`/orders/${id}/status-history?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getOrderAssignmentHistory(id, params = {}) {
  const { data } = await apiClient.get(`/orders/${id}/assignment-history?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getOrderActivity(id, params = {}) {
  const { data } = await apiClient.get(`/orders/${id}/activity?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

// Priority
export async function updateOrderPriority(id, priority) {
  const { data } = await apiClient.patch(`/orders/${id}/priority`, { priority });
  return data.data;
}

// Internal notes (staff only)
export async function getInternalNotes(orderId) {
  const { data } = await apiClient.get(`/orders/${orderId}/notes`);
  return data.data;
}
export async function createInternalNote(orderId, body) {
  const { data } = await apiClient.post(`/orders/${orderId}/notes`, { body });
  return data.data;
}
export async function updateInternalNote(orderId, noteId, body) {
  const { data } = await apiClient.patch(`/orders/${orderId}/notes/${noteId}`, { body });
  return data.data;
}
export async function deleteInternalNote(orderId, noteId) {
  await apiClient.delete(`/orders/${orderId}/notes/${noteId}`);
}

// Document requests (staff side)
export async function getDocRequests(orderId) {
  const { data } = await apiClient.get(`/orders/${orderId}/doc-requests`);
  return data.data;
}
export async function createDocRequest(orderId, payload) {
  const { data } = await apiClient.post(`/orders/${orderId}/doc-requests`, payload);
  return data.data;
}
export async function updateDocRequest(orderId, reqId, status) {
  const { data } = await apiClient.patch(`/orders/${orderId}/doc-requests/${reqId}`, { status });
  return data.data;
}

// Document requests (client side)
export async function getClientDocRequests(orderId) {
  const { data } = await apiClient.get(`/client/orders/${orderId}/doc-requests`);
  return data.data;
}
