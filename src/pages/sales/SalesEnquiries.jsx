import { useState, useEffect, useCallback } from 'react'
import { useSalesAuth } from '../../context/SalesAuthContext'

const SOURCE_COLORS = {
  contact: { bg:'#EFF6FF', color:'#1D6FE0', label:'Contact Form' },
  lead:    { bg:'#FFF7ED', color:'#F97316', label:'Service Enquiry' },
  quote:   { bg:'#F5F3FF', color:'#7C3AED', label:'Quote Request' },
}

const STATUS_COLORS = {
  new:'#3B5BDB', contacted:'#0EA5E9', qualified:'#F59E0B',
  converted:'#10B981', closed:'#94A3B8',
  working:'#0EA5E9', nurturing:'#F59E0B', lost:'#EF4444',
  pending:'#94A3B8', reviewed:'#0EA5E9', sent:'#F59E0B',
  accepted:'#10B981', rejected:'#EF4444',
}

const CONTACT_STATUSES  = ['new','contacted','qualified','converted','closed']
const LEAD_STATUSES     = ['new','working','nurturing','converted','lost']
const QUOTE_STATUSES    = ['pending','reviewed','sent','accepted','rejected']

const fmt = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—'
const fmtDate = d => d ? new Date(d).toISOString().slice(0,10) : ''

function SourceBadge({ tag }) {
  const { bg, color, label } = SOURCE_COLORS[tag] || SOURCE_COLORS.contact
  return <span style={{fontSize:10.5,fontWeight:700,padding:'2px 8px',borderRadius:99,background:bg,color,whiteSpace:'nowrap'}}>{label}</span>
}

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || '#94A3B8'
  return <span style={{fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:99,background:`${c}18`,color:c}}>{status}</span>
}

export default function SalesEnquiries() {
  const { apiFetch } = useSalesAuth()
  const [data,     setData]     = useState([])
  const [total,    setTotal]    = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [page,     setPage]     = useState(1)
  const [source,   setSource]   = useState('all')
  const [q,        setQ]        = useState('')
  const [selected, setSelected] = useState(null)
  const [saving,   setSaving]   = useState(false)
  const [edit,     setEdit]     = useState({ status:'', notes:'', followUpDate:'' })
  const PER = 30

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const p = new URLSearchParams({ page, limit: PER })
      if (source !== 'all') p.set('source', source)
      if (q) p.set('q', q)
      const r = await apiFetch(`/sales/all-enquiries?${p}`)
      setData(r.data || []); setTotal(r.total || 0)
    } catch(e){ console.error(e) } finally { setLoading(false) }
  }, [apiFetch, page, source, q])

  useEffect(() => { load() }, [load])

  const open = item => {
    setSelected(item)
    setEdit({ status: item.status, notes: item.notes || '', followUpDate: fmtDate(item.followUpDate) })
  }

  const getStatuses = tag => tag === 'contact' ? CONTACT_STATUSES : tag === 'lead' ? LEAD_STATUSES : QUOTE_STATUSES

  const save = async () => {
    if (!selected) return
    setSaving(true)
    try {
      const endpoint = selected.sourceTag === 'contact' ? 'contacts'
                     : selected.sourceTag === 'lead'    ? 'leads'
                     : 'quotes'
      await apiFetch(`/sales/${endpoint}/${selected._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: edit.status,
          ...(selected.sourceTag !== 'quote' ? { notes: edit.notes } : { adminNotes: edit.notes }),
          ...(edit.followUpDate ? { followUpDate: edit.followUpDate } : {}),
        }),
      })
      setData(d => d.map(i => i._id === selected._id ? { ...i, status: edit.status, notes: edit.notes, followUpDate: edit.followUpDate } : i))
      setSelected(null)
    } catch(e){ console.error(e) } finally { setSaving(false) }
  }

  return (
    <div style={{maxWidth:1200,margin:'0 auto'}}>

      {/* Header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20,flexWrap:'wrap',gap:12}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:'#0A2540'}}>All Enquiries</h1>
          <p style={{color:'#64748B',fontSize:13,marginTop:3}}>
            Every person who submitted a form — contact, quote or service enquiry. <strong>{total} total</strong>
          </p>
        </div>
        <button onClick={load} style={{padding:'8px 16px',background:'#fff',border:'1.5px solid #E2E8F0',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',color:'#475569'}}>↻ Refresh</button>
      </div>

      {/* Source filter tabs */}
      <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
        {[
          {key:'all',label:'All Forms',color:'#475569'},
          {key:'contact',label:'Contact Form',color:'#1D6FE0'},
          {key:'lead',label:'Service Enquiries',color:'#F97316'},
          {key:'quote',label:'Quote Requests',color:'#7C3AED'},
        ].map(s => (
          <button key={s.key} onClick={()=>{setSource(s.key);setPage(1)}}
            style={{padding:'7px 14px',borderRadius:8,border:'1.5px solid',borderColor:source===s.key?s.color:'#E2E8F0',background:source===s.key?`${s.color}10`:'#fff',color:source===s.key?s.color:'#64748B',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all .15s'}}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{marginBottom:14}}>
        <input value={q} onChange={e=>{setQ(e.target.value);setPage(1)}} placeholder="Search by name, email or phone…"
          style={{width:'100%',height:40,border:'1.5px solid #E2E8F0',borderRadius:9,padding:'0 14px',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}}/>
      </div>

      {/* Table */}
      <div style={{background:'#fff',borderRadius:14,border:'1px solid #E2E8F0',overflow:'hidden'}}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:700}}>
            <thead>
              <tr style={{background:'#F8FAFC'}}>
                {['Source','Name','Mobile','Service / Interest','State','Status','Date','Action'].map(h=>(
                  <th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:11,fontWeight:700,color:'#64748B',textTransform:'uppercase',letterSpacing:'.06em',whiteSpace:'nowrap'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>Loading enquiries…</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={8} style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>No enquiries found</td></tr>
              ) : data.map(item => (
                <tr key={`${item.sourceTag}-${item._id}`} style={{borderTop:'1px solid #F1F5F9',transition:'background .1s',cursor:'pointer'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#FAFBFF'}
                  onMouseLeave={e=>e.currentTarget.style.background=''}>
                  <td style={{padding:'11px 14px'}}><SourceBadge tag={item.sourceTag}/></td>
                  <td style={{padding:'11px 14px'}}>
                    <div style={{fontWeight:600,fontSize:13.5,color:'#0A2540'}}>{item.name}</div>
                    <div style={{fontSize:11.5,color:'#94A3B8'}}>{item.email}</div>
                  </td>
                  <td style={{padding:'11px 14px'}}>
                    <a href={`tel:${item.mobile}`} style={{fontSize:13,fontWeight:600,color:'#3B5BDB',textDecoration:'none'}}>{item.mobile||'—'}</a>
                  </td>
                  <td style={{padding:'11px 14px',fontSize:12.5,color:'#475569',maxWidth:160}}>
                    <div style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.service||'—'}</div>
                  </td>
                  <td style={{padding:'11px 14px',fontSize:12.5,color:'#475569'}}>{item.state||'—'}</td>
                  <td style={{padding:'11px 14px'}}><StatusBadge status={item.status}/></td>
                  <td style={{padding:'11px 14px',fontSize:12,color:'#94A3B8',whiteSpace:'nowrap'}}>{fmt(item.createdAt)}</td>
                  <td style={{padding:'11px 14px'}}>
                    <div style={{display:'flex',gap:6,flexWrap:'nowrap'}}>
                      <button onClick={()=>open(item)}
                        style={{padding:'5px 10px',background:'#EEF2FF',color:'#3B5BDB',border:'none',borderRadius:6,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit',whiteSpace:'nowrap'}}>
                        Update
                      </button>
                      {item.mobile && (
                        <a href={`https://wa.me/91${item.mobile.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                          style={{padding:'5px 8px',background:'#DCFCE7',color:'#16A34A',borderRadius:6,fontSize:12,fontWeight:600,textDecoration:'none',whiteSpace:'nowrap'}}>
                          WA
                        </a>
                      )}
                      {item.email && (
                        <a href={`mailto:${item.email}`}
                          style={{padding:'5px 8px',background:'#FFF7ED',color:'#F97316',borderRadius:6,fontSize:12,fontWeight:600,textDecoration:'none',whiteSpace:'nowrap'}}>
                          Mail
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > PER && (
          <div style={{padding:'12px 16px',borderTop:'1px solid #F1F5F9',display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
            {Array.from({length:Math.ceil(total/PER)},(_,i)=>i+1).map(p=>(
              <button key={p} onClick={()=>setPage(p)}
                style={{width:32,height:32,borderRadius:6,border:'1.5px solid',borderColor:p===page?'#3B5BDB':'#E2E8F0',background:p===page?'#EEF2FF':'#fff',color:p===page?'#3B5BDB':'#475569',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail / Update Modal */}
      {selected && (
        <div style={{position:'fixed',inset:0,background:'rgba(10,20,40,.6)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:16,backdropFilter:'blur(4px)'}}>
          <div style={{background:'#fff',borderRadius:18,width:'100%',maxWidth:500,maxHeight:'90vh',overflow:'auto',boxShadow:'0 24px 80px rgba(0,0,0,.25)'}}>

            {/* Modal header */}
            <div style={{padding:'18px 22px',borderBottom:'1px solid #F1F5F9',display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                  <SourceBadge tag={selected.sourceTag}/>
                </div>
                <div style={{fontSize:17,fontWeight:800,color:'#0A2540'}}>{selected.name}</div>
                <div style={{fontSize:13,color:'#64748B'}}>{selected.email}</div>
              </div>
              <button onClick={()=>setSelected(null)} style={{background:'#F1F5F9',border:'none',borderRadius:8,width:32,height:32,cursor:'pointer',fontSize:16,color:'#64748B'}}>✕</button>
            </div>

            <div style={{padding:'18px 22px',display:'flex',flexDirection:'column',gap:14}}>

              {/* Info grid */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,background:'#F8FAFC',borderRadius:10,padding:14}}>
                {[
                  ['Phone', selected.mobile||'—'],
                  ['State', selected.state||'—'],
                  ['Service', selected.service||'—'],
                  ['Date', fmt(selected.createdAt)],
                ].map(([k,v])=>(
                  <div key={k}>
                    <div style={{fontSize:10.5,fontWeight:700,color:'#94A3B8',marginBottom:2,textTransform:'uppercase'}}>{k}</div>
                    <div style={{fontSize:13,fontWeight:600,color:'#0A2540'}}>{v}</div>
                  </div>
                ))}
              </div>

              {selected.message && (
                <div style={{background:'#FFF9C4',border:'1px solid #FDE68A',borderRadius:8,padding:'10px 12px',fontSize:13,color:'#854D0E',lineHeight:1.6}}>
                  <strong>Message:</strong> {selected.message}
                </div>
              )}

              {/* Quick contact */}
              <div style={{display:'flex',gap:8}}>
                {selected.mobile && <>
                  <a href={`tel:${selected.mobile}`} style={{flex:1,padding:'10px',background:'#EEF2FF',color:'#3B5BDB',borderRadius:9,fontWeight:700,fontSize:13,textDecoration:'none',textAlign:'center'}}>📞 Call</a>
                  <a href={`https://wa.me/91${selected.mobile.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                    style={{flex:1,padding:'10px',background:'#DCFCE7',color:'#16A34A',borderRadius:9,fontWeight:700,fontSize:13,textDecoration:'none',textAlign:'center'}}>💬 WhatsApp</a>
                </>}
                {selected.email && (
                  <a href={`mailto:${selected.email}`} style={{flex:1,padding:'10px',background:'#FFF7ED',color:'#F97316',borderRadius:9,fontWeight:700,fontSize:13,textDecoration:'none',textAlign:'center'}}>✉️ Email</a>
                )}
              </div>

              {/* Update status */}
              <div>
                <label style={{fontSize:11.5,fontWeight:700,color:'#475569',display:'block',marginBottom:5,textTransform:'uppercase'}}>Update Status</label>
                <select value={edit.status} onChange={e=>setEdit(p=>({...p,status:e.target.value}))}
                  style={{width:'100%',height:40,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 10px',fontSize:13,outline:'none',fontFamily:'inherit',background:'#fff'}}>
                  {getStatuses(selected.sourceTag).map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {selected.sourceTag !== 'quote' && (
                <div>
                  <label style={{fontSize:11.5,fontWeight:700,color:'#475569',display:'block',marginBottom:5,textTransform:'uppercase'}}>Follow-up Date</label>
                  <input type="date" value={edit.followUpDate} onChange={e=>setEdit(p=>({...p,followUpDate:e.target.value}))}
                    style={{width:'100%',height:40,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 10px',fontSize:13,outline:'none',fontFamily:'inherit'}}/>
                </div>
              )}

              <div>
                <label style={{fontSize:11.5,fontWeight:700,color:'#475569',display:'block',marginBottom:5,textTransform:'uppercase'}}>Notes</label>
                <textarea value={edit.notes} onChange={e=>setEdit(p=>({...p,notes:e.target.value}))} rows={3}
                  placeholder="Add call notes, follow-up actions, anything relevant…"
                  style={{width:'100%',border:'1.5px solid #E2E8F0',borderRadius:8,padding:'10px',fontSize:13,outline:'none',fontFamily:'inherit',resize:'vertical'}}/>
              </div>

              <div style={{display:'flex',gap:10}}>
                <button onClick={()=>setSelected(null)} style={{flex:1,padding:'11px',background:'#F1F5F9',border:'none',borderRadius:9,fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:'inherit',color:'#475569'}}>Cancel</button>
                <button onClick={save} disabled={saving} style={{flex:2,padding:'11px',background:'#3B5BDB',border:'none',borderRadius:9,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit',color:'#fff',opacity:saving?.6:1}}>
                  {saving?'Saving…':'Save Changes ✓'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}