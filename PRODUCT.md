# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, in order of commercial weight:

1. **Prospective B2B buyers and partners** — garment factory procurement officers
   sourcing supporting paper or China-import paper; developers and institutional
   clients evaluating a construction contractor; buyers of EVs, charging and solar.
   They arrive from a referral, a business card or a search, on a mid-range Android
   phone on mobile data, and want to establish within seconds that NICI Group is
   real, substantial and in the right line of work.
2. **Tender and compliance reviewers** — checking trade licence, certifications,
   completed projects and registered addresses before shortlisting.
3. **Jobseekers and community visitors** — reaching the social initiatives.

The site is a credibility instrument, not a transaction surface. Nobody buys here;
they decide whether to make contact.

## Product Purpose

A corporate portfolio and business directory for NICI Group, a Bangladeshi group
operating three unrelated businesses plus social initiatives. It must make one
group legible across sectors that share no customers, and let a visitor land on
any business and understand both that business and the group behind it.

Success is an enquiry that arrives already convinced the group is substantial.

## Positioning

The group itself is the claim: construction, paper trading and recycling, and
green mobility under one owner. No single-sector competitor can show that range,
and no directory can show the operating depth. The site's job is to make the
breadth read as strength rather than as an unfocused conglomerate.

## Operating Context

- Overwhelmingly mobile, on Bangladeshi mobile data. Performance is a design
  constraint, not a technical afterthought.
- Visitors frequently arrive deep — on a wing page from a shared link — not on
  the homepage. Every page has to re-establish the group.
- Content is entered by NICI's own staff, not by developers.

## Capabilities and Constraints

- **Entity model, already built.** Group → Company → Wing, plus Concern, Project
  and News. Two levels below the group and no further. A new business is a CMS
  record, never a code change; every layout must survive a fourth or fifth company
  appearing without redesign.
- **Stack:** Next.js 16 App Router, Payload 3 CMS at `/admin`, Tailwind 4. SQLite
  in development, Postgres in production.
- **Drafts are live.** Six wings are currently unpublished placeholders pending
  client confirmation. Layouts must read correctly with three wings or with none.
- **Language:** English at launch. Routing and content model stay locale-aware so
  Bengali can be added later as content entry, not a rebuild.
- **Social feeds:** YouTube pulls cleanly; Facebook and Instagram need account
  access and app review; LinkedIn and X are link-outs only.

### The three businesses

| Business | Sector | Wings |
|---|---|---|
| N Islam & Co. | Building construction & contracting | 3, unconfirmed |
| Paper Star & Co. | Garments paper, China supply & recycling | Garments Supporting Paper · China Paper Supply · Wastage Recycling |
| Smart Car Center | Green mobility & renewable energy | 3, unconfirmed |

Sister concerns: Dream Ground, Aid for Men Foundation.

## Brand Commitments

Name is NICI Group. No brand guidelines, logo files or brand colours have been
supplied. The client has asked for a bright, premium, high-production feel and a
chairman's portrait in the homepage hero.

## Evidence on Hand

**Almost none, and this must not be papered over with invention.**

- No logos, in vector or any other form.
- No photography — no site, warehouse, vehicle, team or chairman photographs.
- No project list, client names, certifications or trade licence documents.
- No figures: no headcount, capacity, tonnage, years in operation or project count.
- No addresses, phone numbers or enquiry inboxes.

Confirmed by the client: placeholder imagery is acceptable for now. Generated
comp imagery must be labelled as such in code and documentation, and no generated
image may depict a real, named individual — the chairman's portrait is a marked
placeholder slot until a real photograph is supplied.

Nothing on this site may state a figure, credential, client name or completion
NICI Group has not provided.

## Product Principles

1. **The group is the product.** Every page answers "who is NICI Group?" before it
   answers "what is this business?"
2. **Structure absorbs growth.** A fourth business must slot in without a redesign.
   No layout may depend on there being exactly three.
3. **Never invent credibility.** Absent figures, clients and certifications stay
   absent. Blocks disappear rather than display placeholder claims.
4. **Mobile is the real site.** Designed at 375px first; the desktop layout is the
   variation, not the origin.
5. **Breadth reads as strength.** Each business gets a distinct identity inside one
   unmistakable group system.

## Accessibility & Inclusion

WCAG 2.1 AA. Alt text is a required CMS field. Per-company brand colours are
decorative only — they never carry text or state, because a hue chosen for a light
ground cannot be trusted on the dark one.
