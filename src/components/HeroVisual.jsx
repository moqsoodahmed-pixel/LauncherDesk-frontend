import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const FLOATING_SERVICES = [
  {
    id: 'corp',
    title: 'Company Registration',
    subtitle: 'Pvt Ltd, LLP & OPC',
    icon: (
      <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M9 3h6v4H9z" />
      </svg>
    ),
    badge: 'MCA Approved',
    badgeColor: '#10B981',
    link: '/services/private-limited-company-registration',
    className: 'hv-card--top-left',
    depth: 1.18,
    mobile: true,
  },
  {
    id: 'gst',
    title: 'GST & Tax Filing',
    subtitle: 'Monthly & Annual Filings',
    icon: (
      <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    badge: '100% On-Time',
    badgeColor: '#3B82F6',
    link: '/services/gst-registration',
    className: 'hv-card--top-right',
    depth: 1.14,
    mobile: true,
  },
  {
    id: 'tm',
    title: 'Trademark & IP',
    subtitle: 'Brand & Logo Protection',
    icon: (
      <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    badge: 'Class 1-45',
    badgeColor: '#8B5CF6',
    link: '/services/trademark-registration',
    className: 'hv-card--mid-left',
    depth: 1.28,
    mobile: true,
  },
  {
    id: 'payroll',
    title: 'Payroll & HR',
    subtitle: 'Salaries, PF & ESI',
    icon: (
      <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    badge: 'Automated',
    badgeColor: '#F59E0B',
    link: '/company/contact',
    className: 'hv-card--mid-right',
    depth: 1.1,
    mobile: true,
  },
  {
    id: 'it',
    title: 'IT & Web Services',
    subtitle: 'Custom Web & SaaS',
    icon: (
      <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
      </svg>
    ),
    badge: 'Modern Stack',
    badgeColor: '#06B6D4',
    link: '/services/website-development',
    className: 'hv-card--bot-left',
    depth: 1.22,
    mobile: true,
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    subtitle: 'SEO & Growth Ads',
    icon: (
      <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="m4.5 16.5-1.5 5 5-1.5M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      </svg>
    ),
    badge: 'High ROI',
    badgeColor: '#EC4899',
    link: '/digital-marketing',
    className: 'hv-card--bot-right',
    depth: 1.25,
    mobile: true,
  },
]

export default function HeroVisual() {
  const wrapRef = useRef(null)
  const containerRef = useRef(null)
  const [scale, setScale] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 590) {
      return Number(Math.min(1, Math.max(0.48, (window.innerWidth - 24) / 580)).toFixed(3))
    }
    return 1
  })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  // Fluid responsive scale calculation
  useEffect(() => {
    const updateScale = () => {
      if (!wrapRef.current) return
      const availableWidth = wrapRef.current.clientWidth || window.innerWidth
      if (availableWidth > 0 && availableWidth < 590) {
        const computed = Math.min(1, Math.max(0.48, (availableWidth - 12) / 580))
        setScale(Number(computed.toFixed(3)))
      } else {
        setScale(1)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale, { passive: true })
    window.addEventListener('orientationchange', updateScale, { passive: true })

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(updateScale)
      : null

    if (observer && wrapRef.current) {
      observer.observe(wrapRef.current)
    }

    return () => {
      window.removeEventListener('resize', updateScale)
      window.removeEventListener('orientationchange', updateScale)
      if (observer) observer.disconnect()
    }
  }, [])

  // Smooth 60fps lerped mouse parallax
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const nx = (e.clientX - centerX) / (rect.width / 2 || 1)
      const ny = (e.clientY - centerY) / (rect.height / 2 || 1)
      
      targetPos.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      }
    }

    const handleMouseLeave = () => {
      targetPos.current = { x: 0, y: 0 }
    }

    const animateParallax = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.08
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.08

      setMousePos({
        x: currentPos.current.x,
        y: currentPos.current.y,
      })

      rafId.current = requestAnimationFrame(animateParallax)
    }

    const el = containerRef.current
    if (el) {
      el.addEventListener('mousemove', handleMouseMove, { passive: true })
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true })
      rafId.current = requestAnimationFrame(animateParallax)
    }

    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      className="hv-wrap"
      ref={wrapRef}
      style={{
        height: `${Math.round(380 * scale)}px`,
      }}
    >
      <div
        className="hv-scaler"
        style={{
          width: `${Math.round(580 * scale)}px`,
          height: `${Math.round(380 * scale)}px`,
        }}
      >
        <div
          className="hv-container"
          ref={containerRef}
          aria-label="LauncherDesk 360 Degree Business Platform Ecosystem"
          style={{
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          {/* ── Layer 1: Ambient Glow & Orbital Grid ── */}
          <div
            className="hv-ambient-glow"
            style={{
              transform: `translate3d(${mousePos.x * 4}px, ${mousePos.y * 4}px, 0)`,
            }}
          />

        <svg className="hv-orbit-svg" viewBox="0 0 580 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="hv-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1D6FE0" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0F52C0" stopOpacity="0.05" />
            </linearGradient>
            <radialGradient id="hv-center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Center Glow Area */}
          <circle cx="290" cy="190" r="155" fill="url(#hv-center-glow)" />

          {/* Orbital Ellipses */}
          <ellipse cx="290" cy="190" rx="265" ry="168" stroke="url(#hv-line-grad)" strokeWidth="1.5" strokeDasharray="6 8" className="hv-orbit-spin-slow" />
          <ellipse cx="290" cy="190" rx="200" ry="125" stroke="url(#hv-line-grad)" strokeWidth="1.2" className="hv-orbit-spin-rev" />
          <ellipse cx="290" cy="190" rx="135" ry="85" stroke="url(#hv-line-grad)" strokeWidth="1" strokeDasharray="3 5" />

          {/* Dynamic Connection Rays linking hub to orbiting quadrants */}
          <line x1="290" y1="190" x2="95" y2="35" stroke="rgba(29,111,224,0.15)" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="290" y1="190" x2="485" y2="35" stroke="rgba(29,111,224,0.15)" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="290" y1="190" x2="55" y2="190" stroke="rgba(29,111,224,0.15)" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="290" y1="190" x2="525" y2="190" stroke="rgba(29,111,224,0.15)" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="290" y1="190" x2="95" y2="345" stroke="rgba(29,111,224,0.15)" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="290" y1="190" x2="485" y2="345" stroke="rgba(29,111,224,0.15)" strokeWidth="1.2" strokeDasharray="4 4" />

          {/* Orbiting Tech Nodes */}
          <circle cx="290" cy="22" r="4" fill="#3B82F6" className="hv-node-pulse-1" />
          <circle cx="555" cy="190" r="3.5" fill="#10B981" className="hv-node-pulse-2" />
          <circle cx="290" cy="358" r="4" fill="#8B5CF6" className="hv-node-pulse-3" />
          <circle cx="25" cy="190" r="3" fill="#3B82F6" className="hv-node-pulse-1" />
        </svg>

        {/* ── Layer 2: Central Platform Orchestration Hub ── */}
        <div
          className="hv-central-hub"
          style={{
            transform: `translate3d(${mousePos.x * 5}px, ${mousePos.y * 5}px, 0)`,
          }}
        >
          {/* Hub Header */}
          <div className="hv-hub-header">
            <div className="hv-hub-brand">
              <div className="hv-hub-logo-dot">
                <svg viewBox="0 0 24 24" width={13} height={13} fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <div className="hv-hub-title">LauncherDesk HQ</div>
                <div className="hv-hub-sub">Unified Business Engine</div>
              </div>
            </div>
            <div className="hv-live-badge">
              <span className="hv-live-dot" />
              <span>360° Live</span>
            </div>
          </div>

          {/* Hub Core Business Grid */}
          <div className="hv-hub-grid">
            <div className="hv-hub-pill">
              <div className="hv-pill-top">
                <span className="hv-pill-icon" style={{ background: '#EFF6FF', color: '#1D6FE0' }}>🏢</span>
                <span className="hv-pill-stat">SPICe+ MCA</span>
              </div>
              <div className="hv-pill-name">Incorporation</div>
              <div className="hv-pill-meta">100% Digital</div>
            </div>

            <div className="hv-hub-pill">
              <div className="hv-pill-top">
                <span className="hv-pill-icon" style={{ background: '#ECFDF5', color: '#059669' }}>📊</span>
                <span className="hv-pill-stat">GST &amp; ROC</span>
              </div>
              <div className="hv-pill-name">Tax &amp; Filings</div>
              <div className="hv-pill-meta">Automated</div>
            </div>

            <div className="hv-hub-pill">
              <div className="hv-pill-top">
                <span className="hv-pill-icon" style={{ background: '#F5F3FF', color: '#7C3AED' }}>🌐</span>
                <span className="hv-pill-stat">Web &amp; Apps</span>
              </div>
              <div className="hv-pill-name">IT &amp; Software</div>
              <div className="hv-pill-meta">Production-Ready</div>
            </div>

            <div className="hv-hub-pill">
              <div className="hv-pill-top">
                <span className="hv-pill-icon" style={{ background: '#FFF1F2', color: '#E11D48' }}>🚀</span>
                <span className="hv-pill-stat">SEO &amp; Ads</span>
              </div>
              <div className="hv-pill-name">Growth Engine</div>
              <div className="hv-pill-meta">Lead Generation</div>
            </div>
          </div>

          {/* Hub Live Activity & Metric Stream */}
          <div className="hv-hub-footer">
            <div className="hv-metric-box">
              <div className="hv-metric-val">99.8%</div>
              <div className="hv-metric-lbl">Compliance</div>
            </div>
            <div className="hv-metric-divider" />
            <div className="hv-metric-box">
              <div className="hv-metric-val">1 Desk</div>
              <div className="hv-metric-lbl">Single Point</div>
            </div>
            <div className="hv-metric-divider" />
            <div className="hv-metric-box">
              <div className="hv-metric-val" style={{ color: '#059669' }}>24/7</div>
              <div className="hv-metric-lbl">Support</div>
            </div>
          </div>
        </div>

        {/* ── Layer 3: Floating Organic Service Cards ── */}
        <div className="hv-cards-layer">
          {FLOATING_SERVICES.map((svc) => (
            <Link
              key={svc.id}
              to={svc.link}
              className={`hv-card ${svc.className}`}
              style={{
                transform: `translate3d(${mousePos.x * 8 * svc.depth}px, ${mousePos.y * 8 * svc.depth}px, 0)`,
              }}
              aria-label={`Explore ${svc.title}`}
            >
              <div className="hv-card-left">
                <div className="hv-card-icon">{svc.icon}</div>
                <div className="hv-card-text">
                  <div className="hv-card-title">{svc.title}</div>
                  <div className="hv-card-sub">{svc.subtitle}</div>
                </div>
              </div>
              <span className="hv-card-badge" style={{ '--b-color': svc.badgeColor }}>
                {svc.badge}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
