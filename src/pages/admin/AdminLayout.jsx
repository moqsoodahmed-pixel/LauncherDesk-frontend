import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation, NavLink } from 'react-router-dom'
import logoImg from '../../assets/launcherdesk-logo-footer.png'
import { useAdminAuth } from '../../context/AdminAuthContext'

function Ic({ d, size = 17, sw = 2 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
      {d.split('|').map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

const NAV = [
  { label:'Dashboard',    path:'/admin/dashboard',    icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10' },
  { label:'Contacts',     path:'/admin/contacts',     icon:'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' },
  { label:'Leads',        path:'/admin/leads',        icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75' },
  { label:'Quotes',       path:'/admin/quotes',       icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8' },
  { label:'Applications', path:'/admin/applications', icon:'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z|M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
  { label:'Office Setup', path:'/admin/office',       icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10' },
  { label:'Partners',    path:'/admin/partners',   icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75' },
  { label:'Settings',     path:'/admin/settings',     icon:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z|M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' },
]

export default function AdminLayout() {
  const { user, logout, isLoggedIn } = useAdminAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const [collapsed,  setCollapsed]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) navigate('/admin', { replace: true })
  }, [isLoggedIn, navigate])

  // Close mobile sidebar on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  if (!isLoggedIn) return null

  const handleLogout = () => { logout(); navigate('/admin', { replace: true }) }

  const SidebarContent = ({ isMobile = false }) => (
    <>
      {/* Brand */}
      <div className="adm-brand">
        <img src={logoImg} alt="LauncherDesk"
          style={{ height: 28, width: 'auto', maxWidth: collapsed && !isMobile ? 32 : 150, objectFit: 'contain', display: 'block', transition: 'max-width .2s' }} />
        {isMobile
          ? <button className="adm-collapse-btn" onClick={() => setMobileOpen(false)}><Ic d="M18 6L6 18|M6 6l12 12" size={15}/></button>
          : <button className="adm-collapse-btn" onClick={() => setCollapsed(c => !c)}><Ic d={collapsed ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'} size={14}/></button>
        }
      </div>

      {/* Nav items */}
      <div className="adm-nav-list">
        {(!collapsed || isMobile) && <div className="adm-section-label">MENU</div>}
        {NAV.slice(0, 6).map(n => {
          const active = location.pathname === n.path
          return (
            <NavLink key={n.path} to={n.path} style={{ textDecoration: 'none' }}>
              <div className={`adm-nav-item${active ? ' active' : ''}`}
                style={{ justifyContent: collapsed && !isMobile ? 'center' : 'flex-start' }}
                title={collapsed && !isMobile ? n.label : ''}>
                <Ic d={n.icon} size={17} />
                {(!collapsed || isMobile) && <span>{n.label}</span>}
              </div>
            </NavLink>
          )
        })}

        <div className="adm-divider" />
        {(!collapsed || isMobile) && <div className="adm-section-label">ACCOUNT</div>}

        <NavLink to="/admin/settings" style={{ textDecoration: 'none' }}>
          <div className={`adm-nav-item${location.pathname === '/admin/settings' ? ' active' : ''}`}
            style={{ justifyContent: collapsed && !isMobile ? 'center' : 'flex-start' }}>
            <Ic d={NAV[6].icon} size={17} />
            {(!collapsed || isMobile) && <span>Settings</span>}
          </div>
        </NavLink>

        <button className="adm-nav-item adm-logout-btn"
          style={{ justifyContent: collapsed && !isMobile ? 'center' : 'flex-start' }}
          onClick={handleLogout}>
          <Ic d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4|M16 17l5-5-5-5|M21 12H9" size={17} />
          {(!collapsed || isMobile) && <span>Logout</span>}
        </button>
      </div>

      {/* User chip */}
      {(!collapsed || isMobile) && (
        <div className="adm-user-chip">
          <div className="adm-avatar">{user?.name?.[0] || 'A'}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="adm-user-name">{user?.name || 'Admin'}</div>
            <div className="adm-user-role">Super Admin</div>
          </div>
        </div>
      )}
    </>
  )

  return (
    <div className="adm-shell">
      {/* ── Desktop sidebar ── */}
      <aside className={`adm-sidebar adm-sidebar-desktop${collapsed ? ' collapsed' : ''}`}>
        <SidebarContent />
      </aside>

      {/* ── Mobile overlay + drawer ── */}
      {mobileOpen && <div className="adm-overlay" onClick={() => setMobileOpen(false)} />}
      <aside className={`adm-sidebar adm-sidebar-mobile${mobileOpen ? ' open' : ''}`}>
        <SidebarContent isMobile />
      </aside>

      {/* ── Main ── */}
      <div className="adm-main">
        {/* Topbar */}
        <header className="adm-topbar">
          {/* Hamburger — mobile only */}
          <button className="adm-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Ic d="M3 12h18|M3 6h18|M3 18h18" size={20} />
          </button>

          <div className="adm-search-wrap">
            <svg className="adm-search-icon" viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input className="adm-search-input" placeholder="Search…" />
          </div>

          <div className="adm-topbar-right">
            <a href="/" target="_blank" rel="noopener noreferrer" className="adm-icon-btn" title="View website">
              <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <div className="adm-avatar adm-avatar-top">{user?.name?.[0] || 'A'}</div>
            <span className="adm-topbar-name">{user?.name || 'Admin'}</span>
          </div>
        </header>

        {/* Page */}
        <main className="adm-content">
          <Outlet />
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',system-ui,sans-serif}

        /* ── Shell ── */
        .adm-shell{display:flex;height:100vh;height:100dvh;overflow:hidden;font-family:'Inter',system-ui,sans-serif;background:#F1F5F9}

        /* ── Sidebar base ── */
        .adm-sidebar{background:#1C2434;display:flex;flex-direction:column;overflow:hidden;flex-shrink:0}
        .adm-sidebar-desktop{width:240px;transition:width .22s cubic-bezier(.2,.7,.3,1)}
        .adm-sidebar-desktop.collapsed{width:68px}

        /* ── Mobile sidebar ── */
        .adm-sidebar-mobile{
          position:fixed;top:0;left:0;bottom:0;z-index:200;
          width:260px;transform:translateX(-100%);
          transition:transform .25s cubic-bezier(.2,.7,.3,1);
          box-shadow:4px 0 24px rgba(0,0,0,.18);
        }
        .adm-sidebar-mobile.open{transform:translateX(0)}
        .adm-overlay{position:fixed;inset:0;z-index:199;background:rgba(0,0,0,.45);backdrop-filter:blur(2px)}

        /* ── Sidebar internals ── */
        .adm-brand{height:60px;display:flex;align-items:center;gap:10px;padding:0 14px 0 16px;border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0}
        .adm-collapse-btn{background:rgba(255,255,255,.07);border:0;width:28px;height:28px;border-radius:7px;display:grid;place-items:center;cursor:pointer;color:#8A99AF;flex-shrink:0;margin-left:auto}
        .adm-section-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#8A99AF;padding:10px 10px 4px}
        .adm-divider{height:1px;background:rgba(255,255,255,.07);margin:8px 0}
        .adm-nav-list{flex:1;overflow-y:auto;padding:8px}
        .adm-nav-list::-webkit-scrollbar{width:3px}
        .adm-nav-list::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px}

        .adm-nav-item{
          display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;
          margin:1px 0;color:#DEE4EE;cursor:pointer;transition:background .12s,color .12s;
          font-size:13.5px;font-weight:500;white-space:nowrap;text-decoration:none;
          border:0;background:none;width:100%;font-family:inherit;
        }
        .adm-nav-item:hover{background:rgba(255,255,255,.07);color:#fff}
        .adm-nav-item.active{background:#3B5BDB;color:#fff}
        .adm-logout-btn{color:#FF8080}
        .adm-logout-btn:hover{background:rgba(255,128,128,.12);color:#FF6060}

        .adm-user-chip{display:flex;align-items:center;gap:10px;padding:14px 14px;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0}
        .adm-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#3B5BDB,#7C9FFF);display:grid;place-items:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}
        .adm-user-name{font-size:13px;font-weight:700;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .adm-user-role{font-size:11px;color:#6da8e0;margin-top:1px}

        /* ── Main ── */
        .adm-main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}

        /* ── Topbar ── */
        .adm-topbar{height:60px;background:#fff;border-bottom:1px solid #E2E8F0;display:flex;align-items:center;padding:0 16px;gap:12px;flex-shrink:0}
        .adm-hamburger{display:none;background:none;border:0;cursor:pointer;color:#64748B;padding:4px;border-radius:6px;flex-shrink:0}
        .adm-hamburger:hover{background:#F1F5F9}
        .adm-search-wrap{flex:1;max-width:340px;position:relative}
        .adm-search-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%)}
        .adm-search-input{width:100%;height:36px;border:1px solid #E2E8F0;border-radius:8px;padding:0 12px 0 30px;font-size:13.5px;color:#1C2434;outline:none;background:#F8FAFC;font-family:inherit}
        .adm-topbar-right{margin-left:auto;display:flex;align-items:center;gap:8px}
        .adm-icon-btn{width:36px;height:36px;border-radius:8px;background:#F8FAFC;border:1px solid #E2E8F0;display:grid;place-items:center;cursor:pointer;text-decoration:none;flex-shrink:0}
        .adm-avatar-top{width:34px;height:34px;font-size:13px}
        .adm-topbar-name{font-size:13px;font-weight:600;color:#1C2434;white-space:nowrap}

        /* ── Content ── */
        .adm-content{flex:1;overflow-y:auto;padding:20px;background:#F1F5F9}
        .adm-content::-webkit-scrollbar{width:5px}
        .adm-content::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px}

        /* ── TABLET (768–1024px) ── */
        @media(max-width:1024px){
          .adm-sidebar-desktop{width:200px}
          .adm-sidebar-desktop.collapsed{width:60px}
          .adm-topbar-name{display:none}
          .adm-search-wrap{max-width:240px}
        }

        /* ── MOBILE (< 768px) ── */
        @media(max-width:767px){
          .adm-sidebar-desktop{display:none}
          .adm-hamburger{display:grid;place-items:center}
          .adm-search-wrap{max-width:none}
          .adm-topbar-name{display:none}
          .adm-content{padding:14px 12px}
          .adm-topbar{padding:0 12px;gap:8px}
        }

        /* ── SMALL MOBILE (< 400px) ── */
        @media(max-width:400px){
          .adm-content{padding:12px 8px}
          .adm-search-wrap{display:none}
        }
      `}</style>
    </div>
  )
}