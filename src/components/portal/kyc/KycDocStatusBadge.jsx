import { formatKycDocumentStatus, KYC_CLIENT_DISPLAY_STATUS } from '../../../constants/portal/kycStatus';

// Same inline-pill convention as components/order/OrderStatusBadge.jsx,
// just keyed on per-document KYC status rather than order status.
const TIER_COLORS = {
  success: { bg: '#dcfce7', fg: 'var(--ld-success)' },
  danger: { bg: '#fee2e2', fg: 'var(--ld-danger)' },
  warning: { bg: '#fef3c7', fg: 'var(--ld-warning)' },
  info: { bg: '#e0e7ff', fg: 'var(--ld-primary-dark)' },
  neutral: { bg: '#f1f5f9', fg: 'var(--ld-text-muted)' },
  // NEW (Part 5): muted amber-grey for the "Expired" display status - not
  // a failure like Rejected, not neutral-empty like Pending, so it gets its
  // own tier rather than overloading one of the original 5.
  expired: { bg: '#fde68a', fg: '#92400e' },
};

function tierFor(status) {
  if (status === 'VERIFIED') return 'success';
  if (status === 'REJECTED') return 'danger';
  if (status === 'UNDER_REVIEW') return 'info';
  if (status === 'UPLOADED') return 'warning';
  if (status === 'NEED_REUPLOAD') return 'warning';
  return 'neutral'; // NOT_UPLOADED
}

// NEW (Part 5 enterprise KYC): tiers for the 7 client-facing `displayStatus`
// values ('Pending' | 'Uploaded' | 'Under Review' | 'Approved' | 'Rejected'
// | 'Need Re-upload' | 'Expired'). Kept entirely separate from tierFor()
// above (the original per-document KYC_DOCUMENT_STATUS values) so neither
// mapping has to change shape to accommodate the other - existing callers
// passing `status` are completely unaffected.
function tierForDisplayStatus(displayStatus) {
  switch (displayStatus) {
    case KYC_CLIENT_DISPLAY_STATUS.APPROVED:
      return 'success';
    case KYC_CLIENT_DISPLAY_STATUS.REJECTED:
      return 'danger';
    case KYC_CLIENT_DISPLAY_STATUS.UNDER_REVIEW:
      return 'info';
    case KYC_CLIENT_DISPLAY_STATUS.UPLOADED:
      return 'warning';
    case KYC_CLIENT_DISPLAY_STATUS.NEED_REUPLOAD:
      return 'warning';
    case KYC_CLIENT_DISPLAY_STATUS.EXPIRED:
      return 'expired';
    default:
      return 'neutral'; // Pending
  }
}

/**
 * `status`: original per-document KYC_DOCUMENT_STATUS value (existing
 * callers - OrderDetailPage's AdminKycPanel/ClientKycPanel - keep working
 * unchanged).
 *
 * `displayStatus` (NEW, Part 5, additive): when passed, takes priority and
 * renders one of the 7 new client-facing display statuses with its own
 * color tier instead. Pass exactly one of the two props.
 */
export default function KycDocStatusBadge({ status, displayStatus }) {
  const tier = displayStatus
    ? TIER_COLORS[tierForDisplayStatus(displayStatus)]
    : TIER_COLORS[tierFor(status)];
  const label = displayStatus || formatKycDocumentStatus(status);

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 9px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        background: tier.bg,
        color: tier.fg,
      }}
    >
      {label}
    </span>
  );
}
