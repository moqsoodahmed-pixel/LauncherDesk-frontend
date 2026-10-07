import apiClient from './apiClient';

export async function getSettings() {
  const { data } = await apiClient.get('/settings');
  return data.data;
}

export async function updateSetting(key, value) {
  const { data } = await apiClient.put(`/settings/${key}`, { value });
  return data.data;
}
