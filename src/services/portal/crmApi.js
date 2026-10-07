import apiClient from './apiClient';

function qs(params) {
  return new URLSearchParams(Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== null && v !== ''))).toString();
}

export async function getCrmClients(params = {}) {
  const { data } = await apiClient.get(`/crm/clients?${qs(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getCrmSegments() {
  const { data } = await apiClient.get('/crm/segments');
  return data.data;
}

export async function getAttentionItems() {
  const { data } = await apiClient.get('/attention');
  return data.data;
}

export async function getAttentionCount() {
  const { data } = await apiClient.get('/attention/count');
  return data.data;
}
