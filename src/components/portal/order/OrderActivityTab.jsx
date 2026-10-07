import { useCallback, useEffect, useState } from 'react';
import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';
import Pagination from '../Pagination';
import { getOrderActivity } from '../../../services/portal/ordersApi';

export default function OrderActivityTab({ order }) {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getOrderActivity(order.id, { page, limit: 20 });
      setItems(result.items);
      setMeta(result.meta);
    } finally {
      setLoading(false);
    }
  }, [order.id, page]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      {loading && <LoadingState />}
      {!loading && items.length === 0 && <EmptyState message="No activity recorded yet." />}
      {!loading && items.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Action</th>
                <th>Actor Role</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {items.map((entry) => (
                <tr key={entry._id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{new Date(entry.createdAt).toLocaleString()}</td>
                  <td>{entry.action}</td>
                  <td>{entry.actorRole}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11 }}>
                    {entry.metadata && Object.keys(entry.metadata).length > 0 ? JSON.stringify(entry.metadata) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
