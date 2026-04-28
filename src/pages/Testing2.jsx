import { lazy, Suspense } from 'react';
import './LandingPage.css';

const Testing2A = lazy(() => import('./Testing2A'));
const Testing2B = lazy(() => import('./Testing2B'));
const Testing2C = lazy(() => import('./Testing2C'));

export default function Testing2() {
  return (
    <div className="neu" style={{ minHeight: '100vh', background: '#000' }}>
      {/* Fixed header */}
      <header className="neu-header neu-header--visible">
        <div className="neu-header__inner">
          <a href="/" className="neu-header__wordmark" style={{ textDecoration: 'none' }}>
            <span>A</span>CHILLES <span className="neu-header__wordmark-sub">Analytics</span>
          </a>
          <nav className="neu-header__nav">
            <a href="#a" className="neu-header__link">Pipeline</a>
            <a href="#b" className="neu-header__link">Radial</a>
            <a href="#c" className="neu-header__link">Layered</a>
            <a href="/" className="neu-header__link">Back</a>
          </nav>
        </div>
      </header>

      {/* Index hero */}
      <section
        style={{
          padding: '120px clamp(1rem, 5vw, 3rem) 60px',
          maxWidth: 1280,
          margin: '0 auto',
          color: '#f0f0f0',
        }}
      >
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 4,
            color: '#BCFF2F',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          // INTEL STACK · 3 INTERPRETATIONS
        </div>
        <h1
          style={{
            fontFamily: "'IBM Plex Serif', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.4px',
            margin: '0 0 18px',
          }}
        >
          One stack. <em style={{ color: '#BCFF2F', fontStyle: 'italic' }}>Three interpretations.</em>
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
            lineHeight: 1.7,
            color: 'rgba(240,240,240,0.65)',
            maxWidth: 720,
            margin: 0,
          }}
        >
          Three parallel design takes on the same six modules. Same data, same modules — three different
          ways to make the system feel like ONE instrument instead of a fragmented collection of tiles.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 14,
            marginTop: 36,
          }}
        >
          {[
            { id: 'a', label: '01 · PIPELINE FLOW', sub: 'Linear data transformation' },
            { id: 'b', label: '02 · RADIAL CONSTELLATION', sub: 'Core + 6 instruments' },
            { id: 'c', label: '03 · TACTICAL LAYERED', sub: 'EYES · BRAIN · VOICE rack' },
          ].map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              style={{
                display: 'block',
                padding: '20px 22px',
                border: '1px solid rgba(188,255,47,0.18)',
                background: 'rgba(0,0,0,0.55)',
                textDecoration: 'none',
                color: '#f0f0f0',
                transition: 'border-color .25s ease, box-shadow .25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#BCFF2F';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(188,255,47,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(188,255,47,0.18)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: '#BCFF2F',
                  marginBottom: 8,
                }}
              >
                {it.label}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: 'rgba(240,240,240,0.85)',
                }}
              >
                {it.sub}
              </div>
            </a>
          ))}
        </div>
      </section>

      <hr style={{ border: 0, borderTop: '1px solid rgba(188,255,47,0.12)', margin: '40px 0' }} />

      {/* Render all three back-to-back */}
      <div id="a">
        <Suspense fallback={<div style={{ height: 400 }} />}>
          <Testing2A />
        </Suspense>
      </div>
      <hr style={{ border: 0, borderTop: '1px solid rgba(188,255,47,0.12)', margin: 0 }} />
      <div id="b">
        <Suspense fallback={<div style={{ height: 400 }} />}>
          <Testing2B />
        </Suspense>
      </div>
      <hr style={{ border: 0, borderTop: '1px solid rgba(188,255,47,0.12)', margin: 0 }} />
      <div id="c">
        <Suspense fallback={<div style={{ height: 400 }} />}>
          <Testing2C />
        </Suspense>
      </div>
    </div>
  );
}
