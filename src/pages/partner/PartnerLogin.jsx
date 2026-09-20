import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { usePartnerAuth } from '../../context/PartnerAuthContext'
import logoImg from '../../assets/launcherdesk-logo-transparent.png'

const S = `
.pl-wrap {
  min-height:100vh;background:var(--bg);display:flex;align-items:center;justify-content:center;padding:32px 16px;
}
.pl-card {
  width:100%;max-width:440px;background:#fff;border-radius:20px;border:1.5px solid var(--line);
  padding:44px 40px;box-shadow:0 8px 40px rgba(13,31,60,.10);
}
.pl-logo { display:flex;align-items:center;margin-bottom:32px; }
.pl-logo img { height:44px;width:auto;display:block; }
.pl-title { font-size:24px;font-weight:900;color:var(--navy);margin-bottom:6px; }
.pl-sub   { font-size:14px;color:var(--text-2);margin-bottom:28px; }
.pl-label { font-size:12.5px;font-weight:600;color:#374151;display:block;margin-bottom:6px; }
.pl-input {
  width:100%;height:46px;border:1.5px solid #E2E8F0;border-radius:9px;padding:0 14px;
  font-size:14px;color:var(--navy);outline:none;font-family:inherit;
  transition:border-color .15s;background:#F8FAFC;box-sizing:border-box;
}
.pl-input:focus { border-color:#1D6FE0;background:#fff;box-shadow:0 0 0 3px rgba(29,111,224,.1); }
.pl-field { margin-bottom:18px; }
.pl-btn {
  width:100%;height:50px;border-radius:11px;background:#1D6FE0;color:#fff;
  font-weight:800;font-size:15px;border:0;cursor:pointer;font-family:inherit;
  transition:all .15s;box-shadow:0 6px 20px rgba(29,111,224,.3);margin-top:4px;
}
.pl-btn:hover { background:#0F52C0;transform:translateY(-1px); }
.pl-btn:disabled { opacity:.6;cursor:not-allowed;transform:none; }
.pl-err {
  background:#FEF2F2;border:1px solid #FECACA;border-radius:9px;
  padding:11px 14px;font-size:13px;color:#DC2626;margin-bottom:16px;
}
.pl-footer { margin-top:24px;text-align:center;font-size:13px;color:var(--text-2); }
.pl-footer a { color:#1D6FE0;font-weight:600;text-decoration:none; }
.pl-footer a:hover { text-decoration:underline; }
.pl-divider { height:1px;background:var(--line);margin:20px 0; }
`

export default function PartnerLogin() {
  const { login, loading, error } = usePartnerAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(form.email, form.password)
    if (ok) navigate('/partner/dashboard')
  }

  return (
    <div className="pl-wrap">
      <style>{S}</style>
      <div className="pl-card">
        <div className="pl-logo">
          <img src={logoImg} alt="LauncherDesk" />
        </div>

        <div className="pl-title">Partner Login</div>
        <div className="pl-sub">Sign in to your partner dashboard</div>

        {error && <div className="pl-err">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="pl-field">
            <label className="pl-label">Business Email</label>
            <input
              className="pl-input" type="email" required
              placeholder="you@yourcompany.com"
              value={form.email} onChange={e => set('email', e.target.value)}
            />
          </div>
          <div className="pl-field">
            <label className="pl-label">Password</label>
            <input
              className="pl-input" type="password" required
              placeholder="••••••••"
              value={form.password} onChange={e => set('password', e.target.value)}
            />
          </div>
          <button className="pl-btn" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <div className="pl-divider" />
        <div className="pl-footer">
          Not a partner yet?{' '}
          <Link to="/partner-register">Apply to join →</Link>
        </div>
        <div className="pl-footer" style={{ marginTop: 10 }}>
          <Link to="/">← Back to LauncherDesk</Link>
        </div>
      </div>
    </div>
  )
}