# n8n — Fundament Artikel-Mail

**Workflow importieren:** [`fundament-article-release.workflow.json`](fundament-article-release.workflow.json) (oder JSON in [../iteration3.md](../iteration3.md)) → n8n Import.

## Schnellstart

1. **Supabase** — neues Projekt Frankfurt → [`sql/privacy-schema.sql`](sql/privacy-schema.sql) ausführen
2. **n8n** — Workflow [`fundament-article-release.workflow.json`](fundament-article-release.workflow.json) importieren
3. **Variablen** in n8n (Settings → Variables):

| Variable | Beispiel |
|----------|----------|
| `N8N_WEBHOOK_SECRET` | langer Zufallsstring |
| `SITE_URL` | `https://www.eckstein-podcast.de` |
| `SUPABASE_URL` | `https://xxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service Role (geheim) |
| `MAIL_FROM_EMAIL` | `hallo@eckstein-podcast.de` (Absender, muss zum SMTP-Passwort passen) |

**SMTP:** Am Node **„SMTP Send“** eine n8n-Credential **SMTP** anlegen (Host/Port/User/Passwort deines Mail-Providers). Kein Resend nötig.

4. **Webhook** aktivieren → Production-URL kopieren → GitHub Secret `N8N_WEBHOOK_URL`
5. Gleiches Secret in GitHub als `N8N_WEBHOOK_SECRET`
6. Workflow **aktivieren** → Test mit curl (siehe iteration3.md)

## Dateien im Repo

| Datei | Zweck |
|-------|--------|
| `fundament-article-release.workflow.json` | Release-Mail an bestätigte Abonnenten |
| `sql/privacy-schema.sql` | Tabellen + RLS |
| `../.github/workflows/notify-fundament.yml` | Trigger bei neuem `fundament/*.html` (ohne `index.html`) |
