import { picture } from './media.js';

export const paragraphs = (list) => list.map((text) => `<p>${text}</p>`).join('');

export const framed = (image, shape = 'landscape', className = '') => `
  <figure class="framed framed--${shape} ${className}">
    <div class="framed__inner">${picture(image, { sizes: '(min-width: 768px) 50vw, 100vw' })}</div>
  </figure>`;

export const sectionTitle = ({ title }) => `
  <div class="section-title">
    <h2 class="section-title__heading">${title}</h2>
  </div>`;

export const pageIntro = ({ title, lead }) => `
  <section class="page-intro">
    <div class="page-intro__inner reveal">
      <h1 class="page-intro__title">${title}</h1>
      ${lead ? `<p class="page-intro__lead">${lead}</p>` : ''}
    </div>
  </section>`;

// Úvod stránky s fotkou v rámu: zpětný odkaz, štítek, nadpis, případně motto v Respondentu s autorem
export const pageHero = ({ title, label, accent, cite, image, back }) => `
  <section class="page-hero">
    <div class="site-container page-hero__grid">
      <div class="page-hero__copy reveal">
        ${back ? `<a class="page-hero__back" href="${back.href}">${back.label}</a>` : ''}
        ${label ? `<p class="page-hero__label">${label}</p>` : ''}
        <h1 class="page-hero__title">${title}</h1>
        ${accent ? `<p class="page-hero__accent">${accent}</p>` : ''}
        ${cite ? `<p class="page-hero__cite">${cite}</p>` : ''}
      </div>
      ${framed(image, 'portrait', 'page-hero__media reveal reveal-delay-1')}
    </div>
  </section>`;

export const split = ({ image, shape = 'landscape', title, body, after = '', reverse = false, tone = '' }) => `
  <section class="section ${tone}">
    <div class="site-container split ${reverse ? 'split--reverse' : ''}">
      ${framed(image, shape, 'split__media reveal')}
      <div class="split__copy reveal reveal-delay-1">
        ${sectionTitle({ title })}
        <div class="prose-copy">${paragraphs(body)}</div>
        ${after}
      </div>
    </div>
  </section>`;

// Rozbalovací část textu (v textech klientky označená „Zjistit více“)
export const more = (list, label = 'Zjistit více') => `
  <details class="more">
    <summary class="more__toggle">${label}<span class="nav-indicator" aria-hidden="true"></span></summary>
    <div class="more__body prose-copy">${paragraphs(list)}</div>
  </details>`;

// Text sekce: nadpis, odstavce a případná rozbalovací část
export const copy = ({ heading, paragraphs: list = [], more: hidden = [] }) => `
  ${heading ? `<h2 class="section-heading">${heading}</h2>` : ''}
  ${list.length ? `<div class="prose-copy">${paragraphs(list)}</div>` : ''}
  ${hidden.length ? more(hidden) : ''}`;

// Dlouhý text s podnadpisy celý za „Zjistit více“ (Vedení, Náš příběh)
export const moreSections = (sections, label = 'Zjistit více') => `
  <section class="section pt-0 md:pt-0">
    <div class="site-container--read reveal">
      <details class="more more--sections">
        <summary class="more__toggle">${label}<span class="nav-indicator" aria-hidden="true"></span></summary>
        <div class="more__body">
          ${sections.map(({ heading, paragraphs: list }) => `
            <div class="more__section prose-copy">
              ${heading ? `<h3 class="section-heading">${heading}</h3>` : ''}
              ${paragraphs(list)}
            </div>`).join('')}
        </div>
      </details>
    </div>
  </section>`;

// Témata v mřížce dvou sloupců, volitelně s nadpisem skupiny
export const topicGrid = ({ title, topics, tone = '' }) => `
  <section class="section ${tone}">
    <div class="site-container">
      ${title ? `<h2 class="section-title__heading section-title--center mb-12 md:mb-16 reveal">${title}</h2>` : ''}
      <div class="topics">
        ${topics.map((topic, index) => `
          <article class="topic reveal ${index % 2 ? 'reveal-delay-1' : ''}">${copy(topic)}</article>`).join('')}
      </div>
    </div>
  </section>`;

// Pudrový panel se vzorem oblouků: akcent v Respondentu, nadpis, linka, text a jedna akce
export const patternPanel = ({ accent, title, text, cta, className = '' }) => `
  <div class="pattern-panel ${className} reveal">
    ${accent ? `<p class="pattern-panel__accent">${accent}</p>` : ''}
    <h2 class="pattern-panel__title">${title}</h2>
    <span class="rule" aria-hidden="true"></span>
    <p class="pattern-panel__text">${text}</p>
    ${cta ? `<a class="btn btn--dark mt-10" href="${cta.href}">${cta.label}</a>` : ''}
  </div>`;

// Závěrečný citát stránky na vzorovaném panelu
export const closingQuote = (lines) => `
  <section class="section">
    <div class="site-container">
      <blockquote class="pattern-panel closing-quote reveal">
        ${lines.map((line) => `<p>${line}</p>`).join('')}
      </blockquote>
    </div>
  </section>`;

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
      <h2 class="section-heading">${title}</h2>
      <div class="prose-copy">${paragraphs(list)}</div>
    </div>
  </section>`;
