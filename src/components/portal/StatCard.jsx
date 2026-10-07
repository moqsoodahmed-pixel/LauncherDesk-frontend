import { useNavigate } from 'react-router-dom';

/**
 * KPI stat card — Aurelius glassmorphism style.
 * Optional `icon` renders a colored icon box.
 * Optional `trend` renders a colored trend badge (e.g. "+12.5%").
 * Optional `trendUp` (bool) colours the badge green/red.
 */
export default function StatCard({ label, value, to, color, icon, trend, trendUp }) {
  const navigate = useNavigate();
  const clickable = Boolean(to);

  return (
    <div
      className={`ld-card${clickable ? ' ld-card-clickable' : ''}`}
      style={{
        borderTop: color ? `3px solid ${color}` : '3px solid transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        minWidth: 0,
      }}
      onClick={clickable ? () => navigate(to) : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => e.key === 'Enter' && navigate(to) : undefined}
    >
      {/* Top row: icon box + trend badge */}
      {(icon || trend) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {icon ? (
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: color ? `${color}18` : 'rgba(212,165,116,0.10)',
              border: `1px solid ${color ? `${color}30` : 'rgba(212,165,116,0.22)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 17, color: color || 'var(--ld-gold)',
            }}>
              {icon}
            </div>
          ) : <span />}
          {trend && (
            <span style={{
              fontSize: 10, fontWeight: 800, padding: '3px 8px',
              borderRadius: 8,
              background: trendUp === false
                ? 'rgba(244,63,94,0.10)'
                : 'rgba(16,185,129,0.10)',
              color: trendUp === false ? '#e11d48' : '#059669',
              border: `1px solid ${trendUp === false ? 'rgba(244,63,94,0.20)' : 'rgba(16,185,129,0.20)'}`,
            }}>
              {trend}
            </span>
          )}
        </div>
      )}

      <div className="ld-card-label">{label}</div>
      <div className="ld-card-value" style={color ? { color } : undefined}>{value ?? '—'}</div>
      {clickable && <div className="ld-card-arrow">→</div>}
    </div>
  );
}
