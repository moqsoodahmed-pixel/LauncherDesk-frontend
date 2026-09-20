import { useEffect, useRef } from 'react'

const HOVER_SELECTOR = 'a, button, .btn, [role="button"], input[type="submit"], input[type="button"]'
const CARD_SELECTOR = '.card, .hp-svc-card, .hp-type-card, .hp-res-card, .hp-how-step, .hp-svc-cat, .hp-why-feat'
const IMAGE_SELECTOR = 'img, .hp-dash-card, picture'
const TEXT_SELECTOR = 'input, textarea, select, [contenteditable="true"]'

export default function CursorFX() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduced) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('ld-cursor-active')

    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let rx = mx, ry = my
    let dx = mx, dy = my
    let raf = null
    let visible = false
    let magnet = null // { cx, cy } of a hovered button to pull the ring toward

    const onMove = e => {
      mx = e.clientX; my = e.clientY
      if (!visible) { visible = true; dot.style.opacity = '1'; ring.style.opacity = '1' }
    }
    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; visible = false }
    const onDown = () => { ring.classList.add('ld-cursor-click'); dot.classList.add('ld-cursor-click') }
    const onUp = () => { ring.classList.remove('ld-cursor-click'); dot.classList.remove('ld-cursor-click') }

    const onOver = e => {
      const target = e.target
      if (target.closest(TEXT_SELECTOR)) { ring.dataset.state = 'text'; magnet = null; return }
      const btn = target.closest(HOVER_SELECTOR)
      if (btn) {
        ring.dataset.state = 'hover'
        const r = btn.getBoundingClientRect()
        magnet = { cx: r.left + r.width / 2, cy: r.top + r.height / 2 }
        return
      }
      magnet = null
      if (target.closest(CARD_SELECTOR)) { ring.dataset.state = 'card'; return }
      if (target.closest(IMAGE_SELECTOR)) { ring.dataset.state = 'image'; return }
      ring.dataset.state = ''
    }

    function tick() {
      // dot tracks quickly; ring trails with easing, gently pulled toward a hovered button's center
      dx += (mx - dx) * 0.55
      dy += (my - dy) * 0.55
      const targetX = magnet ? mx + (magnet.cx - mx) * 0.25 : mx
      const targetY = magnet ? my + (magnet.cy - my) * 0.25 : my
      rx += (targetX - rx) * 0.18
      ry += (targetY - ry) * 0.18
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('ld-cursor-active')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="ld-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="ld-cursor-dot" aria-hidden="true" />
    </>
  )
}
