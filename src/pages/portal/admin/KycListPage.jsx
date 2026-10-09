import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/portal/PageHeader';
import LoadingState from '../../../components/portal/LoadingState';
import ErrorState from '../../../components/portal/ErrorState';
import EmptyState from '../../../components/portal/EmptyState';
import Pagination from '../../../components/portal/Pagination';
import Toast from '../../../components/portal/Toast';
import AssignReviewerSelect from '../../../components/portal/kyc/AssignReviewerSelect';
import { listKycDocuments, getKycStats } from '../../../services/portal/kycAdminApi';
import { verifyOrderKycDocument, rejectOrderKycDocument, startOrderKycReview, bulkVerifyKycDocuments, bulkRejectKycDocuments, exportOrderKyc } from '../../../services/portal/kycApi';
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

  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [approveTarget, setApproveTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // NEW (Part 5 enterprise KYC) - bulk select + bulk approve/reject.
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkRejectOpen, setBulkRejectOpen] = useState(false);
  const [bulkRejectReason, setBulkRejectReason] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

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
  useEffect(() => { getKycStats().then(setStats).catch(() => {}); }, []);

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

  function goToOrder(doc) {
    if (doc.orderId) navigate(`/admin/orders/${doc.orderId}?tab=kyc`);
  }

  async function handleApprove() {
    if (!approveTarget) return;
    setActionLoading(true);
    try {
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
      setToast({ type: 'success', message: 'Document rejected.' });
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

  // NEW (Part 5) - bulk actions over the flat document list's checkbox
  // selection. CONFIRMED LIVE, but the real backend endpoint is ORDER-SCOPED
  // (a batch can only cover documents within a single order), not a flat
  // cross-order endpoint - so a selection spanning more than one order is
  // rejected client-side with a clear message rather than attempted.
  function toggleSelected(id) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  function toggleSelectAll() {
    const selectableIds = docs.filter((d) => d.status === 'UPLOADED' || d.status === 'UNDER_REVIEW').map((d) => d.id);
    setSelectedIds((prev) => (prev.length === selectableIds.length ? [] : selectableIds));
  }

  // Returns the common orderId for the current selection, or null if the
  // selection is empty/spans more than one order.
  function selectedOrderId() {
    const selectedDocs = docs.filter((d) => selectedIds.includes(d.id));
    const orderIds = [...new Set(selectedDocs.map((d) => d.orderId))];
    return orderIds.length === 1 ? orderIds[0] : null;
  }

  async function handleBulkApprove() {
    if (selectedIds.length === 0) return;
    const orderId = selectedOrderId();
    if (!orderId) {
      setToast({ type: 'error', message: 'Bulk approve only works within a single order - narrow your selection.' });
      return;
    }
    setBulkLoading(true);
    try {
      const result = await bulkVerifyKycDocuments(orderId, selectedIds);
      setToast({ type: 'success', message: `${result.succeeded} of ${selectedIds.length} document(s) approved.` });
      setSelectedIds([]);
      loadDocs();
      getKycStats().then(setStats).catch(() => {});
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Bulk approve failed.' });
    } finally {
      setBulkLoading(false);
    }
  }

  async function handleBulkReject() {
    if (!bulkRejectReason.trim()) return;
    const orderId = selectedOrderId();
    if (!orderId) {
      setToast({ type: 'error', message: 'Bulk reject only works within a single order - narrow your selection.' });
      return;
    }
    setBulkLoading(true);
    try {
      const result = await bulkRejectKycDocuments(orderId, selectedIds, bulkRejectReason.trim());
      setToast({ type: 'success', message: `${result.succeeded} of ${selectedIds.length} document(s) rejected.` });
      setSelectedIds([]);
      setBulkRejectOpen(false);
      setBulkRejectReason('');
      loadDocs();
      getKycStats().then(setStats).catch(() => {});
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Bulk reject failed.' });
    } finally {
      setBulkLoading(false);
    }
  }

  function handleExportCsv() {
    exportToCsv('kyc_documents', docs, [
      { label: 'KYC ID', value: (r) => r.kycCode || '' },
      { label: 'Client ID', value: (r) => r.clientCode || '' },
      { label: 'Client Name', value: (r) => r.clientName || '' },
      { label: 'Document Type', value: (r) => r.documentType || '' },
      { label: 'Status', value: (r) => r.status || '' },
      { label: 'Submitted', value: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '') },
    ]);
  }

  // CONFIRMED LIVE, but the real backend export is order-scoped (or
  // client-scoped via kycAdminApi.js's exportClientKyc) - there is no global
  // "export every filtered row" endpoint, so this button exports the
  // single order of the current selection, same single-order rule as bulk
  // approve/reject above.
  async function handleExportZip() {
    const orderId = selectedOrderId();
    if (!orderId) {
      setToast({ type: 'error', message: 'Select document(s) from a single order to export a ZIP.' });
      return;
    }
    setExporting(true);
    try {
      const blob = await exportOrderKyc(orderId, 'zip');
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kyc_documents_${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Export failed.' });
    } finally {
      setExporting(false);
    }
  }

  const hasFilter = search || status || documentType || dateFrom || dateTo;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <PageHeader title="KYC Management" subtitle="Review and verify KYC documents for your assigned clients." />
        <div style={{ display: 'flex', gap: 8, marginTop: 4, flexShrink: 0 }}>
          <button className="ld-btn-secondary ld-btn-sm" onClick={handleExportCsv}>↓ CSV</button>
          <button className="ld-btn-secondary ld-btn-sm" onClick={handleExportZip} disabled={exporting} title="Bundles the selected single order's KYC documents into a ZIP">
            {exporting ? 'Exporting…' : '↓ ZIP'}
          </button>
        </div>
      </div>

      {/* Summary strip - the last two tiles consume additive fields the
          brief says the extended GET /kyc/stats response will add; they
          render '—' gracefully until that field exists. */}
      {stats && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {[
            { label: 'Total', value: stats.total, color: '#6b7280' },
            { label: 'Pending', value: stats.uploaded, color: '#d97706' },
            { label: 'Under Review', value: stats.underReview, color: '#1d4ed8' },
            { label: 'Verified', value: stats.verified, color: '#15803d' },
            { label: 'Rejected', value: stats.rejected, color: '#b91c1c' },
            { label: 'Avg. Review Time', value: stats.avgVerificationTime, color: '#374151' },
            { label: 'Unassigned', value: stats.unassigned, color: '#0891b2' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              background: 'var(--ld-surface)', border: '1px solid var(--ld-border)',
              borderRadius: 'var(--ld-radius)', padding: '12px 20px', minWidth: 100,
              borderTop: `3px solid ${color}`,
            }}>
              <div style={{ fontSize: 11, color: 'var(--ld-text-muted)', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color }}>{value ?? '—'}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="ld-toolbar" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
          <input
            className="ld-form-input"
            placeholder="Search KYC ID, client, order…"
            value={search}
            onChange={handleSearchChange}
            style={{ width: 250 }}
          />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All statuses</option>
            {ALL_STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
          </select>
          <select value={documentType} onChange={(e) => { setDocumentType(e.target.value); setPage(1); }}>
            <option value="">All document types</option>
            {ALL_DOCUMENT_TYPES.map((t) => <option key={t} value={t}>{formatDocType(t)}</option>)}
          </select>
          <input className="ld-form-input" type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }} style={{ width: 140 }} />
          <input className="ld-form-input" type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1); }} style={{ width: 140 }} />
          {hasFilter && <button className="ld-btn-secondary ld-btn-sm" onClick={clearFilters}>Clear</button>}
        </div>
        <div style={{ fontSize: 13, color: 'var(--ld-text-muted)', alignSelf: 'center' }}>
          {meta ? `${meta.total} document${meta.total !== 1 ? 's' : ''}` : ''}
        </div>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && docs.length === 0 && <EmptyState message="No KYC documents found." />}

      {/* NEW (Part 5) - bulk action bar, shown once at least one document is
          selected. Bulk approve/reject/export require the selection to be
          within a single order (see selectedOrderId() above) - the real
          backend endpoints are order-scoped. */}
      {selectedIds.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', marginBottom: 10, background: 'var(--ld-surface)', border: '1px solid var(--ld-border)', borderRadius: 'var(--ld-radius)' }}>
          <strong style={{ fontSize: 13 }}>{selectedIds.length} selected</strong>
          <button className="ld-btn-primary ld-btn-sm" style={{ background: '#16a34a', borderColor: '#16a34a' }} onClick={handleBulkApprove} disabled={bulkLoading}>
            {bulkLoading ? 'Working…' : 'Bulk Approve'}
          </button>
          <button className="ld-btn-danger ld-btn-sm" onClick={() => setBulkRejectOpen(true)} disabled={bulkLoading}>
            Bulk Reject
          </button>
          <button className="ld-btn-secondary ld-btn-sm" onClick={() => setSelectedIds([])}>Clear selection</button>
        </div>
      )}

      {!loading && !error && docs.length > 0 && (
        <div className="ld-table-wrap">
          <table className="ld-table">
            <thead>
              <tr>
                <th style={{ width: 28 }}>
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === docs.filter((d) => d.status === 'UPLOADED' || d.status === 'UNDER_REVIEW').length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <SortTh col="kycCode">KYC ID</SortTh>
                <th>Client ID</th>
                <SortTh col="client.name">Client Name</SortTh>
                <th>Company</th>
                <SortTh col="documentType">Document Type</SortTh>
                <SortTh col="status">Status</SortTh>
                <th>Reviewer</th>
                <SortTh col="createdAt">Submitted</SortTh>
                <SortTh col="reviewedAt">Verified Date</SortTh>
                <th>Verified By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id} style={{ cursor: 'pointer' }} onClick={() => goToOrder(doc)}>
                  <td onClick={(e) => e.stopPropagation()}>
                    {(doc.status === 'UPLOADED' || doc.status === 'UNDER_REVIEW') && (
                      <input type="checkbox" checked={selectedIds.includes(doc.id)} onChange={() => toggleSelected(doc.id)} />
                    )}
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color: 'var(--ld-primary)' }}>
                    {doc.kycCode || '—'}
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ld-text-muted)' }}>
                    {doc.clientCode || '—'}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>{doc.clientName || '—'}</td>
                  <td style={{ fontSize: 12 }}>{doc.companyName || '—'}</td>
                  <td style={{ fontSize: 12 }}>{formatDocType(doc.documentType)}</td>
                  <td><KycStatusBadge status={doc.status} /></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <AssignReviewerSelect
                      documentId={doc.id}
                      currentReviewerId={doc.assignedReviewer?.id}
                      currentReviewerName={doc.assignedReviewer?.name}
                      onAssigned={loadDocs}
                      onToast={setToast}
                    />
                  </td>
                  <td style={{ fontSize: 12 }}>{doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : '—'}</td>
                  <td style={{ fontSize: 12 }}>{doc.reviewedAt ? new Date(doc.reviewedAt).toLocaleDateString() : '—'}</td>
                  <td style={{ fontSize: 12 }}>{doc.reviewedBy?.name || '—'}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="ld-row-actions">
                      <button className="ld-btn-secondary ld-btn-sm" onClick={() => goToOrder(doc)}>
                        Review
                      </button>
                      {(doc.status === 'UPLOADED' || doc.status === 'UNDER_REVIEW') && (
                        <>
                          <button
                            className="ld-btn-primary ld-btn-sm"
                            style={{ background: '#16a34a', borderColor: '#16a34a' }}
                            onClick={() => setApproveTarget(doc)}
                          >
                            Approve
                          </button>
                          <button
                            className="ld-btn-danger ld-btn-sm"
                            onClick={() => { setRejectTarget(doc); setRejectReason(''); }}
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

      {/* Bulk reject modal */}
      {bulkRejectOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }} onClick={() => setBulkRejectOpen(false)}>
          <div style={{ background: 'var(--ld-surface)', borderRadius: 'var(--ld-radius)', padding: 28, width: 440, maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Bulk Reject {selectedIds.length} Document(s)</h3>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', margin: '12px 0 6px' }}>
              Rejection reason <span style={{ color: 'var(--ld-danger)' }}>*</span>
            </label>
            <textarea
              className="ld-form-input"
              style={{ width: '100%', minHeight: 80, resize: 'vertical', fontFamily: 'inherit' }}
              placeholder="Applied to every selected document…"
              value={bulkRejectReason}
              onChange={(e) => setBulkRejectReason(e.target.value)}
              autoFocus
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
              <button className="ld-btn-secondary" onClick={() => setBulkRejectOpen(false)} disabled={bulkLoading}>Cancel</button>
              <button className="ld-btn-danger" onClick={handleBulkReject} disabled={!bulkRejectReason.trim() || bulkLoading}>
                {bulkLoading ? 'Rejecting…' : 'Reject All'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve confirm */}
      {approveTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }} onClick={() => setApproveTarget(null)}>
          <div style={{ background: 'var(--ld-surface)', borderRadius: 'var(--ld-radius)', padding: 28, width: 380, maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Approve KYC Document?</h3>
            <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--ld-text-muted)' }}>
              Approve <strong>{formatDocType(approveTarget.documentType)}</strong> for <strong>{approveTarget.clientName}</strong>?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="ld-btn-secondary" onClick={() => setApproveTarget(null)} disabled={actionLoading}>Cancel</button>
              <button className="ld-btn-primary" style={{ background: '#16a34a', borderColor: '#16a34a' }} onClick={handleApprove} disabled={actionLoading}>
                {actionLoading ? 'Approving…' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject modal */}
      {rejectTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }} onClick={() => setRejectTarget(null)}>
          <div style={{ background: 'var(--ld-surface)', borderRadius: 'var(--ld-radius)', padding: 28, width: 440, maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Reject KYC Document</h3>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--ld-text-muted)' }}>
              Rejecting <strong>{formatDocType(rejectTarget.documentType)}</strong> for <strong>{rejectTarget.clientName}</strong>.
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
              <button className="ld-btn-secondary" onClick={() => setRejectTarget(null)} disabled={actionLoading}>Cancel</button>
              <button className="ld-btn-danger" onClick={handleReject} disabled={!rejectReason.trim() || actionLoading}>
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
