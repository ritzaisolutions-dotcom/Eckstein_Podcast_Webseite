# Eckstein Podcast — Project Context for Claude Code

## Wer wir sind

**Eckstein Podcast** — gegründet von Kevin Ritz & Florian Spieß.

Kein christlicher Podcast. Ein Podcast von zwei Männern die ihren Glauben leben — in der Karriere, im Sport, in Beziehungen, in der Krise. Der Glaube ist nicht das Thema. Der Glaube ist das Fundament unter jedem Thema.

**Positionierung (Iteration 3):**
- Gemeinde junger Christen — traditioneller Glaube, Tugend, Respekt, Verpflichtung, Dankbarkeit, Disziplin.
- Für ambitionierte Menschen die mehr wollen und ihren Glauben leben.
- Offene Gespräche über Glaube, Männlichkeit, Selbstverbesserung, Geopolitik, Selbstständigkeit, Dankbarkeit, Angst.
- **Das Fundament** (Blog) ist **exklusiv** auf eckstein-podcast.de — wöchentliche Artikel + PDFs.

**Hosts:**
- Kevin Ritz (Co-Founder)
- Florian Spieß (Co-Founder)

---

## Plattformen

| Format | Plattform | URL |
|--------|-----------|-----|
| **LFC** (Langform) | YouTube Playlist | [LFC-Playlist](https://www.youtube.com/playlist?list=PLx_pldXvpOEuPuQ2VFNcbyy14MmXhPtUw) |
| **LFC** | Spotify | [Eckstein Podcast Show](https://open.spotify.com/show/7ukegsEnslel1gM0r5hubP) |
| **SF** (Shortform) | YouTube | [@Eckstein_Pod](https://www.youtube.com/@Eckstein_Pod) |
| **SF** | Instagram | [@eckstein_podcast](https://www.instagram.com/eckstein_podcast/) |
| **SF** | TikTok | [@Eckstein_Podcast](https://www.tiktok.com/@Eckstein_Podcast) |

> **Kein Rumble. Kein X (Podcast-Kanal).** LFC nur YouTube + Spotify. SF nur YouTube, Instagram, TikTok — keine Embeds auf der Website. Hero-CTAs: Fundament zuerst, dann Gemeinde, dann Formate.

---

## Tech Stack

| Layer        | Tool                        |
|--------------|-----------------------------|
| Hosting      | Vercel (Produktion)         |
| Deploy       | `git push` → Vercel Auto-Deploy |
| Optional     | Antigravity (kostenlose Quota) |
| AI Dev       | Claude Code / Cursor        |

**Produktions-Domain:** `https://www.eckstein-podcast.de` (apex `eckstein-podcast.de` → www)

---

## Design System

### Farben (CSS Variables)
```css
--navy:       #05101f;   /* Hintergrund Haupt */
--navy-2:     #081525;   /* Hintergrund Mid */
--navy-3:     #0c1e35;   /* Hintergrund Akzent */
--gold:       #c9a84c;   /* Gold Primär */
--gold-light: #e2c06a;   /* Gold Hell */
--gold-pale:  #f0dca0;   /* Gold Blass */
--cream:      #f5eed8;   /* Text Primär */
--cream-dim:  rgba(245,238,216,0.55); /* Text Sekundär */
```

### Typografie
```
Display / Headlines : Cinzel (Google Fonts) — serif, monumental
Subheadlines        : Cormorant Garamond — elegant, italic-fähig
Body / Fließtext    : EB Garamond — lesbar, warm
```

### Ton / Voice
- Direkt. Klar. Keine Weichspüler.
- Deutsch als Hauptsprache.
- Kein Prediger-Ton, kein christlicher Jargon.
- Manifest-Stil: kurze, starke Sätze.

### Visuelles Vorbild
Das Logo: schwarzer Obelisk, Goldstrahlen, Navy-Hintergrund. Alles leitet sich davon ab.

---

## Dateistruktur

```
Webseite/
├── landingpage.html              # Hauptseite (Vercel: /)
├── api/
│   ├── youtube-latest-lfc.js     # LFC-Playlist RSS → neuestes Video
│   └── log-consent.js            # Klaro-Consent → Supabase
├── js/
│   ├── eckstein-klaro.js
│   ├── eckstein-privacy.js
│   ├── eckstein-lfc-player.js
│   └── site-config.example.js    # → site-config.js (gitignored)
├── fundament/
│   ├── index.html                # Hub + Dropdown + PDF-Links
│   ├── downloads/                # df1.pdf, df2.pdf
│   ├── der-sinn-des-lebens.html
│   └── kommen-reiche-in-den-himmel.html
├── gemeinschaft/
│   └── index.html                # Warteliste → email_consents
├── inspiration/
│   ├── index.html                # Kirchen-Galerie
│   └── churches.json             # Name, Ort, Bild, featured
├── css/site.css                    # Tokens, Nav/Footer (Subpages)
├── img/inspiration/              # WebP aus inspirations/ (deploy)
├── inspirations/                 # Quell-JPGs (gitignored)
├── BRAND.md                      # Messaging, verbotene Wiederholungen
├── n8n/                          # Artikel-Mail-Workflow + SQL
├── img/
├── vercel.json
├── sitemap.xml, robots.txt
├── iteration3.md                 # Pivot + n8n-Doku
├── CLAUDE.md
└── antigravity.md
```

**Nicht deployen:** `CLAUDE.md`, `antigravity.md`, lokale Entwürfe.

---

## Launch-Status

- **Folge 01 live seit:** 18. Mai 2026, 18:00 (Countdown-JS: `2026-05-18T18:00:00` in `landingpage.html`)
- Nach Ablauf: Episoden-Plattform-Links sichtbar, Countdown ausgeblendet
- Neues Release: `target`-Datum in JS + Datums-Labels in HTML anpassen

---

## Aktuelle Prioritäten

1. **Inhalt pflegen** — neue Folgen, Fundament-Artikel, Gemeinde-Updates
2. **SEO & Sharing** — Metadaten und Sitemap bei neuen Seiten mitziehen
3. **Rechtliches** — Impressum/Datenschutz bei neuen Diensten (Analytics, Newsletter) anpassen
4. **Supabase** — Vercel Env + `js/site-config.js` (siehe unten in Sessions)
5. **E-Mail / n8n** — verschoben → [`backlog.md`](backlog.md)

**Erledigt:** Launch-Landing live, Impressum-Adresse (Koblenz), Domain-Metadaten.

---

## Was wir NICHT wollen

- Kein Rumble/X als Podcast-Kanal; LFC und SF getrennt kommunizieren
- Kein generisches AI-Design (kein Inter, kein lila Gradient)
- Keine Predigten, kein christlicher Jargon im Copy
- Keine Schuldgefühle-Rhetorik
- Kein Over-Engineering — statisches HTML, kein Build-Step ohne expliziten Auftrag

---

## Kontakt

```
Öffentlich:  hallo@eckstein-podcast.de  (Footer, mailto)
Impressum:   hallo@eckstein-podcast.de  (gleiche Adresse wie Footer)
Instagram:   @eckstein_podcast (SF)
```

---

## Für Claude Code Sessions

Wenn du an diesem Projekt arbeitest:

1. **Designentscheidungen immer gegen das Design System prüfen** — Gold/Navy/Cream, keine anderen Farben einführen ohne Grund.
2. **Formate trennen** — LFC (YT+Spotify), SF (YT+IG+TikTok); Fundament-CTAs vor Plattform-Links.
3. **Copy-Ton checken** — direkt, kein Bullshit, kein Prediger-Ton.
4. **Mobile-first** — die Seite muss auf dem Handy genauso stark sein.
5. **Kein Build-Step** — Änderungen in den HTML-Dateien; `vercel.json` nur bei Routing-Bedarf.
6. **Neuer Fundament-Artikel:** Datei unter `fundament/`, Eintrag in `fundament/index.html`, Teaser auf `landingpage.html` (Fundament-Sektion + Hero-CTA).
7. **Neue Inspirations-Fotos:** JPG nach `inspirations/`, `python scripts/build-inspiration-images.py`, Eintrag in `inspiration/churches.json`. Copy-Regeln: `BRAND.md`.
