import photos from '../data/photos.json';

// Fotka z public/img (zpracovaná scripts/photos.sh): WebP + JPG fallback, srcset, rozměry proti posunu layoutu.
export const picture = ({ key, alt }, { sizes = '100vw', eager = false } = {}) => {
  const meta = photos[key];
  if (!meta) throw new Error(`Fotka „${key}“ není v src/data/photos.json, spusť scripts/photos.sh`);
  const srcset = (ext) => meta.widths.map((w) => `img/${key}-${w}.${ext} ${w}w`).join(', ');
  const fallback = meta.widths.find((w) => w >= 1200) ?? meta.widths.at(-1);
  const loading = eager ? 'fetchpriority="high"' : 'loading="lazy"';
  return `<picture class="picture">
      <source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}">
      <img class="photo" src="img/${key}-${fallback}.jpg" srcset="${srcset('jpg')}" sizes="${sizes}"
        width="${meta.width}" height="${meta.height}" alt="${alt}" ${loading} decoding="async">
    </picture>`;
};

