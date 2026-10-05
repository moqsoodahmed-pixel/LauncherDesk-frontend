import { useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation, Link } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import VerifyEmailBanner from '../../components/VerifyEmailBanner'
import logoImg from '../../assets/launcherdesk-logo-transparent.png'

function Ic({ d, size=16, sw=2 }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{flex:'none'}} aria-hidden="true">{d.split('|').map((p,i)=><path key={i} d={p}/>)}</svg>
}

const NAV = [
  { label:'Overview',    path:'/user/dashboard', icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10' },
  { label:'My Services', short:'Services', path:'/user/services',  icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6' },
  { label:'Payments',    path:'/user/payments',  icon:'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z|M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
  { label:'Invoices',    path:'/user/invoices',  icon:'M9 12h6|M9 16h6|M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M13 2v6h6' },
  { label:'Support',     path:'/user/support',   icon:'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' },
  { label:'Profile',     path:'/user/profile',   icon:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2|M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8' },
]

// All six items fit on phones because each item gets an equal flex share.
const MOBILE_NAV = NAV

const CSS = `
/* ── Shell ───────────────────────────────────────────────────── */
.ud-root{--ud-side:240px;min-height:100vh;min-height:100dvh;background:#F7F9FC;font-family:'Manrope',system-ui,sans-serif;width:100%;max-width:100%;overflow-x:clip}
.ud-root *{box-sizing:border-box}
.ud-sidebar{position:fixed;top:0;left:0;bottom:0;z-index:30;width:var(--ud-side);background:linear-gradient(180deg,#0D1B2E 0%,#0B1727 100%);color:#fff;display:flex;flex-direction:column;border-right:1px solid rgba(255,255,255,.06)}
.ud-sidebar-brand{padding:20px 16px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,.08)}
.ud-sidebar-logo{height:28px;width:auto;max-width:140px;object-fit:contain;filter:brightness(0) invert(1)}
.ud-sidebar-nav{padding:14px 10px;flex:1;min-height:0;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.15) transparent}
.ud-nav-section{padding:14px 12px 6px;font-size:10.5px;font-weight:700;letter-spacing:.08em;color:rgba(255,255,255,.35)}
.ud-nav-link{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:9px;color:rgba(255,255,255,.6);font-size:13.5px;font-weight:600;text-decoration:none;margin-bottom:2px;transition:background .15s,color .15s}
.ud-nav-link:hover{background:rgba(255,255,255,.07);color:#fff}
.ud-nav-link.active{background:rgba(29,111,224,.22);color:#BFDBFE;box-shadow:inset 3px 0 0 #3B8FEF}
.ud-sidebar-footer{padding:12px 10px 16px;border-top:1px solid rgba(255,255,255,.08);flex-shrink:0}
.ud-side-user{display:flex;align-items:center;gap:10px;padding:10px 10px;margin-bottom:8px;border-radius:10px;background:rgba(255,255,255,.05);text-decoration:none}
.ud-side-user:hover{background:rgba(255,255,255,.08)}
.ud-side-user-txt{min-width:0;line-height:1.3}
.ud-side-user-name{font-size:13px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ud-side-user-mail{font-size:11px;color:rgba(255,255,255,.45);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ud-logout-btn{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:9px;background:transparent;border:none;color:rgba(255,255,255,.5);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:color .15s,background .15s}
.ud-logout-btn:hover{background:rgba(239,68,68,.15);color:#F87171}
.ud-main{margin-left:var(--ud-side);display:flex;flex-direction:column;min-width:0;min-height:100vh;min-height:100dvh}
.ud-topbar{background:#fff;border-bottom:1px solid #E8EEF6;padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between;gap:12px;position:sticky;top:0;z-index:20;flex-shrink:0}
.ud-topbar-left{display:flex;align-items:center;gap:10px;min-width:0}
.ud-topbar-logo{display:none;height:22px;width:auto;max-width:110px;object-fit:contain}
.ud-topbar-title{font-size:15px;font-weight:700;color:#1A2F4E;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ud-topbar-user{display:flex;align-items:center;gap:10px;font-size:13px;color:#64748B;min-width:0}
.ud-topbar-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px}
.ud-topbar-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#1A2F4E,#1D6FE0);color:#fff;font-size:12px;font-weight:700;display:grid;place-items:center;flex-shrink:0}
.ud-topbar-logout{display:none;width:34px;height:34px;border-radius:8px;border:1px solid #E8EEF6;background:#fff;color:#64748B;cursor:pointer;place-items:center;flex-shrink:0}
.ud-content{flex:1;width:100%;max-width:1200px;margin:0 auto;padding:24px}
.ud-mobile-bar{display:none;position:fixed;bottom:0;left:0;right:0;background:#0D1B2E;z-index:40;padding:6px 4px calc(6px + env(safe-area-inset-bottom));border-top:1px solid rgba(255,255,255,.1)}
.ud-mobile-bar-inner{display:flex;justify-content:space-around;max-width:640px;margin:0 auto}
.ud-mobile-nav{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px;color:rgba(255,255,255,.5);font-size:10px;font-weight:600;text-decoration:none;border-radius:8px;transition:color .15s}
.ud-mobile-nav span{max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ud-mobile-nav.active{color:#7ecef4}

/* ── Shared page pieces (used by all /user/* pages) ──────────── */
.ud-root h1.ud-h1{font-size:22px!important;line-height:1.2;font-weight:800;color:#1A2F4E;letter-spacing:-.02em;margin-bottom:4px;overflow-wrap:anywhere}
.ud-page-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:24px}
.ud-page-head > div{min-width:0}
.ud-card{background:#fff;border-radius:16px;border:1px solid #E8EEF6}
.ud-pad{padding:24px}
.ud-break{overflow-wrap:anywhere;word-break:break-word}
.ud-stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr));gap:16px;margin-bottom:28px}
.ud-btn-row{display:flex;gap:10px;flex-wrap:wrap}

/* Service detail */
.ud-crumbs{font-size:13px;color:#64748B;margin-bottom:20px;display:flex;align-items:center;gap:6px;min-width:0}
.ud-crumbs a{flex-shrink:0}
.ud-crumbs-current{color:#1A2F4E;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1}
.ud-detail-grid{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:20px;align-items:start}
.ud-detail-grid > *{min-width:0}
.ud-detail-meta{display:flex;align-items:center;gap:8px 12px;flex-wrap:wrap;margin-top:6px}

/* Lists, rows, key/value */
.ud-row-between{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.ud-row-between > :first-child{min-width:0;flex:1}
.ud-kv{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #F1F5F9;font-size:13px}
.ud-kv-label{color:#64748B;width:140px;flex-shrink:0}
.ud-kv-value{font-weight:600;color:#1A2F4E;min-width:0;overflow-wrap:anywhere}
.ud-inv-row{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 20px;border-bottom:1px solid #F1F5F9;flex-wrap:wrap}
.ud-inv-right{display:flex;align-items:center;gap:16px;flex-shrink:0}

/* Payments: table on wide screens, cards on phones */
.ud-pay-cards{display:none}
.ud-pay-card{padding:14px 16px;border-bottom:1px solid #F1F5F9}
.ud-pay-card:last-child{border-bottom:none}

/* Support */
.ud-reply-form{padding:14px 22px;border-top:1px solid #F1F5F9;display:flex;gap:10px}
.ud-reply-form input{min-width:0}
.ud-msg{max-width:80%}

/* Email-verify OTP */
.ud-otp{display:flex;gap:8px;justify-content:center;margin-bottom:16px}
.ud-otp input{flex:1 1 0;min-width:0;max-width:46px;height:50px}

/* ── Tablet ──────────────────────────────────────────────────── */
@media(max-width:1100px){
  .ud-root{--ud-side:210px}
  .ud-content{padding:20px}
}
@media(max-width:980px){
  .ud-detail-grid{grid-template-columns:minmax(0,1fr)}
  .ud-detail-side{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:14px}
  .ud-detail-side > *{margin-bottom:0!important}
}

/* ── Phone ───────────────────────────────────────────────────── */
@media(max-width:768px){
  .ud-sidebar{display:none}
  .ud-main{margin-left:0}
  .ud-content{padding:16px;padding-bottom:calc(84px + env(safe-area-inset-bottom))}
  .ud-mobile-bar{display:block}
  .ud-topbar{padding:0 16px;height:52px}
  .ud-topbar-logo{display:block}
  .ud-topbar-title{display:none}
  .ud-topbar-logout{display:grid}
  .ud-topbar-name{max-width:140px}
  .ud-pay-table{display:none}
  .ud-pay-cards{display:block}
}
@media(max-width:600px){
  .ud-root h1.ud-h1{font-size:19px!important}
  .ud-page-head{margin-bottom:18px}
  .ud-page-head > .ud-head-action{width:100%;justify-content:center}
  .ud-pad{padding:16px}
  .ud-card,.ud-detail-grid .ud-card{border-radius:14px}
  .ud-kv{flex-direction:column;gap:2px}
  .ud-kv-label{width:auto;font-size:12px}
  .ud-inv-row{padding:14px 16px}
  .ud-inv-right{width:100%;justify-content:space-between}
  .ud-reply-form{padding:12px 14px}
  .ud-msg{max-width:90%}
  .ud-btn-row > *{flex:1 1 auto;justify-content:center}
  .ud-tabs{width:100%!important}
  .ud-tabs > button{flex:1;padding:7px 8px!important}
}
@media(max-width:420px){
  .ud-topbar-name{display:none}
  .ud-content{padding-left:12px;padding-right:12px}
  .ud-mobile-nav{font-size:9.5px}
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
          <div className="ud-nav-section">MY ACCOUNT</div>
          {NAV.map(item => (
            <NavLink key={item.path} to={item.path} className={({isActive})=>`ud-nav-link${isActive?' active':''}`}>
              <Ic d={item.icon}/>{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ud-sidebar-footer">
          <Link to="/user/profile" className="ud-side-user" title="View profile">
            <div className="ud-topbar-avatar" aria-hidden="true">{initials(user?.name)}</div>
            <div className="ud-side-user-txt">
              <div className="ud-side-user-name">{user?.name || 'My account'}</div>
              {user?.email && <div className="ud-side-user-mail">{user.email}</div>}
            </div>
          </Link>
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
          <div className="ud-topbar-left">
            <Link to="/" aria-label="LauncherDesk home"><img src={logoImg} alt="LauncherDesk" className="ud-topbar-logo" /></Link>
            <span className="ud-topbar-title">{pageTitle}</span>
          </div>
          <div className="ud-topbar-user">
            <span className="ud-topbar-name">{user?.name || user?.email}</span>
            <div className="ud-topbar-avatar" aria-hidden="true">{initials(user?.name)}</div>
            <button type="button" onClick={handleLogout} className="ud-topbar-logout" aria-label="Sign out" title="Sign out">
              <Ic d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4|M16 17l5-5-5-5|M21 12H9" size={16}/>
            </button>
          </div>
        </header>
        <main className="ud-content"><VerifyEmailBanner /><Outlet /></main>
      </div>
      <nav className="ud-mobile-bar" aria-label="Mobile navigation">
        <div className="ud-mobile-bar-inner">
          {MOBILE_NAV.map(item => (
            <NavLink key={item.path} to={item.path} className={({isActive})=>`ud-mobile-nav${isActive?' active':''}`} aria-label={item.label}>
              <Ic d={item.icon} size={20}/><span>{item.short || item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}