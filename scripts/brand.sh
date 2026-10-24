#!/bin/bash
# Z NEW_ASSETS/LOGO.png (bílé PNG na průhledném pozadí) vytvoří do public/brand/:
#   logo-mask.png        maska pro CSS (barví ji token --c-logo)
#   logo-<svět>.png      logo v barvě --c-primary daného světa (e-maily, podklady)
#   favicon-32.png, apple-touch-icon.png, icon-512.png
#   og-image.png         1200×630 pro sdílení
# Barvy se čtou z tokenů v src/style.css, nic není natvrdo. Spuštění: bash scripts/brand.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOGO="$ROOT/NEW_ASSETS/LOGO.png"
CSS="$ROOT/src/style.css"
OUT="$ROOT/public/brand"
mkdir -p "$OUT"

# token <svět> <název> → hex (RRGGBB) z bloku [data-world='<svět>'] ve style.css
token() {
  local rgb
  rgb=$(awk -v world="data-world='$1'" -v name="--c-$2:" '
    index($0, world) { inside = 1 }
    inside && index($0, name) { sub(/.*: */, ""); sub(/;.*/, ""); print; exit }
    inside && /}/ { inside = 0 }
  ' "$CSS")
  [ -z "$rgb" ] && { echo "Token --c-$2 pro svět $1 nenalezen" >&2; exit 1; }
  printf '%02X%02X%02X' $rgb
}

# colored <hex> <velikost> <výstup>: logo v barvě na průhledném pozadí
colored() {
  ffmpeg -nostdin -loglevel error -y -i "$LOGO" -f lavfi -i "color=c=0x$1:s=800x800" \
    -filter_complex "[0:v]format=rgba,alphaextract[a];[1:v][a]alphamerge,scale=$2:$2:flags=lanczos" \
    -frames:v 1 "$3"
}

# on_bg <hex logo> <hex pozadí> <plátno ŠxV> <velikost loga> <výstup>
on_bg() {
  colored "$1" "$4" "$OUT/.tmp-logo.png"
  ffmpeg -nostdin -loglevel error -y -f lavfi -i "color=c=0x$2:s=$3" -i "$OUT/.tmp-logo.png" \
    -filter_complex "[0:v][1:v]overlay=(W-w)/2:(H-h)/2,format=rgb24" -frames:v 1 "$5"
  rm -f "$OUT/.tmp-logo.png"
}

ffmpeg -nostdin -loglevel error -y -i "$LOGO" -vf "scale=512:512:flags=lanczos" "$OUT/logo-mask.png"

for world in centrum terapie letni-skola; do
  colored "$(token "$world" primary)" 800 "$OUT/logo-$world.png"
done

primary=$(token centrum primary)
bg=$(token centrum bg)
colored "$primary" 32 "$OUT/favicon-32.png"
on_bg "$primary" "$bg" 180x180 144 "$OUT/apple-touch-icon.png"
on_bg "$primary" "$bg" 512x512 400 "$OUT/icon-512.png"
on_bg "$primary" "$bg" 1200x630 380 "$OUT/og-image.png"

ls -1 "$OUT"
