import { useState, useEffect } from 'react'
import { useUserAuth } from '../context/UserAuthContext'

const STATUS_LABEL = {
  CREATED: 'Order created', PAYMENT_PENDING: 'Payment pending', PAYMENT_SUCCESSFUL: 'Payment received',
  PAYMENT_FAILED: 'Payment failed', DOCUMENTS_PENDING: 'Documents requested', DOCUMENTS_SUBMITTED: 'Documents submitted',
  DOCUMENTS_UNDER_REVIEW: 'Documents under review', DOCUMENT_CORRECTION_REQUIRED: 'Document correction requested',
  DOCUMENTS_APPROVED: 'Documents approved', ASSIGNED: 'Professional assigned', PROCESSING: 'Processing started',
  GOVERNMENT_PROCESSING: 'Filed with authority', ACTION_REQUIRED: 'Action required from you', ON_HOLD: 'Order on hold',
  COMPLETED: 'Service completed', DOCUMENTS_READY: 'Final documents ready', CANCELLED: 'Order cancelled',
  REFUND_INITIATED: 'Refund initiated', REFUNDED: 'Refund completed', CLOSED: 'Order closed',
}
const label = s => STATUS_LABEL[s] || s

export default function OrderTimeline({ orderId, createdAt, expectedBy, completedAt }) {
  const { apiFetch } = useUserAuth()
  const [rows, setRows] = useState(null)

  useEffect(() => {
    let active = true
    apiFetch(`/user/orders/${orderId}/timeline`).then(r => { if (active) setRows(r.timeline || []) }).catch(() => { if (active) setRows([]) })
    return () => { active = false }
  }, [apiFetch, orderId])

  const fmt = d => new Date(d).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const fmtTime = d => new Date(d).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })

  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EEF6', padding: '20px 24px' }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1A2F4E', marginBottom: 16 }}>Timeline</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: rows?.length ? 18 : 0 }}>
        <div style={{ display: 'flex', gap: 12, fontSize: 13 }}>
          <span style={{ color: '#64748B', width: 160, flexShrink: 0 }}>Service started</span>
          <span style={{ fontWeight: 600, color: '#1A2F4E' }}>{fmt(createdAt)}</span>
        </div>
        {expectedBy && (
          <div style={{ display: 'flex', gap: 12, fontSize: 13 }}>
            <span style={{ color: '#64748B', width: 160, flexShrink: 0 }}>Expected completion</span>
            <span style={{ fontWeight: 600, color: '#1A2F4E' }}>{fmt(expectedBy)}</span>
          </div>
        )}
        {completedAt && (
          <div style={{ display: 'flex', gap: 12, fontSize: 13 }}>
            <span style={{ color: '#64748B', width: 160, flexShrink: 0 }}>Completed on</span>
            <span style={{ fontWeight: 600, color: '#1A2F4E' }}>{fmt(completedAt)}</span>
          </div>
        )}
      </div>

      {rows === null ? (
        <p style={{ fontSize: 12.5, color: '#94A3B8' }}>Loading status history…</p>
      ) : rows.length > 0 && (
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 12 }}>Status history</div>
          <ol style={{ listStyle: 'none', position: 'relative', padding: 0, margin: 0 }}>
            <div style={{ position: 'absolute', left: 4, top: 6, bottom: 6, width: 2, background: '#E2E8F0' }} />
            {rows.map((r, i) => (
              <li key={i} style={{ display: 'flex', gap: 14, position: 'relative', marginBottom: i < rows.length - 1 ? 16 : 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1D6FE0', marginTop: 4, flexShrink: 0, zIndex: 1, boxShadow: '0 0 0 3px #fff' }} />
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1A2F4E' }}>{label(r.newStatus)}</div>
                  <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 2 }}>{fmt(r.createdAt)} · {fmtTime(r.createdAt)}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
