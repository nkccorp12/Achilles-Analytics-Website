# Technology Stack

**Analysis Date:** 2026-02-16

## Languages

**Primary:**
- JavaScript (ES2020+) - Client-side React components and utilities
- JSX - React component markup in `src/**/*.jsx` files
- GLSL - Fragment and vertex shaders for WebGL in `src/components/LaserFlow.jsx`

**Secondary:**
- CSS - Styling in `src/**/*.css` files

## Runtime

**Environment:**
- Node.js 20+ (required for Vite 7, noted in `DEPLOY.md`)
- Modern browsers supporting ES2020, WebGL, and ResizeObserver API

**Package Manager:**
- npm 9.2.0
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 19.2.0 - UI framework and component structure
- React Router 7.13.0 - Client-side routing for `/` and `/neu` pages in `src/App.jsx`

**3D Graphics:**
- Three.js 0.182.0 - 3D WebGL rendering for `DigitalTwinViz` and `LaserFlow` components

**Animation:**
- GSAP 3.14.2 - Keyframe animation and timeline control in `src/components/CardSwap.jsx`

**Build/Dev:**
- Vite 7.3.1 - Build tool and dev server with Hot Module Replacement
  - Config: `vite.config.js` - Minimal setup with React plugin only
  - Includes `@vitejs/plugin-react` 5.1.1 for Babel/Fast Refresh support

## Key Dependencies

**Critical:**
- react-dom 19.2.0 - DOM rendering and entry point in `src/main.jsx`
- three 0.182.0 - Powers 3D visualizations in `src/components/`

**Development:**
- @types/react 19.2.7 - TypeScript types for React (present but project uses JSX)
- @types/react-dom 19.2.3 - TypeScript types for react-dom
- @eslint/js 9.39.1 - ESLint JavaScript configuration
- eslint 9.39.1 - Linting framework
- eslint-plugin-react-hooks 7.0.1 - Rules for React hooks in `src/pages/`
- eslint-plugin-react-refresh 0.4.24 - Rules for React Fast Refresh
- globals 16.5.0 - Global browser variables for ESLint

## Configuration

**Environment:**
- No `.env` file detected - all configuration is static
- Platform URL hardcoded: `http://82.165.45.74:8100` in `src/pages/NeuPage.jsx` and `src/variants/VariantGlass.jsx`
- Email contact: `contact@achilles-analytics.com` in `src/pages/NeuPage.jsx`

**Build:**
- `vite.config.js` - Single file, minimal configuration with React plugin
- `eslint.config.js` - Flat config with recommended rules for React hooks and Fast Refresh
- `index.html` - Entry HTML with favicon, Google Fonts preconnection, and root div

**Font Stack:**
- Google Fonts loaded in `index.html`:
  - DM Sans (300-700)
  - IBM Plex Serif (300-700)
  - IBM Plex Mono (300-500)
  - JetBrains Mono (300-700)
  - Playfair Display (400-900)
  - DM Serif Display
  - Inter (300-700)
  - Space Mono (400-700)
  - Barlow Condensed (400-900)

## Platform Requirements

**Development:**
- Node.js 20+ (Vite 7 requirement, Node 18 incompatible per `DEPLOY.md`)
- Modern browser with WebGL support
- SSH access for deployment (keys in `~/Desktop/sync/id_ed25519`)

**Production:**
- Static site served via nginx on Linux server (82.165.45.74:80)
- Built output: Single `dist/` directory with HTML, JS bundles, and static assets
- Deployment method: `rsync` source to server, build remotely with Node 20, copy `dist/` to nginx path

**Static Assets:**
- Location: `public/` directory
- Contains: PNG/JPG images, MP4 videos, favicon
- Files: `background.png`, `map.png`, `map.webp`, `map2.mp4`, `maphd.png`, `logo2.png`, `twin.png`, `twin2.png`, `warehouse.png`, `maritime.jpg`, `infra.jpg`, `report.png`, `favicon.ico`

---

*Stack analysis: 2026-02-16*
