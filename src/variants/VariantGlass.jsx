import React, { useState } from 'react';
import './VariantGlass.css';

/* ============================================================
   ACHILLES ANALYTICS — "Glass Noir" Landing Page
   A premium glassmorphism React component
   ============================================================ */

/* ---- Inline SVG Icon Components ---- */

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconBrain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
    <path d="M10 21h4" />
    <path d="M12 2v3" />
    <path d="M8 9h8" />
  </svg>
);

const IconVoice = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconNewspaper = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
    <line x1="7" y1="8" x2="17" y2="8" />
    <line x1="7" y1="12" x2="13" y2="12" />
    <line x1="7" y1="16" x2="10" y2="16" />
  </svg>
);

const IconCube = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconFileText = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconGrid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);


/* ============================================================
   SECTION 1: Hero — "The Mission"
   ============================================================ */

function HeroSection() {
  return (
    <section className="ach-hero ach-section">
      <div className="ach-orb ach-orb--hero" />
      <p className="ach-hero__wordmark">Achilles</p>
      <h1 className="ach-hero__headline">
        Make the{' '}
        <span className="ach-hero__headline-accent">consequences</span>{' '}
        visible&nbsp;&mdash; before they occur.
      </h1>
      <p className="ach-hero__sub">
        An intelligence platform that transforms fragmented global data into
        structured foresight&nbsp;&mdash; so decisions are made with clarity, not
        conviction.
      </p>
      <div className="ach-hero__ctas">
        <a href="http://82.165.45.74:8100" className="ach-btn ach-btn--primary">
          Access Platform
        </a>
        <button className="ach-btn ach-btn--glass">
          Explore the Architecture
        </button>
      </div>
    </section>
  );
}


/* ============================================================
   SECTION 2: Philosophy — "The Blind Spot"
   ============================================================ */

function PhilosophySection() {
  return (
    <section className="ach-section">
      <div className="ach-container">
        <p className="ach-section-label">The Blind Spot</p>
        <div className="ach-philosophy__grid">
          {/* Left Column */}
          <div>
            <blockquote className="ach-philosophy__quote">
              &ldquo;Data exists in abundance, yet it is fragmented across
              systems, languages, and agendas&nbsp;&mdash; leaving decision-makers
              with volume, but not vision.&rdquo;
            </blockquote>
            <p className="ach-philosophy__body">
              The world produces more information every hour than any team can
              process in a year. Achilles doesn&rsquo;t add more data. It
              creates the connective tissue between disparate signals, surfacing
              patterns that would otherwise remain invisible until their
              consequences arrive.
            </p>
          </div>

          {/* Right Column: Abstract Visualization */}
          <div className="ach-philosophy__visual ach-glass">
            <div className="ach-layers">
              <div className="ach-layer ach-layer--1">
                <div className="ach-layer__line ach-layer__line--w60" />
                <div className="ach-layer__line ach-layer__line--w40" />
              </div>
              <div className="ach-layer ach-layer--2">
                <div className="ach-layer__line ach-layer__line--w40" />
                <div className="ach-layer__line ach-layer__line--w60" />
              </div>
              <div className="ach-layer ach-layer--3">
                <div className="ach-layer__line ach-layer__line--w80" />
                <div className="ach-layer__line ach-layer__line--w40" />
              </div>
              <div className="ach-layer ach-layer--4">
                <div className="ach-layer__line ach-layer__line--accent" />
                <div className="ach-layer__line ach-layer__line--w80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   SECTION 3: Core Engine — Impact vs. Vulnerability
   ============================================================ */

const engineData = {
  impact: {
    question: 'If this policy is enacted, who gains — and at whose expense?',
    desc: 'Impact Analysis maps the downstream consequences of any decision, regulation, or event across economic sectors, demographics, and geopolitical relationships. It reveals winners, losers, and the second-order effects that typically blindside stakeholders.',
    outputLabel: 'Cascading Impact Vectors',
    bars: [
      { name: 'Economic Disruption', value: 87 },
      { name: 'Supply Chain Exposure', value: 64 },
      { name: 'Political Leverage Shift', value: 72 },
      { name: 'Social Stability Index', value: 41 },
    ],
  },
  vulnerability: {
    question: 'Where are we exposed — and how quickly could it unravel?',
    desc: 'Vulnerability Analysis identifies structural weak points in organizations, supply chains, alliances, and systems. It stress-tests assumptions against real-world scenario models, producing a ranked fragility map before crises materialize.',
    outputLabel: 'Fragility Assessment',
    bars: [
      { name: 'Infrastructure Resilience', value: 53 },
      { name: 'Dependency Concentration', value: 91 },
      { name: 'Regulatory Exposure', value: 68 },
      { name: 'Reputation Sensitivity', value: 76 },
    ],
  },
};

function CoreEngineSection() {
  const [activeTab, setActiveTab] = useState('impact');
  const data = engineData[activeTab];

  return (
    <section className="ach-section">
      <div className="ach-container">
        <p className="ach-section-label">Core Engine</p>

        {/* Toggle */}
        <div className="ach-engine__toggle-wrap">
          <div className="ach-toggle">
            <button
              className={`ach-toggle__btn ${activeTab === 'impact' ? 'ach-toggle__btn--active' : ''}`}
              onClick={() => setActiveTab('impact')}
            >
              Impact Analysis
            </button>
            <button
              className={`ach-toggle__btn ${activeTab === 'vulnerability' ? 'ach-toggle__btn--active' : ''}`}
              onClick={() => setActiveTab('vulnerability')}
            >
              Vulnerability Analysis
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="ach-engine__card ach-glass">
          <h3 className="ach-engine__question">{data.question}</h3>
          <p className="ach-engine__desc">{data.desc}</p>

          <p className="ach-engine__output-label">{data.outputLabel}</p>
          <div className="ach-engine__bars">
            {data.bars.map((bar) => (
              <div key={bar.name}>
                <div className="ach-engine__bar-label">
                  <span className="ach-engine__bar-name">{bar.name}</span>
                  <span className="ach-engine__bar-value">{bar.value}%</span>
                </div>
                <div className="ach-engine__bar">
                  <div
                    className="ach-engine__bar-fill"
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   SECTION 4: Intelligence Stack — Module Showcase
   ============================================================ */

const stackClusters = [
  {
    id: 'eyes',
    title: 'The Eyes',
    icon: <IconEye />,
    modules: [
      {
        icon: <IconGlobe />,
        title: 'Crisis Map',
        desc: 'Real-time geospatial event tracking with multi-source corroboration and severity scoring.',
      },
      {
        icon: <IconNewspaper />,
        title: 'News Hub',
        desc: 'Aggregated global media intelligence with sentiment, source credibility, and narrative tracking.',
      },
    ],
  },
  {
    id: 'brain',
    title: 'The Brain',
    icon: <IconBrain />,
    modules: [
      {
        icon: <IconCube />,
        title: 'Digital Twin',
        desc: 'Scenario simulation engine that models cascading effects across interconnected systems.',
      },
      {
        icon: <IconShield />,
        title: 'BIAS Control',
        desc: 'Structured analytical technique framework that challenges assumptions and cognitive biases.',
      },
      {
        icon: <IconSearch />,
        title: 'OSINT Atlas',
        desc: 'Open-source intelligence layer with entity mapping, relationship graphs, and source verification.',
      },
    ],
  },
  {
    id: 'voice',
    title: 'The Voice',
    icon: <IconVoice />,
    modules: [
      {
        icon: <IconUsers />,
        title: 'AI Council',
        desc: 'Multi-perspective AI deliberation system that stress-tests conclusions from opposing viewpoints.',
      },
      {
        icon: <IconFileText />,
        title: 'Intel Report',
        desc: 'Automated intelligence brief generation with confidence levels and dissenting analysis.',
      },
    ],
  },
];

function IntelligenceStackSection() {
  return (
    <section className="ach-section">
      <div className="ach-container">
        <p className="ach-section-label">Intelligence Stack</p>

        {stackClusters.map((cluster) => (
          <div className="ach-stack__cluster" key={cluster.id}>
            <div className="ach-stack__cluster-header">
              <div className="ach-stack__cluster-icon">{cluster.icon}</div>
              <span className="ach-stack__cluster-title">{cluster.title}</span>
            </div>
            <div className="ach-stack__grid">
              {cluster.modules.map((mod) => (
                <div
                  className="ach-module-card ach-glass ach-glass-hover"
                  key={mod.title}
                >
                  <div className="ach-module-card__icon">{mod.icon}</div>
                  <h4 className="ach-module-card__title">{mod.title}</h4>
                  <p className="ach-module-card__desc">{mod.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


/* ============================================================
   SECTION 5: Spotlight — The AI Council
   ============================================================ */

function SpotlightSection() {
  return (
    <section className="ach-section ach-spotlight">
      <div className="ach-orb ach-orb--spotlight" />
      <div className="ach-container">
        <p className="ach-section-label">Spotlight</p>
        <h2 className="ach-spotlight__headline">
          Escape the Echo Chamber.
        </h2>
        <p className="ach-spotlight__desc">
          Most AI systems reinforce a single perspective. The AI Council
          deliberately fractures consensus&nbsp;&mdash; presenting every
          conclusion through the lenses of a Cynic, an Optimist, and a
          Strategist. Only when all three perspectives are weighed does a
          recommendation emerge.
        </p>

        {/* Council Visualization */}
        <div className="ach-council">
          <div className="ach-council__node">
            <span className="ach-council__node-icon" role="img" aria-label="Cynic">
              {/* Shield / skeptic symbol */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </span>
            <span className="ach-council__node-label">Cynic</span>
          </div>

          <div className="ach-council__line" />

          <div className="ach-council__node">
            <span className="ach-council__node-icon" role="img" aria-label="Optimist">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </span>
            <span className="ach-council__node-label">Optimist</span>
          </div>

          <div className="ach-council__line" />

          <div className="ach-council__node">
            <span className="ach-council__node-icon" role="img" aria-label="Strategist">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
            <span className="ach-council__node-label">Strategist</span>
          </div>

          {/* Center Pulse */}
          <div className="ach-council__center">
            <div className="ach-council__pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   SECTION 6: Architecture & Security
   ============================================================ */

function TrustSection() {
  return (
    <section className="ach-section">
      <div className="ach-container">
        <p className="ach-section-label">Trust Architecture</p>
        <div className="ach-trust__grid">
          <div className="ach-trust-card ach-glass ach-glass-hover">
            <div className="ach-trust-card__icon">
              <IconEye />
            </div>
            <div>
              <h4 className="ach-trust-card__title">Not a Black Box</h4>
              <p className="ach-trust-card__desc">
                Every analytical conclusion includes its reasoning chain, source
                provenance, and confidence interval. Full transparency from input
                to output&nbsp;&mdash; no hidden logic.
              </p>
            </div>
          </div>

          <div className="ach-trust-card ach-glass ach-glass-hover">
            <div className="ach-trust-card__icon">
              <IconUser />
            </div>
            <div>
              <h4 className="ach-trust-card__title">Human in the Loop</h4>
              <p className="ach-trust-card__desc">
                AI augments human judgment&nbsp;&mdash; it never replaces it.
                Every critical pathway includes mandatory human review gates and
                override capabilities.
              </p>
            </div>
          </div>

          <div className="ach-trust-card ach-glass ach-glass-hover">
            <div className="ach-trust-card__icon">
              <IconGrid />
            </div>
            <div>
              <h4 className="ach-trust-card__title">Admin Oversight</h4>
              <p className="ach-trust-card__desc">
                Role-based access control, complete audit trails, and
                administrative dashboards give organizations full governance over
                their intelligence operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   SECTION 7: Footer
   ============================================================ */

function FooterSection() {
  return (
    <footer className="ach-footer">
      <div className="ach-orb ach-orb--footer" />
      <div className="ach-container">
        <div className="ach-footer__inner">
          <nav className="ach-footer__links">
            <a className="ach-footer__link" href="#documentation">Documentation</a>
            <a className="ach-footer__link" href="#api">API Reference</a>
            <a className="ach-footer__link" href="#status">System Status</a>
          </nav>
          <p className="ach-footer__tagline">
            Manage Uncertainty Systematically.
          </p>
          <p className="ach-footer__brand">Achilles Analytics</p>
        </div>
      </div>
    </footer>
  );
}


/* ============================================================
   MAIN COMPONENT EXPORT
   ============================================================ */

export default function VariantGlass() {
  return (
    <div className="achilles-landing">
      <HeroSection />
      <PhilosophySection />
      <CoreEngineSection />
      <IntelligenceStackSection />
      <SpotlightSection />
      <TrustSection />
      <FooterSection />
    </div>
  );
}
