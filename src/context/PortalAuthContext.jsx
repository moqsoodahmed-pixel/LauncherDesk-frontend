import { createContext, useContext, useEffect, useState, useCallback } from 'react';
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

  // On first load, initialize access token and refresh the session
  useEffect(() => {
    const storedToken = localStorage.getItem('portal_access_token');
    if (storedToken) setAccessToken(storedToken);

    (async () => {
      try {
        const { accessToken } = await refreshTokenRequest();
        if (accessToken) {
          setAccessToken(accessToken);
          localStorage.setItem('portal_access_token', accessToken);
        }
        const currentUser = await fetchCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem('portal_user', JSON.stringify(currentUser));
        }
      } catch {
        if (storedToken) {
          try {
            const currentUser = await fetchCurrentUser();
            if (currentUser) {
              setUser(currentUser);
              localStorage.setItem('portal_user', JSON.stringify(currentUser));
              return;
            }
          } catch {
            // Token truly invalid
          }
        }
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem('portal_access_token');
        localStorage.removeItem('portal_user');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Called from the unified login page after a successful portal login response.
  const setFromLogin = useCallback(({ user: loggedInUser, accessToken }) => {
    setAccessToken(accessToken);
    setUser(loggedInUser);
    if (accessToken) localStorage.setItem('portal_access_token', accessToken);
    if (loggedInUser) localStorage.setItem('portal_user', JSON.stringify(loggedInUser));
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('portal_access_token');
      localStorage.removeItem('portal_user');
    }
  }, []);

  const logoutAll = useCallback(async () => {
    try {
      await logoutAllRequest();
    } finally {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('portal_access_token');
      localStorage.removeItem('portal_user');
    }
  }, []);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    const { accessToken } = await changePasswordRequest(currentPassword, newPassword);
    setAccessToken(accessToken);
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
