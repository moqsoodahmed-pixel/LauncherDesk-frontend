import { useEffect, useRef, useState } from 'react'
import logoImg from '../assets/launcherdesk-logo-transparent.png'
import { Link } from 'react-router-dom'
import SEO, { organizationSchema, websiteSchema } from '../components/SEO'
import HeroVisual from '../components/HeroVisual'
import heroBgImg from '../assets/hero_executive_bg.png'
import { CaseStudiesSection } from '../components/trust/ProofSection'
import ContextualCta from '../components/trust/ContextualCta'
import { CTA_EVENTS, trackCta } from '../data/cta'

/* ─── Inline styles for the redesigned homepage ──────────────────────── */
const S = `

/* ── HERO ── */
.hp-hero {
  background: transparent;
  position: relative; overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  scroll-margin-top: 100px;
  min-height: 520px;
}
.hp-hero::before {
  content: '';position:absolute;inset:0;pointer-events:none;
  background: radial-gradient(800px 500px at 68% 18%, rgba(56, 189, 248, 0.04), transparent 70%);
}
.hp-hero-inner { max-width:1440px;margin:0 auto;padding:0 36px;position:relative;z-index:2; }
.hp-hero-grid  {
  display:grid;grid-template-columns:minmax(0, 620px) 1fr;gap:24px;align-items:center;
  min-height: 520px; padding: 44px 0 36px;
}

/* ── Desktop Proportional Scaling (1025px - 1199px) ── */
@media (min-width: 1025px) and (max-width: 1199px) {
  .hp-hero-grid { grid-template-columns: minmax(0, 540px) 1fr; gap: 20px; padding: 36px 0 28px; }
  .hp-hero h1 { font-size: clamp(34px, 3.8vw, 48px) !important; margin-bottom: 16px !important; }
  .hp-hero-desc { font-size: 15px !important; margin-bottom: 22px !important; }
  .hp-cta-row { margin-bottom: 22px !important; }
}

/* ── Explicit Tablet Breakpoint: 768px - 1024px (Clear proportional 2-column layout) ── */
@media (min-width: 768px) and (max-width: 1024px) {
  .hp-hero-inner {
    padding: 0 28px !important;
    text-align: left !important;
  }
  .hp-hero-grid {
    display: grid !important;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr) !important;
    gap: 24px !important;
    align-items: center !important;
    min-height: 480px !important;
    padding: 36px 0 28px !important;
  }
  .hp-hero-grid > div:first-child {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    text-align: left !important;
    z-index: 2 !important;
  }
  .hp-eyebrow {
    margin-left: 0 !important;
    margin-right: 0 !important;
    justify-content: flex-start !important;
    margin-bottom: 14px !important;
  }
  .hp-hero h1 {
    font-size: clamp(28px, 3.4vw, 38px) !important;
    text-align: left !important;
    margin-bottom: 14px !important;
    line-height: 1.12 !important;
  }
  .hp-hero-desc {
    font-size: 14.5px !important;
    margin-bottom: 18px !important;
    text-align: left !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    max-width: 100% !important;
    line-height: 1.55 !important;
  }
  .hp-cta-row {
    margin-bottom: 18px !important;
    justify-content: flex-start !important;
    gap: 12px !important;
  }
  .hp-btn-wa, .hp-btn-secondary {
    height: 46px !important;
    padding: 0 20px !important;
    font-size: 14px !important;
  }
  .hp-trust-pills {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 6px !important;
    justify-content: flex-start !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .hp-trust-pill {
    font-size: 11px !important;
    padding: 4px 10px !important;
  }
}

/* ── Mobile Breakpoint: < 768px (Clean single-column stack) ── */
@media (max-width: 767px) {
  .hp-hero-inner { text-align: center !important; padding: 0 20px !important; }
  .hp-hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; padding: 30px 0 24px !important; min-height: unset !important; }
  .hp-hero-grid > div:first-child { display: flex !important; flex-direction: column !important; align-items: center !important; text-align: center !important; }
  .hp-eyebrow { margin-left: auto !important; margin-right: auto !important; justify-content: center !important; margin-bottom: 14px !important; }
  .hp-hero h1 { font-size: clamp(26px, 6.5vw, 36px) !important; text-align: center !important; margin-bottom: 14px !important; line-height: 1.12 !important; }
  .hp-hero-desc { font-size: 14.5px !important; margin-bottom: 18px !important; text-align: center !important; margin-left: auto !important; margin-right: auto !important; line-height: 1.6 !important; }
  .hp-cta-row { margin-bottom: 18px !important; justify-content: center !important; gap: 10px !important; }
  .hp-trust-pills {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    justify-content: center !important;
    width: 100% !important;
    max-width: 440px !important;
    margin: 0 auto 12px !important;
    padding: 0 !important;
  }
}

@media (max-width: 480px) {
  .hp-hero-inner { padding: 0 16px !important; }
  .hp-hero-grid { gap: 22px !important; }
  .hp-hero h1 { font-size: clamp(25px, 7vw, 32px) !important; margin-bottom: 12px !important; }
  .hp-hero-desc { font-size: 14px !important; margin-bottom: 16px !important; line-height: 1.55 !important; }
  .hp-cta-row { margin-bottom: 16px !important; gap: 10px !important; }
  .hp-btn-wa, .hp-btn-secondary { height: 44px !important; padding: 0 18px !important; font-size: 13.5px !important; }
}

.hp-eyebrow {
  display:inline-flex;align-items:center;gap:8px;
  font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:#CBD5E1;margin-bottom:20px;
  background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.16);
  padding:5px 14px;border-radius:999px;
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  box-shadow:0 4px 12px rgba(0,0,0,0.3);
}
.hp-eyebrow-dot {
  width:7px;height:7px;border-radius:50%;background:#2196F3;flex:none;
  box-shadow:0 0 10px #2196F3;
}
.hp-hero h1 {
  font-size: clamp(36px, 4.4vw, 60px);
  font-weight: 900; letter-spacing: -.04em; line-height: 1.05; color:#FFFFFF; margin-bottom:20px;
}
.hp-hl-cyan-purple {
  display: inline-block;
  background: linear-gradient(90deg, #38BDF8 0%, #0084FF 32%, #7C4DFF 68%, #A855F7 100%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.hp-hl-pink {
  display: inline-block;
  background: linear-gradient(90deg, #C084FC 0%, #E879F9 60%, #F472B6 100%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.hp-hero-desc { font-size:16px;color:#B9C2CF;line-height:1.65;max-width:520px;margin-bottom:32px; }
.hp-cta-row   { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:34px; }
.hp-btn-wa {
  display:inline-flex;align-items:center;gap:9px;height:50px;padding:0 26px;
  background:#25D366;color:#fff;font-weight:700;font-size:15px;border-radius:999px;
  transition:all .22s cubic-bezier(.16,1,.3,1);text-decoration:none;
  box-shadow:0 4px 20px rgba(37, 211, 102, 0.40), 0 0 16px rgba(37, 211, 102, 0.20);
}
.hp-btn-wa:hover { background:#20BA5A;transform:translateY(-2px);box-shadow:0 8px 28px rgba(37, 211, 102, 0.50); }
.hp-btn-secondary {
  display:inline-flex;align-items:center;gap:9px;height:50px;padding:0 26px;
  background:rgba(22, 27, 34, 0.78);color:#FFFFFF;font-weight:700;font-size:15px;border-radius:999px;
  border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  transition:all .22s cubic-bezier(.16,1,.3,1);text-decoration:none;
  box-shadow:0 4px 18px rgba(0,0,0,.35), inset 0 1px 1px rgba(255,255,255,.12);
}
.hp-btn-secondary:hover { background:rgba(30, 38, 48, 0.88);border-color:rgba(56,189,248,.45);color:#FFFFFF;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.45), 0 0 16px rgba(56,189,248,.25); }
.hp-btn-pill-primary {
  display: inline-flex; align-items: center; gap: 8px;
  height: 46px; padding: 0 24px; border-radius: 999px;
  background: linear-gradient(135deg, #1E88E5 0%, #7C4DFF 100%);
  color: #fff; font-weight: 700; font-size: 14px; text-decoration: none;
  box-shadow: 0 4px 18px rgba(33, 150, 243, 0.4);
  transition: all .22s cubic-bezier(.16,1,.3,1);
}
.hp-btn-pill-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(33, 150, 243, 0.55), 0 0 16px rgba(124, 77, 255, 0.3);
}
.hp-trust-pills {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  max-width: 720px;
}
.hp-trust-pill  {
  display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600;
  color:#FFFFFF;background:rgba(22, 27, 34, 0.78);border:1px solid rgba(255,255,255,.12);
  border-radius:99px;padding:5px 11px;box-shadow:0 4px 14px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.08);
  white-space:nowrap;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  flex-shrink: 0;
}
.hp-pill-check {
  width:16px;height:16px;border-radius:50%;background:#2196F3;
  display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;
  box-shadow:0 0 8px rgba(33, 150, 243, 0.6);
}
.hp-pill-check svg { width:10px;height:10px;stroke:#FFFFFF;fill:none;stroke-width:3; }

@media (prefers-reduced-motion: reduce) {
  .hp-hero::before { animation: none; }
}

/* ── STATS STRIP ── */
.hp-stats {
  background: rgba(7, 17, 29, 0.60); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255,255,255,.06); border-bottom: 1px solid rgba(255,255,255,.06);
  padding: 36px 0;
  scroll-margin-top: 100px;
}
.hp-stats-grid {
  max-width:1200px;margin:0 auto;padding:0 28px;
  display:grid;grid-template-columns:repeat(4,1fr);gap:32px;
}
.hp-stats-item { text-align:center; }
.hp-stats-num {
  font-size:clamp(32px,4vw,52px);font-weight:900;letter-spacing:-.04em;line-height:1;
  background:linear-gradient(135deg,#38BDF8 0%,#A855F7 100%);-webkit-background-clip:text;
  background-clip:text;-webkit-text-fill-color:transparent;
}
.hp-stats-label { font-size:14px;color:#94A3B8;margin-top:8px;font-weight:500; }
.hp-stats-divider { width:1px;background:rgba(255,255,255,.08);align-self:stretch;display:none; }

/* ── SERVICES SECTION ── */
.hp-services { padding:84px 0;background:transparent;scroll-margin-top:100px;border-bottom:1px solid rgba(255,255,255,.06); }
.hp-section-head { text-align:center;margin-bottom:44px;scroll-margin-top:100px; }
.hp-section-eyebrow {
  display:inline-block;font-size:12px;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase;color:#38BDF8;margin-bottom:14px;
  background:rgba(30,111,251,0.12);border:1px solid rgba(56,189,248,0.25);
  padding:4px 14px;border-radius:999px;
}
.hp-section-head h2 {
  font-size:clamp(28px,3.8vw,48px);font-weight:900;letter-spacing:-.035em;color:#FFFFFF;
  margin-bottom:16px;line-height:1.08;
}
.hp-section-head p { font-size:16px;color:#94A3B8;max-width:580px;margin:0 auto;line-height:1.7; }

/* ── Category list ── */
.hp-svc-cats { display:flex;flex-direction:column;gap:14px;max-width:1200px;margin:0 auto;padding:0 28px; }

/* ── Outer category container ── */
.hp-svc-cat {
  background:rgba(18,26,44,.72);
  border:1px solid rgba(255,255,255,.08);
  border-radius:20px;
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  box-shadow:0 8px 32px rgba(0,0,0,.35);
  transition:border-color .22s, box-shadow .22s, transform .22s;
  overflow:hidden;
}
.hp-svc-cat:hover { border-color:rgba(56,189,248,.32);box-shadow:0 12px 40px rgba(0,0,0,.45),0 0 20px rgba(30,111,251,.15); }
.hp-svc-cat.open  {
  border-color:rgba(56,189,248,.42);
  box-shadow:0 14px 48px rgba(0,0,0,.5),0 0 28px rgba(30,111,251,.2);
}

/* ── Category header row ── */
.hp-svc-cat-head {
  display:flex;align-items:center;gap:14px;
  padding:clamp(16px,1.8vw,22px) clamp(18px,2vw,26px);
  cursor:pointer;
  border-bottom:1px solid transparent;
  transition:background .15s, border-color .22s;
}
.hp-svc-cat-head:hover { background:rgba(255,255,255,.03); }
.hp-svc-cat.open .hp-svc-cat-head {
  border-bottom-color:rgba(255,255,255,.08);
  background:rgba(255,255,255,.02);
}

/* ── Category icon (Re-themed from peach to 12% Blue/Purple tint) ── */
.hp-svc-cat-icon {
  width:44px;height:44px;border-radius:12px;background:rgba(30,111,251,.14);
  border:1px solid rgba(56,189,248,.25);
  display:grid;place-items:center;flex:none;
  transition:transform .24s cubic-bezier(.175,.885,.32,1.275),background .18s;
}
.hp-svc-cat-head:hover .hp-svc-cat-icon { transform:scale(1.07) rotate(-4deg);background:rgba(30,111,251,.22);border-color:rgba(56,189,248,.4); }
.hp-svc-cat-icon svg { width:20px;height:20px;stroke:#38BDF8;fill:none;stroke-width:2;flex:none; }
.hp-svc-cat-name { font-size:clamp(15px,1.8vw,17px);font-weight:700;color:#FFFFFF;flex:1; }
.hp-svc-cat-count {
  font-size:12px;font-weight:700;padding:4px 12px;border-radius:99px;
  background:rgba(30,111,251,.14);border:1px solid rgba(56,189,248,.22);
  color:#38BDF8;flex:none;white-space:nowrap;
}
.hp-svc-cat-chev {
  width:20px;height:20px;stroke:#64748B;fill:none;stroke-width:2;
  transition:transform .28s cubic-bezier(.2,.7,.3,1),stroke .18s;flex:none;
}
.hp-svc-cat.open .hp-svc-cat-chev { transform:rotate(90deg);stroke:#38BDF8; }

/* ── Expandable body ── */
.hp-svc-cat-body {
  max-height:0;overflow:hidden;
  opacity:0;
  transition:max-height .44s cubic-bezier(.25,.46,.45,.94), opacity .32s ease;
}
.hp-svc-cat-body.open { max-height:1400px;opacity:1; }

/* ── Inner card grid ── */
.hp-svc-cards {
  display:grid;
  grid-template-columns:repeat(4, minmax(0,1fr));
  gap:clamp(12px,1.4vw,18px);
  padding:clamp(18px,2vw,26px) clamp(16px,2vw,24px) clamp(18px,2vw,26px);
}

/* ── Individual service card ── */
.hp-svc-card {
  display:flex;
  flex-direction:column;
  padding:clamp(18px,1.8vw,24px);
  border-radius:14px;
  border:1px solid rgba(255,255,255,.07);
  background:rgba(255,255,255,.03);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  text-decoration:none;
  min-height:180px;
  transition:border-color .2s, background .2s,
             transform .22s cubic-bezier(.175,.885,.32,1.275),
             box-shadow .22s;
  position:relative;overflow:hidden;
}
.hp-svc-card::before {
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg, #1E6FFB, #8B5CF6);
  opacity:0;transition:opacity .22s;
}
.hp-svc-card:hover {
  border-color:rgba(56,189,248,.35);
  background:rgba(255,255,255,.06);
  box-shadow:0 8px 24px rgba(0,0,0,.45),0 0 16px rgba(30,111,251,.2);
  transform:translateY(-3px);
}
.hp-svc-card:hover::before { opacity:1; }

/* ── Icon (Re-themed from peach to Blue/Purple tint) ── */
.hp-svc-card-icon {
  width:40px;height:40px;border-radius:10px;
  background:rgba(30,111,251,.14);border:1px solid rgba(56,189,248,.25);
  display:grid;place-items:center;flex:none;
  margin-bottom:14px;
  transition:transform .24s cubic-bezier(.175,.885,.32,1.275),background .18s;
}
.hp-svc-card:hover .hp-svc-card-icon { transform:scale(1.1) rotate(-5deg);background:rgba(30,111,251,.22); }
.hp-svc-card-icon svg { width:18px;height:18px;stroke:#38BDF8;fill:none;stroke-width:2; }

/* ── Title ── */
.hp-svc-card-name {
  font-size:14px;font-weight:700;color:#F8FAFC;line-height:1.35;
  margin-bottom:8px;
}

/* ── Description ── */
.hp-svc-card-desc {
  font-size:13px;color:#94A3B8;line-height:1.6;
  flex:1;
}

/* ── Learn more link ── */
.hp-svc-card-arrow {
  display:flex;align-items:center;gap:5px;
  font-size:12.5px;font-weight:700;color:#38BDF8;
  margin-top:16px;
  transition:gap .18s,color .15s;
}
.hp-svc-card:hover .hp-svc-card-arrow { gap:8px;color:#7DD3FC; }
.hp-svc-card-arrow svg {
  width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.5;
  transition:transform .18s;flex:none;
}
.hp-svc-card:hover .hp-svc-card-arrow svg { transform:translateX(3px); }

/* ── View all button ── */
.hp-svc-all-btn { text-align:center;margin-top:40px; }
.hp-svc-all-btn a {
  display:inline-flex;align-items:center;gap:8px;
  padding:0 28px;height:48px;border-radius:999px;
  border:1px solid rgba(56,189,248,.35);color:#F8FAFC;
  background:rgba(30,111,251,.12);
  font-weight:700;font-size:14.5px;text-decoration:none;
  backdrop-filter:blur(16px);
  transition:all .2s cubic-bezier(.16,1,.3,1);
}
.hp-svc-all-btn a:hover {
  background:linear-gradient(135deg, #1E6FFB 0%, #8B5CF6 100%);
  border-color:transparent;color:#fff;
  transform:translateY(-2px);
  box-shadow:0 8px 24px rgba(30,111,251,.4);
}

/* ── Responsive ── */
@media(max-width:1024px) {
  .hp-svc-cards { grid-template-columns:repeat(2,minmax(0,1fr)); }
}
@media(max-width:820px) {
  .hp-svc-cards { grid-template-columns:repeat(2,minmax(0,1fr));gap:12px; }
  .hp-svc-cat-head { padding:14px 18px; }
}
@media(max-width:600px) {
  .hp-svc-cards { grid-template-columns:1fr;gap:10px;padding:14px 14px 16px; }
  .hp-svc-card { min-height:unset;padding:16px; }
  .hp-svc-card-icon { margin-bottom:10px; }
}
@media(max-width:430px) {
  .hp-svc-cats { padding:0 16px; }
  .hp-svc-cat-head { padding:12px 14px;gap:10px; }
  .hp-svc-cat-name { font-size:14px; }
  .hp-svc-cat-icon { width:38px;height:38px;border-radius:9px; }
  .hp-svc-cards { padding:12px 12px 14px;gap:8px; }
  .hp-svc-card { padding:14px; }
  .hp-svc-card-name { font-size:13.5px; }
  .hp-svc-card-desc { font-size:12.5px; }
}

/* ── WHY LAUNCHERDESK ── */
.hp-why {
  padding:88px 0;background:#0B0F19;
  position:relative;overflow:hidden;
  scroll-margin-top:100px;
  border-bottom:1px solid rgba(255,255,255,.06);
}
.hp-why::before {
  content:'';position:absolute;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(700px 450px at 85% 10%, rgba(30,111,251,.12), transparent 60%),
    radial-gradient(550px 400px at 10% 40%, rgba(139,92,246,.08), transparent 60%);
  animation:hpWhyBgDrift 22s ease-in-out infinite alternate;
}
@keyframes hpWhyBgDrift {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(-2%, 2%, 0); }
}

.hp-why-intro {
  max-width:1200px;margin:0 auto;padding:0 28px;
  position:relative;z-index:1;
  text-align:center;
  margin-bottom:52px;
}
.hp-why-intro .hp-section-eyebrow {
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  color:#38BDF8;margin-bottom:20px;
}
.hp-why-eyebrow-line {
  height:1px;width:48px;flex:none;
  background:linear-gradient(90deg, rgba(56,189,248,.6), transparent);
  position:relative;overflow:hidden;
}
.hp-why-eyebrow-line--right {
  background:linear-gradient(270deg, rgba(56,189,248,.6), transparent);
}
.hp-why-eyebrow-line::after {
  content:'';position:absolute;inset:0;width:40%;
  background:linear-gradient(90deg, transparent, #38BDF8, transparent);
  animation:hpEyebrowLine 3.2s ease-in-out infinite;
}
@keyframes hpEyebrowLine { 0%{transform:translateX(-100%);} 60%,100%{transform:translateX(280%);} }

.hp-why-intro h2 {
  font-size:clamp(30px,3.8vw,52px);
  font-weight:900;letter-spacing:-.035em;color:#FFFFFF;
  line-height:1.08;margin-bottom:20px;
  max-width:720px;margin-left:auto;margin-right:auto;
}
.hp-why-intro p {
  font-size:clamp(15px,1.6vw,17px);color:#94A3B8;
  line-height:1.75;
  max-width:580px;margin:0 auto;
}

.hp-why-grid {
  max-width:1200px;margin:0 auto;padding:0 28px;position:relative;z-index:1;
  display:grid;grid-template-columns:1fr 1.05fr;gap:48px;align-items:start;
}

.hp-why-features { display:flex;flex-direction:column;gap:16px; }
.hp-why-feat {
  --mx:50%;--my:50%;
  position:relative;isolation:isolate;overflow:hidden;
  display:flex;gap:16px;align-items:flex-start;padding:22px 24px;border-radius:18px;
  border:1px solid rgba(255,255,255,.08);
  background:rgba(18,26,44,.72);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  box-shadow:0 8px 32px rgba(0,0,0,.35);
  transition:all .35s cubic-bezier(.16,1,.3,1);
}
.hp-why-feat::before {
  content:'';position:absolute;inset:0;z-index:-1;opacity:0;
  background:radial-gradient(220px circle at var(--mx) var(--my), rgba(30,111,251,.16), transparent 68%);
  transition:opacity .35s ease;
}
.hp-why-feat::after {
  content:'';position:absolute;top:0;left:0;right:0;height:2px;z-index:1;
  background:linear-gradient(90deg,transparent,#38BDF8,transparent);
  transform:scaleX(0);transform-origin:0 50%;transition:transform .45s cubic-bezier(.16,1,.3,1);
}
.hp-why-feat:hover {
  transform:translateY(-5px);border-color:rgba(56,189,248,.38);
  box-shadow:0 16px 44px rgba(0,0,0,.5), 0 0 24px rgba(30,111,251,.25);
}
.hp-why-feat:hover::before { opacity:1; }
.hp-why-feat:hover::after { transform:scaleX(1); }
.hp-why-feat-icon {
  width:46px;height:46px;border-radius:12px;flex:none;
  background:rgba(30,111,251,.14);
  border:1px solid rgba(56,189,248,.25);
  display:grid;place-items:center;position:relative;
  transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s;
}
.hp-why-feat:hover .hp-why-feat-icon { transform:scale(1.06) rotate(-3deg);background:rgba(30,111,251,.22); }
.hp-why-feat-icon svg { width:20px;height:20px;stroke:#38BDF8;fill:none;stroke-width:2; }
.hp-why-feat h4 { font-size:15.5px;font-weight:700;color:#FFFFFF;margin-bottom:6px;letter-spacing:-.01em; }
.hp-why-feat p  { font-size:13.5px;color:#94A3B8;line-height:1.62; }
.hp-why-feat-link { display:inline-flex;margin-top:8px;font-size:12.5px;font-weight:700;color:#38BDF8;text-decoration:none; }
.hp-why-feat-link:hover { text-decoration:underline;color:#7DD3FC; }

/* comparison right card */
.hp-vs-card {
  position:relative;background:rgba(18,26,44,.85);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border-radius:22px;overflow:hidden;color:#fff;
  box-shadow:0 16px 48px rgba(0,0,0,.5), 0 0 32px rgba(30,111,251,.15);
  border:1px solid rgba(255,255,255,.12);
}
.hp-vs-card::before {
  content:'';position:absolute;inset:0;pointer-events:none;opacity:.4;z-index:0;
  background:linear-gradient(100deg, transparent 20%, rgba(255,255,255,.08) 35%, transparent 50%);
  background-size:220% 100%;animation:hpVsSheen 9s ease-in-out infinite;
}
@keyframes hpVsSheen { 0%{background-position:130% 0;} 50%{background-position:-30% 0;} 100%{background-position:130% 0;} }
.hp-vs-head {
  display:grid;grid-template-columns:1fr 1fr;position:relative;z-index:1;
  border-bottom:1px solid rgba(255,255,255,.08);
}
.hp-vs-col { padding:18px 22px;text-align:center;position:relative; }
.hp-vs-col.bad { background:rgba(239,68,68,.08); }
.hp-vs-col.good { background:rgba(30,111,251,.15); }
.hp-vs-col.good::after {
  content:'';position:absolute;left:0;right:0;bottom:0;height:1px;
  background:linear-gradient(90deg,transparent,#38BDF8,transparent);
}
.hp-vs-col-label { font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase; }
.hp-vs-col.bad  .hp-vs-col-label { color:#F87171; }
.hp-vs-col.good .hp-vs-col-label { color:#38BDF8; }
.hp-vs-rows { padding:8px 0;position:relative;z-index:1; }
.hp-vs-row  {
  display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid rgba(255,255,255,.06);
  padding:0;transition:background .25s ease;
}
.hp-vs-row:hover { background:rgba(255,255,255,.04); }
.hp-vs-row:hover .hp-vs-cell.good { text-shadow:0 0 16px rgba(56,189,248,.6); }
.hp-vs-row:last-child { border-bottom:0; }
.hp-vs-cell { padding:14px 22px;font-size:13.5px;display:flex;align-items:center;gap:9px;overflow-wrap:anywhere; }
.hp-vs-cell.bad  { color:#FCA5A5; }
.hp-vs-cell.good { color:#E0F2FE;font-weight:600; }
.hp-vs-cell svg  { width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.5;flex:none; }
.hp-vs-cell.good svg { color:#38BDF8; }

/* ── BUSINESS TYPES ── */
.hp-types { padding:84px 0;background:rgba(12, 28, 52, 0.35);scroll-margin-top:100px;border-bottom:1px solid rgba(255,255,255,.06); }
.hp-types-grid {
  max-width:1200px;margin:0 auto;padding:0 28px;
  display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px;
}
.hp-type-card {
  border-radius:18px;padding:28px 24px;text-decoration:none;
  border:1px solid rgba(255,255,255,.08);background:rgba(22, 27, 34, 0.78);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  box-shadow:0 8px 32px rgba(0,0,0,.35);
  transition:all .22s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden;
}
.hp-type-card::before {
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg, #1E88E5, #7C4DFF);opacity:0;transition:opacity .2s;
}
.hp-type-card:hover { border-color:rgba(33,150,243,.38);box-shadow:0 12px 36px rgba(0,0,0,.5),0 0 20px rgba(33,150,243,.2);transform:translateY(-3px); }
.hp-type-card:hover::before { opacity:1; }
.hp-type-icon {
  width:48px;height:48px;border-radius:12px;
  background:rgba(33,150,243,.14);border:1px solid rgba(33,150,243,.25);
  display:grid;place-items:center;margin-bottom:16px;
}
.hp-type-icon svg { width:24px;height:24px;stroke:#42D9FF; }
.hp-type-name { font-size:17px;font-weight:800;color:#FFFFFF;margin-bottom:8px; }
.hp-type-desc { font-size:13.5px;color:#B9C2CF;line-height:1.6;margin-bottom:14px; }
.hp-type-tags { display:flex;flex-wrap:wrap;gap:6px; }
.hp-type-tag  {
  font-size:11px;font-weight:600;padding:3px 10px;border-radius:99px;
  background:rgba(255,255,255,.06);color:#42D9FF;border:1px solid rgba(66,217,255,.2);
}
.hp-type-arrow { margin-top:16px;display:flex;align-items:center;gap:4px;font-size:13px;font-weight:600;color:#2196F3; }
.hp-type-arrow svg { width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.5; }

/* ── SERVICE FINDER / ROADMAP ── */
.hp-roadmap { padding:72px 0; background:transparent;scroll-margin-top:100px;border-bottom:1px solid rgba(255,255,255,.06); }
.hp-roadmap-card {
  display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap;
  background:rgba(22, 27, 34, 0.85);
  border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border-radius:24px;padding:clamp(32px,4vw,52px);color:#fff;
  box-shadow:0 24px 64px rgba(0,0,0,.5), 0 0 32px rgba(33,150,243,.15);
}
.hp-roadmap-text{max-width:560px}
.hp-roadmap-text h2{font-size:clamp(22px,3vw,34px);font-weight:900;margin:8px 0 12px;color:#FFFFFF}
.hp-roadmap-text p{font-size:15px;color:#B9C2CF;line-height:1.65;margin-bottom:18px}
.hp-roadmap-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}
.hp-roadmap-list li{display:flex;align-items:center;gap:8px;font-size:13.5px;color:#E2E8F0;font-weight:600}
.hp-roadmap-list li::before{content:'✓';color:#2196F3;font-weight:900}
.hp-roadmap-btns{display:flex;flex-direction:column;gap:12px;flex:none;min-width:220px}
.hp-roadmap-btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:50px;padding:0 26px;background:linear-gradient(135deg, #1E88E5 0%, #7C4DFF 100%);color:#fff;font-weight:700;font-size:14.5px;border-radius:999px;text-decoration:none;box-shadow:0 4px 20px rgba(33,150,243,.4);transition:transform .15s}
.hp-roadmap-btn-primary:hover{transform:translateY(-2px)}
.hp-roadmap-btn-secondary{display:inline-flex;align-items:center;justify-content:center;height:50px;padding:0 26px;background:rgba(255,255,255,.06);color:#fff;font-weight:700;font-size:14.5px;border-radius:999px;border:1px solid rgba(255,255,255,.16);cursor:pointer;font-family:inherit;transition:all .15s}
.hp-roadmap-btn-secondary:hover{background:rgba(255,255,255,.12);border-color:rgba(33,150,243,.35)}

/* ── HOW IT WORKS ── */
.hp-how { padding:84px 0;background:rgba(7, 17, 29, 0.45); position:relative; overflow:hidden;scroll-margin-top:100px;border-bottom:1px solid rgba(255,255,255,.06); }
.hp-how > * { position:relative; z-index:1; }
.hp-how-steps {
  max-width:1200px;margin:0 auto;padding:0 28px;
  display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:40px;
}
.hp-how-step {
  padding:28px;border-radius:18px;border:1px solid rgba(255,255,255,.08);
  background:rgba(22, 27, 34, 0.78);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  position:relative;box-shadow:0 8px 32px rgba(0,0,0,.35);
  transition:all .22s cubic-bezier(.16,1,.3,1);
}
.hp-how-step:hover { border-color:rgba(33,150,243,.38);box-shadow:0 12px 36px rgba(0,0,0,.5);transform:translateY(-3px); }
.hp-how-num {
  font-size:clamp(42px,5vw,60px);font-weight:900;letter-spacing:-.04em;
  line-height:1;margin-bottom:16px;
  background:linear-gradient(135deg,#38BDF8 0%,#7C4DFF 100%);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
}
.hp-how-step h4 { font-size:16px;font-weight:800;color:#FFFFFF;margin-bottom:8px; }
.hp-how-step p  { font-size:13.5px;color:#B9C2CF;line-height:1.6; }
.hp-how-connector {
  position:absolute;top:50%;right:-12px;width:24px;height:2px;
  background:linear-gradient(90deg,#2196F3,transparent);z-index:1;
}

/* ── RESOURCES ── */
.hp-resources { padding:84px 0;background:transparent;scroll-margin-top:100px;border-bottom:1px solid rgba(255,255,255,.06); }
.hp-res-grid {
  max-width:1200px;margin:0 auto;padding:0 28px;
  display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px;
}
.hp-res-card {
  background:rgba(22, 27, 34, 0.78);border-radius:18px;border:1px solid rgba(255,255,255,.08);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);overflow:hidden;
  text-decoration:none;transition:all .22s cubic-bezier(.16,1,.3,1);display:flex;flex-direction:column;
  box-shadow:0 8px 32px rgba(0,0,0,.35);
}
.hp-res-card:hover { border-color:rgba(56,189,248,.38);box-shadow:0 12px 36px rgba(0,0,0,.5),0 0 20px rgba(30,111,251,.2);transform:translateY(-3px); }
.hp-res-card-thumb { height:4px;background:linear-gradient(90deg,#1E6FFB,#8B5CF6); }
.hp-res-card-body { padding:24px;flex:1;display:flex;flex-direction:column; }
.hp-res-cat {
  font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:#38BDF8;margin-bottom:10px;
}
.hp-res-title { font-size:16px;font-weight:800;color:#FFFFFF;margin-bottom:8px;line-height:1.35; }
.hp-res-desc  { font-size:13.5px;color:#94A3B8;line-height:1.6;flex:1; }
.hp-res-link  {
  display:flex;align-items:center;gap:5px;font-size:13px;font-weight:700;color:#38BDF8;margin-top:16px;
}
.hp-res-link svg { width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.5; }

/* ── MARQUEE ── */
.hp-marquee-wrap {
  background:rgba(12, 28, 52, 0.50);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);
  padding:16px 0;overflow:hidden;position:relative;
}
.hp-marquee-wrap::before,.hp-marquee-wrap::after {
  content:'';position:absolute;top:0;bottom:0;width:80px;z-index:2;pointer-events:none;
}
.hp-marquee-wrap::before{left:0;background:linear-gradient(to right,rgba(12, 28, 52, 0.9),transparent)}
.hp-marquee-wrap::after{right:0;background:linear-gradient(to left,rgba(12, 28, 52, 0.9),transparent)}
.hp-marquee-track {
  display:flex;gap:0;width:max-content;
  animation:marquee-scroll 60s linear infinite;
}
.hp-marquee-wrap:hover .hp-marquee-track { animation-play-state:paused }
@keyframes marquee-scroll {
  from { transform:translateX(0) }
  to   { transform:translateX(-50%) }
}
.hp-marquee-item {
  display:inline-flex;align-items:center;gap:10px;
  padding:0 28px;white-space:nowrap;
  font-size:13.5px;font-weight:600;color:#CBD5E1;
}
.hp-marquee-dot {
  width:5px;height:5px;border-radius:50%;background:#38BDF8;flex:none;opacity:.6;
}

/* ── RECENTLY PARTNERED ── */
.hp-partners { padding:52px 0 48px;background:transparent;scroll-margin-top:100px;border-bottom:1px solid rgba(255,255,255,.06); }
.hp-partners-label {
  text-align:center;font-size:11.5px;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:#94A3B8;margin-bottom:26px;
}
.hp-partners-row {
  width:100%;margin:0;padding:0 28px;box-sizing:border-box;
  display:flex;align-items:stretch;justify-content:center;flex-wrap:nowrap;
  gap:16px;
}
.hp-partners-card {
  display:flex;align-items:center;gap:12px;
  background:rgba(18,26,44,.72);border:1px solid rgba(255,255,255,.08);border-radius:14px;
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  padding:12px 16px;flex:0 0 200px;width:200px;min-width:0;box-sizing:border-box;text-decoration:none;cursor:pointer;
  transition:all .2s cubic-bezier(.16,1,.3,1);
}
.hp-partners-card:hover { border-color:rgba(56,189,248,.38);box-shadow:0 8px 24px rgba(0,0,0,.45);transform:translateY(-2px); }
.hp-partners-logo {
  display:flex;align-items:center;justify-content:center;
  height:32px;width:32px;flex:none;
}
.hp-partners-logo img { height:100%;width:100%;object-fit:contain; }
.hp-partners-logo-text {
  font-size:15px;font-weight:800;letter-spacing:-.02em;color:#FFFFFF;
  white-space:nowrap;
}
.hp-partners-info { display:flex;flex-direction:column;gap:3px;min-width:0; }
.hp-partners-name { font-size:13.5px;font-weight:800;color:#FFFFFF;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.hp-partners-cat {
  display:inline-flex;align-items:center;gap:5px;width:fit-content;white-space:nowrap;
  font-size:9.5px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;
  color:#38BDF8;background:rgba(30,111,251,.14);border:1px solid rgba(56,189,248,.2);border-radius:999px;padding:2px 8px;
}
.hp-partners-card.hp-partners-soon {
  border-style:dashed;border-color:rgba(255,255,255,.12);cursor:default;
}
.hp-partners-card.hp-partners-soon:hover { border-color:rgba(255,255,255,.12);box-shadow:none;transform:none; }
.hp-partners-soon-icon {
  display:flex;align-items:center;justify-content:center;
  height:32px;width:32px;flex:none;border-radius:9px;
  background:rgba(255,255,255,.05);color:#38BDF8;
}
.hp-partners-soon-icon svg { width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2; }
.hp-partners-cat.muted { color:#64748B;background:rgba(255,255,255,.04); }
.hp-partners-more {
  display:flex;align-items:center;justify-content:center;
  font-size:13.5px;font-weight:700;color:#94A3B8;
  width:100%;text-align:center;margin-top:22px;
}

/* ── FAQ ── */
.hp-faq { padding:84px 0;background:rgba(7, 17, 29, 0.45);scroll-margin-top:100px;border-bottom:1px solid rgba(255,255,255,.06); }
.hp-faq-inner { max-width:800px;margin:0 auto;padding:0 28px; }
.hp-faq-list  { display:flex;flex-direction:column;margin-top:40px; }
.hp-faq-item  { border-bottom:1px solid rgba(255,255,255,.07); }
.hp-faq-item:first-child { border-top:1px solid rgba(255,255,255,.07); }
.hp-faq-q {
  display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:22px 0;cursor:pointer;transition:color .15s;
}
.hp-faq-q:hover .hp-faq-q-text { color:#38BDF8; }
.hp-faq-q-text { font-size:16.5px;font-weight:700;color:#FFFFFF;line-height:1.4;flex:1; }
.hp-faq-icon  { width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);display:grid;place-items:center;flex:none; }
.hp-faq-icon svg { width:14px;height:14px;stroke:#38BDF8;fill:none;stroke-width:2.5;transition:transform .25s; }
.hp-faq-item:hover .hp-faq-a { max-height:320px; }
.hp-faq-item:hover .hp-faq-icon svg { transform:rotate(45deg); }
.hp-faq-a     { max-height:0;overflow:hidden;transition:max-height .55s cubic-bezier(.2,.7,.3,1); }
.hp-faq-a-inner { padding:0 0 22px;font-size:14.5px;color:#94A3B8;line-height:1.75; }

/* ── FINAL CTA ── */
.hp-cta-section { padding:88px 0;background:transparent;scroll-margin-top:100px; }
.hp-cta-card {
  max-width:1200px;margin:0 auto;padding:0 28px;
}
.hp-cta-inner {
  background:rgba(18,26,44,.85);
  border:1px solid rgba(255,255,255,.12);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border-radius:28px;padding:clamp(48px,6vw,84px);text-align:center;
  box-shadow:0 32px 80px rgba(0,0,0,.55), 0 0 32px rgba(30,111,251,.18);
  position:relative;overflow:hidden;
}
.hp-cta-inner::before {
  content:'';position:absolute;inset:0;
  background:radial-gradient(800px 450px at 50% -20%,rgba(30,111,251,.2),transparent 65%);
  pointer-events:none;
}
.hp-cta-inner h2 {
  font-size:clamp(28px,4vw,52px);font-weight:900;letter-spacing:-.04em;color:#FFFFFF;
  margin-bottom:16px;position:relative;
}
.hp-cta-inner p {
  font-size:clamp(15px,1.8vw,18px);color:#94A3B8;max-width:540px;
  margin:0 auto 40px;line-height:1.7;position:relative;
}
.hp-cta-btns { display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative; }
.hp-cta-btn-wa {
  display:inline-flex;align-items:center;gap:10px;height:52px;padding:0 32px;
  background:#22C55E;color:#fff;font-weight:700;font-size:15px;border-radius:999px;
  text-decoration:none;transition:all .15s;box-shadow:0 4px 20px rgba(34,197,94,.35);
}
.hp-cta-btn-wa:hover { background:#16a34a;transform:translateY(-2px);box-shadow:0 8px 24px rgba(34,197,94,.45); }
.hp-cta-btn-exp {
  display:inline-flex;align-items:center;gap:10px;height:52px;padding:0 28px;
  background:linear-gradient(135deg, #1E6FFB 0%, #8B5CF6 100%);color:#fff;font-weight:700;font-size:15px;border-radius:999px;
  text-decoration:none;transition:all .15s;border:none;
  box-shadow:0 4px 20px rgba(30,111,251,.4);
}
.hp-cta-btn-exp:hover { transform:translateY(-2px);box-shadow:0 8px 28px rgba(30,111,251,.55); }
.hp-cta-btn-ai {
  display:inline-flex;align-items:center;gap:8px;height:52px;padding:0 26px;
  background:rgba(255,255,255,.06);color:#F8FAFC;font-weight:700;font-size:15px;border-radius:999px;
  border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(16px);
  cursor:pointer;font-family:inherit;transition:all .15s;
}
.hp-cta-btn-ai:hover { background:rgba(255,255,255,.12);border-color:rgba(56,189,248,.35);color:#38BDF8; }
.hp-cta-microcopy{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;margin-top:20px;font-size:12.5px;font-weight:600;color:#94A3B8;position:relative}
.hp-cta-divider{display:inline-block;width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,0.3);flex:none}
.hp-svc-price-badge{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.02em;color:#38BDF8;background:rgba(30,111,251,.15);border:1px solid rgba(56,189,248,.25);border-radius:999px;padding:2px 8px;margin-bottom:8px;width:fit-content}

/* ── LIFECYCLE ACCORDION ── */
.lc2-section{background:#0B0F19;padding:96px 0;scroll-margin-top:100px;border-bottom:1px solid rgba(255,255,255,.06);}
.lc2-inner{display:grid;grid-template-columns:1fr 1.15fr;gap:72px;align-items:start;max-width:1200px;margin:0 auto;padding:0 28px}
.lc2-left{position:sticky;top:100px}
.lc2-left .eyebrow{margin-bottom:14px;display:block}
.lc2-heading{font-size:clamp(26px,3.4vw,44px);font-weight:900;letter-spacing:-.04em;line-height:1.06;margin-bottom:18px;color:#FFFFFF}
.lc2-desc{font-size:16px;color:#94A3B8;line-height:1.7;max-width:360px;margin-bottom:28px}
.lc2-list{display:flex;flex-direction:column}
.lc2-item{border-top:1px solid rgba(255,255,255,.08);overflow:hidden}
.lc2-item:last-child{border-bottom:1px solid rgba(255,255,255,.08)}
.lc2-trigger{width:100%;background:none;border:0;cursor:pointer;display:grid;grid-template-columns:44px 1fr 28px;align-items:center;gap:12px;padding:22px 6px;text-align:left;transition:background .15s;border-radius:0}
.lc2-trigger:hover{background:rgba(255,255,255,.02)}
.lc2-num{font-family:var(--font);font-weight:800;font-size:14px;color:#38BDF8;opacity:.5;transition:opacity .25s,color .25s;line-height:1}
.lc2-name{font-family:var(--font);font-weight:700;font-size:clamp(17px,2vw,21px);color:#FFFFFF;transition:color .25s;line-height:1}
.lc2-chevron{width:20px;height:20px;stroke:#64748B;fill:none;stroke-width:2;transition:transform .28s cubic-bezier(.2,.7,.3,1),stroke .2s;flex:none}
.lc2-item.lc2-open .lc2-trigger{background:rgba(30,111,251,.08)}
.lc2-item.lc2-open .lc2-num{opacity:1;color:#38BDF8}
.lc2-item.lc2-open .lc2-name{color:#38BDF8}
.lc2-item.lc2-open .lc2-chevron{transform:rotate(90deg);stroke:#38BDF8}
.lc2-body{max-height:0;overflow:hidden;transition:max-height .38s cubic-bezier(.2,.7,.3,1),opacity .3s;opacity:0}
.lc2-item.lc2-open .lc2-body{opacity:1}
.lc2-body-inner{padding:0 4px 24px 56px;display:flex;flex-direction:column;gap:12px}
.lc2-body-desc{font-size:14px;color:#94A3B8;line-height:1.65;margin-bottom:6px}
.lc2-chips{display:flex;flex-wrap:wrap;gap:8px}
.lc2-chip{display:inline-flex;align-items:center;gap:7px;font-family:var(--font);font-weight:600;font-size:13px;color:#E2E8F0;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:99px;padding:7px 14px;text-decoration:none;transition:all .15s}
.lc2-chip:hover{border-color:rgba(56,189,248,.35);color:#38BDF8;background:rgba(30,111,251,.15);transform:translateY(-1px);box-shadow:0 4px 12px rgba(30,111,251,.25)}
.lc2-prog{height:2px;background:rgba(255,255,255,.08);position:relative;margin:0 4px}
.lc2-prog-bar{height:100%;width:0;background:linear-gradient(90deg,#1E6FFB,#8B5CF6);border-radius:2px;transition:width linear}
.lc2-cta{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-top:14px;padding-top:14px;border-top:1px dashed rgba(255,255,255,.08)}
.lc2-cta span{font-size:13px;font-weight:700;color:#E2E8F0}
.lc2-cta-btn{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;color:#fff;background:linear-gradient(135deg, #1E6FFB, #8B5CF6);border-radius:999px;padding:6px 16px;text-decoration:none;box-shadow:0 4px 14px rgba(30,111,251,.35)}
.lc2-cta-btn:hover{box-shadow:0 6px 18px rgba(30,111,251,.5);transform:translateY(-1px)}

/* ── RESPONSIVE ── */
@media(max-width:960px){
  .hp-why-grid   { grid-template-columns:1fr;gap:36px }
  .hp-why-intro  { margin-bottom:36px; }
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
  .hp-vs-cell    { padding:12px 14px;font-size:12.5px;gap:6px }
  .hp-vs-col     { padding:14px 12px }
  .hp-why-grid   { gap:28px }
  .lc2-inner     { gap:28px }
  .hp-partners   { padding:36px 0 }
  .hp-partners-row {
    justify-content:flex-start;overflow-x:auto;overflow-y:visible;-webkit-overflow-scrolling:touch;
    scrollbar-width:none;padding:6px 20px;
  }
  .hp-partners-card { flex:0 0 188px;width:188px;padding:12px 14px;gap:11px }
  .hp-partners-name { font-size:13.5px;white-space:nowrap;overflow:visible;text-overflow:clip }
  .hp-partners-cat  { font-size:9px;padding:2px 7px }
}
@media(max-width:640px){
  .hp-hero       { padding:32px 0 40px }
  .hp-hero h1    { font-size:clamp(30px,8vw,44px) }
  .hp-cta-row    { flex-direction:column;align-items:stretch }
  .hp-btn-primary,.hp-btn-secondary,.hp-btn-wa { width:100%;justify-content:center }
  .hp-stats      { padding:26px 0 }
  .hp-stats-grid { grid-template-columns:1fr 1fr; gap:18px }
  .hp-stats-num  { font-size:clamp(28px,7vw,40px) }
  .hp-services,.hp-why,.hp-types,.hp-how,.hp-resources,.hp-faq,.hp-cta-section,.lc2-section { padding:52px 0 }
  .hp-types-grid,.hp-how-steps { grid-template-columns:1fr; margin-top:28px }
  .hp-how-connector { display:none }
  .hp-cta-inner  { border-radius:20px;padding:36px 20px }
  .hp-cta-btns   { flex-direction:column;align-items:center }
  .hp-cta-btn-wa,.hp-cta-btn-exp,.hp-cta-btn-ai { width:100%;justify-content:center }
  .lc2-body-inner{ padding:0 4px 18px 44px }
  .lc2-trigger   { grid-template-columns:36px 1fr 24px;gap:8px }
}
@media(max-width:480px){
  .hp-stats-grid { grid-template-columns:1fr 1fr }
  .lc2-inner     { padding:0 16px }
  .hp-section-head h2 { font-size:clamp(24px,7vw,36px) }
  .hp-vs-cell    { padding:10px 10px;font-size:11.5px }
  .hp-vs-col-label { font-size:10px }
  .hp-partners-card { flex:0 0 168px;width:168px;padding:11px 13px;gap:10px }
  .hp-partners-logo,.hp-partners-soon-icon { height:28px;width:28px }
  .hp-partners-name { font-size:12.5px }
  .hp-partners-cat { font-size:8.5px;padding:2px 6px }
  .hp-partners-label { font-size:10.5px;margin-bottom:18px }
}
@media(prefers-reduced-motion:reduce){
  .lc2-prog-bar  { transition:none!important }
  .hp-vs-card::before,.hp-why::before,.hp-why-eyebrow-line { animation:none!important; }
}
`

/* ── DATA ─────────────────────────────────────────────────── */
const STAGES = [
  {
    id: 'idea', num: '01', name: 'Idea & Research',
    desc: 'Turn your idea into a validated business concept. We help you choose the right structure before you file anything.',
    chips: [{ l: 'Entity Comparison', h: '/services/private-limited-company-registration' }, { l: 'Service Finder', h: '/services' }, { l: 'LauncherDesk AI', h: '/ai' }],
    ctaPrompt: 'Not sure which structure fits?', ctaLabel: 'Find My Structure', ctaHref: '/services#finder',
  },
  {
    id: 'start', num: '02', name: 'Register & Incorporate',
    desc: 'Get your business legally registered with the right entity, such as Private Limited, LLP, OPC or Partnership.',
    chips: [{ l: 'Pvt Ltd Registration', h: '/services/private-limited-company-registration' }, { l: 'LLP Registration', h: '/services/llp-registration' }, { l: 'OPC Registration', h: '/services/opc-registration' }, { l: 'Partnership Firm', h: '/services/partnership-registration' }],
    ctaPrompt: 'Ready to start?', ctaLabel: 'Start Registration', ctaHref: '/services/private-limited-company-registration',
  },
  {
    id: 'build', num: '03', name: 'Licences & Compliance',
    desc: 'Get GST, MSME, trademark and every licence you need, without chasing government portals yourself.',
    chips: [{ l: 'GST Registration', h: '/services/gst-registration' }, { l: 'Trademark', h: '/services/trademark-registration' }, { l: 'MSME / Udyam', h: '/services/msme-registration' }],
    ctaPrompt: 'Already registered?', ctaLabel: 'Explore Compliance', ctaHref: '/solutions/compliance-management',
  },
  {
    id: 'grow', num: '04', name: 'Technology & Growth',
    desc: 'Website, CRM, automation, digital marketing and brand identity, everything you need to get found and grow.',
    chips: [{ l: 'Website Development', h: '/services/website-development' }, { l: 'Digital Marketing', h: '/services/digital-marketing' }, { l: 'Business Automation', h: '/services/business-automation' }],
    ctaPrompt: 'Ready to grow?', ctaLabel: 'Explore Technology & Growth', ctaHref: '/solutions/business-growth',
  },
]

const SVC_CATS = [
  {
    name: 'Company Registration', icon: 'M3 21h18M6 21V7l6-4 6 4v14', count: 4,
    services: [
      { href: '/services/private-limited-company-registration', icon: 'M3 21h18M6 21V7l6-4 6 4v14', name: 'Private Limited Company', startingPrice: 'Starting at ₹4,999', desc: 'The standard for funded startups with limited liability and fundraising readiness.' },
      { href: '/services/llp-registration', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', name: 'LLP Registration', startingPrice: 'Starting at ₹4,500', desc: 'Partner-run firms wanting limited liability with lighter compliance.' },
      { href: '/services/opc-registration', icon: 'M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a6 6 0 0 1 12 0v1', name: 'OPC Registration', startingPrice: 'Starting at ₹4,999', desc: 'One-person companies with limited liability for solo founders.' },
      { href: '/services/partnership-registration', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87', name: 'Partnership Firm', startingPrice: 'Starting at ₹2,999', desc: 'Simple, lowest-cost registration for small owner-operated businesses.' },
    ]
  },
  {
    name: 'Licences & Registrations', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6', count: 3,
    services: [
      { href: '/services/gst-registration', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', name: 'GST Registration & Filing', startingPrice: 'Starting at ₹1,999', desc: 'GSTIN and ongoing return filing so you never miss a deadline.' },
      { href: '/services/msme-registration', icon: 'M9 11l3 3L22 4', name: 'MSME / Udyam Registration', startingPrice: 'Starting at ₹499', desc: 'Unlock collateral-free loans, subsidies and payment protection.' },
      { href: '/services/trademark-registration', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', name: 'Trademark Registration', startingPrice: 'Starting at ₹1,999', desc: 'Protect your brand name, logo and tagline across the right classes.' },
    ]
  },
  {
    name: 'Technology & IT', icon: 'M2 3h20v14H2zM8 21h8M12 17v4', count: 4,
    services: [
      { href: '/services/website-development', icon: 'M2 3h20v14H2zM8 21h8M12 17v4', name: 'Website Development', startingPrice: 'Starting at ₹9,999', desc: 'Mobile-first business websites, e-commerce stores and portals.' },
      { href: '/services/business-automation', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', name: 'Business Automation', startingPrice: 'Starting at ₹4,999', desc: 'CRM setup, workflow automation and operational systems.' },
      { href: '/services/digital-marketing', icon: 'M23 6l-9.5 9.5-5-5L1 18', name: 'Digital Marketing', startingPrice: 'Starting at ₹7,999', desc: 'SEO, Google Ads, social media and branding for real growth.' },
      { href: '/services/whatsapp-business-api', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', name: 'WhatsApp Business API', startingPrice: 'Starting at ₹2,499', desc: 'Official Meta API for bulk messaging and automation.' },
    ]
  },
]

const WHY_FEATURES = [
  { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10', title: 'One point of contact', desc: 'Tell us once. We coordinate every service, with no repeating your story to five different vendors.', cta: 'See how it works', href: '/#how-it-works' },
  { icon: 'M9 11l3 3L22 4|M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11', title: 'We own it start to finish', desc: 'From first call to final filing, LauncherDesk takes accountability for the outcome, not just the paperwork.', cta: 'See our process', href: '/#how-it-works' },
  { icon: 'M12 2v20|M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', title: 'Transparent pricing', desc: 'No padded bundles. Every quote separates professional fee, government fee and taxes, shown clearly upfront.', cta: 'View pricing', href: '/pricing' },
  { icon: 'M23 6l-9.5 9.5-5-5L1 18', title: 'Proactive reminders', desc: 'We track your deadlines and notify you before they become penalties. Nothing falls through the cracks.', cta: 'Explore compliance', href: '/solutions/compliance-management' },
]

const VS_ROWS = [
  { bad: 'Five vendors, five invoices', good: 'One team, one invoice' },
  { bad: 'Nobody owns the outcome', good: 'We own it start to finish' },
  { bad: 'Repeat your story every time', good: 'Tell us once, we coordinate' },
  { bad: 'Deadlines slip through the cracks', good: 'Proactive reminders so nothing is missed' },
  { bad: 'Discover problems after the fact', good: 'Proactive advice at every step' },
]

const FAQS = [
  { q: 'How quickly can LauncherDesk register my company?', a: 'Private Limited and LLP registration typically takes 7 to 14 working days once all documents are in order, subject to MCA processing times. Some licences like MSME/Udyam can be same-day. We give you realistic timelines upfront, not optimistic guesses.' },
  { q: 'Do I need to visit your office to get started?', a: 'No. Everything is handled digitally, including document collection, verification and filing. Most founders complete their entire registration without visiting any office.' },
  { q: 'How is LauncherDesk different from doing it myself or using a CA?', a: 'A CA typically handles one function (tax or compliance). LauncherDesk coordinates across registration, compliance, technology and growth, through one point of contact. No handoffs, no gaps.' },
  { q: 'What does "transparent pricing" actually mean?', a: 'Every quote we send separates the professional fee (what LauncherDesk charges), the government fee (MCA, stamp duty, etc.) and taxes (GST on the professional fee). We never bundle these into a single headline number.' },
  { q: 'Can LauncherDesk help after registration too?', a: 'Yes, that is the core of what we do. Registration is just the beginning. We support ongoing compliance, accounting, payroll, IT and growth as your business scales.' },
  { q: 'I already have a company but need help with compliance. Can you help?', a: 'Absolutely. We regularly onboard businesses mid-journey, taking over backlogged filings, compliance catch-up, accounting and ongoing support. You do not need to have started with us.' },
]

const HOW_STEPS = [
  { num: '01', title: 'Tell us what you need', desc: 'One conversation with a single point of contact, with no call centres and no runaround.' },
  { num: '02', title: 'Get a clear plan & quote', desc: 'Honest timelines and upfront pricing, broken down so you always know what you are paying for.' },
  { num: '03', title: 'We handle the paperwork', desc: 'Filings, follow-ups and coordination across every service, done for you.' },
  { num: '04', title: 'Stay supported as you grow', desc: 'Ongoing compliance and support so nothing slips through the cracks.' },
]

const RESOURCES = [
  { cat: 'Guide', title: 'Which company structure is right for you?', desc: 'Private Limited, LLP, OPC or Proprietorship, a plain-English breakdown of what each means for your business.', href: '/resources/guides' },
  { cat: 'Blog', title: 'GST registration: everything a new business owner needs to know', desc: 'Who needs it, what it costs, how long it takes, and what happens if you miss the threshold.', href: '/resources/blog' },
  { cat: 'Tools', title: 'Service Finder', desc: 'Answer five questions and get a personalised list of the registrations and services your business actually needs.', href: '/services' },
]

function IndiaFlagIcon() {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 * Math.PI) / 180
    return <line key={i} x1="45" y1="30" x2={45 + 8.5 * Math.cos(a)} y2={30 + 8.5 * Math.sin(a)} stroke="#000080" strokeWidth="0.7" />
  })
  return (
    <svg viewBox="0 0 90 60" width="72" height="48" role="img" aria-label="Flag of India"
      style={{ display: 'inline-block', borderRadius: 4, boxShadow: '0 2px 8px rgba(15,28,46,.18)', border: '1px solid rgba(15,28,46,.12)' }}>
      <rect width="90" height="20" fill="#FF9933" />
      <rect y="20" width="90" height="20" fill="#FFFFFF" />
      <rect y="40" width="90" height="20" fill="#138808" />
      <circle cx="45" cy="30" r="9" fill="none" stroke="#000080" strokeWidth="1.2" />
      <circle cx="45" cy="30" r="1.6" fill="#000080" />
      {spokes}
    </svg>
  )
}

/* ── COMPONENT ────────────────────────────────────────────── */
export default function HomePage() {

  // Lifecycle accordion
  const STAGE_IDS = STAGES.map(s => s.id)
  const DURATION = 4000  // ms each stage stays open
  const [openStage, setOpenStage] = useState('start')
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const rafRef = useRef(null)

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
      const idx = STAGE_IDS.indexOf(openStage)
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
      <SEO
        title="Your Business HQ | Launch. Manage. Grow."
        description="LauncherDesk helps founders and businesses with company registration, GST, compliance, trademark, accounting, website development and growth, all through one platform and one point of contact."
        canonical="/"
        jsonLd={[organizationSchema, websiteSchema]}
      />
      <style>{S}</style>

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section className="hp-hero">
        <div className="hp-hero-inner">
          <div className="hp-hero-grid">
            <div>
              <div className="hp-eyebrow">
                <span className="hp-eyebrow-dot" />
                INDIA'S 360° BUSINESS PLATFORM
              </div>
              <h1>
                Register your<br />
                company.<br />
                <span className="hp-hl-cyan-purple">Run it all from one</span><br />
                <span className="hp-hl-pink">desk.</span>
              </h1>
              <p className="hp-hero-desc">
                From starting your business to managing compliance, technology, finance and growth, LauncherDesk brings every essential service together in one place.
              </p>
              <div className="hp-cta-row">
                <a href="https://wa.me/918548854859?text=Hi%20LauncherDesk%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services." className="hp-btn-wa" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 32 32" width={20} height={20} fill="currentColor" style={{ flexShrink: 0 }}><path d="M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z" /></svg>
                  Chat on WhatsApp
                </a>
                <Link to="/services" className="hp-btn-secondary">
                  Explore Services <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="hp-trust-pills">
                {['15+ Service Categories', 'One Point of Contact', 'Bengaluru-based', 'MSME Registered'].map(t => (
                  <div key={t} className="hp-trust-pill">
                    <span className="hp-pill-check">
                      <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero right: animated platform ecosystem visual */}
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ════════════════════════════════════
          Only verified figures from data/company.js (COMPANY_METRICS) are
          shown here, unverified counts (e.g. total businesses launched)
          stay out until approved, per the site's trust-data-consistency rule. ═══ */}
      <section className="hp-stats">
        <div className="hp-stats-grid">
          {[
            { num: '15+', label: 'Service categories covered' },
            { num: '360°', label: 'Complete business solutions' },
            { num: '1', label: 'Single point of contact' },
            { num: 'flag', label: 'Made in India' },
          ].map(s => (
            <div key={s.num} className="hp-stats-item">
              {s.num === 'flag'
                ? <div style={{ height: 'clamp(32px,4vw,52px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IndiaFlagIcon /></div>
                : <div className="hp-stats-num">{s.num}</div>}
              <div className="hp-stats-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES MARQUEE ════════════════════════════════ */}
      {(() => {
        const items = [
          // Start your business
          { label: 'Private Limited Registration', href: '/services/private-limited-company-registration' },
          { label: 'LLP Registration', href: '/services/llp-registration' },
          { label: 'One Person Company', href: '/services/opc-registration' },
          { label: 'Startup India', href: '/services/startup-india-dpiit' },
          { label: 'ISO Certification', href: '/services/iso-certification' },
          // Registrations & compliance / Legal & IP
          { label: 'GST Registration', href: '/services/gst-registration' },
          { label: 'MSME / Udyam', href: '/services/msme-registration' },
          { label: 'ROC Compliance', href: '/services/roc-compliance' },
          { label: 'Trademark Filing', href: '/services/trademark-registration' },
          { label: 'Income Tax Filing', href: '/services/income-tax-filing' },
          // Manage your business
          { label: 'Accounting & Bookkeeping', href: '/services/accounting' },
          { label: 'Payroll Management', href: '/services/payroll' },
          { label: 'E-Stamp Services', href: '/estamp' },
          // Build
          { label: 'Website Development', href: '/services/website-development' },
          { label: 'Brand Identity Design', href: '/services/branding-logo-design' },
          { label: 'Mobile App Development', href: '/services/mobile-app-development' },
          // Grow
          { label: 'WhatsApp Business API', href: '/services/whatsapp-business-api' },
          { label: 'Social Media Management', href: '/services/social-media-management' },
          { label: 'Digital Marketing', href: '/services/digital-marketing' },
        ]
        const all = [...items, ...items]
        return (
          <div className="hp-marquee-wrap">
            <div className="hp-marquee-track">
              {all.map((s, i) => (
                <a key={i} className="hp-marquee-item" href={s.href}
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1D6FE0'}
                  onMouseLeave={e => e.currentTarget.style.color = ''}>
                  <span className="hp-marquee-dot" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        )
      })()}

      {/* ═══ SERVICES ═══════════════════════════════════════ */}
      <section className="hp-services">
        <div className="hp-section-head">
          <div className="hp-section-eyebrow" style={{ color: 'var(--blue)' }}>Our Services</div>
          <h2>Everything your business needs,<br />in one place.</h2>
          <p>From the first filing to ongoing compliance, technology and growth, all coordinated through LauncherDesk.</p>
        </div>
        <div className="hp-svc-cats">
          {SVC_CATS.map((cat, ci) => (
            <div key={cat.name} className={`hp-svc-cat${openCat === ci ? ' open' : ''}`}>
              <div className="hp-svc-cat-head" onClick={() => setOpenCat(openCat === ci ? -1 : ci)}>
                <div className="hp-svc-cat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {cat.icon.split('|').map((p, i) => <path key={i} d={p} />)}
                  </svg>
                </div>
                <div className="hp-svc-cat-name">{cat.name}</div>
                <span className="hp-svc-cat-count">{cat.count} services</span>
                <svg className="hp-svc-cat-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
              <div className={`hp-svc-cat-body${openCat === ci ? ' open' : ''}`}>
                <div className="hp-svc-cards">
                  {cat.services.map(svc => (
                    <Link key={svc.name} to={svc.href} className="hp-svc-card">
                      <div className="hp-svc-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          {svc.icon.split('|').map((p, i) => <path key={i} d={p} />)}
                        </svg>
                      </div>
                      <div className="hp-svc-card-name">{svc.name}</div>
                      {svc.startingPrice && <span className="hp-svc-price-badge">{svc.startingPrice}</span>}
                      <div className="hp-svc-card-desc">{svc.desc}</div>
                      <div className="hp-svc-card-arrow">
                        Learn more
                        <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ WHY LAUNCHERDESK ════════════════════════════════ */}
      <section className="hp-why">
        <div className="hp-why-connector" aria-hidden="true">
          <span className="hp-why-connector-dot hp-why-connector-dot--a" />
          <span className="hp-why-connector-dot hp-why-connector-dot--b" />
        </div>

        {/* ── Centered intro: eyebrow + heading + paragraph ── */}
        <div className="hp-why-intro">
          <div className="hp-section-eyebrow reveal-up" style={{ transitionDelay: '0ms' }}>
            <span className="hp-why-eyebrow-line" aria-hidden="true" />
            Why LauncherDesk
            <span className="hp-why-eyebrow-line hp-why-eyebrow-line--right" aria-hidden="true" />
          </div>
          <h2 className="reveal-up" style={{ transitionDelay: '80ms' }}>
            <span className="hp-why-accent">One desk</span> beats multiple vendors.
          </h2>
          <p className="reveal-up" style={{ transitionDelay: '160ms' }}>
            Most founders waste months juggling CAs, lawyers, web agencies and consultants, each one solving only their piece. LauncherDesk coordinates the whole picture.
          </p>
        </div>

        {/* ── Two-column: feature cards + comparison table ── */}
        <div className="hp-why-grid" style={{ gridTemplateColumns: '1fr', maxWidth: 820 }}>
          <div className="hp-why-left">
            <div className="hp-why-features reveal-up">
              {WHY_FEATURES.map((f, i) => (
                <div key={f.title} className="hp-why-feat" style={{ animationDelay: `${300 + i * 100}ms` }}
                  onMouseMove={e => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
                    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
                  }}
                >
                  <span className="hp-why-feat-glow" aria-hidden="true" />
                  <div className="hp-why-feat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      {f.icon.split('|').map((p, i) => <path key={i} d={p} />)}
                    </svg>
                  </div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                    {f.href && (
                      f.href.includes('#') ? (
                        // Plain <a> for hash anchors: <Link> only changes the
                        // route, it never scrolls to the fragment, so a
                        // client-side nav to "/#how-it-works" would look
                        // like the button does nothing (site-wide convention,
                        // see Navbar's "Get Started" for the same pattern).
                        <a href={f.href} className="hp-why-feat-link">{f.cta} →</a>
                      ) : (
                        <Link to={f.href} className="hp-why-feat-link">{f.cta} →</Link>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ REAL BUSINESSES / TESTIMONIALS ══════════════════
          Phase 6/7, reads only from data/trust.js (REVIEWS, CASE_STUDIES),
          which ship empty until the business team adds verified entries. ═══ */}
      <CaseStudiesSection />

      {/* ═══ LIFECYCLE ACCORDION ════════════════════════════ */}
      <section className="lc2-section" id="how-it-works">
        <div className="lc2-inner">
          <div className="lc2-left">
            <div className="hp-eyebrow" style={{ marginBottom: 18 }}>
              <span className="hp-eyebrow-dot" />
              Your business journey
            </div>
            <h2 className="lc2-heading">Incorporation is just the start.<br />We run the whole business.</h2>
            <p className="lc2-desc">Building and scaling a company takes expertise across registrations, compliance, IT, finance, legal and marketing. LauncherDesk replaces multiple vendors with a single integrated platform.</p>
            <Link to="/services" className="hp-btn-pill-primary">
              Explore all services
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="lc2-list">
            {STAGES.map(s => (
              <div key={s.id} className={`lc2-item${openStage === s.id ? ' lc2-open' : ''}`}>
                <button className="lc2-trigger" onClick={() => toggleStage(s.id)}
                  title={openStage === s.id ? (paused ? 'Click to resume' : 'Click to pause') : 'Click to open'}>
                  <span className="lc2-num">{s.num}</span>
                  <span className="lc2-name">{s.name}</span>
                  {openStage === s.id && paused
                    ? <svg className="lc2-chevron" viewBox="0 0 24 24" style={{ stroke: 'var(--blue)' }}><path d="M10 9v6m4-6v6" /></svg>
                    : <svg className="lc2-chevron" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                  }
                </button>
                <div className="lc2-body" style={{ maxHeight: openStage === s.id ? '400px' : '0' }}>
                  <div className="lc2-body-inner">
                    <p className="lc2-body-desc">{s.desc}</p>
                    <div className="lc2-chips">
                      {s.chips.map(c => <Link key={c.l} to={c.h} className="lc2-chip">{c.l}</Link>)}
                    </div>
                    {s.ctaLabel && (
                      <div className="lc2-cta">
                        <span>{s.ctaPrompt}</span>
                        {s.ctaHref.includes('#') ? (
                          <a href={s.ctaHref} className="lc2-cta-btn">
                            {s.ctaLabel}
                            <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          </a>
                        ) : (
                          <Link to={s.ctaHref} className="lc2-cta-btn">
                            {s.ctaLabel}
                            <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="lc2-prog"><div className="lc2-prog-bar" data-prog={s.id} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* ═══ FAQ ══════════════════════════════════════════════ */}
      <section className="hp-faq">
        <div className="hp-faq-inner">
          <div className="hp-section-head">
            <div className="hp-section-eyebrow" style={{ color: '#0284C7' }}>FAQ</div>
            <h2>Frequently asked questions.</h2>
            <p>Answers to the questions founders ask us every day.</p>
          </div>
          <div className="hp-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className="hp-faq-item">
                <div className="hp-faq-q">
                  <div className="hp-faq-q-text">{f.q}</div>
                  <div className="hp-faq-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                  </div>
                </div>
                <div className="hp-faq-a">
                  <div className="hp-faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ════════════════════════════════════════ */}
      <section className="hp-cta-section">
        <div className="hp-cta-card">
          <div className="hp-cta-inner">
            <h2>Ready to get everything under one roof?</h2>
            <p>One chat is all it takes. Tell us what your business needs and we'll handle the rest, honestly and on time.</p>
            <div className="hp-cta-btns">
              <a href="https://wa.me/918548854859?text=Hi%20LauncherDesk%2C%20I%20would%20like%20to%20discuss%20my%20business%20requirements." className="hp-cta-btn-wa" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 32 32" width={20} height={20} fill="currentColor" style={{ flexShrink: 0 }}><path d="M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z" /></svg>
                Chat on WhatsApp
              </a>
              <Link to="/company/contact" className="hp-cta-btn-exp">
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a consultation
              </Link>
              <button type="button" data-open-ai="true" className="hp-cta-btn-ai">
                Ask Sneha
              </button>
            </div>
            <div className="hp-cta-microcopy">
              <span>Free initial guidance</span>
              <span className="hp-cta-divider" aria-hidden="true" />
              <span>No obligation</span>
              <span className="hp-cta-divider" aria-hidden="true" />
              <span>Transparent pricing</span>
            </div>
          </div>
        </div>
      </section>
    </>
 )
}