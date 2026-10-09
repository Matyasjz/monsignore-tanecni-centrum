import './style.css';

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const desktopDropdowns = document.querySelectorAll('.site-nav .nav-dropdown');
const mobileDropdowns = document.querySelectorAll('.mobile-nav-group');

function closeMenu() {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Otevřít menu');
  document.body.classList.remove('menu-open');
}

toggle.addEventListener('click', () => {
  const open = !menu.classList.contains('open');
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
  document.body.classList.toggle('menu-open', open);
});

desktopDropdowns.forEach((dropdown) => {
  let closeTimer;
  const submenu = dropdown.querySelector('.nav-submenu');
  const keepOpen = () => {
    window.clearTimeout(closeTimer);
    if (!dropdown.open) {
      dropdown.open = true;
      dropdown.classList.remove('is-opening');
      void submenu.offsetHeight;
      dropdown.classList.add('is-opening');
    }
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      if (!dropdown.matches(':hover') && !dropdown.contains(document.activeElement)) {
        dropdown.open = false;
        dropdown.classList.remove('is-opening');
      }
    }, 180);
  };

  dropdown.addEventListener('mouseenter', keepOpen);
  dropdown.addEventListener('mouseleave', scheduleClose);
  submenu.addEventListener('mouseenter', keepOpen);
  submenu.addEventListener('mouseleave', scheduleClose);
  dropdown.addEventListener('focusin', keepOpen);
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

document.querySelectorAll('[data-inert-nav]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) closeMenu();
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}
