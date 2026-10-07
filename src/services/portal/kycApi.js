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
