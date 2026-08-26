import { useEffect, useRef, useState, useCallback } from 'react'
import logoImg from '../assets/launcherdesk-logo-transparent.png'

const SPARK  = 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z'
const ROCKET = 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'
const WA     = 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z'

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001'
const CHIPS = [
  'Which company structure is right for me?',
  'How do I register a Private Limited Company?',
  'Do I need GST registration?',
  'How do I register a trademark for my brand?',
  'What is MSME / Udyam registration?',
  'I need a website for my business',
]

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
    // Use event delegation on document to catch all data-open-ai clicks
    const handleDocClick = (e) => {
      const aiBtn = e.target.closest('[data-open-ai]')
      if (aiBtn) { e.preventDefault(); window.LDAI?.open(); return }
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
      {/* ── FAB Stack: row1 = WhatsApp + Partner, row2 = Ask LauncherDesk ── */}
      <div className="fab-stack">

        {/* Row 1: WhatsApp + Partner With Us — side by side */}
        <div className="fab-row">
          <a
            href="https://wa.me/918548854859"
            target="_blank"
            rel="noopener noreferrer"
            className="fab-wa"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </a>

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

        {/* Row 2: Ask LauncherDesk AI button */}
        <button className="fab" onClick={openAI} aria-label="Ask AI">
          <span className="d">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={SPARK} />
            </svg>
          </span>
          Ask LauncherDesk <span className="pd"></span>
        </button>

      </div>

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
        <a href="/company/contact" className="mb-btn mb-btn--wa">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16,flex:'none'}}>
            <path d={WA}/>
          </svg>
          WhatsApp
        </a>
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
        </nav>
        <div style={{display:'flex',flexDirection:'column',gap:10,padding:'4px 0 8px'}}>
          <a href="/partner/login" style={{
            display:'block',textAlign:'center',padding:'12px',
            border:'2px solid var(--blue-dark)',borderRadius:10,
            color:'var(--blue-dark)',fontWeight:700,fontSize:15,
            textDecoration:'none',transition:'all .15s',fontFamily:'var(--font)',
            background:'transparent'
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='var(--blue-dark)';e.currentTarget.style.color='#fff'}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--blue-dark)'}}
          >Login</a>
          <a className="btn btn-primary" href="/services#finder" style={{textAlign:'center',borderRadius:10,padding:'12px',fontSize:15}}>Get Started →</a>
        </div>
      </aside>
    </>
  )
}