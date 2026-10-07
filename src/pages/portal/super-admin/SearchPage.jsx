import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import { universalSearch } from '../../../services/portal/searchApi';

const TYPE_ICONS = {
  client: '🏢',
  admin: '👤',
  order: '📋',
  invoice: '🧾',
  payment: '💳',
  kyc: '🪪',
  ticket: '🎧',
};

const TYPE_COLORS = {
  client: '#2952e3',
  admin: '#7c3aed',
  order: '#0891b2',
  invoice: '#166534',
  payment: '#d97706',
  kyc: '#1d4ed8',
  ticket: '#dc2626',
};

const TYPE_LABELS = {
  client: 'Client',
  admin: 'Admin',
  order: 'Order',
  invoice: 'Invoice',
  payment: 'Payment',
  kyc: 'KYC Document',
  ticket: 'Support Ticket',
};

const FILTER_TYPES = ['', 'client', 'admin', 'order', 'payment', 'kyc', 'ticket'];

const STATUS_COLORS = {
  ACTIVE: '#16a34a', OPEN: '#1d4ed8', CONFIRMED: '#16a34a',
  IN_PROGRESS: '#d97706', PENDING: '#d97706', VERIFIED: '#166534',
  CANCELLED: '#dc2626', CLOSED: '#64748b', REJECTED: '#dc2626',
};

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '');
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  const search = useCallback(async (q, type) => {
    if (!q.trim()) { setResults([]); setTotal(0); setSearched(false); return; }
    setLoading(true);
    setError('');
    try {
      const data = await universalSearch(q, { type, limit: 8 });
      setResults(data.results);
      setTotal(data.total);
      setSearched(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce typing — also sync URL
  useEffect(() => {
    clearTimeout(debounceRef.current);
    setSearchParams((p) => {
      const n = new URLSearchParams(p);
      if (query) n.set('q', query); else n.delete('q');
      if (typeFilter) n.set('type', typeFilter); else n.delete('type');
      return n;
    }, { replace: true });
    debounceRef.current = setTimeout(() => search(query, typeFilter), 350);
    return () => clearTimeout(debounceRef.current);
  }, [query, typeFilter, search, setSearchParams]);

  // Run search on initial load if URL has q param
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) search(q, searchParams.get('type') || '');
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Group results by type
  const grouped = {};
  for (const r of results) {
    if (!grouped[r.type]) grouped[r.type] = [];
    grouped[r.type].push(r);
  }
  const groupOrder = ['client', 'admin', 'order', 'invoice', 'payment', 'kyc', 'ticket'];

  return (
    <div>
      <PageHeader
        title="Universal Search"
        subtitle="Search by Business ID, name, email, or code across all modules instantly."
      />

      {/* Search bar */}
      <div style={{
        background: 'var(--ld-surface)',
        border: '2px solid var(--ld-primary)',
        borderRadius: 12,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
      }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Business ID, name, email, order code, invoice number…"
          style={{
            flex: 1, border: 'none', outline: 'none', fontSize: 15,
            background: 'transparent', color: 'var(--ld-text)',
          }}
          onKeyDown={(e) => { if (e.key === 'Escape') setQuery(''); }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ld-text-muted)', padding: '0 4px' }}
          >
            ×
          </button>
        )}
        {loading && <span style={{ fontSize: 12, color: 'var(--ld-text-muted)', flexShrink: 0 }}>Searching…</span>}
      </div>

      {/* Type filter pills */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {FILTER_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            style={{
              padding: '4px 14px', borderRadius: 20, border: '1px solid',
              cursor: 'pointer', fontSize: 12, fontWeight: 600,
              borderColor: typeFilter === t ? 'var(--ld-primary)' : 'var(--ld-border)',
              background: typeFilter === t ? '#eff6ff' : 'var(--ld-bg)',
              color: typeFilter === t ? 'var(--ld-primary)' : 'var(--ld-text)',
            }}
          >
            {t ? `${TYPE_ICONS[t]} ${TYPE_LABELS[t]}` : 'All Types'}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 8, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#dc2626' }}>
          {error}
        </div>
      )}

      {!searched && !loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ld-text-muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Start typing to search</div>
          <div style={{ fontSize: 13 }}>
            Try a Business ID like <code style={{ background: 'var(--ld-bg)', padding: '2px 6px', borderRadius: 4 }}>CLI20261004000001</code> or a client name
          </div>
        </div>
      )}

      {searched && total === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ld-text-muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🤷</div>
          <div style={{ fontWeight: 600 }}>No results found for "{query}"</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Try a different search term or filter</div>
        </div>
      )}

      {Object.keys(grouped).length > 0 && (
        <div>
          <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginBottom: 12 }}>
            {total} result{total !== 1 ? 's' : ''} for "{query}"
          </div>
          {groupOrder.filter((t) => grouped[t]).map((type) => (
            <div key={type} style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: TYPE_COLORS[type],
                textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {TYPE_ICONS[type]} {TYPE_LABELS[type]}s ({grouped[type].length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {grouped[type].map((result) => (
                  <div
                    key={`${result.type}-${result.id}`}
                    onClick={() => navigate(result.path)}
                    style={{
                      background: 'var(--ld-surface)',
                      border: '1px solid var(--ld-border)',
                      borderRadius: 8,
                      padding: '12px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = TYPE_COLORS[type])}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--ld-border)')}
                  >
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{TYPE_ICONS[type]}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        {result.code && (
                          <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: TYPE_COLORS[type] }}>
                            {result.code}
                          </span>
                        )}
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{result.label}</span>
                      </div>
                      {result.sub && (
                        <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginTop: 2 }}>{result.sub}</div>
                      )}
                    </div>
                    {result.status && (
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
                        background: '#f1f5f9', color: STATUS_COLORS[result.status] || '#64748b',
                        flexShrink: 0,
                      }}>
                        {result.status}
                      </span>
                    )}
                    <span style={{ color: 'var(--ld-text-muted)', fontSize: 16, flexShrink: 0 }}>→</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
