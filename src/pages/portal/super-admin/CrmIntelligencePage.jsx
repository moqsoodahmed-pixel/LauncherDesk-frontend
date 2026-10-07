import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import { getCrmClients, getCrmSegments } from '../../../services/portal/crmApi';

function rupees(v) {
  if (v == null) return '—';
  return `₹${Number(v).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

const SEGMENT_COLORS = {
  HIGH_VALUE: { bg: '#dcfce7', color: '#15803d', label: 'High Value' },
  NEW: { bg: '#dbeafe', color: '#1d4ed8', label: 'New' },
  INACTIVE: { bg: '#fee2e2', color: '#b91c1c', label: 'Inactive' },
  REGULAR: { bg: '#fef9c3', color: '#a16207', label: 'Regular' },
  AT_RISK: { bg: '#ffe4e6', color: '#be123c', label: 'At Risk' },
  CHURNED: { bg: '#f3f4f6', color: '#6b7280', label: 'Churned' },
};

function SegmentBadge({ segment }) {
  const cfg = SEGMENT_COLORS[segment] || { bg: '#f3f4f6', color: '#374151', label: segment };
  return (
    <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

function StatCard({ label, value, color, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--ld-surface)', border: '1px solid var(--ld-border)',
      borderRadius: 10, padding: '14px 16px', cursor: onClick ? 'pointer' : undefined,
      borderTop: color ? `3px solid ${color}` : undefined,
      transition: 'box-shadow 0.15s',
    }}>
      <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>{value ?? '—'}</div>
    </div>
  );
}

const SEGMENT_KEYS = ['ALL', 'HIGH_VALUE', 'NEW', 'REGULAR', 'AT_RISK', 'INACTIVE', 'CHURNED'];
const SEGMENT_COLORS_LIST = { HIGH_VALUE: '#10b981', NEW: '#6366f1', REGULAR: '#f59e0b', AT_RISK: '#ef4444', INACTIVE: '#6b7280', CHURNED: '#374151' };

export default function CrmIntelligencePage() {
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState('ALL');
  const [clients, setClients] = useState([]);
  const [segments, setSegments] = useState({});
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('lifetimeValue');
  const [sortDir, setSortDir] = useState('desc');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [clientRes, segRes] = await Promise.all([
        getCrmClients({ segment: activeSegment === 'ALL' ? undefined : activeSegment, search: search || undefined, sortBy, sortDir }),
        getCrmSegments(),
      ]);
      setClients(clientRes.items || []);
      setMeta(clientRes.meta || {});
      setSegments(segRes || {});
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load CRM data.');
    } finally {
      setLoading(false);
    }
  }, [activeSegment, search, sortBy, sortDir]);

  useEffect(() => { load(); }, [load]);

  function toggleSort(field) {
    if (sortBy === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortBy(field); setSortDir('desc'); }
  }

  function SortTh({ field, children }) {
    const active = sortBy === field;
    return (
      <th onClick={() => toggleSort(field)} style={{
        padding: '9px 12px', textAlign: 'left', fontWeight: 700, fontSize: 11,
        color: active ? 'var(--ld-primary)' : 'var(--ld-text-muted)',
        cursor: 'pointer', userSelect: 'none', borderBottom: '1px solid var(--ld-border)',
        whiteSpace: 'nowrap',
      }}>
        {children} {active ? (sortDir === 'asc' ? '↑' : '↓') : ''}
      </th>
    );
  }

  return (
    <div>
      <PageHeader title="CRM Intelligence" subtitle="Client segments, lifetime value, engagement signals" />

      {/* Segment cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 20 }}>
        {SEGMENT_KEYS.filter((k) => k !== 'ALL').map((k) => (
          <StatCard
            key={k}
            label={SEGMENT_COLORS[k]?.label || k}
            value={segments[k] ?? 0}
            color={SEGMENT_COLORS_LIST[k]}
            onClick={() => setActiveSegment(k)}
          />
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {SEGMENT_KEYS.map((k) => (
            <button
              key={k}
              className={activeSegment === k ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}
              onClick={() => setActiveSegment(k)}
            >
              {k === 'ALL' ? 'All' : (SEGMENT_COLORS[k]?.label || k)}
            </button>
          ))}
        </div>
        <input
          className="ld-input"
          style={{ marginLeft: 'auto', width: 220, fontSize: 13 }}
          placeholder="Search client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && load()}
        />
        <button className="ld-btn-secondary ld-btn-sm" onClick={load}>Search</button>
      </div>

      {loading ? <LoadingState /> : error ? <ErrorState message={error} /> : (
        <>
          <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginBottom: 10 }}>
            {meta.total ?? clients.length} clients
          </div>
          <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead style={{ background: 'var(--ld-bg)' }}>
                <tr>
                  <SortTh field="clientCode">Client ID</SortTh>
                  <th style={{ padding: '9px 12px', fontWeight: 700, fontSize: 11, color: 'var(--ld-text-muted)', borderBottom: '1px solid var(--ld-border)' }}>Name</th>
                  <th style={{ padding: '9px 12px', fontWeight: 700, fontSize: 11, color: 'var(--ld-text-muted)', borderBottom: '1px solid var(--ld-border)' }}>Segment</th>
                  <SortTh field="lifetimeValue">Lifetime Value</SortTh>
                  <SortTh field="totalOrders">Orders</SortTh>
                  <SortTh field="activeOrders">Active</SortTh>
                  <SortTh field="openTickets">Tickets</SortTh>
                  <SortTh field="kycCount">KYC Docs</SortTh>
                  <th style={{ padding: '9px 12px', fontWeight: 700, fontSize: 11, color: 'var(--ld-text-muted)', borderBottom: '1px solid var(--ld-border)' }}>Last Order</th>
                  <th style={{ padding: '9px 12px', fontWeight: 700, fontSize: 11, color: 'var(--ld-text-muted)', borderBottom: '1px solid var(--ld-border)' }}>Health</th>
                  <th style={{ padding: '9px 12px', borderBottom: '1px solid var(--ld-border)' }} />
                </tr>
              </thead>
              <tbody>
                {clients.length === 0 && (
                  <tr><td colSpan={11} style={{ padding: 32, textAlign: 'center', color: 'var(--ld-text-muted)', fontSize: 13 }}>No clients found.</td></tr>
                )}
                {clients.map((c) => (
                  <tr key={c._id} style={{ borderBottom: '1px solid var(--ld-border)', cursor: 'pointer' }}
                    onClick={() => navigate(`/super-admin/clients/${c._id}`)}>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--ld-primary)' }}>{c.clientCode}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>
                      {c.name}<br />
                      <span style={{ fontSize: 11, color: 'var(--ld-text-muted)', fontWeight: 400 }}>{c.email}</span>
                    </td>
                    <td style={{ padding: '10px 12px' }}><SegmentBadge segment={c.segment} /></td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#10b981' }}>{rupees(c.lifetimeValue)}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>{c.totalOrders ?? 0}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>{c.activeOrders ?? 0}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>{c.openTickets ?? 0}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>{c.kycCount ?? 0}</td>
                    <td style={{ padding: '10px 12px', fontSize: 11, color: 'var(--ld-text-muted)' }}>
                      {c.lastOrderAt ? new Date(c.lastOrderAt).toLocaleDateString() : '—'}
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      {c.healthScore !== undefined ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                            background: c.healthScore >= 65 ? '#dcfce7' : c.healthScore >= 45 ? '#fef9c3' : '#fee2e2',
                            color: c.healthScore >= 65 ? '#15803d' : c.healthScore >= 45 ? '#854d0e' : '#b91c1c',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 10, fontWeight: 800, border: '1px solid currentColor',
                          }}>
                            {c.healthScore}
                          </div>
                          <span style={{
                            fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                            color: c.churnRisk === 'HIGH' ? '#b91c1c' : c.churnRisk === 'MEDIUM' ? '#854d0e' : '#15803d',
                          }}>
                            {c.churnRisk}
                          </span>
                        </div>
                      ) : '—'}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <button className="ld-btn-secondary ld-btn-sm" onClick={(e) => { e.stopPropagation(); navigate(`/super-admin/clients/${c._id}`); }}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
