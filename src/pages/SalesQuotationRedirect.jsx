import { useEffect } from 'react'

const SALES_QUOTATION_URL = 'https://sales-quotation-frontend.pages.dev/'

export default function SalesQuotationRedirect() {
  useEffect(() => {
    window.location.replace(SALES_QUOTATION_URL)
  }, [])

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '3px solid #E2E8F0',
          borderTopColor: '#1D6FE0',
          animation: 'ld-sq-spin 0.8s linear infinite',
          marginBottom: 20,
        }}
      />
      <style>{`@keyframes ld-sq-spin { to { transform: rotate(360deg); } }`}</style>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0A2540', marginBottom: 8 }}>
        Redirecting to Sales Quotation…
      </h1>
      <p className="mut" style={{ fontSize: 14.5 }}>
        If you're not redirected automatically,{' '}
        <a href={SALES_QUOTATION_URL} style={{ color: '#1D6FE0', fontWeight: 600 }}>
          click here
        </a>
        .
      </p>
    </div>
  )
}