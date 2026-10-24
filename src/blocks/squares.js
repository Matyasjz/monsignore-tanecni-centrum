import { picture } from './media.js';

// Dva čtverce vedle sebe (brief 3.1 B): fotka, přes její spodek přesahuje karta s textem a odkazem.
// Druhý čtverec je na desktopu posunutý dolů, za oběma je diagonální plocha v barvě světa.
export const squares = (items) => `
  <section class="squares-section">
    <div class="squares">
      ${items.map(({ title, subtitle, quote, text, cta, image }, index) => `
        <article class="square reveal ${index ? 'reveal-delay-1' : ''}">
          <a class="square__media" href="${cta.href}" tabindex="-1" aria-hidden="true">
            ${picture(image, { sizes: '(min-width: 768px) 45vw, 100vw' })}
          </a>
          <div class="square__card">
            <h2 class="square__title">${title}</h2>
            ${subtitle ? `<p class="square__subtitle">${subtitle}</p>` : ''}
            ${quote ? `<blockquote class="square__quote"><p>${quote.text}</p><cite>${quote.author}</cite></blockquote>` : ''}
            <p class="square__text">${text}</p>
            <a class="link-line square__link" href="${cta.href}">${cta.label}</a>
          </div>
        </article>`).join('')}
    </div>
  </section>`;
