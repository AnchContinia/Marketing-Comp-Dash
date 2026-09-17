#!/usr/bin/env node
/* Verifies a LinkedIn trawl CSV BEFORE it is wired into gen-linkedin-data.py.
 *
 *   node tools/verify-trawl.js "Assets/LinkedIn trawls/<file>.csv"
 *
 * Three captures taught this script what to look for:
 *   Sep 10/14  fine.
 *   Sep 16     45% of rows read 0/0/0 - the tool wrote 0 where it failed to
 *              read a counter, which cannot be told apart from a real zero.
 *              Rejected outright.
 *   Sep 17     numbers correct, but 31% of the posts were missing from inside
 *              each company's own date range, which halves posts/week.
 *
 * So it checks three separate things and says which one failed:
 *   TRUST     do the numbers match the live data on posts both have seen?
 *   PLAUSIBLE is the all-zero rate low enough to be real?
 *   COMPLETE  does it hold the posts the live data already knows about?
 *
 * Exit code 0 = PASS or WARN, 1 = REJECT. Nothing is written or changed. */

const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

/* ------------------------------------------------------------------ csv --- */
function parseCSV(text, delim) {
  const rows = []; let field = "", row = [], q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === delim) { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); field = ""; row = []; }
    else if (c !== "\r") field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter(r => r.length > 1 || (r.length === 1 && r[0].trim()));
}

/* Column names differ per capture tool. Map each shape onto one vocabulary. */
const DIALECTS = [
  { name: "sweep2", delim: ",", need: ["Company", "Post URL", "Post type"], map: {
      company: "Company", no: "Post #", date: "Date (UTC)",
      title: "Title (first line of post)", r: "Reactions", c: "Comments",
      rp: "Reposts", total: "Total engagement", type: "Post type",
      by: "Posted by", url: "Post URL", page: "Company page" } },
  { name: "trawl", delim: ",", need: ["company", "post_url", "type"], map: {
      company: "company", no: "post_no", date: "date", title: "title",
      r: "reactions", c: "comments", rp: "reposts", total: "total_engagement",
      type: "type", url: "post_url", page: "company_url" } },
  { name: "continia", delim: ";", need: ["Dato", "Titel", "Link"], map: {
      no: "#", date: "Dato", title: "Titel", r: "Reactions", c: "Comments",
      rp: "Reposts", total: "Total engagement", type: "Type", url: "Link" } },
];

function load(file) {
  const text = fs.readFileSync(file, "utf8").replace(/^﻿/, "");
  for (const d of DIALECTS) {
    const head = parseCSV(text.split("\n")[0] + "\n", d.delim)[0] || [];
    if (d.need.every(h => head.indexOf(h) >= 0)) {
      const rows = parseCSV(text, d.delim);
      const H = rows[0], ix = {};
      for (const k in d.map) ix[k] = H.indexOf(d.map[k]);
      const recs = rows.slice(1).filter(r => r.length >= H.length - 1).map(r => {
        const g = k => (ix[k] >= 0 && r[ix[k]] !== undefined ? String(r[ix[k]]).trim() : "");
        return { company: g("company") || "Continia Software", no: g("no"),
                 date: g("date").slice(0, 10), title: g("title"), r: g("r"),
                 c: g("c"), rp: g("rp"), total: g("total"), type: g("type"),
                 by: g("by"), url: g("url"), page: g("page") };
      });
      return { dialect: d.name, header: H, recs };
    }
  }
  return null;
}

/* KEEP lives in the generator - read it there so there is one source of truth. */
function readKeep() {
  const py = fs.readFileSync(
    path.join(ROOT, "Assets/LinkedIn trawls/gen-linkedin-data.py"), "utf8");
  const block = py.slice(py.indexOf("KEEP = collections.OrderedDict"), py.indexOf("OURS  ="));
  const map = {};
  block.replace(/\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)/g, (_, a, b) => { map[a] = b; return ""; });
  const drop = [];
  py.replace(/^#\s{3}(\S[^\n(]*?)\s*\(linkedin\.com\/company\/[^)]+\)/gm,
             (_, n) => { drop.push(n.trim()); return ""; });
  return { map, drop };
}

/* --------------------------------------------------------------- report --- */
const file = process.argv[2];
if (!file) { console.error("usage: node tools/verify-trawl.js <csv>"); process.exit(2); }
const abs = path.isAbsolute(file) ? file : path.join(ROOT, file);
const parsed = load(abs);
if (!parsed) { console.error("REJECT  unrecognised CSV shape - no dialect matched its headers."); process.exit(1); }

const { dialect, recs } = parsed;
const problems = [], warnings = [];
const say = (...a) => console.log(...a);

say("file      " + path.basename(abs));
say("dialect   " + dialect + "   rows " + recs.length);

/* ---- 1. structure -------------------------------------------------------- */
const companies = [...new Set(recs.map(r => r.company))];
const { map: KEEP, drop: DROP } = readKeep();
const unknown = companies.filter(c => !KEEP[c] && DROP.indexOf(c) < 0);
const dropped = companies.filter(c => DROP.indexOf(c) >= 0);
say("companies " + companies.length +
    (dropped.length ? "   (" + dropped.length + " intentionally excluded)" : ""));
if (unknown.length) problems.push(
  "unmapped company label(s) - add to KEEP or they are silently dropped: " + unknown.join(", "));

const badUrl = recs.filter(r => !/^https:\/\/www\.linkedin\.com\/feed\/update\//.test(r.url));
if (badUrl.length) problems.push(badUrl.length + " rows have no usable post permalink");
const seen = new Set(), dup = [];
recs.forEach(r => { if (seen.has(r.url)) dup.push(r.url); else seen.add(r.url); });
if (dup.length) problems.push(dup.length + " duplicate post URLs");
const badDate = recs.filter(r => !/^\d{4}-\d{2}-\d{2}$/.test(r.date));
if (badDate.length) problems.push(badDate.length + " rows have an unparseable date");

const num = s => (s === "" ? null : Number(s));
const mismatch = recs.filter(r => {
  const a = num(r.r), b = num(r.c), c = num(r.rp), t = num(r.total);
  return a !== null && b !== null && c !== null && t !== null && a + b + c !== t;
});
if (mismatch.length) problems.push(mismatch.length + " rows where reactions+comments+reposts != total");

/* ---- 2. plausible: blanks are fine, mass zeros are not ------------------- */
say("");
say("PLAUSIBLE");
const blank = recs.filter(r => r.r === "" || r.c === "" || r.rp === "").length;
const allZero = recs.filter(r => r.r === "0" && r.c === "0" && r.rp === "0").length;
const zPct = Math.round(allZero / recs.length * 100);
say("  blank counts (good - an unread number)   " + blank);
say("  rows reading 0 / 0 / 0                   " + allZero + "  (" + zPct + "%)");
if (zPct >= 25) problems.push(
  "all-zero rate " + zPct + "% - the Sep 16 capture failed this way: it wrote 0 where it " +
  "could not read a counter, which cannot be told apart from a real zero");
else if (zPct >= 10) warnings.push("all-zero rate " + zPct + "% is high - check the worst pages by hand");

const perCo = {};
recs.forEach(r => {
  const p = perCo[r.company] || (perCo[r.company] = { n: 0, z: 0 });
  p.n++; if (r.r === "0" && r.c === "0" && r.rp === "0") p.z++;
});
Object.keys(perCo).filter(k => perCo[k].z / perCo[k].n >= 0.5).forEach(k =>
  warnings.push(k + ": " + perCo[k].z + " of " + perCo[k].n + " posts read zero"));

/* ---- 3. trust + complete: compare against the live data ------------------ */
global.window = {};
eval(fs.readFileSync(path.join(ROOT, "linkedin-data.js"), "utf8"));
const LIVE = global.window.LI_DATA;
const liveByUrl = {}, liveByCo = {};
LIVE.companies.forEach(c => {
  liveByCo[c.name] = c;
  c.posts.forEach(p => { if (p.u) liveByUrl[p.u] = p; });
});

say("");
say("TRUST   (posts present in both this file and the live data)");
let matched = 0, identical = 0, higher = 0, lower = 0, collapsed = 0;
recs.forEach(r => {
  const o = liveByUrl[r.url]; if (!o) return;
  const a = num(r.r), b = num(r.c), c = num(r.rp);
  if (a === null || b === null || c === null) return;
  matched++;
  const nv = a + b + c, ov = o.r + o.c + o.rp;
  if (nv === ov) identical++;
  else if (nv > ov) higher++;
  else { lower++; if (nv === 0 && ov > 0) collapsed++; }
});
if (!matched) warnings.push("no overlapping posts with the live data - nothing to cross-check against");
else {
  const idPct = Math.round(identical / matched * 100);
  say("  matched " + matched + "   identical " + identical + " (" + idPct + "%)   higher " +
      higher + "   lower " + lower + "   collapsed to zero " + collapsed);
  if (collapsed >= matched * 0.05) problems.push(
    collapsed + " posts collapsed from a real number to zero - failed reads, not real drops");
  if (idPct < 50) warnings.push(
    "only " + idPct + "% of overlapping posts kept their old number - expected most to be unchanged");
}

say("");
say("COMPLETE   (posts the live data holds inside this file's own date range)");
let missAll = 0, hadAll = 0;
const rowsOut = [];
companies.forEach(co => {
  const label = KEEP[co]; if (!label) return;
  const live = liveByCo[label]; if (!live) return;
  const mine = recs.filter(r => r.company === co);
  const ds = mine.map(r => r.date).filter(Boolean).sort();
  if (!ds.length) return;
  const lo = ds[0], hi = ds[ds.length - 1];
  const have = new Set(mine.map(r => r.url));
  const inRange = live.posts.filter(p => p.d >= lo && p.d <= hi);
  const miss = inRange.filter(p => !have.has(p.u));
  missAll += miss.length; hadAll += inRange.length;
  if (miss.length) rowsOut.push([label, miss.length, inRange.length]);
});
if (!hadAll) say("  nothing to compare - these companies are new to the dashboard");
else {
  const pct = Math.round(missAll / hadAll * 100);
  say("  missing " + missAll + " of " + hadAll + " known posts  (" + pct + "%)");
  rowsOut.sort((a, b) => b[1] - a[1]).slice(0, 8).forEach(r =>
    say("    " + r[0].padEnd(22) + " missing " + r[1] + " of " + r[2]));
  if (pct >= 15) warnings.push(
    "capture is " + pct + "% incomplete - do NOT let it replace a company wholesale. The " +
    "generator unions post sets for exactly this reason; check posts/week after regenerating");
}

/* ---- verdict ------------------------------------------------------------- */
say("");
if (problems.length) {
  say("REJECT");
  problems.forEach(p => say("  - " + p));
  warnings.forEach(w => say("  ~ " + w));
  process.exit(1);
}
say(warnings.length ? "PASS with warnings" : "PASS");
warnings.forEach(w => say("  ~ " + w));
