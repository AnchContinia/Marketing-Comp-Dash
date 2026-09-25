/* Continia Motion Library — gallery.
   Reads library.json, renders one card per entry, and fetches each entry's
   own files for the code panel so the panel can never drift from what ships.
   Vanilla only: the hub has no build step and no framework. */
(function () {
  "use strict";

  var grid = document.getElementById("ml-grid");
  if (!grid) return;

  /* library.json and each component module are fetched, not <script>-linked, so
     they need the same ?v= cache-busting every other file here gets. */
  var MLV = "20260925c";

  var countEl = document.getElementById("ml-count"),
      barEl   = document.getElementById("ml-bar"),
      root    = document.documentElement;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;");
  }

  /* ---------- reduced-motion toggle ----------
     Mirrors the token file's contract: data-motion="reduced" collapses
     durations and distances, "full" opts back in even when the OS asks for
     less. Starts from whatever the OS says so the first paint is honest. */
  var osReduced = false;
  try { osReduced = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  var rmBox = document.getElementById("ml-rm-toggle");
  if (rmBox) {
    rmBox.checked = osReduced;
    root.setAttribute("data-motion", osReduced ? "reduced" : "full");
    rmBox.addEventListener("change", function () {
      root.setAttribute("data-motion", rmBox.checked ? "reduced" : "full");
      replayAll();
    });
  }

  /* ---------- filters ---------- */
  var filters = { source: "all", category: "all", class: "all" };

  function buildFilters(entries) {
    var sets = { source: {}, category: {}, class: {} };
    entries.forEach(function (e) {
      sets.source[e.source] = 1; sets.category[e.category] = 1; sets["class"][e["class"]] = 1;
    });
    var html = "";
    [["source", "Source"], ["category", "Category"], ["class", "Type"]].forEach(function (p) {
      var key = p[0];
      var vals = Object.keys(sets[key]).sort();
      if (vals.length < 2) return;            /* a filter with one option filters nothing */
      html += '<div class="ml-fset"><span class="ck-lbl">' + p[1] + "</span>" +
              '<button type="button" class="ml-f on" data-k="' + key + '" data-v="all">All</button>' +
              vals.map(function (v) {
                return '<button type="button" class="ml-f" data-k="' + key + '" data-v="' +
                       esc(v) + '">' + esc(v) + "</button>";
              }).join("") + "</div>";
    });
    html += '<label class="ml-toggle" for="ml-rm-toggle">' +
            '<input type="checkbox" id="ml-rm-toggle">Reduced motion</label>';
    barEl.innerHTML = html;

    /* the checkbox is rebuilt here, so wire it after the fact */
    var box = document.getElementById("ml-rm-toggle");
    box.checked = osReduced;
    root.setAttribute("data-motion", osReduced ? "reduced" : "full");
    box.addEventListener("change", function () {
      root.setAttribute("data-motion", box.checked ? "reduced" : "full");
      replayAll();
    });

    barEl.addEventListener("click", function (e) {
      var b = e.target.closest(".ml-f");
      if (!b) return;
      var k = b.getAttribute("data-k");
      filters[k] = b.getAttribute("data-v");
      [].forEach.call(barEl.querySelectorAll('.ml-f[data-k="' + k + '"]'), function (x) {
        x.classList.toggle("on", x === b);
      });
      apply();
    });
  }

  function apply() {
    var shown = 0;
    [].forEach.call(grid.children, function (card) {
      var ok = (filters.source === "all" || card.dataset.source === filters.source) &&
               (filters.category === "all" || card.dataset.category === filters.category) &&
               (filters["class"] === "all" || card.dataset.cls === filters["class"]);
      card.classList.toggle("hide", !ok);
      if (ok) shown++;
    });
    /* "entries", not "animations" — a component card is in here too */
    countEl.textContent = shown + (shown === 1 ? " entry" : " entries");
  }

  /* ---------- previews ----------
     Replay re-applies the class after a forced reflow; that is the only
     reliable way to restart a CSS animation on the same element. */
  function replay(stage) {
    var el = stage.querySelector("[data-anim]");
    if (!el) return;
    var cls = el.getAttribute("data-anim");
    el.classList.remove(cls);
    void el.offsetWidth;                       /* forced reflow — restarts the animation */
    el.classList.add(cls);
  }
  function replayAll() {
    [].forEach.call(grid.querySelectorAll(".ml-stage"), function (s) {
      if (!s.closest(".ml-card").classList.contains("hide")) replay(s);
    });
  }

  /* Components: the button drives the module's own pause, and the icon is read
     back off it so the two can never disagree. */
  function reelOf(card) {
    var m = card.querySelector("[data-ml]");
    return m && m.__mlReel ? m.__mlReel : null;
  }
  function syncToggle(card) {
    var b = card.querySelector(".ml-toggle"), reel = reelOf(card);
    if (!b || !reel) return;
    var paused = reel.isPaused();
    b.innerHTML = '<i class="fa-light fa-' + (paused ? "play" : "pause") + '" aria-hidden="true"></i>';
    b.setAttribute("aria-label", (paused ? "Play " : "Pause ") +
                   card.querySelector(".ml-name").textContent);
  }

  /* ---------- cards ---------- */
  function card(e) {
    var badges =
      '<span class="ml-b src-' + esc(e.source) + '">' +
        esc(e.source === "continia" ? "Continia" : "React Bits") + "</span>" +
      '<span class="ml-b">' + esc(e["class"]) + "</span>" +
      '<span class="ml-b">' + esc(e.category) + "</span>";
    var toks = (e.tokens || []).map(function (t) {
      return '<span class="ml-tok">' + esc(t) + "</span>";
    }).join("");

    return '<article class="ml-card" data-slug="' + esc(e.slug) + '" data-source="' + esc(e.source) +
           '" data-category="' + esc(e.category) + '" data-cls="' + esc(e["class"]) + '">' +
      '<div class="ml-stage">' +
        /* a component runs its own JS: nothing to restart, so it gets a
           play/pause toggle where an animation gets replay */
        (e.kind === "component"
          ? '<button type="button" class="ml-replay ml-toggle" aria-label="Pause ' + esc(e.name) + '">' +
            '<i class="fa-light fa-pause" aria-hidden="true"></i></button>'
          : '<button type="button" class="ml-replay" aria-label="Replay ' + esc(e.name) + '">' +
            '<i class="fa-light fa-rotate-right" aria-hidden="true"></i></button>') +
        /* a component mounts itself onto data-ml; an animation is a class */
        (e.kind === "component"
          ? '<div data-ml="' + esc(e.slug) + '">' + (e.demo || "") + "</div>"
          : '<div class="ml-' + esc(e.slug) + '" data-anim="ml-' + esc(e.slug) + '">' + (e.demo || "") + "</div>") +
      "</div>" +
      '<div class="ml-head"><div class="ml-name">' + esc(e.name) + "</div>" +
        '<div class="ml-badges">' + badges + "</div></div>" +
      '<p class="ml-blurb">' + esc(e.blurb || "") + "</p>" +
      '<div class="ml-toks">' + toks + "</div>" +
      '<div class="ml-rm"><b>Reduced motion</b>' + esc(e.reducedMotion || "") + "</div>" +
      '<div class="ml-foot"><div class="ml-code">' +
        '<div class="ml-tabs"></div><div class="ml-panes"></div>' +
      "</div></div></article>";
  }

  /* ---------- code panel ----------
     Each pane is fetched from the entry's real file. If a fetch fails (opened
     over file://, say) the pane says so rather than showing a stale copy. */
  function loadCode(cardEl, e) {
    var tabsEl = cardEl.querySelector(".ml-tabs"),
        panesEl = cardEl.querySelector(".ml-panes"),
        files = [["HTML", "entries/" + e.slug + "/" + e.slug + ".html"],
                 ["CSS",  "entries/" + e.slug + "/" + e.slug + ".css"]];
    if (e["class"] !== "css") files.push(["JS", "entries/" + e.slug + "/" + e.slug + ".js"]);

    files.forEach(function (f, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "ml-tab" + (i === 0 ? " on" : ""); b.textContent = f[0];
      tabsEl.appendChild(b);

      var pane = document.createElement("div");
      pane.className = "ml-pane" + (i === 0 ? " on" : "");
      pane.innerHTML = '<button type="button" class="ml-copy">Copy</button><pre>Loading…</pre>';
      panesEl.appendChild(pane);

      fetch(f[1]).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      }).then(function (t) {
        pane.querySelector("pre").textContent = t.replace(/\s+$/, "");
      }).catch(function () {
        pane.querySelector("pre").textContent =
          "Could not read " + f[1] + " — serve the folder over http (python3 -m http.server).";
      });

      b.addEventListener("click", function () {
        [].forEach.call(tabsEl.children, function (x) { x.classList.toggle("on", x === b); });
        [].forEach.call(panesEl.children, function (x, j) { x.classList.toggle("on", j === i); });
      });
      pane.querySelector(".ml-copy").addEventListener("click", function () {
        var btn = this, text = pane.querySelector("pre").textContent;
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = "Copied"; btn.classList.add("done");
          setTimeout(function () { btn.textContent = "Copy"; btn.classList.remove("done"); }, 1400);
        }).catch(function () { btn.textContent = "Press ⌘C"; });
      });
    });
  }

  /* ---------- boot ---------- */
  fetch("library.json?v=" + MLV).then(function (r) {
    if (!r.ok) throw new Error("library.json " + r.status);
    return r.json();
  }).then(function (entries) {
    grid.innerHTML = entries.map(card).join("");
    buildFilters(entries);
    apply();

    grid.addEventListener("click", function (e) {
      var t = e.target.closest(".ml-toggle");
      if (t) {
        var card = t.closest(".ml-card"), reel = reelOf(card);
        if (reel) { reel.toggle(); syncToggle(card); }
        return;
      }
      var b = e.target.closest(".ml-replay");
      if (b) replay(b.closest(".ml-stage"));
    });

    /* Previews start paused and run when scrolled into view, so twelve
       animations do not all fire at once behind the fold. */
    var cards = [].slice.call(grid.children);
    cards.forEach(function (c, i) {
      var el = c.querySelector("[data-anim]");
      /* A component runs its own JS; ml-paused would do nothing to it, and the
         replay button has no class to toggle, so neither is wired up. */
      if (el && entries[i].kind !== "component") el.classList.add("ml-paused");
      if (entries[i].kind === "component") c.classList.add("is-component");
      loadCode(c, entries[i]);
    });

    /* Component entries are ES modules that mount themselves onto
       [data-ml="<slug>"]. Import each one once, after the cards exist. A
       failure is reported on the card rather than left as an empty stage. */
    entries.filter(function (e) { return e.kind === "component"; }).forEach(function (e) {
      import("./entries/" + e.slug + "/" + e.slug + ".js?v=" + MLV).then(function (m) {
        if (m.mountAll) m.mountAll(grid);
        [].forEach.call(grid.querySelectorAll(".ml-card.is-component"), syncToggle);
      }).catch(function (err) {
        var stage = grid.querySelector('.ml-card[data-slug="' + e.slug + '"] .ml-stage');
        if (stage) stage.innerHTML = '<p class="ml-blurb">Could not load ' + esc(e.slug) +
          ".js (" + esc(err.message) + ") — serve the folder over http.</p>";
      });
    });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (x) {
          if (!x.isIntersecting) return;
          var a = x.target.querySelector("[data-anim]");
          if (a) a.classList.remove("ml-paused");
          io.unobserve(x.target);
        });
      }, { threshold: 0.25 });
      cards.forEach(function (c) { io.observe(c); });
    } else {
      cards.forEach(function (c) {
        var a = c.querySelector("[data-anim]");
        if (a) a.classList.remove("ml-paused");
      });
    }
  }).catch(function (err) {
    grid.innerHTML = '<p class="ml-blurb">Could not load library.json (' + esc(err.message) +
      '). Serve the folder over http — <code>python3 -m http.server</code> — rather than opening the file directly.</p>';
    countEl.textContent = "";
  });
})();
