/* Sneha's guided-conversation state machine.
   Pure, framework-free: takes a state + an event, returns a new state plus
   the bot message(s)/options to render. AIAssistant.jsx owns all React
   state/animation — this module only decides "what happens next" so the
   question flow, branching and validation live in ONE place (aiFlows.js)
   instead of being hardcoded inside the component. */

import { CATEGORIES, OUT_OF_SCOPE_KEYWORDS, matchCategory } from '../data/aiCategories'
import { FLOWS, SUMMARY, MENU } from '../data/aiFlows'
import { matchService, getServiceContent } from '../data/serviceDetails'

const OUT_OF_SCOPE_REPLY =
  "I'm Sneha, LauncherDesk's business assistant. I can help with LauncherDesk services such as business registration, licenses, compliance, legal, finance, IT, marketing, office setup and international expansion. I can't help with that topic."
/* Matches the real bot's fallback wording exactly. */
const CANT_FIND_OPTION = "I didn't quite catch that. 🤔\n\nLet me show you the options again — just pick one below:"

const PRICE_RE = /\b(cost|price|pricing|charge|fee|fees|how much)\b/i
const HOW_RE = /\b(how do i|how does it work|how do you|what.?s the process|procedure)\b/i
const DURATION_RE = /\b(how long|timeline|turnaround|how many days|how many weeks)\b/i
const DOCS_RE = /\b(documents?|paperwork|what do i need to (submit|provide))\b/i
const PROVIDE_RE = /\b(do you (provide|offer|do|handle)|can you (help|do)|is this something (you|launcherdesk))\b/i
const BACK_RE = /^\s*(back|go back|previous)\s*$/i
const RESTART_RE = /\b(start over|restart|change service|main menu|reset)\b/i

export function initState() {
  return {
    screen: 'menu', // menu | flow | diagnose | diagnoseConfirm | switchConfirm | summary | done
    categoryId: null,
    stepId: null,
    answers: {},
    multiSelected: [],
    history: [], // [{stepId, answers}]
    pendingCategoryId: null,
    pendingService: null,
  }
}

export function menuLabels() {
  return CATEGORIES.map(c => c.label)
}

function findCategoryByLabel(label) {
  return CATEGORIES.find(c => c.label.toLowerCase() === label.toLowerCase()) || null
}

function getFlow(categoryId) {
  return FLOWS[categoryId] || null
}

function getStep(state) {
  const flow = getFlow(state.categoryId)
  return flow ? flow.steps[state.stepId] : null
}

function prompt(step, answers) {
  return typeof step.ask === 'function' ? step.ask(answers) : step.ask
}

function categoryLabel(categoryId) {
  const flow = getFlow(categoryId)
  return flow ? flow.label : 'that'
}

/** The specific service the user picked within the current category (e.g.
 *  "Private Limited Company"), falling back to the category label. */
function currentServiceLabel(state) {
  const flow = getFlow(state.categoryId)
  if (!flow) return 'that'
  const entryField = flow.steps[flow.entry]?.field
  return (entryField && state.answers[entryField]) || flow.label
}

/** Options for whatever is currently on screen — drives the chip list in the UI. */
export function currentOptions(state) {
  if (state.screen === 'menu' || state.screen === 'diagnose-fallback') {
    return { kind: 'choice', options: menuLabels() }
  }
  if (state.screen === 'diagnoseConfirm') {
    return { kind: 'choice', options: ["Yes, that's it", 'Show me all services'] }
  }
  if (state.screen === 'switchConfirm') {
    return { kind: 'choice', options: ['Switch to New Service', 'Stay with Current Service'] }
  }
  if (state.screen === 'summary') {
    return { kind: 'choice', options: ['Confirm & Submit', 'Edit Details'] }
  }
  if (state.screen === 'done') {
    return { kind: 'choice', options: ['Browse Services', 'Visit Website'] }
  }
  if (state.screen === 'flow') {
    const step = getStep(state)
    if (!step) return { kind: 'none', options: [] }
    if (step.type === 'choice') return { kind: 'choice', options: step.options }
    if (step.type === 'multi') return { kind: 'multi', options: step.options, selected: state.multiSelected }
    if (step.type === 'text' && step.quickOptions) return { kind: 'choice', options: step.quickOptions }
    return { kind: 'text', options: [] }
  }
  return { kind: 'none', options: [] }
}

export function currentPrompt(state) {
  if (state.screen === 'flow') {
    const step = getStep(state)
    return step ? prompt(step, state.answers) : ''
  }
  return ''
}

/* Matches the bot's sendConfirmation wording exactly ("Here's a summary of
   your request:" ... "Shall I go ahead?"). */
function buildSummary(state) {
  const flow = getFlow(state.categoryId)
  if (!flow) return 'Here is what I have so far.'
  const lines = flow.summaryFields
    .map(f => {
      const v = state.answers[f.field]
      return v ? `${f.label}: ${v}` : null
    })
    .filter(Boolean)
  return `Here's a summary of your request:\n\n${lines.join('\n')}\n\nShall I go ahead?`
}

/* ── Entering / switching a category ─────────────────────────────── */
function enterCategory(categoryId) {
  const flow = getFlow(categoryId)
  if (!flow) return { state: initState(), messages: [menuIntro()] }
  const state = { ...initState(), screen: 'flow', categoryId, stepId: flow.entry }
  const entryPrompt = prompt(flow.steps[flow.entry], {})
  if (flow.isExpert) {
    return { state, messages: ['💬 Connecting you with our team...\n\nA LauncherDesk expert will message you shortly — just a couple of details first.', entryPrompt] }
  }
  return { state, messages: [entryPrompt] }
}

function menuIntro() {
  return 'What service do you need help with?'
}

/** Jump straight to a specific service's detail screen — used when free text
 *  already told us exactly what the user wants (e.g. "I need GST
 *  registration"), skipping the category → service button clicks without
 *  skipping or altering any step of the real flow itself. */
function enterCategoryWithService(categoryId, serviceLabel) {
  const flow = getFlow(categoryId)
  if (!flow) return { state: initState(), messages: [menuIntro()] }
  const entryField = flow.steps[flow.entry].field
  const answers = { [entryField]: serviceLabel }
  const state = { ...initState(), screen: 'flow', categoryId, stepId: 'categoryDetail', answers }
  const detailPrompt = prompt(flow.steps.categoryDetail, answers)
  return { state, messages: [`Got it — ${serviceLabel}.`, detailPrompt] }
}

/* ── Advancing within a flow ──────────────────────────────────────── */
function advanceTo(state, nextId, updatedAnswers) {
  if (nextId === SUMMARY) {
    const s2 = { ...state, answers: updatedAnswers, screen: 'summary' }
    return { state: s2, messages: [buildSummary(s2)] }
  }
  if (nextId === MENU) {
    return { state: { ...initState(), screen: 'menu' }, messages: [menuIntro()] }
  }
  if (nextId === '__diagnose__') {
    const s2 = { ...state, answers: updatedAnswers, screen: 'diagnose' }
    return { state: s2, messages: ["No problem. Tell me what you're trying to do with your business, and I'll help you find the right LauncherDesk service."] }
  }
  if (typeof nextId === 'string' && nextId.startsWith('__switch_')) {
    const targetId = nextId.replace('__switch_', '').replace(/_/g, '-')
    const result = enterCategory(targetId)
    return { state: result.state, messages: [`Sure — let's switch to ${categoryLabel(targetId)}.`, ...result.messages] }
  }
  const flow = getFlow(state.categoryId)
  const nextStep = flow.steps[nextId]
  const history = [...state.history, { stepId: state.stepId, answers: state.answers }]
  const s2 = { ...state, stepId: nextId, answers: updatedAnswers, history, multiSelected: [] }
  return { state: s2, messages: [prompt(nextStep, updatedAnswers)] }
}

/* ── Choice / chip clicks ─────────────────────────────────────────── */
export function handleOption(state, value) {
  if (state.screen === 'menu' || state.screen === 'diagnose-fallback') {
    const cat = findCategoryByLabel(value)
    if (!cat) return { state, messages: [CANT_FIND_OPTION] }
    return enterCategory(cat.id)
  }

  if (state.screen === 'diagnoseConfirm') {
    if (value === 'Show me all services') {
      return { state: { ...initState(), screen: 'menu' }, messages: [menuIntro()] }
    }
    return state.pendingService
      ? enterCategoryWithService(state.pendingCategoryId, state.pendingService)
      : enterCategory(state.pendingCategoryId)
  }

  if (state.screen === 'switchConfirm') {
    if (value === 'Switch to New Service') {
      return state.pendingService
        ? enterCategoryWithService(state.pendingCategoryId, state.pendingService)
        : enterCategory(state.pendingCategoryId)
    }
    // Stay — resume exactly where they left off
    const s2 = { ...state, screen: 'flow', pendingCategoryId: null, pendingService: null }
    return { state: s2, messages: [currentPrompt(s2)] }
  }

  if (state.screen === 'summary') {
    if (value === 'Confirm & Submit') return { state, messages: [], action: 'submit' }
    if (value === 'Edit Details') {
      const flow = getFlow(state.categoryId)
      const s2 = { ...initState(), screen: 'flow', categoryId: state.categoryId, stepId: flow.entry }
      return { state: s2, messages: ["Sure, let's redo it.", prompt(flow.steps[flow.entry], {})] }
    }
  }

  if (state.screen === 'done') {
    if (value === 'Browse Services') return { state: { ...initState(), screen: 'menu' }, messages: [menuIntro()] }
    if (value === 'Visit Website') return { state, messages: ['🌐 Visit us at: https://www.launcherdesk.com\n\nFeel free to message us anytime! 👋'] }
  }

  if (state.screen === 'flow') {
    const step = getStep(state)
    if (!step) return { state, messages: [CANT_FIND_OPTION] }

    if (step.type === 'multi') {
      if (value === '__continue__') {
        const chosen = state.multiSelected
        const updatedAnswers = { ...state.answers, [step.field]: chosen.length ? chosen.join(', ') : 'None' }
        const nextId = typeof step.next === 'function' ? step.next(chosen, updatedAnswers) : step.next
        return advanceTo(state, nextId, updatedAnswers)
      }
      const already = state.multiSelected.includes(value)
      const multiSelected = already ? state.multiSelected.filter(v => v !== value) : [...state.multiSelected, value]
      return { state: { ...state, multiSelected }, messages: [], silent: true }
    }

    const updatedAnswers = { ...state.answers, [step.field]: value }
    const nextId = typeof step.next === 'function' ? step.next(value, updatedAnswers) : step.next
    return advanceTo(state, nextId, updatedAnswers)
  }

  return { state, messages: [CANT_FIND_OPTION] }
}

/* ── Free text ─────────────────────────────────────────────────────── */
export function handleText(state, rawText) {
  const text = rawText.trim()
  const low = text.toLowerCase()

  if (BACK_RE.test(low)) return goBack(state)
  if (RESTART_RE.test(low)) return { state: { ...initState(), screen: 'menu' }, messages: ["No problem — let's start again.", menuIntro()] }

  if (state.screen === 'menu' || state.screen === 'diagnose-fallback') {
    const svc = matchService(text)
    if (svc) return enterCategoryWithService(svc.categoryId, svc.service)
    const cat = matchCategory(text)
    if (cat) return enterCategory(cat.id)
    return { state: { ...state, screen: 'diagnose' }, messages: ["No problem. Tell me what you're trying to do with your business, and I'll help you find the right LauncherDesk service."] }
  }

  if (state.screen === 'diagnose') {
    const svc = matchService(text)
    if (svc) {
      return { state: { ...state, screen: 'diagnoseConfirm', pendingCategoryId: svc.categoryId, pendingService: svc.service }, messages: [`It sounds like ${svc.service} (${categoryLabel(svc.categoryId)}) might be what you need — shall I take you there?`] }
    }
    const cat = matchCategory(text)
    if (cat) {
      return { state: { ...state, screen: 'diagnoseConfirm', pendingCategoryId: cat.id, pendingService: null }, messages: [`It sounds like ${cat.label} might be what you need — shall I take you there?`] }
    }
    return { state: { ...state, screen: 'menu' }, messages: ["I couldn't quite tell from that — here are all our services so you can pick directly.", menuIntro()] }
  }

  if (state.screen === 'diagnoseConfirm') {
    if (/\b(yes|yeah|sure|correct|that.?s it)\b/i.test(low)) {
      return state.pendingService
        ? enterCategoryWithService(state.pendingCategoryId, state.pendingService)
        : enterCategory(state.pendingCategoryId)
    }
    return { state: { ...initState(), screen: 'menu' }, messages: [menuIntro()] }
  }

  if (state.screen === 'switchConfirm') {
    if (/switch/.test(low)) {
      return state.pendingService
        ? enterCategoryWithService(state.pendingCategoryId, state.pendingService)
        : enterCategory(state.pendingCategoryId)
    }
    const s2 = { ...state, screen: 'flow', pendingCategoryId: null, pendingService: null }
    return { state: s2, messages: [currentPrompt(s2)] }
  }

  if (state.screen === 'summary') {
    if (/\b(yes|confirm|submit|correct)\b/i.test(low)) return { state, messages: [], action: 'submit' }
    if (/\b(edit|no|change)\b/i.test(low)) return handleOption(state, 'Edit Details')
    return { state, messages: ['Please choose an option below to confirm or edit.'] }
  }

  if (state.screen === 'done') {
    // Any text in DONE state — show the menu again, matching the bot's behaviour.
    return { state: { ...initState(), screen: 'menu' }, messages: [menuIntro()] }
  }

  if (state.screen === 'flow') {
    if (OUT_OF_SCOPE_KEYWORDS.some(kw => low.includes(kw))) {
      return { state, messages: [OUT_OF_SCOPE_REPLY, currentPrompt(state)] }
    }

    const step = getStep(state)
    const serviceLabel = currentServiceLabel(state)
    const content = getServiceContent(state.categoryId, serviceLabel)

    if (PRICE_RE.test(low)) {
      return { state, messages: [`Pricing for ${serviceLabel} depends on your exact requirements — I don't want to quote you a number that might not fit your case. I can help you complete the details and our team will share the right quote.`, currentPrompt(state)] }
    }
    if (DURATION_RE.test(low)) {
      const answer = content?.timelineAnswer || 'Timelines vary depending on documentation and government processing — our team will confirm exact timing once we have your details.'
      return { state, messages: [answer, currentPrompt(state)] }
    }
    if (DOCS_RE.test(low)) {
      const answer = content?.documents?.length
        ? `Typically you'll need:\n${content.documents.map(d => `• ${d}`).join('\n')}`
        : "The exact document checklist depends on your specific case — our team will share it once we have your details."
      return { state, messages: [answer, currentPrompt(state)] }
    }
    if (PROVIDE_RE.test(low)) {
      const answer = content?.lead
        ? `Yes — LauncherDesk handles ${serviceLabel}. ${content.lead}`
        : `Yes — LauncherDesk handles ${serviceLabel} as part of our ${categoryLabel(state.categoryId)} services.`
      return { state, messages: [answer, currentPrompt(state)] }
    }
    if (HOW_RE.test(low)) {
      const answer = content?.steps?.length
        ? `Here's how it works for ${serviceLabel}:\n${content.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
        : `For ${serviceLabel}, our team handles the paperwork and filing end-to-end once we have your details — I just need a few more to get you started.`
      return { state, messages: [answer, currentPrompt(state)] }
    }

    const switchedService = matchService(text, state.categoryId)
    if (switchedService) {
      return { state: { ...state, screen: 'switchConfirm', pendingCategoryId: switchedService.categoryId, pendingService: switchedService.service }, messages: [`Sure — would you like to switch to ${switchedService.service} (${categoryLabel(switchedService.categoryId)})?`] }
    }
    const switched = matchCategory(text, state.categoryId)
    if (switched) {
      return { state: { ...state, screen: 'switchConfirm', pendingCategoryId: switched.id, pendingService: null }, messages: [`Sure — would you like to switch to ${switched.label}?`] }
    }

    if (!step) return { state, messages: [CANT_FIND_OPTION] }

    if (step.type === 'text') {
      const ok = step.validate ? step.validate(text) : true
      if (ok !== true) return { state, messages: [ok] }
      const updatedAnswers = { ...state.answers, [step.field]: text }
      const nextId = typeof step.next === 'function' ? step.next(text, updatedAnswers) : step.next
      return advanceTo(state, nextId, updatedAnswers)
    }

    // choice / multi step answered via free text — try to fuzzy-match an option
    const match = step.options.find(o => o.toLowerCase() === low) || step.options.find(o => low.includes(o.toLowerCase()) || o.toLowerCase().includes(low))
    if (match) return handleOption(state, match)

    return { state, messages: [CANT_FIND_OPTION, currentPrompt(state)] }
  }

  return { state, messages: [CANT_FIND_OPTION] }
}

function goBack(state) {
  if (state.screen !== 'flow' || state.history.length === 0) {
    return { state, messages: ["We're at the very first step here — no earlier step to go back to."] }
  }
  const prev = state.history[state.history.length - 1]
  const s2 = { ...state, stepId: prev.stepId, answers: prev.answers, history: state.history.slice(0, -1), multiSelected: [] }
  return { state: s2, messages: [currentPrompt(s2)] }
}

export function buildLeadPayload(state) {
  const flow = getFlow(state.categoryId)
  const a = state.answers
  const message = flow.summaryFields
    .map(f => (a[f.field] ? `${f.label}: ${a[f.field]}` : null))
    .filter(Boolean)
    .join('\n')
  return {
    name: a.name || '',
    mobile: a.mobile || '',
    email: a.email || undefined,
    state: a.city || 'Not specified',
    message: `[AI ASSISTANT — ${flow.label}]\n${message}`,
    whatsappOptin: true,
    source: 'ai-assistant',
    service: flow.label,
  }
}

export { menuIntro }
