import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../assets/market.css'
import { catBy, prodBy, inCat, nfmt } from '../../data/market'
import { MI, Tile, Badge, RateLine, Gallery, ProductCard, Icon } from '../../components/market/MarketUI'

const CHEV = 'm9 18 6-6-6-6'

export default function ProductPage() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const p  = prodBy(id)
  const cat = p ? catBy(p.cat) : null

  useEffect(() => {
    if (p) document.title = `${p.name} — LauncherDesk Marketplace`
  }, [p])

  if (!p) {
    return (
      <div style={{ paddingBottom: 70 }}>
        <div className="page-hero" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <nav className="crumb reveal-up in">
              <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
              <a href="/market">Marketplace</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
              <span className="cur">Not found</span>
            </nav>
          </div>
        </div>
        <div className="wrap" style={{ paddingTop: 48 }}>
          <h2>Product not found</h2>
          <p className="mut">It may have been moved. <a href="/market">Back to the marketplace</a>.</p>
        </div>
      </div>
    )
  }

  const related = inCat(p.cat).filter(x => x.id !== p.id).slice(0, 3)

  return (
    <div style={{ paddingBottom: 70 }}>
      {/* Breadcrumb */}
      <div className="page-hero" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/market">Marketplace</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href={`/market/category?cat=${p.cat}`}>{cat ? cat.name : ''}</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">{p.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product grid */}
      <main style={{ paddingBottom: 0 }}>
        <div className="mk-p-grid wrap">
          {/* Left: detail */}
          <div className="mk-p-main">
            <div className="mk-p-head">
              <Tile p={p} size="lg" />
              <div>
                <div className="mk-cat-chip">
                  {cat && (
                    <svg className="mk-ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={MI[cat.icon]}/>
                    </svg>
                  )}
                  {cat ? cat.name : ''}
                </div>
                <h1>{p.name}</h1>
                <p className="mk-p-tag">{p.tagline}</p>
                <div className="mk-p-meta">
                  <RateLine p={p} />
                  <Badge p={p} />
                </div>
              </div>
            </div>

            <Gallery p={p} />

            <div className="mk-p-section">
              <h2>About {p.name}</h2>
              <p>{p.desc}</p>
            </div>

            <div className="mk-p-section">
              <h2>Key features</h2>
              <ul className="mk-feats">
                {p.features.map((f, i) => (
                  <li key={i}>
                    <svg className="mk-chk" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={MI.check}/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: buy box */}
          <aside className="mk-p-side">
            <div className="mk-buybox">
              <div className="mk-price-lg">{p.price}</div>
              <a
                className="btn btn-primary"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Visit website{' '}
                <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={MI.ext}/>
                </svg>
              </a>
              <a
                className="btn btn-soft"
                href="/company/contact"
                style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
              >
                Get it set up by LauncherDesk
              </a>
              <div className="mk-trust">
                <svg className="mk-ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={MI.shield}/>
                </svg>
                LauncherDesk can procure, configure &amp; onboard this for you.
              </div>
              <div className="mk-spec"><span>Category</span><b>{cat ? cat.name : ''}</b></div>
              <div className="mk-spec"><span>Rating</span><b>{p.rating.toFixed(1)} / 5</b></div>
              <div className="mk-spec"><span>Reviews</span><b>{nfmt(p.reviews)}</b></div>
            </div>
          </aside>
        </div>
      </main>

      {/* Related products */}
      {related.length > 0 && (
        <section className="section-sm">
          <div className="wrap">
            <div className="sec-head" style={{ marginBottom: 22 }}>
              <span className="eyebrow">Keep exploring</span>
              <h2 style={{ fontSize: 'clamp(24px,3vw,34px)' }}>Other {cat ? cat.name : ''} tools</h2>
            </div>
            <div className="mk-cardgrid">
              {related.map(r => <ProductCard key={r.id} p={r} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
