import apiClient from './apiClient';

/**
 * Internal reporting API calls (Phase 11). Every endpoint shares the same
 * date-range query params (period, or from/to when period is CUSTOM/
 * omitted) plus a few endpoint-specific filters (sort, page, limit) - built
 * once here via buildParams() rather than per-function, the same thin-
 * wrapper-around-apiClient pattern as kycApi.js/paymentApi.js/
 * communicationsApi.js. Gated server-side on VIEW_REPORTS (exports also
 * need EXPORT_REPORTS); no client-side scoping is duplicated here.
 */

function buildParams({ period, from, to, ...rest } = {}) {
  const params = {};
  if (period) params.period = period;
  if (from) params.from = from;
  if (to) params.to = to;
  for (const [key, value] of Object.entries(rest)) {
    if (value !== undefined && value !== null && value !== '') params[key] = value;
  }
  return params;
}

export async function getOverview(range) {
  const { data } = await apiClient.get('/reports/overview', { params: buildParams(range) });
  return data;
}

export async function getOrders(range) {
  const { data } = await apiClient.get('/reports/orders', { params: buildParams(range) });
  return data;
}

export async function getRevenue(range) {
  const { data } = await apiClient.get('/reports/revenue', { params: buildParams(range) });
  return data;
}

export async function getServices(range) {
  const { data } = await apiClient.get('/reports/services', { params: buildParams(range) });
  return data;
}

export async function getClients(range) {
  const { data } = await apiClient.get('/reports/clients', { params: buildParams(range) });
  return data;
}

export async function getAdmins(range) {
  const { data } = await apiClient.get('/reports/admins', { params: buildParams(range) });
  return data;
}

export async function getKyc(range) {
  const { data } = await apiClient.get('/reports/kyc', { params: buildParams(range) });
  return data;
}

export async function getPayments(range) {
  const { data } = await apiClient.get('/reports/payments', { params: buildParams(range) });
  return data;
}

export async function getCommunications(range) {
  const { data } = await apiClient.get('/reports/communications', { params: buildParams(range) });
  return data;
}

export async function getFunnel(range) {
  const { data } = await apiClient.get('/reports/funnel', { params: buildParams(range) });
  return data;
}

// ---- CSV exports (EXPORT_REPORTS). Return a Blob + filename via the same
// authenticated-download convention as kycApi.js's downloadOrderKycDocument,
// never a static/unauthenticated URL. ----

async function downloadCsv(path, range) {
  const response = await apiClient.get(path, { params: buildParams(range), responseType: 'blob' });
  const disposition = response.headers?.['content-disposition'] || '';
  const match = /filename="?([^"]+)"?/i.exec(disposition);
  return {
    blob: response.data,
    fileName: match ? match[1] : 'report.csv',
    mimeType: response.headers?.['content-type'] || 'text/csv',
  };
}

export function exportOrders(range) {
  return downloadCsv('/reports/orders/export', range);
}

export function exportRevenue(range) {
  return downloadCsv('/reports/revenue/export', range);
}

export function exportServices(range) {
  return downloadCsv('/reports/services/export', range);
}
