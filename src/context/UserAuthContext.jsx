import { createContext, useContext, useState, useCallback } from 'react'

const UserAuthContext = createContext(null)
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// If the live site was built without VITE_API_URL it silently calls http://localhost:5000,
// which fails (or makes Chrome ask for "local network" permission) on every visitor's machine.
const IS_LOCAL_PAGE = typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
const API_MISCONFIGURED = !IS_LOCAL_PAGE && /\/\/(localhost|127\.0\.0\.1)[:/]/.test(API)
if (API_MISCONFIGURED) {
  console.error(`[LauncherDesk] VITE_API_URL is not set for this build, so the app is calling ${API}. Set VITE_API_URL to your backend URL (e.g. https://<your-backend>/api) in the hosting build settings and redeploy.`)
}
const REQUEST_TIMEOUT_MS = 20000

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
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Invalid credentials')
      // The backend decides the role and workspace. Only customers get a customer session here;
      // every other role's session is opened by the login page in that role's own context
      // (Portal: in-memory token + httpOnly refresh cookie; partner/sales/admin: their stores).
      if (data.userType !== 'portal' && data.role === 'user') {
        localStorage.setItem('ld_user_token', data.token)
        localStorage.setItem('ld_user_data', JSON.stringify(data.user))
        setToken(data.token); setUser(data.user)
      }
      return { ...data, success: true }
    } catch (err) {
      setError(err.message); return { success: false, message: err.message }
    } finally { setLoading(false) }
  }, [])

  const register = useCallback(async (name, email, password, phone) => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, phone }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Registration failed')
      if (data.userType !== 'portal' && data.role === 'user') {
        localStorage.setItem('ld_user_token', data.token)
        localStorage.setItem('ld_user_data', JSON.stringify(data.user))
        setToken(data.token); setUser(data.user)
      }
      return { ...data, success: true }
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

  // Every portal request goes through here. It never hangs forever (timeout), copes with
  // non-JSON replies (e.g. a proxy's HTML 502 page) and signs the user out on an expired token.
  const apiFetch = useCallback(async (path, opts = {}) => {
    const { timeoutMs = REQUEST_TIMEOUT_MS, ...fetchOpts } = opts
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    let res
    try {
      res = await fetch(`${API}${path}`, {
        ...fetchOpts,
        signal: fetchOpts.signal || controller.signal,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(fetchOpts.headers || {}) },
      })
    } catch (err) {
      if (err.name === 'AbortError') throw new Error('The server is taking too long to respond. Please refresh in a moment.')
      if (API_MISCONFIGURED) throw new Error('This site is not connected to its server (API address missing from the build). Please contact support.')
      console.error(`[LauncherDesk] Network error calling ${API}${path}:`, err)
      throw new Error('Could not reach the server. Please try again in a minute.')
    } finally {
      clearTimeout(timer)
    }
    let data = {}
    try { data = await res.json() } catch { /* not JSON */ }
    if (res.status === 401) {
      localStorage.removeItem('ld_user_token'); localStorage.removeItem('ld_user_data')
      setToken(null); setUser(null)
      throw new Error(data.message || 'Your session has expired. Please sign in again.')
    }
    if (!res.ok) throw new Error(data.message || `Server error (${res.status}). Please try again shortly.`)
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