import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import './HeroTestBeam.css';

/* ======================================================================
   HERO TEST — STRIKE / BEAM CUT
   Page loads black. Neon-green beam sweeps L→R (~300ms), leaves cut line.
   Cut splits open vertically (200ms) revealing the Hero. Subtle screen
   shake at impact. Sword-slash reveal.
   Total intro: ~700ms (40 pre + 300 beam + 60 hold/shake + 220 split + ε)
   ====================================================================== */

const HeroTestBeam = () => {
  const [phase, setPhase] = useState('idle'); // idle | beam | impact | split | done
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReduced(true);
      setPhase('done');
      return;
    }

    const t1 = setTimeout(() => setPhase('beam'), 40);
    const t2 = setTimeout(() => setPhase('impact'), 40 + 300);
    const t3 = setTimeout(() => setPhase('split'), 40 + 300 + 60);
    const t4 = setTimeout(() => setPhase('done'), 40 + 300 + 60 + 240);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const stageClass = `htbeam htbeam--${phase}${reduced ? ' htbeam--reduced' : ''}`;

  return (
    <div className={stageClass}>
      {/* Header */}
      <header className="neu-header neu-header--visible">
        <div className="neu-header__inner">
          <a href="/" className="neu-header__wordmark" style={{ textDecoration: 'none' }}>
            <span>ACHILLES</span> <span className="neu-header__wordmark-sub">ANALYTICS</span>
          </a>
          <nav className="neu-header__nav">
            <a href="/hero-test" className="neu-header__link">/ HERO TESTS</a>
          </nav>
        </div>
      </header>

      {/* Hero (the thing being revealed) */}
      <section className="htbeam__hero">
        <div className="htbeam__hero-inner">
          <p className="htbeam__eyebrow">INTEL OS · v0.3</p>
          <h1 className="htbeam__headline">
            Make the consequences <em>visible</em>, before they occur.
          </h1>
          <p className="htbeam__sub">
            We apply OSINT methodologies to turn fragmented data into structured
            intelligence that exposes blind spots before they become consequences.
          </p>
          <div className="htbeam__ctas">
            <a href="#access" className="htbeam__cta htbeam__cta--primary">Access Platform</a>
            <a href="#reach" className="htbeam__cta htbeam__cta--secondary">Reach Out</a>
          </div>
        </div>
      </section>

      {/* Cut panels — top + bottom halves slide apart */}
      <div className="htbeam__panel htbeam__panel--top" aria-hidden="true" />
      <div className="htbeam__panel htbeam__panel--bottom" aria-hidden="true" />

      {/* The beam */}
      <div className="htbeam__beam-track" aria-hidden="true">
        <div className="htbeam__beam" />
      </div>

      {/* Cut line residue (briefly visible during split) */}
      <div className="htbeam__cutline" aria-hidden="true" />
    </div>
  );
};

export default HeroTestBeam;
