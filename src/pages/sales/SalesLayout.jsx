import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation, NavLink } from 'react-router-dom'
import logoImg from '../../assets/launcherdesk-logo-transparent.png'
import { useSalesAuth } from '../../context/SalesAuthContext'

function Ic({ d, size = 17, sw = 2 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
      {d.split('|').map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

const NAV = [
  { label:'Dashboard',  path:'/sales/dashboard', icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10' },
  { label:'Leads',      path:'/sales/leads',     icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75' },
  { label:'Contacts',   path:'/sales/contacts',  icon:'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' },
  { label:'Quotes',     path:'/sales/quotes',    icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8' },
]

export default function SalesLayout() {
  const { user, logout, isLoggedIn } = useSalesAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => { if (!isLoggedIn) navigate('/sales', { replace: true }) }, [isLoggedIn])
  useEffect(() => { setMobileOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  if (!isLoggedIn) return null
  const handleLogout = () => { logout(); navigate('/sales', { replace: true }) }

  const SidebarContent = ({ isMobile = false }) => (
    <>
      <div className="sl-brand">
        <img src={logoImg} alt="LauncherDesk" style={{height:28,width:'auto',maxWidth:150,objectFit:'contain'}} />
        {isMobile && <button className="sl-collapse-btn" onClick={()=>setMobileOpen(false)}><Ic d="M18 6L6 18|M6 6l12 12" size={15}/></button>}
      </div>
      <div className="sl-section-label">SALES CRM</div>
      <div className="sl-nav-list">
        {NAV.map(n => {
          const active = location.pathname === n.path
          return (
            <NavLink key={n.path} to={n.path} style={{textDecoration:'none'}}>
              <div className={`sl-nav-item${active?' active':''}`}>
                <Ic d={n.icon} size={17}/><span>{n.label}</span>
              </div>
            </NavLink>
          )
        })}
        <div className="sl-divider"/>
        <button className="sl-nav-item sl-logout" onClick={handleLogout}>
          <Ic d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4|M16 17l5-5-5-5|M21 12H9" size={17}/><span>Logout</span>
        </button>
      </div>
      <div className="sl-user-chip">
        <div className="sl-avatar">{user?.name?.[0]||'S'}</div>
        <div>
          <div className="sl-user-name">{user?.name||'Sales'}</div>
          <div className="sl-user-role">Sales Team</div>
        </div>
      </div>
    </>
  )

  return (
    <div className="sl-shell">
      <aside className="sl-sidebar sl-desktop"><SidebarContent /></aside>
      {mobileOpen && <div className="sl-overlay" onClick={()=>setMobileOpen(false)}/>}
      <aside className={`sl-sidebar sl-mobile${mobileOpen?' open':''}`}><SidebarContent isMobile/></aside>
      <div className="sl-main">
        <header className="sl-topbar">
          <button className="sl-hamburger" onClick={()=>setMobileOpen(true)}>
            <Ic d="M3 12h18|M3 6h18|M3 18h18" size={20}/>
          </button>
          <div style={{flex:1}}/>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <a href="/" target="_blank" rel="noopener noreferrer" className="sl-icon-btn" title="View website">
              <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <div className="sl-avatar" style={{width:34,height:34,fontSize:13}}>{user?.name?.[0]||'S'}</div>
            <span style={{fontSize:13,fontWeight:600,color:'#1C2434'}}>{user?.name}</span>
          </div>
        </header>
        <main className="sl-content"><Outlet /></main>
      </div>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        .sl-shell{display:flex;height:100vh;height:100dvh;overflow:hidden;font-family:'Inter',system-ui,sans-serif;background:#F1F5F9}
        .sl-sidebar{background:#1C2434;display:flex;flex-direction:column;overflow:hidden;flex-shrink:0;width:220px}
        .sl-desktop{} 
        .sl-mobile{position:fixed;top:0;left:0;bottom:0;z-index:200;width:240px;transform:translateX(-100%);transition:transform .25s;box-shadow:4px 0 24px rgba(0,0,0,.2)}
        .sl-mobile.open{transform:translateX(0)}
        .sl-overlay{position:fixed;inset:0;z-index:199;background:rgba(0,0,0,.45)}
        .sl-brand{height:60px;display:flex;align-items:center;gap:10px;padding:0 16px;border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0}
        .sl-collapse-btn{background:rgba(255,255,255,.07);border:0;width:28px;height:28px;border-radius:7px;display:grid;place-items:center;cursor:pointer;color:#8A99AF;margin-left:auto}
        .sl-section-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#8A99AF;padding:12px 16px 4px}
        .sl-nav-list{flex:1;overflow-y:auto;padding:4px 8px}
        .sl-nav-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;margin:1px 0;color:#DEE4EE;cursor:pointer;transition:background .12s;font-size:13.5px;font-weight:500;text-decoration:none;border:0;background:none;width:100%;font-family:inherit}
        .sl-nav-item:hover{background:rgba(255,255,255,.07);color:#fff}
        .sl-nav-item.active{background:#3B5BDB;color:#fff}
        .sl-logout{color:#FF8080}.sl-logout:hover{background:rgba(255,128,128,.12)}
        .sl-divider{height:1px;background:rgba(255,255,255,.07);margin:8px 0}
        .sl-user-chip{display:flex;align-items:center;gap:10px;padding:14px 16px;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0}
        .sl-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#3B5BDB,#7C9FFF);display:grid;place-items:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}
        .sl-user-name{font-size:13px;font-weight:700;color:#fff}
        .sl-user-role{font-size:11px;color:#6da8e0;margin-top:1px}
        .sl-main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}
        .sl-topbar{height:60px;background:#fff;border-bottom:1px solid #E2E8F0;display:flex;align-items:center;padding:0 20px;gap:12px;flex-shrink:0}
        .sl-hamburger{display:none;background:none;border:0;cursor:pointer;color:#64748B;padding:4px}
        .sl-icon-btn{width:36px;height:36px;border-radius:8px;background:#F8FAFC;border:1px solid #E2E8F0;display:grid;place-items:center;cursor:pointer;text-decoration:none}
        .sl-content{flex:1;overflow-y:auto;padding:20px;background:#F1F5F9}
        @media(max-width:767px){.sl-desktop{display:none}.sl-hamburger{display:grid;place-items:center}.sl-content{padding:14px 12px}}
      `}</style>
    </div>
  )
}