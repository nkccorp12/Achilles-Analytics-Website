# Achilles Analytics — Website

Public-facing website for [Achilles Analytics](https://achillesanalytics.ca) — OSINT-powered geopolitical foresight platform.

## Tech Stack

- **React 19** + **Vite 7**
- **Three.js** — 3D rotating globe with real-time alert markers
- **GSAP** — Card animations, mobile node visualizations
- **D3-Geo** — Globe projection and graticule rendering
- **Plain CSS** — No framework, fluid responsive with `clamp()` and CSS custom properties

## Architecture

```
src/
  pages/          # LandingPage, CoreEngine, UseCases, IntelStack, AICouncil
  components/     # CardSwap, LaserFlow, RotatingEarth, UseCaseModal
  variants/       # VariantGrid (shared section layouts)
public/           # Static assets, pre-computed globe data
```

### Key Features

- **Widescreen responsive** — Content constrained to 1320px max-width, full-bleed backgrounds
- **CoreEngine visualization** — Desktop: Canvas network graph (Signal → Narrative → Influence → Risk pipeline). Mobile: GSAP-animated div nodes with card collapse animation and typewriter narration
- **Pre-computed globe dots** — Globe renders instantly (no runtime point-in-polygon computation)
- **Code-split** — Three.js, GSAP, D3 in separate chunks; pages lazy-loaded

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build to dist/
```

Requires **Node 20.19+** (Vite 7 requirement).

## Deployment

See [DEPLOY.md](DEPLOY.md) for production deployment instructions (HostPapa VPS + Nginx + Cloudflare).

## License

Proprietary. All rights reserved.
