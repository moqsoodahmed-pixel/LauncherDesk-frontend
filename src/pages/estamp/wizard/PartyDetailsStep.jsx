export default function PartyDetailsStep({ f, set, errs, inCls, Err }) {
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
        <select id="payer" className={inCls('payer')} value={f.payer} onChange={set('payer')}>
          <option value="" disabled>Choose who pays</option>
          <option value="First Party">{f.firstParty.trim() ? `${f.firstParty.trim()} (First Party)` : 'First Party'}</option>
          <option value="Second Party">{f.secondParty.trim() ? `${f.secondParty.trim()} (Second Party)` : 'Second Party'}</option>
        </select>
        <Err k="payer" />
      </div>
    </>
  )
}
