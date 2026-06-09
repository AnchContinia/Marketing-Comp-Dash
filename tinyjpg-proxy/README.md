# TinyJPG proxy (Cloudflare Worker)

A tiny serverless proxy so the dashboard's **Image compression** module can use
TinyJPG without exposing the API key. The key lives only as an encrypted
Cloudflare secret — never in this repo or in the browser.

## Why a proxy is needed
- The dashboard is a static site (GitHub Pages) — no backend.
- TinyJPG's API key is secret; putting it in client code on a public repo would
  leak it.
- TinyJPG's API blocks direct browser calls (CORS). The Worker calls it
  server-side and adds the CORS headers the browser needs.

## Deploy (one time, ~5 min)

You'll need a free [Cloudflare](https://dash.cloudflare.com/sign-up) account.

```bash
cd tinyjpg-proxy
npx wrangler login                 # opens the browser to authorize
npx wrangler secret put TINIFY_KEY # paste your TinyJPG key when prompted (stays in YOUR terminal)
npx wrangler deploy
```

`wrangler deploy` prints a URL like:

```
https://tinyjpg-proxy.<your-subdomain>.workers.dev
```

## Final step
Send that URL to Claude (or paste it into `index.html` where it says
`var PROXY = "";` in the Image-compression module). The module then works live.

## Notes
- `ALLOWED_ORIGINS` in `worker.js` restricts who can use the proxy so others
  can't burn your TinyJPG quota. Update it if you switch to a custom domain.
- Rotate the key anytime from your TinyJPG account, then
  `npx wrangler secret put TINIFY_KEY` again.
