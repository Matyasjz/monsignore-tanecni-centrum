import adult009 from '../assets/adult-009.jpg';
import adult011 from '../assets/adult-011.jpg';
import adult012 from '../assets/adult-012.jpg';
import adult014 from '../assets/adult-014.jpg';
import adult018 from '../assets/adult-018.jpg';
import individual001 from '../assets/individualni-vyuka-001.jpg';
import individual002 from '../assets/individualni-vyuka-002.jpg';
import individual003 from '../assets/individualni-vyuka-003.jpg';
import style003 from '../assets/new-therapy-dance-style-003.jpg';
import style004 from '../assets/new-therapy-dance-style-004.jpg';
import style005 from '../assets/new-therapy-dance-style-005.jpg';
import style006 from '../assets/new-therapy-dance-style-006.jpg';
import style007 from '../assets/new-therapy-dance-style-007.jpg';

const paragraphs = (list) => list.map((text) => `<p>${text}</p>`).join('');

const photo = (src, alt) => `<img class="photo" src="${src}" alt="${alt}" loading="lazy">`;

const framed = (src, alt, shape = 'landscape', className = '') => `
  <figure class="framed framed--${shape} ${className}">
    <div class="framed__inner">${photo(src, alt)}</div>
  </figure>`;

const sectionTitle = ({ script, title, center = false }) => `
  <div class="section-title ${center ? 'section-title--center' : ''}">
    ${script ? `<span class="section-title__script" aria-hidden="true">${script}</span>` : ''}
    <h2 class="section-title__heading">${title}</h2>
  </div>`;

const pageIntro = ({ script, title, lead }) => `
  <section class="page-intro">
    <div class="page-intro__inner reveal">
      <span class="page-intro__script" aria-hidden="true">${script}</span>
      <h1 class="page-intro__title">${title}</h1>
      ${lead ? `<p class="page-intro__lead">${lead}</p>` : ''}
    </div>
  </section>`;

const split = ({ image, alt, shape = 'landscape', script, title, body, after = '', reverse = false, tone = '' }) => `
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

const timeline = (items) => `
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

const wideFigure = (src, alt) => `
  <figure class="wide-figure reveal">
    <div class="wide-figure__inner">${photo(src, alt)}</div>
  </figure>`;

const continueTo = ({ script, label, href }) => `
  <section class="section section--tight">
    <div class="site-container text-center reveal">
      <span class="section-title__script" aria-hidden="true">${script}</span>
      <a class="link-line relative" href="${href}">${label}</a>
    </div>
  </section>`;

const pages = {
  'o-nas': {
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
    <section class="section section--mist">
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
  kurzy: {
    title: 'Kurzy · Taneční centrum Monsignore',
    html: `${pageIntro({
      script: 'Kurzy',
      title: 'Kurzy pro mládež a dospělé',
      lead: 'Moderní a jazzový tanec, klasický tanec, contemporary a mix tanečních stylů.',
    })}
    ${split({
      image: style003, alt: 'Tanečnice při cvičení rukou v tanečním sále',
      script: 'Svoboda',
      title: 'Moderní tanec',
      body: [
        'Moderní tanec vznikl jako reakce na přísná pravidla klasického baletu. Hledá přirozenější, svobodnější pohyb a propojení těla, dechu, emocí a prostoru.',
        'Pracujeme na zemi, s improvizací, těžištěm, pády, spirálami i vědomým dechem. Cílem je rozvoj individuality, pohybové inteligence a schopnosti vyjádřit se pohybem.',
      ],
    })}
    ${split({
      image: style004, alt: 'Tanečnice se pohybují v sále při lekci',
      script: 'Rytmus',
      title: 'Jazzový tanec',
      body: [
        'Dynamická a výrazová technika, která propojuje rytmus, koordinaci, energii a osobitý projev.',
        'Pracuje s izolacemi, změnami tempa, skoky a točkami. Rozvíjí muzikálnost, pohybovou přesnost, flexibilitu a schopnost reagovat na různé hudební styly.',
      ],
      reverse: true,
      tone: 'section--mist',
    })}
    ${split({
      image: style005, alt: 'Skupina dospělých při tanečním cvičení',
      script: 'Základ',
      title: 'Klasický tanec',
      body: [
        'Základní taneční disciplína, která rozvíjí držení těla, koordinaci, stabilitu, sílu, flexibilitu a přesnost pohybu.',
        'Výuka vychází z principů baletní techniky a vede od základních pozic a cvičení u tyče k práci v prostoru, skokům, točkám a tanečním variacím.',
      ],
    })}
    ${split({
      image: style006, alt: 'Skupina tanečnic ve společném pohybovém cvičení',
      script: 'Současnost',
      title: 'Contemporary',
      body: [
        'Současný tanec propojuje moderní tanec, klasickou techniku, práci na zemi, improvizaci a přirozený pohyb. Pracuje s dechem, gravitací, plynulostí a změnami kvality pohybu.',
        'Důležitá je individualita tanečníka a schopnost vyjádřit myšlenku, emoci nebo příběh prostřednictvím pohybu.',
      ],
      reverse: true,
      tone: 'section--mist',
    })}
    ${split({
      image: style007, alt: 'Tanečnice při práci na zemi',
      script: 'Radost',
      title: 'Mix tanečních stylů',
      body: [
        'Lekce pro dospělé od 35 let propojují prvky klasického, moderního a jazzového tance, Port de bras, Lady Latin Dance a celkovou taneční průpravu.',
        'Rozvíjíme koordinaci, pohybový rozsah, držení těla, kondici i paměť. Malé skupiny jsou vhodné i pro ty, kdo se k tanci vracejí po delší době nebo začínají úplně od začátku.',
      ],
      after: '<p class="label mt-8 text-brand">Energy 35+ · Harmony 50+</p>',
    })}
    ${continueTo({ script: 'Osobně', label: 'Individuální výuka', href: '#/individualni-vyuka' })}`,
  },
  'individualni-vyuka': {
    title: 'Individuální výuka · Taneční centrum Monsignore',
    html: `${pageIntro({
      script: 'Individuálně',
      title: 'Individuální výuka',
      lead: 'Pro děti, mládež i dospělé. Lekce přizpůsobíme věku, zkušenostem i vašim cílům.',
    })}
    ${split({
      image: individual003, alt: 'Pedagožka při individuálním tanečním cvičení',
      script: 'Tempo',
      title: 'Výuka vlastním tempem',
      body: [
        'Individuální lekce nabízejí prostor pro rychlejší rozvoj a větší jistotu v pohybu.',
        'Věnujeme se modernímu, jazzovému a klasickému tanci, contemporary i mixu stylů. Každý rozvíjí jinou kvalitu, společně tvoří všestranného tanečníka.',
      ],
      after: `<ul class="focus-list">${['Technika', 'Koordinace', 'Výraz', 'Choreografie', 'Konkrétní styl', 'Osobní rozvoj']
        .map((item) => `<li>${item}</li>`).join('')}</ul>`,
    })}
    ${wideFigure(individual002, 'Tanečnice pracuje individuálně na pohybovém cvičení')}
    ${continueTo({ script: 'Začněte', label: 'Domluvit lekci', href: '#kontakt' })}`,
  },
  'letni-skola': {
    title: 'Letní taneční škola · Taneční centrum Monsignore',
    html: `${pageIntro({
      script: 'Léto',
      title: 'Letní taneční škola',
      lead: 'Víkendové semináře, workshopy s českými i zahraničními pedagogy a pravidelná Letní taneční škola.',
    })}
    ${split({
      image: adult011, alt: 'Dospělí tanečníci při lekci',
      script: 'Intenzivně',
      title: 'Léto plné pohybu',
      body: [
        'Letní taneční škola navazuje na dlouholetou tradici seminářů a workshopů, které jsou součástí vzdělávání v Monsignore.',
        'Termíny a program dalšího ročníku připravujeme. Napište nám a dáme vám vědět, jakmile je zveřejníme.',
      ],
      after: '<a class="link-line mt-10" href="mailto:info@monsignore.cz?subject=Letn%C3%AD%20tane%C4%8Dn%C3%AD%20%C5%A1kola">Chci znát termíny</a>',
    })}`,
  },
  akce: {
    title: 'Akce a workshopy · Taneční centrum Monsignore',
    html: `${pageIntro({
      script: 'Program',
      title: 'Akce a workshopy',
      lead: 'Intenzivnější tréninky, workshopy a tematické taneční večery.',
    })}
    ${split({
      image: adult018, alt: 'Tanečnice při vystoupení na divadelním jevišti', shape: 'portrait',
      script: 'Workshopy',
      title: 'Workshopy a tematické večery',
      body: [
        'Intenzivnější tréninky umožňují rychlejší rozvoj tanečníka. Postupně se zaměřujeme na pohybovou přesnost jednotlivých částí těla, souznění pohybu s hudbou, taneční improvizaci a citlivé vnímání prostoru.',
        'Součástí programu jsou také tematické taneční večery.',
      ],
    })}
    <section class="section section--mist">
      <div class="site-container">
        ${sectionTitle({ script: 'Brzy', title: 'Nejbližší představení', center: true })}
        <article class="event">
          ${framed(adult009, 'Taneční soubor na jevišti při představení', 'landscape', 'reveal')}
          <div class="reveal reveal-delay-1">
            <div class="event__date" aria-label="Provizorní datum: 24. května 2027">
              <span class="event__day" aria-hidden="true">24</span>
              <span class="event__month" aria-hidden="true">Květen · ukázkový termín</span>
            </div>
            <h3 class="event__title">Závěrečné taneční představení</h3>
            <p class="event__meta">Taneční centrum Monsignore · Pardubice<br>18:00 · místo konání bude upřesněno</p>
            <div class="event__actions">
              <a href="mailto:info@monsignore.cz?subject=Dotaz%20na%20vstupenky" class="btn btn--dark">Rezervovat vstupenky</a>
            </div>
          </div>
        </article>
      </div>
    </section>`,
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
