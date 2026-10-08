import './style.css';

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');

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

document.querySelectorAll('[data-inert-nav]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMenu();
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
