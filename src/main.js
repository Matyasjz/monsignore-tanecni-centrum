import './style.css';
import { getPage } from './pages.js';

const main = document.querySelector('main');
const homeMarkup = main.innerHTML;
const homeTitle = document.title;

const browserThemeColor = document.querySelector('meta[name="theme-color"]');
const paperColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-paper')
  .trim()
  .split(/\s+/);

if (browserThemeColor && paperColor.length === 3) {
  browserThemeColor.content = `rgb(${paperColor.join(', ')})`;
}

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

function renderRoute() {
  const match = window.location.hash.match(/^#\/([a-z-]+)$/);
  const page = match ? getPage(match[1]) : null;

  if (page) {
    main.id = 'page';
    main.classList.add('page-view');
    main.innerHTML = page.html;
    document.title = page.title;
  } else {
    main.id = 'domu';
    main.classList.remove('page-view');
    main.innerHTML = homeMarkup;
    document.title = homeTitle;
  }

  closeMenu();
  observeReveals();
  window.scrollTo(0, 0);
}

document.querySelectorAll('[data-inert-nav]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) closeMenu();
});
window.addEventListener('hashchange', renderRoute);

renderRoute();
