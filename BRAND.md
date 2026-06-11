# Eckstein — Messaging & Copy

## Leitbotschaft (eine Zeile)

Eckstein ist der Podcast für junge Christen, die Glauben und Anspruch nicht trennen — Langform ohne Filter, Vertiefung im Fundament, bald in der Gemeinde.

## Produkte — je ein Job pro Sektion

| Produkt | Job auf der Website | Primäre CTA |
|---------|---------------------|-------------|
| **Podcast (LFC/SF)** | Hören / folgen | Jetzt reinhören → YouTube + Spotify (LFC gleichwertig) |
| **Das Fundament** | Vertiefen (owned, exklusiv) | Dezenter Lese-Link — kein Gold-CTA neben Podcast |
| **Gemeinde** | Warteliste | `gemeinschaft/` |
| **Inspiration** | Vertrauen / Stimmung | Galerie `inspiration/` (Nav + Footer, nicht Landing-Scroll) |

## Landing-Funnel (Reihenfolge)

1. Hero — Zielgruppe + Versprechen, CTA „Jetzt reinhören“  
2. Problem — Empathie, kein zweites Manifest  
3. Podcast — Differenzierung (LFC-Tiefe, SF kurz)  
4. Hosts — Glaubwürdigkeit, kurz  
5. Episode-Preview — Thumbnail + externe Links, kein Embed  
6. Plattformen — sekundär  
7. Fundament — „Geh tiefer“, Outline-CTA  
8. Gemeinde — Warteliste  
9. Final CTA — YouTube + Spotify  

## Verbotene Wiederholungen (max. 1× gesamte Site)

- „Kein Podest. Kein Publikum.“ — nur wenn unbedingt, dann **nur** Gemeinde-Kontext  
- „Ein Gedanke. Wöchentlich.“ — nur Fundament-Hub, nicht Landing-Teaser  
- „Jedes Gespräch. Ein Fundament.“ — entfernt  
- „Ja,“-Manifest-Raster — ersetzt durch Problem/Podcast-Copy  
- Gleiche Gemeinde-Copy auf Landing **und** `gemeinschaft/` — unterschiedliche Tiefe  

## CTA-Hierarchie

1. Hero + Final CTA: **Hören** (YouTube + Spotify gleichwertig)  
2. Episode-Preview: dieselben Plattform-Links  
3. Fundament: Text/Outline-Link — nicht konkurrierend mit Podcast  
4. Gemeinde: ein Gold-CTA Warteliste unten im Funnel  

## Das Fundament (Stand: 3 Artikel)

| DF | Quelle | HTML |
|----|--------|------|
| DF1 | — | `fundament/der-sinn-des-lebens.html` |
| DF2 | `fundament/DF 2.md` | `fundament/kommen-reiche-in-den-himmel.html` |
| DF3 | `fundament/DF3.md` | `fundament/beziehung-zu-gott-hat-ihren-preis.html` |

Landing-Teaser: immer nur **neuester DF** (aktuell DF3). Ältere über Archiv-Link oder Hub.

## Inspiration

- Ton: „Orte, die uns geprägt haben“ — kein Reiseführer  
- Metadaten: `inspiration/churches.json` — Namen/Ort bei neuen Fotos pflegen  
- Quell-JPGs: `inspirations/` (gitignored) → WebP via `scripts/build-inspiration-images.py`  
