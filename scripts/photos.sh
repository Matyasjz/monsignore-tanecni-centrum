#!/bin/bash
# Zpracuje originály z NEW_ASSETS/ do public/img/ (WebP + JPG ve více šířkách)
# a zapíše rozměry do src/data/photos.json.
#
# Potřebuje: sips (macOS), ffmpeg (EXIF orientace, ořez, zmenšení), cwebp.
# NEW_ASSETS/ se jen čte. Spuštění: bash scripts/photos.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/NEW_ASSETS"
OUT="$ROOT/public/img"
MANIFEST="$ROOT/src/data/photos.json"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

WIDTHS="480 800 1200 1600 2400"

# klíč (= cesta v public/img bez přípony) | zdroj v NEW_ASSETS | max. šířka | ffmpeg ořez (volitelně)
# Ořez se zadává ve zlomcích rozměru (iw/ih), aby nezávisel na rozlišení.
PHOTOS="$(cat <<'EOF'
hero/tancete-srdcem|HLAVNÍ 3 ROTUJÍCÍ FOTKY/DSC_0268.jpg|2400|
hero/objevte-sami-sebe|HLAVNÍ 3 ROTUJÍCÍ FOTKY/mrtvá nevěsta.jpg|2400|
hero/s-chuti-a-lehkosti|HLAVNÍ 3 ROTUJÍCÍ FOTKY/sejmout_1.jpg|2400|crop=iw*0.97:ih*0.965:iw*0.015:ih*0.015
nas-pristup/studio|NÁŠ PŘÍSTUP/IMG_0645.HEIC|1200|
vedeni/magdalena-mauerova|VEDENÍ/DSCF7187.JPG|1200|
nas-pribeh/archiv|NÁŠ PŘÍBĚH/page-00.jpg|1400|
kurzy/mladez-a-dospeli|KURZY PRO MLÁDEŽ A DOSPĚLÉ/IMG_0615.HEIC|1600|
kurzy/energy-harmony|KURZY ENERGY A HARMONY/IMG_1309.HEIC|1600|
kurzy/energy-harmony-skupina|KURZY ENERGY A HARMONY/7177c707-f80b-4c1e-b5c8-4976b00a0bc3.jpg|1600|
kurzy/energy|KURZY ENERGY A HARMONY/IMG_0598.HEIC|1200|
kurzy/harmony|KURZY ENERGY A HARMONY/IMG_0587.HEIC|1200|
kurzy/vitadance|KURZY VITADANCE/IMG_1177.HEIC|1600|
kurzy/vitadance-ruce|KURZY VITADANCE/new-therapy-dance-style-003.jpg|1200|
individualni-vyuka/lekce|INDIVIDUÁLNÍ VÝUKA/DSC_0636.JPG|1600|
individualni-vyuka/sal|INDIVIDUÁLNÍ VÝUKA/DSC_0564.jpg|1600|
individualni-vyuka/zrcadlo|INDIVIDUÁLNÍ VÝUKA/IMG_0584.HEIC|1200|
akce/svicky|AKCE A WORKSHOPY/IMG_2856.HEIC|1600|
akce/relax|AKCE A WORKSHOPY/IMG_2877.HEIC|1600|
akce/vecerni-sal|AKCE A WORKSHOPY/IMG_2897.HEIC|1600|
telocvicna/svicky|FOTO TĚLOCVIČNY/IMG_2857.HEIC|1600|
telocvicna/sal|FOTO TĚLOCVIČNY/IMG_8334.HEIC|1600|
galerie/sal-podlozky|FOTO TĚLOCVIČNY/IMG_2867.HEIC|1600|
galerie/sal-okno|FOTO TĚLOCVIČNY/IMG_8337.HEIC|1600|
galerie/zahrada|NÁŠ PŘÍSTUP/náš přístup.jpg|1600|
galerie/protahovani|NÁŠ PŘÍSTUP/new-therapy-dance-style-008.jpg|1600|
galerie/zrcadlo-dance|KURZY ENERGY A HARMONY/IMG_1224.HEIC|1600|
galerie/predstaveni-cerna|HLAVNÍ 3 ROTUJÍCÍ FOTKY/page-09.jpg|1600|
galerie/adult-001|GALERIE/adult-001.jpeg|1600|
galerie/adult-002|GALERIE/adult-002.jpeg|1600|
galerie/adult-004|GALERIE/adult-004.jpeg|1600|
galerie/adult-005|GALERIE/adult-005.jpeg|1600|
galerie/adult-006|GALERIE/adult-006.jpeg|1600|
galerie/adult-007|GALERIE/adult-007.jpeg|1600|
galerie/adult-009|GALERIE/adult-009.jpeg|1600|
galerie/adult-010|GALERIE/adult-010.jpeg|1600|
galerie/adult-011|GALERIE/adult-011.jpeg|1600|
galerie/adult-012|GALERIE/adult-012.jpeg|1600|
galerie/adult-014|GALERIE/adult-014.jpeg|1600|
galerie/adult-015|GALERIE/adult-015.jpeg|1600|
galerie/adult-017|GALERIE/adult-017.jpeg|1600|
galerie/adult-018|GALERIE/adult-018.jpeg|1600|
galerie/adult-020|GALERIE/adult-020.jpeg|1600|
EOF
)"

mkdir -p "$OUT" "$(dirname "$MANIFEST")"
echo "{" > "$TMP/manifest"
first=1

while IFS='|' read -r key source max crop; do
  [ -z "$key" ] && continue
  mkdir -p "$OUT/$(dirname "$key")"

  # 1) sips umí HEIC; EXIF orientaci nechá v souboru
  sips -s format jpeg -s formatOptions 100 "$SRC/$source" --out "$TMP/in.jpg" >/dev/null
  # 2) ffmpeg podle EXIF fyzicky otočí a případně ořízne → bezztrátové PNG
  ffmpeg -nostdin -loglevel error -y -i "$TMP/in.jpg" ${crop:+-vf "$crop"} -frames:v 1 "$TMP/full.png"

  srcw=$(sips -g pixelWidth "$TMP/full.png" | awk '/pixelWidth/{print $2}')
  srch=$(sips -g pixelHeight "$TMP/full.png" | awk '/pixelHeight/{print $2}')
  cap=$(( srcw < max ? srcw : max ))

  done_widths=""
  for w in $WIDTHS $cap; do
    [ "$w" -gt "$cap" ] && continue
    case " $done_widths " in *" $w "*) continue ;; esac
    ffmpeg -nostdin -loglevel error -y -i "$TMP/full.png" -vf "scale=$w:-2:flags=lanczos" "$TMP/w.png"
    sips -s format jpeg -s formatOptions 72 "$TMP/w.png" --out "$OUT/$key-$w.jpg" >/dev/null
    cwebp -quiet -q 78 -metadata none "$TMP/w.png" -o "$OUT/$key-$w.webp"
    done_widths="$done_widths $w"
  done

  widths_json=$(echo $done_widths | tr ' ' '\n' | sort -n | paste -sd, -)
  outh=$(( srch * cap / srcw ))
  [ $first -eq 1 ] && first=0 || echo "," >> "$TMP/manifest"
  printf '  "%s": { "width": %d, "height": %d, "widths": [%s] }' "$key" "$cap" "$outh" "$widths_json" >> "$TMP/manifest"
  echo "✓ ${key} (${cap}×${outh}: ${widths_json})"
done <<< "$PHOTOS"

printf '\n}\n' >> "$TMP/manifest"
mv "$TMP/manifest" "$MANIFEST"
