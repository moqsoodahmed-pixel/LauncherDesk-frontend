/**
 * src/pages/user/ResetPasswordPage.jsx
 * Handles the reset link from the email — user sets new password here
 * Route: /user/reset-password?token=xxx&email=xxx
 */
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import logoImg from '../../assets/launcherdesk-logo-transparent.png'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function EyeIcon({ open }) {
  return open
    ? <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
    : <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
}

const S = `
.rp-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(155deg,#070E22 0%,#0D1C44 45%,#152B60 100%);padding:36px 20px}
.rp-card{background:#fff;border-radius:24px;width:100%;max-width:440px;padding:40px 36px;box-shadow:0 32px 80px -16px rgba(0,0,0,.5)}
.rp-field{display:flex;flex-direction:column;gap:6px;margin-bottom:18px}
.rp-field label{font-size:11.5px;font-weight:800;color:#334155;text-transform:uppercase;letter-spacing:.06em}
.rp-field input{border:1.5px solid #E2E8F0;border-radius:11px;padding:0 44px 0 16px;height:48px;font-size:14.5px;color:#0F172A;outline:none;font-family:inherit;transition:border-color .18s;background:#F8FAFC;width:100%;box-sizing:border-box}
.rp-field input:focus{border-color:#1D6FE0;box-shadow:0 0 0 3px rgba(29,111,224,.16);background:#fff}
.rp-pw-wrap{position:relative}
.rp-pw-toggle{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:transparent;border:none;color:#94A3B8;cursor:pointer;padding:4px;display:flex;align-items:center}
.rp-pw-toggle:hover{color:#475569}
.rp-btn{width:100%;height:50px;background:linear-gradient(135deg,#1D6FE0,#0F52C0);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;transition:all .18s;box-shadow:0 8px 24px -4px rgba(29,111,224,.45);display:flex;align-items:center;justify-content:center;gap:8px}
.rp-btn:hover{transform:translateY(-1.5px);box-shadow:0 14px 32px -4px rgba(29,111,224,.55)}
.rp-btn:disabled{opacity:.65;cursor:not-allowed;transform:none}
.rp-err{background:#FEF2F2;border:1px solid #FECACA;border-radius:11px;padding:12px 16px;font-size:13px;color:#DC2626;margin-bottom:18px;display:flex;align-items:center;gap:8px}
.rp-ok{background:#F0FDF4;border:1px solid #BBF7D0;border-radius:11px;padding:12px 16px;font-size:13px;color:#15803D;margin-bottom:18px;display:flex;align-items:center;gap:8px}
.rp-strength{height:4px;border-radius:2px;margin-top:6px;transition:all .3s}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:480px){.rp-card{padding:32px 20px}}
`

export default function ResetPasswordPage() {
  const [params]   = useSearchParams()
  const navigate   = useNavigate()
  const { loginWithToken } = useUserAuth()

  const token = params.get('token') || ''
  const email = params.get('email') || ''

  const [password,        setPassword]        = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPw,          setShowPw]          = useState(false)
  const [showConfirm,     setShowConfirm]     = useState(false)
  const [loading,         setLoading]         = useState(false)
  const [err,             setErr]             = useState('')
  const [success,         setSuccess]         = useState(false)

  useEffect(() => {
    if (!token || !email) setErr('Invalid or missing reset link. Please request a new one.')
  }, [token, email])

  // Password strength
  function strength(pw) {
    if (!pw) return { score: 0, label: '', color: '#E2E8F0' }
    let s = 0
    if (pw.length >= 8) s++
    if (/[A-Z]/.test(pw)) s++
    if (/[0-9]/.test(pw)) s++
    if (/[^A-Za-z0-9]/.test(pw)) s++
    const map = [
      { label: '', color: '#E2E8F0' },
      { label: 'Weak', color: '#EF4444' },
      { label: 'Fair', color: '#F59E0B' },
      { label: 'Good', color: '#3B82F6' },
      { label: 'Strong', color: '#22C55E' },
    ]
    return { score: s, ...map[s] }
  }

  const pwStrength = strength(password)

  async function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    if (password.length < 6)           return setErr('Password must be at least 6 characters')
    if (password !== confirmPassword)  return setErr('Passwords do not match')
    if (!token || !email)              return setErr('Invalid reset link. Please request a new one.')

    setLoading(true)
    try {
      const res  = await fetch(`${API}/auth/reset-password`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ token, email, password }),
      })
      const data = await res.json()
      if (!data.success) { setErr(data.message || 'Reset failed. Please try again.'); return }

      setSuccess(true)
      // Auto-login and redirect after 2 seconds
      loginWithToken(data.token, data.user)
      setTimeout(() => navigate('/user/dashboard', { replace: true }), 2000)
    } catch {
      setErr('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rp-wrap">
      <style>{S}</style>
      <div className="rp-card">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Link to="/"><img src={logoImg} alt="LauncherDesk" style={{ height: 36 }} /></Link>
        </div>

        <h1 style={{ textAlign: 'center', fontSize: 22, fontWeight: 900, color: '#0A2540', marginBottom: 6 }}>
          {success ? 'Password reset!' : 'Set new password'}
        </h1>
        <p style={{ textAlign: 'center', fontSize: 13.5, color: '#64748B', marginBottom: 24 }}>
          {success ? 'Redirecting you to your dashboard…' : `Resetting password for ${email}`}
        </p>

        {err && (
          <div className="rp-err">
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>{err}</span>
          </div>
        )}

        {success && (
          <div className="rp-ok">
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>Password updated! Taking you to your dashboard…</span>
          </div>
        )}

        {!success && !err.includes('Invalid or missing') && (
          <form onSubmit={handleSubmit} noValidate>
            <div className="rp-field">
              <label htmlFor="rp-pw">New Password</label>
              <div className="rp-pw-wrap">
                <input
                  id="rp-pw"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  autoComplete="new-password"
                />
                <button type="button" className="rp-pw-toggle" onClick={() => setShowPw(p => !p)} tabIndex="-1">
                  <EyeIcon open={showPw} />
                </button>
              </div>
              {password && (
                <div>
                  <div className="rp-strength" style={{ width: `${pwStrength.score * 25}%`, background: pwStrength.color }} />
                  <span style={{ fontSize: 11, color: pwStrength.color, fontWeight: 600 }}>{pwStrength.label}</span>
                </div>
              )}
            </div>

            <div className="rp-field">
              <label htmlFor="rp-confirm">Confirm Password</label>
              <div className="rp-pw-wrap">
                <input
                  id="rp-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  autoComplete="new-password"
                />
                <button type="button" className="rp-pw-toggle" onClick={() => setShowConfirm(p => !p)} tabIndex="-1">
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="rp-btn">
              {loading
                ? <><span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} /><span>Resetting…</span></>
                : <span>Reset Password →</span>
              }
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', fontSize: 13, color: '#64748B', marginTop: 20 }}>
          <Link to="/user/login" style={{ color: '#1D6FE0', fontWeight: 600, textDecoration: 'none' }}>← Back to Login</Link>
        </p>
      </div>
    </div>
  )
}
