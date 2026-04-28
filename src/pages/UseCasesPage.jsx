import { useState, lazy, Suspense } from 'react';
import './LandingPage.css';
import './NewPage.css';

const UseCases = lazy(() => import('./UseCases'));

export default function UseCasesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="neu newpage">
      {/* ═══ FIXED HEADER ═══ */}
      <header className="neu-header neu-header--visible">
        <div className="neu-header__inner">
          <a href="/new" className="neu-header__wordmark" style={{ textDecoration: 'none' }}>
            <span>ACHILLES</span> <span className="neu-header__wordmark-sub">ANALYTICS</span>
          </a>
          <button
            className={`neu-header__hamburger${menuOpen ? ' neu-header__hamburger--active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="neu-header__hamburger-line" />
            <span className="neu-header__hamburger-line" />
            <span className="neu-header__hamburger-line" />
          </button>
          <nav className={`neu-header__nav${menuOpen ? ' neu-header__nav--open' : ''}`}>
            <a href="/use-cases" className="neu-header__link">Case Study</a>
            <a href="/new#intel-stack" className="neu-header__link">The Stack</a>
            <a href="/new#ai-council" className="neu-header__link">AI Council</a>
            <a href="/about" className="neu-header__link">About</a>
          </nav>
        </div>
      </header>

      {/* ═══ FULL USE CASES SECTION (1:1) ═══ */}
      <div className="vg" style={{ paddingTop: '96px' }}>
        <Suspense fallback={null}><UseCases /></Suspense>
      </div>

      {/* Back CTA */}
      <section className="neu-reach">
        <div className="neu-reach__inner">
          <div className="neu-reach__label">// CONTINUE</div>
          <h2 className="neu-reach__headline">See the system in motion.</h2>
          <div className="neu-reach__ctas">
            <a href="/new" className="neu-reach__cta neu-reach__cta--primary">
              Back to Home
            </a>
            <a href="/app" className="neu-reach__cta neu-reach__cta--secondary">
              Access Platform
            </a>
          </div>
          <div className="neu-reach__footer">
            <span>ACHILLES ANALYTICS</span>
            <span>STRUCTURED FORESIGHT</span>
            <span>OSINT-POWERED</span>
          </div>
        </div>
      </section>

      {/* Legal Footer */}
      <footer className="neu-legal">
        <div className="neu-legal__links">
          <a href="/privacy" className="neu-legal__link">Privacy Policy</a>
          <span className="neu-legal__sep">&middot;</span>
          <a href="/terms" className="neu-legal__link">Terms of Service</a>
        </div>
        <p className="neu-legal__copy">&copy; 2026 Achilles Analytics. All rights reserved.</p>
        <p className="neu-legal__loc">Canada</p>
      </footer>
    </div>
  );
}
