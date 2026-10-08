import apiClient from './apiClient';

/**
 * KYC API calls, split the same way the rest of the app splits client vs.
 * internal order endpoints (ordersApi.js vs clientOrdersApi.js): the
 * `client*` functions hit /api/client/orders/:id/kyc/*, everything else
 * hits /api/orders/:id/kyc/* (internal/admin review surface).
 *
 * Downloads never construct a static URL - they go through apiClient (so
 * auth headers / cookie / refresh-on-401 all apply) and return a Blob,
 * which the caller turns into an object URL for the duration of the click
 * only. No document URL is ever persisted anywhere (state or storage).
 */

// ---- Client (self-service) ----

export async function getOwnOrderKycSummary(orderId) {
  const { data } = await apiClient.get(`/client/orders/${orderId}/kyc`);
  return data.data;
}

export async function getOwnOrderKycDocuments(orderId) {
  const { data } = await apiClient.get(`/client/orders/${orderId}/kyc/documents`);
  return data.data;
}

export async function uploadOwnKycDocument(orderId, documentType, file, onUploadProgress) {
  const formData = new FormData();
  formData.append('documentType', documentType);
  formData.append('file', file);
  const { data } = await apiClient.post(`/client/orders/${orderId}/kyc/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });
  return data.data;
}

export async function downloadOwnKycDocument(orderId, documentId) {
  const response = await apiClient.get(`/client/orders/${orderId}/kyc/documents/${documentId}/download`, {
    responseType: 'blob',
  });
  return extractDownload(response);
}

export async function submitOwnKyc(orderId) {
  const { data } = await apiClient.post(`/client/orders/${orderId}/kyc/submit`);
  return data.data;
}

// NEW (Part 5 enterprise KYC, confirmed LIVE by reading
// backend/src/routes/portal/clientProfile.routes.js directly - mounted
// under the client-profile router, not the order-scoped kyc router).
// Read-only resolver: which document types are relevant to THIS client's
// business profile, independent of any one order's requiredDocuments
// snapshot. Returns { businessType, gstApplicable, documentTypes }.
export async function getClientKycRequirements() {
  const { data } = await apiClient.get('/client/kyc/requirements');
  return data.data;
}

// NEW (Part 5). Client-authored KYC comment thread - always
// CLIENT_VISIBLE (the backend enforces this; a client can never post or
// see an INTERNAL note). NOT YET CONFIRMED LIVE as of this build - the
// backend's kycComments.service.js exists but is not yet wired to any
// route/controller (see report). Calls here will 404 until that lands.
export async function getOwnKycComments(orderId, documentId) {
  const { data } = await apiClient.get(`/client/orders/${orderId}/kyc/comments${documentId ? `?documentId=${documentId}` : ''}`);
  return data.data;
}

export async function postOwnKycComment(orderId, { documentId, message }) {
  const { data } = await apiClient.post(`/client/orders/${orderId}/kyc/comments`, { documentId, message });
  return data.data;
}

// ---- Internal (Super Admin / Admin review) ----

export async function getOrderKycSummary(orderId) {
  const { data } = await apiClient.get(`/orders/${orderId}/kyc`);
  return data.data;
}

export async function getOrderKycDocuments(orderId, { allVersions = false } = {}) {
  const { data } = await apiClient.get(`/orders/${orderId}/kyc/documents${allVersions ? '?allVersions=true' : ''}`);
  return data.data;
}

export async function downloadOrderKycDocument(orderId, documentId) {
  const response = await apiClient.get(`/orders/${orderId}/kyc/documents/${documentId}/download`, {
    responseType: 'blob',
  });
  return extractDownload(response);
}

export async function verifyOrderKycDocument(orderId, documentId) {
  const { data } = await apiClient.patch(`/orders/${orderId}/kyc/documents/${documentId}/verify`);
  return data.data;
}

export async function rejectOrderKycDocument(orderId, documentId, reason) {
  const { data } = await apiClient.patch(`/orders/${orderId}/kyc/documents/${documentId}/reject`, { reason });
  return data.data;
}

export async function startOrderKycReview(orderId) {
  const { data } = await apiClient.post(`/orders/${orderId}/kyc/review`);
  return data.data;
}

// ── NEW (Part 5 enterprise KYC) - order-level "complete KYC" decision ──────
// Distinct from per-document verify/reject above: these act on the WHOLE
// order's KYC (every mandatory document must already be individually
// VERIFIED), moving the order out of KYC_VERIFICATION in one step rather
// than one document at a time. CONFIRMED LIVE - reconciled against the real
// backend routes (orders.routes.js): PATCH, not POST; on a 400 the response
// body carries { notReady: [{documentType, status}] } listing exactly which
// required documents are not yet VERIFIED.
export async function approveOrderKyc(orderId) {
  const { data } = await apiClient.patch(`/orders/${orderId}/kyc/approve`);
  return data.data;
}

export async function rejectOrderKyc(orderId, reason) {
  const { data } = await apiClient.patch(`/orders/${orderId}/kyc/reject`, { reason });
  return data.data;
}

// Super-Admin-only override. CONFIRMED LIVE, but reconciled to the real
// shape: the backend's force actions are PER-DOCUMENT (not order-level) -
// PATCH /orders/:id/kyc/documents/:documentId/force-verify|force-reject -
// and bypass only the order.status===KYC_VERIFICATION guard; the per-document
// transition graph (e.g. REJECTED -> VERIFIED) is still enforced server-side.
export async function forceApproveKycDocument(orderId, documentId, reason) {
  const { data } = await apiClient.patch(`/orders/${orderId}/kyc/documents/${documentId}/force-verify`, { reason });
  return data.data;
}

export async function forceRejectKycDocument(orderId, documentId, reason) {
  const { data } = await apiClient.patch(`/orders/${orderId}/kyc/documents/${documentId}/force-reject`, { reason });
  return data.data;
}

// Staff-only: ask the client to re-upload a specific document without using
// the harsher reject-the-whole-document path. CONFIRMED LIVE.
export async function requestKycReupload(orderId, documentId, reason) {
  const { data } = await apiClient.patch(`/orders/${orderId}/kyc/documents/${documentId}/request-reupload`, { reason });
  return data.data;
}

// Bulk verify/reject are ORDER-SCOPED on the backend (not a flat
// cross-order endpoint) - a batch can only cover documents belonging to one
// order at a time. CONFIRMED LIVE. Response shape:
// { results: [{documentId, success, status?, orderStatus?, error?}], succeeded, failed }.
// IMPORTANT (see backend report): if an earlier item in the batch moves the
// order out of KYC_VERIFICATION, later items' document-level update can
// still succeed in the database while their API result reports
// success:false (the order-transition step fails, not the document write).
// Callers MUST re-fetch the order's KYC summary after a bulk action rather
// than trusting success flags for order-level state.
export async function bulkVerifyKycDocuments(orderId, documentIds) {
  const { data } = await apiClient.post(`/orders/${orderId}/kyc/documents/bulk-verify`, { documentIds });
  return data.data;
}

export async function bulkRejectKycDocuments(orderId, documentIds, reason) {
  const { data } = await apiClient.post(`/orders/${orderId}/kyc/documents/bulk-reject`, { documentIds, reason });
  return data.data;
}

// Order-scoped export (ZIP of current-version files + manifest.csv, or a
// CSV-only manifest). CONFIRMED LIVE.
export async function exportOrderKyc(orderId, format = 'zip') {
  const response = await apiClient.get(`/orders/${orderId}/kyc/export?format=${format}`, { responseType: 'blob' });
  return response.data; // Blob
}

// Staff-side comment thread (internal reviewer notes + client-visible
// replies in one view). NOT YET CONFIRMED LIVE - same kycComments.service.js
// caveat as the client-side functions above.
export async function getOrderKycComments(orderId, documentId) {
  const { data } = await apiClient.get(`/orders/${orderId}/kyc/comments${documentId ? `?documentId=${documentId}` : ''}`);
  return data.data;
}

export async function postOrderKycComment(orderId, { documentId, message, visibility = 'INTERNAL' }) {
  const { data } = await apiClient.post(`/orders/${orderId}/kyc/comments`, { documentId, message, visibility });
  return data.data;
}

// Pulls the filename out of Content-Disposition when present, falling back
// to a generic name - the backend sanitizes this header value already.
function extractDownload(response) {
  const disposition = response.headers?.['content-disposition'] || '';
  const match = /filename="?([^"]+)"?/i.exec(disposition);
  return {
    blob: response.data,
    fileName: match ? match[1] : 'document',
    mimeType: response.headers?.['content-type'] || response.data?.type || 'application/octet-stream',
  };
}
