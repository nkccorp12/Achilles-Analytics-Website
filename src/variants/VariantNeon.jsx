import React, { useState, useEffect, useRef } from 'react';
import './VariantNeon.css';

/* ============================================================
   VARIANT NEON — "Neon Wire" Cyberpunk Wireframe
   Achilles Analytics Landing Page
   ============================================================ */

// ---- Section Marker Component ----
function SectionMarker({ number, label }) {
  return (
    <div className="neon-section-marker">
      {number} // {label}
    </div>
  );
}

// ---- Corner Brackets SVG ----
function CornerBrackets() {
  return (
    <svg className="neon-line-draw-border" preserveAspectRatio="none" viewBox="0 0 100 100">
      <rect x="0.5" y="0.5" width="99" height="99" rx="0" />
    </svg>
  );
}

// ---- Dot Grid Background ----
function DotGrid() {
  return <div className="neon-dot-grid" />;
}

/* ============================================================
   SECTION 1: HERO — "THE MISSION"
   ============================================================ */
function HeroSection() {
  return (
    <section className="neon-hero" id="hero">
      {/* Decorative lines */}
      <div className="neon-hero__deco-h" />
      <div className="neon-hero__deco-v" />
      <DotGrid />

      {/* Wordmark */}
      <div className="neon-hero__wordmark">ACHILLES</div>

      {/* Content */}
      <div className="neon-hero__content">
        <div className="neon-hero__text">
          <h1 className="neon-hero__headline">
            MAKE THE <span>CONSEQUENCES</span> VISIBLE&mdash;BEFORE THEY OCCUR.
          </h1>
          <p className="neon-hero__sub">
            Achilles Analytics is an intelligence platform that maps the hidden
            architecture of risk. We simulate second- and third-order effects so
            decision-makers act on foresight, not hindsight.
          </p>
          <div className="neon-hero__ctas">
            <button className="neon-cta-filled">REQUEST PLATFORM ACCESS</button>
            <button className="neon-cta-wire">EXPLORE ARCHITECTURE</button>
          </div>
        </div>

        {/* Animated wireframe sphere */}
        <div className="neon-hero__sphere-wrap">
          <div className="neon-wireframe-sphere">
            <div className="neon-wireframe-sphere__ring neon-wireframe-sphere__ring--1" />
            <div className="neon-wireframe-sphere__ring neon-wireframe-sphere__ring--2" />
            <div className="neon-wireframe-sphere__ring neon-wireframe-sphere__ring--3" />
            <div className="neon-wireframe-sphere__ring neon-wireframe-sphere__ring--4" />
            <div className="neon-wireframe-sphere__ring neon-wireframe-sphere__ring--5" />
            <div className="neon-wireframe-sphere__core" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 2: PHILOSOPHY — "THE BLIND SPOT"
   ============================================================ */
function PhilosophySection() {
  return (
    <section className="neon-section neon-philosophy neon-corner-brackets" id="philosophy">
      <DotGrid />
      <SectionMarker number="01" label="THE BLIND SPOT" />

      <div className="neon-philosophy__grid">
        {/* Left: Quote */}
        <div>
          <div className="neon-philosophy__quote">
            <span className="neon-philosophy__quote-line neon-philosophy__quote-line--bright">
              THE WORLD DOES NOT FAIL
            </span>
            <span className="neon-philosophy__quote-line neon-philosophy__quote-line--dim">
              BECAUSE OF UNKNOWN THREATS.
            </span>
            <span className="neon-philosophy__quote-line neon-philosophy__quote-line--bright">
              IT FAILS BECAUSE OF
            </span>
            <span className="neon-philosophy__quote-line neon-philosophy__quote-line--dim">
              UNTRACED
            </span>
            <span className="neon-philosophy__quote-line neon-philosophy__quote-line--bright neon-text-glow">
              CONSEQUENCES.
            </span>
          </div>

          <div className="neon-philosophy__block">
            Traditional risk assessment identifies what <em>might</em> happen.
            Achilles maps what happens <em>after</em> what happens. We expose the
            cascade paths that turn manageable incidents into systemic failures
            &mdash; the blind spots where consequences compound beyond
            intervention thresholds.
          </div>
        </div>

        {/* Right: Rotating rectangles visualization */}
        <div className="neon-philosophy__viz">
          <div className="neon-philosophy__rect neon-philosophy__rect--1" />
          <div className="neon-philosophy__rect neon-philosophy__rect--2" />
          <div className="neon-philosophy__rect neon-philosophy__rect--3" />
          <div className="neon-philosophy__rect neon-philosophy__rect--4" />
          <div className="neon-philosophy__rect-center" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 3: CORE ENGINE — Impact vs. Vulnerability
   ============================================================ */
function CoreEngineSection() {
  const [activePanel, setActivePanel] = useState(null);

  const impactClass =
    activePanel === 'vulnerability' ? 'neon-engine__panel--dimmed' : '';
  const vulnClass =
    activePanel === 'impact' ? 'neon-engine__panel--dimmed' : '';

  return (
    <section className="neon-section neon-engine" id="engine">
      <DotGrid />
      <SectionMarker number="02" label="CORE ENGINE" />

      <div className="neon-engine__split">
        {/* LEFT: Impact Analysis */}
        <div
          className={`neon-engine__panel ${impactClass}`}
          onClick={() =>
            setActivePanel(activePanel === 'impact' ? null : 'impact')
          }
        >
          <div className="neon-engine__panel-title">IMPACT ANALYSIS</div>
          <div className="neon-engine__panel-question">
            &ldquo;If this happens&hellip; what breaks next?&rdquo;
          </div>

          <div className="neon-engine__readout neon-box-glow">
            <div className="neon-engine__readout-label">ACTIVE CASCADE DEPTH</div>
            <div className="neon-engine__readout-value">
              7.3<span className="neon-engine__readout-value--blink">_</span>
            </div>
          </div>

          <div className="neon-engine__delta">
            <div className="neon-engine__delta-label">
              &Delta;SYSTEM STATE
            </div>
            <div className="neon-engine__delta-row">
              <span className="neon-engine__delta-key">supply_chain</span>
              <span className="neon-engine__delta-val">-34.2%</span>
            </div>
            <div className="neon-engine__delta-row">
              <span className="neon-engine__delta-key">financial_flow</span>
              <span className="neon-engine__delta-val">-18.7%</span>
            </div>
            <div className="neon-engine__delta-row">
              <span className="neon-engine__delta-key">info_integrity</span>
              <span className="neon-engine__delta-val">-52.1%</span>
            </div>
            <div className="neon-engine__delta-row">
              <span className="neon-engine__delta-key">social_cohesion</span>
              <span className="neon-engine__delta-val">-11.9%</span>
            </div>
          </div>
        </div>

        {/* CENTER DIVIDER */}
        <div className="neon-engine__divider" />

        {/* RIGHT: Vulnerability Analysis */}
        <div
          className={`neon-engine__panel ${vulnClass}`}
          onClick={() =>
            setActivePanel(activePanel === 'vulnerability' ? null : 'vulnerability')
          }
        >
          <div className="neon-engine__panel-title">VULNERABILITY ANALYSIS</div>
          <div className="neon-engine__panel-question">
            &ldquo;Where is the system most exposed?&rdquo;
          </div>

          <div className="neon-engine__readout neon-box-glow">
            <div className="neon-engine__readout-label">LEVERAGE POINTS IDENTIFIED</div>
            <div className="neon-engine__readout-value">
              12<span className="neon-engine__readout-value--blink">_</span>
            </div>
          </div>

          {/* Node dots for leverage points */}
          <div className="neon-engine__nodes">
            {[
              { label: 'ENERGY GRID', top: '10%', left: '10%' },
              { label: 'DATA TRUNK', top: '5%', left: '55%' },
              { label: 'TRADE ROUTE', top: '40%', left: '30%' },
              { label: 'FIN NEXUS', top: '35%', left: '70%' },
              { label: 'GOV NODE', top: '65%', left: '15%' },
              { label: 'MEDIA HUB', top: '70%', left: '60%' },
            ].map((node) => (
              <div
                key={node.label}
                className="neon-engine__node"
                style={{ top: node.top, left: node.left }}
              >
                <div className="neon-engine__node-dot" />
                <span className="neon-engine__node-label">{node.label}</span>
              </div>
            ))}

            {/* Connection lines SVG */}
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              <line x1="16%" y1="14%" x2="36%" y2="44%" stroke="rgba(188,255,47,0.12)" strokeWidth="1" />
              <line x1="61%" y1="9%" x2="36%" y2="44%" stroke="rgba(188,255,47,0.12)" strokeWidth="1" />
              <line x1="36%" y1="44%" x2="76%" y2="39%" stroke="rgba(188,255,47,0.12)" strokeWidth="1" />
              <line x1="21%" y1="69%" x2="36%" y2="44%" stroke="rgba(188,255,47,0.12)" strokeWidth="1" />
              <line x1="66%" y1="74%" x2="76%" y2="39%" stroke="rgba(188,255,47,0.12)" strokeWidth="1" />
              <line x1="21%" y1="69%" x2="66%" y2="74%" stroke="rgba(188,255,47,0.08)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 4: INTELLIGENCE STACK — Node Network
   ============================================================ */
const CLUSTERS = [
  {
    id: 'eyes',
    title: 'THE EYES',
    sub: 'PERCEPTION LAYER',
    nodes: [
      { id: 'crisis-map', name: 'Crisis Map', icon: '\u25CE' },
      { id: 'news-hub', name: 'News Hub', icon: '\u25C8' },
    ],
  },
  {
    id: 'brain',
    title: 'THE BRAIN',
    sub: 'ANALYSIS LAYER',
    nodes: [
      { id: 'digital-twin', name: 'Digital Twin', icon: '\u2B21' },
      { id: 'bias-control', name: 'BIAS Control', icon: '\u2300' },
      { id: 'osint-atlas', name: 'OSINT Atlas', icon: '\u2316' },
    ],
  },
  {
    id: 'voice',
    title: 'THE VOICE',
    sub: 'OUTPUT LAYER',
    nodes: [
      { id: 'ai-council', name: 'AI Council', icon: '\u2726' },
      { id: 'intel-report', name: 'Intel Report', icon: '\u2263' },
    ],
  },
];

function IntelligenceStackSection() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const networkRef = useRef(null);

  return (
    <section className="neon-section neon-stack" id="stack">
      <DotGrid />
      <SectionMarker number="03" label="INTELLIGENCE STACK" />

      <div className="neon-stack__network" ref={networkRef}>
        {/* SVG connection lines between clusters */}
        <svg className="neon-stack__svg-lines" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
          {/* Inter-cluster lines */}
          <line
            className={`neon-stack__svg-line neon-stack__svg-line--inter ${
              hoveredNode ? 'neon-stack__svg-line--bright' : ''
            }`}
            x1="280" y1="300" x2="520" y2="300"
          />
          <line
            className={`neon-stack__svg-line neon-stack__svg-line--inter ${
              hoveredNode ? 'neon-stack__svg-line--bright' : ''
            }`}
            x1="680" y1="300" x2="920" y2="300"
          />
          {/* Diagonal cross-connects */}
          <line
            className="neon-stack__svg-line neon-stack__svg-line--inter"
            x1="280" y1="240" x2="600" y2="180"
            strokeDasharray="4 8"
          />
          <line
            className="neon-stack__svg-line neon-stack__svg-line--inter"
            x1="600" y1="420" x2="920" y2="360"
            strokeDasharray="4 8"
          />

          {/* Eyes internal */}
          <line className="neon-stack__svg-line" x1="120" y1="260" x2="240" y2="340" />
          {/* Brain internal */}
          <line className="neon-stack__svg-line" x1="520" y1="220" x2="600" y2="320" />
          <line className="neon-stack__svg-line" x1="600" y1="320" x2="680" y2="220" />
          <line className="neon-stack__svg-line" x1="520" y1="220" x2="680" y2="220" />
          {/* Voice internal */}
          <line className="neon-stack__svg-line" x1="920" y1="260" x2="1040" y2="340" />
        </svg>

        {/* Cluster layout */}
        <div className="neon-stack__clusters">
          {CLUSTERS.map((cluster) => (
            <div key={cluster.id} className="neon-stack__cluster">
              <div className="neon-stack__cluster-label">{cluster.title}</div>
              <div className="neon-stack__cluster-sub">{cluster.sub}</div>
              <div className="neon-stack__cluster-nodes">
                {cluster.nodes.map((node, i) => (
                  <React.Fragment key={node.id}>
                    {i > 0 && <div className="neon-stack__cluster-line" />}
                    <div
                      className="neon-stack__node"
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <div className="neon-stack__node-hex">
                        <div className="neon-stack__node-hex-inner">
                          <span className="neon-stack__node-icon">{node.icon}</span>
                        </div>
                      </div>
                      <span className="neon-stack__node-name">{node.name}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 5: AI COUNCIL SPOTLIGHT
   ============================================================ */
function AICouncilSection() {
  return (
    <section className="neon-section neon-council" id="council">
      <DotGrid />
      <SectionMarker number="04" label="AI COUNCIL" />

      <h2 className="neon-council__headline neon-glitch-hover">
        ESCAPE THE ECHO CHAMBER.
      </h2>

      <div className="neon-council__arena">
        {/* SVG argument lines */}
        <svg className="neon-council__lines-svg" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid meet">
          {/* Cynic to center */}
          <line
            className="neon-council__arg-line neon-council__arg-line--1"
            x1="120" y1="140" x2="450" y2="280"
          />
          {/* Optimist to center */}
          <line
            className="neon-council__arg-line neon-council__arg-line--2"
            x1="450" y1="140" x2="450" y2="280"
          />
          {/* Strategist to center */}
          <line
            className="neon-council__arg-line neon-council__arg-line--3"
            x1="780" y1="140" x2="450" y2="280"
          />

          {/* Secondary argument lines (thinner, dimmer) */}
          <line
            className="neon-council__arg-line"
            x1="140" y1="160" x2="440" y2="275"
            opacity="0.2"
            strokeDasharray="2 6"
          />
          <line
            className="neon-council__arg-line"
            x1="460" y1="155" x2="460" y2="275"
            opacity="0.2"
            strokeDasharray="2 6"
          />
          <line
            className="neon-council__arg-line"
            x1="760" y1="160" x2="460" y2="275"
            opacity="0.2"
            strokeDasharray="2 6"
          />
        </svg>

        {/* Three heads */}
        <div className="neon-council__heads">
          {/* CYNIC */}
          <div className="neon-council__head">
            <svg className="neon-council__head-svg" viewBox="0 0 100 120">
              {/* Abstract wireframe head - angular, sharp */}
              <ellipse cx="50" cy="45" rx="28" ry="35" />
              <line x1="50" y1="80" x2="50" y2="110" />
              <line x1="30" y1="100" x2="70" y2="100" />
              {/* Eye - narrowed */}
              <line x1="35" y1="38" x2="48" y2="40" strokeWidth="2" />
              <line x1="52" y1="40" x2="65" y2="38" strokeWidth="2" />
              {/* Brow - furrowed */}
              <line x1="32" y1="30" x2="46" y2="33" />
              <line x1="54" y1="33" x2="68" y2="30" />
              {/* Mouth - straight */}
              <line x1="40" y1="58" x2="60" y2="58" />
            </svg>
            <span className="neon-council__head-label">CYNIC</span>
            <span className="neon-council__head-role">ADVERSARIAL ANALYSIS</span>
          </div>

          {/* OPTIMIST */}
          <div className="neon-council__head">
            <svg className="neon-council__head-svg" viewBox="0 0 100 120">
              {/* Smoother, rounder head */}
              <ellipse cx="50" cy="45" rx="30" ry="36" />
              <line x1="50" y1="81" x2="50" y2="110" />
              <line x1="30" y1="100" x2="70" y2="100" />
              {/* Eyes - open circles */}
              <circle cx="38" cy="40" r="4" />
              <circle cx="62" cy="40" r="4" />
              {/* Brow - raised */}
              <path d="M 30 30 Q 38 25, 46 30" fill="none" />
              <path d="M 54 30 Q 62 25, 70 30" fill="none" />
              {/* Mouth - slight smile */}
              <path d="M 40 58 Q 50 66, 60 58" fill="none" />
            </svg>
            <span className="neon-council__head-label">OPTIMIST</span>
            <span className="neon-council__head-role">OPPORTUNITY MAPPING</span>
          </div>

          {/* STRATEGIST */}
          <div className="neon-council__head">
            <svg className="neon-council__head-svg" viewBox="0 0 100 120">
              {/* Geometric, calculated head */}
              <polygon points="50,10 80,45 70,82 30,82 20,45" fill="none" />
              <line x1="50" y1="82" x2="50" y2="110" />
              <line x1="30" y1="100" x2="70" y2="100" />
              {/* Eyes - precise diamonds */}
              <polygon points="38,38 42,34 46,38 42,42" fill="none" />
              <polygon points="54,38 58,34 62,38 58,42" fill="none" />
              {/* Crosshair on forehead */}
              <line x1="50" y1="20" x2="50" y2="28" />
              <line x1="46" y1="24" x2="54" y2="24" />
              {/* Mouth - neutral, precise */}
              <line x1="42" y1="62" x2="58" y2="62" />
              <circle cx="42" cy="62" r="1.5" />
              <circle cx="58" cy="62" r="1.5" />
            </svg>
            <span className="neon-council__head-label">STRATEGIST</span>
            <span className="neon-council__head-role">DECISION SYNTHESIS</span>
          </div>
        </div>

        {/* Decision point */}
        <div className="neon-council__decision" />

        <div className="neon-council__desc">
          THREE PERSPECTIVES &middot; ONE DECISION POINT &middot; ZERO
          GROUPTHINK
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 6: ARCHITECTURE & SECURITY
   ============================================================ */
function ArchitectureSection() {
  const pillars = [
    {
      id: 'sovereign',
      title: 'SOVEREIGN DEPLOYMENT',
      desc: 'Air-gapped infrastructure. Your data never leaves your perimeter. Full on-premise capability with zero external dependencies.',
      icon: (
        <svg viewBox="0 0 80 80">
          <polygon points="40,8 72,24 72,56 40,72 8,56 8,24" />
          <line x1="40" y1="8" x2="40" y2="72" />
          <line x1="8" y1="24" x2="72" y2="56" />
          <line x1="72" y1="24" x2="8" y2="56" />
        </svg>
      ),
    },
    {
      id: 'modular',
      title: 'MODULAR ARCHITECTURE',
      desc: 'Every module operates independently. Compose your intelligence stack. Add, remove, or replace components without system disruption.',
      icon: (
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="24" height="24" />
          <rect x="48" y="8" width="24" height="24" />
          <rect x="8" y="48" width="24" height="24" />
          <rect x="48" y="48" width="24" height="24" />
          <line x1="32" y1="20" x2="48" y2="20" />
          <line x1="32" y1="60" x2="48" y2="60" />
          <line x1="20" y1="32" x2="20" y2="48" />
          <line x1="60" y1="32" x2="60" y2="48" />
        </svg>
      ),
    },
    {
      id: 'bias',
      title: 'BIAS INOCULATION',
      desc: 'Built-in cognitive bias detection. Every analysis is stress-tested against 47 documented bias patterns before it reaches a human.',
      icon: (
        <svg viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="30" />
          <circle cx="40" cy="40" r="18" />
          <circle cx="40" cy="40" r="6" />
          <line x1="40" y1="4" x2="40" y2="16" />
          <line x1="40" y1="64" x2="40" y2="76" />
          <line x1="4" y1="40" x2="16" y2="40" />
          <line x1="64" y1="40" x2="76" y2="40" />
        </svg>
      ),
    },
  ];

  return (
    <section className="neon-section neon-architecture" id="architecture">
      <DotGrid />
      <SectionMarker number="05" label="ARCHITECTURE" />

      <div className="neon-architecture__pillars">
        {pillars.map((pillar) => (
          <div key={pillar.id} className="neon-architecture__pillar neon-corner-brackets">
            <div className="neon-architecture__pillar-icon">{pillar.icon}</div>
            <div className="neon-architecture__pillar-title">{pillar.title}</div>
            <div className="neon-architecture__pillar-desc">{pillar.desc}</div>
          </div>
        ))}
      </div>

      <div className="neon-architecture__base-line" />
    </section>
  );
}

/* ============================================================
   SECTION 7: FOOTER
   ============================================================ */
function FooterSection() {
  return (
    <footer className="neon-footer" id="footer">
      <div className="neon-footer__border-top" />

      <div className="neon-footer__links">
        <button className="neon-footer__link">DOCUMENTATION</button>
        <span className="neon-footer__link-sep">&middot;</span>
        <button className="neon-footer__link">API REFERENCE</button>
        <span className="neon-footer__link-sep">&middot;</span>
        <button className="neon-footer__link">SYSTEM STATUS</button>
      </div>

      <div className="neon-footer__tagline">
        MANAGE UNCERTAINTY SYSTEMATICALLY.
      </div>

      <div className="neon-footer__wordmark">ACHILLES ANALYTICS</div>
    </footer>
  );
}

/* ============================================================
   NAV DOTS (right edge)
   ============================================================ */
function NavDots() {
  const sections = [
    'hero',
    'philosophy',
    'engine',
    'stack',
    'council',
    'architecture',
    'footer',
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let current = 0;
      sections.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = index;
        }
      });
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="neon-hero__nav-dots">
      {sections.map((id, i) => (
        <button
          key={id}
          className={`neon-hero__nav-dot ${
            i === active ? 'neon-hero__nav-dot--active' : ''
          }`}
          onClick={() => scrollTo(id)}
          aria-label={`Navigate to ${id} section`}
        />
      ))}
    </nav>
  );
}

/* ============================================================
   MAIN COMPONENT EXPORT
   ============================================================ */
export default function VariantNeon() {
  return (
    <div className="neon-landing">
      <NavDots />
      <HeroSection />
      <PhilosophySection />
      <CoreEngineSection />
      <IntelligenceStackSection />
      <AICouncilSection />
      <ArchitectureSection />
      <FooterSection />
    </div>
  );
}
