# ForgeGTM

Marketing site for ForgeGTM, a B2B go-to-market and outbound agency.
Next.js (App Router), TypeScript, Tailwind CSS v4. English and German.

## Getting started

This project uses **pnpm** — the version is pinned via `packageManager`, so
[corepack](https://nodejs.org/api/corepack.html) selects it automatically.

```bash
pnpm install
cp .env.example .env.local   # then fill in DATABASE_URL (see below)
pnpm dev
```

Open http://localhost:3000 — it redirects to `/en`.

pnpm forwards arguments directly, so it is `pnpm dev -p 4000`, **not**
`pnpm dev -- -p 4000`.

```bash
pnpm build   # production build
pnpm lint    # eslint
```

## Environment variables

| Variable             | Required | Purpose                                                      |
| -------------------- | -------- | ------------------------------------------------------------ |
| `DATABASE_URL`       | Yes\*    | Postgres connection string. Stores strategy-call submissions. |
| `RESEND_API_KEY`     | No\*\*   | Resend API key for lead notification emails.                  |
| `LEADS_EMAIL_FROM`   | No\*\*   | Sender address, on a domain verified with Resend.             |
| `LEADS_EMAIL_TO`     | No       | Recipient. Defaults to `leads@forgegtm.com`.                  |
| `RESEND_API_URL`     | No       | Override the provider endpoint. Local testing only.           |

\* The site builds and runs without it, but the form cannot store anything. It
does **not** fake success — it shows an error asking the visitor to email, and
logs a clear message server-side.

\*\* Without these, leads are still stored; only the alert email is skipped
(and a warning is logged). Email failure never fails a submission.

### Database setup

Any Postgres works (Neon, Supabase, Railway, RDS, local). Hosted providers
usually need `?sslmode=require`. Apply the schema once:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

`db/schema.sql` is idempotent and safe to re-run.

`DATABASE_URL` is read only in server code (`lib/db.ts`, which imports
`server-only`), so it can never be bundled into the browser.

### Email setup

1. Create a [Resend](https://resend.com) account and verify your sending domain.
2. Create an API key → `RESEND_API_KEY`.
3. Set `LEADS_EMAIL_FROM` to an address on the verified domain.
4. Ensure `leads@forgegtm.com` exists and can receive mail.

Alerts go to `leads@forgegtm.com`, never to the prospect. `Reply-To` is set to
the prospect's address, so replying in the alert writes to them directly.
Swapping provider means editing `sendLeadNotification` in `lib/email.ts` only.

## The strategy-call form

`components/ContactForm.tsx` → `app/actions/strategy-call.ts` (Server Action)
→ `lib/db.ts` → `strategy_call_requests`, then `lib/email.ts` for the alert.

Validation lives in `lib/strategy-call.ts` and runs in **both** places: in the
browser for instant feedback, and again on the server, which is the boundary
that matters — a Server Action is reachable by direct POST. It returns error
*keys*, so messages render in the visitor's language. A hidden honeypot field
silently drops bots.

Read submissions with:

```sql
select created_at, name, email, company, goal, locale, status
from strategy_call_requests order by created_at desc;
```

### Testing the form

1. Set `DATABASE_URL`, apply the schema, run `pnpm dev`.
2. Go to the "Book a Strategy Call" section.
3. Submit empty → every required field shows an inline error.
4. Enter a malformed email → rejected before any request is sent.
5. Submit valid details → spinner, then a "Request received" confirmation.
6. Confirm the row landed with the query above.

Switch to DE first to confirm validation messages come back in German.

To check the failure path, unset `DATABASE_URL` and restart: the form must show
an error and point at email — never a success message.

### Testing the lead alert without sending real mail

Run a throwaway endpoint and point the app at it:

```bash
# capture.mjs
import { createServer } from "node:http";
createServer((req, res) => {
  let body = ""; req.on("data", c => body += c);
  req.on("end", () => { console.log(JSON.parse(body)); res.end("{}"); });
}).listen(5599);
```

```bash
node capture.mjs &
RESEND_API_KEY=test RESEND_API_URL=http://127.0.0.1:5599/emails \
LEADS_EMAIL_FROM="ForgeGTM <notifications@forgegtm.com>" pnpm dev
```

Submit the form and the captured payload prints `to`, `reply_to`, `subject`
and both HTML and text bodies. Kill the capture server and submit again to
confirm the lead is still stored and the visitor still sees success.

## Internationalisation

English is the default; German lives at `/de`. Structure:

- `proxy.ts` — locale routing. **In Next.js 16 this file is `proxy.ts`, not
  `middleware.ts`** (a file named `middleware.ts` is never run). It redirects
  unprefixed paths using the saved cookie, then `Accept-Language`, then English,
  and writes the cookie whenever it sees a locale-prefixed path — which is what
  makes the choice survive a refresh.
- `lib/i18n/en.ts` — source of truth. Its shape defines the `Dictionary` type.
- `lib/i18n/de.ts` — typed as `Dictionary`, so a missing or renamed key **fails
  the build**. That is the guardrail against half-translated releases.
- Pages read `params.lang` and pass the dictionary down as props.

To add a locale: add it to `LOCALES`, add a dictionary, add the locale key to
content files in `content/`.

## Structure

```
app/[lang]/          all routes, per locale
  about/  case-studies/[slug]/  insights/[slug]/  privacy/  imprint/
app/actions/         server actions (form submission)
components/          sections and UI primitives
content/             case studies, articles, legal copy (localised data)
lib/i18n/            locales and dictionaries
lib/db.ts            database access     lib/email.ts   lead notifications
db/schema.sql        database schema
```

Presentation is driven by one design system: `app/globals.css` owns the type
scale (`text-display`, `text-h2`, `text-body`, …), colour tokens, radius scale
and the shared easing curve; `ui/Section.tsx` and `ui/SectionHeader.tsx` keep
every section on the same rhythm. Prefer extending those over one-off values.

Scroll animations run through `ui/Reveal.tsx` and are disabled under
`prefers-reduced-motion`.

## Demo content

Case studies, testimonials and the client logo strip use **fictional**
companies and modelled figures. Each is labelled on the page itself (see
`ui/PlaceholderBadge.tsx`) and the case-study sections carry an explicit
disclosure naming the companies as fictional.

When replacing them with real, client-approved material, delete the badge and
the disclosure along with the data — see the comments at the top of
`content/case-studies.ts`, `Testimonials.tsx` and `LogoStrip.tsx`.

## Before launch

- [ ] Fill in the legal pages. Outstanding details render as visible dashed
      markers (`Fill` in `components/LegalPage.tsx`), in both languages. Both
      pages need review by a qualified lawyer.
- [ ] Replace `hello@forgegtm.com` and the LinkedIn URL in `Footer.tsx` and
      `ContactForm.tsx`.
- [ ] Set the production domain in `metadataBase` (`app/[lang]/layout.tsx`).
- [ ] Provision Postgres, set `DATABASE_URL`, apply `db/schema.sql`.
- [ ] Configure Resend and verify the sending domain.
- [ ] Add a `sitemap.ts` if you want search engines to discover every locale
      route explicitly (hreflang alternates are already emitted).
