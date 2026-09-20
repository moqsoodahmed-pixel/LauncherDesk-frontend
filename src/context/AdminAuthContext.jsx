import { createContext, useContext, useState, useCallback } from 'react'

const AdminAuthContext = createContext(null)

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function AdminAuthProvider({ children }) {
  const [token, setToken]   = useState(() => localStorage.getItem('ld_admin_token') || null)
  const [user,  setUser]    = useState(() => { try { return JSON.parse(localStorage.getItem('ld_admin_user')) } catch { return null } })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (username, password) => {
    setLoading(true)
    setError('')
    // Map username → email (admin username "moqsood" → stored email)
    const email = username === 'moqsood' ? 'moqsood@launcherdesk.com' : username
    try {
      const res  = await fetch(`${API_BASE}/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Invalid credentials')
      if (data.user.role !== 'admin') throw new Error('Access denied — admin only')
      localStorage.setItem('ld_admin_token', data.token)
      localStorage.setItem('ld_admin_user',  JSON.stringify(data.user))
      setToken(data.token)
      setUser(data.user)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ld_admin_token')
    localStorage.removeItem('ld_admin_user')
    setToken(null)
    setUser(null)
  }, [])

  /* Authenticated fetch helper */
  const apiFetch = useCallback(async (path, opts = {}) => {
    const res = await fetch(`${API_BASE}${path}`, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${token}`,
        ...(opts.headers || {}),
      },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'API error')
    return data
  }, [token])

  return (
    <AdminAuthContext.Provider value={{ token, user, login, logout, apiFetch, error, loading, isLoggedIn: !!token }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => useContext(AdminAuthContext)
