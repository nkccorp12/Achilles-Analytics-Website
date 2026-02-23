import { useEffect, useRef, useState } from 'react';
import './AICouncil.css';

/* ==========================================================================
   AI COUNCIL PAGE — "Tactical Grid" Design System
   Suez Canal Scenario — Simulated council of AI agents
   ========================================================================== */

// --- Inline SVG Icons ---

const IconTerminal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const IconRefresh = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

// --- Synthesis Strategies (Suez Canal) ---

const STRATEGIES = [
  { name: 'Cape Reroute',           conf: 72.3, tag: 'COST_IMPACT: +340%' },
  { name: 'Turkey Rail Corridor',   conf: 89.4, tag: 'TIME_DELTA: +3 DAYS' },
  { name: 'Suez Negotiation',       conf: 34.1, tag: 'RISK: CRITICAL' },
  { name: 'EU Pre-Stock Warehouse', conf: 91.7, tag: 'DELAY: 0 DAYS' },
];

// --- Animated Synthesis Overlay ---

function SynthesisOverlay() {
  const [idx, setIdx] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [displayConf, setDisplayConf] = useState(STRATEGIES[0].conf);
  const ref = useRef(null);
  const startedRef = useRef(false);
  const idxRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timeout;
    let counterIv;

    const runCycle = () => {
      setSimulating(true);

      const next = (idxRef.current + 1) % STRATEGIES.length;
      const target = STRATEGIES[next].conf;
      const steps = 20;
      const duration = 1500;
      let start = null;

      const countFrame = (now) => {
        if (!start) start = now;
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2);
        setDisplayConf(+(eased * target).toFixed(1));
        if (progress < 1) {
          counterIv = requestAnimationFrame(countFrame);
        } else {
          setDisplayConf(target);
          setSimulating(false);
          idxRef.current = next;
          setIdx(next);
          timeout = setTimeout(runCycle, 5000);
        }
      };
      counterIv = requestAnimationFrame(countFrame);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        timeout = setTimeout(runCycle, 4000);
      }
    }, { threshold: 0.3 });
    io.observe(el);

    return () => { clearTimeout(timeout); cancelAnimationFrame(counterIv); io.disconnect(); };
  }, []);

  const strat = STRATEGIES[idx];

  return (
    <div className="vg-council__synthesis" ref={ref}>
      <span className="vg-council__synthesis-label">Synthesis Result</span>
      <span className={`vg-council__synthesis-value${simulating ? ' vg-council__synthesis-value--sim' : ''}`}>
        {simulating ? 'Re-simulating...' : strat.name}
      </span>
      <span className={`vg-council__synthesis-confidence${simulating ? ' vg-council__synthesis-confidence--active' : ''}`}>
        CONFIDENCE: {displayConf}%
      </span>
    </div>
  );
}

// ==========================================================================
// AI COUNCIL COMPONENT
// ==========================================================================

function AICouncil() {
  return (
    <section className="vg-council">
      {/* Section label */}
      <div className="vg__section-label">// AI COUNCIL</div>

      {/* Header area */}
      <div className="vg-council__header">
        <div className="vg-council__badge">
          <span className="vg-council__badge-dot" />
          <span className="vg-council__badge-label">Spotlight Feature</span>
        </div>
        <h1 className="vg-council__headline">Escape the Echo Chamber.</h1>
        <p className="vg-council__description">
          A simulated council of AI agents with distinct personas challenges your assumptions, forcing rigorous debate before execution.
        </p>
      </div>

      {/* Main panel */}
      <div className="vg-council__panel">
        <div className="vg-council__panel-gradient" />

        {/* 12-column grid */}
        <div className="vg-council__grid">

          {/* LEFT COLUMN (3/12) — THE CYNIC */}
          <div className="vg-council__left">
            <div className="vg-council__card vg-council__card--cynic">
              <div className="vg-council__card-connector--cynic" />
              <h3 className="vg-council__card-title--cynic">THE CYNIC</h3>
              <p className="vg-council__card-model">MODEL: ADVERSARIAL_V4</p>
              <p className="vg-council__card-quote">
                &ldquo;+14 days, 2x fuel cost, insurance up 200%. Margin collapses.&rdquo;
              </p>
              <div className="vg-council__card-footer vg-council__card-footer--cynic">
                <span className="vg-council__tag vg-council__tag--cynic">RISK_DETECTION: CRITICAL</span>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN (6/12) — SVG VISUALIZATION */}
          <div className="vg-council__center">
            <svg
              className="vg-council__svg"
              viewBox="0 0 600 400"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="council-glow-red" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="council-glow-green" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="council-glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Vertical center line */}
              <line
                x1="300" y1="50" x2="300" y2="350"
                stroke="white" strokeOpacity="0.2" strokeWidth="2"
              />

              {/* Dashed circle at center */}
              <circle
                cx="300" cy="200" r="40"
                fill="none" stroke="white" strokeOpacity="0.3"
                strokeWidth="1" strokeDasharray="4 4"
              />

              {/* Center dot */}
              <circle cx="300" cy="200" r="4" fill="white" />

              {/* Animated paths from persona nodes to center */}
              <path
                className="vg-council__node-line"
                d="M 50 200 C 150 200, 150 180, 260 190"
                fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.6"
              />
              <path
                className="vg-council__node-line"
                d="M 550 320 C 450 320, 400 250, 330 220"
                fill="none" stroke="#10b981" strokeWidth="2" opacity="0.6"
              />
              <path
                className="vg-council__node-line"
                d="M 550 80 C 450 80, 400 150, 330 180"
                fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.6"
              />

              {/* Cynic — red diamond */}
              <rect
                x="20" y="170" width="60" height="60"
                fill="#111111" stroke="#ef4444" strokeWidth="2"
                transform="rotate(45 50 200)"
                filter="url(#council-glow-red)"
              />

              {/* Strategist — blue square (rotated diamond) */}
              <rect
                x="520" y="50" width="60" height="60"
                fill="#111111" stroke="#3b82f6" strokeWidth="2"
                transform="rotate(45 550 80)"
                filter="url(#council-glow-blue)"
              />

              {/* Optimist — green circle */}
              <circle
                cx="550" cy="320" r="35"
                fill="#111111" stroke="#10b981" strokeWidth="2"
                filter="url(#council-glow-green)"
              />
            </svg>

            {/* Animated Synthesis overlay */}
            <SynthesisOverlay />
          </div>

          {/* RIGHT COLUMN (3/12) — STRATEGIST + OPTIMIST */}
          <div className="vg-council__right">
            {/* THE STRATEGIST */}
            <div className="vg-council__card vg-council__card--strategist">
              <div className="vg-council__card-connector--strategist" />
              <h3 className="vg-council__card-title--strategist">THE STRATEGIST</h3>
              <p className="vg-council__card-model">MODEL: LONG_TERM_V2</p>
              <p className="vg-council__card-quote">
                &ldquo;Turkey rail bypasses Suez. Lock capacity now — 3 day lead.&rdquo;
              </p>
              <div className="vg-council__card-footer vg-council__card-footer--strategist">
                <span className="vg-council__tag vg-council__tag--strategist">ROI_PROJECTION: +14%</span>
              </div>
            </div>

            {/* THE OPTIMIST */}
            <div className="vg-council__card vg-council__card--optimist">
              <div className="vg-council__card-connector--optimist" />
              <h3 className="vg-council__card-title--optimist">THE OPTIMIST</h3>
              <p className="vg-council__card-model">MODEL: GROWTH_ENGINE_V1</p>
              <p className="vg-council__card-quote">
                &ldquo;Pre-stock EU now. Supply gap = 3x market share for first movers.&rdquo;
              </p>
              <div className="vg-council__card-footer vg-council__card-footer--optimist">
                <span className="vg-council__tag vg-council__tag--optimist">GROWTH_FACTOR: HIGH</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom stats bar */}
        <div className="vg-council__stats">
          <div className="vg-council__stats-left">
            <div className="vg-council__stats-group">
              <span className="vg-council__stats-label">Scenario</span>
              <span className="vg-council__stats-value">Suez Canal Closure</span>
            </div>
            <div className="vg-council__stats-divider" />
            <div className="vg-council__stats-group">
              <span className="vg-council__stats-label">Model</span>
              <span className="vg-council__stats-value">ACHILLES_CORE_V4</span>
            </div>
          </div>
          <div className="vg-council__stats-actions">
            <button className="vg-council__btn vg-council__btn--outline">
              <span className="vg-council__btn-icon">
                <IconTerminal />
              </span>
              View Logic Trace
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}

export default AICouncil;
