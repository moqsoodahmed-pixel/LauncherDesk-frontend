import { useState, useEffect, useRef, useCallback } from 'react'
import { useUserAuth } from '../context/UserAuthContext'

const STATUS_CFG = {
  NOT_REQUIRED:          { label: 'Not required',    color: '#94A3B8', bg: '#F1F5F9' },
  PENDING:               { label: 'Pending upload',  color: '#D97706', bg: '#FFFBEB' },
  pending:               { label: 'Pending upload',  color: '#D97706', bg: '#FFFBEB' },
  UPLOADED:              { label: 'Uploaded',        color: '#3B82F6', bg: '#EFF6FF' },
  uploaded:              { label: 'Uploaded',        color: '#3B82F6', bg: '#EFF6FF' },
  UNDER_REVIEW:          { label: 'Under review',    color: '#0284C7', bg: '#F0F9FF' },
  'under-review':        { label: 'Under review',    color: '#0284C7', bg: '#F0F9FF' },
  APPROVED:              { label: 'Approved',        color: '#16A34A', bg: '#F0FDF4' },
  accepted:              { label: 'Approved',        color: '#16A34A', bg: '#F0FDF4' },
  REJECTED:              { label: 'Needs correction', color: '#DC2626', bg: '#FEF2F2' },
  rejected:              { label: 'Needs correction', color: '#DC2626', bg: '#FEF2F2' },
  RESUBMISSION_REQUIRED: { label: 'Needs correction', color: '#DC2626', bg: '#FEF2F2' },
}
const cfgFor = s => STATUS_CFG[s] || { label: s || 'Pending', color: '#64748B', bg: '#F1F5F9' }
const fmtSize = b => !b ? '' : b < 1024 * 1024 ? `${Math.round(b / 1024)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`

function DocRow({ doc, orderId, onChanged }) {
  const { apiUpload, apiDownload } = useUserAuth()
  const fileRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const cfg = cfgFor(doc.status)
  const needsAction = ['PENDING', 'pending', 'REJECTED', 'rejected', 'RESUBMISSION_REQUIRED'].includes(doc.status)
  const locked = ['APPROVED', 'accepted'].includes(doc.status)

  const pickFile = () => fileRef.current?.click()

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (file.size > 15 * 1024 * 1024) { setErr('File is larger than 15 MB.'); return }
    setBusy(true); setErr('')
    try {
      const fd = new FormData(); fd.append('file', file)
      await apiUpload(`/user/orders/${orderId}/documents/${doc._id}/upload`, fd)
      onChanged()
    } catch (e2) { setErr(e2.message || 'Upload failed, please try again.') }
    finally { setBusy(false) }
  }

  const download = async () => {
    setBusy(true); setErr('')
    try { await apiDownload(`/user/orders/${orderId}/documents/${doc._id}/download`, doc.filename) }
    catch (e2) { setErr(e2.message || 'Could not download the file.') }
    finally { setBusy(false) }
  }

  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid #F1F5F9' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1A2F4E' }}>{doc.name}</div>
          {doc.description && <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{doc.description}</div>}
          {doc.filename && <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>📎 {doc.filename} {doc.fileSize ? `· ${fmtSize(doc.fileSize)}` : ''}</div>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: cfg.bg, color: cfg.color, whiteSpace: 'nowrap' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.color }} />{cfg.label}
          </span>
          {doc.filename && (
            <button onClick={download} disabled={busy} title="Download what you uploaded" style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
            </button>
          )}
          {!locked && (
            <>
              <input ref={fileRef} type="file" onChange={onFile} style={{ display: 'none' }} accept=".pdf,.jpg,.jpeg,.png,.webp" />
              <button onClick={pickFile} disabled={busy} style={{
                height: 30, padding: '0 12px', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700, cursor: busy ? 'default' : 'pointer',
                background: needsAction ? '#1D6FE0' : '#F1F5F9', color: needsAction ? '#fff' : '#475569', opacity: busy ? 0.6 : 1,
              }}>{busy ? 'Uploading…' : doc.filename ? 'Replace' : 'Upload'}</button>
            </>
          )}
        </div>
      </div>
      {(doc.status === 'REJECTED' || doc.status === 'rejected' || doc.status === 'RESUBMISSION_REQUIRED') && (
        <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 8, background: '#FEF2F2', border: '1px solid #FECACA' }}>
          <p style={{ fontSize: 12.5, color: '#991B1B', fontWeight: 600, marginBottom: 2 }}>Needs correction</p>
          {doc.rejectionReason && <p style={{ fontSize: 12.5, color: '#B91C1C', margin: 0 }}>{doc.rejectionReason}</p>}
          {doc.correctionRequired && <p style={{ fontSize: 12.5, color: '#B91C1C', margin: '4px 0 0' }}><strong>Please do:</strong> {doc.correctionRequired}</p>}
        </div>
      )}
      {err && <p style={{ fontSize: 12, color: '#DC2626', marginTop: 8 }}>{err}</p>}
    </div>
  )
}

export default function DocumentChecklist({ orderId }) {
  const { apiFetch } = useUserAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitMsg, setSubmitMsg] = useState('')

  const load = useCallback(async () => {
    try { const r = await apiFetch(`/user/orders/${orderId}/documents`); setData(r) }
    catch { /* silently keep previous data */ }
    finally { setLoading(false) }
  }, [apiFetch, orderId])

  useEffect(() => { load() }, [load])

  if (loading) return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EEF6', padding: '24px', marginBottom: 16, textAlign: 'center', color: '#94A3B8', fontSize: 13 }}>
      Loading documents…
    </div>
  )
  if (!data || (!data.required?.length && !data.final?.length)) return null

  const uploaded = data.required.filter(d => ['UPLOADED', 'uploaded', 'UNDER_REVIEW', 'under-review', 'APPROVED', 'accepted'].includes(d.status))
  const allApproved = data.required.length > 0 && data.required.every(d => ['APPROVED', 'accepted'].includes(d.status))

  const submit = async () => {
    setSubmitting(true); setSubmitMsg('')
    try {
      const r = await apiFetch(`/user/orders/${orderId}/documents/submit`, { method: 'POST' })
      setSubmitMsg(`Submitted ${r.submitted} document${r.submitted === 1 ? '' : 's'} for review.${r.pending ? ` ${r.pending} still pending.` : ''}`)
      load()
    } catch (e) { setSubmitMsg(e.message || 'Could not submit right now.') }
    finally { setSubmitting(false) }
  }

  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EEF6', padding: '24px', marginBottom: 16 }}>
      {data.required?.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 10 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1A2F4E' }}>Documents</h2>
            {allApproved
              ? <span style={{ fontSize: 12, fontWeight: 700, color: '#16A34A' }}>✓ All approved</span>
              : <span style={{ fontSize: 12, color: '#64748B' }}>{uploaded.length} of {data.required.length} uploaded</span>}
          </div>
          <div>{data.required.map(d => <DocRow key={d._id} doc={d} orderId={orderId} onChanged={load} />)}</div>
          {!allApproved && (
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={submit} disabled={!uploaded.length || submitting} style={{
                height: 40, padding: '0 20px', borderRadius: 9, border: 'none', background: uploaded.length ? '#1D6FE0' : '#E2E8F0',
                color: uploaded.length ? '#fff' : '#94A3B8', fontWeight: 700, fontSize: 13.5, cursor: uploaded.length && !submitting ? 'pointer' : 'default',
              }}>{submitting ? 'Submitting…' : "I've uploaded my documents"}</button>
              {submitMsg && <span style={{ fontSize: 12.5, color: '#16A34A' }}>{submitMsg}</span>}
            </div>
          )}
        </>
      )}

      {data.final?.length > 0 && (
        <div style={{ marginTop: data.required?.length ? 24 : 0, paddingTop: data.required?.length ? 20 : 0, borderTop: data.required?.length ? '1px solid #F1F5F9' : 'none' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1A2F4E', marginBottom: 10 }}>Final Documents</h2>
          <div>{data.final.map(d => <DocRow key={d._id} doc={d} orderId={orderId} onChanged={load} />)}</div>
        </div>
      )}
    </div>
  )
}
