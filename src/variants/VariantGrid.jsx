import './VariantGrid.css';
import CardSwap, { Card } from '../components/CardSwap';
import { useMediaQuery } from '../hooks/useMediaQuery';

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANT GRID — "Tactical Grid" Command Center Aesthetic
   Achilles Analytics Landing Page
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Inline SVG Icons (no external deps) ────────────────────────────────────

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
      </div>

      {/* Main content */}
      <div className="vg-hero__content">
        <h1 className="vg-hero__headline">
          Make the consequences <em>visible</em> — before they occur.
        </h1>
        <p className="vg-hero__sub">
          We turn fragmented data into structured foresight — exposing
          blind spots before they become consequences.
          <Cursor />
        </p>
        <div className="vg-hero__ctas">
          <a href="http://82.165.45.74:8100" className="vg-hero__cta vg-hero__cta--primary">
            Access Platform
          </a>
          <a href="#architecture" className="vg-hero__cta vg-hero__cta--secondary">
            Explore the Architecture
          </a>
        </div>
      </div>

      {/* Static Logo */}
      <div className="vg-hero__particle-wrap" aria-hidden="true">
        <img src="/logo.png" alt="" className="vg-hero__logo" />
      </div>

    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. PHILOSOPHY — "The Blind Spot"
// ═══════════════════════════════════════════════════════════════════════════

const INTEL_PRODUCTS = [
  { group: 'THE EYES',  name: 'Crisis Map',          desc: 'Real-time global crisis monitoring & geospatial threat visualization.', img: '/map.webp' },
  { group: 'THE BRAIN', name: 'Digital Twin',         desc: '3D network relationship mapping of adversary connections.', img: '/twin.webp' },
  { group: 'THE BRAIN', name: 'OSINT Atlas',          desc: 'Active tool orchestration for targeted intelligence gathering.', img: '/twin2.webp' },
  { group: 'THE VOICE', name: 'AI Strategic Council', desc: 'Multi-persona AI debate engine for adversarial stress-testing.', img: '/report.webp' },
];

function PhilosophySection() {
  // Responsive breakpoint detection
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // Compute responsive dimensions based on viewport
  const cardWidth = isMobile ? 280 : isTablet ? 320 : 380;
  const cardHeight = isMobile ? 220 : isTablet ? 280 : 320;
  const cardDist = isMobile ? 25 : isTablet ? 32 : 40;
  const vertDist = isMobile ? 20 : isTablet ? 40 : 50;

  return (
    <section className="vg__section" id="philosophy">
      <div className="vg__section-label">// Philosophy</div>
      <div className="vg-philosophy">
        {/* Left: Text */}
        <div className="vg-philosophy__text">
          <blockquote className="vg-philosophy__quote">
            &ldquo;The critical failure is never a lack of information — it is a lack of structured interpretation.&rdquo;
          </blockquote>
          <p className="vg-philosophy__message">
            We do not replace intuition with AI — we make{' '}
            <strong>decision logic explicit and auditable</strong>. Every
            analytical output traces back to its source assumptions, every risk
            assessment carries a documented rationale, and every recommendation
            is stress-tested against adversarial perspectives.
          </p>
        </div>

        {/* Right: Card Swap */}
        <div className="vg-philosophy__panel">
          <CardSwap
            width={cardWidth}
            height={cardHeight}
            cardDistance={cardDist}
            verticalDistance={vertDist}
            delay={3000}
            pauseOnHover={false}
            skewAmount={4}
            easing="elastic"
          >
            {INTEL_PRODUCTS.map((p) => (
              <Card key={p.name} className="vg-philosophy__card">
                <img src={p.img} alt="" className="vg-philosophy__card-img" />
                <div className="vg-philosophy__card-body">
                  <span className="vg-philosophy__card-tag">{p.group}</span>
                  <h4 className="vg-philosophy__card-title">{p.name}</h4>
                  <p className="vg-philosophy__card-desc">{p.desc}</p>
                </div>
              </Card>
            ))}
          </CardSwap>

        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. ARCHITECTURE & SECURITY
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
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export { ArchitectureSection, PhilosophySection };

export default function VariantGrid() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <PhilosophySection />
    </>
  );
}
