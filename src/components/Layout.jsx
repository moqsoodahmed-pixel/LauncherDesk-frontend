import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import AIAssistant from './AIAssistant'

/* Map path prefixes to data-page values */
function getActivePage(pathname) {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/services')) return 'services'
  if (pathname.startsWith('/solutions')) return 'solutions'
  if (pathname.startsWith('/business-types')) return 'business-types'
  if (pathname.startsWith('/market')) return 'market'
  if (pathname.startsWith('/company')) return 'company'
  if (pathname.startsWith('/resources')) return 'resources'
  if (pathname.startsWith('/office-restore')) return 'office-restore'
  if (pathname.startsWith('/estamp')) return 'estamp'
  if (pathname.startsWith('/pricing')) return 'pricing'
  if (pathname.startsWith('/ai')) return 'ai'
  return ''
}

export default function Layout() {
  const location = useLocation()
  const activePage = getActivePage(location.pathname)

  /* Scroll to top on navigation */
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  /* Reveal-up scroll animation (mirrors launcherdesk.js IntersectionObserver) */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (reduced) {
      document.querySelectorAll('.reveal-up').forEach(e => e.classList.add('in'))
      document.querySelectorAll('[data-fill]').forEach(b => { b.style.width = b.dataset.fill + '%' })
      return
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in')
          en.target.querySelectorAll('[data-count]').forEach(countUp)
          if (en.target.hasAttribute('data-count')) countUp(en.target)
          en.target.querySelectorAll('[data-fill]').forEach(b => { b.style.width = b.dataset.fill + '%' })
          io.unobserve(en.target)
        }
      })
    }, { threshold: 0.15 })
    document.querySelectorAll('.reveal-up,.cc-panel,.dash').forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [location.pathname])

  /* FAQ accordion */
  useEffect(() => {
    const pairs = []
    document.querySelectorAll('.faq-q').forEach(q => {
      const handler = () => {
        const a = q.nextElementSibling
        const open = q.classList.contains('open')
        q.classList.toggle('open', !open)
        if (a) a.style.maxHeight = open ? null : a.scrollHeight + 'px'
      }
      q.addEventListener('click', handler)
      pairs.push({ q, handler })
    })
    return () => pairs.forEach(({ q, handler }) => q.removeEventListener('click', handler))
  }, [location.pathname])

  return (
    <div data-page={activePage}>
      <Navbar activePage={activePage} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  )
}

function countUp(el) {
  const end = +el.dataset.count
  const dur = 1200
  let t0 = null
  const span = el.querySelector('span')
  const suf = span ? span.outerHTML : ''
  function tick(ts) {
    if (!t0) t0 = ts
    const p = Math.min((ts - t0) / dur, 1)
    const v = Math.floor((0.5 - Math.cos(p * Math.PI) / 2) * end)
    el.innerHTML = v + suf
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}