/**
 * A drawn (HTML/CSS) e-Stamp certificate used as a live preview.
 * It fills in as the customer types. Clearly marked "Preview" — the real
 * certificate is issued through the official e-stamping system after payment.
 */

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
  'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
const two = n => (n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? ` ${ONES[n % 10]}` : ''}`)
const three = n => (n >= 100 ? `${ONES[Math.floor(n / 100)]} Hundred${n % 100 ? ` ${two(n % 100)}` : ''}` : two(n))

/** Indian-style amount in words: 125000 → "One Lakh Twenty Five Thousand" */
export function rupeesInWords(n) {
  n = Math.floor(Number(n) || 0)
  if (n <= 0) return ''
  const parts = []
  const crore = Math.floor(n / 1e7); n %= 1e7
  const lakh = Math.floor(n / 1e5); n %= 1e5
  const thousand = Math.floor(n / 1000); n %= 1000
  if (crore) parts.push(`${three(crore)} Crore`)
  if (lakh) parts.push(`${two(lakh)} Lakh`)
  if (thousand) parts.push(`${two(thousand)} Thousand`)
  if (n) parts.push(three(n))
  return parts.join(' ')
}

export const CERT_CSS = `
.ldc { position:relative; background:#FFFDF6; border-radius:6px; padding:12px; color:#23324A;
  font-family:Georgia,'Times New Roman',serif; box-shadow:0 1px 0 rgba(255,255,255,.6) inset, 0 24px 50px -20px rgba(11,31,72,.45); }
.ldc-frame { position:relative; border-radius:3px; padding:18px 20px 16px;
  background:
    repeating-radial-gradient(circle at 0 0, rgba(29,93,184,.07) 0 1px, transparent 1px 7px),
    repeating-radial-gradient(circle at 100% 100%, rgba(5,150,105,.07) 0 1px, transparent 1px 7px),
    #FFFDF6;
  border:6px solid transparent;
  border-image: repeating-linear-gradient(45deg, #9FB7DA 0 4px, #FFFDF6 4px 7px, #A7D3C3 7px 11px, #FFFDF6 11px 14px) 6; }
.ldc-top { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:6px; }
.ldc-emblem { width:34px; height:34px; border-radius:50%; border:1.5px solid #9FB7DA; display:grid; place-items:center; flex:none; }
.ldc-emblem svg { width:18px; height:18px; stroke:#1D5DB8; }
.ldc-title { flex:1; text-align:center; }
.ldc-title strong { display:block; font-size:13px; letter-spacing:.18em; }
.ldc-title span { display:block; font-size:12.5px; font-weight:700; margin-top:3px; text-decoration:underline; text-underline-offset:3px; }
.ldc-title em { display:block; font-style:normal; font-size:11px; margin-top:2px; color:#4B5B75; }
.ldc-duty { flex:none; min-width:58px; text-align:center; border-radius:4px; padding:4px 6px 5px; color:#fff;
  background:linear-gradient(180deg,#1E4080,#1D5DB8); font-family:'Manrope',system-ui,sans-serif; }
.ldc-duty small { display:block; font-size:8.5px; opacity:.8; }
.ldc-duty b { font-size:15px; font-weight:800; }
.ldc-rows { display:grid; grid-template-columns:auto 1fr; gap:5px 10px; font-size:11.5px; line-height:1.35; margin-top:8px; }
.ldc-rows dt { color:#4B5B75; white-space:nowrap; }
.ldc-rows dd { margin:0; font-weight:700; color:#23324A; min-width:0; overflow-wrap:anywhere; }
.ldc-rows dd.empty { font-weight:400; color:#9AA6B8; font-style:italic; }
.ldc-foot { display:flex; align-items:center; gap:10px; margin-top:12px; padding-top:10px; border-top:1px dashed #C5D1E3; }
.ldc-qr { width:38px; height:38px; flex:none; border-radius:3px;
  background:conic-gradient(#23324A 0 25%, #FFFDF6 0 50%, #23324A 0 75%, #FFFDF6 0) 0 0/9.5px 9.5px; opacity:.75; }
.ldc-foot p { margin:0; font-size:10px; color:#4B5B75; line-height:1.4; }
.ldc-mark { position:absolute; inset:0; display:grid; place-items:center; pointer-events:none; overflow:hidden; border-radius:6px; }
.ldc-mark span { transform:rotate(-24deg); font-family:'Manrope',system-ui,sans-serif; font-weight:900; font-size:46px; letter-spacing:.2em;
  color:rgba(29,93,184,.07); }
.ldc-fresh { animation:ldcFresh .5s ease; }
@keyframes ldcFresh { from { background:rgba(29,93,184,.14); } to { background:transparent; } }
@media (prefers-reduced-motion: reduce) { .ldc-fresh { animation:none; } }
`

const Row = ({ label, value, placeholder }) => (
  <>
    <dt>{label}</dt>
    <dd className={value ? '' : 'empty'}>{value || placeholder}</dd>
  </>
)

export default function StampCertificate({ stateName, firstParty, secondParty, payer, docType, purpose, duty, compact = false }) {
  const amount = Number(duty) > 0 ? Number(duty) : null
  return (
    <figure className="ldc" style={{ margin: 0 }} aria-label="Preview of your e-Stamp certificate">
      <div className="ldc-frame">
        <div className="ldc-top">
          <span className="ldc-emblem" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></svg>
          </span>
          <div className="ldc-title">
            <strong>INDIA NON JUDICIAL</strong>
            <span key={stateName || 'none'} className="ldc-fresh">{stateName ? `Government of ${stateName}` : 'Government of your state'}</span>
            <em>e-Stamp</em>
          </div>
          <span className="ldc-duty"><small>Stamp duty</small><b>{amount ? `₹${amount.toLocaleString('en-IN')}` : '₹ —'}</b></span>
        </div>
        <dl className="ldc-rows">
          <Row label="Certificate no." value="" placeholder="Issued after payment" />
          {!compact && <Row label="Description" value={docType} placeholder="Document type" />}
          <Row label="Purpose" value={purpose} placeholder="What it’s for" />
          <Row label="First party" value={firstParty} placeholder="Name" />
          <Row label="Second party" value={secondParty} placeholder="Name or NIL" />
          {!compact && <Row label="Duty paid by" value={payer} placeholder="First / second party" />}
          <Row label="Amount (₹)" value={amount ? `${amount.toLocaleString('en-IN')} (${rupeesInWords(amount)} only)` : ''} placeholder="Choose a value" />
        </dl>
        <div className="ldc-foot">
          <span className="ldc-qr" aria-hidden="true" />
          <p>Every certificate carries a unique number and can be verified online after it is issued.</p>
        </div>
      </div>
      <div className="ldc-mark" aria-hidden="true"><span>PREVIEW</span></div>
    </figure>
  )
}