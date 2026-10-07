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
}

export function getAccessToken() {
  return accessToken;
}

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
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
        return new Promise((resolve) => {
          refreshSubscribers.push((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const { data } = await apiClient.post('/auth/refresh');
        const newToken = data?.data?.accessToken;
        setAccessToken(newToken);
        isRefreshing = false;
        onRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshErr) {
        isRefreshing = false;
        setAccessToken(null);
        window.location.href = '/user/login';
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
