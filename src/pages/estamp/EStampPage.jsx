import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../../components/SEO'
import StampCertificate, { CERT_CSS } from './StampCertificate'
import { ESTAMP_STATES, ESTAMP_FEES, getConvenienceFee, GST_RATE, LD_WA } from '../../data/estamp'
import { EButton, ECard, EBadge, EAccordion } from './estampKit'
import './estampKit.css'

const CSS = `
/* Matches the navbar's pill (.site-header, width:min(1360px, 100% - 40px)) nested with .header-in's own
   padding (src/assets/launcherdesk.css), so page content's left edge lines up with the logo. */
.lde-wrap { max-width:1480px; margin:0 auto; padding:0 36px; box-sizing:border-box; }
@media (min-width:1025px) { .lde-wrap { max-width:1460px; width:calc(100% - 40px); } }
@media (max-width:1280px) { .lde-wrap { padding:0 20px; } }
@media (max-width:768px) { .lde-wrap { padding:0 14px; } }

/* Hero, dark glass theme */
.lde-hero { background:linear-gradient(180deg, rgba(12, 28, 52, 0.50) 0%, rgba(7, 17, 29, 0.80) 100%); padding:clamp(48px,6vw,88px) 0 clamp(60px,7vw,96px); position:relative; z-index:2; border-bottom:1px solid rgba(255, 255, 255, 0.08); overflow:hidden; }
.lde-hero::before { content:''; position:absolute; top:-140px; right:-120px; width:480px; height:480px; border-radius:50%;
  background:radial-gradient(circle, rgba(33,150,243.14) 0%, rgba(33,150,243,0) 70%); pointer-events:none; z-index:0; }
.lde-hero::after { content:''; position:absolute; bottom:-160px; left:-100px; width:380px; height:380px; border-radius:50%;
  background:radial-gradient(circle, rgba(124,77,255.08) 0%, rgba(124,77,255,0) 70%); pointer-events:none; z-index:0; }
.lde-hero-grid { display:grid; grid-template-columns:1.05fr .95fr; gap:clamp(32px,5vw,64px); align-items:center; position:relative; z-index:1; }
.lde-hero-eyebrow { display:inline-block; margin:0 0 20px; padding:6px 16px; border-radius:99px; background:rgba(33,150,243,0.12); color:var(--blue, #2196F3);
  font-size:12px; font-weight:800; letter-spacing:.07em; text-transform:uppercase; border:1px solid rgba(33,150,243,0.25); }
.lde-hero h1 { font-size:clamp(32px,4.1vw,52px); line-height:1.3; letter-spacing:-.02em; font-weight:800; margin:0 0 20px; color:#FFFFFF; }
.lde-hero h1 mark { background:rgba(33,150,243,0.18); color:#FFFFFF; padding:3px 10px; border-radius:7px; font-style:normal; box-decoration-break:clone; -webkit-box-decoration-break:clone; }
.lde-hero-lead { font-size:clamp(16px,1.6vw,18.5px); line-height:1.65; color:var(--text-2, #B9C2CF); margin:0 0 28px; max-width:46ch; }
.lde-facts { display:flex; flex-wrap:wrap; gap:12px 28px; margin:0 0 32px; padding:0; list-style:none; font-size:14.5px; color:var(--text-2, #B9C2CF); }
.lde-facts li { display:flex; gap:9px; align-items:center; }
.lde-facts li::before { content:''; width:7px; height:7px; border-radius:50%; background:var(--blue, #2196F3); flex:none; }
.lde-stats { display:flex; gap:28px; flex-wrap:wrap; border-top:1px solid var(--line); padding-top:24px; }
.lde-stats div b { display:block; font-size:24px; font-weight:800; color:#FFFFFF; letter-spacing:-.02em; }
.lde-stats div span { font-size:13px; color:var(--text-3, #8B95A5); font-weight:600; }

.lde-start { background:var(--card-glass, rgba(22, 27, 34, 0.85)); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border:1px solid var(--line); border-radius:22px; padding:clamp(26px,2.6vw,38px); max-width:600px; width:100%;
  box-shadow:0 24px 48px -16px rgba(0,0,0.65); position:relative; z-index:3; }
.lde-start-title { font-size:clamp(22px,2.4vw,26px); font-weight:800; letter-spacing:-.02em; color:#fff; margin:0 0 18px; }
.lde-start-bar { display:flex; gap:5px; margin:0 0 22px; }
.lde-start-bar span { flex:1; height:5px; border-radius:99px; background:rgba(255,255,255.18); }
.lde-start-bar span.on { background:var(--blue, #2196F3); }
.lde-pick-label { display:block; font-size:12px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; color:var(--text-2, #B9C2CF); margin:0 0 8px; }
.lde-pick { display:flex; flex-direction:column; gap:12px; position:relative; }
.lde-pick-field { flex:1; position:relative; min-width:0; }
.lde-pick-field svg { position:absolute; right:18px; top:50%; transform:translateY(-50%); width:18px; height:18px; stroke:var(--text-3, #8B95A5); pointer-events:none; }
.lde-pick input { width:100%; height:58px; box-sizing:border-box; border:1.5px solid var(--line); outline:none; border-radius:11px; padding:0 44px 0 18px;
  font-size:16.5px; font-weight:700; color:#FFFFFF; font-family:inherit; background:rgba(16, 23, 34, 0.85); }
.lde-pick input::placeholder { color:var(--text-3, #8B95A5); font-weight:600; }
.lde-pick input:focus-visible { box-shadow:0 0 0 3px rgba(33, 150, 243, 0.25); border-color:var(--blue, #2196F3); }
.lde-pick button.go { height:58px; padding:0 28px; border:0; border-radius:11px; background:linear-gradient(135deg, #1E88E5 0%, #7C4DFF 100%); color:#fff; font-weight:800;
  font-size:16.5px; font-family:inherit; cursor:pointer; white-space:nowrap; width:100%; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 6px 20px rgba(30,136,229.35); }
.lde-pick button.go:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 8px 24px rgba(30,136,229.5); }
.lde-pick button.go:disabled { background:rgba(255,255,255.08); color:rgba(255,255,255.35); cursor:not-allowed; box-shadow:none; }
.lde-pick button.go:focus-visible.lde-opt:focus-visible { outline:3px solid var(--blue, #2196F3); outline-offset:2px; }
.lde-opts { position:absolute; left:0; right:0; top:calc(100% + 10px); background:rgba(16, 23, 34, 0.96); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border:1px solid var(--line); border-radius:14px; padding:6px; z-index:50;
  box-shadow:0 24px 60px -12px rgba(0,0,0.7), 0 0 0 1px rgba(255,255,255.08); max-height:min(320px, 60vh); overflow-y:auto;
  overscroll-behavior:contain; scrollbar-width:thin; list-style:none; margin:0; }
.lde-opts-count { padding:8px 12px 6px; font-size:12.5px; font-weight:600; color:var(--text-3, #8B95A5); }
.lde-opt { display:flex; justify-content:space-between; align-items:center; gap:10px; width:100%; text-align:left; border:0; background:none;
  padding:11px 12px; border-radius:9px; font-family:inherit; font-size:15px; font-weight:600; line-height:1.3; color:#FFFFFF; cursor:pointer; }
.lde-opt[aria-selected="true"].lde-opt:hover { background:rgba(33, 150, 243, 0.15); color:var(--blue, #2196F3); }
.lde-opt small { color:var(--text-3, #8B95A5); font-weight:500; }
.lde-pick-hint { margin:14px 0 0; font-size:14.5px; color:var(--text-2, #B9C2CF); }
.lde-pick-hint button { background:none; border:0; padding:0; color:var(--blue, #2196F3); font:inherit; font-weight:700; text-decoration:underline;
  text-underline-offset:3px; cursor:pointer; }
.lde-start-steps { display:flex; flex-wrap:wrap; gap:6px 10px; margin:18px 0 0; padding:0; list-style:none; font-size:12.5px; color:var(--text-2, #B9C2CF); font-weight:600; }
.lde-start-steps li { display:flex; align-items:center; gap:6px; }
.lde-start-steps li .dot { width:4px; height:4px; border-radius:50%; background:var(--blue, #2196F3); flex:none; }
.lde-help-pill { display:inline-flex; align-items:center; gap:8px; margin-top:16px; padding:9px 16px; border-radius:99px;
  background:rgba(255,255,255.05); border:1px solid rgba(255,255,255.1); color:#fff; font-size:13.5px; font-weight:700;
  text-decoration:none; }
.lde-help-pill:hover { background:rgba(255,255,255.1); }
.lde-help-pill .dot { width:7px; height:7px; border-radius:50%; background:#10B981; flex:none; }

/* Sections */
.lde-sec { padding:clamp(52px,6vw,88px) 0; }
.lde-sec h2 { font-size:clamp(26px,3vw,38px); letter-spacing:-.025em; color:#FFFFFF; margin:0 0 10px; font-weight:800; }
.lde-sec .sub { color:var(--text-2, #B9C2CF); font-size:16.5px; margin:0 0 34px; max-width:60ch; line-height:1.6; }
.lde-sec .eyebrow { font-size:12.5px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; color:var(--blue, #2196F3); margin:0 0 10px; }

/* Transparency / interactive calculator */
.lde-trans { display:grid; grid-template-columns:1fr 1fr; gap:clamp(24px,3.4vw,40px); align-items:start; border-radius:24px;
  padding:clamp(28px,4vw,48px); background:var(--card-glass, rgba(22, 27, 34, 0.78)); backdrop-filter:blur(24px); border:1px solid var(--line); color:#fff; }
.lde-trans h2 { color:#fff; }
.lde-trans p.sub { color:var(--text-2, #B9C2CF); }
.lde-calc-head { margin:0 0 4px; font-size:12px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; color:var(--text-3, #8B95A5); }
.lde-calc-row { margin:18px 0 0; }
.lde-calc-row > .lbl { display:flex; justify-content:space-between; font-size:13px; font-weight:700; color:#FFFFFF; margin-bottom:10px; }
.lde-calc-presets { display:flex; flex-wrap:wrap; gap:8px; }
.lde-calc-presets button { height:38px; padding:0 16px; border-radius:9px; border:1.5px solid var(--line); background:rgba(255,255,255,0.05);
  font-family:inherit; font-weight:700; font-size:13.5px; color:#FFFFFF; cursor:pointer; }
.lde-calc-presets button[aria-pressed="true"] { border-color:var(--blue, #2196F3); background:var(--blue, #2196F3); color:#fff; }
.lde-calc-delivery { display:grid; gap:8px; }
.lde-calc-delivery label { display:flex; justify-content:space-between; align-items:center; gap:10px; border:1.5px solid var(--line);
  border-radius:10px; padding:10px 14px; cursor:pointer; font-size:13.5px; font-weight:700; color:#FFFFFF; background:rgba(255,255,255,0.04); }
.lde-calc-delivery label:has(input:checked) { border-color:var(--blue, #2196F3); background:rgba(33, 150, 243, 0.12); }
.lde-calc-delivery input { accent-color:var(--blue, #2196F3); }
.lde-calc-delivery span.p { font-weight:600; color:var(--text-3, #8B95A5); }
.lde-receipt dl { margin:0; display:grid; grid-template-columns:1fr auto; gap:12px 14px; font-size:14.5px; }
.lde-receipt dt { color:var(--text-2, #B9C2CF); } .lde-receipt dd { margin:0; text-align:right; font-weight:700; color:#FFFFFF; }
.lde-receipt .total { border-top:1px solid var(--line); padding-top:12px; margin-top:4px; font-size:17px; font-weight:800; color:#FFFFFF; }
.lde-receipt h4 { margin:0 0 4px; font-size:12px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; color:var(--text-3, #8B95A5); }

/* Government approved */
.lde-gov { display:grid; grid-template-columns:.85fr 1.15fr; gap:clamp(32px,5vw,64px); align-items:center; }
.lde-gov-checks { list-style:none; margin:20px 0 0; padding:0; display:grid; gap:14px; }
.lde-gov-checks li { display:flex; gap:12px; align-items:center; font-weight:700; color:#FFFFFF; font-size:15.5px; }
.lde-gov-checks .tk { flex:none; width:26px; height:26px; border-radius:50%; background:rgba(33, 150, 243, 0.18); border:1px solid rgba(33, 150, 243, 0.3); display:grid; place-items:center; }
.lde-gov-checks .tk svg { width:14px; height:14px; stroke:var(--blue, #2196F3); }

/* Benefit strip */
.lde-benefits { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.lde-benefits .ek-card h4 { margin:0 0 6px; font-size:15.5px; color:#FFFFFF; }
.lde-benefits .ek-card p { margin:0; font-size:13.5px; color:var(--text-2, #B9C2CF); line-height:1.5; }

.lde-ways { display:grid; grid-template-columns:1fr 1fr; border:1px solid var(--line); border-radius:20px; overflow:hidden; background:var(--card); backdrop-filter:blur(16px); }
.lde-way { padding:clamp(24px,3vw,36px); display:flex; flex-direction:column; }
.lde-way + .lde-way { border-left:1px solid var(--line); background:var(--card-glass, rgba(22, 27, 34, 0.78)); }
.lde-way h3 { margin:0 0 6px; font-size:21px; color:#FFFFFF; }
.lde-way p { margin:0 0 18px; color:var(--text-2, #B9C2CF); line-height:1.6; font-size:15px; }
.lde-way ul { margin:0 0 24px; padding:0; list-style:none; display:grid; gap:9px; flex:1; align-content:start; }
.lde-way li { display:flex; gap:10px; font-size:14.5px; color:#FFFFFF; line-height:1.45; }
.lde-way li svg { width:18px; height:18px; stroke:var(--success); flex:none; margin-top:1px; }

.lde-flow { display:grid; grid-template-columns:repeat(4,1fr); counter-reset:step; position:relative; padding:0; margin:0; }
.lde-flow::before { content:''; position:absolute; left:12%; right:12%; top:22px; height:2px;
  background:repeating-linear-gradient(90deg,rgba(33,150,243,0.4) 0 8px,transparent 8px 14px); }
.lde-flow li { list-style:none; position:relative; padding:0 14px; text-align:center; }
.lde-flow li::before { counter-increment:step; content:counter(step); display:grid; place-items:center; width:46px; height:46px; margin:0 auto 14px;
  border-radius:50%; background:rgba(16, 23, 34, 0.9); border:2px solid var(--blue, #2196F3); color:var(--blue, #2196F3); font-weight:800; font-size:17px; position:relative; z-index:1; }
.lde-flow li:last-child::before { background:var(--blue, #2196F3); color:#fff; }
.lde-flow b { display:block; color:#FFFFFF; font-size:16px; margin-bottom:6px; }
.lde-flow span { display:block; color:var(--text-2, #B9C2CF); font-size:14px; line-height:1.55; }

/* Choose your state, card grid */
.lde-states-head { display:flex; justify-content:space-between; align-items:flex-end; gap:16px; flex-wrap:wrap; margin-bottom:22px; }
.lde-states-search { position:relative; width:280px; max-width:100%; }
.lde-states-search input { width:100%; height:46px; box-sizing:border-box; border:1.5px solid var(--line); border-radius:10px;
  padding:0 14px; font-size:14.5px; font-family:inherit; outline:none; background:rgba(16, 23, 34, 0.72); color:#fff; }
.lde-states-search input:focus-visible { border-color:var(--blue, #2196F3); box-shadow:0 0 0 3px rgba(33, 150, 243, 0.2); }
.lde-state-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
.lde-state-card { display:flex; justify-content:space-between; align-items:center; gap:8px; padding:15px 16px; border:1.5px solid var(--line);
  border-radius:13px; background:var(--card); backdrop-filter:blur(16px); text-decoration:none; color:#FFFFFF; font-weight:700; font-size:14.5px; }
.lde-state-card:hover { border-color:var(--blue); background:rgba(47, 128, 255, 0.12); color:#2F80FF; }
.lde-state-card svg { width:15px; height:15px; stroke:currentColor; opacity:.5; flex:none; }
.lde-az-note { margin:22px 0 0; color:var(--text-2); font-size:14.5px; }
.lde-az-note a { color:var(--blue); font-weight:700; }

.lde-biz { display:grid; grid-template-columns:1fr auto; gap:20px; align-items:center; border-radius:20px; padding:clamp(22px,3vw,32px);
  background:var(--card); border:1px solid var(--line); color:#fff; }
.lde-biz h3 { margin:0 0 6px; font-size:22px; color:#fff; }
.lde-biz p { margin:0; color:#B8C5D8; line-height:1.6; max-width:60ch; }
.lde-biz a { background:var(--blue); color:#fff; font-weight:800; padding:14px 22px; border-radius:11px; text-decoration:none; white-space:nowrap; }

.lde-faq { max-width:820px; }

/* Closing CTA band */
.lde-cta { display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap; border-radius:22px;
  padding:clamp(24px,3vw,34px) clamp(24px,3.4vw,40px); background:rgba(18, 30, 48, 0.85); backdrop-filter:blur(24px); border:1px solid var(--line); }
.lde-cta h3 { margin:0; font-size:clamp(20px,2.4vw,26px); color:#FFFFFF; letter-spacing:-.02em; }

@media (max-width:900px) { .lde-hero-grid { grid-template-columns:1fr; } .lde-cert { max-width:420px; transform:none; }
  .lde-ways { grid-template-columns:1fr; } .lde-way + .lde-way { border-left:0; border-top:1px solid var(--line-strong); }
  .lde-flow { grid-template-columns:1fr 1fr; row-gap:28px; } .lde-flow::before { display:none; } .lde-biz { grid-template-columns:1fr; }
  .lde-trans.lde-gov { grid-template-columns:1fr; } .lde-benefits { grid-template-columns:1fr 1fr; } .lde-state-grid { grid-template-columns:1fr 1fr; } }
@media (max-width:560px) { .lde-pick { flex-direction:column; } .lde-pick button.go { width:100%; } .lde-flow { grid-template-columns:1fr; }
  .lde-benefits { grid-template-columns:1fr; } .lde-state-grid { grid-template-columns:1fr; } }
`

const Ic = ({ d }) => <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d.split('|').map((x, i) => <path key={i} d={x} />)}</svg>
const TICK = 'M20 6 9 17l-5-5'
const inr = n => `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`

const CALC_PRESETS = [100, 500, 1000, 5000]

const FAQS = [
  ['What is eStamping?', 'eStamping is the government-authorised digital way to pay stamp duty, replacing physical stamp paper. The certificate carries a unique identification number (UIN) that can be verified online, and is accepted wherever physical stamp paper is.'],
  ['What is stamp duty?', 'Stamp duty is a tax the state government charges on certain documents, such as agreements, affidavits, bonds and more, to make them legally valid. The amount depends on your state and the type of document.'],
  ['How fast can I get my e-Stamp paper?', 'The scan copy is emailed, usually within a few hours on working days, right after your order and payment are confirmed.'],
  ['Do you provide physical doorstep delivery?', 'Yes. Choose doorstep delivery at checkout and we courier the original e-Stamp paper to your address, for a small additional fee (shown before you pay).'],
  ['Is an e-Stamp paper safe and verifiable?', 'Yes. Every e-Stamp we issue is procured through authorised vendors and carries a unique certificate number you (or anyone else) can verify online through the official government portal.'],
]

export default function EStampPage() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [print, setPrint] = useState(false)
  const [stateFilter, setStateFilter] = useState('')
  const [calcDuty, setCalcDuty] = useState(500)
  const [calcDelivery, setCalcDelivery] = useState('email')
  const calcCourier = calcDelivery === 'courier' ? ESTAMP_FEES.courier : 0
  const calcConvenience = getConvenienceFee(calcDuty)
  const calcFees = calcConvenience + ESTAMP_FEES.procurement + calcCourier
  const calcGst = Math.round(calcFees * GST_RATE * 100) / 100
  const calcTotal = Math.round((calcDuty + calcFees + calcGst) * 100) / 100
  const inputRef = useRef(null)

  const matches = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? ESTAMP_STATES.filter(s => s.name.toLowerCase().includes(t)) : ESTAMP_STATES
  }, [q])
  const filteredStates = useMemo(() => {
    const t = stateFilter.trim().toLowerCase()
    return t ? ESTAMP_STATES.filter(s => s.name.toLowerCase().includes(t)) : ESTAMP_STATES
  }, [stateFilter])
  const stateValid = (chosen && chosen.name === q) || ESTAMP_STATES.some(s => s.name.toLowerCase() === q.trim().toLowerCase())
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
  const scrollToStates = e => {
    e.preventDefault()
    document.getElementById('all-states')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <SEO title="Buy e-Stamp Paper Online: Any State in India" description="Order non-judicial e-Stamp paper for any state in India. Fill in your details, pay online and get the scan copy by email, with the original delivered to your door." canonical="/estamp" />
      <style>{CERT_CSS + CSS}</style>

      <section className="lde-hero">
        <div className="lde-wrap lde-hero-grid">
          <div>
            <span className="lde-hero-eyebrow">Online e-Stamp paper</span>
            <h1>Procure genuine<br /><mark>e-Stamp paper</mark> online</h1>
            <p className="lde-hero-lead">
              Skip the queues and let us handle your legal documentation online. 100% legally valid, government compliant e-Stamp papers securely delivered to you.
            </p>

            <ul className="lde-facts">
              <li>Authorised vendors</li>
              <li>Itemized pricing</li>
              <li>Secure payment</li>
              <li>Digital copy to your dashboard</li>
            </ul>

            <div className="lde-stats">
              <div><b>{ESTAMP_STATES.length}</b><span>States &amp; UTs covered</span></div>
              <div><b>100%</b><span>Government valid</span></div>
              <div><b>24 hrs</b><span>Typical turnaround</span></div>
            </div>
          </div>

          <div className="lde-start">
            <h2 className="lde-start-title">Start your e-Stamp</h2>
            <div className="lde-start-bar" role="progressbar" aria-valuenow={1} aria-valuemin={1} aria-valuemax={3} aria-label="Step 1 of 3">
              <span className="on" /><span /><span />
            </div>
            <form className="lde-pick" onSubmit={submit} role="search">
              <div className="lde-pick-field">
                <label className="lde-pick-label" htmlFor="lde-state">State jurisdiction</label>
                <input
                  id="lde-state" ref={inputRef} value={q} placeholder="Select state" autoComplete="off"
                  role="combobox" aria-expanded={open} aria-controls="lde-state-list" aria-autocomplete="list"
                  aria-activedescendant={open && matches[active] ? `lde-opt-${matches[active].slug}` : undefined}
                  onChange={e => { setQ(e.target.value); setOpen(true); setActive(0); setChosen(null) }}
                  onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 120)} onKeyDown={onKey}
                />
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
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
              <EButton as="button" type="submit" variant="primary" className="go" disabled={!stateValid}>
                {print ? 'Continue to print' : 'Proceed to Stamp Purchase'}
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </EButton>
            </form>
            <ul className="lde-start-steps">
              <li><span className="dot" />1. Select state</li>
              <li><span className="dot" />2. Secure payment</li>
              <li><span className="dot" />3. Download your e-Stamp</li>
            </ul>
            <p className="lde-pick-hint" aria-live="polite">
              {print
                ? <>You're ordering a print on e-Stamp. <button type="button" onClick={() => setPrint(false)}>I only need the stamp paper</button></>
                : <>Already have your agreement ready? <button type="button" onClick={() => setPrint(true)}>Print it on e-Stamp</button></>}
            </p>
            <a className="lde-help-pill" href={`https://wa.me/${LD_WA}?text=${encodeURIComponent('Hi, I need help ordering e-Stamp paper.')}`} target="_blank" rel="noopener noreferrer">
              <span className="dot" />Need help? Talk to us
            </a>
          </div>
        </div>
      </section>

      <section className="lde-sec">
        <div className="lde-wrap">
          <div className="lde-trans">
            <div>
              <p className="eyebrow" style={{ color: '#9FC1F5' }}>Transparent cost</p>
              <h2>Pure transparency, no hidden vendor additions</h2>
              <p className="sub" style={{ marginBottom: 0, color: '#C9D7EE' }}>Choose your parameters and see the exact cost before you pay. Government stamp duty rates are set by the state treasury; our platform fee is shown separately.</p>

              <ECard style={{ marginTop: 20 }}>
                <p className="lde-calc-head">Stamping cost configuration</p>
                <div className="lde-calc-row">
                  <div className="lbl"><span>Stamp duty value</span><span>{inr(calcDuty)}</span></div>
                  <div className="lde-calc-presets" role="group" aria-label="Stamp duty value">
                    {CALC_PRESETS.map(d => (
                      <button type="button" key={d} aria-pressed={calcDuty === d} onClick={() => setCalcDuty(d)}>{inr(d)}</button>
                    ))}
                  </div>
                </div>
                <div className="lde-calc-row">
                  <div className="lbl">Delivery</div>
                  <div className="lde-calc-delivery" role="radiogroup" aria-label="Delivery">
                    <label>
                      <span><input type="radio" name="calc-delivery" checked={calcDelivery === 'email'} onChange={() => setCalcDelivery('email')} /> Email scan only</span>
                      <span className="p">₹0</span>
                    </label>
                    <label>
                      <span><input type="radio" name="calc-delivery" checked={calcDelivery === 'courier'} onChange={() => setCalcDelivery('courier')} /> Doorstep delivery</span>
                      <span className="p">+{inr(ESTAMP_FEES.courier)} + GST</span>
                    </label>
                  </div>
                </div>
              </ECard>
            </div>
            <ECard className="lde-receipt">
              <h4>Digital statement receipt</h4>
              <dl>
                <dt>Stamp duty</dt><dd>{inr(calcDuty)}</dd>
                <dt>Convenience fee</dt><dd>{inr(calcConvenience)}</dd>
                <dt>Procurement charge</dt><dd>{inr(ESTAMP_FEES.procurement)}</dd>
                {calcCourier > 0 && <><dt>Doorstep delivery</dt><dd>{inr(calcCourier)}</dd></>}
                <dt>GST (18%)</dt><dd>{inr(calcGst)}</dd>
                <dt className="total">Total</dt><dd className="total">{inr(calcTotal)}</dd>
              </dl>
            </ECard>
          </div>
        </div>
      </section>

      <section className="lde-sec" style={{ background: 'var(--bg-secondary, #08111D)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="lde-wrap">
          <div className="lde-gov">
            <div className="lde-cert" style={{ justifySelf: 'start' }}>
              <StampCertificate stateName="Delhi" docType="Rent / Lease Agreement" purpose="Rent agreement" duty={500} compact />
            </div>
            <div>
              <EBadge>Authenticity guaranteed</EBadge>
              <h2 style={{ marginTop: 14 }}>Government Approved e-Stamp Papers</h2>
              <p className="sub" style={{ marginBottom: 0 }}>Your e-Stamp paper is legally valid and verifiable online via the official government portal. Every document we generate carries a unique certificate number to guarantee authenticity.</p>
              <ul className="lde-gov-checks">
                <li><span className="tk"><Ic d={TICK} /></span> Unique Identification Number (UIN)</li>
                <li><span className="tk"><Ic d={TICK} /></span> Real-time Online Verification</li>
                <li><span className="tk"><Ic d={TICK} /></span> Secure PDF Delivery &amp; Hard Copy Option</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="lde-sec">
        <div className="lde-wrap">
          <p className="eyebrow">How it works</p>
          <h2>Effortless procurement</h2>
          <p className="sub">Our streamlined 4-step process gets your documents ready faster.</p>
          <ol className="lde-flow">
            <li><b>Select document details</b><span>Choose your document type and stamp duty value.</span></li>
            <li><b>Provide information</b><span>Fill in the required first party and second party details securely.</span></li>
            <li><b>Verify &amp; pay</b><span>Complete payment via our secure encrypted gateway.</span></li>
            <li><b>Receive your e-Stamp</b><span>Get the soft copy by email and a hard copy by registered courier.</span></li>
          </ol>
        </div>
      </section>

      <section className="lde-sec" style={{ paddingTop: 0 }}>
        <div className="lde-wrap">
          <div className="lde-benefits">
            <ECard><h4>Procured via authorised vendors</h4><p>Issued through government-authorised stamp channels (SHCIL).</p></ECard>
            <ECard><h4>Unique ID on every stamp</h4><p>Each stamp carries an official unique identification number (UIN).</p></ECard>
            <ECard><h4>Encrypted &amp; secure</h4><p>Your details are protected with industry-standard encryption.</p></ECard>
            <ECard><h4>Digital + physical</h4><p>Email scan, registered post or insured express courier.</p></ECard>
          </div>
        </div>
      </section>

      <section className="lde-sec" style={{ background: 'var(--bg-secondary, #08111D)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="lde-wrap">
          <h2>Two ways to order</h2>
          <p className="sub">Most people need the stamp paper only. If your document is ready, we can print it on the stamp for you.</p>
          <div className="lde-ways">
            <div className="lde-way">
              <h3>e-Stamp paper</h3>
              <p>A government-issued e-Stamp for your state and value, in the parties' names.</p>
              <ul>
                <li><Ic d={TICK} /> Scan copy on email</li>
                <li><Ic d={TICK} /> Original by courier, if you want it</li>
                <li><Ic d={TICK} /> For agreements, affidavits, bonds and more</li>
              </ul>
              <EButton variant="secondary" onClick={() => startWith(false)}>Choose your state</EButton>
            </div>
            <div className="lde-way">
              <h3>Print my document on e-Stamp</h3>
              <p>Send us your agreement or affidavit and we print it on the stamp paper, ready to sign.</p>
              <ul>
                <li><Ic d={TICK} /> Upload your document after payment</li>
                <li><Ic d={TICK} /> Printed copy scanned and emailed for checking</li>
                <li><Ic d={TICK} /> Original couriered to you for signing</li>
              </ul>
              <EButton variant="primary" onClick={() => startWith(true)}>Start a print order</EButton>
            </div>
          </div>
        </div>
      </section>

      <section className="lde-sec" id="all-states">
        <div className="lde-wrap">
          <div className="lde-states-head">
            <div>
              <p className="eyebrow" style={{ marginBottom: 6 }}>Choose your state</p>
              <h2 style={{ margin: 0 }}>e-Stamp paper in every supported state</h2>
              <p className="sub" style={{ margin: '8px 0 0' }}>Each state has its own duty rates and rules. Open a state to see them, then start your order.</p>
            </div>
            <div className="lde-states-search">
              <input value={stateFilter} onChange={e => setStateFilter(e.target.value)} placeholder="Search state" aria-label="Search state" />
            </div>
          </div>
          <div className="lde-state-grid">
            {filteredStates.map(s => (
              <Link key={s.slug} to={`/estamp/${s.slug}`} className="lde-state-card">{s.name}<Ic d="m9 18 6-6-6-6" /></Link>
            ))}
            {!filteredStates.length && <p className="lde-az-note">No state matches "{stateFilter}".</p>}
          </div>
          <p className="lde-az-note">
            Don't see your state? <a href={`https://wa.me/${LD_WA}?text=${encodeURIComponent('Hi, I need e-Stamp paper for a state not listed on your website.')}`} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a> and we'll tell you if we can help.
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
            <h2>Questions &amp; Answers</h2>
            <p className="sub">Quick answers about e-Stamp paper, stamp duty and delivery.</p>
            <EAccordion items={FAQS} />
            <p className="lde-az-note">Still have more questions? <a href={`https://wa.me/${LD_WA}?text=${encodeURIComponent('Hi, I have a question about e-Stamp paper.')}`} target="_blank" rel="noopener noreferrer">Ask us on Chat</a></p>
          </div>
        </div>
      </section>

      <section className="lde-sec" style={{ paddingTop: 0 }}>
        <div className="lde-wrap">
          <div className="lde-cta">
            <h3>Ready to get your e-Stamp paper?</h3>
            <EButton as="a" href="#all-states" onClick={scrollToStates} variant="secondary">Choose your state</EButton>
          </div>
        </div>
      </section>
    </>
  )
}
