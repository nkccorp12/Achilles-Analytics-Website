import React, { useEffect, useState } from 'react';
import './Testing2C.css';

/* ======================================================================
   TESTING 2C — TACTICAL LAYERED STACK
   Three cognitive bands (EYES / BRAIN / VOICE) fused into ONE instrument
   via a vertical data spine carrying signal -> analysis -> decision.
   ====================================================================== */

// --- Inline SVG Icons --------------------------------------------------

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="22" height="22">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconFeed = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="22" height="22">
    <circle cx="6" cy="18" r="2" fill="currentColor" />
    <path d="M4 4a16 16 0 0116 16" />
    <path d="M4 11a9 9 0 019 9" />
  </svg>
);

const IconTwin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="22" height="22">
    <circle cx="12" cy="12" r="3" />
    <circle cx="4" cy="6" r="1.6" />
    <circle cx="20" cy="6" r="1.6" />
    <circle cx="4" cy="18" r="1.6" />
    <circle cx="20" cy="18" r="1.6" />
    <path d="M6 7l4 3M18 7l-4 3M6 17l4-3M18 17l-4-3" />
  </svg>
);

const IconBias = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="22" height="22">
    <path d="M12 3v18" />
    <path d="M4 7l8-4 8 4" />
    <path d="M3 13h6l-3-6zM15 13h6l-3-6z" />
    <path d="M8 21h8" />
  </svg>
);

const IconCouncil = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="22" height="22">
    <circle cx="8" cy="9" r="2.5" />
    <circle cx="16" cy="9" r="2.5" />
    <circle cx="12" cy="15" r="2.5" />
    <path d="M8 11.5L12 13M16 11.5L12 13" />
  </svg>
);

const IconReport = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="22" height="22">
    <path d="M6 2h9l5 5v15a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8M8 17h6M8 9h3" />
  </svg>
);

// --- Module Definitions ------------------------------------------------

const LAYERS = [
  {
    key: 'eyes',
    label: 'EYES',
    role: 'SIGNAL ACQUISITION',
    tint: 'cyan',
    modules: [
      {
        id: 'crisis-map',
        Icon: IconEye,
        name: 'Crisis Map',
        version: 'v4.2',
        capability: 'Geo-spatial heatmap of active hostilities and escalation vectors.',
        viz: 'map',
      },
      {
        id: 'news-hub',
        Icon: IconFeed,
        name: 'OSINT News Hub',
        version: 'v3.1',
        capability: 'Multi-source signal ingestion across SIGINT, GEOINT, HUMINT.',
        viz: 'feed',
      },
    ],
  },
  {
    key: 'brain',
    label: 'BRAIN',
    role: 'COGNITIVE SYNTHESIS',
    tint: 'green',
    modules: [
      {
        id: 'digital-twin',
        Icon: IconTwin,
        name: 'Digital Twin',
        version: 'v2.0',
        capability: 'Network graph mapping adversary relations, supply, and command.',
        viz: 'graph',
      },
      {
        id: 'bias-control',
        Icon: IconBias,
        name: 'BIAS Control',
        version: 'v1.8',
        capability: 'Stance detection and credibility scoring on every incoming claim.',
        viz: 'bars',
      },
    ],
  },
  {
    key: 'voice',
    label: 'VOICE',
    role: 'DECISION OUTPUT',
    tint: 'amber',
    modules: [
      {
        id: 'council',
        Icon: IconCouncil,
        name: 'AI Strategic Council',
        version: 'v2.4',
        capability: 'Multi-agent deliberation across geopolitical, military, economic axes.',
        viz: 'council',
      },
      {
        id: 'report',
        Icon: IconReport,
        name: 'Intel Report Synthesis',
        version: 'v1.5',
        capability: 'Auto-compiled briefings with sourced citations and confidence bands.',
        viz: 'doc',
      },
    ],
  },
];

// --- Mini Visualizations ----------------------------------------------

function MiniViz({ kind }) {
  if (kind === 'map') {
    return (
      <svg className="t2c-viz" viewBox="0 0 200 60" preserveAspectRatio="none">
        <defs>
          <pattern id="t2c-mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="200" height="60" fill="url(#t2c-mapgrid)" />
        <path d="M10 35 Q40 20 70 30 T130 25 T190 30" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="55" cy="28" r="3" fill="currentColor" className="t2c-pulse-dot" />
        <circle cx="120" cy="22" r="3" fill="currentColor" className="t2c-pulse-dot t2c-pulse-dot--2" />
        <circle cx="170" cy="32" r="2" fill="currentColor" className="t2c-pulse-dot t2c-pulse-dot--3" />
      </svg>
    );
  }
  if (kind === 'feed') {
    return (
      <div className="t2c-viz t2c-feed">
        {['REUTERS  Kherson shelling intensifies', 'SIGINT  Encrypted comms surge', 'GEOINT  Troop buildup confirmed', 'HUMINT  Mobilization Crimea'].map((line, i) => (
          <div key={i} className="t2c-feed__row" style={{ animationDelay: `${i * 0.6}s` }}>
            <span className="t2c-feed__dot" />
            <span className="t2c-feed__txt">{line}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'graph') {
    return (
      <svg className="t2c-viz" viewBox="0 0 200 60" preserveAspectRatio="none">
        <g stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.7" fill="none">
          <path d="M30 30 L70 15 L110 30 L150 18 L180 35" />
          <path d="M30 30 L70 45 L110 30 L150 45" />
          <path d="M70 15 L70 45" />
          <path d="M110 30 L150 45 L180 35" />
        </g>
        {[
          [30, 30], [70, 15], [70, 45], [110, 30], [150, 18], [150, 45], [180, 35],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="currentColor" className="t2c-node" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </svg>
    );
  }
  if (kind === 'bars') {
    return (
      <div className="t2c-viz t2c-bars">
        {[
          { label: 'CRED', val: 91 },
          { label: 'STANCE', val: 42 },
          { label: 'VERIFY', val: 78 },
          { label: 'SOURCE', val: 65 },
        ].map((b, i) => (
          <div key={i} className="t2c-bars__row">
            <span className="t2c-bars__label">{b.label}</span>
            <div className="t2c-bars__track">
              <div className="t2c-bars__fill" style={{ width: `${b.val}%`, animationDelay: `${i * 0.18}s` }} />
            </div>
            <span className="t2c-bars__val">{b.val}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'council') {
    return (
      <div className="t2c-viz t2c-council">
        {['GEOPOL', 'MILITARY', 'ECON', 'CYBER'].map((agent, i) => (
          <div key={i} className="t2c-council__agent" style={{ animationDelay: `${i * 0.4}s` }}>
            <span className="t2c-council__icon" />
            <span className="t2c-council__name">{agent}</span>
            <span className="t2c-council__bar"><span style={{ animationDelay: `${i * 0.4}s` }} /></span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'doc') {
    return (
      <div className="t2c-viz t2c-doc">
        <div className="t2c-doc__head">
          <span>CLASSIFIED // BRIEF-04A</span>
          <span className="t2c-doc__stamp">DRAFT</span>
        </div>
        <div className="t2c-doc__lines">
          {[88, 64, 92, 58, 76, 48].map((w, i) => (
            <div key={i} className="t2c-doc__line" style={{ width: `${w}%`, animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// --- Layer Band --------------------------------------------------------

function LayerBand({ layer, index }) {
  return (
    <div className={`t2c-band t2c-band--${layer.tint}`} data-layer={layer.key}>
      {/* Vertical Layer Label */}
      <div className="t2c-band__label">
        <div className="t2c-band__label-num">L{index + 1}</div>
        <div className="t2c-band__label-name">{layer.label}</div>
        <div className="t2c-band__label-role">{layer.role}</div>
      </div>

      {/* Horizontal phosphor scanline divider (top) */}
      <div className="t2c-band__scanline" aria-hidden="true" />

      {/* Modules */}
      <div className="t2c-band__modules">
        {layer.modules.map((mod, mi) => (
          <div key={mod.id} className="t2c-mod">
            {/* Corner Brackets */}
            <span className="t2c-mod__bracket t2c-mod__bracket--tl" />
            <span className="t2c-mod__bracket t2c-mod__bracket--tr" />
            <span className="t2c-mod__bracket t2c-mod__bracket--bl" />
            <span className="t2c-mod__bracket t2c-mod__bracket--br" />

            <div className="t2c-mod__head">
              <div className="t2c-mod__id">
                <span className="t2c-mod__icon">{<mod.Icon />}</span>
                <span className="t2c-mod__name">{mod.name}</span>
                <span className="t2c-mod__ver">{mod.version}</span>
              </div>
              <div className="t2c-mod__status">
                <span className="t2c-mod__status-dot" />
                <span>ONLINE</span>
              </div>
            </div>

            <div className="t2c-mod__viz">
              <MiniViz kind={mod.viz} />
            </div>

            <div className="t2c-mod__cap">{mod.capability}</div>

            <div className="t2c-mod__foot">
              <span>MODULE {String(index + 1).padStart(2, '0')}.{String(mi + 1).padStart(2, '0')}</span>
              <span>CH-{(index * 2 + mi + 1).toString().padStart(3, '0')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Layer connector tab (bottom) — visually fuses into next band */}
      {index < LAYERS.length - 1 && (
        <div className="t2c-band__connector" aria-hidden="true">
          <span className="t2c-band__connector-arrow">v</span>
        </div>
      )}
    </div>
  );
}

// --- Data Spine --------------------------------------------------------

function DataSpine() {
  // 5 packets traveling top-to-bottom, staggered.
  return (
    <div className="t2c-spine" aria-hidden="true">
      <div className="t2c-spine__rail">
        <span className="t2c-spine__tickmark t2c-spine__tickmark--1" />
        <span className="t2c-spine__tickmark t2c-spine__tickmark--2" />
        <span className="t2c-spine__tickmark t2c-spine__tickmark--3" />

        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`t2c-spine__pulse t2c-spine__pulse--${i + 1}`} />
        ))}
      </div>

      <div className="t2c-spine__legend">
        <div className="t2c-spine__legend-item">
          <span className="t2c-spine__legend-dot" />
          <span>SIGNAL</span>
        </div>
        <div className="t2c-spine__legend-item">
          <span className="t2c-spine__legend-dot" />
          <span>ANALYSIS</span>
        </div>
        <div className="t2c-spine__legend-item">
          <span className="t2c-spine__legend-dot" />
          <span>DECISION</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ----------------------------------------------------

export default function Testing2C() {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  return (
    <div className="t2c">
      {/* Fixed Header */}
      <header className={`neu-header ${headerVisible ? 'neu-header--visible' : ''}`}>
        <div className="neu-header__inner">
          <a href="/" className="neu-header__wordmark">
            ACHILLES<span>.</span><span className="neu-header__wordmark-sub">ANALYTICS</span>
          </a>
          <nav className="neu-header__nav">
            <a href="/testing2" className="neu-header__link">// Testing 2</a>
            <a href="/" className="neu-header__link">// Home</a>
          </nav>
        </div>
      </header>

      {/* Hero Heading */}
      <section className="t2c-hero">
        <div className="t2c-hero__inner">
          <div className="t2c-hero__label">// TACTICAL STACK</div>
          <h1 className="t2c-hero__heading">
            Three layers. <span className="t2c-hero__accent">One instrument.</span>
          </h1>
          <p className="t2c-hero__sub">
            Eyes acquire. Brain synthesizes. Voice decides. A continuous spine of telemetry binds all three —
            no module operates in isolation.
          </p>

          {/* Header strip — instrument framing */}
          <div className="t2c-hero__strip">
            <div className="t2c-hero__strip-cell">
              <span className="t2c-hero__strip-key">DEVICE</span>
              <span className="t2c-hero__strip-val">ACHILLES INTEL STACK</span>
            </div>
            <div className="t2c-hero__strip-cell">
              <span className="t2c-hero__strip-key">SERIAL</span>
              <span className="t2c-hero__strip-val">AIS-04-2026</span>
            </div>
            <div className="t2c-hero__strip-cell">
              <span className="t2c-hero__strip-key">LAYERS</span>
              <span className="t2c-hero__strip-val">03 // 06 MODULES</span>
            </div>
            <div className="t2c-hero__strip-cell">
              <span className="t2c-hero__strip-key">STATUS</span>
              <span className="t2c-hero__strip-val t2c-hero__strip-val--live">
                <span className="t2c-hero__strip-dot" /> ALL SYSTEMS NOMINAL
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tactical Stack Instrument */}
      <section className="t2c-instrument">
        <div className="t2c-instrument__shell">
          {/* Outer rack chrome — top */}
          <div className="t2c-rack t2c-rack--top">
            <span className="t2c-rack__bolt" />
            <span className="t2c-rack__readout">SIG.IN -&gt; SYNTH -&gt; OUT // CYCLE 04.A</span>
            <span className="t2c-rack__bolt" />
          </div>

          {/* Stack Body: spine + bands */}
          <div className="t2c-instrument__body">
            <DataSpine />

            <div className="t2c-bands">
              {LAYERS.map((layer, i) => (
                <LayerBand key={layer.key} layer={layer} index={i} />
              ))}
            </div>
          </div>

          {/* Outer rack chrome — bottom */}
          <div className="t2c-rack t2c-rack--bot">
            <span className="t2c-rack__bolt" />
            <span className="t2c-rack__readout">UNIFIED COGNITIVE INSTRUMENT // 06 SUBSYSTEMS BONDED</span>
            <span className="t2c-rack__bolt" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="t2c-foot">
        <a href="/testing2" className="t2c-foot__link">&lt;&lt; BACK TO TESTING 2</a>
        <span className="t2c-foot__meta">TESTING 2C // TACTICAL LAYERED STACK</span>
      </footer>
    </div>
  );
}
