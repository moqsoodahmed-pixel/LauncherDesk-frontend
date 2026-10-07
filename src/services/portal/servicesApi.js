import apiClient from './apiClient';

function toQueryString(params) {
  const usable = Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== null && v !== ''));
  return new URLSearchParams(usable).toString();
}

export async function getServices(params = {}) {
  const { data } = await apiClient.get(`/services?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getService(id) {
  const { data } = await apiClient.get(`/services/${id}`);
  return data.data;
}

export async function createService(payload) {
  const { data } = await apiClient.post('/services', payload);
  return data.data;
}

export async function updateService(id, changes) {
  const { data } = await apiClient.patch(`/services/${id}`, changes);
  return data.data;
}

export async function updateServiceStatus(id, status) {
  const { data } = await apiClient.patch(`/services/${id}/status`, { status });
  return data.data;
}

export async function archiveService(id) {
  const { data } = await apiClient.delete(`/services/${id}`);
  return data.data;
}

export async function updateServiceForm(id, formSchema) {
  const { data } = await apiClient.patch(`/services/${id}/form-schema`, { formSchema });
  return data.data;
}

export async function updateRequiredDocuments(id, requiredDocuments) {
  const { data } = await apiClient.patch(`/services/${id}/documents`, { requiredDocuments });
  return data.data;
}

export async function getServiceActivity(id, params = {}) {
  const { data } = await apiClient.get(`/services/${id}/activity?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}
