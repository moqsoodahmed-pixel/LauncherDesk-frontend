import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import Toast from '../../../components/portal/Toast';
import { listAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../../../services/portal/announcementsApi';

const TYPES = ['NOTICE', 'MAINTENANCE', 'DOWNTIME', 'POLICY', 'FEATURE', 'HOLIDAY'];
const AUDIENCES = ['ALL', 'ADMINS', 'CLIENTS', 'OPERATIONS', 'SUPPORT'];
const PRIORITIES = ['LOW', 'NORMAL', 'HIGH', 'CRITICAL'];

const TYPE_COLORS = {
  NOTICE: { bg: '#eff6ff', color: '#1d4ed8' },
  MAINTENANCE: { bg: '#fef9c3', color: '#a16207' },
  DOWNTIME: { bg: '#fee2e2', color: '#b91c1c' },
  POLICY: { bg: '#f3e8ff', color: '#7e22ce' },
  FEATURE: { bg: '#dcfce7', color: '#15803d' },
  HOLIDAY: { bg: '#fce7f3', color: '#be185d' },
};

const PRIORITY_COLORS = {
  LOW: '#94a3b8',
  NORMAL: '#2563eb',
  HIGH: '#d97706',
  CRITICAL: '#dc2626',
};

function Badge({ label, bg, color }) {
  return <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, background: bg, color }}>{label}</span>;
}

const EMPTY_FORM = { title: '', body: '', type: 'NOTICE', targetAudience: 'ALL', priority: 'NORMAL', isPinned: false, scheduledAt: '', expiresAt: '' };

export default function AnnouncementsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [filterActive, setFilterActive] = useState('all');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const active = filterActive === 'active' ? 'true' : filterActive === 'inactive' ? 'false' : undefined;
      setItems(await listAnnouncements({ active }));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load announcements.');
    } finally {
      setLoading(false);
    }
  }, [filterActive]);

  useEffect(() => { load(); }, [load]);

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setForm({
      title: item.title,
      body: item.body,
      type: item.type,
      targetAudience: item.targetAudience,
      priority: item.priority,
      isPinned: item.isPinned,
      scheduledAt: item.scheduledAt ? item.scheduledAt.slice(0, 16) : '',
      expiresAt: item.expiresAt ? item.expiresAt.slice(0, 16) : '',
    });
    setEditId(item.id);
    setShowForm(true);
  }

  async function save() {
    if (!form.title.trim() || !form.body.trim()) {
      setToast({ type: 'error', message: 'Title and body are required.' });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        scheduledAt: form.scheduledAt || null,
        expiresAt: form.expiresAt || null,
      };
      if (editId) {
        await updateAnnouncement(editId, payload);
        setToast({ type: 'success', message: 'Announcement updated.' });
      } else {
        await createAnnouncement(payload);
        setToast({ type: 'success', message: 'Announcement created.' });
      }
      setShowForm(false);
      load();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not save.' });
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(item) {
    try {
      await updateAnnouncement(item.id, { isActive: !item.isActive });
      setToast({ type: 'success', message: item.isActive ? 'Deactivated.' : 'Activated.' });
      load();
    } catch (err) {
      setToast({ type: 'error', message: 'Could not update.' });
    }
  }

  async function remove(item) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await deleteAnnouncement(item.id);
      setToast({ type: 'success', message: 'Deleted.' });
      load();
    } catch (err) {
      setToast({ type: 'error', message: 'Could not delete.' });
    }
  }

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  return (
    <div>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <PageHeader
        title="System Announcements"
        subtitle="Create and manage platform-wide notices, maintenance alerts, and updates"
        actions={<button className="ld-btn-primary ld-btn-sm" onClick={openCreate}>+ New Announcement</button>}
      />

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['all', 'active', 'inactive'].map((f) => (
          <button key={f} className={filterActive === f ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'} onClick={() => setFilterActive(f)}>
            {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Inactive'}
          </button>
        ))}
      </div>

      {/* Create/Edit form */}
      {showForm && (
        <div style={{
          background: 'var(--ld-surface)', border: '1px solid var(--ld-primary)',
          borderRadius: 10, padding: '20px 24px', marginBottom: 20,
        }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>{editId ? 'Edit Announcement' : 'New Announcement'}</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--ld-text-muted)', display: 'block', marginBottom: 4 }}>Type</label>
              <select className="ld-form-input" value={form.type} onChange={(e) => set('type', e.target.value)}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--ld-text-muted)', display: 'block', marginBottom: 4 }}>Target Audience</label>
              <select className="ld-form-input" value={form.targetAudience} onChange={(e) => set('targetAudience', e.target.value)}>
                {AUDIENCES.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--ld-text-muted)', display: 'block', marginBottom: 4 }}>Priority</label>
              <select className="ld-form-input" value={form.priority} onChange={(e) => set('priority', e.target.value)}>
                {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: 'var(--ld-text-muted)', display: 'block', marginBottom: 4 }}>Title *</label>
            <input className="ld-form-input" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Announcement title" style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, color: 'var(--ld-text-muted)', display: 'block', marginBottom: 4 }}>Body *</label>
            <textarea
              className="ld-form-input"
              value={form.body}
              onChange={(e) => set('body', e.target.value)}
              rows={4}
              placeholder="Announcement details..."
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--ld-text-muted)', display: 'block', marginBottom: 4 }}>Schedule (optional)</label>
              <input className="ld-form-input" type="datetime-local" value={form.scheduledAt} onChange={(e) => set('scheduledAt', e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--ld-text-muted)', display: 'block', marginBottom: 4 }}>Expires At (optional)</label>
              <input className="ld-form-input" type="datetime-local" value={form.expiresAt} onChange={(e) => set('expiresAt', e.target.value)} style={{ width: '100%' }} />
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 16 }}>
            <input type="checkbox" checked={form.isPinned} onChange={(e) => set('isPinned', e.target.checked)} />
            Pin this announcement (shown at top)
          </label>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="ld-btn-primary ld-btn-sm" onClick={save} disabled={saving}>{saving ? 'Saving…' : editId ? 'Update' : 'Publish'}</button>
            <button className="ld-btn-secondary ld-btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? <LoadingState /> : error ? <ErrorState message={error} /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.length === 0 && (
            <div style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 10, padding: 40, textAlign: 'center', color: 'var(--ld-text-muted)' }}>
              No announcements yet. Create the first one above.
            </div>
          )}
          {items.map((item) => {
            const tc = TYPE_COLORS[item.type] || { bg: '#f3f4f6', color: '#374151' };
            const isExpired = item.expiresAt && new Date(item.expiresAt) < new Date();
            return (
              <div key={item.id} style={{
                background: 'var(--ld-surface)', border: '1px solid var(--ld-border)',
                borderRadius: 10, padding: '14px 18px',
                borderLeft: `4px solid ${PRIORITY_COLORS[item.priority] || '#94a3b8'}`,
                opacity: !item.isActive || isExpired ? 0.6 : 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                      {item.isPinned && <span style={{ fontSize: 10, fontWeight: 700, color: '#7c3aed' }}>📌 PINNED</span>}
                      <Badge label={item.type} bg={tc.bg} color={tc.color} />
                      <Badge label={item.targetAudience} bg="#f1f5f9" color="#475569" />
                      <span style={{ fontSize: 11, fontWeight: 700, color: PRIORITY_COLORS[item.priority] }}>{item.priority}</span>
                      {!item.isActive && <Badge label="INACTIVE" bg="#f3f4f6" color="#6b7280" />}
                      {isExpired && <Badge label="EXPIRED" bg="#fee2e2" color="#b91c1c" />}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--ld-text-muted)', whiteSpace: 'pre-wrap' }}>{item.body}</div>
                    <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 8, display: 'flex', gap: 16 }}>
                      {item.announcementCode && <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ld-primary)' }}>{item.announcementCode}</span>}
                      {item.createdBy?.name && <span>By: {item.createdBy.name}</span>}
                      <span>Created: {new Date(item.createdAt).toLocaleString()}</span>
                      {item.scheduledAt && <span>Scheduled: {new Date(item.scheduledAt).toLocaleString()}</span>}
                      {item.expiresAt && <span>Expires: {new Date(item.expiresAt).toLocaleString()}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button className="ld-btn-secondary ld-btn-sm" onClick={() => openEdit(item)}>Edit</button>
                    <button className="ld-btn-secondary ld-btn-sm" onClick={() => toggleActive(item)}>
                      {item.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="ld-btn-danger ld-btn-sm" onClick={() => remove(item)}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
