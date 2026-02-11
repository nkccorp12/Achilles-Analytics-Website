import { useState } from 'react';
import './VariantGrid.css';

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANT GRID — "Tactical Grid" Command Center Aesthetic
   Achilles Analytics Landing Page
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Inline SVG Icons (no external deps) ────────────────────────────────────

const IconEye = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="24" cy="24" rx="18" ry="12" />
    <circle cx="24" cy="24" r="6" />
    <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
  </svg>
);

const IconBrain = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M24 6v36" />
    <path d="M24 6c-4 0-8 2-10 5s-3 7-1 11" />
    <path d="M24 6c4 0 8 2 10 5s3 7 1 11" />
    <path d="M13 22c-3 2-5 6-4 10s4 7 8 8" />
    <path d="M35 22c3 2 5 6 4 10s-4 7-8 8" />
    <circle cx="18" cy="16" r="2" />
    <circle cx="30" cy="16" r="2" />
  </svg>
);

const IconVoice = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="18" y="6" width="12" height="24" rx="6" />
    <path d="M10 24c0 8 6 14 14 14s14-6 14-14" />
    <path d="M24 38v6" />
    <path d="M16 44h16" />
  </svg>
);

const IconTransparent = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="6" y="6" width="36" height="36" rx="2" />
    <path d="M6 18h36" />
    <path d="M6 30h36" />
    <path d="M18 6v36" />
    <path d="M30 6v36" />
    <circle cx="24" cy="24" r="4" fill="currentColor" stroke="none" opacity="0.4" />
  </svg>
);

const IconHuman = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="24" cy="14" r="8" />
    <path d="M8 42c0-9 7-16 16-16s16 7 16 16" />
    <path d="M24 30v-4" strokeDasharray="2 2" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M24 4L6 14v12c0 11 8 18 18 20 10-2 18-9 18-20V14L24 4z" />
    <path d="M18 24l4 4 8-8" />
  </svg>
);

// ─── Section Divider ────────────────────────────────────────────────────────

const SectionDivider = () => <hr className="vg__section-divider" />;

// ─── Blinking Cursor ────────────────────────────────────────────────────────

const Cursor = () => <span className="vg__cursor" aria-hidden="true" />;

// ═══════════════════════════════════════════════════════════════════════════
// 1. HERO — "The Mission"
// ═══════════════════════════════════════════════════════════════════════════

function HeroSection() {
  return (
    <section className="vg-hero">
      {/* Top bar */}
      <div className="vg-hero__topbar">
        <div className="vg-hero__wordmark">
          <span>A</span>CHILLES
        </div>
        <div className="vg-hero__status">
          <div className="vg-hero__status-item">
            <span className="vg-hero__status-dot" />
            <span>Sys Online</span>
          </div>
          <div className="vg-hero__status-item">
            <span className="vg-hero__status-dot vg-hero__status-dot--amber" />
            <span>Threat Lvl: Elevated</span>
          </div>
          <div className="vg-hero__status-item">
            <span className="vg-hero__status-dot" />
            <span>Data Feed: Active</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="vg-hero__content">
        <h1 className="vg-hero__headline">
          Make the consequences <em>visible</em> — before they occur.
        </h1>
        <p className="vg-hero__sub">
          Achilles Analytics transforms fragmented intelligence into structured
          decision architectures. We map cascading impacts, expose systemic
          vulnerabilities, and surface the blind spots that traditional analysis
          cannot reach.
          <Cursor />
        </p>
        <div className="vg-hero__ctas">
          <a href="#access" className="vg-hero__cta vg-hero__cta--primary">
            Request Platform Access
          </a>
          <a href="#architecture" className="vg-hero__cta vg-hero__cta--secondary">
            Explore the Architecture
          </a>
        </div>
      </div>

      {/* Decorative wireframe */}
      <div className="vg-hero__deco" aria-hidden="true">
        <div className="vg-hero__deco-grid" />
        <div className="vg-hero__deco-cross" />
        <div className="vg-hero__deco-circle" />
        <div className="vg-hero__deco-diamond" />
      </div>

      {/* Bottom bar */}
      <div className="vg-hero__bottombar">
        <span>v4.2.1 // Build 2024.12.08</span>
        <span>Classification: Unclassified // FOUO</span>
        <span>Session Active</span>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. PHILOSOPHY — "The Blind Spot"
// ═══════════════════════════════════════════════════════════════════════════

function PhilosophySection() {
  return (
    <section className="vg__section" id="philosophy">
      <div className="vg__section-label">// Philosophy</div>
      <div className="vg-philosophy">
        {/* Left: Text */}
        <div className="vg-philosophy__text">
          <blockquote className="vg-philosophy__quote">
            &ldquo;Data exists in abundance, yet it is fragmented, contradictory,
            and buried in noise. The critical failure is never a lack of
            information — it is a lack of structured interpretation.&rdquo;
          </blockquote>
          <p className="vg-philosophy__message">
            We do not replace intuition with AI — we make{' '}
            <strong>decision logic explicit and auditable</strong>. Every
            analytical output traces back to its source assumptions, every risk
            assessment carries a documented rationale, and every recommendation
            is stress-tested against adversarial perspectives.
          </p>
        </div>

        {/* Right: Translucent panel */}
        <div className="vg-philosophy__panel">
          <span className="vg-philosophy__node" />
          <span className="vg-philosophy__node" />
          <span className="vg-philosophy__node" />
          <span className="vg-philosophy__node" />
          <svg
            className="vg-philosophy__connections"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="30" y1="25" x2="60" y2="45" />
            <line x1="60" y1="45" x2="40" y2="70" />
            <line x1="40" y1="70" x2="75" y2="35" />
            <line x1="30" y1="25" x2="75" y2="35" />
          </svg>
          <div className="vg-philosophy__panel-data">
            Signal-to-Noise: 94.2%
            <br />
            Bias Index: 0.03
            <br />
            Coverage: Global
          </div>
          <div className="vg-philosophy__panel-label">
            Structured Transparency Layer
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. CORE ENGINE — Impact vs. Vulnerability
// ═══════════════════════════════════════════════════════════════════════════

const ENGINE_DATA = {
  impact: {
    question: 'How is my system affected by a specific event?',
    formula: '\u0394 System State',
    description:
      'Map cascading consequences across interconnected systems. Trace how a single event propagates through supply chains, financial networks, political alliances, and operational dependencies.',
    terminal: [
      { key: 'Event Input', value: 'Suez Canal Blockage', status: 'normal' },
      { key: 'Propagation', value: '2nd-order effects', status: 'normal' },
      { key: 'Systems Affected', value: '147 nodes identified', status: 'warn' },
      { key: 'Impact Severity', value: 'HIGH — 0.82', status: 'danger' },
      { key: 'Time Horizon', value: '72h cascade window', status: 'warn' },
      { key: 'Confidence', value: '91.4%', status: 'normal' },
    ],
    statusBar: [
      { label: 'Mode', value: 'Reactive Analysis' },
      { label: 'Model', value: 'Digital Twin v3' },
      { label: 'Last Updated', value: '< 1 min ago' },
    ],
  },
  vulnerability: {
    question: 'Where are my structural weaknesses before they are exploited?',
    formula: 'Leverage Points',
    description:
      'Proactively identify systemic fragilities, single points of failure, and exploitable dependencies. Surface the hidden assumptions your strategy relies upon — before an adversary does.',
    terminal: [
      { key: 'Scan Scope', value: 'Full Dependency Graph', status: 'normal' },
      { key: 'Weak Nodes', value: '12 critical identified', status: 'danger' },
      { key: 'SPOFs', value: '3 single points of failure', status: 'danger' },
      { key: 'Redundancy Gap', value: '23% below threshold', status: 'warn' },
      { key: 'Attack Surface', value: 'Mapped — 89 vectors', status: 'warn' },
      { key: 'Resilience Score', value: '0.64 / 1.00', status: 'normal' },
    ],
    statusBar: [
      { label: 'Mode', value: 'Proactive Analysis' },
      { label: 'Model', value: 'OSINT Atlas v2' },
      { label: 'Scan Cycle', value: 'Continuous' },
    ],
  },
};

function CoreEngineSection() {
  const [activeTab, setActiveTab] = useState('impact');
  const data = ENGINE_DATA[activeTab];

  return (
    <section className="vg__section" id="engine">
      <div className="vg__section-label">// Core Engine</div>

      {/* Tabs */}
      <div className="vg-engine__tabs" role="tablist">
        <button
          className={`vg-engine__tab ${activeTab === 'impact' ? 'vg-engine__tab--active' : ''}`}
          onClick={() => setActiveTab('impact')}
          role="tab"
          aria-selected={activeTab === 'impact'}
        >
          A. Impact Analysis (Reactive)
        </button>
        <button
          className={`vg-engine__tab ${activeTab === 'vulnerability' ? 'vg-engine__tab--active' : ''}`}
          onClick={() => setActiveTab('vulnerability')}
          role="tab"
          aria-selected={activeTab === 'vulnerability'}
        >
          B. Vulnerability Analysis (Proactive)
        </button>
      </div>

      {/* Display area */}
      <div className="vg-engine__display">
        {/* Left terminal */}
        <div className="vg-engine__terminal">
          <div className="vg-engine__terminal-header">
            <span
              className={`vg-engine__terminal-dot ${
                activeTab === 'impact'
                  ? 'vg-engine__terminal-dot--active'
                  : ''
              }`}
            />
            <span
              className={`vg-engine__terminal-dot ${
                activeTab === 'vulnerability'
                  ? 'vg-engine__terminal-dot--active'
                  : ''
              }`}
            />
            <span>
              {activeTab === 'impact'
                ? 'impact_analysis.sh'
                : 'vuln_scan.sh'}
            </span>
          </div>
          <div className="vg-engine__terminal-body">
            {data.terminal.map((line, i) => (
              <div className="vg-engine__terminal-line" key={i}>
                <span className="vg-engine__terminal-prompt">&gt;</span>
                <span className="vg-engine__terminal-key">{line.key}:</span>
                <span
                  className={`vg-engine__terminal-val ${
                    line.status === 'warn'
                      ? 'vg-engine__terminal-val--warn'
                      : line.status === 'danger'
                        ? 'vg-engine__terminal-val--danger'
                        : ''
                  }`}
                >
                  {line.value}
                </span>
              </div>
            ))}
            <div className="vg-engine__terminal-line">
              <span className="vg-engine__terminal-prompt">&gt;</span>
              <span className="vg-engine__terminal-key">
                <Cursor />
              </span>
            </div>
          </div>
        </div>

        {/* Right readout */}
        <div className="vg-engine__readout">
          <div className="vg-engine__readout-title">
            {activeTab === 'impact'
              ? 'Reactive — Event-Driven'
              : 'Proactive — Structural'}
          </div>
          <div className="vg-engine__readout-question">{data.question}</div>
          <div className="vg-engine__readout-formula">{data.formula}</div>
          <div className="vg-engine__readout-desc">{data.description}</div>
        </div>
      </div>

      {/* Status bar */}
      <div className="vg-engine__status">
        {data.statusBar.map((item, i) => (
          <div className="vg-engine__status-item" key={i}>
            <span className="vg-engine__status-label">{item.label}</span>
            <span className="vg-engine__status-value">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. INTELLIGENCE STACK — Module Showcase
// ═══════════════════════════════════════════════════════════════════════════

const STACK_CLUSTERS = [
  {
    id: 'eyes',
    title: '"The Eyes"',
    subtitle: 'Global Situational Awareness',
    icon: <IconEye />,
    modules: [
      {
        icon: '\u25C9',
        title: 'Crisis Map',
        desc: 'Real-time geospatial event tracking with multi-layer overlays. Correlate political, economic, and environmental signals on a unified operational picture.',
      },
      {
        icon: '\u25A4',
        title: 'News Hub',
        desc: 'AI-curated intelligence feed aggregating 12,000+ sources. Automated bias detection, source reliability scoring, and narrative tracking.',
      },
    ],
  },
  {
    id: 'brain',
    title: '"The Brain"',
    subtitle: 'Analytical Deep Dive',
    icon: <IconBrain />,
    modules: [
      {
        icon: '\u2B21',
        title: 'Digital Twin',
        desc: 'Build and simulate interconnected system models. Test hypotheses by injecting events and tracing cascading consequences through dependency graphs.',
      },
      {
        icon: '\u25E7',
        title: 'BIAS Control',
        desc: 'Systematic cognitive bias detection engine. Flags anchoring, confirmation bias, and groupthink patterns in analytical workflows.',
      },
      {
        icon: '\u2316',
        title: 'OSINT Atlas',
        desc: 'Open-source intelligence mapping across corporate structures, financial flows, and relationship networks. Entity resolution at scale.',
      },
    ],
  },
  {
    id: 'voice',
    title: '"The Voice"',
    subtitle: 'Decision Support',
    icon: <IconVoice />,
    modules: [
      {
        icon: '\u2726',
        title: 'AI Council',
        desc: 'Multi-persona deliberation engine. Adversarial AI perspectives challenge assumptions and stress-test conclusions from opposing viewpoints.',
      },
      {
        icon: '\u2263',
        title: 'Intel Report',
        desc: 'Automated analytical product generation. Structured intelligence reports with confidence levels, source citations, and dissenting opinions.',
      },
    ],
  },
];

function IntelStackSection() {
  return (
    <section className="vg__section" id="stack">
      <div className="vg__section-label">// Intelligence Stack</div>
      <div className="vg-stack__clusters">
        {STACK_CLUSTERS.map((cluster) => (
          <div className="vg-stack__cluster" key={cluster.id}>
            <div className="vg-stack__cluster-header">
              <div className="vg-stack__cluster-icon">{cluster.icon}</div>
              <div>
                <div className="vg-stack__cluster-title">{cluster.title}</div>
                <div className="vg-stack__cluster-subtitle">
                  {cluster.subtitle}
                </div>
              </div>
            </div>
            {cluster.modules.map((mod, i) => (
              <div className="vg-stack__card" key={i}>
                <div className="vg-stack__card-icon">{mod.icon}</div>
                <div className="vg-stack__card-title">{mod.title}</div>
                <div className="vg-stack__card-desc">{mod.desc}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. SPOTLIGHT — The AI Council
// ═══════════════════════════════════════════════════════════════════════════

const COUNCIL_PERSONAS = [
  {
    id: 'cynic',
    name: 'The Cynic',
    tag: 'Adversarial',
    body: `"This assessment relies on three unverified assumptions. If any single one fails, the entire conclusion collapses. Your confidence interval is a comforting fiction."`,
    prompt: '> analyzing dissent vectors...',
  },
  {
    id: 'optimist',
    name: 'The Optimist',
    tag: 'Opportunity',
    body: `"The disruption creates a 72-hour window where three competitors are equally blind. First-mover advantage here is worth 14x the defensive cost of inaction."`,
    prompt: '> scanning opportunity matrix...',
  },
  {
    id: 'strategist',
    name: 'The Strategist',
    tag: 'Synthesis',
    body: `"Both perspectives carry weight. The optimal path hedges against the Cynic's downside while positioning for the Optimist's upside. Here is the asymmetric play."`,
    prompt: '> synthesizing decision path...',
  },
];

function SpotlightSection() {
  return (
    <section className="vg__section" id="spotlight">
      <div className="vg__section-label">// Spotlight</div>
      <div className="vg-spotlight">
        <h2 className="vg-spotlight__headline">
          Escape the Echo Chamber.
        </h2>
        <p className="vg-spotlight__desc">
          The AI Council deploys multiple adversarial personas to challenge every
          analytical conclusion. No single perspective dominates. Dissent is
          engineered into the system — because the most dangerous analysis is
          the one nobody questioned.
        </p>

        <div className="vg-spotlight__council">
          {COUNCIL_PERSONAS.map((p) => (
            <div
              className={`vg-spotlight__persona vg-spotlight__persona--${p.id}`}
              key={p.id}
            >
              <div className="vg-spotlight__persona-header">
                <span className="vg-spotlight__persona-name">{p.name}</span>
                <span className="vg-spotlight__persona-tag">{p.tag}</span>
              </div>
              <div className="vg-spotlight__persona-body">
                <div className="prompt-line">{p.prompt}</div>
                {p.body}
                <Cursor />
              </div>
            </div>
          ))}
        </div>

        <div className="vg-spotlight__convergence">
          <span className="vg-spotlight__convergence-line" />
          <span className="vg-spotlight__convergence-node" />
          <span className="vg-spotlight__convergence-label">
            Converged Decision Output
          </span>
          <span className="vg-spotlight__convergence-node" />
          <span className="vg-spotlight__convergence-line" />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. ARCHITECTURE & SECURITY
// ═══════════════════════════════════════════════════════════════════════════

const ARCH_PILLARS = [
  {
    icon: <IconTransparent />,
    title: 'Not a Black Box',
    desc: 'Every analytical output is fully traceable. Decision logic is documented, assumption chains are visible, and confidence levels carry explicit rationale. Audit any conclusion back to its source data.',
  },
  {
    icon: <IconHuman />,
    title: 'Human in the Loop',
    desc: 'The system informs — it does not decide. AI-generated insights are always presented as recommendations, never as directives. Final authority remains with the human operator at every stage.',
  },
  {
    icon: <IconShield />,
    title: 'Admin Oversight',
    desc: 'Centralized command dashboard with role-based access, complete audit trails, and granular permissions. Monitor system usage, flag anomalies, and maintain institutional control.',
  },
];

function ArchitectureSection() {
  return (
    <section className="vg__section" id="architecture">
      <div className="vg__section-label">// Architecture</div>
      <div className="vg-arch__pillars">
        {ARCH_PILLARS.map((pillar, i) => (
          <div className="vg-arch__pillar" key={i}>
            <div className="vg-arch__pillar-icon">{pillar.icon}</div>
            <h3 className="vg-arch__pillar-title">{pillar.title}</h3>
            <p className="vg-arch__pillar-desc">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 7. FOOTER
// ═══════════════════════════════════════════════════════════════════════════

function FooterSection() {
  return (
    <footer className="vg-footer">
      <div className="vg-footer__inner">
        <div className="vg-footer__links">
          <a href="#docs" className="vg-footer__link">Documentation</a>
          <span className="vg-footer__link-sep">&middot;</span>
          <a href="#api" className="vg-footer__link">API Reference</a>
          <span className="vg-footer__link-sep">&middot;</span>
          <a href="#status" className="vg-footer__link">System Status</a>
        </div>
        <div className="vg-footer__center">
          <div className="vg-footer__tagline">
            Manage Uncertainty Systematically.
          </div>
          <div className="vg-footer__wordmark">Achilles Analytics</div>
        </div>
        <div className="vg-footer__right">
          &copy; {new Date().getFullYear()} Achilles Analytics
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export default function VariantGrid() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <PhilosophySection />
      <SectionDivider />
      <CoreEngineSection />
      <SectionDivider />
      <IntelStackSection />
      <SectionDivider />
      <SpotlightSection />
      <SectionDivider />
      <ArchitectureSection />
      <SectionDivider />
      <FooterSection />
    </>
  );
}
