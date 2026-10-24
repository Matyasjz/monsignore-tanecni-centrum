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
