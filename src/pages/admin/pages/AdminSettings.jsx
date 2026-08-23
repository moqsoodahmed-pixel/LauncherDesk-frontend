import { Card, CardHead, PageHeader, Btn } from '../AdminUI'
import { useAdminAuth } from '../../../context/AdminAuthContext'

export default function AdminSettings() {
  const { user } = useAdminAuth()
  return (
    <div>
      <PageHeader title="Settings" sub="Admin account and system configuration"/>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <Card>
          <CardHead title="Admin Profile"/>
          <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, padding:'14px', background:'#F8FAFC', borderRadius:10 }}>
              <div style={{ width:52,height:52,borderRadius:14,background:'linear-gradient(135deg,#3B5BDB,#7C9FFF)',display:'grid',placeItems:'center',fontSize:20,fontWeight:700,color:'#fff' }}>
                {user?.name?.[0]||'A'}
              </div>
              <div>
                <div style={{ fontWeight:700,fontSize:16,color:'#1C2434' }}>{user?.name||'Admin'}</div>
                <div style={{ fontSize:13,color:'#64748B',marginTop:2 }}>{user?.email||'admin@launcherdesk.com'}</div>
                <div style={{ fontSize:11.5,marginTop:4,background:'#EEF2FF',color:'#3B5BDB',padding:'2px 9px',borderRadius:99,fontWeight:600,display:'inline-block' }}>Super Admin</div>
              </div>
            </div>
            {[['Full Name',user?.name||'Admin'],['Email',user?.email||'—'],['Role','Admin'],['Account Status','Active']].map(([l,v])=>(
              <div key={l} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #F1F5F9' }}>
                <span style={{ fontSize:13.5,color:'#64748B' }}>{l}</span>
                <span style={{ fontSize:13.5,fontWeight:600,color:'#1C2434' }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="API Configuration"/>
          <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:12 }}>
            {[
              ['Backend URL','http://localhost:5000'],
              ['API Version','v1'],
              ['Auth','JWT Bearer Token'],
              ['Rate Limit','100 req / 15 min'],
              ['DB','MongoDB (Mongoose)'],
            ].map(([l,v])=>(
              <div key={l} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #F1F5F9' }}>
                <span style={{ fontSize:13.5,color:'#64748B' }}>{l}</span>
                <span style={{ fontSize:12.5,fontWeight:600,color:'#1C2434',fontFamily:'monospace',background:'#F1F5F9',padding:'2px 8px',borderRadius:5 }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ gridColumn:'1/-1' }}>
          <CardHead title="Available Admin Endpoints"/>
          <div style={{ padding:'16px 24px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
              {[
                ['GET  /api/contact',      'All contact enquiries'],
                ['PATCH /api/contact/:id', 'Update contact status/notes'],
                ['GET  /api/leads',        'All leads'],
                ['PATCH /api/leads/:id',   'Update lead status'],
                ['GET  /api/quotes',       'All quote requests'],
                ['PATCH /api/quotes/:id',  'Update quote + amount'],
                ['GET  /api/applications', 'All job applications'],
                ['PATCH /api/applications/:id','Update application status'],
                ['GET  /api/auth/me',      'Current admin profile'],
              ].map(([ep,desc])=>(
                <div key={ep} style={{ background:'#F8FAFC',borderRadius:8,padding:'10px 14px' }}>
                  <div style={{ fontSize:11.5,fontFamily:'monospace',color:'#3B5BDB',fontWeight:700,marginBottom:4 }}>{ep}</div>
                  <div style={{ fontSize:12,color:'#64748B' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
