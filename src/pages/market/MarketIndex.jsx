import '../../assets/market.css'
import { CATS, PRODUCTS, FEATURED_BADGES } from '../../data/market'
import { CategoryCard, ProductCard } from '../../components/market/MarketUI'

const CHEV = 'm9 18 6-6-6-6'

export default function MarketIndex() {
  const featured = PRODUCTS.filter(p => FEATURED_BADGES.includes(p.badge)).slice(0, 6)

  return (
    <>
      {/* Hero */}
      <header className="mk-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a>
            <svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">Marketplace</span>
          </nav>
          <span className="eyebrow reveal-up in" style={{ display: 'block', marginTop: 16 }}>LauncherDesk Marketplace</span>
          <h1 className="reveal-up in">
            The software your business actually runs on — <span className="grad-text">in one place.</span>
          </h1>
          <p className="lead reveal-up in">
            Browse the tools real companies use to sell, operate, hire and grow. Compare ratings, explore what each does, then let LauncherDesk procure, configure and onboard it for you.
          </p>
          <div className="mk-hero-stats reveal-up in">
            <div><div className="n">{PRODUCTS.length}+</div><div className="l">Vetted tools</div></div>
            <div><div className="n">{CATS.length}</div><div className="l">Categories</div></div>
            <div><div className="n">1</div><div className="l">Partner to set it all up</div></div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="section-sm">
        <div className="wrap">
          <div className="sec-head reveal-up" style={{ marginBottom: 24 }}>
            <span className="eyebrow">Browse by category</span>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,38px)', marginTop: 10 }}>Pick a category to explore the tools inside</h2>
          </div>
          <div className="mk-catgrid">
            {CATS.map(c => <CategoryCard key={c.slug} c={c} />)}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section section-warm">
        <div className="wrap">
          <div className="sec-head reveal-up" style={{ marginBottom: 24 }}>
            <span className="eyebrow">Popular right now</span>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,38px)', marginTop: 10 }}>Featured software</h2>
            <p>A few of the most-loved tools across the marketplace.</p>
          </div>
          <div className="mk-cardgrid">
            {featured.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="section-sm" style={{ paddingBottom: 80 }}>
        <div className="wrap">
          <div className="card reveal-up" style={{ background: 'var(--navy)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap', padding: '34px 38px' }}>
            <div>
              <h3 style={{ color: '#fff', fontSize: 24 }}>Not sure which tool fits?</h3>
              <p style={{ color: '#a9c6dd', marginTop: 8, maxWidth: 520 }}>Tell us how you work and we'll recommend the right stack — then set it up, migrate your data and train your team.</p>
            </div>
            <a className="btn btn-light" href="/company/contact">Talk to an Expert</a>
          </div>
        </div>
      </section>
    </>
  )
}