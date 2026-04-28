import { useEffect, useRef, lazy, Suspense } from 'react';
import { OpenAI, Gemini, Anthropic, Mistral, Grok, Meta, Qwen, DeepSeek, Cohere } from '@lobehub/icons';
import WhitelistButton from '../components/WhitelistButton';
import './LandingPage.css';
import './NewPage.css';
import './AICouncilPage.css';

const AICouncil = lazy(() => import('./AICouncil'));

const Cursor = () => <span className="neu__cursor" aria-hidden="true" />;

/* ─── Reveal-on-scroll hook ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('cp-in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ─── 10 Council Presets — real char names from council-standalone Wizard.jsx (32 advisors) ─── */
const PRESETS = [
  { id: 'strategy',     label: 'Strategy Team',        chars: ['Visionary', 'Operator', 'Analyst', 'Strategist'] },
  { id: 'tech',         label: 'Tech Council',         chars: ['Architect', 'Security Eng.', 'Platform Eng.', 'Senior Dev'] },
  { id: 'architect',    label: 'Architect Roundtable', chars: ['Distributed', 'Domain', 'Data', 'Platform'] },
  { id: 'marketing',    label: 'Marketing Team',       chars: ['Growth', 'Brand', 'Product', 'CMO'] },
  { id: 'data-science', label: 'Data Science',         chars: ['Data Scientist', 'Data Eng.', 'ML Eng.', 'BI Analyst'] },
  { id: 'osint',        label: 'OSINT Team',           chars: ['OSINT', 'Social', 'Geo Intel', 'Network'] },
  { id: 'data-intel',   label: 'Data Intelligence',    chars: ['ML Research', 'AI Architect', 'NLP', 'CV'] },
  { id: 'geopolitics',  label: 'Geopolitics',          chars: ['Geopolitical', 'Regional', 'Strategic', 'Conflict'] },
  { id: 'mixed',        label: 'Mixed',                chars: ['Wildcard panel, cross-domain mix'] },
  { id: 'custom',       label: 'Custom',               chars: ['Pick from 32 advisors'] },
];

/* ─── Inline icon set for presets — minimal, geometric, matches site ─── */
const Icon = ({ id }) => {
  const props = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (id) {
    case 'strategy':     return <svg {...props}><path d="M6 4h12l-2 6H8z" /><path d="M9 10v6h6v-6" /><path d="M5 20h14" /></svg>;
    case 'tech':         return <svg {...props}><path d="M8 9l-4 3 4 3" /><path d="M16 9l4 3-4 3" /><path d="M14 5l-4 14" /></svg>;
    case 'architect':    return <svg {...props}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 4v4M12 16v4M4 12h4M16 12h4" /></svg>;
    case 'marketing':    return <svg {...props}><path d="M3 11l18-7v16l-18-7z" /><path d="M11 7v10" /></svg>;
    case 'data-science': return <svg {...props}><path d="M3 20V8M9 20V4M15 20v-9M21 20v-5" /></svg>;
    case 'osint':        return <svg {...props}><circle cx="11" cy="11" r="6" /><path d="M15.5 15.5L21 21" /><circle cx="11" cy="11" r="2" /></svg>;
    case 'data-intel':   return <svg {...props}><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>;
    case 'mixed':        return <svg {...props}><circle cx="8" cy="8" r="4" /><circle cx="16" cy="16" r="4" /><circle cx="16" cy="8" r="4" /><circle cx="8" cy="16" r="4" /></svg>;
    case 'geopolitics':  return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></svg>;
    case 'custom':       return <svg {...props}><path d="M12 5v14M5 12h14" /></svg>;
    default:             return null;
  }
};

const FAILURE_MODES = [
  {
    label: 'Hallucination',
    desc: 'Confident, fluent, wrong. The output is shaped like an answer but the facts are invented. A single model has no second opinion.',
  },
  {
    label: 'Training Bias',
    desc: 'What the model saw shapes what the model says. Two frontier models trained on different corpora will disagree on the same prompt, and only one of them is closer to the truth.',
  },
  {
    label: 'Reasoning Drift',
    desc: 'Long chains of inference accumulate small errors. By step seven, the conclusion no longer follows from the premise. One model rarely catches its own drift.',
  },
  {
    label: 'Echo Chamber',
    desc: 'Asking the same model twice gives you the same blind spot twice. Conviction without independent checks is just confidence repeating itself.',
  },
];

export default function AICouncilPage() {
  const rootRef = useReveal();

  return (
    <div className="neu cp" ref={rootRef}>
      {/* ═══ HEADER ═══ */}
      <header className="neu-header neu-header--visible">
        <div className="neu-header__inner">
          <a href="/" className="neu-header__wordmark" style={{ textDecoration: 'none' }}>
            <span>ACHILLES</span> <span className="neu-header__wordmark-sub">ANALYTICS</span>
          </a>
          <nav className="neu-header__nav">
            <a href="/#use-cases" className="neu-header__link">Case Study</a>
            <a href="/#intel-stack" className="neu-header__link">The Stack</a>
            <a href="/council" className="neu-header__link cp-nav-active">AI Council</a>
            <a href="/about" className="neu-header__link">About</a>
            <a
              href="https://www.linkedin.com/company/achilles-analytics-ltd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Achilles Analytics on LinkedIn"
              className="neu-header__link np-header__social"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.778 13.019H3.555V9h3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </nav>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="cp-hero">
        <div className="cp-hero__grid" aria-hidden="true" />
        <div className="cp-hero__inner">
          <div className="cp-eyebrow" data-reveal>// STANDALONE PRODUCT · PUBLIC BETA</div>
          <h1 className="cp-hero__headline" data-reveal>
            Don't trust <em>one model.</em>
          </h1>
          <p className="cp-hero__lead" data-reveal>
            The AI Council is a peer-review engine for high-stakes questions.
            Four frontier models answer independently, rank each other blind,
            then a synthesizer distills consensus and dissent. Born from our
            research desk. Now yours to use.<Cursor />
          </p>

          {/* LLM provider strip */}
          <div className="cp-hero__models" data-reveal aria-hidden="true">
            <span className="cp-hero__models-label">// Engines on the panel</span>
            <div className="cp-hero__models-row">
              <OpenAI size={20} /><Anthropic size={20} /><Gemini size={20} />
              <Grok size={20} /><Mistral size={20} /><Meta size={20} />
              <Qwen size={20} /><DeepSeek size={20} /><Cohere size={20} />
              <span className="cp-hero__models-meta">355+ models routed via OpenRouter</span>
            </div>
          </div>

          <div className="cp-hero__ctas" data-reveal>
            <WhitelistButton className="neu-hero__cta neu-hero__cta--primary" baseLabel="Open the Council" hoverLabel="Open the Council" />
            <a href="#method" className="neu-hero__cta neu-hero__cta--secondary">Read the Method</a>
          </div>
        </div>
      </section>

      {/* ═══ 01 — THE PROBLEM ═══ */}
      <section className="cp-section cp-section--problem">
        <div className="cp-section__rail">
          <span className="cp-section__num">01</span>
          <span className="cp-section__rail-line" />
        </div>
        <div className="cp-section__inner">
          <div className="cp-eyebrow" data-reveal>// THE PROBLEM</div>
          <h2 className="cp-section__headline" data-reveal>
            AI is powerful. AI is also <em>wrong, often.</em>
          </h2>
          <p className="cp-section__lead" data-reveal>
            Every frontier model is brilliant in places and broken in others.
            The failure modes are well documented and they all share one root
            cause: a single model has no independent check on itself.
          </p>

          <ol className="cp-failures">
            {FAILURE_MODES.map((f, i) => (
              <li className="cp-failures__item" data-reveal key={f.label}>
                <span className="cp-failures__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="cp-failures__body">
                  <h3 className="cp-failures__title">{f.label}</h3>
                  <p>{f.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ 02 — RESEARCH ORIGIN ═══ */}
      <section className="cp-section cp-section--origin" id="method">
        <div className="cp-section__rail">
          <span className="cp-section__num">02</span>
          <span className="cp-section__rail-line" />
        </div>
        <div className="cp-section__inner">
          <div className="cp-eyebrow" data-reveal>// RESEARCH ORIGIN</div>
          <h2 className="cp-section__headline" data-reveal>
            We built this to <em>check our own work.</em>
          </h2>
          <div className="cp-origin">
            <div className="cp-origin__col" data-reveal>
              <p>
                Achilles is, at its core, a research project on how modern
                intelligence is structured. In our daily work we kept noticing
                the same thing: ask one frontier model and you get an answer.
                Ask three and the answers diverge in ways that change the brief.
              </p>
              <p>
                The cheap fix would have been to pick a favourite. We did not
                want a favourite. We wanted a method.
              </p>
              <p>
                So we built a peer-review loop. Every research output runs
                through four independent models. They rank each other blind.
                A synthesizer distills consensus, surfaces dissent, and flags
                anything where the panel cannot agree. The output of the
                Council is not <em>the</em> answer. It is the most defensible
                version of an answer we know how to produce.
              </p>
            </div>
            <aside className="cp-origin__pull" data-reveal>
              <span className="cp-origin__pull-mark">"</span>
              <p>
                Conviction without an independent check is just confidence
                repeating itself.
              </p>
              <span className="cp-origin__pull-attr">// from the field log</span>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══ 03 — PIPELINE (existing AICouncil component) ═══ */}
      <section className="cp-section cp-section--pipeline">
        <div className="cp-section__rail">
          <span className="cp-section__num">03</span>
          <span className="cp-section__rail-line" />
        </div>
        <div className="cp-section__inner">
          <div className="cp-eyebrow" data-reveal>// THE PIPELINE</div>
          <h2 className="cp-section__headline" data-reveal>
            Four answers in. <em>One ranked verdict out.</em>
          </h2>
          <p className="cp-section__lead" data-reveal>
            The same three-stage flow runs whether you are asking about
            geopolitical risk, a product decision, or an architecture review.
          </p>
        </div>

        {/* embed existing isometric viz */}
        <div className="cp-pipeline-embed" data-reveal>
          <Suspense fallback={null}><AICouncil /></Suspense>
        </div>
      </section>

      {/* ═══ 04 — PRESETS ═══ */}
      <section className="cp-section cp-section--presets">
        <div className="cp-section__rail">
          <span className="cp-section__num">04</span>
          <span className="cp-section__rail-line" />
        </div>
        <div className="cp-section__inner">
          <div className="cp-eyebrow" data-reveal>// PICK A COUNCIL</div>
          <h2 className="cp-section__headline" data-reveal>
            Ten preset panels, <em>or build your own.</em>
          </h2>
          <p className="cp-section__lead" data-reveal>
            Each preset assembles a different mix of advisor personas around
            the same multi-model engine. Pick the lens that matches your
            question.
          </p>

          <div className="cp-presets">
            {PRESETS.map((p, i) => (
              <div className="cp-presets__card" data-reveal key={p.id}>
                <div className="cp-presets__head">
                  <span className="cp-presets__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cp-presets__icon"><Icon id={p.id} /></span>
                </div>
                <h3 className="cp-presets__title">{p.label}</h3>
                <p className="cp-presets__chars">{p.chars.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 05 — INTERNAL USE ═══ */}
      <section className="cp-section cp-section--internal">
        <div className="cp-section__rail">
          <span className="cp-section__num">05</span>
          <span className="cp-section__rail-line" />
        </div>
        <div className="cp-section__inner">
          <div className="cp-eyebrow" data-reveal>// INTERNAL USE</div>
          <h2 className="cp-section__headline" data-reveal>
            Every Achilles brief runs through this <em>before it leaves the desk.</em>
          </h2>
          <p className="cp-section__lead" data-reveal>
            We do not use the Council to replace judgement. We use it to make
            judgement sharper. When the panel agrees, the brief carries that
            consensus. When the panel splits, the dissent ships with the
            output, named.
          </p>
        </div>
      </section>

      {/* ═══ CLOSING CTA ═══ */}
      <section className="cp-close">
        <div className="cp-close__inner">
          <div className="cp-eyebrow" data-reveal>// SIGNING OFF</div>
          <p className="cp-close__pull" data-reveal>
            Don't ask one model. Ask four. Run it past the Council.
          </p>
          <div className="cp-close__ctas" data-reveal>
            <WhitelistButton className="neu-hero__cta neu-hero__cta--primary" baseLabel="Open the Council" hoverLabel="Open the Council" />
            <a href="/about" className="neu-hero__cta neu-hero__cta--secondary">About Achilles</a>
          </div>
        </div>
      </section>

      {/* ═══ LEGAL FOOTER ═══ */}
      <footer className="neu-legal">
        <div className="neu-legal__links">
          <a href="/about" className="neu-legal__link">About</a>
          <span className="neu-legal__sep">&middot;</span>
          <a href="/privacy" className="neu-legal__link">Privacy Policy</a>
          <span className="neu-legal__sep">&middot;</span>
          <a href="/terms" className="neu-legal__link">Terms of Service</a>
        </div>
        <p className="neu-legal__copy">&copy; 2026 Achilles Analytics. A research project.</p>
        <p className="neu-legal__loc">Canada</p>
      </footer>
    </div>
  );
}
