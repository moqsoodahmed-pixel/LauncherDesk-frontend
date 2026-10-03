import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import SEO from '../../components/SEO'

const STATUS_CFG = {
  OPEN:                 { label: 'Open',           color: '#1D6FE0', bg: '#EFF6FF' },
  IN_PROGRESS:          { label: 'In Progress',    color: '#D97706', bg: '#FFFBEB' },
  WAITING_ON_CUSTOMER:  { label: 'Awaiting You',   color: '#7C3AED', bg: '#F5F3FF' },
  RESOLVED:             { label: 'Resolved',       color: '#16A34A', bg: '#F0FDF4' },
  CLOSED:               { label: 'Closed',         color: '#64748B', bg: '#F1F5F9' },
}
const fmt = d => new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })

function NewTicketForm({ defaultSubject, defaultOrderId, onCreated, onCancel }) {
  const { apiFetch } = useUserAuth()
  const [subject, setSubject] = useState(defaultSubject || '')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) { setErr('Please fill in both fields.'); return }
    setSaving(true); setErr('')
    try {
      const r = await apiFetch('/user/tickets', { method: 'POST', body: JSON.stringify({ subject, message, orderId: defaultOrderId || undefined }) })
      onCreated(r.data)
    } catch (e2) { setErr(e2.message || 'Could not create the ticket.') }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EEF6', padding: 24, marginBottom: 20 }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1A2F4E', marginBottom: 16 }}>Raise a new ticket</h2>
      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Subject</label>
      <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Question about my GST filing"
        style={{ width: '100%', height: 42, borderRadius: 9, border: '1px solid #E2E8F0', padding: '0 14px', fontSize: 13.5, marginBottom: 14, outline: 'none', fontFamily: 'inherit' }} />
      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Message</label>
      <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} placeholder="Describe your question or issue…"
        style={{ width: '100%', borderRadius: 9, border: '1px solid #E2E8F0', padding: '10px 14px', fontSize: 13.5, marginBottom: 14, outline: 'none', fontFamily: 'inherit', resize: 'vertical' }} />
      {err && <p style={{ fontSize: 12.5, color: '#DC2626', marginBottom: 12 }}>{err}</p>}
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" disabled={saving} style={{ height: 40, padding: '0 20px', borderRadius: 9, border: 'none', background: '#1D6FE0', color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.7 : 1 }}>{saving ? 'Submitting…' : 'Submit Ticket'}</button>
        <button type="button" onClick={onCancel} style={{ height: 40, padding: '0 20px', borderRadius: 9, border: '1px solid #E2E8F0', background: '#fff', color: '#475569', fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}>Cancel</button>
      </div>
    </form>
  )
}

function TicketThread({ ticketId, onBack }) {
  const { apiFetch } = useUserAuth()
  const [ticket, setTicket] = useState(null)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [err, setErr] = useState('')

  const load = useCallback(() => { apiFetch(`/user/tickets/${ticketId}`).then(r => setTicket(r.data)).catch(e => setErr(e.message)) }, [apiFetch, ticketId])
  useEffect(() => { load() }, [load])

  const send = async (e) => {
    e.preventDefault()
    if (!reply.trim()) return
    setSending(true); setErr('')
    try { await apiFetch(`/user/tickets/${ticketId}/messages`, { method: 'POST', body: JSON.stringify({ message: reply }) }); setReply(''); load() }
    catch (e2) { setErr(e2.message || 'Could not send your reply.') }
    finally { setSending(false) }
  }

  if (!ticket) return <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>Loading…</div>
  const cfg = STATUS_CFG[ticket.status] || STATUS_CFG.OPEN

  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EEF6', overflow: 'hidden' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
        <div>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#1D6FE0', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit', padding: 0, marginBottom: 6 }}>← All tickets</button>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1A2F4E' }}>{ticket.subject}</h2>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>Ticket ID: {ticket.ticketId}</div>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, padding: '4px 12px', borderRadius: 99, background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
      </div>
      <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 420, overflowY: 'auto' }}>
        {ticket.messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === 'customer' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
            <div style={{
              background: m.from === 'customer' ? '#1D6FE0' : '#F1F5F9', color: m.from === 'customer' ? '#fff' : '#1A2F4E',
              borderRadius: 12, padding: '10px 14px', fontSize: 13.5, lineHeight: 1.5,
            }}>{m.body}</div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4, textAlign: m.from === 'customer' ? 'right' : 'left' }}>{m.author || (m.from === 'customer' ? 'You' : 'LauncherDesk Support')} · {fmt(m.createdAt)}</div>
          </div>
        ))}
      </div>
      {!['RESOLVED', 'CLOSED'].includes(ticket.status) ? (
        <form onSubmit={send} style={{ padding: '14px 22px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: 10 }}>
          <input value={reply} onChange={e => setReply(e.target.value)} placeholder="Type a reply…" style={{ flex: 1, height: 42, borderRadius: 9, border: '1px solid #E2E8F0', padding: '0 14px', fontSize: 13.5, outline: 'none', fontFamily: 'inherit' }} />
          <button type="submit" disabled={sending || !reply.trim()} style={{ height: 42, padding: '0 20px', borderRadius: 9, border: 'none', background: '#1D6FE0', color: '#fff', fontWeight: 700, fontSize: 13, cursor: sending ? 'default' : 'pointer', opacity: sending ? 0.7 : 1 }}>Send</button>
        </form>
      ) : (
        <div style={{ padding: '14px 22px', borderTop: '1px solid #F1F5F9', fontSize: 12.5, color: '#94A3B8', textAlign: 'center' }}>This ticket is {ticket.status.toLowerCase()}.</div>
      )}
      {err && <p style={{ fontSize: 12, color: '#DC2626', padding: '0 22px 14px' }}>{err}</p>}
    </div>
  )
}

export default function UserSupport() {
  const { apiFetch } = useUserAuth()
  const [params, setParams] = useSearchParams()
  const [tickets, setTickets] = useState(null)
  const [showNew, setShowNew] = useState(params.get('new') === '1')
  const [openTicket, setOpenTicket] = useState(null)

  const load = useCallback(() => { apiFetch('/user/tickets').then(r => setTickets(r.data || [])).catch(() => setTickets([])) }, [apiFetch])
  useEffect(() => { load() }, [load])

  const onCreated = (t) => { setShowNew(false); setParams({}); setOpenTicket(t.ticketId); load() }

  if (openTicket) return (
    <>
      <SEO title="Support Ticket" noindex={true} />
      <TicketThread ticketId={openTicket} onBack={() => { setOpenTicket(null); load() }} />
    </>
  )

  return (
    <>
      <SEO title="Support" noindex={true} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1A2F4E', letterSpacing: '-.02em', marginBottom: 4 }}>Support</h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>Raise a ticket and our team replies by email and here.</p>
        </div>
        {!showNew && (
          <button onClick={() => setShowNew(true)} style={{ height: 42, padding: '0 20px', borderRadius: 9, border: 'none', background: '#1D6FE0', color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}>+ New Ticket</button>
        )}
      </div>

      {showNew && (
        <NewTicketForm defaultSubject={params.get('subject') || ''} defaultOrderId={params.get('orderId') || ''}
          onCreated={onCreated} onCancel={() => { setShowNew(false); setParams({}) }} />
      )}

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EEF6', overflow: 'hidden' }}>
        {tickets === null ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>Loading…</div>
        ) : tickets.length === 0 ? (
          <div style={{ padding: '56px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎫</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A2F4E', marginBottom: 8 }}>No tickets yet</h3>
            <p style={{ fontSize: 14, color: '#64748B' }}>Have a question about an order or payment? Raise a ticket and we'll reply by email.</p>
          </div>
        ) : (
          tickets.map(t => {
            const cfg = STATUS_CFG[t.status] || STATUS_CFG.OPEN
            return (
              <button key={t.ticketId} onClick={() => setOpenTicket(t.ticketId)} style={{
                width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                padding: '16px 20px', borderBottom: '1px solid #F1F5F9', background: 'none', border: 'none', borderBottomWidth: 1,
                borderBottomStyle: 'solid', borderBottomColor: '#F1F5F9', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1A2F4E' }}>{t.subject}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{t.ticketId} · Updated {fmt(t.updatedAt)}</div>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: cfg.bg, color: cfg.color, flexShrink: 0 }}>{cfg.label}</span>
              </button>
            )
          })
        )}
      </div>
    </>
  )
}
