import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { Card, StatusBadge, Btn, Ic, Toolbar, SearchInput, FilterSelect, Table, Td, PageHeader, Modal, InfoGrid, Pagination, Spinner, EmptyState } from '../AdminUI'

const STATUSES = ['all','pending','reviewed','sent','accepted','rejected']
const initials = n => (n||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)
const COLORS = ['#3B5BDB','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899']
const fmt = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—'

export default function AdminQuotes() {
  const { apiFetch } = useAdminAuth()
  const [quotes,   setQuotes]   = useState([])
  const [total,    setTotal]    = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [page,     setPage]     = useState(1)
  const [status,   setStatus]   = useState('all')
  const [q,        setQ]        = useState('')
  const [selected, setSelected] = useState(null)
  const [saving,   setSaving]   = useState(false)
  const [editStatus, setEditStatus] = useState('')
  const [editAmount, setEditAmount] = useState('')
  const [editNotes,  setEditNotes]  = useState('')
  const PER_PAGE = 15

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: PER_PAGE })
      if (status !== 'all') params.set('status', status)
      const r = await apiFetch(`/quotes?${params}`)
      setQuotes(r.data || [])
      setTotal(r.total || 0)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [apiFetch, page, status])

  useEffect(() => { load() }, [load])

  const openDetail = (q) => {
    setSelected(q)
    setEditStatus(q.status)
    setEditAmount(q.quotedAmount || '')
    setEditNotes(q.adminNotes || '')
  }

  const saveUpdate = async () => {
    setSaving(true)
    try {
      const body = { status: editStatus, adminNotes: editNotes }
      if (editAmount) body.quotedAmount = Number(editAmount)
      const updated = await apiFetch(`/quotes/${selected._id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
      })
      setQuotes(qs => qs.map(q => q._id === selected._id ? updated.data : q))
      setSelected(null)
    } catch (e) { console.error(e) }
    finally { setSaving(false) }
  }

  const filtered = q
    ? quotes.filter(q => [q.name,q.email,q.mobile,q.serviceTitle,q.serviceSlug,q.state].join(' ').toLowerCase().includes(q.toLowerCase()))
    : quotes

  return (
    <div>
      <PageHeader title="Quote Requests" sub={`${total} service quote requests`}
        actions={<Btn variant="outline" onClick={load}><Ic d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" size={14}/>Refresh</Btn>}
      />

      <Toolbar>
        <SearchInput value={q} onChange={setQ} placeholder="Search name, email, service, state…"/>
        <FilterSelect value={status} onChange={v=>{setStatus(v);setPage(1)}} options={STATUSES.map(s=>({v:s,l:s==='all'?'All Statuses':s.charAt(0).toUpperCase()+s.slice(1)}))}/>
      </Toolbar>

      <Card>
        {loading ? <Spinner/> : (
          <>
            <Table head={['Applicant','Mobile / Email','Service','State','Business Type','Status','Quoted Amount','Date','']}>
              {filtered.length===0 ? <tr><td colSpan={9}><EmptyState msg="No quote requests yet." icon="📄"/></td></tr>
              : filtered.map((q,i)=>(
                <tr key={q._id}>
                  <Td>
                    <div style={{ display:'flex',alignItems:'center',gap:9 }}>
                      <div style={{ width:32,height:32,borderRadius:8,background:COLORS[i%6],display:'grid',placeItems:'center',fontSize:12,fontWeight:700,color:'#fff',flexShrink:0 }}>{initials(q.name)}</div>
                      <span style={{ fontWeight:600 }}>{q.name}</span>
                    </div>
                  </Td>
                  <Td>
                    <div style={{ fontSize:13 }}>{q.mobile}</div>
                    <div style={{ fontSize:11.5,color:'#94A3B8' }}>{q.email}</div>
                  </Td>
                  <Td><span style={{ fontSize:11.5,background:'#EEF2FF',color:'#3B5BDB',padding:'2px 9px',borderRadius:6,fontWeight:600 }}>{q.serviceTitle||q.serviceSlug}</span></Td>
                  <Td style={{ fontSize:13,color:'#64748B' }}>{q.state||'—'}</Td>
                  <Td style={{ fontSize:13,color:'#64748B' }}>{q.businessType||'—'}</Td>
                  <Td><StatusBadge s={q.status}/></Td>
                  <Td style={{ fontWeight:700,color:'#1C2434' }}>{q.quotedAmount ? '₹'+q.quotedAmount.toLocaleString('en-IN') : <span style={{ color:'#94A3B8',fontSize:12 }}>Not quoted</span>}</Td>
                  <Td style={{ fontSize:12,color:'#94A3B8' }}>{fmt(q.createdAt)}</Td>
                  <Td>
                    <Btn variant="outline" size="sm" onClick={()=>openDetail(q)}>
                      <Ic d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7|M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" size={12}/>
                    </Btn>
                  </Td>
                </tr>
              ))}
            </Table>
            <Pagination page={page} total={total} perPage={PER_PAGE} onChange={setPage}/>
          </>
        )}
      </Card>

      <Modal open={!!selected} onClose={()=>setSelected(null)} title={`Quote — ${selected?.name}`}
        footer={<><Btn variant="outline" onClick={()=>setSelected(null)}>Cancel</Btn><Btn variant="primary" onClick={saveUpdate} disabled={saving}>{saving?'Saving…':'Save'}</Btn></>}>
        {selected && (
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <InfoGrid rows={[
              ['Name',selected.name],['Email',selected.email],['Mobile',selected.mobile],
              ['State',selected.state],['Service',selected.serviceTitle||selected.serviceSlug],
              ['Business Type',selected.businessType],['Submitted',fmt(selected.createdAt)],
            ]}/>
            {selected.additionalInfo && (
              <div style={{ background:'#F8FAFC',borderRadius:8,padding:'12px 14px' }}>
                <div style={{ fontSize:11,fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:5 }}>Additional Info</div>
                <p style={{ fontSize:13.5,color:'#1C2434',lineHeight:1.6 }}>{selected.additionalInfo}</p>
              </div>
            )}
            <div className="adm-two-col" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
              <div>
                <label style={{ fontSize:12.5,fontWeight:600,color:'#374151',display:'block',marginBottom:6 }}>Update Status</label>
                <select value={editStatus} onChange={e=>setEditStatus(e.target.value)}
                  style={{ width:'100%',height:40,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 12px',fontSize:13.5,color:'#1C2434',background:'#fff',outline:'none',fontFamily:'inherit' }}>
                  {['pending','reviewed','sent','accepted','rejected'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:12.5,fontWeight:600,color:'#374151',display:'block',marginBottom:6 }}>Quoted Amount (₹)</label>
                <input type="number" value={editAmount} onChange={e=>setEditAmount(e.target.value)} placeholder="e.g. 12500"
                  style={{ width:'100%',height:40,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 12px',fontSize:13.5,color:'#1C2434',outline:'none',fontFamily:'inherit' }}/>
              </div>
            </div>
            <div>
              <label style={{ fontSize:12.5,fontWeight:600,color:'#374151',display:'block',marginBottom:6 }}>Admin Notes</label>
              <textarea value={editNotes} onChange={e=>setEditNotes(e.target.value)} rows={3}
                placeholder="Internal notes about this quote…"
                style={{ width:'100%',border:'1.5px solid #E2E8F0',borderRadius:8,padding:'10px 12px',fontSize:13.5,color:'#1C2434',resize:'vertical',outline:'none',fontFamily:'inherit' }}/>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}