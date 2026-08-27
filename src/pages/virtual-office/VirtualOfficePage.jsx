import { useState } from 'react'

const S = `
/* ── HERO ── */
.vo-hero {
  background: linear-gradient(160deg,#1A2F4E 0%,#1E3A6A 55%,#264D8C 100%);
  padding: clamp(64px,8vw,100px) 0 clamp(52px,6vw,80px);
  position: relative; overflow: hidden;
}
.vo-hero::before {
  content:'';position:absolute;inset:0;pointer-events:none;
  background: radial-gradient(800px 600px at 70% -10%,rgba(59,143,239,.2),transparent 60%),
              radial-gradient(400px 400px at 5% 100%,rgba(15,82,192,.18),transparent 60%);
}
.vo-hero-inner { max-width:1160px;margin:0 auto;padding:0 28px;position:relative;z-index:1; }
.vo-hero-grid  { display:grid;grid-template-columns:1.1fr .9fr;gap:64px;align-items:center; }

.vo-eyebrow {
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(29,111,224,.18);border:1px solid rgba(29,111,224,.35);
  border-radius:99px;padding:5px 14px;
  font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:#7ecef4;margin-bottom:20px;
}
.vo-hero h1 {
  font-size:clamp(34px,4.8vw,60px);font-weight:900;color:#fff;
  letter-spacing:-.04em;line-height:1.04;margin-bottom:18px;
}
.vo-hero h1 span {
  background:linear-gradient(118deg,#7ecef4,#3B8FEF);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
}
.vo-hero-desc { font-size:17px;color:#9ab5d4;line-height:1.7;max-width:480px;margin-bottom:32px; }
.vo-cta-row   { display:flex;gap:12px;flex-wrap:wrap;margin-bottom:36px; }

.vo-btn-primary {
  display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 28px;
  background:#1D6FE0;color:#fff;font-weight:700;font-size:15px;border-radius:10px;
  text-decoration:none;transition:all .15s;box-shadow:0 8px 24px rgba(29,111,224,.35);
  border:0;cursor:pointer;font-family:inherit;
}
.vo-btn-primary:hover { background:#0F52C0;transform:translateY(-2px); }
.vo-btn-wa {
  display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 24px;
  background:rgba(37,211,102,.15);color:#25D366;font-weight:600;font-size:15px;border-radius:10px;
  border:1.5px solid rgba(37,211,102,.3);text-decoration:none;transition:all .15s;
}
.vo-btn-wa:hover { background:rgba(37,211,102,.25); }

.vo-trust-row  { display:flex;gap:22px;flex-wrap:wrap; }
.vo-trust-item { display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#6da8e0; }
.vo-trust-item svg { width:15px;height:15px;stroke:#3B8FEF;fill:none;stroke-width:2.5;flex:none; }

/* Hero right — address card */
.vo-addr-card {
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:20px;padding:28px;backdrop-filter:blur(10px);
}
.vo-addr-head { display:flex;align-items:center;gap:10px;margin-bottom:18px; }
.vo-addr-dot  { width:8px;height:8px;border-radius:50%;background:#4ADE80;flex:none; }
.vo-addr-label{ font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6da8e0; }
.vo-addr-name { font-size:18px;font-weight:800;color:#fff;margin-bottom:4px; }
.vo-addr-loc  { font-size:13px;color:#9ab5d4;margin-bottom:18px; }
.vo-addr-chips{ display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px; }
.vo-addr-chip {
  font-size:11.5px;font-weight:600;padding:4px 12px;border-radius:99px;
  background:rgba(29,111,224,.18);color:#7ecef4;border:1px solid rgba(29,111,224,.25);
}
.vo-addr-stats{ display:grid;grid-template-columns:1fr 1fr;gap:10px; }
.vo-addr-stat { background:rgba(255,255,255,.07);border-radius:10px;padding:12px;text-align:center; }
.vo-addr-stat .n { font-size:20px;font-weight:800;color:#fff;line-height:1; }
.vo-addr-stat .l { font-size:11px;color:#6da8e0;margin-top:3px;text-transform:uppercase;letter-spacing:.05em; }

/* ── PLANS ── */
.vo-plans { padding:88px 0;background:var(--sec-orange-bg); }
.vo-inner  { max-width:1160px;margin:0 auto;padding:0 28px; }
.vo-sec-label { font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--blue);margin-bottom:14px;display:block; }
.vo-sec-h2 { font-size:clamp(26px,3.6vw,44px);font-weight:900;letter-spacing:-.04em;color:var(--navy);margin-bottom:8px; }
.vo-sec-p  { font-size:16px;color:var(--text-2);max-width:560px;line-height:1.7;margin-bottom:48px; }
.vo-plans-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:22px; }

.vo-plan-card {
  border-radius:20px;border:1.5px solid var(--sec-orange-border);background:#fff;padding:28px;
  position:relative;transition:border-color .2s,box-shadow .2s,transform .2s;
  display:flex;flex-direction:column;
}
.vo-plan-card:hover { border-color:var(--blue);box-shadow:0 16px 48px rgba(29,111,224,.14);transform:translateY(-4px); }
.vo-plan-card.popular {
  border-color:var(--blue);box-shadow:0 16px 48px rgba(29,111,224,.2);
}
.vo-plan-badge {
  position:absolute;top:-12px;left:50%;transform:translateX(-50%);
  font-size:11px;font-weight:700;padding:4px 14px;border-radius:99px;
  background:linear-gradient(135deg,#0F52C0,#1D6FE0);color:#fff;white-space:nowrap;
}
.vo-plan-icon { width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#EEF2FF,#DBEAFE);display:grid;place-items:center;margin-bottom:18px; }
.vo-plan-icon svg { width:26px;height:26px;stroke:#1D6FE0;fill:none;stroke-width:2; }
.vo-plan-name { font-size:20px;font-weight:800;color:var(--navy);margin-bottom:6px; }
.vo-plan-tagline { font-size:13.5px;color:var(--text-2);margin-bottom:20px;line-height:1.5; }
.vo-plan-price { margin-bottom:8px; }
.vo-plan-from { font-size:12px;color:var(--text-3);font-weight:500; }
.vo-plan-amount { font-size:36px;font-weight:900;color:var(--navy);letter-spacing:-.04em;line-height:1; }
.vo-plan-per { font-size:13px;color:var(--text-2);margin-left:4px; }
.vo-plan-note { font-size:12px;color:var(--text-3);margin-bottom:22px; }
.vo-plan-divider { height:1px;background:var(--line);margin:18px 0; }
.vo-plan-features { display:flex;flex-direction:column;gap:11px;flex:1; }
.vo-plan-feat { display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:var(--text); }
.vo-plan-feat svg { width:16px;height:16px;stroke:#10B981;fill:none;stroke-width:2.5;flex:none;margin-top:2px; }
.vo-plan-feat.no svg { stroke:#EF4444; }
.vo-plan-feat.no span { color:var(--text-3);text-decoration:line-through; }
.vo-plan-cta {
  margin-top:22px;height:48px;border-radius:10px;border:0;cursor:pointer;
  font-weight:700;font-size:14.5px;font-family:inherit;transition:all .15s;
  display:flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;
}
.vo-plan-cta.primary { background:#1D6FE0;color:#fff;box-shadow:0 6px 18px rgba(29,111,224,.3); }
.vo-plan-cta.primary:hover { background:#0F52C0;transform:translateY(-1px); }
.vo-plan-cta.outline { background:#fff;color:var(--blue);border:1.5px solid var(--blue); }
.vo-plan-cta.outline:hover { background:var(--bg-2); }

/* ── LOCATIONS ── */
.vo-locs { padding:88px 0;background:var(--sec-teal-bg); }
.vo-locs-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px; }
.vo-loc-card {
  background:#fff;border:1.5px solid var(--line);border-radius:16px;padding:22px;
  transition:border-color .2s,box-shadow .2s,transform .2s;
}
.vo-loc-card:hover { border-color:var(--blue);box-shadow:0 10px 30px rgba(29,111,224,.12);transform:translateY(-3px); }
.vo-loc-area { font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--blue);margin-bottom:6px; }
.vo-loc-name { font-size:17px;font-weight:800;color:var(--navy);margin-bottom:4px; }
.vo-loc-addr { font-size:13px;color:var(--text-2);line-height:1.5;margin-bottom:14px; }
.vo-loc-tags  { display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px; }
.vo-loc-tag   { font-size:11px;font-weight:600;padding:3px 9px;border-radius:99px;background:var(--bg-2);color:var(--blue-dark); }
.vo-loc-price { font-size:13px;font-weight:700;color:var(--text-2); }
.vo-loc-price span { color:var(--navy);font-size:17px; }

/* ── WHY / FEATURES ── */
.vo-why { padding:88px 0;background:var(--sec-purple-bg); }
.vo-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:44px; }
.vo-why-card {
  padding:26px;border-radius:16px;border:1.5px solid var(--line);
  background:var(--bg);transition:border-color .2s,box-shadow .2s;
}
.vo-why-card:hover { border-color:var(--blue);box-shadow:0 8px 24px rgba(29,111,224,.1); }
.vo-why-icon { width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#EEF2FF,#DBEAFE);display:grid;place-items:center;margin-bottom:16px; }
.vo-why-icon svg { width:24px;height:24px;stroke:#1D6FE0;fill:none;stroke-width:2; }
.vo-why-title { font-size:16px;font-weight:800;color:var(--navy);margin-bottom:8px; }
.vo-why-desc  { font-size:13.5px;color:var(--text-2);line-height:1.6; }

/* ── DOCUMENTS ── */
.vo-docs { padding:88px 0;background:var(--sec-amber-bg); }
.vo-docs-grid { display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:44px;align-items:start; }
.vo-doc-group h3 { font-size:17px;font-weight:800;color:var(--navy);margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid var(--blue); }
.vo-doc-list { display:flex;flex-direction:column;gap:11px; }
.vo-doc-item { display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--text);line-height:1.5; }
.vo-doc-item svg { width:16px;height:16px;stroke:#1D6FE0;fill:none;stroke-width:2.5;flex:none;margin-top:2px; }

/* ── HOW IT WORKS ── */
.vo-how { padding:88px 0;background:var(--sec-sky-bg); }
.vo-steps { display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-top:44px;position:relative; }
.vo-steps::before { content:'';position:absolute;top:36px;left:60px;right:60px;height:2px;background:linear-gradient(90deg,var(--blue-dark),var(--blue));z-index:0; }
.vo-step { text-align:center;position:relative;z-index:1; }
.vo-step-num {
  width:72px;height:72px;border-radius:50%;margin:0 auto 14px;
  background:linear-gradient(135deg,#0F52C0,#1D6FE0);
  display:grid;place-items:center;font-size:20px;font-weight:900;color:#fff;
  box-shadow:0 8px 24px rgba(29,111,224,.35);
}
.vo-step h4 { font-size:14px;font-weight:800;color:var(--navy);margin-bottom:6px;line-height:1.3; }
.vo-step p  { font-size:12.5px;color:var(--text-2);line-height:1.5; }

/* ── COMPARISON ── */
.vo-compare { padding:88px 0;background:var(--sec-orange-bg); }
.vo-compare-table { margin-top:44px;border-radius:18px;overflow:hidden;border:1.5px solid var(--line); }
.vo-ct-head { display:grid;grid-template-columns:2fr 1fr 1fr 1fr;background:var(--navy);color:#fff; }
.vo-ct-col  { padding:16px 20px;font-size:13px;font-weight:700; }
.vo-ct-col.highlight { background:rgba(29,111,224,.3); }
.vo-ct-row  { display:grid;grid-template-columns:2fr 1fr 1fr 1fr;border-top:1px solid var(--line);background:#fff;transition:background .12s; }
.vo-ct-row:hover { background:#FAFBFF; }
.vo-ct-row:nth-child(even) { background:var(--bg); }
.vo-ct-row:nth-child(even):hover { background:#F0F5FF; }
.vo-ct-cell { padding:14px 20px;font-size:13.5px;color:var(--text);display:flex;align-items:center;gap:6px; }
.vo-ct-cell.feature { font-weight:600;color:var(--navy); }
.vo-ct-cell.highlight { background:rgba(29,111,224,.05); }
.vo-ct-check { width:18px;height:18px;stroke:#10B981;fill:none;stroke-width:2.5; }
.vo-ct-cross { width:18px;height:18px;stroke:#EF4444;fill:none;stroke-width:2.5; }

/* ── FAQ ── */
.vo-faq { padding:88px 0;background:var(--sec-teal-bg); }
.vo-faq-inner { max-width:800px;margin:0 auto;padding:0 28px; }
.vo-faq-list { margin-top:44px; }
.vo-faq-item { border-bottom:1px solid var(--line); }
.vo-faq-item:first-child { border-top:1px solid var(--line); }
.vo-faq-q {
  display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:20px 0;cursor:pointer;width:100%;background:none;border:0;text-align:left;font-family:inherit;
}
.vo-faq-q-text { font-size:16px;font-weight:700;color:var(--navy);line-height:1.4; }
.vo-faq-icon   { width:26px;height:26px;border-radius:7px;background:var(--bg-2);display:grid;place-items:center;flex:none; }
.vo-faq-icon svg { width:14px;height:14px;stroke:var(--blue);fill:none;stroke-width:2.5;transition:transform .25s; }
.vo-faq-a { max-height:0;overflow:hidden;transition:max-height .32s cubic-bezier(.2,.7,.3,1); }
.vo-faq-a-inner { padding:0 0 20px;font-size:14.5px;color:var(--text-2);line-height:1.72; }

/* ── CTA FINAL ── */
.vo-cta-section { padding:88px 0;background:var(--sec-purple-bg); }
.vo-cta-card {
  background:linear-gradient(160deg,#1A2F4E,#0F52C0 65%,#1D6FE0);
  border-radius:24px;padding:clamp(48px,6vw,80px);text-align:center;
  box-shadow:0 40px 80px rgba(13,31,60,.3);position:relative;overflow:hidden;
}
.vo-cta-card::before {
  content:'';position:absolute;inset:0;
  background:radial-gradient(600px 400px at 50% -20%,rgba(59,143,239,.25),transparent 60%);
  pointer-events:none;
}
.vo-cta-card h2 { font-size:clamp(28px,4vw,50px);font-weight:900;color:#fff;letter-spacing:-.04em;margin-bottom:14px;position:relative; }
.vo-cta-card p  { font-size:17px;color:#9ab5d4;max-width:520px;margin:0 auto 38px;line-height:1.7;position:relative; }
.vo-cta-btns    { display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative; }

/* ── FORM MODAL ── */
.vo-modal-bg {
  position:fixed;inset:0;background:rgba(8,15,30,.7);backdrop-filter:blur(4px);
  z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;
}
.vo-modal {
  background:#fff;border-radius:20px;width:100%;max-width:520px;
  box-shadow:0 32px 80px rgba(0,0,0,.25);max-height:90vh;overflow-y:auto;
}
.vo-modal-head {
  background:linear-gradient(135deg,#1E3A6A,#264D8C);
  border-radius:20px 20px 0 0;padding:24px 28px;
  display:flex;align-items:center;justify-content:space-between;
}
.vo-modal-head h3 { font-size:19px;font-weight:800;color:#fff; }
.vo-modal-close {
  width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,.1);
  border:0;cursor:pointer;display:grid;place-items:center;color:#fff;
}
.vo-modal-close svg { width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2.5; }
.vo-modal-body { padding:28px; }
.vo-mform { display:flex;flex-direction:column;gap:14px; }
.vo-mfield { display:flex;flex-direction:column;gap:6px; }
.vo-mlabel { font-size:12.5px;font-weight:600;color:#374151; }
.vo-minput {
  height:44px;border:1.5px solid #E2E8F0;border-radius:9px;padding:0 14px;
  font-size:14px;color:#1C2434;outline:none;font-family:inherit;transition:border-color .15s;
}
.vo-minput:focus { border-color:#1D6FE0;box-shadow:0 0 0 3px rgba(29,111,224,.1); }
.vo-mselect {
  height:44px;border:1.5px solid #E2E8F0;border-radius:9px;padding:0 14px;
  font-size:14px;color:#1C2434;outline:none;font-family:inherit;cursor:pointer;background:#fff;
}
.vo-mrow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
.vo-msubmit {
  height:50px;border-radius:10px;background:#1D6FE0;color:#fff;
  font-weight:800;font-size:15px;border:0;cursor:pointer;font-family:inherit;
  transition:all .15s;margin-top:4px;box-shadow:0 6px 18px rgba(29,111,224,.35);
}
.vo-msubmit:hover { background:#0F52C0;transform:translateY(-1px); }
.vo-msuccess { text-align:center;padding:20px 0; }
.vo-msuccess .icon { font-size:48px;margin-bottom:14px; }
.vo-msuccess h4 { font-size:20px;font-weight:800;color:#1C2434;margin-bottom:8px; }
.vo-msuccess p  { font-size:14px;color:#64748B;line-height:1.6; }

/* ── RESPONSIVE ── */
@media(max-width:1040px){
  .vo-hero-grid { grid-template-columns:1fr;gap:40px }
  .vo-addr-card { display:none }
  .vo-plans-grid { grid-template-columns:1fr 1fr }
  .vo-why-grid { grid-template-columns:1fr 1fr }
  .vo-steps { grid-template-columns:1fr 1fr;gap:20px }
  .vo-steps::before { display:none }
  .vo-ct-head,.vo-ct-row { grid-template-columns:2fr 1fr 1fr }
}
@media(max-width:768px){
  .vo-plans-grid { grid-template-columns:1fr }
  .vo-locs-grid  { grid-template-columns:1fr 1fr }
  .vo-docs-grid  { grid-template-columns:1fr }
  .vo-compare-table { overflow-x:auto }
}
@media(max-width:640px){
  .vo-hero { padding:56px 0 48px }
  .vo-cta-row { flex-direction:column;align-items:flex-start }
  .vo-locs-grid { grid-template-columns:1fr }
  .vo-why-grid  { grid-template-columns:1fr 1fr }
  .vo-steps     { grid-template-columns:1fr }
  .vo-cta-btns  { flex-direction:column;align-items:center }
  .vo-mrow { grid-template-columns:1fr }
  .vo-ct-head,.vo-ct-row { grid-template-columns:1.5fr 1fr 1fr }
}
@media(max-width:480px){
  .vo-why-grid { grid-template-columns:1fr }
}
`

/* ── DATA ─────────────────────────────────────────────────── */
const PLANS = [
  {
    name: 'Mail Address Plan',
    tagline: 'A professional business address for correspondence and mail handling.',
    price: '₹999',
    per: '/month',
    note: '+ GST · Billed annually',
    icon: 'M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z',
    features: [
      { text: 'Prime Koramangala business address', yes: true },
      { text: 'Mail & courier receiving', yes: true },
      { text: 'Digital mail scan & forwarding', yes: true },
      { text: 'Use on business cards & website', yes: true },
      { text: 'GST registration documents', yes: false },
      { text: 'Company registration documents', yes: false },
    ],
    popular: false,
  },
  {
    name: 'GST Registration Plan',
    tagline: 'Everything you need to register your GST with a premium Bengaluru address.',
    price: '₹1,499',
    per: '/month',
    note: '+ GST · Billed annually',
    icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8',
    features: [
      { text: 'Prime Koramangala business address', yes: true },
      { text: 'Mail & courier receiving', yes: true },
      { text: 'Digital mail scan & forwarding', yes: true },
      { text: 'Use on business cards & website', yes: true },
      { text: 'Rent agreement + NOC + electricity bill', yes: true },
      { text: '100% GST registration acceptance guarantee', yes: true },
    ],
    popular: true,
  },
  {
    name: 'Company Registration Plan',
    tagline: 'Full documentation for both company incorporation and GST registration.',
    price: '₹2,499',
    per: '/month',
    note: '+ GST · Billed annually',
    icon: 'M3 21h18M6 21V7l6-4 6 4v14|M9 22V12h6v10',
    features: [
      { text: 'Prime Koramangala business address', yes: true },
      { text: 'Mail & courier receiving', yes: true },
      { text: 'Digital mail scan & forwarding', yes: true },
      { text: 'Rent agreement + NOC + electricity bill', yes: true },
      { text: 'GST + company registration documents', yes: true },
      { text: 'Priority document delivery (1 business day)', yes: true },
    ],
    popular: false,
  },
]

const LOCATIONS = [
  {
    area: 'Bengaluru – Koramangala',
    name: 'LauncherDesk Koramangala HQ',
    addr: '4th Block, Koramangala, Bengaluru – 560095',
    tags: ['Prime Location', 'Metro Nearby', 'GST Ready'],
    price: 'From ₹999/mo',
  },
  {
    area: 'Mumbai – BKC',
    name: 'Bandra Kurla Complex Business Address',
    addr: 'G Block, Bandra Kurla Complex, Mumbai – 400051',
    tags: ['Financial Hub', 'Premium', 'GST Ready'],
    price: 'From ₹1,499/mo',
  },
  {
    area: 'Delhi – Connaught Place',
    name: 'Connaught Place Central Address',
    addr: 'Connaught Place, New Delhi – 110001',
    tags: ['CBD Address', 'Bank Friendly', 'GST Ready'],
    price: 'From ₹1,299/mo',
  },
  {
    area: 'Hyderabad – HITEC City',
    name: 'HITEC City IT Business Address',
    addr: 'HITEC City, Madhapur, Hyderabad – 500081',
    tags: ['IT Hub', 'Startup Belt', 'GST Ready'],
    price: 'From ₹999/mo',
  },
  {
    area: 'Chennai – Anna Salai',
    name: 'Anna Salai Business Centre',
    addr: 'Anna Salai, Chennai – 600002',
    tags: ['CBD Address', 'Enterprise Ready', 'GST Ready'],
    price: 'From ₹999/mo',
  },
  {
    area: 'Pune – Hinjewadi',
    name: 'Hinjewadi IT Park Address',
    addr: 'Hinjewadi Phase 1, Pune – 411057',
    tags: ['IT Corridor', 'Affordable', 'GST Ready'],
    price: 'From ₹899/mo',
  },
]

const WHY = [
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
    title: '100% GST Acceptance',
    desc: 'If your GST application is rejected due to a document issue, we resolve it at no extra cost. Guaranteed.',
  },
  {
    icon: 'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M13 2v6h6',
    title: 'Documents in 24 Hours',
    desc: 'Rent agreement, NOC and electricity bill — all delivered digitally within 1 business day.',
  },
  {
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    title: 'Legally Valid',
    desc: 'Fully compliant documents accepted by MCA, GST authorities, banks and courts across India.',
  },
  {
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    title: 'One Point of Contact',
    desc: 'Your address, your company registration and your GST filing — all handled through LauncherDesk.',
  },

  {
    icon: 'M18 20V10|M12 20V4|M6 20v-6',
    title: 'Pan-India Coverage',
    desc: 'Need addresses in Delhi, Mumbai, Hyderabad or Chennai? We cover all major cities across India.',
  },
  {
    icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10',
    title: 'Prime CBD Addresses',
    desc: 'Choose from verified commercial buildings at premium locations — Koramangala, MG Road, Indiranagar.',
  },
  {
    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z|M22 6l-10 7L2 6',
    title: 'Digital Mail Management',
    desc: 'Physical mail received, scanned and forwarded to your email. Never miss a document.',
  },
]

const STEPS = [
  { num: '01', title: 'Choose Your Plan', desc: 'Select the plan that matches your need — mail, GST or company registration.' },
  { num: '02', title: 'Pick a Location', desc: 'Choose from our verified premium addresses across major cities in India.' },
  { num: '03', title: 'Submit KYC Online', desc: 'Complete KYC and sign your agreement digitally — no office visit required.' },
  { num: '04', title: 'Get Documents', desc: 'Receive your rent agreement, NOC and electricity bill within 1 business day.' },
  { num: '05', title: 'Use Your Address', desc: 'Start using your address for GST, company registration or business correspondence.' },
]

const COMPARE_ROWS = [
  ['Professional business address',    true,  true,  true],
  ['Mail & courier receiving',         true,  true,  true],
  ['Digital mail scan & forward',      true,  true,  true],
  ['GST registration documents',       false, true,  true],
  ['Company registration documents',   false, false, true],
  ['Rent agreement + NOC + EB bill',   false, true,  true],
  ['100% GST acceptance guarantee',    false, true,  true],
  ['Priority 1-day document delivery', false, false, true],
  ['Dedicated account manager',        false, false, true],
]

const FAQS = [
  {
    q: 'What is a virtual office?',
    a: 'A virtual office gives your business a registered, professional address at a prime location without needing to rent physical space. You get a real address you can use for GST registration, company incorporation, business cards and correspondence — without the cost of a full office.',
  },
  {
    q: 'Can I use a virtual office for GST registration?',
    a: 'Yes. GST registration requires proof of a registered office address. With our GST Registration Plan, we provide a rent agreement, NOC and electricity bill — all the documents GST authorities require. We offer a 100% acceptance guarantee.',
  },
  {
    q: 'Can I use a virtual office for Private Limited / LLP registration?',
    a: 'Yes. Company registration with MCA requires a registered office address. Our Company Registration Plan includes all documents needed — rent agreement, NOC and utility bill — for both incorporation and GST filing.',
  },
  {
    q: 'How long does it take to get the documents?',
    a: 'Once KYC is verified and the agreement is signed digitally, you receive your rent agreement, NOC and electricity bill within 1 business day. Our document turnaround is among the fastest across India.',
  },
  {
    q: 'Is the address legally valid?',
    a: 'Yes. All our addresses are in verified, commercial coworking and managed office buildings. The documents we issue are fully compliant with MCA, GST, banking and court requirements across India.',
  },
  {
    q: 'What if my GST application gets rejected?',
    a: 'If your GST registration application is rejected due to a document issue from our side, we resolve it at no additional cost. That\'s our acceptance guarantee — 100% at no extra charge.',
  },
  {
    q: 'Can I meet clients at this address?',
    a: 'Meeting room access can be arranged at most of our partner locations. Mention this requirement when you enquire and we\'ll include meeting room options in your quote.',
  },
  {
    q: 'What is the minimum contract period?',
    a: 'Our plans are available on a monthly basis (billed annually) or on a 6-month cycle. Annual billing gives you the best per-month rate. We also offer short-term plans for specific registration needs.',
  },
]

/* ── FORM MODAL ── */
const API = import.meta.env.VITE_API_URL || 'https://launcherdesk-backend-production.up.railway.app/api'

function EnquiryModal({ plan, onClose }) {
  const [form, setForm] = useState({ name:'', mobile:'', email:'', city:'', plan: plan || '' })
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true); setErr('')
    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          mobile:  form.mobile,
          email:   form.email || undefined,
          state:   form.city || 'Not specified',
          message: `Virtual Office enquiry — Plan: ${form.plan}, City: ${form.city}`,
          source:  'virtual-office',
          service: 'Virtual Office',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      setDone(true)
    } catch (e) {
      setErr(e.message || 'Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }
  const CITIES = [
    'Bengaluru','Mumbai','Delhi','Hyderabad','Chennai','Pune','Kolkata','Ahmedabad',
    'Gurgaon','Noida','Faridabad','Ghaziabad','Chandigarh','Jaipur','Lucknow',
    'Indore','Bhopal','Nagpur','Vadodara','Surat','Kochi','Thiruvananthapuram',
    'Coimbatore','Visakhapatnam','Vijayawada','Bhubaneswar','Patna','Ranchi',
    'Guwahati','Dehradun','Mangaluru','Mysuru','Hubli','Nashik','Aurangabad',
    'Other',
  ]
  const PLANS  = ['Mail Address Plan','GST Registration Plan','Company Registration Plan','Not sure — help me choose']

  return (
    <div className="vo-modal-bg" onClick={e=>{ if(e.target===e.currentTarget) onClose() }}>
      <div className="vo-modal">
        <div className="vo-modal-head">
          <h3>Get Your Virtual Office</h3>
          <button className="vo-modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="vo-modal-body">
          {done ? (
            <div className="vo-msuccess">
              <div className="icon">✅</div>
              <h4>Request received!</h4>
              <p>Our team will call you within 2 hours with address options, pricing and next steps. No spam, ever.</p>
            </div>
          ) : (
            <form className="vo-mform" onSubmit={submit}>
              <div className="vo-mrow">
                <div className="vo-mfield">
                  <label className="vo-mlabel">Full Name *</label>
                  <input className="vo-minput" type="text" required placeholder="Your name"
                    value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                </div>
                <div className="vo-mfield">
                  <label className="vo-mlabel">Mobile *</label>
                  <input className="vo-minput" type="tel" required placeholder="+91 98765 43210"
                    value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})}/>
                </div>
              </div>
              <div className="vo-mfield">
                <label className="vo-mlabel">Email</label>
                <input className="vo-minput" type="email" placeholder="your@email.com"
                  value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              </div>
              <div className="vo-mrow">
                <div className="vo-mfield">
                  <label className="vo-mlabel">Plan *</label>
                  <select className="vo-mselect" required value={form.plan} onChange={e=>setForm({...form,plan:e.target.value})}>
                    <option value="">Select plan</option>
                    {PLANS.map(p=><option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="vo-mfield">
                  <label className="vo-mlabel">City *</label>
                  <select className="vo-mselect" required value={form.city} onChange={e=>setForm({...form,city:e.target.value})}>
                    <option value="">Select city</option>
                    {CITIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="vo-msubmit" disabled={saving}>{saving ? 'Submitting…' : 'Get My Virtual Office →'}</button>
              {err && <p style={{fontSize:13,color:'#E11D48',textAlign:'center',marginTop:8}}>{err}</p>}
              <p style={{fontSize:12,color:'#94A3B8',textAlign:'center',marginTop:8}}>
                We'll respond within 2 hours · No spam · 100% confidential
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── MAIN PAGE ── */
export default function VirtualOfficePage() {
  const [modal, setModal] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  const CHECK = 'M20 6 9 17l-5-5'
  const CROSS = 'M18 6 6 18M6 6l12 12'
  const PLUS  = 'M12 5v14M5 12h14'

  return (
    <>
      <style>{S}</style>
      {modal !== null && <EnquiryModal plan={modal} onClose={()=>setModal(null)}/>}

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section className="vo-hero">
        <div className="vo-hero-inner">
          <div className="vo-hero-grid">
            <div>
              <div className="vo-eyebrow">
                <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Virtual Office · Pan India
              </div>
              <h1>
                A premium business address.<br/>
                <span>Without the office rent.</span>
              </h1>
              <p className="vo-hero-desc">
                Get a real, registered business address at a prime location across India — for GST registration, company incorporation or professional correspondence. 100% online. Documents in 24 hours.
              </p>
              <div className="vo-cta-row">
                <button className="vo-btn-primary" onClick={()=>setModal('')}>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  Get Your Address
                </button>
                <a href="https://wa.me/918548854859" target="_blank" rel="noopener noreferrer" className="vo-btn-wa">
                  <svg viewBox="0 0 32 32" width={20} height={20} fill="currentColor" style={{flexShrink:0}}><path d="M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z"/></svg>
                  WhatsApp Us
                </a>
              </div>
              <div className="vo-trust-row">
                {['100% GST Acceptance Guarantee','Documents in 24 Hours','Fully Digital Process','Pan-India Coverage'].map(t=>(
                  <div key={t} className="vo-trust-item">
                    <svg viewBox="0 0 24 24"><path d={CHECK}/></svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Address showcase card */}
            <div className="vo-addr-card">
              <div className="vo-addr-head">
                <div className="vo-addr-dot"/>
                <div className="vo-addr-label">Your Business Address</div>
              </div>
              <div className="vo-addr-name">Prime Location</div>
              <div className="vo-addr-loc">#63, Office No. 224 & 225, 2nd Floor, The Plazzo Mall, Ibrahim Sahib St, Off Commercial Street, Bangalore – 560001</div>
              <div className="vo-addr-chips">
                {['GST Ready','ROC Accepted','Bank Approved','Court Valid'].map(c=>(
                  <span key={c} className="vo-addr-chip">{c}</span>
                ))}
              </div>
              <div className="vo-addr-stats">
                <div className="vo-addr-stat"><div className="n">24hr</div><div className="l">Doc Delivery</div></div>
                <div className="vo-addr-stat"><div className="n">100%</div><div className="l">GST Acceptance</div></div>
                <div className="vo-addr-stat"><div className="n">6+</div><div className="l">Pan India</div></div>
                <div className="vo-addr-stat"><div className="n">₹999</div><div className="l">Starting/mo</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PLANS ══════════════════════════════════════════ */}
      <section className="vo-plans">
        <div className="vo-inner">
          <span className="vo-sec-label">Pricing Plans</span>
          <h2 className="vo-sec-h2">Choose the right plan for your business.</h2>
          <p className="vo-sec-p">Whether you need a professional mailing address, GST registration documents or full company incorporation support — we have a plan for you.</p>
          <div className="vo-plans-grid">
            {PLANS.map(p=>(
              <div key={p.name} className={`vo-plan-card${p.popular?' popular':''}`}>
                {p.popular && <div className="vo-plan-badge">⭐ Most Popular</div>}
                <div className="vo-plan-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    {p.icon.split('|').map((d,i)=><path key={i} d={d}/>)}
                  </svg>
                </div>
                <div className="vo-plan-name">{p.name}</div>
                <div className="vo-plan-tagline">{p.tagline}</div>
                <div className="vo-plan-price">
                  <div className="vo-plan-from">From</div>
                  <div>
                    <span className="vo-plan-amount">{p.price}</span>
                    <span className="vo-plan-per">{p.per}</span>
                  </div>
                </div>
                <div className="vo-plan-note">{p.note}</div>
                <div className="vo-plan-divider"/>
                <div className="vo-plan-features">
                  {p.features.map((f,i)=>(
                    <div key={i} className={`vo-plan-feat${f.yes?'':' no'}`}>
                      <svg viewBox="0 0 24 24"><path d={f.yes?CHECK:CROSS}/></svg>
                      <span>{f.text}</span>
                    </div>
                  ))}
                </div>
                <button className={`vo-plan-cta ${p.popular?'primary':'outline'}`} onClick={()=>setModal(p.name)}>
                  Get Started
                  <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LOCATIONS ══════════════════════════════════════ */}
      <section className="vo-locs">
        <div className="vo-inner">
          <span className="vo-sec-label">Our Locations</span>
          <h2 className="vo-sec-h2">Prime addresses across India.</h2>
          <p className="vo-sec-p" style={{marginBottom:0}}>All our addresses are in verified commercial buildings accepted by GST authorities, MCA, banks and courts.</p>
          <div className="vo-locs-grid">
            {LOCATIONS.map(l=>(
              <div key={l.name} className="vo-loc-card">
                <div className="vo-loc-area">{l.area}</div>
                <div className="vo-loc-name">{l.name}</div>
                <div className="vo-loc-addr">{l.addr}</div>
                <div className="vo-loc-tags">{l.tags.map(t=><span key={t} className="vo-loc-tag">{t}</span>)}</div>
                <div className="vo-loc-price"><span>{l.price}</span> · all plans</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY LAUNCHERDESK ════════════════════════════════ */}
      <section className="vo-why">
        <div className="vo-inner">
          <span className="vo-sec-label">Why LauncherDesk</span>
          <h2 className="vo-sec-h2">The smarter virtual office.</h2>
          <div className="vo-why-grid">
            {WHY.map(w=>(
              <div key={w.title} className="vo-why-card">
                <div className="vo-why-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {w.icon.split('|').map((d,i)=><path key={i} d={d}/>)}
                  </svg>
                </div>
                <div className="vo-why-title">{w.title}</div>
                <div className="vo-why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DOCUMENTS REQUIRED ══════════════════════════════ */}
      <section className="vo-docs">
        <div className="vo-inner">
          <span className="vo-sec-label">Documents Required</span>
          <h2 className="vo-sec-h2">What you'll need to submit.</h2>
          <p className="vo-sec-p" style={{marginBottom:0}}>The process is 100% digital. All documents are submitted online — no physical copies needed.</p>
          <div className="vo-docs-grid">
            <div className="vo-doc-group">
              <h3>For GST Registration</h3>
              <div className="vo-doc-list">
                {[
                  'PAN card of the business / applicant',
                  'Aadhaar card of authorised signatory',
                  'Cancelled cheque or bank statement',
                  'Photograph of authorised signatory',
                  'Letter of authorisation (if signatory is not director)',
                  'Certificate of incorporation (for companies)',
                ].map((d,i)=>(
                  <div key={i} className="vo-doc-item">
                    <svg viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                    {d}
                  </div>
                ))}
              </div>
            </div>
            <div className="vo-doc-group">
              <h3>For Company Registration</h3>
              <div className="vo-doc-list">
                {[
                  'PAN card of all directors / shareholders',
                  'Aadhaar card of all directors',
                  'Passport-size photograph of all directors',
                  'Address proof of all directors',
                  'Name approval letter from MCA (for new companies)',
                  'Digital signature certificate (DSC) of directors',
                ].map((d,i)=>(
                  <div key={i} className="vo-doc-item">
                    <svg viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ════════════════════════════════════ */}
      <section className="vo-how">
        <div className="vo-inner">
          <span className="vo-sec-label">The Process</span>
          <h2 className="vo-sec-h2">Up and running in 24 hours.</h2>
          <div className="vo-steps">
            {STEPS.map(s=>(
              <div key={s.num} className="vo-step">
                <div className="vo-step-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ════════════════════════════════ */}
      <section className="vo-compare">
        <div className="vo-inner">
          <span className="vo-sec-label">Plan Comparison</span>
          <h2 className="vo-sec-h2">Which plan is right for you?</h2>
          <div className="vo-compare-table">
            <div className="vo-ct-head">
              <div className="vo-ct-col">Feature</div>
              <div className="vo-ct-col">Mail Address</div>
              <div className="vo-ct-col highlight">GST Plan</div>
              <div className="vo-ct-col">Company Plan</div>
            </div>
            {COMPARE_ROWS.map(([feat, mail, gst, comp],i)=>(
              <div key={i} className="vo-ct-row">
                <div className="vo-ct-cell feature">{feat}</div>
                <div className="vo-ct-cell"><svg className="vo-ct-check" viewBox="0 0 24 24" fill="none"><path d={mail?CHECK:CROSS} stroke={mail?'#10B981':'#EF4444'} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <div className="vo-ct-cell highlight"><svg className="vo-ct-check" viewBox="0 0 24 24" fill="none"><path d={gst?CHECK:CROSS} stroke={gst?'#10B981':'#EF4444'} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <div className="vo-ct-cell"><svg className="vo-ct-check" viewBox="0 0 24 24" fill="none"><path d={comp?CHECK:CROSS} stroke={comp?'#10B981':'#EF4444'} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ══════════════════════════════════════════════ */}
      <section className="vo-faq">
        <div className="vo-faq-inner">
          <span className="vo-sec-label" style={{textAlign:'center',display:'block'}}>FAQ</span>
          <h2 className="vo-sec-h2" style={{textAlign:'center'}}>Frequently asked questions.</h2>
          <div className="vo-faq-list">
            {FAQS.map((f,i)=>(
              <div key={i} className="vo-faq-item">
                <button className="vo-faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                  <span className="vo-faq-q-text">{f.q}</span>
                  <div className="vo-faq-icon">
                    <svg viewBox="0 0 24 24" style={{transform:openFaq===i?'rotate(45deg)':'none',transition:'transform .25s'}}><path d={PLUS}/></svg>
                  </div>
                </button>
                <div className="vo-faq-a" style={{maxHeight:openFaq===i?'360px':'0'}}>
                  <div className="vo-faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ════════════════════════════════════════ */}
      <section className="vo-cta-section">
        <div className="vo-inner">
          <div className="vo-cta-card">
            <h2>Get your business address today.</h2>
            <p>Documents delivered within 24 hours. 100% online. No physical visit required.</p>
            <div className="vo-cta-btns">
              <button className="vo-btn-primary" style={{height:54,fontSize:15.5}} onClick={()=>setModal('')}>
                Get Started — From ₹999/mo
              </button>
              <a href="https://wa.me/918548854859" target="_blank" rel="noopener noreferrer" className="vo-btn-wa" style={{height:54}}>
                <svg viewBox="0 0 32 32" width={20} height={20} fill="currentColor" style={{flexShrink:0}}><path d="M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}