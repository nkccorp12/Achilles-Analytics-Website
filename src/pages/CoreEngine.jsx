import { useState } from 'react';
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

const IconPrecision = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </svg>
);

const IconDatabase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 2h14v2H5v-2z" />
  </svg>
);

// --- Toggle Options ---

const TOGGLE_OPTIONS = [
  { key: 'impact', label: 'Impact Focus' },
  { key: 'dual', label: 'Dual View' },
  { key: 'vulnerability', label: 'Vulnerability Focus' },
];

// --- Main Component ---

export default function CoreEngine() {
  const [activeView, setActiveView] = useState('dual');

  const showImpact = activeView === 'impact' || activeView === 'dual';
  const showVuln = activeView === 'vulnerability' || activeView === 'dual';

  return (
    <section className="vg-engine-page">
      {/* Section Label */}
      <div className="vg__section-label">// CORE ENGINE</div>

      {/* Section Header */}
      <div className="vg-engine__header">
        <h1 className="vg-engine__headline">
          Core Engine: Impact vs. Vulnerability
        </h1>
        <p className="vg-engine__subtitle">
          Separating Event Reaction from System Hardening
        </p>

        {/* 3-Way Toggle */}
        <div className="vg-engine__toggle-wrap">
          {TOGGLE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              className={`vg-engine__toggle-btn${activeView === opt.key ? ' vg-engine__toggle-btn--active' : ''}`}
              onClick={() => setActiveView(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split-Screen Container */}
      <div
        className="vg-engine__split"
        style={
          !showImpact || !showVuln
            ? { gridTemplateColumns: '1fr' }
            : undefined
        }
      >
        {/* ============================================================
            LEFT PANEL: Impact Analysis
            ============================================================ */}
        {showImpact && (
          <div className="vg-engine__panel">
            <div className="vg-engine__panel-tag">Reactive_State_Engine</div>

            {/* Header */}
            <div className="vg-engine__panel-header">
              <div className="vg-engine__panel-icon vg-engine__panel-icon--impact">
                <IconBolt />
              </div>
              <div>
                <h3 className="vg-engine__panel-title">Impact Analysis</h3>
                <p className="vg-engine__panel-desc">
                  &ldquo;How is my system affected by a specific event?&rdquo;
                </p>
              </div>
            </div>

            {/* Key Metric */}
            <div className="vg-engine__metric vg-engine__metric--impact">
              <div className="vg-engine__metric-label vg-engine__metric-label--accent">
                Key Metric
              </div>
              <div className="vg-engine__metric-row">
                <span className="vg-engine__metric-name">
                  {'\u0394'}_SYSTEM_STATE
                </span>
                <span className="vg-engine__metric-value">-24.8%</span>
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

            {/* Data Readouts */}
            <div className="vg-engine__data-rows">
              <div className="vg-engine__data-row">
                <span className="vg-engine__data-key">LATENCY_DELTA</span>
                <span className="vg-engine__data-val vg-engine__data-val--accent">+145ms</span>
              </div>
              <div className="vg-engine__data-row">
                <span className="vg-engine__data-key">REMAINING_OPS</span>
                <span className="vg-engine__data-val vg-engine__data-val--white">42/100</span>
              </div>
              <div className="vg-engine__data-row">
                <span className="vg-engine__data-key">FAIL_CASCADE_PROB</span>
                <span className="vg-engine__data-val vg-engine__data-val--accent">0.682</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            RIGHT PANEL: Vulnerability Analysis
            ============================================================ */}
        {showVuln && (
          <div className="vg-engine__panel">
            <div className="vg-engine__panel-tag">Proactive_Audit_Engine</div>

            {/* Header */}
            <div className="vg-engine__panel-header">
              <div className="vg-engine__panel-icon vg-engine__panel-icon--vuln">
                <IconAnalytics />
              </div>
              <div>
                <h3 className="vg-engine__panel-title">Vulnerability Analysis</h3>
                <p className="vg-engine__panel-desc">
                  &ldquo;Where are my structural weaknesses?&rdquo;
                </p>
              </div>
            </div>

            {/* Key Metric */}
            <div className="vg-engine__metric vg-engine__metric--vuln">
              <div className="vg-engine__metric-label vg-engine__metric-label--dim">
                Leverage Point Identification
              </div>
              <div className="vg-engine__metric-row">
                <span className="vg-engine__metric-name">LEVERAGE_INDEX</span>
                <span className="vg-engine__metric-value">9.4</span>
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

            {/* Data Readouts */}
            <div className="vg-engine__data-rows">
              <div className="vg-engine__data-row">
                <span className="vg-engine__data-key">VULN_INDEX_NODE_01</span>
                <span className="vg-engine__data-val vg-engine__data-val--accent">HIGH_RISK</span>
              </div>
              <div className="vg-engine__data-row">
                <span className="vg-engine__data-key">SENSITIVITY_COEFF</span>
                <span className="vg-engine__data-val vg-engine__data-val--white">0.92</span>
              </div>
              <div className="vg-engine__data-row">
                <span className="vg-engine__data-key">STRESS_TOLERANCE</span>
                <span className="vg-engine__data-val vg-engine__data-val--accent">0.14</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================
          FOOTER LEGEND BAR
          ============================================================ */}
      <footer className="vg-engine__footer">
        <div className="vg-engine__footer-left">
          <div className="vg-engine__footer-item">
            <span className="vg-engine__footer-icon">
              <IconPrecision />
            </span>
            <span className="vg-engine__footer-text">
              ENGINE_STATUS:{' '}
              <span className="vg-engine__footer-status--operational">
                OPERATIONAL
              </span>
            </span>
          </div>
          <div className="vg-engine__footer-item">
            <span className="vg-engine__footer-icon">
              <IconDatabase />
            </span>
            <span className="vg-engine__footer-text">
              DATA_STREAM:{' '}
              <span className="vg-engine__footer-status--encrypted">
                ENCRYPTED
              </span>
            </span>
          </div>
        </div>
        <div className="vg-engine__footer-right">
          <span className="vg-engine__footer-version">
            Internal Reference Achilles-v3.0.12-Alpha
          </span>
          <button className="vg-engine__export-btn">
            Export Logic Map
            <IconDownload />
          </button>
        </div>
      </footer>
    </section>
  );
}
