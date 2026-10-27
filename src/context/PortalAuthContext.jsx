import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import {
  logoutRequest,
  logoutAllRequest,
  fetchCurrentUser,
  changePasswordRequest,
} from '../services/portal/authApi';
import { setAccessToken } from '../services/portal/apiClient';
import { normalizeRole } from '../routes/guards';

const PortalAuthContext = createContext(null);

export function PortalAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('portal_user');
      const hasAnyToken = !!(
        localStorage.getItem('portal_access_token') ||
        localStorage.getItem('portal_refresh_token') ||
        localStorage.getItem('ld_user_token') ||
        localStorage.getItem('ld_admin_token')
      );
      if (storedUser && hasAnyToken) {
        const parsed = JSON.parse(storedUser);
        return {
          ...parsed,
          role: normalizeRole(parsed.role),
        };
      }
      const ldUserData = localStorage.getItem('ld_user_data');
      const ldUserToken = localStorage.getItem('ld_user_token');
      if (ldUserData && ldUserToken) {
        const parsed = JSON.parse(ldUserData);
        return {
          ...parsed,
          role: normalizeRole(parsed.role || 'CLIENT'),
          name: parsed.name || parsed.fullName || parsed.firstName || 'User',
        };
      }
      const ldAdminData = localStorage.getItem('ld_admin_data');
      const ldAdminToken = localStorage.getItem('ld_admin_token');
      if (ldAdminData && ldAdminToken) {
        const parsed = JSON.parse(ldAdminData);
        return {
          ...parsed,
          role: normalizeRole(parsed.role || 'ADMIN'),
        };
      }
      return null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(() => {
    try {
      const hasAnyToken = !!(
        localStorage.getItem('portal_access_token') ||
        localStorage.getItem('portal_refresh_token') ||
        localStorage.getItem('ld_user_token') ||
        localStorage.getItem('ld_admin_token')
      );
      const hasAnyUser = !!(
        localStorage.getItem('portal_user') ||
        localStorage.getItem('ld_user_data') ||
        localStorage.getItem('ld_admin_data')
      );
      if (!hasAnyToken && !hasAnyUser) return false;
      // Stored user is already synchronously hydrated into state above; no blocking gate needed
      if (hasAnyUser) return false;
      return true;
    } catch {
      return false;
    }
  });

  // Protect active session from being overwritten by in-flight background mount checks
  const activeSessionRef = useRef(false);

  // Timestamp of the most recent setFromLogin call (ms since epoch, 0 = no login yet).
  // portal:session-expired events whose refresh started BEFORE this timestamp are stale.
  const loginTimestampRef = useRef(0);

  // When the axios refresh interceptor fails (expired/invalid refresh token),
  // it clears localStorage but cannot touch React state. This listener bridges
  // that gap: it clears user state so the route guard redirects to login.
  useEffect(() => {
    const handleSessionExpired = (e) => {
      const refreshStartedAt = e?.detail?.refreshStartedAt ?? 0;
      if (loginTimestampRef.current && refreshStartedAt < loginTimestampRef.current) {
        return;
      }
      // If user logged in within the last 30 seconds, don't clear session on race
      if (loginTimestampRef.current && Date.now() - loginTimestampRef.current < 30000) {
        return;
      }
      // If a valid LauncherDesk user token still exists in localStorage, don't kill session
      const hasLdToken = !!(
        localStorage.getItem('ld_user_token') ||
        localStorage.getItem('ld_admin_token')
      );
      if (hasLdToken) {
        return;
      }
      activeSessionRef.current = false;
      setAccessToken(null);
      setUser(null);
      setIsLoading(false);
    };
    window.addEventListener('portal:session-expired', handleSessionExpired);
    return () => window.removeEventListener('portal:session-expired', handleSessionExpired);
  }, []);

  // On first load, restore the in-memory access token from localStorage,
  // then verify / silently refresh the session in background.
  useEffect(() => {
    const storedToken =
      localStorage.getItem('portal_access_token') ||
      localStorage.getItem('ld_user_token') ||
      localStorage.getItem('ld_admin_token');
    const storedUser =
      localStorage.getItem('portal_user') ||
      localStorage.getItem('ld_user_data') ||
      localStorage.getItem('ld_admin_data');
    const storedRefreshToken = localStorage.getItem('portal_refresh_token');

    if (storedToken) setAccessToken(storedToken);

    // storedUser but no tokens at all → stale state, clear it
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

    const restoreTimeout = setTimeout(() => {
      if (isMounted) setIsLoading(false);
    }, 8000);

    (async () => {
      try {
        const currentUser = await fetchCurrentUser();
        if (!isMounted || activeSessionRef.current) return;

        if (currentUser) {
          const normalized = {
            ...currentUser,
            role: normalizeRole(currentUser.role),
          };
          setUser(normalized);
          localStorage.setItem('portal_user', JSON.stringify(normalized));
        }
      } catch (err) {
        if (!isMounted || activeSessionRef.current) return;

        const status = err?.response?.status;
        if (status !== 401 && status !== 403) return;

        // If a fallback launcherdesk token exists, preserve session
        const hasLdToken = !!(
          localStorage.getItem('ld_user_token') ||
          localStorage.getItem('ld_admin_token')
        );
        if (hasLdToken) {
          return;
        }

        setAccessToken(null);
        setUser(null);
        localStorage.removeItem('portal_access_token');
        localStorage.removeItem('portal_refresh_token');
        localStorage.removeItem('portal_user');
      } finally {
        clearTimeout(restoreTimeout);
        if (isMounted && !activeSessionRef.current) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
      clearTimeout(restoreTimeout);
    };
  }, []);

  // Called from the unified login page after a successful portal login response.
  const setFromLogin = useCallback(({ user: loggedInUser, accessToken, refreshToken }) => {
    activeSessionRef.current = true;
    loginTimestampRef.current = Date.now();
    const normalizedUser = loggedInUser
      ? { ...loggedInUser, role: normalizeRole(loggedInUser.role) }
      : null;
    if (accessToken) {
      setAccessToken(accessToken);
      localStorage.setItem('portal_access_token', accessToken);
      localStorage.setItem('ld_user_token', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('portal_refresh_token', refreshToken);
    }
    if (normalizedUser) {
      setUser(normalizedUser);
      localStorage.setItem('portal_user', JSON.stringify(normalizedUser));
      localStorage.setItem('ld_user_data', JSON.stringify(normalizedUser));
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
      localStorage.removeItem('ld_user_token');
      localStorage.removeItem('ld_user_data');
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
      localStorage.removeItem('ld_user_token');
      localStorage.removeItem('ld_user_data');
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
