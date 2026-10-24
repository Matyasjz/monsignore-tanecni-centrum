import home from './data/home.json';
import { hero } from './blocks/hero.js';
import { squares } from './blocks/squares.js';
import { story } from './blocks/story.js';
import kurzy from './data/kurzy.json';
import {
  courseCards, courseHero, courseSections, courseSignup, courseTopics, practicalInfo,
} from './blocks/courses.js';
import { scheduleTable } from './blocks/schedule.js';
import proVas from './data/pro-vas.json';
import akce from './data/akce.json';
import letniSkola from './data/letni-skola.json';
import { eventsCalendar } from './blocks/events.js';
import {
  summerHero, summerIntro, summerSignup, summerTeam,
} from './blocks/summer-school.js';
import {
  contact, faq, gallery, testimonials,
} from './blocks/pro-vas.js';
import {
  continueTo, framed, pageIntro, paragraphs, patternPanel, sectionTitle, split, timeline, wideFigure,
} from './blocks/layout.js';
import adult012 from '../assets/adult-012.jpg';
import adult014 from '../assets/adult-014.jpg';
import individual001 from '../assets/individualni-vyuka-001.jpg';

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
          <h2 class="course-section__heading">${schedulePage.individual.heading}</h2>
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
      ${course.topics ? courseTopics(course.topics) : ''}
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
    html: `${summerHero(letniSkola)}
    ${summerIntro(letniSkola)}
    ${summerTeam(letniSkola.team)}
    ${summerSignup(letniSkola.signup)}`,
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
  // Legacy podstránky z předchozí verze: přepíšou se podle briefu v krocích 4–8 (PLAN.md)
  'nas-pristup': {
    title: 'Náš přístup · Taneční centrum Monsignore',
    html: `${pageIntro({
      script: 'O nás',
      title: 'Místo, kde se technika setkává s osobností',
      lead: 'Umělecké taneční centrum zaměřené na klasický, moderní a jazzový tanec.',
    })}
    ${split({
      image: adult012, alt: 'Tanečnice v černých kostýmech při jevištní choreografii', shape: 'portrait',
      script: 'Přístup',
      title: 'Naše výuka a naše cíle',
      body: [
        'Tanec vnímáme jako mnohem víc než soubor kroků a technik. Je to cesta k vlastnímu tělu, hudbě, emocím, disciplíně, tvořivosti i spolupráci s ostatními.',
        'Nechceme vychovávat pouze technicky zdatné tanečníky. Rozvíjíme osobnosti, které rozumějí svému tělu, dokážou se vyjádřit pohybem a mají z tance radost.',
      ],
    })}
    <section class="section section--surface">
      <div class="site-container">
        ${sectionTitle({ script: 'Principy', title: 'Na čem stavíme', center: true })}
        <div class="principles">
          ${[
            ['Technika jako pevný základ', 'Správně vybudovaná technika dává tanečníkovi svobodu, jistotu a chrání jeho tělo. Nejde nám o mechanické opakování kroků, ale o porozumění tomu, odkud pohyb vychází a proč se provádí právě tak.'],
            ['Porozumění vlastnímu tělu', 'Vedeme tanečníky k tomu, aby své tělo poznávali a pracovali s ním bezpečně. Kompenzační cvičení, stabilita, mobilita a regenerace pomáhají k lepšímu výkonu i dlouhodobě zdravému pohybu.'],
            ['Všestrannost', 'Propojujeme klasický tanec, jazz, contemporary, moderní techniky, práci na zemi, improvizaci i muzikálové prvky. Každá technika rozvíjí jinou kvalitu a společně tvoří komplexního tanečníka.'],
            ['Osobnost a individualita', 'Každý má jiné tělo, temperament i způsob učení, proto nikoho neformujeme podle šablony. Respektujeme individualitu a zároveň učíme pracovitosti, pravidelnosti a odpovědnosti za vlastní rozvoj.'],
          ].map(([title, text], index) => `
            <article class="principle reveal ${index % 2 ? 'reveal-delay-1' : ''}">
              <span class="principle__number" aria-hidden="true">0${index + 1}</span>
              <h3 class="principle__title">${title}</h3>
              <p>${text}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="site-container--read text-center reveal">
        ${sectionTitle({ script: 'Umění', title: 'Tanec jako umění', center: true })}
        <div class="prose-copy">${paragraphs([
          'Tanec pro nás nekončí správně provedeným pohybem. Učíme vnímat hudbu, rytmus, dynamiku, prostor i partnera a dát pohybu význam, náladu a vlastní projev.',
          '<span class="text-ink">Technika je prostředkem. Umělecký projev je tím, co dává tanci život.</span>',
        ])}</div>
      </div>
    </section>
    ${split({
      image: adult014, alt: 'Tanečnice v dramatické scéně divadelního představení',
      script: 'Osobnost',
      title: 'Tanec jako cesta k osobnosti',
      body: [
        'Tanec učí trpělivosti, vytrvalosti, soustředění a schopnosti přijímat korekci. Učí také respektu k ostatním, spolupráci a odpovědnosti vůči skupině, hodnotám, které zůstávají, i když se člověk profesionální taneční cestou nevydá.',
        'Součástí výuky je improvizace a kreativní práce. Tanečník se učí hledat vlastní řešení, reagovat na hudbu, prostor i emoci a postupně objevovat svůj pohybový rukopis.',
      ],
      reverse: true,
      tone: 'pt-0 md:pt-0',
    })}
    ${continueTo({ script: 'Dále', label: 'Prohlédněte si kurzy', href: '#/kurzy' })}`,
  },
  'nas-pribeh': {
    title: 'Náš příběh · Taneční centrum Monsignore',
    html: `${pageIntro({
      script: 'Příběh',
      title: 'Více než tři desetiletí s tancem',
      lead: 'Příběh Tanečního centra Monsignore se začal psát už v roce 1988.',
    })}
    ${timeline([
      {
        marker: '1988',
        title: 'Osm tanečníků na začátku',
        body: [
          'Vznikla malá skupina osmi tanečníků, která připravovala krátká vystoupení pro kulturní a společenské akce. Z malého souboru se postupně stalo místo, kde se tanec začal vyučovat systematicky a kudy během dalších desetiletí prošly stovky dětí, mladých lidí i dospělých.',
        ],
      },
      {
        marker: '1992',
        title: 'Vzniká Taneční centrum Monsignore',
        body: [
          'Činnost získala jasnější podobu založením soukromého Tanečního centra Monsignore. Od počátku se zaměřovalo na moderní, jazzový a scénický tanec a na kvalitní pohybovou a uměleckou průpravu dětí a mládeže.',
          'Postupně vznikaly přípravné i pokročilé třídy a výuka se rozšířila o klasický tanec, contemporary, lyrický jazz, muzikálový tanec, improvizaci a scénickou praxi. Přibyly víkendové semináře, workshopy s českými i zahraničními pedagogy a Letní taneční škola.',
        ],
      },
    ])}
    ${wideFigure(adult014, 'Tanečnice v dramatické scéně divadelního představení')}
    ${timeline([
      {
        marker: 'Jeviště',
        title: 'Z taneční školy na divadelní jeviště',
        body: [
          'Monsignore nikdy nebylo jen místem pravidelných lekcí. Od počátku k němu patřila jevištní zkušenost a vlastní taneční tvorba. Tanečníci vystupovali ve Východočeském divadle i na scénách dalších českých měst.',
          'Mezi významné projekty patřila spolupráce s Klicperovým divadlem v Hradci Králové, reprezentace Pardubic ve francouzském Bergeracu nebo multimediální projekt Pocta svatému Vojtěchovi při návštěvě papeže Jana Pavla II.',
          'Centrum získalo mimo jiné titul Mistra České republiky v kategorii show dance s nominací na evropský šampionát. Řada absolventů pokračovala v profesionálním tanci, herectví nebo taneční pedagogice.',
        ],
      },
      {
        marker: 'Každý věk',
        title: 'Tanec v každém věku',
        body: [
          'V posledních zhruba deseti letech se Monsignore stále více otevírá dospělým a starší generaci. Vznikly kurzy pro začátečníky i pokročilé a programy propojující tanec se zdravým pohybem a regenerací.',
          'Patří sem projekt Tanec PLUS, který spojuje lekce s relaxací a péčí o tělo, i fyzio-cvičení zaměřené na mobilitu, pružnost, stabilitu a prevenci pohybových obtíží.',
        ],
      },
      {
        marker: '2017',
        title: 'Od taneční techniky k péči o člověka',
        body: [
          'Po získání vzdělání v tanečně-pohybové terapii začala umělecká vedoucí Magdaléna Mauerová propojovat zkušenosti pedagožky a choreografky s terapeutickým působením pohybu. Do práce centra se ještě výrazněji dostal individuální přístup, vědomá práce s tělem a respekt k možnostem každého člověka.',
        ],
      },
      {
        marker: 'Dnes',
        title: 'Monsignore dnes',
        body: [
          'Dnešní Monsignore navazuje na více než třicetiletou tradici a stále se vyvíjí. Je místem pro mladé tanečníky, kteří chtějí růst na vysoké úrovni, i pro dospělé a seniory, kteří chtějí zůstat aktivní a mít radost z hudby a tance.',
          '<span class="text-ink">Tanec se může měnit spolu s námi. Radost z pohybu ale nemusí mít žádný věkový limit.</span>',
        ],
      },
    ])}
    ${continueTo({ script: 'Vedení', label: 'Kdo Monsignore vede', href: '#/vedeni' })}`,
  },
  vedeni: {
    title: 'Vedení · Taneční centrum Monsignore',
    html: `${pageIntro({
      script: 'Vedení',
      title: 'Magdaléna Mauerová',
      lead: 'Umělecká vedoucí · choreografka · taneční pedagožka · tanečně-pohybová terapeutka',
    })}
    ${split({
      image: individual001, alt: 'Tanečnice při individuální práci v tanečním sále',
      script: 'Zakladatelka',
      title: 'Třicet let tance, pedagogiky a práce s tělem',
      body: [
        'Magdaléna Mauerová založila Taneční centrum Monsignore v roce 1992 a dodnes je jeho uměleckou vedoucí. Věří, že tanec může člověka rozvíjet v každém věku.',
        'Začínala společenským tancem, ve kterém dosáhla výkonnostní třídy A. Baletní průpravu získala u pedagožek Bulgakovové a Voroncovové z Petrohradu, Jazz dance studovala u Rastislava Letenaje, Limón techniku ve Vídni u Joea Alegada a Modern dance u Bruce Taylora.',
      ],
    })}
    ${timeline([
      {
        marker: '90. léta',
        title: 'Pedagogika jako celoživotní cesta',
        body: [
          'Působila jako profesionální tanečnice, choreografka a pedagožka, vyučovala na konzervatoři v Hradci Králové. V Klicperově divadle byla tanečnicí, herečkou i choreografkou a několik let spolupracovala s Východočeským divadlem v Pardubicích.',
          'Vychovala několik generací tanečníků, z nichž řada pokračovala v profesionálním tanci, herectví nebo pedagogice. Důležitější než samotný výkon je pro ni vždy člověk, který tančí.',
        ],
      },
      {
        marker: '2012',
        title: 'Inspirace ze zahraničí',
        body: [
          'V letech 2012–2013 vyučovala v australském Perthu moderní tanec, jazz dance a contemporary ve školách Vogue Performers a Dynamic Perth’s Performing Arts Specialists. Zkušenost posílila její zájem o přirozený pohyb a individualitu tanečníka.',
        ],
      },
      {
        marker: '2017',
        title: 'Tanec jako cesta k tělu i psychické rovnováze',
        body: [
          'Po Mezinárodní konferenci uměleckých terapií ARS TERAPEUTICA (2014) získala v roce 2017 diplom v oboru tanečně-pohybové terapie, garantovaný asociací MAUT a Společností pro hudební terapii.',
          'Ve své práci klade důraz na individuální možnosti každého člověka, zdravý pohyb, vnímání vlastního těla, psychickou pohodu a radost z pohybu.',
        ],
      },
    ])}
    ${continueTo({ script: 'Příběh', label: 'Přečtěte si náš příběh', href: '#/nas-pribeh' })}`,
  },
};

export function getPage(path) {
  return pages[path] ?? null;
}

export const slugs = () => Object.keys(pages);
