import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import EmptyState from '../../../components/portal/EmptyState';
import { universalSearch as globalSearch } from '../../../services/portal/searchApi';

const TYPE_LABELS = {
  order:   'Order',
  support: 'Support Ticket',
  client:  'Profile',
};

const TYPE_BADGE = {
  order:   { background: 'rgba(212,165,116,0.15)', color: '#b45309' },
  support: { background: 'rgba(99,102,241,0.12)',  color: '#4338ca' },
  client:  { background: 'rgba(16,185,129,0.12)',  color: '#059669' },
};

const CLIENT_TYPES = ['order', 'support'];

function highlight(text = '', q = '') {
  if (!q || !text) return text;
  const parts = String(text).split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase()
      ? <mark key={i} style={{ background: 'rgba(212,165,116,0.4)', color: 'inherit', borderRadius: 2, padding: '0 1px' }}>{p}</mark>
      : p
  );
}

function getResultPath(result) {
  if (result.type === 'order')   return `/client/orders/${result.id}`;
  if (result.type === 'support') return `/client/support?ticket=${result.id}`;
  return null;
}

export default function ClientSearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery]     = useState(initialQ);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);

  const doSearch = useCallback(async (q) => {
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    setLoading(true);
    setSearched(true);
    try {
      const data = await globalSearch(q, { limit: 40 });
      const items = Array.isArray(data) ? data : (data?.results || data?.items || []);
      setResults(items.filter((r) => CLIENT_TYPES.includes(r.type)));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQ) doSearch(initialQ);
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
    doSearch(query);
  }

  const grouped = CLIENT_TYPES.reduce((acc, t) => {
    acc[t] = results.filter((r) => r.type === t);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader title="Search" subtitle="Search across your orders and support tickets." />

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        <input
          ref={inputRef}
          className="ld-form-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search orders, support tickets…"
          style={{ flex: 1, fontSize: 15 }}
        />
        <button type="submit" className="ld-btn-primary" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {loading && <LoadingState />}

      {!loading && searched && results.length === 0 && (
        <EmptyState message={`No results for "${query}". Try a different keyword.`} />
      )}

      {!loading && results.length > 0 && (
        <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginBottom: 16 }}>
          {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </div>
      )}

      {!loading && CLIENT_TYPES.map((type) => {
        const group = grouped[type];
        if (!group || group.length === 0) return null;
        const badge = TYPE_BADGE[type] || {};
        return (
          <div key={type} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ld-text-muted)', marginBottom: 8 }}>
              {TYPE_LABELS[type]} · {group.length}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {group.map((r) => {
                const path = getResultPath(r);
                return (
                  <div
                    key={r.id}
                    className="ld-card"
                    style={{ padding: '14px 18px', cursor: path ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 14 }}
                    onClick={() => path && navigate(path)}
                    onMouseEnter={(e) => path && (e.currentTarget.style.borderColor = 'var(--ld-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--ld-border)')}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap', ...badge }}>
                      {TYPE_LABELS[type]}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {highlight(r.title || r.label || r.orderCode || r.ticketCode || r.subject || r.name, query)}
                      </div>
                      {r.description || r.subtitle ? (
                        <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginTop: 2 }}>
                          {highlight(r.description || r.subtitle, query)}
                        </div>
                      ) : null}
                    </div>
                    {path && <span style={{ fontSize: 12, color: 'var(--ld-gold)' }}>→</span>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
