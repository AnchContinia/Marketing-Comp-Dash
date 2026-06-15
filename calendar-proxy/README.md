# calendar-proxy

Cloudflare Worker that stores the **shared** events teammates add to the Content-page
Event Calendar, so everyone sees the same list (the official 2026 seed schedule stays
baked into the site and is not stored here).

Storage is a single **Workers KV** key (`events`) holding a JSON array.

## One-time setup (the part "Edit code" can't do)

Pasting `worker.js` is not enough — the Worker needs a KV namespace **bound as `CAL_KV`**.
In the Cloudflare dashboard:

1. **Workers & Pages → KV → Create a namespace** (e.g. `continia-calendar`).
2. Open the Worker → **Settings → Variables and Secrets → KV Namespace Bindings → Add binding**
   - Variable name: `CAL_KV`
   - KV namespace: the one you just made
3. **Settings → Domains & Routes** — note the `*.workers.dev` URL.
4. Go to **Edit code**, paste `worker.js`, **Deploy**.

## Rules (same as the other proxies)

- **Deploy manually.** Either via the dashboard *Edit code → Deploy*, or
  `wrangler deploy` from inside `calendar-proxy/` (set the namespace `id` in
  `wrangler.toml` first).
- **Do NOT connect this Worker to Git.** A Git-connected build deploys the repo-root
  `wrangler.toml` (tinyjpg-proxy) over whatever this Worker is named — the same trap that
  cost ~8 rounds on the SEO/PDF proxies.

## Health check

```
# list (empty array first time)
curl -H "Origin: https://anchcontinia.github.io" https://<your>.workers.dev
# add one
curl -X POST -H "Origin: https://anchcontinia.github.io" -H "Content-Type: application/json" \
  -d '{"t":"Test","start":"2026-07-01","end":"2026-07-01","c":"#052975"}' \
  https://<your>.workers.dev
```

A GET should return `{"events":[...]}`. If you get `KV namespace CAL_KV is not bound`,
the binding step above was skipped.
