/**
 * Route guards for the single router (LauncherDesk + Portal).
 *
 * The BACKEND decides where a user lands after login (`redirect` in the /api/auth/login
 * response — see backend src/config/roleRouting.js). This file only enforces, in the UI,
 * which workspace each role may open. The backend still re-checks every API call.
 */
import { useLayoutEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePortalAuth } from '../context/PortalAuthContext';
import { activateWorkspaceStyles, workspaceForPath } from '../styles/workspaceStyles';

/** Normalizes roles across legacy and portal namespaces. */
export function normalizeRole(role) {
  if (!role) return '';
  const r = String(role).toUpperCase().trim();
  if (r === 'USER' || r === 'CLIENT') return 'CLIENT';
  if (r === 'ADMIN') return 'ADMIN';
  if (r === 'SUPER_ADMIN' || r === 'SUPERADMIN' || r === 'SUPER_ADMINISTRATOR') return 'SUPER_ADMIN';
  if (r === 'SALES') return 'sales';
  if (r === 'PARTNER') return 'partner';
  return role;
}

/** Workspace path prefixes each role may open. Add a role here (and in the backend table). */
export const ROLE_AREAS = {
  user:        ['/client', '/user'],
  partner:     ['/partner'],
  sales:       ['/sales'],
  admin:       ['/admin', '/super-admin', '/internal-admin', '/sales'],
  CLIENT:      ['/client', '/user'],
  ADMIN:       ['/admin'],
  SUPER_ADMIN: ['/super-admin', '/admin'],
};

const ALL_AREAS = [...new Set(Object.values(ROLE_AREAS).flat())];
const inArea = (path, prefix) => path === prefix || path.startsWith(`${prefix}/`);

/** True if `path` is a public page or inside one of the role's own workspaces. */
export function canRoleOpen(role, path) {
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) return false;
  const isWorkspacePath = ALL_AREAS.some((p) => inArea(path, p));
  if (!isWorkspacePath) return true;
  const normalized = normalizeRole(role);
  return (ROLE_AREAS[normalized] || ROLE_AREAS[role] || []).some((p) => inArea(path, p));
}

/**
 * Portal role guard — same behaviour as the original Portal's RoleRoute + ProtectedRoute:
 * not signed in → login (remembering where they were going); wrong role → /unauthorized.
 *
 * Supports role normalization and resilient fallback across portal_user, ld_user_data,
 * and ld_admin_data to eliminate bounce-to-login bugs.
 */
export function PortalRoute({ allow, children }) {
  const { user, isLoading } = usePortalAuth();
  const location = useLocation();
  if (isLoading) return null;

  const effectiveUser = (() => {
    if (user) {
      return { ...user, role: normalizeRole(user.role) };
    }
    try {
      const stored = localStorage.getItem('portal_user');
      const hasToken = !!(
        localStorage.getItem('portal_access_token') ||
        localStorage.getItem('portal_refresh_token') ||
        localStorage.getItem('ld_user_token') ||
        localStorage.getItem('ld_admin_token')
      );
      if (stored && hasToken) {
        const parsed = JSON.parse(stored);
        return { ...parsed, role: normalizeRole(parsed.role) };
      }
    } catch {}

    try {
      const ldUser = localStorage.getItem('ld_user_data');
      const ldToken = localStorage.getItem('ld_user_token');
      if (ldUser && ldToken) {
        const parsed = JSON.parse(ldUser);
        return { ...parsed, role: normalizeRole(parsed.role || 'CLIENT') };
      }
      const ldAdmin = localStorage.getItem('ld_admin_data');
      const adminToken = localStorage.getItem('ld_admin_token');
      if (ldAdmin && adminToken) {
        const parsed = JSON.parse(ldAdmin);
        return { ...parsed, role: normalizeRole(parsed.role || 'ADMIN') };
      }
    } catch {}

    return null;
  })();

  if (!effectiveUser) return <Navigate to="/user/login" state={{ from: location.pathname + location.search }} replace />;
  const normalizedAllow = (allow || []).map(a => normalizeRole(a));
  if (!normalizedAllow.includes(effectiveUser.role)) return <Navigate to="/unauthorized" replace />;
  return children;
}

/** Keeps the active workspace stylesheet in step with the current route. */
export function WorkspaceStyleSync() {
  const { pathname } = useLocation();
  useLayoutEffect(() => { activateWorkspaceStyles(workspaceForPath(pathname)); }, [pathname]);
  return null;
}

