/**
 * Mirrors backend/src/constants/portal/businessTypes.js. New, additive
 * (Part 5 enterprise KYC) - a nullable field on the Client model that
 * drives services/portal/kycRequirements.service.js's document-type
 * resolver (exposed to the frontend via GET /client/kyc/requirements).
 * Kept in sync manually, same convention as every other file in
 * constants/portal/.
 */
export const BUSINESS_TYPES = Object.freeze({
  INDIVIDUAL: 'INDIVIDUAL',
  FREELANCER: 'FREELANCER',
  STARTUP: 'STARTUP',
  PRIVATE_LIMITED: 'PRIVATE_LIMITED',
  LLP: 'LLP',
  PARTNERSHIP: 'PARTNERSHIP',
  NGO: 'NGO',
  TRUST: 'TRUST',
  SOLE_PROPRIETOR: 'SOLE_PROPRIETOR',
  GOVERNMENT_ORGANIZATION: 'GOVERNMENT_ORGANIZATION',
  EDUCATIONAL_INSTITUTION: 'EDUCATIONAL_INSTITUTION',
  FOREIGN_CLIENT: 'FOREIGN_CLIENT',
});

export const ALL_BUSINESS_TYPES = Object.values(BUSINESS_TYPES);

export const BUSINESS_TYPE_LABELS = Object.freeze({
  INDIVIDUAL: 'Individual',
  FREELANCER: 'Freelancer',
  STARTUP: 'Startup',
  PRIVATE_LIMITED: 'Private Limited Company',
  LLP: 'LLP',
  PARTNERSHIP: 'Partnership Firm',
  NGO: 'NGO',
  TRUST: 'Trust',
  SOLE_PROPRIETOR: 'Sole Proprietorship',
  GOVERNMENT_ORGANIZATION: 'Government Organization',
  EDUCATIONAL_INSTITUTION: 'Educational Institution',
  FOREIGN_CLIENT: 'Foreign Client',
});

export function formatBusinessType(type) {
  return BUSINESS_TYPE_LABELS[type] || type || 'Not set';
}
