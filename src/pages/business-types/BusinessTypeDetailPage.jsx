import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import BusinessTypePage from '../../components/BusinessTypePage'
import { BUSINESS_TYPES } from '../../data/solutions'

export default function BusinessTypeDetailPage() {
  const { slug } = useParams()
  const bt = BUSINESS_TYPES[slug]

  useEffect(() => {
    if (bt) {
      document.title = bt.metaTitle
      const m = document.querySelector('meta[name="description"]')
      if (m) m.setAttribute('content', bt.metaDesc)
    }
  }, [bt])

  if (!bt) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h1>Business type not found</h1>
        <p>This page is coming soon.</p>
        <a href="/business-types" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
          Browse all business types
        </a>
      </div>
    )
  }

  return <BusinessTypePage bt={bt} />
}