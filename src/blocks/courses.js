import site from '../data/site.json';
import { picture } from './media.js';
import { framed, more, paragraphs } from './layout.js';
import { lesson, lessonPayment, lessonPrice, lessonWhen } from './schedule.js';

const signupHref = (subject) => `mailto:${site.email}?subject=${encodeURIComponent(`Přihláška: ${subject}`)}`;

// Přehled kurzů: 3 karty (brief 3.2), prostřední je na desktopu posunutá dolů
export const courseCards = (courses, cta) => `
  <section class="section">
    <div class="course-cards">
      ${courses.map(({ slug, card, image }, index) => `
        <article class="course-card reveal ${index ? `reveal-delay-${index}` : ''}">
          <a class="course-card__media" href="#/kurzy/${slug}" tabindex="-1" aria-hidden="true">
            ${picture(image, { sizes: '(min-width: 768px) 30vw, 100vw' })}
          </a>
          <h2 class="course-card__title">${card.title}</h2>
          <p class="course-card__subtitle">${card.subtitle}</p>
          <p class="course-card__text">${card.text}</p>
          <a class="link-line course-card__link" href="#/kurzy/${slug}">${cta}</a>
        </article>`).join('')}
    </div>
  </section>`;

// Úvod detailu kurzu: věková skupina, název, případně motto, fotka v rámu
export const courseHero = ({ title, age, accent, image }) => `
  <section class="course-hero">
    <div class="site-container course-hero__grid">
      <div class="course-hero__copy reveal">
        <a class="course-hero__back" href="#/kurzy">Tančete s námi</a>
        <p class="course-hero__age">${age}</p>
        <h1 class="course-hero__title">${title}</h1>
        ${accent ? `<p class="course-hero__accent">${accent}</p>` : ''}
      </div>
      ${framed(image, image.alt, 'portrait', 'course-hero__media reveal reveal-delay-1')}
    </div>
  </section>`;

const sectionCopy = ({ heading, paragraphs: list = [], more: hidden = [] }) => `
  ${heading ? `<h2 class="course-section__heading">${heading}</h2>` : ''}
  ${list.length ? `<div class="prose-copy">${paragraphs(list)}</div>` : ''}
  ${hidden.length ? more(hidden) : ''}`;

// Popis kurzu: sekce s fotkou jako split (střídavě), bez fotky jako úzký sloupec textu
export const courseSections = (sections) => sections.map((section, index) => (section.image ? `
  <section class="section ${index ? 'pt-0 md:pt-0' : ''}">
    <div class="site-container split ${index % 2 ? 'split--reverse' : ''}">
      ${framed(section.image, section.image.alt, 'landscape', 'split__media reveal')}
      <div class="split__copy reveal reveal-delay-1">${sectionCopy(section)}</div>
    </div>
  </section>` : `
  <section class="section ${index ? 'pt-0 md:pt-0' : ''}">
    ${section.heading || section.paragraphs
    ? `<div class="site-container--read reveal">${sectionCopy(section)}</div>`
    : `<div class="site-container reveal"><div class="course-section--more">${sectionCopy(section)}</div></div>`}
  </section>`)).join('');

// Jednotlivé techniky v mřížce (Kurzy pro mládež a dospělé)
export const courseTopics = (topics) => `
  <section class="section pt-0 md:pt-0">
    <div class="site-container topics">
      ${topics.map((topic, index) => `
        <article class="topic reveal ${index % 2 ? 'reveal-delay-1' : ''}">${sectionCopy(topic)}</article>`).join('')}
    </div>
  </section>`;

// Praktické informace (Kdy / Kde / Začátek výuky) pro každou skupinu a karta Registrace s CTA
export const practicalInfo = ({ groups, registration, card, title }) => {
  const priced = lesson(registration.lesson);
  return `
  <section class="section section--surface">
    <div class="site-container">
      <h2 class="section-title__heading section-title--center mb-12 md:mb-16">Praktické informace</h2>
      <div class="practical">
        ${groups.map(({ label, lesson: id }, index) => {
          const item = lesson(id);
          return `
          <article class="info-card reveal ${index ? 'reveal-delay-1' : ''}">
            <h3 class="info-card__title">${label}</h3>
            <dl class="info-list">
              <div><dt>Kdy?</dt><dd>${lessonWhen(item)}</dd></div>
              <div><dt>Kde?</dt><dd>${site.address}</dd></div>
              <div><dt>Začátek výuky:</dt><dd>${item.start}</dd></div>
            </dl>
            <p class="info-card__note">Je možné se přihlásit i během roku.</p>
          </article>`;
        }).join('')}
        <article class="info-card info-card--accent reveal reveal-delay-2">
          <h3 class="info-card__title">Registrace</h3>
          <dl class="info-list">
            <div><dt>E-mail:</dt><dd>${registration.contact ?? `<a href="mailto:${site.email}">${site.email}</a>`}</dd></div>
            <div><dt>Cena za lekci:</dt><dd>${lessonPrice(priced)}</dd></div>
            <div><dt>Platba:</dt><dd>${lessonPayment(priced)}</dd></div>
          </dl>
          <a class="btn btn--solid mt-8" href="${signupHref(card?.subtitle ?? title)}">Přihlásit se</a>
        </article>
      </div>
    </div>
  </section>`;
};

// Samostatné CTA pro stránky bez rozvrhu (individuální výuka)
export const courseSignup = (subject) => `
  <section class="section section--tight section--surface">
    <div class="site-container text-center reveal">
      <a class="btn btn--solid" href="${signupHref(subject)}">Přihlásit se</a>
    </div>
  </section>`;
