import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import { getWorkflowStats, listTasks, completeTask, updateTask } from '../../../services/portal/tasksApi';

const PRIORITY_COLORS = {
  LOW: '#94a3b8',
  MEDIUM: '#2563eb',
  HIGH: '#d97706',
  URGENT: '#dc2626',
};

const STATUS_COLORS = {
  OPEN: { background: '#eff6ff', color: '#1d4ed8' },
  IN_PROGRESS: { background: '#fefce8', color: '#854d0e' },
  DONE: { background: '#f0fdf4', color: '#166534' },
  CANCELLED: { background: '#f1f5f9', color: '#64748b' },
};

const TEAM_ICONS = {
  OPERATIONS: '⚙',
  SALES: '💼',
  COMPLIANCE: '🪪',
  FINANCE: '💳',
  LEGAL: '⚖',
  DOCUMENTATION: '📄',
  SUPPORT: '🎧',
};

function StatBox({ label, value, color, onClick, sub }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--ld-surface)',
        border: '1px solid var(--ld-border)',
        borderRadius: 10,
        padding: '16px 20px',
        cursor: onClick ? 'pointer' : undefined,
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={(e) => onClick && (e.currentTarget.style.borderColor = 'var(--ld-primary)')}
      onMouseLeave={(e) => onClick && (e.currentTarget.style.borderColor = 'var(--ld-border)')}
    >
      <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: color || 'var(--ld-text)' }}>{value ?? '—'}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export default function WorkflowDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('OPEN');
  const [teamFilter, setTeamFilter] = useState('');
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const loadStats = useCallback(async () => {
    try {
      setStats(await getWorkflowStats());
    } catch {
      // silent
    } finally {
      setLoadingStats(false);
    }
  }, []);

  const loadTasks = useCallback(async () => {
    setLoadingTasks(true);
    try {
      const params = { limit: 50 };
      if (filter) params.status = filter;
      if (teamFilter) params.team = teamFilter;
      const result = await listTasks(params);
      setTasks(result.tasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load tasks.');
    } finally {
      setLoadingTasks(false);
    }
  }, [filter, teamFilter]);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => { loadTasks(); }, [loadTasks]);

  // Poll every 30s for live updates
  useEffect(() => {
    const id = setInterval(() => { loadStats(); loadTasks(); }, 30000);
    return () => clearInterval(id);
  }, [loadStats, loadTasks]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function handleComplete(taskId) {
    try {
      await completeTask(taskId);
      showToast('Task marked complete.');
      loadStats();
      loadTasks();
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not complete task.');
    }
  }

  async function handleStart(taskId) {
    try {
      await updateTask(taskId, { status: 'IN_PROGRESS' });
      showToast('Task started.');
      loadStats();
      loadTasks();
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not update task.');
    }
  }

  if (loadingStats && !stats) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const teams = stats?.teamBreakdown ? Object.entries(stats.teamBreakdown).sort((a, b) => b[1] - a[1]) : [];

  return (
    <div>
      <PageHeader
        title="Workflow Dashboard"
        subtitle="Live view of all tasks and order workflows. Updates every 30 seconds."
      />

      {toast && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6,
          padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#166534',
        }}>
          {toast}
        </div>
      )}

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatBox
          label="Open Tasks"
          value={stats?.open ?? '…'}
          color="var(--ld-primary)"
          onClick={() => setFilter('OPEN')}
        />
        <StatBox
          label="In Progress"
          value={stats?.inProgress ?? '…'}
          color="#d97706"
          onClick={() => setFilter('IN_PROGRESS')}
        />
        <StatBox
          label="Overdue"
          value={stats?.overdue ?? '…'}
          color="#dc2626"
          sub="Past due date"
        />
        <StatBox
          label="Due Today"
          value={stats?.dueToday ?? '…'}
          color="#7c3aed"
        />
      </div>

      {/* Team breakdown */}
      {teams.length > 0 && (
        <div style={{
          background: 'var(--ld-surface)',
          border: '1px solid var(--ld-border)',
          borderRadius: 10,
          padding: '16px 20px',
          marginBottom: 24,
        }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Active Tasks by Team</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {teams.map(([team, count]) => (
              <button
                key={team}
                onClick={() => setTeamFilter(teamFilter === team ? '' : team)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
                  borderRadius: 20, border: '1px solid', cursor: 'pointer',
                  borderColor: teamFilter === team ? 'var(--ld-primary)' : 'var(--ld-border)',
                  background: teamFilter === team ? '#eff6ff' : 'var(--ld-bg)',
                  color: teamFilter === team ? 'var(--ld-primary)' : 'var(--ld-text)',
                  fontWeight: 600, fontSize: 12,
                }}
              >
                <span>{TEAM_ICONS[team] || '•'}</span>
                <span>{team}</span>
                <span style={{
                  background: 'var(--ld-primary)', color: '#fff',
                  borderRadius: '50%', width: 18, height: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700,
                }}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Task list */}
      <div style={{
        background: 'var(--ld-surface)',
        border: '1px solid var(--ld-border)',
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '12px 20px',
          borderBottom: '1px solid var(--ld-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>
            Tasks
            {teamFilter && <span style={{ fontSize: 12, fontWeight: 400, marginLeft: 8, color: 'var(--ld-text-muted)' }}>· {teamFilter}</span>}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['OPEN', 'IN_PROGRESS', 'DONE', ''].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={filter === s ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}
              >
                {s || 'All'}
              </button>
            ))}
            {teamFilter && (
              <button className="ld-btn-secondary ld-btn-sm" onClick={() => setTeamFilter('')}>
                Clear Team
              </button>
            )}
          </div>
        </div>

        {loadingTasks ? (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--ld-text-muted)', fontSize: 13 }}>Loading…</div>
        ) : tasks.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--ld-text-muted)', fontSize: 13 }}>
            No tasks found for this filter.
          </div>
        ) : (
          <div>
            {tasks.map((task) => {
              const isActive = task.status === 'OPEN' || task.status === 'IN_PROGRESS';
              const isOverdue = isActive && task.dueDate && new Date(task.dueDate) < new Date();

              return (
                <div
                  key={task.id}
                  style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid var(--ld-border)',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 12,
                    alignItems: 'center',
                    background: isOverdue ? '#fff7f7' : undefined,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 4,
                        ...STATUS_COLORS[task.status],
                      }}>
                        {task.status.replace('_', ' ')}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: PRIORITY_COLORS[task.priority] }}>
                        ● {task.priority}
                      </span>
                      <span style={{
                        fontSize: 11, color: 'var(--ld-text-muted)',
                        background: 'var(--ld-bg)', padding: '1px 6px', borderRadius: 4,
                      }}>
                        {TEAM_ICONS[task.team]} {task.team}
                      </span>
                      {task.autoGenerated && (
                        <span style={{ fontSize: 10, color: '#7c3aed', background: '#ede9fe', padding: '1px 6px', borderRadius: 4 }}>AUTO</span>
                      )}
                      {isOverdue && (
                        <span style={{ fontSize: 10, color: '#dc2626', background: '#fee2e2', padding: '1px 6px', borderRadius: 4 }}>OVERDUE</span>
                      )}
                    </div>

                    <div style={{ fontWeight: 600, fontSize: 14 }}>{task.title}</div>

                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 4 }}>
                      {task.taskCode && <span style={{ fontFamily: 'monospace' }}>{task.taskCode}</span>}
                      {task.orderCode && (
                        <button
                          onClick={() => navigate(`/super-admin/orders/${task.orderId}`)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ld-primary)', fontFamily: 'monospace', fontSize: 11, padding: 0 }}
                        >
                          {task.orderCode}
                        </button>
                      )}
                      {task.clientName && (
                        <button
                          onClick={() => navigate(`/super-admin/clients/${task.clientId}`)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ld-primary)', fontSize: 11, padding: 0 }}
                        >
                          {task.clientName}
                        </button>
                      )}
                      {task.assignedTo?.name && <span>→ {task.assignedTo.name}</span>}
                      {task.dueDate && (
                        <span style={{ color: isOverdue ? '#dc2626' : undefined }}>
                          Due {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {isActive && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      {task.status === 'OPEN' && (
                        <button className="ld-btn-secondary ld-btn-sm" onClick={() => handleStart(task.id)} style={{ fontSize: 11 }}>
                          Start
                        </button>
                      )}
                      <button className="ld-btn-primary ld-btn-sm" onClick={() => handleComplete(task.id)} style={{ fontSize: 11 }}>
                        Done
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
