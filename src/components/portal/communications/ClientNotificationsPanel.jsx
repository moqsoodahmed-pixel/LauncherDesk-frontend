import { useCallback, useEffect, useState } from 'react';
import { formatCommunicationEvent } from '../../../constants/portal/communicationStatus';
import { getOwnOrderCommunications } from '../../../services/portal/communicationsApi';

const CHANNEL_ICON = { EMAIL: '✉️', WHATSAPP: '💬', SMS: '📱' };

/**
 * Small, optional client-facing "Notifications sent" list embedded in
 * pages/client/OrderDetailPage.jsx, mirroring how ClientPaymentPanel.jsx is
 * embedded. Deliberately minimal (Phase 9 spec: this is optional and must
 * not become a marketing/analytics surface) - just a short list of what was
 * sent and when, using the client-safe endpoint (no recipient/provider/
 * failure diagnostics are even returned by the backend here).
 */
export default function ClientNotificationsPanel({ order }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await getOwnOrderCommunications(order.id);
      setItems(data || []);
    } catch {
      // Non-fatal and optional - just hide the section on failure.
      setItems([]);
    } finally {
      setLoaded(true);
    }
  }, [order.id]);

  useEffect(() => {
    load();
  }, [load]);

  // Only show communications that actually went out - queued/sending/failed
  // internal states aren't meaningful to a client.
  const sent = items.filter((i) => i.status === 'SENT' || i.status === 'DELIVERED');

  if (!loaded || sent.length === 0) return null;

  return (
    <div className="ld-panel">
      <div className="ld-permission-group-title">Notifications Sent</div>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {sent.map((item, idx) => (
          <li key={idx} style={{ marginBottom: 4 }}>
            <span style={{ marginRight: 6 }}>{CHANNEL_ICON[item.channel] || ''}</span>
            {formatCommunicationEvent(item.eventType)}
            {item.sentAt && (
              <span className="ld-phase-note" style={{ marginLeft: 8 }}>
                {new Date(item.sentAt).toLocaleString('en-IN')}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
