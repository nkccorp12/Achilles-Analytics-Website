# Deployment — Achilles Analytics Landing Page

## Server
- **IP:** 82.165.45.74
- **Port 80** (nginx) — Landing Page
- **SSH Key:** `~/Desktop/sync/id_ed25519`
- **User:** root

## Deploy (from local machine)

```bash
# 1. Upload source (excludes node_modules, .git, dist)
rsync -avz --exclude='node_modules' --exclude='.git' --exclude='dist' \
  -e "ssh -i ~/Desktop/sync/id_ed25519" \
  /media/nkccorp/9AF48656F48635131/Projects/frontend_Draft/ \
  root@82.165.45.74:/opt/achilles-analytics/landing_page/frontend-draft-build/

# 2. Build on server (Node 20 required, local Node 18 is too old for Vite 7)
ssh -i ~/Desktop/sync/id_ed25519 root@82.165.45.74 \
  "cd /opt/achilles-analytics/landing_page/frontend-draft-build && \
   npm install && npm run build"

# 3. Deploy dist to nginx path
ssh -i ~/Desktop/sync/id_ed25519 root@82.165.45.74 \
  "rm -rf /opt/achilles-analytics/landing_page/hanchain-crypto-connect-main/dist/* && \
   cp -r /opt/achilles-analytics/landing_page/frontend-draft-build/dist/* \
   /opt/achilles-analytics/landing_page/hanchain-crypto-connect-main/dist/"

# 4. Cleanup build dir
ssh -i ~/Desktop/sync/id_ed25519 root@82.165.45.74 \
  "rm -rf /opt/achilles-analytics/landing_page/frontend-draft-build"
```

## One-liner

```bash
rsync -avz --exclude='node_modules' --exclude='.git' --exclude='dist' -e "ssh -i ~/Desktop/sync/id_ed25519" /media/nkccorp/9AF48656F48635131/Projects/frontend_Draft/ root@82.165.45.74:/opt/achilles-analytics/landing_page/frontend-draft-build/ && ssh -i ~/Desktop/sync/id_ed25519 root@82.165.45.74 "cd /opt/achilles-analytics/landing_page/frontend-draft-build && npm install --silent && npm run build && rm -rf /opt/achilles-analytics/landing_page/hanchain-crypto-connect-main/dist/* && cp -r dist/* /opt/achilles-analytics/landing_page/hanchain-crypto-connect-main/dist/ && rm -rf /opt/achilles-analytics/landing_page/frontend-draft-build && echo 'DEPLOYED'"
```

## Wichtig

- **Nicht direkt lokal bauen** — Node 18 lokal, Vite 7 braucht Node 20+
- **Nginx-Config liegt in:** `/etc/nginx/sites-enabled/achilles-analytics`
- **Nginx-Config muss nicht geaendert werden** — zeigt auf `hanchain-crypto-connect-main/dist/`
- **Backup der alten Version:** `dist.backup.YYYYMMDD` im selben Verzeichnis
- **Andere Services laufen auf dem Server** — PM2, Docker, Port 8090 (LLM Council), Port 8100 (V1 Platform) — nicht anfassen

## Ports (belegt)

| Port | Service |
|------|---------|
| 80 | nginx — Landing Page |
| 8090 | nginx — LLM Council |
| 8100 | Docker — Achilles V1 Platform |
| 8000-8005 | Python backends |
| 5174-5179 | Vite dev servers |
| 5432 | PostgreSQL |
| 6379 | Redis |
| 5678 | n8n |
