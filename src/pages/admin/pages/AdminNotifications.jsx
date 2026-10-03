import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { Card, Badge, Btn, Toolbar, FilterSelect, Table, Td, PageHeader, Modal, Pagination, Spinner, EmptyState } from '../AdminUI'

const PER_PAGE = 25
const fmtDateTime = d => d ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'
const NOTIF_BADGE = { QUEUED: 'neutral', PROCESSING: 'info', SENT: 'success', DELIVERED: 'success', OPENED: 'success', CLICKED: 'success', FAILED: 'danger', BOUNCED: 'danger', SKIPPED: 'neutral' }
const STATUS_OPTIONS = ['all', 'QUEUED', 'PROCESSING', 'SENT', 'DELIVERED', 'OPENED', 'CLICKED', 'FAILED', 'BOUNCED', 'SKIPPED']
const SUB_TABS = ['Email Log', 'Templates', 'Settings']

/* ───────────────────────── Email Log ───────────────────────── */
function EmailLogTab() {
  const { apiFetch } = useAdminAuth()
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('all')
  const [resendingId, setResendingId] = useState(null)
  const [detail, setDetail] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: PER_PAGE })
      if (status !== 'all') params.set('status', status)
      const r = await apiFetch(`/admin/ops/notifications?${params}`)
      setRows(r.data || []); setTotal(r.total || 0)
    } finally { setLoading(false) }
  }, [apiFetch, page, status])

  useEffect(() => { load() }, [load])

  const resend = async (id) => {
    setResendingId(id)
    try { await apiFetch(`/admin/ops/notifications/${id}/resend`, { method: 'POST' }); await load() }
    finally { setResendingId(null) }
  }

  const openDetail = async (id) => { const r = await apiFetch(`/admin/ops/notifications/${id}`); setDetail(r.data) }

  return (
    <div>
      <Toolbar>
        <FilterSelect value={status} onChange={v => { setStatus(v); setPage(1) }} options={STATUS_OPTIONS.map(s => ({ v: s, l: s === 'all' ? 'All statuses' : s }))} />
      </Toolbar>
      <Card>
        {loading ? <Spinner /> : rows.length === 0 ? <EmptyState msg="No notifications found." icon="✉️" /> : (
          <Table head={['Order', 'Template', 'Recipient', 'Status', 'Attempts', 'Sent / Failed', '']}>
            {rows.map(n => (
              <tr key={n._id}>
                <Td>{n.orderNumber || '—'}</Td>
                <Td style={{ cursor: 'pointer', color: '#3B5BDB' }} onClick={() => openDetail(n._id)}>{n.templateId}</Td>
                <Td style={{ color: '#64748B' }}>{n.recipientEmail}</Td>
                <Td><Badge type={NOTIF_BADGE[n.status] || 'neutral'}>{n.status}</Badge></Td>
                <Td style={{ color: '#64748B' }}>{n.attemptCount}</Td>
                <Td style={{ color: '#64748B', fontSize: 12 }}>{fmtDateTime(n.sentAt || n.failedAt || n.createdAt)}{n.failureReason ? ` · ${n.failureReason}` : ''}</Td>
                <Td>{n.status === 'FAILED' && <Btn size="sm" variant="outline" onClick={() => resend(n._id)} disabled={resendingId === n._id}>{resendingId === n._id ? 'Resending…' : 'Resend'}</Btn>}</Td>
              </tr>
            ))}
          </Table>
        )}
        <Pagination page={page} total={total} perPage={PER_PAGE} onChange={setPage} />
      </Card>

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.templateId} width={720}>
        {detail && (
          <div>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 10 }}><strong>Subject:</strong> {detail.subject}</div>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}><strong>To:</strong> {detail.recipientEmail} &nbsp;·&nbsp; <strong>Status:</strong> {detail.status}</div>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
              <iframe title="email preview" srcDoc={detail.html || '<p style="font-family:sans-serif;color:#94A3B8;padding:20px">No HTML stored for this notification.</p>'} style={{ width: '100%', height: 420, border: 'none' }} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

/* ───────────────────────── Templates ───────────────────────── */
function TemplatesTab() {
  const { apiFetch } = useAdminAuth()
  const [templates, setTemplates] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ subject: '', html: '', ctaLabel: '', active: true })
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(null)
  const [err, setErr] = useState('')

  const load = useCallback(() => { apiFetch('/admin/ops/email-templates').then(r => setTemplates(r.data)) }, [apiFetch])
  useEffect(() => { load() }, [load])

  const openEdit = (t) => { setEditing(t); setForm({ subject: t.subject, html: t.html, ctaLabel: t.ctaLabel || '', active: t.active }); setErr('') }

  const save = async () => {
    setSaving(true); setErr('')
    try { await apiFetch(`/admin/ops/email-templates/${editing.templateId}`, { method: 'PUT', body: JSON.stringify(form) }); setEditing(null); load() }
    catch (e) { setErr(e.message || 'Could not save — this may be a system template needing super-admin access.') }
    finally { setSaving(false) }
  }

  const resetToDefault = async () => {
    if (!confirm('Reset this template to the built-in default?')) return
    try { await apiFetch(`/admin/ops/email-templates/${editing.templateId}`, { method: 'DELETE' }); setEditing(null); load() }
    catch (e) { setErr(e.message) }
  }

  const runPreview = async () => {
    try { const r = await apiFetch(`/admin/ops/email-templates/${editing.templateId}/preview`, { method: 'POST', body: JSON.stringify({ sampleData: { ...form, html: undefined } }) }); setPreview(r.data) }
    catch (e) { setErr(e.message) }
  }

  if (!templates) return <Spinner />

  return (
    <div>
      <Card>
        <Table head={['Template ID', 'Name', 'Trigger Event', 'Active', 'Customised', '']}>
          {templates.map(t => (
            <tr key={t.templateId}>
              <Td style={{ fontFamily: 'monospace', fontSize: 12 }}>{t.templateId}</Td>
              <Td>{t.name}{t.isSystem && <span style={{ marginLeft: 6, fontSize: 10, color: '#DC2626', fontWeight: 700 }}>SYSTEM</span>}</Td>
              <Td style={{ color: '#64748B', fontSize: 12 }}>{t.triggerEvent}</Td>
              <Td><Badge type={t.active ? 'success' : 'neutral'}>{t.active ? 'Active' : 'Inactive'}</Badge></Td>
              <Td>{t.customised ? <Badge type="info">Edited</Badge> : <span style={{ color: '#94A3B8', fontSize: 12 }}>Default</span>}</Td>
              <Td><Btn size="sm" variant="outline" onClick={() => openEdit(t)}>Edit</Btn></Td>
            </tr>
          ))}
        </Table>
      </Card>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={`Edit ${editing?.templateId}`} width={760}
        footer={<>
          <Btn variant="ghost" onClick={resetToDefault}>Reset to Default</Btn>
          <Btn variant="outline" onClick={runPreview}>Preview</Btn>
          <Btn onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Template'}</Btn>
        </>}>
        {editing && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {err && <div style={{ background: '#FEF2F2', color: '#DC2626', borderRadius: 8, padding: '10px 14px', fontSize: 12.5 }}>{err}</div>}
            <div>
              <label style={lbl}>Subject</label>
              <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={inp} />
            </div>
            <div>
              <label style={lbl}>CTA Button Label</label>
              <input value={form.ctaLabel} onChange={e => setForm({ ...form, ctaLabel: e.target.value })} style={inp} />
            </div>
            <div>
              <label style={lbl}>Body (HTML, supports {'{{variables}}'})</label>
              <textarea value={form.html} onChange={e => setForm({ ...form, html: e.target.value })} rows={10} style={{ ...inp, height: 'auto', fontFamily: 'monospace', fontSize: 12, padding: 12 }} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
              <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />Active
            </label>
            {preview && (
              <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                <iframe title="preview" srcDoc={preview.html} style={{ width: '100%', height: 360, border: 'none' }} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
const lbl = { display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 5 }
const inp = { width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontSize: 13, fontFamily: 'inherit' }

/* ───────────────────────── Settings ───────────────────────── */
function SettingsTab() {
  const { apiFetch } = useAdminAuth()
  const [s, setS] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => { apiFetch('/admin/ops/notification-settings').then(r => setS(r.data)) }, [apiFetch])

  if (!s) return <Spinner />

  const field = (key, label, hint) => (
    <div>
      <label style={lbl}>{label}</label>
      <input type="number" value={s[key] ?? ''} onChange={e => setS({ ...s, [key]: Number(e.target.value) })} style={inp} />
      {hint && <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{hint}</div>}
    </div>
  )

  const save = async () => {
    setSaving(true); setMsg('')
    try {
      const { otpExpiryMinutes, otpResendCooldownSeconds, otpMaxPerHour, otpMaxAttempts, orderCreatedDelayMinutes,
        reminder1AfterHours, reminder2AfterHours, reminder3AfterHours, holdAfterFinalReminderHours, feedbackDelayHours,
        statusEmailEnabled } = s
      await apiFetch('/admin/ops/notification-settings', {
        method: 'PUT', body: JSON.stringify({ otpExpiryMinutes, otpResendCooldownSeconds, otpMaxPerHour, otpMaxAttempts,
          orderCreatedDelayMinutes, reminder1AfterHours, reminder2AfterHours, reminder3AfterHours, holdAfterFinalReminderHours,
          feedbackDelayHours, statusEmailEnabled }),
      })
      setMsg('Settings saved.')
    } catch (e) { setMsg(e.message) } finally { setSaving(false) }
  }

  const toggleStatus = (key) => setS({ ...s, statusEmailEnabled: { ...s.statusEmailEnabled, [key]: !s.statusEmailEnabled?.[key] } })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Card><div style={{ padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 14 }}>Email OTP</div>
        <div className="adm-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {field('otpExpiryMinutes', 'Code expiry (minutes)')}
          {field('otpResendCooldownSeconds', 'Resend cooldown (seconds)')}
          {field('otpMaxPerHour', 'Max codes per hour')}
          {field('otpMaxAttempts', 'Max verify attempts')}
        </div>
      </div></Card>

      <Card><div style={{ padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 14 }}>Document Reminders &amp; Timing</div>
        <div className="adm-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {field('orderCreatedDelayMinutes', 'Delay before "order created" email (min)', 'Skipped automatically if the customer pays first.')}
          {field('reminder1AfterHours', 'Reminder 1 — after (hours)')}
          {field('reminder2AfterHours', 'Reminder 2 — after (hours)')}
          {field('reminder3AfterHours', 'Reminder 3 — after (hours)')}
          {field('holdAfterFinalReminderHours', 'Hold order — after final reminder (hours)')}
          {field('feedbackDelayHours', 'Feedback request delay (hours)')}
        </div>
      </div></Card>

      <Card><div style={{ padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 6 }}>Status-change emails</div>
        <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 14 }}>Toggle which internal status changes also email the customer.</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {Object.keys(s.statusEmailEnabled || {}).map(k => (
            <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '7px 12px', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!s.statusEmailEnabled[k]} onChange={() => toggleStatus(k)} />{k}
            </label>
          ))}
        </div>
      </div></Card>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Btn onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Settings'}</Btn>
        {msg && <span style={{ fontSize: 12.5, color: '#16A34A' }}>{msg}</span>}
      </div>
    </div>
  )
}

/* ───────────────────────── Page ───────────────────────── */
export default function AdminNotifications() {
  const [tab, setTab] = useState('Email Log')
  return (
    <div>
      <PageHeader title="Notifications" sub="Every customer email: delivery status, templates and timing rules" />
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, borderBottom: '1px solid #E2E8F0' }}>
        {SUB_TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '10px 16px', fontSize: 13.5, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            color: tab === t ? '#3B5BDB' : '#94A3B8', borderBottom: tab === t ? '2px solid #3B5BDB' : '2px solid transparent', marginBottom: -1,
          }}>{t}</button>
        ))}
      </div>
      {tab === 'Email Log' && <EmailLogTab />}
      {tab === 'Templates' && <TemplatesTab />}
      {tab === 'Settings' && <SettingsTab />}
    </div>
  )
}
