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
});

export const KYC_DOCUMENT_STATUS_LABELS = Object.freeze({
  NOT_UPLOADED: 'Not Uploaded',
  UPLOADED: 'Uploaded',
  UNDER_REVIEW: 'Under Review',
  VERIFIED: 'Verified',
  REJECTED: 'Rejected',
});

export function formatKycDocumentStatus(status) {
  return KYC_DOCUMENT_STATUS_LABELS[status] || status;
}

// backend/.env MAX_KYC_FILE_SIZE_MB (default 10, per .env.example).
export const MAX_KYC_FILE_SIZE_MB = 10;
export const MAX_KYC_FILE_SIZE_BYTES = MAX_KYC_FILE_SIZE_MB * 1024 * 1024;

export const ACCEPTED_KYC_FILE_EXTENSIONS = '.pdf,.jpg,.jpeg,.png';
export const ACCEPTED_KYC_MIME_TYPES = Object.freeze(['application/pdf', 'image/jpeg', 'image/png']);
