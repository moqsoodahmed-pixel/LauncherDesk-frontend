import apiClient from './apiClient';

export async function listAnnouncements(params = {}) {
  const q = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''))).toString();
  const { data } = await apiClient.get(`/announcements${q ? `?${q}` : ''}`);
  return data.data;
}

export async function createAnnouncement(payload) {
  const { data } = await apiClient.post('/announcements', payload);
  return data.data;
}

export async function updateAnnouncement(id, payload) {
  const { data } = await apiClient.patch(`/announcements/${id}`, payload);
  return data.data;
}

export async function deleteAnnouncement(id) {
  await apiClient.delete(`/announcements/${id}`);
}
