import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { Card, StatusBadge, Btn, Ic, Toolbar, SearchInput, FilterSelect, Table, Td, PageHeader, Modal, InfoGrid, Pagination, Spinner, EmptyState } from '../AdminUI'

const STATUSES = ['all','pending','approved','active','rejected']
const initials = n => (n||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)
const COLORS = ['#6B21A8','#1D6FE0','#10B981','#F59E0B','#EF4444','#EC4899']
const fmt = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—'

export default function AdminPartners() {
  const { apiFetch } = useAdminAuth()
  const [partners, setPartners] = useState([])
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
      const r = await apiFetch(`/partners?${params}`)
      setPartners(r.data || [])
      setTotal(r.total || 0)
    } catch(e) { console.error(e) }
    finally { setLoading(false) }
  }, [apiFetch, page, status])

  useEffect(() => { load() }, [load])

  const openDetail = (p) => { setSelected(p); setEditStatus(p.status); setEditNotes(p.adminNotes || '') }

  const saveUpdate = async () => {
    setSaving(true)
    try {
      const updated = await apiFetch(`/partners/${selected._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: editStatus, adminNotes: editNotes }),
      })
      setPartners(ps => ps.map(p => p._id === selected._id ? updated.data : p))
      setSelected(null)
    } catch(e) { console.error(e) }
    finally { setSaving(false) }
  }

  const filtered = q
    ? partners.filter(p => [p.companyName, p.productName, p.contactName, p.email, p.categories?.join(' ')].join(' ').toLowerCase().includes(q.toLowerCase()))
    : partners

  const STATUS_COLOR = { pending:'warn', approved:'success', active:'success', rejected:'danger' }

  return (
    <div>
      <PageHeader title="Partner Applications" sub={`${total} total applications`}
        actions={<Btn variant="outline" onClick={load}><Ic d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" size={14}/>Refresh</Btn>}
      />

      {/* Status summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
        {['pending','approved','active','rejected'].map(s=>(
          <div key={s} onClick={()=>{setStatus(s);setPage(1)}}
            style={{ background:status===s?'#EEF2FF':'#fff', border:status===s?'1.5px solid #3B5BDB':'1px solid #E2E8F0', borderRadius:9, padding:'14px 18px', cursor:'pointer', transition:'all .13s' }}>
            <div style={{ fontSize:11.5, fontWeight:600, color:status===s?'#3B5BDB':'#94A3B8', textTransform:'capitalize', marginBottom:4 }}>{s}</div>
            <div style={{ fontSize:22, fontWeight:800, color:status===s?'#3B5BDB':'#1C2434' }}>{partners.filter(p=>p.status===s).length}</div>
          </div>
        ))}
      </div>

      <Toolbar>
        <SearchInput value={q} onChange={setQ} placeholder="Search company, product, email…"/>
        <FilterSelect value={status} onChange={v=>{setStatus(v);setPage(1)}} options={STATUSES.map(s=>({v:s,l:s==='all'?'All Statuses':s.charAt(0).toUpperCase()+s.slice(1)}))}/>
      </Toolbar>

      <Card>
        {loading ? <Spinner/> : (
          <>
            <Table head={['Company / Product','Contact','Categories','Website','Status','Applied','Actions']}>
              {filtered.length===0 ? <tr><td colSpan={7}><EmptyState msg="No partner applications yet." icon="🤝"/></td></tr>
              : filtered.map((p,i)=>(
                <tr key={p._id}>
                  <Td>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:9, background:COLORS[i%6], display:'grid', placeItems:'center', fontSize:13, fontWeight:700, color:'#fff', flexShrink:0 }}>{initials(p.companyName)}</div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14 }}>{p.companyName}</div>
                        <div style={{ fontSize:12, color:'#6da8e0', fontWeight:600 }}>{p.productName}</div>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <div style={{ fontSize:13, fontWeight:600 }}>{p.contactName}</div>
                    <div style={{ fontSize:12, color:'#94A3B8' }}>{p.email}</div>
                    <div style={{ fontSize:12, color:'#94A3B8' }}>{p.mobile}</div>
                  </Td>
                  <Td>
                    <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                      {(p.categories||[]).slice(0,2).map(cat=>(
                        <span key={cat} style={{ fontSize:10.5, background:'#EEF2FF', color:'#3B5BDB', padding:'2px 7px', borderRadius:5, fontWeight:600 }}>{cat}</span>
                      ))}
                      {(p.categories||[]).length > 2 && <span style={{ fontSize:10.5, color:'#94A3B8' }}>+{p.categories.length-2}</span>}
                    </div>
                  </Td>
                  <Td>
                    {p.website ? <a href={p.website} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:'#3B5BDB', textDecoration:'none' }}>Visit →</a> : '—'}
                  </Td>
                  <Td>
                    <span style={{ display:'inline-flex', alignItems:'center', fontSize:12, fontWeight:600, padding:'3px 10px', borderRadius:99,
                      background: p.status==='pending'?'#FFFBEB':p.status==='approved'||p.status==='active'?'#F0FDF4':'#FEF2F2',
                      color: p.status==='pending'?'#D97706':p.status==='approved'||p.status==='active'?'#16A34A':'#DC2626' }}>
                      {p.status}
                    </span>
                  </Td>
                  <Td style={{ fontSize:12, color:'#94A3B8' }}>{fmt(p.createdAt)}</Td>
                  <Td>
                    <Btn variant="outline" size="sm" onClick={()=>openDetail(p)}>
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

      {/* Detail modal */}
      <Modal open={!!selected} onClose={()=>setSelected(null)} title={`Partner — ${selected?.companyName}`} width={600}
        footer={<><Btn variant="outline" onClick={()=>setSelected(null)}>Cancel</Btn><Btn variant="primary" onClick={saveUpdate} disabled={saving}>{saving?'Saving…':'Save Changes'}</Btn></>}>
        {selected && (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <InfoGrid rows={[
              ['Company',     selected.companyName],
              ['Product',     selected.productName],
              ['Tagline',     selected.tagline],
              ['Contact',     selected.contactName],
              ['Email',       selected.email],
              ['Mobile',      selected.mobile],
              ['Website',     selected.website],
              ['City / State',`${selected.city || '—'} · ${selected.state || '—'}`],
              ['Team Size',   selected.teamSize || '—'],
              ['Founded',     selected.foundedYear || '—'],
              ['Pricing',     selected.pricing || '—'],
              ['Integrations',selected.integrations || '—'],
              ['Applied',     fmt(selected.createdAt)],
            ]}/>

            {selected.categories?.length > 0 && (
              <div style={{ background:'#F8FAFC', borderRadius:8, padding:'12px 14px' }}>
                <div style={{ fontSize:11, fontWeight:600, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>Service Categories</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {selected.categories.map(cat=><span key={cat} style={{ fontSize:12, background:'#EEF2FF', color:'#3B5BDB', padding:'3px 10px', borderRadius:6, fontWeight:600 }}>{cat}</span>)}
                </div>
              </div>
            )}

            {selected.description && (
              <div style={{ background:'#F8FAFC', borderRadius:8, padding:'12px 14px' }}>
                <div style={{ fontSize:11, fontWeight:600, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:6 }}>Product Description</div>
                <p style={{ fontSize:13.5, color:'#1C2434', lineHeight:1.6 }}>{selected.description}</p>
              </div>
            )}

            {selected.whyPartner && (
              <div style={{ background:'#FFFBEB', borderRadius:8, padding:'12px 14px', border:'1px solid #FDE68A' }}>
                <div style={{ fontSize:11, fontWeight:600, color:'#92400E', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:6 }}>Why Partner With Us</div>
                <p style={{ fontSize:13.5, color:'#78350F', lineHeight:1.6 }}>{selected.whyPartner}</p>
              </div>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div>
                <label style={{ fontSize:12.5, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Update Status</label>
                <select value={editStatus} onChange={e=>setEditStatus(e.target.value)}
                  style={{ width:'100%', height:40, border:'1.5px solid #E2E8F0', borderRadius:8, padding:'0 12px', fontSize:13.5, color:'#1C2434', background:'#fff', outline:'none', fontFamily:'inherit' }}>
                  {['pending','approved','active','rejected'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize:12.5, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Admin Notes</label>
              <textarea value={editNotes} onChange={e=>setEditNotes(e.target.value)} rows={3}
                placeholder="Internal review notes…"
                style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:8, padding:'10px 12px', fontSize:13.5, color:'#1C2434', resize:'vertical', outline:'none', fontFamily:'inherit' }}/>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}