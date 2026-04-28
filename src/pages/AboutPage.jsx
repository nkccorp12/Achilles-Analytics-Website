import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import './LandingPage.css';
import './NewPage.css';
import './AboutPage.css';
import WhitelistButton from '../components/WhitelistButton';
import AICouncilFloatingPill from '../components/AICouncilFloatingPill';

const HiringPill = lazy(() => import('../components/HiringPill'));

const Cursor = () => <span className="neu__cursor" aria-hidden="true" />;

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('ab-in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function AboutPage() {
  const rootRef = useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => setIsMobileNav(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div className="neu ab" ref={rootRef}>
      {/* ═══ FIXED HEADER ═══ */}
      <header className="neu-header neu-header--visible ab-header">
        <div className="neu-header__inner">
          <a href="/" className="neu-header__wordmark" style={{ textDecoration: 'none' }}>
            <span>ACHILLES</span> <span className="neu-header__wordmark-sub">ANALYTICS</span>
          </a>
          <nav className="neu-header__nav">
            <a href="/#use-cases" className="neu-header__link">Case Study</a>
            <a href="/#intel-stack" className="neu-header__link">The Stack</a>
            <a href="/#ai-council" className="neu-header__link">AI Council</a>
            <a href="/about" className="neu-header__link ab-nav-active">About</a>
            <a
              href="https://www.linkedin.com/company/achilles-analytics-ltd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Achilles Analytics on LinkedIn"
              className="neu-header__link np-header__social"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.778 13.019H3.555V9h3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </nav>
        </div>
      </header>

      {/* ═══ HERO — ORIGIN ═══ */}
      <section className="ab-hero">
        <div className="ab-hero__grid" aria-hidden="true" />
        <div className="ab-hero__inner">
          <div className="ab-label" data-reveal>// ORIGIN</div>
          <h1 className="ab-hero__headline" data-reveal>
            Started as a question.<br /><em>Became conviction.</em>
          </h1>
          <p className="ab-hero__lead" data-reveal>
            It is a research project on the shape of modern intelligence, built
            by practitioners who got tired of waiting for the tools that should
            already exist.<Cursor />
          </p>

        </div>
      </section>

      {/* ═══ 01 — THESIS ═══ */}
      <section className="ab-section ab-section--thesis">
        <div className="ab-section__rail">
          <span className="ab-section__num">01</span>
          <span className="ab-section__rail-line" />
        </div>
        <div className="ab-section__inner">
          <div className="ab-label" data-reveal>// THESIS</div>
          <h2 className="ab-section__headline" data-reveal>
            Four things we believe.
          </h2>

          <ol className="ab-thesis">
            <li className="ab-thesis__item" data-reveal>
              <span className="ab-thesis__num">01</span>
              <div className="ab-thesis__body">
                <h3 className="ab-thesis__title">Data is not the problem. <em>Topology is.</em></h3>
                <p>
                  Every organisation drowns in analytics. Almost none of it
                  explains how the pieces connect, or what happens next. We
                  model the structure of relations between actors, signals,
                  and consequences.
                </p>
              </div>
            </li>

            <li className="ab-thesis__item" data-reveal>
              <span className="ab-thesis__num">02</span>
              <div className="ab-thesis__body">
                <h3 className="ab-thesis__title">Decision making is a craft, <em>not the return of an algorithm.</em></h3>
                <p>
                  No model replaces judgement. A good instrument makes that
                  judgement legible, auditable, and faster. Tools should earn
                  their place on the desk of a working analyst, not perform
                  intelligence on a slide.
                </p>
              </div>
            </li>

            <li className="ab-thesis__item" data-reveal>
              <span className="ab-thesis__num">03</span>
              <div className="ab-thesis__body">
                <h3 className="ab-thesis__title">Intelligence must be <em>transparent.</em></h3>
                <p>
                  If we cannot show you how a conclusion was reached, it is not
                  a conclusion. It is a guess in uniform. Every inference on
                  this platform is traceable to its source, its prompt, and its
                  assumptions.
                </p>
              </div>
            </li>

            <li className="ab-thesis__item" data-reveal>
              <span className="ab-thesis__num">04</span>
              <div className="ab-thesis__body">
                <h3 className="ab-thesis__title">The team is the <em>domain brain.</em> Claude Code is the print.</h3>
                <p>
                  Domain knowledge beats code knowledge. AI writes the code;
                  we own the domain. Every module is shaped by the people who
                  lived the problem. The model is a tool. The judgement is ours.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ═══ 02 — WHAT WE AREN'T ═══ */}
      <section className="ab-section ab-section--negative">
        <div className="ab-section__rail">
          <span className="ab-section__num">02</span>
          <span className="ab-section__rail-line" />
        </div>
        <div className="ab-section__inner">
          <div className="ab-label" data-reveal>// WHAT WE ARE NOT</div>
          <h2 className="ab-section__headline" data-reveal>
            We are deliberate about what <em>this isn't.</em>
          </h2>

          <div className="ab-neg">
            <div className="ab-neg__row" data-reveal>
              <span className="ab-neg__strike">NOT</span>
              <div>
                <h3>A SaaS company.</h3>
                <p>No sales team. No growth funnel. No onboarding sequence designed to get you to a credit card field.</p>
              </div>
            </div>
            <div className="ab-neg__row" data-reveal>
              <span className="ab-neg__strike">NOT</span>
              <div>
                <h3>A black-box AI product.</h3>
                <p>Every inference leaves a trail. If the logic is not visible, the output is not a finding.</p>
              </div>
            </div>
            <div className="ab-neg__row" data-reveal>
              <span className="ab-neg__strike">NOT</span>
              <div>
                <h3>A consultancy.</h3>
                <p>We don't bill hours to produce decks. We build instruments and give the people who need them access.</p>
              </div>
            </div>
            <div className="ab-neg__row" data-reveal>
              <span className="ab-neg__strike">NOT</span>
              <div>
                <h3>A pitch.</h3>
                <p>We would rather show the working product than talk about the vision. The landing page is the product brief.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 03 — HOW WE BUILD ═══ */}
      <section className="ab-section ab-section--build">
        <div className="ab-section__rail">
          <span className="ab-section__num">03</span>
          <span className="ab-section__rail-line" />
        </div>
        <div className="ab-section__inner">
          <div className="ab-label" data-reveal>// METHOD</div>
          <h2 className="ab-section__headline" data-reveal>
            Small crew. Handmade. <em>Slow on purpose.</em>
          </h2>

          <div className="ab-build">
            <div className="ab-build__col" data-reveal>
              <p className="ab-build__lead">
                Achilles is assembled by a small crew of analysts, engineers,
                and domain practitioners. There are no investors telling us
                what to build. The roadmap is written in the field, by the
                people using the instruments, not in a boardroom.
              </p>
              <p className="ab-build__lead">
                We publish what we learn. In the field log, in the docs, and
                occasionally in the code itself. Modules that don't pull
                their weight don't stay in the stack.
              </p>
              <p className="ab-build__tagline" data-reveal>
                <span className="ab-build__tagline-mark">//</span>
                The team is the domain brain.
                <em> Agentic code is the print.</em>
              </p>
            </div>

            <ul className="ab-build__list" data-reveal>
              <li><span className="ab-build__k">STACK</span><span className="ab-build__v">Open tools where possible. Documented. Auditable.</span></li>
              <li><span className="ab-build__k">ACCESS</span><span className="ab-build__v">Invite-based. A selective squad who gets it beats a thousand who don't.</span></li>
              <li><span className="ab-build__k">CADENCE</span><span className="ab-build__v">Ship when the tool earns its weight. Not on a quarter.</span></li>
              <li><span className="ab-build__k">FUNDING</span><span className="ab-build__v">Self-directed. No growth targets imposed from outside.</span></li>
              <li><span className="ab-build__k">PUBLIC</span><span className="ab-build__v">Field log, documentation, and source where it makes sense.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ 04 — STATUS ═══ */}
      <section className="ab-section ab-section--status">
        <div className="ab-section__rail">
          <span className="ab-section__num">04</span>
          <span className="ab-section__rail-line" />
        </div>
        <div className="ab-section__inner">
          <div className="ab-label" data-reveal>// STATUS</div>
          <h2 className="ab-section__headline" data-reveal>
            Where the project is <em>right now.</em>
          </h2>

          <div className="ab-status">
            <div className="ab-status__card" data-reveal>
              <span className="ab-status__k">PHASE</span>
              <span className="ab-status__v">
                <span className="ab-status__pulse" />Public beta
              </span>
              <p>The platform is live and running against real-world streams. It is a beta. Some things break, some flows are unfinished, and we log what doesn't work instead of hiding it.</p>
            </div>
            <div className="ab-status__card" data-reveal>
              <span className="ab-status__k">CAPABILITIES</span>
              <span className="ab-status__v">04 active</span>
              <p>Vulnerability Detection · Crisis Monitoring · Political Stance Evaluation · Agentic Risk Management.</p>
            </div>
            <div className="ab-status__card" data-reveal>
              <span className="ab-status__k">OPERATIONS</span>
              <span className="ab-status__v">Canada · distributed</span>
              <p>Primary node in Canada. Crew is distributed across time zones. Every pipeline change lands in the audit log.</p>
            </div>
            <div className="ab-status__card" data-reveal>
              <span className="ab-status__k">ROADMAP</span>
              <span className="ab-status__v">Practitioner-driven</span>
              <p>Next modules are written by what the people using the stack actually need, not by a growth plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING STATEMENT ═══ */}
      <section className="ab-close">
        <div className="ab-close__inner">
          <div className="ab-label" data-reveal>// SIGNING OFF</div>
          <p className="ab-close__pull" data-reveal>
            If you recognise the problem, you are probably the person we built this for.
            <br />
            <span className="ab-close__pull-alt">Everyone else is welcome to read along.</span>
          </p>
          <div className="ab-close__ctas" data-reveal>
            <WhitelistButton className="neu-hero__cta neu-hero__cta--primary" baseLabel="Join Whitelist" />
            <a href="/#reach-out" className="neu-hero__cta neu-hero__cta--secondary">Reach Out</a>
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

      {/* ═══ FLOATING PILL STACK (HiringPill + AI Council, gap-stacked) ═══ */}
      <div className="np-pill-stack">
        <Suspense fallback={null}><HiringPill /></Suspense>
        <AICouncilFloatingPill />
      </div>
    </div>
  );
}
