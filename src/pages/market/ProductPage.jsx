import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../assets/market.css'
import { catBy, prodBy, inCat, nfmt } from '../../data/market'
import { MI, Tile, Badge, RateLine, Gallery, ProductCard, Icon } from '../../components/market/MarketUI'

/* ─────────────────────────────────────────
   DOQFY DEMO DATA
───────────────────────────────────────── */
const DOQFY_DEMO_DATA = {
  stats: [
    { label: 'Total Contracts', value: '128', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h4', color: '#1E3A6A' },
    { label: 'Active Contracts', value: '86',  icon: 'M9 12l2 2 4-4M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z', color: '#047DC4' },
    { label: 'Pending Signature', value: '14', icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z', color: '#F59E0B' },
    { label: 'Expiring Soon',  value: '8',    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', color: '#EF4444' },
    { label: 'Completed',      value: '104',  icon: 'M20 6 9 17l-5-5', color: '#10B981' },
  ],
  contracts: [
    { id: 1, name: 'Vendor Services Agreement',    counterparty: 'Apex Technologies Pvt. Ltd.', status: 'Pending Signature', updated: '2 hours ago',  statusColor: '#F59E0B' },
    { id: 2, name: 'Employment Agreement',          counterparty: 'Rahul Sharma',                status: 'Signed',            updated: 'Yesterday',     statusColor: '#10B981' },
    { id: 3, name: 'Software Subscription Agreement', counterparty: 'Nova Systems',             status: 'Under Review',      updated: '2 days ago',    statusColor: '#047DC4' },
    { id: 4, name: 'NDA — Business Partnership',   counterparty: 'BluePeak Ventures',           status: 'Completed',         updated: '4 days ago',    statusColor: '#10B981' },
    { id: 5, name: 'Master Service Agreement',      counterparty: 'Orbit Solutions',             status: 'Draft',             updated: '5 days ago',    statusColor: '#94A3B8' },
  ],
  features: [
    { icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15h6', title: 'Contract Creation',      desc: 'Create and manage contracts using templates and structured workflows — faster than starting from scratch every time.' },
    { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 1-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', title: 'Contract Collaboration', desc: 'Collaborate with internal teams and counterparties during negotiation and review — with comments, edits and change tracking.' },
    { icon: 'M14.5 19.5 17 22l4-4.5M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6M14 2v6h6M14 2l6 6M9 13h4M9 17h2', title: 'E-Signatures',           desc: 'Send contracts for digital signatures and track signing progress in real time — with OTP and Aadhaar-based signing support.' },
    { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4', title: 'Contract Tracking',       desc: 'Monitor contract status, deadlines, renewals and important dates so nothing slips through the cracks.' },
    { icon: 'M12 20h9M4 4h16v4H4zM4 12h16v4H4z', title: 'Audit Trail',            desc: 'Keep a complete, tamper-evident record of all contract activity, changes and user actions for compliance and review.' },
    { icon: 'M4 6h16M4 10h16M4 14h10', title: 'Templates & Clauses',     desc: 'Reuse approved templates and clause libraries to speed up contract creation and maintain legal consistency across agreements.' },
  ],
  lifecycle: [
    { step: 'Draft',    desc: 'Create the initial contract from a template or from scratch.' },
    { step: 'Review',   desc: 'Internal teams review and annotate the contract.' },
    { step: 'Negotiate',desc: 'Collaborate with the counterparty on terms and clauses.' },
    { step: 'Approve',  desc: 'Authorised stakeholders give final approval.' },
    { step: 'Sign',     desc: 'All parties sign digitally with e-signature.' },
    { step: 'Active',   desc: 'Contract is live and being tracked for milestones.' },
    { step: 'Renew / Expire', desc: 'Renew the contract or close it at the end of its term.' },
  ],
  partnership: [
    { icon: 'M11 11a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 10-4.3-4.3', title: 'Discover', desc: 'LauncherDesk helps you find the right CLM solution for your business — without the guesswork.' },
    { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', title: 'Configure', desc: 'We help configure Doqfy around your specific workflows, teams and contract types.' },
    { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 1-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', title: 'Onboard', desc: 'Our team supports you during setup and adoption — so your team gets up to speed quickly.' },
    { icon: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', title: 'Scale', desc: 'As your contract volumes grow, LauncherDesk can help you expand workflows and add more users.' },
  ],
  indiaReady: [
    { icon: 'M14.5 19.5 17 22l4-4.5M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6', title: 'Digital Signing Workflows', desc: 'End-to-end digital contract signing for modern businesses.' },
    { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'OTP-Based Signing', desc: 'Signatories verify their identity with a secure OTP before signing.' },
    { icon: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM9 12l2 2 4-4', title: 'Aadhaar-Based Signing', desc: 'Support for Aadhaar eSign for stronger authentication.' },
    { icon: 'M12 20h9M4 4h16v4H4zM4 12h16v4H4z', title: 'Audit-Ready Tracking', desc: 'Complete activity log for every contract event and change.' },
    { icon: 'M3 3h18v18H3zM12 8v8M8 12h8', title: 'Centralized Contract Records', desc: 'All contracts stored and searchable in one secure repository.' },
  ],
}

/* ── Demo toast ────────────────────────────────────────────── */
function DemoToast({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
    }} onClick={onClose} role="dialog" aria-modal="true" aria-label="Demo preview notice">
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 18, padding: '32px 36px',
        boxShadow: '0 24px 56px -12px rgba(0,0,0,0.25)',
        maxWidth: 400, width: '90%', textAlign: 'center',
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg,#047DC4,#1E3A6A)',
          display: 'grid', placeItems: 'center', margin: '0 auto 16px',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1E3A6A', marginBottom: 8 }}>Demo Preview Only</h3>
        <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, marginBottom: 20 }}>
          This is a demo showcase. To use Doqfy's actual contract features, visit{' '}
          <a href="https://doqfy.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#047DC4', fontWeight: 600 }}>doqfy.in</a>{' '}
          or contact LauncherDesk to get it configured for your business.
        </p>
        <button onClick={onClose} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Got it</button>
      </div>
    </div>
  )
}

/* ── CLM Demo Dashboard ─────────────────────────────────────── */
function DoqfyDashboard() {
  const [showToast, setShowToast] = useState(false)
  const { stats, contracts } = DOQFY_DEMO_DATA

  return (
    <>
      {showToast && <DemoToast onClose={() => setShowToast(false)} />}
      <div style={{
        background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0',
        boxShadow: '0 20px 48px -12px rgba(30,58,106,0.18)',
        overflow: 'hidden', userSelect: 'none',
      }}>
        {/* Dashboard topbar */}
        <div style={{
          background: 'linear-gradient(135deg,#1E3A6A 0%,#047DC4 100%)',
          padding: '14px 20px',
        }} />

        {/* Stats row */}
        <div style={{ padding: '16px 18px', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: '#F8FAFC', borderRadius: 12, padding: '12px 10px',
              border: '1px solid #E2E8F0', textAlign: 'center',
            }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: 'var(--font)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#64748B', marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Contract list */}
        <div style={{ padding: '14px 18px 18px' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: '#94A3B8', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'var(--font)' }}>
            Recent Contracts
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {contracts.map(c => (
              <button key={c.id} onClick={() => setShowToast(true)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#F8FAFC', borderRadius: 10, padding: '10px 12px',
                border: '1px solid #E2E8F0', cursor: 'pointer', textAlign: 'left',
                transition: 'background .15s', width: '100%',
              }} aria-label={`${c.name} (demo)`}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9, background: `${c.statusColor}18`,
                  display: 'grid', placeItems: 'center', flex: 'none',
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c.statusColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1E3A6A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{c.counterparty}</div>
                </div>
                <div style={{ textAlign: 'right', flex: 'none' }}>
                  <span style={{
                    fontSize: 10.5, fontWeight: 700, color: c.statusColor,
                    background: `${c.statusColor}18`, padding: '3px 9px', borderRadius: 99,
                    display: 'block', whiteSpace: 'nowrap', fontFamily: 'var(--font)',
                  }}>{c.status}</span>
                  <span style={{ fontSize: 10, color: '#94A3B8', marginTop: 4, display: 'block' }}>{c.updated}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Contract Detail Card ───────────────────────────────────── */
function ContractDetailCard({ onDemoAction }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
      <div style={{ background: 'linear-gradient(135deg,#1E3A6A,#047DC4)', padding: '18px 22px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'var(--font)', marginBottom: 6 }}>Contract Details</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Master Service Agreement</div>
        <span style={{ display: 'inline-block', marginTop: 8, fontSize: 11, fontWeight: 700, background: 'rgba(245,158,11,0.2)', color: '#FCD34D', padding: '3px 10px', borderRadius: 99, fontFamily: 'var(--font)' }}>Pending Signature</span>
      </div>
      <div style={{ padding: '18px 22px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', marginBottom: 8, fontFamily: 'var(--font)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Parties</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, background: '#F1F5F9', borderRadius: 10, padding: '10px 12px', fontSize: 12.5, fontWeight: 700, color: '#1E3A6A', textAlign: 'center' }}>LauncherDesk Technologies</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', flex: 'none' }}>&amp;</span>
          <div style={{ flex: 1, background: '#F1F5F9', borderRadius: 10, padding: '10px 12px', fontSize: 12.5, fontWeight: 700, color: '#1E3A6A', textAlign: 'center' }}>Apex Technologies Pvt. Ltd.</div>
        </div>
        {[
          ['Contract Type', 'Master Service Agreement'],
          ['Created', '12 August 2026'],
          ['Last Updated', '8 September 2026'],
          ['Expiry', '11 August 2027'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderTop: '1px solid #F1F5F9', fontSize: 13.5 }}>
            <span style={{ color: '#64748B' }}>{k}</span>
            <span style={{ fontWeight: 600, color: '#1E3A6A' }}>{v}</span>
          </div>
        ))}
        {/* Signature progress */}
        <div style={{ marginTop: 14, padding: '12px 14px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#1E3A6A' }}>Signature Progress</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#047DC4' }}>2 / 3 signed</span>
          </div>
          <div style={{ height: 6, background: '#E2E8F0', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '66.6%', background: 'linear-gradient(90deg,#047DC4,#1E3A6A)', borderRadius: 99 }} />
          </div>
        </div>
        {/* Demo actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
          {['View Contract', 'Request Signature', 'Download PDF'].map(label => (
            <button key={label} onClick={onDemoAction} style={{
              height: 40, background: '#F1F5F9', border: '1px solid #E2E8F0',
              borderRadius: 10, fontSize: 13.5, fontWeight: 600, color: '#1E3A6A',
              cursor: 'pointer', fontFamily: 'var(--font)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'background .15s',
            }} aria-label={`${label} (demo preview)`}>
              {label}
              <span style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', background: '#E2E8F0', padding: '2px 7px', borderRadius: 99, letterSpacing: '.04em', textTransform: 'uppercase' }}>Demo</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Lifecycle step ─────────────────────────────────────────── */
function Lifecycle() {
  const { lifecycle } = DOQFY_DEMO_DATA
  return (
    <section className="mk-p-section" style={{ marginTop: 50 }}>
      <h2 style={{ fontSize: 'clamp(20px,2.8vw,28px)', fontWeight: 800, color: '#1E3A6A', marginBottom: 8 }}>
        Manage the complete contract lifecycle
      </h2>
      <p style={{ color: 'var(--text-2)', fontSize: 15.5, marginBottom: 32, maxWidth: 600 }}>
        From drafting to signing and renewal, keep every stage of your contract workflow organized in one place.
      </p>
      <div style={{ display: 'flex', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
        {lifecycle.map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'stretch', flex: '1 1 0', minWidth: 80 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flex: 'none',
                background: i === 4 ? 'linear-gradient(135deg,#047DC4,#1E3A6A)' : '#EFF6FF',
                border: i === 4 ? 'none' : '2px solid #BFDBFE',
                display: 'grid', placeItems: 'center',
                boxShadow: i === 4 ? '0 6px 18px -6px rgba(4,125,204,0.5)' : 'none',
              }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: i === 4 ? '#fff' : '#047DC4', fontFamily: 'var(--font)' }}>{i + 1}</span>
              </div>
              <div style={{
                background: i === 4 ? 'linear-gradient(135deg,#EFF6FF,#DBEAFE)' : '#fff',
                border: `1.5px solid ${i === 4 ? '#BFDBFE' : '#E2E8F0'}`,
                borderRadius: 12, padding: '12px 10px', textAlign: 'center', flex: 1, width: '100%',
              }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1E3A6A', marginBottom: 4, fontFamily: 'var(--font)' }}>{l.step}</div>
                <div style={{ fontSize: 11, color: '#64748B', lineHeight: 1.4 }}>{l.desc}</div>
              </div>
            </div>
            {i < lifecycle.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 19, flex: 'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── CHEV path constant ─────────────────────────────────────── */
const CHEV = 'm9 18 6-6-6-6'

/* ── Enhanced Doqfy Page ────────────────────────────────────── */
function DoqfyPage({ p, cat }) {
  const [showToast, setShowToast] = useState(false)
  const { features, partnership, indiaReady } = DOQFY_DEMO_DATA

  return (
    <div style={{ paddingBottom: 80 }}>
      {showToast && <DemoToast onClose={() => setShowToast(false)} />}

      {/* Breadcrumb */}
      <div className="page-hero" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a>
            <svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/market">Marketplace</a>
            <svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/market/category?cat=clm">CLM</a>
            <svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Doqfy</span>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg,#F0F7FF 0%,#fff 60%)', borderBottom: '1px solid #E2E8F0', padding: 'clamp(32px,5vw,60px) 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,4vw,56px)', alignItems: 'center' }} className="doqfy-hero-grid">
            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <img src="/doqfy-logo.png" alt="Doqfy logo" style={{ height: 44, objectFit: 'contain', display: 'block' }} />
                <span className="mk-badge" style={{ background: 'rgba(4,125,204,0.1)', color: '#047DC4' }}>CLM</span>
                <span className="mk-badge" style={{ background: 'rgba(16,185,129,0.12)', color: '#059669' }}>Partner</span>
              </div>
              <h1 style={{ fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 800, color: '#1E3A6A', letterSpacing: '-.03em', margin: '0 0 14px' }}>
                Doqfy
              </h1>
              <p style={{ fontSize: 'clamp(15px,2vw,19px)', color: '#047DC4', fontWeight: 600, fontFamily: 'var(--font)', marginBottom: 14 }}>
                India-ready contract management and e-signature platform
              </p>
              <p style={{ fontSize: 15.5, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 28, maxWidth: 520 }}>
                Doqfy helps businesses create, manage, negotiate, sign and track contracts digitally — with a clean workflow designed for modern Indian businesses. LauncherDesk is proud to offer Doqfy as our official CLM partner.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="https://doqfy.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  aria-label="Visit Doqfy website"
                >
                  Visit Doqfy
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
                  </svg>
                </a>
                <a href="/company/contact" className="btn btn-soft" aria-label="Get Doqfy set up by LauncherDesk">
                  Get it set up by LauncherDesk
                </a>
              </div>
            </div>
            {/* Right: Dashboard */}
            <div>
              <DoqfyDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <main>
        <div className="mk-p-grid wrap" style={{ paddingTop: 40 }}>
          {/* Left: feature sections */}
          <div className="mk-p-main">

            {/* Features */}
            <section>
              <div className="sec-head" style={{ marginBottom: 24 }}>
                <span className="eyebrow">Platform Features</span>
                <h2 style={{ fontSize: 'clamp(20px,2.8vw,28px)', fontWeight: 800, color: '#1E3A6A' }}>
                  Everything you need to manage contracts
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
                {features.map((f, i) => (
                  <div key={i} style={{
                    background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16,
                    padding: '20px 18px', boxShadow: 'var(--sh-sm)',
                    transition: 'transform .2s, box-shadow .2s',
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 11, background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)',
                      display: 'grid', placeItems: 'center', marginBottom: 14,
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#047DC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={f.icon}/>
                      </svg>
                    </div>
                    <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#1E3A6A', marginBottom: 6 }}>{f.title}</h3>
                    <p style={{ fontSize: 13.5, color: '#64748B', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Lifecycle */}
            <Lifecycle />

            {/* India-ready */}
            <section className="mk-p-section" style={{ marginTop: 50 }}>
              <div className="sec-head" style={{ marginBottom: 24 }}>
                <span className="eyebrow">India-Ready</span>
                <h2 style={{ fontSize: 'clamp(20px,2.8vw,28px)', fontWeight: 800, color: '#1E3A6A' }}>
                  Built for modern contract workflows in India
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
                {indiaReady.map((item, i) => (
                  <div key={i} style={{
                    background: 'linear-gradient(135deg,#F0F7FF,#EFF6FF)',
                    border: '1.5px solid #BFDBFE', borderRadius: 14, padding: '16px 16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 9, background: '#fff',
                        border: '1.5px solid #BFDBFE', display: 'grid', placeItems: 'center', flex: 'none',
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#047DC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.icon}/>
                        </svg>
                      </div>
                      <h3 style={{ fontSize: 13, fontWeight: 700, color: '#1E3A6A', margin: 0 }}>{item.title}</h3>
                    </div>
                    <p style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Partnership */}
            <section className="mk-p-section" style={{ marginTop: 50 }}>
              <div style={{
                background: 'linear-gradient(135deg,#1E3A6A 0%,#047DC4 100%)',
                borderRadius: 20, padding: 'clamp(28px,4vw,40px)',
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'var(--font)' }}>Partnership</span>
                <h2 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 800, color: '#fff', margin: '8px 0 24px' }}>
                  Why LauncherDesk + Doqfy
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14 }}>
                  {partnership.map((p, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '16px 14px', backdropFilter: 'blur(4px)' }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 9, background: 'rgba(255,255,255,0.15)',
                        display: 'grid', placeItems: 'center', marginBottom: 10,
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={p.icon}/>
                        </svg>
                      </div>
                      <h3 style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{p.title}</h3>
                      <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, margin: 0 }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contract detail card */}
            <section className="mk-p-section" style={{ marginTop: 50 }}>
              <div className="sec-head" style={{ marginBottom: 20 }}>
                <span className="eyebrow">Demo Preview</span>
                <h2 style={{ fontSize: 'clamp(20px,2.8vw,26px)', fontWeight: 800, color: '#1E3A6A' }}>Sample contract detail view</h2>
              </div>
              <div style={{ maxWidth: 560 }}>
                <ContractDetailCard onDemoAction={() => setShowToast(true)} />
              </div>
            </section>
          </div>

          {/* Right: buy box */}
          <aside className="mk-p-side">
            <div className="mk-buybox">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <img src="/doqfy-logo.png" alt="Doqfy" style={{ height: 32, objectFit: 'contain' }} />
              </div>
              <div style={{ display: 'flex', gap: 7, marginBottom: 16, flexWrap: 'wrap' }}>
                <span className="mk-badge">CLM</span>
                <span className="mk-badge" style={{ background: 'rgba(16,185,129,0.12)', color: '#059669' }}>Partner</span>
              </div>
              <div className="mk-price-lg">Custom pricing</div>
              <a
                href="/company/contact"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                aria-label="Get Doqfy set up by LauncherDesk"
              >
                Get it set up by LauncherDesk
              </a>
              <div style={{ marginTop: 10 }}>
                <a
                  href="https://doqfy.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-soft"
                  style={{ width: '100%', justifyContent: 'center' }}
                  aria-label="Visit Doqfy official website"
                >
                  Visit Doqfy
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
                  </svg>
                </a>
              </div>
              <div className="mk-trust">
                <svg className="mk-ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={MI.shield}/>
                </svg>
                LauncherDesk can procure, configure &amp; onboard Doqfy for your business.
              </div>
              {[
                ['Category', 'CLM'],
                ['Type', 'Partner Product'],
                ['Pricing', 'Custom / Contact us'],
              ].map(([k, v]) => (
                <div className="mk-spec" key={k}>
                  <span>{k}</span><b>{v}</b>
                </div>
              ))}
            </div>

            {/* Mini feature list */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '18px 20px', marginTop: 16, boxShadow: 'var(--sh-sm)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'var(--font)' }}>Key Capabilities</div>
              <ul className="mk-feats" style={{ gridTemplateColumns: '1fr' }}>
                {['Drag-and-drop contract builder', 'Aadhaar & OTP-based e-sign', 'Clause and template library', 'Real-time collaboration', 'Audit trail & activity log', 'Contract status tracking'].map((f, i) => (
                  <li key={i}>
                    <svg className="mk-chk" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={MI.check}/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

/* ── Main ProductPage export ─────────────────────────────────── */
export default function ProductPage() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const p  = prodBy(id)
  const cat = p ? catBy(p.cat) : null

  if (!p) {
    return (
      <div style={{ paddingBottom: 70 }}>
        <div className="page-hero" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <nav className="crumb reveal-up in">
              <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
              <a href="/market">Marketplace</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
              <span className="cur">Not found</span>
            </nav>
          </div>
        </div>
        <div className="wrap" style={{ paddingTop: 48 }}>
          <h2>Product not found</h2>
          <p className="mut">It may have been moved. <a href="/market">Back to the marketplace</a>.</p>
        </div>
      </div>
    )
  }

  /* Enhanced Doqfy experience */
  if (p.id === 'doqfy') {
    return <DoqfyPage p={p} cat={cat} />
  }

  /* Generic product page (all other products) */
  const related = inCat(p.cat).filter(x => x.id !== p.id).slice(0, 3)

  return (
    <div style={{ paddingBottom: 70 }}>
      <div className="page-hero" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/market">Marketplace</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href={`/market/category?cat=${p.cat}`}>{cat ? cat.name : ''}</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">{p.name}</span>
          </nav>
        </div>
      </div>

      <main style={{ paddingBottom: 0 }}>
        <div className="mk-p-grid wrap">
          <div className="mk-p-main">
            <div className="mk-p-head">
              <Tile p={p} size="lg" />
              <div>
                <div className="mk-cat-chip">
                  {cat && (
                    <svg className="mk-ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={MI[cat.icon]}/>
                    </svg>
                  )}
                  {cat ? cat.name : ''}
                </div>
                <h1>{p.name}</h1>
                <p className="mk-p-tag">{p.tagline}</p>
                <div className="mk-p-meta">
                  <RateLine p={p} />
                  <Badge p={p} />
                </div>
              </div>
            </div>

            <Gallery p={p} />

            <div className="mk-p-section">
              <h2>About {p.name}</h2>
              <p>{p.desc}</p>
            </div>

            <div className="mk-p-section">
              <h2>Key features</h2>
              <ul className="mk-feats">
                {p.features.map((f, i) => (
                  <li key={i}>
                    <svg className="mk-chk" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={MI.check}/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="mk-p-side">
            <div className="mk-buybox">
              <div className="mk-price-lg">{p.price}</div>
              <a
                className="btn btn-primary"
                href="/company/contact"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Get it set up by LauncherDesk
              </a>
              <div className="mk-trust">
                <svg className="mk-ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={MI.shield}/>
                </svg>
                LauncherDesk can procure, configure &amp; onboard this for you.
              </div>
              <div className="mk-spec"><span>Category</span><b>{cat ? cat.name : ''}</b></div>
              {p.rating != null && <div className="mk-spec"><span>Rating</span><b>{p.rating.toFixed(1)} / 5</b></div>}
              {p.reviews != null && <div className="mk-spec"><span>Reviews</span><b>{nfmt(p.reviews)}</b></div>}
            </div>
          </aside>
        </div>
      </main>

      {related.length > 0 && (
        <section className="section-sm">
          <div className="wrap">
            <div className="sec-head" style={{ marginBottom: 22 }}>
              <span className="eyebrow">Keep exploring</span>
              <h2 style={{ fontSize: 'clamp(24px,3vw,34px)' }}>Other {cat ? cat.name : ''} tools</h2>
            </div>
            <div className="mk-cardgrid">
              {related.map(r => <ProductCard key={r.id} p={r} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}