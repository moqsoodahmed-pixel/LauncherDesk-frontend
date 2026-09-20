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
      <div style={{marginBottom:24}}><h1 style={{fontSize:20,fontWeight:800,color:'#1A2F4E',marginBottom:4}}>Profile</h1><p style={{fontSize:13,color:'#64748B'}}>Your account information</p></div>
      {loading ? (
        <div style={{textAlign:'center',padding:'60px 0',color:'#94A3B8'}}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style><div style={{width:32,height:32,border:'3px solid #E2E8F0',borderTopColor:'#1D6FE0',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto'}}/></div>
      ) : (
        <div style={{maxWidth:560}}>
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #E8EEF6',padding:'28px 24px',marginBottom:16,display:'flex',alignItems:'center',gap:20}}>
            <div style={{width:64,height:64,borderRadius:'50%',background:'linear-gradient(135deg,#1A2F4E,#1D6FE0)',color:'#fff',fontSize:22,fontWeight:700,display:'grid',placeItems:'center',flexShrink:0}}>{initials(data?.name)}</div>
            <div>
              <div style={{fontSize:18,fontWeight:800,color:'#1A2F4E'}}>{data?.name}</div>
              <div style={{fontSize:13,color:'#64748B',marginTop:2}}>{data?.email}</div>
              <div style={{fontSize:12,color:'#94A3B8',marginTop:4}}>Member since {data?.createdAt?new Date(data.createdAt).toLocaleDateString('en-IN',{month:'long',year:'numeric'}):'—'}</div>
            </div>
          </div>
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #E8EEF6',padding:'20px 24px',marginBottom:16}}>
            <h2 style={{fontSize:14,fontWeight:700,color:'#1A2F4E',marginBottom:16}}>Account Details</h2>
            {[{label:'Full Name',value:data?.name},{label:'Email',value:data?.email},{label:'Phone',value:data?.phone||'—'},{label:'Account Type',value:'Customer'}].map(row=>(
              <div key={row.label} style={{display:'flex',gap:12,padding:'10px 0',borderBottom:'1px solid #F1F5F9',fontSize:13}}>
                <span style={{color:'#64748B',width:120,flexShrink:0}}>{row.label}</span>
                <span style={{fontWeight:600,color:'#1A2F4E'}}>{row.value}</span>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #E8EEF6',padding:'20px 24px'}}>
            <h2 style={{fontSize:14,fontWeight:700,color:'#1A2F4E',marginBottom:14}}>Need help?</h2>
            <p style={{fontSize:13,color:'#64748B',marginBottom:16,lineHeight:1.6}}>To update your profile details or for account queries, contact our support team.</p>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <a href="mailto:support@launcherdesk.com" style={{display:'inline-flex',alignItems:'center',padding:'0 18px',height:40,borderRadius:9,background:'#EEF2FF',color:'#1D6FE0',fontWeight:700,fontSize:13,textDecoration:'none'}}>Email Support</a>
              <button onClick={logout} style={{display:'inline-flex',alignItems:'center',padding:'0 18px',height:40,borderRadius:9,background:'#FEF2F2',color:'#DC2626',fontWeight:700,fontSize:13,border:'none',cursor:'pointer',fontFamily:'inherit'}}>Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
