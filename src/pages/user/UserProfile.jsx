import { useState, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import SEO from '../../components/SEO'

export default function UserProfile() {
  const { apiFetch, user, logout } = useUserAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/user/profile').then(d=>setProfile(d.data)).catch(()=>setProfile(user)).finally(()=>setLoading(false))
  }, [apiFetch, user])

  const initials = (name='') => name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)||'?'
  const data = profile || user

  return (
    <>
      <SEO title="My Profile" noindex={true}/>
      <div className="ud-page-head"><div><h1 className="ud-h1">Profile</h1><p style={{fontSize:13,color:'#64748B'}}>Your account information</p></div></div>
      {loading ? (
        <div style={{textAlign:'center',padding:'60px 0',color:'#94A3B8'}}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style><div style={{width:32,height:32,border:'3px solid #E2E8F0',borderTopColor:'#1D6FE0',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto'}}/></div>
      ) : (
        <div style={{maxWidth:640}}>
          <div className="ud-card ud-pad" style={{marginBottom:16,display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
            <div style={{width:64,height:64,borderRadius:'50%',background:'linear-gradient(135deg,#1A2F4E,#1D6FE0)',color:'#fff',fontSize:22,fontWeight:700,display:'grid',placeItems:'center',flexShrink:0}}>{initials(data?.name)}</div>
            <div className="ud-break" style={{minWidth:0,flex:'1 1 180px'}}>
              <div style={{fontSize:18,fontWeight:800,color:'#1A2F4E'}}>{data?.name}</div>
              <div style={{fontSize:13,color:'#64748B',marginTop:2}}>{data?.email}</div>
              <div style={{fontSize:12,color:'#94A3B8',marginTop:4}}>Member since {data?.createdAt?new Date(data.createdAt).toLocaleDateString('en-IN',{month:'long',year:'numeric'}):'—'}</div>
            </div>
          </div>
          <div className="ud-card ud-pad" style={{marginBottom:16}}>
            <h2 style={{fontSize:14,fontWeight:700,color:'#1A2F4E',marginBottom:16}}>Account Details</h2>
            {[{label:'Full Name',value:data?.name},{label:'Email',value:data?.email},{label:'Phone',value:data?.phone||'—'},{label:'Account Type',value:'Customer'}].map(row=>(
              <div key={row.label} className="ud-kv">
                <span className="ud-kv-label">{row.label}</span>
                <span className="ud-kv-value">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="ud-card ud-pad">
            <h2 style={{fontSize:14,fontWeight:700,color:'#1A2F4E',marginBottom:14}}>Looking for support?</h2>
            <p style={{fontSize:13,color:'#64748B',marginBottom:16,lineHeight:1.6}}>To update your profile details or for account queries, contact our support team.</p>
            <div className="ud-btn-row">
              <a href="mailto:support@launcherdesk.com" style={{display:'inline-flex',alignItems:'center',padding:'0 18px',height:40,borderRadius:9,background:'#EEF2FF',color:'#1D6FE0',fontWeight:700,fontSize:13,textDecoration:'none'}}>Email Support</a>
              <button onClick={logout} style={{display:'inline-flex',alignItems:'center',padding:'0 18px',height:40,borderRadius:9,background:'#FEF2F2',color:'#DC2626',fontWeight:700,fontSize:13,border:'none',cursor:'pointer',fontFamily:'inherit'}}>Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}