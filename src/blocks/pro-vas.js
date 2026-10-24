import photos from '../data/photos.json';
import site from '../data/site.json';
import { picture } from './media.js';
import { paragraphs } from './layout.js';

// Časté dotazy (brief 3.4): vlevo fotka sálu (na desktopu drží při scrollu), vpravo akordeon
export const faq = ({ title, image, items }) => `
  <section class="section">
    <div class="site-container faq">
      <div class="faq__media reveal">
        <div class="framed framed--portrait">
          <div class="framed__inner">${picture(image, { sizes: '(min-width: 768px) 40vw, 100vw' })}</div>
        </div>
      </div>
      <div class="faq__list">
        <h1 class="faq__title reveal">${title}</h1>
        ${items.map(({ question, answer, list }) => `
          <details class="faq-item reveal">
            <summary class="faq-item__question">${question}<span class="nav-indicator" aria-hidden="true"></span></summary>
            <div class="faq-item__answer prose-copy">
              ${answer ? paragraphs(answer) : ''}
              ${list ? `<ul class="faq-item__list">${list.map((item) => `<li>${item}</li>`).join('')}</ul>` : ''}
            </div>
          </details>`).join('')}
      </div>
    </div>
  </section>`;

// Ohlasy: komponenta je připravená, ale dokud klientka nedodá citace, nevykreslí se (hidden / prázdná data)
export const testimonials = ({ hidden, title, items }) => (hidden || !items.length ? '' : `
  <section class="section">
    <div class="site-container">
      <div class="pattern-panel reveal">
        <p class="pattern-panel__accent">${title}</p>
        ${items.map(({ text, author }) => `
          <blockquote class="testimonial">
            <p class="testimonial__text">${text}</p>
            <cite class="testimonial__author">${author}</cite>
          </blockquote>`).join('')}
      </div>
    </div>
  </section>`);

// Galerie: mozaika ve sloupcích, každá fotka otevře lightbox (initLightbox v main.js)
export const gallery = ({ title, items, tone = 'section--surface' }) => `
  <section class="section ${tone}" id="galerie">
    <div class="site-container">
      ${title ? `<h2 class="section-title__heading section-title--center mb-12 md:mb-16">${title}</h2>` : ''}
      <div class="gallery" data-lightbox>
        ${items.map((image) => {
          const { widths, width, height } = photos[image.key];
          const full = widths.at(-1);
          return `
          <a class="gallery__item reveal" href="img/${image.key}-${full}.webp"
            data-width="${width}" data-height="${height}" aria-label="Zvětšit fotografii: ${image.alt}">
            ${picture(image, { sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw' })}
          </a>`;
        }).join('')}
      </div>
    </div>
  </section>`;

// Kontakt (brief 3.5): kontaktujte nás, kde nás najdete, mapa načtená až po kliknutí (bez cookies třetích stran)
export const contact = ({ find, reach, image }) => `
  <section class="section">
    <div class="site-container split">
      <div class="split__copy reveal">
        <h2 class="section-title__heading">${reach.title}</h2>
        <p class="mt-6">${reach.text}</p>
        <div class="contact-links">
          <a href="${site.phoneHref}">${site.phone}</a>
          <a href="mailto:${site.email}">${site.email}</a>
        </div>
        <p class="contact-note">${reach.note}</p>
      </div>
      <div class="framed framed--landscape split__media reveal reveal-delay-1">
        <div class="framed__inner">${picture(image, { sizes: '(min-width: 768px) 50vw, 100vw' })}</div>
      </div>
    </div>
  </section>
  <section class="section section--surface">
    <div class="site-container contact-find">
      <div class="reveal">
        <h2 class="section-title__heading">${find.title}</h2>
        <address class="contact-address">${find.address.join('<br>')}</address>
        <p class="mt-6">${find.transport}</p>
        <a class="btn btn--dark mt-10" href="${find.mapLink}" target="_blank" rel="noopener">${find.mapLabel}</a>
      </div>
      <div class="map reveal reveal-delay-1" data-map="${find.mapEmbed}">
        <button type="button" class="map__load">
          <span class="map__pin" aria-hidden="true"></span>
          <span class="map__label">Načíst mapu</span>
          <span class="map__hint">Mapa se načte z Google Maps.</span>
        </button>
      </div>
    </div>
  </section>`;
