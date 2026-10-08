/**
 * Mirrors backend/src/constants/portal/documentTypes.js. Kept in sync
 * manually, same convention as constants/orderStatus.js and
 * constants/permissions.js.
 *
 * Part 5 enterprise KYC expansion: the original 7 values (PAN, AADHAAR,
 * GST_CERTIFICATE, COMPANY_REGISTRATION, ADDRESS_PROOF, BUSINESS_PROOF,
 * OTHER) are kept EXACTLY as-is - existing Service.requiredDocuments
 * snapshots and KycDocument rows reference them. Everything below is NEW
 * and purely additive, expanding the catalog for the business-type-driven
 * requirements resolver (GET /client/kyc/requirements) and the new
 * client/admin KYC dashboards.
 */
export const DOCUMENT_TYPES = Object.freeze({
  // ── Original catalog (DO NOT rename/remove) ─────────────────────────────
  PAN: 'PAN',
  AADHAAR: 'AADHAAR',
  GST_CERTIFICATE: 'GST_CERTIFICATE',
  COMPANY_REGISTRATION: 'COMPANY_REGISTRATION',
  ADDRESS_PROOF: 'ADDRESS_PROOF',
  BUSINESS_PROOF: 'BUSINESS_PROOF',
  OTHER: 'OTHER',

  // ── Identity documents ───────────────────────────────────────────────────
  PAN_CARD: 'PAN_CARD',
  AADHAAR_FRONT: 'AADHAAR_FRONT',
  AADHAAR_BACK: 'AADHAAR_BACK',
  PASSPORT: 'PASSPORT',
  DRIVING_LICENSE: 'DRIVING_LICENSE',
  VOTER_ID: 'VOTER_ID',

  // ── Business / entity registration documents ────────────────────────────
  BUSINESS_REGISTRATION: 'BUSINESS_REGISTRATION',
  INCORPORATION_CERTIFICATE: 'INCORPORATION_CERTIFICATE',
  MSME_CERTIFICATE: 'MSME_CERTIFICATE',
  TRADEMARK_CERTIFICATE: 'TRADEMARK_CERTIFICATE',
  SHOP_LICENSE: 'SHOP_LICENSE',
  PARTNERSHIP_DEED: 'PARTNERSHIP_DEED',
  LLP_AGREEMENT: 'LLP_AGREEMENT',
  MOA: 'MOA',
  AOA: 'AOA',
  BOARD_RESOLUTION: 'BOARD_RESOLUTION',

  // ── Banking documents ────────────────────────────────────────────────────
  BANK_PASSBOOK: 'BANK_PASSBOOK',
  CANCELLED_CHEQUE: 'CANCELLED_CHEQUE',
  CURRENT_ACCOUNT_STATEMENT: 'CURRENT_ACCOUNT_STATEMENT',

  // ── Address / premises proof ─────────────────────────────────────────────
  UTILITY_BILL: 'UTILITY_BILL',
  OFFICE_PHOTO: 'OFFICE_PHOTO',

  // ── Signatory / authorization documents ──────────────────────────────────
  OWNER_PHOTO: 'OWNER_PHOTO',
  AUTHORIZED_SIGNATORY: 'AUTHORIZED_SIGNATORY',
  DIGITAL_SIGNATURE: 'DIGITAL_SIGNATURE',

  // ── Catch-all ────────────────────────────────────────────────────────────
  ADDITIONAL_DOCUMENT: 'ADDITIONAL_DOCUMENT',
  OTHER_DOCUMENT: 'OTHER_DOCUMENT',
});

export const ALL_DOCUMENT_TYPES = Object.values(DOCUMENT_TYPES);

// Fallback labels only - the backend always sends the real per-order label
// (order.serviceSnapshot.requiredDocuments[].label) in the KYC summary, so
// this is just used when a label is ever missing (e.g. the new
// business-type requirements list, which returns bare type strings).
export const DOCUMENT_TYPE_LABELS = Object.freeze({
  PAN: 'PAN Card',
  AADHAAR: 'Aadhaar Card',
  GST_CERTIFICATE: 'GST Certificate',
  COMPANY_REGISTRATION: 'Company Registration Certificate',
  ADDRESS_PROOF: 'Address Proof',
  BUSINESS_PROOF: 'Business Proof',
  OTHER: 'Other Document',

  PAN_CARD: 'PAN Card',
  AADHAAR_FRONT: 'Aadhaar Card (Front)',
  AADHAAR_BACK: 'Aadhaar Card (Back)',
  PASSPORT: 'Passport',
  DRIVING_LICENSE: 'Driving License',
  VOTER_ID: 'Voter ID',

  BUSINESS_REGISTRATION: 'Business Registration',
  INCORPORATION_CERTIFICATE: 'Certificate of Incorporation',
  MSME_CERTIFICATE: 'MSME / Udyam Certificate',
  TRADEMARK_CERTIFICATE: 'Trademark Certificate',
  SHOP_LICENSE: 'Shop & Establishment License',
  PARTNERSHIP_DEED: 'Partnership Deed',
  LLP_AGREEMENT: 'LLP Agreement',
  MOA: 'Memorandum of Association (MOA)',
  AOA: 'Articles of Association (AOA)',
  BOARD_RESOLUTION: 'Board Resolution',

  BANK_PASSBOOK: 'Bank Passbook',
  CANCELLED_CHEQUE: 'Cancelled Cheque',
  CURRENT_ACCOUNT_STATEMENT: 'Current Account Statement',

  UTILITY_BILL: 'Utility Bill',
  OFFICE_PHOTO: 'Office Photograph',

  OWNER_PHOTO: "Owner's Photograph",
  AUTHORIZED_SIGNATORY: 'Authorized Signatory Proof',
  DIGITAL_SIGNATURE: 'Digital Signature Certificate (DSC)',

  ADDITIONAL_DOCUMENT: 'Additional Document',
  OTHER_DOCUMENT: 'Other Document',
});

export function formatDocumentType(type) {
  return DOCUMENT_TYPE_LABELS[type] || type;
}
