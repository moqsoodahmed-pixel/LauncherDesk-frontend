import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSalesAuth } from '../../context/SalesAuthContext'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function SalesLogin() {
  const { login, error, loading } = useSalesAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')

  // Login state
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  // Create user state
  const [form, setForm]       = useState({ name:'', email:'', password:'', phone:'', adminKey:'' })
  const [creating, setCreating] = useState(false)
  const [createErr, setCreateErr] = useState('')
  const [createOk,  setCreateOk]  = useState('')

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleLogin(e) {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate('/sales/dashboard', { replace: true })
  }

  async function handleCreate(e) {
    e.preventDefault()
    setCreateErr(''); setCreateOk('')
    if (form.password.length < 6) { setCreateErr('Password must be at least 6 characters'); return }
    if (!form.adminKey) { setCreateErr('Admin secret key is required'); return }
    setCreating(true)
    try {
      const res  = await fetch(`${API}/sales/create-user`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to create user')
      setCreateOk(`✅ Sales user "${form.name}" created successfully! They can now log in.`)
      setForm({ name:'', email:'', password:'', phone:'', adminKey:'' })
    } catch (err) {
      setCreateErr(err.message)
    } finally {
      setCreating(false)
    }
  }

  const inputStyle = { border:'1.5px solid #E2E8F0', borderRadius:9, padding:'0 14px', height:44, fontSize:14, outline:'none', fontFamily:'inherit', width:'100%', boxSizing:'border-box' }
  const labelStyle = { fontSize:12, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:'.06em', display:'block', marginBottom:5 }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(155deg,#04091A 0%,#0D1B6E 60%,#1A1070 100%)',padding:24}}>
      <div style={{background:'#fff',borderRadius:20,width:'100%',maxWidth:420,boxShadow:'0 24px 80px rgba(0,0,0,.3)',overflow:'hidden'}}>

        {/* Header */}
        <div style={{background:'linear-gradient(135deg,#1A2F4E,#1D6FE0)',padding:'28px 36px 20px',textAlign:'center'}}>
          <div style={{width:52,height:52,borderRadius:14,background:'rgba(255,255,255,.15)',display:'grid',placeItems:'center',margin:'0 auto 12px'}}>
            <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
          </div>
          <h1 style={{fontSize:20,fontWeight:800,color:'#fff',margin:0}}>Sales Team CRM</h1>
          <p style={{fontSize:13,color:'rgba(255,255,255,.7)',marginTop:4}}>LauncherDesk</p>
        </div>

        {/* Tabs */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',background:'#F8FAFC',borderBottom:'1px solid #E2E8F0'}}>
          {[['login','Sign In'],['create','Create User']].map(([key,label]) => (
            <button key={key} onClick={()=>setTab(key)} style={{padding:'13px',border:'none',background:'none',fontFamily:'inherit',fontSize:13.5,fontWeight:700,cursor:'pointer',color:tab===key?'#1D6FE0':'#64748B',borderBottom:tab===key?'2px solid #1D6FE0':'2px solid transparent',transition:'all .15s'}}>
              {label}
            </button>
          ))}
        </div>

        <div style={{padding:'24px 32px 28px'}}>

          {/* ── LOGIN TAB ── */}
          {tab === 'login' && (
            <>
              {error && <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#DC2626',marginBottom:16}}>{error}</div>}
              <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',gap:14}}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@launcherdesk.com" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password" required style={inputStyle} />
                </div>
                <button type="submit" disabled={loading} style={{height:48,background:'linear-gradient(135deg,#1A2F4E,#1D6FE0)',color:'#fff',border:'none',borderRadius:10,fontSize:15,fontWeight:700,cursor:loading?'not-allowed':'pointer',marginTop:4,fontFamily:'inherit',opacity:loading?.6:1}}>
                  {loading ? 'Signing in…' : 'Sign In →'}
                </button>
              </form>
            </>
          )}

          {/* ── CREATE USER TAB ── */}
          {tab === 'create' && (
            <>
              <p style={{fontSize:13,color:'#64748B',marginBottom:16,background:'#EFF6FF',border:'1px solid #BFDBFE',borderRadius:8,padding:'10px 12px'}}>
                ℹ️ Only admins can create sales users. You need the <strong>Admin Secret Key</strong> to proceed.
              </p>
              {createErr && <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#DC2626',marginBottom:14}}>{createErr}</div>}
              {createOk  && <div style={{background:'#F0FDF4',border:'1px solid #BBF7D0',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#166534',marginBottom:14}}>{createOk}</div>}
              <form onSubmit={handleCreate} style={{display:'flex',flexDirection:'column',gap:13}}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input value={form.name} onChange={set('name')} placeholder="e.g. Rahul Sharma" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="rahul@launcherdesk.com" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Password *</label>
                  <input type="password" value={form.password} onChange={set('password')} placeholder="Min. 6 characters" required style={inputStyle} />
                </div>
                <div>
                  <label style={{...labelStyle,color:'#B45309'}}>Admin Secret Key *</label>
                  <input type="password" value={form.adminKey} onChange={set('adminKey')} placeholder="Enter admin secret key" required style={{...inputStyle,borderColor:'#FDE68A'}} />
                </div>
                <button type="submit" disabled={creating} style={{height:48,background:'linear-gradient(135deg,#1A2F4E,#059669)',color:'#fff',border:'none',borderRadius:10,fontSize:15,fontWeight:700,cursor:creating?'not-allowed':'pointer',marginTop:4,fontFamily:'inherit',opacity:creating?.6:1}}>
                  {creating ? 'Creating…' : 'Create Sales User →'}
                </button>
              </form>
            </>
          )}

          <p style={{textAlign:'center',fontSize:12,color:'#94A3B8',marginTop:20}}>
            <a href="/" style={{color:'#94A3B8',textDecoration:'none'}}>← Back to website</a>
          </p>
        </div>
      </div>
    </div>
  )
}