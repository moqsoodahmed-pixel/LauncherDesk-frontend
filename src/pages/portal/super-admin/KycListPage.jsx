import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import StatCard from '../../../components/portal/StatCard';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import Pagination from '../../../components/portal/Pagination';
import Toast from '../../../components/portal/Toast';
import ConfirmModal from '../../../components/portal/ConfirmModal';
import { listKycDocuments, getKycStats } from '../../../services/portal/kycAdminApi';
import { verifyOrderKycDocument, rejectOrderKycDocument, startOrderKycReview } from '../../../services/portal/kycApi';
import { ALL_DOCUMENT_TYPES } from '../../../constants/portal/documentTypes';
import { exportToCsv } from '../../../utils/portal/exportCsv';

const STATUS_COLORS = {
  UPLOADED: { bg: '#fef3c7', color: '#d97706' },
  UNDER_REVIEW: { bg: '#dbeafe', color: '#1d4ed8' },
  VERIFIED: { bg: '#dcfce7', color: '#15803d' },
  REJECTED: { bg: '#fee2e2', color: '#b91c1c' },
};

const ALL_STATUSES = ['UPLOADED', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED'];

function KycStatusBadge({ status }) {
  const style = STATUS_COLORS[status] || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{
      fontSize: 11, background: style.bg, color: style.color,
      padding: '2px 10px', borderRadius: 999, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap',
    }}>
      {status?.replace(/_/g, ' ')}
    </span>
  );
}

function formatDocType(t) {
  return (t || '').replace(/_/g, ' ');
}

export default function KycListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [docs, setDocs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const [toast, setToast] = useState(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [documentType, setDocumentType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');

  // Review modal state
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [approveTarget, setApproveTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const debounceRef = useRef(null);

  const loadDocs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await listKycDocuments({ page, limit: 20, search, status, documentType, dateFrom, dateTo, sortBy, sortDir });
      setDocs(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load KYC documents.');
    } finally {
      setLoading(false);
    }
  }, [page, search, status, documentType, dateFrom, dateTo, sortBy, sortDir]);

  useEffect(() => { loadDocs(); }, [loadDocs]);

  useEffect(() => {
    getKycStats().then(setStats).catch(() => {});
  }, []);

  useEffect(() => {
    const params = {};
    if (status) params.status = status;
    if (documentType) params.documentType = documentType;
    if (search) params.search = search;
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;
    if (page > 1) params.page = String(page);
    setSearchParams(params, { replace: true });
  }, [status, documentType, search, dateFrom, dateTo, page, setSearchParams]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {}, 350);
  }

  function clearFilters() {
    setSearch(''); setStatus(''); setDocumentType(''); setDateFrom(''); setDateTo(''); setPage(1);
  }

  function handleSort(col) {
    if (sortBy === col) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortBy(col); setSortDir('asc'); }
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

  function goToOrder(doc, tab = 'kyc') {
    if (doc.orderId) navigate(`/super-admin/orders/${doc.orderId}?tab=${tab}`);
  }

  async function handleApprove() {
    if (!approveTarget) return;
    setActionLoading(true);
    try {
      // Start review first if still UPLOADED (moves order to KYC_VERIFICATION)
      if (approveTarget.status === 'UPLOADED' && approveTarget.orderId) {
        await startOrderKycReview(approveTarget.orderId).catch(() => {});
      }
      await verifyOrderKycDocument(approveTarget.orderId, approveTarget.id);
      setToast({ type: 'success', message: `Document verified: ${formatDocType(approveTarget.documentType)}` });
      setApproveTarget(null);
      loadDocs();
      getKycStats().then(setStats).catch(() => {});
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Verification failed.' });
    } finally {
      setActionLoading(false);
    }
  }

  async function handleReject() {
    if (!rejectTarget || !rejectReason.trim()) return;
    setActionLoading(true);
    try {
      if (rejectTarget.status === 'UPLOADED' && rejectTarget.orderId) {
        await startOrderKycReview(rejectTarget.orderId).catch(() => {});
      }
      await rejectOrderKycDocument(rejectTarget.orderId, rejectTarget.id, rejectReason.trim());
      setToast({ type: 'success', message: `Document rejected.` });
      setRejectTarget(null);
      setRejectReason('');
      loadDocs();
      getKycStats().then(setStats).catch(() => {});
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Rejection failed.' });
    } finally {
      setActionLoading(false);
    }
  }

  const hasFilter = search || status || documentType || dateFrom || dateTo;

  function handleExportCsv() {
    exportToCsv('kyc_documents', docs, [
      { label: 'KYC ID', value: r => r.kycCode || '' },
      { label: 'Client ID', value: r => r.clientCode || '' },
      { label: 'Client Name', value: r => r.clientName || '' },
      { label: 'Document Type', value: r => r.documentType || '' },
      { label: 'Status', value: r => r.status || '' },
      { label: 'Assigned Admin', value: r => r.assignedAdmin?.name || '' },
      { label: 'Submitted', value: r => r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '' },
    ]);
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <PageHeader title="KYC Management" subtitle="Verify, approve, and manage KYC documents across all client orders." />
        <button className="ld-btn-secondary ld-btn-sm" onClick={handleExportCsv} style={{ marginTop: 4, flexShrink: 0 }}>↓ CSV</button>
      </div>

      {/* ── Stats Cards ── */}
      <div className="ld-card-grid" style={{ marginBottom: 24 }}>
        <StatCard label="Total KYC Docs" value={stats?.total ?? '—'} color="#6b7280" to="/super-admin/kyc" />
        <StatCard label="Pending Review" value={stats?.uploaded ?? '—'} color="#d97706" to="/super-admin/kyc?status=UPLOADED" />
        <StatCard label="Under Review" value={stats?.underReview ?? '—'} color="#1d4ed8" to="/super-admin/kyc?status=UNDER_REVIEW" />
        <StatCard label="Verified" value={stats?.verified ?? '—'} color="#15803d" to="/super-admin/kyc?status=VERIFIED" />
        <StatCard label="Rejected" value={stats?.rejected ?? '—'} color="#b91c1c" to="/super-admin/kyc?status=REJECTED" />
        <StatCard label="Verified Today" value={stats?.verifiedToday ?? '—'} color="#0891b2" to="/super-admin/kyc?status=VERIFIED" />
        <StatCard label="Verified This Week" value={stats?.verifiedWeek ?? '—'} color="#7c3aed" to="/super-admin/kyc?status=VERIFIED" />
        <StatCard label="Avg. Verification Time" value={stats?.avgVerificationTime ?? '—'} color="#374151" />
      </div>

      {/* ── Filters ── */}
      <div className="ld-toolbar" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
          <input
            className="ld-form-input"
            placeholder="Search KYC ID, client, order, document type…"
            value={search}
            onChange={handleSearchChange}
            style={{ width: 280 }}
          />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All statuses</option>
            {ALL_STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
          </select>
          <select value={documentType} onChange={(e) => { setDocumentType(e.target.value); setPage(1); }}>
            <option value="">All document types</option>
            {ALL_DOCUMENT_TYPES.map((t) => <option key={t} value={t}>{formatDocType(t)}</option>)}
          </select>
          <input className="ld-form-input" type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }} title="From date" style={{ width: 140 }} />
          <input className="ld-form-input" type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1); }} title="To date" style={{ width: 140 }} />
          {hasFilter && <button className="ld-btn-secondary ld-btn-sm" onClick={clearFilters}>Clear</button>}
        </div>
        <div style={{ fontSize: 13, color: 'var(--ld-text-muted)', alignSelf: 'center' }}>
          {meta ? `${meta.total} document${meta.total !== 1 ? 's' : ''}` : ''}
        </div>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && docs.length === 0 && <EmptyState message="No KYC documents found." />}

      {!loading && !error && docs.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <SortTh col="kycCode">KYC ID</SortTh>
                <th>Client ID</th>
                <SortTh col="client.name">Client Name</SortTh>
                <th>Company</th>
                <th>Assigned Admin</th>
                <SortTh col="documentType">Document Type</SortTh>
                <SortTh col="status">Status</SortTh>
                <SortTh col="createdAt">Submitted</SortTh>
                <SortTh col="reviewedAt">Verified Date</SortTh>
                <th>Verified By</th>
                <SortTh col="updatedAt">Last Updated</SortTh>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr
                  key={doc.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => goToOrder(doc)}
                >
                  <td style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color: 'var(--ld-primary)', whiteSpace: 'nowrap' }}>
                    {doc.kycCode || '—'}
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ld-text-muted)', whiteSpace: 'nowrap' }}>
                    {doc.clientCode || '—'}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>{doc.clientName || '—'}</td>
                  <td style={{ fontSize: 12 }}>{doc.companyName || '—'}</td>
                  <td style={{ fontSize: 12 }}>
                    {doc.assignedAdmin ? (
                      <div>
                        <div style={{ fontWeight: 600 }}>{doc.assignedAdmin.name}</div>
                        {doc.assignedAdmin.adminCode && (
                          <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ld-text-muted)' }}>{doc.assignedAdmin.adminCode}</div>
                        )}
                      </div>
                    ) : (
                      <span style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>Unassigned</span>
                    )}
                  </td>
                  <td style={{ fontSize: 12 }}>{formatDocType(doc.documentType)}</td>
                  <td><KycStatusBadge status={doc.status} /></td>
                  <td style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : '—'}</td>
                  <td style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{doc.reviewedAt ? new Date(doc.reviewedAt).toLocaleDateString() : '—'}</td>
                  <td style={{ fontSize: 12 }}>{doc.reviewedBy?.name || '—'}</td>
                  <td style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : '—'}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="ld-row-actions">
                      <button
                        className="ld-btn-secondary ld-btn-sm"
                        onClick={() => goToOrder(doc, 'kyc')}
                        title="View KYC in order"
                      >
                        View
                      </button>
                      {(doc.status === 'UPLOADED' || doc.status === 'UNDER_REVIEW') && (
                        <>
                          <button
                            className="ld-btn-primary ld-btn-sm"
                            style={{ background: '#16a34a', borderColor: '#16a34a' }}
                            onClick={() => setApproveTarget(doc)}
                            title="Approve document"
                          >
                            Approve
                          </button>
                          <button
                            className="ld-btn-danger ld-btn-sm"
                            onClick={() => { setRejectTarget(doc); setRejectReason(''); }}
                            title="Reject document"
                          >
                            Reject
                          </button>
                        </>
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

      {/* ── Approve confirm modal ── */}
      <ConfirmModal
        open={!!approveTarget}
        title="Approve KYC document?"
        message={`Approve ${formatDocType(approveTarget?.documentType)} for ${approveTarget?.clientName || 'this client'}? This cannot be undone.`}
        confirmLabel={actionLoading ? 'Approving…' : 'Approve'}
        onConfirm={handleApprove}
        onCancel={() => setApproveTarget(null)}
      />

      {/* ── Reject modal ── */}
      {rejectTarget && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
          }}
          onClick={() => setRejectTarget(null)}
        >
          <div
            style={{
              background: 'var(--ld-surface)', borderRadius: 'var(--ld-radius)',
              padding: 28, width: 440, maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Reject KYC Document</h3>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--ld-text-muted)' }}>
              Rejecting <strong>{formatDocType(rejectTarget.documentType)}</strong> for <strong>{rejectTarget.clientName}</strong>.
              The client will be notified and asked to re-upload.
            </p>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Rejection reason <span style={{ color: 'var(--ld-danger)' }}>*</span>
            </label>
            <textarea
              className="ld-form-input"
              style={{ width: '100%', minHeight: 80, resize: 'vertical', fontFamily: 'inherit' }}
              placeholder="Explain why this document is being rejected…"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              maxLength={500}
              autoFocus
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
              <button className="ld-btn-secondary" onClick={() => setRejectTarget(null)} disabled={actionLoading}>
                Cancel
              </button>
              <button
                className="ld-btn-danger"
                onClick={handleReject}
                disabled={!rejectReason.trim() || actionLoading}
              >
                {actionLoading ? 'Rejecting…' : 'Reject Document'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
