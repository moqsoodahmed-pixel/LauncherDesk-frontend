/* ── Shared admin UI primitives used across all admin pages ── */

export function Ic({ d, size = 16, sw = 2, style = {} }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flex:'none', ...style }}>
      {d.split('|').map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

export function Badge({ type = 'neutral', children }) {
  const MAP = {
    success: { bg:'#F0FDF4', color:'#16A34A' },
    warn:    { bg:'#FFFBEB', color:'#D97706' },
    danger:  { bg:'#FEF2F2', color:'#DC2626' },
    info:    { bg:'#EFF6FF', color:'#3B82F6' },
    primary: { bg:'#EEF2FF', color:'#3B5BDB' },
    neutral: { bg:'#F1F5F9', color:'#64748B' },
    purple:  { bg:'#F5F3FF', color:'#7C3AED' },
  }
  const { bg, color } = MAP[type] || MAP.neutral
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:11.5, fontWeight:600, padding:'3px 10px', borderRadius:99, background:bg, color }}>
      {children}
    </span>
  )
}

const STATUS_MAP = {
  // contacts
  new:          'primary',
  contacted:    'info',
  qualified:    'warn',
  converted:    'success',
  closed:       'neutral',
  // leads
  working:      'info',
  nurturing:    'warn',
  lost:         'danger',
  // quotes
  pending:      'neutral',
  reviewed:     'info',
  sent:         'warn',
  accepted:     'success',
  rejected:     'danger',
  // applications
  received:     'primary',
  'under-review':'info',
  shortlisted:  'warn',
  hired:        'success',
  // office
  New:          'primary',
  Quoted:       'warn',
  'In Progress':'info',
  Completed:    'success',
}
export function StatusBadge({ s }) {
  return <Badge type={STATUS_MAP[s] || 'neutral'}>{s}</Badge>
}

export function Card({ children, style = {} }) {
  return (
    <div style={{ background:'#fff', borderRadius:10, border:'1px solid #E2E8F0', boxShadow:'0 1px 3px rgba(0,0,0,.06)', ...style }}>
      {children}
    </div>
  )
}

export function CardHead({ title, sub, actions }) {
  return (
    <div style={{ padding:'14px 20px', borderBottom:'1px solid #E2E8F0', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
      <div>
        <div style={{ fontSize:15, fontWeight:700, color:'#1C2434' }}>{title}</div>
        {sub && <div style={{ fontSize:12, color:'#94A3B8', marginTop:2 }}>{sub}</div>}
      </div>
      {actions && <div style={{ display:'flex', gap:8 }}>{actions}</div>}
    </div>
  )
}

export function StatCard({ label, value, change, dir, icon, iconBg, iconColor }) {
  return (
    <Card>
      <div style={{ padding:'20px 22px' }}>
        <div style={{ width:44, height:44, borderRadius:10, background:iconBg, display:'grid', placeItems:'center', marginBottom:14 }}>
          <Ic d={icon} size={21} style={{ color:iconColor }} />
        </div>
        <div style={{ fontSize:26, fontWeight:800, color:'#1C2434', letterSpacing:'-.03em', lineHeight:1 }}>{value}</div>
        <div style={{ fontSize:12.5, color:'#64748B', marginTop:4 }}>{label}</div>
        {change && (
          <div style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:12, fontWeight:600, marginTop:8, padding:'3px 8px', borderRadius:99, background:dir==='up'?'#F0FDF4':'#FEF2F2', color:dir==='up'?'#16A34A':'#DC2626' }}>
            {dir==='up' ? '↑' : '↓'} {change}
          </div>
        )}
      </div>
    </Card>
  )
}

export function Btn({ children, onClick, variant='primary', size='md', disabled=false, href, target, style:extra={} }) {
  const V = {
    primary: { background:'#3B5BDB', color:'#fff', border:'none' },
    outline: { background:'#fff',    color:'#1C2434', border:'1px solid #E2E8F0' },
    danger:  { background:'#FEF2F2', color:'#DC2626', border:'1px solid #FECACA' },
    success: { background:'#F0FDF4', color:'#16A34A', border:'1px solid #BBF7D0' },
    ghost:   { background:'transparent', color:'#64748B', border:'1px solid #E2E8F0' },
  }
  const SZ = {
    sm: { height:32, padding:'0 12px', fontSize:12.5 },
    md: { height:38, padding:'0 16px', fontSize:13.5 },
    lg: { height:44, padding:'0 22px', fontSize:14.5 },
  }
  const base = { display:'inline-flex', alignItems:'center', gap:7, borderRadius:8, fontWeight:600, cursor:disabled?'not-allowed':'pointer', opacity:disabled?.6:1, transition:'all .15s', fontFamily:'inherit', textDecoration:'none', whiteSpace:'nowrap', ...V[variant], ...SZ[size], ...extra }
  if (href) return <a href={href} target={target} style={base}>{children}</a>
  return <button onClick={onClick} disabled={disabled} style={base}>{children}</button>
}

export function Table({ head, children, empty='No records found.' }) {
  return (
    <div style={{ overflowX:'auto' }}>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr>
            {head.map(h => (
              <th key={h} style={{ textAlign:'left', padding:'10px 16px', fontSize:11.5, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', color:'#94A3B8', background:'#F8FAFC', borderBottom:'1px solid #E2E8F0' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Td({ children, style = {} }) {
  return <td style={{ padding:'12px 16px', borderBottom:'1px solid #F1F5F9', fontSize:13.5, color:'#1C2434', verticalAlign:'middle', ...style }}>{children}</td>
}

export function Toolbar({ children }) {
  return <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>{children}</div>
}

export function SearchInput({ value, onChange, placeholder='Search…' }) {
  return (
    <div style={{ position:'relative', flex:1, minWidth:220 }}>
      <svg style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)' }} viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{ width:'100%', height:38, border:'1px solid #E2E8F0', borderRadius:8, padding:'0 12px 0 34px', fontSize:13.5, color:'#1C2434', outline:'none', background:'#fff', fontFamily:'inherit' }}
      />
    </div>
  )
}

export function FilterSelect({ value, onChange, options }) {
  return (
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{ height:38, border:'1px solid #E2E8F0', borderRadius:8, padding:'0 12px', fontSize:13, color:'#1C2434', background:'#fff', outline:'none', cursor:'pointer', fontFamily:'inherit' }}>
      {options.map(o => <option key={o.v||o} value={o.v||o}>{o.l||o}</option>)}
    </select>
  )
}

export function PageHeader({ title, sub, actions }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:22, gap:16 }}>
      <div>
        <h1 style={{ fontSize:22, fontWeight:800, color:'#1C2434', letterSpacing:'-.02em' }}>{title}</h1>
        {sub && <p style={{ fontSize:13, color:'#64748B', marginTop:3 }}>{sub}</p>}
      </div>
      {actions && <div style={{ display:'flex', gap:10, alignItems:'center', flexShrink:0 }}>{actions}</div>}
    </div>
  )
}

export function Modal({ open, onClose, title, children, footer, width=560 }) {
  if (!open) return null
  return (
    <div onClick={e=>{if(e.target===e.currentTarget)onClose()}}
      style={{ position:'fixed', inset:0, background:'rgba(15,23,42,.45)', backdropFilter:'blur(3px)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'#fff', borderRadius:14, width:'100%', maxWidth:width, boxShadow:'0 24px 64px rgba(0,0,0,.18)', maxHeight:'90vh', overflow:'auto', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'18px 22px', borderBottom:'1px solid #E2E8F0', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <div style={{ fontSize:17, fontWeight:700, color:'#1C2434' }}>{title}</div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, background:'#F1F5F9', border:0, cursor:'pointer', display:'grid', placeItems:'center' }}>
            <Ic d="M18 6 6 18M6 6l12 12" size={15} />
          </button>
        </div>
        <div style={{ padding:22, flex:1, overflow:'auto' }}>{children}</div>
        {footer && <div style={{ padding:'14px 22px', borderTop:'1px solid #E2E8F0', display:'flex', justifyContent:'flex-end', gap:10, flexShrink:0 }}>{footer}</div>}
      </div>
    </div>
  )
}

export function InfoGrid({ rows }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
      {rows.map(([l, v]) => (
        <div key={l} style={{ background:'#F8FAFC', borderRadius:8, padding:'10px 14px' }}>
          <div style={{ fontSize:11, fontWeight:600, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:3 }}>{l}</div>
          <div style={{ fontSize:13.5, fontWeight:600, color:'#1C2434', wordBreak:'break-word' }}>{v || '—'}</div>
        </div>
      ))}
    </div>
  )
}

export function Pagination({ page, total, perPage, onChange }) {
  const pages = Math.ceil(total / perPage)
  if (pages <= 1) return null
  const from = (page - 1) * perPage + 1
  const to   = Math.min(page * perPage, total)
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 20px', borderTop:'1px solid #E2E8F0', fontSize:13, color:'#64748B' }}>
      <span>Showing {from}–{to} of {total}</span>
      <div style={{ display:'flex', gap:4 }}>
        <PBtn onClick={()=>onChange(page-1)} disabled={page===1}>‹</PBtn>
        {[...Array(Math.min(pages,7))].map((_,i)=>{
          const p=i+1
          return <PBtn key={p} active={p===page} onClick={()=>onChange(p)}>{p}</PBtn>
        })}
        <PBtn onClick={()=>onChange(page+1)} disabled={page===pages}>›</PBtn>
      </div>
    </div>
  )
}
function PBtn({ children, onClick, disabled, active }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width:32, height:32, borderRadius:7, border:'1px solid #E2E8F0', background:active?'#3B5BDB':'#fff', color:active?'#fff':'#64748B', cursor:disabled?'default':'pointer', fontSize:13, fontWeight:600, opacity:disabled?.4:1, fontFamily:'inherit' }}>
      {children}
    </button>
  )
}

export function Spinner() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:48 }}>
      <svg style={{ animation:'spin 1s linear infinite' }} viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="#3B5BDB" strokeWidth={2.5} strokeLinecap="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export function EmptyState({ msg = 'No records found.', icon }) {
  return (
    <div style={{ textAlign:'center', padding:'48px 24px', color:'#94A3B8' }}>
      {icon && <div style={{ fontSize:36, marginBottom:12 }}>{icon}</div>}
      <div style={{ fontSize:14 }}>{msg}</div>
    </div>
  )
}

export function useApi(apiFetch) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const run = async (path, opts) => {
    setLoading(true)
    setError(null)
    try {
      const r = await apiFetch(path, opts)
      setData(r)
      return r
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, run }
}
