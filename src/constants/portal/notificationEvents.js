/**
 * Centralized in-app notification event catalogue, mirroring
 * backend/src/constants/notificationEvents.js. Label map only - the
 * backend remains the sole authority on the enum values themselves.
 * Same pattern as constants/communicationStatus.js (Phase 9).
 */
export const NOTIFICATION_EVENT = Object.freeze({
  ORDER_CREATED: 'ORDER_CREATED',
  ORDER_PAYMENT_PENDING: 'ORDER_PAYMENT_PENDING',
  ORDER_PAYMENT_CONFIRMED: 'ORDER_PAYMENT_CONFIRMED',
  ORDER_PAYMENT_FAILED: 'ORDER_PAYMENT_FAILED',
  ORDER_ASSIGNED: 'ORDER_ASSIGNED',
  ORDER_REASSIGNED: 'ORDER_REASSIGNED',
  ORDER_STATUS_CHANGED: 'ORDER_STATUS_CHANGED',
  ORDER_CANCELLED: 'ORDER_CANCELLED',
  ORDER_COMPLETED: 'ORDER_COMPLETED',
  ORDER_CLOSED: 'ORDER_CLOSED',

  KYC_SUBMITTED: 'KYC_SUBMITTED',
  KYC_REJECTED: 'KYC_REJECTED',
  KYC_VERIFIED: 'KYC_VERIFIED',
  KYC_DOCUMENT_REJECTED: 'KYC_DOCUMENT_REJECTED',

  PAYMENT_REFUNDED: 'PAYMENT_REFUNDED',

  CLIENT_CREATED: 'CLIENT_CREATED',
  CLIENT_UPDATED: 'CLIENT_UPDATED',
  CLIENT_STATUS_CHANGED: 'CLIENT_STATUS_CHANGED',

  ADMIN_CREATED: 'ADMIN_CREATED',
  ADMIN_UPDATED: 'ADMIN_UPDATED',
  ADMIN_DISABLED: 'ADMIN_DISABLED',
  ADMIN_ENABLED: 'ADMIN_ENABLED',

  PASSWORD_CHANGED: 'PASSWORD_CHANGED',
  SECURITY_EVENT: 'SECURITY_EVENT',
});

export const ALL_NOTIFICATION_EVENTS = Object.values(NOTIFICATION_EVENT);

const NOTIFICATION_EVENT_LABELS = Object.freeze({
  ORDER_CREATED: 'Order Created',
  ORDER_PAYMENT_PENDING: 'Payment Pending',
  ORDER_PAYMENT_CONFIRMED: 'Payment Confirmed',
  ORDER_PAYMENT_FAILED: 'Payment Failed',
  ORDER_ASSIGNED: 'Order Assigned',
  ORDER_REASSIGNED: 'Order Reassigned',
  ORDER_STATUS_CHANGED: 'Order Status Update',
  ORDER_CANCELLED: 'Order Cancelled',
  ORDER_COMPLETED: 'Order Completed',
  ORDER_CLOSED: 'Order Closed',
  KYC_SUBMITTED: 'KYC Submitted',
  KYC_REJECTED: 'KYC Rejected',
  KYC_VERIFIED: 'KYC Verified',
  KYC_DOCUMENT_REJECTED: 'KYC Document Rejected',
  PAYMENT_REFUNDED: 'Payment Refunded',
  CLIENT_CREATED: 'Client Created',
  CLIENT_UPDATED: 'Client Updated',
  CLIENT_STATUS_CHANGED: 'Client Status Changed',
  ADMIN_CREATED: 'Admin Created',
  ADMIN_UPDATED: 'Admin Updated',
  ADMIN_DISABLED: 'Admin Disabled',
  ADMIN_ENABLED: 'Admin Enabled',
  PASSWORD_CHANGED: 'Password Changed',
  SECURITY_EVENT: 'Security Event',
});

// Falls back to a generic title-cased version of the raw event for
// anything not listed here, so a future backend-only event addition
// doesn't render as a blank cell.
export function formatNotificationEvent(eventType) {
  if (NOTIFICATION_EVENT_LABELS[eventType]) return NOTIFICATION_EVENT_LABELS[eventType];
  if (!eventType) return '';
  return eventType
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export const NOTIFICATION_SEVERITY = Object.freeze({
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL',
});

// Same color-tier convention as CommunicationStatusBadge.jsx / KycDocStatusBadge.jsx.
const SEVERITY_TIER_COLORS = Object.freeze({
  INFO: { bg: '#e0e7ff', fg: 'var(--ld-primary-dark)' },
  SUCCESS: { bg: '#dcfce7', fg: 'var(--ld-success)' },
  WARNING: { bg: '#fef3c7', fg: 'var(--ld-warning)' },
  CRITICAL: { bg: '#fee2e2', fg: 'var(--ld-danger)' },
});

export function getSeverityColors(severity) {
  return SEVERITY_TIER_COLORS[severity] || SEVERITY_TIER_COLORS.INFO;
}

export function formatSeverity(severity) {
  if (!severity) return '';
  return severity.charAt(0) + severity.slice(1).toLowerCase();
}
