import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { Card, CardHead, StatCard, Btn, Modal, Ic, Spinner } from '../AdminUI'
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'

const PLATFORMS = [
  { key: 'linkedin',  label: 'LinkedIn',  color: '#0A66C2', bg: '#EEF5FC' },
  { key: 'facebook',  label: 'Facebook',  color: '#1877F2', bg: '#EEF3FE' },
  { key: 'instagram', label: 'Instagram', color: '#D6249F', bg: '#FDF0F9' },
]

function formatBytes(bytes) {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
}

function shortDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
}

export default function TrafficAndGrowth() {
  const { apiFetch } = useAdminAuth()

  const [traffic, setTraffic]       = useState(null)
  const [trafficLoading, setTL]     = useState(true)

  const [social, setSocial]         = useState(null)
  const [socialLoading, setSL]      = useState(true)

  const [modalOpen, setModalOpen]   = useState(false)
  const [form, setForm]             = useState({ platform: 'linkedin', followers: '', date: new Date().toISOString().slice(0,10), note: '' })
  const [saving, setSaving]         = useState(false)
  const [formError, setFormError]   = useState('')

  const loadTraffic = useCallback(async () => {
    setTL(true)
    try {
      const r = await apiFetch('/admin/analytics/traffic?days=30')
      setTraffic(r)
    } catch (err) {
      console.error(err)
    } finally {
      setTL(false)
    }
  }, [apiFetch])

  const loadSocial = useCallback(async () => {
    setSL(true)
    try {
      const r = await apiFetch('/admin/analytics/social?days=180')
      setSocial(r.data)
    } catch (err) {
      console.error(err)
    } finally {
      setSL(false)
    }
  }, [apiFetch])

  useEffect(() => { loadTraffic(); loadSocial() }, [loadTraffic, loadSocial])

  // Merge per-platform series into one array keyed by date for a multi-line chart
  const socialChartData = (() => {
    if (!social?.entries?.length) return []
    const byDate = {}
    for (const e of social.entries) {
      const d = e.date.slice(0, 10)
      byDate[d] = byDate[d] || { date: d }
      byDate[d][e.platform] = e.followers
    }
    return Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date))
  })()

  const trafficData = (traffic?.data?.daily || []).map(d => ({ ...d, dateLabel: shortDate(d.date) }))

  const submitEntry = async e => {
    e.preventDefault()
    setFormError('')
    if (!form.followers || isNaN(form.followers) || Number(form.followers) < 0) {
      setFormError('Enter a valid follower count.')
      return
    }
    setSaving(true)
    try {
      await apiFetch('/admin/analytics/social', {
        method: 'POST',
        body: JSON.stringify({ platform: form.platform, followers: Number(form.followers), date: form.date, note: form.note }),
      })
      setModalOpen(false)
      setForm({ platform: 'linkedin', followers: '', date: new Date().toISOString().slice(0,10), note: '' })
      loadSocial()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      {/* ── Website Traffic (Cloudflare) ── */}
      <Card style={{ marginBottom: 20 }}>
        <CardHead
          title="Website Traffic"
          sub={traffic?.configured === false ? 'Cloudflare analytics not connected' : 'Last 30 days — via Cloudflare'}
        />
        <div style={{ padding: '16px 20px' }}>
          {trafficLoading ? (
            <Spinner />
          ) : traffic?.configured === false ? (
            <div style={{ padding: '24px 8px', textAlign: 'center', color: '#64748B', fontSize: 13.5 }}>
              <div style={{ marginBottom: 8, fontWeight: 600, color: '#1C2434' }}>Cloudflare analytics isn't connected yet</div>
              <div>Add <code style={{ background:'#F1F5F9', padding:'2px 6px', borderRadius:4 }}>CLOUDFLARE_API_TOKEN</code> and <code style={{ background:'#F1F5F9', padding:'2px 6px', borderRadius:4 }}>CLOUDFLARE_ZONE_ID</code> to the backend environment to show live traffic here.</div>
            </div>
          ) : (
            <>
              <div className="adm-four-col" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:18 }}>
                <StatCard label="Requests"    value={(traffic?.data?.totals?.requests || 0).toLocaleString('en-IN')} icon="M3 12h4l3 8 4-16 3 8h4" iconBg="#EEF2FF" iconColor="#3B5BDB" />
                <StatCard label="Page Views"  value={(traffic?.data?.totals?.pageViews || 0).toLocaleString('en-IN')} icon="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z|M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" iconBg="#F0FDF4" iconColor="#10B981" />
                <StatCard label="Unique Visitors" value={(traffic?.data?.totals?.uniques || 0).toLocaleString('en-IN')} icon="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75" iconBg="#FFFBEB" iconColor="#F59E0B" />
                <StatCard label="Bandwidth"   value={formatBytes(traffic?.data?.totals?.bandwidthBytes)} icon="M22 12h-4l-3 9L9 3l-3 9H2" iconBg="#F5F3FF" iconColor="#8B5CF6" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={trafficData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="trafficG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#3B5BDB" stopOpacity={.2} />
                      <stop offset="95%" stopColor="#3B5BDB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="dateLabel" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="pageViews" stroke="#3B5BDB" strokeWidth={2.5} fill="url(#trafficG)" name="Page Views" />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      </Card>

      {/* ── Social Media Growth ── */}
      <Card>
        <CardHead
          title="Social Media Growth"
          sub="LinkedIn, Facebook & Instagram followers over time"
          actions={<Btn size="sm" onClick={() => setModalOpen(true)}><Ic d="M12 5v14M5 12h14" size={14}/> Add Entry</Btn>}
        />
        <div style={{ padding: '16px 20px' }}>
          {socialLoading ? (
            <Spinner />
          ) : (
            <>
              <div className="adm-three-col" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:18 }}>
                {PLATFORMS.map(p => {
                  const s = social?.summary?.[p.key]
                  return (
                    <div key={p.key} style={{ background:p.bg, borderRadius:10, padding:'16px 18px' }}>
                      <div style={{ fontSize:12, fontWeight:700, color:p.color, marginBottom:6 }}>{p.label}</div>
                      <div style={{ fontSize:22, fontWeight:800, color:'#1C2434' }}>{s?.followers != null ? s.followers.toLocaleString('en-IN') : '—'}</div>
                      <div style={{ fontSize:12, color: s?.change > 0 ? '#16A34A' : s?.change < 0 ? '#DC2626' : '#94A3B8', marginTop:4, fontWeight:600 }}>
                        {s?.followers == null ? 'No data yet' : `${s.change >= 0 ? '+' : ''}${s.change} in period`}
                      </div>
                    </div>
                  )
                })}
              </div>

              {socialChartData.length === 0 ? (
                <div style={{ padding: '24px 8px', textAlign: 'center', color: '#94A3B8', fontSize: 13.5 }}>
                  No follower data yet — click "Add Entry" to start tracking growth.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={socialChartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} />
                    <Tooltip labelFormatter={shortDate} contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    {PLATFORMS.map(p => (
                      <Line key={p.key} type="monotone" dataKey={p.key} name={p.label} stroke={p.color} strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              )}
            </>
          )}
        </div>
      </Card>

      {/* ── Add follower entry modal ── */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Follower Count"
        footer={<>
          <Btn variant="outline" onClick={() => setModalOpen(false)}>Cancel</Btn>
          <Btn onClick={submitEntry} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn>
        </>}>
        <form onSubmit={submitEntry} style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <label style={{ fontSize:12.5, fontWeight:600, color:'#64748B', display:'block', marginBottom:6 }}>Platform</label>
            <select value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}
              style={{ width:'100%', height:38, border:'1px solid #E2E8F0', borderRadius:8, padding:'0 12px', fontSize:13.5, fontFamily:'inherit' }}>
              {PLATFORMS.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize:12.5, fontWeight:600, color:'#64748B', display:'block', marginBottom:6 }}>Follower count</label>
            <input type="number" min="0" value={form.followers} onChange={e => setForm(f => ({ ...f, followers: e.target.value }))}
              placeholder="e.g. 1240"
              style={{ width:'100%', height:38, border:'1px solid #E2E8F0', borderRadius:8, padding:'0 12px', fontSize:13.5, fontFamily:'inherit' }} />
          </div>
          <div>
            <label style={{ fontSize:12.5, fontWeight:600, color:'#64748B', display:'block', marginBottom:6 }}>Date</label>
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              style={{ width:'100%', height:38, border:'1px solid #E2E8F0', borderRadius:8, padding:'0 12px', fontSize:13.5, fontFamily:'inherit' }} />
          </div>
          <div>
            <label style={{ fontSize:12.5, fontWeight:600, color:'#64748B', display:'block', marginBottom:6 }}>Note (optional)</label>
            <input type="text" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              placeholder="e.g. after ad campaign"
              style={{ width:'100%', height:38, border:'1px solid #E2E8F0', borderRadius:8, padding:'0 12px', fontSize:13.5, fontFamily:'inherit' }} />
          </div>
          {formError && <div style={{ color:'#DC2626', fontSize:12.5 }}>{formError}</div>}
        </form>
      </Modal>
    </>
  )
}