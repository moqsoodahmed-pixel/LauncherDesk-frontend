import { createContext, useContext, useState, useCallback } from 'react'

const UserAuthContext = createContext(null)
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function UserAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('ld_user_token') || null)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ld_user_data')) } catch { return null }
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Invalid credentials')
      localStorage.setItem('ld_user_token', data.token)
      localStorage.setItem('ld_user_data', JSON.stringify(data.user))
      setToken(data.token); setUser(data.user)
      return { success: true }
    } catch (err) {
      setError(err.message); return { success: false, message: err.message }
    } finally { setLoading(false) }
  }, [])

  const register = useCallback(async (name, email, password, phone) => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Registration failed')
      localStorage.setItem('ld_user_token', data.token)
      localStorage.setItem('ld_user_data', JSON.stringify(data.user))
      setToken(data.token); setUser(data.user)
      return { success: true }
    } catch (err) {
      setError(err.message); return { success: false, message: err.message }
    } finally { setLoading(false) }
  }, [])

  // ── loginWithToken: used by Google / Microsoft OAuth after backend verifies token ──
  const loginWithToken = useCallback((newToken, userData) => {
    localStorage.setItem('ld_user_token', newToken)
    localStorage.setItem('ld_user_data', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ld_user_token')
    localStorage.removeItem('ld_user_data')
    setToken(null); setUser(null)
  }, [])

  const apiFetch = useCallback(async (path, opts = {}) => {
    const res = await fetch(`${API}${path}`, {
      ...opts,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(opts.headers || {}) },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'API error')
    return data
  }, [token])

  // For file uploads — do NOT force a JSON content-type, the browser sets the multipart boundary itself.
  const apiUpload = useCallback(async (path, formData) => {
    const res = await fetch(`${API}${path}`, {
      method: 'POST', body: formData, headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Upload failed')
    return data
  }, [token])

  // For downloading a file (PDF/document) that the server streams rather than returning as JSON.
  const apiDownload = useCallback(async (path, suggestedName) => {
    const res = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) {
      let msg = 'Download failed'
      try { msg = (await res.json()).message || msg } catch { /* not JSON */ }
      throw new Error(msg)
    }
    const blob = await res.blob()
    const cd = res.headers.get('Content-Disposition') || ''
    const match = /filename="?([^"]+)"?/.exec(cd)
    const filename = match?.[1] || suggestedName || 'download'
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = filename; document.body.appendChild(a); a.click()
    a.remove(); window.URL.revokeObjectURL(url)
  }, [token])

  // Re-fetch the logged-in user (e.g. after verifying OTP) so `user.emailVerified` updates everywhere.
  const refreshMe = useCallback(async () => {
    const res = await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (res.ok && data.success) { localStorage.setItem('ld_user_data', JSON.stringify(data.user)); setUser(data.user) }
    return data.user
  }, [token])

  return (
    <UserAuthContext.Provider value={{
      token, user, login, register, loginWithToken, logout, apiFetch, apiUpload, apiDownload, refreshMe,
      error, setError, loading, isLoggedIn: !!token,
    }}>
      {children}
    </UserAuthContext.Provider>
  )
}

export const useUserAuth = () => useContext(UserAuthContext)