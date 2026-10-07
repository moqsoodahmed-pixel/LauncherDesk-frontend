import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import {
  logoutRequest,
  logoutAllRequest,
  fetchCurrentUser,
  refreshTokenRequest,
  changePasswordRequest,
} from '../services/portal/authApi';
import { setAccessToken } from '../services/portal/apiClient';

const PortalAuthContext = createContext(null);

export function PortalAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('portal_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(() => {
    return !localStorage.getItem('portal_user');
  });

  // Protect active session from being overwritten by in-flight background mount checks
  const activeSessionRef = useRef(false);

  // On first load, initialize access token and refresh the session safely
  useEffect(() => {
    const storedToken = localStorage.getItem('portal_access_token');
    const storedUser = localStorage.getItem('portal_user');
    const storedRefreshToken = localStorage.getItem('portal_refresh_token');

    if (storedToken) setAccessToken(storedToken);

    // If there is no stored session at all, do not perform speculative refresh
    if (!storedToken && !storedUser && !storedRefreshToken) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    (async () => {
      try {
        const refreshRes = await refreshTokenRequest(storedRefreshToken);
        if (!isMounted || activeSessionRef.current) return;

        const newAccessToken = refreshRes?.accessToken;
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          localStorage.setItem('portal_access_token', newAccessToken);
        }
        if (refreshRes?.refreshToken) {
          localStorage.setItem('portal_refresh_token', refreshRes.refreshToken);
        }

        const currentUser = await fetchCurrentUser();
        if (!isMounted || activeSessionRef.current) return;

        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem('portal_user', JSON.stringify(currentUser));
        }
      } catch {
        if (!isMounted || activeSessionRef.current) return;

        // If refresh failed, attempt to verify existing access token via /auth/me before wiping
        if (storedToken) {
          try {
            const currentUser = await fetchCurrentUser();
            if (isMounted && !activeSessionRef.current && currentUser) {
              setUser(currentUser);
              localStorage.setItem('portal_user', JSON.stringify(currentUser));
              return;
            }
          } catch {
            // Access token truly invalid
          }
        }

        // Only clear if no new login was processed while this was in flight
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
