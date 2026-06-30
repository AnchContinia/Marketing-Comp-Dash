# Marketing Hub — data- & display-forbedringer

**Repo:** `AnchContinia/Marketing-Comp-Dash`
**Berørte filer:** `dashboard.js`, `index.html`, `content.html`
**Scope:** Tre selvstændige forbedringer af databehandling og visning. Sikkerhed/auth er bevidst holdt udenfor denne brief. Kan tages ét punkt ad gangen.

Generelt princip: tal og datoer der vises i UI'et skal **afledes fra datakilderne** (`data[]`, `window.LI_DATA`, `DASHBOARD_UPDATED`), ikke stå hardcodet i HTML hvor de kan drive ud af synk når registret opdateres månedligt.

---

## Punkt 1 — Hero/metrics-tal er hardcodede, ikke afledt

### Problem
Følgende tal står som fast tekst i HTML og vedligeholdes manuelt:

- `index.html` hero-pills: `Competitors: 23` (i `.meta`-blokken)
- `index.html` metrics: `23` (Tracked stakeholders, `#m-stakeholders`), `8` (M&A, `#m-mna`), `11` (BC-native, `#m-bcnative`)
- `content.html` hero-pills: `Competitors: 23` (samme `.meta`-blok)

Konkurrent-arrayet `const data = [ … ]` i `dashboard.js` (starter ca. linje 2) indeholder lige nu **23** entries, så tallet matcher tilfældigt. Men `countLabel` ("X visible") er allerede afledt fra de faktiske kort, mens hero/metrics ikke er. Når registret udvides (det er sket før: 17 → flere), driver de hardcodede tal lydløst fra virkeligheden.

### Ønsket ændring
- **Competitors / Tracked stakeholders:** afled tallet fra `data.length` ved load, og skriv det ind i hero-pillen og `#m-stakeholders` i både `index.html` og `content.html`. Giv evt. pill-tallet et `id` (fx `#competitorCount`) så JS kan sætte det.
- **BC-native (11) og M&A (8):** disse kan ikke afledes af den nuværende datastruktur (entries har `n, o, stance, sl, prox` + detaljefelter, men ingen BC-native- eller M&A-flag). Vælg én af:
  - **Foretrukket:** tilføj eksplicitte booleans pr. entry i `data[]` (fx `bc:true`, `mna:true`) og afled tallene som `data.filter(d=>d.bc).length` osv. Så er kortene selv kilden.
  - **Minimum:** flyt de to tal ud i navngivne konstanter øverst ved `data[]` med en kommentar, så de vedligeholdes ét sted i stedet for spredt i to HTML-filer.

### Acceptkriterier
1. Hvis en entry tilføjes/fjernes i `data[]`, opdateres Competitors- og Tracked stakeholders-tallet automatisk begge steder uden HTML-redigering.
2. BC-native- og M&A-tallene afledes af flags på `data[]` (foretrukket) eller stammer fra én navngiven konstant (minimum) — ikke længere fra fast HTML-tekst i to filer.

---

## Punkt 2 — LinkedIn-tabellen rangerer på total, ikke pr. post

### Problem
LinkedIn-tabellen (IIFE i `dashboard.js`, ca. linje 379–418) bygger rækker hvor `total = reactions + comments + reposts` summeret over de fangede posts, sorterer på `total` (`rows.sort((a,b)=>b.total-a.total)`), og skalerer baren på `total/scale`.

Men firmaerne har **ikke lige mange fangede posts** (AMC Banking 3, Qvalia 7, Stampli 8, Fidesic 9 vs. 10 for resten). Så ranglisten og baren belønner reelt bare dem der tilfældigvis havde 10 posts i exporten, ikke dem der engagerer bedst pr. post.

Pointen: `avg` (= `total/n`) **beregnes allerede** og vises i håndtag-linjen ("Ø X/post · N posts"), men bruges hverken til sortering eller bar.

### Ønsket ændring
- Sortér rækkerne efter `avg` (engagement pr. post) i stedet for `total`, og skalér baren på `avg` (med `scale = max(avg)`), så sammenligningen bliver per-post og dermed fair på tværs af ulige N.
- Behold `total` og `N` synlige i rækken (fx total som tal ved siden af baren), så man stadig kan se det rå volumen — det er konteksten der ikke må forsvinde.
- **Valgfrit:** markér firmaer med lavt N (fx N < 5) diskret som "lavt datagrundlag", da en enkelt viral post kan skævvride et lille gennemsnit.

### Acceptkriterier
1. Tabellens rækkefølge og bar-længder afspejler engagement **pr. post**, ikke summeret total.
2. `N` (antal posts) og det rå total er stadig synlige pr. række.
3. Continia-rækken (`ours`) fremhæves stadig korrekt.

> Note: samme N-skævhed gælder content-gap-modulets felt-total-sammenligning — den er dækket i den separate `content-gap-fixes.md` (punkt B, "gennemsnit-tilstand"). Hold løsningerne konsistente.

---

## Punkt 3 — Mindre data/display-rettelser

### 3a. Stale dato i LinkedIn-footnoten (content.html)
`content.html` har en hardcodet footnote (`#li-footnote`) med teksten "captured June 19, 2026", men `LI_DATA.captured` er `2026-06-29`. JS opdaterer kun `#li-asof`-hinten (ca. linje 377–378), ikke footnoten — så den viser en forkert dato.
**Fix:** afled footnotens dato fra `LI_DATA.captured` (genbrug den eksisterende `fmtDate`), så den følger datakilden ligesom hinten.

### 3b. No-JS / fallback-datoer er forældede
`DASHBOARD_UPDATED` (én kilde, ca. linje 1586 i `dashboard.js`) driver topbar og footer korrekt ved load. Men de statiske HTML-fallbacks viser stadig gamle datoer ("June 8, 2026") indtil JS kører. Harmløst for normale brugere, men giver forkerte screenshots fra browsere uden JS.
**Fix (valgfrit, lav prioritet):** sæt HTML-fallback-teksterne til samme værdi som `DASHBOARD_UPDATED`, eller efterlad dem tomme så der ikke vises en forkert dato før JS overtager.

### 3c. Autoplay-baggrundsvideoer respekterer ikke reduced-motion
Loopende baggrundsvideoer kører tre steder (login-hero + begge `.brief-bg`/`.cg-hero-bg` heroes). `prefers-reduced-motion` håndteres på login-kortets animation, men videoerne autoplayer uanset.
**Fix:** under `@media (prefers-reduced-motion: reduce)` — undlad autoplay og vis kun `poster`-billedet (fx via JS der fjerner `autoplay`/pauser, eller skjuler `<video>` og viser poster). Reducerer også båndbredde.

### Acceptkriterier
1. LinkedIn-footnotens dato matcher `LI_DATA.captured`.
2. (Hvis 3b laves) ingen forkert dato vises før JS kører.
3. Med reduced-motion slået til afspilles baggrundsvideoerne ikke; poster-billedet vises i stedet.

---

## Generelle noter

- Datafilerne opdateres månedligt via Social Blade-runbook — al klassificering/optælling skal forblive afledt fra `data[]` / `window.LI_DATA` / `window.YT_DATA`, aldrig hardcodet.
- Ingen regression i: konkurrent-filtrene, kalenderen (Cloudflare Worker/KV), content-gap-modulet, YouTube-tabellen eller billed-bankerne.
- Subdomænet `calender.anch-5c7.workers.dev` har en stavefejl ("calender") — kosmetisk, lad det ligge medmindre det alligevel skal røres.
