import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import logoImg from '../../assets/launcherdesk-logo-transparent.png'

export default function AdminLogin() {
  const { login, error, loading } = useAdminAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(username, password)
    if (ok) navigate('/admin/dashboard', { replace: true })
  }

  return (
    <div style={styles.bg}>
      {/* Left brand panel */}
      <div style={styles.left}>
        <div style={styles.leftInner}>
          <img src={logoImg} alt="LauncherDesk" style={{height:52,width:'auto',display:'block',marginBottom:8}} />
          <p style={styles.brandSub}>Admin Control Panel</p>

          <div style={styles.featureList}>
            {[
              ['📊','Real-time dashboard with revenue & lead analytics'],
              ['👥','Full customer & enquiry CRM'],
              ['📋','Task management & follow-ups'],
              ['🏢','Office setup leads pipeline'],
              ['💼','Service performance reports'],
            ].map(([icon, text]) => (
              <div key={text} style={styles.featureItem}>
                <span style={{fontSize:20}}>{icon}</span>
                <span style={{fontSize:14,color:'#9ab5d4',lineHeight:1.5}}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login form */}
      <div style={styles.right}>
        <div style={styles.card}>
          <div style={{textAlign:'center',marginBottom:32}}>
            <img src={logoImg} alt="LauncherDesk" style={{height:44,width:'auto',display:'block',margin:'0 auto 16px'}} />
            <h2 style={{fontSize:24,fontWeight:800,color:'#1C2434',letterSpacing:'-.02em'}}>Sign in to Admin</h2>
            <p style={{fontSize:13.5,color:'#64748B',marginTop:6}}>LauncherDesk Admin Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:18}}>
            <div style={styles.field}>
              <label style={styles.label}>Username</label>
              <div style={{position:'relative'}}>
                <span style={styles.fieldIcon}>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  type="text" required value={username} onChange={e=>setUsername(e.target.value)}
                  placeholder="Enter username" style={styles.input} autoComplete="username"
                />
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <div style={{position:'relative'}}>
                <span style={styles.fieldIcon}>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPw?'text':'password'} required value={password} onChange={e=>setPassword(e.target.value)}
                  placeholder="Enter password" style={styles.input} autoComplete="current-password"
                />
                <button type="button" onClick={()=>setShowPw(s=>!s)} style={styles.eyeBtn}>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {showPw
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>

            {error && (
              <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:8,padding:'10px 14px',fontSize:13.5,color:'#DC2626',display:'flex',alignItems:'center',gap:8}}>
                <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              height:46,borderRadius:10,background:'linear-gradient(135deg,#3B5BDB,#4F74EE)',
              color:'#fff',fontWeight:700,fontSize:15,border:0,cursor:loading?'not-allowed':'pointer',
              opacity:loading?.75:1,display:'flex',alignItems:'center',justifyContent:'center',gap:8,
              transition:'all .2s',boxShadow:'0 4px 14px rgba(59,91,219,.35)',fontFamily:'inherit'
            }}>
              {loading ? (
                <>
                  <svg style={{animation:'spin 1s linear infinite'}} viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Signing in…
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div style={{marginTop:24,padding:'14px',background:'#F8FAFC',borderRadius:10,border:'1px solid #E2E8F0'}}>
            <div style={{fontSize:11.5,fontWeight:700,color:'#64748B',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Demo Credentials</div>
            <div style={{display:'flex',flexDirection:'column',gap:4}}>
              <div style={{fontSize:13,color:'#475569'}}><b>Username:</b> moqsood</div>
              <div style={{fontSize:13,color:'#475569'}}><b>Password:</b> moqsood@123</div>
            </div>
          </div>

          <p style={{textAlign:'center',marginTop:20,fontSize:12.5,color:'#94A3B8'}}>
            © {new Date().getFullYear()} LauncherDesk · Restricted Access
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  )
}

const styles = {
  bg: { display:'flex',minHeight:'100vh',fontFamily:"'Inter',system-ui,sans-serif" },
  left: { flex:'0 0 440px',background:'linear-gradient(160deg,#080F1E 0%,#0D1F3C 50%,#162B52 100%)',display:'flex',alignItems:'center',padding:'48px',position:'relative',overflow:'hidden' },
  leftInner: { position:'relative',zIndex:1 },
  right: { flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',background:'#F1F5F9' },
  card: { background:'#fff',borderRadius:16,padding:'40px 36px',width:'100%',maxWidth:420,boxShadow:'0 4px 24px rgba(0,0,0,.08)',border:'1px solid #E2E8F0' },
  logo: { width:52,height:52,borderRadius:14,background:'rgba(255,255,255,.1)',display:'grid',placeItems:'center' },
  brand: { fontSize:30,fontWeight:800,color:'#fff',letterSpacing:'-.03em',marginTop:16 },
  brandSub: { fontSize:14,color:'#6da8e0',marginTop:6,fontWeight:500 },
  featureList: { display:'flex',flexDirection:'column',gap:16,marginTop:40 },
  featureItem: { display:'flex',alignItems:'flex-start',gap:12 },
  field: { display:'flex',flexDirection:'column',gap:6 },
  label: { fontSize:13,fontWeight:600,color:'#374151' },
  fieldIcon: { position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',display:'flex',alignItems:'center' },
  input: { width:'100%',height:44,border:'1.5px solid #E2E8F0',borderRadius:9,padding:'0 40px',fontSize:14,color:'#1C2434',outline:'none',fontFamily:'inherit',transition:'border-color .15s',background:'#F8FAFC' },
  eyeBtn: { position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:0,cursor:'pointer',display:'flex',alignItems:'center' },
}
