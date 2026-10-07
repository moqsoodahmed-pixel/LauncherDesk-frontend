export const SERVICE_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
});

export const ALL_SERVICE_STATUSES = Object.values(SERVICE_STATUS);

// Mirrors backend/src/constants/serviceStatus.js for UI purposes only
// (which buttons to show) - the backend is always the authority.
export const SERVICE_STATUS_TRANSITIONS = Object.freeze({
  ACTIVE: ['INACTIVE', 'COMPLETED'],
  INACTIVE: ['ACTIVE', 'COMPLETED'],
  COMPLETED: [],
  ARCHIVED: [],
});
