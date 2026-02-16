import { useRef, useEffect, useState, useCallback } from 'react';
import LaserFlow from '../components/LaserFlow';
import CoreEngine from './CoreEngine';
import UseCases from './UseCases';
import IntelStack from './IntelStack';
import AICouncil from './AICouncil';
import { ArchitectureSection, PhilosophySection } from '../variants/VariantGrid';
import './NeuPage.css';

/* ─── Blinking Cursor (cloned from VariantGrid) ─── */
const Cursor = () => <span className="neu__cursor" aria-hidden="true" />;

/* ─── Contact Modal ─── */
function ContactModal({ open, onClose }) {
  const [phase, setPhase] = useState('closed');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (open) {
      setPhase('opening');
      setSent(false);
    } else if (phase !== 'closed') {
      setPhase('closing');
      const t = setTimeout(() => setPhase('closed'), 600);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleSend = useCallback((e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !msg.trim()) return;
    setSent(true);
    setTimeout(() => {
      window.location.href = `mailto:contact@achilles-analytics.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')')}`;
    }, 1800);
  }, [name, email, msg]);

  if (phase === 'closed') return null;

  return (
    <div className={`nm-overlay nm-overlay--${phase}`} onClick={onClose}>
      <div
        ref={modalRef}
        className={`nm-modal nm-modal--${phase}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scan line */}
        <div className="nm-scan" />
        {/* Corner accents */}
        <div className="nm-corner nm-corner--tl" />
        <div className="nm-corner nm-corner--tr" />
        <div className="nm-corner nm-corner--bl" />
        <div className="nm-corner nm-corner--br" />

        <div className="nm-content">
          <div className="nm-header">
            <span className="nm-header__label">// TRANSMIT</span>
            <button className="nm-close" onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {!sent ? (
            <form className="nm-form" onSubmit={handleSend}>
              <div className="nm-field">
                <label className="nm-label">CALLSIGN</label>
                <input className="nm-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
              </div>
              <div className="nm-field">
                <label className="nm-label">FREQ</label>
                <input className="nm-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
              </div>
              <div className="nm-field">
                <label className="nm-label">PAYLOAD</label>
                <textarea className="nm-textarea" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Your message..." rows={3} required />
              </div>
              <button type="submit" className="nm-submit">
                <span className="nm-submit__text">Transmit</span>
                <span className="nm-submit__arrow">&rarr;</span>
              </button>
            </form>
          ) : (
            <div className="nm-sent">
              <div className="nm-sent__icon">
                <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#BCFF2F" strokeWidth="2" />
                  <polyline points="14 24 22 32 34 18" stroke="#BCFF2F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="nm-sent__text">TRANSMISSION SENT</p>
              <p className="nm-sent__sub">We&rsquo;ll respond within 24h.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default function NeuPage() {
  const revealImgRef = useRef(null);
  const impactRef = useRef(null);
  const heroRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const impact = impactRef.current;
    const hero = heroRef.current;
    if (!impact || !hero) return;

    const ioHeader = new IntersectionObserver(([e]) => {
      setHeaderVisible(!e.isIntersecting);
    }, { threshold: 0 });
    ioHeader.observe(impact);

    const ioCta = new IntersectionObserver(([e]) => {
      setCtaVisible(!e.isIntersecting);
    }, { threshold: 0 });
    ioCta.observe(hero);

    return () => { ioHeader.disconnect(); ioCta.disconnect(); };
  }, []);

  return (
    <div className="neu">
      {/* ═══ FIXED HEADER ═══ */}
      <header className={`neu-header${headerVisible ? ' neu-header--visible' : ''}`}>
        <div className="neu-header__wordmark">
          <span>A</span>CHILLES <span className="neu-header__wordmark-sub">Analytics</span>
        </div>
        <nav className="neu-header__nav">
          <a href="#use-cases" className="neu-header__link">Case Study</a>
          <a href="#intel-stack" className="neu-header__link">The Stack</a>
          <button onClick={() => setContactOpen(true)} className="neu-header__link neu-header__link--btn">Reach Out</button>
          <a href="http://82.165.45.74:8100" className={`neu-header__cta${ctaVisible ? ' neu-header__cta--visible' : ''}`}>Access Platform</a>
        </nav>
      </header>

      {/* ═══ LASER SECTION (100vh) ═══ */}
      <section
        className="neu__laser"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty('--mx', `${x}px`);
            el.style.setProperty('--my', `${y}px`);
          }
        }}
        onMouseLeave={() => {
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty('--mx', '-9999px');
            el.style.setProperty('--my', '-9999px');
          }
        }}
      >
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalBeamOffset={-0.1}
          color="#BCFF2F"
          horizontalSizing={0.5}
          verticalSizing={2}
          wispDensity={1}
          wispSpeed={15}
          wispIntensity={5}
          flowSpeed={0.35}
          flowStrength={0.25}
          fogIntensity={0.45}
          fogScale={0.3}
          fogFallSpeed={0.6}
          decay={1.1}
          falloffStart={1.2}
          mouseTiltStrength={0.15}
          mouseSmoothTime={0.08}
          dpr={1}
        />

        <img
          ref={revealImgRef}
          src="/background.png"
          alt=""
          className="neu__reveal-img"
        />

        {/* Impact line — pinned to bottom of laser section */}
        <div className="neu__impact" ref={impactRef}>
          <div className="neu__impact-glow" />
          <div className="neu__impact-line" />
        </div>
      </section>

      {/* ═══ HERO SECTION (cloned from landing) ═══ */}
      <section className="neu-hero" ref={heroRef}>
        <div className="neu-hero__content">
          <h1 className="neu-hero__headline">
            Make the consequences <em>visible</em> — before they occur.
          </h1>
          <p className="neu-hero__sub">
            We apply OSINT methodologies to turn fragmented data into
            structured foresight — exposing blind spots before they
            become consequences.
            <Cursor />
          </p>
          <div className="neu-hero__ctas">
            <a href="http://82.165.45.74:8100" className="neu-hero__cta neu-hero__cta--primary">
              Access Platform
            </a>
            <a href="#reach-out" className="neu-hero__cta neu-hero__cta--secondary">
              Reach Out
            </a>
          </div>
        </div>

        <div className="neu-hero__logo-wrap" aria-hidden="true">
          <img src="/logo.png" alt="" className="neu-hero__logo" />
        </div>
      </section>

      {/* ═══ CONTENT SECTIONS (from landing page) ═══ */}
      <div className="vg">
        <PhilosophySection />
        <CoreEngine />
        <UseCases />
        <IntelStack />
        <AICouncil />
        <ArchitectureSection />
      </div>

      {/* ═══ REACH OUT SECTION ═══ */}
      <section className="neu-reach" id="reach-out">
        <div className="neu-reach__inner">
          <div className="neu-reach__label">// REACH OUT</div>
          <h2 className="neu-reach__headline">
            Ready to see what you&rsquo;re missing?
          </h2>
          <p className="neu-reach__sub">
            Whether you&rsquo;re navigating geopolitical risk, supply chain disruption, or
            competitive intelligence — we build the system that sees it first.
          </p>
          <div className="neu-reach__ctas">
            <button onClick={() => setContactOpen(true)} className="neu-reach__cta neu-reach__cta--primary">
              Get in Touch
            </button>
            <a href="http://82.165.45.74:8100" className="neu-reach__cta neu-reach__cta--secondary">
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

      {/* ═══ CONTACT MODAL ═══ */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
