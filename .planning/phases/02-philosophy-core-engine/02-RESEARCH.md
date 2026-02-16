# Phase 2: Philosophy & Core Engine - Research

**Researched:** 2026-02-16
**Domain:** Responsive design for carousel components and mobile viewport optimization
**Confidence:** HIGH

## Summary

This phase addresses the critical responsive design challenge of making CardSwap carousel and CoreEngine panels mobile-friendly on small viewports (360px). The core technical challenge is that **inline styles in React components cannot be overridden by CSS media queries**, requiring a React-side solution for responsive dimensions.

The standard approach for 2026 is to use the **useMediaQuery hook pattern** or **GSAP's matchMedia()** to dynamically adjust component props based on viewport breakpoints. For overflow issues, the modern solution is **min-height with dvh units** (with vh fallback) and proper overflow management.

**Primary recommendation:** Implement useMediaQuery hook to pass responsive width/height props to CardSwap based on viewport breakpoints (640/768/1024). Use GSAP matchMedia() if animation behavior also needs to change. For panels, replace fixed min-height with responsive values using CSS media queries, and ensure overflow:hidden prevents horizontal scroll.

## Standard Stack

The established libraries/tools for responsive React components:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React hooks (built-in) | 18.x | useEffect + useState for resize listeners | Native, zero dependencies, server-safe |
| window.matchMedia API | Native | Browser API for media query matching | Standard Web API, supported by all modern browsers |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| GSAP matchMedia() | 3.11.0+ | Responsive animations with auto-cleanup | When animation behavior changes across breakpoints |
| react-responsive | 9.x+ | useMediaQuery hook implementation | If not implementing custom hook |
| @mui/material | 5.x+ | useMediaQuery with SSR support | If already using Material UI |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom useMediaQuery | react-responsive library | Library adds dependency but includes SSR handling |
| GSAP matchMedia() | CSS-only solution | Can't dynamically change inline props from CSS |
| dvh units | 100vh + JS fix | dvh is modern standard, JS fallback adds complexity |

**Installation:**
```bash
# If using library approach (optional)
npm install react-responsive

# GSAP already installed (detected in package.json)
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── hooks/
│   └── useMediaQuery.js    # Custom hook for breakpoint detection
├── components/
│   └── CardSwap.jsx        # Receives responsive props
└── variants/
    └── VariantGrid.jsx     # Passes breakpoint-aware dimensions
```

### Pattern 1: Responsive Props with useMediaQuery Hook

**What:** Component receives dimension props that update based on viewport breakpoints
**When to use:** When inline styles prevent CSS media queries from working

**Example:**
```javascript
// Source: Based on https://usehooks-ts.com/react-hook/use-media-query
// Custom hook (create src/hooks/useMediaQuery.js)
import { useState, useEffect } from 'react';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Usage in VariantGrid.jsx
function PhilosophySection() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const cardWidth = isMobile ? 280 : isTablet ? 320 : 380;
  const cardHeight = isMobile ? 240 : isTablet ? 280 : 320;

  return (
    <section className="vg__section" id="philosophy">
      <div className="vg-philosophy">
        <div className="vg-philosophy__text">...</div>
        <div className="vg-philosophy__panel">
          <CardSwap
            width={cardWidth}
            height={cardHeight}
            cardDistance={isMobile ? 30 : 40}
            verticalDistance={isMobile ? 40 : 50}
            delay={3000}
            pauseOnHover={false}
            skewAmount={4}
            easing="elastic"
          >
            {INTEL_PRODUCTS.map((p) => (
              <Card key={p.name} className="vg-philosophy__card">...</Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
```

### Pattern 2: GSAP matchMedia for Animation-Aware Responsiveness

**What:** GSAP's built-in responsive system with automatic cleanup
**When to use:** When animation parameters need to change across breakpoints

**Example:**
```javascript
// Source: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()
useEffect(() => {
  let mm = gsap.matchMedia();

  mm.add({
    isMobile: "(max-width: 640px)",
    isTablet: "(min-width: 641px) and (max-width: 1024px)",
    isDesktop: "(min-width: 1025px)"
  }, (context) => {
    let { isMobile, isTablet } = context.conditions;

    // Different animation parameters per breakpoint
    if (isMobile) {
      // Mobile animations
    } else if (isTablet) {
      // Tablet animations
    } else {
      // Desktop animations
    }

    return () => {
      // Optional cleanup
    };
  });

  return () => mm.revert(); // Cleanup on unmount
}, []);
```

### Pattern 3: Responsive Min-Height with Modern Viewport Units

**What:** Use dvh (dynamic viewport height) with vh fallback for mobile-friendly heights
**When to use:** For panels/sections that need full-viewport or partial-viewport height

**Example:**
```css
/* Source: https://medium.com/@alekswebnet/fix-mobile-100vh-bug-in-one-line-of-css-dynamic-viewport-units-in-action-102231e2ed56 */
.vg-philosophy__panel {
  /* Fallback for older browsers */
  min-height: 400px;

  /* Modern approach - dvh adjusts for mobile browser UI */
  min-height: 300px; /* Base */
}

@media (max-width: 1024px) {
  .vg-philosophy__panel {
    min-height: 250px; /* Tablet reduction */
  }
}

@media (max-width: 640px) {
  .vg-philosophy__panel {
    min-height: 200px; /* Mobile reduction */
    overflow: hidden; /* Prevent overflow */
  }
}
```

### Pattern 4: Preventing Horizontal Overflow on Mobile

**What:** Ensure no elements exceed viewport width
**When to use:** Always, for all responsive components

**Example:**
```css
/* Source: https://foxscribbler.com/prevent-horizontal-scroll-on-mobile/ */

/* Container overflow control */
.vg-philosophy {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden; /* Prevent horizontal scroll */
}

/* Ensure panels respect container */
.vg-philosophy__panel {
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
}

/* CardSwap container constraint */
.card-swap-container {
  max-width: 100%;
  overflow: visible; /* For 3D effects */
}

/* Mobile-specific constraints */
@media (max-width: 640px) {
  .vg-philosophy__panel {
    padding: 0; /* Remove padding that could cause overflow */
    margin: 0 auto;
  }
}
```

### Anti-Patterns to Avoid

- **Using 100vw on pages with scrollbars:** Causes horizontal overflow because vw includes scrollbar width. Use 100% instead.
- **Relying on CSS media queries to override inline styles:** Inline styles always win. Must change props at React level.
- **Fixed pixel widths on mobile without max-width:** Always set max-width: 100% on containers.
- **Forgetting overflow-x: hidden:** Parent containers must prevent horizontal scroll.
- **Using only vh units for mobile:** Browser UI (address bar) makes 100vh too tall. Use dvh with vh fallback.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Media query matching in React | Custom resize event handlers | useMediaQuery hook pattern | Handles SSR, cleanup, performance optimization, debouncing |
| Responsive GSAP animations | Manual animation recreation per breakpoint | gsap.matchMedia() | Automatic cleanup, context management, prevents memory leaks |
| Viewport height on mobile | Custom JS to detect browser UI | dvh units with vh fallback | Browser-native, accounts for dynamic UI, no JS needed |
| Detecting horizontal overflow | Manual scrollWidth checks | overflow-x: hidden + max-width: 100% | CSS-native, performant, no reflow triggers |
| Component resize detection | setInterval checks | ResizeObserver API or useResizeDetector | Event-based (efficient), built-in browser support |

**Key insight:** Responsive React components require JavaScript-based media query detection because CSS cannot override inline styles. The standard pattern is a useMediaQuery hook with window.matchMedia API, not manual window resize listeners.

## Common Pitfalls

### Pitfall 1: Inline Styles Block CSS Responsiveness

**What goes wrong:** Adding CSS media queries to change CardSwap dimensions has no effect because inline styles have higher specificity.

**Why it happens:** In React, when you pass `style={{ width, height }}` as props, these become inline styles in the DOM (`style="width: 380px;"`). CSS specificity rules mean inline styles (1,0,0,0) always override any CSS selectors including media queries.

**How to avoid:**
- Pass responsive dimension values as props using useMediaQuery hook
- Calculate dimensions in JavaScript based on breakpoints
- Update props when viewport changes, not CSS

**Warning signs:**
- CSS media queries in CardSwap.css are being ignored
- Component stays same size on all viewports
- DevTools shows inline styles overriding CSS

### Pitfall 2: Using 100vw Causes Horizontal Scroll

**What goes wrong:** Setting width: 100vw on a page with vertical scrollbar creates horizontal overflow and unwanted side-scrolling.

**Why it happens:** The vw unit includes the scrollbar width in its calculation. On pages with vertical scrollbars (which is most pages), 100vw = viewport width + scrollbar width (typically 15-17px), causing the element to be wider than the visible area.

**How to avoid:**
- Use width: 100% instead of 100vw for full-width elements
- Use max-width: 100% on all containers
- Add overflow-x: hidden to parent containers as safety net

**Warning signs:**
- Horizontal scrollbar appears on mobile
- Content extends beyond right edge
- Blank space visible when scrolling horizontally

### Pitfall 3: Fixed min-height Doesn't Scale to Mobile

**What goes wrong:** Panel with min-height: 400px pushes content off-screen on 360px-height mobile viewports.

**Why it happens:** Desktop-optimized min-height values don't account for smaller mobile viewport heights. A 400px min-height on a 640px-height mobile screen (minus browser UI ~100px) leaves only 140px for other content.

**How to avoid:**
- Reduce min-height progressively at each breakpoint
- Use relative units (vh/dvh) with pixel fallbacks
- Test on 360px × 640px viewport (small mobile standard)
- Replace fixed heights with flexible layouts when possible

**Warning signs:**
- Vertical scrolling within sections that should be single-screen
- Content feels cramped or cut off on mobile
- User must scroll excessively to see full section

### Pitfall 4: Forgetting to Update Related Properties

**What goes wrong:** Changing only width/height but not cardDistance/verticalDistance creates broken 3D effects or overlapping cards.

**Why it happens:** GSAP animations calculate positions based on cardDistance and verticalDistance. When cards get smaller but spacing stays the same, the visual rhythm breaks down—cards either overlap or have too much gap.

**How to avoid:**
- Scale all dimension-related props proportionally
- Create a sizing configuration object per breakpoint
- Test 3D effects at each breakpoint
- Maintain aspect ratios when resizing

**Warning signs:**
- Cards overlap on mobile
- Too much empty space between stacked cards
- Animation feels "off" at certain breakpoints

### Pitfall 5: Not Testing at 360px Width

**What goes wrong:** Component works on iPhone (375px) but breaks on smaller Android devices (360px).

**Why it happens:** Many developers test on iPhone simulators (375px minimum) and miss the 360px standard used by many Android devices. That 15px difference is enough to cause horizontal overflow.

**How to avoid:**
- Always test at 360px width as minimum viewport
- Use browser DevTools responsive mode with custom 360×640 preset
- Add margin/padding safety buffer (8-16px) on small viewports
- Use max-width with calc() to account for gutters

**Warning signs:**
- Works on iPhone simulator but not on Android
- Horizontal scroll only on very small devices
- Requirements explicitly mention 360px but testing only at 375px+

### Pitfall 6: Panel Spacing Not Optimized for Mobile

**What goes wrong:** Desktop margin/padding values (40-48px) consume too much space on 360px-wide mobile screens.

**Why it happens:** Spacing that feels balanced on 1920px desktop becomes disproportionately large on mobile, leaving insufficient room for actual content. 48px margins = 96px total = 26% of a 360px screen.

**How to avoid:**
- Reduce all spacing by 50-75% on mobile breakpoint
- Use CSS variables for consistent spacing scale
- Follow 8px base scale: 8/16/24/32 (mobile) vs 16/24/32/48 (desktop)
- Check spacing ratios: margins shouldn't exceed 10-15% of viewport

**Warning signs:**
- Content feels squeezed despite small amount of text
- Disproportionate whitespace on small screens
- Header/body margins look comically large on mobile

## Code Examples

Verified patterns from research sources:

### Complete CardSwap Responsive Implementation

```javascript
// Source: Combined pattern from https://usehooks-ts.com/react-hook/use-media-query
// and project requirements

// 1. Create useMediaQuery hook (src/hooks/useMediaQuery.js)
import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Create event listener
    const listener = () => setMatches(media.matches);

    // Attach listener (modern browsers)
    media.addEventListener('change', listener);

    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// 2. Update VariantGrid.jsx PhilosophySection
import { useMediaQuery } from '../hooks/useMediaQuery';

function PhilosophySection() {
  // Detect breakpoints (standardized: 640/768/1024)
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // Calculate responsive dimensions
  const cardConfig = {
    width: isMobile ? 280 : isTablet ? 320 : 380,
    height: isMobile ? 240 : isTablet ? 280 : 320,
    cardDistance: isMobile ? 30 : isTablet ? 35 : 40,
    verticalDistance: isMobile ? 40 : isTablet ? 45 : 50,
  };

  return (
    <section className="vg__section" id="philosophy">
      <div className="vg__section-label">// Philosophy</div>
      <div className="vg-philosophy">
        <div className="vg-philosophy__text">
          <blockquote className="vg-philosophy__quote">
            "The critical failure is never a lack of information..."
          </blockquote>
          <p className="vg-philosophy__message">...</p>
        </div>

        <div className="vg-philosophy__panel">
          <CardSwap
            width={cardConfig.width}
            height={cardConfig.height}
            cardDistance={cardConfig.cardDistance}
            verticalDistance={cardConfig.verticalDistance}
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
```

### Responsive Panel CSS with Overflow Management

```css
/* Source: https://www.smashingmagazine.com/2021/04/css-overflow-issues/ */
/* VariantGrid.css updates for Philosophy panel */

.vg-philosophy {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: start;
  width: 100%; /* Ensure full width constraint */
  max-width: 100%; /* Prevent overflow */
}

.vg-philosophy__panel {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* FIX: prevent horizontal overflow */
  width: 100%;
  max-width: 100%;
}

/* Tablet breakpoint */
@media (max-width: 1024px) {
  .vg-philosophy {
    grid-template-columns: 1fr; /* Stack layout */
    gap: var(--spacing-2xl);
  }

  .vg-philosophy__panel {
    min-height: 300px; /* Existing - keep */
  }
}

/* Mobile breakpoint */
@media (max-width: 640px) {
  .vg-philosophy {
    gap: var(--spacing-xl); /* Further reduce gap */
  }

  .vg-philosophy__panel {
    min-height: 250px; /* FIX: reduce for mobile */
    padding: 0; /* Remove padding that could cause overflow */
  }

  /* Ensure CardSwap container doesn't overflow */
  .vg-philosophy__panel .card-swap-container {
    max-width: 100%;
  }
}
```

### CoreEngine Panel Mobile Spacing Optimization

```css
/* Source: Project requirements CORE-01 */
/* CoreEngine.css updates */

.vg-engine__panel-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 40px; /* Desktop default */
}

/* Tablet breakpoint */
@media (max-width: 1024px) {
  .vg-engine__panel-header {
    margin-bottom: 32px; /* Moderate reduction */
  }
}

/* Mobile breakpoint */
@media (max-width: 640px) {
  .vg-engine__panel-header {
    margin-bottom: 24px; /* FIX: significant reduction for mobile */
  }

  .vg-engine__panel {
    padding: 20px; /* Already present - verify adequate */
  }

  /* Reduce section padding */
  .vg-engine-page {
    padding: 48px 16px 32px; /* Already present - good */
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual window resize listeners | useMediaQuery hook with matchMedia API | 2020+ | Better performance, automatic cleanup, SSR-safe |
| CSS-only responsive (no React) | Responsive props pattern | 2018+ | Required for inline style overrides |
| 100vh units | dvh with vh fallback | 2023-2024 | Fixes mobile browser UI issues |
| Separate mobile/desktop animations | GSAP matchMedia() | GSAP 3.11.0 (2022) | Automatic cleanup, context management |
| viewport meta tag only | Container queries | 2023+ | Component-level responsiveness |

**Deprecated/outdated:**
- **window.resize event listeners without debouncing**: Use matchMedia API instead - it's event-based and more performant
- **Using only vh units for mobile viewport**: Modern browsers support dvh which accounts for dynamic UI
- **react-resize-detector for viewport detection**: matchMedia API is native and more appropriate for breakpoints
- **Radium for inline style media queries**: Unmaintained since 2019, use hooks pattern instead

## Open Questions

Things that couldn't be fully resolved:

1. **GSAP animation performance on very small viewports**
   - What we know: GSAP animations with 3D transforms can be GPU-intensive
   - What's unclear: Whether elastic easing with small cards (280×240) causes performance issues on low-end Android devices
   - Recommendation: Keep elastic easing but add prefers-reduced-motion check; test on actual devices if possible

2. **Optimal card sizing for 360px viewport**
   - What we know: 280px width leaves 80px for margins/padding (40px each side)
   - What's unclear: Whether 280×240 cards provide sufficient readability for card content (images, text)
   - Recommendation: Start with 280×240, prepare to adjust to 300×250 if content feels cramped; test with actual content

3. **Panel overflow:hidden impact on 3D effects**
   - What we know: overflow:hidden prevents horizontal scroll
   - What's unclear: Whether GSAP's 3D transforms (skew, z-translate) get clipped by overflow:hidden
   - Recommendation: Use overflow:hidden on parent container, overflow:visible on card-swap-container; verify visual effects remain intact

## Sources

### Primary (HIGH confidence)
- [GSAP matchMedia() official docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/) - API documentation
- [CSS Media Queries: The Complete Guide for 2026](https://devtoolbox.dedyn.io/blog/css-media-queries-complete-guide) - Current standards
- [useMediaQuery Hook pattern](https://usehooks-ts.com/react-hook/use-media-query) - Standard implementation
- [Understanding Mobile Viewport Units: svh, lvh, dvh](https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a) - Modern viewport units
- [Fix mobile viewport 100vh bug in one line of CSS](https://medium.com/@alekswebnet/fix-mobile-100vh-bug-in-one-line-of-css-dynamic-viewport-units-in-action-102231e2ed56) - dvh solution

### Secondary (MEDIUM confidence)
- [Breakpoints in responsive web design: 2026 guide](https://www.framer.com/blog/responsive-breakpoints/) - Industry standards
- [Designing Responsive React Components for 2023](https://nickb.dev/blog/designing-responsive-react-components-for-2023/) - React patterns
- [Mobile Carousel Best Practices That Designers Should Know](https://www.sliderrevolution.com/design/mobile-carousel/) - UX guidelines
- [Overflow Issues In CSS](https://www.smashingmagazine.com/2021/04/css-overflow-issues/) - Comprehensive overflow guide
- [Material UI useMediaQuery](https://mui.com/material-ui/react-use-media-query/) - Alternative implementation

### Tertiary (LOW confidence)
- [React inline styles and media queries using a custom React Hook](https://medium.com/@ttennant/react-inline-styles-and-media-queries-using-a-custom-react-hook-e76fa9ec89f6) - Pattern exploration (needs verification)
- [3 Easy Step To Fix The Horizontal Scroll On Mobile](https://foxscribbler.com/prevent-horizontal-scroll-on-mobile/) - Quick fixes (verify approach)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - window.matchMedia is W3C standard, GSAP matchMedia documented official API
- Architecture: HIGH - useMediaQuery pattern verified across multiple authoritative sources (useHooks, Material UI, community consensus)
- Pitfalls: HIGH - Inline style specificity is CSS standard behavior; 100vw scrollbar issue well-documented; mobile viewport issues verified across multiple sources

**Research date:** 2026-02-16
**Valid until:** 2026-03-16 (30 days - stable web standards domain)
