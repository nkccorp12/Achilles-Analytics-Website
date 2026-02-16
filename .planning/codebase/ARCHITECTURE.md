# Architecture

**Analysis Date:** 2026-02-16

## Pattern Overview

**Overall:** Single-Page Application (SPA) with Route-Based Page Composition

**Key Characteristics:**
- React 19 with React Router v7 for client-side routing
- Page-level components composed from smaller feature sections
- Heavy use of inline SVG icons and custom CSS for visual consistency
- Three.js integration for interactive 3D visualizations
- GSAP (GreenSock) for advanced animations and card carousel effects
- Lazy-loaded secondary routes with code splitting
- Modular section-based architecture where pages are built from reusable page sections

## Layers

**Presentation/Pages Layer:**
- Purpose: Top-level route handlers and page layouts
- Location: `src/pages/`
- Contains: Full-page components (CoreEngine, UseCases, IntelStack, AICouncil, NeuPage)
- Depends on: Components layer, CSS stylesheets, DigitalTwinViz, LaserFlow
- Used by: App router in `src/App.jsx`

**Components Layer:**
- Purpose: Reusable UI elements and complex interactive widgets
- Location: `src/components/`
- Contains: CardSwap (card carousel with GSAP animation), DigitalTwinViz (Three.js 3D graph), LaserFlow (Three.js shader-based visualization)
- Depends on: React hooks, GSAP, Three.js
- Used by: Pages and variants

**Variants Layer:**
- Purpose: Design system implementations and structural patterns (VariantGrid, VariantGlass, VariantNeon)
- Location: `src/variants/`
- Contains: Hero section, philosophy section, architecture section, complete design variant patterns
- Depends on: Components layer (CardSwap), CSS
- Used by: Landing page in App.jsx

**Styling Layer:**
- Purpose: CSS custom properties, shared styles, component-specific styling
- Location: `src/` and collocated with components
- Contains: Global styles (`index.css`, `App.css`), component styles (`.css` files next to `.jsx`)
- Pattern: CSS Custom Properties for theming (--accent: #BCFF2F, --black, --surface, etc.)

**Routing Layer:**
- Purpose: Client-side routing configuration
- Location: `src/App.jsx`
- Pattern: BrowserRouter with two main routes: "/" (landing page) and "/neu" (secondary page with code splitting via lazy())

## Data Flow

**Landing Page Flow:**

1. User navigates to `/` (root)
2. App renders LandingPage function
3. LandingPage composes multiple section components in sequence:
   - `<VariantGrid />` (hero + philosophy + initial UX)
   - `<CoreEngine />` (impact vs vulnerability analysis)
   - `<UseCases />` (use case demonstrations)
   - `<IntelStack />` (product/module cards with DigitalTwinViz)
   - `<AICouncil />` (AI agent debate simulation)
   - `<ArchitectureSection />` (architecture pillars)
4. Page scrolls vertically through sections
5. Interactive sections trigger animations, 3D renderings, and state updates on scroll

**Secondary Page Flow:**

1. User navigates to `/neu`
2. React Router loads NeuPage via lazy import (code split)
3. NeuPage renders contact modal system, LaserFlow background, and composition of section components
4. Modal state managed locally in NeuPage via useState/useCallback
5. Sections share data context via props

**State Management:**
- No centralized state management (Redux, Zustand, etc.)
- Local component state via useState for modals, counters, animations
- Ref-based animation coordination with GSAP timelines
- IntersectionObserver patterns to detect scroll position and trigger animations

## Key Abstractions

**CardSwap Component:**
- Purpose: Carousel animation system for rotating card displays
- Location: `src/components/CardSwap.jsx`
- Pattern: Managed via GSAP timeline-based card swapping with customizable easing and timing
- Used by: VariantGrid (philosophy section), IntelStack (product showcase)
- Configuration: `width`, `height`, `cardDistance`, `verticalDistance`, `delay`, `pauseOnHover`, `skewAmount`, `easing`

**DigitalTwinViz Component:**
- Purpose: Three.js 3D graph visualization for relationship mapping
- Location: `src/components/DigitalTwinViz.jsx`
- Pattern: Custom node graph rendering with step-based progressive reveal animation
- Features: ResizeObserver for responsiveness, IntersectionObserver for visibility detection
- Used by: IntelStack (section 3 visualization)
- Props: `color` (node color), `step` (animation step level)

**LaserFlow Component:**
- Purpose: Shader-based procedural visual effect background
- Location: `src/components/LaserFlow.jsx`
- Pattern: Custom GLSL shaders for animated flowing beam effect
- Used by: NeuPage (full-screen background effect)
- Uniform parameters: Time, mouse position, beam parameters, fog intensity, color

**Section Pattern:**
- Purpose: Reusable page section structure with heading, content, visualization
- Pattern: Each section has `.jsx` component and paired `.css` file
- Structure: Section label (`// SECTION_NAME`), headline, description, visualizations, CTAs
- CSS Classes: Namespace with `vg-` prefix (e.g., `vg-engine__panel`, `vg-usecase__card`)

## Entry Points

**Main Application Entry:**
- Location: `src/main.jsx`
- Triggers: Browser load of `/index.html`
- Responsibilities: Mount React StrictMode and App component to DOM root element

**App Component:**
- Location: `src/App.jsx`
- Triggers: Loaded by main.jsx
- Responsibilities: Define BrowserRouter and route configuration, lazy load secondary pages, render landing page with all sections

**Landing Page LandingPage():**
- Location: `src/App.jsx` (inline function)
- Triggers: Route "/" matches
- Responsibilities: Compose all landing page sections in correct order, establish visual flow

**Secondary Route (NeuPage):**
- Location: `src/pages/NeuPage.jsx`
- Triggers: Route "/neu" matches
- Responsibilities: Render alternative page layout with contact modal, LaserFlow background, reuse of core sections

## Error Handling

**Strategy:** Minimal error handling; development-focused

**Patterns:**
- No try/catch blocks or error boundaries detected
- Component render guards check for nullish container refs (e.g., in DigitalTwinViz and LaserFlow)
- ResizeObserver and IntersectionObserver gracefully return early if container unavailable
- Modal state prevents render of closed modal (`if (phase === 'closed') return null`)

## Cross-Cutting Concerns

**Logging:** None detected; console logging not used in production code

**Validation:**
- Form validation in ContactModal (NeuPage.jsx): basic trim() checks on name, email, message fields
- Event handler defensive checks (stopPropagation, ref nullability)

**Authentication:** Not applicable; marketing/informational frontend

**Performance Optimization:**
- Code splitting via lazy() for secondary routes
- useMemo() in CardSwap to memoize children array and refs
- IntersectionObserver to pause Three.js rendering when offscreen
- ResizeObserver for responsive canvas sizing (Three.js)
- useCallback in ContactModal to prevent unnecessary function recreation

---

*Architecture analysis: 2026-02-16*
