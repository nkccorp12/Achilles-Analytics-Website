import './AICouncil.css';

/* ==========================================================================
   AI COUNCIL PAGE — "Tactical Grid" Design System
   Simulated council of AI agents with distinct personas
   ========================================================================== */

// --- Inline SVG Icons (replacing Material Symbols) ---

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

const IconWarning = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);

const IconMediation = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
  </svg>
);

const IconTrendUp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </svg>
);

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
                &ldquo;Your latency assumptions ignore the cascade failure probability of 68% in region EU-West.&rdquo;
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

            {/* Synthesis result overlay */}
            <div className="vg-council__synthesis">
              <span className="vg-council__synthesis-label">Synthesis Result</span>
              <span className="vg-council__synthesis-value">Pivot Strategy</span>
              <span className="vg-council__synthesis-confidence">CONFIDENCE: 89.4%</span>
            </div>
          </div>

          {/* RIGHT COLUMN (3/12) — STRATEGIST + OPTIMIST */}
          <div className="vg-council__right">
            {/* THE STRATEGIST */}
            <div className="vg-council__card vg-council__card--strategist">
              <div className="vg-council__card-connector--strategist" />
              <h3 className="vg-council__card-title--strategist">THE STRATEGIST</h3>
              <p className="vg-council__card-model">MODEL: LONG_TERM_V2</p>
              <p className="vg-council__card-quote">
                &ldquo;Redundancy costs are offset by uptime guarantees. The leverage point is at Node 7.&rdquo;
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
                &ldquo;User adoption trends suggest 3x capacity needed by Q3. Expansion is mandatory.&rdquo;
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
              <span className="vg-council__stats-label">Simulation ID</span>
              <span className="vg-council__stats-value">#SIM-992-ALPHA</span>
            </div>
            <div className="vg-council__stats-divider" />
            <div className="vg-council__stats-group">
              <span className="vg-council__stats-label">Iterations</span>
              <span className="vg-council__stats-value">4,203 CYCLES</span>
            </div>
          </div>
          <div className="vg-council__stats-actions">
            <button className="vg-council__btn vg-council__btn--outline">
              <span className="vg-council__btn-icon">
                <IconTerminal />
              </span>
              View Logic Trace
            </button>
            <button className="vg-council__btn vg-council__btn--filled">
              <span className="vg-council__btn-icon">
                <IconRefresh />
              </span>
              Re-simulate Debate
            </button>
          </div>
        </div>
      </div>

      {/* Status ticker */}
      <div className="vg-council__ticker">
        <span className="vg-council__ticker-item vg-council__ticker-item--cynic">
          <span className="vg-council__ticker-icon">
            <IconWarning />
          </span>
          CYNIC_NODE: ACTIVE THREAT MODELING
        </span>
        <span className="vg-council__ticker-item vg-council__ticker-item--strategist">
          <span className="vg-council__ticker-icon">
            <IconMediation />
          </span>
          STRATEGIST_NODE: BALANCING WEIGHTS
        </span>
        <span className="vg-council__ticker-item vg-council__ticker-item--optimist">
          <span className="vg-council__ticker-icon">
            <IconTrendUp />
          </span>
          OPTIMIST_NODE: SCANNING OPPORTUNITIES
        </span>
      </div>
    </section>
  );
}

export default AICouncil;
