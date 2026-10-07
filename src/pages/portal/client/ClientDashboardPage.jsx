import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import StatCard from '../../../components/portal/StatCard';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import StatusBadge from '../../../components/portal/StatusBadge';
import OrderStatusBadge from '../../../components/portal/order/OrderStatusBadge';
import { useAuth } from '../../../context/PortalAuthContext';
import { fetchClientDashboard } from '../../../services/portal/dashboardApi';
import { formatMoney } from '../../../utils/portal/money';

export default function ClientDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientDashboard()
      .then(setData)
      .catch((err) => setError(err.response?.data?.message || 'Failed to load dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title={`Welcome, ${user?.name || ''}`} subtitle="Here's an overview of your account and services" />

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}

      {data && (
        <>
          <div className="ld-card-grid">
            <StatCard label="Active Services" value={data.activeOrders || 0} to="/client/services" color="#10B981" />
            <StatCard label="My Orders" value={data.myOrders} to="/client/orders" color="#D4A574" />
            <StatCard label="Completed Orders" value={data.completedOrders} to="/client/orders?status=COMPLETED" color="#6366F1" />
            <StatCard label="Pending Payment" value={data.pendingPaymentOrders} to="/client/payments" color="#F59E0B" />
            <StatCard label="Invoices" value={data.completedOrders || (data.recentOrders?.filter(o => o.invoiceNumber)?.length || 0)} to="/client/invoices" color="#0891B2" />
            <StatCard label="Cancelled" value={data.cancelledOrders} to="/client/orders?status=CANCELLED" color="#F43F5E" />
            {data.kycRejected > 0 && (
              <StatCard label="Documents Rejected" value={data.kycRejected} to="/client/documents" color="#F43F5E" />
            )}
            {data.openTickets > 0 && (
              <StatCard label="Open Support Tickets" value={data.openTickets} to="/client/support" color="#F59E0B" />
            )}
          </div>

          {data.clientCode && (
            <div className="ld-panel" style={{ marginTop: 16, marginBottom: 16 }}>
              <div className="ld-card-grid">
                <div>
                  <div className="ld-card-label">Client ID</div>
                  <div className="ld-card-value" style={{ fontFamily: 'monospace', fontSize: 14 }}>
                    {data.clientCode}
                  </div>
                </div>
                <div>
                  <div className="ld-card-label">Account Status</div>
                  <div className="ld-card-value">
                    <StatusBadge status={data.status} />
                  </div>
                </div>
                <div>
                  <div className="ld-card-label">Assigned Admin</div>
                  <div className="ld-card-value" style={{ fontSize: 14 }}>
                    {data.assignedAdmin ? (
                      <span>
                        {data.assignedAdmin.name}
                        {data.assignedAdmin.adminCode && (
                          <span style={{ fontFamily: 'monospace', fontSize: 12, marginLeft: 6, color: 'var(--ld-text-muted)' }}>
                            {data.assignedAdmin.adminCode}
                          </span>
                        )}
                        <div style={{ fontSize: 12, color: 'var(--ld-text-muted)' }}>{data.assignedAdmin.email}</div>
                      </span>
                    ) : 'Not yet assigned'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {data.recentActivity?.length > 0 && (
            <div className="ld-panel" style={{ marginBottom: 16 }}>
              <div className="ld-permission-group-title">Recent Activity</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13 }}>
                {data.recentActivity.map((a, i) => (
                  <li key={i}>
                    {a.action} — {new Date(a.createdAt).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.recentOrders?.length > 0 && (
            <div className="ld-table-wrap" style={{ marginBottom: 16 }}>
              <table className="ld-table">
                <thead>
                  <tr>
                    <th colSpan={7} style={{ fontWeight: 700 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Recent Orders</span>
                        <button
                          className="ld-btn-secondary ld-btn-sm"
                          onClick={() => navigate('/client/orders')}
                          style={{ fontWeight: 600 }}
                        >
                          View All Orders →
                        </button>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>Order #</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Total</th>
                    <th>Created</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ fontFamily: 'monospace' }}>
                        <button
                          onClick={() => navigate(`/client/orders/${order.id}`)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'var(--ld-primary)',
                          }}
                        >
                          {order.orderCode}
                        </button>
                      </td>
                      <td>{order.serviceSnapshot?.name || '—'}</td>
                      <td>
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td>
                        <OrderStatusBadge status={order.paymentStatus} />
                      </td>
                      <td>{formatMoney(order.pricing?.total)}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: 6 }}>
                          <button
                            className="ld-btn-secondary ld-btn-sm"
                            onClick={() => navigate(`/client/orders/${order.id}`)}
                          >
                            View
                          </button>
                          {order.invoiceNumber && (
                            <button
                              className="ld-btn-primary ld-btn-sm"
                              onClick={() => navigate(`/client/orders/${order.id}/invoice`)}
                              title="Tax Invoice"
                            >
                              🧾
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="ld-panel">
            <div className="ld-permission-group-title" style={{ marginBottom: 12 }}>Quick Actions</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="ld-btn-primary ld-btn-sm" onClick={() => navigate('/client/services')}>Browse Services</button>
              <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate('/client/orders')}>My Orders</button>
              <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate('/client/payments')}>Payments</button>
              <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate('/client/invoices')}>Invoices</button>
              <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate('/client/documents')}>Upload Documents</button>
              <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate('/client/support')}>Get Support</button>
              <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate('/client/downloads')}>Downloads</button>
              <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate('/client/profile')}>Edit Profile</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
