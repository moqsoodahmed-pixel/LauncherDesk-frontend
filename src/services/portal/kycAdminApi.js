import apiClient from './apiClient';

function toQuery(params) {
  return new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''))
  ).toString();
}

export async function listKycDocuments(params = {}) {
  const { data } = await apiClient.get(`/kyc?${toQuery(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getKycStats() {
  const { data } = await apiClient.get('/kyc/stats');
  return data.data;
}
