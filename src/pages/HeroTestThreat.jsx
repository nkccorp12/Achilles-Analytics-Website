import React, { useEffect, useMemo, useRef, useState } from 'react';
import './LandingPage.css';
import './HeroTestThreat.css';

/* ======================================================================
   HERO TEST — LIVE THREAT MAP
   Right side of hero shows a static low-poly world map with pulsing
   hotspots, animated incident arcs, a ticking incident counter and a
   slow oscillating pan. Hero copy + CTAs sit on the left half.
   ====================================================================== */

// Approximate Mercator-projected coords for known crisis regions.
// viewBox is 0 0 1000 500. Source: rough lat/lon → x = (lon+180)/360 * 1000,
// y = (90-lat)/180 * 500 (good enough for a stylised map).
const HOTSPOTS = [
  { id: 'ukr', label: 'Ukraine',        x: 600, y: 165 },
  { id: 'gza', label: 'Gaza',           x: 595, y: 210 },
  { id: 'syr', label: 'Syria',          x: 605, y: 195 },
  { id: 'yem', label: 'Yemen',          x: 625, y: 235 },
  { id: 'sud', label: 'Sudan',          x: 580, y: 245 },
  { id: 'eth', label: 'Ethiopia',       x: 600, y: 255 },
  { id: 'mli', label: 'Mali',           x: 495, y: 240 },
  { id: 'cog', label: 'DRC',            x: 555, y: 275 },
  { id: 'mmr', label: 'Myanmar',        x: 760, y: 230 },
  { id: 'afg', label: 'Afghanistan',    x: 680, y: 195 },
  { id: 'hti', label: 'Haiti',          x: 305, y: 230 },
  { id: 'ven', label: 'Venezuela',      x: 320, y: 265 },
];

// Pre-computed arc candidates between hotspots (random subset shown live).
function buildArcCandidates(spots) {
  const arcs = [];
  for (let i = 0; i < spots.length; i++) {
    for (let j = i + 1; j < spots.length; j++) {
      arcs.push([spots[i], spots[j]]);
    }
  }
  return arcs;
}

function arcPath(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  // Curve up away from straight line
  const nx = -dy / (dist || 1);
  const ny = dx / (dist || 1);
  const lift = Math.min(120, dist * 0.35);
  const cx = mx + nx * lift;
  const cy = my - Math.abs(ny * lift) - 8;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const ARC_LIFETIME_MS = 2600;
const ARC_SPAWN_INTERVAL_MS = 700;
const COUNTER_TICK_MS = 800;
const COUNTER_START = 4237;

export default function HeroTestThreat() {
  const reduced = useMemo(prefersReducedMotion, []);
  const [count, setCount] = useState(COUNTER_START);
  const [arcs, setArcs] = useState([]);
  const arcCandidates = useMemo(() => buildArcCandidates(HOTSPOTS), []);
  const arcIdRef = useRef(0);

  // Counter ticker
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setCount((c) => c + 1), COUNTER_TICK_MS);
    return () => clearInterval(id);
  }, [reduced]);

  // Arc spawner — keep ~3-4 alive at once
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const timers = [];

    function spawn() {
      if (cancelled) return;
      const pair = arcCandidates[Math.floor(Math.random() * arcCandidates.length)];
      const id = ++arcIdRef.current;
      const arc = {
        id,
        d: arcPath(pair[0], pair[1]),
      };
      setArcs((prev) => {
        // cap at 5 just in case
        const next = [...prev, arc];
        return next.length > 5 ? next.slice(next.length - 5) : next;
      });
      const removeT = setTimeout(() => {
        setArcs((prev) => prev.filter((a) => a.id !== id));
      }, ARC_LIFETIME_MS);
      timers.push(removeT);
    }

    // seed a couple immediately so map isn't empty on first paint
    spawn();
    const seed1 = setTimeout(spawn, 250);
    const seed2 = setTimeout(spawn, 500);
    timers.push(seed1, seed2);

    const interval = setInterval(spawn, ARC_SPAWN_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [arcCandidates, reduced]);

  return (
    <div className={`htthreat${reduced ? ' htthreat--reduced' : ''}`}>
      {/* Header (LandingPage.css supplies neu-header styles) */}
      <header className="neu-header neu-header--visible">
        <div className="neu-header__inner">
          <a href="/" className="neu-header__wordmark" style={{ textDecoration: 'none' }}>
            <span>ACHILLES</span> <span className="neu-header__wordmark-sub">ANALYTICS</span>
          </a>
          <nav className="neu-header__nav">
            <a href="/hero-test" className="neu-header__link">/ HERO TESTS</a>
          </nav>
        </div>
      </header>

      <section className="htthreat__hero">
        {/* LEFT — copy */}
        <div className="htthreat__copy">
          <p className="htthreat__eyebrow">INTEL OS · v0.3</p>
          <h1 className="htthreat__headline">
            Make the consequences <em>visible</em>, before they occur.
          </h1>
          <p className="htthreat__sub">
            We apply OSINT methodologies to turn fragmented data into structured
            intelligence that exposes blind spots before they become consequences.
          </p>
          <div className="htthreat__ctas">
            <a href="#access" className="htthreat__cta htthreat__cta--primary">Access Platform</a>
            <a href="#reach" className="htthreat__cta htthreat__cta--secondary">Reach Out</a>
          </div>
        </div>

        {/* RIGHT — live threat map */}
        <div className="htthreat__map" aria-label="Live threat map (decorative)">
          <div className="htthreat__live">
            <span className="htthreat__live-dot" aria-hidden="true" />
            <span className="htthreat__live-text">LIVE</span>
          </div>

          <div className="htthreat__counter" aria-live="polite">
            <span className="htthreat__counter-label">INCIDENTS DETECTED</span>
            <span className="htthreat__counter-value">
              {count.toLocaleString('en-US')}
              <span className="htthreat__counter-arrow" aria-hidden="true">↑</span>
            </span>
          </div>

          <div className="htthreat__pan">
            <svg
              className="htthreat__svg"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-hidden="true"
            >
              {/* Soft grid backdrop */}
              <defs>
                <pattern id="htthreat-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(188,255,47,0.06)" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="htthreat-hot" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF4444" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FF4444" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect x="0" y="0" width="1000" height="500" fill="url(#htthreat-grid)" />

              {/* Stylised low-poly continent silhouettes (simplified, not geographic) */}
              <g className="htthreat__continents" fill="none" stroke="#BCFF2F" strokeOpacity="0.45" strokeWidth="1.1" strokeLinejoin="round">
                {/* North America */}
                <path d="M 120 110 L 180 95 L 240 100 L 290 130 L 305 175 L 280 215 L 250 245 L 215 260 L 195 245 L 175 230 L 150 235 L 130 215 L 110 185 L 100 150 Z" />
                {/* Greenland */}
                <path d="M 360 90 L 410 85 L 425 110 L 415 140 L 385 145 L 365 125 Z" />
                {/* South America */}
                <path d="M 280 270 L 320 255 L 355 280 L 365 320 L 345 370 L 325 410 L 305 440 L 290 425 L 275 380 L 270 330 Z" />
                {/* Europe */}
                <path d="M 470 130 L 510 120 L 545 130 L 565 145 L 555 170 L 525 180 L 495 175 L 475 165 L 465 150 Z" />
                {/* Africa */}
                <path d="M 495 195 L 540 195 L 580 215 L 605 250 L 615 295 L 600 335 L 575 365 L 555 360 L 535 330 L 515 290 L 500 250 L 490 220 Z" />
                {/* Middle East / Arabia */}
                <path d="M 590 200 L 630 200 L 650 225 L 645 255 L 620 265 L 605 250 L 595 225 Z" />
                {/* Asia (broad) */}
                <path d="M 575 110 L 640 100 L 720 110 L 800 125 L 850 145 L 870 175 L 850 200 L 810 215 L 770 215 L 740 225 L 705 215 L 670 200 L 640 185 L 610 175 L 590 160 L 580 140 Z" />
                {/* India */}
                <path d="M 705 215 L 730 220 L 745 240 L 740 265 L 720 270 L 705 250 Z" />
                {/* SE Asia */}
                <path d="M 770 235 L 805 240 L 830 260 L 815 285 L 790 290 L 775 270 Z" />
                {/* Indonesia */}
                <path d="M 800 290 L 845 295 L 870 305 L 855 320 L 815 320 L 795 310 Z" />
                {/* Australia */}
                <path d="M 820 340 L 880 340 L 905 365 L 895 395 L 855 410 L 820 395 L 810 370 Z" />
                {/* New Zealand */}
                <path d="M 920 405 L 935 415 L 930 435 L 915 425 Z" />
                {/* Iceland / UK accent dots */}
                <path d="M 455 115 L 470 110 L 478 122 L 465 128 Z" />
                <path d="M 460 145 L 472 145 L 475 158 L 462 160 Z" />
                {/* Japan accent */}
                <path d="M 855 165 L 870 170 L 875 190 L 862 192 Z" />
              </g>

              {/* Faint country graticule lines */}
              <g stroke="#BCFF2F" strokeOpacity="0.08" strokeWidth="0.6">
                <line x1="0" y1="250" x2="1000" y2="250" />
                <line x1="500" y1="0" x2="500" y2="500" />
              </g>

              {/* Active arcs */}
              <g className="htthreat__arcs" fill="none" stroke="#BCFF2F" strokeWidth="1.4" strokeLinecap="round">
                {arcs.map((a) => (
                  <path
                    key={a.id}
                    className="htthreat__arc"
                    d={a.d}
                  />
                ))}
              </g>

              {/* Hotspots */}
              <g className="htthreat__hotspots">
                {HOTSPOTS.map((h, i) => (
                  <g key={h.id} transform={`translate(${h.x} ${h.y})`}>
                    <circle
                      className="htthreat__pulse"
                      r="4"
                      fill="none"
                      stroke="#FF4444"
                      strokeWidth="1.4"
                      style={{ animationDelay: `${(i * 0.31) % 2.4}s` }}
                    />
                    <circle
                      className="htthreat__core"
                      r="2.2"
                      fill="#FF4444"
                      style={{ animationDelay: `${(i * 0.17) % 1.6}s` }}
                    />
                  </g>
                ))}
              </g>
            </svg>
          </div>

          {/* Corner brackets to frame the map */}
          <span className="htthreat__bracket htthreat__bracket--tl" aria-hidden="true" />
          <span className="htthreat__bracket htthreat__bracket--tr" aria-hidden="true" />
          <span className="htthreat__bracket htthreat__bracket--bl" aria-hidden="true" />
          <span className="htthreat__bracket htthreat__bracket--br" aria-hidden="true" />
        </div>
      </section>
    </div>
  );
}
