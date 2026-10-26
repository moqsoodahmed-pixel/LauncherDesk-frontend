import { useEffect, useRef, useState } from 'react'

/** Small custom listbox for "Who pays the stamp duty?" — a native <select>'s open
 *  popup is rendered by the OS/browser and can't be styled, which clashed badly with
 *  this wizard's dark theme. This reuses the same .lda-* classes as the document-type
 *  picker so it always renders consistently, on every browser and OS. */
function PayerPicker({ value, options, onChange, invalid }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  const selected = options.find(o => o.value === value)

  useEffect(() => {
    if (!open) return
    const off = e => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', off)
    return () => document.removeEventListener('mousedown', off)
  }, [open])

  const pick = o => { onChange(o.value); setOpen(false) }

  return (
    <div className="lda" ref={wrap}>
      <button type="button" id="payer" className={`lda-btn${invalid ? ' bad' : ''}`} aria-haspopup="listbox" aria-expanded={open}
        onClick={() => setOpen(o => !o)}>
        <span className={`t${selected ? '' : ' ph'}`}>{selected ? selected.label : 'Choose who pays'}</span>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="lda-pop">
          <ul className="lda-list" role="listbox" aria-label="Who pays the stamp duty?">
            {options.map(o => (
              <li key={o.value}>
                <button type="button" role="option" aria-selected={o.value === value} className="lda-opt" onClick={() => pick(o)}>
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function PartyDetailsStep({ f, set, setF, setErrs, errs, inCls, Err }) {
  const payerOptions = [
    { value: 'First Party', label: f.firstParty.trim() ? `${f.firstParty.trim()} (First Party)` : 'First Party' },
    { value: 'Second Party', label: f.secondParty.trim() ? `${f.secondParty.trim()} (Second Party)` : 'Second Party' },
  ]
  return (
    <>
      <h2>Who is the stamp for?</h2>
      <p className="lead">These names are printed on the certificate exactly as you type them.</p>
      <div className="lds-f">
        <label htmlFor="fp">First party</label>
        <input id="fp" className={inCls('firstParty')} value={f.firstParty} onChange={set('firstParty')} placeholder="e.g. landlord or person giving the affidavit" autoComplete="name" />
        <Err k="firstParty" />
      </div>
      <div className="lds-f">
        <label htmlFor="sp">Second party</label>
        <input id="sp" className={inCls('secondParty')} value={f.secondParty} onChange={set('secondParty')} placeholder="e.g. tenant, or NIL" />
        <div className="lds-help">For an affidavit or declaration with no second party, write NIL.</div>
        <Err k="secondParty" />
      </div>
      <div className="lds-f">
        <label htmlFor="payer">Who pays the stamp duty?</label>
        <PayerPicker value={f.payer} options={payerOptions} invalid={!!errs.payer}
          onChange={v => { setF(prev => ({ ...prev, payer: v })); setErrs(x => (x.payer ? { ...x, payer: undefined } : x)) }} />
        <Err k="payer" />
      </div>
    </>
  )
}
