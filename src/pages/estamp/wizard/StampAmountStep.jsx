import { DENOMINATIONS, MAX_DUTY } from '../../../data/estamp'
import { ruleText } from '../../../data/estampArticles'

const inr = n => `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`

export default function StampAmountStep({ f, setF, set, errs, inCls, Err, st, rule, duty, validDuty, baseField, article }) {
  const denominations = article?.denominations || DENOMINATIONS
  return (
    <>
      <h2>Stamp amount</h2>
      <p className="lead">This is the government stamp duty that will be paid for your document.</p>
      {rule ? (
        <div className="lds-f">
          <div className="lbl">Stamp duty</div>
          <div className="lds-duty-fixed" aria-live="polite">
            <b>{validDuty ? inr(duty) : '₹ —'}</b>
            <span>{rule.type === 'fixed' ? `Fixed by ${st.name}'s rules for this article` : ruleText(rule)}</span>
          </div>
          {baseField === 'consideration' && !errs.base && !validDuty && <div className="lds-help">Enter the consideration amount on the previous step to work out the duty.</div>}
          <Err k="base" />
        </div>
      ) : (
        <div className="lds-f">
          <div className="lbl" id="duty-l">Stamp duty value</div>
          <div className="lds-duty" role="group" aria-labelledby="duty-l">
            {denominations.map(d => (
              <button type="button" key={d} aria-pressed={String(f.duty) === String(d)} onClick={() => setF(v => ({ ...v, duty: String(d) }))}>{inr(d)}</button>
            ))}
            <button type="button" aria-pressed={f.duty === 'custom'} onClick={() => setF(v => ({ ...v, duty: 'custom' }))}>Other</button>
          </div>
          {f.duty === 'custom' && (
            <input className={inCls('duty')} style={{ marginTop: 10 }} type="number" min="1" max={MAX_DUTY} step="1" inputMode="numeric"
              value={f.customDuty} onChange={set('customDuty')} placeholder="Amount in rupees" aria-label="Stamp duty amount in rupees" autoFocus />
          )}
          <Err k="duty" />
        </div>
      )}
      <label className="lds-print">
        <input type="checkbox" checked={f.print} onChange={set('print')} />
        <span><b>Print my document on this e-Stamp.</b> After paying, upload your agreement or affidavit from your order page and we print it on the stamp.</span>
      </label>
    </>
  )
}
