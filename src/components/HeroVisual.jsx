import React, { useRef, useState, useEffect } from 'react'
import officeFounderImg from '../assets/founder_standing_corporate.jpg'

const HERO_VISUAL_STYLES = `
.hero-office-scene-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 63%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 1;
  pointer-events: none;
  perspective: 1200px;
}
.hero-office-frame {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  pointer-events: auto;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.06) 6%, rgba(0,0,0,0.85) 24%, black 42%);
  mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.06) 6%, rgba(0,0,0,0.85) 24%, black 42%);
}
.hero-office-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right bottom;
  display: block;
}
.hero-office-blend-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 36%;
  background: linear-gradient(to right, #0A0E14 0%, rgba(10, 14, 20, 0.85) 45%, transparent 100%);
  pointer-events: none;
}
.hero-office-bottom-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, transparent 0%, rgba(10, 14, 20, 0.80) 50%, #0A0E14 100%);
  pointer-events: none;
  z-index: 2;
}
.hero-office-ambient-glow {
  position: absolute;
  top: 15%;
  left: 5%;
  width: 50%;
  height: 60%;
  background: radial-gradient(ellipse at 40% 45%, rgba(33, 150, 243, 0.14) 0%, rgba(124, 77, 255, 0.06) 50%, transparent 75%);
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}

/* Tablet: 768px - 1024px (Ambient background photography with soft edge vignette) */
@media (min-width: 768px) and (max-width: 1024px) {
  .hero-office-scene-wrap {
    position: relative !important;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    width: 100% !important;
    max-width: 100% !important;
    height: 100% !important;
    min-height: 440px !important;
    display: flex !important;
    align-items: flex-end !important;
    justify-content: center !important;
    margin: 0 !important;
    pointer-events: auto !important;
    z-index: 1 !important;
    overflow: visible !important;
  }
  .hero-office-frame {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
    max-height: 520px !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    overflow: visible !important;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 8%, black 22%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 82%, transparent 100%) !important;
    mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 8%, black 22%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 82%, transparent 100%) !important;
    -webkit-mask-composite: source-in !important;
    mask-composite: intersect !important;
  }
  .hero-office-img {
    width: 100% !important;
    height: 100% !important;
    max-height: 520px !important;
    object-fit: cover !important;
    object-position: center bottom !important;
    border: none !important;
    border-radius: 0 !important;
    opacity: 1 !important;
    filter: none !important;
    display: block !important;
  }
  .hero-office-blend-overlay {
    position: absolute !important;
    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    width: 26% !important;
    background: linear-gradient(to right, #0A0E14 0%, rgba(10, 14, 20, 0.70) 50%, transparent 100%) !important;
    pointer-events: none !important;
    display: block !important;
  }
  .hero-office-bottom-overlay {
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 70px !important;
    background: linear-gradient(to bottom, transparent 0%, rgba(10, 14, 20, 0.75) 50%, #0A0E14 100%) !important;
    pointer-events: none !important;
    display: block !important;
  }
  .hero-office-ambient-glow {
    display: none !important;
  }
}

/* Mobile: < 768px (Natural ambient photo with smooth top/bottom edge fade) */
@media (max-width: 767px) {
  .hero-office-scene-wrap {
    position: relative !important;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    width: 100% !important;
    max-width: 440px !important;
    height: auto !important;
    margin: 16px auto 0 !important;
    pointer-events: auto !important;
    overflow: visible !important;
  }
  .hero-office-frame {
    position: relative !important;
    width: 100% !important;
    height: auto !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    overflow: visible !important;
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 6%, black 14%, black 82%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%) !important;
    mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 6%, black 14%, black 82%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%) !important;
    -webkit-mask-composite: source-in !important;
    mask-composite: intersect !important;
  }
  .hero-office-img {
    width: 100% !important;
    height: auto !important;
    max-height: 380px !important;
    object-fit: cover !important;
    object-position: center 25% !important;
    border: none !important;
    border-radius: 0 !important;
    opacity: 1 !important;
    filter: none !important;
    display: block !important;
  }
  .hero-office-blend-overlay {
    display: none !important;
  }
  .hero-office-bottom-overlay {
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 50px !important;
    background: linear-gradient(to bottom, transparent 0%, #0A0E14 100%) !important;
    display: block !important;
  }
  .hero-office-ambient-glow {
    display: none !important;
  }
}
`

export default function HeroVisual() {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  // Smooth lerped micro-parallax on hover
  useEffect(() => {
    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1)
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 || 1)
      targetPos.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      }
    }

    const handleMouseLeave = () => {
      targetPos.current = { x: 0, y: 0 }
    }

    const el = containerRef.current
    if (el) {
      el.addEventListener('mousemove', handleMouseMove, { passive: true })
      el.addEventListener('mouseleave', handleMouseLeave)
    }

    const loop = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.06
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.06
      setMousePos({ x: currentPos.current.x, y: currentPos.current.y })
      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)

    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const tiltX = mousePos.y * -1.5
  const tiltY = mousePos.x * 1.5

  return (
    <>
      <style>{HERO_VISUAL_STYLES}</style>
      <div ref={containerRef} className="hero-office-scene-wrap">
        {/* Soft volumetric ambient back-glow behind plant and founder's right shoulder */}
        <div className="hero-office-ambient-glow" />

        {/* Main Office Scene Frame with Natural Edge Feathering */}
        <div
          className="hero-office-frame"
          style={{
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          <img
            src={officeFounderImg}
            alt="LauncherDesk Executive Office"
            className="hero-office-img"
            loading="eager"
            decoding="async"
          />

          {/* Fallback smooth left-gradient fade to guarantee seamless blending into deep navy */}
          <div className="hero-office-blend-overlay" />
          <div className="hero-office-bottom-overlay" aria-hidden="true" />
        </div>
      </div>
    </>
  )
}

