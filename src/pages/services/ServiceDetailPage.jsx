import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import ServicePage from '../../components/ServicePage'
import { SERVICES } from '../../data/services'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const svc = SERVICES[slug]

  useEffect(() => {
    if (svc) {
      document.title = svc.metaTitle
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', svc.metaDesc)
    }
  }, [svc])

  if (!svc) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h1>Service not found</h1>
        <p>This service page is coming soon.</p>
        <a href="/services" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>Browse all services</a>
      </div>
    )
  }

  return <ServicePage svc={{ ...svc, slug }} />
}