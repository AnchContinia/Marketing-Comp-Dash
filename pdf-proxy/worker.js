/* =========================================================================
   PDF compression proxy — Cloudflare Worker (iLovePDF)
   -------------------------------------------------------------------------
   Why this exists: the dashboard is a static site (GitHub Pages). iLovePDF's
   API needs a key that must never live in public client code, and blocks
   direct browser calls (CORS). This Worker holds the key as a secret env var,
   runs iLovePDF's multi-step compress flow server-side, and returns the
   compressed PDF to the browser with the right CORS headers.

   iLovePDF auth uses your PROJECT PUBLIC KEY (project_public_...). It is read
   from env.ILOVEPDF_PUBLIC_KEY — NEVER hardcode it here.
   Set it with:  npx wrangler secret put ILOVEPDF_PUBLIC_KEY

   This is a SEPARATE Worker from tinyjpg-proxy — deploy steps are in README.md.
   ========================================================================= */

// Only these origins may use the proxy (prevents others burning your quota).
const ALLOWED_ORIGINS = [
  "https://anchcontinia.github.io", // GitHub Pages
  "http://localhost:4599",          // local preview
  "http://127.0.0.1:4599"
];

const MAX_BYTES = 50 * 1024 * 1024; // 50 MB per PDF
const COMPRESSION_LEVEL = "recommended"; // "low" | "recommended" | "extreme"

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
    if (!env.ILOVEPDF_PUBLIC_KEY) {
      return json({ error: "Server is missing ILOVEPDF_PUBLIC_KEY secret" }, 500, origin);
    }

    // Filename rides in an ASCII-only header URL-encoded by the browser
    // (so names with æøå/spaces/emoji don't make fetch throw). Decode it back.
    const rawFilename = request.headers.get("X-Filename") || "document.pdf";
    let filename = rawFilename;
    try { filename = decodeURIComponent(rawFilename); } catch (e) { /* keep raw if not %-encoded */ }
    const body = await request.arrayBuffer();
    if (!body || body.byteLength === 0) return json({ error: "No PDF data" }, 400, origin);
    if (body.byteLength > MAX_BYTES) return json({ error: "PDF too large (max 50 MB)" }, 413, origin);

    // 1) Authenticate with the public key to get a short-lived bearer token.
    const authRes = await fetch("https://api.ilovepdf.com/v1/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_key: env.ILOVEPDF_PUBLIC_KEY.trim() })
    });
    if (!authRes.ok) {
      const detail = await authRes.text();
      return json({ error: "iLovePDF auth failed", status: authRes.status, detail }, 502, origin);
    }
    const token = (await authRes.json()).token;
    if (!token) return json({ error: "No token from iLovePDF" }, 502, origin);
    const A = { Authorization: "Bearer " + token };

    // 2) Start a compress task — returns the processing server + task id.
    const startRes = await fetch("https://api.ilovepdf.com/v1/start/compress", { headers: A });
    if (!startRes.ok) return json({ error: "iLovePDF start failed", status: startRes.status }, 502, origin);
    const start = await startRes.json();
    const server = start.server, task = start.task;
    if (!server || !task) return json({ error: "iLovePDF start: missing server/task", detail: start }, 502, origin);
    const base = "https://" + server + "/v1";

    // 3) Upload the PDF bytes to that task.
    const fd = new FormData();
    fd.append("task", task);
    fd.append("file", new Blob([body], { type: "application/pdf" }), filename);
    const upRes = await fetch(base + "/upload", { method: "POST", headers: A, body: fd });
    if (!upRes.ok) {
      const detail = await upRes.text();
      return json({ error: "iLovePDF upload failed", status: upRes.status, detail }, 502, origin);
    }
    const server_filename = (await upRes.json()).server_filename;
    if (!server_filename) return json({ error: "iLovePDF upload: no server_filename" }, 502, origin);

    // 4) Process (compress).
    const procRes = await fetch(base + "/process", {
      method: "POST",
      headers: { ...A, "Content-Type": "application/json" },
      body: JSON.stringify({
        task,
        tool: "compress",
        compression_level: COMPRESSION_LEVEL,
        files: [{ server_filename, filename }]
      })
    });
    if (!procRes.ok) {
      const detail = await procRes.text();
      return json({ error: "iLovePDF process failed", status: procRes.status, detail }, 502, origin);
    }
    const proc = await procRes.json(); // { download_filename, filesize, output_filesize, status, ... }

    // 5) Download the compressed PDF.
    const dlRes = await fetch(base + "/download/" + task, { headers: A });
    if (!dlRes.ok) return json({ error: "iLovePDF download failed", status: dlRes.status }, 502, origin);
    const bytes = await dlRes.arrayBuffer();

    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "X-Input-Size": String(proc.filesize || body.byteLength),
        "X-Output-Size": String(proc.output_filesize || bytes.byteLength),
        ...cors(origin)
      }
    });
  }
};
