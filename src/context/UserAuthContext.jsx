import { createContext, useContext, useState, useCallback } from 'react'

const UserAuthContext = createContext(null)
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function UserAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('ld_user_token') || null)
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('ld_user_data')) } catch { return null }
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
      localStorage.setItem('ld_user_token', data.token)
      localStorage.setItem('ld_user_data',  JSON.stringify(data.user))
      setToken(data.token); setUser(data.user)
      return { success: true }
    } catch (err) {
      setError(err.message); return { success: false, message: err.message }
    } finally { setLoading(false) }
  }, [])

  const register = useCallback(async (name, email, password, phone) => {
    setLoading(true); setError('')
    try {
      const res  = await fetch(`${API}/auth/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Registration failed')
      localStorage.setItem('ld_user_token', data.token)
      localStorage.setItem('ld_user_data',  JSON.stringify(data.user))
      setToken(data.token); setUser(data.user)
      return { success: true }
    } catch (err) {
      setError(err.message); return { success: false, message: err.message }
    } finally { setLoading(false) }
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

  return (
    <UserAuthContext.Provider value={{
      token, user, login, register, logout, apiFetch,
      error, setError, loading, isLoggedIn: !!token,
    }}>
      {children}
    </UserAuthContext.Provider>
  )
}

export const useUserAuth = () => useContext(UserAuthContext)