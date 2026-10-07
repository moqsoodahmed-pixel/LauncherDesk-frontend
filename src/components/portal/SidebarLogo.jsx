export default function SidebarLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* Hexagonal icon — inline SVG, transparent background */}
      <svg width="42" height="48" viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ldHexGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#0B2D6E" />
            <stop offset="45%"  stopColor="#1565C0" />
            <stop offset="100%" stopColor="#093077" />
          </linearGradient>
        </defs>
        {/* Flat-top hexagon */}
        <polygon
          points="21,1 40,11 40,37 21,47 2,37 2,11"
          fill="url(#ldHexGrad)"
        />
        {/* Upward triangle */}
        <polygon points="21,10 33,31 9,31" fill="white" opacity="0.95" />
        {/* Horizontal rule lines (stacked lines inside lower hexagon area) */}
        <rect x="10" y="34" width="22" height="2.5" rx="1.2" fill="white" opacity="0.85" />
        <rect x="13" y="38.5" width="16" height="2"   rx="1"   fill="white" opacity="0.65" />
      </svg>

      {/* Brand text */}
      <div style={{ lineHeight: 1 }}>
        <div style={{
          fontSize: 17,
          fontWeight: 800,
          color: '#1B3A5C',
          letterSpacing: '-0.01em',
          fontFamily: 'Outfit, sans-serif',
        }}>
          LauncherDesk
          <sup style={{ fontSize: 9, fontWeight: 500, verticalAlign: 'super', marginLeft: 1 }}>™</sup>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
          <span style={{
            fontSize: 10.5,
            color: '#6B7280',
            letterSpacing: '0.01em',
            fontFamily: 'Outfit, sans-serif',
          }}>
            Startups Made Easy
          </span>
          {/* Arrow accent */}
          <svg width="28" height="8" viewBox="0 0 28 8" fill="none">
            <defs>
              <linearGradient id="ldArrow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#1565C0" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1565C0" stopOpacity="1" />
              </linearGradient>
            </defs>
            <line x1="0" y1="4" x2="22" y2="4" stroke="url(#ldArrow)" strokeWidth="1.5" />
            <polygon points="20,1.5 28,4 20,6.5" fill="#1565C0" />
          </svg>
        </div>
      </div>
    </div>
  );
}
