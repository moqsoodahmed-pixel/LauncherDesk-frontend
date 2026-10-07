import apiClient from './apiClient';

function toQueryString(params) {
  const usable = Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== null && v !== ''));
  return new URLSearchParams(usable).toString();
}

export async function getClients(params = {}) {
  const { data } = await apiClient.get(`/clients?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getClient(id) {
  const { data } = await apiClient.get(`/clients/${id}`);
  return data.data;
}

export async function createClient(payload) {
  const { data } = await apiClient.post('/clients', payload);
  return data.data;
}

export async function updateClient(id, changes) {
  const { data } = await apiClient.patch(`/clients/${id}`, changes);
  return data.data;
}

export async function updateClientStatus(id, status, reason) {
  const { data } = await apiClient.patch(`/clients/${id}/status`, { status, reason });
  return data.data;
}

export async function archiveClient(id, reason) {
  const { data } = await apiClient.delete(`/clients/${id}`, { data: { reason } });
  return data.data;
}

export async function assignClientToAdmin(id, adminId, reason) {
  const { data } = await apiClient.post(`/clients/${id}/assign`, { adminId, reason });
  return data.data;
}

export async function reassignClientToAdmin(id, adminId, reason) {
  const { data } = await apiClient.post(`/clients/${id}/reassign`, { adminId, reason });
  return data.data;
}

export async function unassignClient(id) {
  const { data } = await apiClient.delete(`/clients/${id}/assignment`);
  return data.data;
}

export async function getClientAssignmentHistory(id, params = {}) {
  const { data } = await apiClient.get(`/clients/${id}/assignment-history?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getClientActivity(id, params = {}) {
  const { data } = await apiClient.get(`/clients/${id}/activity?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getOwnClientProfile() {
  const { data } = await apiClient.get('/client/profile');
  return data.data;
}

export async function updateOwnClientProfile(changes) {
  const { data } = await apiClient.patch('/client/profile', changes);
  return data.data;
}
