import './LandingPage.css';

const VARIANTS = [
  { id: 'boot',   no: '01', name: 'Boot Sequence',     sub: 'Terminal init + system armed flash',          path: '/hero-test-boot'   },
  { id: 'beam',   no: '02', name: 'Strike / Beam Cut', sub: 'Sword-slash reveal, screen shake',            path: '/hero-test-beam'   },
  { id: 'glitch', no: '03', name: 'Glitch + Datafall', sub: 'Matrix rain + RGB chromatic aberration',      path: '/hero-test-glitch' },
  { id: 'threat', no: '04', name: 'Live Threat Map',   sub: 'Pulsing hotspots, animated arcs, ticker',     path: '/hero-test-threat' },
  { id: 'radar',  no: '05', name: 'Radar Lock-On',     sub: 'Sweep + crosshair snaps to "consequences"',   path: '/hero-test-radar'  },
];

export default function HeroTestIndex() {
  return (
    <div className="neu" style={{ minHeight: '100vh', background: '#000', color: '#f0f0f0' }}>
      <header className="neu-header neu-header--visible">
        <div className="neu-header__inner">
          <a href="/" className="neu-header__wordmark" style={{ textDecoration: 'none' }}>
            <span>ACHILLES</span> <span className="neu-header__wordmark-sub">ANALYTICS</span>
          </a>
          <nav className="neu-header__nav">
            <a href="/" className="neu-header__link">Home</a>
          </nav>
        </div>
      </header>

      <section style={{ padding: '120px clamp(1rem, 5vw, 3rem) 80px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 4,
          color: '#BCFF2F',
          textTransform: 'uppercase',
          marginBottom: 24,
        }}>
          // HERO INTRO TESTS · 5 VARIANTS
        </div>
        <h1 style={{
          fontFamily: "'IBM Plex Serif', Georgia, serif",
          fontSize: 'clamp(2rem, 5vw, 3.4rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '-0.4px',
          margin: '0 0 18px',
        }}>
          Pick the <em style={{ color: '#BCFF2F', fontStyle: 'italic' }}>aggressive intro.</em>
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
          lineHeight: 1.7,
          color: 'rgba(240,240,240,0.65)',
          maxWidth: 720,
          margin: '0 0 56px',
        }}>
          Five takes on the welcome screen — replacing the rotating globe with something that hits harder.
          Click into each, refresh to retrigger the intro, then come back.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {VARIANTS.map((v) => (
            <a
              key={v.id}
              href={v.path}
              style={{
                display: 'block',
                padding: '24px 26px',
                border: '1px solid rgba(188,255,47,0.18)',
                background: 'rgba(0,0,0,0.55)',
                textDecoration: 'none',
                color: '#f0f0f0',
                transition: 'border-color .25s ease, box-shadow .25s ease, transform .25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#BCFF2F';
                e.currentTarget.style.boxShadow = '0 0 22px rgba(188,255,47,0.18)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(188,255,47,0.18)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 3,
                color: '#BCFF2F',
                marginBottom: 12,
              }}>
                {v.no} · {v.name.toUpperCase()}
              </div>
              <div style={{
                fontFamily: "'IBM Plex Serif', Georgia, serif",
                fontSize: 22,
                lineHeight: 1.2,
                marginBottom: 8,
                color: '#f0f0f0',
              }}>
                {v.name}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: 'rgba(240,240,240,0.7)',
              }}>
                {v.sub}
              </div>
              <div style={{
                marginTop: 18,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: 2,
                color: '#BCFF2F',
              }}>
                OPEN →
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
