---
phase: 02-philosophy-core-engine
plan: 01
subsystem: ui
tags: [react, responsive, css, media-queries, gsap, cardswap]

# Dependency graph
requires:
  - phase: 01-neupage-navigation-hero
    provides: Standardized breakpoints (640/768/1024) and mobile-first approach
provides:
  - useMediaQuery React hook for responsive breakpoint detection
  - Responsive CardSwap carousel dimensions via props (not CSS overrides)
  - Philosophy section mobile overflow containment
  - Scaled card content for mobile viewports
affects: [03-intelstack-usecases, 04-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Custom React hooks for responsive design", "Props-based component responsiveness for inline-styled components"]

key-files:
  created:
    - src/hooks/useMediaQuery.js
  modified:
    - src/variants/VariantGrid.jsx
    - src/components/CardSwap.css
    - src/variants/VariantGrid.css

key-decisions:
  - "useMediaQuery hook approach for CardSwap dimensions (CSS cannot override inline styles)"
  - "Three-tier breakpoint strategy: mobile (<=640px), tablet (<=1024px), desktop"
  - "Progressive scaling: cards get smaller dimensions and reduced spacing on mobile"

patterns-established:
  - "Custom hooks for viewport-dependent prop values when CSS media queries insufficient"
  - "overflow: hidden on panel containers to prevent mobile scroll issues"

# Metrics
duration: 3min
completed: 2026-02-16
---

# Phase 2 Plan 01: Philosophy Section Responsive Summary

**CardSwap carousel scales via useMediaQuery hook with three-tier breakpoints; Philosophy panel overflow contained on mobile**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-16T09:30:06Z
- **Completed:** 2026-02-16T09:33:02Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created useMediaQuery custom React hook for responsive breakpoint detection
- CardSwap carousel displays at correct dimensions on mobile (280x240), tablet (320x280), and desktop (380x320)
- Philosophy panel has overflow containment on tablet and mobile to prevent content spill
- Card inner content scales proportionally on mobile (smaller images, text, padding)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create useMediaQuery hook and wire responsive CardSwap props** - `41dc5d4` (style)
2. **Task 2: Add CardSwap responsive CSS and fix Philosophy panel overflow** - `dc8927f` (style)

_Note: Task 1 was already completed in commit 41dc5d4 before this execution. Task 2 was completed during this execution._

## Files Created/Modified
- `src/hooks/useMediaQuery.js` - Custom React hook that uses window.matchMedia to detect viewport breakpoints and update state on resize
- `src/variants/VariantGrid.jsx` - PhilosophySection now uses useMediaQuery to compute responsive CardSwap dimensions and pass as props
- `src/components/CardSwap.css` - Added mobile media query (640px) with reduced border-radius (6px) and centered container
- `src/variants/VariantGrid.css` - Added overflow:hidden to Philosophy panel at tablet breakpoint; added mobile rules for panel height, card images, text, and padding

## Decisions Made
- **useMediaQuery hook approach:** CardSwap uses inline styles (width/height) which have higher specificity than CSS. The only way to make it responsive is to pass different prop values based on viewport, requiring a breakpoint detection hook.
- **Three-tier breakpoints:** Mobile (<=640px), Tablet (<=1024px), Desktop - consistent with Phase 1 navigation breakpoint strategy.
- **Progressive dimension scaling:** CardSwap gets progressively smaller on smaller screens (desktop 380x320 → tablet 320x280 → mobile 280x240) to fit within viewport with margins.
- **overflow:hidden on panel:** Philosophy panel set to `overflow: hidden` at tablet and mobile breakpoints to prevent GSAP-animated cards from creating horizontal scroll.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Philosophy section is fully responsive and ready for production
- CardSwap component pattern established for other sections that may need similar responsive carousels
- Ready to proceed with Core Engine section responsiveness in 02-02

---
*Phase: 02-philosophy-core-engine*
*Completed: 2026-02-16*
