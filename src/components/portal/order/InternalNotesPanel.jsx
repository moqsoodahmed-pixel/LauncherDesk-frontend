import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../context/PortalAuthContext';
import {
  getInternalNotes, createInternalNote, updateInternalNote, deleteInternalNote,
} from '../../../services/portal/ordersApi';

function Note({ note, currentUserId, isSuperAdmin, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note.body);
  const [saving, setSaving] = useState(false);

  const canModify = isSuperAdmin || note.author?._id === currentUserId;

  async function save() {
    if (!draft.trim()) return;
    setSaving(true);
    try { await onEdit(note._id, draft.trim()); setEditing(false); }
    finally { setSaving(false); }
  }

  return (
    <div style={{
      background: 'var(--ld-surface)',
      border: '1px solid var(--ld-border)',
      borderRadius: 8,
      padding: '12px 14px',
      marginBottom: 10,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1 }}>
          {editing ? (
            <>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={3}
                style={{ width: '100%', resize: 'vertical', padding: '6px 8px', borderRadius: 6, border: '1px solid var(--ld-border)', fontSize: 13 }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <button className="ld-btn-primary ld-btn-sm" onClick={save} disabled={saving}>
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button className="ld-btn-secondary ld-btn-sm" onClick={() => { setEditing(false); setDraft(note.body); }}>Cancel</button>
              </div>
            </>
          ) : (
            <p style={{ margin: 0, fontSize: 13, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{note.body}</p>
          )}
        </div>
        {canModify && !editing && (
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button className="ld-btn-secondary ld-btn-sm" onClick={() => setEditing(true)}>Edit</button>
            <button
              className="ld-btn-sm"
              style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: 6, padding: '3px 10px', cursor: 'pointer', fontSize: 12 }}
              onClick={() => { if (window.confirm('Delete this note?')) onDelete(note._id); }}
            >
              Del
            </button>
          </div>
        )}
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: 'var(--ld-text-muted)', display: 'flex', gap: 12 }}>
        <span>{note.author?.name || 'Staff'} · {note.author?.adminCode || ''}</span>
        <span>{new Date(note.createdAt).toLocaleString()}</span>
        {note.editedAt && <span style={{ fontStyle: 'italic' }}>edited</span>}
      </div>
    </div>
  );
}

export default function InternalNotesPanel({ order }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try { setNotes(await getInternalNotes(order._id)); }
    catch { setError('Failed to load notes.'); }
    finally { setLoading(false); }
  }, [order._id]);

  useEffect(() => { load(); }, [load]);

  async function submit() {
    if (!draft.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const note = await createInternalNote(order._id, draft.trim());
      setNotes((prev) => [note, ...prev]);
      setDraft('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add note.');
    } finally { setSubmitting(false); }
  }

  async function handleEdit(noteId, body) {
    const updated = await updateInternalNote(order._id, noteId, body);
    setNotes((prev) => prev.map((n) => n._id === noteId ? updated : n));
  }

  async function handleDelete(noteId) {
    await deleteInternalNote(order._id, noteId);
    setNotes((prev) => prev.filter((n) => n._id !== noteId));
  }

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  return (
    <div>
      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#92400e' }}>
        Internal notes are visible to staff only. Clients cannot see these.
      </div>

      {/* Compose */}
      <div style={{ marginBottom: 20 }}>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write an internal note…"
          rows={3}
          style={{ width: '100%', resize: 'vertical', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--ld-border)', fontSize: 13, boxSizing: 'border-box' }}
        />
        {error && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{error}</div>}
        <button
          className="ld-btn-primary ld-btn-sm"
          style={{ marginTop: 8 }}
          onClick={submit}
          disabled={submitting || !draft.trim()}
        >
          {submitting ? 'Adding…' : 'Add Note'}
        </button>
      </div>

      {loading && <div style={{ color: 'var(--ld-text-muted)', fontSize: 13 }}>Loading notes…</div>}
      {!loading && notes.length === 0 && (
        <div style={{ color: 'var(--ld-text-muted)', fontSize: 13, textAlign: 'center', padding: '24px 0' }}>
          No internal notes yet.
        </div>
      )}
      {notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          currentUserId={user?._id}
          isSuperAdmin={isSuperAdmin}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
