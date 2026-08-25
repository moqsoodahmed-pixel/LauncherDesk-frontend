import { useState, useEffect } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { Card, CardHead, StatCard, StatusBadge, Spinner, Ic } from '../AdminUI'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const MONTHLY = [
  {m:'Jan',v:186000,l:34},{m:'Feb',v:215000,l:41},{m:'Mar',v:198000,l:38},
  {m:'Apr',v:278000,l:52},{m:'May',v:243000,l:46},{m:'Jun',v:312000,l:58},
  {m:'Jul',v:289000,l:49},{m:'Aug',v:334000,l:63},{m:'Sep',v:298000,l:55},
  {m:'Oct',v:378000,l:71},{m:'Nov',v:342000,l:66},{m:'Dec',v:410000,l:78},
]
const PIE = [
  {name:'Contacts',  color:'#3B5BDB'},
  {name:'Quotes',    color:'#10B981'},
  {name:'Leads',     color:'#F59E0B'},
  {name:'Applications',color:'#8B5CF6'},
]
const fmt = n => '₹' + (n/1000).toFixed(0) + 'K'
const initials = n => (n||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)
const COLORS = ['#3B5BDB','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899']

export default function AdminDashboard() {
  const { apiFetch } = useAdminAuth()
  const [stats,     setStats]    = useState(null)
  const [contacts,  setContacts] = useState([])
  const [leads,     setLeads]    = useState([])
  const [quotes,    setQuotes]   = useState([])
  const [loading,   setLoading]  = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [c, l, q, adminStats] = await Promise.all([
          apiFetch('/contact?limit=5'),
          apiFetch('/leads?limit=5'),
          apiFetch('/quotes?limit=5'),
          apiFetch('/admin/stats'),
        ])
        setContacts(c.data  || [])
        setLeads(l.data     || [])
        setQuotes(q.data    || [])
        setStats({
          contacts: c.total || 0,
          leads:    l.total || 0,
          quotes:   q.total || 0,
          partners:       adminStats?.data?.totals?.partners      || 0,
          partnerLeads:   adminStats?.data?.totals?.partnerLeads  || 0,
          partnersPending: adminStats?.data?.partnersByStatus?.pending || 0,
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [apiFetch])

  if (loading) return <Spinner />

  const pieData = stats ? [
    { name:'Contacts',     value:stats.contacts,    color:'#3B5BDB' },
    { name:'Leads',        value:stats.leads,        color:'#10B981' },
    { name:'Quotes',       value:stats.quotes,       color:'#F59E0B' },
  ] : PIE.map(p=>({...p,value:Math.floor(Math.random()*30+10)}))

  return (
    <div>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:22 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:'#1C2434', letterSpacing:'-.02em' }}>Dashboard</h1>
          <p style={{ fontSize:13, color:'#64748B', marginTop:3 }}>
            {new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="adm-stat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:20 }}>
        <StatCard label="Total Contacts"     value={stats?.contacts ?? '—'} dir="up"   change="+12.4%"  icon="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" iconBg="#EEF2FF" iconColor="#3B5BDB" />
        <StatCard label="Active Leads"       value={stats?.leads    ?? '—'} dir="up"   change="+8.1%"   icon="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75"  iconBg="#F0FDF4" iconColor="#10B981" />
        <StatCard label="Quote Requests"     value={stats?.quotes   ?? '—'} dir="up"   change="+18.2%"  icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8"  iconBg="#FFFBEB" iconColor="#F59E0B" />
        <StatCard label="Partners"           value={stats?.partners ?? '—'} dir="up"   change={stats?.partnersPending ? `${stats.partnersPending} pending` : 'Total'} icon="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75" iconBg="#F5F3FF" iconColor="#8B5CF6" />
      </div>
      {/* Partner leads sub-row */}
      {(stats?.partnerLeads > 0) && (
        <div style={{ background:'#EEF2FF', border:'1px solid #C7D2FE', borderRadius:10, padding:'10px 18px', marginBottom:20, display:'flex', alignItems:'center', gap:12, fontSize:13.5 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span style={{ color:'#3B5BDB', fontWeight:700 }}>{stats.partnerLeads} marketplace leads</span>
          <span style={{ color:'#4338CA' }}>generated through partner products so far.</span>
          <a href="/admin/partners" style={{ marginLeft:'auto', color:'#3B5BDB', fontWeight:700, fontSize:13, textDecoration:'none' }}>View Partners →</a>
        </div>
      )}

      {/* Charts row */}
      <div className="adm-charts-row" style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:16, marginBottom:20 }}>
        <Card>
          <CardHead title="Monthly Lead Volume" sub="Enquiries received per month — FY 2026" />
          <div style={{ padding:'16px 20px' }}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={MONTHLY} margin={{top:4,right:4,left:-20,bottom:0}}>
                <defs>
                  <linearGradient id="aG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3B5BDB" stopOpacity={.18}/>
                    <stop offset="95%" stopColor="#3B5BDB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                <XAxis dataKey="m" tick={{fontSize:11,fill:'#94A3B8'}}/>
                <YAxis tick={{fontSize:11,fill:'#94A3B8'}}/>
                <Tooltip contentStyle={{borderRadius:8,border:'1px solid #E2E8F0',fontSize:12}}/>
                <Area type="monotone" dataKey="l" stroke="#3B5BDB" strokeWidth={2.5} fill="url(#aG)" name="Leads"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHead title="Enquiry Mix" sub="By source type" />
          <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={44} outerRadius={66} paddingAngle={3} dataKey="value">
                  {pieData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={{borderRadius:8,fontSize:12}}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:7 }}>
              {pieData.map(p=>(
                <div key={p.name} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:10,height:10,borderRadius:3,background:p.color,flexShrink:0 }}/>
                  <span style={{ fontSize:12.5,color:'#64748B',flex:1 }}>{p.name}</span>
                  <span style={{ fontSize:12.5,fontWeight:700,color:'#1C2434' }}>{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent rows */}
      <div className="adm-two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        {/* Recent contacts */}
        <Card>
          <CardHead title="Recent Contacts" sub="Latest enquiries from the website" />
          <div>
            {contacts.length === 0 && <div style={{ padding:'20px',color:'#94A3B8',fontSize:13 }}>No contacts yet.</div>}
            {contacts.slice(0,5).map((c,i)=>(
              <div key={c._id} style={{ display:'flex',alignItems:'center',gap:12,padding:'11px 20px',borderBottom:i<4?'1px solid #F1F5F9':'0' }}>
                <div style={{ width:34,height:34,borderRadius:9,background:COLORS[i%6],display:'grid',placeItems:'center',fontSize:13,fontWeight:700,color:'#fff',flexShrink:0 }}>{initials(c.name)}</div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:13.5,fontWeight:600,color:'#1C2434',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{c.name}</div>
                  <div style={{ fontSize:12,color:'#94A3B8',marginTop:1 }}>{c.service || c.source || 'General enquiry'}</div>
                </div>
                <StatusBadge s={c.status}/>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent quotes */}
        <Card>
          <CardHead title="Recent Quotes" sub="Latest quote requests" />
          <div>
            {quotes.length === 0 && <div style={{ padding:'20px',color:'#94A3B8',fontSize:13 }}>No quotes yet.</div>}
            {quotes.slice(0,5).map((q,i)=>(
              <div key={q._id} style={{ display:'flex',alignItems:'center',gap:12,padding:'11px 20px',borderBottom:i<4?'1px solid #F1F5F9':'0' }}>
                <div style={{ width:34,height:34,borderRadius:9,background:COLORS[(i+3)%6],display:'grid',placeItems:'center',fontSize:13,fontWeight:700,color:'#fff',flexShrink:0 }}>{initials(q.name)}</div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:13.5,fontWeight:600,color:'#1C2434' }}>{q.name}</div>
                  <div style={{ fontSize:12,color:'#94A3B8',marginTop:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{q.serviceTitle||q.serviceSlug}</div>
                </div>
                <StatusBadge s={q.status}/>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}