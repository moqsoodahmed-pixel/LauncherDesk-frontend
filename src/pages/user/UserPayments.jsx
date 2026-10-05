import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import SEO from '../../components/SEO'

export default function UserPayments() {
  const { apiFetch } = useUserAuth()
  const [payments, setPayments] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  useEffect(() => {
    apiFetch('/user/payments').then(d=>setPayments(d.data||[])).catch(e=>setError(e.message)).finally(()=>setLoading(false))
  }, [apiFetch])

  const total = payments.reduce((sum,p)=>sum+(p.amountRupees||0),0)

  return (
    <>
      <SEO title="My Payments" noindex={true}/>
      <div className="ud-page-head"><div><h1 className="ud-h1">Payments</h1><p style={{fontSize:13,color:'#64748B'}}>{payments.length} transaction{payments.length!==1?'s':''}</p></div></div>
      {total>0&&<div style={{background:'linear-gradient(135deg,#1A2F4E,#1D6FE0)',borderRadius:16,padding:'24px',color:'#fff',marginBottom:20}}><div style={{fontSize:12,fontWeight:600,color:'rgba(255,255,255,.6)',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:6}}>Total spent</div><div className="ud-break" style={{fontSize:'clamp(26px,8vw,36px)',fontWeight:900,letterSpacing:'-.03em',lineHeight:1.15}}>₹{total.toLocaleString('en-IN')}</div><div style={{fontSize:12.5,color:'rgba(255,255,255,.6)',marginTop:4}}>Across {payments.length} payment{payments.length!==1?'s':''}</div></div>}
      {error&&<div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:10,padding:'12px 16px',fontSize:14,color:'#DC2626',marginBottom:16}}>{error}</div>}
      {loading ? (
        <div style={{textAlign:'center',padding:'60px 0',color:'#94A3B8'}}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style><div style={{width:32,height:32,border:'3px solid #E2E8F0',borderTopColor:'#1D6FE0',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 12px'}}/></div>
      ) : !payments.length ? (
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #E8EEF6',padding:'60px 24px',textAlign:'center'}}>
          <div style={{fontSize:48,marginBottom:14}}>💳</div>
          <h3 style={{fontSize:16,fontWeight:700,color:'#1A2F4E',marginBottom:8}}>No payments yet</h3>
          <p style={{fontSize:14,color:'#64748B',maxWidth:320,margin:'0 auto 20px'}}>Payment history will appear here once you've completed a transaction.</p>
          <Link to="/services" style={{display:'inline-flex',padding:'0 20px',height:42,borderRadius:9,background:'#1D6FE0',color:'#fff',fontWeight:700,fontSize:13,textDecoration:'none',alignItems:'center'}}>Browse Services</Link>
        </div>
      ) : (
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #E8EEF6',overflow:'hidden'}}>
          <div className="ud-pay-cards">
            {payments.map(p=>(
              <div key={p._id} className="ud-pay-card">
                <div className="ud-row-between">
                  <div className="ud-break" style={{fontSize:14,fontWeight:700,color:'#1A2F4E'}}>{p.serviceTitle||p.serviceSlug}</div>
                  <div style={{fontSize:14,fontWeight:800,color:'#1A2F4E',whiteSpace:'nowrap'}}>₹{p.amountRupees?.toLocaleString('en-IN')}</div>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,flexWrap:'wrap',marginTop:8}}>
                  <div style={{fontSize:12,color:'#64748B'}}>
                    {new Date(p.verifiedAt||p.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                    {p.razorpayPaymentId && <span className="ud-break" style={{display:'block',fontSize:11,color:'#94A3B8',fontFamily:'monospace',marginTop:2}}>{p.razorpayPaymentId}</span>}
                  </div>
                  <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11.5,fontWeight:600,padding:'3px 10px',borderRadius:99,background:'#F0FDF4',color:'#16A34A'}}><span style={{width:6,height:6,borderRadius:'50%',background:'#16A34A'}}/>Paid</span>
                </div>
              </div>
            ))}
          </div>
          <div className="ud-pay-table" style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:560}}>
              <thead><tr style={{background:'#F8FAFC',borderBottom:'1px solid #E8EEF6'}}>{['Service','Amount','Date','Payment ID','Status'].map(h=><th key={h} scope="col" style={{padding:'12px 16px',textAlign:'left',fontSize:12,fontWeight:700,color:'#64748B',textTransform:'uppercase',letterSpacing:'.06em',whiteSpace:'nowrap'}}>{h}</th>)}</tr></thead>
              <tbody>
                {payments.map((p,i)=>(
                  <tr key={p._id} style={{borderBottom:i<payments.length-1?'1px solid #F1F5F9':'none'}}>
                    <td style={{padding:'14px 16px',fontSize:13.5,color:'#1A2F4E',fontWeight:600,maxWidth:240}}><div style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.serviceTitle||p.serviceSlug}</div></td>
                    <td style={{padding:'14px 16px',fontSize:14,fontWeight:700,color:'#1A2F4E',whiteSpace:'nowrap'}}>₹{p.amountRupees?.toLocaleString('en-IN')}</td>
                    <td style={{padding:'14px 16px',fontSize:13,color:'#64748B',whiteSpace:'nowrap'}}>{new Date(p.verifiedAt||p.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</td>
                    <td style={{padding:'14px 16px',fontSize:11.5,color:'#94A3B8',fontFamily:'monospace'}}>{p.razorpayPaymentId?p.razorpayPaymentId.slice(0,16)+'…':'—'}</td>
                    <td style={{padding:'14px 16px'}}><span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11.5,fontWeight:600,padding:'3px 10px',borderRadius:99,background:'#F0FDF4',color:'#16A34A'}}><span style={{width:6,height:6,borderRadius:'50%',background:'#16A34A'}}/>Paid</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p style={{fontSize:12,color:'#94A3B8',marginTop:16,textAlign:'center'}}>For payment queries, contact <a href="mailto:support@launcherdesk.com" style={{color:'#1D6FE0'}}>support@launcherdesk.com</a></p>
    </>
  )
}