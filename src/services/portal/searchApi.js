import apiClient from './apiClient';

export async function universalSearch(q, { type = '', limit = 5 } = {}) {
  const { data } = await apiClient.get('/search', { params: { q, type, limit } });
  return data.data;
}
