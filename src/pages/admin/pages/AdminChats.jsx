import { useState, useEffect, useCallback, useRef } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import {
  Card, Badge, Btn, Ic, Toolbar, SearchInput, FilterSelect, Table, Td,
  PageHeader, Modal, InfoGrid, Pagination, Spinner, EmptyState,
} from '../AdminUI'

const PER_PAGE = 15
const COLORS = ['#3B5BDB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']
const initials = n => (n || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
const fmtDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'
const fmtDateTime = d => d
  ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  : '—'
const clip = (t, n = 70) => (t && t.length > n ? t.slice(0, n) + '…' : t || '')

const LINK_FILTERS = [
  { v: 'all',   l: 'All chats' },
  { v: 'true',  l: 'Linked to a customer' },
  { v: 'false', l: 'Not linked' },
]
const CONVERT_FILTERS = [
  { v: 'all',   l: 'All outcomes' },
  { v: 'true',  l: 'Converted to lead' },
  { v: 'false', l: 'Not converted' },
]

const PAY_BADGE = { paid: 'success', created: 'neutral', failed: 'danger', refunded: 'warn' }

export default function AdminChats() {
  const { apiFetch } = useAdminAuth()

  const [rows, setRows]       = useState([])
  const [total, setTotal]     = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [page, setPage]       = useState(1)
  const [q, setQ]             = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [linked, setLinked]   = useState('all')
  const [converted, setConverted] = useState('all')

  const [open, setOpen]         = useState(null)   // session id being viewed
  const [detail, setDetail]     = useState(null)
  const [payments, setPayments] = useState([])
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError]     = useState('')
  const [deleting, setDeleting] = useState(false)
  const transcriptRef = useRef(null)

  // debounce the search box so we don't hit the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedQ(q.trim()); setPage(1) }, 350)
    return () => clearTimeout(t)
  }, [q])

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({ page, limit: PER_PAGE })
      if (debouncedQ) params.set('q', debouncedQ)
      if (linked !== 'all') params.set('linked', linked)
      if (converted !== 'all') params.set('converted', converted)
      const r = await apiFetch(`/voiceflow/sessions?${params}`)
      setRows(r.data || [])
      setTotal(r.total || 0)
    } catch (e) {
      setError(e.message || 'Could not load chats')
    } finally {
      setLoading(false)
    }
  }, [apiFetch, page, debouncedQ, linked, converted])

  useEffect(() => { load() }, [load])

  const openChat = async (id) => {
    setOpen(id)
    setDetail(null)
    setPayments([])
    setDetailError('')
    setDetailLoading(true)
    try {
      const r = await apiFetch(`/voiceflow/sessions/${id}`)
      setDetail(r.data)
      setPayments(r.payments || [])
    } catch (e) {
      setDetailError(e.message || 'Could not load this chat')
    } finally {
      setDetailLoading(false)
    }
  }

  const closeChat = () => { setOpen(null); setDetail(null); setPayments([]) }

  // scroll transcript to the latest message when it opens
  useEffect(() => {
    if (detail && transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
  }, [detail])

  const deleteChat = async () => {
    if (!detail) return
    if (!window.confirm('Delete this chat permanently? This cannot be undone.')) return
    setDeleting(true)
    try {
      await apiFetch(`/voiceflow/sessions/${detail._id}`, { method: 'DELETE' })
      closeChat()
      load()
    } catch (e) {
      setDetailError(e.message || 'Could not delete this chat')
    } finally {
      setDeleting(false)
    }
  }

  const whoName  = s => s.user?.name  || s.leadName  || 'Guest visitor'
  const whoEmail = s => s.user?.email || s.leadEmail || ''
  const whoPhone = s => s.user?.phone || s.leadMobile || ''

  const paidTotal = payments.filter(p => p.status === 'paid').reduce((a, p) => a + (p.amountRupees || 0), 0)

  return (
    <div>
      <PageHeader
        title="Chat History"
        sub={`${total} conversation${total === 1 ? '' : 's'} with Ask Sneha`}
        actions={
          <Btn variant="outline" onClick={load}>
            <Ic d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" size={14} />
            Refresh
          </Btn>
        }
      />

      <Toolbar>
        <SearchInput
          value={q}
          onChange={setQ}
          placeholder="Search name, email, phone, message text, or a payment ID (pay_…)"
        />
        <FilterSelect value={linked} onChange={v => { setLinked(v); setPage(1) }} options={LINK_FILTERS} />
        <FilterSelect value={converted} onChange={v => { setConverted(v); setPage(1) }} options={CONVERT_FILTERS} />
      </Toolbar>

      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 14 }}>
          {error}
        </div>
      )}

      <Card>
        {loading ? <Spinner /> : (
          <>
            <Table head={['Customer', 'Contact', 'Last message', 'Messages', 'Status', 'Last active', 'Actions']}>
              {rows.length === 0 ? (
                <tr><td colSpan={7}><EmptyState msg={debouncedQ ? 'No chats match your search.' : 'No chats yet. Conversations with Ask Sneha will appear here.'} icon="💬" /></td></tr>
              ) : rows.map((s, i) => (
                <tr key={s._id} style={{ cursor: 'pointer' }} onClick={() => openChat(s._id)}>
                  <Td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: COLORS[i % COLORS.length], display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                        {initials(whoName(s))}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600 }}>{whoName(s)}</div>
                        {s.user
                          ? <span style={{ fontSize: 11, color: '#16A34A', fontWeight: 600 }}>Registered customer</span>
                          : <span style={{ fontSize: 11, color: '#94A3B8' }}>Not linked to an account</span>}
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <div style={{ fontSize: 13 }}>{whoPhone(s) || '—'}</div>
                    <div style={{ fontSize: 11.5, color: '#94A3B8' }}>{whoEmail(s)}</div>
                  </Td>
                  <Td style={{ maxWidth: 260 }}>
                    {s.lastMessage ? (
                      <div style={{ fontSize: 13, color: '#475569' }}>
                        <span style={{ fontWeight: 600, color: s.lastMessage.role === 'user' ? '#3B5BDB' : '#64748B' }}>
                          {s.lastMessage.role === 'user' ? 'Customer: ' : 'Sneha: '}
                        </span>
                        {clip(s.lastMessage.content)}
                      </div>
                    ) : '—'}
                  </Td>
                  <Td><span style={{ fontWeight: 700 }}>{s.messageCount}</span></Td>
                  <Td>
                    {s.convertedToLead ? <Badge type="success">Lead created</Badge> : <Badge type="neutral">Chat only</Badge>}
                  </Td>
                  <Td style={{ color: '#94A3B8', fontSize: 12.5 }}>{fmtDateTime(s.updatedAt)}</Td>
                  <Td>
                    <Btn variant="outline" size="sm" onClick={e => { e.stopPropagation(); openChat(s._id) }}>
                      <Ic d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8|M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6" size={12} />
                      View chat
                    </Btn>
                  </Td>
                </tr>
              ))}
            </Table>
            <Pagination page={page} total={total} perPage={PER_PAGE} onChange={setPage} />
          </>
        )}
      </Card>

      {/* Conversation modal */}
      <Modal
        open={!!open}
        onClose={closeChat}
        title={detail ? `Chat with ${whoName(detail)}` : 'Chat'}
        width={760}
        footer={
          <>
            <Btn variant="outline" onClick={closeChat}>Close</Btn>
            {detail && (
              <Btn variant="danger" onClick={deleteChat} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Delete chat'}
              </Btn>
            )}
          </>
        }
      >
        {detailLoading && <Spinner />}
        {detailError && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
            {detailError}
          </div>
        )}
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InfoGrid rows={[
              ['Name', whoName(detail)],
              ['Email', whoEmail(detail)],
              ['Phone', whoPhone(detail)],
              ['Account', detail.user ? 'Registered customer' : 'Not linked'],
              ['Started', fmtDateTime(detail.createdAt)],
              ['Last active', fmtDateTime(detail.updatedAt)],
              ['Messages', String(detail.messages?.length || 0)],
              ['Chat ID', detail.voiceflowUserId],
            ]} />

            {/* Payments made by the same customer */}
            {detail.user && (
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
                  Payments by this customer
                  {payments.length > 0 && (
                    <span style={{ fontWeight: 500, color: '#64748B' }}>
                      {' '}— ₹{paidTotal.toLocaleString('en-IN')} paid
                    </span>
                  )}
                </div>
                {payments.length === 0 ? (
                  <div style={{ fontSize: 13, color: '#94A3B8', background: '#F8FAFC', borderRadius: 8, padding: '10px 14px' }}>
                    No payments yet.
                  </div>
                ) : (
                  <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden' }}>
                    {payments.map((p, i) => (
                      <div key={p._id || p.razorpayOrderId}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', fontSize: 13, borderTop: i ? '1px solid #E2E8F0' : 0, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 180 }}>
                          <div style={{ fontWeight: 600, color: '#1C2434' }}>{p.serviceTitle || 'Service payment'}</div>
                          <div style={{ fontSize: 11.5, color: '#94A3B8', wordBreak: 'break-all' }}>
                            {p.razorpayPaymentId || p.razorpayOrderId}
                          </div>
                        </div>
                        <div style={{ fontWeight: 700 }}>₹{(p.amountRupees || 0).toLocaleString('en-IN')}</div>
                        <Badge type={PAY_BADGE[p.status] || 'neutral'}>{p.status}</Badge>
                        <div style={{ fontSize: 12, color: '#94A3B8' }}>{fmtDate(p.verifiedAt || p.createdAt)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Transcript */}
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Conversation</div>
              <div ref={transcriptRef}
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 14, maxHeight: 380, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(detail.messages || []).length === 0 ? (
                  <EmptyState msg="No messages in this chat." />
                ) : detail.messages.map((m, i) => {
                  const isUser = m.role === 'user'
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', marginBottom: 3 }}>
                        {isUser ? whoName(detail) : 'Sneha (bot)'}
                      </div>
                      <div style={{
                        maxWidth: '82%', padding: '9px 13px', fontSize: 13.5, lineHeight: 1.55,
                        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                        background: isUser ? '#1D5DB8' : '#fff',
                        color: isUser ? '#fff' : '#1C2434',
                        border: isUser ? '0' : '1px solid #E2E8F0',
                        borderRadius: isUser ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                      }}>
                        {m.content}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}