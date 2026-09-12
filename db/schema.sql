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
