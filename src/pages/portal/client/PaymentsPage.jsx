import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import Pagination from '../../../components/portal/Pagination';
import { getMyPayments } from '../../../services/portal/clientPaymentsApi';
import { getOwnInvoiceByOrder } from '../../../services/portal/invoicesApi';
import { formatMoney } from '../../../utils/portal/money';

/**
 * FIX BUG-CL-02: Amount was showing ₹0 — backend was reading p.amount which
 * doesn't exist on the Payment model (stores amountPaise). Backend now returns
 * correct rupee amount. Frontend reads p.amount which the fixed API populates.
 *
 * FIX BUG-CL-03: Method showed "DEVELOPMENT" — backend now maps provider/method
 * to human-readable labels. Frontend reads p.method (already a display string).
 *
 * FIX BUG-CL-04: Status showed "Not configured" — backend now returns statusLabel
 * with human-readable text. Frontend displays statusLabel in the badge.
 */

// Status badge styles mapped to internal status codes
const STATUS_STYLES = {
  CONFIRMED: { background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.3)' },
  PENDING: { background: 'rgba(245,158,11,0.1)', color: '#d97706', border: '1px solid rgba(245,158,11,0.3)' },
  CREATED: { background: 'rgba(245,158,11,0.08)', color: '#d97706', border: '1px solid rgba(245,158,11,0.2)' },
  FAILED: { background: 'rgba(244,63,94,0.1)', color: '#e11d48', border: '1px solid rgba(244,63,94,0.3)' },
  REFUNDED: { background: 'rgba(99,102,241,0.1)', color: '#4f46e5', border: '1px solid rgba(99,102,241,0.3)' },
  PARTIALLY_REFUNDED: { background: 'rgba(99,102,241,0.08)', color: '#4f46e5', border: '1px solid rgba(99,102,241,0.2)' },
  CANCELLED: { background: 'rgba(107,114,128,0.1)', color: '#6b7280', border: '1px solid rgba(107,114,128,0.3)' },
  EXPIRED: { background: 'rgba(107,114,128,0.1)', color: '#6b7280', border: '1px solid rgba(107,114,128,0.3)' },
};

function PaymentBadge({ status, statusLabel }) {
  const s = STATUS_STYLES[status] || { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' };
  // FIX BUG-CL-04: Display statusLabel (human-readable) instead of raw status code
  const displayText = statusLabel || status?.replace(/_/g, ' ') || '—';
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 999,
      textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', ...s,
    }}>
      {displayText}
    </span>
  );
}

function fmt(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function PaymentsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async (p = 1) => {
    setLoading(true);
    setError('');
    try {
      const result = await getMyPayments({ page: p, limit: 20 });
      setItems(result.items || []);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load payments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(page); }, [load, page]);

  // FIX BUG-CL-02: Use p.amount (now correctly populated by fixed backend)
  // Previously this always showed ₹0 because p.amount was undefined.
  const totals = {
    paid: meta?.summary?.totalPaid ?? items.filter((p) => p.status === 'CONFIRMED').reduce((s, p) => s + (p.amount || 0), 0),
    pending: meta?.summary?.totalPending ?? items.filter((p) => ['CREATED', 'PENDING'].includes(p.status)).reduce((s, p) => s + (p.amount || 0), 0),
  };

  return (
    <div>
      <PageHeader title="Payment Center" subtitle="Your complete payment history across all orders." />

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={() => load(page)} />}

      {!loading && !error && (
        <>
          {/* Summary cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'Total Payments', value: meta?.total ?? 0, color: 'var(--ld-gold)' },
              { label: 'Amount Paid', value: formatMoney(totals.paid), color: '#10B981' },
              { label: 'Pending', value: formatMoney(totals.pending), color: '#F59E0B' },
            ].map(({ label, value, color }) => (
              <div key={label} className="ld-card" style={{ padding: '16px 20px', borderLeft: `3px solid ${color}` }}>
                <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ld-text)' }}>{value}</div>
              </div>
            ))}
          </div>

          {items.length === 0 ? (
            <EmptyState message="No payment records found. Your payment history will appear here once you place an order." />
          ) : (
            <>
              <div className="ld-table-wrap">
                <table className="ld-table">
                  <thead>
                    <tr>
                      <th>Payment #</th>
                      <th>Order</th>
                      <th>Service</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Method</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((p) => (
                      <tr key={p.id}>
                        <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--ld-gold)' }}>
                          {p.paymentCode || '—'}
                        </td>
                        <td>
                          {p.order ? (
                            <button
                              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, color: 'var(--ld-primary)', fontWeight: 600 }}
                              onClick={() => navigate(`/client/orders/${p.order.id}`)}
                            >
                              {p.order.orderCode}
                            </button>
                          ) : '—'}
                        </td>
                        <td style={{ fontSize: 13 }}>{p.order?.serviceName || '—'}</td>
                        {/* FIX BUG-CL-02: p.amount is now correctly populated in rupees */}
                        <td style={{ fontWeight: 700 }}>{formatMoney(p.amount)}</td>
                        {/* FIX BUG-CL-04: Pass statusLabel for human-readable display */}
                        <td><PaymentBadge status={p.status} statusLabel={p.statusLabel} /></td>
                        {/* FIX BUG-CL-03: p.method is now a display label (e.g. "Razorpay", "UPI"), not "DEVELOPMENT" */}
                        <td style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>{p.method || '—'}</td>
                        <td style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>
                          {p.status === 'CONFIRMED' ? fmt(p.paidAt) : fmt(p.createdAt)}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {p.order && (
                            <div style={{ display: 'inline-flex', gap: 6 }}>
                              <button
                                className="ld-btn-secondary ld-btn-sm"
                                onClick={() => navigate(`/client/orders/${p.order.id}`)}
                                title="View order details"
                              >
                                View Order
                              </button>
                              {p.status === 'CONFIRMED' ? (
                                <button
                                  className="ld-btn-primary ld-btn-sm"
                                  onClick={async () => {
                                    // The real generated invoice (Preview/Download/Print all live
                                    // on that page) if one exists yet; the old print-only view as a
                                    // safe fallback for the rare case payment confirmed but the
                                    // invoice hasn't generated yet (should be near-instantaneous).
                                    const inv = await getOwnInvoiceByOrder(p.order.id).catch(() => null);
                                    navigate(inv ? `/client/invoices/${inv.id}` : `/client/orders/${p.order.id}/invoice`);
                                  }}
                                  title="View, download, or print the GST invoice"
                                >
                                  🧾 Invoice
                                </button>
                              ) : (
                                <button
                                  className="ld-btn-primary ld-btn-sm"
                                  onClick={() => navigate(`/client/orders/${p.order.id}`)}
                                  title="Complete or retry payment"
                                >
                                  Pay Now
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {meta && meta.totalPages > 1 && (
                <Pagination page={page} totalPages={meta.totalPages} onPageChange={setPage} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}