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

// Initialize from localStorage immediately so the interceptor has the token
// even before PortalAuthContext's useEffect runs on a fresh page load.
let accessToken = (() => {
  try {
    return localStorage.getItem('portal_access_token') || null;
  } catch {
    return null;
  }
})();
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
      // Capture the refresh token we are about to use and the time we started.
      // In the catch block we compare the token to what is currently in localStorage:
      // if they differ, a new login wrote fresh tokens while this refresh was in
      // flight and we must NOT clobber the new session.
      // The start time is passed in the portal:session-expired event so the context
      // handler can tell whether the event is stale (predates the last login).
      const refreshStartedAt = Date.now();
      const refreshTokenUsed = typeof localStorage !== 'undefined' ? localStorage.getItem('portal_refresh_token') : null;
      try {
        const { data } = await apiClient.post('/auth/refresh', {
          refreshToken: refreshTokenUsed || undefined,
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

        // Guard: if a new login wrote a different refresh token while this
        // (now-failed) refresh was in flight, a fresh session is active.
        // Clearing tokens or dispatching portal:session-expired here would
        // destroy that new session — skip it entirely.
        const currentRefreshToken = typeof localStorage !== 'undefined' ? localStorage.getItem('portal_refresh_token') : null;
        const newSessionStarted = currentRefreshToken && currentRefreshToken !== refreshTokenUsed;
        if (newSessionStarted) {
          return Promise.reject(refreshErr);
        }

        // Genuine session expiry — clear stale tokens and notify React.
        setAccessToken(null);
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('portal_access_token');
          localStorage.removeItem('portal_refresh_token');
          localStorage.removeItem('portal_user');
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('portal:session-expired', {
            detail: { refreshStartedAt },
          }));
        }
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
