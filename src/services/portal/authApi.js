import apiClient from './apiClient';

export async function loginRequest(email, password) {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return data.data; // { user, accessToken }
}

export async function logoutRequest() {
  const { data } = await apiClient.post('/auth/logout');
  return data;
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get('/auth/me');
  return data.data;
}

export async function refreshTokenRequest() {
  const { data } = await apiClient.post('/auth/refresh');
  return data.data; // { accessToken }
}

export async function logoutAllRequest() {
  const { data } = await apiClient.post('/auth/logout-all');
  return data;
}

export async function updateProfileRequest(changes) {
  const { data } = await apiClient.patch('/auth/profile', changes);
  return data.data;
}

export async function changePasswordRequest(currentPassword, newPassword) {
  const { data } = await apiClient.post('/auth/change-password', { currentPassword, newPassword });
  return data.data; // { accessToken }
}

export async function forgotPasswordRequest(email) {
  const { data } = await apiClient.post('/auth/forgot-password', { email });
  return data;
}

export async function resetPasswordRequest(token, newPassword) {
  const { data } = await apiClient.post('/auth/reset-password', { token, newPassword });
  return data;
}
