import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Testing2B.css';

/* ======================================================================
   TESTING 2B — RADIAL CONSTELLATION
   One ACHILLES core. Six instruments. War-room HUD topology.
   ====================================================================== */

// ---------- Inline SVG Module Icons ----------------------------------

const IconCrisisMap = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" width="28" height="28">
    <circle cx="16" cy="16" r="12" />
    <path d="M4 16h24M16 4a18 18 0 014 12 18 18 0 01-4 12 18 18 0 01-4-12A18 18 0 0116 4z" />
    <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
  </svg>
);

const IconNewsHub = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" width="28" height="28">
    <circle cx="8" cy="24" r="2.4" fill="currentColor" stroke="none" />
    <path d="M5 6v3.6a16.4 16.4 0 0116.4 16.4H25A19 19 0 005 6z" />
    <path d="M5 13v3.6A9.4 9.4 0 0114.4 26H18A12.8 12.8 0 005 13z" />
  </svg>
);

const IconDigitalTwin = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" width="28" height="28">
    <circle cx="16" cy="16" r="3" />
    <circle cx="6" cy="8" r="2" />
    <circle cx="26" cy="8" r="2" />
    <circle cx="6" cy="24" r="2" />
    <circle cx="26" cy="24" r="2" />
    <path d="M8 9l5.5 4.5M24 9l-5.5 4.5M8 23l5.5-4.5M24 23l-5.5-4.5" />
  </svg>
);

const IconBias = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" width="28" height="28">
    <path d="M16 4v24" />
    <path d="M5 9l11-5 11 5" />
    <path d="M5 9l-1.5 8h8L10 9" />
    <path d="M27 9l-1.5 8h-8L22 9" />
  </svg>
);

const IconCouncil = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" width="28" height="28">
    <circle cx="16" cy="9" r="3.5" />
    <circle cx="7" cy="12" r="3" />
    <circle cx="25" cy="12" r="3" />
    <path d="M10 19c-3 0-6 1.6-6 4.5V26h24v-2.5c0-2.9-3-4.5-6-4.5" />
    <path d="M11 18c0-2 2-3.5 5-3.5s5 1.5 5 3.5" />
  </svg>
);

const IconReport = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" width="28" height="28">
    <path d="M8 3h12l6 6v18a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z" />
    <path d="M19 3v7h7" />
    <path d="M10 17h12M10 21h9M10 25h6" />
  </svg>
);

// ---------- Module configuration -------------------------------------
// Angles in degrees, 0deg = right, going clockwise (we negate for CSS-ish layout)
// Layout target:
//   EYES (perception)  — upper arc       : 240deg (upper-left), 300deg (upper-right)
//   BRAIN (processing) — middle horizon  : 180deg (left),       0deg   (right)
//   VOICE (decision)   — lower arc       : 120deg (lower-left), 60deg  (lower-right)
const MODULES = [
  { id: 'crisis-map', name: 'Crisis Map',           tag: 'EYES',  group: 'perception', angle: 240, Icon: IconCrisisMap,  desc: 'Geo-tactical heatmap of live conflict zones.' },
  { id: 'news-hub',   name: 'News Hub',             tag: 'EYES',  group: 'perception', angle: 300, Icon: IconNewsHub,    desc: 'OSINT stream aggregation across all signal types.' },
  { id: 'twin',       name: 'Digital Twin',         tag: 'BRAIN', group: 'processing', angle: 180, Icon: IconDigitalTwin, desc: 'Adversary network simulation in real time.' },
  { id: 'bias',       name: 'BIAS Control',         tag: 'BRAIN', group: 'processing', angle: 0,   Icon: IconBias,       desc: 'Source veracity and stance scoring engine.' },
  { id: 'council',    name: 'AI Strategic Council', tag: 'VOICE', group: 'decision',   angle: 120, Icon: IconCouncil,    desc: 'Multi-agent deliberation on strategic options.' },
  { id: 'report',     name: 'Intel Report Synth.',  tag: 'VOICE', group: 'decision',   angle: 60,  Icon: IconReport,     desc: 'Automated executive briefing generation.' },
];

// Convert polar to cartesian on a unit circle (centered at 0.5,0.5)
// We use: x = 0.5 + r*cos(theta_radians) ; y = 0.5 - r*sin(theta_radians)
// So angle 90 = top, 270 = bottom, 0 = right, 180 = left.
function polar(angleDeg, radius) {
  const t = (angleDeg * Math.PI) / 180;
  return {
    x: 0.5 + radius * Math.cos(t),
    y: 0.5 - radius * Math.sin(t),
  };
}

export default function Testing2B() {
  const [hoverId, setHoverId] = useState(null);
  const [pulse, setPulse] = useState(0);
  const stageRef = useRef(null);

  // Drive a slow heartbeat counter for staggered beam pulses
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 1000), 400);
    return () => clearInterval(id);
  }, []);

  // Geometry: orbit at 38% of stage radius, core at 14%
  const ORBIT_R = 0.38;
  const CORE_R = 0.14;

  const positions = useMemo(
    () => MODULES.map((m) => ({ ...m, pos: polar(m.angle, ORBIT_R) })),
    [],
  );

  return (
    <div className="t2b neu">
      {/* Fixed header */}
      <header className="neu-header neu-header--visible">
        <div className="neu-header__inner">
          <div className="neu-header__wordmark">
            <span>A</span>CHILLES <span className="neu-header__wordmark-sub">Analytics</span>
          </div>
          <nav className="neu-header__nav">
            <a href="/" className="neu-header__link">Home</a>
            <a href="/testing2" className="neu-header__link">Back to Testing 2</a>
          </nav>
        </div>
      </header>

      {/* Hero label + heading */}
      <section className="t2b__hero">
        <div className="t2b__label">// RADIAL CONSTELLATION</div>
        <h1 className="t2b__heading">
          One core. <span className="t2b__heading-accent">Six instruments.</span>
        </h1>
        <p className="t2b__sub">
          The Achilles Intelligence Stack rendered as a single living system —
          perception above, processing across the horizon, decision below.
          Every module orbits the same core.
        </p>
      </section>

      {/* The constellation stage */}
      <section className="t2b__stage-wrap">
        <div className="t2b__stage" ref={stageRef}>
          {/* SVG layer: rings + beams + particles, all in one coordinate space */}
          <svg
            className="t2b__svg"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* Concentric radar rings */}
            <g className="t2b__rings">
              {[0.18, 0.28, 0.38, 0.46].map((r, i) => (
                <circle
                  key={i}
                  cx="500"
                  cy="500"
                  r={r * 1000}
                  className={`t2b__ring t2b__ring--${i}`}
                />
              ))}
              {/* Crosshair axes */}
              <line x1="40" y1="500" x2="960" y2="500" className="t2b__axis" />
              <line x1="500" y1="40" x2="500" y2="960" className="t2b__axis" />
              {/* Diagonal tick marks */}
              <g className="t2b__ticks">
                {Array.from({ length: 24 }).map((_, i) => {
                  const a = (i * 15 * Math.PI) / 180;
                  const x1 = 500 + Math.cos(a) * 460;
                  const y1 = 500 - Math.sin(a) * 460;
                  const x2 = 500 + Math.cos(a) * 475;
                  const y2 = 500 - Math.sin(a) * 475;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                })}
              </g>
              {/* Sweep wedge */}
              <g className="t2b__sweep" style={{ transformOrigin: '500px 500px' }}>
                <defs>
                  <linearGradient id="t2bSweep" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(188,255,47,0)" />
                    <stop offset="100%" stopColor="rgba(188,255,47,0.22)" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 500 500 L ${500 + 460} 500 A 460 460 0 0 0 ${
                    500 + 460 * Math.cos((Math.PI * 35) / 180)
                  } ${500 - 460 * Math.sin((Math.PI * 35) / 180)} Z`}
                  fill="url(#t2bSweep)"
                />
              </g>
            </g>

            {/* Beams from core to each module */}
            <g className="t2b__beams">
              {positions.map((m, i) => {
                const cx = 500;
                const cy = 500;
                const x = m.pos.x * 1000;
                const y = m.pos.y * 1000;
                // Beam start at edge of core, end at module center
                const dx = x - cx;
                const dy = y - cy;
                const len = Math.hypot(dx, dy);
                const ux = dx / len;
                const uy = dy / len;
                const startX = cx + ux * (CORE_R * 1000);
                const startY = cy + uy * (CORE_R * 1000);
                const endX = x - ux * 70;
                const endY = y - uy * 70;
                const isHot = hoverId === m.id;
                return (
                  <g key={m.id} className={`t2b__beam-group${isHot ? ' is-hot' : ''}`}>
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      className="t2b__beam"
                    />
                    {/* Pulse traveling toward core */}
                    <circle
                      r={isHot ? 6 : 4}
                      className="t2b__beam-pulse"
                      style={{
                        animationDelay: `${i * 0.5}s`,
                        offsetPath: `path('M ${endX} ${endY} L ${startX} ${startY}')`,
                        // Fallback for browsers without offsetPath: use CSS keyframes per-beam
                      }}
                    />
                    {/* Static endpoint dot at module side */}
                    <circle
                      cx={endX}
                      cy={endY}
                      r="3"
                      className="t2b__beam-cap"
                    />
                  </g>
                );
              })}
            </g>

            {/* Core glyph */}
            <g className="t2b__core-svg">
              <circle cx="500" cy="500" r={CORE_R * 1000} className="t2b__core-disk" />
              <circle cx="500" cy="500" r={CORE_R * 1000 - 8} className="t2b__core-inner" />
              <circle cx="500" cy="500" r={CORE_R * 1000 + 14} className="t2b__core-halo" />
              <circle cx="500" cy="500" r={CORE_R * 1000 + 28} className="t2b__core-halo t2b__core-halo--2" />
              {/* Crosshair inside core */}
              <line x1="500" y1={500 - CORE_R * 1000 + 4} x2="500" y2={500 + CORE_R * 1000 - 4} className="t2b__core-cross" />
              <line x1={500 - CORE_R * 1000 + 4} y1="500" x2={500 + CORE_R * 1000 - 4} y2="500" className="t2b__core-cross" />
            </g>
          </svg>

          {/* HTML overlay: core label + module tiles. Positioned in % so they
              align perfectly with the SVG viewBox at any size. */}
          <div className="t2b__core-label" style={{ left: '50%', top: '50%' }}>
            <div className="t2b__core-letter">A</div>
            <div className="t2b__core-meta">ACHILLES CORE</div>
            <div className="t2b__core-status">
              <span className="t2b__core-dot" />
              SYS ONLINE · {(pulse % 100).toString().padStart(2, '0')}
            </div>
          </div>

          {positions.map((m) => {
            const { Icon } = m;
            const left = `${m.pos.x * 100}%`;
            const top = `${m.pos.y * 100}%`;
            const isHot = hoverId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                className={`t2b__node t2b__node--${m.group}${isHot ? ' is-hot' : ''}`}
                style={{ left, top }}
                onMouseEnter={() => setHoverId(m.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(m.id)}
                onBlur={() => setHoverId(null)}
                aria-label={`${m.name} — ${m.tag}`}
              >
                <span className="t2b__node-frame">
                  <span className="t2b__node-corner t2b__node-corner--tl" />
                  <span className="t2b__node-corner t2b__node-corner--tr" />
                  <span className="t2b__node-corner t2b__node-corner--bl" />
                  <span className="t2b__node-corner t2b__node-corner--br" />
                  <span className="t2b__node-icon">
                    <Icon />
                  </span>
                </span>
                <span className="t2b__node-name">{m.name}</span>
                <span className="t2b__node-tag">// {m.tag}</span>
              </button>
            );
          })}

          {/* Group bands — semantic labels for the three cognitive zones */}
          <div className="t2b__band t2b__band--top">// PERCEPTION · THE EYES</div>
          <div className="t2b__band t2b__band--mid-l">// PROCESSING</div>
          <div className="t2b__band t2b__band--mid-r">THE BRAIN //</div>
          <div className="t2b__band t2b__band--bot">// DECISION · THE VOICE</div>

          {/* Corner readouts */}
          <div className="t2b__readout t2b__readout--tl">
            <div>SYS · ACHILLES STACK</div>
            <div className="t2b__readout-line">UPLINK · STABLE</div>
            <div className="t2b__readout-line">NODES · 06/06 ONLINE</div>
          </div>
          <div className="t2b__readout t2b__readout--tr">
            <div>SECTOR · GLOBAL</div>
            <div className="t2b__readout-line">SWEEP · ACTIVE</div>
            <div className="t2b__readout-line">TICK · {pulse.toString().padStart(4, '0')}</div>
          </div>
          <div className="t2b__readout t2b__readout--bl">
            <div>DOCTRINE · OSINT-FIRST</div>
            <div className="t2b__readout-line">FLOW · INWARD</div>
          </div>
          <div className="t2b__readout t2b__readout--br">
            <div>{hoverId ? `FOCUS · ${hoverId.toUpperCase()}` : 'FOCUS · IDLE'}</div>
            <div className="t2b__readout-line">
              {hoverId
                ? positions.find((p) => p.id === hoverId)?.desc
                : 'Hover any node to focus its beam.'}
            </div>
          </div>
        </div>
      </section>

      {/* Legend strip */}
      <section className="t2b__legend">
        <div className="t2b__legend-row">
          <span className="t2b__legend-pip t2b__legend-pip--perception" />
          <span className="t2b__legend-text">PERCEPTION — what the system sees</span>
        </div>
        <div className="t2b__legend-row">
          <span className="t2b__legend-pip t2b__legend-pip--processing" />
          <span className="t2b__legend-text">PROCESSING — how it reasons</span>
        </div>
        <div className="t2b__legend-row">
          <span className="t2b__legend-pip t2b__legend-pip--decision" />
          <span className="t2b__legend-text">DECISION — what it says back</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="t2b__footer">
        <a href="/testing2" className="t2b__back">&larr; BACK TO TESTING 2</a>
        <div className="t2b__footer-meta">// VARIANT B · RADIAL CONSTELLATION</div>
      </footer>
    </div>
  );
}
