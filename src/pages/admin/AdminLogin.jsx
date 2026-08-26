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
    <div className="al-bg">
      <div className="al-left">
        <div className="al-left-inner">
          <img src={logoImg} alt="LauncherDesk" className="al-logo-img" />
          <p className="al-brand-sub">Admin Control Panel</p>
          <div className="al-features">
            {[
              ['📊','Real-time dashboard with lead analytics'],
              ['👥','Full customer & enquiry CRM'],
              ['📋','Task management & follow-ups'],
              ['🏢','Office setup leads pipeline'],
              ['💼','Service performance reports'],
            ].map(([icon, text]) => (
              <div key={text} className="al-feature-item">
                <span style={{fontSize:20,flexShrink:0}}>{icon}</span>
                <span className="al-feature-text">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="al-right">
        <div className="al-card">
          <div className="al-card-header">
            <img src={logoImg} alt="LauncherDesk" className="al-card-logo" />
            <h2 className="al-title">Sign in to Admin</h2>
            <p className="al-subtitle">LauncherDesk Admin Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="al-form">
            <div className="al-field">
              <label className="al-label">Username</label>
              <div className="al-input-wrap">
                <span className="al-field-icon">
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input type="text" required value={username} onChange={e=>setUsername(e.target.value)}
                  placeholder="Enter username" className="al-input" autoComplete="username" />
              </div>
            </div>

            <div className="al-field">
              <label className="al-label">Password</label>
              <div className="al-input-wrap">
                <span className="al-field-icon">
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input type={showPw?'text':'password'} required value={password} onChange={e=>setPassword(e.target.value)}
                  placeholder="Enter password" className="al-input" autoComplete="current-password" />
                <button type="button" onClick={()=>setShowPw(s=>!s)} className="al-eye-btn" aria-label="Toggle password">
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
              <div className="al-error">
                <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="al-submit-btn">
              {loading ? (
                <><svg className="al-spin" viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Signing in…</>
              ) : (
                <><svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>Sign In</>
              )}
            </button>
          </form>

          <p className="al-footer">© {new Date().getFullYear()} LauncherDesk · Restricted Access</p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes al-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .al-bg{display:flex;min-height:100vh;min-height:100dvh;font-family:'Inter',system-ui,sans-serif}
        .al-left{flex:0 0 420px;background:linear-gradient(160deg,#080F1E 0%,#0D1F3C 50%,#162B52 100%);display:flex;align-items:center;padding:48px}
        .al-left-inner{width:100%}
        .al-logo-img{height:48px;width:auto;display:block;margin-bottom:10px}
        .al-brand-sub{font-size:14px;color:#6da8e0;font-weight:500}
        .al-features{display:flex;flex-direction:column;gap:16px;margin-top:40px}
        .al-feature-item{display:flex;align-items:flex-start;gap:12px}
        .al-feature-text{font-size:14px;color:#9ab5d4;line-height:1.5}
        .al-right{flex:1;display:flex;align-items:center;justify-content:center;padding:32px 20px;background:#F1F5F9}
        .al-card{background:#fff;border-radius:16px;padding:40px 36px;width:100%;max-width:420px;box-shadow:0 4px 24px rgba(0,0,0,.08);border:1px solid #E2E8F0}
        .al-card-header{text-align:center;margin-bottom:28px}
        .al-card-logo{height:40px;width:auto;display:block;margin:0 auto 16px}
        .al-title{font-size:22px;font-weight:800;color:#1C2434;letter-spacing:-.02em}
        .al-subtitle{font-size:13.5px;color:#64748B;margin-top:6px}
        .al-form{display:flex;flex-direction:column;gap:16px}
        .al-field{display:flex;flex-direction:column;gap:6px}
        .al-label{font-size:13px;font-weight:600;color:#374151}
        .al-input-wrap{position:relative}
        .al-field-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);display:flex;align-items:center;pointer-events:none}
        .al-input{width:100%;height:44px;border:1.5px solid #E2E8F0;border-radius:9px;padding:0 40px;font-size:14px;color:#1C2434;outline:none;font-family:inherit;transition:border-color .15s;background:#F8FAFC}
        .al-input:focus{border-color:#3B5BDB;background:#fff;box-shadow:0 0 0 3px rgba(59,91,219,.1)}
        .al-eye-btn{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:0;cursor:pointer;display:flex;align-items:center;padding:4px}
        .al-error{background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:10px 14px;font-size:13.5px;color:#DC2626;display:flex;align-items:center;gap:8px}
        .al-submit-btn{height:46px;border-radius:10px;background:linear-gradient(135deg,#3B5BDB,#4F74EE);color:#fff;font-weight:700;font-size:15px;border:0;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;box-shadow:0 4px 14px rgba(59,91,219,.35);font-family:inherit;width:100%}
        .al-submit-btn:disabled{opacity:.7;cursor:not-allowed}
        .al-submit-btn:not(:disabled):hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(59,91,219,.4)}
        .al-spin{animation:al-spin 1s linear infinite}
        .al-footer{text-align:center;margin-top:20px;font-size:12px;color:#94A3B8}
        @media(max-width:900px){
          .al-left{flex:0 0 300px;padding:32px}
          .al-features{margin-top:24px;gap:12px}
          .al-feature-text{font-size:13px}
        }
        @media(max-width:640px){
          .al-left{display:none}
          .al-right{padding:20px 16px;align-items:flex-start;padding-top:48px}
          .al-card{padding:28px 20px;border-radius:14px}
          .al-card-logo{height:36px}
          .al-title{font-size:20px}
          .al-input{font-size:16px}
          .al-submit-btn{height:50px}
        }
      `}</style>
    </div>
  )
}