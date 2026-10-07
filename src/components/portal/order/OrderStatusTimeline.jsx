import { useCallback, useEffect, useState } from 'react';
import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';

export default function OrderStatusTimeline({ orderId, fetchHistory }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchHistory(orderId);
      setItems(result.items);
    } finally {
      setLoading(false);
    }
  }, [orderId, fetchHistory]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingState />;
  if (items.length === 0) return <EmptyState message="No status history yet." />;

  // History is fetched newest-first; render oldest-first for a natural timeline.
  const ordered = [...items].reverse();

  return (
    <div className="ld-panel">
      {ordered.map((entry, i) => (
        <div key={entry._id} style={{ display: 'flex', gap: 10, marginBottom: i === ordered.length - 1 ? 0 : 14 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ld-primary)', marginTop: 5, flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>
              {entry.fromStatus ? `${entry.fromStatus} → ${entry.toStatus}` : `Created as ${entry.toStatus}`}
            </div>
            <div className="ld-phase-note">{new Date(entry.createdAt).toLocaleString()}</div>
            {entry.reason && <div style={{ fontSize: 12, marginTop: 2 }}>{entry.reason}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
