# AGENTS.md – Taneční centrum Monsignore

Web uměleckého tanečního centra Monsignore (Pardubice, od roku 1992). Statický web ve **Vite + Tailwind CSS 3**, obsah je česky.

## Proč proběhl redesign

Klientovi se předchozí verze nelíbila. Podle jejich slov nebyla „flowy“ a byla „moc plná věcí“. Konkrétně:

- **Příliš mnoho dekorací najednou.** Svislé linky u textů, rámečky, ohraničené sekce, barevné pruhy, gradienty přes fotky, „vstupenková“ karta akce se zakázaným tlačítkem.
- **Hustá sazba.** Malé mezery mezi sekcemi, karty těsně vedle sebe a přeplněná hero sekce.
- **Dlouhé a nepřehledné položky menu**, například „Reference / Co o nás říkají, názory účastníků, citace, zkušenosti“.
- **Míchání tří písem** (Playfair Display, DM Sans, Roboto Condensed) bez jasné hierarchie.
- **Opakující se texty** (Individuální výuka měla stejné odstavce dvakrát) a dlouhé odstavce bez rytmu.

## Cíl

Otevřený, vzdušný a minimalistický web, který plyne. Je téměř celý inspirovaný šablonou **Arabesque – Modern Ballet School Theme** (referenční soubor `Arabesque.webarchive` v kořeni repozitáře; ten se do buildu nedostává).

Principy převzaté z Arabesque, které je potřeba dodržovat:

1. **Hodně prázdného prostoru.** Sekce mají velké vertikální mezery (`.section`: `py-24 md:py-36`) a obsah je úzký (`max-w-grid` 1180 px).
2. **Ozdobné slovo ve skriptovém písmu** (Allura) nad nadpisem v Montserratu velkými písmeny s prostrkáním. Ozdobné slovo je bledé (`whisper`), lehce zasahuje do nadpisu a začíná **velkým písmenem** („O nás“, „Kurzy“).
3. **Fotky s růžovým offset blokem** (`.framed`) místo rámečků a stínů.
4. **Tenké podtržené odkazy** (`.link-line`) místo těžkých tlačítek. Plná tlačítka jen tam, kde jde o hlavní akci.
5. **Klidná paleta:** papírová bílá, téměř černý inkoust, pudrová růžová (`blush`) a brand rose jako akcent.
6. **Jemný pohyb:** fade-in při scrollu (`.reveal`) a hover fotek, kdy předem přiblížený obrázek (scale 1.1) sjede o ~3,5 % do strany a růžový blok se posune o 6 px. Nic nesmí poskakovat.

**Když přidáváš nový obsah, raději uber, než přidej.** Každý blok má mít jeden nadpis, krátký text a maximálně jednu akci.

## Struktura

| Soubor | Obsah |
|---|---|
| `index.html` | Hlavička a navigace, celá úvodní stránka, patička s kontaktní výzvou |
| `src/pages.js` | Podstránky (`#/o-nas`, `#/kurzy`, `#/individualni-vyuka`, `#/letni-skola`, `#/akce`, `#/nas-pribeh`, `#/vedeni`) a šablonové funkce bloků |
| `src/main.js` | Hash routing, menu, dropdowny, `.reveal`, rotace citátů, stav hlavičky při scrollu |
| `src/style.css` | Design tokeny (`:root`) a všechny komponenty přes `@apply` |
| `tailwind.config.js` | Barvy napojené na CSS proměnné, písma, `tracking-heading/label`, `max-w-grid/wide/read` |
| `assets/` | Fotky (Vite je hashuje do `dist/assets`) |

## Design systém

- **Písma:** `font-sans` = Montserrat (300/400/500) a `font-script` = Allura. Načítají se z Google Fonts v `index.html`. Pinyon Script klient zkusil a odmítl. Písmo musí podporovat české znaky ř, ě, ů. Mrs Saint Delafield a Herr Von Muellerhoff je nemají.
- **Barvy:** jen tokeny `paper, ink, muted, brand, brand-dark, blush, blush-soft, whisper, mist, line, footer`. Nová barva se přidává do `:root` i do `tailwind.config.js`.
- **Komponenty** (v `style.css`, každá má jedno jméno):
  - layout: `.site-container(--wide|--read)`, `.section(--tight|--mist)`, `.split(--reverse)`
  - nadpisy: `.section-title(__script|__heading|__lead)`, `.page-intro`
  - fotky: `.photo`, `.framed(--portrait|--landscape)`, `.gallery`, `.wide-figure`
  - bloky: `.hero`, `.stats-band`, `.quotes`, `.event`, `.founder`, `.cta`, `.principles`, `.timeline`, `.focus-list`
  - akce: `.btn(--dark|--light|--solid)`, `.link-line`, `.label`
- **Šablony v `pages.js`:** `pageIntro`, `split`, `sectionTitle`, `framed`, `timeline`, `wideFigure`, `continueTo`. Nové podstránky skládej z nich, ne z ručně psaného HTML.

## Konvence a záludnosti

- **Styl kódu:** Tailwind tokeny a komponenty přes `@apply`. Inline utility v HTML jen na drobné úpravy (`mt-10`, `pt-0`).
- **`@apply` bez konfliktů:** neaplikuj komponentu (např. `label`) a zároveň utilitu se stejnou vlastností (`text-brand`). Pořadí výsledných deklarací není zaručené, takže v takovém případě vlastnosti vypiš explicitně.
- **Ozdobný skriptový text je `aria-hidden`.** Skutečný text nese `h1`/`h2`. Hero má „Tanec“ jako dekoraci a v `h1` je skryté `sr-only` „Tanec, “.
- **Routing:** `#/slug` vykreslí podstránku z `pages.js`. Prosté kotvy (`#kurzy`, `#kontakt`) jen scrollují. Kotva mimo `<main>` (patička `#kontakt`) na podstránce stránku nemění.
- **Úvodní stránka se znovu vkládá z `homeMarkup`.** Inicializace obsahu (`observeReveals`, `initQuotes`) proto musí běžet v `renderHome()`, ne jen jednou při načtení.
- **Desktopové dropdowny se zavírají až po události `animationend`** (`nav-roll-close`). Bez té animace by se nikdy nezavřely.
- **Texty:** česky, krátce, bez vymyšlených faktů. Čísla, citace a data musí pocházet od klienta. Ukázkový termín akce (24. květen) je označený jako ukázkový.
- **Neaktivní odkazy** (stránky, které ještě neexistují) mají `data-inert-nav aria-disabled="true"`.

## Build a kontrola

```sh
npm install
npm run dev      # vývoj
npm run build    # produkční build do dist/ (relativní cesty, --base=./)
npm run preview
```

`dist/` je v `.gitignore`. Před novým buildem ho lze celý smazat. Změny ověřuj vizuálně na desktopu (1440 px) i mobilu (390 px). Fade-in a hover popisky galerie se projeví jen ve skutečném prohlížeči.

## Co chybí: assety a obsah od klienta

Současné fotky mají nejvýš 1024 px a jde o různorodé, sytě barevné jevištní záběry. To je největší rozdíl oproti referenční šabloně. Fotky by ideálně měly pocházet z jednoho focení: světlý sál, denní světlo, oblečení v paletě webu (černá, bílá, pudrová, tělová), klidné pozadí, každý záběr na šířku i na výšku.

| Kde | Co | Formát |
|---|---|---|
| Hero | 1–3 široké záběry, tanečnice vpravo, vlevo prostor pro text | 16:9, min. 2560 px |
| Hero (volitelně) | video 10–15 s ve smyčce, bez zvuku | mp4, 1920 px, do 4 MB |
| O nás (úvod) | silná fotka na výšku | 4:5, min. 1200×1500 |
| Galerie kurzů | 6 fotek, jedna na kurz, stejné světlo | 4× čtverec 1200 px, 2× 2:1 2000×1000 |
| Pás s čísly | detailní textura (špičky, ruce, tyč, parkety) | 2400 px šířka |
| Vedení | portrét Magdalény Mauerové a 1 fotka při výuce | 4:5 |
| Stránka kurzů | 1 fotka na šířku pro každý styl | 4:3 |
| Akce | fotka z představení ke každé akci | 4:3 |
| Náš příběh | archivní fotky (1988, 1992, divadlo, soutěže), klidně skeny | libovolný |

**Obsah:** 3–5 referencí (jméno, role, souhlas se zveřejněním), 6–8 častých dotazů (věk, zkušební hodina, oblečení, platby, omluvy, náhrady), rozvrh a ceník kurzů, adresa sálu, telefon, otevírací doba, odkazy na sociální sítě, skutečné termíny představení a Letní taneční školy, případně další lektoři (fotka, jméno, styl).

**Značka:** logo ve vektoru (SVG), pokud existuje (jinak zůstává nápis „Monsignore“ v Allura), favicon a obrázek pro sdílení 1200×630.

## Plánovaná rozšíření

1. **Týdenní rozvrh** (den × čas × kurz, filtr podle stylu). Typický blok Arabesque, na webu nejvíc chybí.
2. **Přihláška nebo kontaktní formulář.** Potřebuje odesílací službu (např. Formspree, Netlify Forms). Dnes je tu jen `mailto:`.
3. **Mapa** s adresou sálu.
4. **Stránka Galerie** a Instagram mřížka v patičce.
5. **Stránky Reference a Časté dotazy.** V menu jsou připravené jako neaktivní odkazy.
6. **Optimalizace fotek:** WebP/AVIF a `srcset` z originálů.
