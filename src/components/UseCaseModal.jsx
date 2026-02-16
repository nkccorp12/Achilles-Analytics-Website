import { useState, useEffect } from 'react';
import './UseCaseModal.css';

/* ==========================================================================
   USE CASE MODAL — 3 Layout Variants for A/B Testing
   Near-fullscreen with hero images + rich content
   ========================================================================== */

const USE_CASE_DATA = {
  warehouse: {
    label: '// WAREHOUSE LOGISTICS',
    classification: 'OPERATIONAL // ACTIVE DEPLOYMENT',
    title: 'Warehouse & Distribution Logistics',
    image: '/warehouse.webp',
    desc: 'Real-time visibility into multi-site warehouse operations. Impact analysis detects cascading delays before they propagate through the supply chain. Vulnerability scanning surfaces single-points-of-failure in routing topology that traditional audits miss.',
    details: [
      'Predictive delay propagation across 5 interconnected sites',
      'Automated rerouting when bottlenecks are detected in real-time',
      'Single-point-of-failure identification in distribution networks',
      'Continuous throughput optimization with live KPI tracking',
    ],
    metrics: [
      { value: '96.3%', label: 'Delay Prediction', bar: 96 },
      { value: '\u221241%', label: 'Downtime Reduction', bar: 41 },
      { value: '+28%', label: 'Route Efficiency', bar: 28 },
      { value: '5', label: 'Sites Connected', bar: 83 },
    ],
    modules: ['Impact Engine', 'Vulnerability Scanner', 'Crisis Map'],
  },
  maritime: {
    label: '// MARITIME INTELLIGENCE',
    classification: 'OSINT-FED // LIVE MONITORING',
    title: 'Maritime Supply Chain Monitoring',
    image: '/maritime.webp',
    desc: 'Tracking global shipping routes with anomaly detection on port congestion, weather disruptions, and geopolitical risk zones. OSINT-fed intelligence provides early warning on route deviations, cargo exposure, and emerging threats across three ocean regions.',
    details: [
      'Live AIS tracking of 340+ active shipping routes worldwide',
      'Geopolitical risk corridor identification with threat scoring',
      'Port congestion forecasting with 48-hour advance warning',
      'Weather disruption modeling integrated with route alternatives',
    ],
    metrics: [
      { value: '340+', label: 'Routes Tracked', bar: 85 },
      { value: '89%', label: 'Threat Detection', bar: 89 },
      { value: '\u221252%', label: 'Response Time', bar: 52 },
      { value: '3', label: 'Ocean Regions', bar: 50 },
    ],
    modules: ['Crisis Map', 'News Hub', 'Impact Engine'],
  },
  infrastructure: {
    label: '// INFRASTRUCTURE PROTECTION',
    classification: 'AI-POWERED // CONTINUOUS AUDIT',
    title: 'Critical Infrastructure Protection',
    image: '/infra.webp',
    desc: 'Continuous vulnerability assessment of energy grids, telecom networks, and transportation hubs. AI Council debate surfaces blind spots in resilience planning that static audits miss. Digital Twin simulation stress-tests failure scenarios before they occur.',
    details: [
      '24/7 automated vulnerability scanning across 12 critical sectors',
      'AI-powered debate protocol identifies blind spots in resilience plans',
      'Digital Twin simulation of cascading failure scenarios',
      'BIAS Control ensures balanced assessment without algorithmic drift',
    ],
    metrics: [
      { value: '24/7', label: 'Monitoring', bar: 100 },
      { value: '97.1%', label: 'System Uptime', bar: 97 },
      { value: '12', label: 'Sectors Covered', bar: 80 },
      { value: '4', label: 'AI Agents Active', bar: 66 },
    ],
    modules: ['Digital Twin', 'AI Council', 'BIAS Control'],
  },
};

/* ─── SVG Visualizations ─── */

function WarehouseViz() {
  return (
    <svg className="ucm-viz-svg" viewBox="0 0 240 220" fill="none">
      <line x1="120" y1="40" x2="50" y2="110" className="ucm-viz-line" />
      <line x1="120" y1="40" x2="190" y2="110" className="ucm-viz-line" />
      <line x1="50" y1="110" x2="90" y2="180" className="ucm-viz-line" />
      <line x1="190" y1="110" x2="150" y2="180" className="ucm-viz-line" />
      <line x1="50" y1="110" x2="190" y2="110" className="ucm-viz-line" />
      <circle cx="120" cy="40" r="16" className="ucm-viz-node--active" />
      <circle cx="120" cy="40" r="4" fill="#BCFF2F" />
      <text x="120" y="24" textAnchor="middle" className="ucm-viz-label--active">HUB-01</text>
      <circle cx="50" cy="110" r="12" className="ucm-viz-node" />
      <circle cx="50" cy="110" r="3" fill="rgba(255,255,255,0.4)" />
      <text x="50" y="132" textAnchor="middle" className="ucm-viz-label">WH-W</text>
      <circle cx="190" cy="110" r="12" className="ucm-viz-node" />
      <circle cx="190" cy="110" r="3" fill="rgba(255,255,255,0.4)" />
      <text x="190" y="132" textAnchor="middle" className="ucm-viz-label">WH-E</text>
      <circle cx="90" cy="180" r="10" className="ucm-viz-node" />
      <circle cx="90" cy="180" r="3" fill="rgba(255,255,255,0.4)" />
      <text x="90" y="200" textAnchor="middle" className="ucm-viz-label">DIST-A</text>
      <circle cx="150" cy="180" r="10" className="ucm-viz-node" />
      <circle cx="150" cy="180" r="3" fill="rgba(255,255,255,0.4)" />
      <text x="150" y="200" textAnchor="middle" className="ucm-viz-label">DIST-B</text>
    </svg>
  );
}

function MaritimeViz() {
  return (
    <svg className="ucm-viz-svg" viewBox="0 0 240 200" fill="none">
      <path d="M30 60 Q80 30, 140 50 T210 40" className="ucm-viz-route" />
      <path d="M30 100 Q90 70, 130 100 T210 90" className="ucm-viz-route" style={{ opacity: 0.6 }} />
      <path d="M30 140 Q100 120, 150 150 T210 140" className="ucm-viz-route" style={{ opacity: 0.35 }} />
      <circle cx="30" cy="60" r="6" className="ucm-viz-port" />
      <circle cx="30" cy="100" r="6" className="ucm-viz-port" />
      <circle cx="30" cy="140" r="6" className="ucm-viz-port" />
      <circle cx="210" cy="40" r="6" className="ucm-viz-port--active" />
      <circle cx="210" cy="90" r="6" className="ucm-viz-port" />
      <circle cx="210" cy="140" r="6" className="ucm-viz-port" />
      <text x="30" y="172" textAnchor="middle" className="ucm-viz-label">ORIGIN</text>
      <text x="210" y="172" textAnchor="middle" className="ucm-viz-label">DEST</text>
    </svg>
  );
}

function InfraViz() {
  const hexPath = (cx, cy, r) => {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return `M${pts.join('L')}Z`;
  };
  const r = 30;
  const dx = r * Math.cos(Math.PI / 6);
  const dy = r * 1.5;
  const cx = 120, cy = 110;
  const hexes = [
    { x: cx, y: cy, active: true },
    { x: cx - dx, y: cy - dy / 2 - r * 0.25 },
    { x: cx + dx, y: cy - dy / 2 - r * 0.25 },
    { x: cx - dx * 2, y: cy },
    { x: cx + dx * 2, y: cy },
    { x: cx - dx, y: cy + dy / 2 + r * 0.25 },
    { x: cx + dx, y: cy + dy / 2 + r * 0.25 },
  ];
  return (
    <svg className="ucm-viz-svg" viewBox="0 0 240 220" fill="none">
      {hexes.map((h, i) => (
        <path key={i} d={hexPath(h.x, h.y, r * 0.92)} className={`ucm-viz-hex${h.active ? ' ucm-viz-hex--active' : ''}`} />
      ))}
      <circle cx={cx} cy={cy} r="8" fill="#BCFF2F" opacity="0.6" />
      <text x={cx} y={cy + 4} textAnchor="middle" className="ucm-viz-label--active">CORE</text>
    </svg>
  );
}

const VIZ_MAP = { warehouse: WarehouseViz, maritime: MaritimeViz, infrastructure: InfraViz };

/* ─── Shared Components ─── */

function HeroImage({ src }) {
  return (
    <div
      className="ucm-hero-img"
      style={{ backgroundImage: `url('${src}')` }}
    />
  );
}

function ModalShell({ phase, onClose, variant, children }) {
  return (
    <div className={`ucm-overlay ucm-overlay--${phase}`} onClick={onClose}>
      <div className={`ucm-modal ucm-modal--${phase} ucm-modal--${variant}`} onClick={(e) => e.stopPropagation()}>
        <div className="ucm-scan" />
        <div className="ucm-corner ucm-corner--tl" />
        <div className="ucm-corner ucm-corner--tr" />
        <div className="ucm-corner ucm-corner--bl" />
        <div className="ucm-corner ucm-corner--br" />
        {children}
      </div>
    </div>
  );
}

function CloseBtn({ onClose }) {
  return (
    <button className="ucm-close" onClick={onClose} aria-label="Close">
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}

function DetailsList({ details }) {
  return (
    <ul className="ucm-details">
      {details.map((d, i) => (
        <li key={i} className="ucm-details__item">{d}</li>
      ))}
    </ul>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VARIANT A — Split Panel (wide, content left + image+viz right)
   ═══════════════════════════════════════════════════════════════ */

function VariantA({ data, useCase, onClose }) {
  const Viz = VIZ_MAP[useCase];
  return (
    <div className="ucm-body ucm-body--a">
      <div className="ucm-a-left">
        <div className="ucm-header">
          <span className="ucm-header__label">{data.label}</span>
          <CloseBtn onClose={onClose} />
        </div>
        <h3 className="ucm-title">{data.title}</h3>
        <p className="ucm-desc">{data.desc}</p>
        <DetailsList details={data.details} />
        <div className="ucm-a-metrics">
          {data.metrics.map((m, i) => (
            <div className="ucm-a-metric" key={i}>
              <span className="ucm-a-metric__value">{m.value}</span>
              <span className="ucm-a-metric__label">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="ucm-modules">
          {data.modules.map((mod, i) => (<span className="ucm-module" key={i}>{mod}</span>))}
        </div>
      </div>
      <div className="ucm-a-right">
        <HeroImage src={data.image} />
        <div className="ucm-a-glow" />
        <Viz />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VARIANT B — Full Bleed Hero (image hero top + content below)
   ═══════════════════════════════════════════════════════════════ */

function VariantB({ data, useCase, onClose }) {
  const Viz = VIZ_MAP[useCase];
  return (
    <>
      <div className="ucm-b-hero">
        <HeroImage src={data.image} />
        <div className="ucm-b-hero__grid" />
        <Viz />
        <CloseBtn onClose={onClose} />
      </div>
      <div className="ucm-body ucm-body--b">
        <div className="ucm-header">
          <span className="ucm-header__label">{data.label}</span>
        </div>
        <h3 className="ucm-title">{data.title}</h3>
        <p className="ucm-desc">{data.desc}</p>
        <DetailsList details={data.details} />
        <div className="ucm-b-metrics">
          {data.metrics.map((m, i) => (
            <div className="ucm-b-metric" key={i}>
              <span className="ucm-b-metric__value">{m.value}</span>
              <span className="ucm-b-metric__label">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="ucm-modules">
          {data.modules.map((mod, i) => (<span className="ucm-module" key={i}>{mod}</span>))}
        </div>
        <div className="ucm-b-footer">
          <span className="ucm-b-footer__line" />
          <span className="ucm-b-footer__text">Powered by Achilles</span>
          <span className="ucm-b-footer__line" />
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VARIANT C — Intel Briefing Card (document-style with image header)
   ═══════════════════════════════════════════════════════════════ */

function VariantC({ data, useCase, onClose }) {
  const Viz = VIZ_MAP[useCase];
  return (
    <>
      <div className="ucm-c-hero">
        <HeroImage src={data.image} />
        <div className="ucm-c-hero__overlay">
          <span className="ucm-c-hero__label">{data.label}</span>
        </div>
        <CloseBtn onClose={onClose} />
      </div>
      <div className="ucm-body ucm-body--c">
        <div className="ucm-c-badge">
          <span className="ucm-c-badge__dot" />
          {data.classification}
        </div>
        <h3 className="ucm-title">{data.title}</h3>
        <p className="ucm-desc">{data.desc}</p>
        <DetailsList details={data.details} />
        <div className="ucm-c-divider" />
        <div className="ucm-c-section">KEY METRICS</div>
        <div className="ucm-c-metrics">
          {data.metrics.map((m, i) => (
            <div className="ucm-c-metric" key={i}>
              <div className="ucm-c-metric__row">
                <span className="ucm-c-metric__label">{m.label}</span>
                <span className="ucm-c-metric__value">{m.value}</span>
              </div>
              <div className="ucm-c-metric__track">
                <div className="ucm-c-metric__fill" style={{ '--bar-pct': `${m.bar}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="ucm-c-divider" />
        <div className="ucm-c-section">ACTIVE MODULES</div>
        <div className="ucm-modules">
          {data.modules.map((mod, i) => (<span className="ucm-module" key={i}>{mod}</span>))}
        </div>
        <div className="ucm-c-viz-wrap">
          <Viz />
        </div>
        <div className="ucm-c-footer">CLASSIFICATION: STRATEGIC</div>
      </div>
    </>
  );
}

/* ─── Main Export ─── */

export default function UseCaseModal({ open, onClose, useCase, variant = 'a' }) {
  const [phase, setPhase] = useState('closed');

  useEffect(() => {
    if (open) {
      setPhase('opening');
    } else if (phase !== 'closed') {
      setPhase('closing');
      const t = setTimeout(() => setPhase('closed'), 600);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (phase === 'closed') return null;

  const data = USE_CASE_DATA[useCase] || USE_CASE_DATA.warehouse;
  const Content = variant === 'b' ? VariantB : variant === 'c' ? VariantC : VariantA;

  return (
    <ModalShell phase={phase} onClose={onClose} variant={variant}>
      <Content data={data} useCase={useCase || 'warehouse'} onClose={onClose} />
    </ModalShell>
  );
}
