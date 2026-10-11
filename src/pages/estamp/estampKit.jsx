import { useState } from 'react'

/** Small shared component kit for the e-Stamp module (Button/Card/Accordion/Steps/Badge). */

export function EButton({ as: As = 'button', variant = 'primary', className = '', ...props }) {
  return <As className={`ek-btn ${variant} ${className}`.trim()} {...props} />
}

export function ECard({ className = '', flush = false, ...props }) {
  return <div className={`ek-card${flush ? ' flush' : ''} ${className}`.trim()} {...props} />
}

export function EBadge({ soft = false, children }) {
  return <span className={`ek-badge${soft ? ' soft' : ''}`}>{children}</span>
}

export function EAccordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div>
      {items.map(([q, a], i) => {
        const open = openIdx === i
        return (
          <div className="ek-acc" key={q} data-open={open}>
            <button type="button" className="ek-acc-q" aria-expanded={open} onClick={() => setOpenIdx(open ? null : i)}>
              {q}<span className="ek-acc-ic" aria-hidden="true">+</span>
            </button>
            {open && <p className="ek-acc-a">{a}</p>}
          </div>
        )
      })}
    </div>
  )
}

export function EStepRail({ steps, step, maxStep, done, onGoTo }) {
  return (
    <ol className="ek-steps" aria-label="Order steps" style={{ listStyle: 'none' }}>
      {steps.map((s, i) => {
        const n = i + 1
        const cls = done || n < step ? 'done' : n === step ? 'now' : ''
        return (
          <li key={s.t} className={`ek-step ${cls}`.trim()}>
            <button type="button" disabled={!!done || n > maxStep} onClick={() => onGoTo(n)} aria-current={n === step ? 'step' : undefined}>
              <span className="ek-step-dot">{cls === 'done' ? '✓' : n}</span>
              <b>{s.t}</b>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
