import './style.css';
import { getPage } from './pages.js';

const main = document.querySelector('main');
const browserThemeColor = document.querySelector('meta[name="theme-color"]');
const metaDescription = document.querySelector('meta[name="description"]');
const defaultDescription = metaDescription.content;

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const desktopDropdowns = document.querySelectorAll('.site-nav .nav-dropdown');
const mobileDropdowns = document.querySelectorAll('.mobile-nav-group');

function closeMenu() {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Otevřít menu');
  document.body.classList.remove('menu-open');
  desktopDropdowns.forEach((dropdown) => {
    dropdown.open = false;
    dropdown.classList.remove('is-opening', 'is-closing');
  });
  mobileDropdowns.forEach((dropdown) => {
    dropdown.open = false;
    dropdown.querySelector('.nav-submenu').style.setProperty('--submenu-height', '0px');
  });
}

toggle.addEventListener('click', () => {
  const open = !menu.classList.contains('open');
  if (!open) {
    closeMenu();
    return;
  }
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
  document.body.classList.toggle('menu-open', open);
});

desktopDropdowns.forEach((dropdown) => {
  let closeTimer;
  const submenu = dropdown.querySelector('.nav-submenu');
  let animationHandler;

  const animate = (state) => {
    dropdown.classList.remove('is-opening', 'is-closing');
    if (animationHandler) submenu.removeEventListener('animationend', animationHandler);
    void submenu.offsetHeight;
    const stateClass = `is-${state}`;
    dropdown.classList.add(stateClass);
    animationHandler = (event) => {
      if (event.target !== submenu) return;
      dropdown.classList.remove(stateClass);
      submenu.removeEventListener('animationend', animationHandler);
      animationHandler = null;
      if (state === 'closing') dropdown.open = false;
    };
    submenu.addEventListener('animationend', animationHandler);
  };

  const openDropdown = () => {
    window.clearTimeout(closeTimer);
    const reversingClose = dropdown.classList.contains('is-closing');
    if (!dropdown.open || reversingClose) {
      desktopDropdowns.forEach((other) => {
        if (other !== dropdown && other.open) other.open = false;
      });
      dropdown.open = true;
      animate('opening');
    }
  };

  const closeDropdown = () => {
    window.clearTimeout(closeTimer);
    if (dropdown.open && !dropdown.classList.contains('is-closing')) animate('closing');
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      if (!dropdown.matches(':hover') && !dropdown.contains(document.activeElement)) closeDropdown();
    }, 120);
  };

  dropdown.querySelector(':scope > summary').addEventListener('click', (event) => {
    event.preventDefault();
    if (event.detail === 0 && dropdown.open && !dropdown.classList.contains('is-closing')) closeDropdown();
    else openDropdown();
  });
  dropdown.addEventListener('mouseenter', openDropdown);
  dropdown.addEventListener('mouseleave', scheduleClose);
  submenu.addEventListener('mouseenter', openDropdown);
  submenu.addEventListener('mouseleave', scheduleClose);
  dropdown.addEventListener('focusout', scheduleClose);
});

mobileDropdowns.forEach((dropdown) => {
  const submenu = dropdown.querySelector('.nav-submenu');
  const setSubmenuHeight = () => {
    if (!dropdown.open) {
      submenu.style.setProperty('--submenu-height', '0px');
      return;
    }
    requestAnimationFrame(() => {
      submenu.style.setProperty('--submenu-height', `${submenu.scrollHeight}px`);
    });
  };

  setSubmenuHeight();
  dropdown.addEventListener('toggle', setSubmenuHeight);
});

function observeReveals() {
  const revealItems = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((element) => observer.observe(element));
}

const heroInterval = 6000;
let heroTimer;

// Hero: crossfade po 6 s, pauza při hoveru a focusu, tlačítko pro zastavení, bez autoplay při reduced-motion
function initHero() {
  window.clearInterval(heroTimer);
  const root = main.querySelector('[data-hero]');
  if (!root) return;

  const slides = [...root.querySelectorAll('.hero__slide')];
  const dotsHolder = root.querySelector('.hero__dots');
  const pauseButton = root.querySelector('[data-hero-pause]');
  let current = 0;
  let stopped = reducedMotion;
  let hovered = false;
  root.style.setProperty('--hero-interval', `${heroInterval}ms`);

  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero__dot';
    dot.setAttribute('aria-label', `Fotografie ${index + 1}`);
    dot.addEventListener('click', () => {
      show(index);
      restart();
    });
    dotsHolder.append(dot);
    return dot;
  });

  function show(index) {
    current = index;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.toggleAttribute('inert', !active);
      if (active) slide.removeAttribute('aria-hidden');
      else slide.setAttribute('aria-hidden', 'true');
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
  }

  function restart() {
    window.clearInterval(heroTimer);
    root.classList.remove('is-running');
    if (stopped || hovered) return;
    void root.offsetWidth;
    root.classList.add('is-running');
    heroTimer = window.setInterval(() => show((current + 1) % slides.length), heroInterval);
  }

  function renderPauseButton() {
    pauseButton.setAttribute('aria-label', stopped ? 'Spustit střídání fotografií' : 'Zastavit střídání fotografií');
    pauseButton.innerHTML = stopped
      ? '<svg aria-hidden="true" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.5v11l9-5.5z"/></svg>'
      : '<svg aria-hidden="true" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.5h3v11H3zM8 1.5h3v11H8z"/></svg>';
  }

  pauseButton.addEventListener('click', () => {
    stopped = !stopped;
    renderPauseButton();
    restart();
  });
  root.addEventListener('mouseenter', () => { hovered = true; restart(); });
  root.addEventListener('mouseleave', () => { hovered = false; restart(); });
  root.addEventListener('focusin', () => { hovered = true; restart(); });
  root.addEventListener('focusout', () => { hovered = root.matches(':hover'); restart(); });

  show(0);
  renderPauseButton();
  restart();
}

// Fotky s [data-parallax] se při scrollu jemně posouvají proti směru stránky (ne při reduced-motion)
const parallaxFactor = 0.08;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let parallaxFrame;

function updateParallax() {
  parallaxFrame = null;
  main.querySelectorAll('[data-parallax]').forEach((box) => {
    const rect = box.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * parallaxFactor;
    box.querySelector('.photo').style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  });
}

function requestParallax() {
  if (!reducedMotion && !parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateParallax);
}

function setTheme(world, mood) {
  document.body.dataset.world = world;
  if (mood) main.dataset.mood = mood;
  else delete main.dataset.mood;
  const bg = getComputedStyle(document.body).getPropertyValue('--c-bg').trim().split(/\s+/);
  if (browserThemeColor && bg.length === 3) browserThemeColor.content = `rgb(${bg.join(', ')})`;
}

function markCurrentLinks(slug) {
  document.querySelectorAll('.site-header a[href^="#/"]').forEach((link) => {
    const current = link.getAttribute('href') === `#/${slug}`;
    if (current) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  desktopDropdowns.forEach((dropdown) => {
    dropdown.classList.toggle('is-current', Boolean(dropdown.querySelector('[aria-current="page"]')));
  });
}

let currentSlug = null;

function renderPage(slug, page) {
  currentSlug = slug;
  main.classList.toggle('page-view', slug !== '');
  main.innerHTML = page.html;
  document.title = page.title;
  metaDescription.content = page.description ?? defaultDescription;
  setTheme(page.world ?? 'centrum', page.mood);
  markCurrentLinks(slug);
  observeReveals();
  initHero();
  requestParallax();
}

function findAnchor(hash) {
  if (hash.length < 2 || hash.startsWith('#/')) return null;
  return document.getElementById(decodeURIComponent(hash.slice(1)));
}

// #/slug/podstranka vykreslí stránku z pages.js, prosté kotvy (#kontakt) jen scrollují
function renderRoute() {
  const { hash } = window.location;
  closeMenu();

  const anchor = findAnchor(hash);
  if (anchor) {
    if (currentSlug === null) renderPage('', getPage(''));
    anchor.scrollIntoView();
    return;
  }

  const match = hash.match(/^#\/([a-z0-9-]+(?:\/[a-z0-9-]+)*)?\/?$/);
  const requested = match?.[1] ?? '';
  const slug = getPage(requested) ? requested : '';
  renderPage(slug, getPage(slug));
  window.scrollTo(0, 0);
}

const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('scroll', requestParallax, { passive: true });
window.addEventListener('resize', requestParallax);
updateHeader();

document.querySelectorAll('[data-inert-nav]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) closeMenu();
});
window.addEventListener('hashchange', renderRoute);

renderRoute();
