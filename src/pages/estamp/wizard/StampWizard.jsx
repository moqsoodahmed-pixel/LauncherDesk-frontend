import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SEO from '../../../components/SEO'
import { useUserAuth } from '../../../context/UserAuthContext'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { usePortalAuth } from '../../../context/PortalAuthContext'
import apiClient, { getAccessToken } from '../../../services/portal/apiClient'
import { loadRazorpayScript, armOpenWatchdog } from '../../../lib/razorpay'
import StampCertificate, { CERT_CSS } from '../StampCertificate'
import { stateBySlug, DENOMINATIONS, MAX_DUTY, ESTAMP_FEES, getConvenienceFee, GST_RATE, LD_WA } from '../../../data/estamp'
import { articlesFor, keyOf, dutyFromRule } from '../../../data/estampArticles'
import { EStepRail } from '../estampKit'
import '../estampKit.css'
import StateDetailsStep from './StateDetailsStep'
import DocumentDetailsStep from './DocumentDetailsStep'
import PartyDetailsStep from './PartyDetailsStep'
import StampAmountStep from './StampAmountStep'
import ReviewPayStep from './ReviewPayStep'
import PriceSummary from './PriceSummary'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const CSS = `
.lds { background:var(--sec-b, #F8FAFC); min-height:80vh; padding-bottom:80px; }
/* Matches the navbar's pill (.site-header, width:min(1360px, 100% - 40px)) nested with .header-in's own
   padding (src/assets/launcherdesk.css), so page content's left edge lines up with the logo. */
.lds-wrap { max-width:1480px; margin:0 auto; padding:0 36px; box-sizing:border-box; }
@media (min-width:1025px) { .lds-wrap { max-width:1460px; width:calc(100% - 40px); } }
@media (max-width:1280px) { .lds-wrap { padding:0 20px; } }
@media (max-width:768px) { .lds-wrap { padding:0 14px; } }
.lds-head { background:#fff; border-bottom:1px solid var(--line); padding:22px 0 24px; margin-bottom:22px; }
.lds-crumb { font-size:13.5px; color:var(--text-3); margin-bottom:10px; }
.lds-crumb a { color:var(--text-3); text-decoration:none; } .lds-crumb a:hover { color:var(--blue); }
.lds-head-row { display:flex; justify-content:space-between; align-items:flex-end; gap:16px; flex-wrap:wrap; }
.lds-head h1 { margin:0; font-size:clamp(26px,3.4vw,38px); letter-spacing:-.03em; color:var(--navy); font-weight:800; }
.lds-script { margin-top:4px; font-size:18px; color:var(--text-2); font-weight:600; }
.lds-change { font-size:14.5px; font-weight:700; color:var(--blue); text-decoration:none; border:1.5px solid var(--brand-100);
  border-radius:10px; padding:9px 14px; background:var(--brand-50); }

.lds-restore { display:flex; gap:10px; align-items:center; background:#EFF6FF; border:1px solid #DBEAFE; color:#1E40AF;
  border-radius:12px; padding:10px 16px; font-size:14px; margin-bottom:20px; font-weight:500; }

.lds-grid { display:grid; grid-template-columns:minmax(0,1fr) 380px; gap:28px; align-items:start; }

/* Form */
.lds-form { background:#fff; border:1px solid var(--line); border-radius:18px; padding:clamp(20px,3vw,32px); }
.lds-form h2 { margin:0 0 4px; font-size:22px; color:var(--navy); letter-spacing:-.02em; }
.lds-form .lead { margin:0 0 24px; color:var(--text-2); font-size:15px; line-height:1.55; }
.lds-section-h { font-size:17px; color:var(--navy); margin:28px 0 16px; padding-top:20px; border-top:1px solid var(--line); }
.lds-f { margin-bottom:20px; }
.lds-f > label, .lds-f > .lbl { display:block; font-size:14.5px; font-weight:700; color:var(--navy); margin-bottom:8px; }
.lds-f .lds-optional { font-weight:500; color:var(--text-3); }
.lds-in { width:100%; height:50px; box-sizing:border-box; border:1.5px solid var(--line-strong); border-radius:11px; padding:0 14px;
  font-size:15.5px; font-family:inherit; background:#fff; color:var(--navy); outline:none; transition:border-color .15s, box-shadow .15s; }
textarea.lds-in { height:auto; min-height:88px; padding:12px 14px; resize:vertical; line-height:1.5; }
select.lds-in { appearance:none; -webkit-appearance:none; cursor:pointer; padding-right:40px;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:right 14px center; background-size:18px; }
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
  background:linear-gradient(180deg,#fff,var(--brand-50)); margin-bottom:20px; }
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
.lds-btn.outline { background:#fff; color:var(--blue); border:1.5px solid var(--brand-100); }
.lds-btn:focus-visible { outline:3px solid var(--brand-200); outline-offset:2px; }
.lds-note { display:flex; gap:10px; align-items:flex-start; background:var(--warn-bg, #FFFBEB); border:1px solid #FDE68A; color:#92400E;
  border-radius:12px; padding:12px 14px; font-size:14px; line-height:1.5; margin-bottom:20px; }
.lds-alert { margin-top:14px; padding:12px 14px; border-radius:10px; font-size:14px; background:var(--error-bg); border:1px solid #FECACA; color:#991B1B; }

/* Review */
.lds-review { border:1.5px solid var(--line-strong); border-radius:14px; padding:16px 18px; margin-bottom:24px; }
.lds-review-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
.lds-review-head h3 { margin:0; font-size:15.5px; color:var(--navy); }
.lds-review-dl { margin:0; display:grid; grid-template-columns:1fr auto; gap:8px 14px; font-size:14.5px; }
.lds-review-dl dt { color:var(--text-3); } .lds-review-dl dd { margin:0; text-align:right; font-weight:700; color:var(--navy); }

/* Step indicator & metadata matching reference clone */
.lds-step-tag { font-size:12px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; color:var(--text-3, #64748B); margin-bottom:8px; }
.lds-state-check { font-size:12.5px; color:var(--text-3, #64748B); margin:-14px 0 20px; }

/* Article picker - clean clone of reference image */
.lda { position:relative; font-variant-ligatures:none; }
.lda-btn { width:100%; height:46px; min-height:46px; box-sizing:border-box; display:flex; align-items:center; justify-content:space-between; gap:12px; text-align:left; cursor:pointer;
  border:1.5px solid #D1D5DB; border-radius:8px; background:#fff; padding:0 14px; font-family:inherit; transition:border-color .15s, box-shadow .15s; }
.lda-btn.bad { border-color:var(--error); }
.lda-btn:focus-visible, .lda-btn[aria-expanded="true"] { border-color:#16A34A; box-shadow:0 0 0 3px rgba(22,163,74,.15); outline:none; }
.lda-btn .t { flex:1; min-width:0; font-size:14px; font-weight:500; color:#111827; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-variant-ligatures:none; }
.lda-btn .t.ph { color:#111827; font-weight:400; }
.lda-btn svg { width:16px; height:16px; stroke:#374151; stroke-width:2.2; flex:none; transition:transform .15s; }
.lda-btn[aria-expanded="true"] svg { transform:rotate(180deg); }

.lda-pop { position:absolute; left:0; right:0; top:calc(100% + 4px); z-index:50; background:#fff; border-radius:8px; overflow:hidden;
  border:1px solid #D1D5DB; box-shadow:0 12px 30px -6px rgba(0,0,0,.15), 0 4px 6px -2px rgba(0,0,0,.05); }
.lda-search { position:relative; border-bottom:1px solid #E5E7EB; background:#F9FAFB; }
.lda-search svg { position:absolute; left:12px; top:50%; transform:translateY(-50%); width:15px; height:15px; stroke:#9CA3AF; }
.lda-search input { width:100%; height:38px; border:0; outline:none; padding:0 12px 0 36px; font-size:13.5px; font-family:inherit; color:#111827; background:transparent; box-sizing:border-box; }
.lda-search input::placeholder { color:#9CA3AF; }

.lda-list { list-style:none; margin:0; padding:0; max-height:min(320px,50vh); overflow-y:auto; overscroll-behavior:contain; }
.lda-opt { display:block; width:100%; text-align:left; border:0; background:none; padding:7.5px 14px; cursor:pointer; font-family:inherit;
  font-size:13.5px; line-height:1.45; color:#111827; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-variant-ligatures:none; transition:background .1s; }
.lda-opt:hover, .lda-opt:focus { background:#F1F5F9; color:#111827; outline:none; }
.lda-opt[aria-selected="true"], .lda-opt.active { background:#1D5DB8; color:#fff; font-weight:500; }
.lda-opt-default { font-weight:500; }
.lda-opt-default[aria-selected="true"], .lda-opt-default.active { background:#1D5DB8; color:#fff; }
.lda-empty { padding:14px; color:#6B7280; font-size:13.5px; text-align:center; }
.lda-src { padding:6px 14px; font-size:11px; color:#6B7280; background:#F9FAFB; border-top:1px solid #E5E7EB; }
.lds-rule { display:flex; gap:10px; align-items:flex-start; background:var(--brand-50); border:1px solid var(--brand-100); border-radius:12px;
  padding:12px 14px; font-size:14px; color:var(--navy); line-height:1.5; margin-top:10px; }
.lds-rule b { font-weight:800; }
.lds-duty-fixed { display:flex; align-items:baseline; gap:10px; border:1.5px solid var(--blue); background:var(--brand-50); border-radius:12px; padding:12px 16px; }
.lds-duty-fixed b { font-size:22px; color:var(--blue-dark); }
.lds-duty-fixed span { font-size:13.5px; color:var(--text-2); }

.lds-extra { display:inline-block; margin-left:8px; padding:1px 8px; border-radius:99px; background:var(--brand-100); color:var(--blue-dark);
  font-size:13px; font-weight:800; vertical-align:1px; }
.lds-incl { display:block; font-size:11.5px; color:var(--text-3); }

/* Aside */
.lds-aside { position:sticky; top:100px; display:grid; grid-template-columns:minmax(0,1fr); gap:16px; min-width:0; }
.lds-price { background:#fff; border:1px solid var(--line); border-radius:16px; padding:18px 18px 16px; }
.lds-price h3 { margin:0 0 6px; font-size:16px; font-weight:800; color:var(--navy); }
.lds-price-doc { font-size:12.5px; color:#64748B; margin:0 0 14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.lds-price dl { margin:0; display:grid; grid-template-columns:1fr auto; gap:10px 12px; font-size:14.5px; align-items:center; }
.lds-price dt { color:var(--text-2); } .lds-price dd { margin:0; text-align:right; font-weight:700; color:var(--navy); }
.lds-price-badge-actuals { display:inline-block; background:#FEF3C7; color:#92400E; font-size:12px; font-weight:700; padding:2px 10px; border-radius:9999px; line-height:1.4; }
.lds-price .total { border-top:2px solid var(--navy); padding-top:12px; margin-top:4px; font-size:18px; font-weight:800; color:var(--navy); }
.lds-price p { margin:12px 0 0; font-size:12px; color:var(--text-3); line-height:1.5; }
.lds-docs { background:#fff; border:1px solid var(--line); border-radius:16px; padding:16px 18px; }
.lds-docs h4 { margin:0 0 6px; font-size:13px; color:var(--navy); }
.lds-docs p { margin:0; font-size:13.5px; color:var(--text-2); }
.lds-docs p span { color:var(--text-3); font-size:12.5px; }
.lds-help-card { border-radius:16px; padding:16px 18px; background:var(--navy); color:#fff; font-size:14px; line-height:1.55; }
.lds-help-card a { color:#fff; font-weight:800; }

/* Done */
.lds-done { text-align:center; padding:12px 0; }
.lds-done .tick { width:68px; height:68px; margin:0 auto 16px; border-radius:50%; background:var(--success-bg); display:grid; place-items:center; }
.lds-done h2 { font-size:26px; }
.lds-done p { color:var(--text-2); line-height:1.65; max-width:52ch; margin:0 auto 22px; }

@media (max-width:860px) { .lds-grid { grid-template-columns:1fr; } .lds-aside { position:static; } }
@media (max-width:520px) { .lds-two, .lds-seg { grid-template-columns:1fr; }
  .lds-actions { flex-direction:column-reverse; } .lds-btn.primary { width:100%; } }
`

const DRAFT_KEY = slug => `ld_estamp_draft_${slug}`
const EMPTY = {
  firstParty: '', secondParty: '', payer: '',
  article: '', baseAmount: '', purpose: '', consideration: '', duty: '', customDuty: '', print: false,
  delivery: 'email', name: '', mobile: '', email: '', contactState: '', contactCity: '',
  businessName: '', agentReferralCode: '', specialInstructions: '',
  address: '', city: '', pincode: '',
}
const STEPS = [
  { t: 'State Details' },
  { t: 'Document Details' },
  { t: 'Party Details' },
  { t: 'Stamp Amount' },
  { t: 'Review & Pay' },
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

export default function StampWizard() {
  const { state: slug } = useParams()
  const st = stateBySlug(slug)
  const [params] = useSearchParams()
  // The site now has two login systems: the original one (useUserAuth/useAdminAuth)
  // and the newer "Portal" unified login (usePortalAuth) that the main /user/login
  // page signs people into today. A customer may be signed in through either —
  // Portal takes priority when both are present, matching the navbar's own logic.
  const { isLoggedIn, token, user } = useUserAuth()
  const adminAuth = useAdminAuth()
  const { user: portalUser } = usePortalAuth()
  const usingPortal = !!portalUser
  const navigate = useNavigate()
  const location = useLocation()
  const formRef = useRef(null)

  const [restored, setRestored] = useState(false)
  const [f, setF] = useState(() => {
    const d = loadDraft(slug)
    if (d) setTimeout(() => setRestored(true), 0)
    return { ...EMPTY, ...(d || {}), print: params.get('print') === '1' ? true : !!(d && d.print) }
  })
  const savedStep = (() => { try { return Number(sessionStorage.getItem(`${DRAFT_KEY(slug)}_step`)) || 1 } catch { return 1 } })()
  const [step, setStep] = useState(savedStep)
  const [maxStep, setMaxStep] = useState(savedStep)
  const [errs, setErrs] = useState({})
  const [paying, setPaying] = useState(false)
  const [payErr, setPayErr] = useState('')
  const [payStage, setPayStage] = useState('')
  const payStageRef = useRef('')
  useEffect(() => { payStageRef.current = payStage }, [payStage])
  const [done, setDone] = useState(null)

  // Load Razorpay's script as soon as the page opens, so by the time the customer
  // taps Pay it is already there and checkout opens right after the tap (mobile
  // browsers can refuse to open the payment window if too much time has passed).
  useEffect(() => { loadRazorpayScript().catch(() => { /* retried on Pay */ }) }, [])

  // Phones pay on Razorpay's full-page checkout (see pay()); Razorpay sends the customer
  // back here with ?paid=<order no> or ?payfail=<reason>.
  useEffect(() => {
    const paid = params.get('paid'), fail = params.get('payfail')
    if (!paid && !fail) return
    if (paid) {
      try { localStorage.removeItem(DRAFT_KEY(slug)) } catch { /* ignore */ }
      setDone({ orderNumber: paid === 'ok' ? '' : paid, ldOrderId: params.get('oid') || '' })
    } else setPayErr(fail)
    navigate(location.pathname, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // keep a draft so nothing is lost while the customer logs in
  useEffect(() => { try { localStorage.setItem(DRAFT_KEY(slug), JSON.stringify(f)) } catch { /* storage unavailable */ } }, [f, slug])
  useEffect(() => { try { sessionStorage.setItem(`${DRAFT_KEY(slug)}_step`, String(maxStep)) } catch { /* ignore */ } }, [maxStep, slug])
  useEffect(() => {
    const activeUser = portalUser || user
    if (!activeUser) return
    setF(v => ({
      ...v,
      name: v.name || activeUser.name || '', email: v.email || activeUser.email || '', mobile: v.mobile || activeUser.phone || activeUser.mobile || '',
    }))
  }, [user, portalUser])

  const { verified, items: articles } = useMemo(() => (st ? articlesFor(slug) : { verified: false, items: [] }), [slug, st])
  const article = articles.find(a => keyOf(a) === f.article) || null
  const rule = article?.rule && article.rule.type !== 'text' ? article.rule : null
  const baseField = rule?.base === 'Consideration amount' ? 'consideration' : 'baseAmount'
  const ruled = rule ? dutyFromRule(rule, f[baseField]) : null      // { duty } | { error } | null
  const manualDuty = f.duty === 'custom' ? Number(f.customDuty) : Number(f.duty)
  const duty = rule ? (ruled?.duty ?? NaN) : manualDuty
  const docLabel = article ? `${article.code ? `Article ${article.code} ` : ''}${article.label}` : ''
  const docTitle = article ? (article.code ? `${article.code} - ${article.label}` : article.label) : ''
  const validDuty = Number.isInteger(duty) && duty >= 1 && duty <= MAX_DUTY
  const courier = f.delivery === 'courier' ? ESTAMP_FEES.courier : 0
  const convenience = validDuty ? getConvenienceFee(duty) : 0
  const fees = convenience + ESTAMP_FEES.procurement + courier
  const gst = Math.round(fees * GST_RATE * 100) / 100
  const total = useMemo(() => Math.round(((validDuty ? duty : 0) + fees + gst) * 100) / 100, [validDuty, duty, fees, gst])

  // A restored draft's saved step number can be stale (e.g. the browser closed mid-step,
  // or an older draft shape). Never trust it blindly — clamp to how far the saved data
  // actually goes, so the step rail can't show a later step as "done" while an earlier
  // one (like the document type) is still genuinely empty.
  useEffect(() => {
    if (!st) return
    const step2Done = !!article && !!f.purpose.trim()
    const step3Done = !!f.firstParty.trim() && !!f.secondParty.trim() && !!f.payer
    const step4Done = validDuty
    let furthestComplete = 1
    if (step2Done) furthestComplete = 2
    if (step2Done && step3Done) furthestComplete = 3
    if (step2Done && step3Done && step4Done) furthestComplete = 4
    const allowedMax = Math.min(furthestComplete + 1, 5)
    setMaxStep(m => Math.min(m, allowedMax))
    setStep(s => Math.min(s, allowedMax))
    // Only re-check when the state changes — normal step navigation already
    // advances maxStep itself via next()/validate().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  if (!st) return <Navigate to="/estamp" replace />

  const set = k => e => {
    setF(v => ({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
    // an edited field shouldn't keep showing its old error
    setErrs(x => (x[k] || ((k === 'baseAmount' || k === 'consideration') && x.base) || (k === 'customDuty' && x.duty))
      ? { ...x, [k]: undefined, ...(k === 'baseAmount' || k === 'consideration' ? { base: undefined } : {}), ...(k === 'customDuty' ? { duty: undefined } : {}) } : x)
  }

  function validate(s) {
    const e = {}
    if (s === 2) {
      if (!article) e.docType = 'Choose the document type.'
      if (!f.purpose.trim()) e.purpose = 'Describe what the stamp is for.'
      if (rule && rule.type !== 'fixed') {
        if (ruled?.error) e.base = ruled.error
      }
      if (f.consideration && !(Number(f.consideration) >= 0)) e.consideration = 'Enter the amount in rupees, numbers only.'
    }
    if (s === 3) {
      if (!f.firstParty.trim()) e.firstParty = "Enter the first party's name."
      if (!f.secondParty.trim()) e.secondParty = "Enter the second party's name, or NIL if there isn't one."
      if (!f.payer) e.payer = 'Choose who pays the stamp duty.'
    }
    if (s === 4) {
      if (rule) {
        if (ruled?.error) e.base = ruled.error
        else if (!validDuty) e.base = `The duty works out above ₹${MAX_DUTY.toLocaleString('en-IN')}. Message us and we'll arrange it for you.`
      } else if (!f.duty) e.duty = 'Choose a stamp duty value.'
      else if (!validDuty) e.duty = `Enter a whole amount from ₹1 to ₹${MAX_DUTY.toLocaleString('en-IN')}.`
    }
    if (s === 5) {
      if (!f.name.trim()) e.name = 'Enter your name.'
      if (!/^\+?[0-9\s-]{10,14}$/.test(f.mobile.trim())) e.mobile = 'Enter a 10-digit mobile number.'
      if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
      if (!f.contactState.trim()) e.contactState = 'Enter your state/region.'
      if (!f.contactCity.trim()) e.contactCity = 'Enter your city.'
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
    if (!validate(5)) return
    setPaying(true); setPayErr(''); setPayStage('1/4 Creating your order…')
    const payload = {
      state: st.slug, stateName: st.name,
      firstParty: f.firstParty.trim(), secondParty: f.secondParty.trim(), payer: f.payer,
      documentType: article ? article.label : '',
      articleCode: article?.code || '',
      purpose: f.purpose.trim(), consideration: f.consideration,
      stampDuty: duty, printDocument: !!f.print, delivery: f.delivery,
      name: f.name.trim(), email: f.email.trim(), mobile: f.mobile.trim(),
      contactState: f.contactState.trim(), contactCity: f.contactCity.trim(),
      businessName: f.businessName.trim(), agentReferralCode: f.agentReferralCode.trim(), specialInstructions: f.specialInstructions.trim(),
      ...(f.delivery === 'courier' ? { address: f.address.trim(), city: f.city.trim(), pincode: f.pincode.trim() } : {}),
    }
    try {
      let data
      const getActiveToken = () => {
        try {
          return (
            (typeof getAccessToken === 'function' ? getAccessToken() : null) ||
            localStorage.getItem('portal_access_token') ||
            token ||
            localStorage.getItem('ld_user_token') ||
            adminAuth?.token ||
            localStorage.getItem('ld_admin_token') ||
            null
          )
        } catch {
          return null
        }
      }

      const activeToken = getActiveToken()

      const tryCreateOrder = async (useAuth = true) => {
        const headers = { 'Content-Type': 'application/json' }
        if (useAuth && activeToken) {
          headers.Authorization = `Bearer ${activeToken}`
        }
        const res = await fetch(`${API_BASE}/payments/checkout/estamp/create-order`, {
          signal: AbortSignal.timeout ? AbortSignal.timeout(25000) : undefined,
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        })
        const d = await res.json().catch(() => ({}))
        if (!res.ok) {
          const err = new Error((d.fields && Object.values(d.fields)[0]) || d.message || "We couldn't create your order. Check the details and try again.")
          err.response = { status: res.status, data: d }
          throw err
        }
        return d
      }

      try {
        data = await tryCreateOrder(!!activeToken)
      } catch (orderErr) {
        if (orderErr?.response?.status === 401 && activeToken) {
          setPayStage('1/4 Connecting to checkout…')
          data = await tryCreateOrder(false)
        } else {
          throw orderErr
        }
      }

      setPayStage('2/4 Order created. Loading secure checkout…')
      if (!data.keyId) {
        setPayErr('Payment could not be started (missing payment configuration). Please contact support@launcherdesk.com. No amount has been charged.')
        return
      }

      await loadRazorpayScript()
      setPayStage('3/4 Opening checkout…')

      // On mobile, body scroll-lock from our own UI can trap Razorpay's
      // iframe. Release it before opening, restore it on close.
      const bodyOverflow = document.body.style.overflow
      document.body.style.overflow = ''

      const isPhone = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.matchMedia('(pointer: coarse)').matches
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
        let stopWatch = () => { }
        const rzpOptions = {
          key: data.keyId, amount: data.amount, currency: data.currency, order_id: data.orderId,
          name: 'LauncherDesk', description: `e-Stamp paper, ${st.name}`, image: new URL('/apple-touch-icon.png', window.location.origin).href,
          prefill: { name: f.name, email: f.email, contact: f.mobile }, theme: { color: '#1D5DB8' },
          // Phones: the pop-up can fail to show, so go to Razorpay's own full page instead and
          // come back through our callback (handler/ondismiss are not used in this mode).
          ...(isPhone ? { redirect: true, callback_url: `${API_BASE.replace(/\/+$/, '')}/payments/checkout/estamp/callback?state=${encodeURIComponent(st.slug)}` } : {}),
          modal: {
            ondismiss: () => { stopWatch(); finish() },
            // Prevent accidental close on mobile back-gesture
            confirm_close: true,
            animation: true,
            // Escape key also closes
            escape: true,
          },
          handler: async response => {
            stopWatch()
            try {
              let v
              const verifyHeaders = {
                'Content-Type': 'application/json',
                ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {})
              }
              const vr = await fetch(`${API_BASE}/payments/checkout/verify`, {
                method: 'POST',
                headers: verifyHeaders,
                body: JSON.stringify(response),
              }).catch(() => null)
              v = vr ? await vr.json().catch(() => ({})) : null
              if (!v?.success) {
                if (usingPortal) {
                  const pvr = await apiClient.post('/payments/verify', response, { baseURL: API_BASE }).catch(() => null)
                  if (pvr?.data?.success) v = pvr.data
                } else {
                  v = await fetch(`${API_BASE}/payments/verify`, {
                    method: 'POST',
                    headers: verifyHeaders,
                    body: JSON.stringify(response),
                  }).then(r => r.json()).catch(() => ({}))
                }
              }
              if (v?.success) {
                try { localStorage.removeItem(DRAFT_KEY(slug)) } catch { /* ignore */ }
                setDone({ orderNumber: v.orderNumber || data.orderNumber, ldOrderId: v.ldOrderId || data.ldOrderId })
              } else setPayErr(v?.message || "Payment received. We're confirming it and will email you shortly.")
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
          stopWatch()
          setPayErr(r?.error?.description || "The payment didn't go through. No money was taken; you can try again.")
          finish()
        })

        try {
          rzp.open()
          stopWatch = armOpenWatchdog(() => {
            if (!settled) {
              setPayErr('The payment window didn’t open. Please check your connection and try again. No amount has been charged.')
              finish()
            }
          }, isPhone ? 30000 : 15000)
        } catch (openErr) {
          setPayErr(openErr?.message || 'Could not open the payment window. Please try again.')
          finish()
        }
      })
    } catch (err) {
      const timedOut = err?.code === 'ECONNABORTED' || err?.name === 'TimeoutError' || err?.name === 'AbortError'
      const base = timedOut
        ? "We couldn't reach our server from this device (timed out). Check your internet or try mobile data / another Wi-Fi."
        : (err?.response?.data?.message || err.message || 'Something went wrong. Please try again.')
      setPayErr(`${base} [stopped at: ${payStageRef.current || 'start'}]`)
    } finally {
      setPaying(false); setPayStage('')
    }
  }

  const Err = ({ k }) => (errs[k] ? <div className="lds-err" role="alert">{errs[k]}</div> : null)
  const inCls = k => `lds-in${errs[k] ? ' bad' : ''}`

  return (
    <>
      <SEO title={`${st.name} e-Stamp Paper: Order Online`} description={`Order non-judicial e-Stamp paper for ${st.name} online. Fill in the details, pay securely and get the scan copy by email, with doorstep delivery available.`} canonical={`/estamp/${st.slug}`} />
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

        <div className="lds-wrap">
          {!done && <EStepRail steps={STEPS} step={step} maxStep={maxStep} done={!!done} onGoTo={n => n <= maxStep && goTo(n)} />}
          {restored && !done && (
            <div className="lds-restore" role="status">Welcome back — we restored your in-progress application.</div>
          )}

          <div className="lds-grid">
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
                  {step === 1 && <StateDetailsStep st={st} verified={verified} />}
                  {step === 2 && (
                    <DocumentDetailsStep f={f} setF={setF} set={set} errs={errs} setErrs={setErrs} inCls={inCls} Err={Err}
                      st={st} verified={verified} articles={articles} article={article} rule={rule} baseField={baseField} />
                  )}
                  {step === 3 && <PartyDetailsStep f={f} set={set} errs={errs} inCls={inCls} Err={Err} />}
                  {step === 4 && (
                    <StampAmountStep f={f} setF={setF} set={set} errs={errs} inCls={inCls} Err={Err} st={st} rule={rule} duty={duty} validDuty={validDuty} baseField={baseField} article={article} />
                  )}
                  {step === 5 && (
                    <ReviewPayStep f={f} set={set} errs={errs} inCls={inCls} Err={Err} st={st} docLabel={docLabel} duty={duty} validDuty={validDuty}
                      total={total} onEdit={goTo} pay={pay} paying={paying} payErr={payErr} payStage={payStage} />
                  )}

                  {step < 5 && (
                    <div className="lds-actions">
                      {step > 1 && <button type="button" className="lds-btn plain" onClick={() => goTo(step - 1)}>Back</button>}
                      <button type="button" className="lds-btn primary" onClick={next}>Continue</button>
                    </div>
                  )}
                </>
              )}
            </section>

            {/* Live certificate + price */}
            <aside className="lds-aside" aria-label="Your e-Stamp">
              <StampCertificate stateName={st.name} firstParty={f.firstParty} secondParty={f.secondParty} payer={f.payer}
                docType={docLabel} purpose={f.purpose} duty={validDuty ? duty : null} />
              <PriceSummary stateName={st.name} docType={docTitle || docLabel} validDuty={validDuty} duty={duty} convenience={convenience} courier={courier} fees={fees} gst={gst} total={total} />
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
