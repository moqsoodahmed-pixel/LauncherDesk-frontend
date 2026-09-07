import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import logoImg from '../../assets/launcherdesk-logo-transparent.png'

const S = `
.ul-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(155deg,#04091A 0%,#0D1B6E 60%,#1A1070 100%);padding:24px}
.ul-card{background:#fff;border-radius:20px;width:100%;max-width:440px;padding:40px 36px;box-shadow:0 24px 80px rgba(0,0,0,.3)}
.ul-tabs{display:grid;grid-template-columns:1fr 1fr;gap:4px;background:#F1F5F9;border-radius:10px;padding:4px;margin-bottom:28px}
.ul-tab{padding:10px;border:none;border-radius:8px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:all .15s;background:transparent;color:#64748B}
.ul-tab.active{background:#fff;color:#1D6FE0;box-shadow:0 1px 4px rgba(0,0,0,.1)}
.ul-field{display:flex;flex-direction:column;gap:5px;margin-bottom:16px}
.ul-field label{font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.06em}
.ul-field input{border:1.5px solid #E2E8F0;border-radius:9px;padding:0 14px;height:44px;font-size:14px;color:#1C2434;outline:none;font-family:inherit;transition:border-color .15s}
.ul-field input:focus{border-color:#1D6FE0;box-shadow:0 0 0 3px rgba(29,111,224,.1)}
.ul-submit{width:100%;height:48px;background:linear-gradient(135deg,#1A2F4E,#1D6FE0);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;margin-top:8px;transition:opacity .15s}
.ul-submit:hover{opacity:.9}
.ul-submit:disabled{opacity:.6;cursor:not-allowed}
.ul-err{background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:10px 14px;font-size:13px;color:#DC2626;margin-bottom:16px}
.ul-divider{text-align:center;color:#94A3B8;font-size:13px;margin:16px 0;position:relative}
.ul-divider::before,.ul-divider::after{content:'';position:absolute;top:50%;width:42%;height:1px;background:#E2E8F0}
.ul-divider::before{left:0}.ul-divider::after{right:0}
`

export default function UserLoginPage() {
  const { login, register, error, setError, loading, isLoggedIn } = useUserAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from     = location.state?.from?.startsWith('/user') ? location.state.from : '/user/dashboard'
  const [tab, setTab]   = useState(location.state?.tab || 'login')
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'' })
  const [localErr, setLocalErr] = useState('')

  useEffect(() => { if (isLoggedIn) navigate(from, { replace: true }) }, [isLoggedIn, from, navigate])

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setLocalErr(''); if (setError) setError('')
    if (tab === 'login') {
      const res = await login(form.email, form.password)
      if (!res?.success) setLocalErr(res?.message || 'Invalid credentials')
    } else {
      if (!form.name.trim()) { setLocalErr('Name is required'); return }
      if (form.password.length < 6) { setLocalErr('Password must be at least 6 characters'); return }
      const res = await register(form.name.trim(), form.email, form.password, form.phone)
      if (!res?.success) setLocalErr(res?.message || 'Registration failed')
    }
  }

  const err = localErr || error

  return (
    <div className="ul-wrap">
      <style>{S}</style>
      <div className="ul-card">
        <div style={{textAlign:'center',marginBottom:28}}>
          <Link to="/"><img src={logoImg} alt="LauncherDesk — home" style={{height:36,width:'auto'}} /></Link>
        </div>
        <h1 style={{textAlign:'center',fontSize:22,fontWeight:800,color:'#0A2540',marginBottom:6}}>
          {tab==='login'?'Welcome back':'Create your account'}
        </h1>
        <p style={{textAlign:'center',fontSize:14,color:'#64748B',marginBottom:24}}>
          {tab==='login'?'Log in to access your services and orders':'Sign up to get started with LauncherDesk'}
        </p>
        <div className="ul-tabs" role="tablist" aria-label="Login or sign up">
          <button role="tab" aria-selected={tab==='login'} className={`ul-tab${tab==='login'?' active':''}`} onClick={()=>{setTab('login');setLocalErr('')}}>Log In</button>
          <button role="tab" aria-selected={tab==='register'} className={`ul-tab${tab==='register'?' active':''}`} onClick={()=>{setTab('register');setLocalErr('')}}>Sign Up</button>
        </div>
        {err && <div className="ul-err" role="alert" aria-live="polite">{err}</div>}
        <form onSubmit={handleSubmit} noValidate>
          {tab==='register' && (
            <>
              <div className="ul-field"><label htmlFor="ul-name">Full Name *</label><input id="ul-name" value={form.name} onChange={set('name')} placeholder="Your full name" required aria-required="true" autoComplete="name"/></div>
              <div className="ul-field"><label htmlFor="ul-phone">Phone <span style={{fontWeight:400,textTransform:'none',fontSize:11}}>(optional)</span></label><input id="ul-phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" autoComplete="tel"/></div>
            </>
          )}
          <div className="ul-field"><label htmlFor="ul-email">Email *</label><input id="ul-email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required aria-required="true" autoComplete="email"/></div>
          <div className="ul-field"><label htmlFor="ul-password">Password *</label><input id="ul-password" type="password" value={form.password} onChange={set('password')} placeholder={tab==='register'?'Min. 6 characters':'Your password'} required aria-required="true" autoComplete={tab==='login'?'current-password':'new-password'}/></div>
          <button type="submit" disabled={loading} className="ul-submit" aria-busy={loading}>
            {loading?'Please wait…':tab==='login'?'Log In →':'Create Account →'}
          </button>
        </form>
        <div className="ul-divider" aria-hidden="true">or</div>
        <p style={{textAlign:'center',fontSize:13,color:'#64748B'}}>
          Are you a partner? <Link to="/partner/login" style={{color:'#1D6FE0',fontWeight:600}}>Partner Login →</Link>
        </p>
        <p style={{textAlign:'center',fontSize:13,color:'#64748B',marginTop:8}}>
          <Link to="/" style={{color:'#94A3B8'}}>← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
