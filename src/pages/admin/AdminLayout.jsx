import { useState, useEffect, useCallback } from 'react'
import { Outlet, useNavigate, useLocation, NavLink } from 'react-router-dom'
import logoImg from '../../assets/launcherdesk-logo-transparent.png'
import { useAdminAuth } from '../../context/AdminAuthContext'

/* ── tiny icon helper ─────────────────────────────────── */
function Ic({ d, size = 17, sw = 2 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
      {d.split('|').map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

const NAV = [
  { label:'Dashboard',   path:'/admin/dashboard',    icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10' },
  { label:'Contacts',    path:'/admin/contacts',     icon:'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' },
  { label:'Leads',       path:'/admin/leads',        icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75' },
  { label:'Quotes',      path:'/admin/quotes',       icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8' },
  { label:'Applications',path:'/admin/applications', icon:'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z|M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
  { label:'Office Setup', path:'/admin/office',      icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10' },
]

const BOTTOM_NAV = [
  { label:'Settings', path:'/admin/settings', icon:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z|M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' },
]

export default function AdminLayout() {
  const { user, logout, isLoggedIn } = useAdminAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Close mobile drawer on navigation
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!isLoggedIn) navigate('/admin', { replace: true })
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  const handleLogout = () => { logout(); navigate('/admin', { replace: true }) }

  const sidebarContent = (isMobileDrawer = false) => (
    <>
      {/* Brand */}
      <div style={S.brand}>
        <img src={logoImg} alt="LauncherDesk" style={{height:30,width:'auto',maxWidth:collapsed&&!isMobileDrawer?40:160,display:'block',objectFit:'contain',transition:'max-width .22s'}} />
        {!isMobileDrawer && (
          <button onClick={() => setCollapsed(c => !c)} style={{...S.collapseBtn,marginLeft:'auto'}}>
            <Ic d={collapsed ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'} size={14} />
          </button>
        )}
        {isMobileDrawer && (
          <button onClick={() => setMobileOpen(false)} style={{...S.collapseBtn,marginLeft:'auto'}}>
            <Ic d="M18 6L6 18|M6 6l12 12" size={15} />
          </button>
        )}
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
        {(!collapsed || isMobileDrawer) && <div style={S.section}>MENU</div>}
        {NAV.map(n => {
          const active = location.pathname === n.path || location.pathname.startsWith(n.path + '/')
          return (
            <NavLink key={n.path} to={n.path} style={{ textDecoration:'none' }}>
              <div style={{ ...S.navItem, ...(active ? S.navActive : {}), justifyContent: (collapsed&&!isMobileDrawer) ? 'center' : 'flex-start' }} title={n.label}>
                <Ic d={n.icon} size={17} />
                {(!collapsed || isMobileDrawer) && <span style={{ fontSize: 13.5, fontWeight: 500 }}>{n.label}</span>}
              </div>
            </NavLink>
          )
        })}

        {(!collapsed || isMobileDrawer) && <div style={{ ...S.section, marginTop: 16 }}>ACCOUNT</div>}
        <div style={S.divider} />
        {BOTTOM_NAV.map(n => (
          <NavLink key={n.path} to={n.path} style={{ textDecoration:'none' }}>
            <div style={{ ...S.navItem, justifyContent: (collapsed&&!isMobileDrawer) ? 'center' : 'flex-start' }} title={n.label}>
              <Ic d={n.icon} size={17} />
              {(!collapsed || isMobileDrawer) && <span style={{ fontSize: 13.5, fontWeight: 500 }}>{n.label}</span>}
            </div>
          </NavLink>
        ))}
        <button onClick={handleLogout} style={{ ...S.navItem, ...S.logoutBtn, justifyContent: (collapsed&&!isMobileDrawer) ? 'center' : 'flex-start', width: '100%', border: 0, cursor: 'pointer', fontFamily: 'inherit' }} title="Logout">
          <Ic d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4|M16 17l5-5-5-5|M21 12H9" size={17} />
          {(!collapsed || isMobileDrawer) && <span style={{ fontSize: 13.5, fontWeight: 500 }}>Logout</span>}
        </button>
      </div>

      {/* User chip */}
      {(!collapsed || isMobileDrawer) && (
        <div style={S.userChip}>
          <div style={S.avatar}>{user?.name?.[0] || 'A'}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'Admin'}</div>
            <div style={{ fontSize: 11, color: '#6da8e0', marginTop: 1 }}>Super Admin</div>
          </div>
        </div>
      )}
    </>
  )

  return (
    <div style={S.shell}>
      {/* ── DESKTOP SIDEBAR ── */}
      {!isMobile && (
        <aside style={{ ...S.sidebar, width: collapsed ? 72 : 260 }}>
          {sidebarContent(false)}
        </aside>
      )}

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {isMobile && (
        <>
          {/* Scrim */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position:'fixed',inset:0,background:'rgba(11,31,54,.5)',zIndex:200,
              opacity: mobileOpen ? 1 : 0,
              visibility: mobileOpen ? 'visible' : 'hidden',
              transition:'opacity .25s,visibility .25s',
            }}
          />
          {/* Drawer */}
          <aside style={{
            ...S.sidebar, width: 260, position:'fixed', top:0, left:0, bottom:0, zIndex:210,
            transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition:'transform .28s cubic-bezier(.2,.7,.3,1)',
            boxShadow: mobileOpen ? '4px 0 24px rgba(0,0,0,.25)' : 'none',
          }}>
            {sidebarContent(true)}
          </aside>
        </>
      )}

      {/* ── MAIN ── */}
      <div style={S.main}>
        {/* Topbar */}
        <header style={S.topbar}>
          {/* Hamburger — mobile only */}
          {isMobile && (
            <button onClick={() => setMobileOpen(true)} style={{...S.iconBtn, marginRight:8}}>
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          )}
          <div style={S.searchWrap}>
            <svg style={S.searchIcon} viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input style={S.searchInput} placeholder="Search contacts, leads, quotes…" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href="/" target="_blank" rel="noopener noreferrer" style={S.iconBtn} title="View website">
              <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <button style={S.iconBtn} title="Notifications">
              <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="#64748B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div style={{ position:'absolute',top:7,right:7,width:8,height:8,borderRadius:'50%',background:'#EF4444',border:'2px solid #fff' }} />
            </button>
            <div style={{ ...S.userPill, ...(isMobile ? {padding:'4px 6px 4px 4px'} : {}) }}>
              <div style={S.avatar}>{user?.name?.[0] || 'A'}</div>
              {!isMobile && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1C2434' }}>{user?.name || 'Admin'}</div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>Super Admin</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ ...S.content, padding: isMobile ? '16px' : '24px' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 4px; }
        .admin-main::-webkit-scrollbar-thumb { background: #CBD5E1; }
        @media(max-width:767px){
          table { display:block; overflow-x:auto; -webkit-overflow-scrolling:touch; width:100%; }
        }
      `}</style>
    </div>
  )
}

/* ── Styles ─────────────────────────────────────────── */
const S = {
  shell:    { display:'flex', height:'100vh', overflow:'hidden', fontFamily:"'Inter',system-ui,sans-serif", background:'#F1F5F9' },
  sidebar:  { background:'#1C2434', display:'flex', flexDirection:'column', flexShrink:0, transition:'width .22s cubic-bezier(.2,.7,.3,1)', overflow:'hidden' },
  brand:    { height:64, display:'flex', alignItems:'center', gap:10, padding:'0 12px 0 16px', borderBottom:'1px solid rgba(255,255,255,.07)', flexShrink:0 },
  logoBox:  { width:36, height:36, borderRadius:9, background:'#3B5BDB', display:'grid', placeItems:'center', flexShrink:0 },
  brandName:{ fontSize:17, fontWeight:800, color:'#fff', letterSpacing:'-.02em', flex:1, whiteSpace:'nowrap' },
  collapseBtn:{ background:'rgba(255,255,255,.07)', border:0, width:28, height:28, borderRadius:7, display:'grid', placeItems:'center', cursor:'pointer', color:'#8A99AF', flexShrink:0 },
  section:  { fontSize:10.5, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'#8A99AF', padding:'8px 6px 4px' },
  divider:  { height:1, background:'rgba(255,255,255,.07)', margin:'8px 0' },
  navItem:  { display:'flex', alignItems:'center', gap:10, padding:'9px 10px', borderRadius:8, margin:'1px 0', color:'#DEE4EE', cursor:'pointer', transition:'background .12s,color .12s', textDecoration:'none' },
  navActive:{ background:'#3B5BDB', color:'#fff' },
  logoutBtn:{ color:'#FF8080', background:'none' },
  userChip: { display:'flex', alignItems:'center', gap:10, padding:'14px 16px', borderTop:'1px solid rgba(255,255,255,.07)' },
  avatar:   { width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#3B5BDB,#7C9FFF)', display:'grid', placeItems:'center', fontSize:14, fontWeight:700, color:'#fff', flexShrink:0 },
  main:     { flex:1, display:'flex', flexDirection:'column', overflow:'hidden' },
  topbar:   { height:64, background:'#fff', borderBottom:'1px solid #E2E8F0', display:'flex', alignItems:'center', padding:'0 24px', gap:16, flexShrink:0 },
  searchWrap:{ flex:1, maxWidth:380, position:'relative' },
  searchIcon:{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)' },
  searchInput:{ width:'100%', height:38, border:'1px solid #E2E8F0', borderRadius:8, padding:'0 12px 0 34px', fontSize:13.5, color:'#1C2434', outline:'none', background:'#F8FAFC', fontFamily:'inherit' },
  iconBtn:  { width:38, height:38, borderRadius:9, background:'#F8FAFC', border:'1px solid #E2E8F0', display:'grid', placeItems:'center', cursor:'pointer', position:'relative', textDecoration:'none' },
  userPill: { display:'flex', alignItems:'center', gap:10, padding:'4px 12px 4px 4px', borderRadius:10, cursor:'pointer', marginLeft:4 },
  content:  { flex:1, overflowY:'auto', padding:'24px', background:'#F1F5F9' },
}