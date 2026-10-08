import { useCallback, useEffect, useState } from 'react';
import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';
import {
  getOwnKycComments,
  postOwnKycComment,
  getOrderKycComments,
  postOrderKycComment,
} from '../../../services/portal/kycApi';

/**
 * Threaded KYC comment panel - internal reviewer notes vs client-visible
 * replies, in one view. Reused on both sides:
 *   - Client (isClient=true): can only read/post CLIENT_VISIBLE comments,
 *     enforced here by always sending visibility: 'CLIENT_VISIBLE' and
 *     never rendering an internal/visible toggle.
 *   - Staff (isClient=false, allowInternal=true for roles permitted to see
 *     internal notes): composer gets an INTERNAL / CLIENT_VISIBLE toggle;
 *     each comment in the thread is labeled with its visibility.
 *
 * NOT YET CONFIRMED LIVE: backend/src/services/portal/kycComments.service.js
 * exists (addComment/listComments) but, as of this build, is not wired to
 * any route or controller - no `/orders/:id/kyc/comments` or
 * `/client/orders/:id/kyc/comments` route exists yet. Calls here 404 until
 * the parallel backend wave adds the route (see report).
 */
export default function KycCommentsPanel({ orderId, documentId, isClient, allowInternal, onToast }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notLiveYet, setNotLiveYet] = useState(false);
  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState('CLIENT_VISIBLE');
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = isClient
        ? await getOwnKycComments(orderId, documentId)
        : await getOrderKycComments(orderId, documentId);
      setComments(data || []);
      setNotLiveYet(false);
    } catch (err) {
      // A 404 here means the comments endpoint isn't wired on the backend
      // yet (expected during this parallel build) - show an honest empty
      // state instead of a scary error.
      if (err.response?.status === 404) setNotLiveYet(true);
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [orderId, documentId, isClient]);

  useEffect(() => { load(); }, [load]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      if (isClient) {
        await postOwnKycComment(orderId, { documentId, message: message.trim() });
      } else {
        await postOrderKycComment(orderId, { documentId, message: message.trim(), visibility });
      }
      setMessage('');
      onToast?.({ type: 'success', message: 'Comment posted.' });
      load();
    } catch (err) {
      onToast?.({ type: 'error', message: err.response?.data?.message || 'Could not post this comment (this capability may not be live yet).' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="ld-permission-group-title">Comments</div>

      {loading && <LoadingState />}

      {!loading && notLiveYet && (
        <EmptyState message="Comments aren't available yet - this capability is still being built on the backend." />
      )}

      {!loading && !notLiveYet && comments.length === 0 && (
        <EmptyState message="No comments yet." />
      )}

      {!loading && !notLiveYet && comments.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14, maxHeight: 320, overflowY: 'auto' }}>
          {comments.map((c) => (
            <div key={c.id || c._id} style={{ border: '1px solid var(--ld-border)', borderRadius: 'var(--ld-radius)', padding: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <strong style={{ fontSize: 12 }}>{c.authorName || 'Unknown'}</strong>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  {!isClient && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 999, textTransform: 'uppercase',
                      background: c.visibility === 'INTERNAL' ? '#fef3c7' : '#dcfce7',
                      color: c.visibility === 'INTERNAL' ? '#92400e' : '#15803d',
                    }}>
                      {c.visibility === 'INTERNAL' ? 'Internal' : 'Client-visible'}
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>
                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}
                  </span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 13, whiteSpace: 'pre-wrap' }}>{c.message}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <textarea
          className="ld-form-input"
          rows={3}
          maxLength={4000}
          placeholder={isClient ? 'Ask a question or add a note…' : 'Add a review note…'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {!isClient && allowInternal ? (
            <select className="ld-form-input" style={{ width: 200 }} value={visibility} onChange={(e) => setVisibility(e.target.value)}>
              <option value="CLIENT_VISIBLE">Client-visible</option>
              <option value="INTERNAL">Internal only</option>
            </select>
          ) : <span />}
          <button type="submit" className="ld-btn-primary ld-btn-sm" disabled={submitting || !message.trim()}>
            {submitting ? 'Posting…' : 'Post Comment'}
          </button>
        </div>
      </form>
    </div>
  );
}
