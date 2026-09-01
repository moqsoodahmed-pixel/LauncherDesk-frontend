import { useEffect, useState } from 'react'
import { useSalesAuth } from '../../context/SalesAuthContext'
import { Link } from 'react-router-dom'

const fmt = d => d ? new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'

const STATUS_COLORS = {
  new:'#3B5BDB', contacted:'#0EA5E9', qualified:'#F59E0B',
  converted:'#10B981', closed:'#94A3B8', working:'#0EA5E9',
  nurturing:'#F59E0B', lost:'#EF4444', pending:'#94A3B8',
  reviewed:'#0EA5E9', sent:'#F59E0B', accepted:'#10B981', rejected:'#EF4444',
}

function StatCard({ label, value, color = '#3B5BDB', icon }) {
  return (
    <div style={{background:'#fff',borderRadius:14,padding:'20px',border:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:16}}>
      <div style={{width:48,height:48,borderRadius:12,background:`${color}18`,display:'grid',placeItems:'center',flexShrink:0}}>
        <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {icon.split('|').map((p,i)=><path key={i} d={p}/>)}
        </svg>
      </div>
      <div>
        <div style={{fontSize:26,fontWeight:900,color:'#0A2540',lineHeight:1}}>{value ?? '—'}</div>
        <div style={{fontSize:12.5,color:'#64748B',marginTop:3}}>{label}</div>
      </div>
    </div>
  )
}

function Badge({ status }) {
  const color = STATUS_COLORS[status] || '#94A3B8'
  return <span style={{fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:99,background:`${color}18`,color}}>{status}</span>
}

export default function SalesDashboard() {
  const { apiFetch, user } = useSalesAuth()
  const [stats,  setStats]  = useState(null)
  const [recent, setRecent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([apiFetch('/sales/stats'), apiFetch('/sales/recent')])
      .then(([s, r]) => { setStats(s.data); setRecent(r.data) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{padding:40,textAlign:'center',color:'#64748B'}}>Loading…</div>

  return (
    <div style={{maxWidth:1200,margin:'0 auto'}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:24,fontWeight:800,color:'#0A2540'}}>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p style={{color:'#64748B',marginTop:4}}>Here's your sales pipeline overview for today.</p>
      </div>

      {/* Stat cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:14,marginBottom:28}}>
        <StatCard label="Total Contacts" value={stats?.contacts} color="#3B5BDB" icon="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        <StatCard label="New Contacts" value={stats?.newContacts} color="#EF4444" icon="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75"/>
        <StatCard label="Total Leads" value={stats?.leads} color="#F59E0B" icon="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8"/>
        <StatCard label="Working" value={stats?.workingLeads} color="#0EA5E9" icon="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"/>
        <StatCard label="Converted" value={stats?.convertedLeads} color="#10B981" icon="M22 11.08V12a10 10 0 1 1-5.93-9.14|M22 4 12 14.01l-3-3"/>
        <StatCard label="Quotes" value={stats?.quotes} color="#7C3AED" icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8"/>
      </div>

      {/* Quick actions */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:28}}>
        {[
          { label:'View all Leads', to:'/sales/leads', color:'#3B5BDB' },
          { label:'View all Contacts', to:'/sales/contacts', color:'#F97316' },
          { label:'View all Quotes', to:'/sales/quotes', color:'#7C3AED' },
        ].map(a => (
          <Link key={a.to} to={a.to} style={{display:'block',padding:'14px',background:a.color,color:'#fff',borderRadius:12,fontWeight:700,fontSize:14,textDecoration:'none',textAlign:'center',transition:'opacity .15s'}}
            onMouseEnter={e=>e.currentTarget.style.opacity='.88'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
            {a.label} →
          </Link>
        ))}
      </div>

      {/* Recent tables */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
        {/* Recent Leads */}
        <div style={{background:'#fff',borderRadius:14,border:'1px solid #E2E8F0',overflow:'hidden'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{fontSize:15,fontWeight:700,color:'#0A2540'}}>Recent Leads</h3>
            <Link to="/sales/leads" style={{fontSize:12,color:'#3B5BDB',fontWeight:600,textDecoration:'none'}}>View all →</Link>
          </div>
          <div style={{overflow:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <tbody>
                {(recent?.leads||[]).map(l => (
                  <tr key={l._id} style={{borderBottom:'1px solid #F8FAFC'}}>
                    <td style={{padding:'10px 20px'}}>
                      <div style={{fontSize:13.5,fontWeight:600,color:'#0A2540'}}>{l.name}</div>
                      <div style={{fontSize:12,color:'#64748B'}}>{l.mobile||l.email}</div>
                    </td>
                    <td style={{padding:'10px 20px',textAlign:'right'}}>
                      <Badge status={l.status}/>
                    </td>
                  </tr>
                ))}
                {!recent?.leads?.length && <tr><td colSpan={2} style={{padding:'20px',textAlign:'center',color:'#94A3B8',fontSize:13}}>No leads yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Contacts */}
        <div style={{background:'#fff',borderRadius:14,border:'1px solid #E2E8F0',overflow:'hidden'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{fontSize:15,fontWeight:700,color:'#0A2540'}}>Recent Contacts</h3>
            <Link to="/sales/contacts" style={{fontSize:12,color:'#3B5BDB',fontWeight:600,textDecoration:'none'}}>View all →</Link>
          </div>
          <div style={{overflow:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <tbody>
                {(recent?.contacts||[]).map(c => (
                  <tr key={c._id} style={{borderBottom:'1px solid #F8FAFC'}}>
                    <td style={{padding:'10px 20px'}}>
                      <div style={{fontSize:13.5,fontWeight:600,color:'#0A2540'}}>{c.name}</div>
                      <div style={{fontSize:12,color:'#64748B'}}>{c.mobile}</div>
                    </td>
                    <td style={{padding:'10px 20px',textAlign:'right'}}>
                      <Badge status={c.status}/>
                    </td>
                  </tr>
                ))}
                {!recent?.contacts?.length && <tr><td colSpan={2} style={{padding:'20px',textAlign:'center',color:'#94A3B8',fontSize:13}}>No contacts yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}