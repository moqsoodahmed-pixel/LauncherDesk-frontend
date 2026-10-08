import apiClient from './apiClient';

function toQuery(params) {
  return new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''))
  ).toString();
}

export async function listKycDocuments(params = {}) {
  const { data } = await apiClient.get(`/kyc?${toQuery(params)}`);
  return { items: data.data, meta: data.meta };
}

export async function getKycStats() {
  const { data } = await apiClient.get('/kyc/stats');
  return data.data;
}

// ── NEW (Part 5 enterprise KYC) ─────────────────────────────────────────────
// CONFIRMED LIVE, reconciled against the real backend routes. Two real
// corrections vs. the original plan this file was first built against:
// 1. Bulk verify/reject are ORDER-SCOPED on the backend (a batch can only
//    cover documents within one order), not a flat cross-order endpoint -
//    see kycApi.js's bulkVerifyKycDocuments/bulkRejectKycDocuments, which
//    are the ones KycListPage.jsx should call (it already groups the flat
//    table's selection by order before calling either).
// 2. Export is order-scoped (kycApi.js's exportOrderKyc) or client-scoped
//    (exportClientKyc below) - there is no global "export everything"
//    endpoint.

// `reviewerId: null` unassigns, matching the existing unassignOrder
// convention in ordersApi.js.
export async function assignKycReviewer(documentId, reviewerId) {
  const { data } = await apiClient.patch(`/kyc/${documentId}/assign-reviewer`, { reviewerId });
  return data.data;
}

// Client-wide export (ZIP of current-version files across every one of the
// client's orders + manifest.csv, or a CSV-only manifest), distinct from
// kycApi.js's order-scoped exportOrderKyc.
export async function exportClientKyc(clientId, format = 'zip') {
  const response = await apiClient.get(`/kyc/export/client/${clientId}?format=${format}`, { responseType: 'blob' });
  return response.data; // Blob
}
