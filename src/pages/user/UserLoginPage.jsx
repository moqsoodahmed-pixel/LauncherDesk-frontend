import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import logoImg from '../../assets/launcherdesk-logo-transparent.png'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
const MICROSOFT_CLIENT_ID = import.meta.env.VITE_MICROSOFT_CLIENT_ID || ''

const S = `
.ul-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(1000px 600px at 50% -10%, rgba(59,143,239,.32), transparent 70%),
              radial-gradient(800px 500px at 15% 100%, rgba(29,111,224,.22), transparent 60%),
              radial-gradient(600px 400px at 85% 90%, rgba(29,93,184,.12), transparent 60%),
              linear-gradient(155deg, #070E22 0%, #0D1C44 45%, #152B60 100%);
  padding: 36px 20px;
  position: relative;
  overflow: hidden;
}
.ul-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: 44px 44px;
}
.ul-ambient-orb-1 {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59,143,239,.18) 0%, transparent 70%);
  top: 10%;
  left: 8%;
  pointer-events: none;
  filter: blur(40px);
}
.ul-ambient-orb-2 {
  position: absolute;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(29,93,184,.08) 0%, transparent 70%);
  bottom: 12%;
  right: 10%;
  pointer-events: none;
  filter: blur(40px);
}

.ul-card {
  background: #FFFFFF;
  border-radius: 24px;
  width: 100%;
  max-width: 460px;
  padding: 40px 36px;
  box-shadow: 0 32px 80px -16px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.1);
  position: relative;
  z-index: 2;
  animation: cardFadeUp .3s cubic-bezier(.16,1,.3,1);
}
@keyframes cardFadeUp {
  from { opacity: 0; transform: translateY(14px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.ul-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  background: #F1F5F9;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
}
.ul-tab {
  padding: 10px;
  border: none;
  border-radius: 9px;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all .18s cubic-bezier(.2,.7,.3,1);
  background: transparent;
  color: #64748B;
}
.ul-tab.active {
  background: #FFFFFF;
  color: #1D6FE0;
  box-shadow: 0 2px 8px rgba(15,23,42,.08);
}
.ul-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
}
.ul-field label {
  font-size: 11.5px;
  font-weight: 800;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: .06em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.ul-field input {
  border: 1.5px solid #E2E8F0;
  border-radius: 11px;
  padding: 0 16px;
  height: 48px;
  font-size: 14.5px;
  color: #0F172A;
  outline: none;
  font-family: inherit;
  transition: border-color .18s, box-shadow .18s, background .18s;
  background: #F8FAFC;
  box-sizing: border-box;
  width: 100%;
}
.ul-field input:focus {
  border-color: #1D6FE0;
  box-shadow: 0 0 0 3.5px rgba(29,111,224,.16);
  background: #FFFFFF;
}

/* Password wrapper with eye icon */
.ul-pw-wrap {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}
.ul-pw-wrap input {
  padding-right: 44px !important;
}
.ul-pw-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #94A3B8;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color .15s ease;
  outline: none;
}
.ul-pw-toggle:hover {
  color: #475569;
}

.ul-opt-text {
  font-weight: 400;
  text-transform: none;
  font-size: 11px;
  color: #94A3B8;
  margin-left: 6px;
  letter-spacing: normal;
}

.ul-agree-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 16px 0 20px;
  font-size: 12.5px;
  color: #334155;
  line-height: 1.45;
}
.ul-agree-row input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  border-radius: 4px;
  border: 1.5px solid #CBD5E1;
  accent-color: #1D6FE0;
  cursor: pointer;
  flex-shrink: 0;
}
.ul-agree-row label {
  cursor: pointer;
  font-size: 12.5px;
  color: #334155;
  font-weight: 500;
  user-select: none;
}
.ul-agree-row a {
  color: #1D6FE0;
  text-decoration: none;
  font-weight: 600;
}
.ul-agree-row a:hover {
  text-decoration: underline;
}

.ul-submit {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #1D6FE0 0%, #0F52C0 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
  margin-top: 4px;
  transition: all .18s cubic-bezier(.2,.7,.3,1);
  box-shadow: 0 8px 24px -4px rgba(29,111,224,.45);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.ul-submit:hover {
  transform: translateY(-1.5px);
  box-shadow: 0 14px 32px -4px rgba(29,111,224,.55);
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
}
.ul-submit:active {
  transform: translateY(0.5px) scale(.985);
}
.ul-submit:disabled {
  opacity: .65;
  cursor: not-allowed;
  transform: none;
}
.ul-err {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 11px;
  padding: 12px 16px;
  font-size: 13px;
  color: #DC2626;
  margin-bottom: 18px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ul-divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #94A3B8;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .08em;
  margin: 22px 0 16px;
  gap: 12px;
}
.ul-divider::before, .ul-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E2E8F0;
}

.ul-or-divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #94A3B8;
  font-size: 12px;
  font-weight: 500;
  margin: 24px 0 18px;
  gap: 14px;
}
.ul-or-divider::before, .ul-or-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E2E8F0;
}

.ul-partner-row {
  text-align: center;
  font-size: 13px;
  color: #475569;
  margin-bottom: 12px;
}
.ul-partner-link {
  color: #1D6FE0;
  font-weight: 700;
  text-decoration: none;
  margin-left: 4px;
  transition: color .15s;
}
.ul-partner-link:hover {
  text-decoration: underline;
}

.ul-back-row {
  text-align: center;
  font-size: 12.5px;
  color: #64748B;
  margin-top: 6px;
}
.ul-back-link {
  color: #64748B;
  text-decoration: none;
  transition: color .15s ease;
}
.ul-back-link:hover {
  color: #1D6FE0;
}

.ul-social-section {
  text-align: center;
  margin-bottom: 6px;
}
.ul-social-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}
.ul-social-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 1;
  height: 48px;
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 12px;
  cursor: pointer;
  transition: all .18s cubic-bezier(.2,.7,.3,1);
  outline: none;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 700;
  color: #334155;
  box-shadow: 0 1px 3px rgba(15,23,42,.04);
}
.ul-social-icon-btn:hover {
  background: #F8FAFC;
  border-color: #CBD5E1;
  transform: translateY(-1.5px);
  box-shadow: 0 8px 20px rgba(15,23,42,.08);
}
.ul-social-icon-btn:active {
  transform: scale(.97);
}
.ul-social-icon-btn:disabled {
  opacity: .5;
  cursor: not-allowed;
  transform: none;
}
.ul-social-icon-btn:focus-visible {
  border-color: #1D6FE0;
  box-shadow: 0 0 0 3px rgba(29,111,224,.2);
}
@media(max-width: 480px) {
  .ul-card { padding: 32px 22px; border-radius: 20px; }
  .ul-wrap { padding: 20px 14px; }
}
@keyframes spin { to { transform: rotate(360deg); } }
`

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  )
}

// ── Helper: send social token to backend and log user in ─────────────────────
async function socialLogin(provider, payload, setLocalErr, loginWithToken) {
  try {
    const body = typeof payload === 'string' ? { token: payload } : payload
    const res = await fetch(`${API}/auth/${provider}-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!data.success) {
      setLocalErr(data.message || `${provider} login failed`)
      return
    }
    loginWithToken(data.token, data.user)
  } catch (err) {
    setLocalErr(`${provider} login failed: ${err?.message || 'Please try again.'}`)
  }
}

export default function UserLoginPage() {
  const { login, register, loginWithToken, error, setError, loading, isLoggedIn } = useUserAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.startsWith('/user') ? location.state.from : '/user/dashboard'
  const [tab, setTab] = useState(location.state?.tab || 'login')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [localErr, setLocalErr] = useState('')
  const [socialLoading, setSocialLoading] = useState('')

  useEffect(() => { if (isLoggedIn) navigate(from, { replace: true }) }, [isLoggedIn, from, navigate])

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  // ── Form submission ──────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()
    setLocalErr('')
    if (setError) setError('')
    if (tab === 'login') {
      const res = await login(form.email, form.password)
      if (!res?.success) setLocalErr(res?.message || 'Invalid credentials')
    } else {
      // Sign Up validation
      if (!form.name.trim()) {
        setLocalErr('Please enter your full name')
        return
      }
      if (!form.email.trim() && !form.phone.trim()) {
        setLocalErr('Please provide an email address or phone number')
        return
      }
      if (form.password.length < 6) {
        setLocalErr('Password must be at least 6 characters')
        return
      }
      if (form.password !== form.confirmPassword) {
        setLocalErr('Passwords do not match')
        return
      }
      if (!form.agreedToTerms) {
        setLocalErr('Please agree to the Terms and Conditions and Privacy Policy')
        return
      }

      const regEmail = form.email.trim() || `${form.phone.replace(/[^0-9]/g, '')}@launcherdesk.user`
      const res = await register(form.name.trim(), regEmail, form.password, form.phone.trim())
      if (!res?.success) setLocalErr(res?.message || 'Registration failed')
    }
  }

  // ── Google Login (Preserved for Login tab) ──────────────────────────────────
  const handleGoogleLogin = useCallback(() => {
    if (!GOOGLE_CLIENT_ID) {
      setLocalErr('Google login is not configured. Please contact support.')
      return
    }
    setSocialLoading('google')
    setLocalErr('')

    let cleanup = () => {}

    const startGoogleOAuth = () => {
      try {
        if (!window.google?.accounts?.oauth2) {
          setSocialLoading('')
          setLocalErr('Google Sign-In is not ready. Please try again.')
          return
        }

        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'openid email profile',
          callback: async (tokenResponse) => {
            cleanup()
            if (tokenResponse?.error) {
              setSocialLoading('')
              if (tokenResponse.error !== 'user_cancelled' && tokenResponse.error !== 'access_denied') {
                setLocalErr('Google login was cancelled or failed.')
              }
              return
            }

            if (tokenResponse?.access_token) {
              try {
                await socialLogin('google', { accessToken: tokenResponse.access_token }, setLocalErr, loginWithToken)
              } catch {
                setLocalErr('Google login failed. Please try again.')
              }
            }
            setSocialLoading('')
          },
          error_callback: () => {
            cleanup()
            setSocialLoading('')
          },
        })

        const onWindowFocus = () => {
          setTimeout(() => {
            setSocialLoading(prev => (prev === 'google' ? '' : prev))
            window.removeEventListener('focus', onWindowFocus)
          }, 1500)
        }
        window.addEventListener('focus', onWindowFocus)
        cleanup = () => {
          window.removeEventListener('focus', onWindowFocus)
        }

        tokenClient.requestAccessToken({ prompt: 'select_account' })
      } catch {
        cleanup()
        setSocialLoading('')
        setLocalErr('Failed to launch Google Sign-In. Please try again.')
      }
    }

    const scriptId = 'google-gis-script'
    if (window.google?.accounts?.oauth2) {
      startGoogleOAuth()
    } else {
      let script = document.getElementById(scriptId)
      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        script.onload = () => startGoogleOAuth()
        script.onerror = () => {
          setLocalErr('Could not load Google sign-in. Check your internet connection.')
          setSocialLoading('')
        }
        document.head.appendChild(script)
      } else {
        const prev = script.onload
        script.onload = () => {
          if (typeof prev === 'function') prev()
          startGoogleOAuth()
        }
      }
    }
  }, [loginWithToken])

  // ── Microsoft Login (Preserved for Login tab) ───────────────────────────────
  const handleMicrosoftLogin = useCallback(async () => {
    if (!MICROSOFT_CLIENT_ID) {
      setLocalErr('Microsoft login is not configured yet. Please configure VITE_MICROSOFT_CLIENT_ID or use Google / Email sign-in.')
      return
    }
    setSocialLoading('microsoft')
    setLocalErr('')

    const scriptId = 'msal-browser-script'
    const doLogin = async () => {
      try {
        const msalInstance = new window.msal.PublicClientApplication({
          auth: {
            clientId: MICROSOFT_CLIENT_ID,
            authority: 'https://login.microsoftonline.com/common',
            redirectUri: window.location.origin,
          },
          cache: { cacheLocation: 'sessionStorage' },
        })

        if (typeof msalInstance.initialize === 'function') {
          await msalInstance.initialize()
        }

        const result = await msalInstance.loginPopup({
          scopes: ['openid', 'profile', 'email', 'User.Read'],
          prompt: 'select_account',
        })

        await socialLogin('microsoft', result.idToken, setLocalErr, loginWithToken)
      } catch (err) {
        if (err?.errorCode !== 'user_cancelled') {
          setLocalErr(err?.message || 'Microsoft login failed. Please try again.')
        }
      } finally {
        setSocialLoading('')
      }
    }

    if (window.msal?.PublicClientApplication) {
      await doLogin()
    } else {
      let script = document.getElementById(scriptId)
      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://alcdn.msauth.net/browser/2.38.3/js/msal-browser.min.js'
        script.async = true
        script.defer = true
        script.onload = () => doLogin()
        script.onerror = () => {
          setLocalErr('Could not load Microsoft sign-in. Check your internet connection.')
          setSocialLoading('')
        }
        document.head.appendChild(script)
      } else {
        script.onload = () => doLogin()
      }
    }
  }, [loginWithToken])

  const err = localErr || error

  return (
    <div className="ul-wrap">
      <style>{S}</style>

      {/* Ambient glowing background orbs */}
      <div className="ul-ambient-orb-1" aria-hidden="true" />
      <div className="ul-ambient-orb-2" aria-hidden="true" />

      <div className="ul-card">

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Link to="/" style={{ display: 'inline-block' }}>
            <img src={logoImg} alt="LauncherDesk — home" style={{ height: 38, width: 'auto' }} />
          </Link>
        </div>

        <h1 style={{ textAlign: 'center', fontSize: 22, fontWeight: 900, color: '#0A2540', marginBottom: 6, letterSpacing: '-.02em' }}>
          {tab === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p style={{ textAlign: 'center', fontSize: 13.5, color: '#64748B', marginBottom: 22 }}>
          {tab === 'login' ? 'Sign in to access your services, orders & dashboard' : 'Sign up to get started with LauncherDesk'}
        </p>

        <div className="ul-tabs" role="tablist" aria-label="Login or sign up">
          <button
            role="tab"
            aria-selected={tab === 'login'}
            className={`ul-tab${tab === 'login' ? ' active' : ''}`}
            onClick={() => { setTab('login'); setLocalErr('') }}
          >
            Log In
          </button>
          <button
            role="tab"
            aria-selected={tab === 'register'}
            className={`ul-tab${tab === 'register' ? ' active' : ''}`}
            onClick={() => { setTab('register'); setLocalErr('') }}
          >
            Sign Up
          </button>
        </div>

        {err && (
          <div className="ul-err" role="alert" aria-live="polite">
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{err}</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            1. SIGN UP TAB (Matches Reference Image Exactly)
           ══════════════════════════════════════════════════════════════════════ */}
        {tab === 'register' ? (
          <form onSubmit={handleSubmit} noValidate>
            {/* FULL NAME */}
            <div className="ul-field">
              <label htmlFor="reg-name">FULL NAME</label>
              <input
                id="reg-name"
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder="Your full name"
                required
                aria-required="true"
                autoComplete="name"
              />
            </div>

            {/* EMAIL ADDRESS */}
            <div className="ul-field">
              <label htmlFor="reg-email">
                EMAIL ADDRESS
                <span className="ul-opt-text">(Optional if phone provided)</span>
              </label>
              <input
                id="reg-email"
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* PHONE NUMBER */}
            <div className="ul-field">
              <label htmlFor="reg-phone">
                PHONE NUMBER
                <span className="ul-opt-text">(Optional if email provided)</span>
              </label>
              <input
                id="reg-phone"
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="+91 98765 43210"
                autoComplete="tel"
              />
            </div>

            {/* PASSWORD */}
            <div className="ul-field">
              <label htmlFor="reg-password">PASSWORD</label>
              <div className="ul-pw-wrap">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="Min. 6 characters"
                  required
                  aria-required="true"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="ul-pw-toggle"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex="-1"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="ul-field">
              <label htmlFor="reg-confirm-password">CONFIRM PASSWORD</label>
              <div className="ul-pw-wrap">
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={set('confirmPassword')}
                  placeholder="Re-enter your password"
                  required
                  aria-required="true"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="ul-pw-toggle"
                  onClick={() => setShowConfirmPassword(p => !p)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  tabIndex="-1"
                >
                  <EyeIcon open={showConfirmPassword} />
                </button>
              </div>
            </div>

            {/* Terms & Privacy checkbox */}
            <div className="ul-agree-row">
              <input
                type="checkbox"
                id="reg-agree"
                checked={form.agreedToTerms}
                onChange={e => setForm(f => ({ ...f, agreedToTerms: e.target.checked }))}
              />
              <label htmlFor="reg-agree">
                I agree to the <Link to="/legal/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</Link> and <Link to="/legal/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="ul-submit"
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />
                  <span>Please wait…</span>
                </>
              ) : (
                <span>Create Account →</span>
              )}
            </button>

            {/* Divider */}
            <div className="ul-or-divider" aria-hidden="true">
              <span>or</span>
            </div>

            {/* Partner link */}
            <p className="ul-partner-row">
              Are you a partner? <Link to="/partner/login" className="ul-partner-link">Partner Login →</Link>
            </p>

            {/* Back to home */}
            <p className="ul-back-row">
              <Link to="/" className="ul-back-link">
                ← Back to home
              </Link>
            </p>
          </form>
        ) : (
          /* ══════════════════════════════════════════════════════════════════════
             2. LOG IN TAB (100% Preserved & Untouched)
             ══════════════════════════════════════════════════════════════════════ */
          <>
            <form onSubmit={handleSubmit} noValidate>
              <div className="ul-field">
                <label htmlFor="ul-email">Email Address *</label>
                <input
                  id="ul-email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@company.com"
                  required
                  aria-required="true"
                  autoComplete="email"
                />
              </div>
              <div className="ul-field">
                <label htmlFor="ul-password">Password *</label>
                <input
                  id="ul-password"
                  type="password"
                  value={form.password}
                  onChange={set('password')}
                  placeholder="Enter your password"
                  required
                  aria-required="true"
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !!socialLoading}
                className="ul-submit"
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />
                    <span>Please wait…</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </>
                )}
              </button>
            </form>

            {/* Divider & Social login for Log In tab */}
            <div className="ul-divider" aria-hidden="true"><span>OR CONTINUE WITH</span></div>

            <div className="ul-social-section">
              <div className="ul-social-row" aria-label="Social sign-in options">
                <div id="google-btn-container" style={{ display: 'none' }} />

                <button
                  type="button"
                  className="ul-social-icon-btn"
                  onClick={handleGoogleLogin}
                  disabled={!!socialLoading}
                  aria-label="Continue with Google"
                  title="Continue with Google"
                >
                  {socialLoading === 'google' ? (
                    <span style={{ width: 18, height: 18, border: '2px solid #E2E8F0', borderTopColor: '#4285F4', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                      </svg>
                      <span>Google</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="ul-social-icon-btn"
                  onClick={handleMicrosoftLogin}
                  disabled={!!socialLoading}
                  aria-label="Continue with Microsoft"
                  title="Continue with Microsoft"
                >
                  {socialLoading === 'microsoft' ? (
                    <span style={{ width: 18, height: 18, border: '2px solid #E2E8F0', borderTopColor: '#05a6f0', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />
                  ) : (
                    <>
                      <svg viewBox="0 0 23 23" width={17} height={17} aria-hidden="true">
                        <path fill="#f35325" d="M1 1h10v10H1z" />
                        <path fill="#81bc06" d="M12 1h10v10H12z" />
                        <path fill="#05a6f0" d="M1 12h10v10H1z" />
                        <path fill="#ffba08" d="M12 12h10v10H12z" />
                      </svg>
                      <span>Microsoft</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: 13, color: '#64748B', marginTop: 22 }}>
              <Link to="/" style={{ color: '#64748B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'color .15s' }} onMouseEnter={e => e.currentTarget.style.color = '#1D6FE0'} onMouseLeave={e => e.currentTarget.style.color = '#64748B'}>
                ← Back to LauncherDesk
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}