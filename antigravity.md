# Eckstein — Antigravity + Vercel Deployment

## Überblick

Wir deployen eine statische HTML-Seite (kein Framework, kein Build-Step) über:
1. **Antigravity** — für kostenlose Hosting-Quota
2. **Vercel** — für automatisches Deployment und Custom Domain

---

## Option A: Direkt über Vercel (empfohlen für den Start)

Das ist der schnellste Weg. Keine Antigravity-Konfiguration nötig.

### Schritt-für-Schritt

```bash
# 1. Git Repo anlegen (falls noch nicht vorhanden)
git init
git add .
git commit -m "feat: initial eckstein landingpage"

# 2. GitHub Repo erstellen und pushen
gh repo create eckstein-podcast --public --source=. --push
# oder manuell auf github.com

# 3. Vercel CLI installieren
npm i -g vercel

# 4. Deployen
vercel

# Vercel fragt nach:
# → Set up and deploy? Y
# → Which scope? → dein Account
# → Link to existing project? N
# → Project name: eckstein-podcast
# → In which directory is your code? ./
# → Override settings? N

# 5. Production deploy
vercel --prod
```

### Vercel Konfiguration (vercel.json)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "landingpage.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/",
      "dest": "/landingpage.html"
    }
  ]
}
```

### Custom Domain (optional)

Im Vercel Dashboard:
- Settings → Domains → Add Domain
- `eckstein-podcast.de` oder `ecksteinpodcast.de` eintragen
- DNS-Records beim Domain-Anbieter setzen (Vercel zeigt die Werte)

---

## Option B: Antigravity als primäres Hosting

### Was Antigravity ist
Antigravity ist ein statisches Hosting mit großzügiger kostenloser Quota — gut für frühe Projekte ohne Traffic-Limits.

### Antigravity Setup Prompt

Kopiere diesen Prompt direkt in Antigravity oder nutze ihn als Basis für die Konfiguration:

```
Project: Eckstein Podcast — Static Landing Page

Deploy a single-file static HTML website with no build step required.

Files:
- landingpage.html → serve at /
- fundament/, gemeinschaft/ → Unterseiten (siehe vercel.json)

Requirements:
- Static hosting, no server-side rendering needed
- Custom domain support: eckstein-podcast.de
- HTTPS enforced
- No redirects needed except / → landingpage.html
- Cache HTML files for 1 hour max (countdown must stay fresh)
- Cache fonts/assets for 30 days

Environment: Production
Framework: None (vanilla HTML/CSS/JS)
Build command: none
Output directory: ./
```

### Antigravity + Vercel kombiniert

```
Antigravity → GitHub Repo → Vercel Auto-Deploy

Workflow:
1. Code ändern lokal
2. git push origin main
3. Vercel deployed automatisch in ~30 Sekunden
4. Antigravity Quota wird für Bandwidth genutzt
```

---

## Dateien die deployed werden

| Datei | Zweck | Priorität |
|-------|-------|-----------|
| `landingpage.html` | Hauptseite (Hero, Episoden, Impressum) | Live |
| `fundament/` | Blog „Das Fundament“ | Live |
| `gemeinschaft/` | Gemeinde-Seite | Live |
| `CLAUDE.md` | Nicht deployen — nur für Dev | — |

---

## Countdown-Datum anpassen

In `landingpage.html` Zeile suchen:
```javascript
const target = new Date('2026-05-18T18:00:00');
```
→ Datum und Uhrzeit auf den nächsten Release-Zeitpunkt setzen (Folge 01: 18. Mai 2026, 18:00).
→ Wenn Countdown abläuft: Countdown ausgeblendet, Plattform-Links in `#ep1-links` sichtbar.

---

## Checkliste vor Go-Live

- [ ] Countdown-Datum korrekt gesetzt
- [ ] YouTube / X / Rumble Links funktionieren (klick-test)
- [ ] Impressum-Adresse ist eine echte Adresse (Pflicht DE)
- [ ] E-Mail `hallo@eckstein-podcast.de` existiert und empfängt
- [ ] Mobile-Test auf echtem Gerät
- [ ] Custom Domain gesetzt (oder Vercel-URL kommuniziert)
- [ ] HTTPS aktiv (Vercel macht das automatisch)
