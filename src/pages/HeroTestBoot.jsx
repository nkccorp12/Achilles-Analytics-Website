import React, { useEffect, useState } from 'react';
import './HeroTestBoot.css';
import './LandingPage.css';

/* ======================================================================
   HERO TEST — BOOT SEQUENCE
   Terminal-style boot log types over a black screen on load (~1.2s),
   ends with a brief neon-green flash, then the actual hero fades in.
   ====================================================================== */

const BOOT_LINES = [
  '> ACHILLES.SYS init...',
  '> CONNECTING TO 47K OSINT SOURCES... ✓',
  '> INDEXING SIGNALS... ✓',
  '> CALIBRATING DECISION MATRIX... ✓',
  '> SYSTEM ARMED.',
];

const CHAR_DELAY_MS = 18;       // per-character typing speed
const LINE_GAP_MS = 90;         // pause between lines
const FLASH_DURATION_MS = 200;  // green wash duration
const HERO_FADE_DELAY_MS = 220; // delay before hero appears after flash
const PRE_HERO_HOLD_MS = 280;   // hold on SYSTEM ARMED before flash

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HeroTestBoot() {
  const reduceMotion = typeof window !== 'undefined' ? prefersReducedMotion() : false;

  const [typedLines, setTypedLines] = useState(reduceMotion ? BOOT_LINES : []);
  const [currentLine, setCurrentLine] = useState(reduceMotion ? '' : '');
  const [bootDone, setBootDone] = useState(reduceMotion);
  const [flash, setFlash] = useState(false);
  const [terminalGone, setTerminalGone] = useState(reduceMotion);
  const [heroVisible, setHeroVisible] = useState(reduceMotion);

  // Boot typing sequence
  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    const timers = [];

    let lineIdx = 0;
    let charIdx = 0;

    function typeNextChar() {
      if (cancelled) return;
      const target = BOOT_LINES[lineIdx];

      if (charIdx <= target.length) {
        setCurrentLine(target.slice(0, charIdx));
        charIdx += 1;
        timers.push(setTimeout(typeNextChar, CHAR_DELAY_MS));
      } else {
        // Line finished — commit it, move on
        setTypedLines((prev) => [...prev, target]);
        setCurrentLine('');
        lineIdx += 1;
        charIdx = 0;

        if (lineIdx < BOOT_LINES.length) {
          timers.push(setTimeout(typeNextChar, LINE_GAP_MS));
        } else {
          // All lines done — hold, flash, then reveal hero
          timers.push(
            setTimeout(() => {
              if (cancelled) return;
              setFlash(true);
              timers.push(
                setTimeout(() => {
                  if (cancelled) return;
                  setFlash(false);
                  setBootDone(true);
                  timers.push(
                    setTimeout(() => {
                      if (cancelled) return;
                      setTerminalGone(true);
                      setHeroVisible(true);
                    }, HERO_FADE_DELAY_MS)
                  );
                }, FLASH_DURATION_MS)
              );
            }, PRE_HERO_HOLD_MS)
          );
        }
      }
    }

    timers.push(setTimeout(typeNextChar, 220));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduceMotion]);

  return (
    <div className="htboot neu">
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

      {/* Boot terminal overlay */}
      {!terminalGone && (
        <div
          className={`htboot__terminal${bootDone ? ' htboot__terminal--leaving' : ''}`}
          aria-hidden="true"
        >
          <div className="htboot__scanlines" />
          <pre className="htboot__log">
            {typedLines.map((line, i) => (
              <span key={i} className="htboot__line">
                {line}
                {'\n'}
              </span>
            ))}
            {!bootDone && (
              <span className="htboot__line htboot__line--active">
                {currentLine}
                <span className="htboot__cursor">&#9608;</span>
              </span>
            )}
          </pre>
        </div>
      )}

      {/* Green flash wash */}
      <div
        className={`htboot__flash${flash ? ' htboot__flash--on' : ''}`}
        aria-hidden="true"
      />

      {/* Actual hero */}
      <section
        className={`htboot__hero${heroVisible ? ' htboot__hero--visible' : ''}`}
      >
        <div className="htboot__hero-inner">
          <p className="htboot__eyebrow">SYSTEM ARMED // 47K SOURCES ONLINE</p>
          <h1 className="htboot__headline">
            Make the consequences <em>visible</em>, before they occur.
          </h1>
          <p className="htboot__subhead">
            We apply OSINT methodologies to turn fragmented data into structured
            intelligence that exposes blind spots before they become consequences.
          </p>
          <div className="htboot__ctas">
            <a className="htboot__cta htboot__cta--primary" href="#access">
              Access Platform
            </a>
            <a className="htboot__cta htboot__cta--secondary" href="#contact">
              Reach Out
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
