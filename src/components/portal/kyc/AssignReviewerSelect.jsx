import { useEffect, useState } from 'react';
import { getAdmins } from '../../../services/portal/adminsApi';
import { assignKycReviewer } from '../../../services/portal/kycAdminApi';

/**
 * Reuses the exact "fetch active admins into a <select>, then POST the
 * chosen id" pattern already used for assignment elsewhere in the app
 * (components/portal/client/ClientAssignmentTab.jsx assigning a Client to
 * an Admin, components/portal/order/OrderAssignmentPanel.jsx assigning an
 * Order) - same `getAdmins({ limit: 100, status: 'ACTIVE' })` call, same
 * "ACTIVE admins only" filter, same compact inline form.
 *
 * NEW (Part 5 enterprise KYC). The target endpoint
 * (`PATCH /kyc/:id/assign-reviewer`, see kycAdminApi.js) is NOT YET
 * CONFIRMED LIVE - no matching route exists in kyc.routes.js as of this
 * build - so submitting here will 404 until the parallel backend wave
 * adds it. The control is wired now so it lights up the moment it does.
 */
export default function AssignReviewerSelect({ documentId, currentReviewerId, currentReviewerName, onAssigned, onToast }) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewerId, setReviewerId] = useState(currentReviewerId ? String(currentReviewerId) : '');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const result = await getAdmins({ limit: 100, status: 'ACTIVE' });
        if (isMounted) setAdmins(result.items || []);
      } catch {
        if (isMounted) setAdmins([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  async function handleChange(e) {
    const nextId = e.target.value;
    setReviewerId(nextId);
    setSubmitting(true);
    try {
      await assignKycReviewer(documentId, nextId || null);
      onToast?.({ type: 'success', message: nextId ? 'Reviewer assigned.' : 'Reviewer unassigned.' });
      onAssigned?.();
    } catch (err) {
      onToast?.({ type: 'error', message: err.response?.data?.message || 'Could not assign reviewer (this capability may not be live yet).' });
      setReviewerId(currentReviewerId ? String(currentReviewerId) : '');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <select
      className="ld-form-input"
      style={{ fontSize: 11, padding: '3px 6px', minWidth: 120 }}
      value={reviewerId}
      onChange={handleChange}
      disabled={loading || submitting}
      title={currentReviewerName ? `Assigned to ${currentReviewerName}` : 'Unassigned'}
    >
      <option value="">{loading ? 'Loading…' : 'Unassigned'}</option>
      {admins.map((a) => (
        <option key={a.id} value={a.id}>{a.name}</option>
      ))}
    </select>
  );
}
