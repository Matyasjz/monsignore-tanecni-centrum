import { paragraphs, patternPanel } from './layout.js';

// Letní taneční škola: vlastní svět (data-world="letni-skola"), fotky ve složce zatím chybí,
// proto úvod stojí na barevném panelu místo fotky
export const summerHero = ({ title, accent, place, date }) => `
  <section class="summer-hero">
    <div class="site-container">
      <div class="pattern-panel summer-hero__panel reveal">
        <p class="pattern-panel__accent">${accent}</p>
        <h1 class="pattern-panel__title summer-hero__title">${title}</h1>
        <span class="rule" aria-hidden="true"></span>
        <p class="pattern-panel__text">${place}</p>
        <p class="summer-hero__date">${date}</p>
      </div>
    </div>
  </section>`;

export const summerIntro = ({ intro, courses }) => `
  <section class="section">
    <div class="site-container summer-intro">
      <div class="prose-copy summer-intro__text reveal">${paragraphs(intro)}</div>
      <div class="reveal reveal-delay-1">
        <h2 class="course-section__heading">${courses.title}</h2>
        <p>${courses.lead}</p>
        <ul class="chips">${courses.items.map((item) => `<li>${item}</li>`).join('')}</ul>
        <p class="mt-6 text-[14px]">${courses.note}</p>
      </div>
    </div>
  </section>`;

export const summerTeam = ({ title, names }) => `
  <section class="section section--surface">
    <div class="site-container reveal">
      <h2 class="section-title__heading section-title--center mb-12">${title}</h2>
      <ul class="team-names">${names.map((name) => `<li>${name}</li>`).join('')}</ul>
    </div>
  </section>`;

export const summerSignup = ({ title, text, cta }) => `
  <section class="section">
    <div class="site-container">${patternPanel({ title, text, cta })}</div>
  </section>`;
