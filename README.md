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

| Variable               | Required | Purpose                                                       |
| ---------------------- | -------- | ------------------------------------------------------------- |
| `DATABASE_URL`         | Yes\*    | Postgres connection string. Stores strategy-call submissions.  |
| `SMTP_USER`            | No\*\*   | Gmail address used to send alerts (Option 1).                  |
| `SMTP_PASSWORD`        | No\*\*   | Google **App Password** — not the account password.            |
| `SMTP_HOST`            | No       | Defaults to `smtp.gmail.com`.                                  |
| `SMTP_PORT`            | No       | Defaults to `465` (implicit TLS). `587` uses STARTTLS.         |
| `RESEND_API_KEY`       | No\*\*   | Resend API key (Option 2, needs a domain).                     |
| `LEADS_EMAIL_FROM`     | No\*\*   | Resend sender, on a domain verified with Resend.               |
| `LEADS_EMAIL_TO`       | No       | Recipient. Defaults to `CONTACT_EMAIL` in `lib/site.ts`.       |
| `ADMIN_USER`           | No       | Dashboard username. Defaults to `forgegtm`.                    |
| `ADMIN_PASSWORD`       | Yes†     | Dashboard password. Unset ⇒ `/admin` returns 503.              |
| `RESEND_API_URL`       | No       | Override the provider endpoint. Local testing only.            |
| `NEXT_PUBLIC_SITE_URL` | No       | Site origin for canonical URLs, sitemap and robots.            |

\* The site builds and runs without it, but the form cannot store anything. It
does **not** fake success — it shows an error asking the visitor to email, and
logs a clear message server-side.

\*\* Without these, leads are still stored; only the emails are skipped (and a
warning is logged). Email failure never fails a submission.

† Only required to use `/admin`. Without it the dashboard is unreachable rather
than public — it fails closed.

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

`lib/email.ts` supports two transports and picks whichever is configured,
checking SMTP first:

| | Transport | Needs a domain? | Use when |
| - | --------- | --------------- | -------- |
| 1 | **Gmail SMTP** | No | Now — this is the working path today |
| 2 | **Resend** | Yes | Once you own and verify a domain |

With neither configured the lead is still stored; only the alert is skipped,
and a warning naming the missing variables is logged.

### Option 1 — Gmail SMTP (no domain needed)

Gmail will not accept your normal password from an application. You need an
**App Password**, which is a separate 16-character credential:

1. Enable 2-Step Verification on the Google account (App Passwords are not
   offered without it).
2. Go to <https://myaccount.google.com/apppasswords> and create one for "Mail".
3. Put it in `.env.local`:

   ```bash
   SMTP_USER=contact.forgegtm@gmail.com
   SMTP_PASSWORD=<the 16 characters>
   ```

4. Restart the dev server and submit the form.

Gmail's limit is roughly 500 messages a day, far above lead-alert volume. The
envelope sender is the authenticated mailbox — Gmail rewrites a mismatched
`From` regardless, and forging one is what gets mail rejected — so the alert
arrives as `ForgeGTM Website <contact.forgegtm@gmail.com>`.

### Option 2 — Resend (once you own a domain)

Preferred long term: a sender on your own verified domain authenticates
properly and is far less likely to be spam-foldered. It **cannot** use a Gmail
address — Resend will not verify a domain you do not control, and `gmail.com`
publishes a DMARC policy telling inboxes to reject mail a third party sends on
its behalf.

1. Create a [Resend](https://resend.com) account and verify your domain.
2. Create an API key → `RESEND_API_KEY`.
3. Set `LEADS_EMAIL_FROM` to an address on that verified domain.

Leave `SMTP_USER`/`SMTP_PASSWORD` unset once you switch, or SMTP keeps winning.

### The two emails

One submission sends two messages, to different people:

| | Goes to | `Reply-To` | Subject |
| - | ------- | ---------- | ------- |
| **Internal alert** | `LEADS_EMAIL_TO` | the prospect | `New Strategy Call Request — [Name]` |
| **Prospect confirmation** | the prospect | `LEADS_EMAIL_TO` | localised, branded |

`Reply-To` is inverted between them on purpose: replying to the alert writes to
the prospect, replying to the confirmation reaches the team.

The confirmation is sent in the language the visitor submitted in. Its copy
lives in `CONFIRMATION_COPY` in `lib/email.ts`, **not** in `lib/i18n` — the
site dictionaries are serialised into the page payload for the browser, and
email copy no visitor renders on-page has no business being shipped there.

### Guarantees

The two sends run concurrently under `Promise.allSettled`, so neither can take
down the other, and each is recorded in its own column. The lead always wins:

| Database | Alert | Confirmation | Visitor sees | Stored |
| -------- | ----- | ------------ | ------------ | ------ |
| ok | ok | ok | Success | Yes, both columns stamped |
| ok | ok | fails | Success, **without** claiming an email was sent | Yes, `confirmation_sent_at` null |
| ok | fails | fails | Success, same honest copy | Yes, both columns null |
| fails | — | — | Error, asked to email instead | No |
| validation fails | — | — | Field-level errors | No |

The success panel reads `confirmationSent` off the action result, so it never
promises an email the provider rejected. Recover anything that did not send:

```sql
select created_at, name, email, company
from strategy_call_requests
where notified_at is null or confirmation_sent_at is null
order by created_at desc;
```

## The contact address

`CONTACT_EMAIL` in `lib/site.ts` is the single source for the public contact
address. It appears in the footer, in the form's success panel as a fallback,
and inside two error messages.

Those two messages live in the dictionaries and use an `{email}` placeholder
rather than a literal copy, since a hardcoded address per language means
editing every translation to change it. `withContactEmail()` substitutes it at
render. **Any new dictionary string mentioning the address must use `{email}`.**

Changing the address is therefore a one-line edit in `lib/site.ts`.

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
7. Check `/admin` — the lead is listed with two green email badges.
8. Check the prospect address received the branded confirmation, and
   `contact.forgegtm@gmail.com` received the alert.

Switch to DE first to confirm validation messages come back in German.

To check the failure path, unset `DATABASE_URL` and restart: the form must show
an error and point at email — never a success message.

### Testing the lead alert without sending real mail

The quickest real test is to send yourself one: set `SMTP_USER` and
`SMTP_PASSWORD`, submit the form, and check the inbox. The alert arrives from
the same address it is sent to, which is expected.

To exercise the path without sending anything, point the app at a local SMTP
sink. `db/schema.sql` must already be applied and `DATABASE_URL` set.

```bash
SMTP_HOST=127.0.0.1 SMTP_PORT=1025 \
SMTP_USER=contact.forgegtm@gmail.com SMTP_PASSWORD=anything \
DATABASE_URL=... pnpm dev
```

Any SMTP sink listening on 1025 works. Submit the form, then confirm:

- the row is in `strategy_call_requests`,
- `notified_at` is set,
- the captured message has `To: contact.forgegtm@gmail.com` and `Reply-To:`
  the prospect's address.

To check the failure path, stop the sink and submit again. The visitor must
still see success, the row must still be written, and `notified_at` must be
null — a failed alert never costs a lead.

## Admin dashboard

`/admin` lists every strategy-call request, newest first, with each prospect's
email as a `mailto:` link and a badge per email showing whether it actually
sent. Anything that did not send is called out at the top — the lead is safe,
it just needs a manual follow-up.

Access is HTTP Basic auth, enforced in `proxy.ts` **before** the route is
reached, so no unauthenticated request ever touches the page:

```bash
ADMIN_USER=forgegtm            # optional, this is the default
ADMIN_PASSWORD=<long random>   # required
```

Three details worth knowing:

- **It fails closed.** With no `ADMIN_PASSWORD` set, `/admin` returns 503. An
  unconfigured secret must never mean an open door.
- **Comparison is constant-time.** `===` on a secret leaks its length and
  prefix through timing, so both the username and password are compared by
  walking their full width without an early exit.
- **Never cached.** The page is `force-dynamic` and sends `no-store`, since the
  response is tied to an authenticated session and a cached lead list would be
  both stale and a disclosure risk.

It is also `noindex` and disallowed in `robots.txt` — belt and braces, since
Basic auth already blocks it.

Serve it over HTTPS. Basic auth sends credentials base64-encoded, which is
encoding, not encryption; on plain HTTP they travel in the clear.

## SEO routes

`app/sitemap.ts` and `app/robots.ts` are Next.js metadata routes, served at
`/sitemap.xml` and `/robots.txt`. Both are prerendered at build time.

The sitemap derives its routes from `content/case-studies.ts` and
`content/insights.ts`, so **adding a case study or an article adds it to the
sitemap automatically** — there is no second list to maintain.

Every language version gets its own `<url>` entry carrying the complete set of
`hreflang` alternates, itself plus `x-default` included. Google only trusts an
alternate set when every page in it points back at every other one.

`lastmod` is emitted only where a real date exists (articles, and the insights
index). Stamping every page with the build time would tell crawlers the whole
site changed on every deploy, which is exactly the signal Google discards.

`robots.txt` matters more than it looks here: it is how a crawler arriving at
the bare domain finds the locale-prefixed routes, since `/` only ever answers
with a redirect.

Note that `proxy.ts` skips any path with a file extension, which is why these
two are not redirected into `/en`.

### The site origin

`lib/site.ts` owns the canonical origin for everything needing an absolute URL:
`metadataBase`, the sitemap, robots and JSON-LD `@id`s. Set
`NEXT_PUBLIC_SITE_URL` to override it — on a staging deployment, for instance,
so the build does not advertise itself under the production domain. It is read
at build time, so a change needs a rebuild.

## Adding content

Both content types are plain typed data — no CMS, no MDX toolchain. Routes,
static params, sitemap entries and related-article links are all derived from
these arrays, so adding an entry is the only step.

**An article** — append to `ARTICLES` in `content/insights.ts` with a unique
`slug`, a `category` from `CATEGORIES`, `publishedAt`, and `content` for every
locale. Bodies use a small block model (`p`, `h2`, `ul`, `quote`) that is
type-checked, so a malformed article fails the build rather than the page.
Reading time is computed from the body, and the visual is derived from the
category, so neither needs authoring.

**A case study** — append to `CASE_STUDIES` in `content/case-studies.ts`. Each
locale needs the full narrative, `metrics`, and `beforeAfter` rows.

Because `Dictionary` types both locales, a missing German field **fails the
build**. That is deliberate: it is the guardrail against shipping a
half-translated release.

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
app/admin/           protected lead dashboard (Basic auth in proxy.ts)
components/          sections and UI primitives
content/             case studies, articles, legal copy (localised data)
lib/i18n/            locales and dictionaries
lib/site.ts          canonical site origin
app/sitemap.ts       /sitemap.xml        app/robots.ts  /robots.txt
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
- [ ] Replace the placeholder LinkedIn URL in `Footer.tsx` — it still points at
      `linkedin.com`. (The contact address is real: see "The contact address".)
- [ ] Configure an email transport — see "Email setup". Without one, leads are
      stored but neither email is sent.
- [ ] Set `ADMIN_PASSWORD` to something long and random, and confirm `/admin`
      is served over HTTPS.
- [ ] Confirm the production domain in `lib/site.ts` (or set
      `NEXT_PUBLIC_SITE_URL`). It drives canonical URLs, the sitemap and robots.
- [ ] Provision Postgres, set `DATABASE_URL`, apply `db/schema.sql`.
- [ ] Configure Resend and verify the sending domain.
- [ ] Submit `https://<domain>/sitemap.xml` in Google Search Console. The
      sitemap itself is already generated — see "SEO routes" above.
