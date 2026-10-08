import { useCallback, useEffect, useState } from 'react';
import KycDocStatusBadge from './KycDocStatusBadge';
import ConfirmModal from '../ConfirmModal';
import KycCommentsPanel from './KycCommentsPanel';
import { triggerBlobDownload } from './kycDownload';
import {
  getOrderKycSummary,
  getOrderKycDocuments,
  downloadOrderKycDocument,
  verifyOrderKycDocument,
  rejectOrderKycDocument,
  startOrderKycReview,
  approveOrderKyc,
  rejectOrderKyc,
  forceApproveKycDocument,
} from '../../../services/portal/kycApi';
import { useAuth } from '../../../context/PortalAuthContext';
import { PERMISSIONS } from '../../../constants/portal/permissions';

function DocumentRow({ orderId, doc, canVerify, canReject, canReviewNow, onChanged, onToast, onRejectRequest }) {
  const [downloading, setDownloading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      const { blob, fileName } = await downloadOrderKycDocument(orderId, doc.documentId);
      triggerBlobDownload({ blob, fileName: fileName || doc.originalFileName });
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not download this document.' });
    } finally {
      setDownloading(false);
    }
  }

  async function handleVerify() {
    setVerifying(true);
    try {
      await verifyOrderKycDocument(orderId, doc.documentId);
      onToast({ type: 'success', message: `${doc.label} verified.` });
      onChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not verify this document.' });
    } finally {
      setVerifying(false);
    }
  }

  const canActOnThis = canReviewNow && doc.documentId && doc.status !== 'VERIFIED' && doc.status !== 'REJECTED';

  return (
    <div style={{ padding: '12px 0', borderBottom: '1px solid var(--ld-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <strong>{doc.label}</strong>
          {doc.mandatory === false && <span className="ld-phase-note" style={{ marginLeft: 6 }}>(optional)</span>}
        </div>
        <KycDocStatusBadge status={doc.status} />
      </div>

      {doc.status === 'REJECTED' && doc.rejectionReason && (
        <p className="ld-phase-note" style={{ color: 'var(--ld-danger)', marginTop: 6 }}>
          Rejected: {doc.rejectionReason}
        </p>
      )}

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8, flexWrap: 'wrap' }}>
        {doc.documentId && (
          <button className="ld-btn-secondary ld-btn-sm" onClick={handleDownload} disabled={downloading}>
            {downloading ? 'Downloading…' : 'Download'}
          </button>
        )}

        {canActOnThis && canVerify && (
          <button className="ld-btn-primary ld-btn-sm" onClick={handleVerify} disabled={verifying}>
            {verifying ? 'Verifying…' : 'Verify'}
          </button>
        )}
        {canActOnThis && canReject && (
          <button className="ld-btn-danger ld-btn-sm" onClick={() => onRejectRequest(doc)}>
            Reject
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Internal KYC review section embedded as a tab in
 * components/order/OrderDetailView.jsx (Super Admin / Admin order detail).
 */
export default function AdminKycPanel({ order, onOrderChanged, onToast }) {
  const { user, hasPermission } = useAuth();
  const canView = hasPermission(PERMISSIONS.VIEW_KYC);
  const canVerify = hasPermission(PERMISSIONS.VERIFY_KYC);
  const canReject = hasPermission(PERMISSIONS.REJECT_KYC);
  // Force-approve/force-reject are Super-Admin-only overrides (Task 3) -
  // same role-check pattern already used elsewhere (InvoiceDetailView.jsx,
  // InternalNotesPanel.jsx): `user?.role === 'SUPER_ADMIN'` from the
  // existing PortalAuthContext, not a new permission flag.
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const [summary, setSummary] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startingReview, setStartingReview] = useState(false);

  // NEW (Part 5) - order-level "complete KYC" decision modal state. One
  // shared modal drives all four actions (approve / reject / force-approve
  // / force-reject); `completeAction.kind` picks which service call runs.
  const [completeAction, setCompleteAction] = useState(null); // { kind: 'approve'|'reject'|'force-approve'|'force-reject' }
  const [completeReason, setCompleteReason] = useState('');
  const [completeSubmitting, setCompleteSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [summaryData, docsData] = await Promise.all([
        getOrderKycSummary(order.id),
        getOrderKycDocuments(order.id),
      ]);
      setSummary(summaryData);
      setDocuments(docsData);
    } catch {
      setSummary({ required: false, status: null, documents: [] });
    } finally {
      setLoading(false);
    }
  }, [order.id]);

  useEffect(() => {
    load();
  }, [load]);

  function handleChanged() {
    load();
    onOrderChanged?.();
  }

  async function handleStartReview() {
    setStartingReview(true);
    try {
      await startOrderKycReview(order.id);
      onToast({ type: 'success', message: 'KYC review started.' });
      handleChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not start review.' });
    } finally {
      setStartingReview(false);
    }
  }

  async function confirmReject() {
    if (!rejectReason.trim()) return;
    setIsSubmitting(true);
    try {
      await rejectOrderKycDocument(order.id, rejectTarget.documentId, rejectReason.trim());
      onToast({ type: 'success', message: `${rejectTarget.label} rejected.` });
      setRejectTarget(null);
      setRejectReason('');
      handleChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not reject this document.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  // NEW (Part 5) - order-level complete-KYC actions. CONFIRMED LIVE, but
  // reconciled to the real backend shape: there is no single "force-approve
  // the whole order" endpoint - the backend only exposes a PER-DOCUMENT
  // force-verify (bypassing the order.status===KYC_VERIFICATION guard on
  // that one document). "Force Approve" here is therefore a real
  // composition of confirmed-live calls: force-verify every document that
  // isn't already VERIFIED, then call the normal order-level approve (which
  // will now pass its "every document individually VERIFIED" check). If a
  // required document was never uploaded at all, approveOrderKyc still
  // correctly fails at that final step, surfaced honestly in the catch
  // block below rather than silently succeeding.
  // "Force Reject" reuses the real order-level reject endpoint directly -
  // unlike approve, reject never had an all-verified precondition to bypass,
  // so there's nothing extra to force; this button exists so a Super Admin
  // always has the option regardless of their own REJECT_KYC permission grant.
  const COMPLETE_ACTION_CONFIG = {
    approve: { label: 'Approve Complete KYC', fn: () => approveOrderKyc(order.id), needsReason: false, success: 'KYC approved for this order.' },
    reject: { label: 'Reject Complete KYC', fn: () => rejectOrderKyc(order.id, completeReason.trim()), needsReason: true, success: 'KYC rejected for this order.' },
    'force-approve': {
      label: 'Force Approve (Super Admin)',
      needsReason: true,
      success: 'KYC force-approved.',
      fn: async () => {
        const pending = rows.filter((d) => d.documentId && d.status !== 'VERIFIED');
        for (const d of pending) {
          await forceApproveKycDocument(order.id, d.documentId, completeReason.trim());
        }
        return approveOrderKyc(order.id);
      },
    },
    'force-reject': { label: 'Force Reject (Super Admin)', fn: () => rejectOrderKyc(order.id, completeReason.trim()), needsReason: true, success: 'KYC force-rejected.' },
  };

  async function confirmCompleteAction() {
    const config = COMPLETE_ACTION_CONFIG[completeAction.kind];
    if (config.needsReason && !completeReason.trim()) return;
    setCompleteSubmitting(true);
    try {
      await config.fn();
      onToast({ type: 'success', message: config.success });
      setCompleteAction(null);
      setCompleteReason('');
      handleChanged();
    } catch (err) {
      onToast({ type: 'error', message: err.response?.data?.message || 'Could not complete this action.' });
    } finally {
      setCompleteSubmitting(false);
    }
  }

  if (!canView) {
    return (
      <div className="ld-panel">
        <p style={{ margin: 0 }}>You do not have permission to view KYC documents for this order.</p>
      </div>
    );
  }

  if (loading) return null;
  if (!summary || !summary.required) {
    return (
      <div className="ld-panel">
        <p style={{ margin: 0 }}>KYC is not required for this order.</p>
      </div>
    );
  }

  const docsByType = new Map(documents.map((d) => [d.documentType, d]));
  const rows = summary.documents.map((d) => {
    const uploaded = docsByType.get(d.type);
    return { ...d, documentId: uploaded?.id, originalFileName: uploaded?.originalFileName };
  });

  const canReviewNow = order.status === 'KYC_VERIFICATION';
  const canStartReview = canVerify && order.status === 'KYC_SUBMITTED';
  const allDocsVerified = rows.every((d) => d.status === 'VERIFIED' || d.mandatory === false);
  // Normal approve/reject-complete only once every document has actually
  // been individually reviewed; Super Admin force actions bypass that and
  // are available any time the order is still mid-review.
  const canCompleteNormally = canReviewNow && allDocsVerified;
  const canForceAct = isSuperAdmin && (order.status === 'KYC_VERIFICATION' || order.status === 'KYC_SUBMITTED');

  return (
    <div className="ld-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div className="ld-permission-group-title">KYC Documents</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {canStartReview && (
            <button className="ld-btn-primary ld-btn-sm" onClick={handleStartReview} disabled={startingReview}>
              {startingReview ? 'Starting…' : 'Start Review'}
            </button>
          )}
          {canVerify && canCompleteNormally && (
            <button className="ld-btn-primary ld-btn-sm" style={{ background: '#16a34a', borderColor: '#16a34a' }} onClick={() => setCompleteAction({ kind: 'approve' })}>
              Approve Complete KYC
            </button>
          )}
          {canReject && canReviewNow && (
            <button className="ld-btn-danger ld-btn-sm" onClick={() => setCompleteAction({ kind: 'reject' })}>
              Reject Complete KYC
            </button>
          )}
          {canForceAct && (
            <>
              <button className="ld-btn-secondary ld-btn-sm" style={{ borderColor: '#16a34a', color: '#16a34a' }} onClick={() => setCompleteAction({ kind: 'force-approve' })}>
                Force Approve
              </button>
              <button className="ld-btn-secondary ld-btn-sm" style={{ borderColor: 'var(--ld-danger)', color: 'var(--ld-danger)' }} onClick={() => setCompleteAction({ kind: 'force-reject' })}>
                Force Reject
              </button>
            </>
          )}
        </div>
      </div>

      {rows.map((doc) => (
        <DocumentRow
          key={doc.type}
          orderId={order.id}
          doc={doc}
          canVerify={canVerify}
          canReject={canReject}
          canReviewNow={canReviewNow}
          onChanged={handleChanged}
          onToast={onToast}
          onRejectRequest={(d) => {
            setRejectTarget(d);
            setRejectReason('');
          }}
        />
      ))}

      <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--ld-border)' }}>
        <KycCommentsPanel orderId={order.id} isClient={false} allowInternal={canView} onToast={onToast} />
      </div>

      <ConfirmModal
        open={!!completeAction}
        title={completeAction ? COMPLETE_ACTION_CONFIG[completeAction.kind].label : ''}
        message={
          <div>
            <p style={{ marginTop: 0 }}>
              {completeAction?.kind === 'approve' && 'This moves the order out of KYC review as fully approved.'}
              {completeAction?.kind === 'reject' && 'The client will be asked to re-upload. Please explain why.'}
              {completeAction?.kind === 'force-approve' && 'Super Admin override: approves this order\'s KYC even if not every document has been individually verified yet.'}
              {completeAction?.kind === 'force-reject' && 'Super Admin override: rejects this order\'s KYC outright. Please explain why.'}
            </p>
            {completeAction && COMPLETE_ACTION_CONFIG[completeAction.kind].needsReason && (
              <textarea
                className="ld-form-input"
                rows={3}
                placeholder="Reason (required)"
                value={completeReason}
                onChange={(e) => setCompleteReason(e.target.value)}
              />
            )}
          </div>
        }
        confirmLabel={completeAction ? COMPLETE_ACTION_CONFIG[completeAction.kind].label : 'Confirm'}
        danger={completeAction?.kind === 'reject' || completeAction?.kind === 'force-reject'}
        isSubmitting={completeSubmitting || (completeAction && COMPLETE_ACTION_CONFIG[completeAction.kind].needsReason && !completeReason.trim())}
        onConfirm={confirmCompleteAction}
        onCancel={() => { setCompleteAction(null); setCompleteReason(''); }}
      />

      <ConfirmModal
        open={!!rejectTarget}
        title={`Reject ${rejectTarget?.label || 'this document'}?`}
        message={
          <div>
            <p style={{ marginTop: 0 }}>The client will be asked to re-upload this document. Please explain why.</p>
            <textarea
              className="ld-form-input"
              rows={3}
              placeholder="Rejection reason (required)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
        }
        confirmLabel="Reject Document"
        danger
        isSubmitting={isSubmitting || !rejectReason.trim()}
        onConfirm={confirmReject}
        onCancel={() => {
          setRejectTarget(null);
          setRejectReason('');
        }}
      />
    </div>
  );
}
