import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import Pagination from '../../../components/portal/Pagination';
import Toast from '../../../components/portal/Toast';
import { useAuth } from '../../../context/PortalAuthContext';
import apiClient from '../../../services/portal/apiClient';
import formatRelativeTime from '../../../utils/portal/formatRelativeTime';

const PRIORITY_COLORS = {
  URGENT: { bg: '#fee2e2', color: '#b91c1c' },
  HIGH:   { bg: '#fef3c7', color: '#d97706' },
  MEDIUM: { bg: '#dbeafe', color: '#1d4ed8' },
  LOW:    { bg: '#f3f4f6', color: '#6b7280' },
};

const STATUS_COLORS = {
  PENDING:     { bg: '#fef9c3', color: '#a16207' },
  IN_PROGRESS: { bg: '#dbeafe', color: '#1d4ed8' },
  COMPLETED:   { bg: '#dcfce7', color: '#15803d' },
  CANCELLED:   { bg: '#f3f4f6', color: '#6b7280' },
  OVERDUE:     { bg: '#fee2e2', color: '#b91c1c' },
};

const STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
const PRIORITIES = ['URGENT', 'HIGH', 'MEDIUM', 'LOW'];

function Badge({ label, cfg }) {
  const c = cfg || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: '2px 8px',
      borderRadius: 999, background: c.bg, color: c.color,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function isOverdue(task) {
  return task.dueDate && new Date(task.dueDate) < new Date() &&
    !['COMPLETED', 'CANCELLED'].includes(task.status);
}

export default function TasksPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [completing, setCompleting] = useState(null);

  const status = searchParams.get('status') || '';
  const priority = searchParams.get('priority') || '';
  const overdue = searchParams.get('overdue') === 'true';
  const page = Number(searchParams.get('page') || 1);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: 20, assignedTo: user?._id };
      if (status) params.status = status;
      if (priority) params.priority = priority;
      const { data } = await apiClient.get('/tasks', { params });
      let items = Array.isArray(data.data?.items) ? data.data.items : (Array.isArray(data.data) ? data.data : []);
      if (overdue) items = items.filter(isOverdue);
      setTasks(items);
      setMeta(data.data?.meta || null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  }, [page, status, priority, overdue, user]);

  useEffect(() => { load(); }, [load]);

  function setParam(k, v) {
    const next = new URLSearchParams(searchParams);
    if (v) next.set(k, v); else next.delete(k);
    next.delete('page');
    setSearchParams(next);
  }

  async function completeTask(task) {
    if (!window.confirm(`Mark "${task.title}" as completed?`)) return;
    setCompleting(task.id);
    try {
      await apiClient.patch(`/tasks/${task.id}`, { status: 'COMPLETED' });
      setToast({ type: 'success', message: 'Task marked completed.' });
      load();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not update task.' });
    } finally {
      setCompleting(null);
    }
  }

  async function startTask(task) {
    setCompleting(task.id);
    try {
      await apiClient.patch(`/tasks/${task.id}`, { status: 'IN_PROGRESS' });
      setToast({ type: 'success', message: 'Task started.' });
      load();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not update task.' });
    } finally {
      setCompleting(null);
    }
  }

  return (
    <div>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <PageHeader title="My Tasks" subtitle="Tasks assigned to you — complete them to advance workflows." />

      {/* Filters */}
      <div className="ld-toolbar" style={{ flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
          <select value={status} onChange={(e) => setParam('status', e.target.value)} className="ld-form-input" style={{ width: 'auto' }}>
            <option value="">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
          </select>
          <select value={priority} onChange={(e) => setParam('priority', e.target.value)} className="ld-form-input" style={{ width: 'auto' }}>
            <option value="">All Priorities</option>
            {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <input type="checkbox" checked={overdue} onChange={(e) => setParam('overdue', e.target.checked ? 'true' : '')} />
            Overdue only
          </label>
          {(status || priority || overdue) && (
            <button className="ld-btn-secondary ld-btn-sm" onClick={() => setSearchParams({})}>Clear</button>
          )}
        </div>
        {meta && <span style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>{meta.total ?? tasks.length} tasks</span>}
      </div>

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && tasks.length === 0 && <EmptyState message="No tasks found." />}

      {!loading && !error && tasks.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tasks.map((task) => {
            const over = isOverdue(task);
            const priorityCfg = PRIORITY_COLORS[task.priority];
            const statusCfg = STATUS_COLORS[task.status];
            return (
              <div key={task.id} style={{
                background: 'var(--ld-surface)',
                border: `1px solid ${over ? '#fca5a5' : 'var(--ld-border)'}`,
                borderLeft: `4px solid ${over ? '#b91c1c' : (priorityCfg?.color || '#94a3b8')}`,
                borderRadius: 8,
                padding: '14px 18px',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                      {over && <Badge label="OVERDUE" cfg={{ bg: '#fee2e2', color: '#b91c1c' }} />}
                      <Badge label={task.priority} cfg={priorityCfg} />
                      <Badge label={task.status?.replace(/_/g, ' ')} cfg={statusCfg} />
                      {task.team && <span style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>{task.team}</span>}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{task.title}</div>
                    {task.description && (
                      <div style={{ fontSize: 13, color: 'var(--ld-text-muted)', marginBottom: 6 }}>{task.description}</div>
                    )}
                    <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--ld-text-muted)', flexWrap: 'wrap' }}>
                      {task.taskCode && <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ld-primary)' }}>{task.taskCode}</span>}
                      {task.order?.orderCode && (
                        <button
                          style={{ fontSize: 11, color: 'var(--ld-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          onClick={() => navigate(`/admin/orders/${task.order._id || task.order}`)}
                        >
                          Order: {task.order.orderCode}
                        </button>
                      )}
                      {task.dueDate && (
                        <span style={{ color: over ? '#b91c1c' : undefined }}>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      <span>Created {formatRelativeTime(task.createdAt)}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    {task.status === 'PENDING' && (
                      <button
                        className="ld-btn-secondary ld-btn-sm"
                        disabled={completing === task.id}
                        onClick={() => startTask(task)}
                      >
                        Start
                      </button>
                    )}
                    {['PENDING', 'IN_PROGRESS'].includes(task.status) && (
                      <button
                        className="ld-btn-primary ld-btn-sm"
                        disabled={completing === task.id}
                        onClick={() => completeTask(task)}
                      >
                        {completing === task.id ? '…' : 'Complete'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <Pagination meta={meta} onPageChange={(p) => setParam('page', String(p))} />
      )}
    </div>
  );
}
