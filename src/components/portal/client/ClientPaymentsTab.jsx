import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';
import Pagination from '../Pagination';
import { listClientPayments } from '../../../services/portal/paymentsAdminApi';

const STATUS_COLORS = {
  CONFIRMED: { bg: '#dcfce7', color: '#15803d' },
  CREATED: { bg: '#fef9c3', color: '#a16207' },
  FAILED: { bg: '#fee2e2', color: '#b91c1c' },
  REFUNDED: { bg: '#ede9fe', color: '#6d28d9' },
};

function PaymentBadge({ status }) {
  const s = STATUS_COLORS[status] || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{ fontSize: 11, background: s.bg, color: s.color, padding: '2px 10px', borderRadius: 999, fontWeight: 700, textTransform: 'uppercase' }}>
      {status?.replace(/_/g, ' ') || '—'}
    </span>
  );
}

function rupees(val) {
  if (val == null) return '—';
  return `₹${Number(val).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function ClientPaymentsTab({ client, basePath }) {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const isSuperAdmin = basePath?.includes('super-admin');
  const ordersPath = isSuperAdmin ? '/super-admin/orders' : '/admin/orders';
  const paymentsPath = isSuperAdmin ? '/super-admin/payments' : null;

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await listClientPayments(client.id, { page, limit: 10, sortBy: 'createdAt', sortDir: 'desc' });
      setPayments(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load payments.');
    } finally {
      setLoading(false);
    }
  }, [client.id, page]);

  useEffect(() => { load(); }, [load]);

  const totalConfirmed = payments
    .filter((p) => p.status === 'CONFIRMED')
    .reduce((sum, p) => sum + (p.netAmountRupees || 0), 0);

  return (
    <div className="ld-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>Payment History</h3>
        <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--ld-text-muted)' }}>
          {meta && <span>{meta.total} total</span>}
          {payments.length > 0 && (
            <span style={{ fontWeight: 600, color: '#15803d' }}>
              Confirmed (this page): {rupees(totalConfirmed)}
            </span>
          )}
        </div>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && payments.length === 0 && <EmptyState message="No payment records for this client." />}

      {!loading && !error && payments.length > 0 && (
        <>
          <div className="ld-table-wrap">
            <table className="ld-table">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Order #</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Method</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} style={{ cursor: p.orderId ? 'pointer' : 'default' }}
                    onClick={() => p.orderId && navigate(`${ordersPath}/${p.orderId}?tab=Payment`)}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ld-primary)', fontWeight: 700 }}>
                        {p.paymentCode || '—'}
                      </span>
                    </td>
                    <td>
                      {p.orderCode ? (
                        <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 600 }}>{p.orderCode}</span>
                      ) : '—'}
                    </td>
                    <td style={{ fontSize: 13 }}>{p.serviceName || '—'}</td>
                    <td style={{ fontWeight: 600 }}>{rupees(p.netAmountRupees)}</td>
                    <td><PaymentBadge status={p.status} /></td>
                    <td style={{ fontSize: 12, textTransform: 'capitalize' }}>{p.method || '—'}</td>
                    <td style={{ fontSize: 12 }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination meta={meta} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
