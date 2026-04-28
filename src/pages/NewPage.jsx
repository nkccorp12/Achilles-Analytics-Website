import { useRef, useState, useEffect, useCallback, lazy, Suspense } from 'react';
import WhitelistButton from '../components/WhitelistButton';
import AICouncilFloatingPill from '../components/AICouncilFloatingPill';
import './LandingPage.css';
import './NewPage.css';

const RotatingEarth = lazy(() => import('../components/RotatingEarth'));
const CoreEngine = lazy(() => import('./CoreEngine'));
const PipelineStack = lazy(() => import('../components/PipelineStack'));
const HiringPill = lazy(() => import('../components/HiringPill'));
const UseCases = lazy(() => import('./UseCases'));
const NodeNetworkBg = lazy(() => import('../components/NodeNetworkBg'));

/* ─── Blinking Cursor ─── */
const Cursor = () => <span className="neu__cursor" aria-hidden="true" />;

/* ─── Contact Modal (cloned from LandingPage) ─── */
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
      <div ref={modalRef} className={`nm-modal nm-modal--${phase}`} onClick={(e) => e.stopPropagation()}>
        <div className="nm-scan" />
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
              <p className="nm-consent">By contacting us, you consent to the processing of your inquiry per our <a href="/privacy">Privacy Policy</a>.</p>
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

/* ─── Intern Popup Modal ─── */
function InternModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="np-intern-overlay" onClick={onClose}>
      <div className="np-intern-modal" onClick={(e) => e.stopPropagation()}>
        <div className="np-intern__corner np-intern__corner--tl" />
        <div className="np-intern__corner np-intern__corner--tr" />
        <div className="np-intern__corner np-intern__corner--bl" />
        <div className="np-intern__corner np-intern__corner--br" />

        <button className="np-intern__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="np-intern__head">
          <span className="np-intern__pill">OPEN POSITION</span>
          <h2 className="np-intern__title">Intern · AI &amp; Data Engineer</h2>
          <div className="np-intern__meta">
            <span>REMOTE / HYBRID</span>
            <span className="np-intern__sep">/</span>
            <span>3–6 MONTHS</span>
            <span className="np-intern__sep">/</span>
            <span>PAID</span>
          </div>
        </div>

        <div className="np-intern__body">
          <p className="np-intern__lede">
            Help us build the foresight engine. You&rsquo;ll work alongside our core team
            on the OSINT pipeline, embeddings, and the analyst-facing platform.
          </p>

          <div className="np-intern__grid">
            <div className="np-intern__col">
              <div className="np-intern__col-label">// WHAT YOU&rsquo;LL DO</div>
              <ul className="np-intern__list">
                <li>Train and evaluate domain-tuned embedding models on geopolitical text corpora.</li>
                <li>Build ingestion adapters (Telegram, RSS, structured APIs) and clustering jobs.</li>
                <li>Ship features into the analyst UI, from event maps to AI Council debates.</li>
                <li>Own a slice end-to-end: data &rarr; model &rarr; product &rarr; user feedback.</li>
              </ul>
            </div>

            <div className="np-intern__col">
              <div className="np-intern__col-label">// WHO YOU ARE</div>
              <ul className="np-intern__list">
                <li>Comfortable in Python and TypeScript; you can ship code without supervision.</li>
                <li>Curious about LLMs, retrieval, and the messy reality of real-world data.</li>
                <li>You read the news and ask &ldquo;why didn&rsquo;t anyone see this coming?&rdquo;</li>
                <li>Bonus: experience with sentence transformers, Postgres, deck.gl, or OSINT workflows.</li>
              </ul>
            </div>
          </div>

          <div className="np-intern__stack">
            <span className="np-intern__col-label">// THE STACK</span>
            <div className="np-intern__chips">
              {['Python', 'PyTorch', 'sentence-transformers', 'TypeScript', 'React', 'deck.gl', 'Postgres', 'Docker'].map((t) => (
                <span key={t} className="np-intern__chip">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="np-intern__foot">
          <a
            href="mailto:careers@achilles-analytics.com?subject=Application — Intern · AI %26 Data Engineer&body=Hi Achilles team,%0D%0A%0D%0AI'd like to apply for the Intern · AI %26 Data Engineer position.%0D%0A%0D%0A— "
            className="np-intern__cta np-intern__cta--primary"
          >
            Apply Now &rarr;
          </a>
          <button className="np-intern__cta np-intern__cta--secondary" onClick={onClose}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewPage() {
  const heroRef = useRef(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [useCasesOpen, setUseCasesOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Lock body scroll when use-cases modal open
  useEffect(() => {
    if (!useCasesOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setUseCasesOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [useCasesOpen]);

  return (
    <div className="neu newpage">
      {/* ═══ FIXED HEADER (always visible on /new) ═══ */}
      <header className="neu-header neu-header--visible">
        <div className="neu-header__inner">
          <a href="/" className="neu-header__wordmark" style={{ textDecoration: 'none' }}>
            <span>ACHILLES</span> <span className="neu-header__wordmark-sub">ANALYTICS</span>
          </a>
          <nav className="neu-header__nav">
            <a href="#use-cases" className="neu-header__link">Case Study</a>
            <a href="#intel-stack" className="neu-header__link">The Stack</a>
            <a href="/council" className="neu-header__link">AI Council</a>
            <a href="/about" className="neu-header__link">About</a>
            <a
              href="https://www.linkedin.com/company/achilles-analytics-ltd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Achilles Analytics on LinkedIn"
              className="neu-header__link np-header__social"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.778 13.019H3.555V9h3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <button
              type="button"
              className={`np-notif-dot${notifOpen ? ' np-notif-dot--active' : ''}`}
              onClick={() => setNotifOpen((v) => !v)}
              aria-label={notifOpen ? 'Close notifications' : 'Open notifications'}
              aria-pressed={notifOpen}
            />
          </nav>
        </div>
      </header>

      {/* ═══ HERO / WELCOME SECTION ═══ */}
      <section
        className="neu-hero newpage-hero"
        ref={heroRef}
        onPointerMove={(e) => {
          if (e.pointerType === 'touch') return;
          const el = heroRef.current?.querySelector('.neu-hero__bg-reveal');
          if (el) {
            const rect = heroRef.current.getBoundingClientRect();
            el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            el.style.setProperty('--my', `${e.clientY - rect.top}px`);
          }
        }}
        onPointerLeave={() => {
          const el = heroRef.current?.querySelector('.neu-hero__bg-reveal');
          if (el) {
            el.style.setProperty('--mx', '-9999px');
            el.style.setProperty('--my', '-9999px');
          }
        }}
      >
        <img src="/hero-bg.webp" alt="" className="neu-hero__bg" aria-hidden="true" />
        <img src="/hero-bg.webp" alt="" className="neu-hero__bg-reveal" aria-hidden="true" />

        <div className="neu-hero__content">
          <h1 className="neu-hero__headline">
            Make the consequences <em>visible</em>, before they occur.
          </h1>
          <p className="neu-hero__sub">
            We apply open source intelligence methodologies to turn
            fragmented data into structured intelligence that exposes
            blind spots before they become consequences. See what's
            coming, act before others can.
            <Cursor />
          </p>

          <div className="neu-hero__ctas np-hero__ctas">
            <WhitelistButton className="np-link" baseLabel="Access Platform" hoverLabel="Join Whitelist" />
            <button onClick={() => setContactOpen(true)} className="neu-hero__cta neu-hero__cta--secondary">
              Reach Out
            </button>
          </div>
        </div>

        <div className="neu-hero__globe" aria-hidden="true">
          <Suspense fallback={null}>
            <RotatingEarth
              size={600}
              alerts={[
                { lng: -98.5, lat: 39.8 },
                { lng: 36.2, lat: 49.0 },
                { lng: 44.4, lat: 33.3 },
                { lng: 35.2, lat: 31.9 },
                { lng: 100.5, lat: 13.7 },
              ]}
            />
          </Suspense>
        </div>

      </section>

      {/* ═══ FLOATING PILL STACK (desktop: always visible · mobile: toggled by notif dot) ═══ */}
      <div className={`np-pill-stack${notifOpen ? ' np-pill-stack--open' : ''}`}>
        <Suspense fallback={null}><HiringPill /></Suspense>
        <AICouncilFloatingPill />
      </div>

      {/* ═══ CONTENT SECTIONS ═══ */}
      <div className="vg">
        {/* 2. Was wir machen */}
        <Suspense fallback={null}><CoreEngine /></Suspense>

        {/* 3. Wie wir es machen — Pipeline Flow visualization */}
        <Suspense fallback={null}><PipelineStack /></Suspense>

        {/* 3.5 Use Cases — Preview Card opens modal */}
        <section className="np-usecases-preview" id="use-cases">
          <div className="np-usecases-preview__inner">
            <div className="np-usecases-preview__label">// USE CASES</div>
            <p className="np-usecases-preview__lede">
              Achilles had <em className="np-usecases-preview__hl">one</em> heel.
              Most operations have <em className="np-usecases-preview__hl">many</em>.
              We find them before they become consequences.
            </p>
            <button
              type="button"
              className="np-usecases-preview__card"
              onClick={() => setUseCasesOpen(true)}
            >
              <div className="np-usecases-preview__bg" style={{ backgroundImage: "url('/infra.webp')" }} />
              <div className="np-usecases-preview__overlay" />
              <div className="np-usecases-preview__content">
                <span className="np-usecases-preview__tag">FEATURED · 03 CASES</span>
                <h3 className="np-usecases-preview__title">Operational Intelligence in Action</h3>
                <p className="np-usecases-preview__text">
                  From warehouse floors to open waters. Achilles adapts to any
                  operational domain where structured intelligence creates decisive advantage.
                </p>
                <div className="np-usecases-preview__cta">
                  View All Use Cases <span className="np-usecases-preview__arrow">&rarr;</span>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* 4. About / Origin — styled like Reach Out section */}
        <section className="neu-reach np-origin-section" id="philosophy">
          <Suspense fallback={null}><NodeNetworkBg /></Suspense>
          <div className="neu-reach__inner">
            <div className="neu-reach__label">// ORIGIN</div>
            <h2 className="neu-reach__headline">
              Started as a question.<br />
              Became conviction.
            </h2>
            <p className="neu-reach__sub">
              It is a research project on the shape of modern intelligence,
              built by practitioners who got tired of waiting for the tools
              that should already exist.
            </p>
            <div className="neu-reach__ctas">
              <a href="/about" className="neu-reach__cta neu-reach__cta--primary">
                Read More
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* 6. Reach Out */}
      <section className="neu-reach" id="reach-out">
        <div className="neu-reach__inner">
          <div className="neu-reach__label">// REACH OUT</div>
          <h2 className="neu-reach__headline">
            Ready to see what you&rsquo;re missing?
          </h2>
          <p className="neu-reach__sub">
            Whether you&rsquo;re navigating geopolitical risk, supply chain disruption, or
            competitive intelligence: we build the system that sees it first.
          </p>
          <div className="neu-reach__ctas">
            <button onClick={() => setContactOpen(true)} className="neu-reach__cta neu-reach__cta--primary">
              Get in Touch
            </button>
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

      {/* ═══ MODALS ═══ */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Use Cases Modal */}
      {useCasesOpen && (
        <div className="np-uc-modal-overlay" onClick={() => setUseCasesOpen(false)}>
          <div className="np-uc-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="np-uc-modal__close"
              onClick={() => setUseCasesOpen(false)}
              aria-label="Close use cases"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="np-uc-modal__corner np-uc-modal__corner--tl" />
            <div className="np-uc-modal__corner np-uc-modal__corner--tr" />
            <div className="np-uc-modal__corner np-uc-modal__corner--bl" />
            <div className="np-uc-modal__corner np-uc-modal__corner--br" />
            <div className="np-uc-modal__body vg">
              <Suspense fallback={null}>
                <UseCases />
              </Suspense>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
