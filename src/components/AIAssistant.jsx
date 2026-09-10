import { useEffect, useRef, useState } from 'react'
import logoImg from '../assets/launcherdesk-logo-transparent.png'
import snehaImg from '../assets/sneha-ai.png'
import { initState, currentOptions, currentPrompt, handleOption, handleText, buildLeadPayload, menuIntro } from '../lib/flowEngine'

const SPARK  = 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z'
const ROCKET = 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'
const WA     = 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z'

const CONTACT_BASE = import.meta.env.VITE_API_URL || 'https://launcherdesk-backend-production.up.railway.app/api'
const GREETING = "Hi, I'm Sneha, your LauncherDesk business assistant."

const WA_QUICK_REPLIES = [
  { label: 'Company Registration', emoji: '🏢', text: 'Hi LauncherDesk, I want to know about Company Registration.' },
  { label: 'GST Registration',     emoji: '📋', text: 'Hi LauncherDesk, I want to know about GST Registration.' },
  { label: 'Trademark',            emoji: '™️',  text: 'Hi LauncherDesk, I want to know about Trademark Registration.' },
  { label: 'MSME Registration',    emoji: '💼', text: 'Hi LauncherDesk, I want to know about MSME Registration.' },
  { label: 'Website Development',  emoji: '🌐', text: 'Hi LauncherDesk, I want to know about Website Development.' },
  { label: 'Compliance & Tax',     emoji: '📊', text: 'Hi LauncherDesk, I want to know about Compliance & Tax.' },
  { label: 'Virtual Office',       emoji: '🏠', text: 'Hi LauncherDesk, I want to know about Virtual Office.' },
  { label: 'Talk to an Expert',    emoji: '💬', text: 'Hi LauncherDesk, I want to talk to an expert.' },
]

export default function AIAssistant() {
  const [aiOpen,         setAiOpen]         = useState(false)
  const [waOpen,         setWaOpen]         = useState(false)
  const [drawerOpen,     setDrawerOpen]     = useState(false)
  const [messages,       setMessages]       = useState([])
  const [input,          setInput]          = useState('')
  const [sending,        setSending]        = useState(false)
  const [engineState,    setEngineState]    = useState(initState)
  const [activeOptions,  setActiveOptions]  = useState({ kind: 'none', options: [] })
  const [mobileBarShown, setMobileBarShown] = useState(false)

  const bodyRef     = useRef(null)
  const inputRef    = useRef(null)
  const launchedRef = useRef(false)

  const scrimOn = aiOpen || drawerOpen || waOpen

  // Mobile bottom CTA bar: visible on load/scroll up, hides on downward scroll
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY
        if (delta > 8 && y > 100) {
          // Scrolling down - hide mobile bar
          setMobileBarShown(false)
        } else if (delta < -3 || y <= 50) {
          // Scrolling up or at top - show mobile bar
          setMobileBarShown(true)
        }
        lastY = y
        ticking = false
      })
    }
    setMobileBarShown(true)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function stripMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/^[\s]*[-*\u2022]\s+/gm, '')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/`([^`]+)`/g, '$1')
      .trim()
  }

  function addBotMsg(text) {
    setMessages(m => m.map(x => (x.role === 'typing' ? { ...x, role: 'typing-exit' } : x)))
    setTimeout(() => {
      setMessages(m => [...m.filter(x => x.role !== 'typing-exit'), { role: 'a', text: stripMarkdown(text) }])
    }, 220)
  }
  function showTyping() {
    setMessages(m => [...m.filter(x => x.role !== 'typing' && x.role !== 'typing-exit'), { role: 'typing', text: '' }])
  }

  /** Push whatever the flow engine decided happens next: update engine
   *  state + the chip options shown, and render the bot reply (as one
   *  bubble, joined, matching the typing → answer transition). */
  function applyEngineResult(result) {
    setEngineState(result.state)
    setActiveOptions(currentOptions(result.state))
    if (result.messages && result.messages.length) {
      showTyping()
      addBotMsg(result.messages.join('\n\n'))
    }
  }

  async function submitLead(state) {
    setSending(true)
    showTyping()
    const payload = buildLeadPayload(state)
    try {
      const res  = await fetch(`${CONTACT_BASE}/contact`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      addBotMsg(`✅ Request submitted successfully!\n\nA LauncherDesk ${payload.service} expert will contact you within 2 business hours.\n\nNeed anything else?`)
      const doneState = { ...state, screen: 'done' }
      setEngineState(doneState)
      setActiveOptions(currentOptions(doneState))
    } catch {
      addBotMsg("I couldn't submit that just now — please check your connection and tap Confirm & Submit again.")
      setEngineState(state)
      setActiveOptions(currentOptions(state))
    } finally {
      setSending(false)
    }
  }

  function openAI() {
    setWaOpen(false)
    setAiOpen(true)
    setTimeout(() => inputRef.current?.focus(), 250)
    if (!launchedRef.current) {
      launchedRef.current = true
      const fresh = initState()
      setEngineState(fresh)
      setActiveOptions(currentOptions(fresh))
      showTyping()
      addBotMsg(`${GREETING}\n\n${menuIntro()}`)
    }
  }
  function closeAI()     { setAiOpen(false) }
  function openWA()      { setAiOpen(false); setWaOpen(true) }
  function closeWA()     { setWaOpen(false) }
  function toggleWA(e)   { if (e) e.preventDefault(); setAiOpen(false); setWaOpen(prev => !prev) }
  function openDrawer()  { setDrawerOpen(true) }
  function closeDrawer() { setDrawerOpen(false) }
  function onScrim()     { closeDrawer(); closeAI(); closeWA() }

  function handleSubmit(e) {
    e.preventDefault()
    const text = input
    setInput('')
    sendText(text)
  }

  function handleChip(value) {
    if (sending) return
    if (activeOptions.kind === 'multi' && value !== '__continue__') {
      const result = handleOption(engineState, value)
      setEngineState(result.state)
      setActiveOptions(currentOptions(result.state))
      return
    }
    const userLabel = value === '__continue__'
      ? (engineState.multiSelected.length ? engineState.multiSelected.join(', ') : 'None')
      : value
    setMessages(m => [...m, { role: 'u', text: userLabel }])
    const result = handleOption(engineState, value)
    if (result.action === 'submit') { submitLead(result.state); return }
    applyEngineResult(result)
  }

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    function wireDrawer() {
      document.querySelectorAll('.d-sec-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          const sec  = btn.closest('.d-section')
          const body = sec.querySelector('.d-sec-body')
          const open = sec.classList.contains('open')
          document.querySelectorAll('.d-section').forEach(s => {
            s.classList.remove('open'); s.querySelector('.d-sec-body').style.maxHeight = null
          })
          if (!open) { sec.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px' }
        })
      })
      document.querySelectorAll('.d-subsec-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          const sub  = btn.closest('.d-subsec')
          const body = sub.querySelector('.d-subsec-body')
          const open = sub.classList.contains('open')
          sub.classList.toggle('open', !open)
          body.style.maxHeight = open ? null : body.scrollHeight + 'px'
          const parentBody = btn.closest('.d-sec-body')
          if (parentBody) parentBody.style.maxHeight = parentBody.scrollHeight + 'px'
        })
      })
    }
    if (drawerOpen) setTimeout(wireDrawer, 50)
  }, [drawerOpen])

  function sendText(text) {
    const t = (text || '').trim()
    if (!t || sending) return
    setMessages(m => [...m, { role: 'u', text: t }])
    const result = handleText(engineState, t)
    if (result.action === 'submit') { submitLead(result.state); return }
    applyEngineResult(result)
  }

  useEffect(() => {
    window.LDAI = { open: openAI, close: closeAI, send: sendText }
    window.LDWA = { open: openWA, close: closeWA, toggle: toggleWA }
  })

  useEffect(() => {
    // Use event delegation on document to catch all data-open-ai and data-open-wa clicks
    const handleDocClick = (e) => {
      const aiBtn = e.target.closest('[data-open-ai]')
      if (aiBtn) { e.preventDefault(); window.LDAI?.open(); return }
      const waBtn = e.target.closest('[data-open-wa]')
      if (waBtn) { e.preventDefault(); window.LDWA?.toggle(); return }
      const drawerBtn = e.target.closest('[data-open-drawer]')
      if (drawerBtn) { openDrawer(); return }
    }
    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function DraSection({ label, children }) {
    return (
      <div className="d-section">
        <button className="d-sec-btn">
          {label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div className="d-sec-body">{children}</div>
      </div>
    )
  }

  function DraSubSection({ label, children }) {
    return (
      <div className="d-subsec">
        <button className="d-subsec-btn">{label}</button>
        <div className="d-subsec-body">{children}</div>
      </div>
    )
  }

  return (
    <>
      {/* ── FAB Stack: row1 = WhatsApp + Partner, row2 = Ask Sneha — hidden while chat/widget is open ── */}
      <div className={`fab-stack${aiOpen || waOpen ? ' fab-stack--hidden' : ''}`}>

        {/* Row 1: WhatsApp + Partner With Us — side by side */}
        <div className="fab-row">
          <button
            type="button"
            onClick={toggleWA}
            className="fab-wa"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            style={{ border: 'none', cursor: 'pointer' }}
          >
            {/* WhatsApp official logo icon */}
            <svg viewBox="0 0 32 32" width={26} height={26} fill="currentColor">
              <path d="M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z"/>
            </svg>
          </button>

          <a
            href="/partner-register"
            className="fab-partner"
            aria-label="Partner with us"
            title="Partner with us"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Partner With Us
          </a>
        </div>

        {/* Row 2: Ask Sneha button */}
        <button className="fab" onClick={openAI} aria-label="Ask Sneha">
          <span className="fab-tip">Ask Sneha</span>
          <span className="d">
            <img className="fab-av" src={snehaImg} alt="" />
          </span>
          Ask Sneha <span className="pd"></span>
        </button>

      </div>

      {/* ── WhatsApp Support Widget (Matching Screenshot) ── */}
      <div className={`wa-widget${waOpen ? ' open' : ''}`} id="waWidget" role="dialog" aria-modal="true" aria-label="LauncherDesk WhatsApp Support">
        <div className="wa-widget-head">
          <div className="wa-widget-head-left">
            <div className="wa-widget-logo-badge">
              <svg viewBox="0 0 32 32" width={22} height={22} fill="currentColor">
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z"/>
              </svg>
            </div>
            <div className="wa-widget-info">
              <span className="wa-widget-title">LauncherDesk Support</span>
              <span className="wa-widget-status">
                <span className="wa-widget-dot" />
                Typically replies in minutes
              </span>
            </div>
          </div>
          <button className="wa-widget-close" onClick={closeWA} aria-label="Close WhatsApp Support">
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="wa-widget-body">
          <div className="wa-widget-bubble">
            <p>👋 Hi! Welcome to <strong>LauncherDesk</strong>.</p>
            <p>How can we help you today? Pick a topic or type your question on WhatsApp.</p>
          </div>

          <div className="wa-widget-label">Quick Replies</div>

          <div className="wa-quick-list">
            {WA_QUICK_REPLIES.map((item, idx) => (
              <a
                key={idx}
                href={`https://wa.me/918548854859?text=${encodeURIComponent(item.text)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-quick-btn"
                onClick={closeWA}
              >
                <span className="wa-emoji">{item.emoji}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="wa-widget-footer">
          <a
            href={`https://wa.me/918548854859?text=${encodeURIComponent('Hi LauncherDesk, I would like to know more about your services.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-open-btn"
            onClick={closeWA}
          >
            <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor">
              <path d="M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z"/>
            </svg>
            Open WhatsApp Chat
          </a>
        </div>
      </div>

      <div className={`assistant${aiOpen ? ' open' : ''}`} id="assistant" role="dialog" aria-modal="true" aria-label="Chat with Sneha, LauncherDesk virtual assistant">
        <div className="as-head">
          <span className="av">
            <img className="av-img" src={snehaImg} alt="Sneha" />
            <span className="av-status" aria-hidden="true" />
          </span>
          <div className="as-head-txt">
            <b>Sneha</b>
            <small>Virtual Assistance</small>
          </div>
          <button className="x" onClick={closeAI} aria-label="Close AI Assistant">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="as-body" id="asBody" ref={bodyRef}>
          {messages.map((msg, i) =>
            msg.role === 'typing' || msg.role === 'typing-exit' ? (
              <div key={i} className="as-row a">
                <img className="as-av" src={snehaImg} alt="" />
                <div className={`as-msg a as-typing${msg.role === 'typing-exit' ? ' as-typing-exit' : ''}`} aria-live="polite">
                  <span className="as-typing-label">Typing</span>
                  <span className="as-typing-dots"><span/><span/><span/></span>
                </div>
              </div>
            ) : msg.role === 'a' ? (
              <div key={i} className="as-row a">
                <img className="as-av" src={snehaImg} alt="" />
                <div className="as-msg a as-msg-in">
                  {msg.text.split('\n').map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br/>}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div key={i} className={`as-msg ${msg.role}`}>
                {msg.text.split('\n').map((line, j, arr) => (
                  <span key={j}>{line}{j < arr.length - 1 && <br/>}</span>
                ))}
              </div>
            )
          )}

          {(activeOptions.kind === 'choice' || activeOptions.kind === 'multi') && (
            <div className="as-chips">
              {activeOptions.options.map((c, i) => {
                const selected = activeOptions.kind === 'multi' && activeOptions.selected?.includes(c)
                return (
                  <button
                    key={c}
                    className={`as-chip${selected ? ' as-chip--selected' : ''}`}
                    disabled={sending}
                    style={{ '--i': i }}
                    onClick={() => handleChip(c)}
                  >{c}{selected ? ' ✓' : ''}</button>
                )
              })}
              {activeOptions.kind === 'multi' && (
                <button
                  className="as-chip as-chip--continue"
                  disabled={sending}
                  style={{ '--i': activeOptions.options.length }}
                  onClick={() => handleChip('__continue__')}
                >Continue →</button>
              )}
            </div>
          )}
        </div>

        <form className="as-input" id="asForm" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            id="asInput"
            type="text"
            placeholder="Ask anything about your business…"
            autoComplete="off"
            value={input}
            disabled={sending}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" aria-label="Send" disabled={sending}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>
          </button>
        </form>
        <div className="as-disc">General information only · not a substitute for professional legal or tax advice</div>
      </div>

      <div className={`mobile-bar${mobileBarShown ? ' mb-shown' : ''}`}>
        <a href="/services#finder" className="mb-btn mb-btn--primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16,flex:'none'}}>
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          Get Started
        </a>

        <button className="mb-btn mb-btn--ai" onClick={openAI}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16,flex:'none'}}>
            <path d={SPARK}/>
          </svg>
          Ask AI
        </button>
        <button type="button" className="mb-btn mb-btn--wa" onClick={toggleWA} aria-label="Open WhatsApp Support">
          <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor" style={{flex:'none'}}>
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z"/>
          </svg>
          WhatsApp
        </button>
      </div>

      <div className={`scrim${scrimOn ? ' on' : ''}`} onClick={onScrim} />

      <aside className={`drawer${drawerOpen ? ' open' : ''}`} id="drawer">
        <div className="d-top">
          <a href="/" style={{display:'flex',alignItems:'center',textDecoration:'none'}}>
            <img src={logoImg} alt="LauncherDesk" style={{height:34,width:'auto',display:'block'}} />
          </a>
          <button className="x" onClick={closeDrawer}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <nav className="d-nav">
          <DraSection label="Registrations">
            <DraSubSection label="Business Incorporation">
              <a href="/services/private-limited-company-registration">Private Limited Company Registration</a>
              <a href="/services/llp-registration">LLP Registration</a>
              <a href="/services/opc-registration">One Person Company Registration</a>
            </DraSubSection>
            <DraSubSection label="Certifications">
              <a href="/services/startup-india-dpiit">Start-up India Registration</a>
              <a href="/services/msme-registration">MSME Udyam Registration</a>
              <a href="/services/iso-certification">ISO Certification</a>
              <a href="/services/gst-registration">GST Registration</a>
              <a href="/services">PAN / TAN Application</a>
            </DraSubSection>
            <DraSubSection label="IPR &amp; Trademark">
              <a href="/services/trademark-registration">Trademark Registration</a>
              <a href="/services/trademark-registration">Trademark Objection</a>
              <a href="/services/trademark-registration">Patent Registration</a>
              <a href="/services/trademark-registration">Copyright Registration</a>
              <a href="/services/trademark-registration">IP &amp; Trademark Management</a>
            </DraSubSection>
          </DraSection>
          <DraSection label="IT Services">
            <DraSubSection label="Website Development">
              <a href="/services/website-development">Static Website Development</a>
              <a href="/services/website-development">Dynamic Website Development</a>
              <a href="/services/ecommerce-website">E-commerce Website Development</a>
              <a href="/services/crm-setup-lead-management">CRM Website / Portal Development</a>
            </DraSubSection>
            <DraSubSection label="Mobile Solutions">
              <a href="/services/mobile-app-development">Mobile Application Development</a>
              <a href="/services/software-saas-development">Custom Software Development</a>
            </DraSubSection>
            <DraSubSection label="Digital Marketing">
              <a href="/services/digital-marketing">SEO &amp; Search Marketing</a>
              <a href="/services/social-media-management">Social Media Marketing</a>
              <a href="/services/digital-marketing">Performance Marketing</a>
            </DraSubSection>
          </DraSection>
          <a className="d-link" href="/market">Marketplace</a>
          <a className="d-link" href="/office-restore">Office Setup</a>
          <a className="d-link" href="/virtual-office">Virtual Office</a>
          <a className="d-link" href="/estamp">E-Stamp</a>
        </nav>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <a href="/partner/login" className="btn" style={{
            justifyContent:'center',background:'#E8EDF8',
            color:'var(--navy)',fontWeight:600,border:'none'
          }}>Login</a>
          <a className="btn btn-primary" href="/services#finder" style={{justifyContent:'center'}}>Get Started →</a>
        </div>
      </aside>
    </>
  )
}