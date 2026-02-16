# Codebase Concerns

**Analysis Date:** 2026-02-16

## Tech Debt

**Multiple CSS variants unused in production:**
- Issue: Three separate design variants exist (`VariantGlass.jsx`, `VariantNeon.jsx`, `VariantGrid.jsx`) with duplicate styles and logic, only `VariantGrid` is actively used in routing
- Files: `src/variants/VariantGlass.jsx`, `src/variants/VariantNeon.jsx`, `src/variants/VariantNeon.css`, `src/variants/VariantGlass.css`, `src/App.jsx`
- Impact: Code duplication increases maintenance burden and bundle size; dead code increases cognitive load
- Fix approach: Audit which variants are actually needed. If only `VariantGrid` is used, remove `VariantGlass` and `VariantNeon` entirely. If all three are needed, consolidate shared logic into a single variant system with configuration props

**Hard-coded external URLs scattered throughout codebase:**
- Issue: IP address `82.165.45.74:8100` is hard-coded in multiple CTA buttons and links; no environment configuration for backend platform URL
- Files: `src/variants/VariantGrid.jsx` (line 70), `src/pages/NeuPage.jsx` (lines 145, 218, 257)
- Impact: Cannot change backend address without modifying source code; breaks in different environments (dev/staging/prod); adds risk to deployments
- Fix approach: Move to environment variable `VITE_PLATFORM_URL`; create a utility function `getPlatformUrl()` to return the value; update all hard-coded URLs to use this function

**Inline SVG icons duplicated across multiple components:**
- Issue: Each page component (`CoreEngine.jsx`, `IntelStack.jsx`, `AICouncil.jsx`, `UseCases.jsx`) defines its own SVG icon components instead of sharing a single icon library
- Files: `src/pages/CoreEngine.jsx` (IconBolt, IconAnalytics), `src/pages/IntelStack.jsx` (IconExplore through IconAccountTree), `src/pages/AICouncil.jsx` (IconTerminal, IconRefresh), `src/pages/UseCases.jsx` (IconWarehouse, IconShip, IconInfrastructure)
- Impact: Maintenance nightmare when icon design changes; increases codebase size; makes it harder to achieve visual consistency
- Fix approach: Create `src/components/Icons/index.jsx` as centralized icon library; import from there instead of defining inline

**Magic numbers and timing constants scattered throughout:**
- Issue: Animation durations, frame intervals, thresholds, and animation parameters are hard-coded throughout the codebase (e.g., `3000` ms delay, `FRAME_INTERVAL = 1000 / 30`, IntersectionObserver thresholds of `0.3`, `0.4`, `0.15`)
- Files: `src/components/CardSwap.jsx`, `src/components/DigitalTwinViz.jsx`, `src/components/LaserFlow.jsx`, `src/pages/IntelStack.jsx`, `src/pages/AICouncil.jsx`
- Impact: Difficult to maintain consistent animations across the site; hard to debug timing issues; impossible to easily adjust animation speeds globally
- Fix approach: Create `src/config/animation.js` with exported constants like `CARD_SWAP_DELAY`, `FRAME_RATE`, `INTERSECTION_THRESHOLDS`, etc.; import and use everywhere

## Memory Leaks & Resource Management Issues

**IntersectionObserver instances not consistently disconnected:**
- Issue: While most IntersectionObserver instances are properly cleaned up in useEffect return statements, inconsistent patterns exist; some components call `disconnect()` in some paths but not others
- Files: `src/components/DigitalTwinViz.jsx` (line 261), `src/pages/IntelStack.jsx` (lines 260, 292), `src/pages/AICouncil.jsx` (line 84)
- Impact: Potential memory leaks in long-running sessions; observer callbacks may fire after component unmounts
- Fix approach: Establish pattern: all useEffect hooks with IntersectionObserver must return cleanup function that disconnects. Use ESLint rule `react-hooks/exhaustive-deps` to catch missing dependencies

**requestAnimationFrame not always cancelled on unmount:**
- Issue: Several animation loops store RAF IDs but may not cancel them in all code paths (LaserFlow, DigitalTwinViz, CardSwap)
- Files: `src/components/LaserFlow.jsx` (lines 346, 350, 369), `src/components/DigitalTwinViz.jsx` (line 169, 256), `src/components/CardSwap.jsx` (implicit in useEffect)
- Impact: Animation frames continue running after component unmount if useEffect cleanup is not reached; memory leak in SPA navigation
- Fix approach: Create custom hook `useAnimationFrame` that guarantees cleanup; audit existing RAF usage to ensure cleanup functions are always reached

**Three.js WebGLRenderer not properly disposed in all cases:**
- Issue: `LaserFlow` and `DigitalTwinViz` dispose renderer and geometries in cleanup, but if component unmounts during async initialization, cleanup may not be triggered
- Files: `src/components/LaserFlow.jsx` (lines 262-275), `src/components/DigitalTwinViz.jsx` (lines 258-274)
- Impact: GPU memory leaks; orphaned WebGL contexts; performance degradation with heavy use of these components
- Fix approach: Wrap Three.js setup in try-catch; use ref to track initialized state; ensure cleanup always fires regardless of mount state

**Canvas texture disposal incomplete in DigitalTwinViz:**
- Issue: `makeLabel()` function creates CanvasTexture but `label.material.map?.dispose()` uses optional chaining that may skip disposal if material is undefined
- Files: `src/components/DigitalTwinViz.jsx` (lines 23-43, 268)
- Impact: Canvas textures not properly released; GPU memory accumulates over time
- Fix approach: Change line 268 to always dispose: `label.material?.map?.dispose(); label.material?.dispose();` with explicit null checks

## Performance Bottlenecks

**LaserFlow shader compilation may block main thread:**
- Issue: Complex fragment shader (214 lines of GLSL with many uniforms) is compiled on first render; no shader caching or pre-compilation
- Files: `src/components/LaserFlow.jsx` (lines 4-214)
- Impact: First render of LaserFlow component freezes UI briefly on slower devices; particularly bad on mobile
- Fix approach: Consider shader caching strategy or implementing shader complexity reduction for mobile devices; add performance monitoring to track compilation time

**Excessive IntersectionObserver callbacks during scroll:**
- Issue: `IntelStack.jsx` creates 3 separate IntersectionObserver instances (lines 251-292) that all fire on scroll events; `VariantNeon.jsx` has scroll event listener (line 627)
- Files: `src/pages/IntelStack.jsx`, `src/variants/VariantNeon.jsx`
- Impact: Scroll jank on devices with limited processing power; multiple observers checking same viewport conditions
- Fix approach: Consolidate into single observer where possible; throttle scroll events; consider using Intersection Observer API's `rootMargin` to pre-load content

**DigitalTwinViz renders 3D scene at 30fps regardless of visibility:**
- Issue: Animation loop respects visibility check (`if (!visible) return;`) but continues allocating memory and running calculations even when component is out of view
- Files: `src/components/DigitalTwinViz.jsx` (lines 168-172)
- Impact: Battery drain on mobile; unnecessary CPU/GPU usage when section is scrolled past
- Fix approach: Pause entire animation loop when not visible, not just skip rendering; implement visibility pause across all animation components consistently

**CardSwap uses GSAP timeline for every swap with no optimization:**
- Issue: Each card swap creates new GSAP timeline with multiple tweens; no pooling or recycling of animation objects
- Files: `src/components/CardSwap.jsx` (lines 82-138)
- Impact: Memory pressure with many CardSwap instances; garbage collection spikes during card swaps
- Fix approach: Consider reusing timeline instances or simplifying animation complexity for lower-end devices

## Fragile Areas

**Animation state management in multiple components relies on refs + useState mix:**
- Issue: `AICouncil.jsx`, `IntelStack.jsx`, and `CardSwap.jsx` mix refs and state (e.g., `idxRef.current`, `setBiasIdx(next)`) creating inconsistency and potential sync issues
- Files: `src/pages/AICouncil.jsx` (lines 39-85), `src/pages/IntelStack.jsx` (lines 231-261), `src/components/CardSwap.jsx` (lines 68-140)
- Impact: State can become out of sync; difficult to reason about component behavior; easy to introduce bugs when modifying animation logic
- Fix approach: Pick one pattern: either use only refs for animation state OR use only state/reducer; establish pattern and enforce across all animation components

**Three.js viewport sizing depends on fragile DOM queries:**
- Issue: `LaserFlow` and `DigitalTwinViz` use `getBoundingClientRect()` and `clientWidth/clientHeight` without defensive checks; if parent container is hidden/removed, sizing breaks
- Files: `src/components/LaserFlow.jsx` (line 315), `src/components/DigitalTwinViz.jsx` (lines 76-82)
- Impact: Rendering artifacts; distorted 3D views when components are hidden or re-mounted; errors in ResizeObserver callback
- Fix approach: Add safety checks: `if (w === 0 || h === 0) return;` before updating sizes; guard against null containers in resize/intersection callbacks

**Event listener registration patterns inconsistent across components:**
- Issue: Some components use `{ passive: true }`, others don't; some clean up event listeners, others rely on component unmount (e.g., CardSwap lines 156-157 don't remove listeners if `pauseOnHover` is false)
- Files: `src/components/LaserFlow.jsx` (lines 335, 343-344), `src/components/CardSwap.jsx` (lines 156-157), `src/variants/VariantNeon.jsx` (line 627)
- Impact: Memory leaks in reused components; inconsistent performance characteristics; event listeners may fire on unmounted components
- Fix approach: Create wrapper function `addEventListenerWithCleanup(el, event, handler)` that returns cleanup function; enforce cleanup in all useEffect returns

**Hardcoded step data in DigitalTwinViz and BIAS Control:**
- Issue: Component behavior is tightly coupled to hardcoded data arrays (`NODES` array with 7 items, `BIAS_ITEMS` array with 6 items); step index logic assumes specific data structure
- Files: `src/components/DigitalTwinViz.jsx` (lines 5-15), `src/pages/IntelStack.jsx` (lines 165-172)
- Impact: Cannot reuse components with different datasets; hard to add/remove items without breaking animation logic; difficult to test with different data
- Fix approach: Refactor to accept data as props; separate animation logic from data; make components generic and data-driven

## Security Considerations

**Hardcoded backend URL exposes infrastructure:**
- Risk: Public IP address `82.165.45.74:8100` is visible in source code and browser; could be targeted if this is the actual backend
- Files: `src/variants/VariantGrid.jsx`, `src/pages/NeuPage.jsx`
- Current mitigation: None
- Recommendations: Use environment variables for all backend URLs; consider using relative URLs (`/api` instead of hardcoded IP); rotate IP if this is live infrastructure; implement DNS-based routing in production

**No content validation in contact form:**
- Risk: Contact form in `NeuPage.jsx` constructs mailto URL with user input; while `encodeURIComponent` is used, no validation of input types or content
- Files: `src/pages/NeuPage.jsx` (lines 33-40)
- Current mitigation: Basic trim checks on lines 35-36
- Recommendations: Add email validation before allowing submit; sanitize all user inputs; consider server-side form processing instead of mailto redirect; add CSRF protection if implementing real backend

**No error boundaries for Three.js components:**
- Risk: If WebGL context is lost or shader compilation fails, entire page may crash with uncaught errors
- Files: `src/components/LaserFlow.jsx`, `src/components/DigitalTwinViz.jsx`
- Current mitigation: None
- Recommendations: Wrap Three.js components in Error Boundary; implement graceful fallback to static content if WebGL fails; log errors for monitoring

**Environment-sensitive assets (images) may fail silently:**
- Risk: Images referenced in code (`/background.png`, `/logo.png`, etc.) are relative URLs; 404 errors won't break page but will show broken images
- Files: `src/pages/NeuPage.jsx` (line 193, 228), `src/variants/VariantGrid.jsx` (line 81)
- Current mitigation: None
- Recommendations: Verify all image assets exist in public folder; implement image error handlers; consider using image CDN with fallbacks

## Test Coverage Gaps

**No unit tests for core animation components:**
- What's not tested: `CardSwap.jsx`, `DigitalTwinViz.jsx`, `LaserFlow.jsx` have no test files; animation timing and state transitions are untested
- Files: `src/components/CardSwap.jsx`, `src/components/DigitalTwinViz.jsx`, `src/components/LaserFlow.jsx`
- Risk: Regression in animation logic goes undetected; refactoring animation code is high-risk without test coverage
- Priority: High

**No tests for page components with complex state:**
- What's not tested: `IntelStack.jsx` (6 useEffects, 2 state variables), `AICouncil.jsx` (nested state and intervals), `NeuPage.jsx` (modal state, visibility tracking) have no test coverage
- Files: `src/pages/IntelStack.jsx`, `src/pages/AICouncil.jsx`, `src/pages/NeuPage.jsx`
- Risk: State management bugs and timing issues in these complex components remain undetected
- Priority: High

**No integration tests for full page flows:**
- What's not tested: Navigation between landing page and `/neu` route; modal open/close flows; scroll-triggered animations
- Files: App routing, page transitions
- Risk: Changes to routing or component composition could break user flows without detection
- Priority: Medium

**No performance/visual regression tests:**
- What's not tested: Three.js rendering correctness; visual output of complex CSS animations; frame rate maintenance
- Files: All Three.js and animation components
- Risk: Visual regressions, rendering artifacts, and performance degradation go unnoticed
- Priority: Medium

## Missing Critical Features

**No analytics or error tracking:**
- Problem: No way to detect when components fail, when animations skip frames, or if backend is unreachable; platform link at `82.165.45.74:8100` may be down without notification
- Blocks: Cannot monitor production health; cannot detect user experience degradation
- Recommendation: Add Sentry or equivalent error tracking; add basic analytics to track page views and CTA clicks

**No loading states for dynamic content:**
- Problem: IntelStack animations trigger without checking if supporting data is ready; DigitalTwinViz expects specific data structure but has no validation
- Blocks: Cannot gracefully handle slow networks or missing data
- Recommendation: Add explicit loading/error states; validate data before rendering; show placeholders during data load

**No offline support:**
- Problem: Application relies entirely on external assets and backend connectivity; no service worker or offline fallback
- Blocks: Page won't load if CDN/backend is down; no value delivery in offline scenarios
- Recommendation: Add basic service worker for static content; implement offline detection and user messaging

## Dependencies at Risk

**GSAP library single dependency for all animation:**
- Risk: Heavy reliance on external library; codebase would need significant refactoring if GSAP is deprecated or licensing changes
- Impact: Animation logic tightly coupled to GSAP API; cannot easily switch to alternative libraries
- Migration plan: Consider evaluating Web Animations API or CSS animations for simpler tweens; keep GSAP only for complex card swap animation if truly needed

**Three.js for both LaserFlow and DigitalTwinViz:**
- Risk: Complex 3D library for visual effects; if Three.js introduces breaking changes, both components affected
- Impact: Bundle size increase; performance overhead on mobile
- Migration plan: Consider whether LaserFlow shader effect could be replaced with pure CSS/Canvas for better performance; evaluate if DigitalTwinViz really needs full Three.js

---

*Concerns audit: 2026-02-16*
