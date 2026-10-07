import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import { getAdminStats } from '../../../services/portal/adminsApi';

const ORDER_STATUSES = [
  'PENDING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED', 'CLOSED',
  'KYC_PENDING', 'KYC_SUBMITTED', 'KYC_UNDER_REVIEW', 'KYC_VERIFIED', 'KYC_REJECTED',
];

const STATUS_COLORS = {
  PENDING: '#a16207',
  IN_PROGRESS: '#1d4ed8',
  ON_HOLD: '#6d28d9',
  COMPLETED: '#15803d',
  CANCELLED: '#b91c1c',
  CLOSED: '#374151',
  KYC_PENDING: '#d97706',
  KYC_SUBMITTED: '#2563eb',
  KYC_UNDER_REVIEW: '#7c3aed',
  KYC_VERIFIED: '#16a34a',
  KYC_REJECTED: '#dc2626',
};

function rupees(val) {
  if (!val && val !== 0) return '—';
  return `₹${Number(val).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function StatBox({ label, value, sub, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        border: '1px solid var(--ld-border)',
        borderRadius: 10,
        padding: '18px 20px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.15s',
      }}
      onMouseEnter={(e) => { if (onClick) e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; }}
    >
      <div style={{ fontSize: 12, color: 'var(--ld-text-muted)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: color || 'var(--ld-text-primary)' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export default function AdminPerformanceTab({ admin }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setStats(await getAdminStats(admin.id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load stats.');
    } finally {
      setLoading(false);
    }
  }, [admin.id]);

  useEffect(() => { load(); }, [load]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!stats) return null;

  const activeOrders = (stats.ordersByStatus?.IN_PROGRESS || 0) + (stats.ordersByStatus?.PENDING || 0) + (stats.ordersByStatus?.ON_HOLD || 0);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
        <StatBox
          label="Total Orders"
          value={stats.totalOrders}
          onClick={() => navigate(`/super-admin/orders?assignedAdmin=${admin.id}`)}
        />
        <StatBox
          label="Active Orders"
          value={activeOrders}
          color="#1d4ed8"
          onClick={() => navigate(`/super-admin/orders?assignedAdmin=${admin.id}&status=IN_PROGRESS`)}
        />
        <StatBox
          label="Completed Orders"
          value={stats.ordersByStatus?.COMPLETED || 0}
          color="#15803d"
          onClick={() => navigate(`/super-admin/orders?assignedAdmin=${admin.id}&status=COMPLETED`)}
        />
        <StatBox
          label="Assigned Clients"
          value={stats.assignedClients}
          onClick={() => navigate(`/super-admin/clients?assignedAdmin=${admin.id}`)}
        />
        <StatBox
          label="Revenue Generated"
          value={rupees(stats.revenueRupees)}
          sub={`${stats.confirmedPayments} confirmed payment${stats.confirmedPayments !== 1 ? 's' : ''}`}
          color="#15803d"
        />
        <StatBox
          label="KYC Pending (Global)"
          value={stats.kycPendingReview}
          color="#d97706"
          onClick={() => navigate('/super-admin/kyc?status=UPLOADED')}
        />
      </div>

      {Object.keys(stats.ordersByStatus || {}).length > 0 && (
        <div className="ld-panel">
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Orders by Status</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {ORDER_STATUSES.filter((s) => stats.ordersByStatus[s] > 0).map((s) => (
              <span
                key={s}
                onClick={() => navigate(`/super-admin/orders?assignedAdmin=${admin.id}&status=${s}`)}
                style={{
                  cursor: 'pointer',
                  fontSize: 12,
                  background: '#f8fafc',
                  border: `1px solid ${STATUS_COLORS[s] || '#e5e7eb'}`,
                  color: STATUS_COLORS[s] || '#374151',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontWeight: 600,
                }}
              >
                {s.replace(/_/g, ' ')}: {stats.ordersByStatus[s]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
