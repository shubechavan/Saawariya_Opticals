/* ── Saawariya Opticals — Main JavaScript ── */

/* ── AOS Init ── */
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  initHeroSwiper();
  initScrollEffects();
  initProductGrid();
  initSearchFunctionality();
  initCounterAnimation();
  initVanillaTilt();
  initSearchBar();
});

/* ── Hero Swiper ── */
function initHeroSwiper() {
  if (!document.querySelector('.heroSwiper')) return;
  new Swiper('.heroSwiper', {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: {
      el: '.heroSwiper .swiper-pagination',
      clickable: true
    }
  });
}

/* ── Scroll Effects ── */
function initScrollEffects() {
  const header = document.getElementById('mainHeader');
  const scrollTop = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      header.classList.toggle('scrolled', scrollY > 80);
    }

    if (scrollTop) {
      scrollTop.classList.toggle('show', scrollY > 400);
    }
  }, { passive: true });
}

/* ── Product Grid ── */
let currentFilter = 'all';

function initProductGrid() {
  const grid = document.getElementById('productsGrid');
  if (!grid || !window.PRODUCTS) return;

  renderProducts('all');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      currentFilter = filter;
      renderProducts(filter);
    });
  });
}

function renderProducts(filter) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter(p => p.category === filter).slice(0, 8);

  grid.innerHTML = filtered.map(product => createProductCard(product)).join('');

  // Re-init tilt on new cards
  if (window.VanillaTilt) {
    VanillaTilt.init(grid.querySelectorAll('[data-tilt]'), {
      max: 6,
      speed: 400,
      glare: true,
      'max-glare': 0.1
    });
  }

  // Re-init AOS for new elements
  if (window.AOS) AOS.refresh();
}

function createProductCard(product) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const badgeHTML = product.badge
    ? `<span class="badge badge-${product.badge}">${product.badge.toUpperCase()}</span>`
    : '';

  const starsHTML = Array.from({ length: 5 }, (_, i) => {
    const full = i < Math.floor(product.rating);
    const half = !full && i < product.rating;
    return `<i class="fa${half ? 's fa-star-half-alt' : full ? 's fa-star' : 'r fa-star'}"></i>`;
  }).join('');

  return `
    <div class="product-card" data-tilt data-tilt-max="5" data-tilt-speed="400">
      <div class="product-image-wrapper">
        <div class="product-image-placeholder">${product.icon}</div>
        <div class="product-badges">
          ${badgeHTML}
          ${product.isNew ? '<span class="badge badge-new">NEW</span>' : ''}
        </div>
        <div class="product-actions">
          <button class="product-action-btn" onclick="toggleProductWishlist(${product.id}, this)" title="Add to wishlist">
            <i class="far fa-heart"></i>
          </button>
          <button class="product-action-btn" onclick="quickView(${product.id})" title="Quick view">
            <i class="fas fa-eye"></i>
          </button>
          <button class="product-action-btn" onclick="compareProduct(${product.id})" title="Compare">
            <i class="fas fa-code-compare"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${formatCategory(product.category)}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <div class="stars">${starsHTML}</div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
          ${product.originalPrice ? `
            <span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            <span class="price-save">${discount}% OFF</span>
          ` : ''}
        </div>
        <button class="product-add-to-cart" onclick="cart.addItem(${JSON.stringify(product).replace(/"/g, '&quot;')})">
          <i class="fas fa-bag-shopping"></i>
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

function formatCategory(cat) {
  const map = {
    eyeglasses: 'Prescription Glasses',
    sunglasses: 'Sunglasses',
    contacts: 'Contact Lenses',
    lenses: 'Premium Lenses'
  };
  return map[cat] || cat;
}

function toggleProductWishlist(id, btn) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const added = cart.toggleWishlist(product);
  btn.classList.toggle('active', added);
  btn.querySelector('i').className = added ? 'fas fa-heart' : 'far fa-heart';
}

function quickView(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const starsHTML = Array.from({ length: 5 }, (_, i) =>
    `<i class="fa${i < Math.floor(product.rating) ? 's' : 'r'} fa-star"></i>`
  ).join('');

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const overlay = document.createElement('div');
  overlay.className = 'quickview-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(15,16,53,0.7);z-index:10000;
    display:flex;align-items:center;justify-content:center;padding:24px;
    backdrop-filter:blur(8px);animation:fadeIn 0.3s ease;
  `;

  overlay.innerHTML = `
    <div style="background:white;border-radius:24px;max-width:720px;width:100%;
      display:grid;grid-template-columns:1fr 1fr;overflow:hidden;box-shadow:0 32px 80px rgba(43,49,144,0.25);
      animation:scaleIn 0.3s ease;">
      <div style="background:linear-gradient(145deg,#f0f2ff,#e8ecff);
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        padding:48px 32px;gap:16px;">
        <div style="font-size:8rem;">${product.icon}</div>
        <div style="font-size:0.8rem;color:#6b7280;text-align:center;">${product.colors?.join(' · ') || ''}</div>
      </div>
      <div style="padding:32px;overflow-y:auto;">
        <button onclick="this.closest('.quickview-overlay').remove();document.body.style.overflow='';"
          style="float:right;background:#f3f4f6;border:none;width:32px;height:32px;
            border-radius:8px;cursor:pointer;font-size:1rem;">✕</button>
        <div style="font-size:0.75rem;color:#2b3190;font-weight:600;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">${product.brand}</div>
        <h2 style="font-family:Poppins;font-size:1.3rem;color:#0f1035;margin-bottom:12px;">${product.name}</h2>
        <div style="display:flex;gap:6px;margin-bottom:16px;color:#e8b84b;">${starsHTML}
          <span style="color:#6b7280;font-size:0.85rem;">(${product.reviews} reviews)</span>
        </div>
        <p style="font-size:0.9rem;color:#5a6080;line-height:1.7;margin-bottom:20px;">${product.description}</p>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
          <span style="font-family:Poppins;font-size:1.6rem;font-weight:700;color:#2b3190;">₹${product.price.toLocaleString('en-IN')}</span>
          ${product.originalPrice ? `
            <span style="text-decoration:line-through;color:#9ca3af;">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            <span style="background:#dcfce7;color:#166534;font-size:0.78rem;font-weight:700;padding:3px 8px;border-radius:999px;">${discount}% OFF</span>
          ` : ''}
        </div>
        <button onclick="cart.addItem(window.PRODUCTS.find(p=>p.id===${id}));this.closest('.quickview-overlay').remove();document.body.style.overflow='';"
          style="width:100%;padding:14px;background:linear-gradient(135deg,#2b3190,#3d45b8);
            color:white;border:none;border-radius:12px;font-size:0.95rem;
            font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
          <i class="fas fa-bag-shopping"></i> Add to Cart
        </button>
        <a href="pages/products.html#product-${product.id}"
          style="display:block;text-align:center;margin-top:12px;color:#2b3190;font-size:0.875rem;font-weight:500;">
          View Full Details →
        </a>
      </div>
    </div>
  `;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.remove();
      document.body.style.overflow = '';
    }
  });

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

function compareProduct(id) {
  showToast('Compare feature coming soon!');
}

/* ── Search Functionality ── */
let fuseInstance = null;

function initSearchFunctionality() {
  if (!window.Fuse || !window.PRODUCTS) return;

  fuseInstance = new Fuse(PRODUCTS, {
    keys: ['name', 'brand', 'category', 'description'],
    threshold: 0.35,
    includeScore: true
  });
}

function initSearchBar() {
  const searchInput = document.getElementById('searchInput');
  const suggestions = document.getElementById('searchSuggestions');
  if (!searchInput || !suggestions) return;

  searchInput.addEventListener('input', debounce(() => {
    const query = searchInput.value.trim();
    if (!query || query.length < 2 || !fuseInstance) {
      suggestions.style.display = 'none';
      return;
    }

    const results = fuseInstance.search(query).slice(0, 6);
    if (results.length === 0) {
      suggestions.style.display = 'none';
      return;
    }

    suggestions.innerHTML = results.map(({ item }) => `
      <div class="suggestion-item" onclick="window.location.href='pages/products.html?q=${encodeURIComponent(item.name)}'">
        <span>${item.icon}</span>
        <div>
          <div style="font-weight:600;font-size:0.875rem;">${item.name}</div>
          <div style="font-size:0.75rem;color:#6b7280;">${item.brand} · ₹${item.price.toLocaleString('en-IN')}</div>
        </div>
      </div>
    `).join('');

    suggestions.style.cssText = `
      display:block;position:absolute;top:calc(100% + 8px);left:0;right:0;
      background:white;border:1px solid #e2e5f5;border-radius:14px;
      box-shadow:0 20px 60px rgba(43,49,144,0.15);z-index:100;
      overflow:hidden;
    `;

    const style = document.createElement('style');
    style.textContent = `.suggestion-item{display:flex;gap:12px;align-items:center;padding:12px 16px;cursor:pointer;transition:0.2s;} .suggestion-item:hover{background:#f0f2ff;}`;
    if (!document.getElementById('suggestion-styles')) {
      style.id = 'suggestion-styles';
      document.head.appendChild(style);
    }
  }, 200));

  document.addEventListener('click', e => {
    if (!searchInput.contains(e.target)) suggestions.style.display = 'none';
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim();
      if (q) window.location.href = `pages/products.html?q=${encodeURIComponent(q)}`;
      suggestions.style.display = 'none';
    }
  });
}

/* ── Counter Animation ── */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('en-IN');
  }, 16);
}

/* ── Vanilla Tilt ── */
function initVanillaTilt() {
  if (!window.VanillaTilt) return;
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.12
  });
}

/* ── Mobile Menu ── */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (!menu) return;

  const isOpen = menu.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';

  if (hamburger) {
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
      spans[1].style.cssText = 'opacity:0';
      spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => (s.style.cssText = ''));
    }
  }
}

/* ── Newsletter ── */
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail');
  if (!email) return;

  if (!email.value || !email.value.includes('@')) {
    showToast('Please enter a valid email address');
    return;
  }

  showToast(`Subscribed with ${email.value}! Welcome to Saawariya family!`);
  email.value = '';
}

/* ── Utility: Debounce ── */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ── Service Worker Registration (PWA) ── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

window.toggleMobileMenu = toggleMobileMenu;
window.quickView = quickView;
window.compareProduct = compareProduct;
window.subscribeNewsletter = subscribeNewsletter;
window.toggleProductWishlist = toggleProductWishlist;
