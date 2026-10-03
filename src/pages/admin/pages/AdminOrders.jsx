import { useState, useEffect, useCallback, useRef } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { Card, Badge, Btn, Toolbar, SearchInput, FilterSelect, Table, Td, PageHeader, Modal, InfoGrid, Pagination, Spinner, EmptyState } from '../AdminUI'

const PER_PAGE = 20
const fmtDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'
const fmtDateTime = d => d ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'
const rs = n => typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : '—'

const STATUS_OPTIONS = [
  'CREATED', 'PAYMENT_PENDING', 'PAYMENT_SUCCESSFUL', 'PAYMENT_FAILED', 'DOCUMENTS_PENDING', 'DOCUMENTS_SUBMITTED',
  'DOCUMENTS_UNDER_REVIEW', 'DOCUMENT_CORRECTION_REQUIRED', 'DOCUMENTS_APPROVED', 'ASSIGNED', 'PROCESSING',
  'GOVERNMENT_PROCESSING', 'ACTION_REQUIRED', 'ON_HOLD', 'COMPLETED', 'DOCUMENTS_READY', 'CANCELLED',
  'REFUND_INITIATED', 'REFUNDED', 'CLOSED',
]
const STATUS_BADGE = {
  CREATED: 'neutral', PAYMENT_PENDING: 'warn', PAYMENT_SUCCESSFUL: 'success', PAYMENT_FAILED: 'danger',
  DOCUMENTS_PENDING: 'purple', DOCUMENTS_SUBMITTED: 'info', DOCUMENTS_UNDER_REVIEW: 'info',
  DOCUMENT_CORRECTION_REQUIRED: 'danger', DOCUMENTS_APPROVED: 'success', ASSIGNED: 'info', PROCESSING: 'info',
  GOVERNMENT_PROCESSING: 'info', ACTION_REQUIRED: 'warn', ON_HOLD: 'neutral', COMPLETED: 'success',
  DOCUMENTS_READY: 'success', CANCELLED: 'danger', REFUND_INITIATED: 'warn', REFUNDED: 'neutral', CLOSED: 'neutral',
}
const NOTIF_BADGE = { QUEUED: 'neutral', PROCESSING: 'info', SENT: 'success', DELIVERED: 'success', OPENED: 'success', CLICKED: 'success', FAILED: 'danger', BOUNCED: 'danger', SKIPPED: 'neutral' }
const DOC_BADGE = { PENDING: 'neutral', pending: 'neutral', UPLOADED: 'info', uploaded: 'info', UNDER_REVIEW: 'info', 'under-review': 'info', APPROVED: 'success', accepted: 'success', REJECTED: 'danger', rejected: 'danger', RESUBMISSION_REQUIRED: 'danger' }

const TABS = ['Overview', 'Documents', 'Communication', 'Events']

/* ───────────────────────── Order Detail ───────────────────────── */
function OrderDetail({ orderId, onClose, onChanged }) {
  const { apiFetch } = useAdminAuth()
  const [order, setOrder] = useState(null)
  const [tab, setTab] = useState('Overview')
  const [comms, setComms] = useState(null)
  const [events, setEvents] = useState(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const [status, setStatus] = useState('')
  const [note, setNote] = useState('')
  const [notify, setNotify] = useState(true)

  const [assignName, setAssignName] = useState('')
  const [assignDesg, setAssignDesg] = useState('')
  const [assignEmail, setAssignEmail] = useState('')
  const [assignPhone, setAssignPhone] = useState('')

  const [arWhat, setArWhat] = useState('')
  const [arWhy, setArWhy] = useState('')
  const [arHow, setArHow] = useState('')
  const [arDeadline, setArDeadline] = useState('')

  const fileRef = useRef(null)
  const [finalDocName, setFinalDocName] = useState('')

  const load = useCallback(async () => {
    const r = await apiFetch(`/admin/ops/orders/${orderId}`)
    setOrder(r.data); setStatus(r.data.status)
  }, [apiFetch, orderId])

  useEffect(() => { load() }, [load])
  useEffect(() => {
    if (tab === 'Communication' && !comms) apiFetch(`/admin/ops/orders/${orderId}/communications`).then(r => setComms(r.data))
    if (tab === 'Events' && !events) apiFetch(`/admin/ops/orders/${orderId}/events`).then(r => setEvents(r.data))
  }, [tab, apiFetch, orderId, comms, events])

  const run = async (fn, successMsg) => {
    setBusy(true); setMsg('')
    try { await fn(); setMsg(successMsg || 'Done.'); await load(); onChanged?.() }
    catch (e) { setMsg(e.message || 'Something went wrong.') }
    finally { setBusy(false) }
  }

  if (!order) return <Modal open onClose={onClose} title="Loading order…" width={880}><Spinner /></Modal>

  const updateStatus = () => run(() => apiFetch(`/admin/ops/orders/${orderId}/status`, { method: 'PATCH', body: JSON.stringify({ status, note, notify }) }), 'Status updated.')
  const assign = () => run(() => apiFetch(`/admin/ops/orders/${orderId}/assign`, { method: 'POST', body: JSON.stringify({ name: assignName, designation: assignDesg, email: assignEmail, phone: assignPhone }) }), 'Professional assigned — customer notified.')
  const sendActionRequired = () => run(() => apiFetch(`/admin/ops/orders/${orderId}/action-required`, { method: 'POST', body: JSON.stringify({ what: arWhat, why: arWhy, how: arHow, deadline: arDeadline || undefined }) }), 'Action-required email sent.')
  const requestDocs = () => run(() => apiFetch(`/admin/ops/orders/${orderId}/request-documents`, { method: 'POST', body: JSON.stringify({}) }), 'Documents requested — email sent.')
  const markDocsReady = () => run(() => apiFetch(`/admin/ops/orders/${orderId}/documents-ready`, { method: 'POST', body: JSON.stringify({}) }), 'Marked ready — customer notified.')
  const cancelOrder = () => { if (!confirm('Cancel this order?')) return; run(() => apiFetch(`/admin/ops/orders/${orderId}/cancel`, { method: 'POST', body: JSON.stringify({}) }), 'Order cancelled.') }
  const refund = () => { if (!confirm('Start a refund for this order?')) return; run(() => apiFetch(`/admin/ops/orders/${orderId}/refund`, { method: 'POST', body: JSON.stringify({}) }), 'Refund started.') }

  const reviewDoc = (docId, decision, extra = {}) => run(() => apiFetch(`/admin/ops/documents/${docId}/review`, { method: 'PATCH', body: JSON.stringify({ decision, ...extra }) }), 'Document updated — customer notified.')

  const uploadFinalDoc = async () => {
    const file = fileRef.current?.files?.[0]
    if (!file) { setMsg('Choose a file first.'); return }
    setBusy(true); setMsg('')
    try {
      const fd = new FormData(); fd.append('file', file); if (finalDocName) fd.append('name', finalDocName)
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/ops/orders/${orderId}/final-documents`, {
        method: 'POST', body: fd, headers: { Authorization: `Bearer ${localStorage.getItem('ld_admin_token')}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Upload failed')
      setMsg('Final document uploaded.'); setFinalDocName(''); if (fileRef.current) fileRef.current.value = ''
      await load()
    } catch (e) { setMsg(e.message) } finally { setBusy(false) }
  }

  const resend = (notifId) => run(() => apiFetch(`/admin/ops/notifications/${notifId}/resend`, { method: 'POST' }), 'Resend queued.')

  return (
    <Modal open onClose={onClose} width={900} title={`${order.serviceTitle} — ${order.orderNumber || order._id.slice(-6)}`}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 18, borderBottom: '1px solid #E2E8F0', paddingBottom: 2 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 14px', fontSize: 13, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            color: tab === t ? '#3B5BDB' : '#94A3B8', borderBottom: tab === t ? '2px solid #3B5BDB' : '2px solid transparent', marginBottom: -3,
          }}>{t}</button>
        ))}
      </div>

      {msg && <div style={{ marginBottom: 14, padding: '10px 14px', borderRadius: 8, background: '#EFF6FF', color: '#1D4ED8', fontSize: 12.5 }}>{msg}</div>}

      {tab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <InfoGrid rows={[
            ['Customer', order.user?.name], ['Email', order.user?.email], ['Phone', order.user?.phone || '—'],
            ['Service', order.serviceTitle], ['Order No.', order.orderNumber || '—'], ['Status', <Badge type={STATUS_BADGE[order.status] || 'neutral'}>{order.status}</Badge>],
            ['Total', rs(order.totalAmount)], ['Payment Status', order.paymentStatus], ['Created', fmtDate(order.createdAt)],
          ]} />

          <Card>
            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1C2434', marginBottom: 10 }}>Change status</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <FilterSelect value={status} onChange={setStatus} options={STATUS_OPTIONS.map(s => ({ v: s, l: s }))} />
                <input value={note} onChange={e => setNote(e.target.value)} placeholder="Internal note (optional)" style={{ flex: 1, minWidth: 180, height: 38, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontSize: 13, fontFamily: 'inherit' }} />
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#475569' }}><input type="checkbox" checked={notify} onChange={e => setNotify(e.target.checked)} />Notify customer</label>
                <Btn onClick={updateStatus} disabled={busy}>Update</Btn>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1C2434', marginBottom: 10 }}>Assign professional</div>
              <div className="adm-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                <input value={assignName} onChange={e => setAssignName(e.target.value)} placeholder="Name" style={inp} />
                <input value={assignDesg} onChange={e => setAssignDesg(e.target.value)} placeholder="Designation" style={inp} />
                <input value={assignEmail} onChange={e => setAssignEmail(e.target.value)} placeholder="Email" style={inp} />
                <input value={assignPhone} onChange={e => setAssignPhone(e.target.value)} placeholder="Phone" style={inp} />
              </div>
              <Btn onClick={assign} disabled={busy || !assignName}>Assign &amp; Notify</Btn>
              {order.assignedProfessional?.name && <span style={{ marginLeft: 10, fontSize: 12.5, color: '#64748B' }}>Currently: {order.assignedProfessional.name}</span>}
            </div>
          </Card>

          <Card>
            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1C2434', marginBottom: 10 }}>Request action from customer</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
                <input value={arWhat} onChange={e => setArWhat(e.target.value)} placeholder="What do they need to do?" style={inp} />
                <input value={arWhy} onChange={e => setArWhy(e.target.value)} placeholder="Why is it needed?" style={inp} />
                <input value={arHow} onChange={e => setArHow(e.target.value)} placeholder="How should they do it?" style={inp} />
                <input type="date" value={arDeadline} onChange={e => setArDeadline(e.target.value)} style={{ ...inp, maxWidth: 180 }} />
              </div>
              <Btn onClick={sendActionRequired} disabled={busy || !arWhat || !arWhy || !arHow}>Send Action Required</Btn>
            </div>
          </Card>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Btn variant="outline" onClick={requestDocs} disabled={busy}>Request Documents</Btn>
            <Btn variant="outline" onClick={markDocsReady} disabled={busy}>Mark Documents Ready</Btn>
            <Btn variant="danger" onClick={cancelOrder} disabled={busy}>Cancel Order</Btn>
            <Btn variant="danger" onClick={refund} disabled={busy}>Refund</Btn>
          </div>
        </div>
      )}

      {tab === 'Documents' && (
        <div>
          {(!order.documents || order.documents.length === 0) ? <EmptyState msg="No documents requested yet." icon="📄" /> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {order.documents.filter(d => d.type !== 'output').map(d => (
                <DocReviewRow key={d._id} doc={d} onReview={reviewDoc} busy={busy} />
              ))}
            </div>
          )}
          <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1C2434', marginBottom: 10 }}>Upload final document</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <input ref={fileRef} type="file" style={{ fontSize: 12.5 }} />
              <input value={finalDocName} onChange={e => setFinalDocName(e.target.value)} placeholder="Document name (optional)" style={inp} />
              <Btn onClick={uploadFinalDoc} disabled={busy}>Upload</Btn>
            </div>
            {order.documents.filter(d => d.type === 'output').length > 0 && (
              <div style={{ marginTop: 12, fontSize: 12.5, color: '#64748B' }}>
                Uploaded: {order.documents.filter(d => d.type === 'output').map(d => d.filename || d.name).join(', ')}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'Communication' && (
        comms === null ? <Spinner /> : comms.length === 0 ? <EmptyState msg="No emails sent for this order yet." icon="✉️" /> : (
          <Table head={['Template', 'Event', 'Status', 'Sent', 'Attempts', '']}>
            {comms.map(c => (
              <tr key={c._id}>
                <Td>{c.templateName}</Td>
                <Td style={{ color: '#64748B' }}>{c.eventType}</Td>
                <Td><Badge type={NOTIF_BADGE[c.status] || 'neutral'}>{c.status}</Badge></Td>
                <Td style={{ color: '#64748B' }}>{fmtDateTime(c.sentAt || c.createdAt)}</Td>
                <Td style={{ color: '#64748B' }}>{c.attemptCount}{c.failureReason ? ` · ${c.failureReason}` : ''}</Td>
                <Td>{c.status === 'FAILED' && <Btn size="sm" variant="outline" onClick={() => resend(c._id)} disabled={busy}>Resend</Btn>}</Td>
              </tr>
            ))}
          </Table>
        )
      )}

      {tab === 'Events' && (
        events === null ? <Spinner /> : events.length === 0 ? <EmptyState msg="No events logged yet." icon="📜" /> : (
          <Table head={['Event', 'Status change', 'By', 'When']}>
            {events.map(e => (
              <tr key={e._id}>
                <Td>{e.eventType}</Td>
                <Td style={{ color: '#64748B' }}>{e.previousStatus ? `${e.previousStatus} → ${e.newStatus}` : (e.newStatus || '—')}</Td>
                <Td style={{ color: '#64748B' }}>{e.triggeredBy}</Td>
                <Td style={{ color: '#64748B' }}>{fmtDateTime(e.createdAt)}</Td>
              </tr>
            ))}
          </Table>
        )
      )}
    </Modal>
  )
}

const inp = { height: 38, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontSize: 13, fontFamily: 'inherit' }

function DocReviewRow({ doc, onReview, busy }) {
  const [showReject, setShowReject] = useState(false)
  const [reason, setReason] = useState('')
  const [correction, setCorrection] = useState('')

  return (
    <Card>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1C2434' }}>{doc.name}</div>
            {doc.filename && <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>📎 {doc.filename}</div>}
          </div>
          <Badge type={DOC_BADGE[doc.status] || 'neutral'}>{doc.status}</Badge>
        </div>
        {['UPLOADED', 'uploaded', 'UNDER_REVIEW', 'under-review'].includes(doc.status) && (
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Btn size="sm" variant="success" onClick={() => onReview(doc._id, 'approve')} disabled={busy}>Approve</Btn>
            <Btn size="sm" variant="outline" onClick={() => onReview(doc._id, 'review')} disabled={busy}>Mark Under Review</Btn>
            <Btn size="sm" variant="danger" onClick={() => setShowReject(s => !s)} disabled={busy}>Reject / Request Correction</Btn>
          </div>
        )}
        {showReject && (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason (shown to customer)" style={inp} />
            <input value={correction} onChange={e => setCorrection(e.target.value)} placeholder="What they need to fix" style={inp} />
            <Btn size="sm" variant="danger" onClick={() => { onReview(doc._id, 'reject', { reason, correction }); setShowReject(false) }} disabled={busy || !reason || !correction} style={{ alignSelf: 'flex-start' }}>Send Correction Request</Btn>
          </div>
        )}
      </div>
    </Card>
  )
}

/* ───────────────────────── Orders list ───────────────────────── */
export default function AdminOrders() {
  const { apiFetch } = useAdminAuth()
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('all')
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [openId, setOpenId] = useState(null)

  useEffect(() => { const t = setTimeout(() => { setDebouncedQ(q.trim()); setPage(1) }, 350); return () => clearTimeout(t) }, [q])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: PER_PAGE })
      if (status !== 'all') params.set('status', status)
      if (debouncedQ) params.set('q', debouncedQ)
      const r = await apiFetch(`/admin/ops/orders?${params}`)
      setRows(r.data || []); setTotal(r.total || 0)
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }, [apiFetch, page, status, debouncedQ])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <PageHeader title="Orders" sub="Every service order, its status, documents and email history" />
      <Toolbar>
        <SearchInput value={q} onChange={setQ} placeholder="Search order number or service…" />
        <FilterSelect value={status} onChange={v => { setStatus(v); setPage(1) }} options={[{ v: 'all', l: 'All statuses' }, ...STATUS_OPTIONS.map(s => ({ v: s, l: s }))]} />
      </Toolbar>
      <Card>
        {loading ? <Spinner /> : rows.length === 0 ? <EmptyState msg="No orders found." icon="📋" /> : (
          <Table head={['Order', 'Customer', 'Service', 'Status', 'Amount', 'Created', '']}>
            {rows.map(o => (
              <tr key={o._id}>
                <Td>{o.orderNumber || o._id.slice(-6)}</Td>
                <Td>{o.user?.name}<div style={{ fontSize: 11.5, color: '#94A3B8' }}>{o.user?.email}</div></Td>
                <Td>{o.serviceTitle}</Td>
                <Td><Badge type={STATUS_BADGE[o.status] || 'neutral'}>{o.status}</Badge></Td>
                <Td>{rs(o.totalAmount)}</Td>
                <Td style={{ color: '#64748B' }}>{fmtDate(o.createdAt)}</Td>
                <Td><Btn size="sm" variant="outline" onClick={() => setOpenId(o._id)}>View</Btn></Td>
              </tr>
            ))}
          </Table>
        )}
        <Pagination page={page} total={total} perPage={PER_PAGE} onChange={setPage} />
      </Card>
      {openId && <OrderDetail orderId={openId} onClose={() => setOpenId(null)} onChanged={load} />}
    </div>
  )
}
