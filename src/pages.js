import adult007 from '../assets/adult-007.jpg';
import adult008 from '../assets/adult-008.jpg';
import adult009 from '../assets/adult-009.jpg';
import adult010 from '../assets/adult-010.jpg';
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

const pageImage = (src, alt, className = '') => `
  <figure class="page-image image-card ${className}">
    <img src="${src}" alt="${alt}" loading="lazy">
  </figure>`;

const copySection = (heading, paragraphs, extraClass = '') => `
  <section class="page-copy-section reveal ${extraClass}">
    <h2 class="serif page-section-title">${heading}</h2>
    ${paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
  </section>`;

const pageHero = ({ kicker, title, lead, image, imageAlt, layout = '' }) => `
  <section class="site-container page-hero ${layout}">
    <div class="page-hero__copy">
      <p class="eyebrow">${kicker}</p>
      <h1 class="serif page-title">${title}</h1>
      ${lead ? `<p class="page-lead">${lead}</p>` : ''}
    </div>
    ${pageImage(image, imageAlt, 'page-hero__image')}
  </section>`;

const courseCard = ({ title, description, image, imageAlt, note }) => `
  <article class="page-course-card reveal">
    ${pageImage(image, imageAlt, 'page-course-card__image')}
    <div class="page-course-card__copy">
      ${note ? `<p class="eyebrow">${note}</p>` : ''}
      <h2 class="serif">${title}</h2>
      <p>${description}</p>
    </div>
  </article>`;

const pages = {
  'o-nas': {
    title: 'O nás · Taneční centrum Monsignore',
    html: `${pageHero({
      kicker: 'Taneční centrum Monsignore',
      title: 'Místo, kde se technika setkává s <i class="accent-text">osobností tanečníka</i>',
      lead: 'Umělecké taneční centrum zaměřené na klasický, moderní a jazzový tanec.',
      image: adult007,
      imageAlt: 'Tanečnice při vystoupení na divadelním jevišti',
      layout: 'page-hero--reverse',
    })}
    <section class="site-container page-content page-about">
      <div class="page-about__intro reveal">
        <div class="page-about__intro-heading">
          <p class="eyebrow">Náš přístup</p>
          <h2 class="serif page-section-title">Naše výuka a naše <i class="accent-text">cíle</i></h2>
        </div>
        <div class="page-about__intro-copy">
          <p>V tanečním centru Monsignore vnímáme tanec jako mnohem víc než jen soubor kroků a technik. Tanec je cesta k vlastnímu tělu, hudbě, emocím, disciplíně, tvořivosti i spolupráci s ostatními.</p>
          <p>Naším cílem není vychovat pouze technicky zdatné tanečníky. Chceme rozvíjet osobnosti, které rozumějí svému tělu, dokážou se prostřednictvím pohybu vyjádřit a mají z tance radost.</p>
        </div>
      </div>
      <div class="page-about__principles">
        ${copySection('Technika jako pevný <i class="accent-text">základ</i>', [
          'Správně vybudovaná technika dává tanečníkovi svobodu, jistotu a chrání jeho tělo. Proto věnujeme velkou pozornost správnému držení těla, koordinaci, práci chodidel, stabilitě, síle, flexibilitě i zdravému provedení pohybu.',
          'Nejde nám ale o mechanické opakování kroků. Chceme, aby tanečníci rozuměli tomu, co jejich tělo dělá, odkud pohyb vychází a proč se určitým způsobem provádí.',
        ], 'page-about__principle page-copy-section--accent')}
        ${copySection('Porozumění vlastnímu <i class="accent-text">tělu</i>', [
          'Důležitou součástí našeho přístupu je respekt k tělu. Vedeme tanečníky k tomu, aby své tělo poznávali, vnímali jeho možnosti a dokázali s ním pracovat bezpečně.',
          'Správná technika, kompenzační cvičení, práce se stabilitou, mobilitou a regenerací pomáhají nejen lepšímu výkonu, ale především dlouhodobému zdravému pohybu.',
        ], 'page-about__principle page-copy-section--accent')}
        ${copySection('<i class="accent-text">Všestrannost</i>', [
          'Věříme, že dnešní tanečník potřebuje být všestranný. Proto propojujeme klasický tanec, jazz, contemporary, moderní taneční techniky, práci na zemi, improvizaci, muzikálové prvky i další pohybové zkušenosti.',
          'Jednotlivé techniky nevnímáme odděleně. Každá rozvíjí jinou kvalitu a společně pomáhají vytvářet komplexního tanečníka.',
        ], 'page-about__principle page-copy-section--accent')}
        ${copySection('<i class="accent-text">Osobnost</i> a individualita', [
          'Každý člověk má jiné tělo, jiné možnosti, temperament i způsob učení. Proto nechceme všechny formovat podle jedné šablony. Pedagog má tanečníka vést, podporovat jeho silné stránky a současně mu pomáhat překonávat vlastní limity.',
          'Respektujeme individualitu, ale zároveň učíme pracovitosti, pravidelnosti a odpovědnosti za vlastní rozvoj.',
        ], 'page-about__principle page-copy-section--accent')}
      </div>
    </section>
    <section class="bg-ink text-paper page-dark-band">
      <div class="site-container page-dark-band__inner">
        ${pageImage(adult010, 'Tanečníci při skupinové jevištní choreografii', 'page-dark-band__image')}
        <div>${copySection('Tanec jako <i class="accent-text">umění</i>', [
          'Tanec pro nás nekončí správně provedeným pohybem. Učíme tanečníky vnímat hudbu, rytmus, dynamiku, prostor i partnera. Vedeme je k tomu, aby dokázali pohybu dát význam, náladu a vlastní osobní projev.',
          'Technika je prostředkem. Umělecký projev je tím, co dává tanci život.',
        ], 'page-copy-section--accent')}</div>
      </div>
    </section>
    <section class="site-container page-content page-about__closing">
      <div class="page-about__closing-copy">
        ${copySection('Tanec jako cesta k <i class="accent-text">osobnosti</i>', [
          'Tanec rozvíjí mnohem víc než pohybové schopnosti. Učí trpělivosti, vytrvalosti, soustředění, disciplíně a schopnosti přijímat korekci. Učí také respektu k ostatním, spolupráci a odpovědnosti vůči skupině.',
          'Jsou to zkušenosti a hodnoty, které člověku zůstávají i tehdy, když se jednou rozhodne profesionální taneční cestou nepokračovat.',
        ], 'page-copy-section--accent')}
        ${copySection('Tvořivost a vlastní pohybový <i class="accent-text">jazyk</i>', [
          'Součástí výuky je také improvizace a kreativní práce. Tanečník se učí nejen přijímat pohyb od pedagoga, ale také hledat vlastní řešení, reagovat na hudbu, prostor, téma nebo emoci a postupně objevovat svůj vlastní pohybový rukopis.',
        ], 'page-copy-section--accent')}
      </div>
      ${pageImage(adult018, 'Tanečníci společně zkoušejí zvedačku', 'page-about__closing-image')}
    </section>`,
  },
  kurzy: {
    title: 'Kurzy · Taneční centrum Monsignore',
    html: `${pageHero({
      kicker: 'Kurzy pro mládež a dospělé',
      title: '<i class="accent-text">Kurzy</i> pro mládež a dospělé',
      lead: 'Moderní a jazzový tanec, klasický tanec, contemporary, mix tanečních stylů.',
      image: adult008,
      imageAlt: 'Skupina dospělých při taneční lekci v sále',
    })}
    <section class="site-container page-content page-courses">
      ${courseCard({
        title: '<i class="accent-text">Moderní</i> tanec',
        description: 'Moderní tanec vznikl jako reakce na přísná pravidla klasického baletu. Hledá přirozenější, svobodnější pohyb a větší propojení těla, dechu, emocí a prostoru. Současná výuka propojuje techniky také s prací na zemi, improvizací, prací s těžištěm, pády, spirálami a vědomou prací s dechem. Cílem je rozvoj individuality, pohybové inteligence a schopnosti vyjádřit se pohybem.',
        image: style003, imageAlt: 'Tanečnice při cvičení rukou v tanečním sále',
      })}
      ${courseCard({
        title: '<i class="accent-text">Jazzový</i> tanec',
        description: 'Jazzový tanec je dynamická a výrazová taneční technika, která propojuje rytmus, koordinaci, energii a osobitý pohybový projev. Pracuje s izolacemi jednotlivých částí těla, dynamikou, změnami tempa, skoky, točkami i výrazem. Rozvíjí muzikálnost, pohybovou přesnost, flexibilitu a schopnost tanečníka reagovat na různé hudební styly.',
        image: style004, imageAlt: 'Tanečnice se pohybují v sále při lekci',
      })}
      ${courseCard({
        title: '<i class="accent-text">Klasický</i> tanec',
        description: 'Klasický tanec je základní taneční disciplínou, která rozvíjí správné držení těla, koordinaci, stabilitu, sílu, flexibilitu a přesnost pohybu. Výuka vychází z principů baletní techniky a postupně vede od základních pozic a cvičení u tyče až k práci v prostoru, skokům, točkám a tanečním variacím.',
        image: style005, imageAlt: 'Skupina dospělých při tanečním cvičení',
      })}
      ${courseCard({
        title: '<i class="accent-text">Contemporary</i>',
        note: 'Současný tanec',
        description: 'Contemporary propojuje prvky moderního tance, klasické techniky, práce na zemi, improvizace a přirozeného pohybu. Pracuje s dechem, těžištěm, gravitací, plynulostí, dynamikou a změnami kvality pohybu. Důležitá je individualita tanečníka, práce s emocí a schopnost vyjádřit myšlenku nebo příběh prostřednictvím pohybu.',
        image: style006, imageAlt: 'Skupina tanečnic ve společném pohybovém cvičení',
      })}
      ${courseCard({
        title: 'Mix <i class="accent-text">tanečních</i> stylů',
        note: 'ENERGY 35+ · HARMONY 50+',
        description: 'Lekce určené dospělým od 35 let propojují prvky klasického, moderního a jazzového tance, Port de bras, Lady Latin Dance a celkovou taneční průpravu. Výuka rozvíjí koordinaci, pohybový rozsah, držení těla, fyzickou kondici i paměť. Lekce probíhají v malé skupině a jsou vhodné i pro ty, kteří se k tanci vracejí po delší době nebo s ním začínají bez předchozích zkušeností.',
        image: style007, imageAlt: 'Tanečnice při práci na zemi',
      })}
    </section>`,
  },
  'individualni-vyuka': {
    title: 'Individuální výuka · Taneční centrum Monsignore',
    html: `${pageHero({
      kicker: 'Děti · mládež · dospělí',
      title: 'Individuální <i class="accent-text">výuka</i>, děti, mládež, dospělí',
      lead: 'Individuální lekce se přizpůsobují věku, zkušenostem i osobním cílům každého tanečníka.',
      image: individual002,
      imageAlt: 'Tanečnice pracuje individuálně na pohybovém cvičení',
      layout: 'page-hero--reverse',
    })}
    <section class="site-container page-content page-feature">
      ${pageImage(individual003, 'Pedagožka při individuálním tanečním cvičení', 'page-feature__image')}
      <div class="page-feature__copy">
        ${copySection('Výuka vlastním <i class="accent-text">tempem</i>', [
          'Zaměřit se můžete na techniku, koordinaci, výraz, choreografii nebo konkrétní taneční styl.',
          'Výuka probíhá vlastním tempem a nabízí prostor pro rychlejší rozvoj a větší jistotu v pohybu.',
          'Věnujeme se modernímu, jazzovému a klasickému tanci, contemporary i mixu tanečních stylů. Každý rozvíjí jinou kvalitu, společně tvoří všestranného tanečníka.',
          'Lekce přizpůsobíme věku, zkušenostem i vašim cílům. Zaměřit se můžeme na techniku, koordinaci, výraz, choreografii nebo konkrétní taneční styl, vlastním tempem a s prostorem pro osobní rozvoj.',
        ], 'page-copy-section--accent')}
      </div>
    </section>`,
  },
  'letni-skola': {
    title: 'Letní taneční škola · Taneční centrum Monsignore',
    html: `${pageHero({
      kicker: 'Taneční centrum Monsignore',
      title: 'Letní <i class="accent-text">taneční</i> škola',
      lead: 'Součástí vzdělávání se staly také víkendové semináře, workshopy s českými i zahraničními pedagogy a pravidelná Letní taneční škola.',
      image: adult011,
      imageAlt: 'Dospělí tanečníci při lekci',
      layout: 'page-hero--reverse',
    })}
    `,
  },
  akce: {
    title: 'Akce a workshopy · Taneční centrum Monsignore',
    html: `${pageHero({
      kicker: 'Akce & workshopy a tematické taneční večery',
      title: 'Akce &amp; <i class="accent-text">Workshopy</i> a tematické taneční večery',
      lead: 'Intenzivnější tréninky umožňují rychlejší rozvoj tanečníka.',
      image: adult012,
      imageAlt: 'Taneční představení na divadelním jevišti',
    })}
    <section class="site-container page-content page-event">
      <div class="page-event__date ticket-title accent-text">&amp;</div>
      <div class="page-event__copy">
        ${copySection('Workshopy a <i class="accent-text">tematické večery</i>', [
          'Postupně se přechází na větší pohybovou přesnost jednotlivých oblastí těla, na souznění pohybu s hudbou, osvojování si taneční a pohybové improvizace a citlivého vnímání prostoru.',
          'Součástí programu jsou také tematické taneční večery.',
        ])}
      </div>
    </section>`,
  },
  'nas-pribeh': {
    title: 'Náš příběh · Taneční centrum Monsignore',
    html: `${pageHero({
      kicker: 'Náš příběh',
      title: 'Více než <i class="accent-text">tři desetiletí</i> s tancem',
      lead: 'Příběh Tanečního centra Monsignore se začal psát již v roce 1988.',
      image: adult009,
      imageAlt: 'Dětský taneční soubor při vystoupení',
      layout: 'page-hero--reverse',
    })}
    <section class="site-container page-content page-story">
      ${copySection('Více než <i class="accent-text">tři desetiletí</i> s tancem', [
        'Tehdy vznikla malá skupina osmi tanečníků, která připravovala krátká vystoupení pro kulturní a společenské akce. Z původně malého souboru se postupně stalo místo, kde se tanec začal vyučovat systematicky a kde během dalších desetiletí prošly tanečním vzděláváním stovky dětí, mladých lidí i dospělých.',
        'V roce 1992 získala činnost jasnější podobu založením soukromého Tanečního centra Monsignore. Od počátku se zaměřovalo především na moderní, jazzový a scénický tanec a na kvalitní pohybovou a uměleckou průpravu dětí a mládeže.',
        'Postupně vznikaly přípravné i pokročilé třídy a výuka se rozšiřovala o klasický tanec, contemporary, lyrický jazz, muzikálový tanec, improvizaci a scénickou praxi. Součástí vzdělávání se staly také víkendové semináře, workshopy s českými i zahraničními pedagogy a pravidelná Letní taneční škola.',
      ])}
      ${pageImage(adult014, 'Tanečnice v dramatické scéně divadelního představení', 'page-story__image')}
      ${copySection('Z <i class="accent-text">taneční školy</i> na divadelní jeviště', [
        'Monsignore nikdy nebylo pouze místem pravidelných tanečních lekcí. Důležitou součástí práce byla od počátku také jevištní zkušenost a vlastní taneční tvorba.',
        'Tanečníci se představovali pardubickému publiku ve Východočeském divadle i na scénách dalších českých měst. Centrum spolupracovalo s profesionálními divadly a podílelo se na řadě kulturních a uměleckých projektů.',
        'Mezi významné projekty patřila například spolupráce s Klicperovým divadlem v Hradci Králové, reprezentace Pardubic ve francouzském Bergeracu nebo účast na multimediálním projektu Pocta svatému Vojtěchovi připraveném při příležitosti návštěvy papeže Jana Pavla II.',
        'Tanečníci Monsignore se úspěšně účastnili také tanečních soutěží. Centrum získalo mimo jiné titul Mistra České republiky v kategorii show dance s nominací na evropský šampionát. Řada absolventů později pokračovala v profesionálním tanci, herectví nebo taneční pedagogice.',
      ])}
      ${copySection('Tanec <i class="accent-text">v každém věku</i>', [
        'Během posledních přibližně deseti let prošlo zaměření Tanečního centra Monsignore další výraznou proměnou. Vedle tradičního vzdělávání dětí a mladých tanečníků se stále více otevřelo také dospělým a starší generaci.',
        'Vznikly kurzy pro dospělé určené začátečníkům i pokročilým a programy propojující tanec se zdravým pohybem, regenerací a aktivním odpočinkem.',
        'Součástí této cesty je například projekt Tanec PLUS, který spojuje taneční lekce s relaxací a péčí o tělo, stejně jako fyzio-cvičení zaměřené na mobilitu, pružnost, stabilitu a prevenci pohybových obtíží.',
      ])}
      ${copySection('Od <i class="accent-text">taneční techniky</i> k péči o člověka', [
        'Dalším důležitým mezníkem se stal rozvoj tanečně-pohybové terapie. Po získání odborného vzdělání v oblasti tanečně-pohybové terapie v roce 2017 začala umělecká vedoucí centra Magdalena Mauerová stále více propojovat své dlouholeté zkušenosti tanečního pedagoga a choreografa s terapeutickým působením pohybu.',
        'Do práce centra se tak ještě výrazněji dostal individuální přístup, vědomá práce s tělem, psychická pohoda, zdravý pohyb a respekt k možnostem každého člověka.',
      ])}
      ${copySection('<i class="accent-text">Monsignore</i> dnes', [
        'Dnešní Monsignore navazuje na více než třicetiletou tradici tanečního vzdělávání, ale současně se stále vyvíjí. Je místem pro mladé tanečníky, kteří chtějí své schopnosti rozvíjet na vysoké úrovni, ale také pro dospělé a seniory, kteří chtějí zůstat aktivní, pečovat o své tělo, objevovat nové možnosti pohybu a mít radost z hudby a tance.',
        'Z původního osmičlenného tanečního souboru tak vzniklo centrum, jehož smyslem není pouze učit tančit, ale prostřednictvím pohybu rozvíjet člověka v každém období jeho života.',
        'Tanec se může měnit spolu s námi. Radost z pohybu ale nemusí mít žádný věkový limit.',
      ])}
    </section>`,
  },
  vedeni: {
    title: 'Vedení · Taneční centrum Monsignore',
    html: `${pageHero({
      kicker: 'Umělecké vedení',
      title: '<i class="accent-text">Magdaléna</i> Mauerová',
      lead: 'Umělecká vedoucí · choreografka · taneční pedagožka · tanečně-pohybová terapeutka',
      image: individual001,
      imageAlt: 'Tanečnice při individuální práci v tanečním sále',
      layout: 'page-hero--reverse',
    })}
    <section class="site-container page-content page-story">
      ${copySection('Více než 30 let <i class="accent-text">propojuje</i> tanec, pedagogiku a práci s tělem', [
        'Zakladatelka TC Monsignore věří, že tanec může člověka rozvíjet v každém věku.',
        'Magdaléna Mauerová se více než třicet let věnuje taneční pedagogice, choreografii a práci s lidmi prostřednictvím pohybu. Je zakladatelkou a uměleckou vedoucí Tanečního centra Monsignore, které založila v roce 1992.',
        'Její profesní cesta začala společenským tancem, ve kterém dosáhla výkonnostní třídy A. Postupně se začala věnovat klasickému, jazzovému a modernímu tanci. Baletní průpravu získávala u pedagogů Bulgakovové a Voroncovové z Petrohradu, Jazz dance studovala u Rastislava Letenaje, Limón techniku ve Vídni u mezinárodně uznávaného tanečníka a pedagoga Joea Alegada a Modern dance u Bruce Taylora.',
      ])}
      ${copySection('Pedagogika <i class="accent-text">jako celoživotní</i> cesta', [
        'Od 90. let působila jako profesionální tanečnice, choreografka a pedagožka. Vyučovala také na konzervatoři v Hradci Králové a dlouhodobě spolupracovala s profesionálními divadly.',
        'V Klicperově divadle v Hradci Králové působila jako tanečnice, herečka i choreografka. Několik let spolupracovala rovněž s Východočeským divadlem v Pardubicích, kde se věnovala choreografii a pohybové přípravě herců a tanečníků.',
        'Během desítek let práce v TC Monsignore vychovala několik generací dětí a mladých lidí, z nichž řada pokračovala v profesionálním tanci, herectví nebo se sama začala věnovat taneční pedagogice.',
        'Její pedagogická práce byla vždy založena na propojení kvalitní taneční techniky s muzikálností, výrazem a osobností tanečníka. Důležitější než samotný výkon je pro ni však člověk, který tančí.',
      ])}
      ${copySection('<i class="accent-text">Inspirace</i> ze zahraničí', [
        'V letech 2012–2013 působila v australském Perthu, kde vyučovala v tanečních školách Vogue Performers a Dynamic Perth’s Performing Arts Specialists moderní tanec, jazz dance a contemporary a zároveň čerpala inspiraci z tamního tanečního prostředí.',
        'Zahraniční zkušenosti ještě více posílily její zájem o přirozený pohyb, individualitu tanečníka a o hledání cest, jak může tanec člověka provázet v různých obdobích života.',
      ])}
      ${copySection('Tanec jako cesta <i class="accent-text">k tělu</i> i psychické rovnováze', [
        'Postupně se její profesní zájem začal rozšiřovat od taneční pedagogiky také směrem k terapeutickému využití pohybu.',
        'V roce 2014 absolvovala Mezinárodní konferenci uměleckých terapií ARS TERAPEUTICA, kde se věnovala arteterapii, muzikoterapii, dramaterapii a tanečně-pohybové terapii. V roce 2017 získala diplom v oboru tanečně-pohybové terapie, garantovaný Mezinárodní asociací uměleckých terapií MAUT a Českou hudební společností – Společností pro hudební terapii.',
        'Ve své práci s tanečníky klade důraz na individuální možnosti každého člověka, zdravý pohyb, mobilitu, vnímání vlastního těla, psychickou pohodu a radost z pohybu.',
      ])}
    </section>`,
  },
};

export function getPage(path) {
  return pages[path] ?? null;
}
