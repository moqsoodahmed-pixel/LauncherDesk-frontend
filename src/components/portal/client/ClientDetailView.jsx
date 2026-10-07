import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../PageHeader';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import StatusBadge from '../StatusBadge';
import Toast from '../Toast';
import ClientProfileTab from './ClientProfileTab';
import ClientAssignmentTab from './ClientAssignmentTab';
import ClientActivityTab from './ClientActivityTab';
import ClientAuthTab from './ClientAuthTab';
import ClientOrdersTab from './ClientOrdersTab';
import ClientKycTab from './ClientKycTab';
import ClientPaymentsTab from './ClientPaymentsTab';
import { getClient } from '../../../services/portal/clientsApi';

const TABS = ['Profile', 'Assignment', 'Orders', 'Payments', 'KYC', 'Activity', 'Authentication'];

export default function ClientDetailView({ basePath }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('Profile');
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setClient(await getClient(id));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load this client.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!client) return null;

  return (
    <div>
      <button className="ld-btn-secondary ld-btn-sm" style={{ marginBottom: 16 }} onClick={() => navigate(basePath)}>
        ← Back to Clients
      </button>

      <PageHeader
        title={
          <span>
            <span style={{ fontFamily: 'monospace', color: 'var(--ld-primary)', marginRight: 10 }}>{client.clientCode}</span>
            <span style={{ color: 'var(--ld-text-muted)', fontWeight: 500, fontSize: '0.75em' }}>{client.name}</span>
          </span>
        }
        subtitle={
          <>
            {client.companyName && <span style={{ fontWeight: 600, marginRight: 6 }}>{client.companyName}</span>}
            {client.companyName && '· '}
            {client.email} · <StatusBadge status={client.status} />
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

      {tab === 'Profile' && <ClientProfileTab client={client} onChanged={load} onToast={setToast} />}
      {tab === 'Assignment' && <ClientAssignmentTab client={client} onChanged={load} onToast={setToast} />}
      {tab === 'Orders' && <ClientOrdersTab client={client} basePath={basePath} />}
      {tab === 'Payments' && <ClientPaymentsTab client={client} basePath={basePath} />}
      {tab === 'KYC' && <ClientKycTab client={client} basePath={basePath} />}
      {tab === 'Activity' && <ClientActivityTab client={client} />}
      {tab === 'Authentication' && <ClientAuthTab client={client} />}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
