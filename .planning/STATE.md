# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-16)

**Core value:** Every section of the website must look intentional and polished on any device — no overflow, no broken layouts, no inaccessible interactions.
**Current focus:** Phase 3 - UseCases & IntelStack

## Current Position

Phase: 3 of 4 (UseCases & IntelStack)
Plan: 0 of TBD in current phase
Status: Not started
Last activity: 2026-02-16 — Completed Phase 2 (Philosophy & Core Engine)

Progress: [█████░░░░░] 50%

## Performance Metrics

**Velocity:**
- Total plans completed: 4
- Average duration: 2.25 min
- Total execution time: 9 minutes

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-neupage-navigation-hero | 2 | 5 min | 2.5 min |
| 02-philosophy-core-engine | 2 | 4 min | 2 min |

**Recent Trend:**
- Last 5 plans: 01-01 (2min), 01-02 (3min), 02-01 (3min), 02-02 (1min)
- Trend: Improving efficiency on CSS-focused plans

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Section-by-section sprint approach for focused testing and clean commits
- Standardize breakpoints to 640/768/1024 for consistency
- Hamburger menu pattern for mobile navigation
- Click/tap toggle for hover-only previews on touch devices
- Use frontend-design skill for implementation quality

**From 01-01 (Mobile Navigation):**
- Hamburger menu appears at 640px breakpoint (standard project breakpoint)
- Slide-out panel width: 280px (max 80vw) to avoid full-screen coverage
- All nav links close menu on tap for optimal mobile UX
- Header padding: 12px 16px on mobile (reduced from 16px 32px)
- Wordmark letter-spacing: 3px on mobile (reduced from 6px)

**From 01-02 (Touch Laser + Hero):**
- Pointer Events API for unified touch/mouse (replaces separate handlers)
- Hero margin-top: -30vh/-30dvh on mobile (reduced from -40vh)
- 100dvh with 100vh fallback for full-viewport sections
- CTAs get width: 100% on mobile for full-width stacking

**From 02-01 (Philosophy Section Responsive):**
- useMediaQuery hook approach for CardSwap dimensions (CSS cannot override inline styles)
- Three-tier breakpoint strategy: mobile (<=640px), tablet (<=1024px), desktop
- Progressive scaling: CardSwap dimensions reduce on smaller screens (380x320 → 320x280 → 280x240)
- overflow: hidden on panel containers to prevent mobile scroll issues
- Custom hooks for viewport-dependent prop values when CSS media queries insufficient

**From 02-02 (CoreEngine Mobile Spacing):**
- Panel-header margin reduces progressively: 40px (desktop) → 32px (1024px) → 24px (640px)
- Badge text reduces to 10px with tighter letter-spacing on mobile to prevent overflow
- Section header margin reduced to 32px on mobile (from 48px)
- Pattern: Progressive spacing reduction across breakpoints

### Pending Todos

None.

### Blockers/Concerns

**Node.js version (pre-existing):**
- Local system has Node.js 18.19.1, but Vite requires 20.19+ or 22.12+
- Dev server works locally, production builds done on server (Node 20)
- Not blocking — deployment works via server-side build

## Session Continuity

Last session: 2026-02-16
Stopped at: Completed Phase 2 — verified 7/7 must-haves
Resume file: None
