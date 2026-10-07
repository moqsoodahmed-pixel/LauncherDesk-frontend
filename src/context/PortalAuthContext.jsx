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
  // True ONLY while a stored session still has to be verified against the server.
  // The stored user above is unverified — the mount effect's /auth/me call may be
  // about to reject it. PortalRoute, DashboardRedirect and the login page all wait
  // on this flag, so while it is true the app neither renders protected content nor
  // auto-navigates into it. Returning false here unconditionally is what let a
  // dead session paint the dashboard and then bounce to /user/login a moment later.
  const [isLoading, setIsLoading] = useState(() => {
    try {
      if (!localStorage.getItem('portal_user')) return false;
      const hasToken = !!localStorage.getItem('portal_access_token');
      const hasRefresh = !!localStorage.getItem('portal_refresh_token');
      // Stored user but no tokens at all: already logged out, nothing to verify.
      if (!hasToken && !hasRefresh) return false;
      return true;
    } catch {
      return false;
    }
  });

  // Protect active session from being overwritten by in-flight background mount checks
  const activeSessionRef = useRef(false);

  // Timestamp of the most recent setFromLogin call (ms since epoch, 0 = no login yet).
  // portal:session-expired events whose refresh started BEFORE this timestamp are stale —
  // a new login happened while that old refresh was in-flight; we must not clear the new session.
  const loginTimestampRef = useRef(0);

  // When the axios refresh interceptor fails (expired/invalid refresh token),
  // it clears localStorage but cannot touch React state. This listener bridges
  // that gap: it clears user state so the route guard redirects to login.
  useEffect(() => {
    const handleSessionExpired = (e) => {
      // The event carries the timestamp of when the failed refresh was initiated.
      // If that timestamp predates the most recent login, this event is stale —
      // a new login succeeded while that old refresh was in-flight. Clearing state
      // here would destroy the fresh session. The apiClient refreshTokenUsed guard
      // already blocks dispatch in most cases; this is the final safety net.
      const refreshStartedAt = e?.detail?.refreshStartedAt ?? 0;
      if (loginTimestampRef.current && refreshStartedAt < loginTimestampRef.current) {
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

    // A cold-started or unreachable backend must never strand the app behind the
    // loading gate. After this budget we stop blocking render but deliberately do
    // NOT clear the session: a slow network is not proof that the session is dead,
    // and the next real API call will surface a genuinely invalid one.
    const restoreTimeout = setTimeout(() => {
      if (isMounted) setIsLoading(false);
    }, 8000);

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
      } catch (err) {
        if (!isMounted || activeSessionRef.current) return;

        // Only an explicit rejection from the server proves the session is dead.
        // A network error, CORS failure, 502 or timeout carries no such proof —
        // treating those as logout signs people out whenever the backend hiccups
        // or cold-starts, which is indistinguishable from the session "expiring".
        const status = err?.response?.status;
        if (status !== 401 && status !== 403) return;

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
