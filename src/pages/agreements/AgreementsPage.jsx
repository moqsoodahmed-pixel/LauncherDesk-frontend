import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { AGREEMENT_SECTIONS } from '../../data/agreements'

const CSS = `
.agr-wrap { max-width:1480px; margin:0 auto; padding:0 36px; box-sizing:border-box; }
@media (min-width:1025px) { .agr-wrap { max-width:1460px; width:calc(100% - 40px); } }
@media (max-width:1280px) { .agr-wrap { padding:0 20px; } }
@media (max-width:768px) { .agr-wrap { padding:0 14px; } }

.agr-hero { background:#fff; padding:clamp(40px,5vw,72px) 0 clamp(32px,4vw,48px); border-bottom:1px solid var(--line); }
.agr-eyebrow { display:inline-block; margin:0 0 16px; padding:5px 14px; border-radius:99px; background:var(--brand-50); color:var(--blue-dark);
  font-size:12px; font-weight:800; letter-spacing:.07em; text-transform:uppercase; }
.agr-hero h1 { font-size:clamp(30px,3.6vw,44px); line-height:1.2; letter-spacing:-.03em; font-weight:800; margin:0 0 14px; color:var(--navy); }
.agr-hero p { font-size:16px; line-height:1.6; color:var(--text-2); max-width:62ch; margin:0; }

.agr-sec { padding:clamp(40px,5vw,64px) 0; }
.agr-sec h2 { font-size:clamp(22px,2.6vw,28px); color:var(--navy); margin:0 0 6px; font-weight:800; letter-spacing:-.02em; }
.agr-sec .sub { color:var(--text-2); font-size:15px; margin:0 0 24px; }
.agr-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
.agr-card { display:block; background:#fff; border:1.5px solid var(--line-strong); border-radius:14px; padding:18px 20px; text-decoration:none; }
.agr-card:hover { border-color:var(--blue); background:var(--brand-50); }
.agr-card b { display:block; font-size:15.5px; color:var(--navy); font-weight:700; margin-bottom:6px; }
.agr-card span { font-size:13px; color:var(--blue); font-weight:700; }

@media (max-width:900px) { .agr-grid { grid-template-columns:1fr 1fr; } }
@media (max-width:560px) { .agr-grid { grid-template-columns:1fr; } }
`

export default function AgreementsPage() {
  return (
    <>
      <SEO title="Deeds & Agreements — LauncherDesk" description="Get your deeds and agreements drafted by our documentation team: property, business and personal agreements." canonical="/agreements" />
      <style>{CSS}</style>

      <section className="agr-hero">
        <div className="agr-wrap">
          <span className="agr-eyebrow">Deeds &amp; Agreements</span>
          <h1>Legal drafts for every agreement you need</h1>
          <p>Choose the document you need to see its pricing and what's included, then request your draft.</p>
        </div>
      </section>

      {AGREEMENT_SECTIONS.map(section => (
        <section className="agr-sec" id={section.id} key={section.id}>
          <div className="agr-wrap">
            <h2>{section.title}</h2>
            <p className="sub">{section.sub}</p>
            <div className="agr-grid">
              {section.items.map(item => (
                <Link key={item.slug} className="agr-card" to={`/agreements/${item.slug}`}>
                  <b>{item.title}</b>
                  <span>View details →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
