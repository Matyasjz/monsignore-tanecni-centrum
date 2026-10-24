# BRIEF – nový web TC Monsignore

> Pro: studenta + jeho AI agenta (Claude Code apod.).
> Zadává: Filip Janko. Klientka: Magda Mauerová (TC Monsignore).
> Stav k 24. 10. 2026: logo vybrané, základní design hotový. **Teď: naplnit web podle struktury klientky.**

---

## 0. Pravidla pro agenta (čti první)

1. **Zdroj pravdy pro obsah = `texty-monsignore.md`.** Texty přebírej **doslova**. Nepřepisuj, nezkracuj, nevymýšlej nové. Jedinou výjimkou jsou opravy v sekci 7 („Rozhodnuto“).
2. **Zdroj pravdy pro strukturu = tento brief, sekce 3.** Pořadí bloků a menu dodrž přesně. Klientka si na struktuře dala hodně záležet a první nástřel ji nedodržel. **Tohle je hlavní důvod její nespokojenosti.**
3. Co v podkladech chybí, **nevymýšlej**. Dej viditelný placeholder `[DOPLNIT: …]` a zapiš to do `TODO.md`.
4. **Neměň stack ani architekturu projektu.** Pracuj v existujícím kódu, existujících blokových komponentách a inline editaci. Každá textová část musí zůstat editovatelná klientkou.
5. Stránky jsou česky. Hlídej diakritiku (fonty, `lang="cs"`, URL slugy bez diakritiky).
6. Po každém větším kroku nasaď na test **https://wp.heurekazo.cz** a do `CHANGELOG.md` napiš 2–3 řádky, co se změnilo.

---

## 1. Co je to za web

- Taneční centrum v Lánech u Dašic (u Pardubic). Od 1988 / 1992. Dnes hlavně **mládež 16+, dospělí, ženy 35+/50+, senioři 65+**. **Kurzy pro děti už NEJSOU.**
- **Jedna doména, jeden design, 3 barevné „světy“:**
  1. **Taneční centrum**: hlavní web (výchozí barvy).
  2. **Tanečně-pohybová terapie**: vlastní sekce, jemně odlišné barvy (zelená/béžová místo červené). Později se může přesunout na `terapie.monsignore.cz`, takže ji drž jako oddělitelnou sekci s vlastním theme.
  3. **Letní taneční škola**: vlastní sekce s vlastní barevnou variantou. Nahrazuje starou PŠT stránku.
- Princip barevných světů: stejný layout, jiné barevné tokeny. Viz web Arabesque. Implementuj jako **theme přepínané na úrovni sekce** (CSS proměnné), ne jako kopie šablon.

**Styl:** držet se Arabesque, ale dynamičtější. Inspirace dynamiky: https://onerhythm.uk/. Pro porovnání https://www.divadloponec.cz/cs je „málo dynamický“, tím směrem nejít.

---

## 2. Design tokeny

### Fonty
| Role | Font | Pozn. |
|---|---|---|
| Nadpisy, titulky | **Now** | Soubory dodá Filip (`/fonts`). Ne Google Fonts. |
| Hlavní text | **DM Sans** | Google Fonts / self-host |
| Doplňkový akcent (motta, citáty) | **Respondent**, **bold, v barvě** | Soubory dodá Filip. Otestuj **diakritiku** (ěščřžýáíéůú). Případně jemně uprav `letter-spacing`. |

- Self-host přes `@font-face`, `font-display: swap`, woff2.
- Pokud Now/Respondent nemají české znaky, **nefakuj to**. Napiš to do `TODO.md` a dej fallback.

### Barvy
- Barevné kombinace dodala grafička Aneta (4 obrázky, složka `/design/barvy`). Pro každý svět (centrum / terapie / letní škola) vytáhni přesné HEX a nadefinuj:
  `--c-primary`, `--c-secondary`, `--c-accent`, `--c-bg`, `--c-surface`, `--c-text`, `--c-text-muted`
- Kontrast textu min. WCAG AA (4.5:1).

### Logo
Vybrané, už je ve webu. Neměnit.

---

## 3. Struktura webu (od klientky – DODRŽET)

### Hlavní menu
`Logo (→ Home)` · **Tančete s námi** · **Akce** · **Pro vás** · **Kontakt**
+ přepínač / vstup do světů **Terapie** a **Letní škola**.

Legenda: **→** = proklik na podstránku/detail · **[foto: X]** = složka fotek X z Mail Dropu · **⤵** = rozbalovací „Zjistit více“

---

### 3.1 HOME

**A) Hero – 3 rotující fotky** [foto: HLAVNÍ 3 ROTUJÍCÍ FOTKY]
Inspirace: https://www.divadloponec.cz/cs (střídání fotek). Uprostřed každé fotky 3 řádky:

| # | Motto (Respondent, bold, barva) | Nadpis (Now, VERZÁLKY) | Podtext (DM Sans) |
|---|---|---|---|
| 1 | Tančete srdcem … | TANEC, KTERÝ VÁS BAVÍ | Umělecké taneční centrum zaměřené na klasický, moderní a jazzový tanec. |
| 2 | Objevte sami sebe … | POHYB, KTERÝ VÁS ROZVÍJÍ | Místo, kde se technika setkává s osobností tanečníka. |
| 3 | S chutí a lehkostí … | ENERGIE PRO KAŽDÝ VĚK | Ženy různých generací, jedna společná radost |

- Autoplay ~5–6 s, pauza při hoveru, `prefers-reduced-motion` = bez animace. Fotky ořez `object-fit: cover`, text čitelný (overlay gradient).

**B) Pod hero – dva čtverce vedle sebe** (inspirace: https://sab.org)
- **NÁŠ PŘÍSTUP** [foto: NÁŠ PŘÍSTUP] → podstránka „Náš přístup“ (texty: sekce *NÁŠ PŘÍSTUP*)
- **VEDENÍ** [foto: VEDENÍ] → podstránka „Vedení“ (texty: sekce *VEDENÍ*, Magdaléna Mauerová; dlouhý životopis za ⤵)

**C) NÁŠ PŘÍBĚH** [foto: NÁŠ PŘÍBĚH]
Krátce: „Od našeho založení v roce 1988“ + tlačítko **[ Více o nás ]** → podstránka „Náš příběh“ (texty: sekce *NÁŠ PŘÍBĚH*, delší část za ⤵).

---

### 3.2 TANČETE S NÁMI (kurzy)
Inspirace přehledu: https://www.divadloponec.cz/cs/prijdte-tancit
Inspirace detailu kurzu: https://www.stepsnyc.com/classes/workshops/basic-adult-dance-workshops/

**Přehled = 3 sloupce/karty:**

| Karta | Krátký text na kartě | Foto | → Detail |
|---|---|---|---|
| **PRO MLÁDEŽ A DOSPĚLÉ** – Kombinace tanečních technik | „Výuka je zaměřená na komplexní taneční průpravu a propojuje několik tanečních technik: klasiku, modernu, jazz, contemporary, mix tanečních stylů“ | KURZY PRO MLÁDEŽ A DOSPĚLÉ | Kurzy 16+ + praktické info |
| **MIX TANEČNÍCH STYLŮ** – Energy 35+ / Harmony 50+ | „Taneční kurz pro ženy, které si chtějí užít pohyb, hudbu a různé taneční styly“ | KURZY ENERGY A HARMONY | Energy & Harmony + praktické info |
| **TANEC PRO SENIORY** – VitaDance 65+ | „Lekce se zaměřují na mobilitu, koordinaci, rovnováhu a celkovou vitalitu“ | KURZY VITADANCE | VitaDance + praktické info |

Každá karta: foto, nadpis, krátký text, **[ Více informací ] →**.

**Pod tím další bloky:**
- **INDIVIDUÁLNÍ VÝUKA** [foto: INDIVIDUÁLNÍ VÝUKA] → detail (texty: *Individuální výuka pro mládež a dospělé 16+*)
- **ROZVRH / CENÍK** [foto: ROZVRH A CENÍK] → stránka s tabulkou

**Šablona detailu kurzu** (jednotná pro všechny):
1. Hero foto + název + věková skupina
2. Popis (texty z dokumentu, části za „Zjistit více“ jako ⤵)
3. **Box „Praktické informace“**: Kdy / Kde / Začátek výuky / „Je možné se přihlásit i během roku.“
4. **Registrace**: e-mail, cena za lekci, platba
5. CTA tlačítko „Přihlásit se“ → `mailto:info@monsignore.cz`

**Rozvrh / ceník:** tabulka (data níže, v textech sekce *ROZVRH, CENÍK*) + text o přihlášení a platbě. Tabulka na mobilu jako karty, ne horizontální scroll.

| Den | Čas | Kurz | Délka | Cena |
|---|---|---|---|---|
| Středa | 14:00–15:00 | VitaDance 65+ | 60 min | 150 Kč |
| Středa | 16:30–18:00 | Kombinace tanečních technik – mládež 16+ | 90 min | 180 Kč |
| Středa | 18:30–20:00 | Kombinace tanečních technik – dospělí 18+ | 90 min | 180 Kč |
| Čtvrtek | 17:00–18:30 | Mix Dance – Energy 35+ | 90 min | 180 Kč |
| Čtvrtek | 19:00–20:30 | Mix Dance – Harmony 50+ | 90 min | 180 Kč |

Rozvrh a ceny musí být editovatelné klientkou (data, ne hardcoded HTML).

---

### 3.3 AKCE
Inspirace: https://www.divadloponec.cz/cs/letni-skola-tance

- **LETNÍ ŠKOLA TANCE** [foto: LETNÍ TANEČNÍ ŠKOLA] + text → vstup do světa Letní škola (vlastní barvy). Obsah **přenes ze staré PŠT stránky** (běží na současné doméně a po spuštění zmizí, takže texty zálohuj HNED).
- **AKCE & WORKSHOPY** [foto: AKCE A WORKSHOPY] + úvodní text (sekce *AKCE & WORKSHOPY*) + **kalendář akcí**:
  - Každá akce: název, datum, místo, cena, lektor, plakát, tlačítko **„Přidat do kalendáře“** (.ics + Google Calendar link).
  - Akce jako editovatelná kolekce. Minulé akce se automaticky skryjí.
  - **První akce:**
    - **Víkendový workshop pro ženy – „TĚLO V POHYBU, SRDCE V TANCI“**
    - 14.–15. 11. 2026, RZ Tramtáryje, Horní Jelení
    - Cena 3 800 Kč · Lektorka: Magdaléna Mauerová
    - Plakát: `akce-2026-11-15-workshop.png`

---

### 3.4 PRO VÁS
- **ČASTÉ DOTAZY**: vlevo [foto: FOTO TĚLOCVIČNY], vpravo FAQ jako akordeon. Inspirace: https://www.pnsd.fr/en/faq. Texty: sekce *FAQ* (20 otázek; opravy viz sekce 7).
- **OHLASY – Co o nás lidé říkají**. Inspirace: https://onerhythm.uk/#sec44. **Zatím nejsou texty.** Komponentu připrav a **na webu skryj**, dokud klientka nedodá citace.
- **GALERIE**: mřížka + lightbox. Fotky, které se nevešly jinam (klientka dodá výběr).

---

### 3.5 KONTAKT
Inspirace: https://dasocal.com/contact-us/
- **KDE NÁS NAJDETE**: Taneční centrum Monsignore, Lány u Dašic 34 · mapa (embed) + **[ UKÁZAT NA MAPĚ ]** (odkaz do Mapy.cz/Google)
- **Kontaktujte nás**: „Neváhejte nás kontaktovat telefonicky nebo e-mailem.“
  „*Vzhledem k velkému množství dotazů se může doba odpovědi zpozdit. Doporučujeme vám zavolat nám.“
- E-mail: info@monsignore.cz · Telefon: 775 765 556 (klikací `tel:`)
- `[DOPLNIT: parkování / doprava]`

---

### 3.6 TANEČNĚ-POHYBOVÁ TERAPIE (samostatný svět)
- Vlastní theme (zeleno-béžová dle Anety), stejný layout.
- **Texty zatím NEJSOU.** Připrav strukturu stránky (hero, o terapii, pro koho, jak probíhá, lektorka, kontakt) s placeholdery `[DOPLNIT]`.

---

## 4. Fotky

- 12 složek z Mail Dropu, **názvy složek = bloky výše** (1:1).
- Klientka upozorňuje: fotky je nutné **upravit velikostí i orientací, některé přiblížit (ořez) podle ostrosti**. Nekvalitní/rozmazané nepoužívej v hero.
- Export: WebP (+ JPG fallback), max 2400 px delší strana pro hero, 1200 px pro karty, `srcset`, `loading="lazy"` (kromě první hero fotky), smysluplný `alt` česky.
- Nepoužité fotky → Galerie.

---

## 5. Technické minimum

- Mobile-first, otestovat 360 px, 768 px, 1280 px, 1920 px.
- Lighthouse: Performance ≥ 85, Accessibility ≥ 95 (mobil).
- SEO: `title` + `meta description` pro každou stránku, OG obrázek, `sitemap.xml`, hezké URL (`/kurzy/energy-harmony`, `/akce`, `/terapie`, `/letni-skola`…).
- Přesměrování starých URL (hlavně PŠT stránka) na nové (301).
- Žádné cookies/trackery bez souhlasu.

---

## 6. Postup práce (doporučené pořadí)

1. Zálohovat obsah staré PŠT stránky (texty + fotky).
2. Design tokeny: fonty + barvy 3 světů jako CSS proměnné.
3. Home (hero + čtverce + příběh) → **ukázat Filipovi**.
4. Tančete s námi: přehled, šablona detailu, 3 detaily, individuální výuka, rozvrh.
5. Pro vás + Kontakt.
6. Akce + kalendář + Letní škola.
7. Terapie (kostra s placeholdery).
8. Podstránky Náš přístup / Vedení / Náš příběh.
9. Fotky doladit, Lighthouse, mobil, kontrola podle checklistu níže.

---

## 7. Rozhodnuto / opravy obsahu

Klientka už odpověděla:
- Kurzy pro děti a školka Tiny Tutus **neplatí**, nikde neuvádět.
- **Tanec PLUS** pryč. Fyzio-cvičení a terapie v textu Náš příběh **ponechat**.
- Věta „Ne každý tanečník musí stát na jevišti…“ v Náš přístup **jen jednou**, jako závěrečný citát.
- Letní škola se přenese do nového webu (OK od klientky).
- Hero texty: platí tabulka v sekci 3.1 (novější než docx).

Opravy překlepů (udělej rovnou):
- „Našim cílem“ → „Naším cílem“
- „seběvědomí“ → „sebevědomí“
- „Magdalena Mauerová“ → „Magdaléna Mauerová“ (všude stejně)

---

## 8. Čeká na klientku (NEBLOKUJE, dej placeholder + `TODO.md`)

- [ ] Texty pro **Tanečně-pohybovou terapii**
- [ ] Soubory fontů **Now + Respondent** (pokud nejsou v podkladech)
- [ ] Finální **název hlavního kurzu** (pracovně „Kombinace tanečních technik“; v textech i „Komplexní taneční průprava“)
- [ ] Zmínky o **dětech/juniorech** ve FAQ (ot. 2, 3, 19) a u individuální výuky. Pracovně: děti vyhodit, ale označ to v `TODO.md`.
- [ ] Rok založení na Home: 1988 (soubor) vs. 1992 (centrum)
- [ ] **Parkování / doprava** na Kontakt
- [ ] FAQ ot. 10 je useknutá („…individuální formy práce,“) a ot. 9 je v rozporu s „lze se přihlásit i během roku“
- [ ] **Ohlasy** (citace)
- [ ] Odkaz na web **Arabesque**
- [ ] Výběr fotek do **Galerie**

---

## 9. Checklist před ukázáním klientce

- [ ] Menu a pořadí bloků 1:1 se sekcí 3
- [ ] Každý blok má správnou složku fotek
- [ ] Texty doslova z `texty-monsignore.md` (+ opravy ze sekce 7)
- [ ] Fonty: Now nadpisy, DM Sans text, Respondent motta, diakritika OK
- [ ] 3 barevné světy fungují
- [ ] Rozvrh/ceník sedí s detaily kurzů (časy, ceny, data začátku)
- [ ] Všechny CTA vedou na `mailto:` / `tel:`
- [ ] Mobil bez horizontálního scrollu
- [ ] Všechno editovatelné inline
- [ ] Žádný vymyšlený text, všude místo něj `[DOPLNIT]`
- [ ] Nasazeno na wp.heurekazo.cz + `CHANGELOG.md`
