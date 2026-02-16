# Testing Patterns

**Analysis Date:** 2026-02-16

## Test Framework

**Runner:**
- Not configured or in use
- No Jest, Vitest, or other test runner detected in dependencies
- Package.json has no test scripts

**Assertion Library:**
- None installed

**Run Commands:**
- No test commands available
- Package.json scripts: `dev`, `build`, `lint`, `preview` only

```bash
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run lint             # Run ESLint
npm run preview          # Preview production build
```

## Test File Organization

**Location:**
- No test files found in codebase (`*.test.js`, `*.spec.js` absent)
- Test files would logically co-locate with components if added:
  - `src/components/CardSwap.test.jsx` for `src/components/CardSwap.jsx`
  - `src/pages/CoreEngine.test.jsx` for `src/pages/CoreEngine.jsx`

**Naming Convention (if implemented):**
- Recommended: `[ComponentName].test.jsx` or `[ComponentName].spec.jsx`
- Test discovery: `**/*.test.{js,jsx}` or `**/*.spec.{js,jsx}`

**Structure (if implemented):**
```
src/
├── components/
│   ├── CardSwap.jsx
│   ├── CardSwap.test.jsx          ← Test file co-located
│   ├── LaserFlow.jsx
│   └── LaserFlow.test.jsx
├── pages/
│   ├── CoreEngine.jsx
│   └── CoreEngine.test.jsx
```

## Test Structure

**Suite Organization (recommended pattern based on codebase):**

If tests were implemented, they would follow React Testing Library conventions:

```typescript
// Example: CardSwap.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardSwap, { Card } from './CardSwap';

describe('CardSwap Component', () => {
  describe('initialization', () => {
    it('should render children cards', () => {
      render(
        <CardSwap>
          <Card>Card 1</Card>
          <Card>Card 2</Card>
        </CardSwap>
      );
      expect(screen.getByText('Card 1')).toBeInTheDocument();
    });

    it('should apply correct dimensions', () => {
      render(
        <CardSwap width={500} height={400}>
          <Card>Test</Card>
        </CardSwap>
      );
      // assertions here
    });
  });

  describe('animation behavior', () => {
    it('should swap cards after delay', async () => {
      render(
        <CardSwap delay={100}>
          <Card>Card 1</Card>
          <Card>Card 2</Card>
        </CardSwap>
      );

      await waitFor(() => {
        // Animation assertions
      }, { timeout: 200 });
    });
  });

  describe('interaction', () => {
    it('should pause animation on hover when pauseOnHover is true', async () => {
      render(
        <CardSwap pauseOnHover>
          <Card>Test</Card>
        </CardSwap>
      );
      // Hover and assertion logic
    });

    it('should call onCardClick when card is clicked', async () => {
      const handleClick = vi.fn();
      render(
        <CardSwap onCardClick={handleClick}>
          <Card>Clickable</Card>
        </CardSwap>
      );

      await userEvent.click(screen.getByText('Clickable'));
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
```

**Patterns (if implemented):**

- Setup pattern: Standard React Testing Library with `render()` function
- Teardown pattern: Automatic cleanup via React Testing Library
- Assertion pattern: Expect assertions with matchers

## Mocking

**Framework:** Not currently used (no testing framework installed)

**Recommended Patterns (if tests were added):**

```typescript
// Mocking Three.js modules
vi.mock('three', () => ({
  WebGLRenderer: vi.fn(() => ({
    setPixelRatio: vi.fn(),
    setSize: vi.fn(),
    render: vi.fn(),
    dispose: vi.fn(),
    domElement: document.createElement('canvas'),
  })),
  Scene: vi.fn(() => ({
    add: vi.fn(),
  })),
  PerspectiveCamera: vi.fn(() => ({
    position: { set: vi.fn() },
    lookAt: vi.fn(),
    aspect: 1,
    updateProjectionMatrix: vi.fn(),
  })),
  // ... other Three.js constructors
}));

// Mocking GSAP
vi.mock('gsap', () => ({
  default: {
    set: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn(),
      set: vi.fn(),
      addLabel: vi.fn(),
      call: vi.fn(),
    })),
  },
}));

// Mocking window APIs
const mockRequestAnimationFrame = vi.spyOn(window, 'requestAnimationFrame');
const mockResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));
window.ResizeObserver = mockResizeObserver;
```

**What to Mock:**
- Three.js rendering calls (WebGLRenderer, Scene, Camera)
- GSAP animation timeline operations
- Window APIs (requestAnimationFrame, ResizeObserver, IntersectionObserver)
- setTimeout/setInterval
- External API calls (if present)

**What NOT to Mock:**
- React hooks (use real React for integration tests)
- Component structure and rendering
- User event handlers and interactions
- CSS/styling (assert class names instead)
- Basic math/utility functions

## Fixtures and Factories

**Test Data (if implemented):**

```typescript
// fixtures/cardData.ts
export const mockCards = [
  { id: 1, title: 'Card 1', content: 'Content 1' },
  { id: 2, title: 'Card 2', content: 'Content 2' },
  { id: 3, title: 'Card 3', content: 'Content 3' },
];

// fixtures/three.ts
export const createMockRenderer = () => ({
  setPixelRatio: vi.fn(),
  setSize: vi.fn(),
  render: vi.fn(),
  dispose: vi.fn(),
  setClearColor: vi.fn(),
  shadowMap: { enabled: false },
  outputColorSpace: 'srgb',
  domElement: document.createElement('canvas'),
});
```

**Location:**
- Would live in `src/__tests__/fixtures/` or `src/components/__fixtures__/`
- Factory functions for common Three.js/GSAP objects
- Shared mock data for multiple test files

## Coverage

**Requirements:** None enforced

**View Coverage:**
```bash
# If Vitest were configured:
npm run test -- --coverage

# Expected output:
# ├─ Statements : XX%
# ├─ Branches   : XX%
# ├─ Functions  : XX%
# └─ Lines      : XX%
```

**Recommended Coverage Targets (if testing implemented):**
- Statements: 70%+
- Branches: 60%+
- Functions: 75%+
- Lines: 70%+

## Test Types

**Unit Tests (if implemented):**
- Scope: Individual component props, state changes, event handlers
- Approach: React Testing Library with component-level assertions
- Focus: CardSwap card rotation, LaserFlow prop updates, DigitalTwinViz animations
- Example: Testing `makeSlot()` utility function returns correct coordinates

```typescript
describe('makeSlot utility', () => {
  it('should calculate correct slot position', () => {
    const slot = makeSlot(0, 60, 70, 3);
    expect(slot).toEqual({
      x: 0,
      y: 0,
      z: 0,
      zIndex: 3
    });
  });
});
```

**Integration Tests (if implemented):**
- Scope: Multi-component interactions, routing, animation sequences
- Approach: Render full page sections with user interactions
- Example: Full CardSwap with animation callback, Router navigation between pages
- Duration: 100-500ms per test (async animation handling)

```typescript
describe('CardSwap animation sequence', () => {
  it('should complete full swap cycle', async () => {
    render(
      <CardSwap delay={200} easing="power1.inOut">
        {/* cards */}
      </CardSwap>
    );

    await waitFor(() => {
      // Verify animation completed
    }, { timeout: 500 });
  });
});
```

**E2E Tests:**
- Framework: Not currently used
- If added, would use Cypress or Playwright
- Would test: Full page navigation, scroll interactions, Three.js visualization loads

## Common Patterns

**Async Testing (recommended pattern if tests were added):**

```typescript
// Testing requestAnimationFrame-based animations
it('should animate over time', async () => {
  render(<LaserFlow />);

  // Wait for animation frame to complete
  await waitFor(() => {
    expect(canvas).toHaveStyle('display: block');
  });
});

// Testing setTimeout-based delays
it('should trigger swap after delay', async () => {
  vi.useFakeTimers();
  render(<CardSwap delay={5000} />);

  vi.advanceTimersByTime(5000);

  await waitFor(() => {
    // Animation happened
  });

  vi.useRealTimers();
});
```

**Error Testing (recommended pattern):**

```typescript
// Testing error states and graceful fallbacks
describe('error handling', () => {
  it('should handle missing Three.js context gracefully', () => {
    // Render component without proper WebGL support
    // Verify fallback renders
  });

  it('should cleanup on unmount even with animation running', () => {
    const { unmount } = render(<LaserFlow />);
    expect(() => unmount()).not.toThrow();
  });
});
```

**Animation Testing (recommended):**

```typescript
// Testing GSAP timelines
it('should use correct easing for elastic animation', () => {
  const mockTimeline = gsap.timeline();
  // Verify .to() called with 'elastic.out(0.6,0.9)' easing
  expect(mockTimeline.to).toHaveBeenCalledWith(
    expect.anything(),
    expect.objectContaining({
      ease: 'elastic.out(0.6,0.9)'
    })
  );
});

// Testing animation frame throttling
it('should respect FRAME_INTERVAL throttle', () => {
  const frameCount = 0;
  const mockAnimFrame = vi.spyOn(window, 'requestAnimationFrame');

  render(<LaserFlow />);

  // Should not render every frame if throttled
  expect(mockAnimFrame).toHaveBeenCalledTimes(1);
});
```

## Test Setup Requirements

**If testing framework were implemented, setup would include:**

```javascript
// vitest.config.js (recommended)
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/__tests__/',
      ]
    }
  }
})
```

```typescript
// src/__tests__/setup.ts (recommended)
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
```

---

*Testing analysis: 2026-02-16*

**Status:** No testing framework currently installed. This codebase is a frontend UI/visualization project without automated test coverage. Adding Vitest + React Testing Library is recommended for quality assurance, especially given heavy reliance on animation libraries (GSAP) and Three.js rendering.
