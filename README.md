# ForgeGTM

Marketing site for ForgeGTM, a B2B go-to-market and outbound agency.

Built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Getting started

This project uses **pnpm** — the version is pinned via the `packageManager`
field, so [corepack](https://nodejs.org/api/corepack.html) will select it
automatically.

```bash
pnpm install
cp .env.example .env.local   # then fill in DATABASE_URL
pnpm dev
```

Then open http://localhost:3000.

Note that pnpm forwards arguments directly, so it is `pnpm dev -p 4000` —
not `pnpm dev -- -p 4000`.

```bash
pnpm build   # production build
pnpm lint    # eslint
```

## Environment variables

| Variable       | Required | Purpose                                              |
| -------------- | -------- | ---------------------------------------------------- |
| `DATABASE_URL` | Yes\*    | Postgres connection string for form submissions.      |

\* The site builds and runs without it, but the strategy-call form cannot
store anything. In that state it does **not** fake success — it shows an error
asking the visitor to email instead, and logs a clear message server-side.

Any Postgres works (Neon, Supabase, Railway, RDS, local). Hosted providers
usually need `?sslmode=require` appended. Apply the schema once:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

`DATABASE_URL` is only ever read in server code (`lib/db.ts`, which imports
`server-only`), so it can never be bundled into the browser.

## The strategy-call form

`components/ContactForm.tsx` (client) → `app/actions/strategy-call.ts`
(Server Action) → `lib/db.ts` → the `strategy_call_requests` table.

Validation rules live in `lib/strategy-call.ts` and run in **both** places:
in the browser for instant feedback, and again on the server, which is the
boundary that actually matters — a Server Action is reachable by direct POST.
A hidden honeypot field silently drops bot submissions.

Read submissions with:

```sql
select created_at, name, email, company, goal, status
from strategy_call_requests
order by created_at desc;
```

### Testing it locally

1. Point `DATABASE_URL` at any Postgres and apply `db/schema.sql`.
2. Run `pnpm dev`, go to the "Book a Strategy Call" section.
3. Submit empty — every required field should show an inline error.
4. Submit with a malformed email — it should be rejected before sending.
5. Submit valid details — the button shows a spinner, then the card is
   replaced by a "Request received" confirmation.
6. Confirm the row landed with the query above.

To check the failure path, unset `DATABASE_URL` and restart: the form should
show an error and tell the visitor to email, never a success message.

## Structure

```
app/                 routes, metadata, OG image, global styles
  actions/           server actions (form submission)
  privacy/           legal pages
  imprint/
components/          section components (one per page section)
  ui/                shared primitives (Section, Button, Reveal, …)
lib/                 validation and database access
db/schema.sql        database schema
```

Presentation is driven by a single design system rather than per-section
styling. `app/globals.css` owns the type scale (`text-display`, `text-h2`,
`text-body`, …), colour tokens, radius scale and the shared easing curve;
`components/ui/Section.tsx` and `SectionHeader.tsx` keep every section on the
same vertical rhythm and grid. Prefer extending those over one-off values.

Scroll animations run through `components/ui/Reveal.tsx` and are disabled
under `prefers-reduced-motion`.

## Demo content

Case studies, testimonials and the client logo strip use **fictional**
companies and modelled figures. Each is labelled on the page itself (see
`components/ui/PlaceholderBadge.tsx`) so nothing misleads a reader.

When replacing them with real, client-approved material, delete the badge and
the disclosure line along with the placeholder data — see the comments at the
top of `CaseStudies.tsx`, `Testimonials.tsx` and `LogoStrip.tsx`.

## Before launch

- [ ] Fill in the legal pages. Outstanding details render as visible dashed
      markers (`Fill` in `components/LegalPage.tsx`). Both need review by a
      qualified lawyer.
- [ ] Replace `hello@forgegtm.com` and the LinkedIn URL in
      `components/Footer.tsx` and `components/ContactForm.tsx`.
- [ ] Set the production domain in `metadataBase` (`app/layout.tsx`).
- [ ] Provision Postgres and set `DATABASE_URL` in your host's environment.
- [ ] Decide where form notifications should go — submissions are currently
      stored only, with no email alert.
