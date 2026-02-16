import React, { useEffect, useRef, useState } from 'react';
import DigitalTwinViz from '../components/DigitalTwinViz';
import './IntelStack.css';

/* ======================================================================
   INTELLIGENCE STACK — Full Interactive Page Section
   Converted from Teil3 Tailwind template to Tactical Grid design system
   ====================================================================== */

// --- Inline SVG Icons ---

const IconExplore = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <circle cx="12" cy="12" r="10" />
    <path d="M14.5 9.5l-5 2 2 5 5-2z" fill="currentColor" stroke="none" />
  </svg>
);

const IconRssFeed = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <circle cx="6.18" cy="17.82" r="2.18" />
    <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56z" />
    <path d="M4 10.1v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
  </svg>
);

const IconHub = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <circle cx="12" cy="12" r="3" />
    <circle cx="4" cy="6" r="2" />
    <circle cx="20" cy="6" r="2" />
    <circle cx="4" cy="18" r="2" />
    <circle cx="20" cy="18" r="2" />
    <path d="M6 7l4 3M18 7l-4 3M6 17l4-3M18 17l-4-3" />
  </svg>
);

const IconBalance = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M12 3v18" />
    <path d="M4 7l8-4 8 4" />
    <path d="M4 7l-1 6h6L8 7" />
    <path d="M20 7l-1 6h-6l1-6" />
  </svg>
);

const IconGridView = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="8" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <rect x="13" y="13" width="8" height="8" rx="1" />
  </svg>
);

const IconGroups = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <circle cx="12" cy="7" r="3" />
    <circle cx="5" cy="9" r="2.5" />
    <circle cx="19" cy="9" r="2.5" />
    <path d="M8 14c-2.5 0-5 1.5-5 4v1h18v-1c0-2.5-2.5-4-5-4" />
    <path d="M9 13.5c0-1.5 1.3-3 3-3s3 1.5 3 3" />
  </svg>
);

const IconTactic = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M4 4h6v6H4zM14 4h6v6h-6zM9 14h6v6H9z" />
    <path d="M7 10v4h2M17 10v1c0 1.5-1 3-2 3h-1" />
  </svg>
);

const IconGavel = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M14.5 3.5l6 6-2 2-6-6z" />
    <path d="M9 9l-5 5 2 2 5-5" />
    <path d="M11 11l-4 4" />
    <path d="M4 20h16" />
  </svg>
);

const IconLightbulb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M9 21h6M12 3a6 6 0 00-4 10.5V17h8v-3.5A6 6 0 0012 3z" />
    <path d="M10 17h4" />
  </svg>
);

const IconDocument = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
    <path d="M6 2h9l5 5v15a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8M8 17h5" />
  </svg>
);

// OSINT Atlas icon set
const IconPublic = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10A15 15 0 0112 2z" />
  </svg>
);

const IconFingerprint = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <path d="M12 2a10 10 0 00-7 3M19 5a10 10 0 012 7" />
    <path d="M12 8a4 4 0 014 4v2" />
    <path d="M8 12a4 4 0 018 0v4" />
    <path d="M12 12v8" />
  </svg>
);

const IconTerminal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M6 10l4 2-4 2M12 16h4" />
  </svg>
);

const IconSatellite = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <circle cx="12" cy="12" r="2" />
    <path d="M7 17l-4 4M17 7l4-4" />
    <path d="M15.5 8.5l-7 7" />
    <path d="M10 2a8 8 0 0112 12" />
  </svg>
);

const IconShare = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
  </svg>
);

const IconPsychology = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <path d="M12 2a7 7 0 017 7c0 3-2 5-4 6v3h-6v-3c-2-1-4-3-4-6a7 7 0 017-7z" />
    <circle cx="10" cy="9" r="1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="9" r="1" fill="currentColor" stroke="none" />
    <path d="M9 22h6" />
  </svg>
);

const IconAccountTree = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" width="60" height="60">
    <circle cx="24" cy="8" r="4" />
    <circle cx="12" cy="24" r="4" />
    <circle cx="36" cy="24" r="4" />
    <circle cx="8" cy="40" r="4" />
    <circle cx="24" cy="40" r="4" />
    <circle cx="40" cy="40" r="4" />
    <path d="M24 12v4l-12 4M24 16l12 4M12 28v4l-4 4M12 32l12 4M36 28v4l4 4" />
  </svg>
);


// ======================================================================
// BIAS CONTROL — Animated news ticker with live meter updates
// ======================================================================

const BIAS_ITEMS = [
  { source: 'REUTERS', text: 'Egypt shuts Suez — global shipping halts.',              cred: 96, stance: 'CENTER',      left: 45, center: 20, right: 35 },
  { source: 'AL JAZ.', text: 'Cairo: "Sovereignty over our waterway."',                cred: 78, stance: 'CENTER-LEFT', left: 60, center: 10, right: 30 },
  { source: 'BBC',     text: 'Cape reroute — freight costs surge 340%.',               cred: 91, stance: 'CENTER',      left: 42, center: 18, right: 40 },
  { source: 'RT',      text: 'Western pressure drove Egypt to closure.',               cred: 28, stance: 'FAR-RIGHT',   left: 8,  center: 5,  right: 87 },
  { source: 'AP',      text: 'UN emergency session — no resolution on Suez.',          cred: 93, stance: 'NEUTRAL',     left: 38, center: 24, right: 38 },
  { source: 'AFP',     text: 'EU warns of food supply crisis within weeks.',           cred: 87, stance: 'CENTER',      left: 44, center: 16, right: 40 },
];

function BiasControl({ idx = 0, anim = false }) {
  const item = BIAS_ITEMS[idx];

  return (
    <div className="vg-istack__card">
      <div className="vg-istack__card-header">
        <span className="vg-istack__card-icon"><IconBalance /></span>
        <span className="vg-istack__card-label">BIAS Control</span>
      </div>
      <div className="vg-istack__bias-meters">
        <div className="vg-istack__meter">
          <div className="vg-istack__meter-header">
            <span>CREDIBILITY SCORE</span>
            <span className="vg-istack__meter-value">{item.cred}%</span>
          </div>
          <div className="vg-istack__meter-track">
            <div
              className={`vg-istack__meter-fill${item.cred < 50 ? ' vg-istack__meter-fill--low' : ''}`}
              style={{ width: `${item.cred}%`, transition: 'width 0.6s ease' }}
            />
          </div>
        </div>
        <div className="vg-istack__meter">
          <div className="vg-istack__meter-header">
            <span>POLITICAL STANCE</span>
            <span className="vg-istack__meter-value vg-istack__meter-value--muted">{item.stance}</span>
          </div>
          <div className="vg-istack__meter-track">
            <div className="vg-istack__meter-fill vg-istack__meter-fill--blue"  style={{ width: `${item.left}%`,   transition: 'width 0.6s ease' }} />
            <div className="vg-istack__meter-fill vg-istack__meter-fill--accent" style={{ width: `${item.center}%`, transition: 'width 0.6s ease' }} />
            <div className="vg-istack__meter-fill vg-istack__meter-fill--red"   style={{ width: `${item.right}%`,  transition: 'width 0.6s ease' }} />
          </div>
        </div>
      </div>
      <div className={`vg-istack__bias-ticker${anim ? ' vg-istack__bias-ticker--out' : ''}`}>
        <p className="vg-istack__bias-ticker-text">{item.text} <span className="vg-istack__bias-ticker-source">{item.source}</span></p>
      </div>
      <p className="vg-istack__card-desc">
        Automated stance detection and veracity scoring for incoming streams.
      </p>
    </div>
  );
}

// ======================================================================
// MAIN COMPONENT
// ======================================================================

export default function IntelStack() {
  const mapRef = useRef(null);
  const chatRef = useRef(null);
  const brainRef = useRef(null);

  // Shared step counter — drives both Digital Twin and BIAS Control
  const [biasIdx, setBiasIdx] = useState(0);
  const [biasAnim, setBiasAnim] = useState(false);
  const [reportPreviewActive, setReportPreviewActive] = useState(false);
  const [brainVpActive, setBrainVpActive] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    if (!isMobile) return;
    const el = brainRef.current;
    if (!el) return;
    const vpObs = new IntersectionObserver(
      ([entry]) => setBrainVpActive(entry.isIntersecting),
      { threshold: 0.4, rootMargin: '-15% 0px -15% 0px' }
    );
    vpObs.observe(el);
    return () => vpObs.disconnect();
  }, []);

  useEffect(() => {
    const el = brainRef.current;
    if (!el) return;
    let timeout;
    let idx = 0;
    let started = false;
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const INTERVAL = isMobile ? 2500 : 4000;
    const LAST_HOLD = isMobile ? 8000 : 14000;

    const tick = () => {
      const next = (idx + 1) % BIAS_ITEMS.length;
      setBiasAnim(true);
      setTimeout(() => {
        idx = next;
        setBiasIdx(next);
        setBiasAnim(false);
      }, 300);
      const isLast = next === BIAS_ITEMS.length - 1;
      timeout = setTimeout(tick, isLast ? LAST_HOLD : INTERVAL);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        timeout = setTimeout(tick, INTERVAL);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);

    return () => { clearTimeout(timeout); io.disconnect(); };
  }, []);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('vg-istack__map-placeholder--active');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('vg-istack__council-chat--active');
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="vg__section vg-istack" id="intel-stack">
      {/* Section Label */}
      <div className="vg__section-label">// INTELLIGENCE STACK</div>

      {/* Section Title */}
      <div className="vg-istack__title-block">
        <h2 className="vg-istack__headline">The Intelligence Stack</h2>
        <p className="vg-istack__description">
          A multi-layered ecosystem for global situational awareness, deep-brain analytical processing, and automated decision synthesis.
        </p>
      </div>

      {/* ================================================================
          GROUP A: THE EYES
          ================================================================ */}
      <div className="vg-istack__group">
        <div className="vg-istack__group-header">
          <div>
            <h3 className="vg-istack__group-title">Group A: Global Situational Awareness</h3>
            <p className="vg-istack__group-subtitle">&mdash; THE EYES</p>
          </div>
        </div>

        <div className="vg-istack__eyes-grid">
          {/* Crisis Map */}
          <div className="vg-istack__crisis-map">
            <div className="vg-istack__module-header">
              <div className="vg-istack__module-header-left">
                <span className="vg-istack__module-icon"><IconExplore /></span>
                <span className="vg-istack__module-label">Crisis Map v4.2</span>
              </div>
              <div className="vg-istack__module-header-right">
              </div>
            </div>
            <div className="vg-istack__map-area">
              {/* Map with camera pan animation */}
              <div ref={mapRef} className="vg-istack__map-placeholder" />
              {/* Heatmap gradient overlay */}
              <div className="vg-istack__map-heatmap" />
              {/* Alerts panel */}
              <div className="vg-istack__alerts-panel">
                <div className="vg-istack__alerts-title">ACTIVE ALERTS</div>
                <div className="vg-istack__alerts-list">
                  <div className="vg-istack__alert-row">
                    <span>Frontline Kherson</span>
                    <span className="vg-istack__alert-high">Crit</span>
                  </div>
                  <div className="vg-istack__alert-row">
                    <span>Energy Grid East</span>
                    <span className="vg-istack__alert-high">High</span>
                  </div>
                  <div className="vg-istack__alert-row">
                    <span>Supply Route Odesa</span>
                    <span className="vg-istack__alert-med">Med</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* News Hub */}
          <div className="vg-istack__news-hub">
            <div className="vg-istack__module-header">
              <div className="vg-istack__module-header-left">
                <span className="vg-istack__module-icon"><IconRssFeed /></span>
                <span className="vg-istack__module-label">OSINT News Hub</span>
              </div>
            </div>
            <div className="vg-istack__feed">
              <div className="vg-istack__feed-fade" />
              <div className="vg-istack__feed-items">
                <div className="vg-istack__feed-item vg-istack__feed-item--highlight">
                  <div className="vg-istack__feed-meta">REUTERS</div>
                  <p className="vg-istack__feed-text vg-istack__feed-text--bright">
                    Kherson shelling intensifies — civilian evac.
                  </p>
                </div>
                <div className="vg-istack__feed-item">
                  <div className="vg-istack__feed-meta">SIGINT</div>
                  <p className="vg-istack__feed-text">
                    Encrypted comms surge Zaporizhzhia axis.
                  </p>
                </div>
                <div className="vg-istack__feed-item vg-istack__feed-item--highlight">
                  <div className="vg-istack__feed-meta">GEOINT</div>
                  <p className="vg-istack__feed-text vg-istack__feed-text--bright">
                    Satellite confirms troop buildup Donbas.
                  </p>
                </div>
                <div className="vg-istack__feed-item">
                  <div className="vg-istack__feed-meta">AP</div>
                  <p className="vg-istack__feed-text">
                    Energy grid strike — Odesa blackout.
                  </p>
                </div>
                <div className="vg-istack__feed-item vg-istack__feed-item--highlight">
                  <div className="vg-istack__feed-meta">DARKWEB</div>
                  <p className="vg-istack__feed-text vg-istack__feed-text--bright">
                    Leaked docs — Wagner supply chain.
                  </p>
                </div>
                <div className="vg-istack__feed-item">
                  <div className="vg-istack__feed-meta">HUMINT</div>
                  <p className="vg-istack__feed-text">
                    Asset reports mobilization Crimea.
                  </p>
                </div>
                <div className="vg-istack__feed-item vg-istack__feed-item--highlight">
                  <div className="vg-istack__feed-meta">X-API</div>
                  <p className="vg-istack__feed-text vg-istack__feed-text--bright">
                    Disinfo campaign detected — 91% conf.
                  </p>
                </div>
                {/* Duplicate for seamless loop */}
                <div className="vg-istack__feed-item vg-istack__feed-item--highlight" aria-hidden="true">
                  <div className="vg-istack__feed-meta">REUTERS</div>
                  <p className="vg-istack__feed-text vg-istack__feed-text--bright">
                    Kherson shelling intensifies — civilian evac.
                  </p>
                </div>
                <div className="vg-istack__feed-item" aria-hidden="true">
                  <div className="vg-istack__feed-meta">SIGINT</div>
                  <p className="vg-istack__feed-text">
                    Encrypted comms surge Zaporizhzhia axis.
                  </p>
                </div>
                <div className="vg-istack__feed-item vg-istack__feed-item--highlight" aria-hidden="true">
                  <div className="vg-istack__feed-meta">GEOINT</div>
                  <p className="vg-istack__feed-text vg-istack__feed-text--bright">
                    Satellite confirms troop buildup Donbas.
                  </p>
                </div>
                <div className="vg-istack__feed-item" aria-hidden="true">
                  <div className="vg-istack__feed-meta">AP</div>
                  <p className="vg-istack__feed-text">
                    Energy grid strike — Odesa blackout.
                  </p>
                </div>
                <div className="vg-istack__feed-item vg-istack__feed-item--highlight" aria-hidden="true">
                  <div className="vg-istack__feed-meta">DARKWEB</div>
                  <p className="vg-istack__feed-text vg-istack__feed-text--bright">
                    Leaked docs — Wagner supply chain.
                  </p>
                </div>
                <div className="vg-istack__feed-item" aria-hidden="true">
                  <div className="vg-istack__feed-meta">HUMINT</div>
                  <p className="vg-istack__feed-text">
                    Asset reports mobilization Crimea.
                  </p>
                </div>
                <div className="vg-istack__feed-item vg-istack__feed-item--highlight" aria-hidden="true">
                  <div className="vg-istack__feed-meta">X-API</div>
                  <p className="vg-istack__feed-text vg-istack__feed-text--bright">
                    Disinfo campaign detected — 91% conf.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          GROUP B: THE BRAIN
          ================================================================ */}
      <div className="vg-istack__group">
        <div className="vg-istack__group-header">
          <div>
            <h3 className="vg-istack__group-title">Group B: Analytical Deep Dive</h3>
            <p className="vg-istack__group-subtitle">&mdash; THE BRAIN</p>
          </div>
        </div>

        <div className={`vg-istack__brain-grid${brainVpActive ? ' vg-istack__brain-grid--active' : ''}`} ref={brainRef}>
          {/* Digital Twin */}
          <div className="vg-istack__card">
            <div className="vg-istack__card-header">
              <span className="vg-istack__card-icon"><IconHub /></span>
              <span className="vg-istack__card-label">Digital Twin</span>
            </div>
            <div className="vg-istack__twin-visual">
              <DigitalTwinViz step={biasIdx} />
            </div>
            <p className="vg-istack__card-desc">
              Real-time 3D network relationship visualization mapping adversary connections.
            </p>
          </div>

          {/* BIAS Control */}
          <BiasControl idx={biasIdx} anim={biasAnim} />

          {/* OSINT Atlas */}
          <div className="vg-istack__card">
            <div className="vg-istack__card-header">
              <span className="vg-istack__card-icon"><IconGridView /></span>
              <span className="vg-istack__card-label">OSINT Atlas</span>
            </div>
            <div className="vg-istack__atlas-grid">
              <div className="vg-istack__atlas-cell" title="WEBINT — Public Web Intelligence"><IconPublic /></div>
              <div className="vg-istack__atlas-cell" title="CYBINT — Digital Forensics &amp; Fingerprinting"><IconFingerprint /></div>
              <div className="vg-istack__atlas-cell" title="TECHINT — Technical Infrastructure Analysis"><IconTerminal /></div>
              <div className="vg-istack__atlas-cell" title="GEOINT — Satellite &amp; Geospatial Intelligence"><IconSatellite /></div>
              <div className="vg-istack__atlas-cell" title="SOCMINT — Social Network Mapping"><IconShare /></div>
              <div className="vg-istack__atlas-cell" title="PSYINT — Behavioral &amp; Psychological Profiling"><IconPsychology /></div>
            </div>
            <p className="vg-istack__card-desc">
              Active tool orchestration for targeted intelligence gathering missions.
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================
          GROUP C: THE VOICE
          ================================================================ */}
      <div className="vg-istack__group vg-istack__group--last">
        <div className="vg-istack__group-header">
          <div>
            <h3 className="vg-istack__group-title">Group C: Decision Support</h3>
            <p className="vg-istack__group-subtitle">&mdash; THE VOICE</p>
          </div>
        </div>

        <div className="vg-istack__voice-grid">
          {/* AI Strategic Council */}
          <div className="vg-istack__council">
            <div className="vg-istack__council-header">
              <div className="vg-istack__module-header-left">
                <span className="vg-istack__module-icon"><IconGroups /></span>
                <span className="vg-istack__module-label">AI Strategic Council</span>
              </div>
              <span className="vg-istack__module-sub">Escape the Echo Chamber</span>
            </div>
            <div ref={chatRef} className="vg-istack__council-chat">
              {/* Persona: Strategist */}
              <div className="vg-istack__message vg-istack__message--anim" style={{ '--msg-delay': '0s' }}>
                <div className="vg-istack__avatar vg-istack__avatar--strategist">
                  <IconTactic />
                </div>
                <div className="vg-istack__message-body">
                  <div className="vg-istack__message-meta">
                    <span className="vg-istack__message-name">THE STRATEGIST</span>
                  </div>
                  <div className="vg-istack__bubble vg-istack__bubble--strategist">
                    Suez closure locks 12% of global freight. Reroute via Cape adds 14 days — activate alternate carriers now.
                  </div>
                </div>
              </div>

              {/* Persona: Cynic */}
              <div className="vg-istack__message vg-istack__message--anim" style={{ '--msg-delay': '1.8s' }}>
                <div className="vg-istack__avatar vg-istack__avatar--cynic">
                  <IconGavel />
                </div>
                <div className="vg-istack__message-body">
                  <div className="vg-istack__message-meta">
                    <span className="vg-istack__message-name">THE CYNIC</span>
                  </div>
                  <div className="vg-istack__bubble vg-istack__bubble--cynic">
                    Cape route doubles fuel cost. Insurance premiums already spiking — rerouting alone won't save the margin.
                  </div>
                </div>
              </div>

              {/* Persona: Optimist */}
              <div className="vg-istack__message vg-istack__message--anim" style={{ '--msg-delay': '3.6s' }}>
                <div className="vg-istack__avatar vg-istack__avatar--optimist">
                  <IconLightbulb />
                </div>
                <div className="vg-istack__message-body">
                  <div className="vg-istack__message-meta">
                    <span className="vg-istack__message-name">THE OPTIMIST</span>
                  </div>
                  <div className="vg-istack__bubble vg-istack__bubble--optimist">
                    Rail corridor through Turkey still open. Secure capacity now — competitors haven't moved yet.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intel Report Synthesis */}
          <div
            className={`vg-istack__report${reportPreviewActive ? ' vg-istack__report--active' : ''}`}
          >
            {/* Default content — hides on hover */}
            <div className="vg-istack__report-default">
              <div className="vg-istack__report-icon-wrap">
                <span className="vg-istack__report-icon"><IconDocument /></span>
                <div className="vg-istack__report-badge">PDF</div>
              </div>
              <h4 className="vg-istack__report-title">Intel Report Synthesis</h4>
              <p className="vg-istack__report-id">Automatic Generation: ID-8829-X</p>
              <p className="vg-istack__report-desc">
                Automated synthesis of raw data, OSINT streams, and Council debate into a boardroom-ready PDF briefing.
              </p>
            </div>
            {/* Preview content — shows on hover */}
            <div className="vg-istack__report-preview">
              <div className="vg-istack__brief-item vg-istack__brief-item--1">
                <span className="vg-istack__brief-tag">01</span>
                <span className="vg-istack__brief-label">Executive Summary</span>
                <span className="vg-istack__brief-bar"><span style={{width:'92%'}}/></span>
              </div>
              <div className="vg-istack__brief-item vg-istack__brief-item--2">
                <span className="vg-istack__brief-tag">02</span>
                <span className="vg-istack__brief-label">Threat Matrix</span>
                <span className="vg-istack__brief-bar"><span style={{width:'78%'}}/></span>
              </div>
              <div className="vg-istack__brief-item vg-istack__brief-item--3">
                <span className="vg-istack__brief-tag">03</span>
                <span className="vg-istack__brief-label">Supply Chain Impact</span>
                <span className="vg-istack__brief-bar"><span style={{width:'85%'}}/></span>
              </div>
              <div className="vg-istack__brief-item vg-istack__brief-item--4">
                <span className="vg-istack__brief-tag">04</span>
                <span className="vg-istack__brief-label">Recommended Actions</span>
                <span className="vg-istack__brief-bar"><span style={{width:'67%'}}/></span>
              </div>
              <div className="vg-istack__brief-item vg-istack__brief-item--5">
                <span className="vg-istack__brief-tag">05</span>
                <span className="vg-istack__brief-label">Confidence Score</span>
                <span className="vg-istack__brief-val">89.4%</span>
              </div>
            </div>
            <button
              className="vg-istack__report-btn"
              onClick={() => setReportPreviewActive(!reportPreviewActive)}
            >
              Generate Latest Brief
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
