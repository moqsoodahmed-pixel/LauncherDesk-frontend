import { useState, useEffect, useCallback } from 'react'
import { useSalesAuth } from '../../context/SalesAuthContext'

const STATUSES = ['all','new','contacted','qualified','converted','closed']
const STATUS_COLORS = { new:'#3B5BDB',contacted:'#0EA5E9',qualified:'#F59E0B',converted:'#10B981',closed:'#94A3B8' }
const fmt = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—'
const fmtDate = d => d ? new Date(d).toISOString().slice(0,10) : ''

function Badge({ s }) {
  const c = STATUS_COLORS[s] || '#94A3B8'
  return <span style={{fontSize:11,fontWeight:700,padding:'2px 9px',borderRadius:99,background:`${c}18`,color:c}}>{s}</span>
}

export default function SalesContacts() {
  const { apiFetch } = useSalesAuth()
  const [contacts, setContacts] = useState([])
  const [total,    setTotal]    = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [page,     setPage]     = useState(1)
  const [status,   setStatus]   = useState('all')
  const [q,        setQ]        = useState('')
  const [selected, setSelected] = useState(null)
  const [saving,   setSaving]   = useState(false)
  const [team,     setTeam]     = useState([])
  const [edit, setEdit] = useState({ status:'', notes:'', assignedTo:'', followUpDate:'', lastContactedAt:'' })
  const PER = 20

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const p = new URLSearchParams({ page, limit: PER })
      if (status !== 'all') p.set('status', status)
      if (q) p.set('q', q)
      const r = await apiFetch(`/sales/contacts?${p}`)
      setContacts(r.data||[]); setTotal(r.total||0)
    } catch(e){console.error(e)} finally{setLoading(false)}
  }, [apiFetch, page, status, q])

  useEffect(() => { load() }, [load])
  useEffect(() => { apiFetch('/sales/team').then(r=>setTeam(r.data||[])).catch(()=>{}) }, [])

  const open = c => {
    setSelected(c)
    setEdit({ status:c.status, notes:c.notes||'', assignedTo:c.assignedTo?._id||'', followUpDate:fmtDate(c.followUpDate), lastContactedAt:fmtDate(c.lastContactedAt) })
  }

  const save = async () => {
    setSaving(true)
    try {
      const updated = await apiFetch(`/sales/contacts/${selected._id}`, { method:'PATCH', body:JSON.stringify(edit) })
      setContacts(cs => cs.map(c => c._id===selected._id ? updated.data : c))
      setSelected(null)
    } catch(e){console.error(e)} finally{setSaving(false)}
  }

  return (
    <div style={{maxWidth:1100,margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:12}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:'#0A2540'}}>Contacts</h1>
          <p style={{color:'#64748B',fontSize:13,marginTop:2}}>{total} total contacts from all forms</p>
        </div>
        <button onClick={load} style={{padding:'8px 16px',background:'#fff',border:'1.5px solid #E2E8F0',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',color:'#475569'}}>↻ Refresh</button>
      </div>

      {/* Filters */}
      <div style={{display:'flex',gap:10,marginBottom:16,flexWrap:'wrap'}}>
        <input value={q} onChange={e=>{setQ(e.target.value);setPage(1)}} placeholder="Search name, email, phone…"
          style={{flex:1,minWidth:200,height:38,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 12px',fontSize:13,outline:'none',fontFamily:'inherit'}}/>
        <select value={status} onChange={e=>{setStatus(e.target.value);setPage(1)}}
          style={{height:38,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 12px',fontSize:13,outline:'none',fontFamily:'inherit',background:'#fff'}}>
          {STATUSES.map(s=><option key={s} value={s}>{s==='all'?'All Statuses':s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{background:'#fff',borderRadius:14,border:'1px solid #E2E8F0',overflow:'hidden'}}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:640}}>
            <thead>
              <tr style={{background:'#F8FAFC'}}>
                {['Name','Mobile','Email','State','Status','Follow-Up','Action'].map(h=>(
                  <th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:11.5,fontWeight:700,color:'#64748B',textTransform:'uppercase',letterSpacing:'.06em',whiteSpace:'nowrap'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={7} style={{padding:'40px',textAlign:'center',color:'#94A3B8'}}>Loading…</td></tr>
              : contacts.length===0 ? <tr><td colSpan={7} style={{padding:'40px',textAlign:'center',color:'#94A3B8'}}>No contacts found</td></tr>
              : contacts.map(c => (
                <tr key={c._id} style={{borderTop:'1px solid #F1F5F9'}} onMouseEnter={e=>e.currentTarget.style.background='#FAFBFF'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                  <td style={{padding:'12px 16px'}}>
                    <div style={{fontWeight:600,fontSize:13.5,color:'#0A2540'}}>{c.name}</div>
                    <div style={{fontSize:11,color:'#94A3B8'}}>{fmt(c.createdAt)}</div>
                  </td>
                  <td style={{padding:'12px 16px'}}>
                    <a href={`tel:${c.mobile}`} style={{fontSize:13,color:'#3B5BDB',fontWeight:600,textDecoration:'none'}}>{c.mobile}</a>
                  </td>
                  <td style={{padding:'12px 16px',fontSize:12.5,color:'#475569',maxWidth:160}}><div style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.email||'—'}</div></td>
                  <td style={{padding:'12px 16px',fontSize:12.5,color:'#475569'}}>{c.state||'—'}</td>
                  <td style={{padding:'12px 16px'}}><Badge s={c.status}/></td>
                  <td style={{padding:'12px 16px',fontSize:12,color:c.followUpDate?'#F59E0B':'#94A3B8'}}>{fmt(c.followUpDate)}</td>
                  <td style={{padding:'12px 16px'}}>
                    <div style={{display:'flex',gap:6}}>
                      <button onClick={()=>open(c)} style={{padding:'5px 12px',background:'#EEF2FF',color:'#3B5BDB',border:'none',borderRadius:6,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Update</button>
                      {c.mobile && <a href={`https://wa.me/91${c.mobile.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{padding:'5px 10px',background:'#DCFCE7',color:'#16A34A',borderRadius:6,fontSize:12,fontWeight:600,textDecoration:'none'}}>WA</a>}
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

      {/* Modal */}
      {selected && (
        <div style={{position:'fixed',inset:0,background:'rgba(10,20,40,.55)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:16,backdropFilter:'blur(4px)'}}>
          <div style={{background:'#fff',borderRadius:18,width:'100%',maxWidth:520,maxHeight:'90vh',overflow:'auto',boxShadow:'0 24px 80px rgba(0,0,0,.25)'}}>
            <div style={{padding:'20px 24px',borderBottom:'1px solid #F1F5F9',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:17,fontWeight:800,color:'#0A2540'}}>{selected.name}</div>
                <div style={{fontSize:13,color:'#64748B'}}>{selected.mobile} · {selected.email}</div>
              </div>
              <button onClick={()=>setSelected(null)} style={{background:'#F1F5F9',border:'none',borderRadius:8,width:32,height:32,cursor:'pointer',fontSize:16}}>✕</button>
            </div>
            <div style={{padding:'20px 24px',display:'flex',flexDirection:'column',gap:14}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,background:'#F8FAFC',borderRadius:10,padding:14}}>
                {[['State',selected.state||'—'],['Service',selected.service||'—'],['Source',selected.source||'—'],['WhatsApp',selected.whatsappOptin?'Yes':'No']].map(([k,v])=>(
                  <div key={k}><div style={{fontSize:11,fontWeight:700,color:'#94A3B8',marginBottom:2}}>{k}</div><div style={{fontSize:13,fontWeight:600,color:'#0A2540'}}>{v}</div></div>
                ))}
              </div>
              {selected.message && <div style={{background:'#FFF9C4',borderRadius:8,padding:'10px 12px',fontSize:13,color:'#854D0E'}}><b>Message:</b> {selected.message}</div>}

              <div>
                <label style={{fontSize:11.5,fontWeight:700,color:'#475569',display:'block',marginBottom:5}}>STATUS</label>
                <select value={edit.status} onChange={e=>setEdit(p=>({...p,status:e.target.value}))}
                  style={{width:'100%',height:38,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 10px',fontSize:13,outline:'none',fontFamily:'inherit',background:'#fff'}}>
                  {STATUSES.filter(s=>s!=='all').map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:11.5,fontWeight:700,color:'#475569',display:'block',marginBottom:5}}>ASSIGN TO</label>
                <select value={edit.assignedTo} onChange={e=>setEdit(p=>({...p,assignedTo:e.target.value}))}
                  style={{width:'100%',height:38,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 10px',fontSize:13,outline:'none',fontFamily:'inherit',background:'#fff'}}>
                  <option value="">Unassigned</option>
                  {team.map(t=><option key={t._id} value={t._id}>{t.name}</option>)}
                </select>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                <div>
                  <label style={{fontSize:11.5,fontWeight:700,color:'#475569',display:'block',marginBottom:5}}>FOLLOW-UP DATE</label>
                  <input type="date" value={edit.followUpDate} onChange={e=>setEdit(p=>({...p,followUpDate:e.target.value}))}
                    style={{width:'100%',height:38,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 10px',fontSize:13,outline:'none',fontFamily:'inherit'}}/>
                </div>
                <div>
                  <label style={{fontSize:11.5,fontWeight:700,color:'#475569',display:'block',marginBottom:5}}>LAST CONTACTED</label>
                  <input type="date" value={edit.lastContactedAt} onChange={e=>setEdit(p=>({...p,lastContactedAt:e.target.value}))}
                    style={{width:'100%',height:38,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 10px',fontSize:13,outline:'none',fontFamily:'inherit'}}/>
                </div>
              </div>
              <div>
                <label style={{fontSize:11.5,fontWeight:700,color:'#475569',display:'block',marginBottom:5}}>NOTES</label>
                <textarea value={edit.notes} onChange={e=>setEdit(p=>({...p,notes:e.target.value}))} rows={3} placeholder="Add your notes here…"
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