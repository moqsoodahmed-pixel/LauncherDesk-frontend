import apiClient from './apiClient';

export async function fetchSuperAdminDashboard() {
  const { data } = await apiClient.get('/dashboard/super-admin');
  return data.data;
}

export async function fetchAdminDashboard() {
  const { data } = await apiClient.get('/dashboard/admin');
  return data.data;
}

export async function fetchClientDashboard() {
  const { data } = await apiClient.get('/dashboard/client');
  return data.data;
}
