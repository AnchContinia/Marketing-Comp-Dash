/* =========================================================================
   TinyJPG proxy — Cloudflare Worker
   -------------------------------------------------------------------------
   Why this exists: the dashboard is a static site (GitHub Pages) and TinyJPG's
   API (a) requires a SECRET key that must never live in public client code,
   and (b) blocks direct browser calls (CORS). This Worker holds the key as a
   secret env var and calls TinyJPG server-side, then returns the compressed
   image to the browser with the right CORS headers.

   The API key is read from env.TINIFY_KEY — NEVER hardcode it here.
   Set it with:  npx wrangler secret put TINIFY_KEY   (paste the key in YOUR
   terminal — it is stored encrypted by Cloudflare, not in this repo).

   Deploy steps are in README.md.
   ========================================================================= */

// Only these origins may use the proxy (prevents others burning your quota).
// Adjust if you move to a custom domain.
const ALLOWED_ORIGINS = [
  "https://anchcontinia.github.io", // GitHub Pages
  "http://localhost:4599",          // local preview
  "http://127.0.0.1:4599"
];

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB per image

function cors(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Filename",
    "Access-Control-Expose-Headers": "X-Input-Size, X-Output-Size, Content-Type",
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
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors(origin) });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, origin);
    }
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: "Forbidden origin" }, 403, origin);
    }
    if (!env.TINIFY_KEY) {
      return json({ error: "Server is missing TINIFY_KEY secret" }, 500, origin);
    }

    const body = await request.arrayBuffer();
    if (!body || body.byteLength === 0) return json({ error: "No image data" }, 400, origin);
    if (body.byteLength > MAX_BYTES) return json({ error: "Image too large (max 25 MB)" }, 413, origin);

    const auth = "Basic " + btoa("api:" + env.TINIFY_KEY);

    // 1) Ask TinyJPG to shrink the upload.
    const shrink = await fetch("https://api.tinify.com/shrink", {
      method: "POST",
      headers: { Authorization: auth },
      body
    });
    if (!shrink.ok) {
      const detail = await shrink.text();
      return json({ error: "TinyJPG shrink failed", status: shrink.status, detail }, 502, origin);
    }
    const result = await shrink.json(); // { input:{size,type}, output:{size,type,url,...} }
    const outUrl = result && result.output && result.output.url;
    if (!outUrl) return json({ error: "No output URL from TinyJPG", detail: result }, 502, origin);

    // 2) Download the compressed bytes from the result URL.
    const out = await fetch(outUrl, { headers: { Authorization: auth } });
    if (!out.ok) return json({ error: "Failed to fetch compressed image" }, 502, origin);
    const bytes = await out.arrayBuffer();

    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": (result.output && result.output.type) || "application/octet-stream",
        "X-Input-Size": String(result.input ? result.input.size : body.byteLength),
        "X-Output-Size": String(result.output ? result.output.size : bytes.byteLength),
        ...cors(origin)
      }
    });
  }
};
