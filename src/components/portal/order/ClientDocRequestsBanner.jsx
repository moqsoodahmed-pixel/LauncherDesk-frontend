import { useEffect, useState } from 'react';
import { getClientDocRequests } from '../../../services/portal/ordersApi';

export default function ClientDocRequestsBanner({ orderId }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getClientDocRequests(orderId).then(setRequests).catch(() => {});
  }, [orderId]);

  if (requests.length === 0) return null;

  return (
    <div style={{
      background: '#fffbeb',
      border: '1px solid #fde68a',
      borderRadius: 10,
      padding: '14px 16px',
    }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: '#92400e', marginBottom: 10 }}>
        📎 Action Required: Documents Requested
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {requests.map((req) => (
          <div key={req._id} style={{
            background: '#fff',
            border: '1px solid #fde68a',
            borderRadius: 8,
            padding: '10px 12px',
          }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{req.label}</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
              Type: {req.documentType?.replace(/_/g, ' ')}
            </div>
            {req.instructions && (
              <div style={{ fontSize: 12, color: '#374151', marginTop: 4 }}>{req.instructions}</div>
            )}
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 6 }}>
              Requested by {req.requestedBy?.name || 'Staff'} · {new Date(req.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, fontSize: 12, color: '#92400e' }}>
        Please upload these documents in the <strong>Documents</strong> section below.
      </div>
    </div>
  );
}
