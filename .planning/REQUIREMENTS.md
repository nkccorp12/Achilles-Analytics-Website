# Requirements: Achilles Analytics Mobile UI Fix Sprint

**Defined:** 2026-02-16
**Core Value:** Every section of the website must look intentional and polished on any device

## v1 Requirements

### Navigation & Header

- [x] **NAV-01**: Mobile hamburger menu with slide-out nav panel on NeuPage header
- [x] **NAV-02**: Header padding and spacing optimized for all mobile viewports
- [x] **NAV-03**: Wordmark letter-spacing reduced on narrow screens (<640px)

### Laser & Hero

- [x] **HERO-01**: Touch support for laser reveal image (onTouchMove/onTouchEnd handlers)
- [x] **HERO-02**: Hero section margin-top adjusted for short mobile screens
- [x] **HERO-03**: Hero CTAs stacked and centered on mobile

### Philosophy / CardSwap

- [x] **CARD-01**: CardSwap component responsive width — no horizontal overflow on 360px screens
- [x] **CARD-02**: CardSwap.css has responsive media queries for mobile/tablet
- [x] **CARD-03**: Philosophy panel has overflow:hidden and reduced min-height on mobile

### CoreEngine

- [x] **CORE-01**: Panel spacing, margins, and header margins optimized for mobile viewports

### UseCases

- [x] **CASE-01**: Touch/tap alternatives for hover background image reveals on showcase and cards
- [x] **CASE-02**: Cards grid single-column on mobile, properly spaced

### IntelStack

- [x] **INTEL-01**: Intel Report preview accessible via tap/click toggle (not hover-only)
- [x] **INTEL-02**: Alerts panel properly positioned and readable on narrow screens
- [x] **INTEL-03**: IntelStack breakpoints normalized from 768px to match 640px/768px/1024px system

### AI Council

- [x] **COUNCIL-01**: SVG visualization properly sized and readable on mobile
- [x] **COUNCIL-02**: Synthesis overlay properly centered on all viewports

### Global Consistency

- [x] **GLOBAL-01**: All CSS files use standardized breakpoints: 640px / 768px / 1024px
- [x] **GLOBAL-02**: All sections properly centered and spaced on viewports 360px to 1440px+

### Reach Out

- [x] **REACH-01**: Footer items and CTAs properly stacked and centered on mobile

## v2 Requirements

### Future Mobile Enhancements

- **PERF-01**: Disable WebGL LaserFlow on low-end mobile devices
- **A11Y-01**: Full touch gesture support (swipe between sections)
- **NAV-02**: Scroll-to-top on route changes

## Out of Scope

| Feature | Reason |
|---------|--------|
| Desktop redesign | Sprint focuses exclusively on mobile fixes |
| New content/sections | Fix sprint, not feature sprint |
| WebGL performance | Separate performance sprint needed |
| Backend/API changes | Frontend-only sprint |
| SEO/meta tags | Not related to mobile responsiveness |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 1 | Complete |
| NAV-02 | Phase 1 | Complete |
| NAV-03 | Phase 1 | Complete |
| HERO-01 | Phase 1 | Complete |
| HERO-02 | Phase 1 | Complete |
| HERO-03 | Phase 1 | Complete |
| CARD-01 | Phase 2 | Complete |
| CARD-02 | Phase 2 | Complete |
| CARD-03 | Phase 2 | Complete |
| CORE-01 | Phase 2 | Complete |
| CASE-01 | Phase 3 | Complete |
| CASE-02 | Phase 3 | Complete |
| INTEL-01 | Phase 3 | Complete |
| INTEL-02 | Phase 3 | Complete |
| INTEL-03 | Phase 3 | Complete |
| COUNCIL-01 | Phase 4 | Complete |
| COUNCIL-02 | Phase 4 | Complete |
| GLOBAL-01 | Phase 4 | Complete |
| GLOBAL-02 | Phase 4 | Complete |
| REACH-01 | Phase 4 | Complete |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-16*
*Last updated: 2026-02-16 after initial definition*
