import apiClient from './apiClient';

export async function getMyPayments(params = {}) {
  const { data } = await apiClient.get('/client/payments', { params });
  return { items: data.data, meta: data.meta };
}
