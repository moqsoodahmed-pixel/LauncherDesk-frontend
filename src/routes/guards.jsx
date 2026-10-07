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
  return (ROLE_AREAS[role] || []).some((p) => inArea(path, p));
}

/**
 * Portal role guard — same behaviour as the original Portal's RoleRoute + ProtectedRoute:
 * not signed in → login (remembering where they were going); wrong role → /unauthorized.
 */
export function PortalRoute({ allow, children }) {
  const { user, isLoading } = usePortalAuth();
  const location = useLocation();
  if (isLoading) return null;
  if (!user) return <Navigate to="/user/login" state={{ from: location.pathname + location.search }} replace />;
  if (!allow.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return children;
}

/** Keeps the active workspace stylesheet in step with the current route. */
export function WorkspaceStyleSync() {
  const { pathname } = useLocation();
  useLayoutEffect(() => { activateWorkspaceStyles(workspaceForPath(pathname)); }, [pathname]);
  return null;
}
