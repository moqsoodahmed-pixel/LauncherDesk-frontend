import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import {
  logoutRequest,
  logoutAllRequest,
  fetchCurrentUser,
  changePasswordRequest,
} from '../services/portal/authApi';
import { setAccessToken } from '../services/portal/apiClient';

const PortalAuthContext = createContext(null);

export function PortalAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('portal_user');
      if (!storedUser) return null;
      // If there is a stored user but NO access token AND no refresh token,
      // the session is dead (tokens were cleared by a failed refresh in a prior
      // render). Don't trust the stale user — treat as logged out immediately
      // so the route guard doesn't render protected pages with no valid session.
      const hasToken = !!localStorage.getItem('portal_access_token');
      const hasRefresh = !!localStorage.getItem('portal_refresh_token');
      if (!hasToken && !hasRefresh) return null;
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(() => {
    try {
      if (!localStorage.getItem('portal_user')) return false;
      const hasToken = !!localStorage.getItem('portal_access_token');
      const hasRefresh = !!localStorage.getItem('portal_refresh_token');
      // If user is stored but tokens are gone, we are not loading — we are logged out.
      if (!hasToken && !hasRefresh) return false;
      return false;
    } catch {
      return false;
    }
  });

  // Protect active session from being overwritten by in-flight background mount checks
  const activeSessionRef = useRef(false);

  // When the axios refresh interceptor fails (expired/invalid refresh token),
  // it clears localStorage but cannot touch React state. This listener bridges
  // that gap: it clears user state so the route guard redirects to login.
  useEffect(() => {
    const handleSessionExpired = () => {
      activeSessionRef.current = false;
      setAccessToken(null);
      setUser(null);
      setIsLoading(false);
    };
    window.addEventListener('portal:session-expired', handleSessionExpired);
    return () => window.removeEventListener('portal:session-expired', handleSessionExpired);
  }, []);

  // On first load, restore the in-memory access token from localStorage,
  // then verify / silently refresh the session.  The apiClient interceptor
  // handles 401 → refresh-token rotation with its own deduplication lock
  // (isRefreshing / refreshSubscribers), so we only call fetchCurrentUser()
  // here.  This prevents the double-refresh race that used to kill sessions
  // (two parallel /auth/refresh calls using the same token → token-reuse →
  // session revoked).
  useEffect(() => {
    const storedToken = localStorage.getItem('portal_access_token');
    const storedUser = localStorage.getItem('portal_user');
    const storedRefreshToken = localStorage.getItem('portal_refresh_token');

    if (storedToken) setAccessToken(storedToken);

    // portal_user in localStorage but no tokens at all → stale state, clear it
    // so the route guard doesn't render protected pages with no valid session.
    if (storedUser && !storedToken && !storedRefreshToken) {
      setUser(null);
      localStorage.removeItem('portal_user');
      setIsLoading(false);
      return;
    }

    // Nothing stored at all → definitely not logged in, skip network calls.
    if (!storedToken && !storedUser && !storedRefreshToken) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    (async () => {
      try {
        // fetchCurrentUser → apiClient.get('/auth/me')
        // If the access token is valid, this succeeds immediately.
        // If it's expired, the apiClient 401-interceptor transparently
        // refreshes the token (using the refresh token from localStorage)
        // and retries the request.  No second refresh path needed.
        const currentUser = await fetchCurrentUser();
        if (!isMounted || activeSessionRef.current) return;

        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem('portal_user', JSON.stringify(currentUser));
        }
      } catch {
        if (!isMounted || activeSessionRef.current) return;

        // Access-token invalid AND refresh failed → truly logged out.
        // Only clear if no new login was processed while this was in flight.
        if (!activeSessionRef.current) {
          setAccessToken(null);
          setUser(null);
          localStorage.removeItem('portal_access_token');
          localStorage.removeItem('portal_refresh_token');
          localStorage.removeItem('portal_user');
        }
      } finally {
        if (isMounted && !activeSessionRef.current) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Called from the unified login page after a successful portal login response.
  const setFromLogin = useCallback(({ user: loggedInUser, accessToken, refreshToken }) => {
    activeSessionRef.current = true;
    if (accessToken) {
      setAccessToken(accessToken);
      localStorage.setItem('portal_access_token', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('portal_refresh_token', refreshToken);
    }
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem('portal_user', JSON.stringify(loggedInUser));
    }
    setIsLoading(false);
  }, []);

  const logout = useCallback(async () => {
    activeSessionRef.current = false;
    try {
      await logoutRequest();
    } finally {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('portal_access_token');
      localStorage.removeItem('portal_refresh_token');
      localStorage.removeItem('portal_user');
    }
  }, []);

  const logoutAll = useCallback(async () => {
    activeSessionRef.current = false;
    try {
      await logoutAllRequest();
    } finally {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('portal_access_token');
      localStorage.removeItem('portal_refresh_token');
      localStorage.removeItem('portal_user');
    }
  }, []);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    const res = await changePasswordRequest(currentPassword, newPassword);
    if (res?.accessToken) setAccessToken(res.accessToken);
    if (res?.refreshToken) localStorage.setItem('portal_refresh_token', res.refreshToken);
  }, []);

  const hasPermission = useCallback(
    (permission) => {
      if (!user) return false;
      if (user.role === 'SUPER_ADMIN') return true;
      return (user.permissions || []).includes(permission);
    },
    [user]
  );

  const value = {
    user,
    isLoading,
    setFromLogin,
    logout,
    logoutAll,
    changePassword,
    hasPermission,
  };

  return <PortalAuthContext.Provider value={value}>{children}</PortalAuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(PortalAuthContext);
  if (!ctx) throw new Error('useAuth must be used within a PortalAuthProvider.');
  return ctx;
}

export function usePortalAuth() {
  return useAuth();
}
