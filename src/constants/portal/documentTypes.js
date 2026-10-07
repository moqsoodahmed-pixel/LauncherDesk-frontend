/**
 * Mirrors backend/src/constants/documentTypes.js. Kept in sync manually,
 * same convention as constants/orderStatus.js and constants/permissions.js.
 */
export const DOCUMENT_TYPES = Object.freeze({
  PAN: 'PAN',
  AADHAAR: 'AADHAAR',
  GST_CERTIFICATE: 'GST_CERTIFICATE',
  COMPANY_REGISTRATION: 'COMPANY_REGISTRATION',
  ADDRESS_PROOF: 'ADDRESS_PROOF',
  BUSINESS_PROOF: 'BUSINESS_PROOF',
  OTHER: 'OTHER',
});

export const ALL_DOCUMENT_TYPES = Object.values(DOCUMENT_TYPES);

// Fallback labels only - the backend always sends the real per-order label
// (order.serviceSnapshot.requiredDocuments[].label) in the KYC summary, so
// this is just used if a label is ever missing.
export const DOCUMENT_TYPE_LABELS = Object.freeze({
  PAN: 'PAN Card',
  AADHAAR: 'Aadhaar Card',
  GST_CERTIFICATE: 'GST Certificate',
  COMPANY_REGISTRATION: 'Company Registration Certificate',
  ADDRESS_PROOF: 'Address Proof',
  BUSINESS_PROOF: 'Business Proof',
  OTHER: 'Other Document',
});

export function formatDocumentType(type) {
  return DOCUMENT_TYPE_LABELS[type] || type;
}
