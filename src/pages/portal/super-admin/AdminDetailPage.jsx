import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import StatusBadge from '../../../components/portal/StatusBadge';
import Toast from '../../../components/portal/Toast';
import ProfileTab from '../../../components/portal/admin/ProfileTab';
import PermissionsTab from '../../../components/portal/admin/PermissionsTab';
import ScopeTab from '../../../components/portal/admin/ScopeTab';
import ClientsTab from '../../../components/portal/admin/ClientsTab';
import SessionsTab from '../../../components/portal/admin/SessionsTab';
import ActivityTab from '../../../components/portal/admin/ActivityTab';
import AdminPerformanceTab from '../../../components/portal/admin/AdminPerformanceTab';
import { getAdmin } from '../../../services/portal/adminsApi';

const TABS = ['Profile', 'Performance', 'Permissions', 'Data Scope', 'Clients', 'Sessions', 'Activity'];

export default function AdminDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('Profile');
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setAdmin(await getAdmin(id));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load this admin.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!admin) return null;

  return (
    <div>
      <button className="ld-btn-secondary ld-btn-sm" style={{ marginBottom: 16 }} onClick={() => navigate('/super-admin/admins')}>
        ← Back to Admins
      </button>

      <PageHeader
        title={admin.name}
        subtitle={
          <>
            {admin.adminCode && <span style={{ fontFamily: 'monospace', marginRight: 6 }}>{admin.adminCode}</span>}
            {admin.adminCode && '· '}
            {admin.email} · {admin.role} · <StatusBadge status={admin.status} />
          </>
        }
      />

      <div className="ld-tabs">
        {TABS.map((t) => (
          <button key={t} className={`ld-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Profile' && <ProfileTab admin={admin} onChanged={load} onToast={setToast} />}
      {tab === 'Performance' && <AdminPerformanceTab admin={admin} />}
      {tab === 'Permissions' && <PermissionsTab admin={admin} onChanged={load} onToast={setToast} />}
      {tab === 'Data Scope' && <ScopeTab admin={admin} onChanged={load} onToast={setToast} />}
      {tab === 'Clients' && <ClientsTab admin={admin} onChanged={load} onToast={setToast} />}
      {tab === 'Sessions' && <SessionsTab admin={admin} onToast={setToast} />}
      {tab === 'Activity' && <ActivityTab admin={admin} />}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
