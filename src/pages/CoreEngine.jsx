import './CoreEngine.css';

/* =========================================================================
   CORE ENGINE PAGE — Impact vs. Vulnerability
   Achilles Analytics — "Tactical Grid" Design System
   ========================================================================= */

// --- Inline SVG Icons ---

const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z" />
  </svg>
);

const IconAnalytics = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3v18h18v-2H5V3H3zm4 10v4h2v-4H7zm4-6v10h2V7h-2zm4 4v6h2v-6h-2zm4-8v14h2V3h-2z" />
  </svg>
);

// --- Main Component ---

export default function CoreEngine() {
  return (
    <section className="vg-engine-page">
      {/* Section Label */}
      <div className="vg__section-label">// CORE ENGINE</div>

      {/* Section Header */}
      <div className="vg-engine__header">
        <h1 className="vg-engine__headline">
          Impact vs. Vulnerability
        </h1>
        <p className="vg-engine__subtitle">
          Separating Event Reaction from System Hardening
        </p>
      </div>

      {/* Split-Screen Container */}
      <div className="vg-engine__split">
        {/* ============================================================
            LEFT PANEL: Impact Analysis
            ============================================================ */}
        <div className="vg-engine__panel">
          {/* Header */}
          <div className="vg-engine__panel-header">
            <div className="vg-engine__panel-icon vg-engine__panel-icon--impact">
              <IconBolt />
            </div>
            <div>
              <h3 className="vg-engine__panel-title">Impact Analysis</h3>
            </div>
          </div>

          {/* Key Metric */}
          <div className="vg-engine__metric vg-engine__metric--impact">
            <div className="vg-engine__metric-label vg-engine__metric-label--accent">
              Key Metric
            </div>
            <div className="vg-engine__metric-row">
              <span className="vg-engine__metric-name">
                Reactive State Engine
              </span>
            </div>
          </div>

          {/* Visualization: Impact Ripple */}
          <div className="vg-engine__viz vg-engine__viz--impact">
            <div className="vg-engine__viz-grid" />
            <div className="vg-engine__ripple-container">
              {/* Center glow node */}
              <div className="vg-engine__ripple-core" />
              {/* Ripple rings */}
              <div className="vg-engine__ripple-ring vg-engine__ripple-ring--sm" />
              <div className="vg-engine__ripple-ring vg-engine__ripple-ring--md" />
              <div className="vg-engine__ripple-ring vg-engine__ripple-ring--lg" />
              {/* Peripheral nodes */}
              <div className="vg-engine__ripple-node vg-engine__ripple-node--top" />
              <div className="vg-engine__ripple-node vg-engine__ripple-node--bottom" />
              <div className="vg-engine__ripple-node vg-engine__ripple-node--left" />
              <div className="vg-engine__ripple-node vg-engine__ripple-node--right" />
            </div>
            {/* Legend */}
            <div className="vg-engine__viz-legend">
              <div className="vg-engine__viz-legend-item">
                <span className="vg-engine__viz-legend-dot vg-engine__viz-legend-dot--accent" />
                <span className="vg-engine__viz-legend-text">Cascading</span>
              </div>
              <div className="vg-engine__viz-legend-item">
                <span className="vg-engine__viz-legend-dot vg-engine__viz-legend-dot--white" />
                <span className="vg-engine__viz-legend-text">Stable</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="vg-engine__data-rows">
            <p className="vg-engine__panel-text">
              Traces cascade paths through system nodes. Quantifies remaining capacity and failure probability in real time.
            </p>
          </div>
        </div>

        {/* ============================================================
            RIGHT PANEL: Vulnerability Analysis
            ============================================================ */}
        <div className="vg-engine__panel">
          {/* Header */}
          <div className="vg-engine__panel-header">
            <div className="vg-engine__panel-icon vg-engine__panel-icon--vuln">
              <IconAnalytics />
            </div>
            <div>
              <h3 className="vg-engine__panel-title">Vulnerability Analysis</h3>
            </div>
          </div>

          {/* Key Metric */}
          <div className="vg-engine__metric vg-engine__metric--vuln">
            <div className="vg-engine__metric-label vg-engine__metric-label--dim">
              Leverage Point Identification
            </div>
            <div className="vg-engine__metric-row">
              <span className="vg-engine__metric-name">Proactive_Audit_Engine</span>
            </div>
          </div>

          {/* Visualization: Leverage Points Map */}
          <div className="vg-engine__viz vg-engine__viz--vuln">
            <div className="vg-engine__viz-grid" />
            <svg
              className="vg-engine__svg-map"
              width="200"
              height="200"
              viewBox="0 0 200 200"
            >
              {/* Network Connections */}
              <line x1="100" y1="50" x2="60" y2="100" stroke="rgba(188, 255, 47, 0.4)" strokeWidth="1" />
              <line x1="100" y1="50" x2="140" y2="100" stroke="rgba(188, 255, 47, 0.4)" strokeWidth="1" />
              <line x1="60" y1="100" x2="100" y2="150" stroke="rgba(188, 255, 47, 0.4)" strokeWidth="1" />
              <line x1="140" y1="100" x2="100" y2="150" stroke="rgba(188, 255, 47, 0.4)" strokeWidth="1" />
              <line x1="60" y1="100" x2="140" y2="100" stroke="rgba(188, 255, 47, 0.4)" strokeWidth="1" />
              {/* Leverage Heat Zone */}
              <circle
                cx="100"
                cy="50"
                r="12"
                fill="rgba(188, 255, 47, 0.12)"
                stroke="rgba(188, 255, 47, 1)"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 8px rgba(188, 255, 47, 0.5))' }}
              />
              <circle cx="100" cy="50" r="4" fill="rgba(188, 255, 47, 1)" />
              {/* Static Nodes */}
              <circle cx="60" cy="100" r="4" fill="rgba(255, 255, 255, 0.4)" />
              <circle cx="140" cy="100" r="4" fill="rgba(255, 255, 255, 0.4)" />
              <circle cx="100" cy="150" r="4" fill="rgba(255, 255, 255, 0.4)" />
            </svg>
            {/* Bottleneck Badge */}
            <div className="vg-engine__viz-badge">
              <span className="vg-engine__viz-badge-text">
                Structural Bottleneck Detected
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="vg-engine__data-rows">
            <p className="vg-engine__panel-text">
              Scans for structural weaknesses before exploitation. Maps leverage points and stress tolerance across the network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
