import apiClient from './apiClient';

/**
 * Audit logs API calls - internal only, gated server-side by the
 * VIEW_AUDIT_LOGS permission. Thin wrapper around apiClient, same
 * pattern as kycApi.js / communicationsApi.js.
 */
export async function getAuditLogs({ action, actor, resourceType, resourceId, dateFrom, dateTo, search, sortBy, sortDir, page = 1, limit = 20 } = {}) {
  const params = { page, limit };
  if (action) params.action = action;
  if (actor) params.actor = actor;
  if (resourceType) params.resourceType = resourceType;
  if (resourceId) params.resourceId = resourceId;
  if (dateFrom) params.dateFrom = dateFrom;
  if (dateTo) params.dateTo = dateTo;
  if (search) params.search = search;
  if (sortBy) params.sortBy = sortBy;
  if (sortDir) params.sortDir = sortDir;
  const { data } = await apiClient.get('/audit-logs', { params });
  return data;
}
