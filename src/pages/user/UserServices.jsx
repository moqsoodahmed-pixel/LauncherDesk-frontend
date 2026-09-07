import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import SEO from '../../components/SEO'

const STATUS_CFG = {
  received:       { label:'Received',     color:'#3B82F6', bg:'#EFF6FF' },
  'in-progress':  { label:'In Progress',  color:'#D97706', bg:'#FFFBEB' },
  'pending-docs': { label:'Docs Needed',  color:'#7C3AED', bg:'#F5F3FF' },
  processing:     { label:'Processing',   color:'#0284C7', bg:'#F0F9FF' },
  completed:      { label:'Completed',    color:'#16A34A', bg:'#F0FDF4' },
  'on-hold':      { label:'On Hold',      color:'#64748B', bg:'#F1F5F9' },
  cancelled:      { label:'Cancelled',    color:'#DC2626', bg:'#FEF2F2' },
}
const TABS = [{ value:'all',label:'All'},{ value:'in-progress',label:'Active'},{ value:'completed',label:'Completed'}]

function StatusBadge({ status }) {
  const c = STATUS_CFG[status] || { label:status, color:'#64748B', bg:'#F1F5F9' }
  return <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11.5,fontWeight:600,padding:'3px 10px',borderRadius:99,background:c.bg,color:c.color}}><span style={{width:6,height:6,borderRadius:'50%',background:c.color,flexShrink:0}}/>{c.label}</span>
}

function ProgressBar({ steps=[] }) {
  if (!steps.length) return null
  const done = steps.filter(s=>s.status==='completed').length
  const pct  = Math.round((done/steps.length)*100)
  return (
    <div style={{marginTop:10}}>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:11.5,color:'#94A3B8',marginBottom:5}}><span>{done}/{steps.length} steps</span><span>{pct}%</span></div>
      <div style={{height:5,borderRadius:99,background:'#E2E8F0'}}><div style={{height:'100%',width:`${pct}%`,background:'linear-gradient(90deg,#1D6FE0,#3B8FEF)',borderRadius:99}}/></div>
    </div>
  )
}

export default function UserServices() {
  const { apiFetch } = useUserAuth()
  const [orders, setOrders]   = useState([])
  const [total, setTotal]     = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [filter, setFilter]   = useState('all')

  useEffect(() => {
    setLoading(true)
    const p = filter!=='all' ? `?status=${filter}` : ''
    apiFetch(`/user/orders${p}`).then(d=>{setOrders(d.data||[]);setTotal(d.total||0)}).catch(e=>setError(e.message)).finally(()=>setLoading(false))
  }, [apiFetch, filter])

  return (
    <>
      <SEO title="My Services" noindex={true}/>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:12}}>
        <div>
          <h1 style={{fontSize:20,fontWeight:800,color:'#1A2F4E',marginBottom:2}}>My Services</h1>
          <p style={{fontSize:13,color:'#64748B'}}>{total} service{total!==1?'s':''} total</p>
        </div>
        <Link to="/services" style={{display:'inline-flex',alignItems:'center',gap:7,padding:'0 18px',height:40,borderRadius:9,background:'#1D6FE0',color:'#fff',fontWeight:700,fontSize:13,textDecoration:'none'}}>+ Add Service</Link>
      </div>
      <div style={{display:'flex',gap:6,marginBottom:20,background:'#F1F5F9',borderRadius:10,padding:4,width:'fit-content'}}>
        {TABS.map(tab=>(
          <button key={tab.value} onClick={()=>setFilter(tab.value)} style={{padding:'7px 16px',borderRadius:7,border:'none',cursor:'pointer',fontFamily:'inherit',fontWeight:600,fontSize:13,background:filter===tab.value?'#fff':'transparent',color:filter===tab.value?'#1A2F4E':'#64748B',boxShadow:filter===tab.value?'0 1px 4px rgba(0,0,0,.1)':'none',transition:'all .15s'}}>{tab.label}</button>
        ))}
      </div>
      {error && <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:10,padding:'12px 16px',fontSize:14,color:'#DC2626',marginBottom:16}}>{error}</div>}
      {loading ? (
        <div style={{textAlign:'center',padding:'60px 0',color:'#94A3B8'}}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style><div style={{width:32,height:32,border:'3px solid #E2E8F0',borderTopColor:'#1D6FE0',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 12px'}}/>Loading…</div>
      ) : !orders.length ? (
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #E8EEF6',padding:'60px 24px',textAlign:'center'}}>
          <div style={{fontSize:48,marginBottom:14}}>📋</div>
          <h3 style={{fontSize:18,fontWeight:700,color:'#1A2F4E',marginBottom:8}}>No services yet</h3>
          <p style={{fontSize:14,color:'#64748B',maxWidth:360,margin:'0 auto 24px'}}>Start a service and our team will handle the entire process.</p>
          <Link to="/services" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'0 22px',height:44,borderRadius:9,background:'#1D6FE0',color:'#fff',fontWeight:700,fontSize:14,textDecoration:'none'}}>Browse Services →</Link>
        </div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {orders.map(order=>(
            <Link key={order._id} to={`/user/services/${order._id}`} style={{display:'block',background:'#fff',borderRadius:14,border:'1px solid #E8EEF6',padding:'18px 20px',textDecoration:'none',color:'inherit',transition:'box-shadow .15s,border-color .15s'}} onMouseEnter={e=>{e.currentTarget.style.borderColor='#1D6FE0';e.currentTarget.style.boxShadow='0 4px 16px rgba(29,111,224,.1)'}} onMouseLeave={e=>{e.currentTarget.style.borderColor='#E8EEF6';e.currentTarget.style.boxShadow='none'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12,marginBottom:10}}>
                <div style={{flex:1,minWidth:0}}>
                  <h3 style={{fontSize:15,fontWeight:700,color:'#1A2F4E',marginBottom:3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{order.serviceTitle}</h3>
                  {order.assignedProfessional?.name ? <p style={{fontSize:12,color:'#64748B',margin:0}}>{order.assignedProfessional.designation&&`${order.assignedProfessional.designation} · `}{order.assignedProfessional.name}</p> : <p style={{fontSize:12,color:'#94A3B8',margin:0}}>Professional being assigned</p>}
                </div>
                <StatusBadge status={order.status}/>
              </div>
              <ProgressBar steps={order.steps}/>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#94A3B8',marginTop:10}}>
                <span>Started {new Date(order.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
                {order.expectedBy&&<span>Expected {new Date(order.expectedBy).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</span>}
              </div>
              {order.status==='pending-docs'&&<div style={{marginTop:10,padding:'8px 12px',borderRadius:8,background:'#F5F3FF',border:'1px solid #DDD6FE',fontSize:12.5,color:'#7C3AED',fontWeight:600}}>⚠️ Action needed — documents required. Contact us to submit.</div>}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
