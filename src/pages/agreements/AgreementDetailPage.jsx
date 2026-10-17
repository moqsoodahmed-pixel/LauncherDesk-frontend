import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import SEO from '../../components/SEO'
import {
  agreementBySlug, AGREEMENT_PRICING, AGREEMENT_DOCUMENTS, DRAFT_PREVIEWS, LD_WA,
  agreementOverview, agreementPurpose, agreementWhenToUse, AGREEMENT_BENEFITS, AGREEMENT_FEATURES,
  agreementEligibility, AGREEMENT_PROCESS, agreementFaqs, relatedAgreements,
} from '../../data/agreements'
import { EAccordion } from '../estamp/estampKit'

const inr = n => `₹${Number(n).toLocaleString('en-IN')}`

const CSS = `
.agd-wrap { max-width:1480px; margin:0 auto; padding:0 36px; box-sizing:border-box; }
@media (min-width:1025px) { .agd-wrap { max-width:1460px; width:calc(100% - 40px); } }
@media (max-width:1280px) { .agd-wrap { padding:0 20px; } }
@media (max-width:768px) { .agd-wrap { padding:0 14px; } }

.agd-crumb { font-size:13.5px; color:var(--text-3); margin:20px 0 0; }
.agd-crumb a { color:var(--text-3); text-decoration:none; } .agd-crumb a:hover { color:var(--blue); }

.agd-hero { background:var(--bg-primary, #0A0E14); padding:clamp(28px,4vw,48px) 0 clamp(36px,5vw,56px); border-bottom:1px solid var(--line); }
.agd-eyebrow { display:inline-block; margin:0 0 14px; padding:5px 14px; border-radius:99px; background:rgba(33, 150, 243, 0.12); color:var(--blue, #2196F3);
  font-size:12px; font-weight:800; letter-spacing:.07em; text-transform:uppercase; border:1px solid rgba(33, 150, 243, 0.25); }
.agd-hero h1 { font-size:clamp(28px,3.6vw,40px); line-height:1.2; letter-spacing:-.03em; font-weight:800; margin:0 0 12px; color:#FFFFFF; }
.agd-hero p { font-size:16px; line-height:1.6; color:var(--text-2, #B9C2CF); max-width:62ch; margin:0 0 20px; }
.agd-badges { display:flex; flex-wrap:wrap; gap:10px; }
.agd-badge { padding:6px 14px; border-radius:99px; background:rgba(255, 255, 255, 0.05); color:#FFFFFF; font-size:13px; font-weight:700; border:1px solid var(--line); }

.agd-body { padding:clamp(32px,4vw,48px) 0 clamp(48px,6vw,72px); }
.agd-body.has-draft .agd-wrap { display:grid; grid-template-columns:1fr 480px; gap:clamp(24px,3vw,40px); align-items:start; }

.agd-sec { margin-bottom:clamp(32px,4vw,44px); }
.agd-sec:last-child { margin-bottom:0; }
.agd-sec h2 { font-size:clamp(20px,2.4vw,26px); color:#FFFFFF; margin:0 0 20px; font-weight:800; letter-spacing:-.02em; }

.agd-tiers { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
.agd-tier { border:1.5px solid var(--line); border-radius:16px; padding:22px; background:var(--card); backdrop-filter:blur(16px); text-align:left; cursor:pointer;
  font-family:inherit; width:100%; display:block; transition:border-color .15s, background .15s; color:#FFFFFF; }
.agd-tier:hover { border-color:var(--blue, #2196F3); }
.agd-tier[aria-pressed="true"] { border-color:var(--blue, #2196F3); background:rgba(33, 150, 243, 0.12); box-shadow:0 0 0 3px rgba(33, 150, 243, 0.18); }
.agd-tier h3 { margin:0 0 6px; font-size:17px; color:#FFFFFF; display:flex; align-items:center; gap:8px; }
.agd-tier .sel-dot { width:18px; height:18px; border-radius:50%; border:2px solid var(--line); flex:none; display:grid; place-items:center; }
.agd-tier[aria-pressed="true"] .sel-dot { border-color:var(--blue, #2196F3); background:var(--blue, #2196F3); }
.agd-tier[aria-pressed="true"] .sel-dot::after { content:''; width:7px; height:7px; border-radius:50%; background:#fff; }
.agd-tier .docval { font-size:13px; color:var(--text-3); margin:0 0 14px; }
.agd-tier .price { font-size:30px; font-weight:800; color:#FFFFFF; letter-spacing:-.02em; }
.agd-tier .price span { font-size:14px; font-weight:600; color:var(--text-3); }
.agd-tier ul { list-style:none; margin:16px 0 0; padding:0; display:grid; gap:9px; }
.agd-tier li { font-size:14px; color:var(--text-2, #B9C2CF); display:flex; gap:8px; }
.agd-tier li::before { content:'✓'; color:var(--blue, #2196F3); font-weight:800; flex:none; }

.agd-docs { list-style:none; margin:0; padding:0; display:grid; gap:10px; max-width:60ch; }
.agd-docs li { font-size:14.5px; color:var(--text-2, #B9C2CF); padding:12px 16px; background:var(--card); border:1px solid var(--line); border-radius:10px; }

.agd-cta { display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap; border-radius:22px;
  padding:clamp(24px,3vw,32px); background:var(--card-glass, rgba(22, 27, 34, 0.78)); backdrop-filter:blur(24px); border:1px solid var(--line); }
.agd-cta h3 { margin:0 0 4px; font-size:clamp(18px,2.2vw,22px); color:#FFFFFF; letter-spacing:-.02em; }
.agd-cta p { margin:0; font-size:13.5px; color:var(--text-2, #B9C2CF); }
.agd-cta a { background:linear-gradient(135deg, #1E88E5 0%, #7C4DFF 100%); color:#fff; font-weight:800; padding:14px 24px; border-radius:11px; text-decoration:none; white-space:nowrap; box-shadow:0 4px 16px rgba(30,136,229,0.35); }
.agd-cta a:hover { transform:translateY(-1px); }

/* Sample draft — sticky, internally scrollable panel to the right, filling the empty space */
.agd-draft-col { position:sticky; top:96px; }
.agd-draft-col h2 { font-size:16px; margin:0 0 12px; color:#FFFFFF; }
.agd-draft-note { display:flex; gap:10px; align-items:center; background:rgba(245, 158, 11, 0.12); border:1px solid rgba(245, 158, 11, 0.25); color:#FBBF24;
  border-radius:10px; padding:10px 14px; font-size:13px; margin-bottom:14px; }
.agd-doc { background:rgba(12, 23, 38, 0.9); border:1px solid var(--line); border-radius:14px; padding:clamp(18px,2.4vw,26px); font-family:Georgia, 'Times New Roman', serif;
  max-height:72vh; overflow-y:auto; overscroll-behavior:contain; color:#CBD5E1; }
.agd-doc h4 { text-align:center; font-size:16px; letter-spacing:.02em; margin:0 0 16px; color:#FFFFFF; }
.agd-doc p { font-size:13.5px; line-height:1.65; color:#CBD5E1; margin:0 0 11px; }
.agd-doc mark { background:rgba(245, 158, 11, 0.2); color:#FDE68A; padding:0 2px; }
.agd-doc .clause { margin:0 0 13px; }
.agd-doc .clause b { display:block; font-size:13.5px; color:#FFFFFF; margin-bottom:3px; }
.agd-doc .clause span { font-size:13px; line-height:1.6; color:var(--text-2); }
.agd-doc hr { border:0; border-top:1px dashed var(--line); margin:16px 0; }

@media (max-width:1024px) { .agd-body.has-draft .agd-wrap { grid-template-columns:1fr; } .agd-draft-col { position:static; } .agd-doc { max-height:520px; } }
@media (max-width:700px) { .agd-tiers { grid-template-columns:1fr; } }

.agd-sec p.lead { font-size:15px; line-height:1.65; color:var(--text-2); max-width:70ch; margin:0; }
.agd-benefits { list-style:none; margin:0; padding:0; display:grid; gap:10px; max-width:60ch; }
.agd-benefits li { display:flex; gap:10px; font-size:14.5px; color:var(--text-2); line-height:1.5; }
.agd-benefits li::before { content:'✓'; color:var(--blue); font-weight:800; flex:none; }
.agd-process { list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(4,1fr); gap:16px; counter-reset:agdstep; }
.agd-process li { position:relative; padding:0; }
.agd-process li::before { counter-increment:agdstep; content:counter(agdstep); display:grid; place-items:center; width:36px; height:36px; margin:0 0 10px;
  border-radius:50%; background:rgba(8, 17, 29, 0.9); border:2px solid var(--blue); color:var(--blue); font-weight:800; font-size:14px; }
.agd-process b { display:block; font-size:14.5px; color:#FFFFFF; margin-bottom:4px; }
.agd-process span { display:block; font-size:13px; color:var(--text-2); line-height:1.5; }
.agd-related { list-style:none; margin:0; padding:0; display:flex; flex-wrap:wrap; gap:10px; }
.agd-related a { display:inline-flex; align-items:center; padding:10px 16px; border-radius:10px; border:1px solid var(--line);
  color:#FFFFFF; font-weight:700; font-size:14px; text-decoration:none; background:var(--card); }
.agd-related a:hover { border-color:var(--blue); background:rgba(47, 128, 255, 0.12); color:var(--blue); }

@media (max-width:700px) { .agd-process { grid-template-columns:1fr 1fr; } }

.agd-steps { list-style:none; margin:0; padding:0; display:grid; gap:16px; max-width:70ch; }
.agd-steps li { display:flex; gap:14px; align-items:flex-start; }
.agd-steps .n { flex:none; width:32px; height:32px; border-radius:50%; background:rgba(47, 128, 255, 0.12); border:1.5px solid rgba(47, 128, 255, 0.25);
  color:var(--blue); font-weight:800; font-size:14px; display:grid; place-items:center; }
.agd-steps b { display:block; font-size:14.5px; color:#FFFFFF; margin-bottom:3px; }
.agd-steps span { display:block; font-size:13.5px; color:var(--text-2); line-height:1.5; }

.agd-support { display:flex; gap:12px; flex-wrap:wrap; }
.agd-support a { display:inline-flex; align-items:center; padding:10px 18px; border-radius:10px; border:1.5px solid var(--line);
  color:#FFFFFF; font-weight:700; font-size:14px; text-decoration:none; background:rgba(255, 255, 255, 0.05); }
.agd-support a:hover { border-color:var(--blue); background:rgba(47, 128, 255, 0.12); color:var(--blue); }
`

/** Replaces each blank-underscore run with a highlighted placeholder span, like a live draft preview. */
function DraftText({ text }) {
  const parts = text.split('_______________')
  return <>{parts.map((p, i) => <span key={i}>{p}{i < parts.length - 1 && <mark>&nbsp;&nbsp;&nbsp;&nbsp;</mark>}</span>)}</>
}

export default function AgreementDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const agreement = agreementBySlug(slug)
  const [tier, setTier] = useState('standard')
  if (!agreement) return <Navigate to="/agreements" replace />

  const { title, sectionTitle, sectionId } = agreement
  const draft = DRAFT_PREVIEWS[slug]
  const relatedList = relatedAgreements(slug)
  const selected = AGREEMENT_PRICING[tier]
  const waLink = `https://wa.me/${LD_WA}?text=${encodeURIComponent(`Hi, I need a ${title} drafted (${selected.label} package, ${inr(selected.price)} + GST).`)}`

  return (
    <>
      <SEO title={`${title} — LauncherDesk`} description={`Get your ${title.toLowerCase()} drafted by our documentation team. Transparent pricing, clear document checklist.`} canonical={`/agreements/${slug}`} />
      <style>{CSS}</style>

      <nav className="agd-crumb agd-wrap" aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to="/agreements">Deeds &amp; Agreements</Link> / <Link to={`/agreements#${sectionId}`}>{sectionTitle}</Link> / {title}
      </nav>

      <section className="agd-hero">
        <div className="agd-wrap">
          <span className="agd-eyebrow">{sectionTitle}</span>
          <h1>{title}</h1>
          <p>Our documentation team drafts your {title.toLowerCase()}, reviewed for accuracy before it reaches you.</p>
          <div className="agd-badges">
            <span className="agd-badge">Doorstep delivery</span>
            <span className="agd-badge">Secure legal draft</span>
            <span className="agd-badge">Fast turnaround</span>
          </div>
        </div>
      </section>

      <section className={`agd-body${draft ? ' has-draft' : ''}`}>
        <div className="agd-wrap">
          <div>
            <div className="agd-sec">
              <h2>About this Agreement</h2>
              <p className="lead">{agreementOverview(title)}</p>
            </div>

            <div className="agd-sec">
              <h2>Purpose</h2>
              <p className="lead">{agreementPurpose(title)}</p>
            </div>

            <div className="agd-sec">
              <h2>When to Use</h2>
              <p className="lead">{agreementWhenToUse(title)}</p>
            </div>

            <div className="agd-sec">
              <h2>Benefits</h2>
              <ul className="agd-benefits">
                {AGREEMENT_BENEFITS.map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>

            <div className="agd-sec">
              <h2>Key Features</h2>
              <ul className="agd-benefits">
                {AGREEMENT_FEATURES.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>

            <div className="agd-sec">
              <h2>Eligibility</h2>
              <ul className="agd-benefits">
                {agreementEligibility(title).map(e => <li key={e}>{e}</li>)}
              </ul>
            </div>

            <div className="agd-sec">
              <h2>Required Documents</h2>
              <ul className="agd-docs">
                {AGREEMENT_DOCUMENTS.map(doc => <li key={doc}>{doc}</li>)}
              </ul>
            </div>

            <div className="agd-sec">
              <h2>Process Timeline</h2>
              <ul className="agd-process">
                {AGREEMENT_PROCESS.map(([h, s]) => (
                  <li key={h}><b>{h}</b><span>{s}</span></li>
                ))}
              </ul>
            </div>

            <div className="agd-sec">
              <h2>Step-by-Step Process</h2>
              <ol className="agd-steps">
                {AGREEMENT_PROCESS.map(([h, s], i) => (
                  <li key={h}><span className="n">{i + 1}</span><div><b>{h}</b><span>{s}</span></div></li>
                ))}
              </ol>
            </div>

            <div className="agd-sec">
              <h2>Pricing</h2>
              <div className="agd-tiers" role="radiogroup" aria-label="Choose a package">
                {Object.entries(AGREEMENT_PRICING).map(([key, t]) => (
                  <button type="button" key={key} className="agd-tier" aria-pressed={tier === key} onClick={() => setTier(key)}>
                    <h3><span className="sel-dot" aria-hidden="true" />{t.label}</h3>
                    <p className="docval">{inr(t.docValue)} e-Stamp value</p>
                    <div className="price">{inr(t.price)} <span>+ GST</span></div>
                    <ul>
                      {key === 'standard' ? (
                        <>
                          <li>Legal drafting by our documentation team</li>
                          <li>Government e-Stamp paper included</li>
                          <li>Doorstep delivery of the stamped document</li>
                        </>
                      ) : (
                        <>
                          <li>Everything in Standard</li>
                          <li>Higher-denomination e-Stamp on record</li>
                          <li>Same fast turnaround</li>
                        </>
                      )}
                    </ul>
                  </button>
                ))}
              </div>
            </div>

            <div className="agd-sec">
              <h2>Frequently asked questions</h2>
              <EAccordion items={agreementFaqs(title)} />
            </div>

            {relatedList.length > 0 && (
              <div className="agd-sec">
                <h2>Related agreements</h2>
                <ul className="agd-related">
                  {relatedList.map(r => <li key={r.slug}><Link to={`/agreements/${r.slug}`}>{r.title}</Link></li>)}
                </ul>
              </div>
            )}

            <div className="agd-sec">
              <h2>Support &amp; Contact</h2>
              <p className="lead">Questions before you proceed? Our documentation team is available on WhatsApp and will reply within business hours.</p>
              <div className="agd-support">
                <a href={waLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                <a href="tel:+918548854859">Call +91 85488 54859</a>
              </div>
            </div>

            <div className="agd-sec">
              <div className="agd-cta">
                <div>
                  <h3>Ready to get your {title.toLowerCase()} drafted?</h3>
                  <p>{selected.label} package selected — {inr(selected.price)} + GST</p>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#FFFFFF', border: '1.5px solid rgba(255, 255, 255, 0.12)' }}>Ask a question</a>
                  <a href={`/agreements/${slug}/checkout?tier=${tier}`} onClick={e => { e.preventDefault(); navigate(`/agreements/${slug}/checkout?tier=${tier}`) }}>Proceed to Purchase</a>
                </div>
              </div>
            </div>
          </div>

          {draft && (
            <div className="agd-draft-col">
              <h2>Sample draft preview</h2>
              <p className="agd-draft-note" role="status">Live preview with blank fields. Your paid draft has your own details filled in and is downloadable.</p>
              <div className="agd-doc">
                <h4>{draft.docTitle}</h4>
                {draft.intro.map((p, i) => <p key={i}><DraftText text={p} /></p>)}
                <hr />
                {draft.parties.map((p, i) => <p key={i}><DraftText text={p} /></p>)}
                <hr />
                <p><DraftText text={draft.whereas} /></p>
                <hr />
                {draft.clauses.map(([heading, body], i) => (
                  <div className="clause" key={heading}>
                    <b>{i + 1}. {heading}</b>
                    <span><DraftText text={body} /></span>
                  </div>
                ))}
                <hr />
                {draft.execution.map((p, i) => <p key={i}><DraftText text={p} /></p>)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
