import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { EAccordion } from '../estamp/estampKit'
import {
  TRANSPARENCY_HERO, TRANSPARENCY_SECTIONS, WHO_WE_ARE, HOW_IT_WORKS_INTRO, HOW_IT_WORKS_STEPS,
  GOVERNMENT_INTERACTION, ORDERING_PAYMENTS, USER_RESPONSIBILITY, CORPORATE_DETAILS, TRANSPARENCY_FAQS,
} from '../../data/transparency'

const CSS = `
.trp {
  background: var(--bg-primary, #0A0E14);
  color: var(--text, #FFFFFF);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.trp::before {
  content: '';
  position: absolute;
  top: 0;
  left: 20%;
  width: 600px;
  height: 400px;
  background: radial-gradient(circle, rgba(33, 150, 243, 0.08) 0%, transparent 70%);
  pointer-events: none;
}
.trp-wrap { max-width: 1440px; margin: 0 auto; padding: 0 36px; box-sizing: border-box; position: relative; z-index: 1; }
@media (min-width: 1025px) { .trp-wrap { max-width: 1420px; width: calc(100% - 40px); } }
@media (max-width: 1280px) { .trp-wrap { padding: 0 24px; } }
@media (max-width: 768px) { .trp-wrap { padding: 0 16px; } }

.trp-crumb { font-size: 13.5px; color: var(--text-3, #B9C2CF); margin: 24px 0 0; }
.trp-crumb a { color: var(--text-3, #B9C2CF); text-decoration: none; }
.trp-crumb a:hover { color: #2196F3; }

.trp-hero { padding: clamp(28px, 3.5vw, 44px) 0 clamp(20px, 3vw, 32px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
.trp-badge {
  display: inline-flex; align-items: center; gap: 7px; margin: 0 0 14px; padding: 6px 14px; border-radius: 99px;
  background: rgba(33, 150, 243, 0.12); color: #2196F3; border: 1px solid rgba(33, 150, 243, 0.25);
  font-size: 11.5px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
}
.trp-hero h1 { font-size: clamp(30px, 4vw, 46px); line-height: 1.15; letter-spacing: -.03em; font-weight: 800; margin: 0 0 14px; color: #FFFFFF; }
.trp-hero p.lead { font-size: 16px; line-height: 1.65; color: var(--text-2, #B9C2CF); max-width: 72ch; margin: 0; }

.trp-notice {
  display: flex; gap: 14px; align-items: flex-start;
  background: linear-gradient(135deg, rgba(30, 136, 229, 0.14), rgba(124, 77, 255, 0.10));
  border: 1px solid rgba(33, 150, 243, 0.25);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  color: #FFFFFF; border-radius: 16px; padding: 18px 24px; margin: 24px 0 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  animation: trpFade .5s ease both;
}
.trp-notice svg { flex: none; margin-top: 2px; stroke: #2196F3; }
.trp-notice p { margin: 0; font-size: 14.5px; line-height: 1.6; color: #E2E8F0; }
.trp-notice b { font-weight: 800; color: #FFFFFF; }

.trp-body { padding: clamp(28px, 4vw, 44px) 0 clamp(48px, 6vw, 72px); }
.trp-grid { display: grid; grid-template-columns: 240px 1fr; gap: clamp(28px, 4vw, 48px); align-items: start; }
@media (max-width: 900px) { .trp-grid { grid-template-columns: 1fr; } }

.trp-nav { position: sticky; top: 96px; display: grid; gap: 4px; }
.trp-nav-label { font-size: 11px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--text-3, #B9C2CF); margin-bottom: 10px; }
.trp-nav a {
  display: block; padding: 10px 14px; border-radius: 10px; font-size: 13.5px; font-weight: 600;
  color: var(--text-2, #B9C2CF); text-decoration: none; border-left: 3px solid transparent;
  background: rgba(255, 255, 255, 0.02); transition: all .18s ease;
}
.trp-nav a:hover { background: rgba(255, 255, 255, 0.06); color: #FFFFFF; }
.trp-nav a.active {
  background: rgba(33, 150, 243, 0.12); color: #2196F3; border-left-color: #2196F3;
  border: 1px solid rgba(33, 150, 243, 0.25); border-left-width: 3px; font-weight: 800;
  box-shadow: 0 4px 16px rgba(33, 150, 243, 0.15);
}
@media (max-width: 900px) {
  .trp-nav { position: static; display: flex; flex-wrap: wrap; gap: 8px; }
  .trp-nav a { border-left: 1px solid rgba(255, 255, 255, 0.08); }
}

.trp-sec { margin-bottom: clamp(36px, 5vw, 56px); scroll-margin-top: 100px; opacity: 0; transform: translateY(10px); animation: trpReveal .5s ease forwards; }
.trp-sec:last-child { margin-bottom: 0; }
.trp-sec h2 { font-size: clamp(20px, 2.4vw, 26px); color: #FFFFFF; margin: 0 0 18px; font-weight: 800; letter-spacing: -.02em; }
.trp-sec p { font-size: 15px; line-height: 1.7; color: var(--text-2, #B9C2CF); margin: 0 0 14px; }
.trp-sec p:last-child { margin-bottom: 0; }

.trp-two { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
@media (max-width: 700px) { .trp-two { grid-template-columns: 1fr; } }
.trp-card {
  background: rgba(22, 27, 34, 0.78); border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border-radius: 18px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  transition: transform .2s ease, border-color .2s ease;
}
.trp-card:hover { border-color: rgba(33, 150, 243, 0.3); transform: translateY(-2px); }
.trp-card h3 { margin: 0 0 10px; font-size: 16px; color: #FFFFFF; font-weight: 800; }
.trp-card p { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--text-2, #B9C2CF); }

.trp-legend { display: flex; gap: 18px; flex-wrap: wrap; margin: 0 0 20px; font-size: 13px; color: var(--text-2, #B9C2CF); }
.trp-legend span { display: inline-flex; align-items: center; gap: 6px; }
.trp-legend i { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }

.trp-steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
.trp-steps li {
  display: flex; gap: 16px; align-items: flex-start;
  background: rgba(16, 24, 39, 0.65); border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border-radius: 16px; padding: 18px 20px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  transition: border-color .18s ease;
}
.trp-steps li:hover { border-color: rgba(47, 128, 255, 0.35); }
.trp-steps .n {
  flex: none; width: 32px; height: 32px; border-radius: 50%;
  background: rgba(47, 128, 255, 0.15); color: #2F80FF; border: 1px solid rgba(47, 128, 255, 0.3);
  font-weight: 800; font-size: 13px; display: grid; place-items: center;
}
.trp-steps b { display: block; font-size: 15px; color: #FFFFFF; margin-bottom: 4px; }
.trp-steps span.d { display: block; font-size: 13.5px; color: var(--text-2, #B8C5D8); line-height: 1.6; }
.trp-tag { flex: none; font-size: 10.5px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; padding: 3px 10px; border-radius: 99px; align-self: flex-start; }
.trp-tag.you { background: rgba(47, 128, 255, 0.15); color: #2F80FF; border: 1px solid rgba(47, 128, 255, 0.28); }
.trp-tag.team { background: rgba(16, 185, 129, 0.15); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.28); }
.trp-tag.govt { background: rgba(245, 158, 11, 0.15); color: #F59E0B; border: 1px solid rgba(245, 158, 11, 0.28); }

.trp-callout {
  background: rgba(37, 99, 235, 0.10); border: 1px solid rgba(47, 128, 255, 0.20);
  border-radius: 16px; padding: 20px 22px; margin-top: 16px; backdrop-filter: blur(12px);
}
.trp-callout p { margin: 0; font-size: 14px; line-height: 1.65; color: #E2E8F0; }

.trp-feetable { width: 100%; border-collapse: collapse; margin: 0 0 20px; }
.trp-feetable th, .trp-feetable td { text-align: left; padding: 14px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-size: 14px; }
.trp-feetable th { color: var(--text-3, #8A98AA); font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; background: rgba(255, 255, 255, 0.02); }
.trp-feetable td:first-child { font-weight: 700; color: #FFFFFF; white-space: nowrap; }
.trp-feetable td:last-child { color: var(--text-2, #B8C5D8); }

.trp-dl { margin: 0; display: grid; gap: 10px; }
.trp-dl > div { display: grid; grid-template-columns: 200px 1fr; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-size: 14px; }
.trp-dl dt { color: var(--text-3, #8A98AA); font-weight: 600; }
.trp-dl dd { margin: 0; color: #FFFFFF; font-weight: 700; }
.trp-dl dd a { color: #2F80FF; text-decoration: none; }
.trp-dl dd a:hover { text-decoration: underline; }
@media (max-width: 600px) { .trp-dl > div { grid-template-columns: 1fr; gap: 4px; } }

.trp-cta {
  display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; border-radius: 22px;
  padding: clamp(24px, 3vw, 36px);
  background: linear-gradient(135deg, rgba(16, 24, 39, 0.95), rgba(11, 18, 32, 0.95));
  border: 1px solid rgba(255, 255, 255, 0.10); margin-top: clamp(36px, 5vw, 56px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5); backdrop-filter: blur(20px);
}
.trp-cta h3 { margin: 0 0 6px; font-size: clamp(18px, 2vw, 22px); color: #FFFFFF; letter-spacing: -.02em; font-weight: 800; }
.trp-cta p { margin: 0; font-size: 14px; color: var(--text-2, #B8C5D8); }
.trp-cta a {
  background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
  color: #FFFFFF; font-weight: 800; padding: 13px 26px; border-radius: 999px; text-decoration: none; white-space: nowrap;
  box-shadow: 0 4px 18px rgba(37, 99, 235, 0.4); transition: transform .2s ease, box-shadow .2s ease;
}
.trp-cta a:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(37, 99, 235, 0.55); }

@keyframes trpReveal { to { opacity:1; transform:translateY(0); } }
@keyframes trpFade { from { opacity:0; } to { opacity:1; } }
`

function SectionHeading({ id, children }) {
  return <h2 id={id}>{children}</h2>
}

function ContactValue({ value }) {
  if (/^\S+@\S+\.\S+$/.test(value)) return <a href={`mailto:${value}`}>{value}</a>
  if (/^\+?[\d\s]{8,}$/.test(value)) return <a href={`tel:${value.replace(/\s+/g, '')}`}>{value}</a>
  return value
}

export default function TransparencyPage() {
  const [active, setActive] = useState(TRANSPARENCY_SECTIONS[0].id)
  const sectionRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-110px 0px -70% 0px', threshold: 0 }
    )
    TRANSPARENCY_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const goTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <SEO title="Disclaimer & Transparency" description="LauncherDesk's corporate status, how our platform works, government interaction, and how orders and payments are handled." canonical="/transparency" />
      <style>{CSS}</style>

      <div className="trp">
        <nav className="trp-crumb trp-wrap" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / Transparency &amp; Compliance
        </nav>

        <section className="trp-hero">
          <div className="trp-wrap">
            <span className="trp-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z" /><path d="m9 12 2 2 4-4" /></svg>
              {TRANSPARENCY_HERO.badge}
            </span>
            <h1>{TRANSPARENCY_HERO.title}</h1>
            <p className="lead">{TRANSPARENCY_HERO.intro}</p>

            <div className="trp-notice">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v5" /><path d="M12 16h.01" /></svg>
              <p><b>Important Notice.</b> {TRANSPARENCY_HERO.notice}</p>
            </div>
          </div>
        </section>

        <section className="trp-body">
          <div className="trp-wrap">
            <div className="trp-grid">
              <nav className="trp-nav" aria-label="On this page">
                <div className="trp-nav-label">On this page</div>
                {TRANSPARENCY_SECTIONS.map(s => (
                  <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''} onClick={e => goTo(e, s.id)}>{s.label}</a>
                ))}
              </nav>

              <div>
                <div className="trp-sec" id="who-we-are">
                  <SectionHeading>Who We Are</SectionHeading>
                  <div className="trp-two">
                    <div className="trp-card"><h3>{WHO_WE_ARE.company.title}</h3><p>{WHO_WE_ARE.company.body}</p></div>
                    <div className="trp-card"><h3>{WHO_WE_ARE.platform.title}</h3><p>{WHO_WE_ARE.platform.body}</p></div>
                  </div>
                </div>

                <div className="trp-sec" id="how-it-works">
                  <SectionHeading>How It Works</SectionHeading>
                  <p>{HOW_IT_WORKS_INTRO}</p>
                  <div className="trp-legend">
                    <span><i style={{ background: '#1D4ED8' }} />You</span>
                    <span><i style={{ background: '#047857' }} />LauncherDesk team</span>
                    <span><i style={{ background: '#92400E' }} />Government</span>
                  </div>
                  <ol className="trp-steps">
                    {HOW_IT_WORKS_STEPS.map((s, i) => (
                      <li key={s.title}>
                        <span className="n">{i + 1}</span>
                        <div style={{ flex: 1 }}><b>{s.title}</b><span className="d">{s.body}</span></div>
                        <span className={`trp-tag ${s.who}`}>{s.who === 'you' ? 'You' : s.who === 'team' ? 'LauncherDesk team' : 'Government'}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="trp-sec" id="government-interaction">
                  <SectionHeading>Government Interaction</SectionHeading>
                  <h3 style={{ fontSize: 16, color: '#FFFFFF', margin: '0 0 10px' }}>{GOVERNMENT_INTERACTION.heading}</h3>
                  <p>{GOVERNMENT_INTERACTION.body}</p>
                  <div className="trp-two">
                    <div className="trp-card">
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 8 }}>{GOVERNMENT_INTERACTION.issuedBy.label}</div>
                      <h3>{GOVERNMENT_INTERACTION.issuedBy.title}</h3>
                      <p>{GOVERNMENT_INTERACTION.issuedBy.body}</p>
                    </div>
                    <div className="trp-card">
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 8 }}>{GOVERNMENT_INTERACTION.handledBy.label}</div>
                      <h3>{GOVERNMENT_INTERACTION.handledBy.title}</h3>
                      <p>{GOVERNMENT_INTERACTION.handledBy.body}</p>
                    </div>
                  </div>
                  <div className="trp-callout"><p>{GOVERNMENT_INTERACTION.directCallout}</p></div>
                </div>

                <div className="trp-sec" id="ordering-payments">
                  <SectionHeading>Ordering, Payments &amp; Policies</SectionHeading>
                  <p>{ORDERING_PAYMENTS.intro}</p>
                  <table className="trp-feetable">
                    <thead><tr><th>Fee component</th><th>Description</th></tr></thead>
                    <tbody>
                      {ORDERING_PAYMENTS.feeTable.map(f => <tr key={f.label}><td>{f.label}</td><td>{f.body}</td></tr>)}
                    </tbody>
                  </table>
                  <div className="trp-two">
                    <div className="trp-card"><h3>{ORDERING_PAYMENTS.securePayments.title}</h3><p>{ORDERING_PAYMENTS.securePayments.body}</p></div>
                    <div className="trp-card"><h3>{ORDERING_PAYMENTS.confidentiality.title}</h3><p>{ORDERING_PAYMENTS.confidentiality.body}</p></div>
                  </div>
                  <div className="trp-callout" style={{ marginTop: 18 }}>
                    <p><b>{ORDERING_PAYMENTS.refunds.title}.</b> {ORDERING_PAYMENTS.refunds.body}</p>
                  </div>
                </div>

                <div className="trp-sec" id="user-responsibility">
                  <SectionHeading>User Responsibility</SectionHeading>
                  {USER_RESPONSIBILITY.importantNotice.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                  <div className="trp-two" style={{ marginTop: 6 }}>
                    <div className="trp-card"><h3>{USER_RESPONSIBILITY.thirdParty.title}</h3><p>{USER_RESPONSIBILITY.thirdParty.body}</p></div>
                    <div className="trp-card"><h3>{USER_RESPONSIBILITY.noGuarantee.title}</h3><p>{USER_RESPONSIBILITY.noGuarantee.body}</p></div>
                    <div className="trp-card"><h3>{USER_RESPONSIBILITY.userResponsibility.title}</h3><p>{USER_RESPONSIBILITY.userResponsibility.body}</p></div>
                    <div className="trp-card"><h3>{USER_RESPONSIBILITY.limitation.title}</h3><p>{USER_RESPONSIBILITY.limitation.body}</p></div>
                  </div>
                  <p style={{ marginTop: 18 }}>
                    {USER_RESPONSIBILITY.closing.replace('Terms of Use, Privacy Policy, and applicable service-specific terms and conditions.', '')}
                    <Link to="/legal/terms">Terms of Use</Link>, <Link to="/legal/privacy">Privacy Policy</Link>, and applicable service-specific terms and conditions.
                  </p>
                </div>

                <div className="trp-sec" id="corporate-details">
                  <SectionHeading>Corporate Details</SectionHeading>
                  <p>{CORPORATE_DETAILS.intro}</p>
                  <div className="trp-two">
                    <div className="trp-card">
                      <h3>Legal Identity</h3>
                      <dl className="trp-dl">
                        {CORPORATE_DETAILS.legalIdentity.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                      </dl>
                    </div>
                    <div className="trp-card">
                      <h3>Contacts &amp; Support</h3>
                      <dl className="trp-dl">
                        {CORPORATE_DETAILS.contacts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd><ContactValue value={v} /></dd></div>)}
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="trp-sec">
                  <SectionHeading>Frequently Asked Questions</SectionHeading>
                  <EAccordion items={TRANSPARENCY_FAQS} />
                </div>

                <div className="trp-cta">
                  <div>
                    <h3>Questions about how LauncherDesk works?</h3>
                    <p>Our support team is available on WhatsApp and email.</p>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <Link to="/legal/disclaimer" style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#FFFFFF', border: '1.5px solid rgba(255, 255, 255, 0.12)', fontWeight: 800, padding: '12px 22px', borderRadius: 11, textDecoration: 'none' }}>Read full Disclaimer</Link>
                    <a href="https://wa.me/918548854859" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
