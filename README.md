# NICI Group

Corporate portfolio and dynamic business directory for NICI Group.

The site is a **directory of entities**, not a fixed set of pages. Adding a
business, a wing or a sister concern is a record in the admin panel — the
homepage grid, the navigation menu, the footer index and the sitemap all build
themselves from it. No code change is needed to add a fourth company.

## Stack

| | |
|---|---|
| Frontend | Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 |
| CMS | Payload 3, mounted at `/admin` inside the same app |
| Database | SQLite in development (no server needed); Postgres in production |
| Media | Local disk in development; object storage in production |

## Getting started

```bash
npm install
cp .env.example .env     # set PAYLOAD_SECRET and one-time seed credentials
npm run seed             # creates the admin user and the group structure
npm run seed:media       # registers the generated conceptual image set
npm run dev
```

- Site — http://localhost:3000
- Bengali site — http://localhost:3000/bn
- Admin — http://localhost:3000/admin
The seed script requires an explicit `SEED_EMAIL` and a unique `SEED_PASSWORD`
of at least 12 characters. It never prints the password to the terminal.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build with type checking |
| `npm run seed` | Seeds the group structure. Skips if companies already exist |
| `npm run seed:bn` | Adds or refreshes Bengali copy for the seeded records without changing English content |
| `npm run seed:media` | Registers and attaches the generated conceptual images with bilingual alt text |
| `npm run generate:types` | Regenerates `src/payload-types.ts` — run after any field change |
| `npm run generate:importmap` | Regenerates the admin import map — run after adding custom admin components |

## Content model

| Type | What it is | Route |
|---|---|---|
| Group settings | The parent brand. One record | `/`, `/about` |
| Company | An operating business | `/companies/[slug]` |
| Wing | A sub-business inside a company | `/companies/[slug]/[wing]` |
| Concern | Sister concern or CSR initiative | `/concerns/[slug]` |
| Project | Completed work, filtered by company | `/projects`, `/projects/[slug]` |
| News | Announcements | `/news`, `/news/[slug]` |

## Languages

English keeps the original public URLs. Bengali uses the shareable `/bn`
prefix, including matching detail routes such as `/bn/companies/paper-star`.
The header switch changes language without losing the current page.

Every editable content type has a **বাংলা** panel in Payload. Bengali fields
are optional and fall back to their English counterpart when empty, so editors
can translate the site progressively without duplicating records or changing
stable slugs.

A Wing points at its parent Company; that single relationship produces the URL,
the breadcrumb and the sibling strip. **Two levels below the group and no
further** — anything finer becomes a section within the wing page, because
three-level menus are unusable on a phone and most traffic here is mobile.

### Roles

- **Administrator** — full access, manages users
- **Editor** — creates and publishes across the whole group
- **Company manager** — restricted to their assigned companies and those
  companies' wings and projects

## Drafts

Every content collection uses drafts. A record is created as a draft unless
`_status` says otherwise, and the public site queries filter for published
records explicitly — the local API bypasses access control, so that filter is
what keeps drafts off the site.

Six wings are currently seeded **as drafts**: the three under N Islam & Co. and
the three under Smart Car Center. They are placeholders taken from the sector
descriptions and are waiting on NICI Group to confirm the real list (Q2 in the
project plan). They are visible in the admin panel and render nowhere public.

## Social feeds

See [docs/social-feeds.md](docs/social-feeds.md). Profile links and editor-curated
updates are live. External feed IDs are modeled in the CMS, but API fetching is
not enabled until the required platform access and review are available.

## Going to production

1. Swap the database adapter in `src/payload.config.ts` for
   `@payloadcms/db-postgres` and point `DATABASE_URI` at Postgres. Supabase
   Postgres is suitable for this; keep its connection string in the deployment
   environment rather than committing it.
2. Configure object storage for media (`@payloadcms/storage-s3` is installed).
3. Set `PAYLOAD_SECRET` and `NEXT_PUBLIC_SERVER_URL`.
4. Add an email adapter so password resets and enquiry forms send.
