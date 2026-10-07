import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import { getAttentionItems } from '../../../services/portal/crmApi';

const PRIORITY_CFG = {
  CRITICAL: { bg: '#fee2e2', color: '#b91c1c', border: '#fca5a5', icon: '🔴' },
  HIGH: { bg: '#fff7ed', color: '#c2410c', border: '#fdba74', icon: '🟠' },
  MEDIUM: { bg: '#fef9c3', color: '#a16207', border: '#fde047', icon: '🟡' },
  LOW: { bg: '#f0fdf4', color: '#15803d', border: '#86efac', icon: '🟢' },
};

function timeSince(dt) {
  if (!dt) return '—';
  const seconds = Math.floor((Date.now() - new Date(dt)) / 1000);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function PriorityBadge({ priority }) {
  const cfg = PRIORITY_CFG[priority] || { bg: '#f3f4f6', color: '#374151', icon: '⚪' };
  return (
    <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 10, fontWeight: 800, background: cfg.bg, color: cfg.color }}>
      {cfg.icon} {priority}
    </span>
  );
}

const ALL_PRIORITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

export default function RequiresAttentionPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ALL');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setItems(await getAttentionItems());
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load attention items.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = filter === 'ALL' ? items : items.filter((i) => i.priority === filter);

  const counts = ALL_PRIORITIES.reduce((acc, p) => {
    acc[p] = items.filter((i) => i.priority === p).length;
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        title="Requires Attention"
        subtitle="Business items needing human follow-up — sorted by priority"
      />

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {ALL_PRIORITIES.map((p) => {
          const cfg = PRIORITY_CFG[p];
          return (
            <div key={p} onClick={() => setFilter(p)} style={{
              background: filter === p ? cfg.bg : 'var(--ld-surface)',
              border: `1px solid ${filter === p ? cfg.border : 'var(--ld-border)'}`,
              borderRadius: 10, padding: '14px 16px', cursor: 'pointer',
            }}>
              <div style={{ fontSize: 11, color: filter === p ? cfg.color : 'var(--ld-text-muted)', marginBottom: 6, fontWeight: 600 }}>
                {cfg.icon} {p}
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: filter === p ? cfg.color : 'var(--ld-text)' }}>{counts[p] || 0}</div>
            </div>
          );
        })}
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <button className={filter === 'ALL' ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'} onClick={() => setFilter('ALL')}>
          All ({items.length})
        </button>
        {ALL_PRIORITIES.map((p) => (
          <button key={p} className={filter === p ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'} onClick={() => setFilter(p)}>
            {p} ({counts[p] || 0})
          </button>
        ))}
        <button className="ld-btn-secondary ld-btn-sm" style={{ marginLeft: 'auto' }} onClick={load}>Refresh</button>
      </div>

      {loading ? <LoadingState /> : error ? <ErrorState message={error} /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.length === 0 && (
            <div style={{
              background: 'var(--ld-surface)', border: '1px solid var(--ld-border)',
              borderRadius: 10, padding: 40, textAlign: 'center', color: 'var(--ld-text-muted)', fontSize: 14,
            }}>
              No items requiring attention in this category.
            </div>
          )}
          {filtered.map((item) => {
            const cfg = PRIORITY_CFG[item.priority] || {};
            return (
              <div key={item.id || item.orderCode} style={{
                background: 'var(--ld-surface)',
                border: `1px solid ${cfg.border || 'var(--ld-border)'}`,
                borderLeft: `4px solid ${cfg.color || 'var(--ld-border)'}`,
                borderRadius: 10, padding: '14px 18px',
                display: 'flex', alignItems: 'flex-start', gap: 16,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                    <PriorityBadge priority={item.priority} />
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: 'var(--ld-primary)', cursor: 'pointer' }}
                      onClick={() => navigate(item.link || `/super-admin/orders/${item.id}`)}>
                      {item.orderCode}
                    </span>
                    <span style={{
                      padding: '1px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600,
                      background: 'var(--ld-bg)', color: 'var(--ld-text-muted)', border: '1px solid var(--ld-border)',
                    }}>
                      {item.status}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: cfg.color }}>{item.issue}</div>

                  <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginBottom: 6 }}>
                    {item.suggestedAction}
                  </div>

                  <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--ld-text-muted)', flexWrap: 'wrap' }}>
                    {item.clientCode && <span>Client: <strong>{item.clientCode}</strong>{item.clientName ? ` — ${item.clientName}` : ''}</span>}
                    {item.assignedAdmin && <span>Admin: <strong>{item.assignedAdmin.name}</strong> ({item.assignedAdmin.code})</span>}
                    {item.elapsedSince && <span>Last moved: <strong>{timeSince(item.elapsedSince)}</strong></span>}
                    {item.slaDeadline && (
                      <span style={{ color: new Date(item.slaDeadline) < new Date() ? '#ef4444' : '#f59e0b', fontWeight: 600 }}>
                        SLA deadline: {new Date(item.slaDeadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button
                    className="ld-btn-primary ld-btn-sm"
                    onClick={() => navigate(item.link || `/super-admin/orders/${item.id}`)}
                  >
                    Open Order
                  </button>
                  {item.clientCode && (
                    <button
                      className="ld-btn-secondary ld-btn-sm"
                      onClick={() => navigate(`/super-admin/clients/${item.clientId || ''}`)}
                    >
                      Client
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
