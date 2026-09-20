import { Card, PageHeader, EmptyState } from '../AdminUI'

/* Office Setup enquiries come via the contact form with source='office-restore'.
   This page filters them from the /api/contact endpoint. */
import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { StatusBadge, Btn, Ic, Toolbar, SearchInput, Table, Td, Modal, InfoGrid, Pagination, Spinner } from '../AdminUI'

const initials = n => (n||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)
const COLORS = ['#3B5BDB','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899']
const fmt = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—'

export default function AdminOffice() {
  const { apiFetch } = useAdminAuth()
  const [items,    setItems]    = useState([])
  const [total,    setTotal]    = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [page,     setPage]     = useState(1)
  const [q,        setQ]        = useState('')
  const [selected, setSelected] = useState(null)
  const [saving,   setSaving]   = useState(false)
  const [editStatus, setEditStatus] = useState('')
  const [editNotes,  setEditNotes]  = useState('')
  const PER_PAGE = 15

  const load = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch all contacts and filter by source = office-restore
      const params = new URLSearchParams({ page, limit: 100 })
      const r = await apiFetch(`/contact?${params}`)
      const office = (r.data || []).filter(c =>
        c.source === 'office-restore' || c.service?.toLowerCase().includes('office') || c.service?.toLowerCase().includes('furniture')
      )
      setItems(office)
      setTotal(office.length)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [apiFetch, page])

  useEffect(() => { load() }, [load])

  const openDetail = (item) => { setSelected(item); setEditStatus(item.status); setEditNotes(item.notes||'') }

  const saveUpdate = async () => {
    setSaving(true)
    try {
      const updated = await apiFetch(`/contact/${selected._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: editStatus, notes: editNotes }),
      })
      setItems(is => is.map(i => i._id === selected._id ? updated.data : i))
      setSelected(null)
    } catch (e) { console.error(e) }
    finally { setSaving(false) }
  }

  const filtered = q
    ? items.filter(i => [i.name,i.mobile,i.email,i.state,i.message].join(' ').toLowerCase().includes(q.toLowerCase()))
    : items

  return (
    <div>
      <PageHeader title="Office Setup Enquiries" sub={`${total} office setup / furniture leads`}
        actions={<Btn variant="outline" onClick={load}><Ic d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" size={14}/>Refresh</Btn>}
      />

      <div className="adm-three-col" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:20 }}>
        {[
          { l:'New Enquiries',  v:items.filter(i=>i.status==='new').length,       bg:'#EEF2FF', c:'#3B5BDB' },
          { l:'In Progress',    v:items.filter(i=>i.status==='contacted').length,  bg:'#FFFBEB', c:'#F59E0B' },
          { l:'Converted',      v:items.filter(i=>i.status==='converted').length,  bg:'#F0FDF4', c:'#10B981' },
        ].map(s=>(
          <div key={s.l} style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:10, padding:'18px 22px', display:'flex', gap:14, alignItems:'center' }}>
            <div style={{ width:46,height:46,borderRadius:10,background:s.bg,display:'grid',placeItems:'center',fontSize:22,fontWeight:800,color:s.c }}>{s.v}</div>
            <div style={{ fontSize:13,color:'#64748B' }}>{s.l}</div>
          </div>
        ))}
      </div>

      <Toolbar>
        <SearchInput value={q} onChange={setQ} placeholder="Search name, state, mobile…"/>
      </Toolbar>

      <Card>
        {loading ? <Spinner/> : (
          <>
            <Table head={['Contact','Mobile','State','Service Request','WA Opt-in','Status','Date','']}>
              {filtered.length===0
                ? <tr><td colSpan={8}><EmptyState msg="No office setup enquiries yet." icon="🏢"/></td></tr>
                : filtered.map((item,i)=>(
                  <tr key={item._id}>
                    <Td>
                      <div style={{ display:'flex',alignItems:'center',gap:9 }}>
                        <div style={{ width:32,height:32,borderRadius:8,background:COLORS[i%6],display:'grid',placeItems:'center',fontSize:12,fontWeight:700,color:'#fff',flexShrink:0 }}>{initials(item.name)}</div>
                        <div>
                          <div style={{ fontWeight:600,fontSize:13.5 }}>{item.name}</div>
                          <div style={{ fontSize:11.5,color:'#94A3B8' }}>{item.email}</div>
                        </div>
                      </div>
                    </Td>
                    <Td style={{ fontSize:13 }}>{item.mobile}</Td>
                    <Td style={{ fontSize:13,color:'#64748B' }}>{item.state||'—'}</Td>
                    <Td><span style={{ fontSize:11.5,background:'#EEF2FF',color:'#3B5BDB',padding:'2px 9px',borderRadius:6,fontWeight:600 }}>{item.service||'Office Setup'}</span></Td>
                    <Td><span style={{ fontSize:13,color:item.whatsappOptin?'#16A34A':'#94A3B8',fontWeight:600 }}>{item.whatsappOptin?'✓ Yes':'—'}</span></Td>
                    <Td><StatusBadge s={item.status}/></Td>
                    <Td style={{ fontSize:12,color:'#94A3B8' }}>{fmt(item.createdAt)}</Td>
                    <Td>
                      <div style={{ display:'flex',gap:5 }}>
                        <Btn variant="outline" size="sm" onClick={()=>openDetail(item)}><Ic d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8|M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6" size={12}/></Btn>
                        {item.whatsappOptin && <Btn variant="success" size="sm" href={`https://wa.me/${item.mobile.replace(/\D/g,'')}`} target="_blank"><Ic d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" size={12}/></Btn>}
                      </div>
                    </Td>
                  </tr>
                ))
              }
            </Table>
            <Pagination page={page} total={total} perPage={PER_PAGE} onChange={setPage}/>
          </>
        )}
      </Card>

      <Modal open={!!selected} onClose={()=>setSelected(null)} title={`Office Enquiry — ${selected?.name}`}
        footer={<><Btn variant="outline" onClick={()=>setSelected(null)}>Cancel</Btn><Btn variant="primary" onClick={saveUpdate} disabled={saving}>{saving?'Saving…':'Save'}</Btn></>}>
        {selected && (
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <InfoGrid rows={[
              ['Name',selected.name],['Mobile',selected.mobile],
              ['Email',selected.email],['State',selected.state],
              ['Service',selected.service||'Office Setup'],['Source',selected.source],
              ['WA Opt-in',selected.whatsappOptin?'Yes':'No'],['Date',fmt(selected.createdAt)],
            ]}/>
            {selected.message && (
              <div style={{ background:'#F8FAFC',borderRadius:8,padding:'12px 14px' }}>
                <div style={{ fontSize:11,fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:5 }}>Message / Requirements</div>
                <p style={{ fontSize:13.5,color:'#1C2434',lineHeight:1.6 }}>{selected.message}</p>
              </div>
            )}
            <div className="adm-two-col" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
              <div>
                <label style={{ fontSize:12.5,fontWeight:600,color:'#374151',display:'block',marginBottom:6 }}>Update Status</label>
                <select value={editStatus} onChange={e=>setEditStatus(e.target.value)}
                  style={{ width:'100%',height:40,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 12px',fontSize:13.5,color:'#1C2434',background:'#fff',outline:'none',fontFamily:'inherit' }}>
                  {['new','contacted','qualified','converted','closed'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize:12.5,fontWeight:600,color:'#374151',display:'block',marginBottom:6 }}>Internal Notes</label>
              <textarea value={editNotes} onChange={e=>setEditNotes(e.target.value)} rows={3}
                placeholder="Site visit date, quote details, follow-up plan…"
                style={{ width:'100%',border:'1.5px solid #E2E8F0',borderRadius:8,padding:'10px 12px',fontSize:13.5,color:'#1C2434',resize:'vertical',outline:'none',fontFamily:'inherit' }}/>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}