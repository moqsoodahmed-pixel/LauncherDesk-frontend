import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import SEO from '../../components/SEO'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const STATUS_CFG = {
  received:       { label:'Received',     color:'#3B82F6', bg:'#EFF6FF' },
  'in-progress':  { label:'In Progress',  color:'#D97706', bg:'#FFFBEB' },
  'pending-docs': { label:'Docs Needed',  color:'#7C3AED', bg:'#F5F3FF' },
  processing:     { label:'Processing',   color:'#0284C7', bg:'#F0F9FF' },
  completed:      { label:'Completed',    color:'#16A34A', bg:'#F0FDF4' },
  'on-hold':      { label:'On Hold',      color:'#64748B', bg:'#F1F5F9' },
  cancelled:      { label:'Cancelled',    color:'#DC2626', bg:'#FEF2F2' },
}

function StatusBadge({ status }) {
  const c = STATUS_CFG[status] || { label:status, color:'#64748B', bg:'#F1F5F9' }
  return <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11.5,fontWeight:600,padding:'3px 10px',borderRadius:99,background:c.bg,color:c.color}}><span style={{width:6,height:6,borderRadius:'50%',background:c.color,flexShrink:0}}/>{c.label}</span>
}

function StatCard({ label, value, sub, icon, color='#1D6FE0', bg='#EEF2FF' }) {
  return (
    <div style={{background:'#fff',borderRadius:14,padding:'20px',border:'1px solid #E8EEF6',display:'flex',gap:14,alignItems:'flex-start'}}>
      <div style={{width:44,height:44,borderRadius:10,background:bg,display:'grid',placeItems:'center',flexShrink:0}}>
        <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon.split('|').map((p,i)=><path key={i} d={p}/>)}</svg>
      </div>
      <div>
        <div style={{fontSize:28,fontWeight:900,color:'#1A2F4E',lineHeight:1,letterSpacing:'-.02em'}}>{value}</div>
        <div style={{fontSize:13,fontWeight:600,color:'#4A5E78',marginTop:2}}>{label}</div>
        {sub && <div style={{fontSize:11.5,color:'#94A3B8',marginTop:3}}>{sub}</div>}
      </div>
    </div>
  )
}

export default function UserDashboard() {
  const { apiFetch, user } = useUserAuth()
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const firstName = user?.name?.split(' ')[0] || 'there'

  useEffect(() => {
    apiFetch('/user/dashboard').then(d => setData(d.data)).catch(e => setError(e.message || 'Failed to load')).finally(() => setLoading(false))
  }, [apiFetch])

  return (
    <>
      <SEO title="My Dashboard" noindex={true} />
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:800,color:'#1A2F4E',letterSpacing:'-.02em',marginBottom:4}}>Welcome back, {firstName}</h1>
        <p style={{fontSize:14,color:'#64748B'}}>Here's an overview of your services and activity.</p>
      </div>
      {error && <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:10,padding:'14px 16px',fontSize:14,color:'#DC2626',marginBottom:20}}>{error}</div>}
      {loading ? (
        <div style={{textAlign:'center',padding:'60px 0',color:'#94A3B8'}}>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <div style={{width:36,height:36,border:'3px solid #E2E8F0',borderTopColor:'#1D6FE0',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 12px'}}/>Loading…
        </div>
      ) : (
        <>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginBottom:28}}>
            <StatCard label="Active Services" value={data?.stats?.activeOrders??0} sub="Currently being processed" icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6" color="#D97706" bg="#FFFBEB"/>
            <StatCard label="Total Services" value={data?.stats?.totalOrders??0} sub="All time" icon="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" color="#1D6FE0" bg="#EEF2FF"/>
            <StatCard label="Payments Made" value={data?.stats?.totalPayments??0} sub="Successful transactions" icon="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z|M16 21V5a2 2 0 0-2-2h-4a2 2 0 0 0-2 2v16" color="#16A34A" bg="#F0FDF4"/>
          </div>
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #E8EEF6',overflow:'hidden',marginBottom:24}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 20px',borderBottom:'1px solid #F1F5F9'}}>
              <h2 style={{fontSize:15,fontWeight:700,color:'#1A2F4E',margin:0}}>Recent Services</h2>
              <Link to="/user/services" style={{fontSize:13,color:'#1D6FE0',fontWeight:600,textDecoration:'none'}}>View all →</Link>
            </div>
            {!data?.recentOrders?.length ? (
              <div style={{padding:'48px 24px',textAlign:'center'}}>
                <div style={{fontSize:40,marginBottom:12}}>📋</div>
                <h3 style={{fontSize:16,fontWeight:700,color:'#1A2F4E',marginBottom:8}}>No services yet</h3>
                <p style={{fontSize:14,color:'#64748B',marginBottom:20}}>Browse our services and get started — our team handles everything.</p>
                <Link to="/services" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'0 20px',height:44,borderRadius:9,background:'#1D6FE0',color:'#fff',fontWeight:700,fontSize:14,textDecoration:'none'}}>Browse Services →</Link>
              </div>
            ) : (
              <div>
                {data.recentOrders.map((order, i) => (
                  <Link key={order._id} to={`/user/services/${order._id}`} style={{display:'block',padding:'16px 20px',textDecoration:'none',color:'inherit',borderBottom:i<data.recentOrders.length-1?'1px solid #F1F5F9':'none',transition:'background .12s'}} onMouseEnter={e=>e.currentTarget.style.background='#F8FAFC'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12,marginBottom:6}}>
                      <div>
                        <div style={{fontSize:14,fontWeight:700,color:'#1A2F4E',marginBottom:2}}>{order.serviceTitle}</div>
                        {order.assignedProfessional?.name && <div style={{fontSize:12,color:'#64748B'}}>Handled by {order.assignedProfessional.designation?`${order.assignedProfessional.designation} `:''}{order.assignedProfessional.name}</div>}
                      </div>
                      <StatusBadge status={order.status}/>
                    </div>
                    <div style={{fontSize:11.5,color:'#94A3B8',marginTop:4}}>
                      Started {new Date(order.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                      {order.expectedBy&&` · Expected by ${new Date(order.expectedBy).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}`}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div style={{background:'linear-gradient(135deg,#1A2F4E,#1D6FE0)',borderRadius:16,padding:'24px',color:'#fff'}}>
            <h3 style={{fontSize:15,fontWeight:700,marginBottom:6,color:'#fff'}}>Need something?</h3>
            <p style={{fontSize:13,color:'rgba(255,255,255,.7)',marginBottom:18}}>Start a new service, ask our AI, or talk to an expert directly.</p>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <Link to="/services" style={{display:'inline-flex',alignItems:'center',gap:7,padding:'0 18px',height:40,borderRadius:8,background:'#F97316',color:'#fff',fontWeight:700,fontSize:13,textDecoration:'none'}}>Browse Services →</Link>
              <Link to="/ai" style={{display:'inline-flex',alignItems:'center',gap:7,padding:'0 18px',height:40,borderRadius:8,background:'rgba(255,255,255,.12)',color:'#fff',fontWeight:700,fontSize:13,textDecoration:'none',border:'1px solid rgba(255,255,255,.2)'}}>Ask AI</Link>
              <Link to="/company/contact" style={{display:'inline-flex',alignItems:'center',gap:7,padding:'0 18px',height:40,borderRadius:8,background:'rgba(255,255,255,.12)',color:'#fff',fontWeight:700,fontSize:13,textDecoration:'none',border:'1px solid rgba(255,255,255,.2)'}}>Talk to Expert</Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
