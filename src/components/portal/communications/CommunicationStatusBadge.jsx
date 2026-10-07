import { formatCommunicationStatus } from '../../../constants/portal/communicationStatus';

// Same inline-pill convention as KycDocStatusBadge.jsx / OrderStatusBadge.jsx,
// just keyed on communication delivery status.
const TIER_COLORS = {
  success: { bg: '#dcfce7', fg: 'var(--ld-success)' },
  danger: { bg: '#fee2e2', fg: 'var(--ld-danger)' },
  warning: { bg: '#fef3c7', fg: 'var(--ld-warning)' },
  info: { bg: '#e0e7ff', fg: 'var(--ld-primary-dark)' },
  neutral: { bg: '#f1f5f9', fg: 'var(--ld-text-muted)' },
};

function tierFor(status) {
  if (status === 'DELIVERED' || status === 'SENT') return 'success';
  if (status === 'FAILED') return 'danger';
  if (status === 'RETRYING') return 'warning';
  if (status === 'SENDING' || status === 'QUEUED') return 'info';
  return 'neutral'; // CANCELLED
}

export default function CommunicationStatusBadge({ status }) {
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
      {formatCommunicationStatus(status)}
    </span>
  );
}
