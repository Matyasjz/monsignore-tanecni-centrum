import { media } from './media.js';

export const paragraphs = (list) => list.map((text) => `<p>${text}</p>`).join('');

export const framed = (image, alt, shape = 'landscape', className = '') => `
  <figure class="framed framed--${shape} ${className}">
    <div class="framed__inner">${media(image, alt, { sizes: '(min-width: 768px) 50vw, 100vw' })}</div>
  </figure>`;

export const sectionTitle = ({ script, title, center = false }) => `
  <div class="section-title ${center ? 'section-title--center' : ''}">
    ${script ? `<span class="section-title__script" aria-hidden="true">${script}</span>` : ''}
    <h2 class="section-title__heading">${title}</h2>
  </div>`;

export const pageIntro = ({ script, title, lead }) => `
  <section class="page-intro">
    <div class="page-intro__inner reveal">
      ${script ? `<span class="page-intro__script" aria-hidden="true">${script}</span>` : ''}
      <h1 class="page-intro__title">${title}</h1>
      ${lead ? `<p class="page-intro__lead">${lead}</p>` : ''}
    </div>
  </section>`;

export const split = ({ image, alt, shape = 'landscape', script, title, body, after = '', reverse = false, tone = '' }) => `
  <section class="section ${tone}">
    <div class="site-container split ${reverse ? 'split--reverse' : ''}">
      ${framed(image, alt, shape, 'split__media reveal')}
      <div class="split__copy reveal reveal-delay-1">
        ${sectionTitle({ script, title })}
        <div class="prose-copy">${paragraphs(body)}</div>
        ${after}
      </div>
    </div>
  </section>`;

export const timeline = (items) => `
  <section class="section">
    <div class="timeline">
      ${items.map(({ marker, title, body }) => `
        <article class="timeline__item reveal">
          <span class="timeline__marker">${marker}</span>
          <div class="timeline__body prose-copy">
            <h2>${title}</h2>
            ${paragraphs(body)}
          </div>
        </article>`).join('')}
    </div>
  </section>`;

export const wideFigure = (image, alt) => `
  <figure class="wide-figure reveal">
    <div class="wide-figure__inner">${media(image, alt)}</div>
  </figure>`;

export const continueTo = ({ script, label, href }) => `
  <section class="section section--tight">
    <div class="site-container text-center reveal">
      ${script ? `<span class="section-title__script" aria-hidden="true">${script}</span>` : ''}
      <a class="link-line relative" href="${href}">${label}</a>
    </div>
  </section>`;

// Rozbalovací část textu (v textech klientky označená „Zjistit více“)
export const more = (list, label = 'Zjistit více') => `
  <details class="more">
    <summary class="more__toggle">${label}<span class="nav-indicator" aria-hidden="true"></span></summary>
    <div class="more__body prose-copy">${paragraphs(list)}</div>
  </details>`;

// Pudrový panel se vzorem oblouků: akcent v Respondentu, nadpis, linka, text a jedna akce
export const patternPanel = ({ accent, title, text, cta, className = '' }) => `
  <div class="pattern-panel ${className} reveal">
    ${accent ? `<p class="pattern-panel__accent">${accent}</p>` : ''}
    <h2 class="pattern-panel__title">${title}</h2>
    <span class="rule" aria-hidden="true"></span>
    <p class="pattern-panel__text">${text}</p>
    ${cta ? `<a class="btn btn--dark mt-10" href="${cta.href}">${cta.label}</a>` : ''}
  </div>`;

// Úvod stránky na barevném panelu (světy bez vlastních fotek: Letní škola, Terapie)
export const panelHero = ({ accent, title, text, note }) => `
  <section class="panel-hero">
    <div class="site-container">
      <div class="pattern-panel panel-hero__panel reveal">
        ${accent ? `<p class="pattern-panel__accent">${accent}</p>` : ''}
        <h1 class="pattern-panel__title panel-hero__title">${title}</h1>
        <span class="rule" aria-hidden="true"></span>
        ${text ? `<p class="pattern-panel__text">${text}</p>` : ''}
        ${note ? `<p class="panel-hero__note">${note}</p>` : ''}
      </div>
    </div>
  </section>`;

// Sekce s nadpisem a odstavci v úzkém sloupci
export const textSection = ({ title, paragraphs: list, tone = '' }) => `
  <section class="section ${tone}">
    <div class="site-container--read reveal">
      <h2 class="course-section__heading">${title}</h2>
      <div class="prose-copy">${paragraphs(list)}</div>
    </div>
  </section>`;
