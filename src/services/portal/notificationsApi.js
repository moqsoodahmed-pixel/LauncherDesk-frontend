import apiClient from './apiClient';

/**
 * Notifications API calls - thin wrapper around apiClient, same pattern
 * as kycApi.js / communicationsApi.js. Every route is implicitly scoped
 * server-side to the logged-in user (req.user._id); there is no user-id
 * param anywhere on this surface.
 */

export async function getNotifications({ isRead, type, page = 1, limit = 20 } = {}) {
  const params = { page, limit };
  if (isRead !== undefined && isRead !== '') params.isRead = isRead;
  if (type) params.type = type;
  const { data } = await apiClient.get('/notifications', { params });
  return data;
}

export async function getUnreadCount() {
  const { data } = await apiClient.get('/notifications/unread-count');
  return data.data;
}

export async function markNotificationRead(id) {
  const { data } = await apiClient.patch(`/notifications/${id}/read`);
  return data.data;
}

export async function markAllNotificationsRead() {
  const { data } = await apiClient.patch('/notifications/read-all');
  return data.data;
}

export async function archiveNotification(id) {
  const { data } = await apiClient.patch(`/notifications/${id}/archive`);
  return data.data;
}

export async function archiveAllReadNotifications() {
  const { data } = await apiClient.patch('/notifications/archive-read');
  return data.data;
}
