import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../PageHeader';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import StatusBadge from '../StatusBadge';
import Toast from '../Toast';
import FutureFeatureTab from '../client/FutureFeatureTab';
import ServiceOverviewTab from './ServiceOverviewTab';
import ServicePricingTab from './ServicePricingTab';
import ServiceFormBuilderTab from './ServiceFormBuilderTab';
import ServiceDocumentsTab from './ServiceDocumentsTab';
import ServiceActivityTab from './ServiceActivityTab';
import { getService } from '../../../services/portal/servicesApi';

const TABS = ['Overview', 'Pricing', 'Form Configuration', 'Required Documents', 'Activity', 'Orders'];

export default function ServiceDetailView({ basePath }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('Overview');
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setService(await getService(id));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load this service.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!service) return null;

  return (
    <div>
      <button className="ld-btn-secondary ld-btn-sm" style={{ marginBottom: 16 }} onClick={() => navigate(basePath)}>
        ← Back to Services
      </button>

      <PageHeader
        title={service.name}
        subtitle={
          <>
            <span style={{ fontFamily: 'monospace' }}>{service.serviceCode}</span> · {service.category} ·{' '}
            <StatusBadge status={service.status} />
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

      {tab === 'Overview' && <ServiceOverviewTab service={service} onChanged={load} onToast={setToast} />}
      {tab === 'Pricing' && <ServicePricingTab service={service} onChanged={load} onToast={setToast} />}
      {tab === 'Form Configuration' && <ServiceFormBuilderTab service={service} onChanged={load} onToast={setToast} />}
      {tab === 'Required Documents' && <ServiceDocumentsTab service={service} onChanged={load} onToast={setToast} />}
      {tab === 'Activity' && <ServiceActivityTab service={service} />}
      {tab === 'Orders' && <FutureFeatureTab message="Orders will be available in Phase 5." />}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
