import apiClient from './apiClient';

// Client-facing
export async function listMyTickets(params = {}) {
  const { data } = await apiClient.get('/support/my/tickets', { params });
  return data.data;
}

export async function createTicket(payload) {
  const { data } = await apiClient.post('/support/my/tickets', payload);
  return data.data;
}

export async function getMyTicket(id) {
  const { data } = await apiClient.get(`/support/my/tickets/${id}`);
  return data.data;
}

export async function replyToMyTicket(id, body) {
  const { data } = await apiClient.post(`/support/my/tickets/${id}/reply`, { body });
  return data.data;
}

// Admin-facing
export async function listAdminTickets(params = {}) {
  const { data } = await apiClient.get('/support/admin/tickets', { params });
  return data.data;
}

export async function getAdminTicketStats() {
  const { data } = await apiClient.get('/support/admin/tickets/stats');
  return data.data;
}

export async function getAdminTicket(id) {
  const { data } = await apiClient.get(`/support/admin/tickets/${id}`);
  return data.data;
}

export async function replyAsAdmin(id, body) {
  const { data } = await apiClient.post(`/support/admin/tickets/${id}/reply`, { body });
  return data.data;
}

export async function updateTicket(id, payload) {
  const { data } = await apiClient.patch(`/support/admin/tickets/${id}`, payload);
  return data.data;
}
