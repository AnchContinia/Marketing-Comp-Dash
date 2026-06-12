# SEO Scanner proxy (Cloudflare Worker)

The Content page's **SEO Scanner** needs to read the HTML of an arbitrary URL.
A browser can't do that directly (CORS), so this tiny Worker fetches the page
server-side and returns its HTML to the dashboard. **All SEO analysis happens
client-side** in `dashboard.js` — this Worker has no API key and no cost beyond
Cloudflare's free tier.

It is a **separate** Worker from `tinyjpg-proxy` and `pdf-proxy`.

## Deploy

From inside this folder:

```bash
cd seo-proxy
npx wrangler deploy
```

That's it — there is **no secret to set** (unlike the PDF/image proxies).

After it deploys, Wrangler prints the Worker URL, e.g.
`https://seo-proxy.<your-subdomain>.workers.dev`. Send that URL to Claude (or
paste it yourself) into **`var PROXY_SEO`** near the top of the SEO module in
[`../dashboard.js`](../dashboard.js), then bump the `dashboard.js?v=` cache-bust
on all three pages and push. Until `PROXY_SEO` is set, the module shows a
friendly "configure backend" note instead of running.

## Important: do NOT connect this Worker to Git

Deploy it **manually only**. If you connect it to a Cloudflare Git build, a repo
build can overwrite it with the wrong code — exactly what happened to
`pdf-proxy` (it ended up running the tinyjpg code and returned HTTP 500). Keep
this one manual.

## Allowed origins

The Worker only answers requests from the dashboard's origins (GitHub Pages +
local preview). Edit `ALLOWED_ORIGINS` in `worker.js` if the site moves to a new
domain.

## Notes / limits

- Returns at most ~3 MB of HTML per page.
- Fetches the **raw** HTML — JavaScript-rendered (SPA) content won't be visible.
  Upgrading to a rendered scan would need Cloudflare Browser Rendering.
- Has a light SSRF guard (refuses localhost / private IP ranges).
