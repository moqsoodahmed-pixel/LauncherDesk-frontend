import apiClient from './apiClient';

function toQueryString(params) {
  const usable = Object.fromEntries(
    Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== null && v !== '')
  );
  return new URLSearchParams(usable).toString();
}

export async function listPayments(params = {}) {
  const { data } = await apiClient.get(`/payments?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function listClientPayments(clientId, params = {}) {
  const { data } = await apiClient.get(`/payments?${toQueryString({ ...params, clientId })}`);
  return { items: data.data, meta: data.meta };
}

export async function getPayment(id) {
  const { data } = await apiClient.get(`/payments/${id}`);
  return data.data;
}
