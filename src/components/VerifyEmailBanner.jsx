import { useState, useEffect, useRef } from 'react'
import { useUserAuth } from '../context/UserAuthContext'

/**
 * Persistent "please verify your email" banner + OTP modal.
 * Wires straight into the backend's OTP engine:
 *   POST /auth/otp/send    → { success, message }
 *   POST /auth/otp/verify  { otp } → { success, emailVerified }
 */
export default function VerifyEmailBanner() {
  const { user, apiFetch, refreshMe } = useUserAuth()
  const [open, setOpen]       = useState(false)
  const [digits, setDigits]   = useState(['', '', '', '', '', ''])
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError]     = useState('')
  const [notice, setNotice]   = useState('')
  const [cooldown, setCooldown] = useState(0)
  const inputs = useRef([])

  useEffect(() => {
    if (!cooldown) return
    const t = setInterval(() => setCooldown(c => (c > 0 ? c - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  if (!user || user.emailVerified) return null

  const sendOtp = async () => {
    setSending(true); setError(''); setNotice('')
    try {
      const r = await apiFetch('/auth/otp/send', { method: 'POST' })
      setNotice(r.message || 'Verification code sent to your email.')
      setCooldown(60)
      setOpen(true)
      setTimeout(() => inputs.current[0]?.focus(), 50)
    } catch (e) { setError(e.message || 'Could not send the code. Try again in a moment.') }
    finally { setSending(false) }
  }

  const setDigit = (i, v) => {
    if (!/^[0-9]?$/.test(v)) return
    const next = [...digits]; next[i] = v; setDigits(next)
    if (v && i < 5) inputs.current[i + 1]?.focus()
  }
  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputs.current[i - 1]?.focus()
  }
  const onPaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!text) return
    e.preventDefault()
    setDigits(text.padEnd(6, '').split('').slice(0, 6))
    inputs.current[Math.min(text.length, 5)]?.focus()
  }

  const verify = async () => {
    const otp = digits.join('')
    if (otp.length !== 6) { setError('Enter the full 6-digit code.'); return }
    setVerifying(true); setError('')
    try {
      await apiFetch('/auth/otp/verify', { method: 'POST', body: JSON.stringify({ otp }) })
      await refreshMe()
      setOpen(false)
    } catch (e) { setError(e.message || 'That code didn\'t work — check and try again.') }
    finally { setVerifying(false) }
  }

  return (
    <>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
        background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '12px 18px', marginBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#92400E' }}>
          <span style={{ fontSize: 18 }}>✉️</span>
          <span><strong>Verify your email</strong> — so you never miss an order, payment or document update.</span>
        </div>
        <button onClick={sendOtp} disabled={sending} style={{
          height: 34, padding: '0 16px', borderRadius: 8, border: 'none', background: '#D97706', color: '#fff',
          fontWeight: 700, fontSize: 12.5, cursor: sending ? 'default' : 'pointer', opacity: sending ? 0.7 : 1, flexShrink: 0,
        }}>{sending ? 'Sending…' : 'Verify now'}</button>
      </div>

      {open && (
        <div onClick={e => { if (e.target === e.currentTarget) setOpen(false) }} style={{
          position: 'fixed', inset: 0, background: 'rgba(10,18,33,.55)', backdropFilter: 'blur(3px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 400, padding: '30px 28px', textAlign: 'center' }}>
            <div style={{ fontSize: 34, marginBottom: 6 }}>📧</div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1A2F4E', marginBottom: 6 }}>Enter verification code</h2>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 22 }}>We sent a 6-digit code to <strong>{user.email}</strong>.</p>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }} onPaste={onPaste}>
              {digits.map((d, i) => (
                <input key={i} ref={el => inputs.current[i] = el} value={d} inputMode="numeric" maxLength={1}
                  onChange={e => setDigit(i, e.target.value)} onKeyDown={e => onKeyDown(i, e)}
                  style={{
                    width: 42, height: 50, textAlign: 'center', fontSize: 20, fontWeight: 700, borderRadius: 10,
                    border: '1.5px solid #E2E8F0', outline: 'none', color: '#1A2F4E',
                  }} />
              ))}
            </div>

            {notice && !error && <p style={{ fontSize: 12.5, color: '#16A34A', marginBottom: 12 }}>{notice}</p>}
            {error && <p style={{ fontSize: 12.5, color: '#DC2626', marginBottom: 12 }}>{error}</p>}

            <button onClick={verify} disabled={verifying} style={{
              width: '100%', height: 46, borderRadius: 10, border: 'none', background: '#1D6FE0', color: '#fff',
              fontWeight: 700, fontSize: 14.5, cursor: verifying ? 'default' : 'pointer', opacity: verifying ? 0.7 : 1, marginBottom: 12,
            }}>{verifying ? 'Verifying…' : 'Verify email'}</button>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={sendOtp} disabled={cooldown > 0 || sending} style={{
                background: 'none', border: 'none', color: cooldown > 0 ? '#94A3B8' : '#1D6FE0', fontWeight: 600,
                cursor: cooldown > 0 ? 'default' : 'pointer', fontFamily: 'inherit',
              }}>{cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
