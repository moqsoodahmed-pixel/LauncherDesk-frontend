import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import SEO from '../../components/SEO'
import DocumentChecklist from '../../components/DocumentChecklist'
import OrderTimeline from '../../components/OrderTimeline'

const STATUS_CFG = {
  received:       { label:'Received',     color:'#3B82F6', bg:'#EFF6FF' },
  'in-progress':  { label:'In Progress',  color:'#D97706', bg:'#FFFBEB' },
  'pending-docs': { label:'Docs Needed',  color:'#7C3AED', bg:'#F5F3FF' },
  processing:     { label:'Processing',   color:'#0284C7', bg:'#F0F9FF' },
  completed:      { label:'Completed',    color:'#16A34A', bg:'#F0FDF4' },
  'on-hold':      { label:'On Hold',      color:'#64748B', bg:'#F1F5F9' },
  cancelled:      { label:'Cancelled',    color:'#DC2626', bg:'#FEF2F2' },
  CREATED:                      { label:'Created',            color:'#3B82F6', bg:'#EFF6FF' },
  PAYMENT_PENDING:               { label:'Payment Pending',    color:'#D97706', bg:'#FFFBEB' },
  PAYMENT_SUCCESSFUL:            { label:'Payment Received',   color:'#16A34A', bg:'#F0FDF4' },
  PAYMENT_FAILED:                { label:'Payment Failed',     color:'#DC2626', bg:'#FEF2F2' },
  DOCUMENTS_PENDING:             { label:'Docs Needed',        color:'#7C3AED', bg:'#F5F3FF' },
  DOCUMENTS_SUBMITTED:           { label:'Docs Submitted',     color:'#0284C7', bg:'#F0F9FF' },
  DOCUMENTS_UNDER_REVIEW:        { label:'Docs Under Review',  color:'#0284C7', bg:'#F0F9FF' },
  DOCUMENT_CORRECTION_REQUIRED:  { label:'Correction Needed',  color:'#DC2626', bg:'#FEF2F2' },
  DOCUMENTS_APPROVED:            { label:'Docs Approved',      color:'#16A34A', bg:'#F0FDF4' },
  ASSIGNED:                      { label:'Assigned',           color:'#0284C7', bg:'#F0F9FF' },
  PROCESSING:                    { label:'Processing',         color:'#0284C7', bg:'#F0F9FF' },
  GOVERNMENT_PROCESSING:         { label:'With Authority',     color:'#0284C7', bg:'#F0F9FF' },
  ACTION_REQUIRED:               { label:'Action Needed',      color:'#D97706', bg:'#FFFBEB' },
  ON_HOLD:                       { label:'On Hold',            color:'#64748B', bg:'#F1F5F9' },
  COMPLETED:                     { label:'Completed',          color:'#16A34A', bg:'#F0FDF4' },
  DOCUMENTS_READY:               { label:'Docs Ready',         color:'#16A34A', bg:'#F0FDF4' },
  CANCELLED:                     { label:'Cancelled',          color:'#DC2626', bg:'#FEF2F2' },
  REFUND_INITIATED:              { label:'Refund Initiated',   color:'#D97706', bg:'#FFFBEB' },
  REFUNDED:                      { label:'Refunded',           color:'#64748B', bg:'#F1F5F9' },
  CLOSED:                        { label:'Closed',             color:'#64748B', bg:'#F1F5F9' },
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
  const needsDocuments = !['NOT_REQUIRED'].includes(order.documentStatus)
  const supportLink = `/user/support?new=1&orderId=${order._id}&subject=${encodeURIComponent(`Regarding ${order.serviceTitle} (${order.orderNumber||id})`)}`

  return (
    <>
      <SEO title={`${order.serviceTitle} — My Services`} noindex={true}/>
      <nav className="ud-crumbs" aria-label="Breadcrumb">
        <Link to="/user/dashboard" style={{color:'#1D6FE0'}}>Dashboard</Link><span>›</span>
        <Link to="/user/services" style={{color:'#1D6FE0'}}>Services</Link><span>›</span>
        <span className="ud-crumbs-current" title={order.serviceTitle}>{order.serviceTitle}</span>
      </nav>
      <div className="ud-detail-grid">
        <div>
          <div className="ud-card ud-pad" style={{marginBottom:16}}>
            <div style={{marginBottom:totalSteps>0?16:0}}>
              <h1 className="ud-h1">{order.serviceTitle}</h1>
              <div className="ud-detail-meta">
                <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11.5,fontWeight:600,padding:'3px 10px',borderRadius:99,background:cfg.bg,color:cfg.color,whiteSpace:'nowrap'}}><span style={{width:6,height:6,borderRadius:'50%',background:cfg.color}}/>{cfg.label}</span>
                {order.orderNumber && <span style={{fontSize:12,color:'#64748B',whiteSpace:'nowrap'}}>Order: {order.orderNumber}</span>}
                {!order.orderNumber && order.externalRef&&<span className="ud-break" style={{fontSize:12,color:'#64748B'}}>Ref: {order.externalRef}</span>}
              </div>
            </div>
            {totalSteps>0&&(
              <div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12.5,color:'#64748B',marginBottom:8,fontWeight:600}}><span>Progress</span><span>{completedSteps} of {totalSteps} steps</span></div>
                <div style={{height:8,borderRadius:99,background:'#E2E8F0',overflow:'hidden'}}><div style={{height:'100%',width:`${Math.round((completedSteps/totalSteps)*100)}%`,background:'linear-gradient(90deg,#1D6FE0,#3B8FEF)',borderRadius:99,transition:'width .5s'}}/></div>
              </div>
            )}
            {order.status==='ACTION_REQUIRED' && order.actionRequired?.what && (
              <div style={{marginTop:16,padding:'14px 16px',borderRadius:10,background:'#FFFBEB',border:'1px solid #FDE68A'}}>
                <p style={{fontSize:13.5,color:'#92400E',fontWeight:700,marginBottom:6}}>⚠️ Action needed from you</p>
                <p style={{fontSize:13,color:'#78350F',margin:'0 0 4px'}}><strong>What: </strong>{order.actionRequired.what}</p>
                {order.actionRequired.why && <p style={{fontSize:13,color:'#78350F',margin:'0 0 4px'}}><strong>Why: </strong>{order.actionRequired.why}</p>}
                {order.actionRequired.how && <p style={{fontSize:13,color:'#78350F',margin:'0 0 4px'}}><strong>How: </strong>{order.actionRequired.how}</p>}
                {order.actionRequired.deadline && <p style={{fontSize:12.5,color:'#92400E',margin:'6px 0 0',fontWeight:600}}>Deadline: {new Date(order.actionRequired.deadline).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</p>}
              </div>
            )}
            {order.status==='ON_HOLD' && (
              <div style={{marginTop:16,padding:'14px 16px',borderRadius:10,background:'#F1F5F9',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:13.5,color:'#334155',fontWeight:700,marginBottom:4}}>⏸ Order on hold</p>
                <p style={{fontSize:13,color:'#475569',margin:0}}>{order.holdReason || 'We\'re waiting on something to resume this order. Check the documents section below.'}</p>
              </div>
            )}
            {order.status==='pending-docs'&&<div style={{marginTop:16,padding:'12px 16px',borderRadius:10,background:'#F5F3FF',border:'1px solid #DDD6FE'}}><p style={{fontSize:13.5,color:'#7C3AED',fontWeight:600,marginBottom:4}}>⚠️ Documents required</p><p style={{fontSize:13,color:'#6D28D9',margin:0}}>See the documents section below to upload what we need.</p></div>}
          </div>

          {needsDocuments && <DocumentChecklist orderId={order._id} />}

          {order.steps?.length>0&&(
            <div className="ud-card ud-pad" style={{marginBottom:16}}>
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
                      <div style={{paddingTop:6,minWidth:0}} className="ud-break">
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

          <OrderTimeline orderId={order._id} createdAt={order.createdAt} expectedBy={order.expectedBy} completedAt={order.completedAt} />
        </div>
        <aside className="ud-detail-side">
          <div className="ud-card" style={{padding:'20px',marginBottom:14}}>
            <h3 style={{fontSize:13.5,fontWeight:700,color:'#1A2F4E',marginBottom:14}}>Your Professional</h3>
            {order.assignedProfessional?.name ? (
              <div>
                <div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#1A2F4E,#1D6FE0)',color:'#fff',fontSize:16,fontWeight:700,display:'grid',placeItems:'center',marginBottom:10}}>{order.assignedProfessional.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)}</div>
                <div style={{fontWeight:700,color:'#1A2F4E',fontSize:14}}>{order.assignedProfessional.name}</div>
                {order.assignedProfessional.designation&&<div style={{fontSize:12.5,color:'#64748B',marginTop:2}}>{order.assignedProfessional.designation}</div>}
                {order.assignedProfessional.email&&<a href={`mailto:${order.assignedProfessional.email}`} className="ud-break" style={{fontSize:12,color:'#1D6FE0',display:'block',marginTop:8}}>{order.assignedProfessional.email}</a>}
              </div>
            ) : <p style={{fontSize:13,color:'#94A3B8',margin:0}}>A professional will be assigned once your service starts.</p>}
          </div>
          {order.payment&&(
            <div className="ud-card" style={{padding:'20px',marginBottom:14}}>
              <h3 style={{fontSize:13.5,fontWeight:700,color:'#1A2F4E',marginBottom:12}}>Payment</h3>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}><span style={{color:'#64748B'}}>Amount paid</span><span style={{fontWeight:700,color:'#1A2F4E'}}>₹{order.payment.amountRupees?.toLocaleString('en-IN')}</span></div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#94A3B8',marginBottom:10}}><span>Status</span><span style={{color:'#16A34A',fontWeight:600}}>✓ Paid</span></div>
              <Link to="/user/invoices" style={{display:'block',textAlign:'center',padding:'9px',borderRadius:8,background:'#F1F5F9',color:'#1A2F4E',fontWeight:700,fontSize:12.5,textDecoration:'none'}}>View Invoice</Link>
            </div>
          )}
          <div style={{background:'linear-gradient(135deg,#1A2F4E,#1D6FE0)',borderRadius:14,padding:'20px',color:'#fff'}}>
            <h3 style={{fontSize:13.5,fontWeight:700,color:'#fff',marginBottom:8}}>Looking for support?</h3>
            <p style={{fontSize:12.5,color:'rgba(255,255,255,.7)',marginBottom:14,lineHeight:1.5}}>Raise a ticket about this order and our team will follow up by email.</p>
            <Link to={supportLink} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:7,padding:'10px',borderRadius:9,background:'#F97316',color:'#fff',fontWeight:700,fontSize:13,textDecoration:'none',marginBottom:8}}>Raise a Ticket</Link>
            <a href={`https://wa.me/918548854859?text=${encodeURIComponent(`Hi, regarding my service: ${order.serviceTitle}`)}`} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:7,padding:'10px',borderRadius:9,background:'#25D366',color:'#fff',fontWeight:700,fontSize:13,textDecoration:'none'}}>WhatsApp Us</a>
          </div>
        </aside>
      </div>
    </>
  )
}