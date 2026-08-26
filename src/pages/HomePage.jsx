import { useEffect, useRef, useState } from 'react'
import logoImg from '../assets/launcherdesk-logo-transparent.png'
import { Link } from 'react-router-dom'

/* ─── Inline styles for the redesigned homepage ──────────────────────── */
const S = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');

/* ── HERO ── */
.hp-hero {
  background: linear-gradient(160deg, #080F1E 0%, #0D1F3C 55%, #162B52 100%);
  padding: clamp(72px,9vw,120px) 0 clamp(60px,7vw,100px);
  position: relative; overflow: hidden;
}
.hp-hero::before {
  content: '';position:absolute;inset:0;pointer-events:none;
  background: radial-gradient(800px 600px at 70% -10%, rgba(59,143,239,.22), transparent 60%),
              radial-gradient(400px 400px at 10% 100%, rgba(15,82,192,.18), transparent 60%);
}
.hp-hero-inner { max-width:1200px;margin:0 auto;padding:0 28px;position:relative;z-index:1; }
.hp-hero-grid  { display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center; }

.hp-eyebrow {
  display:inline-flex;align-items:center;gap:8px;
  font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
  color:#6da8e0;margin-bottom:22px;
}
.hp-eyebrow-dot { width:6px;height:6px;border-radius:50%;background:#1D6FE0;flex:none; }
.hp-hero h1 {
  font-size: clamp(34px, 4.8vw, 64px);
  font-weight: 900; letter-spacing: -.04em; line-height: 1.02; color:#fff; margin-bottom:22px;
}
.hp-hero h1 em {
  font-style:normal;
  background: linear-gradient(118deg,#7ecef4,#3B8FEF);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
}
.hp-hero-desc { font-size:17px;color:#9ab5d4;line-height:1.7;max-width:500px;margin-bottom:36px; }
.hp-cta-row   { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:44px; }
.hp-btn-primary {
  display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 28px;
  background:#1D6FE0;color:#fff;font-weight:700;font-size:15px;border-radius:10px;
  transition:background .15s,transform .15s,box-shadow .15s;text-decoration:none;
  box-shadow:0 8px 24px rgba(29,111,224,.35);
}
.hp-btn-primary:hover { background:#0F52C0;transform:translateY(-2px);box-shadow:0 12px 32px rgba(15,82,192,.45); }
.hp-btn-secondary {
  display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 24px;
  background:rgba(255,255,255,.08);color:#fff;font-weight:600;font-size:15px;border-radius:10px;
  border:1.5px solid rgba(255,255,255,.15);transition:background .15s;text-decoration:none;
}
.hp-btn-secondary:hover { background:rgba(255,255,255,.14); }
.hp-trust-pills { display:flex;gap:16px;flex-wrap:wrap; }
.hp-trust-pill  {
  display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600;
  color:#8aaece;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:99px;padding:6px 14px;
}
.hp-trust-pill svg { width:14px;height:14px;stroke:#3B8FEF;fill:none;stroke-width:2.5;flex:none; }

/* hero right — dashboard card */
.hp-dash-card {
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:20px;
  padding:28px;backdrop-filter:blur(12px);
}
.hp-dash-head {
  display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;
}
.hp-dash-title { font-size:13px;font-weight:700;color:#fff;letter-spacing:.02em; }
.hp-dash-badge {
  font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;
  background:rgba(14,159,110,.2);color:#4ADE80;border:1px solid rgba(14,159,110,.3);
}
.hp-stat-row { display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:18px; }
.hp-stat-box {
  background:rgba(255,255,255,.07);border-radius:12px;padding:14px;text-align:center;
  border:1px solid rgba(255,255,255,.08);
}
.hp-stat-box .n { font-size:22px;font-weight:800;color:#fff;letter-spacing:-.03em;line-height:1; }
.hp-stat-box .l { font-size:11px;color:#6da8e0;margin-top:3px;text-transform:uppercase;letter-spacing:.06em; }
.hp-svc-chips { display:flex;flex-wrap:wrap;gap:8px; }
.hp-svc-chip  {
  font-size:12px;font-weight:600;padding:6px 13px;border-radius:99px;
  background:rgba(29,111,224,.15);color:#7ecef4;border:1px solid rgba(29,111,224,.25);
}

/* ── STATS STRIP ── */
.hp-stats {
  background:#fff;border-bottom:1px solid rgba(13,31,60,.06);
  padding:44px 0;
}
.hp-stats-grid {
  max-width:1200px;margin:0 auto;padding:0 28px;
  display:grid;grid-template-columns:repeat(4,1fr);gap:32px;
}
.hp-stats-item { text-align:center; }
.hp-stats-num {
  font-size:clamp(32px,4vw,52px);font-weight:900;letter-spacing:-.04em;color:var(--navy);line-height:1;
  background:linear-gradient(135deg,#0F52C0,#1D6FE0);-webkit-background-clip:text;
  background-clip:text;-webkit-text-fill-color:transparent;
}
.hp-stats-label { font-size:14px;color:var(--text-2);margin-top:6px;font-weight:500; }
.hp-stats-divider { width:1px;background:var(--line);align-self:stretch;display:none; }

/* ── SERVICES SECTION ── */
.hp-services { padding:96px 0;background:var(--sec-orange-bg); }
.hp-section-head { text-align:center;margin-bottom:56px; }
.hp-section-eyebrow {
  display:inline-block;font-size:12px;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase;color:var(--blue);margin-bottom:14px;
}
.hp-section-head h2 {
  font-size:clamp(28px,3.8vw,50px);font-weight:900;letter-spacing:-.04em;color:var(--navy);
  margin-bottom:16px;line-height:1.06;
}
.hp-section-head p { font-size:16px;color:var(--text-2);max-width:560px;margin:0 auto;line-height:1.7; }
.hp-svc-cats { display:flex;flex-direction:column;gap:14px;max-width:1200px;margin:0 auto;padding:0 28px; }
.hp-svc-cat {
  background:#fff;border:1.5px solid var(--line);border-radius:16px;
  transition:border-color .2s,box-shadow .2s;
  overflow:clip;
}
.hp-svc-cat:hover { border-color:var(--sec-orange-accent);box-shadow:0 8px 32px rgba(249,115,22,.12); }
.hp-svc-cat-head {
  display:flex;align-items:center;gap:12px;padding:18px 20px;cursor:pointer;
  transition:background .15s;
}
.hp-svc-cat-head:hover { background:#FFF3E8; }
.hp-svc-cat-icon {
  width:44px;height:44px;border-radius:10px;background:#FED7AA;
  display:grid;place-items:center;flex:none;
}
.hp-svc-cat-icon svg { width:20px;height:20px;stroke:#C2410C;fill:none;stroke-width:2;flex:none; }
.hp-svc-cat-name { font-size:17px;font-weight:700;color:var(--navy);flex:1; }
.hp-svc-cat-count {
  font-size:12px;font-weight:700;padding:3px 10px;border-radius:99px;
  background:#FED7AA;color:#C2410C;margin-right:8px;
  white-space:nowrap;flex:none;
}
.hp-svc-cat-chev {
  width:20px;height:20px;stroke:var(--text-3);fill:none;stroke-width:2;
  transition:transform .25s cubic-bezier(.2,.7,.3,1);flex:none;
}
.hp-svc-cat.open .hp-svc-cat-chev { transform:rotate(90deg);stroke:var(--blue); }
.hp-svc-cat-body { max-height:0;overflow:hidden;transition:max-height .35s cubic-bezier(.2,.7,.3,1);border-radius:0 0 14px 14px; }
.hp-svc-cat-body.open { max-height:600px; }
.hp-svc-cards {
  display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;
  padding:0 24px 24px;
}
.hp-svc-card {
  display:flex;flex-direction:column;gap:8px;padding:18px;border-radius:12px;
  border:1px solid var(--line);background:#fff;text-decoration:none;
  transition:border-color .15s,background .15s,transform .15s,box-shadow .15s;
}
.hp-svc-card:hover {
  border-color:var(--sec-orange-accent);background:#FFF7F0;
  box-shadow:0 4px 16px rgba(249,115,22,.18);
}
.hp-svc-card-icon { width:36px;height:36px;border-radius:8px;background:#FED7AA;display:grid;place-items:center;flex:none; }
.hp-svc-card-icon svg { width:17px;height:17px;stroke:#C2410C;fill:none;stroke-width:2; }
.hp-svc-card-name { font-size:14px;font-weight:700;color:var(--navy);line-height:1.3; }
.hp-svc-card-desc { font-size:12.5px;color:var(--text-2);line-height:1.5; }
.hp-svc-card-arrow {
  display:flex;align-items:center;gap:4px;font-size:12px;font-weight:600;color:var(--blue);margin-top:auto;
}
.hp-svc-card-arrow svg { width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.5; }
.hp-svc-all-btn { text-align:center;margin-top:36px; }
.hp-svc-all-btn a {
  display:inline-flex;align-items:center;gap:8px;padding:0 28px;height:48px;border-radius:10px;
  border:1.5px solid var(--blue);color:var(--blue);font-weight:700;font-size:14.5px;
  text-decoration:none;transition:background .15s,color .15s;
}
.hp-svc-all-btn a:hover { background:var(--blue);color:#fff; }

/* ── WHY LAUNCHERDESK ── */
.hp-why { padding:96px 0;background:var(--sec-teal-bg); }
.hp-why-grid {
  max-width:1200px;margin:0 auto;padding:0 28px;
  display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;
}
.hp-why-left h2 {
  font-size:clamp(28px,3.6vw,48px);font-weight:900;letter-spacing:-.04em;color:var(--navy);
  margin-bottom:16px;line-height:1.06;
}
.hp-why-left p { font-size:16px;color:var(--text-2);line-height:1.7;margin-bottom:32px;max-width:440px; }
.hp-why-features { display:flex;flex-direction:column;gap:20px; }
.hp-why-feat {
  display:flex;gap:16px;align-items:flex-start;padding:20px;border-radius:14px;
  border:1.5px solid var(--sec-teal-border);background:#fff;transition:border-color .15s,box-shadow .15s;
}
.hp-why-feat:hover { border-color:var(--sec-teal-accent);box-shadow:0 6px 20px rgba(5,150,105,.12); }
.hp-why-feat-icon {
  width:44px;height:44px;border-radius:10px;background:var(--sec-teal-light);
  display:grid;place-items:center;flex:none;
}
.hp-why-feat-icon svg { width:20px;height:20px;stroke:var(--sec-teal-accent);fill:none;stroke-width:2; }
.hp-why-feat h4 { font-size:15px;font-weight:700;color:var(--navy);margin-bottom:4px; }
.hp-why-feat p  { font-size:13.5px;color:var(--text-2);line-height:1.6; }
/* comparison right card */
.hp-vs-card {
  background:var(--navy);border-radius:20px;overflow:hidden;color:#fff;
  box-shadow:0 32px 64px rgba(13,31,60,.25);
}
.hp-vs-head {
  display:grid;grid-template-columns:1fr 1fr;
  border-bottom:1px solid rgba(255,255,255,.08);
}
.hp-vs-col { padding:16px 22px;text-align:center; }
.hp-vs-col.bad { background:rgba(239,68,68,.08); }
.hp-vs-col.good { background:rgba(29,111,224,.12); }
.hp-vs-col-label { font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase; }
.hp-vs-col.bad  .hp-vs-col-label { color:#FCA5A5; }
.hp-vs-col.good .hp-vs-col-label { color:#7ecef4; }
.hp-vs-rows { padding:8px 0; }
.hp-vs-row  {
  display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid rgba(255,255,255,.05);
  padding:0;
}
.hp-vs-row:last-child { border-bottom:0; }
.hp-vs-cell { padding:13px 22px;font-size:13.5px;display:flex;align-items:center;gap:8px; }
.hp-vs-cell.bad  { color:#FCA5A5; }
.hp-vs-cell.good { color:#9ab5d4; }
.hp-vs-cell svg  { width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.5;flex:none; }

/* ── BUSINESS TYPES ── */
.hp-types { padding:96px 0;background:var(--sec-purple-bg); }
.hp-types-grid {
  max-width:1200px;margin:0 auto;padding:0 28px;
  display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:52px;
}
.hp-type-card {
  border-radius:18px;padding:28px 24px;text-decoration:none;
  border:1.5px solid var(--sec-purple-border);background:#fff;
  transition:border-color .2s,box-shadow .2s,transform .2s;position:relative;overflow:hidden;
}
.hp-type-card::before {
  content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,#7C3AED,#A78BFA);opacity:0;transition:opacity .2s;
}
.hp-type-card:hover { border-color:var(--sec-purple-accent);box-shadow:0 12px 36px rgba(124,58,237,.16);transform:translateY(-3px); }
.hp-type-card:hover::before { opacity:1; }
.hp-type-icon {
  width:48px;height:48px;border-radius:12px;
  background:var(--sec-purple-light);
  display:grid;place-items:center;margin-bottom:16px;
}
.hp-type-icon svg { width:24px;height:24px;stroke:var(--sec-purple-accent); }
.hp-type-name { font-size:17px;font-weight:800;color:var(--navy);margin-bottom:8px; }
.hp-type-desc { font-size:13.5px;color:var(--text-2);line-height:1.6;margin-bottom:14px; }
.hp-type-tags { display:flex;flex-wrap:wrap;gap:6px; }
.hp-type-tag  {
  font-size:11px;font-weight:600;padding:3px 9px;border-radius:99px;
  background:var(--sec-purple-light);color:var(--sec-purple-accent);
}
.hp-type-arrow { margin-top:16px;display:flex;align-items:center;gap:4px;font-size:13px;font-weight:600;color:var(--sec-purple-accent); }
.hp-type-arrow svg { width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.5; }

/* ── HOW IT WORKS ── */
.hp-how { padding:96px 0;background:#0D1F3C; }
.hp-how-steps {
  max-width:1200px;margin:0 auto;padding:0 28px;
  display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:52px;
}
.hp-how-step {
  padding:28px;border-radius:18px;border:1.5px solid rgba(255,255,255,.1);
  background:rgba(255,255,255,.05);position:relative;
  transition:border-color .2s,background .2s;
}
.hp-how-step:hover { border-color:rgba(59,143,239,.5);background:rgba(29,111,224,.1); }
.hp-how-num {
  font-size:clamp(42px,5vw,64px);font-weight:900;letter-spacing:-.04em;
  line-height:1;margin-bottom:16px;
  background:linear-gradient(135deg,#3B8FEF,#7ecef4);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
}
.hp-how-step h4 { font-size:16px;font-weight:800;color:#fff;margin-bottom:8px; }
.hp-how-step p  { font-size:13.5px;color:#9ab5d4;line-height:1.6; }
.hp-how-connector {
  position:absolute;top:50%;right:-12px;width:24px;height:2px;
  background:linear-gradient(90deg,#3B8FEF,rgba(59,143,239,.3));z-index:1;
}

/* ── RESOURCES ── */
.hp-resources { padding:96px 0;background:var(--sec-amber-bg); }
.hp-res-grid {
  max-width:1200px;margin:0 auto;padding:0 28px;
  display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:52px;
}
.hp-res-card {
  background:#fff;border-radius:16px;border:1.5px solid var(--line);overflow:hidden;
  text-decoration:none;transition:border-color .2s,box-shadow .2s,transform .2s;display:flex;flex-direction:column;
}
.hp-res-card:hover { border-color:var(--blue);box-shadow:0 10px 30px rgba(29,111,224,.12);transform:translateY(-3px); }
.hp-res-card-thumb { height:7px;background:linear-gradient(90deg,#D97706,#F59E0B,#FCD34D); }
.hp-res-card-body { padding:24px;flex:1;display:flex;flex-direction:column; }
.hp-res-cat {
  font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:var(--sec-amber-accent);margin-bottom:10px;
}
.hp-res-title { font-size:16px;font-weight:800;color:var(--navy);margin-bottom:8px;line-height:1.3; }
.hp-res-desc  { font-size:13.5px;color:var(--text-2);line-height:1.6;flex:1; }
.hp-res-link  {
  display:flex;align-items:center;gap:5px;font-size:13px;font-weight:700;color:var(--blue);margin-top:16px;
}
.hp-res-link svg { width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.5; }

/* ── MARQUEE ── */
.hp-marquee-wrap {
  background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  padding:14px 0;overflow:hidden;position:relative;
}
.hp-marquee-wrap::before,.hp-marquee-wrap::after {
  content:'';position:absolute;top:0;bottom:0;width:80px;z-index:2;
}
.hp-marquee-wrap::before{left:0;background:linear-gradient(to right,#fff,transparent)}
.hp-marquee-wrap::after{right:0;background:linear-gradient(to left,#fff,transparent)}
.hp-marquee-track {
  display:flex;gap:0;width:max-content;
  animation:marquee-scroll 30s linear infinite;
}
.hp-marquee-wrap:hover .hp-marquee-track { animation-play-state:paused }
@keyframes marquee-scroll {
  from { transform:translateX(0) }
  to   { transform:translateX(-50%) }
}
.hp-marquee-item {
  display:inline-flex;align-items:center;gap:10px;
  padding:0 28px;white-space:nowrap;
  font-size:13.5px;font-weight:600;color:var(--navy);
}
.hp-marquee-dot {
  width:5px;height:5px;border-radius:50%;background:var(--blue);flex:none;opacity:.5;
}
.hp-faq { padding:96px 0;background:var(--sec-sky-bg); }
.hp-faq-inner { max-width:800px;margin:0 auto;padding:0 28px; }
.hp-faq-list  { display:flex;flex-direction:column;margin-top:52px; }
.hp-faq-item  { border-bottom:1px solid var(--line); }
.hp-faq-item:first-child { border-top:1px solid var(--line); }
.hp-faq-q {
  display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:22px 0;cursor:pointer;transition:color .15s;
}
.hp-faq-q:hover .hp-faq-q-text { color:var(--blue); }
.hp-faq-q-text { font-size:16.5px;font-weight:700;color:var(--navy);line-height:1.4;flex:1; }
.hp-faq-icon  { width:24px;height:24px;border-radius:6px;background:var(--sec-sky-light);display:grid;place-items:center;flex:none; }
.hp-faq-icon svg { width:14px;height:14px;stroke:var(--sec-sky-accent);fill:none;stroke-width:2.5;transition:transform .25s; }
.hp-faq-item:hover .hp-faq-a { max-height:320px; }
.hp-faq-item:hover .hp-faq-icon svg { transform:rotate(45deg); }
.hp-faq-a     { max-height:0;overflow:hidden;transition:max-height .55s cubic-bezier(.2,.7,.3,1); }
.hp-faq-a-inner { padding:0 0 20px;font-size:14.5px;color:var(--text-2);line-height:1.72; }

/* ── FINAL CTA ── */
.hp-cta-section { padding:96px 0;background:linear-gradient(135deg,#0D1F3C 0%,#1a1060 40%,#0F52C0 100%); }
.hp-cta-card {
  max-width:1200px;margin:0 auto;padding:0 28px;
}
.hp-cta-inner {
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
  border-radius:24px;padding:clamp(48px,6vw,80px);text-align:center;
  box-shadow:0 40px 80px rgba(0,0,0,.3);position:relative;overflow:hidden;
  backdrop-filter:blur(12px);
}
.hp-cta-inner::before {
  content:'';position:absolute;inset:0;
  background:radial-gradient(700px 400px at 50% -20%,rgba(59,143,239,.25),transparent 60%);
  pointer-events:none;
}
.hp-cta-inner h2 {
  font-size:clamp(28px,4vw,52px);font-weight:900;letter-spacing:-.04em;color:#fff;
  margin-bottom:16px;position:relative;
}
.hp-cta-inner p {
  font-size:clamp(15px,1.8vw,18px);color:#9ab5d4;max-width:540px;
  margin:0 auto 40px;line-height:1.7;position:relative;
}
.hp-cta-btns { display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative; }
.hp-cta-btn-wa {
  display:inline-flex;align-items:center;gap:10px;height:54px;padding:0 32px;
  background:#25D366;color:#fff;font-weight:700;font-size:15.5px;border-radius:12px;
  text-decoration:none;transition:background .15s,transform .15s;
}
.hp-cta-btn-wa:hover { background:#1faa59;transform:translateY(-2px); }
.hp-cta-btn-exp {
  display:inline-flex;align-items:center;gap:10px;height:54px;padding:0 28px;
  background:rgba(255,255,255,.12);color:#fff;font-weight:600;font-size:15px;border-radius:12px;
  border:1.5px solid rgba(255,255,255,.2);text-decoration:none;transition:background .15s;
}
.hp-cta-btn-exp:hover { background:rgba(255,255,255,.2); }

/* ── LIFECYCLE ACCORDION (reused from original) ── */
.lc2-section{background:var(--sec-teal-bg);padding:96px 0}
.lc2-inner{display:grid;grid-template-columns:1fr 1.15fr;gap:72px;align-items:start;max-width:1200px;margin:0 auto;padding:0 28px}
.lc2-left{position:sticky;top:92px}
.lc2-left .eyebrow{margin-bottom:14px;display:block}
.lc2-heading{font-size:clamp(26px,3.4vw,44px);font-weight:900;letter-spacing:-.04em;line-height:1.06;margin-bottom:18px}
.lc2-desc{font-size:16px;color:var(--text-2);line-height:1.7;max-width:360px;margin-bottom:28px}
.lc2-list{display:flex;flex-direction:column}
.lc2-item{border-top:1px solid var(--line);overflow:hidden}
.lc2-item:last-child{border-bottom:1px solid var(--line)}
.lc2-trigger{width:100%;background:none;border:0;cursor:pointer;display:grid;grid-template-columns:44px 1fr 28px;align-items:center;gap:12px;padding:20px 4px;text-align:left;transition:background .15s;border-radius:0}
.lc2-trigger:hover{background:rgba(5,150,105,.06)}
.lc2-num{font-family:var(--font);font-weight:800;font-size:14px;color:var(--sec-teal-accent);opacity:.45;transition:opacity .25s,color .25s;line-height:1}
.lc2-name{font-family:var(--font);font-weight:700;font-size:clamp(17px,2vw,21px);color:var(--navy);transition:color .25s;line-height:1}
.lc2-chevron{width:20px;height:20px;stroke:var(--text-3);fill:none;stroke-width:2;transition:transform .28s cubic-bezier(.2,.7,.3,1),stroke .2s;flex:none}
.lc2-item.lc2-open .lc2-trigger{background:rgba(5,150,105,.06)}
.lc2-item.lc2-open .lc2-num{opacity:1;color:var(--sec-teal-accent)}
.lc2-item.lc2-open .lc2-name{color:var(--sec-teal-accent)}
.lc2-item.lc2-open .lc2-chevron{transform:rotate(90deg);stroke:var(--sec-teal-accent)}
.lc2-body{max-height:0;overflow:hidden;transition:max-height .38s cubic-bezier(.2,.7,.3,1),opacity .3s;opacity:0}
.lc2-item.lc2-open .lc2-body{opacity:1}
.lc2-body-inner{padding:0 4px 22px 56px;display:flex;flex-direction:column;gap:10px}
.lc2-body-desc{font-size:14px;color:var(--text-2);line-height:1.65;margin-bottom:4px}
.lc2-chips{display:flex;flex-wrap:wrap;gap:8px}
.lc2-chip{display:inline-flex;align-items:center;gap:7px;font-family:var(--font);font-weight:600;font-size:13px;color:var(--navy);background:#fff;border:1.5px solid var(--line);border-radius:99px;padding:7px 14px;text-decoration:none;transition:border-color .14s,background .14s,color .14s,transform .14s,box-shadow .14s}
.lc2-chip:hover{border-color:var(--blue);color:var(--blue-dark);background:rgba(29,111,224,.06);transform:translateY(-1px);box-shadow:0 4px 12px rgba(29,111,224,.15)}
.lc2-prog{height:2px;background:transparent;position:relative;margin:0 4px}
.lc2-prog-bar{height:100%;width:0;background:linear-gradient(90deg,var(--blue-dark),var(--blue-bright));border-radius:2px;transition:width linear}

/* ── RESPONSIVE ── */
@media(max-width:1040px){
  .hp-hero-grid  { grid-template-columns:1fr;gap:48px }
  .hp-dash-card  { display:none }
  .hp-why-grid   { grid-template-columns:1fr;gap:48px }
  .hp-types-grid { grid-template-columns:1fr 1fr }
  .hp-how-steps  { grid-template-columns:1fr 1fr;gap:20px }
  .hp-res-grid   { grid-template-columns:1fr 1fr }
  .lc2-inner     { grid-template-columns:1fr;gap:36px }
  .lc2-left      { position:static }
}
@media(max-width:768px){
  .hp-stats-grid { grid-template-columns:1fr 1fr;gap:24px }
  .hp-types-grid { grid-template-columns:1fr 1fr }
  .hp-how-steps  { grid-template-columns:1fr 1fr }
  .hp-res-grid   { grid-template-columns:1fr }
  .hp-svc-cards  { grid-template-columns:1fr }
  .hp-vs-card    { display:none }
  .hp-why-grid   { gap:32px }
  .lc2-inner     { gap:28px }
}
@media(max-width:640px){
  .hp-hero       { padding:56px 0 48px }
  .hp-hero h1    { font-size:clamp(30px,8vw,44px) }
  .hp-cta-row    { flex-direction:column;align-items:stretch }
  .hp-btn-primary,.hp-btn-secondary { width:100%;justify-content:center }
  .hp-stats-grid { grid-template-columns:1fr 1fr }
  .hp-stats-num  { font-size:clamp(28px,7vw,40px) }
  .hp-services,.hp-why,.hp-types,.hp-how,.hp-resources,.hp-faq,.hp-cta-section,.lc2-section { padding:64px 0 }
  .hp-types-grid,.hp-how-steps { grid-template-columns:1fr }
  .hp-how-connector { display:none }
  .hp-cta-inner  { border-radius:16px;padding:40px 24px }
  .hp-cta-btns   { flex-direction:column;align-items:center }
  .hp-cta-btn-wa,.hp-cta-btn-exp { width:100%;justify-content:center }
  .lc2-body-inner{ padding:0 4px 18px 44px }
  .lc2-trigger   { grid-template-columns:36px 1fr 24px;gap:8px }
}
@media(max-width:480px){
  .hp-stats-grid { grid-template-columns:1fr 1fr }
  .lc2-inner     { padding:0 16px }
  .hp-section-head h2 { font-size:clamp(24px,7vw,36px) }
}
@media(prefers-reduced-motion:reduce){
  .lc2-prog-bar  { transition:none!important }
}
`

/* ── DATA ─────────────────────────────────────────────────── */
const STAGES = [
  {
    id:'idea', num:'01', name:'Idea & Research',
    desc:'Turn your idea into a validated business concept. We help you choose the right structure before you file anything.',
    chips:[ {l:'Entity Comparison',h:'/services/private-limited-company-registration'},{l:'Service Finder',h:'/services'},{l:'LauncherDesk AI',h:'/ai'} ]
  },
  {
    id:'start', num:'02', name:'Register & Incorporate',
    desc:'Get your business legally registered with the right entity — Private Limited, LLP, OPC or Partnership.',
    chips:[ {l:'Pvt Ltd Registration',h:'/services/private-limited-company-registration'},{l:'LLP Registration',h:'/services/llp-registration'},{l:'OPC Registration',h:'/services/opc-registration'},{l:'Partnership Firm',h:'/services/partnership-registration'} ]
  },
  {
    id:'build', num:'03', name:'Licences & Compliance',
    desc:'Get GST, MSME, FSSAI, trademark and every licence you need — without chasing government portals yourself.',
    chips:[ {l:'GST Registration',h:'/services/gst-registration'},{l:'Trademark',h:'/services/trademark-registration'},{l:'MSME / Udyam',h:'/services/msme-registration'},{l:'FSSAI',h:'/services/fssai-registration'} ]
  },
  {
    id:'manage', num:'04', name:'Finance & Accounts',
    desc:'Bookkeeping, payroll, ITR filing and ROC annual compliance — all handled proactively so deadlines never slip.',
    chips:[ {l:'Accounting',h:'/services/accounting'},{l:'Payroll',h:'/services/payroll'},{l:'ROC Compliance',h:'/services/roc-compliance'} ]
  },
  {
    id:'grow', num:'05', name:'Technology & Growth',
    desc:'Website, CRM, automation, digital marketing and brand identity — everything you need to get found and grow.',
    chips:[ {l:'Website Development',h:'/services/website-development'},{l:'Digital Marketing',h:'/services/digital-marketing'},{l:'Business Automation',h:'/services/business-automation'} ]
  },
  {
    id:'expand', num:'06', name:'International Expansion',
    desc:'UAE setup, fundraising documentation and business consulting for businesses ready to go beyond India.',
    chips:[ {l:'UAE Business Setup',h:'/services/uae-business-setup'},{l:'Fundraising Docs',h:'/services/fundraising-documentation'},{l:'Business Consulting',h:'/services/business-consulting'} ]
  },
]

const SVC_CATS = [
  {
    name:'Company Registration', icon:'M3 21h18M6 21V7l6-4 6 4v14', count:4,
    services:[
      {href:'/services/private-limited-company-registration',icon:'M3 21h18M6 21V7l6-4 6 4v14',name:'Private Limited Company',desc:'The standard for funded startups — limited liability, fundraising-ready.'},
      {href:'/services/llp-registration',icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',name:'LLP Registration',desc:'Partner-run firms wanting limited liability with lighter compliance.'},
      {href:'/services/opc-registration',icon:'M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a6 6 0 0 1 12 0v1',name:'OPC Registration',desc:'One-person companies with limited liability for solo founders.'},
      {href:'/services/partnership-registration',icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87',name:'Partnership Firm',desc:'Simple, lowest-cost registration for small owner-operated businesses.'},
    ]
  },
  {
    name:'Licences & Registrations', icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6', count:5,
    services:[
      {href:'/services/gst-registration',icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',name:'GST Registration & Filing',desc:'GSTIN + ongoing return filing so you never miss a deadline.'},
      {href:'/services/msme-registration',icon:'M9 11l3 3L22 4',name:'MSME / Udyam Registration',desc:'Unlock collateral-free loans, subsidies and payment protection.'},
      {href:'/services/fssai-registration',icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',name:'FSSAI Registration',desc:'Mandatory for all food businesses — we identify the right tier.'},
      {href:'/services/trademark-registration',icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',name:'Trademark Registration',desc:'Protect your brand name, logo and tagline across the right classes.'},
      {href:'/services/roc-compliance',icon:'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',name:'ROC & Annual Compliance',desc:'Annual filings for companies and LLPs — tracked proactively.'},
    ]
  },
  {
    name:'Finance & Accounts', icon:'M4 21V10M10 21V4M16 21v-8M22 21H2', count:3,
    services:[
      {href:'/services/accounting',icon:'M4 21V10M10 21V4M16 21v-8M22 21H2',name:'Accounting & Bookkeeping',desc:'Monthly books that stay tax-ready — not scrambled at year-end.'},
      {href:'/services/payroll',icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',name:'Payroll Management',desc:'Salary processing, PF, ESI, TDS and payslips — every month.'},
      {href:'/services/roc-compliance',icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',name:'ITR & Tax Filing',desc:'Income tax returns backed by accurate, up-to-date books.'},
    ]
  },
  {
    name:'Technology & IT', icon:'M2 3h20v14H2zM8 21h8M12 17v4', count:4,
    services:[
      {href:'/services/website-development',icon:'M2 3h20v14H2zM8 21h8M12 17v4',name:'Website Development',desc:'Mobile-first business websites, e-commerce stores and portals.'},
      {href:'/services/business-automation',icon:'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',name:'Business Automation',desc:'CRM setup, workflow automation and operational systems.'},
      {href:'/services/digital-marketing',icon:'M23 6l-9.5 9.5-5-5L1 18',name:'Digital Marketing',desc:'SEO, Google Ads, social media and branding for real growth.'},
      {href:'/services/website-development',icon:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',name:'WhatsApp Business API',desc:'Official Meta API for bulk messaging and automation.'},
    ]
  },
]

const BIZ_TYPES = [
  {icon:'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18|M16 10a4 4 0 0 1-8 0',name:'E-commerce',desc:'Sell online with the right structure, GST, trademark and a converting storefront.',href:'/business-types/ecommerce',tags:['Pvt Ltd','GST','Trademark','Website']},
  {icon:'M18 8h1a4 4 0 0 1 0 8h-1|M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z|M6 1v3|M10 1v3|M14 1v3',name:'Restaurant & Food',desc:'FSSAI, GST and entity setup before you open — not after the inspector visits.',href:'/business-types/restaurant',tags:['FSSAI','Entity Setup','GST','Payroll']},
  {icon:'M2 3h20v14H2z|M8 21h8|M12 17v4',name:'Technology / SaaS',desc:'Investor-ready structure, IP protection and the clean compliance record funding rounds require.',href:'/business-types/technology',tags:['Pvt Ltd','Trademark','ROC','Accounting']},
  {icon:'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z|M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',name:'Consulting',desc:'Lightweight structure, clean invoicing and GST handled from day one.',href:'/business-types/consulting',tags:['OPC / LLP','GST','MSME','Trademark']},
  {icon:'M2 20h20|M6 20V10|M12 20V4|M18 20v-6|M6 10l6-6 6 6',name:'Manufacturing',desc:'Entity, GST, MSME and payroll for production businesses with real compliance layers.',href:'/business-types/manufacturing',tags:['Pvt Ltd','GST','MSME','ROC']},
  {icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10',name:'Retail',desc:'Shop registration, GST and inventory-aware accounting for single or multi-location stores.',href:'/business-types/retail',tags:['Entity Setup','GST','Accounting','Trademark']},
]

const WHY_FEATURES = [
  {icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10',title:'One point of contact',desc:'Tell us once. We coordinate every service — no repeating your story to five different vendors.'},
  {icon:'M9 11l3 3L22 4|M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',title:'We own it start to finish',desc:'From first call to final filing — LauncherDesk takes accountability for the outcome, not just the paperwork.'},
  {icon:'M12 2v20|M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',title:'Transparent pricing',desc:'No padded bundles. Every quote separates professional fee, government fee and taxes — shown clearly upfront.'},
  {icon:'M23 6l-9.5 9.5-5-5L1 18',title:'Proactive reminders',desc:'We track your deadlines and notify you before they become penalties. Nothing falls through the cracks.'},
]

const VS_ROWS = [
  {bad:'Five vendors, five invoices',good:'One team, one invoice'},
  {bad:'Nobody owns the outcome',good:'We own it start to finish'},
  {bad:'Repeat your story every time',good:'Tell us once, we coordinate'},
  {bad:'Deadlines slip through the cracks',good:'Proactive reminders — nothing missed'},
  {bad:'Discover problems after the fact',good:'Proactive advice at every step'},
]

const FAQS = [
  {q:'How quickly can LauncherDesk register my company?',a:'Private Limited and LLP registration typically takes 7–14 working days once all documents are in order, subject to MCA processing times. Some licences like MSME/Udyam can be same-day. We give you realistic timelines upfront — not optimistic guesses.'},
  {q:'Do I need to visit your office to get started?',a:'No. Everything is handled digitally — document collection, verification and filing. Most founders complete their entire registration without visiting any office.'},
  {q:'How is LauncherDesk different from doing it myself or using a CA?',a:'A CA typically handles one function (tax or compliance). LauncherDesk coordinates across registration, compliance, technology and growth — through one point of contact. No handoffs, no gaps.'},
  {q:'What does "transparent pricing" actually mean?',a:'Every quote we send separates the professional fee (what LauncherDesk charges), the government fee (MCA, stamp duty, etc.) and taxes (GST on the professional fee). We never bundle these into a single headline number.'},
  {q:'Can LauncherDesk help after registration too?',a:'Yes — that\'s the core of what we do. Registration is just the beginning. We support ongoing compliance, accounting, payroll, IT and growth as your business scales.'},
  {q:'I already have a company but need help with compliance. Can you help?',a:'Absolutely. We regularly onboard businesses mid-journey — taking over backlogged filings, compliance catch-up, accounting and ongoing support. You don\'t need to have started with us.'},
]

const HOW_STEPS = [
  {num:'01',title:'Tell us what you need',desc:'One conversation with a single point of contact — no call centres, no runaround.'},
  {num:'02',title:'Get a clear plan & quote',desc:'Honest timelines and upfront pricing, broken down so you always know what you\'re paying for.'},
  {num:'03',title:'We handle the paperwork',desc:'Filings, follow-ups and coordination across every service — done for you.'},
  {num:'04',title:'Stay supported as you grow',desc:'Ongoing compliance and support so nothing slips through the cracks.'},
]

const RESOURCES = [
  {cat:'Guide',title:'Which company structure is right for you?',desc:'Private Limited, LLP, OPC or Proprietorship — a plain-English breakdown of what each means for your business.',href:'/resources/guides'},
  {cat:'Blog',title:'GST registration: everything a new business owner needs to know',desc:'Who needs it, what it costs, how long it takes, and what happens if you miss the threshold.',href:'/resources/blog'},
  {cat:'Tools',title:'Service Finder',desc:'Answer five questions and get a personalised list of the registrations and services your business actually needs.',href:'/services'},
]

/* ── COMPONENT ────────────────────────────────────────────── */
export default function HomePage() {

  // Lifecycle accordion
  const STAGE_IDS = STAGES.map(s => s.id)
  const DURATION  = 4000  // ms each stage stays open
  const [openStage, setOpenStage] = useState('start')
  const [paused,    setPaused]    = useState(false)
  const timerRef  = useRef(null)
  const rafRef    = useRef(null)

  const advanceTo = (id) => {
    setOpenStage(id)
    setPaused(false)
  }

  const toggleStage = (id) => {
    if (openStage === id) {
      setPaused(p => !p)          // clicking active stage pauses/resumes
    } else {
      setOpenStage(id)
      setPaused(false)
    }
  }

  // Auto-advance: when a stage opens and is not paused, run timer then go next
  useEffect(() => {
    // Animate the progress bar for the open stage
    STAGE_IDS.forEach(id => {
      const el = document.querySelector(`[data-prog="${id}"]`)
      if (!el) return
      if (id === openStage && !paused) {
        el.style.transition = `width ${DURATION}ms linear`
        requestAnimationFrame(() => { el.style.width = '100%' })
      } else {
        el.style.transition = 'none'
        el.style.width = '0%'
      }
    })

    if (paused || !openStage) return

    // Advance to next stage after DURATION
    timerRef.current = setTimeout(() => {
      const idx  = STAGE_IDS.indexOf(openStage)
      const next = STAGE_IDS[(idx + 1) % STAGE_IDS.length]
      setOpenStage(next)
    }, DURATION)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [openStage, paused])

  // Service category accordion
  const [openCat, setOpenCat] = useState(0)

  return (
    <>
      <style>{S}</style>

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section className="hp-hero">
        <div className="hp-hero-inner">
          <div className="hp-hero-grid">
            <div>
              <div className="hp-eyebrow">
                <span className="hp-eyebrow-dot"/>
                India's 360° Business Platform
              </div>
              <h1>
                Register your company.<br/>
                <em>Run it all from one desk.</em>
              </h1>
              <p className="hp-hero-desc">
                From Private Limited and LLP registration to GST, compliance, IT and finance —
                LauncherDesk handles everything through a single point of contact.
              </p>
              <div className="hp-cta-row">
                <a href="https://wa.me/918548854859" className="hp-btn-primary" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                <Link to="/services" className="hp-btn-secondary">
                  Explore Services
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
              <div className="hp-trust-pills">
                {['20+ Businesses Launched','15+ Service Categories','One Point of Contact','Bengaluru-based'].map(t => (
                  <div key={t} className="hp-trust-pill">
                    <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero right — stats dashboard */}
            <div className="hp-dash-card">
              <div className="hp-dash-head">
                <div className="hp-dash-title">LauncherDesk Business HQ</div>
                <span className="hp-dash-badge">● Live</span>
              </div>
              <div className="hp-stat-row">
                <div className="hp-stat-box"><div className="n">20+</div><div className="l">Businesses</div></div>
                <div className="hp-stat-box"><div className="n">15+</div><div className="l">Categories</div></div>
                <div className="hp-stat-box"><div className="n">1</div><div className="l">Contact</div></div>
              </div>
              <div style={{marginBottom:12,fontSize:12,fontWeight:600,color:'#8496AB',letterSpacing:'.06em',textTransform:'uppercase'}}>Services we cover</div>
              <div className="hp-svc-chips">
                {['Pvt Ltd Registration','GST Filing','Trademark','Payroll','Website Dev','ROC Compliance','MSME','Digital Marketing','Accounting'].map(s=>(
                  <span key={s} className="hp-svc-chip">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ════════════════════════════════════ */}
      <section className="hp-stats">
        <div className="hp-stats-grid">
          {[
            {num:'20+',label:'Businesses launched across India'},
            {num:'15+', label:'Service categories covered'},
            {num:'360°',label:'Complete business solutions'},
            {num:'1',   label:'Single point of contact'},
          ].map(s=>(
            <div key={s.num} className="hp-stats-item">
              <div className="hp-stats-num">{s.num}</div>
              <div className="hp-stats-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES MARQUEE ════════════════════════════════ */}
      {(() => {
        const items = [
          'Private Limited Registration','GST Registration','Trademark Filing','LLP Registration',
          'Website Development','MSME / Udyam','ROC Compliance','Accounting & Bookkeeping',
          'ISO Certification','Digital Marketing','Payroll Management','E-Stamp Services',
          'Income Tax Filing','Brand Identity Design','WhatsApp Business API','Startup India',
          'One Person Company','Social Media Management','Mobile App Development','OPC Registration',
        ]
        const all = [...items, ...items]
        return (
          <div className="hp-marquee-wrap">
            <div className="hp-marquee-track">
              {all.map((s, i) => (
                <span key={i} className="hp-marquee-item">
                  <span className="hp-marquee-dot"/>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )
      })()}

      {/* ═══ SERVICES ═══════════════════════════════════════ */}
      <section className="hp-services">
        <div className="hp-section-head">
          <div className="hp-section-eyebrow" style={{color:'#F97316'}}>Our Services</div>
          <h2>Everything your business needs,<br/>in one place.</h2>
          <p>From the first filing to ongoing compliance, technology and growth — all coordinated through LauncherDesk.</p>
        </div>
        <div className="hp-svc-cats">
          {SVC_CATS.map((cat, ci) => (
            <div key={cat.name} className={`hp-svc-cat${openCat===ci?' open':''}`}>
              <div className="hp-svc-cat-head" onClick={()=>setOpenCat(openCat===ci?-1:ci)}>
                <div className="hp-svc-cat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {cat.icon.split('|').map((p,i)=><path key={i} d={p}/>)}
                  </svg>
                </div>
                <div className="hp-svc-cat-name">{cat.name}</div>
                <span className="hp-svc-cat-count">{cat.count} services</span>
                <svg className="hp-svc-cat-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
              <div className={`hp-svc-cat-body${openCat===ci?' open':''}`}>
                <div className="hp-svc-cards">
                  {cat.services.map(svc=>(
                    <Link key={svc.name} to={svc.href} className="hp-svc-card">
                      <div className="hp-svc-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          {svc.icon.split('|').map((p,i)=><path key={i} d={p}/>)}
                        </svg>
                      </div>
                      <div className="hp-svc-card-name">{svc.name}</div>
                      <div className="hp-svc-card-desc">{svc.desc}</div>
                      <div className="hp-svc-card-arrow">
                        Learn more
                        <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hp-svc-all-btn">
          <Link to="/services">
            View all services
            <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ═══ WHY LAUNCHERDESK ════════════════════════════════ */}
      <section className="hp-why">
        <div className="hp-why-grid">
          <div className="hp-why-left">
            <div className="hp-section-eyebrow" style={{textAlign:'left',display:'block',marginBottom:14,color:'#059669'}}>Why LauncherDesk</div>
            <h2>One desk beats multiple vendors.</h2>
            <p>Most founders waste months juggling CAs, lawyers, web agencies and consultants — each one solving only their piece. LauncherDesk coordinates the whole picture.</p>
            <div className="hp-why-features">
              {WHY_FEATURES.map(f=>(
                <div key={f.title} className="hp-why-feat">
                  <div className="hp-why-feat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      {f.icon.split('|').map((p,i)=><path key={i} d={p}/>)}
                    </svg>
                  </div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="hp-vs-card">
              <div className="hp-vs-head">
                <div className="hp-vs-col bad"><div className="hp-vs-col-label">The Usual Way</div></div>
                <div className="hp-vs-col good"><div className="hp-vs-col-label">The LauncherDesk Way</div></div>
              </div>
              <div className="hp-vs-rows">
                {VS_ROWS.map((r,i)=>(
                  <div key={i} className="hp-vs-row">
                    <div className="hp-vs-cell bad">
                      <svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                      {r.bad}
                    </div>
                    <div className="hp-vs-cell good">
                      <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                      {r.good}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LIFECYCLE ACCORDION ════════════════════════════ */}
      <section className="lc2-section">
        <div className="lc2-inner">
          <div className="lc2-left">
            <span className="eyebrow" style={{color:'#059669'}}>Your business journey</span>
            <h2 className="lc2-heading">Incorporation is just the start.<br/>We run the whole business.</h2>
            <p className="lc2-desc">Building and scaling a company takes expertise across registrations, compliance, IT, finance, legal and marketing. LauncherDesk replaces multiple vendors with a single integrated platform.</p>
            <Link to="/services" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 22px',borderRadius:9,background:'var(--blue)',color:'#fff',fontWeight:700,fontSize:14,textDecoration:'none'}}>
              Explore all services
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="lc2-list">
            {STAGES.map(s=>(
              <div key={s.id} className={`lc2-item${openStage===s.id?' lc2-open':''}`}>
                <button className="lc2-trigger" onClick={()=>toggleStage(s.id)}
                  title={openStage===s.id ? (paused?'Click to resume':'Click to pause') : 'Click to open'}>
                  <span className="lc2-num">{s.num}</span>
                  <span className="lc2-name">{s.name}</span>
                  {openStage===s.id && paused
                    ? <svg className="lc2-chevron" viewBox="0 0 24 24" style={{stroke:'var(--blue)'}}><path d="M10 9v6m4-6v6"/></svg>
                    : <svg className="lc2-chevron" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                  }
                </button>
                <div className="lc2-body" style={{maxHeight: openStage===s.id ? '400px':'0'}}>
                  <div className="lc2-body-inner">
                    <p className="lc2-body-desc">{s.desc}</p>
                    <div className="lc2-chips">
                      {s.chips.map(c=><Link key={c.l} to={c.h} className="lc2-chip">{c.l}</Link>)}
                    </div>
                  </div>
                  <div className="lc2-prog"><div className="lc2-prog-bar" data-prog={s.id}/></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BUSINESS TYPES ══════════════════════════════════ */}
      <section className="hp-types">
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
          <div className="hp-section-head">
            <div className="hp-section-eyebrow" style={{color:'#7C3AED'}}>Business Types</div>
            <h2>Built for your kind of business.</h2>
            <p>Every business type has a different compliance and growth journey. LauncherDesk knows the path for each one.</p>
          </div>
          <div className="hp-types-grid">
            {BIZ_TYPES.map(b=>(
              <Link key={b.name} to={b.href} className="hp-type-card">
                <div className="hp-type-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    {b.icon.split('|').map((p,i)=><path key={i} d={p}/>)}
                  </svg>
                </div>
                <div className="hp-type-name">{b.name}</div>
                <div className="hp-type-desc">{b.desc}</div>
                <div className="hp-type-tags">{b.tags.map(t=><span key={t} className="hp-type-tag">{t}</span>)}</div>
                <div className="hp-type-arrow">
                  See the journey
                  <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ════════════════════════════════════ */}
      <section className="hp-how">
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
          <div className="hp-section-head">
            <div className="hp-section-eyebrow" style={{color:'#7ecef4'}}>How it works</div>
            <h2 style={{color:'#fff'}}>One conversation.<br/>We take it from there.</h2>
            <p style={{color:'#9ab5d4'}}>No portals to navigate, no consultants to chase. Tell us what you need and LauncherDesk handles the rest.</p>
          </div>
          <div className="hp-how-steps">
            {HOW_STEPS.map((s,i)=>(
              <div key={s.num} className="hp-how-step">
                <div className="hp-how-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                {i < HOW_STEPS.length-1 && <div className="hp-how-connector"/>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESOURCES ═══════════════════════════════════════ */}
      <section className="hp-resources">
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
          <div className="hp-section-head">
            <div className="hp-section-eyebrow" style={{color:'#D97706'}}>Resources</div>
            <h2>Know more. Decide better.</h2>
            <p>Practical guides and tools for founders and business owners across India.</p>
          </div>
          <div className="hp-res-grid">
            {RESOURCES.map(r=>(
              <Link key={r.title} to={r.href} className="hp-res-card">
                <div className="hp-res-card-thumb"/>
                <div className="hp-res-card-body">
                  <div className="hp-res-cat">{r.cat}</div>
                  <div className="hp-res-title">{r.title}</div>
                  <div className="hp-res-desc">{r.desc}</div>
                  <div className="hp-res-link">
                    Read more
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:36}}>
            <Link to="/resources" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'0 28px',height:48,borderRadius:10,border:'1.5px solid var(--blue)',color:'var(--blue)',fontWeight:700,fontSize:14.5,textDecoration:'none'}}>
              View all resources
              <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ══════════════════════════════════════════════ */}
      <section className="hp-faq">
        <div className="hp-faq-inner">
          <div className="hp-section-head">
            <div className="hp-section-eyebrow" style={{color:'#0284C7'}}>FAQ</div>
            <h2>Frequently asked questions.</h2>
            <p>Answers to the questions founders ask us every day.</p>
          </div>
          <div className="hp-faq-list">
            {FAQS.slice(0, 4).map((f, i) => (
              <div key={i} className="hp-faq-item">
                <div className="hp-faq-q">
                  <div className="hp-faq-q-text">{f.q}</div>
                  <div className="hp-faq-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                  </div>
                </div>
                <div className="hp-faq-a">
                  <div className="hp-faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:36}}>
            <Link to="/resources/faq" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'0 28px',height:48,borderRadius:10,background:'var(--blue)',color:'#fff',fontWeight:700,fontSize:14.5,textDecoration:'none',boxShadow:'0 6px 20px rgba(29,111,224,.3)'}}>
              View more
              <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ════════════════════════════════════════ */}
      <section className="hp-cta-section">
        <div className="hp-cta-card">
          <div className="hp-cta-inner">
            <h2>Ready to get everything under one roof?</h2>
            <p>One chat is all it takes. Tell us what your business needs and we'll handle the rest — honestly, and on time.</p>
            <div className="hp-cta-btns">
              <a href="https://wa.me/918548854859" className="hp-cta-btn-wa" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <Link to="/company/contact" className="hp-cta-btn-exp">
                Book a consultation
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}