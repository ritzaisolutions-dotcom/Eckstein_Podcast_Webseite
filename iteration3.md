# Iteration 3 — Eckstein Podcast (Verfeinerung & n8n)

> Website-Pivot, Klaro, LFC-Playlist, Supabase Privacy, n8n Artikel-Mail.  
> **n8n-Workflow:** JSON unten → in n8n: Workflows → Import from File.

---

## n8n — Konfiguration (du trägst ein)

### 1. Variablen in n8n

| Variable | Beschreibung |
|----------|----------------|
| `N8N_WEBHOOK_SECRET` | Geheimer String; gleicher Wert in GitHub `N8N_WEBHOOK_SECRET` |
| `SITE_URL` | `https://www.eckstein-podcast.de` |
| `SUPABASE_URL` | `https://<project>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service Role (nie im Frontend) |
| `MAIL_FROM_EMAIL` | `hallo@eckstein-podcast.de` |
| SMTP-Credential | n8n Node „SMTP Send“ (Host deines Mail-Providers) |

### 2. Supabase SQL

Führe `n8n/sql/privacy-schema.sql` aus (wird beim Repo-Commit unter `n8n/sql/` liegen) — oder kopiere aus Plan. Tabellen: `email_consents`, `email_campaign_log`, `cookie_consent_logs`.

### 3. Workflow importieren

Datei: **`n8n/fundament-article-release.workflow.json`** (siehe Abschnitt unten — nach Agent-Umsetzung auch als Datei im Repo).

1. n8n → **Import workflow**
2. Variablen setzen
3. Workflow **aktivieren**
4. Webhook-Node öffnen → **Production URL** kopieren → GitHub Secret `N8N_WEBHOOK_URL`

### 4. GitHub Secrets

| Secret | Wert |
|--------|------|
| `N8N_WEBHOOK_URL` | Production-Webhook-URL aus n8n |
| `N8N_WEBHOOK_SECRET` | wie Variable oben |

Workflow `.github/workflows/notify-fundament.yml` feuert bei Push auf `fundament/*.html` (ohne `index.html`).

### 5. Manueller Test

```bash
curl -X POST "DEINE_N8N_PRODUCTION_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: DEIN_SECRET" \
  -d '{"slug":"kommen-reiche-in-den-himmel","df":2,"title":"Kommen Reiche wirklich nicht in den Himmel?","teaser":"Neuer Fundament-Artikel — nur auf eckstein-podcast.de."}'
```

Erwartung: Mails nur an `email_consents` mit `purpose=fundament_newsletter` und `status=confirmed`. Zweiter Aufruf mit gleichem `slug` → **kein** erneuter Versand (campaign_log).

---

## LFC-Playlist (fix)

| | |
|--|--|
| URL | https://www.youtube.com/playlist?list=PLx_pldXvpOEuPuQ2VFNcbyy14MmXhPtUw |
| Env | `YOUTUBE_LFC_PLAYLIST_ID=PLx_pldXvpOEuPuQ2VFNcbyy14MmXhPtUw` |

---

## n8n Workflow JSON

Speichere den Block als `n8n/fundament-article-release.workflow.json` und importiere in n8n.

```json
{
  "name": "Eckstein — Fundament Artikel Release",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "fundament-article-release",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "a1b2c3d4-webhook-0001",
      "name": "Webhook Release",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [0, 300],
      "webhookId": "eckstein-fundament-release"
    },
    {
      "parameters": {
        "jsCode": "const item = $input.first().json;\nconst secret = $env.N8N_WEBHOOK_SECRET;\nconst headers = item.headers || {};\nconst headerSecret = headers['x-webhook-secret'] || headers['X-Webhook-Secret'];\nif (!secret || headerSecret !== secret) {\n  return [{ json: { ok: false, error: 'unauthorized', statusCode: 401 } }];\n}\nconst body = item.body || item;\nconst slug = body.slug || body.article_slug;\nconst df = Number(body.df ?? body.df_number ?? 0);\nconst title = (body.title || '').trim();\nif (!slug || !df || !title) {\n  return [{ json: { ok: false, error: 'missing_slug_df_title', statusCode: 400 } }];\n}\nconst site = ($env.SITE_URL || 'https://www.eckstein-podcast.de').replace(/\\/$/, '');\nconst teaser = body.teaser || 'Ein neuer Fundament-Artikel ist online — exklusiv auf eckstein-podcast.de.';\nreturn [{\n  json: {\n    ok: true,\n    slug,\n    df,\n    title,\n    teaser,\n    article_url: `${site}/fundament/${slug}.html`,\n    pdf_url: `${site}/fundament/downloads/df${df}.pdf`,\n    subject: `Das Fundament · DF${df}: ${title}`,\n    site\n  }\n}];"
      },
      "id": "a1b2c3d4-code-0002",
      "name": "Validate Payload",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [220, 300]
    },
    {
      "parameters": {
        "conditions": {
          "options": { "caseSensitive": true, "leftValue": "", "typeValidation": "strict" },
          "conditions": [
            {
              "id": "cond-ok",
              "leftValue": "={{ $json.ok }}",
              "rightValue": true,
              "operator": { "type": "boolean", "operation": "equals" }
            }
          ],
          "combinator": "and"
        }
      },
      "id": "a1b2c3d4-if-0003",
      "name": "IF Valid",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [440, 300]
    },
    {
      "parameters": {
        "method": "GET",
        "url": "={{ $env.SUPABASE_URL }}/rest/v1/email_campaign_log",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            { "name": "article_slug", "value": "=eq.{{ $json.slug }}" },
            { "name": "select", "value": "id" }
          ]
        },
        "options": {}
      },
      "id": "a1b2c3d4-http-0004",
      "name": "Check Already Sent",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [660, 200],
      "notesInFlow": true,
      "notes": "Credential: Header apikey + Authorization Bearer SERVICE_ROLE"
    },
    {
      "parameters": {
        "jsCode": "const meta = $('Validate Payload').first().json;\nconst rows = $input.first().json;\nconst list = Array.isArray(rows) ? rows : [];\nif (list.length > 0) {\n  return [{ json: { ...meta, skip: true, reason: 'already_sent' } }];\n}\nreturn [{ json: { ...meta, skip: false } }];"
      },
      "id": "a1b2c3d4-code-0005",
      "name": "Parse Campaign Check",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [880, 200]
    },
    {
      "parameters": {
        "conditions": {
          "conditions": [
            {
              "id": "cond-skip",
              "leftValue": "={{ $json.skip }}",
              "rightValue": false,
              "operator": { "type": "boolean", "operation": "equals" }
            }
          ]
        }
      },
      "id": "a1b2c3d4-if-0006",
      "name": "IF Not Sent Yet",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [1100, 200]
    },
    {
      "parameters": {
        "method": "GET",
        "url": "={{ $env.SUPABASE_URL }}/rest/v1/email_consents",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            { "name": "purpose", "value": "eq.fundament_newsletter" },
            { "name": "status", "value": "eq.confirmed" },
            { "name": "select", "value": "email,id" }
          ]
        },
        "options": {}
      },
      "id": "a1b2c3d4-http-0007",
      "name": "Load Subscribers",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [1320, 120],
      "notes": "Gleiche Supabase Header-Credential wie Check Already Sent"
    },
    {
      "parameters": {
        "jsCode": "const meta = $('Parse Campaign Check').first().json;\nconst rows = $input.first().json;\nconst subs = Array.isArray(rows) ? rows : [];\nif (subs.length === 0) {\n  return [{ json: { ...meta, empty: true, recipient_count: 0 } }];\n}\nreturn subs.map(s => ({\n  json: {\n    ...meta,\n    empty: false,\n    email: s.email,\n    consent_id: s.id,\n    unsubscribe_url: `${meta.site}/api/unsubscribe?id=${s.id}`\n  }\n}));"
      },
      "id": "a1b2c3d4-code-0008",
      "name": "Build Recipient Items",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1540, 120]
    },
    {
      "parameters": {
        "conditions": {
          "conditions": [
            {
              "id": "cond-empty",
              "leftValue": "={{ $json.empty }}",
              "rightValue": true,
              "operator": { "type": "boolean", "operation": "notEquals" }
            }
          ]
        }
      },
      "id": "a1b2c3d4-if-0009",
      "name": "IF Has Recipients",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [1760, 120]
    },
    {
      "parameters": {
        "batchSize": 25,
        "options": {}
      },
      "id": "a1b2c3d4-batch-0010",
      "name": "Split In Batches",
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "position": [1980, 40]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.resend.com/emails",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            { "name": "Authorization", "value": "=Bearer {{ $env.RESEND_API_KEY }}" }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"from\": \"{{ $env.MAIL_FROM }}\",\n  \"to\": [\"{{ $json.email }}\"],\n  \"subject\": \"{{ $json.subject }}\",\n  \"html\": \"<p>{{ $json.teaser }}</p><p><strong>{{ $json.title }}</strong></p><p><a href=\\\"{{ $json.article_url }}\\\">Artikel lesen</a> · <a href=\\\"{{ $json.pdf_url }}\\\">PDF</a></p><p style=\\\"font-size:12px;color:#666\\\"><a href=\\\"{{ $json.unsubscribe_url }}\\\">Abmelden</a></p>\"\n}",
        "options": {}
      },
      "id": "a1b2c3d4-http-0011",
      "name": "Resend Send",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [2200, 40]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $env.SUPABASE_URL }}/rest/v1/email_campaign_log",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            { "name": "apikey", "value": "={{ $env.SUPABASE_SERVICE_ROLE_KEY }}" },
            { "name": "Authorization", "value": "=Bearer {{ $env.SUPABASE_SERVICE_ROLE_KEY }}" },
            { "name": "Content-Type", "value": "application/json" },
            { "name": "Prefer", "value": "return=minimal" }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"article_slug\": \"{{ $('Parse Campaign Check').first().json.slug }}\",\n  \"df_number\": {{ $('Parse Campaign Check').first().json.df }},\n  \"title\": {{ JSON.stringify($('Parse Campaign Check').first().json.title) }},\n  \"recipient_count\": {{ $('Build Recipient Items').all().length }},\n  \"workflow_run_id\": \"{{ $execution.id }}\"\n}",
        "options": {}
      },
      "id": "a1b2c3d4-http-0012",
      "name": "Log Campaign",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [2200, 240]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { ok: true, sent: true, slug: $('Parse Campaign Check').first().json.slug, recipients: $('Build Recipient Items').all().length } }}",
        "options": { "responseCode": 200 }
      },
      "id": "a1b2c3d4-respond-0013",
      "name": "Respond OK Sent",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "position": [2420, 120]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { ok: true, skipped: true, reason: $json.reason || 'already_sent' } }}",
        "options": { "responseCode": 200 }
      },
      "id": "a1b2c3d4-respond-0014",
      "name": "Respond OK Skip",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "position": [1320, 320]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { ok: true, sent: false, reason: 'no_confirmed_subscribers' } }}",
        "options": { "responseCode": 200 }
      },
      "id": "a1b2c3d4-respond-0015",
      "name": "Respond OK Empty",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "position": [1980, 240]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { ok: false, error: $json.error } }}",
        "options": { "responseCode": "={{ $json.statusCode || 400 }}" }
      },
      "id": "a1b2c3d4-respond-0016",
      "name": "Respond Error",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "position": [660, 420]
    }
  ],
  "connections": {
    "Webhook Release": { "main": [[{ "node": "Validate Payload", "type": "main", "index": 0 }]] },
    "Validate Payload": { "main": [[{ "node": "IF Valid", "type": "main", "index": 0 }]] },
    "IF Valid": {
      "main": [
        [{ "node": "Check Already Sent", "type": "main", "index": 0 }],
        [{ "node": "Respond Error", "type": "main", "index": 0 }]
      ]
    },
    "Check Already Sent": { "main": [[{ "node": "Parse Campaign Check", "type": "main", "index": 0 }]] },
    "Parse Campaign Check": { "main": [[{ "node": "IF Not Sent Yet", "type": "main", "index": 0 }]] },
    "IF Not Sent Yet": {
      "main": [
        [{ "node": "Load Subscribers", "type": "main", "index": 0 }],
        [{ "node": "Respond OK Skip", "type": "main", "index": 0 }]
      ]
    },
    "Load Subscribers": { "main": [[{ "node": "Build Recipient Items", "type": "main", "index": 0 }]] },
    "Build Recipient Items": { "main": [[{ "node": "IF Has Recipients", "type": "main", "index": 0 }]] },
    "IF Has Recipients": {
      "main": [
        [{ "node": "Split In Batches", "type": "main", "index": 0 }],
        [{ "node": "Respond OK Empty", "type": "main", "index": 0 }]
      ]
    },
    "Split In Batches": {
      "main": [
        [{ "node": "Resend Send", "type": "main", "index": 0 }],
        [{ "node": "Log Campaign", "type": "main", "index": 0 }]
      ]
    },
    "Resend Send": { "main": [[{ "node": "Split In Batches", "type": "main", "index": 0 }]] },
    "Log Campaign": { "main": [[{ "node": "Respond OK Sent", "type": "main", "index": 0 }]] }
  },
  "active": false,
  "settings": { "executionOrder": "v1" },
  "meta": { "templateCredsSetupCompleted": false },
  "tags": []
}
```

### Nach Import in n8n

1. Nodes **Check Already Sent** und **Load Subscribers**: Credential **Header Auth** anlegen:
   - `apikey` = Service Role Key
   - `Authorization` = `Bearer <SERVICE_ROLE_KEY>`
   Oder Header manuell in jedem HTTP-Node wie bei **Log Campaign**.
2. **Split In Batches** → zweiter Ausgang geht zu **Log Campaign** (nach letztem Batch).
3. Workflow testen (inactive → Execute mit Test-Webhook), dann **aktivieren**.

---

## Optional: Kirchen-Galerie (Inspiration)

**Idee:** Kleine Subpage mit Fotos von Kirchen, die Kevin & Florian besucht haben — Name + Ort unter jedem Bild. Stimmung/Inspiration, kein Reiseführer.

### Einschätzung

| Pro | Hinweis |
|-----|---------|
| Passt zur neuen Positionierung | Tradition, Ehrfurcht, „Fundament“ ohne Predigt-Ton |
| Persönlich & authentisch | Zeigt, dass Glaube **Orte** hat — nicht nur Podcast |
| Passt zum Design | Navy/Gold, ruhiges Grid, Cinzel für Ortszeile |
| Geringer Aufwand | Statisches HTML wie der Rest, kein CMS nötig |

| Achtung | Lösung |
|--------|--------|
| Lenkt nicht vom Kern ab | **Nicht** im Hero — Link von Gemeinde oder Footer „Inspiration“ |
| Bildrechte | Nur **eigene** Fotos (oder explizite Erlaubnis) |
| Performance | WebP, `loading="lazy"`, sinnvolle Breite (z. B. max 1200px) |
| Ton | „Orte die uns geprägt haben“ — nicht „Top 10 Kirchen“ |

### Vorschlag Struktur

```
inspiration/
  index.html          # Galerie-Grid
img/inspiration/
  st-maria-koblenz.webp
  ...
```

**Seitenaufbau:**
- Kurzer Intro-Absatz (2–3 Sätze): warum ihr diese Orte zeigt
- CSS Grid: 1 Spalte Mobile, 2–3 Desktop
- Pro Karte: Bild → `figcaption` mit **Name** (Cinzel) + **Ort** (Cormorant/EB Garamond, cream-dim)
- Optional klein: „Kevin & Florian, 2026“ nur wenn ihr wollt — nicht Pflicht

**Navigation:** Sticky/Footer-Link „Inspiration“ oder Unterpunkt auf [gemeinschaft/index.html](gemeinschaft/index.html): „Kirchen die uns geprägt haben →“

**SEO:** `sitemap.xml` + `og:image` erstes Kirchenbild; Title z. B. `Inspiration — Orte des Glaubens · Eckstein Podcast`

**Reihenfolge:** Nach Iteration 3 Kern (Fundament, Pivot) — **Iteration 3b** oder erster Community-Content nach Launch.

**Datenformat (einfach, für euch pflegbar):** HTML-Kommentar oder JSON-Snippet im Repo:

```html
<!-- church: St. Kastor, Koblenz | img: img/inspiration/kastor-koblenz.webp -->
```

Später optional: gleiche Daten in kleiner `inspiration/churches.json` wenn >10 Einträge.

---

## Offene URLs (eintragen)

| | URL |
|--|-----|
| Spotify LFC | https://open.spotify.com/show/7ukegsEnslel1gM0r5hubP |
| Instagram SF | https://www.instagram.com/eckstein_podcast/ |
| TikTok SF | https://www.tiktok.com/@Eckstein_Podcast |
| n8n Webhook | https://n8n.ritz-ai.solutions/webhook/fundament-article-release |
| Supabase Privacy URL | Project Settings → API → **Project URL** |

---

*Vollständiger Website-Plan: `.cursor/plans/iteration3_website_pivot_b1c92f58.plan.md`*
