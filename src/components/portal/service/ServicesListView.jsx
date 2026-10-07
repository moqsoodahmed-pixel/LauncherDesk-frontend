import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../PageHeader';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';
import StatusBadge from '../StatusBadge';
import Pagination from '../Pagination';
import Toast from '../Toast';
import CreateServiceModal from './CreateServiceModal';
import { getServices } from '../../../services/portal/servicesApi';
import { ALL_SERVICE_CATEGORIES } from '../../../constants/portal/serviceCategory';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';
import { formatMoney } from '../../../utils/portal/money';

const FILTER_STATUSES = ['ACTIVE', 'INACTIVE', 'COMPLETED'];

export default function ServicesListView({ basePath }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { hasPermission } = useAuth();

  const [services, setServices] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const debounceRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getServices({ page, limit: 20, search, status, category, sortBy: 'sortOrder', sortDir: 'asc' });
      setServices(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load services.');
    } finally {
      setLoading(false);
    }
  }, [page, search, status, category]);

  useEffect(() => {
    load();
  }, [load]);

  function handleSearchChange(e) {
    const val = e.target.value;
    setSearch(val);
    setPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // load() fires via useCallback dep change
    }, 350);
  }

  return (
    <div>
      <PageHeader title="Services" subtitle="The service catalogue clients will select from when placing orders." />

      <div className="ld-toolbar">
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            className="ld-form-input"
            placeholder="Search code, name, description…"
            value={search}
            onChange={handleSearchChange}
            style={{ width: 240 }}
          />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All statuses</option>
            {FILTER_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
            <option value="">All categories</option>
            {ALL_SERVICE_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="ld-toolbar-spacer" />
        {hasPermission(PERMISSIONS.CREATE_SERVICE) && (
          <button className="ld-btn-primary" onClick={() => setShowCreate(true)}>
            + Create Service
          </button>
        )}
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && services.length === 0 && <EmptyState message="No data found." />}

      {!loading && !error && services.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Public</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`${basePath}/${svc.id}`)}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--ld-primary)', fontWeight: 700 }}>{svc.serviceCode}</td>
                  <td style={{ fontWeight: 600 }}>{svc.name}</td>
                  <td style={{ fontSize: 13 }}>{svc.category}</td>
                  <td>
                    {formatMoney(svc.pricing?.total)}
                    <span className="ld-phase-note"> (incl. GST)</span>
                  </td>
                  <td><StatusBadge status={svc.status} /></td>
                  <td style={{ fontSize: 13 }}>{svc.isPublic ? 'Yes' : 'No'}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`${basePath}/${svc.id}`)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      )}

      <CreateServiceModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={(svc) => {
          setShowCreate(false);
          setToast({ type: 'success', message: `${svc.name} created.` });
          load();
          navigate(`${basePath}/${svc.id}`);
        }}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
