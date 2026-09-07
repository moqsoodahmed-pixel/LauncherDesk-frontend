import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation, Link } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import logoImg from '../../assets/launcherdesk-logo-transparent.png'

function Ic({ d, size=16, sw=2 }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{flex:'none'}} aria-hidden="true">{d.split('|').map((p,i)=><path key={i} d={p}/>)}</svg>
}

const NAV = [
  { label:'Overview',    path:'/user/dashboard', icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10' },
  { label:'My Services', path:'/user/services',  icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6' },
  { label:'Payments',    path:'/user/payments',  icon:'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z|M16 21V5a2 2 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
  { label:'Profile',     path:'/user/profile',   icon:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2|M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8' },
]

const CSS = `
.ud-root{display:flex;min-height:100vh;background:#F7F9FC;font-family:'Manrope',system-ui,sans-serif}
.ud-sidebar{width:240px;background:#0D1B2E;color:#fff;display:flex;flex-direction:column;flex-shrink:0;position:sticky;top:0;height:100vh;overflow-y:auto}
.ud-sidebar-brand{padding:20px 16px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,.08)}
.ud-sidebar-logo{height:28px;width:auto;max-width:140px;object-fit:contain;filter:brightness(0) invert(1)}
.ud-sidebar-nav{padding:12px 8px;flex:1}
.ud-nav-link{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:9px;color:rgba(255,255,255,.6);font-size:13.5px;font-weight:600;text-decoration:none;margin-bottom:2px;transition:background .15s,color .15s}
.ud-nav-link:hover{background:rgba(255,255,255,.07);color:#fff}
.ud-nav-link.active{background:rgba(29,111,224,.25);color:#7ecef4;border-left:3px solid #1D6FE0}
.ud-sidebar-footer{padding:12px 8px 16px;border-top:1px solid rgba(255,255,255,.08)}
.ud-logout-btn{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:9px;background:transparent;border:none;color:rgba(255,255,255,.5);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:color .15s,background .15s}
.ud-logout-btn:hover{background:rgba(239,68,68,.15);color:#F87171}
.ud-main{flex:1;display:flex;flex-direction:column;min-width:0;overflow-x:hidden}
.ud-topbar{background:#fff;border-bottom:1px solid #E8EEF6;padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:20;flex-shrink:0}
.ud-topbar-title{font-size:15px;font-weight:700;color:#1A2F4E;letter-spacing:-.01em}
.ud-topbar-user{display:flex;align-items:center;gap:10px;font-size:13px;color:#64748B}
.ud-topbar-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#1A2F4E,#1D6FE0);color:#fff;font-size:12px;font-weight:700;display:grid;place-items:center;flex-shrink:0}
.ud-content{flex:1;padding:24px;max-width:1100px}
.ud-mobile-bar{display:none;position:fixed;bottom:0;left:0;right:0;background:#0D1B2E;z-index:40;padding:8px 0 calc(8px + env(safe-area-inset-bottom));border-top:1px solid rgba(255,255,255,.1)}
.ud-mobile-bar-inner{display:flex;justify-content:space-around}
.ud-mobile-nav{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 12px;color:rgba(255,255,255,.5);font-size:10px;font-weight:600;text-decoration:none;border-radius:8px;transition:color .15s}
.ud-mobile-nav.active{color:#7ecef4}
@media(max-width:768px){
  .ud-sidebar{display:none}
  .ud-content{padding:16px;padding-bottom:80px}
  .ud-mobile-bar{display:block}
  .ud-topbar{padding:0 16px}
}
`

export default function UserLayout() {
  const { user, logout, isLoggedIn } = useUserAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoggedIn) navigate('/user/login', { replace: true, state: { from: location.pathname } })
  }, [isLoggedIn, navigate, location.pathname])

  if (!isLoggedIn) return null

  const handleLogout = () => { logout(); navigate('/', { replace: true }) }
  const initials = (name='') => name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2) || '?'
  const pageTitle = NAV.find(n => location.pathname.startsWith(n.path))?.label || 'Dashboard'

  return (
    <div className="ud-root">
      <style>{CSS}</style>
      <aside className="ud-sidebar" aria-label="Dashboard navigation">
        <div className="ud-sidebar-brand">
          <Link to="/"><img src={logoImg} alt="LauncherDesk" className="ud-sidebar-logo" /></Link>
        </div>
        <nav className="ud-sidebar-nav" aria-label="Main navigation">
          {NAV.map(item => (
            <NavLink key={item.path} to={item.path} className={({isActive})=>`ud-nav-link${isActive?' active':''}`}>
              <Ic d={item.icon}/>{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ud-sidebar-footer">
          <Link to="/services" className="ud-nav-link" style={{marginBottom:4}}>
            <Ic d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10"/>Browse Services
          </Link>
          <button onClick={handleLogout} className="ud-logout-btn">
            <Ic d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4|M16 17l5-5-5-5|M21 12H9"/>Sign Out
          </button>
        </div>
      </aside>
      <div className="ud-main">
        <header className="ud-topbar">
          <span className="ud-topbar-title">{pageTitle}</span>
          <div className="ud-topbar-user">
            <span>{user?.name || user?.email}</span>
            <div className="ud-topbar-avatar" aria-hidden="true">{initials(user?.name)}</div>
          </div>
        </header>
        <main className="ud-content"><Outlet /></main>
      </div>
      <nav className="ud-mobile-bar" aria-label="Mobile navigation">
        <div className="ud-mobile-bar-inner">
          {NAV.map(item => (
            <NavLink key={item.path} to={item.path} className={({isActive})=>`ud-mobile-nav${isActive?' active':''}`} aria-label={item.label}>
              <Ic d={item.icon} size={20}/><span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
