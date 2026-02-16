# Phase 4: Global Polish & Footer - Research

**Researched:** 2026-02-16
**Domain:** Responsive CSS, SVG scaling, global breakpoint standardization
**Confidence:** HIGH

## Summary

Phase 4 is the final polish pass for a React/Vite single-page marketing website. The codebase has already undergone three phases of mobile responsiveness work (Phases 1-3 fixed NeuPage, Philosophy, CoreEngine, UseCases, and IntelStack). This phase targets three remaining domains:

1. **AI Council Section** — Inline SVG visualization needs mobile scaling; synthesis overlay needs viewport-aware centering
2. **Global Breakpoint Audit** — Legacy variant files (VariantNeon.css, VariantGlass.css) use non-standard breakpoints (1100px, 900px, 768px, 600px) that must be normalized to project standard (640px/1024px)
3. **Footer/Reach-Out Section** — Already exists in NeuPage.jsx with mobile rules at 640px; needs verification, no work required

**Primary recommendation:** This is a surgical CSS-only phase. Fix AICouncil SVG/overlay scaling, audit and normalize breakpoints in legacy variant files, verify footer responsiveness. No JavaScript changes needed.

## Standard Stack

The project uses established patterns from Phases 1-3:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 18.x | Component framework | Project foundation |
| Vite | Latest | Build tool | Project toolchain |
| CSS Modules | Native | Scoped styling | BEM naming with vg-* prefix |
| useMediaQuery | Custom hook | Viewport detection | Established in Phase 2 for runtime dimension control |

### Supporting
| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| Chrome DevTools | Latest | Breakpoint testing | Visual verification of responsive rules |
| Git | Latest | Version control | Per-section commits (established pattern) |

**Installation:**
No new dependencies required — all fixes are CSS-only.

## Architecture Patterns

### Project Structure (Relevant Files)
```
src/
├── pages/
│   ├── AICouncil.jsx          # SVG visualization + synthesis overlay
│   ├── AICouncil.css           # Lines 162-643 (min-width 1024px, max-width 1024px, max-width 640px)
│   ├── NeuPage.jsx             # Contains neu-reach section (footer)
│   └── NeuPage.css             # Lines 443-948 (footer + mobile rules)
├── variants/
│   ├── VariantNeon.css         # LEGACY — non-standard breakpoints (1100px, 768px)
│   └── VariantGlass.css        # LEGACY — non-standard breakpoints (900px, 600px)
└── hooks/
    └── useMediaQuery.js        # Custom viewport detection hook
```

### Pattern 1: Inline SVG with viewBox Scaling
**What:** AICouncil uses inline SVG (lines 148-232 in AICouncil.jsx) with `viewBox="0 0 600 400"` and `preserveAspectRatio="xMidYMid meet"`
**Current implementation:**
```jsx
<svg
  className="vg-council__svg"
  viewBox="0 0 600 400"
  preserveAspectRatio="xMidYMid meet"
>
```

**CSS (lines 380-386 in AICouncil.css):**
```css
.vg-council__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
```

**Issue:** `.vg-council__center` has `min-height: 400px` (line 374) which works on desktop but may cause overflow or poor readability on mobile. Line 573 reduces it to `320px` at tablet, line 620 reduces to `260px` at mobile.

**Fix needed:** Verify SVG scales correctly at mobile breakpoints; the viewBox approach is correct but min-height reductions need testing for readability of persona nodes.

### Pattern 2: Absolutely Positioned Overlay Centering
**What:** Synthesis overlay (lines 90-99 in AICouncil.jsx) is absolutely positioned within `.vg-council__center`
**Current implementation:**
```jsx
<div className="vg-council__synthesis" ref={ref}>
  <span className="vg-council__synthesis-label">Synthesis Result</span>
  <span className="vg-council__synthesis-value">...</span>
  <span className="vg-council__synthesis-confidence">...</span>
</div>
```

**CSS (lines 394-404 in AICouncil.css):**
```css
.vg-council__synthesis {
  position: absolute;
  z-index: 20;
  background: rgba(16, 24, 34, 0.92);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px 16px;
  border-radius: 0;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}
```

**Issue:** No explicit left/top/transform centering — relies on default positioning (top-left). This works if `.vg-council__center` uses flexbox centering (lines 372-378: `display: flex; align-items: center; justify-content: center;`), which centers the overlay as a flex child. **This is the MODERN pattern** — parent flex centers child, not transform: translate(-50%, -50%).

**Fix needed:** Verify overlay centers correctly on mobile. May need max-width constraint (established pattern from Phase 3: "Absolutely positioned panels need max-width constraints on mobile").

### Pattern 3: Three-Tier Breakpoint Strategy
**Established in Phases 1-3:**
- Mobile: `@media (max-width: 640px)` — smallest screens, vertical stacking
- Tablet: `@media (max-width: 1024px)` — medium screens, grid collapse
- Desktop: No media query OR `@media (min-width: 1024px)` — full layout

**Current violations:**
| File | Line | Current Breakpoint | Should Be |
|------|------|-------------------|-----------|
| VariantNeon.css | 1264 | `@media (max-width: 1100px)` | `@media (max-width: 1024px)` |
| VariantNeon.css | 1358 | `@media (max-width: 768px)` | `@media (max-width: 640px)` |
| VariantGlass.css | 834 | `@media (max-width: 900px)` | `@media (max-width: 1024px)` |
| VariantGlass.css | 882 | `@media (max-width: 600px)` | `@media (max-width: 640px)` |

**Note:** These files are LEGACY variants (not used in current App.jsx which loads NeuPage only). Normalization is for consistency, not functionality.

### Pattern 4: Footer Responsiveness (Already Complete)
**Implementation:** NeuPage.css lines 930-948
```css
@media (max-width: 640px) {
  .neu-reach {
    padding: 64px 16px 48px;
  }

  .neu-reach__ctas {
    flex-direction: column;
  }

  .neu-reach__cta {
    text-align: center;
    justify-content: center;
  }

  .neu-reach__footer {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
}
```

**Assessment:** Footer mobile rules already follow Phase 1-3 patterns:
- CTAs stack vertically (`flex-direction: column`)
- Footer items stack and center (`flex-direction: column; align-items: center`)
- Padding reduces progressively (120px → 64px on mobile)

**No work required** — footer meets REACH-01 requirement.

### Anti-Patterns to Avoid
- **Non-standard breakpoints:** Don't introduce 768px, 900px, etc. — use 640px/1024px only
- **Transform centering for flex children:** Modern pattern uses parent flexbox, not `left: 50%; transform: translate(-50%, -50%)`
- **Hardcoded SVG dimensions:** Use viewBox + CSS width/height 100% for responsive scaling

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Viewport detection | Custom resize listeners | useMediaQuery hook | Already established in Phase 2; consistent pattern |
| SVG responsive scaling | JavaScript resize handlers | viewBox + preserveAspectRatio | Native SVG behavior; no JS needed |
| Breakpoint centralization | Scattered magic numbers | CSS custom properties (already done) | Project uses 640/768/1024 standard |

**Key insight:** This is CSS-only work. No JavaScript changes, no new patterns — follow established Phases 1-3 patterns.

## Common Pitfalls

### Pitfall 1: SVG Text/Shapes Too Small on Mobile
**What goes wrong:** SVG scales correctly but small text (<12px equivalent) or thin strokes (<1px) become unreadable
**Why it happens:** viewBox scaling maintains aspect ratio but doesn't increase stroke-width or font-size
**How to avoid:**
- Test at 360px viewport (smallest target)
- AICouncil SVG uses geometric shapes (diamonds, circles, lines) — should scale fine
- If text were present, would need responsive font-size in CSS
**Warning signs:** Shapes look "thin" or "washed out" on mobile

### Pitfall 2: Absolutely Positioned Overlay Overflow on Mobile
**What goes wrong:** Overlay width exceeds viewport, causing horizontal scroll
**Why it happens:** Absolute positioning removes element from flow; no automatic viewport constraint
**How to avoid:**
- Add `max-width: calc(100% - 32px)` or similar on mobile
- Established pattern from Phase 3 (IntelStack alerts)
**Warning signs:** Horizontal scrollbar appears on mobile; overlay text truncates

### Pitfall 3: Legacy Breakpoints Create "Dead Zones"
**What goes wrong:** Non-standard breakpoints (900px, 1100px) create viewport ranges where no rules apply
**Why it happens:** Project standard is 640px/1024px — intermediate breakpoints leave gaps
**How to avoid:**
- Normalize ALL breakpoints to 640px/1024px
- Test at exact breakpoints (640px, 1024px) to verify rule application
**Warning signs:** Layout looks broken at 1000px but fine at 1024px

### Pitfall 4: Mobile-First vs Desktop-First Confusion
**What goes wrong:** Using `max-width` queries but structuring CSS in wrong order
**Why it happens:** AICouncil.css uses BOTH `min-width: 1024px` (lines 162-346) AND `max-width: 1024px` (lines 558-595)
**How to avoid:**
- Desktop-first pattern: Mobile-specific rules OVERRIDE desktop rules at max-width breakpoints
- Ensure mobile rules come AFTER desktop rules in cascade
- Project uses desktop-first (base styles + mobile overrides)
**Warning signs:** Mobile rules don't apply; desktop layout persists on small screens

## Code Examples

Verified patterns from official sources and project codebase:

### AICouncil SVG Scaling (Correct Pattern)
```jsx
// Source: AICouncil.jsx lines 148-232
<div className="vg-council__center">
  <svg
    className="vg-council__svg"
    viewBox="0 0 600 400"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Shapes scale automatically with viewBox */}
  </svg>
  <SynthesisOverlay />
</div>
```

```css
/* Source: AICouncil.css lines 372-386 */
.vg-council__center {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vg-council__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* Mobile scaling */
@media (max-width: 1024px) {
  .vg-council__center {
    min-height: 320px;
  }
}

@media (max-width: 640px) {
  .vg-council__center {
    min-height: 260px;
  }
}
```

### Synthesis Overlay Centering (Modern Flexbox Pattern)
```css
/* Source: AICouncil.css lines 394-404 */
.vg-council__synthesis {
  position: absolute;
  z-index: 20;
  background: rgba(16, 24, 34, 0.92);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px 16px;
  border-radius: 0;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

/* Mobile constraint (add if overflow occurs) */
@media (max-width: 640px) {
  .vg-council__synthesis {
    max-width: calc(100% - 32px);
    left: 16px;
    right: 16px;
  }
}
```

**Why this works:** Parent `.vg-council__center` uses `display: flex; align-items: center; justify-content: center;` to center the absolute child. Modern approach — no transform hacks.

### Footer Responsive Stacking (Already Complete)
```css
/* Source: NeuPage.css lines 930-948 */
@media (max-width: 640px) {
  .neu-reach {
    padding: 64px 16px 48px;
  }

  .neu-reach__ctas {
    flex-direction: column;
  }

  .neu-reach__cta {
    text-align: center;
    justify-content: center;
  }

  .neu-reach__footer {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
}
```

**Why this works:** CTAs and footer items stack vertically on mobile; established pattern from Phase 1.

### Breakpoint Normalization (Fix Pattern)
```css
/* BEFORE (VariantNeon.css line 1264) */
@media (max-width: 1100px) {
  .neon-section {
    padding: 80px 32px;
  }
}

/* AFTER (normalized to project standard) */
@media (max-width: 1024px) {
  .neon-section {
    padding: 80px 32px;
  }
}
```

**Why this matters:** Consistency with Phase 1-3 work; ensures uniform behavior across viewport ranges.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Transform centering | Flexbox parent centering | 2020-2021 | Cleaner code, better with grid/flex layouts |
| Fixed SVG dimensions | viewBox scaling | Native SVG standard | Automatic responsiveness without JS |
| Device-specific breakpoints | Content-based breakpoints | 2022+ | Focus on when layout breaks, not device sizes |
| max-width only | Hybrid min/max-width | 2023+ | AICouncil uses min-width for desktop-specific connectors |

**Deprecated/outdated:**
- Transform centering for absolute elements inside flex containers (use parent flex centering)
- Hardcoded breakpoints like 768px for "iPad" (use content-based 640px/1024px)

## Open Questions

1. **AICouncil SVG readability on 360px viewport**
   - What we know: SVG has viewBox scaling; min-height reduces to 260px on mobile
   - What's unclear: Are persona node shapes (diamonds, circles) visually distinct at 260px height?
   - Recommendation: Test at 360px viewport; if shapes blur together, increase min-height to 300px

2. **Synthesis overlay centering verification**
   - What we know: Parent uses flexbox centering; overlay is absolute positioned
   - What's unclear: Does the flexbox centering actually work for absolute children, or does the overlay default to top-left?
   - Recommendation: Visual test; if top-left, add explicit centering (`left: 50%; transform: translateX(-50%)`)

3. **Legacy variant files usage**
   - What we know: App.jsx only imports NeuPage (not VariantNeon or VariantGlass)
   - What's unclear: Are these files dead code or used elsewhere?
   - Recommendation: Normalize breakpoints anyway for consistency; consider removing if truly unused

## Sources

### Primary (HIGH confidence)
- **Project codebase audit:**
  - AICouncil.jsx (lines 1-298) — SVG structure and component logic
  - AICouncil.css (lines 1-643) — SVG/overlay styling and breakpoints
  - NeuPage.jsx (lines 254-278) — Footer structure
  - NeuPage.css (lines 443-948) — Footer styling and mobile rules
  - VariantNeon.css (lines 1264, 1358) — Non-standard breakpoints identified
  - VariantGlass.css (lines 834, 882) — Non-standard breakpoints identified

- **MDN Web Docs:**
  - [preserveAspectRatio - SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/preserveAspectRatio) — Official SVG attribute behavior
  - [viewBox - SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) — Coordinate system definition
  - [position - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/position) — Absolute positioning behavior

### Secondary (MEDIUM confidence)
- **WebSearch verified with project patterns:**
  - [Breakpoint: Responsive Design Breakpoints in 2025 | BrowserStack](https://www.browserstack.com/guide/responsive-design-breakpoints) — Content-based breakpoint strategy
  - [Using CSS breakpoints for fluid, future-proof layouts - LogRocket](https://blog.logrocket.com/css-breakpoints-responsive-design/) — Mobile-first vs desktop-first approaches
  - [SVG viewBox Explained: The Complete Guide - SVG Genie](https://www.svggenie.com/blog/svg-viewbox-guide) — viewBox scaling behavior
  - [Less Absolute Positioning With Modern CSS](https://ishadeed.com/article/less-absolute-positioning-modern-css/) — Flexbox centering pattern
  - [How I Center a Div in CSS: Practical Patterns for 2026](https://thelinuxcode.com/how-i-center-a-div-in-css-practical-patterns-for-2026/) — Modern centering approaches

### Tertiary (LOW confidence)
- None — all findings verified against project codebase

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All patterns established in Phases 1-3
- Architecture: HIGH — Files examined directly, line numbers documented
- Pitfalls: MEDIUM — Based on common responsive issues, not project-specific testing

**Research date:** 2026-02-16
**Valid until:** 2026-03-16 (30 days - stable CSS patterns)
