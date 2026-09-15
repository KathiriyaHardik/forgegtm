-- ForgeGTM — strategy call request storage
--
-- Apply once against your Postgres database:
--   psql "$DATABASE_URL" -f db/schema.sql
--
-- Safe to re-run: every statement is idempotent.

create table if not exists strategy_call_requests (
  id            uuid         primary key default gen_random_uuid(),
  created_at    timestamptz  not null default now(),

  name          varchar(120) not null,
  email         varchar(200) not null,
  company       varchar(160) not null,
  website       varchar(200),
  job_title     varchar(120),
  budget        varchar(60),
  goal          varchar(120) not null,
  message       text,

  -- Which page the request came from, for attribution.
  source_path   varchar(200),

  -- Site language the form was submitted in.
  locale        varchar(8)   not null default 'en',

  -- Simple pipeline state for whoever works the inbound queue.
  status        varchar(32)  not null default 'new'
);

-- The queue is almost always read newest-first.
create index if not exists strategy_call_requests_created_at_idx
  on strategy_call_requests (created_at desc);

-- Spotting repeat enquiries from the same person.
create index if not exists strategy_call_requests_email_idx
  on strategy_call_requests (lower(email));

-- Added after initial release; safe on an existing table.
alter table strategy_call_requests
  add column if not exists locale varchar(8) not null default 'en';

-- When the lead-alert email actually went out. Null means the alert never
-- sent (no transport configured, or the provider failed), so the lead is
-- still recoverable by hand:
--
--   select created_at, name, email, company
--   from strategy_call_requests
--   where notified_at is null order by created_at desc;
--
-- A failed notification must never mean a lost lead.
alter table strategy_call_requests
  add column if not exists notified_at timestamptz;

-- When the prospect's confirmation email went out. Null means it never sent.
-- Tracked separately from notified_at because the two are independent: the
-- internal alert can succeed while the confirmation fails, and each is worth
-- chasing differently. Neither failing ever discards the lead.
--
--   select created_at, name, email
--   from strategy_call_requests
--   where confirmation_sent_at is null order by created_at desc;
alter table strategy_call_requests
  add column if not exists confirmation_sent_at timestamptz;

-- The strategy-call form moved to a modal that asks one open question —
-- "what are you trying to grow?" — instead of a fixed dropdown, so `goal`
-- holds a few sentences rather than one of six preset strings. varchar(120)
-- was sized for the dropdown and truncates real answers.
alter table strategy_call_requests
  alter column goal type text;

-- Company is optional on the new form: asking for it is useful, requiring it
-- costs completions from founders and independents who do not think of
-- themselves as one. Existing rows are unaffected.
alter table strategy_call_requests
  alter column company drop not null;
