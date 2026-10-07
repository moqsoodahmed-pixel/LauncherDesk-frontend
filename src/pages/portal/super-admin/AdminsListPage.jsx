import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import StatusBadge from '../../../components/portal/StatusBadge';
import Pagination from '../../../components/portal/Pagination';
import Toast from '../../../components/portal/Toast';
import ConfirmModal from '../../../components/portal/ConfirmModal';
import CreateAdminModal from '../../../components/portal/admin/CreateAdminModal';
import { getAdmins, updateAdminStatus } from '../../../services/portal/adminsApi';
import { ALL_USER_STATUSES } from '../../../constants/portal/userStatus';

export default function AdminsListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [admins, setAdmins] = useState([]);
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
  const [statusTarget, setStatusTarget] = useState(null);
  const debounceRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getAdmins({ page, limit: 20, search, status, dateFrom, dateTo, sortBy, sortDir });
      setAdmins(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load admins.');
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
      // load() is triggered by search state change via useCallback dep
    }, 350);
  }

  async function confirmStatusChange() {
    if (!statusTarget) return;
    try {
      await updateAdminStatus(statusTarget.admin.id, statusTarget.nextStatus);
      setToast({ type: 'success', message: `${statusTarget.admin.name} is now ${statusTarget.nextStatus}.` });
      setStatusTarget(null);
      load();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Could not update status.' });
      setStatusTarget(null);
    }
  }

  return (
    <div>
      <PageHeader title="Admins" subtitle="Manage LauncherDesk employee accounts, permissions and client assignments." />

      <div className="ld-toolbar" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
          <input
            className="ld-form-input"
            placeholder="Search name or email…"
            value={search}
            onChange={handleSearchChange}
            style={{ width: 240 }}
          />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All statuses</option>
            {ALL_USER_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input className="ld-form-input" type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }} title="From date" style={{ width: 140 }} />
          <input className="ld-form-input" type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1); }} title="To date" style={{ width: 140 }} />
          {(search || status || dateFrom || dateTo) && (
            <button className="ld-btn-secondary ld-btn-sm" onClick={() => { setSearch(''); setStatus(''); setDateFrom(''); setDateTo(''); setPage(1); }}>Clear</button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {meta && <span style={{ fontSize: 13, color: 'var(--ld-text-muted)' }}>{meta.total} admin{meta.total !== 1 ? 's' : ''}</span>}
          <button className="ld-btn-primary" onClick={() => setShowCreate(true)}>
            + Create Admin
          </button>
        </div>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}

      {!loading && !error && admins.length === 0 && <EmptyState message="No data found." />}

      {!loading && !error && admins.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <SortTh col="adminCode">Admin ID</SortTh>
                <SortTh col="name">Name</SortTh>
                <SortTh col="email">Email</SortTh>
                <th>Phone</th>
                <th>Department</th>
                <th>Role</th>
                <SortTh col="status">Status</SortTh>
                <th>Clients</th>
                <SortTh col="lastLogin">Last Login</SortTh>
                <SortTh col="createdAt">Created</SortTh>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/super-admin/admins/${admin.id}`)}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--ld-primary)', fontWeight: 700 }}>
                    {admin.adminCode || '—'}
                  </td>
                  <td style={{ fontWeight: 600 }}>{admin.name}</td>
                  <td style={{ fontSize: 13 }}>{admin.email}</td>
                  <td style={{ fontSize: 13 }}>{admin.phone || '—'}</td>
                  <td style={{ fontSize: 13 }}>{admin.department || '—'}</td>
                  <td>{admin.role}</td>
                  <td><StatusBadge status={admin.status} /></td>
                  <td>{admin.assignedClientsCount ?? '—'}</td>
                  <td style={{ fontSize: 12 }}>{admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}</td>
                  <td style={{ fontSize: 12 }}>{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : '—'}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="ld-row-actions">
                      <button className="ld-btn-secondary ld-btn-sm" onClick={() => navigate(`/super-admin/admins/${admin.id}`)}>
                        View
                      </button>
                      {admin.status === 'ACTIVE' ? (
                        <button className="ld-btn-danger ld-btn-sm" onClick={() => setStatusTarget({ admin, nextStatus: 'DISABLED' })}>
                          Disable
                        </button>
                      ) : (
                        <button className="ld-btn-secondary ld-btn-sm" onClick={() => setStatusTarget({ admin, nextStatus: 'ACTIVE' })}>
                          Enable
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      )}

      <CreateAdminModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={(admin) => {
          setShowCreate(false);
          setToast({
            type: 'success',
            message: admin.adminCode
              ? `${admin.name} created. Admin ID: ${admin.adminCode}`
              : `${admin.name} created.`,
          });
          load();
        }}
      />

      <ConfirmModal
        open={!!statusTarget}
        title={statusTarget?.nextStatus === 'DISABLED' ? 'Disable this admin?' : 'Enable this admin?'}
        message={
          statusTarget?.nextStatus === 'DISABLED'
            ? `${statusTarget?.admin.name} will no longer be able to log in, and their active sessions will be revoked immediately.`
            : `${statusTarget?.admin.name} will be able to log in again.`
        }
        confirmLabel={statusTarget?.nextStatus === 'DISABLED' ? 'Disable' : 'Enable'}
        danger={statusTarget?.nextStatus === 'DISABLED'}
        onConfirm={confirmStatusChange}
        onCancel={() => setStatusTarget(null)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
