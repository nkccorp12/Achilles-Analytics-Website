import { useState } from 'react';
import './UseCases.css';

/* ==========================================================================
   USE CASES — Operational Intelligence in Action
   Tactical Grid Design System
   ========================================================================== */

// --- Inline SVG Icons ---

const IconWarehouse = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <path d="M3 21V8l9-5 9 5v13" />
    <path d="M9 21v-6h6v6" />
    <path d="M3 8l9 5 9-5" />
  </svg>
);

const IconShip = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <path d="M2 20l.8-2.2C3.2 16.8 4.2 16 5.3 16h13.4c1.1 0 2.1.8 2.5 1.8L22 20" />
    <path d="M4 16V8a2 2 0 012-2h12a2 2 0 012 2v8" />
    <path d="M12 6V2" />
    <path d="M8 12h8" />
  </svg>
);

const IconInfrastructure = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
    <path d="M12 22V12" />
    <path d="M2 7l10 5 10-5" />
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" opacity="0.4" />
  </svg>
);


// --- Warehouse Network SVG Visualization ---

function WarehouseNetworkSVG() {
  return (
    <svg
      className="vg-usecase__showcase-svg"
      viewBox="0 0 360 280"
      fill="none"
    >
      {/* Connection lines (animated dashes) */}
      <line x1="180" y1="60" x2="80" y2="140" className="vg-usecase__svg-connection" />
      <line x1="180" y1="60" x2="280" y2="140" className="vg-usecase__svg-connection" />
      <line x1="80" y1="140" x2="140" y2="220" className="vg-usecase__svg-connection" />
      <line x1="280" y1="140" x2="220" y2="220" className="vg-usecase__svg-connection" />
      <line x1="80" y1="140" x2="280" y2="140" className="vg-usecase__svg-connection" />
      <line x1="140" y1="220" x2="220" y2="220" className="vg-usecase__svg-connection" />

      {/* Hub node (top center) — active/highlighted */}
      <circle cx="180" cy="60" r="18" className="vg-usecase__svg-node--active" />
      <circle cx="180" cy="60" r="5" className="vg-usecase__svg-node-dot" />
      <text x="180" y="42" textAnchor="middle" className="vg-usecase__svg-label--active">
        HUB-01
      </text>

      {/* Leverage point badge */}
      <rect x="200" y="50" width="80" height="18" rx="2" fill="rgba(188, 255, 47, 0.12)" stroke="rgba(188, 255, 47, 0.3)" strokeWidth="1" />
      <text x="240" y="62" textAnchor="middle" className="vg-usecase__svg-badge">
        LEVERAGE PT
      </text>

      {/* Warehouse node (left) */}
      <circle cx="80" cy="140" r="14" className="vg-usecase__svg-node" />
      <circle cx="80" cy="140" r="3" fill="rgba(255,255,255,0.4)" />
      <text x="80" y="165" textAnchor="middle" className="vg-usecase__svg-label">
        WH-WEST
      </text>

      {/* Warehouse node (right) */}
      <circle cx="280" cy="140" r="14" className="vg-usecase__svg-node" />
      <circle cx="280" cy="140" r="3" fill="rgba(255,255,255,0.4)" />
      <text x="280" y="165" textAnchor="middle" className="vg-usecase__svg-label">
        WH-EAST
      </text>

      {/* Distribution node (bottom left) */}
      <circle cx="140" cy="220" r="12" className="vg-usecase__svg-node" />
      <circle cx="140" cy="220" r="3" fill="rgba(255,255,255,0.4)" />
      <text x="140" y="243" textAnchor="middle" className="vg-usecase__svg-label">
        DIST-A
      </text>

      {/* Distribution node (bottom right) */}
      <circle cx="220" cy="220" r="12" className="vg-usecase__svg-node" />
      <circle cx="220" cy="220" r="3" fill="rgba(255,255,255,0.4)" />
      <text x="220" y="243" textAnchor="middle" className="vg-usecase__svg-label">
        DIST-B
      </text>
    </svg>
  );
}


// ==========================================================================
// MAIN COMPONENT
// ==========================================================================

export default function UseCases() {
  const [showcaseActive, setShowcaseActive] = useState(false);
  const [maritimeActive, setMaritimeActive] = useState(false);
  const [infraActive, setInfraActive] = useState(false);

  return (
    <section className="vg__section vg-usecase" id="use-cases">
      {/* Section Label */}
      <div className="vg__section-label">// USE CASES</div>

      {/* Title Block */}
      <div className="vg-usecase__title-block">
        <h2 className="vg-usecase__headline">
          Operational Intelligence in Action
        </h2>
        <p className="vg-usecase__description">
          From warehouse floors to open waters — Achilles adapts to any
          operational domain where structured foresight creates decisive
          advantage.
        </p>
      </div>

      {/* ================================================================
          SHOWCASE: Warehouse Logistics
          ================================================================ */}
      <div
        className={`vg-usecase__showcase${showcaseActive ? ' vg-usecase__showcase--active' : ''}`}
        style={{ '--hover-bg': "url('/warehouse.png')" }}
        onClick={() => setShowcaseActive(!showcaseActive)}
      >
        {/* Left: Content */}
        <div className="vg-usecase__showcase-content">
          <div className="vg-usecase__showcase-tag">
            <span className="vg-usecase__showcase-tag-dot" />
            Featured Deployment
          </div>
          <h3 className="vg-usecase__showcase-title">
            Warehouse &amp; Distribution Logistics
          </h3>
          <p className="vg-usecase__showcase-text">
            Real-time visibility into multi-site warehouse operations. Impact
            analysis detects cascading delays before they propagate through the
            supply chain. Vulnerability scanning surfaces single-points-of-failure
            in routing topology.
          </p>
          <div className="vg-usecase__metrics">
            <div className="vg-usecase__metric">
              <span className="vg-usecase__metric-value">96.3%</span>
              <span className="vg-usecase__metric-label">Delay Prediction</span>
            </div>
            <div className="vg-usecase__metric">
              <span className="vg-usecase__metric-value">&minus;41%</span>
              <span className="vg-usecase__metric-label">Downtime</span>
            </div>
            <div className="vg-usecase__metric">
              <span className="vg-usecase__metric-value">+28%</span>
              <span className="vg-usecase__metric-label">Route Efficiency</span>
            </div>
          </div>
        </div>

        {/* Right: Visualization */}
        <div className="vg-usecase__showcase-visual">
          <div className="vg-usecase__showcase-glow" />
          <WarehouseNetworkSVG />
        </div>
      </div>

      {/* ================================================================
          SMALL CARDS: Maritime + Infrastructure
          ================================================================ */}
      <div className="vg-usecase__cards">
        {/* Maritime Supply Chain */}
        <div
          className={`vg-usecase__card vg-usecase__card--maritime${maritimeActive ? ' vg-usecase__card--active' : ''}`}
          onClick={() => setMaritimeActive(!maritimeActive)}
        >
          <div className="vg-usecase__card-header">
            <div className="vg-usecase__card-icon">
              <IconShip />
            </div>
            <span className="vg-usecase__card-tag">OSINT + Crisis Map</span>
          </div>
          <h4 className="vg-usecase__card-title">
            Maritime Supply Chain Monitoring
          </h4>
          <p className="vg-usecase__card-text">
            Tracking global shipping routes with anomaly detection on port
            congestion, weather disruptions, and geopolitical risk zones.
            OSINT-fed intelligence provides early warning on route deviations
            and cargo exposure.
          </p>
          <div className="vg-usecase__card-modules">
            <span className="vg-usecase__card-module">Crisis Map</span>
            <span className="vg-usecase__card-module">News Hub</span>
            <span className="vg-usecase__card-module">Impact Engine</span>
          </div>
        </div>

        {/* Critical Infrastructure */}
        <div
          className={`vg-usecase__card vg-usecase__card--infra${infraActive ? ' vg-usecase__card--active' : ''}`}
          onClick={() => setInfraActive(!infraActive)}
        >
          <div className="vg-usecase__card-header">
            <div className="vg-usecase__card-icon">
              <IconInfrastructure />
            </div>
            <span className="vg-usecase__card-tag">AI Council + Twin</span>
          </div>
          <h4 className="vg-usecase__card-title">
            Critical Infrastructure Protection
          </h4>
          <p className="vg-usecase__card-text">
            Continuous vulnerability assessment of energy grids, telecom
            networks, and transportation hubs. AI Council debate surfaces
            blind spots in resilience planning that static audits miss.
          </p>
          <div className="vg-usecase__card-modules">
            <span className="vg-usecase__card-module">Digital Twin</span>
            <span className="vg-usecase__card-module">AI Council</span>
            <span className="vg-usecase__card-module">BIAS Control</span>
          </div>
        </div>
      </div>
    </section>
  );
}
