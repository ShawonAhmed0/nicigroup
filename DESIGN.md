# Design

<!-- Recorded from the built world, not from intention. Update when the code changes. -->

## World

The corporate-group site played straight, built to the craft level of VINCI and
Skanska (saturated sector fields, bold figures, work photography) crossed with
Mitsubishi Corporation's composure. Chosen over two more inventive directions
because the audience — procurement officers, tender reviewers, developers —
rewards familiarity and legibility over surprise.

## Colour

Strategy: **full palette**. The group owns ink, paper and one signal; each
business owns a saturated field of its own. Breadth is what NICI is selling, so
colour carries it.

| Role | Light | Dark | Use |
|---|---|---|---|
| `--ink` | `#0A1628` | `#050A11` | Hero, header, footer, close |
| `--signal` | `#FFC93C` | same | Group actions, rules, focus, selection |
| `--ground` / `--ground-2` / `--ground-3` | `#FFFFFF` / `#F1F4F8` / `#E4EAF1` | `#070D16` / `#0D1622` / `#16202E` | Reading surfaces |
| `--text` / `--text-2` / `--text-3` | `#0A1628` / `#4A5B70` / `#607187` | `#EEF3F8` / `#A4B4C7` / `#7A8CA2` | Body copy |
| `--on-ink` / `-2` / `-3` | `#F2F6FA` / `#A9BACD` / `#7B8FA6` | same | Copy on ink |

Ground is chosen from the use scene — a mid-range Android in daylight — so the
reading surface is light. The ink hero and close are structural anchors present
in both themes, never a mode.

### Business fields

Each company stores one hex `brandColour` in the CMS. Both derived colours are
mixed from it at render time, so a business added next year gets a correct,
legible block from one value:

```
--field: color-mix(in oklab, <brandColour> 30%, #050C16)   /* panel ground */
--spark: color-mix(in oklab, <brandColour> 72%, white)     /* accent on that ground */
```

Seeded values: N Islam `#FF5B1A`, Paper Star `#1B4DE4`, Smart Car `#00A876`.

**Business hues are structural only.** They carry rules, chips and panel grounds
— never body text, never state. A hue picked for a light ground cannot be
trusted on the dark one.

## Type

- **Archivo** (variable width axis) — display, navigation, buttons, figures.
  Headings run `wdth` 108–118; the width axis is where the personality lives.
- **Literata** — running prose. A text serif against a signage grotesque; it
  gives the reading passages the weight of an annual report rather than another
  corporate sans page.
- Figures use `font-variant-numeric: tabular-nums` (`.tnum`).
- Headings carry `text-wrap: balance` and `letter-spacing: -0.02em`.

## Layout

- Container `max-width: 1280px`, `px-5` rising to `px-8`.
- Sections alternate ink → ground-2 → full-bleed business field → ground-2 → ink,
  so density and quiet trade off down the scroll.
- Business blocks are full-bleed two-column, image and panel swapping side by
  parity (`lg:order-2`, not `direction: rtl`).
- Body measure held near 54–68ch.

## Components

| Component | Note |
|---|---|
| `GroupMark` | Three bars, one per business, in the three field colours |
| `BusinessBlock` | Full-bleed business section; derives its own field and spark |
| `CuratedUpdates` | CMS-authored update cards; hidden when no curated items are published |
| `MediaFrame` | Image slot with an **honest labelled placeholder** — a ruled field naming what is missing, never a decorative shape posing as content. `base` sets an opaque ground; `labelTone` tints the label from that ground |
| `Breadcrumbs` | `tone="dark"` on field mastheads, light elsewhere |
| `Icon` | Drawn SVG at one 1.6 stroke weight. No emoji, no unicode glyph as an icon |

The same ink masthead and alternating ground rhythm now carries `/about`, the
business directory, project and news indexes and details, contact, concerns and
the not-found page. Sparse CMS records collapse cleanly instead of exposing
editor instructions. The header switches to a viewport-bound, scrollable menu
below the desktop breakpoint so every primary route remains reachable on touch.

## Motion

One authored entrance: `.rise` settles the hero on load (`.75s`, exponential
ease-out, `backwards` fill, 120ms offset on the chairman panel). Everything
below the fold is visible at rest. Hover moves arrows 4px and lifts buttons 1–2px.
Everything collapses under `prefers-reduced-motion`.

## Browser surfaces

`::selection`, `:focus-visible` (3px signal ring), and scrollbars are themed
from the palette rather than left at browser defaults.

## Rules

1. **No kickers or eyebrows above headings.** The heading carries itself.
2. **No invented credibility.** Figures on the homepage are counted from the
   database. Any block whose content NICI has not supplied hides itself; an
   image slot with no image says so in words.
3. **Nothing depends on there being three businesses.** Grids reflow, colours
   derive, navigation builds from the CMS.
4. **Base element styles live in `@layer base`.** Unlayered CSS outranks every
   Tailwind utility regardless of specificity — an unlayered `a { color: inherit }`
   silently killed every `text-*` utility on links once already.
5. Contrast floor 4.5:1 body, 3:1 large. Verified on the built page, not assumed.
