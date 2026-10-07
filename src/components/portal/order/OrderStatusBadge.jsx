import { formatOrderStatus } from '../../../constants/portal/orderStatus';

const TIER_COLORS = {
  success: { bg: '#dcfce7', fg: 'var(--ld-success)' },
  danger: { bg: '#fee2e2', fg: 'var(--ld-danger)' },
  warning: { bg: '#fef3c7', fg: 'var(--ld-warning)' },
  info: { bg: '#e0e7ff', fg: 'var(--ld-primary-dark)' },
};

function tierFor(status) {
  if (['COMPLETED', 'DELIVERED', 'CLOSED', 'ARCHIVED', 'PAYMENT_CONFIRMED', 'PAID'].includes(status)) return 'success';
  if (['CANCELLED', 'KYC_REJECTED', 'FAILED'].includes(status)) return 'danger';
  if (['IN_PROGRESS', 'QUALITY_CHECK', 'ASSIGNED', 'KYC_VERIFICATION'].includes(status)) return 'info';
  return 'warning';
}

/** One presentation layer for order/payment status - label + color - reused
 * everywhere in the client portal instead of formatting status strings per
 * component. */
export default function OrderStatusBadge({ status }) {
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
      {formatOrderStatus(status)}
    </span>
  );
}
