/* Continia shared Event Calendar — Cloudflare Worker
   ----------------------------------------------------------------------
   Storage: a Workers KV namespace bound as  CAL_KV  (see README).
   One key, "events", holds a JSON array of event objects:
       { id, t, start, end, c }
   where t=title, start/end="YYYY-MM-DD", c="#rrggbb".

   JSON endpoints (all on "/"):
     GET     ->  { events: [...] }                 list all shared events
     POST    ->  body {t,start,end,c}   -> {event}  add (server assigns id)
     PUT     ->  body {id,t,start,end,c}-> {event}  update by id
     DELETE  ->  body {id}              -> {ok:true} remove by id

   Seed events (the official 2026 schedule) live baked into the site and are
   NOT stored here — this Worker only holds the events teammates add. */

const KEY = "events";

/* Permissive CORS: reflect whatever Origin the browser sends (live site, local
   server on any port, file:// → "null"), or "*" when there is none. Safe here
   because the calendar uses no cookies/credentials. */
function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}
function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "Content-Type": "application/json", ...cors(origin) }
  });
}

const clean  = (s, max) => String(s == null ? "" : s).slice(0, max || 200);
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(String(s || ""));
const isHex  = (s) => /^#[0-9a-fA-F]{6}$/.test(String(s || ""));

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    if (!env.CAL_KV) return json({ error: "KV namespace CAL_KV is not bound" }, 500, origin);

    // current shared list
    let events = [];
    try { const raw = await env.CAL_KV.get(KEY); if (raw) events = JSON.parse(raw); } catch (e) { events = []; }
    if (!Array.isArray(events)) events = [];

    try {
      if (request.method === "GET") {
        return json({ events }, 200, origin);
      }

      if (request.method === "POST") {
        const b = await request.json();
        const t = clean(b.t, 120).trim();
        if (!t) return json({ error: "Missing event name" }, 400, origin);
        if (!isDate(b.start)) return json({ error: "Invalid start date" }, 400, origin);
        let start = b.start, end = isDate(b.end) ? b.end : b.start;
        if (end < start) { const tmp = start; start = end; end = tmp; }
        const ev = {
          id: "s-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8),
          t, start, end,
          c: isHex(b.c) ? b.c : "#052975"
        };
        events.push(ev);
        await env.CAL_KV.put(KEY, JSON.stringify(events));
        return json({ event: ev }, 200, origin);
      }

      if (request.method === "PUT") {
        const b = await request.json();
        const idx = events.findIndex((e) => e.id === clean(b.id, 80));
        if (idx < 0) return json({ error: "Event not found" }, 404, origin);
        const t = clean(b.t, 120).trim();
        if (t) events[idx].t = t;
        if (isDate(b.start)) events[idx].start = b.start;
        if (isDate(b.end)) events[idx].end = b.end;
        if (events[idx].end < events[idx].start) {
          const tmp = events[idx].start; events[idx].start = events[idx].end; events[idx].end = tmp;
        }
        if (isHex(b.c)) events[idx].c = b.c;
        await env.CAL_KV.put(KEY, JSON.stringify(events));
        return json({ event: events[idx] }, 200, origin);
      }

      if (request.method === "DELETE") {
        const b = await request.json();
        const id = clean(b.id, 80);
        await env.CAL_KV.put(KEY, JSON.stringify(events.filter((e) => e.id !== id)));
        return json({ ok: true }, 200, origin);
      }

      return json({ error: "Method not allowed" }, 405, origin);
    } catch (e) {
      return json({ error: "Bad request: " + ((e && e.message) || e) }, 400, origin);
    }
  }
};
