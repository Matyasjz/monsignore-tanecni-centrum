# CHANGELOG

## 2026-11-02: Sjednocení navigace se strukturou klientky
- Hlavní navigace nyní obsahuje pouze logo na Home, Tančete s námi, Akce, Pro vás a Kontakt podle DOCX. Samostatné odkazy na Terapie a Letní školu i jejich nevyužité styly byly z desktopového i mobilního menu odstraněny.
- DOCX je zaznamenán jako primární zdroj struktury; brief doplňuje vizuální a technické požadavky. Letní škola zůstává pod Akce a její obsah se kvůli pozastavení zatím nemění.
- Produkční sestavení Vite prošlo po aktualizaci navigace i CSS.

## 2026-10-24: Krok 8, Náš přístup, Vedení, Náš příběh
- Tři podstránky přepsané doslova z textů klientky s opravami z briefu (Naším cílem, sebevědomí, Magdaléna). Věta „Ne každý tanečník musí stát jednou na profesionálním jevišti…“ je jen jednou, jako závěrečný citát. Vymyšlené texty, Tanec PLUS a ukázková akce jsou pryč.
- Vedení a Náš příběh mají úvod viditelný a delší část za „Zjistit více“. Náš přístup řadí témata do mřížek (Jak učíme, Proč učíme tanec) a končí citátem na vzorovaném panelu.
- Smazána složka `assets/` a šablony předchozí verze (timeline, ozdobná skriptová slova, stará akce). Všechny stránky jdou z dat v `src/data/`.

## 2026-10-24: Krok 7, Terapie
- `#/terapie` ve vlastním zeleno-béžovém světě: úvod, O terapii, Pro koho, Jak probíhá, Lektorka, Kontakt. Texty zatím nejsou, místo nich jsou viditelné `[DOPLNIT]`. U lektorky jsou doslovné věty z textů (diplom 2017).
- Vstup Terapie v menu je aktivní. Stránka má vlastní data (`src/data/terapie.json`), takže půjde oddělit na `terapie.monsignore.cz`.

## 2026-10-24: Krok 6, Akce a Letní škola
- `#/akce`: vstup do Letní školy (panel v barvách jejího světa), Akce & workshopy s textem klientky a kalendář akcí z `src/data/akce.json`. Minulé akce se skrývají samy, každá akce má „Přihlásit se“, „Přidat do kalendáře“ (.ics) a odkaz do Google Kalendáře. První akce: workshop 14.–15. 11. 2026.
- `#/letni-skola` ve vlastním barevném světě: místo, nadčasové věty a seznam technik ze staré stránky (jen jako zdroj faktů), lektorský tým 2026. Termín, ceník a přihláška 2027 jsou `[DOPLNIT]`.

## 2026-10-24: Krok 5, Pro vás a Kontakt
- `#/pro-vas/caste-dotazy`: 20 otázek doslova z textů jako akordeon, vlevo fotka sálu, která na desktopu drží při scrollu. Komponenta Ohlasy je hotová, ale skrytá, dokud nepřijdou citace.
- `#/pro-vas/galerie`: mozaika 22 nepoužitých fotek s lightboxem (nativní `<dialog>`, šipky, Esc, počítadlo).
- `#/kontakt`: Kontaktujte nás (telefon, e-mail, text z briefu 3.5), Kde nás najdete s odkazem na Mapy.cz a mapou Google, která se načte až po kliknutí (bez cookies třetích stran). Menu Pro vás a Kontakt je aktivní.

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

