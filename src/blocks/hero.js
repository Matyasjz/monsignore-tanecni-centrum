import { picture } from './media.js';

// Hero se 3 rotujícími fotkami (brief 3.1 A). Rotaci obsluhuje initHero() v main.js.
export const hero = ({ heading, slides }) => `
  <section class="hero" data-hero aria-roledescription="carousel" aria-label="Úvodní fotografie">
    <h1 class="sr-only">${heading}</h1>
    ${slides.map(({ motto, title, text, image }, index) => `
      <article class="hero__slide ${index === 0 ? 'is-active' : ''}" aria-roledescription="slide"
        aria-label="${index + 1} z ${slides.length}" ${index === 0 ? '' : 'aria-hidden="true" inert'}>
        <div class="hero__media">${picture(image, { eager: index === 0 })}</div>
        <div class="hero__scrim" aria-hidden="true"></div>
        <div class="hero__content">
          <p class="hero__motto">${motto}</p>
          <h2 class="hero__title">${title}</h2>
          <p class="hero__text">${text}</p>
        </div>
      </article>`).join('')}
    <div class="hero__controls">
      <div class="hero__dots" role="group" aria-label="Vybrat fotografii"></div>
      <button type="button" class="hero__pause" data-hero-pause aria-label="Zastavit střídání fotografií"></button>
    </div>
  </section>`;
