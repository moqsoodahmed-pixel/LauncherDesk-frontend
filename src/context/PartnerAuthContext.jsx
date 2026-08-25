import { createContext, useContext, useState, useCallback } from 'react'

const PartnerAuthContext = createContext(null)

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function PartnerAuthProvider({ children }) {
  const [token,   setToken]   = useState(() => localStorage.getItem('ld_partner_token') || null)
  const [partner, setPartner] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ld_partner_data')) } catch { return null }
  })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true); setError('')
    try {
      const res  = await fetch(`${API}/partners/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Invalid credentials')
      localStorage.setItem('ld_partner_token', data.token)
      localStorage.setItem('ld_partner_data',  JSON.stringify(data.partner))
      setToken(data.token)
      setPartner(data.partner)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const loginWithToken = useCallback((token, partnerData) => {
    localStorage.setItem('ld_partner_token', token)
    localStorage.setItem('ld_partner_data',  JSON.stringify(partnerData))
    setToken(token)
    setPartner(partnerData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ld_partner_token')
    localStorage.removeItem('ld_partner_data')
    setToken(null)
    setPartner(null)
  }, [])

  const apiFetch = useCallback(async (path, opts = {}) => {
    const res = await fetch(`${API}${path}`, {
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
    <PartnerAuthContext.Provider value={{
      token, partner, login, loginWithToken, logout,
      apiFetch, error, loading,
      isLoggedIn: !!token,
    }}>
      {children}
    </PartnerAuthContext.Provider>
  )
}

export const usePartnerAuth = () => useContext(PartnerAuthContext)
