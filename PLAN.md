# PLAN – nový web TC Monsignore

Pořadí podle briefu, sekce 6. Krok 0 je technický předpoklad navíc. Po každém kroku: shrnutí, `npm run build`, zápis do `CHANGELOG.md` (build pak ručně nahraje uživatel na wp.heurekazo.cz) a nové otevřené věci do `TODO.md`.

Odkazy na checklist (brief, sekce 9):
**C1** menu a pořadí bloků 1:1 · **C2** správná složka fotek · **C3** texty doslova · **C4** fonty a diakritika · **C5** 3 světy · **C6** rozvrh sedí s detaily · **C7** CTA na `mailto:`/`tel:` · **C8** mobil bez horizontálního scrollu · **C9** vše editovatelné · **C10** nic vymyšleného, místo toho `[DOPLNIT]` · **C11** nasazeno a zapsáno v `CHANGELOG.md`

---

## Krok 0: Předpoklady ✅ hotovo 24. 10. 2026

Rozhodnuto 24. 10. 2026:
- **Šablona, ne ostrý web.** Implementace proběhne později ve vlastním editoru, který inline editaci už má. Tady stačí bloky a data oddělené.
- **Routing:** zůstává hash routing, ale cesty odpovídají budoucím hezkým URL (`#/kurzy/energy-harmony`). Tabulka slugů a budoucích 301 je v `AGENTS.md`. Router musí podporovat lomítka ve slugu.
- **Deploy:** `dist/` nahrává uživatel ručně. Agent jen spustí build a zapíše `CHANGELOG.md`.
- **Fotky:** `scripts/photos.sh` (sips + cwebp): HEIC/JPG/PNG → WebP + JPG, 3 šířky, EXIF orientace, ořezy podle mapy ve skriptu. Výstup `public/img/`.

**Hotovo, když:** router zvládne víceúrovňové slugy, fotky pro Home jsou zpracované a `npm run build` projde. (C9)

## Krok 1: Záloha staré PŠT stránky. ZRUŠENO

Starý web dál poběží, nic se nezálohuje. Fakta pro Letní školu se v kroku 6 přečtou přímo z `monsignore.cz/cs/letniskola/`, jen jako reference.

## Krok 2: Design tokeny, fonty, logo ✅ hotovo 24. 10. 2026

- Tokeny `--c-primary … --c-text-muted` a `--c-logo` pro světy `centrum`, `terapie` a `letni-skola` a mechanismus `data-world`/`data-mood`. Tailwind barvy přemapovat na nové tokeny a staré (`paper, ink, blush…`) odstranit.
- Barvy: centrum = současná paleta webu, terapie zeleno-béžová a letní škola odvozené ve stejném duchu. Až dodá Aneta, nahradí se jen hodnoty.
- Fonty: DM Sans, Now a Respondent self-host (woff2). Montserrat a Allura odstraněny.
- Logo: `public/brand/logo-mask.png` + `.logo` přes `mask-image`. Statické varianty (favicon 32/180/512, OG 1200 × 630, e-mailová PNG) vygeneruje skript.
- Hlavička: logo → Home, menu **Tančete s námi · Akce · Pro vás · Kontakt** a vstupy **Terapie / Letní škola**.
- Soubory: `src/style.css`, `tailwind.config.js`, `index.html`, `public/fonts/`, `public/brand/`, `scripts/logo.sh`.

**Hotovo, když:** přepnutí `data-world` na `<main>` přebarví stránku i logo, kontrast textu i loga je AA ve všech světech a menu odpovídá briefu 3. (C1, C4, C5)

## Krok 3: Home → ukázat Filipovi ✅ hotovo 24. 10. 2026, čeká na kontrolu

Pořadí bloků přesně podle briefu 3.1. Bloky, které tam nejsou (galerie kurzů, čísla, citáty, akce, vedení, CTA), se z Home **odstraní**.

| Blok | Obsah | Fotky |
|---|---|---|
| A) Hero, 3 rotující fotky | 3 × motto (Respondent) / NADPIS (Now) / podtext z tabulky 3.1. Autoplay 5–6 s, pauza při hoveru, reduced-motion bez animace, overlay gradient. | `HLAVNÍ 3 ROTUJÍCÍ FOTKY`: návrh `mrtvá nevěsta.jpg`, `sejmout_1.jpg` (oříznout bílý rám), `DSC_0268.jpg`. `C54B7CFD…PNG` je duplikát nevěsty, `page-09.jpg` je malá (1400 px) a tmavá. |
| B) Dva čtverce | NÁŠ PŘÍSTUP → podstránka, VEDENÍ → podstránka | `NÁŠ PŘÍSTUP/IMG_0645.HEIC`, `VEDENÍ/DSCF7187.JPG` |
| C) Náš příběh | „Od našeho založení v roce 1988“ + [ Více o nás ] | `NÁŠ PŘÍBĚH/page-00.jpg` (záměrně rozmazaná, jen tady, ne v hero) |

- Patička: logo, kontakt z briefu 3.5 a odkazy na podstránky. Žádné vymyšlené texty („Rádi vás uslyšíme“, „Tanec, který v nás zůstává“ apod. pryč).
- Soubory: `index.html`, `src/blocks/hero.js`, `squares.js`, `teaser.js`, `src/data/home.json`, `src/main.js` (rotace).

**Hotovo, když:** Home má přesně A–B–C, texty sedí doslova, hero splňuje chování z briefu a build je připravený k nahrání. **Stop: ukázat Filipovi.** (C1, C2, C3, C7, C8, C10, C11)

## Krok 4: Tančete s námi ✅ hotovo 24. 10. 2026

- **Přehled:** 3 karty (Mládež a dospělí / Mix tanečních stylů / VitaDance) s fotkou, nadpisem, krátkým textem a odkazem [ Více informací ] →. Pod nimi bloky INDIVIDUÁLNÍ VÝUKA a ROZVRH / CENÍK.
- **Šablona detailu kurzu** (`courseDetail`): hero foto + název + věk → popis (části „Zjistit více“ jako `<details>` akordeon) → box Praktické informace → Registrace → CTA „Přihlásit se“ (`mailto:info@monsignore.cz`).
- **3 detaily:** `/kurzy/mladez-a-dospeli` (dvě skupiny 16+ a 18+), `/kurzy/energy-harmony`, `/kurzy/vitadance`. Plus `/kurzy/individualni-vyuka`.
- **Rozvrh/ceník** `/kurzy/rozvrh-a-cenik`: tabulka z `src/data/rozvrh.json`, na mobilu karty. Detaily kurzů čtou časy a ceny ze stejného JSON.
- Fotky: `KURZY PRO MLÁDEŽ A DOSPĚLÉ` (`IMG_0615`, `1Duq…jpg`, původ ověřit, viz TODO), `KURZY ENERGY A HARMONY` (5), `KURZY VITADANCE` (`IMG_1177`), `INDIVIDUÁLNÍ VÝUKA` (3). Pro `ROZVRH A CENÍK` fotka chybí.
- Soubory: `src/pages.js`, `src/blocks/cards.js`, `courseDetail.js`, `schedule.js`, `src/data/kurzy.json`, `rozvrh.json`.

**Hotovo, když:** rozvrh, detaily a karty ukazují stejné časy, ceny a data začátku z jednoho zdroje, tabulka na 360 px nescrolluje a každé CTA vede na `mailto:`. (C1, C2, C3, C6, C7, C8, C9)

## Krok 5: Pro vás + Kontakt ✅ hotovo 24. 10. 2026

- **Časté dotazy:** vlevo fotka (`FOTO TĚLOCVIČNY`), vpravo akordeon 20 otázek z `src/data/faq.json`. Zmínky o dětech (ot. 2, 3, 19) zatím ponechat doslova a označit v `TODO.md` k rozhodnutí. Useknutá ot. 10 dostane `[DOPLNIT]`.
- **Ohlasy:** komponenta hotová, data prázdná a blok **skrytý** (`hidden: true`), dokud nejsou citace.
- **Galerie:** mřížka + lightbox (vlastní, bez knihovny, ovládání klávesnicí, reduced-motion). Data `src/data/galerie.json`.
- **Kontakt** `/kontakt`: Kde nás najdete (adresa, mapa jako embed až po kliknutí, aby se bez souhlasu nenačítaly cookies, a [ UKÁZAT NA MAPĚ ]), Kontaktujte nás (texty z briefu 3.5), `mailto:` a `tel:+420775765556`, `[DOPLNIT: parkování / doprava]`.

**Hotovo, když:** akordeon i lightbox jdou ovládat klávesnicí, ohlasy nejsou vidět, mapa nenačítá třetí strany bez kliknutí a kontakty jsou klikací. (C1, C2, C3, C7, C8, C9, C10)

## Krok 6: Akce + kalendář + Letní škola ✅ hotovo 24. 10. 2026

- **Akce** `/akce`: blok LETNÍ ŠKOLA TANCE (vstup do světa) + AKCE & WORKSHOPY (úvodní text a kalendář).
- **Kalendář:** kolekce `src/data/akce.json` (název, od–do, místo, cena, lektor, plakát). Minulé akce se skrývají podle dnešního data. Tlačítko „Přidat do kalendáře“ generuje `.ics` v prohlížeči a odkaz na Google Calendar. První akce: workshop „TĚLO V POHYBU, SRDCE V TANCI“, 14.–15. 11. 2026, RZ Tramtáryje, Horní Jelení, 3 800 Kč, Magdaléna Mauerová. Čas a plakát `[DOPLNIT]`.
- **Letní škola** `/letni-skola` ve světě `letni-skola`: **nový** obsah poskládaný z bloků nového webu. Fakta (termíny, ceny, lektoři, podmínky) jen jako reference z `monsignore.cz/cs/letniskola/`. Strukturu, design ani texty starého webu nekopírovat. Fotky ve složce chybí (`TODO.md`).
- Fotky akcí: `AKCE A WORKSHOPY` (`IMG_2856`, `IMG_2877`, `IMG_2897`; `10.jpg` je jen 600 × 200).

**Hotovo, když:** po 15. 11. 2026 workshop zmizí sám, `.ics` jde importovat do Apple i Google kalendáře a Letní škola má vlastní barvy. (C1, C2, C5, C7, C9, C10)

## Krok 7: Terapie (kostra) ✅ hotovo 24. 10. 2026

- `/terapie` ve světě `terapie`: hero, o terapii, pro koho, jak probíhá, lektorka, kontakt. Vše `[DOPLNIT]` kromě kontaktu.
- Oddělitelné: vlastní stránky a data (`src/data/terapie.json`), žádné sdílené texty s centrem.

**Hotovo, když:** stránka běží ve vlastním světě a každý chybějící text má `[DOPLNIT]` i záznam v `TODO.md`. (C5, C10)

## Krok 8: Náš přístup / Vedení / Náš příběh ✅ hotovo 24. 10. 2026

- `/nas-pristup`: celý text sekce NÁŠ PŘÍSTUP doslova. Věta „Ne každý tanečník musí stát…“ **jen jednou**, jako závěrečný citát (Respondent).
- `/vedeni`: Magdaléna Mauerová, role, motto Franka Towena, úvod, pak dlouhý životopis za „Zjistit více“.
- `/nas-pribeh`: úvod, pak zbytek za „Zjistit více“. Tanec PLUS se nezmiňuje, fyzio-cvičení a terapie zůstávají.
- Ze stávajících podstránek odstranit vymyšlené věci: ozdobná slova („Přístup“, „Rytmus“…), parafráze, „výkonnostní třída A“, větu „Důležitější než samotný výkon je pro ni vždy člověk…“, ukázkovou akci 24. května.

**Hotovo, když:** text každé stránky odpovídá `texty-monsignore.md` slovo od slova (kromě oprav ze sekce 7). (C3, C10)

## Krok 9: Doladění a kontrola

- Ořezy fotek podle ostrosti, nepoužité fotky do Galerie, `alt` texty.
- `title` a `description` pro každou stránku v `pages.js`. `sitemap.xml`, OG a 301 až při implementaci v editoru (podle tabulky v `AGENTS.md`).
- Lighthouse mobil (Performance ≥ 85, Accessibility ≥ 95), test na 360, 768, 1280 a 1920 px, reduced-motion.
- Projít celý checklist C1–C11 a výsledek zapsat do `CHANGELOG.md`.

**Hotovo, když:** všech 11 bodů checklistu je splněných nebo vědomě odložených v `TODO.md`.
