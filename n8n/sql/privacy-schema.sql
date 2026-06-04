-- Eckstein Podcast — Privacy & Newsletter (Supabase Frankfurt)
-- Run in SQL Editor on the NEW privacy project. Service Role for APIs/n8n only.

create extension if not exists "pgcrypto";

-- Cookie / Klaro consent proof (no email)
create table if not exists public.cookie_consent_logs (
  id uuid primary key default gen_random_uuid(),
  session_hash text not null,
  services jsonb not null,
  klaro_version text,
  privacy_version text not null default '2026-06-04',
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists cookie_consent_logs_created_at_idx
  on public.cookie_consent_logs (created_at desc);

alter table public.cookie_consent_logs enable row level security;

-- No public policies: inserts via api/log-consent.js (service role) only.

-- Newsletter / Gemeinde waitlist (double opt-in in Phase 2)
create table if not exists public.email_consents (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  purpose text not null check (purpose in ('fundament_newsletter', 'gemeinschaft_waitlist')),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'unsubscribed')),
  privacy_version text not null default '2026-06-04',
  consent_text_hash text,
  doi_token text,
  confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  source text,
  unique (email, purpose)
);

create index if not exists email_consents_purpose_status_idx
  on public.email_consents (purpose, status);

alter table public.email_consents enable row level security;

create policy "anon_insert_pending_email_consents"
  on public.email_consents
  for insert
  to anon
  with check (
    status = 'pending'
    and email is not null
    and purpose in ('fundament_newsletter', 'gemeinschaft_waitlist')
    and privacy_version is not null
  );

-- Idempotent article mail campaigns (n8n)
create table if not exists public.email_campaign_log (
  id uuid primary key default gen_random_uuid(),
  article_slug text not null unique,
  df_number int,
  title text,
  recipient_count int default 0,
  workflow_run_id text,
  created_at timestamptz not null default now()
);

alter table public.email_campaign_log enable row level security;
