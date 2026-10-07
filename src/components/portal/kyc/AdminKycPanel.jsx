import { useCallback, useEffect, useState } from 'react';
import KycDocStatusBadge from './KycDocStatusBadge';
import ConfirmModal from '../ConfirmModal';
import { triggerBlobDownload } from './kycDownload';
import {
  getOrderKycSummary,
  getOrderKycDocuments,
  downloadOrderKycDocument,
  verifyOrderKycDocument,
  rejectOrderKycDocument,
  startOrderKycReview,
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
  const { hasPermission } = useAuth();
  const canView = hasPermission(PERMISSIONS.VIEW_KYC);
  const canVerify = hasPermission(PERMISSIONS.VERIFY_KYC);
  const canReject = hasPermission(PERMISSIONS.REJECT_KYC);

  const [summary, setSummary] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startingReview, setStartingReview] = useState(false);

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

  return (
    <div className="ld-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="ld-permission-group-title">KYC Documents</div>
        {canStartReview && (
          <button className="ld-btn-primary ld-btn-sm" onClick={handleStartReview} disabled={startingReview}>
            {startingReview ? 'Starting…' : 'Start Review'}
          </button>
        )}
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
