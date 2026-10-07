import apiClient from './apiClient';

/** The client-facing service catalogue - ACTIVE + PUBLIC services only. */
export async function getClientServices(params = {}) {
  const { data } = await apiClient.get('/client/services', { params });
  return { items: data.data, meta: data.meta };
}

/** A single ACTIVE + PUBLIC service. 404s for inactive/archived/private ids. */
export async function getClientService(id) {
  const { data } = await apiClient.get(`/client/services/${id}`);
  return data.data;
}
