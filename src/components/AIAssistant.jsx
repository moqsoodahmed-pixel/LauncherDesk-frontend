import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
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
  const { isLoggedIn, user, logout } = useUserAuth()
  const [aiOpen,         setAiOpen]         = useState(false)
  const [waOpen,         setWaOpen]         = useState(false)
  const [drawerOpen,     setDrawerOpen]     = useState(false)
  const [messages,       setMessages]       = useState([])
  const [input,          setInput]          = useState('')
  const [sending,        setSending]        = useState(false)
  const [engineState,    setEngineState]    = useState(initState)
  const [activeOptions,  setActiveOptions]  = useState({ kind: 'none', options: [] })
  const [mobileBarShown, setMobileBarShown] = useState(true)
  const [showFloatingWa, setShowFloatingWa] = useState(false)
  const [showScrollTop,  setShowScrollTop]  = useState(false)
  const [activeSec,      setActiveSec]      = useState('reg')
  const [activeSubSec,   setActiveSubSec]   = useState('inc')

  const bodyRef     = useRef(null)
  const inputRef    = useRef(null)
  const launchedRef = useRef(false)

  const scrimOn = aiOpen || drawerOpen || waOpen

  // Scroll to top button visibility & mobile bottom bar & floating WhatsApp toggle
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const onScroll = () => {
      const y = window.scrollY
      setShowScrollTop(y > 350)
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const delta = y - lastY
        if (delta > 8 && y > 80) {
          setMobileBarShown(false)
          setShowFloatingWa(true)
        } else if (delta < -3 || y <= 50) {
          setMobileBarShown(true)
          setShowFloatingWa(false)
        }
        lastY = y
        ticking = false
      })
    }
    setMobileBarShown(true)
    setShowFloatingWa(false)
    setShowScrollTop(window.scrollY > 350)
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
      setActiveOptions({ kind: 'none', options: [] })
      showTyping()
      addBotMsg("Hi! I'm Sneha, your LauncherDesk business assistant. How can I help you today?")
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

  async function sendText(text) {
    const t = (text || '').trim()
    if (!t || sending) return
    setMessages(m => [...m, { role: 'u', text: t }])

    // If we're inside a guided flow step waiting for a specific text input (like name, mobile, email, city)
    if (engineState.screen === 'flow') {
      const result = handleText(engineState, t)
      if (result.action === 'submit') { submitLead(result.state); return }
      // If it matched a flow advance step, use it
      if (result.state.stepId !== engineState.stepId) {
        applyEngineResult(result)
        return
      }
    }

    // Call the intelligent Groq AI backend for natural, conversational responses
    showTyping()
    setSending(true)
    try {
      const res = await fetch(`${CONTACT_BASE}/voiceflow/interact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'guest-' + (window.sessionStorage.getItem('ld_ai_uid') || (() => {
            const uid = Math.random().toString(36).substring(2, 9)
            window.sessionStorage.setItem('ld_ai_uid', uid)
            return uid
          })()),
          action: { type: 'text', payload: t }
        })
      })
      const data = await res.json()
      const reply = data?.traces?.[0]?.payload?.message
      if (reply) {
        setActiveOptions({ kind: 'none', options: [] })
        addBotMsg(reply)
      } else {
        const result = handleText(engineState, t)
        applyEngineResult(result)
      }
    } catch (err) {
      console.warn('AI backend unreachable, falling back to local engine:', err)
      const result = handleText(engineState, t)
      applyEngineResult(result)
    } finally {
      setSending(false)
    }
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
  }, [])

  function DraSection({ id, label, children }) {
    const isOpen = activeSec === id
    return (
      <div className={`d-section${isOpen ? ' open' : ''}`}>
        <button
          type="button"
          className="d-sec-btn"
          onClick={() => setActiveSec(s => s === id ? null : id)}
          aria-expanded={isOpen}
        >
          <span>{label}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div className="d-sec-body-wrapper">
          <div className="d-sec-body-inner">
            <div className="d-sec-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }

  function DraSubSection({ id, label, children }) {
    const isOpen = activeSubSec === id
    return (
      <div className={`d-subsec${isOpen ? ' open' : ''}`}>
        <button
          type="button"
          className="d-subsec-btn"
          onClick={() => setActiveSubSec(s => s === id ? null : id)}
          aria-expanded={isOpen}
        >
          <span>{label}</span>
          <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2.5" className="d-subsec-chev">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
        <div className="d-subsec-body-wrapper">
          <div className="d-subsec-body-inner">
            <div className="d-subsec-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ── FAB Stack: row1 = WhatsApp + Partner, row2 = Ask Sneha — hidden while chat/widget is open ── */}
      <div className={`fab-stack${aiOpen || waOpen ? ' fab-stack--hidden' : ''}${showFloatingWa && !mobileBarShown ? ' mob-show' : ''}`}>

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

        <button type="button" className="mb-btn mb-btn--ai" onClick={openAI} aria-label="Ask Sneha">
          <img className="mb-btn-av" src={snehaImg} alt="" />
          Ask Sneha
        </button>
        <button type="button" className="mb-btn mb-btn--wa" onClick={toggleWA} aria-label="Open WhatsApp Support">
          <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor" style={{flex:'none'}}>
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.434.658 4.714 1.806 6.68L2 30l7.52-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.834-1.598l-.418-.248-4.333 1.022 1.044-4.224-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.574c-.345-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.746.086-.345-.172-1.458-.537-2.776-1.712-1.026-.916-1.719-2.047-1.92-2.392-.2-.345-.02-.532.15-.703.155-.155.345-.4.518-.603.172-.2.23-.345.345-.574.115-.23.058-.432-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.673-.563-.581-.776-.592l-.66-.012c-.23 0-.603.086-.918.432s-1.205 1.178-1.205 2.873 1.233 3.333 1.405 3.563c.172.23 2.427 3.706 5.878 5.196.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.04-.834 2.327-1.638.287-.805.287-1.494.2-1.638-.086-.144-.316-.23-.66-.4z"/>
          </svg>
          WhatsApp
        </button>
      </div>

      <div className={`scrim${scrimOn ? ' on' : ''}`} onClick={onScrim} />

      {/* ── Scroll To Top Floating Button (Mobile & Tablet friendly) ── */}
      <button
        type="button"
        className={`scroll-top-btn${showScrollTop && !scrimOn ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>

      {/* ── Mobile / Tablet Navigation Drawer ── */}
      <aside className={`drawer${drawerOpen ? ' open' : ''}`} id="drawer" aria-label="Navigation drawer">
        <div className="d-top">
          <Link to="/" onClick={closeDrawer} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={logoImg} alt="LauncherDesk" style={{ height: 34, width: 'auto', display: 'block' }} />
          </Link>
          <button type="button" className="x" onClick={closeDrawer} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <nav className="d-nav">
          <DraSection id="reg" label="Registrations">
            <DraSubSection id="inc" label="Business Incorporation">
              <Link to="/services/private-limited-company-registration" onClick={closeDrawer}>Private Limited Company Registration</Link>
              <Link to="/services/llp-registration" onClick={closeDrawer}>LLP Registration</Link>
              <Link to="/services/opc-registration" onClick={closeDrawer}>One Person Company Registration</Link>
            </DraSubSection>
            <DraSubSection id="cert" label="Certifications">
              <Link to="/services/startup-india-dpiit" onClick={closeDrawer}>Start-up India Registration</Link>
              <Link to="/services/msme-registration" onClick={closeDrawer}>MSME Udyam Registration</Link>
              <Link to="/services/iso-certification" onClick={closeDrawer}>ISO Certification</Link>
              <Link to="/services/gst-registration" onClick={closeDrawer}>GST Registration</Link>
              <Link to="/services" onClick={closeDrawer}>PAN / TAN Application</Link>
            </DraSubSection>
            <DraSubSection id="ipr" label="IPR & Trademark">
              <Link to="/services/trademark-registration" onClick={closeDrawer}>Trademark Registration</Link>
              <Link to="/services/trademark-objection" onClick={closeDrawer}>Trademark Objection</Link>
              <Link to="/services/patent-registration" onClick={closeDrawer}>Patent Registration</Link>
              <Link to="/services/copyright-registration" onClick={closeDrawer}>Copyright Registration</Link>
              <Link to="/services/ip-trademark-management" onClick={closeDrawer}>IP & Trademark Management</Link>
            </DraSubSection>
            <div style={{ padding: '4px 10px 6px' }}>
              <Link to="/services" onClick={closeDrawer} style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none', display: 'inline-block' }}>
                View all registrations →
              </Link>
            </div>
          </DraSection>

          <DraSection id="it" label="IT Services">
            <DraSubSection id="web" label="Website Development">
              <Link to="/services/static-website" onClick={closeDrawer}>Static Website Development</Link>
              <Link to="/services/dynamic-website" onClick={closeDrawer}>Dynamic Website Development</Link>
              <Link to="/services/ecommerce-website" onClick={closeDrawer}>E-commerce Website Development</Link>
              <Link to="/services/crm-setup-lead-management" onClick={closeDrawer}>CRM Website / Portal Development</Link>
            </DraSubSection>
            <DraSubSection id="mob" label="Mobile Solutions">
              <Link to="/services/mobile-app-development" onClick={closeDrawer}>Mobile Application Development</Link>
              <Link to="/services/software-saas-development" onClick={closeDrawer}>Custom Software Development</Link>
            </DraSubSection>
            <DraSubSection id="mkt" label="Marketing & Sales">
              <Link to="/services/seo-marketing" onClick={closeDrawer}>SEO & Search Marketing</Link>
              <Link to="/services/social-media-management" onClick={closeDrawer}>Social Media Marketing</Link>
              <Link to="/services/google-ads-paid-marketing" onClick={closeDrawer}>Performance Marketing</Link>
              <Link to="/services/branding-logo-design" onClick={closeDrawer}>Brand Identity & Logo Design</Link>
              <Link to="/services/whatsapp-business-api" onClick={closeDrawer}>WhatsApp Business API & Automation</Link>
            </DraSubSection>
            <DraSubSection id="digital" label="Digital Marketing">
              <Link to="/digital-marketing" onClick={closeDrawer}>AI Search Optimization</Link>
              <Link to="/digital-marketing" onClick={closeDrawer}>Google Ads & Meta Campaigns</Link>
              <Link to="/digital-marketing" onClick={closeDrawer}>Social Media & Creative Design</Link>
            </DraSubSection>
            <div style={{ padding: '4px 10px 6px' }}>
              <Link to="/services" onClick={closeDrawer} style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none', display: 'inline-block' }}>
                View all IT services →
              </Link>
            </div>
          </DraSection>

          <Link className="d-link" to="/market" onClick={closeDrawer}>Marketplace</Link>
          <DraSection id="office" label="Office Setup">
            <Link to="/office-restore" onClick={closeDrawer}>Office Furniture & Setup</Link>
            <Link to="/office-restore/individual" onClick={closeDrawer}>Private Office Space</Link>
            <Link to="/office-restore/coworking" onClick={closeDrawer}>Co-working Space</Link>
          </DraSection>
          <Link className="d-link" to="/virtual-office" onClick={closeDrawer}>Virtual Office</Link>
          <Link className="d-link" to="/estamp" onClick={closeDrawer}>E-Stamp</Link>
        </nav>

        {/* ── Action Buttons: Login / Sign Up & Get Started (Always visible in fixed footer) ── */}
        <div className="d-actions">
          {isLoggedIn ? (
            <div className="d-user-box">
              <div className="d-user-info">
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#1D6FE0" strokeWidth={2}>
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
                <div className="d-user-text">
                  <span className="d-user-name">{user?.name || 'My Account'}</span>
                  <span className="d-user-email">{user?.email}</span>
                </div>
              </div>
              <div className="d-btn-row">
                <Link to="/user/dashboard" className="btn btn-sm d-btn-dashboard" onClick={closeDrawer}>
                  Dashboard
                </Link>
                <button type="button" className="btn btn-sm d-btn-logout" onClick={() => { logout(); closeDrawer() }}>
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="d-auth-box">
              <div className="d-btn-row">
                <Link to="/user/login" className="d-btn-login" onClick={closeDrawer}>
                  <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                  Login
                </Link>
                <Link to="/user/login" state={{ tab: 'register' }} className="d-btn-signup" onClick={closeDrawer}>
                  <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
                  </svg>
                  Sign Up
                </Link>
              </div>
              <Link to="/services#finder" className="btn btn-primary d-btn-getstarted" onClick={closeDrawer}>
                Get Started →
              </Link>
              <div className="d-partner-link-row">
                <Link to="/partner/login" onClick={closeDrawer}>Are you a partner? Partner Login →</Link>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}