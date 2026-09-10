#!/usr/bin/env node
/* =========================================================================
   Regenerates the five flat CSVs at repo root from the two append-only
   histories. Run it after every archive prepend / YouTube refresh:

       node tools/export-archive-csv.js

   Sources (deliberately two, they are separate histories):
     archive.js      -> window.DASH_ARCHIVE.snapshots  (events, competitor cards,
                        LinkedIn posts as they stood on each snapshot date)
     youtube-data.js -> window.YT_DATA.snapshots (Social Blade channel time
                        series) and window.YT_DATA.continiaUploads.snapshots
                        (vidIQ upload cadence)

   Nothing on the live site reads these CSVs; they exist for Excel analysis.

   Two things worth knowing before editing:
   - Snapshot dates are NOT unique. A day with two data refreshes carries two
     layers (see the archive's same-date rule), so every archive CSV also
     carries snapshot_index (0 = newest layer) to keep rows addressable.
   - Card and event text contains HTML (<b>, <i>) and is stripped here.
   ========================================================================= */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
function load(file, global_) {
  const w = {};
  global.window = w;
  delete require.cache[require.resolve(path.join(ROOT, file))];
  require(path.join(ROOT, file));
  if (!w[global_]) throw new Error(file + " did not define window." + global_);
  return w[global_];
}

const strip = s => String(s == null ? "" : s).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const cell = v => {
  const s = String(v == null ? "" : v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
function write(file, header, rows) {
  const out = [header.join(",")].concat(rows.map(r => r.map(cell).join(","))).join("\n") + "\n";
  fs.writeFileSync(path.join(ROOT, file), out);
  console.log(file.padEnd(38), rows.length, "rows");
}

const AR = load("archive.js", "DASH_ARCHIVE");
const snaps = AR.snapshots || [];

/* ---- events ---- */
const events = [];
snaps.forEach((s, i) => (s.news && s.news.events || []).forEach(e =>
  events.push([s.date, i, e.w, e.c, strip(e.t)])));
write("archive-events.csv", ["snapshot_date","snapshot_index","event_date","category","text"], events);

/* ---- competitor cards ---- */
const comps = [];
snaps.forEach((s, i) => (s.competitors || []).forEach(c =>
  comps.push([s.date, i, c.n, c.o, c.stance, c.sl, c.prox, c.cat,
    strip(c.head), strip(c.rel), strip(c.str), strip(c.pos), strip(c.ai), c.sc,
    c.web || "",
    (c.s || []).map(x => x[0] + " (" + x[1] + ")").join("; ")])));
write("archive-competitors.csv",
  ["snapshot_date","snapshot_index","name","owner","stance","short_label","proximity","category",
   "headline","release","strategy","positioning","ai","scale","website","sources"], comps);

/* ---- LinkedIn posts ---- */
const li = [];
snaps.forEach((s, i) => {
  const L = s.linkedin || {};
  (L.companies || []).forEach(co => (co.posts || []).forEach(p =>
    li.push([s.date, i, L.captured || "", co.name, co.ours ? "yes" : "no",
      co.bench ? "yes" : "no", p.t, p.ty, p.r || 0, p.c || 0, p.rp || 0,
      p.d || "", p.u || ""])));
});
write("archive-linkedin-posts.csv",
  ["snapshot_date","snapshot_index","captured","company","ours","benchmark","title","type",
   "reactions","comments","reposts","post_date","post_url"], li);

/* ---- YouTube: Social Blade channel series ---- */
const YT = load("youtube-data.js", "YT_DATA");
const byName = {};
(YT.channels || []).forEach(ch => (byName[ch.name] = ch));
const ytRows = [];
(YT.snapshots || []).forEach(s => Object.keys(s.stats || {}).forEach(name => {
  const st = s.stats[name], ch = byName[name] || {};
  ytRows.push([s.date, name, ch.handle || "", ch.ours ? "yes" : "no", st.subs || "",
    st.monthlyViews == null ? "" : st.monthlyViews, st.monthlyViewsLabel || "",
    st.monthlySubs || "", st.earnings || "", st.flag || ""]);
}));
write("archive-youtube-channels.csv",
  ["snapshot_date","channel","handle","ours","subs","monthly_views","monthly_views_label",
   "monthly_subs","earnings","flag"], ytRows);

/* ---- YouTube: Continia upload cadence (vidIQ) ---- */
const upRows = [];
((YT.continiaUploads || {}).snapshots || []).forEach(s => {
  const per = s.periods || {};
  Object.keys(per).forEach(k => {
    const lf = per[k].longForm || {}, sh = per[k].shorts || {};
    upRows.push([s.date, k,
      lf.uploads == null ? "" : lf.uploads, lf.views == null ? "" : lf.views,
      sh.uploads == null ? "" : sh.uploads, sh.views == null ? "" : sh.views]);
  });
});
write("archive-youtube-continia-uploads.csv",
  ["snapshot_date","period","longform_uploads","longform_views","shorts_uploads","shorts_views"], upRows);
