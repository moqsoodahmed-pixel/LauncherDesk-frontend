import { useState, useEffect, useCallback } from 'react'
import { useSalesAuth } from '../../context/SalesAuthContext'

const STATUSES = ['all','pending','reviewed','sent','accepted','rejected']
const STATUS_COLORS = { pending:'#94A3B8',reviewed:'#0EA5E9',sent:'#F59E0B',accepted:'#10B981',rejected:'#EF4444' }
const fmt = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—'

function Badge({ s }) {
  const c = STATUS_COLORS[s] || '#94A3B8'
  return <span style={{fontSize:11,fontWeight:700,padding:'2px 9px',borderRadius:99,background:`${c}18`,color:c}}>{s}</span>
}

export default function SalesQuotes() {
  const { apiFetch } = useSalesAuth()
  const [quotes,   setQuotes]  = useState([])
  const [total,    setTotal]   = useState(0)
  const [loading,  setLoading] = useState(true)
  const [page,     setPage]    = useState(1)
  const [status,   setStatus]  = useState('all')
  const [q,        setQ]       = useState('')
  const [selected, setSelected] = useState(null)
  const [saving,   setSaving]  = useState(false)
  const [edit, setEdit] = useState({ status:'', adminNotes:'', quotedAmount:'' })
  const PER = 20

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const p = new URLSearchParams({ page, limit: PER })
      if (status !== 'all') p.set('status', status)
      if (q) p.set('q', q)
      const r = await apiFetch(`/sales/quotes?${p}`)
      setQuotes(r.data||[]); setTotal(r.total||0)
    } catch(e){console.error(e)} finally{setLoading(false)}
  }, [apiFetch, page, status, q])

  useEffect(() => { load() }, [load])

  const open = q => { setSelected(q); setEdit({ status:q.status, adminNotes:q.adminNotes||'', quotedAmount:q.quotedAmount||'' }) }

  const save = async () => {
    setSaving(true)
    try {
      const updated = await apiFetch(`/sales/quotes/${selected._id}`, { method:'PATCH', body:JSON.stringify(edit) })
      setQuotes(qs => qs.map(q => q._id===selected._id ? updated.data : q))
      setSelected(null)
    } catch(e){console.error(e)} finally{setSaving(false)}
  }

  return (
    <div style={{maxWidth:1100,margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:12}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:'#0A2540'}}>Quote Requests</h1>
          <p style={{color:'#64748B',fontSize:13,marginTop:2}}>{total} total quote requests</p>
        </div>
        <button onClick={load} style={{padding:'8px 16px',background:'#fff',border:'1.5px solid #E2E8F0',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',color:'#475569'}}>↻ Refresh</button>
      </div>
      <div style={{display:'flex',gap:10,marginBottom:16,flexWrap:'wrap'}}>
        <input value={q} onChange={e=>{setQ(e.target.value);setPage(1)}} placeholder="Search name, email, service…"
          style={{flex:1,minWidth:200,height:38,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 12px',fontSize:13,outline:'none',fontFamily:'inherit'}}/>
        <select value={status} onChange={e=>{setStatus(e.target.value);setPage(1)}}
          style={{height:38,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 12px',fontSize:13,outline:'none',fontFamily:'inherit',background:'#fff'}}>
          {STATUSES.map(s=><option key={s} value={s}>{s==='all'?'All Statuses':s}</option>)}
        </select>
      </div>
      <div style={{background:'#fff',borderRadius:14,border:'1px solid #E2E8F0',overflow:'hidden'}}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:640}}>
            <thead>
              <tr style={{background:'#F8FAFC'}}>
                {['Name','Mobile','Service','State','Status','Date','Action'].map(h=>(
                  <th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:11.5,fontWeight:700,color:'#64748B',textTransform:'uppercase',letterSpacing:'.06em',whiteSpace:'nowrap'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={7} style={{padding:'40px',textAlign:'center',color:'#94A3B8'}}>Loading…</td></tr>
              : quotes.length===0 ? <tr><td colSpan={7} style={{padding:'40px',textAlign:'center',color:'#94A3B8'}}>No quotes found</td></tr>
              : quotes.map(q => (
                <tr key={q._id} style={{borderTop:'1px solid #F1F5F9'}} onMouseEnter={e=>e.currentTarget.style.background='#FAFBFF'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                  <td style={{padding:'12px 16px'}}>
                    <div style={{fontWeight:600,fontSize:13.5,color:'#0A2540'}}>{q.name}</div>
                    <div style={{fontSize:12,color:'#64748B'}}>{q.email}</div>
                  </td>
                  <td style={{padding:'12px 16px'}}><a href={`tel:${q.mobile}`} style={{fontSize:13,color:'#3B5BDB',fontWeight:600,textDecoration:'none'}}>{q.mobile}</a></td>
                  <td style={{padding:'12px 16px',fontSize:12.5,color:'#475569',maxWidth:150}}><div style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{q.serviceTitle||q.serviceSlug}</div></td>
                  <td style={{padding:'12px 16px',fontSize:12.5,color:'#475569'}}>{q.state||'—'}</td>
                  <td style={{padding:'12px 16px'}}><Badge s={q.status}/></td>
                  <td style={{padding:'12px 16px',fontSize:12,color:'#64748B'}}>{fmt(q.createdAt)}</td>
                  <td style={{padding:'12px 16px'}}>
                    <div style={{display:'flex',gap:6}}>
                      <button onClick={()=>open(q)} style={{padding:'5px 12px',background:'#EEF2FF',color:'#3B5BDB',border:'none',borderRadius:6,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Update</button>
                      {q.mobile && <a href={`https://wa.me/91${q.mobile.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{padding:'5px 10px',background:'#DCFCE7',color:'#16A34A',borderRadius:6,fontSize:12,fontWeight:600,textDecoration:'none'}}>WA</a>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total > PER && (
          <div style={{padding:'12px 16px',borderTop:'1px solid #F1F5F9',display:'flex',gap:8,justifyContent:'center'}}>
            {Array.from({length:Math.ceil(total/PER)},(_,i)=>i+1).map(p=>(
              <button key={p} onClick={()=>setPage(p)} style={{width:32,height:32,borderRadius:6,border:'1.5px solid',borderColor:p===page?'#3B5BDB':'#E2E8F0',background:p===page?'#EEF2FF':'#fff',color:p===page?'#3B5BDB':'#475569',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>{p}</button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div style={{position:'fixed',inset:0,background:'rgba(10,20,40,.55)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:16,backdropFilter:'blur(4px)'}}>
          <div style={{background:'#fff',borderRadius:18,width:'100%',maxWidth:480,maxHeight:'90vh',overflow:'auto',boxShadow:'0 24px 80px rgba(0,0,0,.25)'}}>
            <div style={{padding:'20px 24px',borderBottom:'1px solid #F1F5F9',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:17,fontWeight:800,color:'#0A2540'}}>{selected.name}</div>
                <div style={{fontSize:13,color:'#64748B'}}>{selected.serviceTitle||selected.serviceSlug}</div>
              </div>
              <button onClick={()=>setSelected(null)} style={{background:'#F1F5F9',border:'none',borderRadius:8,width:32,height:32,cursor:'pointer',fontSize:16}}>✕</button>
            </div>
            <div style={{padding:'20px 24px',display:'flex',flexDirection:'column',gap:14}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,background:'#F8FAFC',borderRadius:10,padding:14}}>
                {[['Mobile',selected.mobile],['Email',selected.email],['State',selected.state||'—'],['Business',selected.businessType||'—']].map(([k,v])=>(
                  <div key={k}><div style={{fontSize:11,fontWeight:700,color:'#94A3B8',marginBottom:2}}>{k}</div><div style={{fontSize:13,fontWeight:600,color:'#0A2540'}}>{v}</div></div>
                ))}
              </div>
              {selected.additionalInfo && <div style={{background:'#FFF9C4',borderRadius:8,padding:'10px 12px',fontSize:13,color:'#854D0E'}}><b>Info:</b> {selected.additionalInfo}</div>}
              <div>
                <label style={{fontSize:11.5,fontWeight:700,color:'#475569',display:'block',marginBottom:5}}>STATUS</label>
                <select value={edit.status} onChange={e=>setEdit(p=>({...p,status:e.target.value}))}
                  style={{width:'100%',height:38,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 10px',fontSize:13,outline:'none',fontFamily:'inherit',background:'#fff'}}>
                  {STATUSES.filter(s=>s!=='all').map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:11.5,fontWeight:700,color:'#475569',display:'block',marginBottom:5}}>QUOTED AMOUNT (₹)</label>
                <input type="number" value={edit.quotedAmount} onChange={e=>setEdit(p=>({...p,quotedAmount:e.target.value}))} placeholder="e.g. 3999"
                  style={{width:'100%',height:38,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 10px',fontSize:13,outline:'none',fontFamily:'inherit'}}/>
              </div>
              <div>
                <label style={{fontSize:11.5,fontWeight:700,color:'#475569',display:'block',marginBottom:5}}>NOTES</label>
                <textarea value={edit.adminNotes} onChange={e=>setEdit(p=>({...p,adminNotes:e.target.value}))} rows={3} placeholder="Internal notes…"
                  style={{width:'100%',border:'1.5px solid #E2E8F0',borderRadius:8,padding:'10px',fontSize:13,outline:'none',fontFamily:'inherit',resize:'vertical'}}/>
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {selected.mobile && <>
                  <a href={`tel:${selected.mobile}`} style={{flex:1,minWidth:100,padding:'10px',background:'#EEF2FF',color:'#3B5BDB',borderRadius:9,fontWeight:700,fontSize:13,textDecoration:'none',textAlign:'center'}}>📞 Call</a>
                  <a href={`https://wa.me/91${selected.mobile.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{flex:1,minWidth:100,padding:'10px',background:'#DCFCE7',color:'#16A34A',borderRadius:9,fontWeight:700,fontSize:13,textDecoration:'none',textAlign:'center'}}>💬 WhatsApp</a>
                </>}
                {selected.email && <a href={`mailto:${selected.email}`} style={{flex:1,minWidth:100,padding:'10px',background:'#FFF7ED',color:'#F97316',borderRadius:9,fontWeight:700,fontSize:13,textDecoration:'none',textAlign:'center'}}>✉️ Email</a>}
              </div>
              <div style={{display:'flex',gap:10}}>
                <button onClick={()=>setSelected(null)} style={{flex:1,padding:'11px',background:'#F1F5F9',border:'none',borderRadius:9,fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:'inherit',color:'#475569'}}>Cancel</button>
                <button onClick={save} disabled={saving} style={{flex:2,padding:'11px',background:'#3B5BDB',border:'none',borderRadius:9,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit',color:'#fff',opacity:saving?.7:1}}>
                  {saving?'Saving…':'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}