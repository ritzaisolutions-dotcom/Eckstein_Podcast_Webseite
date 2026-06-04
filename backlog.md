# Backlog — Eckstein Podcast Webseite

> Automatischer E-Mail-Versand und n8n-Release-Mail bewusst **später**.  
> Diese Datei sammelt alles, was nicht für den aktuellen Launch-Stand nötig ist.

---

## Phase 2 — E-Mail & n8n (verschoben)

### Automatische Fundament-Mail bei neuem Artikel

- [ ] n8n Workflow `fundament-article-release` importieren / **SMTP Send**-Node mit Mail-Host-Credential
- [ ] n8n Variables: `N8N_WEBHOOK_SECRET`, `SITE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `MAIL_FROM_EMAIL`
- [ ] GitHub Secrets: `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_SECRET`
- [ ] Webhook: `https://n8n.ritz-ai.solutions/webhook/fundament-article-release`
- [ ] Test: curl mit `X-Webhook-Secret` + mindestens ein `email_consents`-Eintrag `fundament_newsletter` + `confirmed`

### Double-Opt-In & Newsletter

- [ ] Checkbox „Fundament-Newsletter“ auf Hub/Landing (getrennt von Gemeinde-Warteliste)
- [ ] Bestätigungsmail (DOI) vor `status=confirmed`
- [ ] Abmelde-Link / `api/unsubscribe` (optional)
- [ ] Datenschutz-Text: SMTP/Newsletter/DOI ergänzen

### Optional: Resend statt SMTP

- [ ] Nur wenn SMTP-Zustellung Probleme macht — Workflow-Node wieder HTTP Resend

---

## Phase 2b — Sonstiges

- [ ] Alte Warteliste aus altem Supabase-Projekt nach `email_consents` migrieren
- [ ] Kirchen-Galerie `/inspiration/` (Iteration 3b)
- [ ] TikTok-Profil live verifizieren (`@Eckstein_Podcast`)

---

## Referenz (Dateien im Repo)

| Datei | Zweck |
|-------|--------|
| `n8n/fundament-article-release.workflow.json` | Workflow (SMTP), erst bei Phase 2 aktivieren |
| `n8n/sql/privacy-schema.sql` | Schema (sollte bereits ausgeführt sein) |
| `.github/workflows/notify-fundament.yml` | GitHub → n8n (erst mit Secrets sinnvoll) |
| `iteration3.md` | Ausführliche Doku |
