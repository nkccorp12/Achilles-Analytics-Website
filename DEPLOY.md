# Deployment — Achilles Analytics Landing Page

## Server (HostPapa VPS)
- **Domain:** https://achillesanalytics.ca
- **IP:** 66.102.141.221
- **OS:** Ubuntu 22.04
- **User:** root (SSH-Key only, kein Passwort)
- **SSH Key:** `~/.ssh/id_ed25519`
- **Node:** v20.20.0
- **Nginx:** Port 80 (redirect) + 443 (SSL)
- **SSL:** Cloudflare Origin Certificate (`/etc/ssl/cloudflare/`)
- **Cloudflare:** Full (strict), Nameserver nero/sky.ns.cloudflare.com
- **Web Root:** `/var/www/html/`

## Deploy (from local machine)

```bash
# 1. Upload source (excludes node_modules, .git, dist)
rsync -avz --exclude='node_modules' --exclude='.git' --exclude='dist' \
  /media/nkccorp/9AF48656F48635133/Projects/frontend_Draft/ \
  root@66.102.141.221:/tmp/frontend-build/

# 2. Build on server (Node 20 required, local Node 18 is too old for Vite 7)
ssh root@66.102.141.221 \
  "cd /tmp/frontend-build && npm install --silent && npm run build"

# 3. Deploy dist to nginx web root
ssh root@66.102.141.221 \
  "rm -rf /var/www/html/* && \
   cp -r /tmp/frontend-build/dist/* /var/www/html/"

# 4. Cleanup build dir
ssh root@66.102.141.221 "rm -rf /tmp/frontend-build"
```

## One-liner

```bash
rsync -avz --exclude='node_modules' --exclude='.git' --exclude='dist' /media/nkccorp/9AF48656F48635133/Projects/frontend_Draft/ root@66.102.141.221:/tmp/frontend-build/ && ssh root@66.102.141.221 "cd /tmp/frontend-build && npm install --silent && npm run build && rm -rf /var/www/html/* && cp -r dist/* /var/www/html/ && rm -rf /tmp/frontend-build && echo 'DEPLOYED'"
```

## Wichtig

- **Nicht direkt lokal bauen** — Node 18 lokal, Vite 7 braucht Node 20+
- **Nginx-Config:** `/etc/nginx/sites-available/default`
- **SSL-Zertifikate:** `/etc/ssl/cloudflare/cert.pem` + `key.pem` (gueltig bis 2041)
- **NeuPage ist Startseite** — App.jsx rendert NeuPage direkt auf `/`

## Security

- **SSH:** Key-only, kein Passwort-Login, MaxAuthTries 3
- **Firewall (UFW):** aktiv, nur Port 22/80/443 offen
- **Fail2Ban:** aktiv, sperrt IPs nach 5 Fehlversuchen (1h Ban, Recidive 24h)
- **Nginx Headers:** X-Frame-Options DENY, X-Content-Type-Options nosniff, X-XSS-Protection, Referrer-Policy, server_tokens off
- **Cloudflare:** DDoS-Schutz, CDN, SSL Full (strict)

## Ports (belegt)

| Port | Service |
|------|---------|
| 22 | SSH (Key-only) |
| 80 | nginx — HTTP redirect zu HTTPS |
| 443 | nginx — HTTPS (Cloudflare Origin Cert) |

## Alter Server (IONOS) — Referenz

- **IP:** 82.165.45.74
- **Domain:** achillesanalytics.ai (Strato DNS)
- **Services:** PM2, Docker, LLM Council (8090), V1 Platform (8100), Python backends, PostgreSQL, Redis, n8n
