import { formatCommunicationChannel } from '../../../constants/portal/communicationStatus';

// Small, consistently-colored tag per channel - purely cosmetic, no status
// meaning (that's CommunicationStatusBadge's job).
const CHANNEL_COLORS = {
  EMAIL: { bg: '#e0e7ff', fg: 'var(--ld-primary-dark)' },
  WHATSAPP: { bg: '#dcfce7', fg: 'var(--ld-success)' },
  SMS: { bg: '#f1f5f9', fg: 'var(--ld-text-muted)' },
};

export default function CommunicationChannelBadge({ channel }) {
  const colors = CHANNEL_COLORS[channel] || CHANNEL_COLORS.SMS;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 9px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        background: colors.bg,
        color: colors.fg,
      }}
    >
      {formatCommunicationChannel(channel)}
    </span>
  );
}
