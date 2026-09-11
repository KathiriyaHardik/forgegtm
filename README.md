# ForgeGTM

Marketing site for ForgeGTM, a B2B go-to-market agency.

Built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Getting started

This project uses **pnpm** — the version is pinned via the `packageManager`
field, so [corepack](https://nodejs.org/api/corepack.html) will select it
automatically.

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

Note that pnpm forwards arguments directly, so it is `pnpm dev -p 4000` —
not `pnpm dev -- -p 4000`.

```bash
pnpm build   # production build
pnpm lint    # eslint
```

## Structure

```
app/                 routes, metadata, global styles
  privacy/           legal pages
  imprint/
components/          section components (one per page section)
  ui/                shared primitives (Section, Button, Reveal, …)
```

Presentation is driven by a single design system rather than per-section
styling. `app/globals.css` owns the type scale (`text-display`, `text-h2`,
`text-body`, …), colour tokens, radius scale and the shared easing curve;
`components/ui/Section.tsx` and `SectionHeader.tsx` keep every section on the
same vertical rhythm and grid. Prefer extending those over introducing
one-off values.

Scroll animations run through `components/ui/Reveal.tsx` and are disabled
under `prefers-reduced-motion`.

## Before launch

- [ ] Fill in the legal pages. Outstanding details render as visible dashed
      markers (`Fill` in `components/LegalPage.tsx`) so nothing ships
      half-complete. Both pages need review by a qualified lawyer.
- [ ] Replace the contact address (`hello@forgegtm.com`) and the LinkedIn URL
      in `components/Footer.tsx` and `components/FinalCTA.tsx`.
- [ ] Set the production domain in `metadataBase` (`app/layout.tsx`).
- [ ] Add real client logos and verified case-study results. The current
      "Built for" strip (`MarketsStrip.tsx`) and engagement models
      (`Engagements.tsx`) deliberately make no unverified claims — see the
      comments in those files before changing them.
