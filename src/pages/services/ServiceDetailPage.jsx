import { useParams, Link } from 'react-router-dom'
import ServicePage from '../../components/ServicePage'
import { SERVICES } from '../../data/services'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const svc = SERVICES[slug]
  if (!svc) {
    return (
      <div className="wrap" style={{padding:'80px 0',textAlign:'center'}}>
        <h1>Service not found</h1>
        <p style={{color:'var(--text-2)',marginTop:12}}>This service page is coming soon or may have moved.</p>
        <Link to="/services" className="btn btn-primary" style={{marginTop:24,display:'inline-flex'}}>Browse all services</Link>
      </div>
    )
  }
  return <ServicePage svc={{ ...svc, slug }} />
}
