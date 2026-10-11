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
    return t ? items.filter(a => `${a.label} ${a.code} article ${a.code} ${a.hint || ''}`.toLowerCase().includes(t)) : items
  }, [q, items])

  useEffect(() => {
    if (!open) return
    setTimeout(() => search.current?.focus(), 0)
    const off = e => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', off)
    return () => document.removeEventListener('mousedown', off)
  }, [open])

  const pick = a => { onChange(keyOf(a)); setOpen(false); setQ('') }
  const onKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => Math.min(i + 1, list.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && list[active]) { e.preventDefault(); pick(list[active]) }
    else if (e.key === 'Escape') setOpen(false)
  }
  const sub = a => [a.code ? `Article ${a.code}` : '', a.hint].filter(Boolean)

  return (
    <div className="lda" ref={wrap}>
      <button type="button" id="dt" className={`lda-btn${invalid ? ' bad' : ''}`} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <span className="t">
          {sel ? <><b>{sel.label}</b>{sub(sel).length > 0 && <small>{sub(sel).join(', ')}</small>}</> : <span className="ph">Search or choose the document</span>}
        </span>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="lda-pop">
          <div className="lda-search">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 2-4.35-4.35" /></svg>
            <input ref={search} value={q} onChange={e => { setQ(e.target.value); setActive(0) }} onKeyDown={onKey}
              placeholder={verified ? 'Search, e.g. lease, affidavit or 5(J)' : 'Search document types'} aria-label="Search documents"
              role="combobox" aria-expanded="true" aria-controls="lda-list" aria-activedescendant={list[active] ? `lda-${list.indexOf(list[active])}` : undefined} />
          </div>
          <ul className="lda-list" id="lda-list" role="listbox" aria-label="Documents">
            {list.length ? list.map((a, i) => (
              <li key={keyOf(a)}>
                <button type="button" id={`lda-${i}`} role="option" aria-selected={i === active} className="lda-opt"
                  onMouseEnter={() => setActive(i)} onClick={() => pick(a)}
                  ref={el => { if (el && i === active) el.scrollIntoView({ block: 'nearest' }) }}>
                  <span className="chk" aria-hidden="true">{keyOf(a) === value ? '✓' : ''}</span>
                  <span><b>{a.label}</b>
                    {(a.code || a.hint || a.rule) && <small>{[a.code && `Article ${a.code}`, a.hint].filter(Boolean).join(', ')}{a.rule && <> {a.code || a.hint ? ', ' : ''}<i>{ruleText(a.rule)}</i></>}</small>}
                  </span>
                </button>
              </li>
            )) : <li className="lda-empty">No match. Choose "Other document" and describe it in the purpose.</li>}
          </ul>
          <div className="lda-src">
            {verified ? `Articles from the official ${stateName} e-stamping list.` : `Our team confirms the exact ${stateName} article before buying your stamp.`}
          </div>
        </div>
      )}
    </div>
  )
}

export default function DocumentDetailsStep({ f, setF, set, errs, setErrs, inCls, Err, st, verified, articles, article, rule, baseField }) {
  return (
    <>
      <h2>What is it for?</h2>
      <p className="lead">
        {verified
          ? <>Pick the article your document falls under. Where {st.name}'s rules fix the duty, we fill it in for you.</>
          : <>Pick your document and we'll confirm the exact {st.name} article and duty before buying the stamp.</>}
      </p>
      <div className="lds-f">
        <label htmlFor="dt">Document type</label>
        <ArticlePicker items={articles} value={f.article} verified={verified} stateName={st.name} invalid={!!errs.docType}
          onChange={k => { setF(v => ({ ...v, article: k })); setErrs(x => ({ ...x, docType: undefined, base: undefined, duty: undefined })) }} />
        <Err k="docType" />
        {article?.rule?.type === 'text' && <div className="lds-rule"><span>How the duty is worked out: <b>{article.rule.text}</b> We'll ask for the amount on the next step.</span></div>}
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
