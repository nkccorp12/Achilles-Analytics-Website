# Coding Conventions

**Analysis Date:** 2026-02-16

## Naming Patterns

**Files:**
- Component files: PascalCase with `.jsx` extension (e.g., `LaserFlow.jsx`, `CardSwap.jsx`)
- CSS files: kebab-case matching component name (e.g., `CardSwap.css`, `VariantGrid.css`)
- Page components: PascalCase in `src/pages/` directory (e.g., `CoreEngine.jsx`, `IntelStack.jsx`)
- Variant components: `Variant[Name].jsx` pattern in `src/variants/` (e.g., `VariantGrid.jsx`, `VariantNeon.jsx`)

**Functions:**
- Component functions: PascalCase (e.g., `function LandingPage()`, `function HeroSection()`)
- Helper/utility functions: camelCase (e.g., `makeSlot()`, `placeNow()`, `hexToRGB()`)
- SVG icon components: `Icon[Name]` pattern in PascalCase (e.g., `const IconBolt = () => ...`, `const IconAnalytics = () => ...`)
- Inline factory functions: camelCase with descriptive names (e.g., `makeLabel()`, `makeSlot()`)

**Variables:**
- Component refs: camelCase with `Ref` suffix (e.g., `mountRef`, `rendererRef`, `uniformsRef`, `containerRef`)
- State variables: camelCase (e.g., `isIntersecting`, `visible`, `fade`)
- Constants (uppercase): UPPER_SNAKE_CASE (e.g., `FRAME_INTERVAL`, `R_H`, `FLARE_HEIGHT`, `NODES`)
- Three.js shader uniforms: camelCase with `u` prefix (e.g., `uWispDensity`, `uTiltScale`, `uFogIntensity`)
- Three.js geometry: camelCase with descriptive names (e.g., `sphereGeo`, `glowGeo`, `lineGeo`)

**Types:**
- No TypeScript in use; JSDoc comments used sparingly for complex functions
- Object literals destructured in function parameters (e.g., `{ className, style, ...rest }`)

**Classes/Objects:**
- React components exported as default or named exports
- Config objects: plain JavaScript objects with descriptive property names

## Code Style

**Formatting:**
- No `.prettierrc` or `.editorconfig` detected
- Indentation: 2 spaces (observed throughout codebase)
- Line length: No visible enforcement; lines can exceed 80-100 characters
- Semicolons: Used consistently at end of statements
- Trailing commas: Used in multi-line objects and arrays

**Linting:**
- ESLint: `@eslint/js` v9.39.1 with React plugin support
- Config location: `eslint.config.js` (flat config format)
- Rules enforced:
  - `no-unused-vars`: Error, but ignores vars matching pattern `^[A-Z_]` (constants/components)
  - React Hooks: Recommended rules active
  - React Refresh: Vite plugin checks active
- No strict TypeScript checking

**Linting Rules Applied:**
```javascript
// From eslint.config.js
'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]
```

## Import Organization

**Order:**
1. React hooks and components (e.g., `import { useEffect, useRef } from 'react'`)
2. Third-party libraries (e.g., `import gsap from 'gsap'`, `import * as THREE from 'three'`)
3. React Router (e.g., `import { BrowserRouter, Routes, Route } from 'react-router-dom'`)
4. Local components and utilities (e.g., `import CardSwap from '../components/CardSwap'`)
5. CSS/styling imports (e.g., `import './CoreEngine.css'`)

**Path Aliases:**
- No path aliases configured; relative imports used throughout (e.g., `../components/`, `../pages/`)
- Absolute imports not used

**Import Style:**
- Named imports when importing specific items
- Default exports for React components
- `import * as` for Three.js library

Example patterns observed:
```javascript
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import VariantGrid, { ArchitectureSection } from './variants/VariantGrid'
import './App.css'
```

## Error Handling

**Patterns:**
- Minimal explicit error handling in components
- Graceful degradation with defensive checks (e.g., `if (!container) return;`)
- Refs checked before use (e.g., `const u = uniformsRef.current; if (!u) return;`)
- Safe navigation with optional chaining (e.g., `iMouse.xy`, `child.props?.onClick`)
- Timeline/animation cleanup in useEffect returns for memory leak prevention

Example pattern:
```javascript
useEffect(() => {
  const container = mountRef.current;
  if (!container) return;
  // ... initialization code

  return () => {
    // ... cleanup code
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}, []);
```

## Logging

**Framework:** `console` object directly (no logging library)

**Patterns:**
- No logging statements found in production code
- Debug statements absent (`console.log` not used)
- Error states handled silently with graceful fallbacks
- Internal math/rendering computations don't log intermediate values

## Comments

**When to Comment:**
- Section dividers for major code blocks (e.g., `// ─── Node Graph Data ─── `)
- Inline comments for complex Three.js shader constants
- Component purpose documented at file top with multi-line comments
- Complex algorithms explained briefly

**Documentation Style:**
- ASCII art section markers used for visual organization:
  ```javascript
  /* ═══════════════════════════════════════════════════════════════════════════
     VARIANT GRID — "Tactical Grid" Command Center Aesthetic
     Achilles Analytics Landing Page
     ═══════════════════════════════════════════════════════════════════════════ */
  ```
- Subsection markers with dashes:
  ```javascript
  // ─── Inline SVG Icons (no external deps) ────────────────────────────────────
  ```

**JSDoc/TSDoc:**
- Not used; React component prop documentation in comments or example imports
- Function parameters sometimes documented inline (e.g., `export default function LaserFlow({...})`)

## Function Design

**Size:**
- Small utility functions: 1-10 lines (e.g., `hexToRGB()`, `makeSlot()`)
- Component functions: 50-300+ lines depending on complexity (e.g., `LaserFlow` is 180+ lines with effects)
- Sub-components: 20-100 lines (e.g., `HeroSection()`, `PhilosophySection()`)

**Parameters:**
- Object destructuring in parameters common (e.g., `({ customClass, ...rest }, ref) => ...`)
- Props spread with rest operator to forward unknown props
- Default parameters used (e.g., `dpr = null`, `color = '#BCFF2F'`)

**Return Values:**
- Components return JSX elements or null
- Utility functions return primitives or objects
- useEffect returns cleanup functions (cancel animations, remove listeners)
- Conditional early returns used for guard clauses

Example pattern:
```javascript
const animate = (now) => {
  raf = requestAnimationFrame(animate);
  if (pausedRef.current || !inViewRef.current) return;
  if (now - lastFrameTime < FRAME_INTERVAL) return;
  // ... animation frame logic
};
```

## Module Design

**Exports:**
- Default export per component file: `export default function ComponentName() { ... }`
- Named exports when multiple related items (e.g., `export const Card = forwardRef(...)`)
- Components wrapped with `forwardRef` when ref access needed from parent

**Barrel Files:**
- Not used; no index files re-exporting from `src/components/`, `src/pages/`, `src/variants/`
- Each component imported directly from its file path

Example:
```javascript
// Correct: direct import
import CardSwap, { Card } from '../components/CardSwap'

// Not used:
// import { CardSwap, Card } from '../components'
```

**Component Patterns:**
- Functional components with hooks (no class components)
- `forwardRef` used for Card component to expose DOM ref: `export const Card = forwardRef(({ customClass, ...rest }, ref) => ...)`
- `displayName` set on forwardRef components for debugging: `Card.displayName = 'Card'`

## Three.js Conventions

**Shader Constants:**
- Uppercase names for GLSL constants (e.g., `VERT`, `FRAG` for vertex/fragment shader code)
- Uniforms prefixed with `u` (e.g., `uWispDensity`, `uTiltScale`)
- Semantic naming for mesh names (e.g., `sphereGeo`, `glowGeo`)

**Memory Management:**
- Explicit cleanup in useEffect returns:
  ```javascript
  return () => {
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
  ```

## Animation Conventions

**GSAP Pattern:**
- Timeline creation: `gsap.timeline()`
- Label-based sequencing: `tl.addLabel('promote', '...')`
- Easing presets: `'elastic.out(0.6,0.9)'`, `'power1.inOut'`
- Configuration objects for reusable animation settings

**requestAnimationFrame Pattern:**
- Frame rate limiting with time delta check:
  ```javascript
  const FRAME_INTERVAL = 1000 / 30;
  if (now - lastFrameTime < FRAME_INTERVAL) return;
  lastFrameTime = now;
  ```

---

*Convention analysis: 2026-02-16*
