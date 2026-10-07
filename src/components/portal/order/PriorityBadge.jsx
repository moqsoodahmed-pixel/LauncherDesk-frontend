const PRIORITY_STYLES = {
  LOW:      { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
  MEDIUM:   { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  HIGH:     { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  CRITICAL: { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' },
  URGENT:   { bg: '#4c0519', color: '#fda4af', border: '#9f1239' },
};

export default function PriorityBadge({ priority }) {
  if (!priority) return null;
  const s = PRIORITY_STYLES[priority] || PRIORITY_STYLES.MEDIUM;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      letterSpacing: '0.04em',
    }}>
      {priority === 'URGENT' || priority === 'CRITICAL' ? '🔴' : priority === 'HIGH' ? '🟠' : priority === 'LOW' ? '🟢' : '🔵'}
      {' '}{priority}
    </span>
  );
}
