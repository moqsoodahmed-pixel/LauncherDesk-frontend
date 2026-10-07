/**
 * Mirrors backend/src/constants/communicationStatus.js,
 * communicationChannels.js and communicationEvents.js. Label maps only -
 * the backend remains the sole authority on the enum values themselves.
 */
export const COMMUNICATION_CHANNEL = Object.freeze({
  EMAIL: 'EMAIL',
  WHATSAPP: 'WHATSAPP',
  SMS: 'SMS',
});

export const COMMUNICATION_CHANNEL_LABELS = Object.freeze({
  EMAIL: 'Email',
  WHATSAPP: 'WhatsApp',
  SMS: 'SMS',
});

export function formatCommunicationChannel(channel) {
  return COMMUNICATION_CHANNEL_LABELS[channel] || channel;
}

export const COMMUNICATION_STATUS = Object.freeze({
  QUEUED: 'QUEUED',
  SENDING: 'SENDING',
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED',
  RETRYING: 'RETRYING',
  CANCELLED: 'CANCELLED',
});

export const COMMUNICATION_STATUS_LABELS = Object.freeze({
  QUEUED: 'Queued',
  SENDING: 'Sending',
  SENT: 'Sent',
  DELIVERED: 'Delivered',
  FAILED: 'Failed',
  RETRYING: 'Retrying',
  CANCELLED: 'Cancelled',
});

export function formatCommunicationStatus(status) {
  return COMMUNICATION_STATUS_LABELS[status] || status;
}

// Humanized labels for the event catalogue
// (backend/src/constants/communicationEvents.js). Falls back to a generic
// title-cased version of the raw event for anything not listed here, so a
// future backend-only event addition doesn't render as a blank cell.
const COMMUNICATION_EVENT_LABELS = Object.freeze({
  ORDER_CREATED: 'Order Confirmation',
  ORDER_PAYMENT_PENDING: 'Payment Pending',
  ORDER_PAYMENT_CONFIRMED: 'Payment Confirmed',
  ORDER_PAYMENT_FAILED: 'Payment Failed',
  ORDER_ASSIGNED: 'Order Assigned',
  ORDER_STATUS_CHANGED: 'Order Status Update',
  ORDER_CANCELLED: 'Order Cancelled',
  ORDER_COMPLETED: 'Order Completed',
  ORDER_CLOSED: 'Order Closed',
  KYC_SUBMITTED: 'KYC Submitted',
  KYC_REJECTED: 'KYC Rejected',
  KYC_VERIFIED: 'KYC Verified',
  KYC_DOCUMENT_REJECTED: 'KYC Document Rejected',
  PAYMENT_REFUNDED: 'Payment Refunded',
});

export function formatCommunicationEvent(eventType) {
  if (COMMUNICATION_EVENT_LABELS[eventType]) return COMMUNICATION_EVENT_LABELS[eventType];
  if (!eventType) return '';
  return eventType
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
