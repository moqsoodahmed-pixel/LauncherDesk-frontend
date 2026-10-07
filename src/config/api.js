/**
 * Backend base URL for the whole app (LauncherDesk + Portal) — one backend, one origin.
 * Same resolution the LauncherDesk contexts already use, so the unified login (which sets the
 * Portal refresh cookie) and every Portal API call reach the same server in dev and production.
 */
export const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

/** Portal endpoints are mounted on the shared backend under /api/portal. */
export const PORTAL_API_BASE = `${API_BASE}/portal`;
