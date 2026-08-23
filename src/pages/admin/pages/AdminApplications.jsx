import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { Card, StatusBadge, Btn, Ic, Toolbar, SearchInput, FilterSelect, Table, Td, PageHeader, Modal, InfoGrid, Pagination, Spinner, EmptyState } from '../AdminUI'

const STATUSES = ['all','received','under-review','shortlisted','hired','rejected']
const initials = n => (n||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)
const COLORS = ['#3B5BDB','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899']
const fmt = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—'

export default function AdminApplications() {
  const { apiFetch } = useAdminAuth()
  const [apps,     setApps]     = useState([])
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
      const r = await apiFetch(`/applications?${params}`)
      setApps(r.data || [])
      setTotal(r.total || 0)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [apiFetch, page, status])

  useEffect(() => { load() }, [load])

  const openDetail = (a) => { setSelected(a); setEditStatus(a.status) }

  const saveUpdate = async () => {
    setSaving(true)
    try {
      const updated = await apiFetch(`/applications/${selected._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: editStatus }),
      })
      setApps(as => as.map(a => a._id === selected._id ? updated.data : a))
      setSelected(null)
    } catch (e) { console.error(e) }
    finally { setSaving(false) }
  }

  const filtered = q
    ? apps.filter(a => [a.name,a.email,a.mobile,a.role,a.message].join(' ').toLowerCase().includes(q.toLowerCase()))
    : apps

  return (
    <div>
      <PageHeader title="Job Applications" sub={`${total} applications received`}
        actions={<Btn variant="outline" onClick={load}><Ic d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" size={14}/>Refresh</Btn>}
      />

      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:20 }}>
        {STATUSES.slice(1).map(s=>(
          <div key={s} onClick={()=>{setStatus(s);setPage(1)}}
            style={{ background:status===s?'#EEF2FF':'#fff', border:status===s?'1.5px solid #3B5BDB':'1px solid #E2E8F0', borderRadius:9, padding:'12px 16px', cursor:'pointer', transition:'all .13s' }}>
            <div style={{ fontSize:11,fontWeight:600,color:status===s?'#3B5BDB':'#94A3B8',textTransform:'capitalize',marginBottom:4 }}>{s}</div>
            <div style={{ fontSize:20,fontWeight:800,color:status===s?'#3B5BDB':'#1C2434' }}>{apps.filter(a=>a.status===s).length}</div>
          </div>
        ))}
      </div>

      <Toolbar>
        <SearchInput value={q} onChange={setQ} placeholder="Search name, email, role…"/>
        <FilterSelect value={status} onChange={v=>{setStatus(v);setPage(1)}} options={STATUSES.map(s=>({v:s,l:s==='all'?'All':s.charAt(0).toUpperCase()+s.slice(1)}))}/>
      </Toolbar>

      <Card>
        {loading ? <Spinner/> : (
          <>
            <Table head={['Applicant','Contact','Role','Resume','Status','Applied','']}>
              {filtered.length===0 ? <tr><td colSpan={7}><EmptyState msg="No applications yet." icon="📋"/></td></tr>
              : filtered.map((a,i)=>(
                <tr key={a._id}>
                  <Td>
                    <div style={{ display:'flex',alignItems:'center',gap:9 }}>
                      <div style={{ width:32,height:32,borderRadius:8,background:COLORS[i%6],display:'grid',placeItems:'center',fontSize:12,fontWeight:700,color:'#fff',flexShrink:0 }}>{initials(a.name)}</div>
                      <span style={{ fontWeight:600 }}>{a.name}</span>
                    </div>
                  </Td>
                  <Td>
                    <div style={{ fontSize:13 }}>{a.email}</div>
                    <div style={{ fontSize:11.5,color:'#94A3B8' }}>{a.mobile}</div>
                  </Td>
                  <Td><span style={{ fontSize:11.5,background:'#EEF2FF',color:'#3B5BDB',padding:'2px 9px',borderRadius:6,fontWeight:600 }}>{a.role||'General'}</span></Td>
                  <Td>
                    {a.resumeUrl
                      ? <Btn variant="outline" size="sm" href={`http://localhost:5000${a.resumeUrl}`} target="_blank"><Ic d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M7 10l5 5 5-5|M12 15V3" size={12}/>View</Btn>
                      : <span style={{ color:'#94A3B8',fontSize:12 }}>No resume</span>
                    }
                  </Td>
                  <Td><StatusBadge s={a.status}/></Td>
                  <Td style={{ fontSize:12,color:'#94A3B8' }}>{fmt(a.createdAt)}</Td>
                  <Td>
                    <Btn variant="outline" size="sm" onClick={()=>openDetail(a)}>
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

      <Modal open={!!selected} onClose={()=>setSelected(null)} title={`Application — ${selected?.name}`}
        footer={<><Btn variant="outline" onClick={()=>setSelected(null)}>Cancel</Btn><Btn variant="primary" onClick={saveUpdate} disabled={saving}>{saving?'Saving…':'Save'}</Btn></>}>
        {selected && (
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <InfoGrid rows={[
              ['Name',selected.name],['Email',selected.email],
              ['Mobile',selected.mobile],['Role',selected.role||'General'],
              ['Applied',fmt(selected.createdAt)],['Resume',selected.resumeUrl?'Uploaded':'Not provided'],
            ]}/>
            {selected.message && (
              <div style={{ background:'#F8FAFC',borderRadius:8,padding:'12px 14px' }}>
                <div style={{ fontSize:11,fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:5 }}>Cover Message</div>
                <p style={{ fontSize:13.5,color:'#1C2434',lineHeight:1.6 }}>{selected.message}</p>
              </div>
            )}
            <div>
              <label style={{ fontSize:12.5,fontWeight:600,color:'#374151',display:'block',marginBottom:6 }}>Update Status</label>
              <select value={editStatus} onChange={e=>setEditStatus(e.target.value)}
                style={{ width:'100%',height:40,border:'1.5px solid #E2E8F0',borderRadius:8,padding:'0 12px',fontSize:13.5,color:'#1C2434',background:'#fff',outline:'none',fontFamily:'inherit' }}>
                {['received','under-review','shortlisted','hired','rejected'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
