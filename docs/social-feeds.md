# Social feeds

Each company and concern can show a **Latest updates** section. At launch, staff
publish these updates through the curated list in Payload. Social profile links
are always available when entered. Automatic external feed pulling is deliberately
not enabled until NICI Group supplies the relevant account access.

| Platform | Pullable? | Mechanism | What we do |
|---|---|---|---|
| Facebook Page | Yes, with conditions | Page Plugin embed needs nothing. Native styling needs the Graph API, a Page access token and app review. | Profile link plus curated updates today |
| YouTube | Yes | Data API v3 with a server-side key. Public channel uploads, no review | Profile link plus curated updates today |
| Instagram | Yes, if Business account | Instagram API via the linked Facebook Page | Profile link plus curated updates today |
| LinkedIn | No public feed | Company posts need Marketing Developer Platform approval; only single-post embeds exist | Profile link plus curated updates |
| X / Twitter | Paid tier only | API access is billed monthly | Profile link plus curated updates |

## Current implementation

- **Curated updates render now.** Image, date, excerpt, platform and the original
  post link are entered in the CMS and displayed on the matching company or
  concern page.
- **Empty sections stay hidden.** Enabling updates without publishing any curated
  items does not leave a blank block on the public page.
- **No token reaches the browser.** No external API request is made by the current
  frontend. Future connectors must stay server-side and use a cache.

## Setup

1. In the admin panel, open the company and go to **Social & contact**.
2. Add the profile URLs under *Social profiles* — these render as links regardless
   of whether a feed is connected.
3. Under *Live updates*, enable the section and add items under *Curated updates*.
4. The platform ID fields are reserved for a later automatic feed integration:
   - **Facebook Page ID** — found under Page → About → Page transparency
   - **Instagram Business ID** — the account must be a Business or Creator account
     linked to that Facebook Page
   - **YouTube Channel ID** — the `UC…` id from the channel's advanced settings
5. When an automatic connector is implemented, set its server credentials in `.env`:
   ```
   YOUTUBE_API_KEY=
   FACEBOOK_PAGE_TOKEN=
   ```

## Token renewal

Meta long-lived Page tokens expire roughly every 60 days. If a Meta connector is
added later, token renewal and a curated fallback must be part of its operating
plan. The current site has no token-renewal dependency.
