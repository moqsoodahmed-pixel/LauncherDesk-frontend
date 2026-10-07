import apiClient from './apiClient';

function toQueryString(params) {
  const usable = Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== null && v !== ''));
  return new URLSearchParams(usable).toString();
}

export async function getAdmins(params = {}) {
  const { data } = await apiClient.get(`/admins?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getAdmin(id) {
  const { data } = await apiClient.get(`/admins/${id}`);
  return data.data;
}

export async function createAdmin(payload) {
  const { data } = await apiClient.post('/admins', payload);
  return data.data;
}

export async function updateAdmin(id, changes) {
  const { data } = await apiClient.patch(`/admins/${id}`, changes);
  return data.data;
}

export async function updateAdminStatus(id, status) {
  const { data } = await apiClient.patch(`/admins/${id}/status`, { status });
  return data.data;
}

export async function getAdminPermissions(id) {
  const { data } = await apiClient.get(`/admins/${id}/permissions`);
  return data.data;
}

export async function updateAdminPermissions(id, permissions) {
  const { data } = await apiClient.patch(`/admins/${id}/permissions`, { permissions });
  return data.data;
}

export async function updateAdminScope(id, dataScope) {
  const { data } = await apiClient.patch(`/admins/${id}/scope`, { dataScope });
  return data.data;
}

export async function resetAdminPassword(id, body) {
  const { data } = await apiClient.post(`/admins/${id}/reset-password`, body);
  return data;
}

export async function getAdminSessions(id) {
  const { data } = await apiClient.get(`/admins/${id}/sessions`);
  return data.data;
}

export async function revokeAdminSessions(id) {
  const { data } = await apiClient.post(`/admins/${id}/revoke-sessions`);
  return data;
}

export async function getAdminActivity(id, params = {}) {
  const { data } = await apiClient.get(`/admins/${id}/activity?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getAdminClients(id, params = {}) {
  const { data } = await apiClient.get(`/admins/${id}/clients?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function assignClient(id, clientId) {
  const { data } = await apiClient.post(`/admins/${id}/clients`, { clientId });
  return data.data;
}

export async function bulkAssignClients(id, clientIds) {
  const { data } = await apiClient.post(`/admins/${id}/clients/bulk-assign`, { clientIds });
  return data.data;
}

export async function unassignClient(id, clientId) {
  const { data } = await apiClient.delete(`/admins/${id}/clients/${clientId}`);
  return data.data;
}

export async function getAdminStats(id) {
  const { data } = await apiClient.get(`/admins/${id}/stats`);
  return data.data;
}
