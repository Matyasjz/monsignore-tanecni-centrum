import home from './data/home.json';
import { hero } from './blocks/hero.js';
import { squares } from './blocks/squares.js';
import { story } from './blocks/story.js';
import kurzy from './data/kurzy.json';
import {
  courseCards, courseHero, courseSections, courseSignup, practicalInfo,
} from './blocks/courses.js';
import { scheduleTable } from './blocks/schedule.js';
import proVas from './data/pro-vas.json';
import akce from './data/akce.json';
import letniSkola from './data/letni-skola.json';
import { eventsCalendar } from './blocks/events.js';
import { summerIntro, summerSignup, summerTeam } from './blocks/summer-school.js';
import terapie from './data/terapie.json';
import {
  contact, faq, gallery, testimonials,
} from './blocks/pro-vas.js';
import {
  closingQuote, copy, moreSections, pageHero, pageIntro, panelHero, paragraphs, patternPanel, split, textSection, topicGrid,
} from './blocks/layout.js';
import oNas from './data/o-nas.json';

const pageTitle = (title) => `${title.charAt(0)}${title.slice(1).toLowerCase()} · Taneční centrum Monsignore`;
const plain = (html) => html.replace(/<[^>]+>/g, '');

// Tančete s námi (brief 3.2): přehled, detaily kurzů podle jednotné šablony a rozvrh
function coursePages() {
  const { overview, courses, schedulePage } = kurzy;
  const withSlug = (slug) => ({ slug, ...courses[slug] });
  const pages = {
    kurzy: {
      title: pageTitle(overview.title),
      world: 'centrum',
      html: `${pageIntro({ title: overview.title })}
      ${courseCards(overview.cards.map(withSlug), overview.cardCta)}
      ${split({
        image: overview.individual.image,
        title: overview.individual.title,
        body: overview.individual.body,
        after: `<a class="link-line mt-10" href="${overview.individual.cta.href}">${overview.individual.cta.label}</a>`,
        reverse: true,
        tone: 'pt-0 md:pt-0',
      })}
      <section class="section pt-0 md:pt-0">
        <div class="site-container">${patternPanel(overview.schedule)}</div>
      </section>`,
    },
    'kurzy/rozvrh-a-cenik': {
      title: pageTitle(schedulePage.title),
      description: plain(schedulePage.intro),
      world: 'centrum',
      html: `${pageIntro({ title: schedulePage.title, lead: schedulePage.intro })}
      <section class="section">
        <div class="site-container reveal">
          ${scheduleTable(schedulePage.columns)}
          <p class="schedule__note">${schedulePage.payment}</p>
        </div>
      </section>
      <section class="section section--surface">
        <div class="site-container--read reveal">
          <h2 class="section-heading">${schedulePage.individual.heading}</h2>
          <div class="prose-copy">${paragraphs(schedulePage.individual.paragraphs)}</div>
        </div>
      </section>`,
    },
  };
  Object.keys(courses).forEach((slug) => {
    const course = withSlug(slug);
    pages[`kurzy/${slug}`] = {
      title: pageTitle(course.card?.title ?? course.title),
      description: plain(course.card?.text ?? course.sections[0].paragraphs[0]),
      world: 'centrum',
      html: `${courseHero(course)}
      ${courseSections(course.sections)}
      ${course.topics ? topicGrid({ topics: course.topics, tone: 'pt-0 md:pt-0' }) : ''}
      ${course.groups ? practicalInfo(course) : courseSignup(course.title)}`,
    };
  });
  return pages;
}

// Každá stránka: title, description, world (centrum | terapie | letni-skola), mood a html složené z bloků.
// Klíč je slug a zároveň budoucí hezká URL (tabulka v AGENTS.md).
const pages = {
  '': {
    title: home.title,
    description: home.description,
    world: 'centrum',
    html: `${hero(home.hero)}
    ${squares(home.squares)}
    ${story(home.story)}`,
  },
  ...coursePages(),
  // Akce a Letní taneční škola (brief 3.3)
  akce: {
    title: pageTitle(akce.title),
    description: plain(akce.workshops.body[0]),
    world: 'centrum',
    html: `${pageIntro({ title: akce.title })}
    <section class="section" data-world="letni-skola">
      <div class="site-container">${patternPanel(akce.summerSchool)}</div>
    </section>
    ${split({
      image: akce.workshops.image,
      shape: 'portrait',
      title: akce.workshops.title,
      body: akce.workshops.body,
      after: '<a class="link-line mt-10" href="#kalendar">Kalendář akcí</a>',
      tone: 'pt-0 md:pt-0',
    })}
    ${eventsCalendar(akce.calendar)}`,
  },
  'letni-skola': {
    title: pageTitle(letniSkola.title),
    description: `${letniSkola.accent}. ${letniSkola.place}.`,
    world: 'letni-skola',
    html: `${panelHero({
      accent: letniSkola.accent, title: letniSkola.title, text: letniSkola.place, note: letniSkola.date,
    })}
    ${summerIntro(letniSkola)}
    ${summerTeam(letniSkola.team)}
    ${summerSignup(letniSkola.signup)}`,
  },
  // Tanečně-pohybová terapie (brief 3.6): samostatný svět, později terapie.monsignore.cz
  terapie: {
    title: pageTitle(terapie.title),
    world: 'terapie',
    html: `${panelHero(terapie.hero)}
    ${terapie.sections.map((section, index) => textSection({ ...section, tone: index % 2 ? 'section--surface' : '' })).join('')}
    <section class="section">
      <div class="site-container">${patternPanel(terapie.contact)}</div>
    </section>`,
  },
  // Pro vás a Kontakt (brief 3.4 a 3.5)
  'pro-vas/caste-dotazy': {
    title: pageTitle(proVas.faq.title),
    description: plain(proVas.faq.items[0].answer[0]),
    world: 'centrum',
    html: `${faq(proVas.faq)}
    ${testimonials(proVas.testimonials)}`,
  },
  'pro-vas/galerie': {
    title: pageTitle(proVas.gallery.title),
    world: 'centrum',
    html: `${pageIntro({ title: proVas.gallery.title })}
    ${gallery({ items: proVas.gallery.items, tone: 'pt-0 md:pt-0 bg-surface' })}`,
  },
  kontakt: {
    title: pageTitle(proVas.contact.title),
    description: `${proVas.contact.reach.text} ${proVas.contact.find.address.join(', ')}`,
    world: 'centrum',
    html: `${pageIntro({ title: proVas.contact.title })}
    ${contact(proVas.contact)}`,
  },
  // O nás (brief 3.1 B a C → podstránky Náš přístup, Vedení, Náš příběh)
  'nas-pristup': {
    title: pageTitle(oNas.pristup.title),
    description: plain(oNas.pristup.intro.paragraphs[0]),
    world: 'centrum',
    html: `${pageHero(oNas.pristup)}
    <section class="section">
      <div class="site-container--read reveal">${copy(oNas.pristup.intro)}</div>
    </section>
    ${oNas.pristup.groups.map((group, index) => topicGrid({ ...group, tone: index % 2 ? '' : 'section--surface' })).join('')}
    ${split({
      image: oNas.pristup.lead.image,
      title: oNas.pristup.lead.title,
      body: [`<strong>${oNas.pristup.lead.heading}</strong>`, ...oNas.pristup.lead.paragraphs],
      reverse: true,
    })}
    <section class="section section--surface">
      <div class="site-container--read reveal">${copy({ heading: oNas.pristup.goals.title, paragraphs: oNas.pristup.goals.paragraphs })}</div>
    </section>
    ${closingQuote(oNas.pristup.quote)}`,
  },
  vedeni: {
    title: pageTitle(oNas.vedeni.title),
    description: plain(oNas.vedeni.intro[0]),
    world: 'centrum',
    html: `${pageHero(oNas.vedeni)}
    <section class="section">
      <div class="site-container--read prose-copy reveal">${paragraphs(oNas.vedeni.intro)}</div>
    </section>
    ${moreSections(oNas.vedeni.more)}
    ${closingQuote(oNas.vedeni.quote)}`,
  },
  'nas-pribeh': {
    title: pageTitle(oNas.pribeh.title),
    description: plain(oNas.pribeh.intro[0]),
    world: 'centrum',
    html: `${pageHero(oNas.pribeh)}
    <section class="section">
      <div class="site-container--read prose-copy reveal">${paragraphs(oNas.pribeh.intro)}</div>
    </section>
    ${moreSections(oNas.pribeh.more)}
    ${closingQuote(oNas.pribeh.quote)}`,
  },
};

export function getPage(path) {
  return pages[path] ?? null;
}

export const slugs = () => Object.keys(pages);
