import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePartnerAuth } from '../../context/PartnerAuthContext'

const S = `
/* ── Layout ── */
.pd-wrap { min-height:100vh;background:#0A0D14;color:#FFFFFF;font-family:'Manrope',system-ui,sans-serif; }
.pd-topbar {
  height:64px;background:rgba(11,15,25,0.85);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,0.08);
  display:flex;align-items:center;justify-content:space-between;
  padding:0 28px;position:sticky;top:0;z-index:100;
}
.pd-topbar-left { display:flex;align-items:center;gap:14px; }
.pd-logo-mark {
  width:36px;height:36px;border-radius:9px;
  background:linear-gradient(135deg,#1E6FFB,#8B5CF6);
  display:grid;place-items:center;color:#fff;font-weight:900;font-size:16px;flex:none;
}
.pd-topbar-title { font-size:15px;font-weight:800;color:#FFFFFF; }
.pd-topbar-title span { font-weight:400;color:#94A3B8;font-size:13px; }
.pd-topbar-right { display:flex;align-items:center;gap:12px; }
.pd-badge {
  font-size:11.5px;font-weight:700;padding:3px 10px;border-radius:99px;
  letter-spacing:.04em;
}
.pd-badge.pending  { background:rgba(245,158,11,0.15);color:#F59E0B;border:1px solid rgba(245,158,11,0.3); }
.pd-badge.approved { background:rgba(16,185,129,0.15);color:#10B981;border:1px solid rgba(16,185,129,0.3); }
.pd-badge.active   { background:rgba(30,111,251,0.15);color:#38BDF8;border:1px solid rgba(56,189,248,0.3); }
.pd-badge.rejected { background:rgba(239,68,68,0.15);color:#F87171;border:1px solid rgba(239,68,68,0.3); }
.pd-logout {
  height:34px;padding:0 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.12);
  background:rgba(255,255,255,0.05);color:#CBD5E1;font-size:13px;font-weight:600;cursor:pointer;
  font-family:inherit;transition:all .15s;
}
.pd-logout:hover { background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.3);color:#F87171; }

/* ── Body ── */
.pd-body { max-width:1200px;margin:0 auto;padding:32px 24px; }
.pd-section-label {
  font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:#38BDF8;margin-bottom:14px;
}

/* ── Status banner ── */
.pd-status-banner {
  border-radius:14px;padding:20px 24px;margin-bottom:28px;
  display:flex;align-items:flex-start;gap:16px;
}
.pd-status-banner.pending  { background:rgba(245,158,11,0.10);border:1.5px solid rgba(245,158,11,0.3); }
.pd-status-banner.approved,.pd-status-banner.active { background:rgba(16,185,129,0.10);border:1.5px solid rgba(16,185,129,0.3); }
.pd-status-banner.rejected { background:rgba(239,68,68,0.10);border:1.5px solid rgba(239,68,68,0.3); }
.pd-status-icon { font-size:28px;flex:none; }
.pd-status-title { font-size:16px;font-weight:800;color:#FFFFFF;margin-bottom:4px; }
.pd-status-desc  { font-size:13.5px;color:#CBD5E1;line-height:1.6; }

/* ── Stats grid ── */
.pd-stats { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px; }
.pd-stat {
  background:rgba(18,26,44,0.75);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-radius:14px;border:1px solid rgba(255,255,255,0.08);
  padding:22px 20px;box-shadow:0 12px 32px rgba(0,0,0,0.45);
}
.pd-stat-num  { font-size:30px;font-weight:900;color:#FFFFFF;line-height:1; }
.pd-stat-label{ font-size:12.5px;color:#94A3B8;margin-top:6px;font-weight:600; }
.pd-stat-icon { font-size:22px;margin-bottom:8px; }

/* ── Two-col layout ── */
.pd-cols { display:grid;grid-template-columns:1fr 340px;gap:20px;align-items:start; }

/* ── Card ── */
.pd-card {
  background:rgba(18,26,44,0.75);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-radius:16px;border:1px solid rgba(255,255,255,0.08);
  padding:24px;margin-bottom:20px;box-shadow:0 12px 32px rgba(0,0,0,0.45);
}
.pd-card-title { font-size:16px;font-weight:800;color:#FFFFFF;margin-bottom:18px; }

/* ── Table ── */
.pd-table-wrap { overflow-x:auto;border-radius:10px;border:1px solid rgba(255,255,255,0.08);background:rgba(18,26,44,0.6); }
.pd-table { width:100%;border-collapse:collapse;font-size:13px; }
.pd-table th {
  background:rgba(255,255,255,0.04);padding:10px 14px;text-align:left;
  font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  color:#38BDF8;border-bottom:1px solid rgba(255,255,255,0.08);white-space:nowrap;
}
.pd-table td { padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.06);color:#F8FAFC;vertical-align:top; }
.pd-table tr:last-child td { border-bottom:0; }
.pd-table tr:hover td { background:rgba(255,255,255,0.04); }
.pd-empty { text-align:center;padding:40px 20px;color:#94A3B8;font-size:14px; }

/* ── Lead status pill ── */
.pd-ls { font-size:11px;font-weight:700;padding:2px 9px;border-radius:99px; }
.pd-ls.new       { background:rgba(30,111,251,0.15);color:#38BDF8;border:1px solid rgba(56,189,248,0.3); }
.pd-ls.contacted { background:rgba(245,158,11,0.15);color:#F59E0B;border:1px solid rgba(245,158,11,0.3); }
.pd-ls.converted { background:rgba(16,185,129,0.15);color:#10B981;border:1px solid rgba(16,185,129,0.3); }
.pd-ls.lost      { background:rgba(239,68,68,0.15);color:#F87171;border:1px solid rgba(239,68,68,0.3); }

/* ── Profile card ── */
.pd-profile-row { display:flex;gap:10px;margin-bottom:12px;align-items:flex-start; }
.pd-profile-key { font-size:12px;font-weight:700;color:#94A3B8;min-width:110px;padding-top:1px; }
.pd-profile-val { font-size:13px;color:#FFFFFF;word-break:break-word; }
.pd-cat-pill {
  display:inline-block;font-size:11px;font-weight:600;padding:2px 9px;
  border-radius:99px;background:rgba(30,111,251,0.15);color:#38BDF8;border:1px solid rgba(56,189,248,0.3);margin:2px 3px 2px 0;
}

/* ── Chart bars ── */
.pd-chart { display:flex;align-items:flex-end;gap:6px;height:80px;margin-top:12px; }
.pd-bar-wrap { flex:1;display:flex;flex-direction:column;align-items:center;gap:4px; }
.pd-bar { width:100%;border-radius:4px 4px 0 0;background:linear-gradient(180deg,#38BDF8,#1E6FFB);min-height:4px;transition:height .3s; }
.pd-bar-label { font-size:10px;color:#94A3B8;font-weight:600; }
.pd-bar-count  { font-size:10px;color:#CBD5E1;font-weight:700; }

/* ── Responsive ── */
@media(max-width:900px) {
  .pd-stats { grid-template-columns:1fr 1fr; }
  .pd-cols  { grid-template-columns:1fr; }
}
@media(max-width:480px) {
  .pd-stats { grid-template-columns:1fr 1fr; }
  .pd-body  { padding:16px 12px; }
  .pd-card  { padding:18px 14px; }
  .pd-topbar { padding:0 16px; }
}
`

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function StatusBanner({ status }) {
  const config = {
    pending:  { icon: '⏳', title: 'Application Under Review', desc: 'Our team is reviewing your partner application. You\'ll hear back within 2–3 business days. You can explore your dashboard in the meantime.' },
    approved: { icon: '✅', title: 'Application Approved!', desc: 'Congratulations! Your product is now listed on the LauncherDesk Marketplace. Leads will start coming in as businesses discover your tool.' },
    active:   { icon: '🚀', title: 'Active Partner', desc: 'Your partnership is live and active. Track leads and inquiries from businesses discovering your product on LauncherDesk.' },
    rejected: { icon: '❌', title: 'Application Not Approved', desc: 'Unfortunately your application was not approved at this time. Please contact support@launcherdesk.com for more details.' },
  }
  const c = config[status] || config.pending
  return (
    <div className={`pd-status-banner ${status}`}>
      <div className="pd-status-icon">{c.icon}</div>
      <div>
        <div className="pd-status-title">{c.title}</div>
        <div className="pd-status-desc">{c.desc}</div>
      </div>
    </div>
  )
}

export default function PartnerDashboard() {
  const { partner, logout, apiFetch, isLoggedIn } = usePartnerAuth()
  const navigate = useNavigate()
  const [data,    setData]    = useState(null)
  const [leads,   setLeads]   = useState([])
  const [loading, setLoading] = useState(true)
  const [tab,     setTab]     = useState('all')

  useEffect(() => {
    if (!isLoggedIn) { navigate('/partner/login'); return }
    loadDashboard()
  }, [isLoggedIn])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      const res = await apiFetch('/partners/dashboard')
      setData(res.data)
      setLeads(res.data.recentLeads || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadLeads = async (status) => {
    try {
      const url = status === 'all' ? '/partners/leads' : `/partners/leads?status=${status}`
      const res = await apiFetch(url)
      setLeads(res.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  const handleTabChange = (t) => {
    setTab(t)
    loadLeads(t)
  }

  const handleLogout = () => { logout(); navigate('/partner/login') }

  const p = data?.partner || partner || {}
  const stats = data?.stats || { totalLeads: 0, newLeads: 0, converted: 0 }
  const monthly = data?.monthlyLeads || []

  // Build chart data — last 6 months
  const chartData = (() => {
    const now = new Date()
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
      const found = monthly.find(m => m._id.year === d.getFullYear() && m._id.month === d.getMonth() + 1)
      return { label: MONTH_NAMES[d.getMonth()], count: found?.count || 0 }
    })
  })()
  const maxCount = Math.max(...chartData.map(d => d.count), 1)

  return (
    <div className="pd-wrap">
      <style>{S}</style>

      {/* Topbar */}
      <div className="pd-topbar">
        <div className="pd-topbar-left">
          <div className="pd-logo-mark">L</div>
          <div>
            <div className="pd-topbar-title">
              {p.companyName || 'Partner Dashboard'}
              {' '}<span>· Partner Portal</span>
            </div>
          </div>
        </div>
        <div className="pd-topbar-right">
          <span className={`pd-badge ${p.status || 'pending'}`}>
            {(p.status || 'pending').charAt(0).toUpperCase() + (p.status || 'pending').slice(1)}
          </span>
          <button className="pd-logout" onClick={handleLogout}>Sign Out</button>
        </div>
      </div>

      <div className="pd-body">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#94A3B8', fontSize: 15 }}>
            Loading your dashboard…
          </div>
        ) : (
          <>
            {/* Status Banner */}
            <StatusBanner status={p.status || 'pending'} />

            {/* Stats */}
            <div className="pd-section-label">Overview</div>
            <div className="pd-stats">
              {[
                { icon: '📥', num: stats.totalLeads,  label: 'Total Leads' },
                { icon: '🔔', num: stats.newLeads,    label: 'New Leads' },
                { icon: '🤝', num: stats.converted,   label: 'Converted' },
                { icon: '📊', num: stats.totalLeads > 0 ? Math.round((stats.converted / stats.totalLeads) * 100) + '%' : '—', label: 'Conversion Rate' },
              ].map(s => (
                <div key={s.label} className="pd-stat">
                  <div className="pd-stat-icon">{s.icon}</div>
                  <div className="pd-stat-num">{s.num}</div>
                  <div className="pd-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="pd-cols">
              {/* Left: leads + chart */}
              <div>
                {/* Monthly chart */}
                <div className="pd-card">
                  <div className="pd-card-title">Leads — Last 6 Months</div>
                  <div className="pd-chart">
                    {chartData.map(d => (
                      <div key={d.label} className="pd-bar-wrap">
                        <div className="pd-bar-count">{d.count || ''}</div>
                        <div
                          className="pd-bar"
                          style={{ height: `${Math.max((d.count / maxCount) * 60, d.count > 0 ? 8 : 4)}px` }}
                        />
                        <div className="pd-bar-label">{d.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leads table */}
                <div className="pd-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div className="pd-card-title" style={{ marginBottom: 0 }}>Leads from Marketplace</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {['all', 'new', 'contacted', 'converted'].map(t => (
                        <button key={t} onClick={() => handleTabChange(t)} style={{
                          height: 28, padding: '0 11px', borderRadius: 7,
                          border: tab === t ? '0' : '1px solid #E2E8F0',
                          background: tab === t ? '#1D6FE0' : '#fff',
                          color: tab === t ? '#fff' : '#374151',
                          fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                        }}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {leads.length === 0 ? (
                    <div className="pd-empty">
                      <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>No leads yet</div>
                      <div style={{ fontSize: 13 }}>
                        {p.status === 'pending'
                          ? 'Leads will appear here once your application is approved and your product is listed.'
                          : 'Businesses who click on your product from the marketplace will appear here.'}
                      </div>
                    </div>
                  ) : (
                    <div className="pd-table-wrap">
                      <table className="pd-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Company</th>
                            <th>Source</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leads.map(l => (
                            <tr key={l._id}>
                              <td style={{ fontWeight: 600 }}>{l.name || '—'}</td>
                              <td>{l.email || '—'}</td>
                              <td>{l.mobile || '—'}</td>
                              <td>{l.company || '—'}</td>
                              <td style={{ textTransform: 'capitalize' }}>{l.source || 'marketplace'}</td>
                              <td>
                                <span className={`pd-ls ${l.status}`}>
                                  {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                                </span>
                              </td>
                              <td style={{ color: '#94A3B8', whiteSpace: 'nowrap' }}>
                                {new Date(l.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: profile */}
              <div>
                <div className="pd-card">
                  <div className="pd-card-title">Your Product Listing</div>
                  {[
                    { k: 'Product',  v: p.productName },
                    { k: 'Tagline',  v: p.tagline },
                    { k: 'Company',  v: p.companyName },
                    { k: 'Website',  v: p.website ? <a href={p.website} target="_blank" rel="noreferrer" style={{ color: '#1D6FE0' }}>{p.website}</a> : '—' },
                    { k: 'Email',    v: p.email },
                  ].map(r => (
                    <div key={r.k} className="pd-profile-row">
                      <div className="pd-profile-key">{r.k}</div>
                      <div className="pd-profile-val">{r.v || '—'}</div>
                    </div>
                  ))}
                  <div className="pd-profile-row">
                    <div className="pd-profile-key">Categories</div>
                    <div className="pd-profile-val">
                      {(p.categories || []).length > 0
                        ? p.categories.map(c => <span key={c} className="pd-cat-pill">{c}</span>)
                        : '—'}
                    </div>
                  </div>
                  {p.approvedAt && (
                    <div className="pd-profile-row">
                      <div className="pd-profile-key">Listed since</div>
                      <div className="pd-profile-val">
                        {new Date(p.approvedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Help card */}
                <div className="pd-card" style={{ background: 'linear-gradient(135deg,#1E3A6A,#264D8C)', border: 0 }}>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, marginBottom: 8 }}>Looking for support?</div>
                  <div style={{ color: '#9ab5d4', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                    Contact our partner success team for any questions about your listing or leads.
                  </div>
                  <a
                    href="mailto:partners@launcherdesk.com"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '8px 16px', borderRadius: 8,
                      background: '#1D6FE0', color: '#fff',
                      fontSize: 13, fontWeight: 700, textDecoration: 'none',
                    }}
                  >
                    ✉ Contact Support
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}