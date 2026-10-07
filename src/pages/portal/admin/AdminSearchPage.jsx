import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import EmptyState from '../../../components/portal/EmptyState';
import apiClient from '../../../services/portal/apiClient';

const TYPE_META = {
  client:  { label: 'Client',  color: '#2952e3', route: (r) => `/admin/clients/${r._id}` },
  order:   { label: 'Order',   color: '#16a34a', route: (r) => `/admin/orders/${r._id}` },
  kyc:     { label: 'KYC',     color: '#7c3aed', route: (r) => `/admin/kyc` },
  support: { label: 'Support', color: '#d97706', route: (r) => `/admin/support/${r._id}` },
  task:    { label: 'Task',    color: '#0891b2', route: (r) => `/admin/tasks` },
};

const ALL_TYPES = Object.keys(TYPE_META);

function highlight(text, query) {
  if (!query || !text) return text || '';
  const parts = String(text).split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ background: '#fef08a', padding: 0 }}>{p}</mark>
      : p
  );
}

export default function AdminSearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [input, setInput]     = useState(searchParams.get('q') || '');
  const inputRef = useRef(null);

  const q     = searchParams.get('q')    || '';
  const type  = searchParams.get('type') || '';

  const search = useCallback(async (query, entityType) => {
    if (!query || query.trim().length < 2) return;
    setLoading(true);
    setSearched(false);
    try {
      const params = { q: query };
      if (entityType) params.type = entityType;
      const { data } = await apiClient.get('/search', { params });
      const raw = data.data || [];
      // Filter to only admin-relevant types
      const allowed = new Set(['client', 'order', 'kyc', 'support', 'task']);
      setResults(raw.filter((r) => allowed.has(r.type)));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, []);

  useEffect(() => {
    if (q) search(q, type);
  }, [q, type, search]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function submit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const next = new URLSearchParams();
    next.set('q', input.trim());
    if (type) next.set('type', type);
    setSearchParams(next);
  }

  function setType(t) {
    const next = new URLSearchParams(searchParams);
    if (t) next.set('type', t); else next.delete('type');
    setSearchParams(next);
  }

  function navigate2(result) {
    const meta = TYPE_META[result.type];
    if (meta) navigate(meta.route(result));
  }

  const grouped = results.reduce((acc, r) => {
    (acc[r.type] = acc[r.type] || []).push(r);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader title="Search" subtitle="Search clients, orders, tasks, KYC, and support tickets." />

      <form onSubmit={submit} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search by name, code, email..."
          className="ld-form-input"
          style={{ flex: 1 }}
        />
        <button type="submit" className="ld-btn-primary">Search</button>
      </form>

      {/* Type filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button
          onClick={() => setType('')}
          className={type === '' ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}
        >
          All
        </button>
        {ALL_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={type === t ? 'ld-btn-primary ld-btn-sm' : 'ld-btn-secondary ld-btn-sm'}
          >
            {TYPE_META[t].label}
          </button>
        ))}
      </div>

      {loading && <LoadingState />}

      {!loading && searched && results.length === 0 && (
        <EmptyState message={`No results for "${q}".`} />
      )}

      {!loading && results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Object.entries(grouped).map(([entityType, items]) => {
            const meta = TYPE_META[entityType] || { label: entityType, color: '#6b7280' };
            return (
              <div key={entityType} style={{ background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{
                  padding: '8px 14px', background: 'var(--ld-bg)',
                  borderBottom: '1px solid var(--ld-border)',
                  fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                  color: meta.color, display: 'flex', justifyContent: 'space-between',
                }}>
                  <span>{meta.label}</span>
                  <span style={{ fontWeight: 400, color: 'var(--ld-text-muted)' }}>{items.length} result{items.length !== 1 ? 's' : ''}</span>
                </div>
                {items.map((r, i) => (
                  <div
                    key={r._id || i}
                    onClick={() => navigate2(r)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 14px',
                      borderTop: i > 0 ? '1px solid var(--ld-border)' : undefined,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ld-bg)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--ld-surface)'}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>
                        {highlight(r.title || r.name || r.code, q)}
                      </div>
                      {r.subtitle && (
                        <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginTop: 2 }}>
                          {highlight(r.subtitle, q)}
                        </div>
                      )}
                      {r.code && r.title && (
                        <div style={{ fontSize: 11, fontFamily: 'monospace', color: meta.color, marginTop: 2 }}>
                          {highlight(r.code, q)}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>→</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
