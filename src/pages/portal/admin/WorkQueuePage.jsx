import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import apiClient from '../../../services/portal/apiClient';
import { useAuth } from '../../../context/PortalAuthContext';
import formatRelativeTime from '../../../utils/portal/formatRelativeTime';

const PRIORITY_COLORS = {
  URGENT: { bg: '#fee2e2', color: '#b91c1c' },
  HIGH:   { bg: '#fef3c7', color: '#d97706' },
  MEDIUM: { bg: '#dbeafe', color: '#1d4ed8' },
  LOW:    { bg: '#f3f4f6', color: '#6b7280' },
};

const GROUPS = [
  { key: 'overdue',   label: '🔴 Overdue / SLA Breached' },
  { key: 'due_today', label: '🟡 Due Today' },
  { key: 'urgent',    label: '🟠 Urgent Priority' },
  { key: 'high',      label: '🔵 High Priority' },
  { key: 'other',     label: 'Other' },
];

function Badge({ label, cfg }) {
  const c = cfg || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: '2px 8px',
      borderRadius: 999, background: c.bg, color: c.color, whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function isOverdue(item) {
  return item.dueDate && new Date(item.dueDate) < new Date();
}

function isDueToday(item) {
  if (!item.dueDate) return false;
  const d = new Date(item.dueDate);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

function groupItems(items) {
  const groups = { overdue: [], due_today: [], urgent: [], high: [], other: [] };
  items.forEach((item) => {
    if (isOverdue(item) && !['COMPLETED', 'CANCELLED', 'RESOLVED', 'CLOSED'].includes(item.status)) {
      groups.overdue.push(item);
    } else if (isDueToday(item)) {
      groups.due_today.push(item);
    } else if (item.priority === 'URGENT') {
      groups.urgent.push(item);
    } else if (item.priority === 'HIGH') {
      groups.high.push(item);
    } else {
      groups.other.push(item);
    }
  });
  return groups;
}

export default function WorkQueuePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [tasks, setTasks]     = useState([]);
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  const focusGroup = searchParams.get('group') || '';

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [taskRes, orderRes] = await Promise.allSettled([
        apiClient.get('/tasks', { params: { assignedTo: user?._id, limit: 100 } }),
        apiClient.get('/orders', { params: { limit: 100 } }),
      ]);

      const taskItems = taskRes.status === 'fulfilled'
        ? (Array.isArray(taskRes.value.data?.data?.items) ? taskRes.value.data.data.items
           : Array.isArray(taskRes.value.data?.data) ? taskRes.value.data.data : [])
        : [];
      const orderItems = orderRes.status === 'fulfilled'
        ? (Array.isArray(orderRes.value.data?.data?.items) ? orderRes.value.data.data.items
           : Array.isArray(orderRes.value.data?.data) ? orderRes.value.data.data : [])
        : [];

      const activeTasks = taskItems.filter((t) => !['COMPLETED', 'CANCELLED'].includes(t.status));
      const activeOrders = orderItems.filter((o) => !['COMPLETED', 'CANCELLED'].includes(o.status));

      setTasks(activeTasks.map((t) => ({ ...t, _type: 'task' })));
      setOrders(activeOrders.map((o) => ({ ...o, _type: 'order' })));
    } catch (err) {
      setError('Failed to load work queue.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const allItems = [...tasks, ...orders].sort((a, b) => {
    const priorityRank = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    return (priorityRank[a.priority] ?? 4) - (priorityRank[b.priority] ?? 4);
  });

  const grouped = groupItems(allItems);

  function navigateItem(item) {
    if (item._type === 'task')  return navigate(`/admin/tasks`);
    if (item._type === 'order') return navigate(`/admin/orders/${item._id}`);
  }

  function renderItem(item) {
    const over = isOverdue(item) && !['COMPLETED', 'CANCELLED', 'RESOLVED', 'CLOSED'].includes(item.status);
    const code = item.taskCode || item.orderCode || '';
    const title = item.title || item.service?.name || `Order ${code}`;
    return (
      <div
        key={`${item._type}-${item._id}`}
        onClick={() => navigateItem(item)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 14px',
          borderBottom: '1px solid var(--ld-border)',
          cursor: 'pointer',
          background: over ? '#fff7f7' : undefined,
        }}
      >
        <span style={{
          fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
          background: item._type === 'task' ? '#ede9fe' : '#e0f2fe',
          color: item._type === 'task' ? '#6d28d9' : '#0369a1',
          textTransform: 'uppercase',
        }}>
          {item._type}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{title}</div>
          <div style={{ display: 'flex', gap: 10, fontSize: 11, color: 'var(--ld-text-muted)', flexWrap: 'wrap' }}>
            {code && <span style={{ fontFamily: 'monospace', color: 'var(--ld-primary)' }}>{code}</span>}
            {item.status && <span>{item.status.replace(/_/g, ' ')}</span>}
            {item.dueDate && (
              <span style={{ color: over ? '#b91c1c' : undefined }}>
                Due: {new Date(item.dueDate).toLocaleDateString()}
              </span>
            )}
            {item.client?.name && <span>{item.client.name}</span>}
          </div>
        </div>
        {item.priority && <Badge label={item.priority} cfg={PRIORITY_COLORS[item.priority]} />}
        {over && <Badge label="OVERDUE" cfg={{ bg: '#fee2e2', color: '#b91c1c' }} />}
      </div>
    );
  }

  const visibleGroups = focusGroup
    ? GROUPS.filter((g) => g.key === focusGroup)
    : GROUPS;

  return (
    <div>
      <PageHeader title="Work Queue" subtitle="All assigned tasks and orders, grouped by priority and deadline." />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>
          {tasks.length} active tasks · {orders.length} active orders
        </span>
        <button className="ld-btn-secondary ld-btn-sm" onClick={load}>↻ Refresh</button>
      </div>

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && allItems.length === 0 && <EmptyState message="Work queue is empty." />}

      {!loading && !error && allItems.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {visibleGroups.map((g) => {
            const items = grouped[g.key];
            if (!items || items.length === 0) return null;
            return (
              <div key={g.key} style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{
                  padding: '10px 14px', background: 'var(--ld-bg)',
                  borderBottom: '1px solid var(--ld-border)',
                  fontSize: 13, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span>{g.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--ld-text-muted)' }}>{items.length} item{items.length !== 1 ? 's' : ''}</span>
                </div>
                {items.map(renderItem)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
