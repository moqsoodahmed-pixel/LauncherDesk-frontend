export default function SlaIndicator({ slaDeadline, slaStatus }) {
  if (!slaDeadline) return null;

  const deadline = new Date(slaDeadline);
  const now = new Date();
  const diffMs = deadline - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let color = '#16a34a'; // on time
  let label = `${diffDays}d left`;
  let bg = '#f0fdf4';
  let border = '#bbf7d0';

  if (slaStatus === 'COMPLETED') {
    color = '#1d4ed8'; bg = '#eff6ff'; border = '#bfdbfe'; label = 'SLA Met';
  } else if (diffMs < 0) {
    color = '#b91c1c'; bg = '#fef2f2'; border = '#fecaca'; label = `${Math.abs(diffDays)}d overdue`;
  } else if (diffDays <= 2) {
    color = '#c2410c'; bg = '#fff7ed'; border = '#fed7aa'; label = `${diffDays}d left`;
  }

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: bg, color, border: `1px solid ${border}`,
    }}>
      ⏱ SLA: {label} · Due {deadline.toLocaleDateString()}
    </span>
  );
}
