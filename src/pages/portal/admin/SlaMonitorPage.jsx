import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import apiClient from '../../../services/portal/apiClient';
import formatRelativeTime from '../../../utils/portal/formatRelativeTime';

const ACTIVE_STATUSES = ['ASSIGNED', 'IN_PROGRESS', 'DOC_REQUESTED', 'TASK_ASSIGNED', 'UNDER_REVIEW'];

function SlaBar({ hoursOverdue, hoursRemaining }) {
  if (hoursOverdue > 0) {
    return (
      <span style={{ fontSize: 12, fontWeight: 700, color: '#b91c1c' }}>
        {hoursOverdue}h overdue
      </span>
    );
  }
  if (hoursRemaining != null) {
    const urgent = hoursRemaining < 24;
    return (
      <span style={{ fontSize: 12, fontWeight: 700, color: urgent ? '#d97706' : '#16a34a' }}>
        {hoursRemaining}h left
      </span>
    );
  }
  return <span style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>No deadline</span>;
}

function computeSla(order) {
  if (!order.dueDate) return { hoursOverdue: null, hoursRemaining: null };
  const now = Date.now();
  const due = new Date(order.dueDate).getTime();
  const diffH = Math.round((due - now) / 36e5);
  if (diffH < 0) return { hoursOverdue: Math.abs(diffH), hoursRemaining: null };
  return { hoursOverdue: null, hoursRemaining: diffH };
}

export default function SlaMonitorPage() {
  const navigate = useNavigate();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [tab, setTab]         = useState('breached'); // 'breached' | 'at_risk' | 'all'

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await apiClient.get('/orders', { params: { limit: 200 } });
      const items = Array.isArray(data.data?.items) ? data.data.items
                  : Array.isArray(data.data)        ? data.data : [];
      const active = items.filter((o) => ACTIVE_STATUSES.includes(o.status));
      setOrders(active);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const categorized = orders.map((o) => ({ ...o, _sla: computeSla(o) }));
  const breached  = categorized.filter((o) => o._sla.hoursOverdue != null).sort((a, b) => b._sla.hoursOverdue - a._sla.hoursOverdue);
  const atRisk    = categorized.filter((o) => o._sla.hoursRemaining != null && o._sla.hoursRemaining < 48).sort((a, b) => a._sla.hoursRemaining - b._sla.hoursRemaining);
  const displayed = tab === 'breached' ? breached : tab === 'at_risk' ? atRisk : categorized;

  const TABS = [
    { key: 'breached', label: `Breached (${breached.length})` },
    { key: 'at_risk',  label: `At Risk <48h (${atRisk.length})` },
    { key: 'all',      label: `All Active (${categorized.length})` },
  ];

  return (
    <div>
      <PageHeader title="SLA Monitor" subtitle="Track order deadlines and SLA compliance for your assigned orders." />

      {/* Summary cards */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { label: 'SLA Breached', value: breached.length, color: '#b91c1c', bg: '#fee2e2' },
          { label: 'At Risk (<48h)', value: atRisk.length, color: '#d97706', bg: '#fef9c3' },
          { label: 'Active Orders', value: categorized.length, color: '#2952e3', bg: '#dbeafe' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} style={{
            background: bg, border: `1px solid ${color}30`,
            borderRadius: 8, padding: '12px 20px', minWidth: 120,
          }}>
            <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
            <div style={{ fontSize: 12, color, fontWeight: 600, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, borderBottom: '1px solid var(--ld-border)', paddingBottom: 0 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '8px 16px', fontSize: 13, fontWeight: tab === t.key ? 700 : 400,
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: tab === t.key ? '2px solid var(--ld-primary)' : '2px solid transparent',
              color: tab === t.key ? 'var(--ld-primary)' : 'var(--ld-text-muted)',
            }}
          >
            {t.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button className="ld-btn-secondary ld-btn-sm" onClick={load} style={{ alignSelf: 'center', marginBottom: 4 }}>↻ Refresh</button>
      </div>

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && displayed.length === 0 && <EmptyState message={tab === 'breached' ? 'No SLA breaches.' : tab === 'at_risk' ? 'No orders at risk.' : 'No active orders.'} />}

      {!loading && !error && displayed.length > 0 && (
        <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--ld-bg)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--ld-text-muted)' }}>
                <th style={{ padding: '8px 14px', textAlign: 'left' }}>Order</th>
                <th style={{ padding: '8px 14px', textAlign: 'left' }}>Client</th>
                <th style={{ padding: '8px 14px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '8px 14px', textAlign: 'left' }}>Due Date</th>
                <th style={{ padding: '8px 14px', textAlign: 'left' }}>SLA</th>
                <th style={{ padding: '8px 14px', textAlign: 'left' }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((order, i) => {
                const { hoursOverdue, hoursRemaining } = order._sla;
                return (
                  <tr
                    key={order._id}
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    style={{
                      cursor: 'pointer',
                      background: hoursOverdue ? '#fff7f7' : undefined,
                      borderTop: i > 0 ? '1px solid var(--ld-border)' : undefined,
                    }}
                  >
                    <td style={{ padding: '10px 14px', fontSize: 12, fontFamily: 'monospace', fontWeight: 700, color: 'var(--ld-primary)' }}>
                      {order.orderCode || order._id?.toString().slice(-6)}
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: 13 }}>
                      {order.client?.name || '—'}
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: 12 }}>
                      {order.status?.replace(/_/g, ' ')}
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: 12, color: hoursOverdue ? '#b91c1c' : undefined }}>
                      {order.dueDate ? new Date(order.dueDate).toLocaleDateString() : '—'}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <SlaBar hoursOverdue={hoursOverdue} hoursRemaining={hoursRemaining} />
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--ld-text-muted)' }}>
                      {formatRelativeTime(order.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
