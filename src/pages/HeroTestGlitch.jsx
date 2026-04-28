import React, { useEffect, useRef, useState } from 'react';
import './HeroTestGlitch.css';
import './LandingPage.css';

/* ======================================================================
   HERO TEST — GLITCH-IN + MATRIX DATAFALL
   On load: full-bleed katakana/binary rain (~1.5s) while the headline
   resolves out of an RGB-split chromatic glitch. Around 1.2s the offsets
   collapse to zero, the rain fades, and the hero stabilises.
   ====================================================================== */

const GLYPHS = '01アカサタナハマヤラワABCDEF';
const RAIN_DURATION_MS = 1500;     // full canvas lifetime
const RAIN_FADE_START_MS = 1100;   // when canvas begins fading out
const GLITCH_SETTLE_MS = 1200;     // when chromatic offsets snap to 0
const HERO_REVEAL_MS = 60;         // tiny delay before headline shows
const FONT_SIZE = 16;              // px per glyph cell

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HeroTestGlitch() {
  const reduceMotion = typeof window !== 'undefined' ? prefersReducedMotion() : false;

  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  const [rainGone, setRainGone] = useState(reduceMotion);
  const [rainFading, setRainFading] = useState(reduceMotion);
  const [glitchActive, setGlitchActive] = useState(!reduceMotion);
  const [heroVisible, setHeroVisible] = useState(false);

  // Reveal the hero (almost) immediately; glitch chrome rides on top.
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), HERO_REVEAL_MS);
    return () => clearTimeout(t);
  }, []);

  // Schedule glitch settle + rain fade/teardown.
  useEffect(() => {
    if (reduceMotion) return undefined;

    const settle = setTimeout(() => setGlitchActive(false), GLITCH_SETTLE_MS);
    const fade = setTimeout(() => setRainFading(true), RAIN_FADE_START_MS);
    const kill = setTimeout(() => setRainGone(true), RAIN_DURATION_MS + 250);

    return () => {
      clearTimeout(settle);
      clearTimeout(fade);
      clearTimeout(kill);
    };
  }, [reduceMotion]);

  // Matrix datafall on <canvas>.
  useEffect(() => {
    if (reduceMotion) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let cols = 0;
    let drops = [];        // y position per column (in cells)
    let speeds = [];       // per-column fall speed (cells per frame)
    let lastDraw = 0;

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / FONT_SIZE);
      drops = new Array(cols).fill(0).map(() => -Math.random() * 40);
      speeds = new Array(cols).fill(0).map(() => 0.6 + Math.random() * 1.1);
    }

    resize();
    window.addEventListener('resize', resize);

    ctx.font = `600 ${FONT_SIZE}px 'IBM Plex Mono', 'Courier New', monospace`;
    ctx.textBaseline = 'top';

    startRef.current = performance.now();

    function frame(now) {
      const elapsed = now - startRef.current;
      if (elapsed > RAIN_DURATION_MS + 400) {
        // Done — clear and stop.
        ctx.clearRect(0, 0, width, height);
        return;
      }

      // Frame-rate cap-ish so columns advance consistently (~60fps target).
      if (now - lastDraw < 28) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      lastDraw = now;

      // Trail: black with low alpha leaves a ghost behind each glyph.
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i += 1) {
        const x = i * FONT_SIZE;
        const yCell = drops[i];
        const y = yCell * FONT_SIZE;
        const ch = GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));

        // Head glyph hot-white, tail BCFF2F green.
        if (Math.random() < 0.06) {
          ctx.fillStyle = 'rgba(240, 255, 220, 0.95)';
        } else {
          ctx.fillStyle = 'rgba(188, 255, 47, 0.78)';
        }
        ctx.fillText(ch, x, y);

        if (y > height && Math.random() > 0.965) {
          drops[i] = -Math.random() * 20;
        }
        drops[i] += speeds[i];
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [reduceMotion]);

  return (
    <div className="htglitch neu">
      {/* Header (uses LandingPage.css .neu-header styles) */}
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

      <section className={`htglitch__hero${heroVisible ? ' htglitch__hero--visible' : ''}`}>
        {/* Matrix datafall canvas */}
        {!rainGone && (
          <canvas
            ref={canvasRef}
            className={`htglitch__rain${rainFading ? ' htglitch__rain--fading' : ''}`}
            aria-hidden="true"
          />
        )}

        {/* Scan-line + skip overlays — cosmetic, ride on top of rain */}
        {glitchActive && <div className="htglitch__scan" aria-hidden="true" />}
        {glitchActive && <div className="htglitch__skip" aria-hidden="true" />}

        <div className="htglitch__inner">
          <p className="htglitch__eyebrow">SIGNAL ACQUIRED // GLITCH-IN</p>

          <h1
            className={`htglitch__headline${glitchActive ? ' htglitch__headline--glitch' : ''}`}
            data-text="Make the consequences visible, before they occur."
          >
            {/* RGB-split clones (decorative) */}
            <span className="htglitch__ghost htglitch__ghost--r" aria-hidden="true">
              Make the consequences <em>visible</em>, before they occur.
            </span>
            <span className="htglitch__ghost htglitch__ghost--b" aria-hidden="true">
              Make the consequences <em>visible</em>, before they occur.
            </span>
            <span className="htglitch__real">
              Make the consequences <em>visible</em>, before they occur.
            </span>
          </h1>

          <p className="htglitch__subhead">
            We apply OSINT methodologies to turn fragmented data into structured
            intelligence that exposes blind spots before they become consequences.
          </p>

          <div className="htglitch__ctas">
            <a className="htglitch__cta htglitch__cta--primary" href="#access">
              Access Platform
            </a>
            <a className="htglitch__cta htglitch__cta--secondary" href="#contact">
              Reach Out
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
