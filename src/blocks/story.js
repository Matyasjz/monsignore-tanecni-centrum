import { picture } from './media.js';

// Náš příběh (brief 3.1 C): fotka přes celou šířku jako atmosféra, přes její spodní hranu přesahuje
// vzorovaný panel s textem a tlačítkem (vzor bloku s referencemi v Arabesque).
export const story = ({ accent, title, text, cta, image }) => `
  <section class="story">
    <div class="story__backdrop" data-parallax>${picture(image)}</div>
    <div class="story__panel reveal">
      ${accent ? `<p class="story__accent">${accent}</p>` : ''}
      <h2 class="story__title">${title}</h2>
      <span class="rule" aria-hidden="true"></span>
      <p class="story__text">${text}</p>
      <a class="btn btn--dark mt-10" href="${cta.href}">${cta.label}</a>
    </div>
  </section>`;
