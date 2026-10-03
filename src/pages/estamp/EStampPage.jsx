import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import estampSample from '../../assets/e-stamp-sample.jpeg'
import { ESTAMP_STATES, LD_WA } from '../../data/estamp'

export const ES_CSS = `
.esx-hero { position:relative; overflow:hidden; border-bottom:1px solid var(--line);
  background:linear-gradient(180deg,#FBFDFF 0%,#F2F8FF 55%,#EAF3FF 100%); padding:clamp(48px,7vw,92px) 0 clamp(48px,6vw,80px); }
.esx-hero::before { content:''; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(760px 520px at 18% -10%,rgba(29,93,184,.10),transparent 62%),radial-gradient(420px 380px at 95% 100%,rgba(29,93,184,.08),transparent 60%); }
.esx-wrap { max-width:1180px; margin:0 auto; padding:0 24px; position:relative; z-index:1; }
.esx-hero-grid { display:grid; grid-template-columns:1.05fr .95fr; gap:56px; align-items:center; }
.esx-pill { display:inline-flex; align-items:center; gap:8px; background:var(--brand-50); border:1px solid var(--brand-100);
  border-radius:99px; padding:7px 16px; font-size:13px; font-weight:600; color:var(--blue-dark); margin-bottom:22px; }
.esx-pill i { width:8px; height:8px; border-radius:50%; background:#16A34A; box-shadow:0 0 0 4px rgba(22,163,74,.15); }
.esx-hero h1 { font-size:clamp(34px,5vw,60px); font-weight:900; color:var(--navy); letter-spacing:-.035em; line-height:1.06; margin:0 0 20px; }
.esx-hero h1 span { background:linear-gradient(118deg,var(--blue-dark),var(--blue-bright)); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.esx-lead { font-size:clamp(15.5px,1.7vw,18px); color:var(--text-2); line-height:1.7; margin:0 0 22px; max-width:560px; }
.esx-lead b { color:var(--blue-dark); font-weight:700; }
.esx-lead em { font-style:normal; color:#EA580C; font-weight:700; }
.esx-checks { display:flex; flex-wrap:wrap; gap:10px 22px; margin:0 0 28px; padding:0; list-style:none; }
.esx-checks li { display:flex; align-items:center; gap:8px; font-size:15px; font-weight:600; color:var(--navy); }
.esx-checks li svg { width:18px; height:18px; flex:none; stroke:var(--blue); background:var(--brand-50); border-radius:50%; padding:3px; }
.esx-cta { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:24px; }
.esx-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; height:54px; padding:0 26px; border-radius:12px;
  font-size:16px; font-weight:700; text-decoration:none; font-family:inherit; cursor:pointer; transition:transform .15s, box-shadow .15s; border:0; }
.esx-btn:hover { transform:translateY(-1px); }
.esx-btn-primary { background:linear-gradient(135deg,var(--blue-dark),var(--blue)); color:#fff; box-shadow:0 10px 26px rgba(29,93,184,.28); }
.esx-btn-ghost { background:#fff; color:var(--navy); border:1.5px solid var(--line-strong, #CBD5E1); }
.esx-trust { display:flex; flex-wrap:wrap; gap:8px 18px; font-size:13.5px; color:var(--text-3); }
.esx-trust span { display:inline-flex; align-items:center; gap:6px; }
.esx-trust svg { width:15px; height:15px; stroke:var(--blue); }

.esx-visual { position:relative; max-width:500px; justify-self:end; width:100%; }
.esx-paper { background:#fff; border-radius:14px; padding:14px; transform:rotate(1.6deg);
  box-shadow:0 30px 60px -18px rgba(15,28,46,.30), 0 0 0 1px rgba(15,28,46,.06); }
.esx-paper img { width:100%; height:300px; object-fit:cover; object-position:top; border-radius:8px; display:block; }
.esx-duty { position:absolute; top:-18px; left:-18px; background:#fff; border-radius:12px; padding:10px 16px; transform:rotate(-3deg);
  box-shadow:0 12px 28px rgba(15,28,46,.16); }
.esx-duty small { display:block; font-size:10.5px; letter-spacing:.14em; font-weight:700; color:var(--text-3); }
.esx-duty b { font-size:24px; color:var(--blue-dark); font-weight:900; }
.esx-fast { position:absolute; top:-14px; right:-10px; display:flex; align-items:center; gap:8px; background:#fff; border-radius:99px;
  padding:8px 14px; font-size:13px; font-weight:700; color:var(--navy); box-shadow:0 12px 28px rgba(15,28,46,.16); }
.esx-fast svg { width:16px; height:16px; stroke:#F59E0B; }
.esx-biz { display:flex; align-items:center; gap:16px; margin-top:26px; background:linear-gradient(135deg,#0F1C2E,#1E2A4A); color:#fff;
  border-radius:16px; padding:18px 20px; text-decoration:none; transition:transform .15s; }
.esx-biz:hover { transform:translateY(-2px); }
.esx-biz-ico { width:46px; height:46px; border-radius:12px; flex:none; display:grid; place-items:center; background:linear-gradient(135deg,var(--blue),var(--blue-bright)); }
.esx-biz-ico svg { width:22px; height:22px; stroke:#fff; }
.esx-biz b { display:block; font-size:16px; margin-bottom:3px; }
.esx-biz span { font-size:13.5px; color:#B8C7DD; line-height:1.5; }
.esx-biz span em { font-style:normal; color:#FDBA74; font-weight:700; }
.esx-biz > svg { width:20px; height:20px; stroke:#fff; flex:none; margin-left:auto; }

.esx-states { background:#FBF9F4; padding:clamp(48px,6vw,80px) 0; border-bottom:1px solid var(--line); position:relative; }
.esx-states::before { content:''; position:absolute; inset:14px; border:1px solid rgba(29,93,184,.10); border-radius:18px; pointer-events:none; }
.esx-scripts { text-align:center; font-size:13.5px; color:var(--text-3); letter-spacing:.04em; margin-bottom:14px; }
.esx-h2 { text-align:center; font-size:clamp(28px,3.6vw,44px); font-weight:900; color:var(--navy); letter-spacing:-.03em; line-height:1.15; margin:0 0 26px; }
.esx-h2 span { color:var(--blue); }
.esx-search { position:relative; max-width:560px; margin:0 auto 30px; }
.esx-search svg { position:absolute; left:16px; top:50%; transform:translateY(-50%); width:18px; height:18px; stroke:var(--text-3); }
.esx-search input { width:100%; height:54px; border:1.5px solid var(--line-strong, #CBD5E1); border-radius:12px; padding:0 18px 0 46px;
  font-size:16px; font-family:inherit; background:#fff; outline:none; box-sizing:border-box; }
.esx-search input:focus { border-color:var(--blue); box-shadow:0 0 0 4px rgba(29,111,224,.12); }
.esx-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:14px; }
.esx-state { display:flex; align-items:center; gap:12px; background:#fff; border:1px solid var(--line); border-radius:14px; padding:16px 14px;
  text-decoration:none; color:var(--navy); font-weight:700; font-size:15px; transition:all .18s; min-height:72px; box-sizing:border-box; }
.esx-state:hover { border-color:rgba(29,93,184,.35); box-shadow:0 10px 24px rgba(29,93,184,.12); transform:translateY(-2px); }
.esx-state-ab { width:38px; height:38px; flex:none; border-radius:10px; display:grid; place-items:center; font-size:12.5px; font-weight:800;
  color:var(--blue-dark); background:var(--brand-50); border:1px solid var(--brand-100); }
.esx-state:hover .esx-state-ab { background:linear-gradient(135deg,var(--blue-dark),var(--blue)); color:#fff; border-color:transparent; }
.esx-state-name { flex:1; line-height:1.3; }
.esx-state > svg { width:16px; height:16px; stroke:var(--text-3); flex:none; }
.esx-none { text-align:center; color:var(--text-3); padding:24px 0; }
.esx-note { display:flex; align-items:center; justify-content:center; gap:8px; margin-top:26px; font-size:14.5px; color:var(--text-2); text-align:center; }
.esx-note svg { width:18px; height:18px; stroke:#EA580C; flex:none; }
.esx-note a { color:var(--blue); font-weight:700; }

.esx-steps { padding:clamp(48px,6vw,84px) 0; }
.esx-steps-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:8px; }
.esx-step { background:#fff; border:1px solid var(--line); border-radius:16px; padding:22px 20px; position:relative; }
.esx-step-n { width:42px; height:42px; border-radius:50%; display:grid; place-items:center; font-weight:900; color:#fff; margin-bottom:14px;
  background:linear-gradient(135deg,var(--blue-dark),var(--blue)); box-shadow:0 6px 16px rgba(29,93,184,.28); }
.esx-step b { display:block; font-size:16.5px; color:var(--navy); margin-bottom:6px; }
.esx-step p { margin:0; font-size:14px; color:var(--text-2); line-height:1.6; }
.esx-sub { text-align:center; color:var(--text-2); font-size:16px; margin:-14px 0 30px; }

.esx-what { padding:0 0 clamp(48px,6vw,84px); }
.esx-what-card { background:linear-gradient(180deg,#F5F9FF,#fff); border:1px solid var(--line); border-radius:20px; padding:clamp(24px,4vw,40px);
  display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:center; }
.esx-what-card h3 { font-size:clamp(22px,2.6vw,30px); color:var(--navy); margin:0 0 12px; letter-spacing:-.02em; }
.esx-what-card p { color:var(--text-2); line-height:1.75; margin:0; font-size:15px; }
.esx-what-list { display:grid; gap:12px; }
.esx-what-list div { display:flex; gap:12px; background:#fff; border:1px solid var(--line); border-radius:12px; padding:14px 16px; font-size:14.5px; color:var(--text-2); line-height:1.5; }
.esx-what-list strong { color:var(--navy); display:block; }

@media (max-width:1024px) { .esx-grid { grid-template-columns:repeat(3,1fr); } .esx-steps-grid { grid-template-columns:repeat(2,1fr); } }
@media (max-width:860px) { .esx-hero-grid, .esx-what-card { grid-template-columns:1fr; } .esx-visual { justify-self:center; margin-top:18px; } }
@media (max-width:560px) { .esx-grid { grid-template-columns:repeat(2,1fr); gap:10px; } .esx-state { padding:12px 10px; font-size:14px; }
  .esx-state-ab { width:32px; height:32px; font-size:11px; } .esx-steps-grid { grid-template-columns:1fr; } .esx-btn { width:100%; } }
`

const Ic = ({ d, ...p }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>{d.split('|').map((x, i) => <path key={i} d={x} />)}</svg>
const CHECK = 'M20 6 9 17l-5-5'
export const abbrev = name => name.replace(/&/g, ' ').split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()

const STEPS = [
  { t: 'Choose your state', d: 'Pick the state whose stamp paper you need.' },
  { t: 'Fill in the details', d: 'Party names, document type and stamp duty value — takes about 2 minutes.' },
  { t: 'Pay securely online', d: 'Pay by UPI, card or net banking through Razorpay.' },
  { t: 'Get it delivered', d: 'Scan copy by email; the original by courier if you choose doorstep delivery.' },
]

export default function EStampPage() {
  const [q, setQ] = useState('')
  const [printMode, setPrintMode] = useState(false)
  const states = useMemo(() => ESTAMP_STATES.filter(s => s.name.toLowerCase().includes(q.trim().toLowerCase())), [q])
  const scrollToStates = (e, print = false) => { e.preventDefault(); setPrintMode(print); document.getElementById('state-selector')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

  return (
    <>
      <SEO title="Buy Non-Judicial e-Stamp Paper Online — Any State in India" description="Buy government-authorised non-judicial e-Stamp paper online for any state in India. Fill your details, pay online and get the scan copy by email, with the original delivered to your doorstep." canonical="/estamp" />
      <style>{ES_CSS}</style>

      {/* ── Hero ── */}
      <section className="esx-hero">
        <div className="esx-wrap esx-hero-grid">
          <div>
            <span className="esx-pill"><i aria-hidden="true" /> Pan-India e-Stamp service by LauncherDesk</span>
            <h1>Non-judicial e-Stamp paper in India, <span>scan copy in a few hours</span></h1>
            <p className="esx-lead">
              Buy government-authorised e-Stamp paper for <b>any state in India</b>. Fill your details, pay online, and get it on email —
              with the original <em>at your doorstep</em>.
            </p>
            <ul className="esx-checks">
              <li><Ic d={CHECK} /> {ESTAMP_STATES.length} states &amp; UTs covered</li>
              <li><Ic d={CHECK} /> No queues, no agents</li>
              <li><Ic d={CHECK} /> Verifiable certificate number on every stamp</li>
            </ul>
            <div className="esx-cta">
              <a href="#state-selector" onClick={scrollToStates} className="esx-btn esx-btn-primary">
                Choose your state <Ic d="M5 12h14M13 6l6 6-6 6" width={18} height={18} />
              </a>
              <a href="#state-selector" onClick={e => scrollToStates(e, true)} className="esx-btn esx-btn-ghost">Print on e-Stamp paper</a>
            </div>
            <div className="esx-trust">
              <span><Ic d="M12 2 4 5v6c0 5 3.4 8.9 8 11 4.6-2.1 8-6 8-11V5z" /> Government-issued certificates</span>
              <span><Ic d="M3 10h18M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" /> Secure Razorpay payments</span>
            </div>
          </div>

          <div className="esx-visual">
            <div className="esx-paper"><img src={estampSample} alt="Sample non-judicial e-Stamp certificate" loading="eager" /></div>
            <div className="esx-duty"><small>STAMP DUTY</small><b>₹100</b></div>
            <div className="esx-fast"><Ic d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /> Scan copy in a few hours</div>
            <Link to="/company/contact" className="esx-biz">
              <span className="esx-biz-ico"><Ic d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" /></span>
              <span><b>e-Stamping for business &amp; enterprise</b>
                <span>Bulk orders &amp; API access for <em>NBFCs, fintechs and all other firms</em>.</span></span>
              <Ic d="M5 12h14M13 6l6 6-6 6" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── State selector ── */}
      <section className="esx-states" id="state-selector" style={{ scrollMarginTop: 90 }}>
        <div className="esx-wrap">
          <div className="esx-scripts" aria-hidden="true">स्टाम्प पेपर · ಸ್ಟಾಂಪ್ ಪೇಪರ್ · ஸ்டாம்ப் பேப்பர் · స్టాంప్ పేపర్ · স্ট্যাম্প পেপার · સ્ટેમ્પ પેપર</div>
          <h2 className="esx-h2">Where do you need the <span>e-Stamp paper</span>?</h2>
          {printMode && (
            <p className="esx-note" style={{ marginTop: -10, marginBottom: 22 }}>
              <span>🖨️ <b>Print on e-Stamp:</b> pick your state — after payment you upload your document and we print it on the stamp paper.
                {' '}<a href="#state-selector" onClick={e => { e.preventDefault(); setPrintMode(false) }}>Cancel</a></span>
            </p>
          )}
          <div className="esx-search">
            <Ic d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 2-4.35-4.35" />
            <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search your state…" aria-label="Search your state" />
          </div>
          {states.length ? (
            <div className="esx-grid">
              {states.map(s => (
                <Link key={s.slug} to={`/estamp/${s.slug}${printMode ? '?print=1' : ''}`} className="esx-state">
                  <span className="esx-state-ab" aria-hidden="true">{abbrev(s.name)}</span>
                  <span className="esx-state-name">{s.name}</span>
                  <Ic d="m9 18 6-6-6-6" />
                </Link>
              ))}
            </div>
          ) : <p className="esx-none">No state matches “{q}”.</p>}
          <p className="esx-note">
            <Ic d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01" />
            <span>Can’t find your state? <a href={`https://wa.me/${LD_WA}?text=${encodeURIComponent('Hi, I need e-Stamp paper for a state not listed on your website.')}`} target="_blank" rel="noopener noreferrer">Message us</a> — we’re expanding coverage every month.</span>
          </p>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="esx-steps">
        <div className="esx-wrap">
          <h2 className="esx-h2">From order to <span>doorstep in 4 steps</span></h2>
          <p className="esx-sub">No portal visits, no paperwork runs.</p>
          <div className="esx-steps-grid">
            {STEPS.map((s, i) => (
              <div key={s.t} className="esx-step"><span className="esx-step-n">{i + 1}</span><b>{s.t}</b><p>{s.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is e-stamping ── */}
      <section className="esx-what">
        <div className="esx-wrap">
          <div className="esx-what-card">
            <div>
              <h3>What is a non-judicial e-Stamp?</h3>
              <p>E-stamping is the government-authorised way of paying stamp duty electronically. Instead of physical stamp paper,
                a unique certificate is issued through the official e-stamping system. It is used for rent agreements, affidavits,
                agreements, bonds and powers of attorney, and can be verified online using its certificate number.</p>
            </div>
            <div className="esx-what-list">
              <div><Ic d={CHECK} width={18} height={18} /><span><strong>Legally valid</strong>Accepted by banks, registrars, courts and government offices.</span></div>
              <div><Ic d={CHECK} width={18} height={18} /><span><strong>Verifiable</strong>Every certificate carries a unique number you can check online.</span></div>
              <div><Ic d={CHECK} width={18} height={18} /><span><strong>Print your document on it</strong>Send us your document and we print it on the e-Stamp paper for you.</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}