import { useState, useEffect, useCallback } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/PortalAuthContext';
import { NAVIGATION } from '../../constants/portal/navigation';
import NotificationBell from '../../components/portal/notifications/NotificationBell';
import logoSrc from '../../assets/portal-logo.png';

const ROLE_LABEL = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  CLIENT: 'Client',
};

/* Navigation icons */
const NAV_ICONS = {
  Dashboard: '⊞',
  Admins: '◉',
  Clients: '▦',
  Services: '⬡',
  Orders: '▤',
  Payments: '◈',
  KYC: '◎',
  Notifications: '◍',
  'Audit Logs': '▣',
  'Login History': '⊙',
  Workflow: '⟳',
  Support: '◑',
  Invoices: '🧾',
  Downloads: '⬇',
  Reports: '▥',
  Settings: '⚙',
  Profile: '◐',
  'My Orders': '▤',
  Documents: '▧',
  Finance: '◈',
  CRM: '◉',
  Attention: '⊛',
  Search: '⊕',
  System: '⊜',
  Backup: '⊗',
  Activity: '◎',
  Announcements: '◍',
  'Work Queue': '▦',
  'SLA Monitor': '⊙',
  Tasks: '▤',
};

/* Group nav items by section */
const SA_SECTIONS = {
  'Overview': ['Dashboard'],
  'Management': ['Clients', 'Admins', 'Orders', 'Services', 'KYC', 'Payments'],
  'Operations': ['Finance', 'CRM', 'Workflow', 'Support', 'Attention'],
  'Intelligence': ['Reports', 'Activity', 'Announcements', 'Search', 'System'],
  'Governance': ['Audit Logs', 'Login History', 'Backup', 'Settings', 'Notifications'],
};

const ADMIN_SECTIONS = {
  'Overview': ['Dashboard'],
  'My Work': ['Tasks', 'Orders', 'Clients', 'Support'],
  'Compliance': ['KYC', 'Work Queue', 'SLA Monitor'],
  'Tools': ['Search', 'Notifications', 'Profile'],
};

const CLIENT_SECTIONS = {
  'Overview': ['Dashboard'],
  'Services': ['Services', 'My Orders', 'Payments', 'Invoices'],
  'Account': ['Documents', 'Support', 'Downloads', 'Notifications', 'Search', 'Profile'],
};

function getSections(role, items) {
  const sectionMap =
    role === 'SUPER_ADMIN' ? SA_SECTIONS :
      role === 'ADMIN' ? ADMIN_SECTIONS :
        CLIENT_SECTIONS;

  const itemsByLabel = Object.fromEntries(items.map((i) => [i.label, i]));
  const sections = [];
  const placed = new Set();

  for (const [title, labels] of Object.entries(sectionMap)) {
    const sectionItems = labels.map((l) => itemsByLabel[l]).filter(Boolean);
    sectionItems.forEach((i) => placed.add(i.label));
    if (sectionItems.length) sections.push({ title, items: sectionItems });
  }

  const rest = items.filter((i) => !placed.has(i.label));
  if (rest.length) sections.push({ title: 'Other', items: rest });

  return sections;
}

function getInitials(name = '') {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() || '?';
}

/**
 * FIX: Mobile responsive sidebar with hamburger menu.
 * Audit finding (CRITICAL): Full sidebar permanently visible on 390px screens;
 * sidebar overlaps all content on mobile. Fix adds:
 *  - Hamburger button in the header (visible on ≤768px)
 *  - Slide-in drawer sidebar on mobile
 *  - Semi-transparent overlay backdrop that closes the drawer on tap
 *  - Sidebar auto-closes on route change (navigation)
 *  - Body scroll locked when drawer is open
 */
export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navItems = NAVIGATION[user?.role] || [];
  const sections = getSections(user?.role, navItems);

  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change (when user taps a nav link)
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((v) => !v), []);

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="ld-sidebar-brand">
        <NavLink to={user?.role === 'SUPER_ADMIN' ? '/super-admin/dashboard' : user?.role === 'ADMIN' ? '/admin/dashboard' : '/client/dashboard'}>
          <img
            src={logoSrc}
            alt="LauncherDesk"
            style={{ display: 'block', width: 148, margin: '0 auto' }}
          />
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="ld-sidebar-nav">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="ld-nav-section">{section.title}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `ld-nav-link${isActive ? ' active' : ''}`}
              >
                <span className="ld-nav-icon">{NAV_ICONS[item.label] || '•'}</span>
                <span className="ld-nav-label">{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className="ld-sidebar-footer">
        <div className="ld-sidebar-user-card" onClick={logout} title="Click to log out">
          <div className="ld-sidebar-avatar">{getInitials(user?.name)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="ld-sidebar-user-name">{user?.name}</div>
            <div className="ld-sidebar-user-role">{ROLE_LABEL[user?.role]}</div>
          </div>
          <span style={{ fontSize: 11, color: 'var(--ld-text-muted)' }}>↗</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="ld-app-shell">
      {/* ── Desktop sidebar (hidden on mobile via CSS) ── */}
      <aside className="ld-sidebar ld-sidebar-desktop">
        {sidebarContent}
      </aside>

      {/* ── Mobile overlay backdrop ── */}
      {drawerOpen && (
        <div
          className="ld-mobile-overlay"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer sidebar ── */}
      <aside className={`ld-sidebar ld-sidebar-mobile${drawerOpen ? ' ld-sidebar-open' : ''}`}>
        {/* Close button inside drawer */}
        <button
          className="ld-drawer-close"
          onClick={closeDrawer}
          aria-label="Close menu"
        >
          ✕
        </button>
        {sidebarContent}
      </aside>

      {/* ── Main content area ── */}
      <div className="ld-main">
        <header className="ld-header">
          {/* Hamburger button — only visible on mobile */}
          <button
            className="ld-hamburger"
            onClick={toggleDrawer}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
          >
            <span className="ld-hamburger-line" />
            <span className="ld-hamburger-line" />
            <span className="ld-hamburger-line" />
          </button>

          <div className="ld-header-title">{ROLE_LABEL[user?.role] || ''} Portal</div>
          <div className="ld-header-user">
            <NotificationBell />
            <span className="ld-badge-role">{ROLE_LABEL[user?.role]}</span>
            <button className="ld-logout-btn" onClick={logout}>
              Sign out
            </button>
          </div>
        </header>
        <main className="ld-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}