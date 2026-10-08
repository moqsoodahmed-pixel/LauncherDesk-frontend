import { useCallback, useEffect, useMemo, useState } from 'react';
import { SkeletonCards } from '../Skeleton';
import EmptyState from '../EmptyState';
import KycDocStatusBadge from './KycDocStatusBadge';
import KycUploadWidget from './KycUploadWidget';
import { getClientKycRequirements, getOwnOrderKycDocuments, uploadOwnKycDocument, downloadOwnKycDocument } from '../../../services/portal/kycApi';
import { getOrders } from '../../../services/portal/ordersApi';
import { formatDocumentType } from '../../../constants/portal/documentTypes';
import { formatBusinessType } from '../../../constants/portal/businessTypes';
import { deriveClientDisplayStatus, KYC_CLIENT_DISPLAY_STATUS } from '../../../constants/portal/kycStatus';

const KYC_RELEVANT_ORDER_STATUSES = ['KYC_PENDING', 'KYC_SUBMITTED', 'KYC_VERIFICATION', 'KYC_REJECTED', 'IN_PROGRESS', 'COMPLETED'];
const UPLOADABLE_ORDER_STATUSES = ['KYC_PENDING', 'KYC_REJECTED'];

/**
 * Task 1: the new "KYC Readiness" dashboard block, composed at the top of
 * pages/portal/client/DocumentsPage.jsx, above the existing (unchanged)
 * per-order list.
 *
 * ── Reconciliation judgment call (requirements vs. per-order documents) ──
 * GET /client/kyc/requirements resolves "which document TYPES are relevant
 * to my business profile" - a business-profile-wide concept with no order
 * attached. But every actual KycDocument row is still order-scoped
 * (uploaded against one specific order's /kyc/documents endpoint - see
 * kyc.service.js's uploadDocument/versioning), and this app has no
 * "all of my KYC documents across every order" endpoint to merge against
 * directly.
 *
 * Decision made here: pick ONE "active order" - the client's most recent
 * order that is actually in a KYC-relevant state (same status set
 * DocumentsPage.jsx already used before this change) or otherwise has a
 * requiredDocuments snapshot - and merge the business-type requirement
 * list against THAT order's real KycDocument rows. If the client has more
 * than one such order, a dropdown lets them switch which order's actual
 * uploads are shown against the (business-wide, order-independent)
 * requirement list; the progress bar and badges always describe "this
 * order, measured against your business-type checklist", and the label
 * next to the progress bar says so explicitly so it's never ambiguous
 * which of the two axes is being shown. A requirement type with no
 * document at all in the active order displays "Pending" automatically
 * (deriveClientDisplayStatus's documented fallback for `doc: undefined`).
 * The existing full per-order list stays untouched below this block for
 * anyone who wants the plain per-order view instead.
 */
export default function KycRequirementsDashboard({ onToast }) {
  const [requirements, setRequirements] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeOrderId, setActiveOrderId] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [docsLoading, setDocsLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [req, ordersResult] = await Promise.all([
        getClientKycRequirements(),
        getOrders({ limit: 100, sortBy: 'createdAt', sortDir: 'desc' }),
      ]);
      setRequirements(req);
      const qualifying = (ordersResult.items || []).filter(
        (o) => KYC_RELEVANT_ORDER_STATUSES.includes(o.status) || (o.serviceSnapshot?.requiredDocuments?.length > 0)
      );
      setOrders(qualifying);
      setActiveOrderId((prev) => prev || qualifying[0]?.id || '');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load your KYC requirements.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const loadDocuments = useCallback(async (orderId) => {
    if (!orderId) { setDocuments([]); return; }
    setDocsLoading(true);
    try {
      const docs = await getOwnOrderKycDocuments(orderId);
      setDocuments(docs || []);
    } catch {
      setDocuments([]);
    } finally {
      setDocsLoading(false);
    }
  }, []);

  useEffect(() => { loadDocuments(activeOrderId); }, [activeOrderId, loadDocuments]);

  const rows = useMemo(() => {
    if (!requirements) return [];
    const byType = new Map(documents.map((d) => [d.documentType, d]));
    return requirements.documentTypes.map((type) => {
      const doc = byType.get(type);
      return { type, label: formatDocumentType(type), doc, displayStatus: deriveClientDisplayStatus(doc) };
    });
  }, [requirements, documents]);

  const approvedCount = rows.filter((r) => r.displayStatus === KYC_CLIENT_DISPLAY_STATUS.APPROVED).length;
  const progressPct = rows.length ? Math.round((approvedCount / rows.length) * 100) : 0;

  const activeOrder = orders.find((o) => o.id === activeOrderId);
  const canUploadToActiveOrder = !!activeOrder && UPLOADABLE_ORDER_STATUSES.includes(activeOrder.status);

  if (loading) {
    return (
      <div className="ld-panel" style={{ marginBottom: 24 }}>
        <SkeletonCards count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="ld-panel" style={{ marginBottom: 24 }}>
        <p style={{ color: 'var(--ld-danger)', margin: 0 }}>{error}</p>
      </div>
    );
  }

  // No requirements resolved for this business profile (e.g. businessType
  // not set yet) - say nothing rather than render an empty checklist; the
  // existing per-order list below still works regardless.
  if (!requirements || requirements.documentTypes.length === 0) return null;

  return (
    <div className="ld-panel" style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <div>
          <div className="ld-permission-group-title">KYC Readiness</div>
          <p className="ld-phase-note" style={{ marginTop: -4 }}>
            Documents relevant to your business profile
            {requirements.businessType ? <> ({formatBusinessType(requirements.businessType)}{requirements.gstApplicable ? ', GST-registered' : ''})</> : null}.
          </p>
        </div>
        {orders.length > 1 && (
          <select className="ld-form-input" value={activeOrderId} onChange={(e) => setActiveOrderId(e.target.value)} style={{ minWidth: 240 }}>
            {orders.map((o) => (
              <option key={o.id} value={o.id}>{o.orderCode} · {o.serviceSnapshot?.name || 'Order'}</option>
            ))}
          </select>
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
          <span style={{ fontWeight: 600 }}>Overall progress</span>
          <span style={{ fontWeight: 700, color: 'var(--ld-primary)' }}>{progressPct}%</span>
        </div>
        <div style={{ height: 8, borderRadius: 999, background: 'var(--ld-border)', overflow: 'hidden' }}>
          <div style={{ width: `${progressPct}%`, height: '100%', background: progressPct === 100 ? 'var(--ld-success)' : 'var(--ld-primary)', transition: 'width 0.2s ease' }} />
        </div>
        <p className="ld-phase-note" style={{ marginTop: 6 }}>
          {approvedCount} of {rows.length} required document types approved
          {activeOrder ? <> · tracked against order <strong>{activeOrder.orderCode}</strong></> : null}.
        </p>
      </div>

      {!activeOrder && (
        <EmptyState message="You don't have an order requiring KYC yet. Place an order to start uploading documents." />
      )}

      {activeOrder && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: docsLoading ? 0.6 : 1 }}>
          {rows.map((row) => (
            <div key={row.type} style={{ border: '1px solid var(--ld-border)', borderRadius: 'var(--ld-radius)', padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 10, flexWrap: 'wrap' }}>
                <strong style={{ fontSize: 13 }}>{row.label}</strong>
                <KycDocStatusBadge displayStatus={row.displayStatus} />
              </div>
              {row.doc?.rejectionReason && (
                <p className="ld-phase-note" style={{ color: 'var(--ld-danger)', marginTop: -4, marginBottom: 8 }}>
                  {row.displayStatus === KYC_CLIENT_DISPLAY_STATUS.NEED_REUPLOAD ? 'Re-upload requested: ' : 'Rejected: '}{row.doc.rejectionReason}
                </p>
              )}
              <KycUploadWidget
                hasExisting={!!row.doc}
                existingFileName={row.doc?.originalFileName}
                disabled={!canUploadToActiveOrder || row.displayStatus === KYC_CLIENT_DISPLAY_STATUS.APPROVED}
                onUpload={(file, onProgress) => uploadOwnKycDocument(activeOrder.id, row.type, file, onProgress)}
                onDownload={row.doc ? () => downloadOwnKycDocument(activeOrder.id, row.doc.id) : undefined}
                onUploaded={() => {
                  loadDocuments(activeOrderId);
                  onToast?.({ type: 'success', message: `${row.label} uploaded.` });
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
