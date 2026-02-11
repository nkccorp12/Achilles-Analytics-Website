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
// MAIN COMPONENT
// ======================================================================

export default function IntelStack() {
  return (
    <section className="vg__section vg-istack" id="intel-stack">
      {/* Section Label */}
      <div className="vg__section-label">// INTELLIGENCE STACK</div>

      {/* Section Title */}
      <div className="vg-istack__title-block">
        <span className="vg-istack__title-tag">Unified Command Interface</span>
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
                <span className="vg-istack__live-indicator">
                  <span className="vg-istack__live-dot" />
                  {' '}LIVE FEED
                </span>
                <span className="vg-istack__coord">LAT: 34.0522 N</span>
                <span className="vg-istack__coord">LON: 118.2437 W</span>
              </div>
            </div>
            <div className="vg-istack__map-area">
              {/* Dark placeholder with grid lines */}
              <div className="vg-istack__map-placeholder" />
              {/* Heatmap gradient overlay */}
              <div className="vg-istack__map-heatmap" />
              {/* Alerts panel */}
              <div className="vg-istack__alerts-panel">
                <div className="vg-istack__alerts-title">ACTIVE ALERTS</div>
                <div className="vg-istack__alerts-list">
                  <div className="vg-istack__alert-row">
                    <span>Civil Unrest</span>
                    <span className="vg-istack__alert-high">High</span>
                  </div>
                  <div className="vg-istack__alert-row">
                    <span>Infrastructure</span>
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
                  <div className="vg-istack__feed-meta">09:42:11 UTC // SOURCE: REUTERS</div>
                  <p className="vg-istack__feed-text vg-istack__feed-text--bright">
                    Sudden increase in localized network traffic detected in Zone 7. AI tagging as potential DDoS precursor.
                  </p>
                </div>
                <div className="vg-istack__feed-item">
                  <div className="vg-istack__feed-meta">09:40:05 UTC // SOURCE: X-API</div>
                  <p className="vg-istack__feed-text">
                    Viral sentiment shift in Mediterranean region regarding new trade tariffs. Confidence: 88%.
                  </p>
                </div>
                <div className="vg-istack__feed-item vg-istack__feed-item--highlight">
                  <div className="vg-istack__feed-meta">09:38:52 UTC // SOURCE: DARK_WEB_MONITOR</div>
                  <p className="vg-istack__feed-text vg-istack__feed-text--bright">
                    Credential leak identified for major logistics provider. Mitigating protocols suggested.
                  </p>
                </div>
                <div className="vg-istack__feed-item">
                  <div className="vg-istack__feed-meta">09:35:10 UTC // SOURCE: AP</div>
                  <p className="vg-istack__feed-text">
                    Satellite imagery confirms troop movements at northern border. Updating map layers...
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

        <div className="vg-istack__brain-grid">
          {/* Digital Twin */}
          <div className="vg-istack__card">
            <div className="vg-istack__card-header">
              <span className="vg-istack__card-icon"><IconHub /></span>
              <span className="vg-istack__card-label">Digital Twin</span>
            </div>
            <div className="vg-istack__twin-visual">
              <div className="vg-istack__twin-glow" />
              <span className="vg-istack__twin-icon"><IconAccountTree /></span>
              <div className="vg-istack__twin-counter">RELATIONAL NODES: 4,821</div>
            </div>
            <p className="vg-istack__card-desc">
              Real-time 3D network relationship visualization mapping adversary connections.
            </p>
          </div>

          {/* BIAS Control */}
          <div className="vg-istack__card">
            <div className="vg-istack__card-header">
              <span className="vg-istack__card-icon"><IconBalance /></span>
              <span className="vg-istack__card-label">BIAS Control</span>
            </div>
            <div className="vg-istack__bias-meters">
              <div className="vg-istack__meter">
                <div className="vg-istack__meter-header">
                  <span>CREDIBILITY SCORE</span>
                  <span className="vg-istack__meter-value">92%</span>
                </div>
                <div className="vg-istack__meter-track">
                  <div className="vg-istack__meter-fill" data-width="92" />
                </div>
              </div>
              <div className="vg-istack__meter">
                <div className="vg-istack__meter-header">
                  <span>POLITICAL STANCE</span>
                  <span className="vg-istack__meter-value vg-istack__meter-value--muted">NEUTRAL-CENTER</span>
                </div>
                <div className="vg-istack__meter-track">
                  <div className="vg-istack__meter-fill vg-istack__meter-fill--blue" data-width="45" />
                  <div className="vg-istack__meter-fill vg-istack__meter-fill--accent" data-width="10" />
                  <div className="vg-istack__meter-fill vg-istack__meter-fill--red" data-width="45" />
                </div>
              </div>
            </div>
            <p className="vg-istack__card-desc">
              Automated stance detection and veracity scoring for incoming streams.
            </p>
          </div>

          {/* OSINT Atlas */}
          <div className="vg-istack__card">
            <div className="vg-istack__card-header">
              <span className="vg-istack__card-icon"><IconGridView /></span>
              <span className="vg-istack__card-label">OSINT Atlas</span>
            </div>
            <div className="vg-istack__atlas-grid">
              <div className="vg-istack__atlas-cell"><IconPublic /></div>
              <div className="vg-istack__atlas-cell"><IconFingerprint /></div>
              <div className="vg-istack__atlas-cell"><IconTerminal /></div>
              <div className="vg-istack__atlas-cell"><IconSatellite /></div>
              <div className="vg-istack__atlas-cell"><IconShare /></div>
              <div className="vg-istack__atlas-cell"><IconPsychology /></div>
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
              <div className="vg-istack__debate-badge">DEBATE MODE: ACTIVE</div>
            </div>
            <div className="vg-istack__council-chat">
              {/* Persona: Strategist */}
              <div className="vg-istack__message">
                <div className="vg-istack__avatar vg-istack__avatar--strategist">
                  <IconTactic />
                </div>
                <div className="vg-istack__message-body">
                  <div className="vg-istack__message-meta">
                    <span className="vg-istack__message-name">THE STRATEGIST</span>
                    <span className="vg-istack__message-time">09:55:01</span>
                  </div>
                  <div className="vg-istack__bubble vg-istack__bubble--strategist">
                    The data from Group A suggests a 65% probability of localized disruption. I recommend preemptive resource relocation to the northern sector.
                  </div>
                </div>
              </div>

              {/* Persona: Cynic */}
              <div className="vg-istack__message">
                <div className="vg-istack__avatar vg-istack__avatar--cynic">
                  <IconGavel />
                </div>
                <div className="vg-istack__message-body">
                  <div className="vg-istack__message-meta">
                    <span className="vg-istack__message-name">THE CYNIC</span>
                    <span className="vg-istack__message-time">09:55:14</span>
                  </div>
                  <div className="vg-istack__bubble vg-istack__bubble--cynic">
                    Wait. The OSINT signals are too uniform; this bears the hallmark of a coordinated misinformation campaign. Relocating assets now could leave our flank exposed.
                  </div>
                </div>
              </div>

              {/* Persona: Optimist */}
              <div className="vg-istack__message">
                <div className="vg-istack__avatar vg-istack__avatar--optimist">
                  <IconLightbulb />
                </div>
                <div className="vg-istack__message-body">
                  <div className="vg-istack__message-meta">
                    <span className="vg-istack__message-name">THE OPTIMIST</span>
                    <span className="vg-istack__message-time">09:55:28</span>
                  </div>
                  <div className="vg-istack__bubble vg-istack__bubble--optimist">
                    If we utilize the Digital Twin insights, we can identify the source nodes within 12 minutes. This is an opportunity to dismantle the disinformation chain entirely.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intel Report Synthesis */}
          <div className="vg-istack__report">
            <div className="vg-istack__report-icon-wrap">
              <span className="vg-istack__report-icon"><IconDocument /></span>
              <div className="vg-istack__report-badge">PDF</div>
            </div>
            <h4 className="vg-istack__report-title">Intel Report Synthesis</h4>
            <p className="vg-istack__report-id">Automatic Generation: ID-8829-X</p>
            <p className="vg-istack__report-desc">
              Automated synthesis of raw data, OSINT streams, and Council debate into a boardroom-ready PDF briefing.
            </p>
            <button className="vg-istack__report-btn">
              Generate Latest Brief
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
