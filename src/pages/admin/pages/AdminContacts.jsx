import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { Card, StatusBadge, Btn, Ic, Toolbar, SearchInput, FilterSelect, Table, Td, PageHeader, Modal, InfoGrid, Pagination, Spinner, EmptyState } from '../AdminUI'

const STATUSES = ['all','new','contacted','qualified','converted','closed']
const initials = n => (n||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)
const COLORS = ['#3B5BDB','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899','#06B6D4','#84CC16']
const fmt = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—'

export default function AdminContacts() {
  const { apiFetch } = useAdminAuth()
  const [contacts, setContacts] = useState([])
  const [total,    setTotal]    = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [page,     setPage]     = useState(1)
  const [status,   setStatus]   = useState('all')
  const [q,        setQ]        = useState('')
  const [selected, setSelected] = useState(null)
  const [saving,   setSaving]   = useState(false)
  const [editStatus, setEditStatus] = useState('')
  const [editNotes,  setEditNotes]  = useState('')
  const PER_PAGE = 15

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: PER_PAGE })
      if (status !== 'all') params.set('status', status)
      const r = await apiFetch(`/contact?${params}`)
      setContacts(r.data || [])
      setTotal(r.total || 0)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [apiFetch, page, status])

  useEffect(() => { load() }, [load])

  const openDetail = (c) => { setSelected(c); setEditStatus(c.status); setEditNotes(c.notes || '') }

  const saveUpdate = async () => {
    setSaving(true)
    try {
      const updated = await apiFetch(`/contact/${selected._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: editStatus, notes: editNotes }),
      })
      setContacts(cs => cs.map(c => c._id === selected._id ? updated.data : c))
      setSelected(null)
    } catch (e) { console.error(e) }
    finally { setSaving(false) }
  }

  const filtered = q
    ? contacts.filter(c => [c.name,c.mobile,c.email,c.service,c.state].join(' ').toLowerCase().includes(q.toLowerCase()))
    : contacts

  return (
    <div>
      <PageHeader
        title="Contacts"
        sub={`${total} total contact enquiries`}
        actions={
          <Btn variant="outline" onClick={load}>
            <Ic d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" size={14}/>
            Refresh
          </Btn>
        }
      />

      {/* Summary strip */}
      <div className="adm-summary-grid" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:20 }}>
        {STATUSES.slice(1).map(s=>(
          <div key={s} onClick={()=>{setStatus(s);setPage(1)}}
            style={{ background: status===s?'#EEF2FF':'#fff', border: status===s?'1.5px solid #3B5BDB':'1px solid #E2E8F0', borderRadius:9, padding:'12px 16px', cursor:'pointer', transition:'all .13s' }}>
            <div style={{ fontSize:11.5, fontWeight:600, color: status===s?'#3B5BDB':'#94A3B8', textTransform:'capitalize', marginBottom:4 }}>{s}</div>
            <div style={{ fontSize:20, fontWeight:800, color: status===s?'#3B5BDB':'#1C2434' }}>
              {contacts.filter(c=>c.status===s).length}
            </div>
          </div>
        ))}
      </div>

      <Toolbar>
        <SearchInput value={q} onChange={v=>{setQ(v)}} placeholder="Search name, mobile, service, state…"/>
        <FilterSelect value={status} onChange={v=>{setStatus(v);setPage(1)}} options={STATUSES.map(s=>({v:s,l:s==='all'?'All Statuses':s.charAt(0).toUpperCase()+s.slice(1)}))}/>
      </Toolbar>

      <Card>
        {loading ? <Spinner/> : (
          <>
            <Table head={['Contact','Mobile / Email','Service','State','Source','WA Opt-in','Status','Date','Actions']}>
              {filtered.length === 0 ? (
                <tr><td colSpan={9}><EmptyState msg="No contacts found." icon="📭"/></td></tr>
              ) : filtered.map((c,i)=>(
                <tr key={c._id}>
                  <Td>
                    <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                      <div style={{ width:32,height:32,borderRadius:8,background:COLORS[i%COLORS.length],display:'grid',placeItems:'center',fontSize:12,fontWeight:700,color:'#fff',flexShrink:0 }}>{initials(c.name)}</div>
                      <span style={{ fontWeight:600 }}>{c.name}</span>
                    </div>
                  </Td>
                  <Td>
                    <div style={{ fontSize:13 }}>{c.mobile}</div>
                    <div style={{ fontSize:11.5, color:'#94A3B8' }}>{c.email}</div>
                  </Td>
                  <Td><span style={{ fontSize:12,background:'#EEF2FF',color:'#3B5BDB',padding:'2px 9px',borderRadius:6,fontWeight:600 }}>{c.service||'General'}</span></Td>
                  <Td style={{ color:'#64748B',fontSize:13 }}>{c.state||'—'}</Td>
                  <Td style={{ color:'#64748B',fontSize:13 }}>{c.source||'website'}</Td>
                  <Td><span style={{ fontSize:13, color:c.whatsappOptin?'#16A34A':'#94A3B8', fontWeight:600 }}>{c.whatsappOptin?'✓ Yes':'—'}</span></Td>
                  <Td><StatusBadge s={c.status}/></Td>
                  <Td style={{ color:'#94A3B8',fontSize:12.5 }}>{fmt(c.createdAt)}</Td>
                  <Td>
                    <div style={{ display:'flex', gap:5 }}>
                      <Btn variant="outline" size="sm" onClick={()=>openDetail(c)}>
                        <Ic d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8|M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6" size={12}/>
                      </Btn>
                      {c.whatsappOptin && (
                        <Btn variant="success" size="sm" href={`https://wa.me/${c.mobile.replace(/\D/g,'')}`} target="_blank">
                          <Ic d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" size={12}/>
                        </Btn>
                      )}
                    </div>
                  </Td>
                </tr>
              ))}
            </Table>
            <Pagination page={page} total={total} perPage={PER_PAGE} onChange={setPage}/>
          </>
        )}
      </Card>

      {/* Detail modal */}
      <Modal open={!!selected} onClose={()=>setSelected(null)} title={`Contact — ${selected?.name}`}
        footer={<>
          <Btn variant="outline" onClick={()=>setSelected(null)}>Cancel</Btn>
          <Btn variant="primary" onClick={saveUpdate} disabled={saving}>
            {saving?'Saving…':'Save Changes'}
          </Btn>
        </>}>
        {selected && (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <InfoGrid rows={[
              ['Name',    selected.name],
              ['Mobile',  selected.mobile],
              ['Email',   selected.email],
              ['State',   selected.state],
              ['Service', selected.service||'General'],
              ['Source',  selected.source],
              ['WA Opt-in', selected.whatsappOptin?'Yes':'No'],
              ['Submitted', fmt(selected.createdAt)],
            ]}/>
            {selected.message && (
              <div style={{ background:'#F8FAFC', borderRadius:8, padding:'12px 14px' }}>
                <div style={{ fontSize:11,fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:5 }}>Message</div>
                <p style={{ fontSize:13.5, color:'#1C2434', lineHeight:1.6 }}>{selected.message}</p>
              </div>
            )}
            <div className="adm-two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div>
                <label style={{ fontSize:12.5, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Update Status</label>
                <select value={editStatus} onChange={e=>setEditStatus(e.target.value)}
                  style={{ width:'100%', height:40, border:'1.5px solid #E2E8F0', borderRadius:8, padding:'0 12px', fontSize:13.5, color:'#1C2434', background:'#fff', outline:'none', fontFamily:'inherit' }}>
                  {['new','contacted','qualified','converted','closed'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize:12.5, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Internal Notes</label>
              <textarea value={editNotes} onChange={e=>setEditNotes(e.target.value)} rows={3}
                placeholder="Add notes visible only to admin…"
                style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:8, padding:'10px 12px', fontSize:13.5, color:'#1C2434', resize:'vertical', outline:'none', fontFamily:'inherit' }}/>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}