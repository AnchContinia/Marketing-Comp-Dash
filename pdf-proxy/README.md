# PDF compression proxy (Cloudflare Worker)

A serverless proxy so the dashboard's **PDF compression** module can use
iLovePDF without exposing the API key. The key lives only as an encrypted
Cloudflare secret — never in this repo or in the browser.

This is a **separate Worker** from `tinyjpg-proxy` (which only does images).

## Why a proxy is needed
- The dashboard is a static site (GitHub Pages) — no backend.
- The iLovePDF key is secret; putting it in client code on a public repo would
  leak it.
- iLovePDF blocks direct browser calls (CORS). The Worker runs the
  auth → start → upload → process → download flow server-side and adds the
  CORS headers the browser needs.

## Get an iLovePDF key (free)
1. Sign up at <https://developer.ilovepdf.com/>.
2. Open your project — copy the **Project public key** (`project_public_...`).
   That single public key is all this Worker needs.

## Deploy (one time, ~5 min)

You'll need a free [Cloudflare](https://dash.cloudflare.com/sign-up) account.

```bash
cd pdf-proxy
npx wrangler login                          # opens the browser to authorize
npx wrangler secret put ILOVEPDF_PUBLIC_KEY # paste your project public key when prompted
npx wrangler deploy
```

`wrangler deploy` prints a URL like:

```
https://pdf-proxy.<your-subdomain>.workers.dev
```

## Final step
Send that URL to Claude (or paste it into `dashboard.js` where it says
`var PROXY_PDF = "";` in the PDF-compression module). The module then works live.

## Notes
- `ALLOWED_ORIGINS` in `worker.js` restricts who can use the proxy so others
  can't burn your iLovePDF quota. Update it if you switch to a custom domain.
- `COMPRESSION_LEVEL` in `worker.js` is `"recommended"` — change to `"low"` or
  `"extreme"` to trade quality for size.
- Rotate the key anytime from your iLovePDF account, then
  `npx wrangler secret put ILOVEPDF_PUBLIC_KEY` again.
