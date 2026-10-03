import { useState, useEffect, useCallback } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import SEO from '../../components/SEO'

const fmtDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
const fmtRs = n => typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : '—'

function InvoiceRow({ inv }) {
  const { apiDownload } = useUserAuth()
  const [downloading, setDownloading] = useState(false)
  const [err, setErr] = useState('')

  const download = async () => {
    setDownloading(true); setErr('')
    try { await apiDownload(`/user/invoices/${inv._id}/pdf`, `${inv.invoiceNumber?.replace(/\//g, '-')}.pdf`) }
    catch (e) { setErr(e.message || 'Could not download the invoice.') }
    finally { setDownloading(false) }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '16px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EFF6FF', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#1D6FE0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M13 2v6h6" /><path d="M9 13h6M9 17h6" /></svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1A2F4E' }}>{inv.invoiceNumber}</div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{inv.serviceName || inv.serviceTitle} · {fmtDate(inv.invoiceDate)}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#1A2F4E' }}>{fmtRs(inv.totalAmount)}</div>
          <div style={{ fontSize: 11, color: '#94A3B8' }}>incl. GST {fmtRs(inv.gstAmount)}</div>
        </div>
        <button onClick={download} disabled={downloading} style={{
          height: 36, padding: '0 16px', borderRadius: 8, border: 'none', background: '#1D6FE0', color: '#fff',
          fontWeight: 700, fontSize: 12.5, cursor: downloading ? 'default' : 'pointer', opacity: downloading ? 0.7 : 1,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
          {downloading ? 'Downloading…' : 'Download PDF'}
        </button>
      </div>
      {err && <p style={{ width: '100%', fontSize: 12, color: '#DC2626', margin: 0 }}>{err}</p>}
    </div>
  )
}

export default function UserInvoices() {
  const { apiFetch } = useUserAuth()
  const [invoices, setInvoices] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    apiFetch('/user/invoices').then(r => setInvoices(r.data || [])).catch(e => setError(e.message || 'Failed to load invoices'))
  }, [apiFetch])

  useEffect(() => { load() }, [load])

  return (
    <>
      <SEO title="My Invoices" noindex={true} />
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1A2F4E', letterSpacing: '-.02em', marginBottom: 4 }}>Invoices</h1>
        <p style={{ fontSize: 14, color: '#64748B' }}>Every GST tax invoice generated for your paid orders.</p>
      </div>

      {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '14px 16px', fontSize: 14, color: '#DC2626', marginBottom: 20 }}>{error}</div>}

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EEF6', overflow: 'hidden' }}>
        {invoices === null ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <div style={{ width: 32, height: 32, border: '3px solid #E2E8F0', borderTopColor: '#1D6FE0', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
            Loading…
          </div>
        ) : invoices.length === 0 ? (
          <div style={{ padding: '56px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🧾</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A2F4E', marginBottom: 8 }}>No invoices yet</h3>
            <p style={{ fontSize: 14, color: '#64748B' }}>A tax invoice appears here automatically as soon as a payment is confirmed.</p>
          </div>
        ) : (
          <div>{invoices.map(inv => <InvoiceRow key={inv._id} inv={inv} />)}</div>
        )}
      </div>
    </>
  )
}
