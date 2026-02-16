# Achilles Analytics — Mobile UI Fix Sprint

## What This Is

A focused mobile responsiveness sprint for the Achilles Analytics marketing website. The site is a React/Vite single-page application with a dark tactical/military aesthetic (lime-green accents on black). The desktop experience is polished — this sprint fixes all mobile and tablet layout issues, adds touch interaction support, and ensures pixel-perfect responsiveness across all viewports from 360px to 1440px+.

## Core Value

Every section of the website must look intentional and polished on any device — no overflow, no broken layouts, no inaccessible interactions.

## Requirements

### Validated

- ✓ Desktop layout and design — existing
- ✓ Dark tactical grid aesthetic with lime (#BCFF2F) accents — existing
- ✓ All page sections functional (NeuPage, Hero, Philosophy, CoreEngine, UseCases, IntelStack, AICouncil, Architecture, Reach Out) — existing
- ✓ Contact modal with form — existing
- ✓ Animated CardSwap component — existing
- ✓ LaserFlow WebGL reveal effect — existing
- ✓ IntersectionObserver-driven animations — existing
- ✓ Safety backup pushed to GitHub — existing

### Active

- [ ] Fix CardSwap overflow on mobile (380px hardcoded width overflows 360px screens)
- [ ] Add mobile hamburger menu to NeuPage header (nav links currently hidden with no alternative)
- [ ] Add touch support to laser reveal section (onTouchMove/onTouchEnd)
- [ ] Fix Intel Report hover-only preview (inaccessible on touch devices)
- [ ] Add touch alternatives for UseCases hover backgrounds
- [ ] Normalize breakpoints across all CSS files (consistent 640px / 768px / 1024px)
- [ ] Fix NeuPage header padding, wordmark letter-spacing on mobile
- [ ] Fix hero margin-top overlap on short mobile screens
- [ ] Fix AI Council SVG visualization sizing on mobile
- [ ] Fix philosophy panel min-height and overflow on mobile
- [ ] Add CardSwap.css media queries (currently zero responsive rules)
- [ ] Fix IntelStack alerts panel positioning on narrow screens
- [ ] Ensure all sections properly centered on all viewports

### Out of Scope

- Redesign or visual changes to existing desktop aesthetic — this is a fix sprint, not a redesign
- New features or content additions
- Performance optimization (WebGL, bundle size)
- SEO or accessibility improvements beyond touch support
- Backend or API changes

## Context

- **Stack:** React 18 + Vite, no CSS framework, vanilla CSS with BEM naming
- **Design system:** "Tactical Grid" — dark backgrounds, lime-green (#BCFF2F) accents, IBM Plex fonts, glass-morphism panels
- **Animation:** GSAP for CardSwap, CSS transitions/keyframes elsewhere, Three.js/WebGL for LaserFlow
- **Current state:** Desktop polished, mobile has overflow issues, hidden navigation, hover-only interactions
- **Key breakpoints in use:** Inconsistent — AICouncil/CoreEngine/UseCases use 640px, IntelStack uses 768px, VariantGlass uses 600px
- **Safety backup:** Pushed to https://github.com/nkccorp12/Achilles-Analytics-Website

## Constraints

- **Design:** Keep existing tactical military aesthetic — all changes must be subtle refinements
- **Tech stack:** No new dependencies — CSS media queries and minor JSX changes only
- **Breakpoints:** Standardize to 640px (mobile) / 768px (tablet) / 1024px (desktop)
- **Approach:** Section-by-section fixes, each section gets its own phase

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Section-by-section sprint | Allows focused testing per section, clean commits | — Pending |
| Standardize breakpoints to 640/768/1024 | Consistent behavior across all CSS files | — Pending |
| Use frontend-design skill for implementation | Ensures high design quality on mobile fixes | — Pending |
| Hamburger menu for mobile nav | Standard mobile pattern, no JS framework needed | — Pending |
| Click/tap toggle for hover previews | Touch-friendly without breaking desktop hover | — Pending |

---
*Last updated: 2026-02-16 after initialization*
