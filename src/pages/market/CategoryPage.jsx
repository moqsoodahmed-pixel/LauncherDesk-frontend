import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../assets/market.css'
import { CATS, catBy, inCat } from '../../data/market'
import { MI, Icon, ProductCard } from '../../components/market/MarketUI'

const CHEV = 'm9 18 6-6-6-6'

export default function CategoryPage() {
  const [searchParams] = useSearchParams()
  const slug = searchParams.get('cat') || 'crm'
  const cat  = catBy(slug) || CATS[0]

  const [query, setQuery]   = useState('')
  const [sort, setSort]     = useState('az')

  /* Reset search when category changes */
  useEffect(() => { setQuery(''); setSort('az') }, [slug])

  /* Update <title> */
  useEffect(() => { document.title = `${cat.name} Software — LauncherDesk Marketplace` }, [cat])

  const items = useMemo(() => {
    let list = inCat(cat.slug)
    const q = query.toLowerCase().trim()
    if (q) list = list.filter(p => (p.name + ' ' + p.tagline + ' ' + p.desc).toLowerCase().includes(q))
    if (sort === 'az')      list = [...list].sort((a, b) => (a.soon - b.soon) || a.name.localeCompare(b.name))
    return list
  }, [cat.slug, query, sort])

  return (
    <>
      {/* Hero */}
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb reveal-up in">
            <a href="/">Home</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <a href="/market">Marketplace</a><svg viewBox="0 0 24 24"><path d={CHEV}/></svg>
            <span className="cur">{cat.name}</span>
          </nav>
          <div className="mk-cat-head reveal-up in" style={{ marginTop: 18 }}>
            <div className="mk-cathero-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={MI[cat.icon]}/>
              </svg>
            </div>
            <div>
              <span className="eyebrow">LauncherDesk Marketplace</span>
              <h1>{cat.name} software</h1>
              <p className="lead">{cat.blurb}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Grid + toolbar */}
      <section style={{ paddingBottom: 80 }}>
        <div className="wrap">
          {/* Category switcher chips */}
          <div className="mk-chips">
            {CATS.map(c => (
              <a
                key={c.slug}
                className={`mk-chip${c.slug === cat.slug ? ' on' : ''}`}
                href={`/market/category?cat=${c.slug}`}
              >
                <svg className="mk-ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={MI[c.icon]}/>
                </svg>
                {c.name}
              </a>
            ))}
          </div>

          {/* Toolbar */}
          <div className="mk-toolbar">
            <div className="mk-search">
              <svg viewBox="0 0 24 24">
                <path d={MI.search}/>
              </svg>
              <input
                type="text"
                placeholder="Search this category…"
                autoComplete="off"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <div className="mk-tool-right">
              <span className="mk-result">{items.length} tool{items.length !== 1 ? 's' : ''}</span>
              <select
                className="mk-sort"
                value={sort}
                onChange={e => setSort(e.target.value)}
                aria-label="Sort tools"
              >
                <option value="az">A–Z</option>
                <option value="az">A–Z</option>
              </select>
            </div>
          </div>

          {/* Product grid */}
          <div className="mk-cardgrid">
            {items.length > 0
              ? items.map(p => <ProductCard key={p.id} p={p} />)
              : <div className="mk-empty">No tools match "{query}". Try another search.</div>
            }
          </div>
        </div>
      </section>
    </>
  )
}