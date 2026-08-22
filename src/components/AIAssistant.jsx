import { useEffect, useRef, useState, useCallback } from 'react'

const SPARK  = 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z'
const ROCKET = 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'
const WA     = 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z'

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001'
const CHIPS    = ['Start a business', 'Which structure is right for me?', 'Do I need GST?', 'Register a trademark']

function getOrCreateUserId() {
  let id = sessionStorage.getItem('ld_vf_user')
  if (!id) { id = 'u_' + Math.random().toString(36).slice(2) + Date.now(); sessionStorage.setItem('ld_vf_user', id) }
  return id
}

function extractReplies(traces = []) {
  const msgs = []
  for (const t of traces) {
    if ((t.type === 'text' || t.type === 'speak') && t.payload?.message) {
      msgs.push(t.payload.message)
    }
    if (t.type === 'choice' || t.type === 'carousel') {
      const buttons = t.payload?.buttons || t.payload?.choices || []
      if (buttons.length) msgs.push('You can choose: ' + buttons.map(b => b.name || b.request?.payload?.label).filter(Boolean).join(' · '))
    }
  }
  return msgs.length ? msgs : null
}

export default function AIAssistant() {
  const [aiOpen,       setAiOpen]       = useState(false)
  const [drawerOpen,   setDrawerOpen]   = useState(false)
  const [messages,     setMessages]     = useState([])
  const [input,        setInput]        = useState('')
  const [sending,      setSending]      = useState(false)
  const [chipsVisible, setChipsVisible] = useState(true)

  const bodyRef     = useRef(null)
  const inputRef    = useRef(null)
  const launchedRef = useRef(false)
  const userId      = useRef(getOrCreateUserId())

  const scrimOn = aiOpen || drawerOpen

  function addBotMsg(text) {
    setMessages(m => [...m.filter(x => x.role !== 'typing'), { role: 'a', text }])
  }
  function showTyping() {
    setMessages(m => [...m.filter(x => x.role !== 'typing'), { role: 'typing', text: '' }])
  }

  const interact = useCallback(async (action) => {
    const res  = await fetch(`${API_BASE}/api/voiceflow/interact`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ userId: userId.current, action }),
    })
    const data = await res.json()
    if (!data.success) throw new Error('Voiceflow error')
    return data.traces
  }, [])

  const launchSession = useCallback(async () => {
    if (launchedRef.current) return
    launchedRef.current = true
    setSending(true)
    showTyping()
    try {
      const traces  = await interact({ type: 'launch' })
      const replies = extractReplies(traces)
      addBotMsg(replies ? replies.join('\n\n') : "Hi! I'm the LauncherDesk AI. How can I help you today?")
    } catch {
      launchedRef.current = false
      addBotMsg("Hi! I'm the LauncherDesk AI. How can I help you today?")
    } finally {
      setSending(false)
    }
  }, [interact])

  const send = useCallback(async (text) => {
    if (!text?.trim() || sending) return
    setChipsVisible(false)
    setMessages(m => [...m, { role: 'u', text }])
    setSending(true)
    showTyping()
    try {
      const traces  = await interact({ type: 'text', payload: text })
      const replies = extractReplies(traces)
      addBotMsg(replies ? replies.join('\n\n') : 'Let me know if you need anything else.')
    } catch {
      addBotMsg('Network error — please check your connection and try again.')
    } finally {
      setSending(false)
    }
  }, [sending, interact])

  function openAI() {
    setAiOpen(true)
    setTimeout(() => inputRef.current?.focus(), 250)
    if (!launchedRef.current) launchSession()
  }
  function closeAI()     { setAiOpen(false) }
  function openDrawer()  { setDrawerOpen(true) }
  function closeDrawer() { setDrawerOpen(false) }
  function onScrim()     { closeDrawer(); closeAI() }

  function handleSubmit(e) { e.preventDefault(); send(input); setInput('') }

  function handleChip(text) {
    if (!launchedRef.current) {
      launchSession().then(() => setTimeout(() => send(text), 900))
    } else {
      send(text)
    }
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

  useEffect(() => { window.LDAI = { open: openAI, close: closeAI, send } })

  useEffect(() => {
    const pairs = []
    document.querySelectorAll('[data-open-ai]').forEach(b => {
      const h = e => { e.preventDefault(); window.LDAI?.open() }
      b.addEventListener('click', h); pairs.push({ b, h })
    })
    document.querySelectorAll('[data-open-drawer]').forEach(b => {
      const h = () => openDrawer()
      b.addEventListener('click', h); pairs.push({ b, h })
    })
    return () => pairs.forEach(({ b, h }) => b.removeEventListener('click', h))
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
      <button className="fab" onClick={openAI}>
        <span className="d">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={SPARK} />
          </svg>
        </span>
        Ask LauncherDesk <span className="pd"></span>
      </button>

      <div className={`assistant${aiOpen ? ' open' : ''}`} id="assistant">
        <div className="as-head">
          <span className="av">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={SPARK} />
            </svg>
          </span>
          <div>
            <b>LauncherDesk AI</b>
            <small>
              <span style={{width:7,height:7,borderRadius:'50%',background:'#4ade80',display:'inline-block'}}/>{' '}
              Online · Your Business Manager
            </small>
          </div>
          <button className="x" onClick={closeAI}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="as-body" id="asBody" ref={bodyRef}>
          {messages.map((msg, i) =>
            msg.role === 'typing' ? (
              <div key={i} className="as-msg a as-typing"><span/><span/><span/></div>
            ) : (
              <div key={i} className={`as-msg ${msg.role}`}>
                {msg.text.split('\n').map((line, j, arr) => (
                  <span key={j}>{line}{j < arr.length - 1 && <br/>}</span>
                ))}
              </div>
            )
          )}
        </div>

        {chipsVisible && (
          <div className="as-chips">
            {CHIPS.map(c => (
              <button key={c} className="as-chip" disabled={sending} onClick={() => handleChip(c)}>{c}</button>
            ))}
          </div>
        )}

        <div className="as-esc">
          <a className="btn btn-wa btn-sm" style={{flex:1,justifyContent:'center'}} href="/company/contact">
            <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={WA}/></svg>
            WhatsApp
          </a>
          <a className="btn btn-soft btn-sm" style={{flex:1,justifyContent:'center'}} href="/company/contact">Talk to Expert</a>
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

      <div className="mobile-bar">
        <a href="/services#finder" className="btn btn-primary">Get Started</a>
        <button className="btn btn-soft" onClick={openAI}>
          <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={SPARK}/></svg>
          AI
        </button>
        <a href="/company/contact" className="btn btn-wa">
          <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={WA}/></svg>
          Chat
        </a>
      </div>

      <div className={`scrim${scrimOn ? ' on' : ''}`} onClick={onScrim} />

      <aside className={`drawer${drawerOpen ? ' open' : ''}`} id="drawer">
        <div className="d-top">
          <a className="brand" href="/">
            <span className="mk">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={ROCKET}/></svg>
            </span>
            <span className="txt" style={{fontSize:17}}>Launcher<b>Desk</b></span>
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
              <a href="/services">Start-up India Registration</a>
              <a href="/services/msme-registration">MSME Udyam Registration</a>
              <a href="/services">ISO Certification</a>
              <a href="/services/gst-registration">GST Registration</a>
              <a href="/services">PAN / TAN Application</a>
            </DraSubSection>
            <DraSubSection label="IPR &amp; Trademark">
              <a href="/services/trademark-registration">Trademark Registration</a>
              <a href="/services">Trademark Objection</a>
              <a href="/services">Patent Registration</a>
              <a href="/services">Copyright Registration</a>
              <a href="/services">IP &amp; Trademark Management</a>
            </DraSubSection>
          </DraSection>
          <DraSection label="IT Services">
            <DraSubSection label="Website Development">
              <a href="/services">Static Website Development</a>
              <a href="/services">Dynamic Website Development</a>
              <a href="/services">E-commerce Website Development</a>
              <a href="/services">CRM Website / Portal Development</a>
            </DraSubSection>
            <DraSubSection label="Mobile Solutions">
              <a href="/services">Mobile Application Development</a>
              <a href="/services">Custom Software Development</a>
            </DraSubSection>
            <DraSubSection label="Digital Marketing">
              <a href="/services/digital-marketing">SEO &amp; Search Marketing</a>
              <a href="/services/digital-marketing">Social Media Marketing</a>
              <a href="/services/digital-marketing">Performance Marketing</a>
            </DraSubSection>
          </DraSection>
          <a className="d-link" href="/market">Marketplace</a>
          <a className="d-link" href="/office-restore">Office Setup</a>
        </nav>
        <div className="d-cta-row">
          <a className="btn btn-soft" href="/company/contact#contact-form">Login</a>
          <a className="btn btn-soft" href="/company/contact">Talk to an Expert</a>
        </div>
        <a className="btn btn-primary" href="/services#finder">Get Started</a>
      </aside>
    </>
  )
}
