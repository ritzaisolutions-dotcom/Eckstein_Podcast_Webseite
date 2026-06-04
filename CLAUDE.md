# Eckstein Podcast — Project Context for Claude Code

## Wer wir sind

**Eckstein Podcast** — gegründet von Kevin Ritz & Florian Spieß.

Kein christlicher Podcast. Ein Podcast von zwei Männern die ihren Glauben leben — in der Karriere, im Sport, in Beziehungen, in der Krise. Der Glaube ist nicht das Thema. Der Glaube ist das Fundament unter jedem Thema.

**Positionierung:**
- Kein Bibelkurs. Keine Predigten. Keine Schuldgefühle.
- Für ambitionierte Menschen die mehr wollen — und dafür beschämt werden.
- Offene Gespräche über Glaube, Männlichkeit, Selbstverbesserung, Geopolitik, Selbstständingkeit, Dankbarkeit, Angst.

**Hosts:**
- Kevin Ritz (Co-Founder)
- Florian Spieß (Co-Founder)

---

## Plattformen

| Plattform | Handle / URL |
|-----------|-------------|
| YouTube   | [@Eckstein_Pod](https://www.youtube.com/@Eckstein_Pod) |
| X         | [@Eckstein_Pod](https://x.com/Eckstein_Pod) |
| Rumble    | [Eckstein_Podcast](https://rumble.com/user/Eckstein_Podcast) |

> **Kein Spotify. Kein Apple Podcasts.** Alle drei Plattformen sind gleichwertig — in Hero, Episoden und CTAs immer alle drei zeigen, keine hervorheben.

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
├── fundament/
│   ├── index.html                # Blog-Hub „Das Fundament“
│   └── der-sinn-des-lebens.html  # Artikel DF1
├── gemeinschaft/
│   └── index.html                # Gemeinde-Seite
├── img/                          # Logo, Host-Fotos, Assets
├── vercel.json                   # Routing (/ → landingpage.html)
├── sitemap.xml, robots.txt
├── CLAUDE.md                     # Diese Datei
└── antigravity.md                # Deployment-Anleitung
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
4. **Später:** E-Mail-Liste (Beehiiv empfohlen)

**Erledigt:** Launch-Landing live, Impressum-Adresse (Koblenz), Domain-Metadaten.

---

## Was wir NICHT wollen

- Keine Plattform vor der anderen hervorheben (YouTube ≠ Primary)
- Kein generisches AI-Design (kein Inter, kein lila Gradient)
- Keine Predigten, kein christlicher Jargon im Copy
- Keine Schuldgefühle-Rhetorik
- Kein Over-Engineering — statisches HTML, kein Build-Step ohne expliziten Auftrag

---

## Kontakt

```
Öffentlich:  hallo@eckstein-podcast.de  (Footer, mailto)
Impressum:   hallo@eckstein-podcast.de  (gleiche Adresse wie Footer)
Instagram:   noch nicht aktiv
```

---

## Für Claude Code Sessions

Wenn du an diesem Projekt arbeitest:

1. **Designentscheidungen immer gegen das Design System prüfen** — Gold/Navy/Cream, keine anderen Farben einführen ohne Grund.
2. **Alle drei Plattformen gleich behandeln** — Hero, Episoden und CTAs: YouTube, Rumble, X.
3. **Copy-Ton checken** — direkt, kein Bullshit, kein Prediger-Ton.
4. **Mobile-first** — die Seite muss auf dem Handy genauso stark sein.
5. **Kein Build-Step** — Änderungen in den HTML-Dateien; `vercel.json` nur bei Routing-Bedarf.
6. **Neuer Fundament-Artikel:** Datei unter `fundament/`, Eintrag in `fundament/index.html`, optional Teaser auf `landingpage.html`.
