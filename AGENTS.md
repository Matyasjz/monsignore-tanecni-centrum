# AGENTS.md – Taneční centrum Monsignore

Web Tanečního centra Monsignore (Lány u Dašic u Pardubic, od 1988 / 1992). Statický web ve **Vite + Tailwind CSS 3**, obsah česky. Zadává Filip Janko, klientka je Magda Mauerová.

## Zdroje pravdy (čti jako první)

| Soubor | Co určuje |
|---|---|
| `BRIEF-monsignore.md` | **Struktura a vzhled.** Pořadí bloků a menu (sekce 3), tokeny (2), fotky (4), technické minimum (5), postup (6), rozhodnuté opravy (7), checklist (9). |
| `texty-monsignore.md` | **Obsah.** Texty se přebírají **doslova**. Jedinou výjimkou jsou opravy v briefu, sekce 7. |
| `PLAN.md` | Pořadí práce a definice „hotovo“ pro každý krok. |
| `TODO.md` | Vše, co chybí nebo čeká na klientku. |
| `CHANGELOG.md` | 2–3 řádky po každém větším kroku a nasazení. |

Když se brief a kód rozcházejí, platí brief. Když se brief a texty rozcházejí v obsahu, platí texty. Výjimkou jsou hero texty, kde platí tabulka v briefu 3.1. Rozpor, který nejde rozhodnout, se zapíše do `TODO.md` a řeší se s Filipem.

## Pravidla

1. **Texty doslova.** Nepřepisovat, nezkracovat, nespojovat odstavce, nevymýšlet nadpisy, „ozdobná slova“, citáty ani popisky. Opravují se jen překlepy z briefu (sekce 7): „Naším cílem“, „sebevědomí“, „Magdaléna Mauerová“ (všude stejně).
2. **Nic nevymýšlet.** Čísla, data, ceny, jména a citace jen z podkladů. Chybějící obsah má viditelný placeholder `[DOPLNIT: …]` (třída `.todo`) a **zároveň** záznam v `TODO.md`.
3. **Struktura 1:1 s briefem, sekce 3.** Žádné bloky navíc. Klientka byla nespokojená hlavně proto, že první verze strukturu nedodržela.
4. **Neplatí a nikde se neuvádí:** kurzy pro děti, školka Tiny Tutus, Tanec PLUS. Fotky dětí se nepoužívají.
5. **Všechno editovatelné.** Tento repozitář je **šablona**. Ostrý web se později postaví v našem vlastním editoru, který inline editaci už má. Tady proto žádný editor nestavíme. Každý text, obrázek a položka kolekce (rozvrh, akce, FAQ, ohlasy, galerie) je ale **data**, ne natvrdo psané HTML. Bloky jsou funkce `blok(data) → HTML` (viz Architektura), aby se daly 1:1 převést na komponenty editoru.
6. **Neměnit stack ani architekturu.** Vite + Tailwind 3 + vanilla JS. Žádný framework, CMS ani nové runtime závislosti bez souhlasu Filipa.
7. Česky, `lang="cs"`, správná diakritika ve fontech i textech. URL slugy bez diakritiky.
8. **`NEW_ASSETS/` je read-only.** Nic v ní nepřepisovat, nepřejmenovávat ani nemazat.
9. **Starý web monsignore.cz není inspirace.** Dál běží, nic se z něj nezálohuje. Slouží jen jako reference faktů pro Letní školu (termíny, ceny, lektoři) na `monsignore.cz/cs/letniskola/`. Nepřebírá se z něj design, struktura, členění stránek, formulace ani grafika. Nový web má působit jako nový, ne jako přestavba starého.

## Architektura

| Soubor | Obsah |
|---|---|
| `index.html` | Kostra: hlavička s menu, `<main>` a patička. |
| `src/main.js` | Router, menu, dropdowny, `.reveal`, hero rotace, parallax, lightbox galerie, mapa na kliknutí. Akordeony jsou nativní `<details>`, JS nepotřebují. |
| `src/pages.js` | Definice stránek: slug, `title`, `description`, `world`, `mood` a seznam bloků s daty. |
| `src/blocks/` | Šablonové funkce bloků. Každá dostane data a vrátí HTML. Dnes: `media.js` (`picture`, `media`), `hero.js`, `squares.js`, `story.js`, `courses.js` (`courseCards`, `courseHero`, `courseSections`, `courseTopics`, `practicalInfo`, `courseSignup`), `schedule.js` (`lesson`, `scheduleTable`), `pro-vas.js` (`faq`, `testimonials`, `gallery`, `contact`), `events.js` (`eventsCalendar`, `upcoming`, .ics a Google Kalendář), `summer-school.js`, `layout.js` (`pageIntro`, `split`, `sectionTitle`, `framed`, `more`, `patternPanel`, `timeline`, `wideFigure`, `continueTo`). |
| `src/data/` | Editovatelná data: `site.json` (adresa, e-mail, telefon), `home.json`, `kurzy.json` (přehled, detaily kurzů, stránka rozvrhu), `rozvrh.json` (**jediný zdroj** časů, cen a začátků výuky), `pro-vas.json` (FAQ, ohlasy, galerie, kontakt), `akce.json` (kolekce akcí, minulé se skryjí samy), `letni-skola.json` a `photos.json` (generuje ho `scripts/photos.sh`, ručně neupravovat). |
| `src/style.css` | Tokeny (`:root`, světy, nálady), `@font-face` a komponenty přes `@apply`. |
| `tailwind.config.js` | Barvy napojené na CSS proměnné, rodiny písem, šířky. |
| `public/img/<blok>/` | Zpracované fotky (WebP + JPG, více šířek). || `public/brand/` | Logo (maska) a statické varianty (favicon, OG, e-mail). |
| `public/fonts/` | Self-hostované woff2. |
| `scripts/` | `check.mjs` (`npm run check`: vykreslí všechny stránky přes Vite SSR a ověří odkazy, fotky a zakázané texty z briefu, staré podstránky jen varují), `photos.sh` (fotky → `public/img` + `photos.json`, mapa zdrojů je uvnitř skriptu) a `brand.sh` (logo → `public/brand`, barvy čte z tokenů ve `style.css`). Oba jdou spustit opakovaně. |

- **Routing:** v šabloně zůstává hash routing. Cesta za `#` je ale **přesně budoucí hezká URL**: `#/kurzy/energy-harmony` bude na ostrém webu `/kurzy/energy-harmony`. Slugy jsou bez diakritiky a mění se jen spolu s tabulkou níže. Prosté kotvy (`#kontakt`) jen scrollují.
- **SEO** (`sitemap.xml`, 301 ze starých URL, OG) se řeší až při implementaci v editoru. V šabloně má každá stránka v `pages.js` vyplněné `title` a `description`, aby se daly převzít.

| Stránka | Slug (= budoucí URL) | Svět |
|---|---|---|
| Home | `/` | centrum |
| Náš přístup | `/nas-pristup` | centrum |
| Vedení | `/vedeni` | centrum |
| Náš příběh | `/nas-pribeh` | centrum |
| Tančete s námi (přehled) | `/kurzy` | centrum |
| Kurzy pro mládež a dospělé | `/kurzy/mladez-a-dospeli` | centrum |
| Mix tanečních stylů: Energy & Harmony | `/kurzy/energy-harmony` | centrum |
| VitaDance | `/kurzy/vitadance` | centrum |
| Individuální výuka | `/kurzy/individualni-vyuka` | centrum |
| Rozvrh a ceník | `/kurzy/rozvrh-a-cenik` | centrum |
| Akce | `/akce` | centrum |
| Letní taneční škola | `/letni-skola` | letni-skola |
| Časté dotazy (+ ohlasy, zatím skryté) | `/pro-vas/caste-dotazy` | centrum |
| Galerie | `/pro-vas/galerie` | centrum |
| Kontakt | `/kontakt` | centrum |
| Tanečně-pohybová terapie | `/terapie` | terapie |

Budoucí 301 přesměrování: `/cs/letniskola/*` → `/letni-skola`, `/cs/kontakt.php` → `/kontakt`, `/cs/vedeni.php` → `/vedeni`, `/cs/historie.php` → `/nas-pribeh`, `/cs/typy-kurzu.php` → `/kurzy`, ostatní `/cs/*` → `/`.
- **Inicializace po vykreslení:** obsah `<main>` se při každé navigaci vkládá znovu. JS chování (`observeReveals`, hero, akordeony, lightbox) se proto napojuje po každém renderu, ne jednou při načtení.
- **Desktopové dropdowny** se zavírají až po `animationend` (`nav-roll-close`). Bez té animace by se nikdy nezavřely.
- Bloky nesmí obsahovat logiku závislou na routingu ani inline styly. Vzhled patří do tříd ve `style.css`.

## Barevný systém: 3 světy a nálady

Stejný layout, jiné tokeny. Theme se přepíná **atributem na úrovni sekce nebo stránky**, ne kopií šablon.

```css
:root, [data-world="centrum"]   { --c-primary; --c-secondary; --c-accent; --c-bg; --c-surface; --c-text; --c-text-muted; --c-logo; }
[data-world="terapie"]          { …zeleno-béžová… }
[data-world="letni-skola"]      { …vlastní varianta… }
[data-mood="…"]                 { přepíše jen podmnožinu (bg / surface / accent / logo) pro náladu podstránky }
```

- Tokeny podle briefu: `--c-primary, --c-secondary, --c-accent, --c-bg, --c-surface, --c-text, --c-text-muted` a navíc `--c-logo`. Hodnoty jsou ve formátu `R G B`, aby fungovala průhlednost v Tailwindu (`rgb(var(--c-primary) / <alpha-value>)`).
- Router nastaví `data-world` na `<body>` (hlavička i patička tak dědí svět stránky) a `data-mood` na `<main>` podle definice stránky v `pages.js`. Jednotlivá sekce nebo odkaz si může svět přepnout vlastním `data-world` (např. vstupy Terapie / Letní škola v menu).
- Nálady: `soft` (pudrové pozadí) a `night` (tmavé pozadí, světlý text). Nová nálada přepisuje jen tokeny, které opravdu mění.
- **Terapie** musí jít později oddělit na `terapie.monsignore.cz`. Má vlastní stránky, data i svět a nesdílí obsah s centrem.
- Kontrast textu min. WCAG AA (4,5 : 1). Platí i pro logo vůči pozadí každé nálady.
- **Centrum** drží současnou paletu webu (papírová bílá, téměř černý inkoust, pudrová růžová a brand rose `rgb(156 94 104)`). **Terapie** (zeleno-béžová) a **Letní škola** jsou odvozené ve stejném duchu: stejná světlost a sytost, jiný odstín. Podklady od grafičky Anety (brief, sekce 2) zatím nejsou. Až přijdou, nahradí se jen hodnoty tokenů.
- Nová barva se přidává jako token do všech světů a do `tailwind.config.js`. Žádné natvrdo psané barvy.

## Typografie

| Role | Font | Použití |
|---|---|---|
| Nadpisy a titulky | **Now** | `font-heading`, hlavní nadpisy verzálkami |
| Text | **DM Sans** | `font-sans` |
| Akcent | **Respondent**, bold, v barvě | `font-accent`, jen motta a citáty z textů |

- Self-host v `public/fonts/` přes `@font-face`, `font-display: swap`, woff2: DM Sans (variabilní, latin + latin-ext), Now Regular a Medium, Respondent Bold. Všechny mají ověřenou českou diakritiku.
- Respondent má v `@font-face` dočasně `unicode-range` bez číslic (v současném souboru jsou místo číslic vodoznaky). Čísla v akcentním fontu proto kreslí DM Sans. Viz `TODO.md`.
- Nový řez se přidá převodem OTF → woff2 (fonttools) a dalším `@font-face`. Před použitím ověř diakritiku `ěščřžýáíéůú ĚŠČŘŽÝÁÍÉŮÚ`.
- Respondent má malou x-výšku. Jako motto nebo nadpis ho sázej zhruba 1,5× větší než okolní nadpis (např. `clamp(2.4rem,5vw,3.8rem)`), jinak působí drobně.
- Montserrat, Allura a „ozdobná skriptová slova“ z předchozí verze se nepoužívají. Akcentní text se objeví jen tam, kde motto nebo citát skutečně je v textech.

## Logo

- Originál: `NEW_ASSETS/LOGO.png`, bílý monogram „TC“ s tanečnicí na průhledném pozadí, 800 × 800.
- Ve webu se logo barví **CSS maskou**: `mask-image: url(brand/logo-mask.png)` a `background-color: rgb(var(--c-logo))`. Samo se tak přebarví podle světa nebo nálady. Pokud se později podaří čistá vektorizace bez ztráty detailu, nahradí masku SVG s `fill="currentColor"`.
- Statické varianty v `public/brand/` (favicon, apple-touch, OG 1200 × 630, e-mail) generuje skript z tokenů. Barvy se nepíšou natvrdo.

## Fotky

- Originály jsou v `NEW_ASSETS/<NÁZEV BLOKU>/`. Složka je v `.gitignore` (55 MB HEIC), do gitu jdou jen zpracované výstupy v `public/img/` a `src/data/photos.json`. Na jiném stroji je potřeba `NEW_ASSETS/` nakopírovat ručně. **Název složky = blok v briefu.** `GALERIE` = galerie, nepoužité fotky jdou tam taky.
- Zpracování dělá skript `scripts/photos.sh` (sips + cwebp, opakovatelně). Výstup `public/img/<blok-slug>/<nazev>-<šířka>.{webp,jpg}`:
  - hero max. 2400 px delší strana, karty a bloky 1200 px a menší šířky pro `srcset`
  - respektovat EXIF orientaci (HEIC z iPhonu jsou často na výšku)
  - ořez podle ostrosti tam, kde to brief nebo `TODO.md` uvádí
- `<picture>` s WebP a JPG fallbackem, `srcset` + `sizes`, `loading="lazy"` všude kromě první hero fotky (`fetchpriority="high"`), `width` a `height` proti posunu layoutu.
- **Tmavé divadelní fotky se nezesvětlují filtrem.** Vyvažují se světlým podkladem, rámem (`.framed`) nebo okolím. Hero smí mít tmavý overlay gradient kvůli čitelnosti textu.
- Rozmazané nebo malé fotky (pod cílovou šířkou) nepatří do hero. Fotky dětí se nepoužívají.
- `alt` česky a věcně, popisuje, co je na fotce.

## Pohyb, výkon a mobil

- Dynamičtější než Arabesque (inspirace onerhythm.uk), ale nic nesmí poskakovat. Fade-in při scrollu (`.reveal`), crossfade v hero (5–6 s, pauza při hoveru a focusu) a jemný hover fotek.
- **`prefers-reduced-motion: reduce`** = žádný autoplay ani přechody a obsah je hned viditelný. Platí pro každou novou animaci.
- Mobile-first. Testuj na 360, 768, 1280 a 1920 px. Žádný horizontální scroll. Tabulky (rozvrh) se na mobilu mění v karty.
- Cíl Lighthouse (mobil): Performance ≥ 85, Accessibility ≥ 95.
- Žádné cookies ani trackery (ani Facebook pixel ze starého webu). Mapa se načte až po kliknutí.

## Build, nasazení, záznamy

```sh
npm install
npm run dev       # vývoj
npm run check     # kontrola obsahu (stránky, odkazy, fotky, pravidla briefu)
npm run build     # produkční build do dist/
npm run preview
```

- Před každým buildem pro nahrání spusť `npm run check`. Chyby musí být nula, varování jsou známé věci z `TODO.md`.
- **Vizuální kontrola** bez prohlížeče: headless Firefox (`firefox --headless --screenshot out.png --window-size=1440,3000 URL`). Do testovacího profilu dej `user_pref("ui.prefersReducedMotion", 1);` (fade-in se jinak vyfotí v půlce) a `user_pref("dom.image-lazy-loading.enabled", false);`. Větší fotky se při prvním vyfocení nemusí stihnout načíst, druhé vyfocení s teplou cache už je ukáže. Interakce (lightbox, mapa) se dají otestovat dočasnou stránkou v `dist/`, která web načte v iframe a v `onload` klikne. Po testu ji smaž.

- `dist/` je v `.gitignore` a před buildem se může celý smazat.
- **Test deploy na https://wp.heurekazo.cz nahrává uživatel ručně** (obsah `dist/`). Agent po každém větším kroku spustí `npm run build`, ověří, že projde, zapíše do `CHANGELOG.md` datum a 2–3 řádky, co se změnilo, a oznámí, že build je připravený k nahrání. Sám nic nenahrává.
- Po každém kroku z `PLAN.md` odškrtni hotové a nové otevřené věci zapiš do `TODO.md`.
- Referenční šablona `Arabesque.webarchive` je v kořeni repozitáře a do buildu se nedostává.
