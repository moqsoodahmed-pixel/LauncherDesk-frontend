import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import OrderStatusBadge from '../../../components/portal/order/OrderStatusBadge';
import { getOwnOrders } from '../../../services/portal/clientOrdersApi';
import { formatMoney } from '../../../utils/portal/money';

export default function ClientInvoicesPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getOwnOrders({ limit: 100, sortBy: 'createdAt', sortDir: 'desc' });
      // Filter orders that have an invoice number or have been confirmed/paid
      const invOrders = (result.items || []).filter(
        (o) => o.invoiceNumber || ['CONFIRMED', 'PAID'].includes(o.paymentStatus) || o.status === 'COMPLETED'
      );
      setOrders(invOrders);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load your invoices.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = orders.filter((o) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (o.invoiceNumber && o.invoiceNumber.toLowerCase().includes(q)) ||
      (o.orderCode && o.orderCode.toLowerCase().includes(q)) ||
      (o.serviceSnapshot?.name && o.serviceSnapshot.name.toLowerCase().includes(q))
    );
  });

  const totalInvoiced = orders.reduce((sum, o) => sum + (o.pricing?.total || 0), 0);
  const totalGst = orders.reduce((sum, o) => sum + (o.pricing?.gstAmount || 0), 0);

  return (
    <div>
      <div className="ld-toolbar">
        <PageHeader
          title="Invoices"
          subtitle="View, print, and download GST tax invoices for your LauncherDesk services."
        />
        <div className="ld-toolbar-spacer" />
        <button className="ld-btn-secondary" onClick={() => navigate('/client/downloads')}>
          Downloads Hub
        </button>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={load} />}

      {!loading && !error && (
        <>
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 20 }}>
            <div className="ld-card" style={{ padding: '16px 20px', borderLeft: '3px solid var(--ld-gold)' }}>
              <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                Total Invoices
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--ld-text)' }}>{orders.length}</div>
            </div>

            <div className="ld-card" style={{ padding: '16px 20px', borderLeft: '3px solid #10B981' }}>
              <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                Total Invoiced Value
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--ld-text)' }}>{formatMoney(totalInvoiced)}</div>
            </div>

            <div className="ld-card" style={{ padding: '16px 20px', borderLeft: '3px solid #6366F1' }}>
              <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                GST Amount
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--ld-text)' }}>{formatMoney(totalGst)}</div>
            </div>
          </div>

          {/* Search bar */}
          <div className="ld-toolbar" style={{ marginBottom: 16 }}>
            <input
              className="ld-form-input"
              placeholder="Search by invoice #, order #, or service…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 360 }}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState message={search ? 'No invoices match your search.' : 'No invoices generated yet. Invoices appear here once you place and confirm an order.'}>
              <button className="ld-btn-primary" style={{ marginTop: 12 }} onClick={() => navigate('/client/services')}>
                Browse Services
              </button>
            </EmptyState>
          ) : (
            <div className="ld-table-wrap">
              <table className="ld-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Linked Order</th>
                    <th>Service</th>
                    <th>Base Price</th>
                    <th>GST</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => {
                    const invNo = order.invoiceNumber || order.orderCode || '—';
                    return (
                      <tr key={order.id}>
                        <td>
                          <button
                            onClick={() => navigate(`/client/orders/${order.id}/invoice`)}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer',
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              fontSize: 13,
                              color: 'var(--ld-gold)',
                            }}
                            title="Open tax invoice"
                          >
                            {invNo}
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => navigate(`/client/orders/${order.id}`)}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer',
                              fontFamily: 'monospace',
                              fontSize: 12,
                              color: 'var(--ld-primary)',
                              fontWeight: 600,
                            }}
                            title="View order details"
                          >
                            {order.orderCode}
                          </button>
                        </td>
                        <td style={{ fontWeight: 600 }}>{order.serviceSnapshot?.name || '—'}</td>
                        <td>{formatMoney(order.pricing?.baseAmount ?? order.pricing?.baseAmountMinor / 100)}</td>
                        <td>
                          {order.pricing?.gstApplicable
                            ? `${formatMoney(order.pricing?.gstAmount ?? order.pricing?.gstAmountMinor / 100)} (${order.pricing?.gstPercentage || 18}%)`
                            : '0%'}
                        </td>
                        <td style={{ fontWeight: 700 }}>{formatMoney(order.pricing?.total)}</td>
                        <td>
                          <OrderStatusBadge status={order.paymentStatus || order.status} />
                        </td>
                        <td style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: 6 }}>
                            <button
                              className="ld-btn-primary ld-btn-sm"
                              onClick={() => navigate(`/client/orders/${order.id}/invoice`)}
                              title="Open printable tax invoice"
                            >
                              🧾 View Invoice
                            </button>
                            <button
                              className="ld-btn-secondary ld-btn-sm"
                              onClick={() => navigate(`/client/orders/${order.id}`)}
                              title="View linked order"
                            >
                              Order
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
