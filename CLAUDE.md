# Eckstein Podcast — Project Context for Claude Code

## Wer wir sind

**Eckstein Podcast** — gegründet von Kevin Ritz & Maximilian Eckstein.

Kein christlicher Podcast. Ein Podcast von zwei Männern die ihren Glauben leben — in der Karriere, im Sport, in Beziehungen, in der Krise. Der Glaube ist nicht das Thema. Der Glaube ist das Fundament unter jedem Thema.

**Positionierung:**
- Kein Bibelkurs. Keine Predigten. Keine Schuldgefühle.
- Für ambitionierte Menschen die mehr wollen — und dafür beschämt werden.
- Offene Gespräche über Karriere, Männlichkeit, Geld, Geopolitik, Dankbarkeit, Angst.

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

> **Kein Spotify. Kein Apple Podcasts.** Alle drei Plattformen sind gleichwertig — keine hervorheben.

---

## Tech Stack

| Layer        | Tool                        |
|--------------|-----------------------------|
| Hosting      | Antigravity (kostenlose Quota) |
| Deploy       | Vercel                      |
| Future CI/CD | GitHub → Vercel auto-deploy |
| AI Dev       | Claude Code                 |

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
eckstein/
├── index.html          # Visitenkarte / über uns
├── landingpage.html    # Launch-Landingpage mit Countdown
├── CLAUDE.md           # Diese Datei
└── antigravity.md      # Deployment-Anleitung
```

---

## Aktuelle Prioritäten

1. Landingpage live deployen vor Samstag (erste Folge)
2. Countdown läuft auf Samstag 08:00 — Datum in JS prüfen
3. Impressum mit echter Adresse vervollständigen
4. Später: E-Mail-Liste aufbauen (Beehiiv empfohlen)

---

## Was wir NICHT wollen

- Keine Plattform vor der anderen hervorheben (YouTube ≠ Primary)
- Kein generisches AI-Design (kein Inter, kein lila Gradient)
- Keine Predigten, kein christlicher Jargon im Copy
- Keine Schuldgefühle-Rhetorik
- Kein Over-Engineering — wir fangen schlank an

---

## Kontakt (Platzhalter — bitte ausfüllen)

```
E-Mail:    hallo@eckstein-podcast.de  ← bestätigen/ersetzen
Instagram: noch nicht aktiv
```

---

## Für Claude Code Sessions

Wenn du an diesem Projekt arbeitest:

1. **Designentscheidungen immer gegen das Design System prüfen** — Gold/Navy/Cream, keine anderen Farben einführen ohne Grund.
2. **Alle drei Plattformen gleich behandeln** — nie eine hervorheben.
3. **Copy-Ton checken** — direkt, kein Bullshit, kein Prediger-Ton.
4. **Mobile-first** — die Seite muss auf dem Handy genauso stark sein.
5. **Eine Datei deploybar halten** — kein Build-Step ohne expliziten Auftrag.
