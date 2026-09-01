import { createContext, useContext, useState, useCallback } from 'react'

const SalesAuthContext = createContext(null)
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function SalesAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('ld_sales_token') || null)
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('ld_sales_user')) } catch { return null }
  })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true); setError('')
    try {
      const res  = await fetch(`${API}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Invalid credentials')
      if (!['sales', 'admin'].includes(data.user.role)) throw new Error('Access denied — sales team only')
      localStorage.setItem('ld_sales_token', data.token)
      localStorage.setItem('ld_sales_user',  JSON.stringify(data.user))
      setToken(data.token); setUser(data.user)
      return true
    } catch (err) {
      setError(err.message); return false
    } finally { setLoading(false) }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ld_sales_token')
    localStorage.removeItem('ld_sales_user')
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

  return (
    <SalesAuthContext.Provider value={{ token, user, login, logout, apiFetch, error, loading, isLoggedIn: !!token }}>
      {children}
    </SalesAuthContext.Provider>
  )
}

export const useSalesAuth = () => useContext(SalesAuthContext)