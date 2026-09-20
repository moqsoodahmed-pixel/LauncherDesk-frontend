import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
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

export default function UserServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { apiFetch } = useUserAuth()
  const [order, setOrder]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    apiFetch(`/user/orders/${id}`).then(d=>setOrder(d.data)).catch(e=>{
      if (e.message?.includes('404')||e.message?.includes('not found')) navigate('/user/services',{replace:true})
      else setError(e.message||'Failed to load')
    }).finally(()=>setLoading(false))
  }, [apiFetch, id, navigate])

  if (loading) return <div style={{textAlign:'center',padding:'80px 0',color:'#94A3B8'}}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style><div style={{width:32,height:32,border:'3px solid #E2E8F0',borderTopColor:'#1D6FE0',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto'}}/></div>
  if (error||!order) return <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:10,padding:'20px',textAlign:'center'}}><p style={{color:'#DC2626',marginBottom:12}}>{error||'Order not found'}</p><Link to="/user/services" style={{color:'#1D6FE0',fontWeight:600}}>← Back to services</Link></div>

  const cfg = STATUS_CFG[order.status] || STATUS_CFG.received
  const completedSteps = (order.steps||[]).filter(s=>s.status==='completed').length
  const totalSteps     = (order.steps||[]).length

  return (
    <>
      <SEO title={`${order.serviceTitle} — My Services`} noindex={true}/>
      <nav style={{fontSize:13,color:'#64748B',marginBottom:20,display:'flex',alignItems:'center',gap:6}} aria-label="Breadcrumb">
        <Link to="/user/dashboard" style={{color:'#1D6FE0'}}>Dashboard</Link><span>›</span>
        <Link to="/user/services" style={{color:'#1D6FE0'}}>Services</Link><span>›</span>
        <span style={{color:'#1A2F4E',fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:200}}>{order.serviceTitle}</span>
      </nav>
      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:20,alignItems:'start'}}>
        <div>
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #E8EEF6',padding:'24px',marginBottom:16}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12,marginBottom:16,flexWrap:'wrap'}}>
              <div>
                <h1 style={{fontSize:20,fontWeight:800,color:'#1A2F4E',marginBottom:6}}>{order.serviceTitle}</h1>
                <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11.5,fontWeight:600,padding:'3px 10px',borderRadius:99,background:cfg.bg,color:cfg.color}}><span style={{width:6,height:6,borderRadius:'50%',background:cfg.color}}/>{cfg.label}</span>
                {order.externalRef&&<span style={{fontSize:12,color:'#64748B',marginLeft:10}}>Ref: {order.externalRef}</span>}
              </div>
            </div>
            {totalSteps>0&&(
              <div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12.5,color:'#64748B',marginBottom:8,fontWeight:600}}><span>Progress</span><span>{completedSteps} of {totalSteps} steps</span></div>
                <div style={{height:8,borderRadius:99,background:'#E2E8F0',overflow:'hidden'}}><div style={{height:'100%',width:`${Math.round((completedSteps/totalSteps)*100)}%`,background:'linear-gradient(90deg,#1D6FE0,#3B8FEF)',borderRadius:99,transition:'width .5s'}}/></div>
              </div>
            )}
            {order.status==='pending-docs'&&<div style={{marginTop:16,padding:'12px 16px',borderRadius:10,background:'#F5F3FF',border:'1px solid #DDD6FE'}}><p style={{fontSize:13.5,color:'#7C3AED',fontWeight:600,marginBottom:4}}>⚠️ Documents required</p><p style={{fontSize:13,color:'#6D28D9',margin:0}}>Our team needs additional documents to proceed. Please <a href={`https://wa.me/918548854859?text=Hi, regarding my service: ${order.serviceTitle}`} target="_blank" rel="noopener noreferrer" style={{color:'#7C3AED',fontWeight:600}}>WhatsApp us</a> or <Link to="/company/contact" style={{color:'#7C3AED',fontWeight:600}}>contact us</Link>.</p></div>}
          </div>
          {order.steps?.length>0&&(
            <div style={{background:'#fff',borderRadius:16,border:'1px solid #E8EEF6',padding:'24px',marginBottom:16}}>
              <h2 style={{fontSize:15,fontWeight:700,color:'#1A2F4E',marginBottom:20}}>Service Progress</h2>
              <ol style={{listStyle:'none',position:'relative',padding:0,margin:0}}>
                <div style={{position:'absolute',left:17,top:18,bottom:18,width:2,background:'#E2E8F0',zIndex:0}}/>
                {order.steps.map((step,idx)=>{
                  const isDone=step.status==='completed', isActive=step.status==='in-progress'
                  return (
                    <li key={idx} style={{display:'flex',gap:16,position:'relative',zIndex:1,marginBottom:idx<order.steps.length-1?20:0}}>
                      <div style={{width:36,height:36,borderRadius:'50%',flexShrink:0,background:isDone?'#1D6FE0':isActive?'#FFFBEB':'#F8FAFC',border:`2px solid ${isDone?'#1D6FE0':isActive?'#D97706':'#E2E8F0'}`,display:'grid',placeItems:'center'}}>
                        <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={isDone?'#fff':isActive?'#D97706':'#CBD5E1'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{(isDone?'M9 11l3 3L22 4':'M12 6v6l4 2|M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z').split('|').map((p,i)=><path key={i} d={p}/>)}</svg>
                      </div>
                      <div style={{paddingTop:6}}>
                        <div style={{fontSize:14,fontWeight:700,color:step.status==='pending'?'#94A3B8':'#1A2F4E',marginBottom:2}}>{step.title}</div>
                        {step.description&&<div style={{fontSize:13,color:'#64748B',lineHeight:1.5}}>{step.description}</div>}
                        {step.completedAt&&<div style={{fontSize:12,color:'#94A3B8',marginTop:4}}>Completed {new Date(step.completedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          )}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #E8EEF6',padding:'20px 24px'}}>
            <h2 style={{fontSize:15,fontWeight:700,color:'#1A2F4E',marginBottom:14}}>Timeline</h2>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[{label:'Service started',value:new Date(order.createdAt).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})},order.expectedBy&&{label:'Expected completion',value:new Date(order.expectedBy).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})},order.completedAt&&{label:'Completed on',value:new Date(order.completedAt).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}].filter(Boolean).map(item=>(
                <div key={item.label} style={{display:'flex',gap:12,fontSize:13}}>
                  <span style={{color:'#64748B',width:160,flexShrink:0}}>{item.label}</span>
                  <span style={{fontWeight:600,color:'#1A2F4E'}}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div style={{background:'#fff',borderRadius:14,border:'1px solid #E8EEF6',padding:'20px',marginBottom:14}}>
            <h3 style={{fontSize:13.5,fontWeight:700,color:'#1A2F4E',marginBottom:14}}>Your Professional</h3>
            {order.assignedProfessional?.name ? (
              <div>
                <div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#1A2F4E,#1D6FE0)',color:'#fff',fontSize:16,fontWeight:700,display:'grid',placeItems:'center',marginBottom:10}}>{order.assignedProfessional.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)}</div>
                <div style={{fontWeight:700,color:'#1A2F4E',fontSize:14}}>{order.assignedProfessional.name}</div>
                {order.assignedProfessional.designation&&<div style={{fontSize:12.5,color:'#64748B',marginTop:2}}>{order.assignedProfessional.designation}</div>}
                {order.assignedProfessional.email&&<a href={`mailto:${order.assignedProfessional.email}`} style={{fontSize:12,color:'#1D6FE0',display:'block',marginTop:8}}>{order.assignedProfessional.email}</a>}
              </div>
            ) : <p style={{fontSize:13,color:'#94A3B8',margin:0}}>A professional will be assigned once your service starts.</p>}
          </div>
          {order.payment&&(
            <div style={{background:'#fff',borderRadius:14,border:'1px solid #E8EEF6',padding:'20px',marginBottom:14}}>
              <h3 style={{fontSize:13.5,fontWeight:700,color:'#1A2F4E',marginBottom:12}}>Payment</h3>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}><span style={{color:'#64748B'}}>Amount paid</span><span style={{fontWeight:700,color:'#1A2F4E'}}>₹{order.payment.amountRupees?.toLocaleString('en-IN')}</span></div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#94A3B8'}}><span>Status</span><span style={{color:'#16A34A',fontWeight:600}}>✓ Paid</span></div>
            </div>
          )}
          <div style={{background:'linear-gradient(135deg,#1A2F4E,#1D6FE0)',borderRadius:14,padding:'20px',color:'#fff'}}>
            <h3 style={{fontSize:13.5,fontWeight:700,color:'#fff',marginBottom:8}}>Need help?</h3>
            <p style={{fontSize:12.5,color:'rgba(255,255,255,.7)',marginBottom:14,lineHeight:1.5}}>Contact us anytime for updates.</p>
            <a href={`https://wa.me/918548854859?text=Hi, regarding my service: ${order.serviceTitle}`} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:7,padding:'10px',borderRadius:9,background:'#25D366',color:'#fff',fontWeight:700,fontSize:13,textDecoration:'none',marginBottom:8}}>WhatsApp Us</a>
            <Link to="/company/contact" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'10px',borderRadius:9,background:'rgba(255,255,255,.12)',color:'#fff',fontWeight:700,fontSize:13,textDecoration:'none',border:'1px solid rgba(255,255,255,.2)'}}>Contact Us</Link>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="grid-template-columns:1fr 280px"]{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
