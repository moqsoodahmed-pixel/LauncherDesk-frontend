import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SEO from '../../components/SEO'
import { useUserAuth } from '../../context/UserAuthContext'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { usePortalAuth } from '../../context/PortalAuthContext'
import apiClient from '../../services/portal/apiClient'
import logoImg from '../../assets/launcherdesk-logo-transparent.png'
import { loadRazorpayScript } from '../../lib/razorpay'
import StampCertificate, { CERT_CSS } from './StampCertificate'
import { stateBySlug, DENOMINATIONS, MAX_DUTY, ESTAMP_FEES, GST_RATE, LD_WA } from '../../data/estamp'
import { articlesFor, keyOf, dutyFromRule, ruleText } from '../../data/estampArticles'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const CSS = `
.lds { background:var(--sec-b, #F8FAFC); min-height:80vh; padding-bottom:80px; }
.lds-wrap { max-width:1200px; margin:0 auto; padding:0 24px; }
.lds-head { background:#fff; border-bottom:1px solid var(--line); padding:22px 0 24px; margin-bottom:28px; }
.lds-crumb { font-size:13.5px; color:var(--text-3); margin-bottom:10px; }
.lds-crumb a { color:var(--text-3); text-decoration:none; } .lds-crumb a:hover { color:var(--blue); }
.lds-head-row { display:flex; justify-content:space-between; align-items:flex-end; gap:16px; flex-wrap:wrap; }
.lds-head h1 { margin:0; font-size:clamp(26px,3.4vw,38px); letter-spacing:-.03em; color:var(--navy); font-weight:800; }
.lds-script { margin-top:4px; font-size:18px; color:var(--text-2); font-weight:600; }
.lds-change { font-size:14.5px; font-weight:700; color:var(--blue); text-decoration:none; border:1.5px solid var(--brand-100);
  border-radius:10px; padding:9px 14px; background:var(--brand-50); }

.lds-grid { display:grid; grid-template-columns:190px minmax(0,1fr) 380px; gap:28px; align-items:start; }

/* Step rail */
.lds-rail { position:sticky; top:100px; margin:0; padding:0; list-style:none; }
.lds-rail li { position:relative; padding:0 0 26px 40px; }
.lds-rail li:last-child { padding-bottom:0; }
.lds-rail li::after { content:''; position:absolute; left:14px; top:30px; bottom:2px; width:2px; background:var(--line-strong); }
.lds-rail li:last-child::after { display:none; }
.lds-rail li.done::after { background:var(--blue); }
.lds-rail button { all:unset; cursor:pointer; display:block; }
.lds-rail button:disabled { cursor:default; }
.lds-rail button:focus-visible { outline:3px solid var(--brand-200); outline-offset:4px; border-radius:6px; }
.lds-dot { position:absolute; left:0; top:0; width:30px; height:30px; border-radius:50%; display:grid; place-items:center; font-weight:800; font-size:13px;
  background:#fff; border:2px solid var(--line-strong); color:var(--text-3); }
.lds-rail li.now .lds-dot { border-color:var(--blue); color:var(--blue); box-shadow:0 0 0 5px var(--brand-50); }
.lds-rail li.done .lds-dot { background:var(--blue); border-color:var(--blue); color:#fff; }
.lds-rail b { display:block; font-size:14.5px; color:var(--navy); padding-top:4px; }
.lds-rail small { display:block; font-size:12.5px; color:var(--text-3); margin-top:2px; line-height:1.4; }
.lds-rail li:not(.now):not(.done) b { color:var(--text-3); }

/* Form */
.lds-form { background:#fff; border:1px solid var(--line); border-radius:18px; padding:clamp(20px,3vw,32px); }
.lds-form h2 { margin:0 0 4px; font-size:22px; color:var(--navy); letter-spacing:-.02em; }
.lds-form .lead { margin:0 0 24px; color:var(--text-2); font-size:15px; line-height:1.55; }
.lds-f { margin-bottom:20px; }
.lds-f > label, .lds-f > .lbl { display:block; font-size:14.5px; font-weight:700; color:var(--navy); margin-bottom:8px; }
.lds-f .lds-optional { font-weight:500; color:var(--text-3); }
.lds-in { width:100%; height:50px; box-sizing:border-box; border:1.5px solid var(--line-strong); border-radius:11px; padding:0 14px;
  font-size:15.5px; font-family:inherit; background:#fff; color:var(--navy); outline:none; transition:border-color .15s, box-shadow .15s; }
textarea.lds-in { height:auto; min-height:88px; padding:12px 14px; resize:vertical; line-height:1.5; }
.lds-in:focus { border-color:var(--blue); box-shadow:0 0 0 4px rgba(29,93,184,.12); }
.lds-in.bad { border-color:var(--error); }
.lds-err { color:var(--error); font-size:13px; margin-top:6px; }
.lds-help { color:var(--text-3); font-size:13px; margin-top:6px; line-height:1.5; }
.lds-two { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.lds-seg { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.lds-seg label, .lds-card label { display:flex; gap:10px; align-items:flex-start; border:1.5px solid var(--line-strong); border-radius:12px; padding:13px 14px;
  cursor:pointer; font-weight:700; color:var(--navy); font-size:15px; background:#fff; margin:0; }
.lds-seg label:has(input:checked), .lds-card label:has(input:checked) { border-color:var(--blue); background:var(--brand-50); }
.lds-seg input, .lds-card input { margin-top:3px; accent-color:var(--blue); }
.lds-card { display:grid; gap:10px; }
.lds-card small { display:block; font-weight:500; color:var(--text-3); margin-top:3px; line-height:1.45; }
.lds-duty { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; max-width:420px; }
.lds-duty button { height:46px; border-radius:10px; border:1.5px solid var(--line-strong); background:#fff; font-family:inherit; font-weight:800;
  font-size:15px; color:var(--navy); cursor:pointer; }
.lds-duty button[aria-pressed="true"] { border-color:var(--blue); background:var(--blue); color:#fff; }
.lds-duty button:focus-visible { outline:3px solid var(--brand-200); outline-offset:2px; }
.lds-print { display:flex; gap:12px; align-items:flex-start; border:1.5px dashed var(--brand-200); border-radius:12px; padding:14px; cursor:pointer;
  background:linear-gradient(180deg,#fff,var(--brand-50)); }
.lds-print input { margin-top:3px; width:18px; height:18px; accent-color:var(--blue); flex:none; }
.lds-print b { color:var(--navy); }
.lds-print span { font-size:14px; color:var(--text-2); line-height:1.5; }
.lds-actions { display:flex; gap:12px; justify-content:space-between; align-items:center; margin-top:26px; padding-top:20px; border-top:1px solid var(--line); }
.lds-btn { height:52px; padding:0 26px; border-radius:12px; font-family:inherit; font-weight:800; font-size:16px; cursor:pointer; border:0;
  display:inline-flex; align-items:center; justify-content:center; gap:8px; text-decoration:none; }
.lds-btn.primary { background:var(--blue); color:#fff; margin-left:auto; }
.lds-btn.primary:hover { background:var(--blue-dark); }
.lds-btn.primary:disabled { opacity:.6; cursor:not-allowed; }
.lds-btn.plain { background:none; color:var(--text-2); padding:0 8px; }
.lds-btn:focus-visible { outline:3px solid var(--brand-200); outline-offset:2px; }
.lds-note { display:flex; gap:10px; align-items:flex-start; background:var(--warn-bg, #FFFBEB); border:1px solid #FDE68A; color:#92400E;
  border-radius:12px; padding:12px 14px; font-size:14px; line-height:1.5; margin-bottom:20px; }
.lds-alert { margin-top:14px; padding:12px 14px; border-radius:10px; font-size:14px; background:var(--error-bg); border:1px solid #FECACA; color:#991B1B; }

/* Article picker */
.lda { position:relative; }
.lda-btn { width:100%; min-height:54px; box-sizing:border-box; display:flex; align-items:center; gap:10px; text-align:left; cursor:pointer;
  border:1.5px solid var(--line-strong); border-radius:11px; background:#fff; padding:8px 14px; font-family:inherit; }
.lda-btn.bad { border-color:var(--error); }
.lda-btn:focus-visible, .lda-btn[aria-expanded="true"] { border-color:var(--blue); box-shadow:0 0 0 4px rgba(29,93,184,.12); outline:none; }
.lda-btn .t { flex:1; min-width:0; }
.lda-btn b { display:block; font-size:15.5px; color:var(--navy); font-weight:700; line-height:1.35; }
.lda-btn small { display:block; font-size:12.5px; color:var(--text-3); margin-top:2px; }
.lda-btn .ph { color:var(--text-4, #9CA3AF); font-weight:600; font-size:15.5px; }
.lda-btn svg { width:18px; height:18px; stroke:var(--text-3); flex:none; }
.lda-pop { position:absolute; left:0; right:0; top:calc(100% + 8px); z-index:40; background:#fff; border-radius:14px; overflow:hidden;
  box-shadow:0 24px 60px -12px rgba(11,31,72,.40), 0 0 0 1px rgba(15,28,46,.06); }
.lda-search { position:relative; border-bottom:1px solid var(--line); }
.lda-search svg { position:absolute; left:14px; top:50%; transform:translateY(-50%); width:17px; height:17px; stroke:var(--text-3); }
.lda-search input { width:100%; height:50px; border:0; outline:none; padding:0 14px 0 42px; font-size:15px; font-family:inherit; box-sizing:border-box; }
.lda-list { list-style:none; margin:0; padding:6px; max-height:min(340px,55vh); overflow-y:auto; overscroll-behavior:contain; }
.lda-opt { display:flex; gap:10px; width:100%; text-align:left; border:0; background:none; padding:10px 10px; border-radius:9px; cursor:pointer; font-family:inherit; }
.lda-opt[aria-selected="true"] { background:var(--brand-50); }
.lda-opt .chk { width:18px; flex:none; color:var(--blue); font-weight:900; padding-top:1px; }
.lda-opt b { display:block; font-size:14.5px; color:var(--navy); font-weight:600; line-height:1.35; }
.lda-opt small { display:block; font-size:12.5px; color:var(--text-3); margin-top:2px; }
.lda-opt small i { font-style:normal; color:var(--blue); font-weight:600; }
.lda-empty { padding:16px 14px; color:var(--text-3); font-size:14px; }
.lda-src { padding:9px 14px; font-size:11.5px; color:var(--text-3); background:var(--bg); border-top:1px solid var(--line); }
.lds-rule { display:flex; gap:10px; align-items:flex-start; background:var(--brand-50); border:1px solid var(--brand-100); border-radius:12px;
  padding:12px 14px; font-size:14px; color:var(--navy); line-height:1.5; margin-top:10px; }
.lds-rule b { font-weight:800; }
.lds-duty-fixed { display:flex; align-items:baseline; gap:10px; border:1.5px solid var(--blue); background:var(--brand-50); border-radius:12px; padding:12px 16px; }
.lds-duty-fixed b { font-size:22px; color:var(--blue-dark); }
.lds-duty-fixed span { font-size:13.5px; color:var(--text-2); }

.lds-extra { display:inline-block; margin-left:8px; padding:1px 8px; border-radius:99px; background:var(--brand-100); color:var(--blue-dark);
  font-size:13px; font-weight:800; vertical-align:1px; }
.lds-extra-why { color:var(--text-2) !important; }
.lds-incl { display:block; font-size:11.5px; color:var(--text-3); }

/* Aside */
.lds-aside { position:sticky; top:100px; display:grid; gap:16px; }
.lds-price { background:#fff; border:1px solid var(--line); border-radius:16px; padding:18px 18px 16px; }
.lds-price h3 { margin:0 0 12px; font-size:15px; color:var(--navy); }
.lds-price dl { margin:0; display:grid; grid-template-columns:1fr auto; gap:8px 12px; font-size:14.5px; }
.lds-price dt { color:var(--text-2); } .lds-price dd { margin:0; text-align:right; font-weight:700; color:var(--navy); }
.lds-price .total { border-top:1px solid var(--line); padding-top:10px; font-size:17px; font-weight:800; color:var(--navy); }
.lds-price p { margin:12px 0 0; font-size:12.5px; color:var(--text-3); line-height:1.5; }
.lds-help-card { border-radius:16px; padding:16px 18px; background:var(--navy); color:#fff; font-size:14px; line-height:1.55; }
.lds-help-card a { color:#fff; font-weight:800; }

/* Done */
.lds-done { text-align:center; padding:12px 0; }
.lds-done .tick { width:68px; height:68px; margin:0 auto 16px; border-radius:50%; background:var(--success-bg); display:grid; place-items:center; }
.lds-done h2 { font-size:26px; }
.lds-done p { color:var(--text-2); line-height:1.65; max-width:52ch; margin:0 auto 22px; }

/* Login side panel */
.lds-scrim { position:fixed; inset:0; background:rgba(11,31,72,.45); z-index:9998; }
.lds-panel { position:fixed; top:0; right:0; bottom:0; width:min(420px,100%); background:#fff; z-index:9999; padding:28px 26px;
  box-shadow:-20px 0 60px rgba(11,31,72,.25); display:flex; flex-direction:column; animation:ldsIn .25s ease; }
@keyframes ldsIn { from { transform:translateX(30px); opacity:0; } to { transform:none; opacity:1; } }
@media (prefers-reduced-motion: reduce) { .lds-panel { animation:none; } }
.lds-panel img { height:34px; align-self:flex-start; margin-bottom:28px; }
.lds-panel h2 { margin:0 0 8px; font-size:24px; color:var(--navy); letter-spacing:-.02em; }
.lds-panel p { margin:0 0 22px; color:var(--text-2); line-height:1.6; }
.lds-panel .lds-btn { width:100%; margin:0 0 10px; }
.lds-panel .lds-btn.ghost { background:#fff; color:var(--navy); border:1.5px solid var(--line-strong); }
.lds-panel .close { position:absolute; top:16px; right:16px; width:38px; height:38px; border-radius:50%; border:0; background:var(--bg-2); font-size:22px; cursor:pointer; }
.lds-saved { display:flex; gap:10px; align-items:center; margin-top:auto; background:var(--success-bg); color:#065F46; border-radius:12px; padding:12px 14px; font-size:14px; }

@media (max-width:1100px) { .lds-grid { grid-template-columns:minmax(0,1fr) 340px; } .lds-rail { display:none; } }
@media (max-width:860px) { .lds-grid { grid-template-columns:1fr; } .lds-aside { position:static; } }
@media (max-width:520px) { .lds-two, .lds-seg { grid-template-columns:1fr; } 
  .lds-actions { flex-direction:column-reverse; } .lds-btn.primary { width:100%; } }
`

const DRAFT_KEY = slug => `ld_estamp_draft_${slug}`
const inr = n => `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
const EMPTY = {
  firstParty: '', secondParty: '', payer: '',
  article: '', baseAmount: '', purpose: '', consideration: '', duty: '', customDuty: '', print: false,
  delivery: 'email', name: '', mobile: '', email: '', address: '', city: '', pincode: '',
}
const STEPS = [
  { t: 'The parties', s: 'Who the stamp is for' },
  { t: 'The stamp', s: 'Document and value' },
  { t: 'Delivery and pay', s: 'Where we send it' },
]

function loadDraft(slug) {
  try {
    const d = JSON.parse(localStorage.getItem(DRAFT_KEY(slug)) || 'null')
    if (!d || typeof d !== 'object') return null
    // a value saved earlier that is no longer offered (e.g. ₹100) is cleared
    if (d.duty && d.duty !== 'custom' && !DENOMINATIONS.includes(Number(d.duty))) d.duty = ''
    return { ...EMPTY, ...d }
  } catch { return null }
}

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
          {sel ? <><b>{sel.label}</b>{sub(sel).length > 0 && <small>{sub(sel).join(' · ')}</small>}</> : <span className="ph">Search or choose the document</span>}
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
                    {(a.code || a.hint || a.rule) && <small>{[a.code && `Article ${a.code}`, a.hint].filter(Boolean).join(' · ')}{a.rule && <> {a.code || a.hint ? '· ' : ''}<i>{ruleText(a.rule)}</i></>}</small>}
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

export default function EStampStatePage() {
  const { state: slug } = useParams()
  const st = stateBySlug(slug)
  const [params] = useSearchParams()
  // The site now has two login systems: the original one (useUserAuth/useAdminAuth)
  // and the newer "Portal" unified login (usePortalAuth) that the main /user/login
  // page signs people into today. A customer may be signed in through either —
  // Portal takes priority when both are present, matching the navbar's own logic.
  const { isLoggedIn, token, user, logout } = useUserAuth()
  const adminAuth = useAdminAuth()
  const { user: portalUser } = usePortalAuth()
  const usingPortal = !!portalUser
  const canPay = usingPortal || isLoggedIn || !!adminAuth?.token
  const [sessionExpired, setSessionExpired] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const formRef = useRef(null)

  const [f, setF] = useState(() => {
    const d = loadDraft(slug) || {}
    return { ...EMPTY, ...d, print: params.get('print') === '1' ? true : !!d.print }
  })
  const savedStep = (() => { try { return Number(sessionStorage.getItem(`${DRAFT_KEY(slug)}_step`)) || 1 } catch { return 1 } })()
  const [step, setStep] = useState(savedStep)
  const [maxStep, setMaxStep] = useState(savedStep)
  const [errs, setErrs] = useState({})
  const [paying, setPaying] = useState(false)
  const [payErr, setPayErr] = useState('')
  const [done, setDone] = useState(null)
  const [askLogin, setAskLogin] = useState(false)

  // keep a draft so nothing is lost while the customer logs in
  useEffect(() => { try { localStorage.setItem(DRAFT_KEY(slug), JSON.stringify(f)) } catch { /* storage unavailable */ } }, [f, slug])
  useEffect(() => { try { sessionStorage.setItem(`${DRAFT_KEY(slug)}_step`, String(maxStep)) } catch { /* ignore */ } }, [maxStep, slug])
  useEffect(() => {
    if (!user) return
    setF(v => ({ ...v, name: v.name || user.name || '', email: v.email || user.email || '', mobile: v.mobile || user.phone || '' }))
  }, [user])
  useEffect(() => { if (canPay) { setAskLogin(false); setSessionExpired(false) } }, [canPay])
  useEffect(() => {
    if (!askLogin) return
    const onKey = e => { if (e.key === 'Escape') setAskLogin(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [askLogin])

  const { verified, items: articles } = useMemo(() => articlesFor(slug), [slug])
  const article = articles.find(a => keyOf(a) === f.article) || null
  const rule = article?.rule && article.rule.type !== 'text' ? article.rule : null
  const baseField = rule?.base === 'Consideration amount' ? 'consideration' : 'baseAmount'
  const ruled = rule ? dutyFromRule(rule, f[baseField]) : null      // { duty } | { error } | null
  const manualDuty = f.duty === 'custom' ? Number(f.customDuty) : Number(f.duty)
  const duty = rule ? (ruled?.duty ?? NaN) : manualDuty
  const docLabel = article ? `${article.code ? `Article ${article.code} ` : ''}${article.label}` : ''
  const validDuty = Number.isInteger(duty) && duty >= 1 && duty <= MAX_DUTY
  const courier = f.delivery === 'courier' ? ESTAMP_FEES.courier : 0
  const fees = ESTAMP_FEES.service + courier
  const gst = Math.round(ESTAMP_FEES.service * GST_RATE * 100) / 100   // courier price already includes GST
  const total = useMemo(() => Math.round(((validDuty ? duty : 0) + fees + gst) * 100) / 100, [validDuty, duty, fees, gst])

  if (!st) return <Navigate to="/estamp" replace />

  const set = k => e => {
    setF(v => ({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
    // an edited field shouldn't keep showing its old error
    setErrs(x => (x[k] || ((k === 'baseAmount' || k === 'consideration') && x.base) || (k === 'customDuty' && x.duty))
      ? { ...x, [k]: undefined, ...(k === 'baseAmount' || k === 'consideration' ? { base: undefined } : {}), ...(k === 'customDuty' ? { duty: undefined } : {}) } : x)
  }
  const goLogin = tab => navigate('/user/login', { state: { from: location.pathname + location.search, tab } })

  function validate(s) {
    const e = {}
    if (s === 1) {
      if (!f.firstParty.trim()) e.firstParty = "Enter the first party's name."
      if (!f.secondParty.trim()) e.secondParty = "Enter the second party's name, or NIL if there isn't one."
      if (!f.payer) e.payer = 'Choose who pays the stamp duty.'
    }
    if (s === 2) {
      if (!article) e.docType = 'Choose the document type.'
      if (!f.purpose.trim()) e.purpose = 'Describe what the stamp is for.'
      if (rule) {
        if (ruled?.error) e.base = ruled.error
        else if (!validDuty) e.base = `The duty works out above ${inr(MAX_DUTY)}. Message us and we'll arrange it for you.`
      } else if (!f.duty) e.duty = 'Choose a stamp duty value.'
      else if (!validDuty) e.duty = `Enter a whole amount from ₹1 to ${inr(MAX_DUTY)}.`
      if (f.consideration && !(Number(f.consideration) >= 0)) e.consideration = 'Enter the amount in rupees, numbers only.'
    }
    if (s === 3) {
      if (!f.name.trim()) e.name = 'Enter your name.'
      if (!/^\+?[0-9\s-]{10,14}$/.test(f.mobile.trim())) e.mobile = 'Enter a 10-digit mobile number.'
      if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
      if (f.delivery === 'courier') {
        if (!f.address.trim()) e.address = 'Enter the delivery address.'
        if (!f.city.trim()) e.city = 'Enter the city.'
        if (!/^\d{6}$/.test(f.pincode.trim())) e.pincode = 'Enter the 6-digit PIN code.'
      }
    }
    setErrs(e)
    return !Object.keys(e).length
  }
  const goTo = n => { setErrs({}); setStep(n); formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  const next = () => { if (validate(step)) { setMaxStep(m => Math.max(m, step + 1)); goTo(step + 1) } }

  async function pay() {
    if (!validate(3)) return
    if (!canPay) { setAskLogin(true); return }
    setPaying(true); setPayErr('')
    const payload = {
      state: st.slug, stateName: st.name,
      firstParty: f.firstParty.trim(), secondParty: f.secondParty.trim(), payer: f.payer,
      documentType: article ? article.label : '',
      articleCode: article?.code || '',
      purpose: f.purpose.trim(), consideration: f.consideration,
      stampDuty: duty, printDocument: !!f.print, delivery: f.delivery,
      name: f.name.trim(), email: f.email.trim(), mobile: f.mobile.trim(),
      ...(f.delivery === 'courier' ? { address: f.address.trim(), city: f.city.trim(), pincode: f.pincode.trim() } : {}),
    }
    try {
      let data
      if (usingPortal) {
        // apiClient already knows how to attach a valid (auto-refreshed) Portal
        // token and retries once after a silent refresh — reused as-is here,
        // just pointed at this endpoint instead of its own /api/portal/* base.
        const res = await apiClient.post('/payments/checkout/estamp/create-order', payload, { baseURL: API_BASE })
        data = res.data
      } else {
        const res = await fetch(`${API_BASE}/payments/checkout/estamp/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token || adminAuth?.token}` },
          body: JSON.stringify(payload),
        })
        data = await res.json()
        if (res.status === 401) {
          if (token) logout(); else adminAuth?.logout?.()
          setSessionExpired(true); setAskLogin(true); setPaying(false); return
        }
        if (!res.ok) throw new Error((data.fields && Object.values(data.fields)[0]) || data.message || "We couldn't create your order. Check the details and try again.")
      }

      // Without a real key, `new window.Razorpay({...})`/`.open()` can fail
      // silently on some mobile browsers instead of throwing (the desktop
      // checkout.js build is more likely to surface a visible SDK error) —
      // matches the exact "stuck on Opening payment… forever" symptom seen
      // on mobile. Fail loudly here instead, same guard ClientPaymentPanel.jsx
      // already uses for the Portal payment flow.
      if (!data.keyId) {
        setPayErr('Payment could not be started (missing payment configuration). Please contact support@launcherdesk.com — no amount has been charged.')
        return
      }

      await loadRazorpayScript()

      // On mobile, body scroll-lock from our own UI can trap Razorpay's
      // iframe. Release it before opening, restore it on close.
      const bodyOverflow = document.body.style.overflow
      document.body.style.overflow = ''

      await new Promise(resolve => {
        // Watchdog: if the Razorpay modal fails to open or respond within
        // 15 s, recover gracefully so the button is never stuck permanently.
        let settled = false
        const finish = () => {
          if (!settled) {
            settled = true
            document.body.style.overflow = bodyOverflow
            resolve()
          }
        }
        const watchdog = setTimeout(() => {
          if (!settled) {
            setPayErr('The payment window didn\u2019t open. Please check your connection and try again \u2014 no amount has been charged.')
            finish()
          }
        }, 15000)

        const rzpOptions = {
          key: data.keyId, amount: data.amount, currency: data.currency, order_id: data.orderId,
          name: 'LauncherDesk', description: `e-Stamp paper, ${st.name}`, image: new URL(logoImg, window.location.origin).href,
          prefill: { name: f.name, email: f.email, contact: f.mobile }, theme: { color: '#1D5DB8' },
          modal: {
            ondismiss: () => { clearTimeout(watchdog); finish() },
            // Prevent accidental close on mobile back-gesture
            confirm_close: true,
            animation: true,
            // Escape key also closes
            escape: true,
          },
          handler: async response => {
            clearTimeout(watchdog)
            try {
              let v
              if (usingPortal) {
                const vr = await apiClient.post('/payments/verify', response, { baseURL: API_BASE })
                v = vr.data
              } else {
                v = await fetch(`${API_BASE}/payments/verify`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token || adminAuth?.token}` },
                  body: JSON.stringify(response),
                }).then(r => r.json())
              }
              if (v.success) {
                try { localStorage.removeItem(DRAFT_KEY(slug)) } catch { /* ignore */ }
                setDone({ orderNumber: v.orderNumber || data.orderNumber, ldOrderId: v.ldOrderId || data.ldOrderId })
              } else setPayErr(v.message || "Payment received. We're confirming it and will email you shortly.")
            } catch {
              setPayErr("Payment received. We're confirming it and will email you shortly. You don't need to pay again.")
            }
            finish()
          },
        }

        // On Android WebViews / mobile Chrome, the Razorpay checkout iframe
        // must be opened synchronously during or immediately after a user
        // gesture. By the time we reach here we have done async work (fetch +
        // loadRazorpayScript), which means we are technically outside the
        // original click gesture context. Wrapping open() in setTimeout(0)
        // gives the browser a chance to finish rendering (the "Opening
        // payment…" label), and on most mobile browsers the gesture window
        // is preserved long enough for this to work reliably.
        const rzp = new window.Razorpay(rzpOptions)
        rzp.on?.('payment.failed', r => {
          clearTimeout(watchdog)
          setPayErr(r?.error?.description || "The payment didn't go through. No money was taken; you can try again.")
          finish()
        })

        // Use setTimeout(0) so the browser paints "Opening payment…" before
        // the modal renders — this prevents a blank/frozen screen on mobile.
        setTimeout(() => {
          try {
            rzp.open()
          } catch (openErr) {
            clearTimeout(watchdog)
            setPayErr(openErr?.message || 'Could not open the payment window. Please try again.')
            finish()
          }
        }, 0)
      })
    } catch (err) {
      // apiClient (Portal path) throws here after its own silent-refresh retry also
      // failed — a real, unrecoverable session expiry, not a one-off network blip.
      if (usingPortal && err?.response?.status === 401) { setSessionExpired(true); setAskLogin(true) }
      else setPayErr(err?.response?.data?.message || err.message || 'Something went wrong. Please try again.')
    } finally {
      setPaying(false)
    }
  }

  const Err = ({ k }) => (errs[k] ? <div className="lds-err" role="alert">{errs[k]}</div> : null)
  const inCls = k => `lds-in${errs[k] ? ' bad' : ''}`

  return (
    <>
      <SEO title={`${st.name} e-Stamp Paper — Order Online`} description={`Order non-judicial e-Stamp paper for ${st.name} online. Fill in the details, pay securely and get the scan copy by email, with doorstep delivery available.`} canonical={`/estamp/${st.slug}`} />
      <style>{CERT_CSS + CSS}</style>

      <div className="lds">
        <header className="lds-head">
          <div className="lds-wrap">
            <nav className="lds-crumb" aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/estamp">e-Stamp</Link> / {st.name}</nav>
            <div className="lds-head-row">
              <div>
                <h1>{st.name} e-Stamp paper</h1>
                {st.script && <div className="lds-script" lang="und">{st.script}</div>}
              </div>
              <Link to="/estamp#all-states" className="lds-change">Change state</Link>
            </div>
          </div>
        </header>

        <div className="lds-wrap lds-grid">
          {/* Step rail */}
          <ol className="lds-rail" aria-label="Order steps">
            {STEPS.map((s, i) => {
              const n = i + 1
              const cls = done || n < step ? 'done' : n === step ? 'now' : ''
              return (
                <li key={s.t} className={cls}>
                  <button type="button" disabled={!!done || n > maxStep} onClick={() => goTo(n)} aria-current={n === step ? 'step' : undefined}>
                    <span className="lds-dot">{cls === 'done' ? '✓' : n}</span>
                    <b>{s.t}</b><small>{s.s}</small>
                  </button>
                </li>
              )
            })}
          </ol>

          {/* Form */}
          <section className="lds-form" ref={formRef} style={{ scrollMarginTop: 100 }} aria-live="polite">
            {done ? (
              <div className="lds-done">
                <div className="tick"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></div>
                <h2>Order placed</h2>
                <p>
                  {done.orderNumber && <>Your order number is <b>{done.orderNumber}</b>. </>}
                  We've emailed your receipt and tax invoice. Our team will check the details and email you the scan copy
                  {f.delivery === 'courier' ? ', then courier the original to you' : ''}.
                  {f.print ? ' Upload the document you want printed from your order page.' : ''}
                </p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {done.ldOrderId && <Link to={`/user/services/${done.ldOrderId}`} className="lds-btn primary" style={{ marginLeft: 0 }}>View my order</Link>}
                  <Link to="/estamp" className="lds-btn plain">Order another e-Stamp</Link>
                </div>
              </div>
            ) : (
              <>
                {step === 1 && (
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
                      <input id="sp" className={inCls('secondParty')} value={f.secondParty} onChange={set('secondParty')} placeholder="e.g. tenant — or NIL" />
                      <div className="lds-help">For an affidavit or declaration with no second party, write NIL.</div>
                      <Err k="secondParty" />
                    </div>
                    <div className="lds-f" role="radiogroup" aria-labelledby="payer-l">
                      <div className="lbl" id="payer-l">Who pays the stamp duty?</div>
                      <div className="lds-seg">
                        {['First Party', 'Second Party'].map(p => (
                          <label key={p}><input type="radio" name="payer" value={p} checked={f.payer === p} onChange={set('payer')} />{p === 'First Party' ? 'First party' : 'Second party'}</label>
                        ))}
                      </div>
                      <Err k="payer" />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2>What is it for?</h2>
                    <p className="lead">
                      {verified
                        ? <>Pick the article your document falls under. Where {st.name}'s rules fix the duty, we fill it in for you.</>
                        : <>Pick your document and the stamp duty value. We confirm the exact {st.name} article and duty before buying the stamp, and call you if anything needs to change.</>}
                    </p>
                    <div className="lds-f">
                      <label htmlFor="dt">Document type</label>
                      <ArticlePicker items={articles} value={f.article} verified={verified} stateName={st.name} invalid={!!errs.docType}
                        onChange={k => { setF(v => ({ ...v, article: k })); setErrs(x => ({ ...x, docType: undefined, base: undefined, duty: undefined })) }} />
                      <Err k="docType" />
                      {article?.rule?.type === 'text' && <div className="lds-rule"><span>How the duty is worked out: <b>{article.rule.text}</b> Enter the amount below.</span></div>}
                    </div>
                    <div className="lds-f">
                      <label htmlFor="pu">Purpose</label>
                      <textarea id="pu" className={inCls('purpose')} value={f.purpose} onChange={set('purpose')} maxLength={500}
                        placeholder="e.g. Rent agreement for flat 12, 4th Cross, Koramangala, Bengaluru" />
                      <Err k="purpose" />
                    </div>
                    {rule ? (
                      <div className="lds-f">
                        {rule.type !== 'fixed' && baseField === 'baseAmount' && (
                          <div className="lds-f" style={{ marginBottom: 12 }}>
                            <label htmlFor="ba">{rule.base}</label>
                            <input id="ba" className={inCls('base')} type="number" min="1" inputMode="numeric" value={f.baseAmount} onChange={set('baseAmount')} placeholder="Amount in ₹" />
                          </div>
                        )}
                        <div className="lbl">Stamp duty</div>
                        <div className="lds-duty-fixed" aria-live="polite">
                          <b>{validDuty ? inr(duty) : '₹ —'}</b>
                          <span>{rule.type === 'fixed' ? `Fixed by ${st.name}'s rules for this article` : ruleText(rule)}</span>
                        </div>
                        {baseField === 'consideration' && !errs.base && !validDuty && <div className="lds-help">Enter the consideration amount below to work out the duty.</div>}
                        <Err k="base" />
                      </div>
                    ) : (
                      <div className="lds-f">
                        <div className="lbl" id="duty-l">Stamp duty value</div>
                        <div className="lds-duty" role="group" aria-labelledby="duty-l">
                          {DENOMINATIONS.map(d => (
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
                    <div className="lds-f">
                      <label htmlFor="cp">Consideration amount {baseField === 'consideration' && rule ? null : <span className="lds-optional">(optional)</span>}</label>
                      <input id="cp" className={inCls('consideration')} type="number" min="0" inputMode="numeric" value={f.consideration} onChange={set('consideration')} placeholder="e.g. security deposit or deal value, in ₹" />
                      <Err k="consideration" />
                    </div>
                    <label className="lds-print">
                      <input type="checkbox" checked={f.print} onChange={set('print')} />
                      <span><b>Print my document on this e-Stamp.</b> After paying, upload your agreement or affidavit from your order page and we print it on the stamp.</span>
                    </label>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2>Where should we send it?</h2>
                    <p className="lead">The scan copy goes to your email. Choose courier if you also need the original.</p>
                    {!canPay && (
                      <div className="lds-note">You'll be asked to log in before paying. Everything you've entered is saved.</div>
                    )}
                    <div className="lds-f lds-card" role="radiogroup" aria-label="Delivery">
                      <label>
                        <input type="radio" name="dl" value="email" checked={f.delivery === 'email'} onChange={set('delivery')} />
                        <span>Email only<small>Scan copy by email, usually within a few hours on working days.</small></span>
                      </label>
                      <label>
                        <input type="radio" name="dl" value="courier" checked={f.delivery === 'courier'} onChange={set('delivery')} />
                        <span>Email and courier{ESTAMP_FEES.courier ? <span className="lds-extra">+{inr(ESTAMP_FEES.courier)}</span> : null}
                          <small>Scan copy by email, and the original stamp paper delivered to your door.</small>
                          {ESTAMP_FEES.courier > 0 && <small className="lds-extra-why">The extra {inr(ESTAMP_FEES.courier)} covers packing and couriering the original stamp paper to your address. GST is included.</small>}
                        </span>
                      </label>
                    </div>
                    {f.delivery === 'courier' && (
                      <>
                        <div className="lds-f">
                          <label htmlFor="ad">Delivery address</label>
                          <textarea id="ad" className={inCls('address')} value={f.address} onChange={set('address')} maxLength={300} placeholder="House or flat, street, area" autoComplete="street-address" />
                          <Err k="address" />
                        </div>
                        <div className="lds-two">
                          <div className="lds-f"><label htmlFor="ci">City</label>
                            <input id="ci" className={inCls('city')} value={f.city} onChange={set('city')} autoComplete="address-level2" /><Err k="city" /></div>
                          <div className="lds-f"><label htmlFor="pin">PIN code</label>
                            <input id="pin" className={inCls('pincode')} inputMode="numeric" maxLength={6} value={f.pincode} onChange={set('pincode')} autoComplete="postal-code" /><Err k="pincode" /></div>
                        </div>
                      </>
                    )}
                    <div className="lds-two">
                      <div className="lds-f"><label htmlFor="nm">Your name</label>
                        <input id="nm" className={inCls('name')} value={f.name} onChange={set('name')} autoComplete="name" /><Err k="name" /></div>
                      <div className="lds-f"><label htmlFor="mb">Mobile</label>
                        <input id="mb" className={inCls('mobile')} type="tel" value={f.mobile} onChange={set('mobile')} placeholder="98765 43210" autoComplete="tel" /><Err k="mobile" /></div>
                    </div>
                    <div className="lds-f"><label htmlFor="em">Email for the scan copy</label>
                      <input id="em" className={inCls('email')} type="email" value={f.email} onChange={set('email')} autoComplete="email" /><Err k="email" /></div>
                  </>
                )}

                <div className="lds-actions">
                  {step > 1 && <button type="button" className="lds-btn plain" onClick={() => goTo(step - 1)}>Back</button>}
                  {step < 3
                    ? <button type="button" className="lds-btn primary" onClick={next}>Continue</button>
                    : <button type="button" className="lds-btn primary" onClick={pay} disabled={paying} aria-busy={paying}>
                        {paying ? 'Opening payment…' : `Pay ${inr(total)}`}
                      </button>}
                </div>
                {payErr && <div className="lds-alert" role="alert">{payErr}</div>}
              </>
            )}
          </section>

          {/* Live certificate + price */}
          <aside className="lds-aside" aria-label="Your e-Stamp">
            <StampCertificate stateName={st.name} firstParty={f.firstParty} secondParty={f.secondParty} payer={f.payer}
              docType={docLabel} purpose={f.purpose} duty={validDuty ? duty : null} />
            <div className="lds-price">
              <h3>Price</h3>
              <dl>
                <dt>Stamp duty</dt><dd>{validDuty ? inr(duty) : '—'}</dd>
                {ESTAMP_FEES.service > 0 && <><dt>Service fee</dt><dd>{inr(ESTAMP_FEES.service)}</dd></>}
                {courier > 0 && <><dt>Courier to your door <small className="lds-incl">incl. GST</small></dt><dd>{inr(courier)}</dd></>}
                {gst > 0 && <><dt>GST on service fee (18%)</dt><dd>{inr(gst)}</dd></>}
                <dt className="total">Total</dt><dd className="total">{validDuty ? inr(total) : '—'}</dd>
              </dl>
              <p>Stamp duty goes to the government at actual. The final amount is confirmed when you pay.</p>
            </div>
            <div className="lds-help-card">
              Need it today, or have a question? <a href={`https://wa.me/${LD_WA}?text=${encodeURIComponent(`Hi, I have a question about ${st.name} e-Stamp paper.`)}`} target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a>.
            </div>
          </aside>
        </div>
      </div>

      {/* Login side panel — only when the customer tries to pay */}
      {askLogin && !canPay && (
        <>
          <div className="lds-scrim" onClick={() => setAskLogin(false)} aria-hidden="true" />
          <div className="lds-panel" role="dialog" aria-modal="true" aria-labelledby="lds-login-h">
            <button type="button" className="close" onClick={() => setAskLogin(false)} aria-label="Close">×</button>
            <img src={logoImg} alt="LauncherDesk" />
            <h2 id="lds-login-h">{sessionExpired ? 'Please log in again' : 'Log in to pay'}</h2>
            <p>{sessionExpired
              ? 'Your login on this device has expired. Log in again to pay — everything you entered is still here.'
              : 'Your order and invoice are saved to your LauncherDesk account so you can track it. It takes a few seconds.'}</p>
            <button type="button" className="lds-btn primary" style={{ marginLeft: 0 }} onClick={() => goLogin('login')} autoFocus>Log in</button>
            <button type="button" className="lds-btn ghost" onClick={() => goLogin('register')}>Create an account</button>
            <div className="lds-saved">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
              Your {st.name} e-Stamp details are saved. You'll come straight back here.
            </div>
          </div>
        </>
      )}
    </>
  )
}
