/* =========================================================================
   SEO Scanner proxy — Cloudflare Worker
   -------------------------------------------------------------------------
   Why this exists: the dashboard is a static site (GitHub Pages). A browser
   can't fetch an arbitrary third-party URL (CORS blocks it), so the SEO
   Scanner can't read a page's HTML directly. This Worker fetches the target
   URL server-side and returns its HTML (+ a little metadata) to the page with
   the right CORS headers. ALL SEO analysis happens client-side in dashboard.js
   — this Worker is "dumb" on purpose: no API key, no cost beyond Cloudflare's
   free tier.

   This is a SEPARATE Worker from tinyjpg-proxy and pdf-proxy. Deploy it
   manually (see README.md) and DO NOT connect it to Git, or a repo build can
   overwrite it with the wrong code (that happened to pdf-proxy).
   ========================================================================= */

// Only these origins may use the proxy (prevents others using it as an open relay).
const ALLOWED_ORIGINS = [
  "https://anchcontinia.github.io", // GitHub Pages
  "http://localhost:4599",          // local preview
  "http://127.0.0.1:4599"
];

const MAX_HTML = 3 * 1024 * 1024; // return at most ~3 MB of HTML

function cors(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}
function json(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors(origin) }
  });
}

export default {
  async fetch(request) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);
    if (origin && !ALLOWED_ORIGINS.includes(origin)) return json({ error: "Forbidden origin" }, 403, origin);

    let url;
    try { url = ((await request.json()).url || "").trim(); }
    catch (e) { return json({ error: "Invalid JSON body" }, 400, origin); }
    if (!/^https?:\/\//i.test(url)) return json({ error: "URL must start with http:// or https://" }, 400, origin);

    let target;
    try { target = new URL(url); }
    catch (e) { return json({ error: "Invalid URL" }, 400, origin); }

    // Light SSRF guard: refuse internal / loopback / link-local addresses.
    const host = target.hostname.toLowerCase();
    if (
      host === "localhost" || host === "::1" ||
      /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) || /^0\./.test(host) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host) ||
      host.endsWith(".local") || host.endsWith(".internal")
    ) {
      return json({ error: "Refused to fetch internal/local address" }, 400, origin);
    }

    let res;
    try {
      res = await fetch(target.toString(), {
        method: "GET",
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; ContiniaSEOAudit/1.0; +https://anchcontinia.github.io)",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en,da;q=0.8"
        }
      });
    } catch (e) {
      return json({ error: "Could not fetch URL: " + (e && e.message ? e.message : "network error") }, 502, origin);
    }

    const contentType = res.headers.get("content-type") || "";
    let html = "";
    try { html = await res.text(); } catch (e) { html = ""; }
    if (html.length > MAX_HTML) html = html.slice(0, MAX_HTML);

    return new Response(JSON.stringify({
      finalUrl: res.url || target.toString(),
      status: res.status,
      contentType,
      robots: res.headers.get("x-robots-tag") || "",
      html
    }), { status: 200, headers: { "Content-Type": "application/json", ...cors(origin) } });
  }
};
