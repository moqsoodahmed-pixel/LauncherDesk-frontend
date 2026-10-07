/**
 * Mirrors backend/src/constants/clientStatus.js's CLIENT_STATUS_TRANSITIONS
 * for UI purposes only (which buttons to show) - the backend is always the
 * authority on which transition actually succeeds.
 */
export const CLIENT_STATUS_TRANSITIONS = Object.freeze({
  PENDING: ['ACTIVE', 'ARCHIVED'],
  ACTIVE: ['INACTIVE', 'SUSPENDED', 'ARCHIVED'],
  INACTIVE: ['ACTIVE', 'ARCHIVED'],
  SUSPENDED: ['ACTIVE', 'ARCHIVED'],
  ARCHIVED: [],
});
