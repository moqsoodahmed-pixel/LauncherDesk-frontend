import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { Card, Badge, Btn, Toolbar, FilterSelect, Table, Td, PageHeader, Modal, Pagination, Spinner, EmptyState } from '../AdminUI'

const PER_PAGE = 20
const fmtDateTime = d => d ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'
const STATUS_BADGE = { OPEN: 'primary', IN_PROGRESS: 'warn', WAITING_ON_CUSTOMER: 'purple', RESOLVED: 'success', CLOSED: 'neutral' }
const STATUS_OPTIONS = ['all', 'OPEN', 'IN_PROGRESS', 'WAITING_ON_CUSTOMER', 'RESOLVED', 'CLOSED']

function TicketModal({ ticketId, onClose, onChanged }) {
  const { apiFetch } = useAdminAuth()
  const [t, setT] = useState(null)
  const [reply, setReply] = useState('')
  const [internal, setInternal] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')

  const load = useCallback(() => apiFetch(`/admin/ops/tickets/${ticketId}`).then(r => { setT(r.data); setStatus(r.data.status) }), [apiFetch, ticketId])
  useEffect(() => { load() }, [load])

  const send = async () => {
    if (!reply.trim()) return
    setSending(true)
    try { await apiFetch(`/admin/ops/tickets/${ticketId}/reply`, { method: 'POST', body: JSON.stringify({ message: reply, internal }) }); setReply(''); await load(); onChanged?.() }
    finally { setSending(false) }
  }

  const changeStatus = async (v) => {
    setStatus(v)
    await apiFetch(`/admin/ops/tickets/${ticketId}/status`, { method: 'PATCH', body: JSON.stringify({ status: v }) })
    await load(); onChanged?.()
  }

  if (!t) return <Modal open onClose={onClose} title="Loading…" width={700}><Spinner /></Modal>

  return (
    <Modal open onClose={onClose} width={700} title={t.subject}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ fontSize: 12.5, color: '#64748B' }}>{t.ticketId} · {t.customer?.name} ({t.customer?.email})</div>
        <FilterSelect value={status} onChange={changeStatus} options={['OPEN', 'IN_PROGRESS', 'WAITING_ON_CUSTOMER', 'RESOLVED', 'CLOSED'].map(s => ({ v: s, l: s }))} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 360, overflowY: 'auto', marginBottom: 16 }}>
        {t.messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === 'support' ? 'flex-end' : 'flex-start', maxWidth: '82%' }}>
            <div style={{
              background: m.internal ? '#FFFBEB' : m.from === 'support' ? '#3B5BDB' : '#F1F5F9',
              color: m.internal ? '#92400E' : m.from === 'support' ? '#fff' : '#1C2434',
              border: m.internal ? '1px dashed #FDE68A' : 'none',
              borderRadius: 10, padding: '9px 13px', fontSize: 13, lineHeight: 1.5,
            }}>{m.internal && <strong style={{ display: 'block', fontSize: 10.5, marginBottom: 2 }}>INTERNAL NOTE</strong>}{m.body}</div>
            <div style={{ fontSize: 10.5, color: '#94A3B8', marginTop: 3, textAlign: m.from === 'support' ? 'right' : 'left' }}>{m.author} · {fmtDateTime(m.createdAt)}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <textarea value={reply} onChange={e => setReply(e.target.value)} rows={3} placeholder="Reply to customer, or check 'internal note' to leave a private note…"
          style={{ width: '100%', borderRadius: 9, border: '1px solid #E2E8F0', padding: 10, fontSize: 13, fontFamily: 'inherit', resize: 'vertical' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#64748B' }}>
            <input type="checkbox" checked={internal} onChange={e => setInternal(e.target.checked)} />Internal note (never emailed to customer)
          </label>
          <Btn onClick={send} disabled={sending || !reply.trim()}>{sending ? 'Sending…' : internal ? 'Add Note' : 'Send Reply'}</Btn>
        </div>
      </div>
    </Modal>
  )
}

export default function AdminTickets() {
  const { apiFetch } = useAdminAuth()
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('all')
  const [openId, setOpenId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: PER_PAGE })
      if (status !== 'all') params.set('status', status)
      const r = await apiFetch(`/admin/ops/tickets?${params}`)
      setRows(r.data || []); setTotal(r.total || 0)
    } finally { setLoading(false) }
  }, [apiFetch, page, status])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <PageHeader title="Support Tickets" sub="Customer tickets — reply, add internal notes, change status" />
      <Toolbar>
        <FilterSelect value={status} onChange={v => { setStatus(v); setPage(1) }} options={STATUS_OPTIONS.map(s => ({ v: s, l: s === 'all' ? 'All statuses' : s }))} />
      </Toolbar>
      <Card>
        {loading ? <Spinner /> : rows.length === 0 ? <EmptyState msg="No tickets found." icon="🎫" /> : (
          <Table head={['Ticket', 'Subject', 'Customer', 'Status', 'Updated', '']}>
            {rows.map(t => (
              <tr key={t.ticketId}>
                <Td style={{ fontFamily: 'monospace', fontSize: 12 }}>{t.ticketId}</Td>
                <Td>{t.subject}</Td>
                <Td>{t.customer?.name}<div style={{ fontSize: 11.5, color: '#94A3B8' }}>{t.customer?.email}</div></Td>
                <Td><Badge type={STATUS_BADGE[t.status] || 'neutral'}>{t.status}</Badge></Td>
                <Td style={{ color: '#64748B' }}>{fmtDateTime(t.updatedAt)}</Td>
                <Td><Btn size="sm" variant="outline" onClick={() => setOpenId(t.ticketId)}>Open</Btn></Td>
              </tr>
            ))}
          </Table>
        )}
        <Pagination page={page} total={total} perPage={PER_PAGE} onChange={setPage} />
      </Card>
      {openId && <TicketModal ticketId={openId} onClose={() => setOpenId(null)} onChanged={load} />}
    </div>
  )
}
