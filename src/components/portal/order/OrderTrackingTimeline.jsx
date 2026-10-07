import { useCallback, useEffect, useState } from 'react';
import LoadingState from '../LoadingState';
import { ORDER_TRACKING_SEQUENCE, formatOrderStatus } from '../../../constants/portal/orderStatus';
import { getOwnOrderStatusHistory } from '../../../services/portal/clientOrdersApi';

/**
 * Client-facing visual timeline. Unlike the internal OrderStatusTimeline
 * (a simple chronological log for staff), this always reflects the full
 * expected sequence and highlights where the order actually is right now -
 * never hardcoded, always driven by the order's current status and its
 * real status-history dates.
 */
export default function OrderTrackingTimeline({ orderId, currentStatus }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getOwnOrderStatusHistory(orderId);
      setHistory(result.items);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingState />;

  const reachedAt = Object.fromEntries(history.map((h) => [h.status, h.createdAt]));
  const currentIndex = ORDER_TRACKING_SEQUENCE.indexOf(currentStatus);

  // CANCELLED / KYC_REJECTED fall outside the fixed "happy path" spine -
  // show them as a standalone banner instead of forcing them into it.
  if (currentStatus === 'CANCELLED' || currentStatus === 'KYC_REJECTED') {
    const reachedEntry = history.find((h) => h.status === currentStatus);
    return (
      <div className="ld-panel" style={{ borderLeft: '4px solid var(--ld-danger)' }}>
        <strong>{formatOrderStatus(currentStatus)}</strong>
        {reachedEntry && <div className="ld-phase-note">{new Date(reachedEntry.createdAt).toLocaleString()}</div>}
      </div>
    );
  }

  return (
    <div className="ld-panel">
      {ORDER_TRACKING_SEQUENCE.map((status, index) => {
        const done = reachedAt[status] !== undefined;
        const isCurrent = index === currentIndex;
        const isFuture = currentIndex >= 0 ? index > currentIndex : !done;

        return (
          <div key={status} style={{ display: 'flex', gap: 10, marginBottom: index === ORDER_TRACKING_SEQUENCE.length - 1 ? 0 : 10 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                marginTop: 2,
                flexShrink: 0,
                background: done ? 'var(--ld-success)' : isCurrent ? 'var(--ld-primary)' : 'var(--ld-border)',
              }}
            />
            <div>
              <div style={{ fontWeight: isCurrent ? 700 : 600, fontSize: 13, color: isFuture && !isCurrent ? 'var(--ld-text-muted)' : 'inherit' }}>
                {formatOrderStatus(status)}
                {isCurrent && !done && ' (current)'}
              </div>
              {reachedAt[status] && <div className="ld-phase-note">{new Date(reachedAt[status]).toLocaleString()}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
