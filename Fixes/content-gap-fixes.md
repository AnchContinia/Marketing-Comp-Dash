# Content-Gap-modul — fixes & forbedringer

**Repo:** `AnchContinia/Marketing-Comp-Dash`
**Berørte filer:** primært `dashboard.js` (content-gap IIFE, ca. linje 420–594). Datakilder: `linkedin-data.js`, `youtube-data.js`. Sektionen mountes i `index.html` på `#content-gap` → `<div id="cg-body">`.

Formålet med modulet: vise hvor Continia er stille mens feltet er højlydt ("share of voice" per content-tema), beregnet live fra LinkedIn-posts, YouTube-reach og content-backlog.

---

## Sådan virker det i dag (så konteksten er klar)

- `THEMES`-arrayet definerer 6 temaer, hver med en keyword-liste.
- `themeOf(title)` mapper hver post-titel til **ét** tema via **first-match-wins** (første keyword der rammer vinder). Intet match → `null` → posten ekskluderes helt.
- `counts(c)` tæller posts per tema for et firma.
- Sammenligningen i `draw()` sætter Continias tal (`youCounts`) op mod feltets **samlede** volumen per tema (`fieldTotal` = summen af alle 12 konkurrenter), ikke et gennemsnit.
- Share of voice per tema = `you / (you + them)`. Baren farves `ahead` ved ≥50 %, ellers `behind`.

---

## Problemerne (verificeret mod de faktiske data, capture 2026-06-29)

### 1. KRITISK: Alle Continias posts ryger ud som "off-theme" → 0 % på tværs af alt

Da tagging-logikken køres mod de rigtige data, får **0 ud af Continias 10 posts** et tema. Resultat: hero-SOV viser ~0 %, alle barer bliver fuldt lilla, og verdict-linjen påstår at Continia er "stille" på alt. Det er en **måleartefakt, ikke virkeligheden.**

Faktisk fordeling lige nu (you = Continia, field = sum af 12 konkurrenter):

| Tema | you | field |
|---|---|---|
| AI / agentic AP | 0 | 11 |
| E-invoicing mandates | 0 | 11 |
| Product demos | 0 | 2 |
| Customer stories | 0 | 5 |
| Banking & payments | 0 | 8 |
| Expense management | 0 | 1 |

To årsager:
- Continias posts er mest kultur/event-indhold (team-meetup, Elevate-tour, ISO 27001, cykel-commute, "kage til 250 løsninger") som ikke matcher nogen tema-keywords.
- Den ene post der *burde* matche — *"From a full-time AP person to automation in minutes"* — fanges ikke, fordi **"automation" ikke er et keyword** under AI (kun `ai, agent, agentic, autonomous, copilot, llm`).
- 3 posts har ingen titel i exporten ("Carousel post", "Text post", "Video post") og kan aldrig tagges.

### 2. "ahead/behind"-tærsklen på 50 % er matematisk uopnåelig i default-visning

Barer/kort farves grønne (`ahead`) ved andel ≥50 %. Men default sammenligner med feltets **sum af 12 firmaer**. Selv ved helt gennemsnitlig posting er Continias maks-andel ~1/13 ≈ 8 %. Grøn er altså umulig at nå mod "the field" — tærsklen giver kun mening i 1-mod-1-visningen (når en enkelt konkurrent vælges i dropdownen). Logikken straffer Continia for at være ét firma blandt tretten.

### 3. Off-theme-posts droppes lydløst

Posts uden tema-match forsvinder uden spor. Det skjuler at "0 %" skyldes tagging, ikke tavshed. Andelen bør være synlig som en data-kvalitets-metric.

### 4. (Mindre) First-match-wins skaber tema-bias

En post om "AI-drevet e-invoicing" tagges altid som AI, aldrig e-invoicing, pga. rækkefølgen i `THEMES`. For et threat-map er det acceptabelt, men værd at være bevidst om.

---

## Ønskede ændringer

### A. Udvid keyword-mappet så Continias faktiske indhold fanges (højeste prioritet)

Som minimum, tilføj til de eksisterende temaer:

```js
{label:"AI / agentic AP",   kw:["ai","agent","agentic","autonomous","copilot","llm","automation","automate"]},
{label:"Customer stories",  kw:["case study","customer","testimonial","success story","savings","full-time","in minutes"]},
```

Og overvej et nyt tema, så kultur/brand-volumen tæller som *noget* i stedet for at forsvinde:

```js
{label:"Company culture / brand", kw:["meetup","team","elevate","iso 27001","certified","commute","anniversary","losninger","softvaerket","cake","kage"]},
```

Bemærk: "AI"-matchet bruger `\bai\b` (word boundary) bevidst, så "automation" tilføjes som separat keyword — det fanger ikke via `ai`-reglen.

### B. Tilføj en "gennemsnit"-tilstand ved siden af felt-total

Lad brugeren (eller default) sammenligne mod **gennemsnitlig konkurrent** i stedet for felt-summen. Det gør 50 %-tærsklen meningsfuld og giver et ærligt "over/under middel"-svar. Behold gerne felt-total som valgmulighed (den er fin til "15 vs 0"-kløfter), men gør gennemsnit til default for hero-SOV og ahead/behind-farvning. Alternativt: skjul/justér ahead/behind-tærsklen når der sammenlignes mod hele feltet, så grøn ikke kræver at out-poste alle 12 tilsammen.

### C. Gør off-theme synlig

Vis andelen af posts der ikke kunne klassificeres (fx "3/10 posts uden tema") som en metric-card eller note, i stedet for at droppe dem lydløst. `offTheme`-variablen findes allerede i koden — den skal bare eksponeres tydeligere, gerne også for konkurrenterne.

### D. (Valgfrit) Håndtér titelløse posts eksplicit

Posts med generiske titler ("Carousel post", "Text post", "Video post") bør tælles som "ukendt titel" frem for blot off-theme, så data-kvalitetsbilledet er ærligt.

---

## Acceptkriterier (til verifikation efter ændring)

1. Med opdateret keyword-map får Continia **mindst** posts tagget i "AI / agentic AP" (mindst "...automation in minutes") og i kultur-temaet — hero-SOV er ikke længere 0 %.
2. Off-theme-andelen er synlig i UI'et for både Continia og sammenligningen.
3. I default-tilstand er ahead/behind-farvning kalibreret så grøn er opnåelig (dvs. mod gennemsnit, ikke felt-sum) — ELLER tærsklen er eksplicit fjernet/justeret i felt-total-visning.
4. 1-mod-1-visningen (vælg enkelt konkurrent i dropdown) virker uændret.
5. Ingen regression i YouTube-tabellen eller resten af `dashboard.js`.

---

## Noter

- Datafilerne (`linkedin-data.js`, `youtube-data.js`) opdateres månedligt via Social Blade-runbook; logikken må ikke afhænge af hardcodede tal — den skal blive ved at regne live ud fra `window.LI_DATA` / `window.YT_DATA`.
- Keyword-listerne er det eneste sted hvor klassificering sker — hold dem samlet og kommenterede, så de er nemme at vedligeholde fremover.
