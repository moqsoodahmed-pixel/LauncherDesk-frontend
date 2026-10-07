import { formatKycDocumentStatus } from '../../../constants/portal/kycStatus';

// Same inline-pill convention as components/order/OrderStatusBadge.jsx,
// just keyed on per-document KYC status rather than order status.
const TIER_COLORS = {
  success: { bg: '#dcfce7', fg: 'var(--ld-success)' },
  danger: { bg: '#fee2e2', fg: 'var(--ld-danger)' },
  warning: { bg: '#fef3c7', fg: 'var(--ld-warning)' },
  info: { bg: '#e0e7ff', fg: 'var(--ld-primary-dark)' },
  neutral: { bg: '#f1f5f9', fg: 'var(--ld-text-muted)' },
};

function tierFor(status) {
  if (status === 'VERIFIED') return 'success';
  if (status === 'REJECTED') return 'danger';
  if (status === 'UNDER_REVIEW') return 'info';
  if (status === 'UPLOADED') return 'warning';
  return 'neutral'; // NOT_UPLOADED
}

export default function KycDocStatusBadge({ status }) {
  const tier = TIER_COLORS[tierFor(status)];
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
      {formatKycDocumentStatus(status)}
    </span>
  );
}
