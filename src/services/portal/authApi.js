import apiClient from './apiClient';

export async function loginRequest(email, password) {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return data.data; // { user, accessToken }
}

export async function logoutRequest() {
  // Send the token explicitly: when the frontend and API are on different sites the
  // refresh cookie is not sent, and without it the server has nothing to revoke —
  // the session would stay valid for its full lifetime after a "logout".
  const refreshToken = typeof localStorage !== 'undefined' ? localStorage.getItem('portal_refresh_token') : null;
  const { data } = await apiClient.post('/auth/logout', { refreshToken: refreshToken || undefined });
  return data;
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get('/auth/me');
  return data.data;
}

export async function refreshTokenRequest(refreshToken) {
  const token = refreshToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('portal_refresh_token') : null);
  const { data } = await apiClient.post('/auth/refresh', {
    refreshToken: token || undefined,
  });
  return data.data; // { accessToken, refreshToken }
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
