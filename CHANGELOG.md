# CHANGELOG

## 2026-10-24: Krok 4, Tančete s námi
- Přehled `#/kurzy`: tři karty kurzů s texty z briefu 3.2 (prostřední posunutá), blok Individuální výuka a vzorovaný panel Rozvrh, ceník.
- Jednotná šablona detailu kurzu (úvod s fotkou, popis s rozbalovacím „Zjistit více“, Praktické informace, Registrace, „Přihlásit se“ → `mailto:`) pro `#/kurzy/mladez-a-dospeli`, `energy-harmony`, `vitadance` a `individualni-vyuka`. Texty doslova z `texty-monsignore.md`.
- `#/kurzy/rozvrh-a-cenik`: tabulka z `src/data/rozvrh.json` (na mobilu karty). Časy, ceny a začátky výuky v detailech kurzů se čtou ze stejného souboru. Nový příkaz `npm run check` kontroluje stránky, odkazy, fotky a pravidla z briefu.

## 2026-10-24: Home víc ve stylu Arabesque
- Čtverce Náš přístup / Vedení jsou vůči sobě posunuté. Přes fotku přesahuje karta s textem z textů klientky (u Vedení motto Franka Towena) a za oběma je diagonální pudrová plocha.
- Náš příběh: archivní fotka přes celou šířku s jemným parallaxem a přes její hranu pudrový panel se vzorem oblouků („Více než tři desetiletí s tancem“, nadpis, linka, tlačítko).
- Hero má u teček ukazatel průběhu. Respondent je všude, kde slouží jako motto nebo nadpis, větší (zhruba 1,5×).

## 2026-10-24: Nižší patička
- Patička má místo tří sloupců dva řádky přes šířku webu: logo s textem a kontakty, pod nimi pruh s odkazy Náš přístup / Vedení / Náš příběh a ©. Na desktopu je zhruba o polovinu nižší, odkazy duplicitní s hlavičkou jsou pryč.

## 2026-10-24: Oprava useknutých čísel a háčků
- Respondent má nízký ascent, takže číslice a ozdoby přečnívaly nad řádek a fade-in animace je při načtení ořízla. `.accent` má teď řádkovou výšku 1,6 a nadpisy (Now) `padding-top: .15em` kvůli háčkům nad Ř, Ž a Ů.
- Číslice a `§` v akcentním fontu kreslí DM Sans, protože současný soubor Respondentu má místo nich vodoznak.

## 2026-10-24: Kroky 0, 2 a 3 (předpoklady, tokeny, Home)
- **Home podle briefu 3.1:** hero se 3 rotujícími fotkami (motto, nadpis a podtext z tabulky briefu, autoplay 6 s, pauza při hoveru, tlačítko stop, bez animace při reduced-motion), dva čtverce Náš přístup / Vedení a blok Náš příběh. Původní bloky Home (kurzy, čísla, citáty, akce, vedení, CTA) jsou pryč.
- **Design systém:** 3 barevné světy (`centrum`, `terapie`, `letni-skola`) a nálady (`soft`, `night`) přes CSS proměnné, všechny kombinace textu splňují WCAG AA. Fonty Now (nadpisy), DM Sans (text) a Respondent (motta) jsou self-hostované. Logo je maska z `LOGO.png` a barví se podle světa.
- **Menu podle briefu:** Tančete s námi · Akce · Pro vás · Kontakt a vstupy Terapie / Letní škola. Router zvládá víceúrovňové slugy (`#/kurzy/individualni-vyuka`). Fotky se zpracovávají skriptem (WebP + JPG, `srcset`, EXIF orientace), favicon a OG obrázek se generují z tokenů. Build připravený k nahrání na wp.heurekazo.cz.
