import { useNavigate } from 'react-router-dom';

const ACTIONS = [
  { label: 'New Client',    icon: '◉', path: '/super-admin/clients',       hint: 'Add a new client account' },
  { label: 'New Order',     icon: '▤', path: '/super-admin/orders/create',  hint: 'Place a new service order' },
  { label: 'New Service',   icon: '⬡', path: '/super-admin/services',       hint: 'Define a new service offering' },
  { label: 'Payments',      icon: '◈', path: '/super-admin/payments',       hint: 'Browse all transactions' },
  { label: 'Finance',       icon: '▥', path: '/super-admin/finance',        hint: 'Revenue and GST overview' },
  { label: 'Reports',       icon: '▦', path: '/super-admin/reports',        hint: 'Analytics and reports' },
  { label: 'Audit Logs',    icon: '▣', path: '/super-admin/audit-logs',     hint: 'Platform event history' },
  { label: 'Attention',     icon: '⊛', path: '/super-admin/attention',      hint: 'Items needing follow-up' },
  { label: 'Support',       icon: '◑', path: '/super-admin/support',        hint: 'Open support requests' },
  { label: 'Announcements', icon: '◍', path: '/super-admin/announcements',  hint: 'Post a system notice' },
  { label: 'Settings',      icon: '⚙', path: '/super-admin/settings',       hint: 'Platform configuration' },
  { label: 'Backup',        icon: '⊜', path: '/super-admin/backup',         hint: 'Backup management' },
];

export default function QuickActionsPanel() {
  const navigate = useNavigate();
  return (
    <div style={{
      background: 'var(--ld-glass-bg)',
      backdropFilter: 'var(--ld-glass-blur)',
      WebkitBackdropFilter: 'var(--ld-glass-blur)',
      border: 'var(--ld-glass-border)',
      borderRadius: 'var(--ld-radius-lg)',
      padding: '18px 22px',
      boxShadow: 'var(--ld-shadow-sm)',
    }}>
      <div style={{
        fontWeight: 800, fontSize: 10, marginBottom: 16,
        color: 'var(--ld-gold)', textTransform: 'uppercase', letterSpacing: '0.18em',
      }}>
        Quick Actions
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.path)}
            title={a.hint}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 8, padding: '14px 10px', borderRadius: 'var(--ld-radius)',
              border: '1px solid var(--ld-gold-border)',
              background: 'rgba(255,255,255,0.40)',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              fontSize: 11, fontWeight: 700, color: 'var(--ld-text-muted)',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212,165,116,0.18)';
              e.currentTarget.style.color = 'var(--ld-gold)';
              e.currentTarget.style.borderColor = 'var(--ld-gold)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--ld-shadow-sm)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.40)';
              e.currentTarget.style.color = 'var(--ld-text-muted)';
              e.currentTarget.style.borderColor = 'var(--ld-gold-border)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: 20, lineHeight: 1 }}>{a.icon}</span>
            <span style={{ textAlign: 'center', lineHeight: 1.25 }}>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
