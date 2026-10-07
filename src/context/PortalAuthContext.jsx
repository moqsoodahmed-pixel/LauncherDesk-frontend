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
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, silently refresh the session using the httpOnly cookie.
  useEffect(() => {
    (async () => {
      try {
        const { accessToken } = await refreshTokenRequest();
        setAccessToken(accessToken);
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Called from the unified login page after a successful portal login response.
  const setFromLogin = useCallback(({ user: loggedInUser, accessToken }) => {
    setAccessToken(accessToken);
    setUser(loggedInUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  const logoutAll = useCallback(async () => {
    try {
      await logoutAllRequest();
    } finally {
      setAccessToken(null);
      setUser(null);
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
