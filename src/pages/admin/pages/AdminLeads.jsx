import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { Card, StatusBadge, Btn, Ic, Toolbar, SearchInput, FilterSelect, Table, Td, PageHeader, Modal, InfoGrid, Pagination, Spinner, EmptyState } from '../AdminUI'

const STATUSES = ['all','new','working','nurturing','converted','lost']
const initials = n => (n||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)
const COLORS = ['#3B5BDB','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899']
const fmt = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—'

export default function AdminLeads() {
  const { apiFetch } = useAdminAuth()
  const [leads,    setLeads]    = useState([])
  const [total,    setTotal]    = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [page,     setPage]     = useState(1)
  const [status,   setStatus]   = useState('all')
  const [q,        setQ]        = useState('')
  const [selected, setSelected] = useState(null)
  const [saving,   setSaving]   = useState(false)
  const [editStatus, setEditStatus] = useState('')
  const PER_PAGE = 15

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: PER_PAGE })
      if (status !== 'all') params.set('status', status)
      const r = await apiFetch(`/leads?${params}`)
      setLeads(r.data || [])
      setTotal(r.total || 0)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [apiFetch, page, status])

  useEffect(() => { load() }, [load])

  const openDetail = (l) => { setSelected(l); setEditStatus(l.status) }

  const saveUpdate = async () => {
    setSaving(true)
    try {
      const updated = await apiFetch(`/leads/${selected._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: editStatus }),
      })
      setLeads(ls => ls.map(l => l._id === selected._id ? updated.data : l))
      setSelected(null)
    } catch (e) { console.error(e) }
    finally { setSaving(false) }
  }

  const filtered = q
    ? leads.filter(l => [l.name,l.email,l.mobile,l.serviceInterest,l.businessType,l.state].join(' ').toLowerCase().includes(q.toLowerCase()))
    : leads

  return (
    <div>
      <PageHeader title="Leads" sub={`${total} total leads from all channels`}
        actions={<Btn variant="outline" onClick={load}><Ic d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" size={14}/>Refresh</Btn>}
      />

      <div className="adm-summary-grid" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:20 }}>
        {STATUSES.slice(1).map(s=>(
          <div key={s} onClick={()=>{setStatus(s);setPage(1)}}
            style={{ background:status===s?'#EEF2FF':'#fff', border:status===s?'1.5px solid #3B5BDB':'1px solid #E2E8F0', borderRadius:9, padding:'12px 16px', cursor:'pointer', transition:'all .13s' }}>
            <div style={{ fontSize:11.5,fontWeight:600,color:status===s?'#3B5BDB':'#94A3B8',textTransform:'capitalize',marginBottom:4 }}>{s}</div>
            <div style={{ fontSize:20,fontWeight:800,color:status===s?'#3B5BDB':'#1C2434' }}>
              {leads.filter(l=>l.status===s).length}
            </div>
          </div>
        ))}
      </div>

      <Toolbar>
        <SearchInput value={q} onChange={setQ} placeholder="Search name, email, service, business type…"/>
        <FilterSelect value={status} onChange={v=>{setStatus(v);setPage(1)}} options={STATUSES.map(s=>({v:s,l:s==='all'?'All Statuses':s.charAt(0).toUpperCase()+s.slice(1)}))}/>
      </Toolbar>

      <Card>
        {loading ? <Spinner/> : (
          <>
            <Table head={['Lead','Email / Mobile','Business Type','Service Interest','State','Source','Status','Date','']}>
              {filtered.length===0 ? <tr><td colSpan={9}><EmptyState msg="No leads found." icon="🔍"/></td></tr>
              : filtered.map((l,i)=>(
                <tr key={l._id}>
                  <Td>
                    <div style={{ display:'flex',alignItems:'center',gap:9 }}>
                      <div style={{ width:32,height:32,borderRadius:8,background:COLORS[i%6],display:'grid',placeItems:'center',fontSize:12,fontWeight:700,color:'#fff',flexShrink:0 }}>{initials(l.name)}</div>
                      <span style={{ fontWeight:600 }}>{l.name}</span>
                    </div>
                  </Td>
                  <Td>
                    <div style={{ fontSize:13 }}>{l.email}</div>
                    <div style={{ fontSize:11.5,color:'#94A3B8' }}>{l.mobile||'—'}</div>
                  </Td>
                  <Td style={{ fontSize:13,color:'#64748B' }}>{l.businessType||'—'}</Td>
                  <Td><span style={{ fontSize:11.5,background:'#EEF2FF',color:'#3B5BDB',padding:'2px 9px',borderRadius:6,fontWeight:600 }}>{l.serviceInterest||'General'}</span></Td>
                  <Td style={{ fontSize:13,color:'#64748B' }}>{l.state||'—'}</Td>
                  <Td style={{ fontSize:13,color:'#64748B' }}>{l.source||'website'}</Td>
                  <Td><StatusBadge s={l.status}/></Td>
                  <Td style={{ fontSize:12,color:'#94A3B8' }}>{fmt(l.createdAt)}</Td>
                  <Td>
                    <Btn variant="outline" size="sm" onClick={()=>openDetail(l)}>
                      <Ic d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8|M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6" size={12}/>
                    </Btn>
                  </Td>
                </tr>
              ))}
            </Table>
            <Pagination page={page} total={total} perPage={PER_PAGE} onChange={setPage}/>
          </>
        )}
      </Card>

      <Modal open={!!selected} onClose={()=>setSelected(null)} title={`Lead — ${selected?.name}`}
        footer={<><Btn variant="outline" onClick={()=>setSelected(null)}>Cancel</Btn><Btn variant="primary" onClick={saveUpdate} disabled={saving}>{saving?'Saving…':'Save'}</Btn></>}>
        {selected && (
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <InfoGrid rows={[
              ['Name',selected.name],['Email',selected.email],['Mobile',selected.mobile],
              ['State',selected.state],['Business Type',selected.businessType],
              ['Service Interest',selected.serviceInterest],['Source',selected.source],
              ['UTM Source',selected.utmSource],['Submitted',fmt(selected.createdAt)],
            ]}/>
            {selected.message && (
              <div style={{ background:'#F8FAFC',borderRadius:8,padding:'12px 14px' }}>
                <div style={{ fontSize:11,fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:5 }}>Message</div>
                <p style={{ fontSize:13.5,color:'#1C2434',lineHeight:1.6 }}>{selected.message}</p>
              </div>
            )}
            <div>
              <label style={{ fontSize:12.5,fontWeight:600,color:'#374151',display:'block',marginBottom:6 }}>Update Status</label>
              <select value={editStatus} onChange={e=>setEditStatus(e.target.value)}
                style={{ width:'100%',height:40,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 12px',fontSize:13.5,color:'#1C2434',background:'#fff',outline:'none',fontFamily:'inherit' }}>
                {['new','working','nurturing','converted','lost'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}