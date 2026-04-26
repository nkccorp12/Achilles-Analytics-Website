import { useEffect, useRef, useState, useCallback } from 'react';
import './HiringPill.css';

const STORAGE_KEY = 'ach_hiring_seen_v1';

export default function HiringPill() {
  const [phase, setPhase] = useState('closed'); // closed | opening | open | closing
  const [pillVisible, setPillVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const modalRef = useRef(null);
  const lastFocusRef = useRef(null);

  // Reveal pill after short delay, dim the "new" indicator if user has opened before
  useEffect(() => {
    const t = setTimeout(() => setPillVisible(true), 1200);
    try {
      setSeen(localStorage.getItem(STORAGE_KEY) === '1');
    } catch (_) { /* ignore */ }
    return () => clearTimeout(t);
  }, []);

  const open = useCallback(() => {
    lastFocusRef.current = document.activeElement;
    setPhase('opening');
    setTimeout(() => setPhase('open'), 20);
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (_) { /* ignore */ }
    setSeen(true);
  }, []);

  const close = useCallback(() => {
    setPhase('closing');
    setTimeout(() => {
      setPhase('closed');
      if (lastFocusRef.current && lastFocusRef.current.focus) {
        lastFocusRef.current.focus();
      }
    }, 320);
  }, []);

  // Escape + lock scroll when modal open
  useEffect(() => {
    if (phase === 'closed') return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    // focus close button on open for keyboard users
    if (phase === 'open') {
      setTimeout(() => modalRef.current?.querySelector('.hr-close')?.focus(), 50);
    }
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [phase, close]);

  return (
    <>
      {/* ═══ FLOATING PILL ═══ */}
      <button
        type="button"
        className={`hr-pill${pillVisible ? ' hr-pill--in' : ''}${!seen ? ' hr-pill--new' : ''}`}
        onClick={open}
        aria-label="View open position: Intern, AI & Data Engineer"
      >
        <span className="hr-pill__dot" aria-hidden="true" />
        <span className="hr-pill__label">
          <span className="hr-pill__eyebrow">OPEN POSITION</span>
          <span className="hr-pill__role">Intern · AI &amp; Data Engineer</span>
        </span>
        <span className="hr-pill__arrow" aria-hidden="true">&rarr;</span>
      </button>

      {/* ═══ MODAL ═══ */}
      {phase !== 'closed' && (
        <div
          className={`hr-overlay hr-overlay--${phase}`}
          onClick={close}
          role="presentation"
        >
          <div
            className={`hr-modal hr-modal--${phase}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hr-title"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner ticks */}
            <span className="hr-corner hr-corner--tl" aria-hidden="true" />
            <span className="hr-corner hr-corner--tr" aria-hidden="true" />
            <span className="hr-corner hr-corner--bl" aria-hidden="true" />
            <span className="hr-corner hr-corner--br" aria-hidden="true" />

            {/* Close */}
            <button
              type="button"
              className="hr-close"
              onClick={close}
              aria-label="Close hiring modal"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="hr-scroll">
              {/* ── HEADER ── */}
              <header className="hr-head">
                <div className="hr-head__tags">
                  <span className="hr-tag hr-tag--accent">OPEN POSITION</span>
                  <span className="hr-tag">REMOTE</span>
                  <span className="hr-tag">PART-TIME</span>
                  <span className="hr-tag">2026</span>
                </div>
                <h2 id="hr-title" className="hr-head__title">
                  Intern <em>// AI &amp; Data Engineer</em>
                </h2>
                <p className="hr-head__lead">
                  We ingest open-source data and run it through a multi-model AI
                  pipeline to extract semantic embeddings, identify narrative
                  clusters, and surface emerging geopolitical risk signals.
                </p>
              </header>

              <hr className="hr-divider" />

              {/* ── APPLY IF ── */}
              <section className="hr-section">
                <div className="hr-section__head">
                  <span className="hr-section__bar" />
                  <h3 className="hr-section__title">Apply if</h3>
                  <span className="hr-section__badge">REQUIREMENTS</span>
                </div>
                <ul className="hr-req">
                  <li>
                    <span className="hr-req__mark" aria-hidden="true" />
                    <strong>You have a background in CS, data science, or applied ML.</strong>
                  </li>
                  <li>
                    <span className="hr-req__mark" aria-hidden="true" />
                    <span>
                      <strong>You&rsquo;re curious about geopolitics</strong>, comfortable
                      with startup ambiguity, biased toward action.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ── NICE TO HAVE ── */}
              <section className="hr-section">
                <div className="hr-section__head">
                  <span className="hr-section__bar" />
                  <h3 className="hr-section__title">Nice to have</h3>
                  <span className="hr-section__badge">04 SKILLS</span>
                </div>
                <div className="hr-grid-2">
                  <div className="hr-card hr-card--soft">
                    <h4>Conceptual fluency with embeddings</h4>
                    <p>You understand what SBERT does, why cosine similarity matters, and what a vector index is for. You won&rsquo;t need to implement it from scratch.</p>
                  </div>
                  <div className="hr-card hr-card--soft">
                    <h4>NLP pipeline intuition</h4>
                    <p>Chunking, embedding, storing, querying. You understand the flow end-to-end.</p>
                  </div>
                  <div className="hr-card hr-card--soft">
                    <h4>AI coding tools (Claude Code is mandatory)</h4>
                    <p>You don&rsquo;t need to be an expert, but you use them and understand their limits: hallucinations, context drift, blind spots.</p>
                  </div>
                  <div className="hr-card hr-card--soft">
                    <h4>Systems thinking</h4>
                    <p>You can hold the big picture, help shape it, yet maintain attention to small detail at the same time.</p>
                  </div>
                </div>
              </section>

              {/* ── WORK ON ── */}
              <section className="hr-section">
                <div className="hr-section__head">
                  <span className="hr-section__bar" />
                  <h3 className="hr-section__title">What you&rsquo;ll work on</h3>
                  <span className="hr-section__badge">04 TRACKS</span>
                </div>
                <div className="hr-grid-2">
                  <div className="hr-card hr-card--dark">
                    <span className="hr-card__tag">TRACK 01</span>
                    <h4>AI Pipeline</h4>
                    <p>Multi-model intelligence extraction, classification, and clustering.</p>
                  </div>
                  <div className="hr-card hr-card--dark">
                    <span className="hr-card__tag">TRACK 02</span>
                    <h4>Data &amp; Analysis</h4>
                    <p>Real-time geopolitical data, analytical features, source expansion.</p>
                  </div>
                  <div className="hr-card hr-card--dark">
                    <span className="hr-card__tag">TRACK 03</span>
                    <h4>Product &amp; Frontend</h4>
                    <p>Platform features, dashboards, and user-facing interfaces.</p>
                  </div>
                  <div className="hr-card hr-card--dark">
                    <span className="hr-card__tag">TRACK 04</span>
                    <h4>Research</h4>
                    <p>New data sources, AI model testing, predictive capabilities.</p>
                  </div>
                </div>
              </section>

              {/* ── APPLY BOX ── */}
              <section className="hr-apply">
                <div className="hr-apply__left">
                  <span className="hr-apply__eyebrow">// APPLY</span>
                  <h3 className="hr-apply__title">Send a short note.</h3>
                  <a className="hr-apply__mail" href="mailto:ops@achillesanalytics.ai?subject=Intern%20Application%3A%20AI%20%26%20Data%20Engineer">
                    ops@achillesanalytics.ai
                  </a>
                </div>
                <ol className="hr-apply__list">
                  <li>Why <strong>this specifically</strong> (2 to 3 sentences)</li>
                  <li>A project you&rsquo;ve been involved in</li>
                  <li>Your <strong>CV</strong> or <strong>LinkedIn</strong></li>
                </ol>
              </section>

              {/* ── FOOTER ── */}
              <footer className="hr-foot">
                <div className="hr-foot__ctas">
                  <a
                    className="hr-btn hr-btn--primary"
                    href="mailto:ops@achillesanalytics.ai?subject=Intern%20Application%20%E2%80%94%20AI%20%26%20Data%20Engineer"
                  >
                    Apply by Email
                  </a>
                  <a
                    className="hr-btn hr-btn--ghost"
                    href="/achilles-intern-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF &darr;
                  </a>
                </div>
                <p className="hr-foot__tagline">
                  Real-time intelligence for a world that doesn&rsquo;t wait.
                </p>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
