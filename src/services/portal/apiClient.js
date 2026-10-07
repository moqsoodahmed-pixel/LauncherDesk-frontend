import axios from 'axios';
import { PORTAL_API_BASE } from '../../config/api';

/**
 * Central axios instance. All frontend API calls should go through this
 * file rather than creating ad-hoc axios/fetch calls, so auth headers
 * and refresh behavior stay consistent everywhere.
 */
const apiClient = axios.create({
  baseURL: PORTAL_API_BASE, // same backend origin as the unified login that set the refresh cookie
  withCredentials: true, // sends the httpOnly refresh-token cookie
});

let accessToken = null;
let isRefreshing = false;
let refreshSubscribers = [];

export function setAccessToken(token) {
  accessToken = token;
  if (typeof window !== 'undefined' && window.localStorage) {
    if (token) {
      localStorage.setItem('portal_access_token', token);
    } else {
      localStorage.removeItem('portal_access_token');
    }
  }
}

export function getAccessToken() {
  if (accessToken) return accessToken;
  try {
    return localStorage.getItem('portal_access_token');
  } catch {
    return null;
  }
}

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthEndpoint = originalRequest?.url?.includes('/auth/login') || originalRequest?.url?.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((newToken) => {
            if (!newToken) return reject(error);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const storedRefreshToken = typeof localStorage !== 'undefined' ? localStorage.getItem('portal_refresh_token') : null;
        const { data } = await apiClient.post('/auth/refresh', {
          refreshToken: storedRefreshToken || undefined,
        });
        const newToken = data?.data?.accessToken;
        const newRefreshToken = data?.data?.refreshToken;
        if (newToken) setAccessToken(newToken);
        if (newRefreshToken && typeof localStorage !== 'undefined') {
          localStorage.setItem('portal_refresh_token', newRefreshToken);
        }
        isRefreshing = false;
        onRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshErr) {
        isRefreshing = false;
        // Flush all waiting requests so they reject instead of hanging forever.
        refreshSubscribers.forEach((cb) => cb(null));
        refreshSubscribers = [];
        // Clear stale tokens so the auth context knows the session is dead
        // and route guards redirect to /user/login cleanly.
        setAccessToken(null);
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('portal_access_token');
          localStorage.removeItem('portal_refresh_token');
          localStorage.removeItem('portal_user');
        }
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
