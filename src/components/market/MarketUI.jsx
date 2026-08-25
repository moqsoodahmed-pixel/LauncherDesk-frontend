import { useState } from 'react'
import { catBy, initials, nfmt, inCat } from '../../data/market'

/* ── Icon paths ────────────────────────────────────────────── */
export const MI = {
  crm:     'M17 21v-2a4 4 0 0 0-3-3.87M9 21v-2a4 4 0 0 1 3-3.87M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M23 11h-6',
  erp:     'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  project: 'M3 3h18v18H3zM9 3v18M15 3v18M9 9h6M9 14h6',
  hr:      'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6',
  box:     'M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8zm-17.7-.7 8.7 5 8.7-5M12 22V12',
  wa:      'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z',
  clm:     'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6M14 2v6h6M14 2l6 6M9 13h4M9 17h2M14.5 19.5 17 22l4-4.5',
  star:    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  ext:     'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3',
  check:   'M20 6 9 17l-5-5',
  shield:  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  spark:   'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z',
  search:  'M11 11a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 10-4.3-4.3',
}

export function Icon({ d, className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

/* ── Stars ──────────────────────────────────────────────────── */
export function Stars({ rating }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100))
  const row = [0,1,2,3,4].map(i => (
    <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d={MI.star}/>
    </svg>
  ))
  return (
    <span className="mk-stars" aria-label={`${rating} out of 5`}>
      <span className="s-bg">{row}</span>
      <span className="s-fg" style={{ width: `${pct}%` }}>{row}</span>
    </span>
  )
}

export function RateLine({ p }) {
  if (p.rating == null) return null
  return (
    <span className="mk-rate">
      <Stars rating={p.rating} />
      <b>{p.rating.toFixed(1)}</b>
      {p.reviews != null && <span className="mk-rev">({nfmt(p.reviews)})</span>}
    </span>
  )
}

/* ── Monogram tile ──────────────────────────────────────────── */
export function Tile({ p, size }) {
  // If product has a logoUrl, show image instead of initials
  if (p.logoUrl) {
    return (
      <span
        className={`mk-tile${size === 'lg' ? ' lg' : ''}`}
        style={{ '--c': p.c, background: '#fff', border: '1.5px solid #E2E8F0', overflow: 'hidden', padding: 0 }}
      >
        <img
          src={p.logoUrl}
          alt={p.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 'inherit' }}
        />
      </span>
    )
  }
  return (
    <span
      className={`mk-tile${size === 'lg' ? ' lg' : ''}`}
      style={{ '--c': p.c }}
    >
      {initials(p.name)}
    </span>
  )
}

/* ── Badge ──────────────────────────────────────────────────── */
export function Badge({ p }) {
  return p.badge ? <span className="mk-badge">{p.badge}</span> : null
}

/* ── Mock product screenshot (SVG) ─────────────────────────── */
export function MockShot({ p, variant }) {
  const c = p.c
  const ini = initials(p.name)

  const head = (
    <>
      <rect x="0" y="0" width="640" height="52" fill={c}/>
      <circle cx="26" cy="26" r="9" fill="#ffffff" opacity="0.9"/>
      <text x="26" y="30" textAnchor="middle" fontFamily="Poppins,sans-serif" fontSize="10" fontWeight="700" fill={c}>{ini}</text>
      <rect x="46" y="21" width="120" height="10" rx="5" fill="#ffffff" opacity="0.85"/>
      <rect x="560" y="18" width="58" height="16" rx="8" fill="#ffffff" opacity="0.22"/>
    </>
  )

  let body = null
  if (variant === 0) {
    body = (
      <>
        <rect x="24" y="76" width="180" height="14" rx="7" fill="#0D1F3C" opacity="0.8"/>
        {[0,1,2,3,4].map(i => {
          const y = 110 + i * 46
          return (
            <g key={i}>
              <rect x="24" y={y} width="592" height="34" rx="8" fill="#f1f5f9"/>
              <circle cx="46" cy={y + 17} r="9" fill={c} opacity="0.85"/>
              <rect x="66" y={y + 8} width="150" height="8" rx="4" fill="#334155"/>
              <rect x="66" y={y + 21} width="90" height="7" rx="3.5" fill="#94a3b8"/>
              <rect x="300" y={y + 13} width="70" height="8" rx="4" fill="#cbd5e1"/>
              <rect x="520" y={y + 11} width="72" height="12" rx="6" fill={c} opacity="0.2"/>
            </g>
          )
        })}
      </>
    )
  } else if (variant === 1) {
    const cols = ['#e2e8f0', '#dbeafe', '#dcfce7']
    body = (
      <>
        {[0,1,2].map(k => {
          const x = 24 + k * 200
          return (
            <g key={k}>
              <rect x={x} y="72" width="184" height="292" rx="12" fill="#f8fafc"/>
              <rect x={x + 14} y="86" width="90" height="9" rx="4.5" fill="#334155"/>
              {[0,1,2].map(j => {
                const cy = 110 + j * 82
                return (
                  <g key={j}>
                    <rect x={x + 12} y={cy} width="160" height="68" rx="10" fill="#ffffff"/>
                    <rect x={x + 24} y={cy + 14} width="120" height="8" rx="4" fill="#475569"/>
                    <rect x={x + 24} y={cy + 30} width="80" height="7" rx="3.5" fill="#cbd5e1"/>
                    <rect x={x + 24} y={cy + 46} width="46" height="12" rx="6" fill={c} opacity="0.25"/>
                    <circle cx={x + 150} cy={cy + 52} r="8" fill={cols[k]}/>
                  </g>
                )
              })}
            </g>
          )
        })}
      </>
    )
  } else {
    const bars = [70, 120, 90, 150, 110, 170, 140]
    body = (
      <>
        <rect x="24" y="72" width="380" height="180" rx="12" fill="#f8fafc"/>
        {bars.map((bh, b) => (
          <rect key={b} x={48 + b * 50} y={240 - bh} width="26" height={bh} rx="5" fill={c} opacity={0.5 + b * 0.06}/>
        ))}
        <rect x="420" y="72" width="196" height="86" rx="12" fill={c}/>
        <rect x="440" y="92" width="70" height="8" rx="4" fill="#ffffff" opacity="0.7"/>
        <rect x="440" y="112" width="120" height="18" rx="6" fill="#ffffff" opacity="0.95"/>
        <rect x="440" y="140" width="90" height="7" rx="3.5" fill="#ffffff" opacity="0.55"/>
        <rect x="420" y="166" width="196" height="86" rx="12" fill="#f1f5f9"/>
        <circle cx="470" cy="209" r="30" fill="none" stroke={c} strokeWidth="12" opacity="0.85"/>
        <circle cx="470" cy="209" r="30" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeDasharray="60 188"/>
        <rect x="520" y="192" width="80" height="8" rx="4" fill="#475569"/>
        <rect x="520" y="212" width="60" height="7" rx="3.5" fill="#cbd5e1"/>
        <rect x="24" y="268" width="592" height="96" rx="12" fill="#f8fafc"/>
        {[0,1,2].map(r => {
          const ry = 284 + r * 26
          return (
            <g key={r}>
              <rect x="40" y={ry} width="10" height="10" rx="3" fill={c} opacity="0.7"/>
              <rect x="62" y={ry + 1} width="200" height="8" rx="4" fill="#94a3b8"/>
              <rect x="470" y={ry + 1} width="120" height="8" rx="4" fill="#e2e8f0"/>
            </g>
          )
        })}
      </>
    )
  }

  return (
    <svg className="mk-shot" viewBox="0 0 640 388" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label={`${p.name} interface preview`}>
      <rect x="0" y="0" width="640" height="388" rx="14" fill="#ffffff"/>
      {head}
      {body}
      <rect x="0.5" y="0.5" width="639" height="387" rx="14" fill="none" stroke="#e2e8f0"/>
    </svg>
  )
}

/* ── Gallery with thumb switcher ───────────────────────────── */
export function Gallery({ p }) {
  const [active, setActive] = useState(0)
  const shots = [0, 2, 1]  // variants: list, dashboard, kanban
  return (
    <div className="mk-gallery">
      <div className="mk-shot-main">
        <MockShot p={p} variant={shots[active]} />
      </div>
      <div className="mk-thumbs">
        {shots.map((v, i) => (
          <button
            key={i}
            className={`mk-thumb${active === i ? ' on' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Screenshot ${i + 1}`}
          >
            <MockShot p={p} variant={v} />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Product card ───────────────────────────────────────────── */
export function ProductCard({ p }) {
  const cat = catBy(p.cat)
  const iconPath = cat ? MI[cat.icon] : MI.spark
  const firstSentence = p.desc.split('. ')[0] + '.'

  if (p.soon) {
    return (
      <div className="mk-card mk-card--soon reveal-up">
        <div className="mk-card-top">
          <Tile p={p} />
          <span className="mk-badge mk-badge--soon">Adding Soon</span>
        </div>
        <div className="mk-cat-chip">
          <svg className="mk-ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={iconPath}/>
          </svg>
          {cat ? cat.name : ''}
        </div>
        <h3>{p.name}</h3>
        <p className="mk-tag">{p.tagline}</p>
        <p className="mk-desc">{firstSentence}</p>
        <div className="mk-card-foot">
          <RateLine p={p} />
          <span className="mk-price mk-price--soon">Adding Soon</span>
        </div>
      </div>
    )
  }

  return (
    <a className="mk-card reveal-up" href={`/market/product?id=${p.id}`}>
      <div className="mk-card-top">
        <Tile p={p} />
        <Badge p={p} />
      </div>
      <div className="mk-cat-chip">
        <svg className="mk-ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={iconPath}/>
        </svg>
        {cat ? cat.name : ''}
      </div>
      <h3>{p.name}</h3>
      <p className="mk-tag">{p.tagline}</p>
      <p className="mk-desc">{firstSentence}</p>
      <div className="mk-card-foot">
        <RateLine p={p} />
        <span className="mk-price">{p.price}</span>
      </div>
      <span className="mk-explore">
        Explore{' '}
        <svg className="mk-ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={MI.ext}/>
        </svg>
      </span>
    </a>
  )
}

/* ── Category card ──────────────────────────────────────────── */
export function CategoryCard({ c }) {
  const count = inCat(c.slug).length
  return (
    <a className="mk-catcard reveal-up" href={`/market/category?cat=${c.slug}`}>
      <span className="mk-catic">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={MI[c.icon]}/>
        </svg>
      </span>
      <div className="mk-catbody">
        <span className="mk-cattag">{c.tag}</span>
        <h3>{c.name}</h3>
        <p>{c.blurb}</p>
        <span className="mk-catlink">
          {count} tools · Explore{' '}
          <svg className="mk-ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={MI.ext}/>
          </svg>
        </span>
      </div>
    </a>
  )
}