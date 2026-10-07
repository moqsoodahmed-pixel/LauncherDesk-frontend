import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listTasks, createTask, completeTask, updateTask } from '../../../services/portal/tasksApi';

const TEAMS = ['OPERATIONS', 'SALES', 'COMPLIANCE', 'FINANCE', 'LEGAL', 'DOCUMENTATION', 'SUPPORT'];
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

const STATUS_COLORS = {
  OPEN: { background: '#eff6ff', color: '#1d4ed8' },
  IN_PROGRESS: { background: '#fefce8', color: '#854d0e' },
  DONE: { background: '#f0fdf4', color: '#166534' },
  CANCELLED: { background: '#f1f5f9', color: '#64748b' },
};

const PRIORITY_COLORS = {
  LOW: '#94a3b8',
  MEDIUM: '#2563eb',
  HIGH: '#d97706',
  URGENT: '#dc2626',
};

const EMPTY_FORM = { title: '', description: '', team: 'OPERATIONS', priority: 'MEDIUM', dueDate: '' };

export default function OrderTasksPanel({ order, basePath }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await listTasks({ orderId: order.id, limit: 50 });
      setTasks(result.tasks);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [order.id]);

  useEffect(() => { load(); }, [load]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function handleCreate(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createTask({
        orderId: order.id,
        title: form.title,
        description: form.description,
        team: form.team,
        priority: form.priority,
        dueDate: form.dueDate || undefined,
      });
      setShowCreate(false);
      setForm(EMPTY_FORM);
      showToast('Task created.');
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create task.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleComplete(taskId) {
    try {
      await completeTask(taskId);
      showToast('Task marked complete.');
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not complete task.');
    }
  }

  async function handleStatusChange(taskId, status) {
    try {
      await updateTask(taskId, { status });
      showToast('Status updated.');
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not update task.');
    }
  }

  const open = tasks.filter((t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS');
  const done = tasks.filter((t) => t.status === 'DONE' || t.status === 'CANCELLED');

  return (
    <div>
      {toast && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6,
          padding: '10px 16px', marginBottom: 12, fontSize: 13, color: '#166534',
        }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <span style={{ fontWeight: 600, fontSize: 15 }}>Tasks</span>
          <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--ld-text-muted)' }}>
            {open.length} active · {done.length} done
          </span>
        </div>
        <button className="ld-btn-primary ld-btn-sm" onClick={() => setShowCreate((v) => !v)}>
          {showCreate ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {showCreate && (
        <div style={{
          background: 'var(--ld-surface)',
          border: '1px solid var(--ld-border)',
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
        }}>
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 13 }}>Create Task</div>
          {error && <div className="ld-form-error" style={{ marginBottom: 8 }}>{error}</div>}
          <form onSubmit={handleCreate}>
            <div className="ld-form-group">
              <label className="ld-form-label">Title</label>
              <input className="ld-form-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required autoFocus />
            </div>
            <div className="ld-form-group">
              <label className="ld-form-label">Description</label>
              <textarea className="ld-form-input" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} style={{ resize: 'vertical' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div className="ld-form-group">
                <label className="ld-form-label">Team</label>
                <select className="ld-form-input" value={form.team} onChange={(e) => setForm((f) => ({ ...f, team: e.target.value }))}>
                  {TEAMS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="ld-form-group">
                <label className="ld-form-label">Priority</label>
                <select className="ld-form-input" value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}>
                  {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="ld-form-group">
                <label className="ld-form-label">Due Date</label>
                <input type="date" className="ld-form-input" value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button type="button" className="ld-btn-secondary ld-btn-sm" onClick={() => setShowCreate(false)} disabled={submitting}>Cancel</button>
              <button type="submit" className="ld-btn-primary ld-btn-sm" disabled={submitting}>{submitting ? 'Creating…' : 'Create Task'}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ color: 'var(--ld-text-muted)', fontSize: 13 }}>Loading tasks…</div>
      ) : tasks.length === 0 ? (
        <div style={{ color: 'var(--ld-text-muted)', fontSize: 13, padding: '24px 0', textAlign: 'center' }}>
          No tasks yet. Tasks are auto-created when order status changes, or create one manually.
        </div>
      ) : (
        <div>
          {open.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ld-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
                Active ({open.length})
              </div>
              {open.map((task) => (
                <TaskCard key={task.id} task={task} onComplete={handleComplete} onStatusChange={handleStatusChange} />
              ))}
            </div>
          )}
          {done.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ld-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
                Completed / Cancelled ({done.length})
              </div>
              {done.map((task) => (
                <TaskCard key={task.id} task={task} onComplete={handleComplete} onStatusChange={handleStatusChange} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, onComplete, onStatusChange }) {
  const isActive = task.status === 'OPEN' || task.status === 'IN_PROGRESS';
  const isOverdue = isActive && task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div style={{
      background: 'var(--ld-surface)',
      border: `1px solid ${isOverdue ? '#fca5a5' : 'var(--ld-border)'}`,
      borderRadius: 8,
      padding: '12px 16px',
      marginBottom: 8,
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 12,
      alignItems: 'start',
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 4,
            ...STATUS_COLORS[task.status],
          }}>
            {task.status.replace('_', ' ')}
          </span>
          <span style={{
            fontSize: 11, fontWeight: 600, color: PRIORITY_COLORS[task.priority],
          }}>
            ● {task.priority}
          </span>
          <span style={{ fontSize: 11, color: 'var(--ld-text-muted)', background: 'var(--ld-bg)', padding: '1px 6px', borderRadius: 4 }}>
            {task.team}
          </span>
          {task.autoGenerated && (
            <span style={{ fontSize: 10, color: '#7c3aed', background: '#ede9fe', padding: '1px 6px', borderRadius: 4 }}>AUTO</span>
          )}
          {isOverdue && (
            <span style={{ fontSize: 10, color: '#dc2626', background: '#fee2e2', padding: '1px 6px', borderRadius: 4 }}>OVERDUE</span>
          )}
        </div>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{task.title}</div>
        {task.description && (
          <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginBottom: 4, lineHeight: 1.5 }}>{task.description}</div>
        )}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 11, color: 'var(--ld-text-muted)' }}>
          {task.taskCode && <span style={{ fontFamily: 'monospace' }}>{task.taskCode}</span>}
          {task.dueDate && (
            <span style={{ color: isOverdue ? '#dc2626' : undefined }}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
          {task.assignedTo?.name && <span>Assigned: {task.assignedTo.name}</span>}
          {task.completedAt && <span>Completed: {new Date(task.completedAt).toLocaleDateString()}</span>}
        </div>
      </div>

      {isActive && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 100 }}>
          {task.status === 'OPEN' && (
            <button
              className="ld-btn-secondary ld-btn-sm"
              onClick={() => onStatusChange(task.id, 'IN_PROGRESS')}
              style={{ fontSize: 11 }}
            >
              Start
            </button>
          )}
          <button
            className="ld-btn-primary ld-btn-sm"
            onClick={() => onComplete(task.id)}
            style={{ fontSize: 11 }}
          >
            Complete
          </button>
        </div>
      )}
    </div>
  );
}
