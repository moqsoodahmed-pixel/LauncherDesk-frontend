import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../PageHeader';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';
import StatusBadge from '../StatusBadge';
import Pagination from '../Pagination';
import Toast from '../Toast';
import CreateClientModal from './CreateClientModal';
import { getClients } from '../../../services/portal/clientsApi';
import { exportToCsv } from '../../../utils/portal/exportCsv';
import { ALL_CLIENT_STATUSES } from '../../../constants/portal/clientStatus';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

/**
 * Shared list view for /super-admin/clients and /admin/clients. The
 * backend's data-scope layer (not this component) is what actually
 * restricts which clients an Admin sees - this only decides which
 * controls to render.
 */
export default function ClientsListView({ basePath, title, subtitle }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { hasPermission } = useAuth();

  const [clients, setClients] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [showCreate, setShowCreate] = useState(false);
  const debounceRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getClients({ page, limit: 20, search, status, dateFrom, dateTo, sortBy, sortDir });
      setClients(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load clients.');
    } finally {
      setLoading(false);
    }
  }, [page, search, status, dateFrom, dateTo, sortBy, sortDir]);

  function handleSort(col) {
    if (sortBy === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(col);
      setSortDir('asc');
    }
    setPage(1);
  }

  function SortTh({ col, children }) {
    const active = sortBy === col;
    return (
      <th onClick={() => handleSort(col)} style={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}>
        {children} {active ? (sortDir === 'asc' ? '↑' : '↓') : <span style={{ opacity: 0.35 }}>↕</span>}
      </th>
    );
  }

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const params = {};
    if (status) params.status = status;
    if (search) params.search = search;
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;
    if (page > 1) params.page = String(page);
    setSearchParams(params, { replace: true });
  }, [status, search, dateFrom, dateTo, page, setSearchParams]);

  function handleSearchChange(e) {
    const val = e.target.value;
    setSearch(val);
    setPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // load() fires via useCallback dep change
    }, 350);
  }

  function handleExportCsv() {
    exportToCsv('clients', clients, [
      { label: 'Client ID', value: r => r.clientCode || '' },
      { label: 'Name', value: r => r.name || '' },
      { label: 'Company', value: r => r.companyName || '' },
      { label: 'Email', value: r => r.email || '' },
      { label: 'Phone', value: r => r.phone || '' },
      { label: 'Assigned Admin', value: r => r.assignedAdmin?.name || 'Unassigned' },
      { label: 'Status', value: r => r.status || '' },
      { label: 'Created', value: r => r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '' },
    ]);
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <PageHeader title={title} subtitle={subtitle} />
        <button className="ld-btn-secondary ld-btn-sm" onClick={handleExportCsv} style={{ marginTop: 4, flexShrink: 0 }}>↓ CSV</button>
      </div>

      <div className="ld-toolbar" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
          <input
            className="ld-form-input"
            placeholder="Search ID, name, company, email, phone…"
            value={search}
            onChange={handleSearchChange}
            style={{ width: 260 }}
          />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All statuses</option>
            {ALL_CLIENT_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input className="ld-form-input" type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }} title="From date" style={{ width: 140 }} />
          <input className="ld-form-input" type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1); }} title="To date" style={{ width: 140 }} />
          {(search || status || dateFrom || dateTo) && (
            <button className="ld-btn-secondary ld-btn-sm" onClick={() => { setSearch(''); setStatus(''); setDateFrom(''); setDateTo(''); setPage(1); }}>
              Clear
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {meta && <span style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>{meta.total} client{meta.total !== 1 ? 's' : ''}</span>}
          {hasPermission(PERMISSIONS.CREATE_CLIENT) && (
            <button className="ld-btn-primary" onClick={() => setShowCreate(true)}>
              + Create Client
            </button>
          )}
        </div>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && clients.length === 0 && <EmptyState message="No data found." />}

      {!loading && !error && clients.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <SortTh col="clientCode">Client ID</SortTh>
                <SortTh col="name">Name</SortTh>
                <SortTh col="companyName">Company</SortTh>
                <th>Phone</th>
                <SortTh col="email">Email</SortTh>
                <th>Assigned Admin</th>
                <SortTh col="status">Status</SortTh>
                <th>Last Activity</th>
                <SortTh col="createdAt">Created</SortTh>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`${basePath}/${client.id}`)}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: 'var(--ld-primary)' }}>{client.clientCode}</td>
                  <td style={{ fontWeight: 600 }}>{client.name}</td>
                  <td style={{ fontSize: 13 }}>{client.companyName || '—'}</td>
                  <td style={{ fontSize: 13 }}>{client.phone || '—'}</td>
                  <td style={{ fontSize: 13 }}>{client.email}</td>
                  <td style={{ fontSize: 12 }}>
                    {client.assignedAdmin?.name ? (
                      <div>
                        <div style={{ fontWeight: 600 }}>{client.assignedAdmin.name}</div>
                        {client.assignedAdmin.adminCode && (
                          <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ld-text-muted)' }}>{client.assignedAdmin.adminCode}</div>
                        )}
                      </div>
                    ) : (
                      <span style={{ fontSize: 11, background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: 999, fontWeight: 600 }}>
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td><StatusBadge status={client.status} /></td>
                  <td style={{ fontSize: 12 }}>{client.lastActivityAt ? new Date(client.lastActivityAt).toLocaleDateString() : '—'}</td>
                  <td style={{ fontSize: 12 }}>{new Date(client.createdAt).toLocaleDateString()}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`${basePath}/${client.id}`)}>
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

      <CreateClientModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={(client) => {
          setShowCreate(false);
          setToast({ type: 'success', message: `${client.name} created.` });
          load();
          navigate(`${basePath}/${client.id}`);
        }}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
