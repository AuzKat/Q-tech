/* ══════════════════════════════════════
   COMMON.JS — Q-tech общие функции хедера
   Подключается на всех страницах
   ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initIconHovers();
  initCartUI();
  initBurgerMenu();
});

/* ── SEARCH ── */

function initSearch() {
  const searchBox    = document.querySelector('.search-box');
  const searchToggle = document.querySelector('.search-toggle');
  const searchInput  = document.getElementById('searchInput');

  if (!searchBox || !searchToggle || !searchInput) return;

  searchToggle.addEventListener('click', () => {
    searchBox.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
      setTimeout(() => searchInput.focus(), 200);
    }
  });

  document.addEventListener('click', e => {
    if (!searchBox.contains(e.target)) {
      searchBox.classList.remove('active');
    }
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const v = searchInput.value.toLowerCase().trim();
    if (!v) return;

    const map = [
      { keys: ['iphone', 'айфон', 'смартфон', 'телефон', 'samsung', 'pixel'],   href: 'catalog.html?category=phones' },
      { keys: ['macbook', 'ноут', 'laptop', 'mac'],                               href: 'catalog.html?category=laptops' },
      { keys: ['airpods', 'науш', 'sony', 'wh-1000', 'headphone'],               href: 'catalog.html?category=headphones' },
      { keys: ['watch', 'часы', 'ultra'],                                          href: 'catalog.html?category=watch' },
      { keys: ['dyson', 'пылесос', 'vacuum', 'dreame', 'kitfort', 'dexp'],        href: 'catalog.html?category=vacuum' },
      { keys: ['фен', 'dryer', 'airwrap', 'supersonic', 'aceline'],              href: 'catalog.html?category=dryer' },
    ];

    for (const { keys, href } of map) {
      if (keys.some(k => v.includes(k))) {
        window.location.href = href;
        return;
      }
    }
    window.location.href = 'catalog.html';
  });
}

/* ── BURGER MENU ── */

function initBurgerMenu() {
  const burger     = document.querySelector('.burger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn   = document.querySelector('.mobile-menu-close');

  if (!burger || !mobileMenu) return;

  function openMenu() {
    burger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        closeMenu();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      } else {
        closeMenu();
      }
    });
  });
}

/* ── ICON HOVER (data-hover) ── */

function initIconHovers() {
  document.querySelectorAll('[data-hover]').forEach(img => {
    const orig  = img.src;
    const hover = img.dataset.hover;
    img.addEventListener('mouseenter', () => { img.src = hover; });
    img.addEventListener('mouseleave', () => { img.src = orig; });
  });
}
/* ── ACCOUNT LINK ROUTING ── */

function initAccountLink() {
  const accountLinks = document.querySelectorAll('a[href="account.html"]');
  const loggedIn = localStorage.getItem('qtech_logged_in') !== 'false';
  accountLinks.forEach(link => {
    if (!loggedIn) {
      link.href = 'login.html';
    }
  });
}

document.addEventListener('DOMContentLoaded', initAccountLink);
