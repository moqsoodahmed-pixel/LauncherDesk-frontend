import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../../components/SEO'
import StampCertificate, { CERT_CSS } from './StampCertificate'
import { ESTAMP_STATES, LD_WA } from '../../data/estamp'

const CSS = `
.lde-wrap { max-width:1160px; margin:0 auto; padding:0 24px; }

/* Hero — navy band, state picker on the left, live certificate on the right */
.lde-hero { background:radial-gradient(900px 520px at 85% 0%, rgba(43,114,212,.35), transparent 60%), linear-gradient(160deg, var(--navy-3) 0%, var(--navy) 55%, var(--navy-2) 100%);
  color:#fff; padding:clamp(44px,6vw,84px) 0 clamp(64px,8vw,104px); position:relative; z-index:2; }
.lde-hero::after { content:''; position:absolute; left:0; right:0; bottom:-1px; height:60px; background:var(--bg, #F8FAFC);
  clip-path:ellipse(75% 100% at 50% 100%); pointer-events:none; }
.lde-hero-grid { display:grid; grid-template-columns:1.05fr .95fr; gap:clamp(32px,5vw,64px); align-items:center; position:relative; z-index:1; }
.lde-hero h1 { font-size:clamp(32px,4.1vw,52px); line-height:1.05; letter-spacing:-.035em; font-weight:800; margin:0 0 18px; max-width:18ch; color:#fff; text-wrap:balance; }
.lde-hero-lead { font-size:clamp(16px,1.6vw,18.5px); line-height:1.65; color:#C9D7EE; margin:0 0 30px; max-width:46ch; }

.lde-pick { background:#fff; border-radius:16px; padding:8px; display:flex; gap:8px; position:relative; max-width:540px;
  box-shadow:0 18px 40px -12px rgba(0,0,0,.45); }
.lde-pick-field { flex:1; position:relative; min-width:0; }
.lde-pick label { position:absolute; left:16px; top:9px; font-size:12px; font-weight:700; color:var(--text-3); pointer-events:none; }
.lde-pick input { width:100%; height:58px; box-sizing:border-box; border:0; outline:none; border-radius:10px; padding:21px 16px 4px;
  font-size:17px; font-weight:700; color:var(--navy); font-family:inherit; background:transparent; }
.lde-pick input::placeholder { color:var(--text-4, #9CA3AF); font-weight:600; }
.lde-pick input:focus-visible { box-shadow:0 0 0 3px var(--brand-200); }
.lde-pick button.go { height:58px; padding:0 24px; border:0; border-radius:11px; background:var(--blue); color:#fff; font-weight:800;
  font-size:16px; font-family:inherit; cursor:pointer; white-space:nowrap; }
.lde-pick button.go:hover { background:var(--blue-dark); }
.lde-pick button.go:focus-visible, .lde-opt:focus-visible { outline:3px solid var(--brand-200); outline-offset:2px; }
.lde-opts { position:absolute; left:-8px; right:-8px; top:calc(100% + 14px); background:#fff; border-radius:14px; padding:6px; z-index:50;
  box-shadow:0 24px 60px -12px rgba(11,31,72,.45), 0 0 0 1px rgba(15,28,46,.06); max-height:min(320px, 60vh); overflow-y:auto;
  overscroll-behavior:contain; scrollbar-width:thin; list-style:none; margin:0; }
.lde-pick { z-index:3; }
.lde-opts-count { padding:8px 12px 6px; font-size:12.5px; font-weight:600; color:var(--text-3); }
.lde-opt { display:flex; justify-content:space-between; align-items:center; gap:10px; width:100%; text-align:left; border:0; background:none;
  padding:11px 12px; border-radius:9px; font-family:inherit; font-size:15px; font-weight:600; line-height:1.3; color:var(--navy); cursor:pointer; }
.lde-opt[aria-selected="true"], .lde-opt:hover { background:var(--brand-50); }
.lde-opt small { color:var(--text-3); font-weight:500; }
.lde-pick-hint { margin:14px 0 0; font-size:14.5px; color:#AFC2E2; }
.lde-pick-hint button { background:none; border:0; padding:0; color:#fff; font:inherit; font-weight:700; text-decoration:underline;
  text-underline-offset:3px; cursor:pointer; }
.lde-facts { display:flex; flex-wrap:wrap; gap:10px 26px; margin:34px 0 0; padding:0; list-style:none; font-size:14.5px; color:#DCE6F5; }
.lde-facts li { display:flex; gap:8px; align-items:center; }
.lde-facts svg { width:18px; height:18px; stroke:#7FB0F0; flex:none; }
.lde-cert { max-width:540px; justify-self:end; width:100%; transform:rotate(-1.2deg); }

/* Sections */
.lde-sec { padding:clamp(52px,6vw,88px) 0; }
.lde-sec h2 { font-size:clamp(26px,3vw,38px); letter-spacing:-.025em; color:var(--navy); margin:0 0 10px; font-weight:800; }
.lde-sec .sub { color:var(--text-2); font-size:16.5px; margin:0 0 34px; max-width:60ch; line-height:1.6; }

.lde-ways { display:grid; grid-template-columns:1fr 1fr; border:1px solid var(--line-strong); border-radius:20px; overflow:hidden; background:#fff; }
.lde-way { padding:clamp(24px,3vw,36px); display:flex; flex-direction:column; }
.lde-way + .lde-way { border-left:1px solid var(--line-strong); background:linear-gradient(180deg,#fff, var(--brand-50)); }
.lde-way h3 { margin:0 0 6px; font-size:21px; color:var(--navy); }
.lde-way p { margin:0 0 18px; color:var(--text-2); line-height:1.6; font-size:15px; }
.lde-way ul { margin:0 0 24px; padding:0; list-style:none; display:grid; gap:9px; flex:1; align-content:start; }
.lde-way li { display:flex; gap:10px; font-size:14.5px; color:var(--text); line-height:1.45; }
.lde-way li svg { width:18px; height:18px; stroke:var(--success); flex:none; margin-top:1px; }
.lde-way-cta { align-self:flex-start; border:0; border-radius:11px; padding:13px 20px; font-family:inherit; font-size:15px; font-weight:700;
  cursor:pointer; background:var(--navy); color:#fff; }
.lde-way + .lde-way .lde-way-cta { background:var(--blue); }

.lde-flow { display:grid; grid-template-columns:repeat(4,1fr); counter-reset:step; position:relative; padding:0; margin:0; }
.lde-flow::before { content:''; position:absolute; left:12%; right:12%; top:22px; height:2px;
  background:repeating-linear-gradient(90deg,var(--brand-200) 0 8px,transparent 8px 14px); }
.lde-flow li { list-style:none; position:relative; padding:0 14px; text-align:center; }
.lde-flow li::before { counter-increment:step; content:counter(step); display:grid; place-items:center; width:46px; height:46px; margin:0 auto 14px;
  border-radius:50%; background:#fff; border:2px solid var(--blue); color:var(--blue); font-weight:800; font-size:17px; position:relative; z-index:1; }
.lde-flow li:last-child::before { background:var(--blue); color:#fff; }
.lde-flow b { display:block; color:var(--navy); font-size:16px; margin-bottom:6px; }
.lde-flow span { display:block; color:var(--text-2); font-size:14px; line-height:1.55; }

.lde-az { columns:4 200px; column-gap:28px; margin:0; padding:0; list-style:none; }
.lde-az li { break-inside:avoid; }
.lde-az .letter { font-weight:800; color:var(--blue); font-size:13px; margin:14px 0 4px; }
.lde-az li:first-child .letter { margin-top:0; }
.lde-az a { display:flex; justify-content:space-between; align-items:center; padding:7px 0; color:var(--navy); text-decoration:none;
  font-weight:600; font-size:15.5px; border-bottom:1px solid var(--line); }
.lde-az a:hover { color:var(--blue); }
.lde-az a svg { width:15px; height:15px; stroke:currentColor; opacity:.5; }
.lde-az-note { margin:22px 0 0; color:var(--text-2); font-size:14.5px; }
.lde-az-note a { color:var(--blue); font-weight:700; }

.lde-biz { display:grid; grid-template-columns:1fr auto; gap:20px; align-items:center; border-radius:20px; padding:clamp(22px,3vw,32px);
  background:var(--box-fill); color:#fff; }
.lde-biz h3 { margin:0 0 6px; font-size:22px; color:#fff; }
.lde-biz p { margin:0; color:#D3E1F5; line-height:1.6; max-width:60ch; }
.lde-biz a { background:#fff; color:var(--navy); font-weight:800; padding:14px 22px; border-radius:11px; text-decoration:none; white-space:nowrap; }

.lde-faq { max-width:820px; }
.lde-faq details { border-bottom:1px solid var(--line-strong); }
.lde-faq summary { cursor:pointer; list-style:none; display:flex; justify-content:space-between; gap:16px; padding:18px 0;
  font-weight:700; font-size:16.5px; color:var(--navy); }
.lde-faq summary::-webkit-details-marker { display:none; }
.lde-faq summary::after { content:'+'; font-size:22px; line-height:1; color:var(--blue); transition:transform .2s; }
.lde-faq details[open] summary::after { transform:rotate(45deg); }
.lde-faq p { margin:0 0 18px; color:var(--text-2); line-height:1.7; font-size:15px; max-width:70ch; }

@media (max-width:900px) { .lde-hero-grid { grid-template-columns:1fr; } .lde-cert { max-width:420px; transform:none; }
  .lde-ways { grid-template-columns:1fr; } .lde-way + .lde-way { border-left:0; border-top:1px solid var(--line-strong); }
  .lde-flow { grid-template-columns:1fr 1fr; row-gap:28px; } .lde-flow::before { display:none; } .lde-biz { grid-template-columns:1fr; } }
@media (max-width:560px) { .lde-pick { flex-direction:column; } .lde-pick button.go { width:100%; } .lde-flow { grid-template-columns:1fr; } }
`

const Ic = ({ d }) => <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d.split('|').map((x, i) => <path key={i} d={x} />)}</svg>
const TICK = 'M20 6 9 17l-5-5'

const FAQS = [
  ['Is an e-Stamp legally valid?', 'Yes. E-stamping is the government-authorised way to pay stamp duty in the states listed here. The certificate is accepted wherever physical stamp paper is, and its number can be verified online.'],
  ['How do I know how much stamp duty to pay?', 'It depends on your state and the type of document. Pick the value you need; if you’re unsure, our team checks every order before buying the stamp and calls you if the amount should change.'],
  ['When will I get it?', 'The scan copy is emailed, usually within a few hours on working days. If you choose doorstep delivery, the original follows by courier.'],
  ['Can you print my agreement on the stamp paper?', 'Yes. Choose “Print it on e-Stamp” — after payment you upload your document from your dashboard and we print it on the e-Stamp for you.'],
]

export default function EStampPage() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [print, setPrint] = useState(false)
  const inputRef = useRef(null)

  const matches = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? ESTAMP_STATES.filter(s => s.name.toLowerCase().includes(t)) : ESTAMP_STATES
  }, [q])
  const byLetter = useMemo(() => ESTAMP_STATES.reduce((acc, s) => { (acc[s.name[0]] = acc[s.name[0]] || []).push(s); return acc }, {}), [])
  // The certificate previews the highlighted / chosen state as the customer browses the list
  const previewState = chosen || (open && q.trim() && matches[active]) || null

  const go = s => navigate(`/estamp/${s.slug}${print ? '?print=1' : ''}`)
  const choose = s => { setChosen(s); setQ(s.name); setOpen(false) }
  const submit = e => {
    e.preventDefault()
    const s = chosen && chosen.name === q ? chosen : (q.trim() ? matches[active] || matches[0] : null)
    if (s) go(s); else { setOpen(true); inputRef.current?.focus() }
  }
  const onKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive(a => Math.min(a + 1, matches.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter' && open && matches[active] && !(chosen && chosen.name === q)) { e.preventDefault(); choose(matches[active]) }
    else if (e.key === 'Escape') setOpen(false)
  }
  const startWith = withPrint => {
    setPrint(withPrint)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 400)
  }

  return (
    <>
      <SEO title="Buy e-Stamp Paper Online — Any State in India" description="Order non-judicial e-Stamp paper for any state in India. Fill in your details, pay online and get the scan copy by email, with the original delivered to your door." canonical="/estamp" />
      <style>{CERT_CSS + CSS}</style>

      <section className="lde-hero">
        <div className="lde-wrap lde-hero-grid">
          <div>
            <h1>Stamp paper for any state, without the queue</h1>
            <p className="lde-hero-lead">
              Tell us the state and the details. We buy the e-Stamp for you, email the scan copy, and can courier the original to your door.
            </p>

            <form className="lde-pick" onSubmit={submit} role="search">
              <div className="lde-pick-field">
                <label htmlFor="lde-state">Which state’s stamp paper?</label>
                <input
                  id="lde-state" ref={inputRef} value={q} placeholder="Start typing, e.g. Karnataka" autoComplete="off"
                  role="combobox" aria-expanded={open} aria-controls="lde-state-list" aria-autocomplete="list"
                  aria-activedescendant={open && matches[active] ? `lde-opt-${matches[active].slug}` : undefined}
                  onChange={e => { setQ(e.target.value); setOpen(true); setActive(0); setChosen(null) }}
                  onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 120)} onKeyDown={onKey}
                />
                {open && (
                  <ul className="lde-opts" id="lde-state-list" role="listbox" aria-label="States">
                    {matches.length > 0 && <li className="lde-opts-count" role="presentation">{q.trim() ? `${matches.length} matching` : `All ${matches.length} states and UTs`}</li>}
                    {matches.length ? matches.map((s, i) => (
                      <li key={s.slug}>
                        <button type="button" id={`lde-opt-${s.slug}`} role="option" aria-selected={i === active} className="lde-opt"
                          ref={el => { if (el && i === active && open) el.scrollIntoView({ block: 'nearest' }) }}
                          onMouseDown={e => e.preventDefault()} onMouseEnter={() => setActive(i)} onClick={() => choose(s)}>
                          {s.name}{s.script && <small lang="und">{s.script.split(' ').slice(-2).join(' ')}</small>}
                        </button>
                      </li>
                    )) : <li className="lde-opt" style={{ cursor: 'default' }}>No state found. Message us on WhatsApp below.</li>}
                  </ul>
                )}
              </div>
              <button type="submit" className="go">{print ? 'Continue to print' : 'Continue'}</button>
            </form>
            <p className="lde-pick-hint" aria-live="polite">
              {print
                ? <>You’re ordering a print on e-Stamp. <button type="button" onClick={() => setPrint(false)}>I only need the stamp paper</button></>
                : <>Already have your agreement ready? <button type="button" onClick={() => setPrint(true)}>Print it on e-Stamp</button></>}
            </p>

            <ul className="lde-facts">
              <li><Ic d={TICK} /> {ESTAMP_STATES.length} states and UTs</li>
              <li><Ic d={TICK} /> Verifiable certificate number</li>
              <li><Ic d={TICK} /> Secure online payment</li>
            </ul>
          </div>

          <div className="lde-cert">
            <StampCertificate stateName={previewState?.name} docType="Rent / Lease Agreement" purpose="Rent agreement" duty={500} compact />
          </div>
        </div>
      </section>

      <section className="lde-sec">
        <div className="lde-wrap">
          <h2>Two ways to order</h2>
          <p className="sub">Most people need the stamp paper only. If your document is ready, we can print it on the stamp for you.</p>
          <div className="lde-ways">
            <div className="lde-way">
              <h3>e-Stamp paper</h3>
              <p>A government-issued e-Stamp for your state and value, in the parties’ names.</p>
              <ul>
                <li><Ic d={TICK} /> Scan copy on email</li>
                <li><Ic d={TICK} /> Original by courier, if you want it</li>
                <li><Ic d={TICK} /> For agreements, affidavits, bonds and more</li>
              </ul>
              <button type="button" className="lde-way-cta" onClick={() => startWith(false)}>Choose your state</button>
            </div>
            <div className="lde-way">
              <h3>Print my document on e-Stamp</h3>
              <p>Send us your agreement or affidavit and we print it on the stamp paper, ready to sign.</p>
              <ul>
                <li><Ic d={TICK} /> Upload your document after payment</li>
                <li><Ic d={TICK} /> Printed copy scanned and emailed for checking</li>
                <li><Ic d={TICK} /> Original couriered to you for signing</li>
              </ul>
              <button type="button" className="lde-way-cta" onClick={() => startWith(true)}>Start a print order</button>
            </div>
          </div>
        </div>
      </section>

      <section className="lde-sec" style={{ background: '#fff', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="lde-wrap">
          <h2>How it works</h2>
          <p className="sub">About two minutes of your time. We handle the rest.</p>
          <ol className="lde-flow">
            <li><b>Pick your state</b><span>The stamp must be from the state where the document is signed.</span></li>
            <li><b>Fill in the details</b><span>Parties, document type and stamp duty value. The certificate fills in as you type.</span></li>
            <li><b>Pay online</b><span>UPI, card or net banking. Receipt and tax invoice arrive by email.</span></li>
            <li><b>Receive it</b><span>Scan copy on email, then the original by courier if you chose it.</span></li>
          </ol>
        </div>
      </section>

      <section className="lde-sec" id="all-states">
        <div className="lde-wrap">
          <h2>All states we cover</h2>
          <p className="sub">Choose a state to start your order.</p>
          <ul className="lde-az">
            {Object.keys(byLetter).sort().map(letter => (
              <li key={letter}>
                <div className="letter" aria-hidden="true">{letter}</div>
                {byLetter[letter].map(s => (
                  <Link key={s.slug} to={`/estamp/${s.slug}`}>{s.name}<Ic d="m9 18 6-6-6-6" /></Link>
                ))}
              </li>
            ))}
          </ul>
          <p className="lde-az-note">
            Don’t see your state? <a href={`https://wa.me/${LD_WA}?text=${encodeURIComponent('Hi, I need e-Stamp paper for a state not listed on your website.')}`} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a> and we’ll tell you if we can help.
          </p>
        </div>
      </section>

      <section className="lde-sec" style={{ paddingTop: 0 }}>
        <div className="lde-wrap">
          <div className="lde-biz">
            <div>
              <h3>Need e-Stamps in bulk?</h3>
              <p>For NBFCs, fintechs, property firms and HR teams: volume orders and API integration.</p>
            </div>
            <Link to="/company/contact">Talk to our team</Link>
          </div>
        </div>
      </section>

      <section className="lde-sec" style={{ paddingTop: 0 }}>
        <div className="lde-wrap">
          <div className="lde-faq">
            <h2>Questions people ask</h2>
            {FAQS.map(([qq, a]) => (
              <details key={qq}><summary>{qq}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}