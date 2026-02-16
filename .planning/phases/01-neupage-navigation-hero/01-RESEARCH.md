# Phase 1: NeuPage Navigation & Hero - Research

**Researched:** 2026-02-16
**Domain:** Mobile-first responsive navigation, touch interactions, CSS viewport units
**Confidence:** HIGH

## Summary

This phase focuses on making the NeuPage component fully functional on mobile devices by implementing a hamburger menu, adding touch support for the laser reveal effect, and fixing responsive spacing issues. The current codebase uses vanilla React with CSS—no additional dependencies should be added.

**Key technical domains:**
- Mobile navigation patterns (hamburger menu with vanilla JavaScript/React state)
- Touch event handling for WebGL laser reveal effect
- Responsive CSS breakpoints and viewport units
- Typography and spacing optimization for mobile screens
- BEM CSS naming conventions

The standard modern approach for 2026 is to use pointer events (instead of separate touch/mouse handlers), CSS transitions for menu animations, and dynamic viewport units (dvh) for mobile height calculations. The existing codebase already uses React state management and BEM-style naming, making implementation straightforward.

**Primary recommendation:** Implement a hamburger menu using React useState, add pointer event handlers to LaserFlow component for unified touch/mouse support, adjust spacing with responsive CSS media queries at 640px breakpoint, and use 100dvh with 100vh fallback for viewport height.

## Standard Stack

### Core Technologies (Already in Use)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 18.x | Component state management | Industry standard for UI components, useState hook perfect for menu toggle |
| CSS3 | N/A | Styling, transitions, media queries | Native browser support, no dependencies needed |
| Vanilla JavaScript | ES6+ | Event handling, DOM manipulation | Lightweight, no additional libraries required |

### Supporting Patterns
| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| Pointer Events API | Unified touch/mouse handling | ALL interactive elements on mobile (2026 standard) |
| Dynamic Viewport Units (dvh) | Mobile-safe viewport height | Any 100vh usage on mobile (with fallback) |
| CSS Transitions | Smooth menu animations | Hamburger menu slide-in/fade-in effects |
| React Hooks (useState) | Toggle state management | Hamburger menu open/close state |

### No Additional Dependencies Needed
The constraint "no new dependencies" is **ideal** for this phase. Modern CSS and vanilla JavaScript provide everything needed:
- CSS media queries for responsive breakpoints
- React useState for menu toggle
- CSS transitions for animations
- Pointer events for touch/mouse unification

## Architecture Patterns

### Recommended Component Structure
```
src/pages/
├── NeuPage.jsx           # Main component (add menu state here)
├── NeuPage.css           # All styles including responsive
src/components/
├── LaserFlow.jsx         # Add pointer events here
```

### Pattern 1: Hamburger Menu Toggle (React useState)
**What:** React state-based toggle for mobile menu visibility
**When to use:** Any mobile navigation requiring show/hide behavior
**Example:**
```jsx
// In NeuPage.jsx
const [menuOpen, setMenuOpen] = useState(false);

return (
  <header className={`neu-header${headerVisible ? ' neu-header--visible' : ''}`}>
    <div className="neu-header__wordmark">...</div>

    {/* Hamburger button */}
    <button
      className={`neu-header__hamburger${menuOpen ? ' neu-header__hamburger--active' : ''}`}
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle navigation menu"
      aria-expanded={menuOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav className={`neu-header__nav${menuOpen ? ' neu-header__nav--open' : ''}`}>
      <a href="#use-cases" onClick={() => setMenuOpen(false)}>Case Study</a>
      {/* ... */}
    </nav>
  </header>
);
```

### Pattern 2: Pointer Events for Touch/Mouse Unification
**What:** Single event handler for all input types (mouse, touch, stylus)
**When to use:** Any interactive element that needs both desktop and mobile support
**Example:**
```jsx
// In LaserFlow.jsx canvas setup
canvas.addEventListener('pointermove', onMove, { passive: true });
canvas.addEventListener('pointerleave', onLeave, { passive: true });

const onMove = (ev) => {
  const rect = rectRef.current;
  if (!rect) return;
  const ratio = currentDprRef.current;
  mouseTarget.set(
    (ev.clientX - rect.left) * ratio,
    rect.height * ratio - (ev.clientY - rect.top) * ratio
  );
};
```

### Pattern 3: Responsive Media Queries (Mobile-First)
**What:** Breakpoint-based styling starting from mobile base
**When to use:** All responsive layouts (industry standard 2026)
**Example:**
```css
/* Base styles (mobile) */
.neu-header {
  padding: 12px 16px;
}

.neu-header__wordmark {
  letter-spacing: 3px; /* Tighter on mobile */
}

/* Tablet and up */
@media (min-width: 640px) {
  .neu-header {
    padding: 16px 32px;
  }

  .neu-header__wordmark {
    letter-spacing: 6px; /* Original spacing */
  }

  .neu-header__hamburger {
    display: none; /* Hide hamburger on desktop */
  }

  .neu-header__nav {
    display: flex; /* Show full nav */
  }
}
```

### Pattern 4: Dynamic Viewport Units for Mobile
**What:** dvh units that adjust for mobile browser chrome
**When to use:** Any full-height sections on mobile
**Example:**
```css
.neu__laser {
  height: 100vh; /* Fallback for older browsers */
  height: 100dvh; /* Dynamic height accounting for mobile chrome */
}

.neu-hero {
  min-height: 100vh;
  min-height: 100dvh;
  margin-top: -40vh;
  margin-top: -40dvh;
}
```

### Anti-Patterns to Avoid

- **Separate touch and mouse handlers:** Don't use both `onMouseMove` and `onTouchMove`—use `pointerEvents` instead to avoid code duplication and edge cases
- **Fixed viewport heights on mobile:** Don't rely solely on `100vh` without `100dvh` fallback—mobile browsers show/hide chrome dynamically
- **display:none with no replacement:** Don't hide navigation on mobile without providing alternative (hamburger menu)
- **High-frequency event handlers without passive:** Don't add `pointermove`/`touchmove` listeners without `{ passive: true }` flag—causes scroll jank
- **ARIA menu role for navigation:** Don't use `role="menu"` for site navigation—causes accessibility issues (WebAIM 2026 findings show 25% of ARIA menus are broken)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Touch detection | Custom touch capability detection | Pointer Events API | Browser-native, handles all input types (97% support 2026) |
| Hamburger icon animation | Complex SVG animations | CSS-only three-bar animation | Simpler, better performance, no JavaScript needed |
| Menu slide animations | JavaScript-based position changes | CSS transitions on transform | GPU-accelerated, smoother 60fps animations |
| Viewport height calculation | JavaScript window resize handlers | CSS `dvh` units with `vh` fallback | Browser-native solution for mobile chrome issue |
| Responsive breakpoints | JavaScript window.matchMedia | CSS media queries | Declarative, better separation of concerns |

**Key insight:** Modern CSS and browser APIs solve most mobile interaction problems. Custom JavaScript solutions add complexity, hurt performance, and create maintenance burden. The "no new dependencies" constraint is actually beneficial—forces use of standard platform features.

## Common Pitfalls

### Pitfall 1: 100vh Cuts Off Content on Mobile
**What goes wrong:** Sections set to `100vh` get cut off by mobile browser address bar/chrome, causing bottom content to be hidden when page loads
**Why it happens:** Mobile browsers calculate `100vh` as the maximum viewport height (with chrome hidden), but chrome is visible on initial load
**How to avoid:** Use dynamic viewport units `100dvh` with `100vh` fallback
**Warning signs:** Users report "can't see buttons on mobile", layout jumps when scrolling

**Solution:**
```css
.neu__laser {
  height: 100vh;  /* Fallback */
  height: 100dvh; /* Modern solution */
}
```

### Pitfall 2: Touch Events Don't Work on LaserFlow
**What goes wrong:** Laser reveal effect works with mouse but not touch—users see static screen on mobile
**Why it happens:** Component only has `onMouseMove` handler, no touch event handling
**How to avoid:** Use Pointer Events API (`pointermove`) which handles mouse, touch, and stylus with single handler
**Warning signs:** Mobile users report "nothing happens when I touch the screen"

**Current code issue (lines 152-168 NeuPage.jsx):**
```jsx
// Only mouse events, no touch support
onMouseMove={(e) => { /* ... */ }}
onMouseLeave={() => { /* ... */ }}
```

**Solution:**
```jsx
// Use pointer events in LaserFlow.jsx canvas listener
canvas.addEventListener('pointermove', onMove, { passive: true });
canvas.addEventListener('pointerleave', onLeave, { passive: true });
```

### Pitfall 3: Hidden Navigation with No Mobile Alternative
**What goes wrong:** `display: none` on mobile nav links (line 842 NeuPage.css) leaves users with no way to navigate
**Why it happens:** Desktop nav removed for mobile, but no hamburger menu added as replacement
**How to avoid:** When hiding desktop nav, always add hamburger menu toggle for mobile
**Warning signs:** Mobile users can't access navigation links at all

**Current code issue:**
```css
@media (max-width: 640px) {
  .neu-header__link {
    display: none; /* Navigation completely hidden! */
  }
}
```

**Solution:** Add hamburger button + slide-in menu instead of hiding links

### Pitfall 4: Heavy Letter-Spacing on Mobile
**What goes wrong:** Wordmark with `letter-spacing: 6px` causes text to overflow or look cramped on narrow mobile screens
**Why it happens:** Desktop spacing optimized for wide screens, not responsive
**How to avoid:** Reduce letter-spacing on mobile breakpoints (3px or less for <640px)
**Warning signs:** Text wraps awkwardly, looks unbalanced on small screens

### Pitfall 5: Negative Margin on Short Screens
**What goes wrong:** `margin-top: -40vh` on hero section can cause overlap or cut-off content on short mobile screens (e.g., landscape orientation)
**Why it happens:** Fixed negative margin doesn't account for varying screen heights
**How to avoid:** Test on short screens, consider smaller negative margin for mobile (`-20vh` or `-30vh`)
**Warning signs:** Hero content overlaps laser section, bottom of hero cut off

### Pitfall 6: Passive Event Listeners Forgotten
**What goes wrong:** Adding `pointermove` or `touchmove` listeners without `{ passive: true }` causes scroll jank/performance issues
**Why it happens:** Browser must wait to see if handler calls `preventDefault()` before scrolling
**How to avoid:** Always add `{ passive: true }` to high-frequency listeners (move, scroll)
**Warning signs:** Choppy scrolling on mobile, low FPS during interactions

## Code Examples

### Example 1: Hamburger Menu HTML/JSX Structure
```jsx
// In NeuPage.jsx header section
const [menuOpen, setMenuOpen] = useState(false);

<header className={`neu-header${headerVisible ? ' neu-header--visible' : ''}`}>
  <div className="neu-header__wordmark">
    <span>A</span>CHILLES <span className="neu-header__wordmark-sub">Analytics</span>
  </div>

  {/* Hamburger button - only visible on mobile */}
  <button
    className={`neu-header__hamburger${menuOpen ? ' neu-header__hamburger--active' : ''}`}
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label="Toggle navigation menu"
    aria-expanded={menuOpen}
    aria-controls="main-navigation"
  >
    <span className="neu-header__hamburger-line"></span>
    <span className="neu-header__hamburger-line"></span>
    <span className="neu-header__hamburger-line"></span>
  </button>

  <nav
    id="main-navigation"
    className={`neu-header__nav${menuOpen ? ' neu-header__nav--open' : ''}`}
  >
    <a href="#use-cases" className="neu-header__link" onClick={() => setMenuOpen(false)}>
      Case Study
    </a>
    <a href="#intel-stack" className="neu-header__link" onClick={() => setMenuOpen(false)}>
      The Stack
    </a>
    <button
      onClick={() => { setContactOpen(true); setMenuOpen(false); }}
      className="neu-header__link neu-header__link--btn"
    >
      Reach Out
    </button>
    <a
      href="http://82.165.45.74:8100"
      className={`neu-header__cta${ctaVisible ? ' neu-header__cta--visible' : ''}`}
    >
      Access Platform
    </a>
  </nav>
</header>
```

### Example 2: Hamburger Icon CSS (Three-Line Animation)
```css
/* Hamburger button - hidden on desktop */
.neu-header__hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.neu-header__hamburger-line {
  width: 28px;
  height: 2px;
  background-color: var(--accent);
  border-radius: 1px;
  transition: all 0.3s ease;
  transform-origin: center;
}

/* Active state (X animation) */
.neu-header__hamburger--active .neu-header__hamburger-line:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.neu-header__hamburger--active .neu-header__hamburger-line:nth-child(2) {
  opacity: 0;
}

.neu-header__hamburger--active .neu-header__hamburger-line:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Show hamburger on mobile only */
@media (max-width: 640px) {
  .neu-header__hamburger {
    display: flex;
  }
}
```

### Example 3: Mobile Navigation Slide-In Menu
```css
/* Mobile navigation - slide in from right */
@media (max-width: 640px) {
  .neu-header__nav {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    height: 100dvh; /* Mobile-safe */
    width: 280px;
    max-width: 80vw;
    background: rgba(0, 0, 0, 0.98);
    backdrop-filter: blur(20px);
    border-left: 1px solid var(--border);
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 32px 32px;
    gap: 32px;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1000;
  }

  .neu-header__nav--open {
    transform: translateX(0);
  }

  .neu-header__link {
    display: block; /* Override display:none */
    width: 100%;
    font-size: 13px;
    padding: 8px 0;
  }

  .neu-header__cta {
    width: 100%;
    text-align: center;
    max-width: 100%; /* Override desktop max-width animation */
    padding: 12px 24px;
    opacity: 1; /* Always visible in mobile menu */
  }
}
```

### Example 4: Pointer Events in LaserFlow Component
```jsx
// In LaserFlow.jsx useEffect (around line 343)
// REPLACE onMouseMove canvas handlers with pointer events

const onMove = (ev) => {
  const rect = rectRef.current;
  if (!rect) return;
  const ratio = currentDprRef.current;
  // Works for mouse, touch, and stylus automatically
  mouseTarget.set(
    (ev.clientX - rect.left) * ratio,
    rect.height * ratio - (ev.clientY - rect.top) * ratio
  );
};

const onLeave = () => mouseTarget.set(0, 0);

// Use pointermove instead of mousemove - handles all input types
canvas.addEventListener('pointermove', onMove, { passive: true });
canvas.addEventListener('pointerleave', onLeave, { passive: true });

// Cleanup
return () => {
  canvas.removeEventListener('pointermove', onMove);
  canvas.removeEventListener('pointerleave', onLeave);
  // ...
};
```

### Example 5: Responsive Spacing Adjustments
```css
/* Base mobile styles */
.neu-header {
  padding: 12px 16px; /* Mobile-first: tighter padding */
}

.neu-header__wordmark {
  font-size: 11px;
  letter-spacing: 3px; /* Reduced from 6px for mobile */
}

.neu-hero {
  padding: 16px; /* Already in CSS line 817 */
  margin-top: -30vh; /* Reduce overlap on mobile */
  margin-top: -30dvh;
}

/* Tablet and desktop */
@media (min-width: 640px) {
  .neu-header {
    padding: 16px 32px; /* Original spacing restored */
  }

  .neu-header__wordmark {
    font-size: 13px;
    letter-spacing: 6px; /* Original spacing restored */
  }

  .neu-hero {
    padding: 24px 32px;
    margin-top: -40vh; /* Original overlap */
    margin-top: -40dvh;
  }
}
```

### Example 6: Touch Support in NeuPage Laser Section
```jsx
// CURRENT: Only mouse events (lines 150-168)
// PROBLEM: No touch support

// SOLUTION: Move event handling to LaserFlow component
// Remove onMouseMove and onMouseLeave from section element
<section className="neu__laser">
  <LaserFlow
    // ... existing props
  />
  <img ref={revealImgRef} src="/background.png" alt="" className="neu__reveal-img" />
  <div className="neu__impact" ref={impactRef}>
    <div className="neu__impact-glow" />
    <div className="neu__impact-line" />
  </div>
</section>

// Then in LaserFlow.jsx, add callback prop for reveal position
// and use pointer events on canvas (see Example 4)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate touch/mouse handlers | Pointer Events API | 2020-2021 (97% support by 2026) | Single code path, less complexity, stylus support |
| 100vh on mobile | 100dvh with 100vh fallback | 2022-2023 (CSS Viewport Units spec) | Fixes mobile browser chrome height issues |
| JavaScript menu animations | CSS transitions on transform | 2015+ (GPU acceleration standard) | Better performance, 60fps animations |
| Device-specific breakpoints | Content-based breakpoints | 2018+ (responsive design evolution) | More maintainable, works on all devices |
| role="menu" for nav | Semantic <nav> element | 2026 (WebAIM survey findings) | Better accessibility, fewer ARIA bugs |

**Deprecated/outdated:**
- **Touch Events as primary API:** Replaced by Pointer Events for new development (Touch Events still supported but redundant)
- **JavaScript-only viewport height fixes:** CSS `dvh` units solve this natively
- **Hamburger menu libraries (react-burger-menu, etc.):** Modern React + CSS make these unnecessary overhead

## Open Questions

### 1. Should laser reveal work on touch at all?
   - **What we know:** Desktop has hover-to-reveal pattern; mobile touch is different interaction model
   - **What's unclear:** Whether touch-drag to reveal makes sense, or if touch should be disabled on mobile (show static background)
   - **Recommendation:** Implement touch support with `pointermove`, test with users. If confusing, disable reveal on mobile with `@media (pointer: coarse)` CSS or touch capability detection

### 2. Optimal negative margin for hero on mobile?
   - **What we know:** Current `-40vh` is desktop-optimized; mobile screens vary widely (especially landscape)
   - **What's unclear:** Best balance between dramatic overlap and content visibility on short screens
   - **Recommendation:** Start with `-30vh`/`-30dvh` on mobile (<640px), test on landscape phones. May need `-20vh` for screens <500px height

### 3. Should hamburger menu overlay or push content?
   - **What we know:** Both patterns are standard (overlay is simpler, push is more spatial)
   - **What's unclear:** Which fits tactical aesthetic better
   - **Recommendation:** Overlay (slide-in from right) is simpler implementation and matches modern mobile patterns. Push would require body scroll lock and content shift.

## Sources

### Primary (HIGH confidence)

**Touch/Pointer Events:**
- [MDN: Using Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events) - Official documentation
- [MDN: Element touchmove event](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchmove_event) - Official API reference
- [javascript.info: Pointer Events](https://javascript.info/pointer-events) - Comprehensive guide
- [W3C: Pointer Events Specification](https://w3c.github.io/pointerevents/) - Official spec

**CSS Viewport Units:**
- [Medium: Fix mobile 100vh bug with dynamic viewport units](https://medium.com/@alekswebnet/fix-mobile-100vh-bug-in-one-line-of-css-dynamic-viewport-units-in-action-102231e2ed56)
- [CSS-Tricks: The trick to viewport units on mobile](https://css-tricks.com/the-trick-to-viewport-units-on-mobile/)
- [Medium: Understanding svh, lvh, and dvh](https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a)

**BEM Naming:**
- [GetBEM: Official BEM Naming](https://getbem.com/naming/) - Official documentation
- [BEM Methodology: Naming Convention](https://en.bem.info/methodology/naming-convention/) - Official methodology site

**Responsive Design:**
- [Framer Blog: Breakpoints in responsive web design 2026 guide](https://www.framer.com/blog/responsive-breakpoints/)
- [Tailwind CSS: Responsive Design](https://tailwindcss.com/docs/responsive-design) - Industry standard framework approach

### Secondary (MEDIUM confidence)

**Mobile Navigation Patterns:**
- [Phone Simulator: Mobile Navigation Patterns That Work in 2026](https://phone-simulator.com/blog/mobile-navigation-patterns-in-2026)
- [W3Schools: How To Create a Mobile Navigation Menu](https://www.w3schools.com/howto/howto_js_mobile_navbar.asp)
- [Alvaro Trigo: 10+ Hamburger Menu Examples CSS Only](https://alvarotrigo.com/blog/hamburger-menu-css/)

**React Implementation:**
- [FreeCodeCamp: How to Create an Animated Hamburger Menu in React](https://www.freecodecamp.org/news/how-to-create-an-animated-hamburger-menu-in-react/)
- [CSS-Tricks: Hamburger Menu with React Hooks and Styled Components](https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/)

**Accessibility:**
- [The Admin Bar: Optimizing Mobile Navigation for Accessibility](https://theadminbar.com/accessibility-weekly/mobile-nav-and-hamburger-menus/)
- [A11y Matters: Mobile Navigation Pattern](https://a11ymatters.com/pattern/mobile-nav/)
- [Pope Tech Blog: Does your navigation need an ARIA menu? Probably not](https://blog.pope.tech/2026/02/10/does-your-navigation-need-an-aria-menu-probably-not/) - Recent 2026 research

**Performance & Animation:**
- [LogRocket: Animating mobile menus using CSS](https://blog.logrocket.com/animating-mobile-menus-using-css/)
- [DevToolbox: CSS Animations Complete Guide 2026](https://devtoolbox.dedyn.io/blog/css-animations-complete-guide)

**Spacing & Typography:**
- [Matthew James Taylor: Responsive Padding, Margin & Gutters With CSS Calc](https://matthewjamestaylor.com/responsive-padding/)
- [Cieden: Spacing recommendations for desktop and mobile designs](https://cieden.com/book/sub-atomic/spacing/spacing-for-desktop-and-mobile-designs)
- [Cloud Four: Responsive Letter Spacing](https://cloudfour.com/thinks/responsive-letter-spacing/)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All recommendations are 2026 industry standards with wide browser support (97%+ for Pointer Events, 90%+ for dvh units)
- Architecture: HIGH - Patterns verified from official MDN docs, W3C specs, and current industry practice
- Pitfalls: HIGH - Issues identified from actual codebase analysis + verified against 2026 web development best practices

**Research date:** 2026-02-16
**Valid until:** ~2026-03-16 (30 days - web standards are stable, mobile patterns well-established)

**Notes:**
- No new dependencies needed—all solutions use native browser APIs and CSS
- Existing codebase already uses React state and BEM naming, making implementation straightforward
- Main work is CSS media queries + React state for menu + pointer events for touch support
- All recommended approaches are progressive enhancement (graceful degradation on older browsers)
