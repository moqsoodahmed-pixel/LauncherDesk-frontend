import apiClient from './apiClient';

/**
 * Part 2 of the invoice system - consumes the real, already-built backend
 * from Part 1 (invoices.routes.js / clientProfile.routes.js) only. No
 * generation, numbering, template, or email-content logic lives here -
 * this file is a thin wrapper around those existing endpoints, matching
 * the same client/internal split already used by kycApi.js, ordersApi.js,
 * etc.
 *
 * Downloads never construct a static URL - they go through apiClient (so
 * the Bearer token / refresh-on-401 apply) and return a Blob, exactly the
 * same pattern kycApi.js already uses.
 */

function toQueryString(params) {
  const usable = Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== null && v !== ''));
  return new URLSearchParams(usable).toString();
}

// ---- Client (self-service) ----

export async function getOwnInvoices(params = {}) {
  const { data } = await apiClient.get(`/client/invoices?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getOwnInvoiceByOrder(orderId) {
  const { data } = await apiClient.get(`/client/invoices/order/${orderId}`);
  return data.data; // null if no invoice exists yet for this order
}

export async function downloadOwnInvoice(invoiceId) {
  const { data } = await apiClient.get(`/client/invoices/${invoiceId}/download`, { responseType: 'blob' });
  return data; // Blob
}

// ---- Admin / Super Admin (internal management) ----

export async function getInvoices(params = {}) {
  const { data } = await apiClient.get(`/invoices?${toQueryString(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getInvoiceByOrder(orderId) {
  const { data } = await apiClient.get(`/invoices/order/${orderId}`);
  return data.data;
}

export async function getInvoiceVersions(orderId) {
  const { data } = await apiClient.get(`/invoices/order/${orderId}/versions`);
  return data.data;
}

export async function downloadInvoice(invoiceId) {
  const { data } = await apiClient.get(`/invoices/${invoiceId}/download`, { responseType: 'blob' });
  return data; // Blob
}

export async function resendInvoiceEmail(invoiceId) {
  const { data } = await apiClient.post(`/invoices/${invoiceId}/resend`);
  return data;
}

export async function regenerateInvoice(invoiceId) {
  const { data } = await apiClient.post(`/invoices/${invoiceId}/regenerate`);
  return data.data;
}

export async function deleteInvoice(invoiceId) {
  const { data } = await apiClient.delete(`/invoices/${invoiceId}`);
  return data;
}

// Reuses the existing, already-built generic audit log endpoint
// (GET /audit-logs?resourceType=&resourceId=) - invoice actions are logged
// against the Order (see invoice.service.js), not a new audit surface.
export async function getInvoiceAuditLog(orderId) {
  const { data } = await apiClient.get(`/audit-logs?${toQueryString({ resourceType: 'Order', resourceId: orderId })}`);
  return { items: data.data, meta: data.meta };
}

/** Triggers a browser download of a Blob with a given filename - shared by every download button. */
export function saveBlobAsFile(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
