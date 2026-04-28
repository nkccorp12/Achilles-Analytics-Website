import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './HeroTestRadar.css';
import './LandingPage.css';

/* ======================================================================
   HERO TEST — RADAR LOCK-ON
   A semi-transparent radar sweep rotates over the hero on load.
   It "locks onto" the headline word "consequences" — corner brackets
   snap to the word, a brief LOCKED badge flashes, then the sweep dims
   to a constant low-opacity scanline. Total intro ~2.5s.
   ====================================================================== */

const SWEEP_DURATION_MS = 1800;   // one full rotation
const LOCK_AT_MS = 1100;          // when crosshair snaps onto target
const LOCKED_BADGE_MS = 1700;     // when LOCKED badge appears
const INTRO_END_MS = 2500;        // sweep dims to scanline

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HeroTestRadar() {
  const reduceMotion = typeof window !== 'undefined' ? prefersReducedMotion() : false;

  const heroRef = useRef(null);
  const targetRef = useRef(null);

  const [targetRect, setTargetRect] = useState(null);
  const [phase, setPhase] = useState(reduceMotion ? 'idle' : 'sweeping');
  // phases: 'sweeping' -> 'locking' -> 'locked' -> 'idle'
  const [showLocked, setShowLocked] = useState(reduceMotion);
  const [showCrosshair, setShowCrosshair] = useState(reduceMotion);

  // Compute target bounding rect relative to hero container
  useLayoutEffect(() => {
    function measure() {
      if (!heroRef.current || !targetRef.current) return;
      const heroBox = heroRef.current.getBoundingClientRect();
      const tBox = targetRef.current.getBoundingClientRect();
      setTargetRect({
        left: tBox.left - heroBox.left,
        top: tBox.top - heroBox.top,
        width: tBox.width,
        height: tBox.height,
      });
    }
    measure();
    window.addEventListener('resize', measure);
    // re-measure once fonts are settled
    const t = setTimeout(measure, 60);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, []);

  // Intro timeline
  useEffect(() => {
    if (reduceMotion) return;
    const timers = [];
    timers.push(
      setTimeout(() => {
        setPhase('locking');
        setShowCrosshair(true);
      }, LOCK_AT_MS)
    );
    timers.push(
      setTimeout(() => {
        setShowLocked(true);
        setPhase('locked');
      }, LOCKED_BADGE_MS)
    );
    timers.push(
      setTimeout(() => {
        setPhase('idle');
      }, INTRO_END_MS)
    );
    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  const crosshairStyle = targetRect
    ? {
        left: `${targetRect.left}px`,
        top: `${targetRect.top}px`,
        width: `${targetRect.width}px`,
        height: `${targetRect.height}px`,
      }
    : { display: 'none' };

  return (
    <div className={`htradar neu htradar--phase-${phase}`}>
      {/* Header */}
      <header className="neu-header neu-header--visible">
        <div className="neu-header__inner">
          <a href="/" className="neu-header__wordmark">
            ACHILLES <span>ANALYTICS</span>
          </a>
          <nav className="neu-header__nav">
            <a href="/hero-test" className="neu-header__link">
              / HERO TESTS
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="htradar__hero" ref={heroRef}>
        {/* Radar sweep cone — rotates once during intro */}
        <div className="htradar__sweep" aria-hidden="true" />

        {/* Persistent low-opacity scanline overlay (after intro) */}
        <div className="htradar__scanline" aria-hidden="true" />

        {/* Range rings */}
        <div className="htradar__rings" aria-hidden="true">
          <span className="htradar__ring htradar__ring--1" />
          <span className="htradar__ring htradar__ring--2" />
          <span className="htradar__ring htradar__ring--3" />
        </div>

        {/* Crosshair — snaps to target */}
        {showCrosshair && targetRect && (
          <div
            className={`htradar__crosshair${
              phase === 'locked' || phase === 'idle' ? ' htradar__crosshair--locked' : ''
            }`}
            style={crosshairStyle}
            aria-hidden="true"
          >
            <span className="htradar__bracket htradar__bracket--tl" />
            <span className="htradar__bracket htradar__bracket--tr" />
            <span className="htradar__bracket htradar__bracket--bl" />
            <span className="htradar__bracket htradar__bracket--br" />
          </div>
        )}

        {/* LOCKED badge */}
        {showLocked && targetRect && (
          <div
            className="htradar__locked"
            style={{
              left: `${targetRect.left}px`,
              top: `${targetRect.top - 22}px`,
            }}
            aria-hidden="true"
          >
            LOCKED
          </div>
        )}

        {/* Telemetry counter */}
        <div className="htradar__telemetry" aria-hidden="true">
          TRACKING 9 OBJECTS &mdash; UPLINK STABLE
        </div>

        {/* Hero content */}
        <div className="htradar__hero-inner">
          <p className="htradar__eyebrow">SYSTEM ARMED // 47K SOURCES ONLINE</p>
          <h1 className="htradar__headline">
            Make the{' '}
            <span className="htradar-target" ref={targetRef}>
              consequences
            </span>{' '}
            <em>visible</em>, before they occur.
          </h1>
          <p className="htradar__subhead">
            We apply OSINT methodologies to turn fragmented data into structured
            intelligence that exposes blind spots before they become consequences.
          </p>
          <div className="htradar__ctas">
            <a className="htradar__cta htradar__cta--primary" href="#access">
              Access Platform
            </a>
            <a className="htradar__cta htradar__cta--secondary" href="#contact">
              Reach Out
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
