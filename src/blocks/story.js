import { picture } from './media.js';
import { patternPanel } from './layout.js';

// Náš příběh (brief 3.1 C): fotka přes celou šířku jako atmosféra, přes její spodní hranu přesahuje
// vzorovaný panel s textem a tlačítkem (vzor bloku s referencemi v Arabesque).
export const story = ({ image, ...panel }) => `
  <section class="story">
    <div class="story__backdrop" data-parallax>${picture(image)}</div>
    ${patternPanel({ ...panel, className: 'story__panel' })}
  </section>`;
