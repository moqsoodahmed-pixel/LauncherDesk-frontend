import { useEffect, useMemo, useRef, useState } from 'react'
import { keyOf, ruleText } from '../../../data/estampArticles'

function ArticlePicker({ items, value, onChange, invalid, verified, stateName }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const wrap = useRef(null)
  const search = useRef(null)
  const sel = items.find(a => keyOf(a) === value)

  const list = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? items.filter(a => `${a.code || ''} ${a.label} ${a.hint || ''}`.toLowerCase().includes(t)) : items
  }, [q, items])

  useEffect(() => {
    if (!open) return
    setTimeout(() => search.current?.focus(), 0)
    const off = e => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', off)
    return () => document.removeEventListener('mousedown', off)
  }, [open])

  const pick = a => {
    if (!a) {
      onChange('')
    } else {
      onChange(keyOf(a))
    }
    setOpen(false)
    setQ('')
  }

  const onKey = e => {
    const hasDefault = !q.trim()
    const total = list.length + (hasDefault ? 1 : 0)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(i => Math.min(i + 1, total - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (hasDefault && active === 0) {
        pick(null)
      } else {
        const item = hasDefault ? list[active - 1] : list[active]
        if (item) pick(item)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const formatItem = a => {
    if (!a) return 'Select article'
    return a.code ? `${a.code} - ${a.label}` : a.label
  }

  return (
    <div className="lda" ref={wrap}>
      <button
        type="button"
        id="dt"
        className={`lda-btn${invalid ? ' bad' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className={`t${sel ? '' : ' ph'}`}>
          {sel ? formatItem(sel) : 'Select article'}
        </span>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="lda-pop">
          <div className="lda-search">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 2-4.35-4.35" />
            </svg>
            <input
              ref={search}
              value={q}
              onChange={e => { setQ(e.target.value); setActive(0) }}
              onKeyDown={onKey}
              placeholder="Search, e.g. lease, affidavit or 5(J)"
              aria-label="Search documents"
              role="combobox"
              aria-expanded="true"
              aria-controls="lda-list"
            />
          </div>

          <ul className="lda-list" id="lda-list" role="listbox" aria-label="Documents">
            {!q.trim() && (
              <li>
                <button
                  type="button"
                  id="lda-opt-default"
                  role="option"
                  aria-selected={!value || active === 0}
                  className={`lda-opt lda-opt-default${(!value || active === 0) ? ' active' : ''}`}
                  onMouseEnter={() => setActive(0)}
                  onClick={() => pick(null)}
                >
                  Select article
                </button>
              </li>
            )}
            {list.length ? list.map((a, i) => {
              const optIndex = q.trim() ? i : i + 1
              const isSelected = keyOf(a) === value
              const isFocused = active === optIndex
              return (
                <li key={keyOf(a)}>
                  <button
                    type="button"
                    id={`lda-${i}`}
                    role="option"
                    aria-selected={isSelected}
                    className={`lda-opt${isSelected ? ' active' : ''}`}
                    onMouseEnter={() => setActive(optIndex)}
                    onClick={() => pick(a)}
                    ref={el => { if (el && isFocused) el.scrollIntoView({ block: 'nearest' }) }}
                  >
                    {formatItem(a)}
                  </button>
                </li>
              )
            }) : (
              <li className="lda-empty">No article matching your search.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function DocumentDetailsStep({ f, setF, set, errs, setErrs, inCls, Err, st, verified, articles, rule, baseField }) {
  return (
    <>
      <div className="lds-step-tag">STEP 2 OF 5</div>
      <h2>What is the stamp for?</h2>
      <p className="lead">
        Stamp paper for {st.name}. Choose the document (article) so we apply the right duty.
      </p>
      <div className="lds-state-check">State availability last checked 2 min ago.</div>
      <div className="lds-f">
        <label htmlFor="dt">Type of document <span style={{ color: '#dc2626' }}>*</span></label>
        <ArticlePicker items={articles} value={f.article} verified={verified} stateName={st.name} invalid={!!errs.docType}
          onChange={k => { setF(v => ({ ...v, article: k })); setErrs(x => ({ ...x, docType: undefined, base: undefined, duty: undefined })) }} />
        <Err k="docType" />
      </div>
      <div className="lds-f">
        <label htmlFor="pu">Purpose</label>
        <textarea id="pu" className={inCls('purpose')} value={f.purpose} onChange={set('purpose')} maxLength={500}
          placeholder="e.g. Rent agreement for flat 12, 4th Cross, Koramangala, Bengaluru" />
        <Err k="purpose" />
      </div>
      {rule && rule.type !== 'fixed' && baseField === 'baseAmount' && (
        <div className="lds-f">
          <label htmlFor="ba">{rule.base}</label>
          <input id="ba" className={inCls('base')} type="number" min="1" inputMode="numeric" value={f.baseAmount} onChange={set('baseAmount')} placeholder="Amount in ₹" />
          <Err k="base" />
        </div>
      )}
      <div className="lds-f">
        <label htmlFor="cp">Consideration amount {baseField === 'consideration' && rule ? null : <span className="lds-optional">(optional)</span>}</label>
        <input id="cp" className={inCls('consideration')} type="number" min="0" inputMode="numeric" value={f.consideration} onChange={set('consideration')} placeholder="e.g. security deposit or deal value, in ₹" />
        <Err k="consideration" />
      </div>
    </>
  )
}
