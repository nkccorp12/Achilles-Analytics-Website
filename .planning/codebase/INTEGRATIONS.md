# External Integrations

**Analysis Date:** 2026-02-16

## APIs & External Services

**Platform Link:**
- Achilles V1 Platform (HTTP)
  - URL: `http://82.165.45.74:8100`
  - What it's used for: Landing page CTAs link to main platform application
  - Hardcoded locations:
    - `src/pages/NeuPage.jsx` - Hero CTA and header links
    - `src/variants/VariantGlass.jsx` - Primary action button
    - `src/variants/VariantGrid.jsx` - Hero CTA button

**Contact Email:**
- Service: mailto handler
  - What it's used for: Contact form submission via email client
  - Email address: `contact@achilles-analytics.com`
  - Implementation: JavaScript `window.location.href` with mailto URL in `src/pages/NeuPage.jsx`
  - Form fields: name, email, message

## Data Storage

**Databases:**
- Not used - this is a static frontend landing page with no backend integration

**File Storage:**
- Local filesystem only
  - Static assets in `public/` directory
  - Images: PNG, JPG, WebP formats
  - Videos: MP4 format
  - No cloud storage integration detected

**Caching:**
- Browser cache only (implicit via HTTP)
- No explicit cache service (Redis not used in this application)

## Authentication & Identity

**Auth Provider:**
- Not applicable - no user authentication on this landing page
- No login/session management implemented
- All content is publicly accessible

## Monitoring & Observability

**Error Tracking:**
- Not detected - no error tracking service configured
- No integration with Sentry, LogRocket, or similar

**Logs:**
- Browser console only (`console` methods not detected in codebase)
- Server logs: nginx access/error logs on 82.165.45.74
- No application-level logging service

## CI/CD & Deployment

**Hosting:**
- Linux server: 82.165.45.74
- Web server: nginx on port 80
- Deployment path: `/opt/achilles-analytics/landing_page/hanchain-crypto-connect-main/dist/`
- SSH user: root with Ed25519 key at `~/Desktop/sync/id_ed25519`

**CI Pipeline:**
- Not automated - manual rsync-based deployment process in `DEPLOY.md`
- Local build steps documented in deployment instructions
- No GitHub Actions, GitLab CI, or other CI service integrated

**Build Process:**
1. `rsync` source code to remote server (excludes node_modules, .git, dist)
2. Remote execution: `npm install && npm run build`
3. Copy built `dist/` output to nginx directory
4. Cleanup temporary build directory

## Environment Configuration

**Required env vars:**
- None - all configuration is hardcoded or static

**Secrets location:**
- SSH private key: `~/Desktop/sync/id_ed25519` (local machine only, not in repo)
- No API keys, tokens, or credentials stored in codebase
- No `.env` file present

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Contact form: Uses `mailto:` scheme (client-side email client opens)
  - No backend webhook or API endpoint for form submission
  - Submission relies on user's email client

## Server Architecture

**Co-located Services (on 82.165.45.74):**
- Port 80: nginx - Landing Page (this application)
- Port 8090: nginx - LLM Council
- Port 8100: Docker - Achilles V1 Platform
- Ports 8000-8005: Python backends
- Port 5174-5179: Vite dev servers
- Port 5432: PostgreSQL
- Port 6379: Redis
- Port 5678: n8n

**Note:** This application only uses port 80 and external HTTP links; it does not directly integrate with other services.

---

*Integration audit: 2026-02-16*
