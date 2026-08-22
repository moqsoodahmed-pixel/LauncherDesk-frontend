import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import SolutionPage from '../../components/SolutionPage'
import { SOLUTIONS } from '../../data/solutions'

export default function SolutionDetailPage() {
  const { slug } = useParams()
  const sol = SOLUTIONS[slug]

  useEffect(() => {
    if (sol) {
      document.title = sol.metaTitle
      const m = document.querySelector('meta[name="description"]')
      if (m) m.setAttribute('content', sol.metaDesc)
    }
  }, [sol])

  if (!sol) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h1>Solution not found</h1>
        <p>This page is coming soon.</p>
        <a href="/solutions" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
          Browse all solutions
        </a>
      </div>
    )
  }

  return <SolutionPage sol={sol} />
}
