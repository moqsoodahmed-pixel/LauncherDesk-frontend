/**
 * Mirrors backend/src/constants/kycStatus.js (per-document review status)
 * plus upload constraints mirrored from backend/src/middleware/kycUpload.js
 * and backend/src/services/fileSignature.service.js. The backend has no
 * public endpoint that reports MAX_KYC_FILE_SIZE_MB or the allowed MIME
 * list, so these are mirrored constants (same convention as every other
 * file in constants/) rather than fetched - kept in sync manually, and the
 * backend remains the authority on both regardless of what the UI checks
 * client-side first.
 */
export const KYC_DOCUMENT_STATUS = Object.freeze({
  NOT_UPLOADED: 'NOT_UPLOADED',
  UPLOADED: 'UPLOADED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
  // Part 5 enterprise KYC addition (mirrors backend/src/constants/portal/
  // kycStatus.js) - a reviewer outcome distinct from REJECTED: the document
  // itself is fine, but a cleaner re-scan/re-upload is requested. At the
  // order level this still reverts the order to KYC_REJECTED so the client
  // can re-upload (see backend kycState.service.js) - this is purely a
  // softer per-document label.
  NEED_REUPLOAD: 'NEED_REUPLOAD',
});

export const KYC_DOCUMENT_STATUS_LABELS = Object.freeze({
  NOT_UPLOADED: 'Not Uploaded',
  UPLOADED: 'Uploaded',
  UNDER_REVIEW: 'Under Review',
  VERIFIED: 'Verified',
  REJECTED: 'Rejected',
  NEED_REUPLOAD: 'Need Re-upload',
});

export function formatKycDocumentStatus(status) {
  return KYC_DOCUMENT_STATUS_LABELS[status] || status;
}

/**
 * NEW, additive (Part 5 enterprise KYC) client-facing display-status layer.
 * Mirrors backend/src/constants/portal/kycStatus.js's
 * KYC_CLIENT_DISPLAY_STATUS exactly (same 7 string values, used verbatim as
 * the `displayStatus` field the backend serializer attaches to each
 * document). Never replaces the real KYC_DOCUMENT_STATUS enum above.
 */
export const KYC_CLIENT_DISPLAY_STATUS = Object.freeze({
  PENDING: 'Pending',
  UPLOADED: 'Uploaded',
  UNDER_REVIEW: 'Under Review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  NEED_REUPLOAD: 'Need Re-upload',
  EXPIRED: 'Expired',
});

export const ALL_CLIENT_DISPLAY_STATUSES = Object.values(KYC_CLIENT_DISPLAY_STATUS);

/**
 * Client-side fallback for `displayStatus`: derives the same 7-value label
 * from a document's raw `status` (+ `validUntil`, when the backend sends
 * it) using the identical mapping as the backend's
 * services/portal/kycDisplayStatus.service.js. Used only when a document
 * object does not already carry a `displayStatus` field (e.g. while the
 * backend wave adding it to kyc.service.js's serializers is still landing),
 * so the new dashboards work either way and silently pick up the real
 * server-computed value the moment it appears.
 */
export function deriveClientDisplayStatus(doc) {
  if (!doc) return KYC_CLIENT_DISPLAY_STATUS.PENDING;
  if (doc.displayStatus) return doc.displayStatus;

  if (doc.status === KYC_DOCUMENT_STATUS.VERIFIED) {
    if (doc.validUntil && new Date(doc.validUntil).getTime() < Date.now()) {
      return KYC_CLIENT_DISPLAY_STATUS.EXPIRED;
    }
    return KYC_CLIENT_DISPLAY_STATUS.APPROVED;
  }
  switch (doc.status) {
    case KYC_DOCUMENT_STATUS.UPLOADED:
      return KYC_CLIENT_DISPLAY_STATUS.UPLOADED;
    case KYC_DOCUMENT_STATUS.UNDER_REVIEW:
      return KYC_CLIENT_DISPLAY_STATUS.UNDER_REVIEW;
    case KYC_DOCUMENT_STATUS.REJECTED:
      return KYC_CLIENT_DISPLAY_STATUS.REJECTED;
    case KYC_DOCUMENT_STATUS.NEED_REUPLOAD:
      return KYC_CLIENT_DISPLAY_STATUS.NEED_REUPLOAD;
    default:
      return KYC_CLIENT_DISPLAY_STATUS.PENDING;
  }
}

// backend/.env MAX_KYC_FILE_SIZE_MB (default 10, per .env.example).
export const MAX_KYC_FILE_SIZE_MB = 10;
export const MAX_KYC_FILE_SIZE_BYTES = MAX_KYC_FILE_SIZE_MB * 1024 * 1024;

export const ACCEPTED_KYC_FILE_EXTENSIONS = '.pdf,.jpg,.jpeg,.png';
export const ACCEPTED_KYC_MIME_TYPES = Object.freeze(['application/pdf', 'image/jpeg', 'image/png']);
