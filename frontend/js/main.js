/* ══════════════════════════════════════
   MAIN.JS — Q-tech главная страница
   ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  initSlider();
  initFaqAccordion();
  renderTopProducts();

});

/* ── HERO SLIDER ── */

function initSlider() {

  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.dot');

  if (!slides.length) return;

  let current = 0;

  function showSlide(idx) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[idx].classList.add('active');
    if (dots[idx]) dots[idx].classList.add('active');
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      showSlide(current);
    });
  });

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 5000);
}

/* ── SMOOTH SCROLL FOR CATEGORY LINKS ── */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ── FAQ ACCORDION ── */

function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ── RENDER TOP PRODUCTS ON HOME PAGE ── */

function renderTopProducts() {
  const grid = document.getElementById('top-products');
  if (!grid || typeof PRODUCTS === 'undefined') return;

  const top = PRODUCTS.filter(p => p.badge === 'hit').slice(0, 3);
  if (!top.length) return;

  grid.innerHTML = top.map(p => `
    <a href="product.html?id=${p.id}" class="card">
      <img src="${p.images[0]}" alt="${p.title}" onerror="this.src='img/placeholder.webp'">
      <h3>${formatPrice(p.price)} ₽</h3>
      <p>${p.title}</p>
    </a>
  `).join('');
}
