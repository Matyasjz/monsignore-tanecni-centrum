# TODO – otevřené věci

## Rozhodnuto 24. 10. 2026
- [x] Routing: v šabloně hash, slugy = budoucí hezké URL (tabulka v `AGENTS.md`). SEO a 301 až v editoru.
- [x] Inline editace: řeší vlastní editor, šablona jen drží data a bloky oddělené.
- [x] Deploy: `dist/` nahrává uživatel ručně.
- [x] Barvy: centrum = současná paleta, ostatní světy odvozené.
- [x] Logo: monogram `NEW_ASSETS/LOGO.png`.
- [x] Záloha PŠT se nedělá, starý web běží dál.
- [x] Fonty Now a Respondent (z podkladů Filipa).
- [ ] Respondent: současný soubor má místo číslic 0–9 a znaku § vodoznak. Číslice teď vykresluje DM Sans (`unicode-range` ve `style.css`). Po dodání licencované verze vyměnit `public/fonts/respondent-bold.woff2` a `unicode-range` smazat.

## Čeká na klientku / grafičku (brief, sekce 8)
- [ ] Barvy od Anety (`/design/barvy`, 4 obrázky). Centrum zatím používá současnou paletu webu, terapie a letní škola jsou odvozené. Po dodání stačí přepsat tokeny ve `style.css` a spustit `scripts/brand.sh`.
- [ ] Texty pro Tanečně-pohybovou terapii (`src/data/terapie.json`: úvod, O terapii, Pro koho, Jak probíhá, cena) a fotky (žádná složka)
- [ ] Finální název hlavního kurzu: „Kombinace tanečních technik“ (brief) vs. „Komplexní taneční průprava“ (rozvrh v textech)
- [ ] Děti/junioři ve FAQ (ot. 2, 3, 19). Ot. 3 navíc uvádí „60+ nebo 70+“, ale kurz je 65+.
- [ ] Rok založení na Home: 1988 vs. 1992
- [ ] Parkování / doprava na Kontakt
- [ ] FAQ ot. 10 je useknutá („…individuální formy práce,“)
- [ ] FAQ ot. 9 („záleží na kurzu“) je v rozporu s „Je možné se přihlásit i během roku.“ u všech kurzů
- [ ] Ohlasy (citace + souhlas se zveřejněním)
- [ ] Výběr fotek do Galerie. Dodané fotky v `GALERIE/` mají jen 320 × 240 px, pro lightbox jsou nepoužitelné. Potřebujeme originály. Dvě jsou s dětmi (`childern-006`, `childern-012`).
- [ ] Plakát `akce-2026-11-15-workshop.png` a čas workshopu 14.–15. 11. 2026
- [ ] Odkaz na web Arabesque

## Fotky
- [ ] `ROZVRH A CENÍK`: složka je prázdná
- [ ] `LETNÍ TANEČNÍ ŠKOLA`: obsahuje jen prázdnou podsložku „Bez názvu“
- [ ] `HLAVNÍ 3 ROTUJÍCÍ FOTKY`: `C54B7CFD…PNG` je duplikát `mrtvá nevěsta.jpg`. Ze 4 unikátních fotek jsou 3 použitelné v hero, `page-09.jpg` má jen 1400 px. Žádná nemá 2400 px kromě `sejmout_1.jpg` (ta má bílý rám skenu).
- [ ] `KURZY PRO MLÁDEŽ A DOSPĚLÉ/1DuqGObOmn8DRvc9LeJAxSTuA3qh5Z64R-1.jpg` vypadá jako fotobanka nebo cizí studio. Ověřit původ a práva. `childern-020.jpg` jsou děti a nepoužije se.
- [ ] `AKCE A WORKSHOPY/10.jpg` má jen 600 × 200 px. Ostatní fotky akcí (relaxační místnost, svíčky) spíš pasují k terapii.
- [ ] `KURZY VITADANCE/new-therapy-dance-style-003.jpg` a `NÁŠ PŘÍSTUP/new-therapy-dance-style-008.jpg` mají jen 1024 px

## Letní škola
- [ ] Ročník 2026 (16.–22. 8. 2026) už proběhl. Termíny a ceny pro 2027?
- [ ] Starý web má Facebook pixel. Na novém nebude (brief, sekce 5).

## Legacy podstránky (z předchozí verze, čekají na svůj krok v PLAN.md)
- [ ] `#/nas-pristup`, `#/vedeni`, `#/nas-pribeh` (krok 8): parafráze místo doslovných textů, vymyšlená ozdobná slova, „výkonnostní třída A“, Tanec PLUS

## Home (krok 3)
- [ ] Hero: na mobilu (390 px) ořez `object-fit: cover` ukazuje jen střed fotek. Po výběru finálních fotek případně doladit `object-position` pro jednotlivé slidy.
- [ ] Blok Náš příběh: rok 1988 (podle briefu). Viz otevřený bod „Rok založení na Home“ výše.

## Tančete s námi (krok 4)
- [ ] Řádky „Kdy?“ se generují z `rozvrh.json` v jednotném tvaru („Každou středu 16:30–18:00“). V textech jsou nejednotně („od 16:30 – 18:00“, „od 17 – 18:30“, „od 14:00 do 15:00“). Potvrdit s klientkou.
- [ ] Energy a Harmony mají v textech stejnou rozbalovací část. Na webu je jednou, společně pod oběma kurzy, aby se text neopakoval.
- [ ] Nadpisy v textech mají mezeru navíc: „(věk 35+ )“, „(věk 50+ )“. Ponecháno doslova, opravit?
- [ ] VitaDance, registrace: „telefón: 775765556“ (slovensky). Ponecháno doslova, opravit na „telefon“?
- [ ] Rozvrh: název kurzu „Kombinace tanečních technik“ (brief) vs. „Komplexní taneční průprava“ (texty). Mění se na jednom místě v `rozvrh.json`.
- [ ] Blok Rozvrh, ceník na přehledu nemá fotku (složka `ROZVRH A CENÍK` je prázdná), zatím je to vzorovaný panel.
- [ ] Nepoužité fotky pro Galerii: `KURZY ENERGY A HARMONY/IMG_1224.HEIC`, `kurzy/energy-harmony-skupina` (selfie, zpracovaná, zatím nepoužitá) a `KURZY PRO MLÁDEŽ A DOSPĚLÉ/1Duq…jpg` (čeká na ověření původu).

## Pro vás a Kontakt (krok 5)
- [ ] Galerie: 15 fotek z `GALERIE/` má jen 240–320 px, v mřížce jsou neostré a lightbox je nezvětšuje. Potřebujeme originály a výběr od klientky.
- [ ] FAQ ot. 2 zmiňuje „od juniorů“. Ponecháno doslova, rozhodnout s klientkou (kurzy pro děti nejsou).
- [ ] FAQ ot. 10 má viditelný `[DOPLNIT]`, text v podkladech končí čárkou.
- [ ] FAQ ot. 18: slovo „Ceník“ je odkaz na `#/kurzy/rozvrh-a-cenik` (text beze změny).
- [ ] Kontakt: mapa je Google Maps embed bez API klíče, načte se až po kliknutí. Pokud klientka chce Mapy.cz i jako embed, je potřeba jejich API klíč.
- [ ] Ohlasy: doplnit citace (jméno, role, souhlas se zveřejněním) do `src/data/pro-vas.json` a nastavit `"hidden": false`.

## Akce a Letní škola (krok 6)
- [ ] Workshop 14.–15. 11. 2026: chybí plakát (`akce-2026-11-15-workshop.png`) a čas. V kalendáři je zatím celodenní událost.
- [ ] Letní škola: termín, ceník a přihláška pro rok 2027. Fotky (složka `LETNÍ TANEČNÍ ŠKOLA` je prázdná).
- [ ] Letní škola: lektorský tým je z roku 2026, ověřit pro 2027. Texty o místě a seznam technik jsou převzaté ze staré stránky, potvrdit s klientkou.
- [ ] Stará stránka Letní školy používá přihlášku `monsignore.heurekazo.cz/form/event/54`. Chceme ji napojit místo `mailto:`?
