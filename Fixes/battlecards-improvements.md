# Battlecards-modul — data- & modulforbedringer

**Repo:** `AnchContinia/Marketing-Comp-Dash`
**Berørt fil:** `dashboard.js` (battlecards-IIFE, ca. linje 932–1041). Faktuel halvdel trækkes live fra `const data = [ … ]` (ca. linje 2+). Mountes i `index.html` på `#battlecards` → `<div id="bc-body">`.
**Scope:** Forbedre den taktiske data-dækning og selve modulets brugbarhed for salg. Kan tages punkt for punkt; Prioritet 1 er klart vigtigst.

Arkitektur-note: modulets to-lags-design er sundt og bevares — den faktuelle halvdel (positionering, proximity, AI-stance, skala) afledes live fra `data[]` så den ikke driver, og den taktiske halvdel (`BATTLE`-mappet, ca. L956) er en redigerbar seed. Denne brief tilføjer data til det eksisterende design; den laver ikke om på arkitekturen.

---

## Sådan virker det i dag (kontekst)

- `data[]`: 23 konkurrenter med felter n, o, stance, sl, prox, cat, head, rel, str, pos, ai, sc, s.
- `CONTINIA` (L946): hardcodet fast profil = venstre side i hver head-to-head.
- `BATTLE` (L956): taktisk seed pr. konkurrent — `win[]`, `watch[]`, `obj[[q,a]]`. Dækker 9.
- `AGNOSTIC` (L979–980): 8 konkurrenter deler ÉN generisk `win`-linje.
- `tacticalFor()` (L982): returnerer BATTLE[navn] → ellers AGNOSTIC-generisk → ellers `null`.
- `null` → kortet viser udvikler-beskeden "Tactical layer not written yet…" (L1032).
- Comparator (`renderCmp` L1009): viser 4 dimensioner + "Where Continia wins" — men IKKE watch/obj.
- ROSTER sorteres på proximity (High→Medium→Low), derefter navn.

---

## PRIORITET 1 — Taktisk dækning er omvendt af trusselsniveauet

### Problem
6 konkurrenter har intet taktisk lag og render udvikler-beskeden til salg. **5 af dem er High-proximity BC-native rivaler:**

| Konkurrent | prox | kategori |
|---|---|---|
| Dime Scheduler | High | Visual resource/project planning · BC |
| Lasernet | High | Document output & e-invoicing · BC + F&O |
| AMC Banking | High | Bank integration & payments · BC + F&O |
| B2Brouter | High | Peppol / e-invoicing access point · BC |
| Qvalia | High | Peppol e-invoicing & order management · BC |
| Acubiz | Medium | Expense management · certified BC integration |

Samtidig har alle 8 `AGNOSTIC`-spillere (som fik en taktisk linje) **Low proximity** — undtagen Yooz (Medium). Dvs. de mindst truende ERP-agnostiske spillere er dækket, mens de rivaler der reelt dukker op i en BC-handel ikke er. Dette er den vigtigste rettelse.

### Ønsket ændring
Tilføj `BATTLE`-entries for de 6. Nedenfor er **færdige seeds** at indsætte i `BATTLE`-mappet (ca. L978, før den afsluttende `}`) — grounded i hver rivals faktuelle profil i `data[]`. Markér tydeligt at de skal forfines med salg.

```js
    "Dime Scheduler":{win:["Adjacent, not head-on: Dime Scheduler is visual resource/project scheduling — Continia is the finance-automation suite. They rarely displace each other; more often they coexist in the same BC tenant.","When a BC customer needs AP/expense/e-invoicing, Dime Scheduler doesn't play there — Continia owns that flow."],
      watch:["Not a real finance-automation competitor. Consider a lighter 'adjacent' card, or drop from the battlecard roster and keep only in the competitor registry."]},
    "Lasernet":{win:["Lasernet (Formpipe) is a document-output specialist; Continia Document Output sits inside a full BC finance suite (AP capture + expense + e-invoicing + banking) — one vendor for the whole flow.","E-invoicing is embedded in the BC document flow, not a separate output engine to configure and maintain."],
      watch:["Deep, established output/formatting engine across BC + F&O — don't fight on raw output flexibility; win on suite breadth and BC-native embedding."],
      obj:[["“Lasernet handles all our document output already.”","For pure output, it's strong. But Continia covers capture-to-payment plus output in one embedded BC stack — fewer moving parts and vendors."]]},
    "AMC Banking":{win:["AMC Banking is a bank-format/payments specialist; Continia Banking + Payment Management sit inside the full AP/expense/e-invoicing suite — the payment step isn't a bolt-on.","One BC-native vendor for capture, approval, payment and reconciliation instead of a format layer alongside a separate AP tool."],
      watch:["130+ country bank formats is a genuine depth story — win on the integrated end-to-end flow, not on format count."],
      obj:[["“AMC has more bank formats.”","True on breadth of formats. In a BC shop the value is the connected flow — invoice to approval to payment to reconciliation — which Continia delivers natively without stitching tools together.”"]]},
    "Acubiz":{win:["Acubiz is a certified BC integration — an external expense platform connected to BC. Continia Expense Management is built INSIDE Business Central: no separate portal, no sync layer.","Expense is one module in Continia's full finance-automation suite; with Acubiz it's a standalone platform to run and integrate."],
      watch:["Nordic-established in expense management — differentiate on native embedding and suite breadth, not on 'we do expense too'."],
      obj:[["“Acubiz is a dedicated expense specialist.”","And Continia's expense is embedded in BC and part of one suite — same finance data, same UI, no separate platform to maintain or reconcile.”"]]},
    "B2Brouter":{win:["B2Brouter is an e-invoicing access point / Peppol connector; Continia delivers compliant e-invoicing inside the BC document flow — no separate portal or network account to manage.","One BC-native stack covers AP capture, e-invoicing and banking; B2Brouter covers the network hop only."],
      watch:["Strong on Peppol reach and Spain/France mandate coverage — for BC customers, win on embedded workflow and lower integration overhead."],
      obj:[["“B2Brouter already connects us to Peppol.”","For BC customers Continia embeds compliant e-invoicing in the workflow they already use — the network is handled without bolting on a separate access point.”"]]},
    "Qvalia":{win:["Qvalia focuses on e-invoicing + line-item/spend data; Continia embeds e-invoicing in the full AP/finance flow inside BC — capture, approval, payment and compliance in one place.","No separate platform alongside BC to run for the network + analytics layer."],
      watch:["Line-item data automation is their distinctive angle — win on suite breadth and BC-native embedding rather than pure e-invoicing feature-by-feature."]}
```

> **Dime Scheduler-note til beslutning:** det er reelt ikke en finance-automation-konkurrent (visual scheduling). Overvej enten et let "adjacent"-kort som ovenfor, ELLER at fjerne den fra battlecard-rosteren og kun beholde den i konkurrent-registeret. Bed en beslutning her frem for at antage.

### Acceptkriterie
Ingen konkurrent i battlecards viser længere udvikler-beskeden "Tactical layer not written yet". Alle High/Medium-prox har mindst `win` + `watch`.

---

## PRIORITET 2 — Differentier den generiske AGNOSTIC-linje

### Problem
8 konkurrenter (L979–980) deler præcis samme `win`-sætning. Det er svag sales enablement — hver US-spiller får identisk tekst.

### Ønsket ændring
Erstat den enkelte `AGNOSTIC_WIN`-streng med en **map** af skræddersyede one-liners (behold generisk fallback). Forslag som seed:

```js
  var AGNOSTIC_WIN={
    "Tipalti":"Tipalti leads on global mass-payments (196 countries) — but it's ERP-agnostic and not BC-native. Win on embedded BC AP + the full finance flow, not just payouts.",
    "Stampli":"Stampli is collaboration-first, US mid-market, ERP-agnostic. Win on native BC embedding and European/global e-invoicing compliance it doesn't own.",
    "AvidXchange":"AvidXchange is payments-first and now Corpay/TPG-owned — a fair roadmap-risk angle. It's not BC-native; win on embedded BC AP and vendor neutrality.",
    "MineralTree":"MineralTree (Global Payments-owned) is US AP+payments, ERP-agnostic. Win on BC-native embedding and one-vendor finance flow.",
    "onPhase":"onPhase (ex-DocuPhase) is AP + document management, ERP-agnostic. Win on native BC embedding vs. a bolt-on connected to BC.",
    "Yooz":"Yooz is multi-ERP AP with 250+ integrations — broad but shallow per ERP. Win on purpose-built BC depth, not a generic connector.",
    "Compleat":"Compleat is P2P + online buying, UK-centric, ERP-agnostic. Win on native BC embedding and the full finance-automation scope.",
    "Tungsten Automation":"Tungsten (ex-Kofax) is IDP/RPA + AP — heavy platform, not BC-native. Win on lightweight, embedded BC automation with faster time-to-value."
  };
```
`tacticalFor()` opdateres til at slå navnet op i mappet (fallback til den nuværende generiske linje hvis mangler).

---

## PRIORITET 3 — Udvid objection handling

Objection handling er den mest salgsværdifulde del, men kun 5 af 23 har `obj[]`. Udvid til mindst alle High-prox (seeds ovenfor tilføjer allerede obj til Lasernet, AMC Banking, Acubiz, B2Brouter). Mål: hver High-prox konkurrent har mindst én [indvending, svar].

---

## PRIORITET 4 — Holdbarhed: review-dato + kilder på taktik

### Problem
`data[]` har `s:`-kildelinks, men `BATTLE`-mappet har hverken kilder eller dato. Tidsfølsomme vinkler ældes usynligt — fx hviler Rillion-kortet helt på "PaletteArena EOL 2026-09-30", som er dødt om ~3 måneder.

### Ønsket ændring
- Tilføj `reviewed:"2026-06"` (og evt. `src:[[label,url]]`) pr. `BATTLE`-entry.
- I kort-render (ca. L1028–1033): vis en diskret "reviewed <måned>"-linje, og flag kort visuelt (fx gul prik) hvis `reviewed` er ældre end fx 4 måneder.

---

## PRIORITET 5 — CONTINIA-profil: wire rigtige review-tal ind

`CONTINIA` (L946) er hardcodet og indeholder en uverificeret påstand ("freshest AppSource review stream"). Da AppSource/G2-review-modulet er under opbygning: wire de faktiske rating/antal ind i både `CONTINIA.scale` og hver konkurrents skala-række, så "vi vinder på review-velocity" bakkes af et tal. Hold CONTINIA-profilen ét vedligeholdt sted.

---

## MODUL-ÆNDRINGER

### M1 — Tom tilstand er en blindgyde vist til salg
Beskeden på L1032 er udvikler-vendt. Når P1 er løst er den næsten væk, men gør render'en robust: hvis `tacticalFor()` er null, vis stadig den faktuelle halvdel ("Their play" fra `data[]`) og markér taktik som "kommer" — vis aldrig en instruks om at redigere dashboard.js til en salgsbruger.

### M2 — Comparatoren skal matche kortet
`renderCmp` (L1009) viser kun dimensioner + "Where Continia wins". Comparatoren er det salg åbner for at forberede en konkret handel — surface også `watch` og `obj` dér. Bemærk desuden en inkonsistens: for de udækkede falder comparatoren tilbage til `CONTINIA.edge` (via `winList`/`tacticalFor` null), mens kortet viser tom-tilstanden — ret så de to viser det samme.

### M3 — Eksport / kopiér / print
Battlecards bruges i og omkring live-samtaler, ikke inde i hub'en. Tilføj en "kopiér kort"-knap pr. konkurrent (ren tekst) og/eller en one-pager-print/PDF-eksport. Høj værdi, lav indsats.

### M4 — Filtrering & søgning
23 kort i to kolonner. Tilføj filter på proximity / kategori / stance + fritekstsøgning, med "kun High proximity" som naturlig default for salg.

---

## ACCEPTKRITERIER (samlet)
1. Ingen konkurrent viser udvikler-beskeden; alle High/Medium-prox har mindst `win` + `watch`.
2. AGNOSTIC-spillere har hver en skræddersyet `win`-linje (ikke én delt streng).
3. Hver High-prox konkurrent har mindst én objection-handling-post.
4. Hvert `BATTLE`-kort har en `reviewed`-dato; forældede kort flages visuelt.
5. Comparatoren viser samme taktiske lag som kortet (win + watch + obj).
6. Der findes en kopiér/eksport-funktion pr. kort, og et filter på proximity/kategori.
7. Ingen regression i den live-afledte faktuelle halvdel eller i `data[]`.

## NOTER
- Alle seeds ovenfor er UDKAST grounded i konkurrenternes offentlige profil — de skal forfines med salgsteamet før brug. Ikke konkurrence- eller juridisk rådgivning.
- Behold to-lags-arkitekturen: faktuelt fra `data[]` (live), taktisk i `BATTLE` (redigerbart). Tilføj kun; lav ikke faktuelle felter om til hardcodet tekst.
