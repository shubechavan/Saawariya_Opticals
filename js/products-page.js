/* ── Products Page Script ── */

let currentPage = 1;
const ITEMS_PER_PAGE = 12;
let filteredProducts = [];
let priceRange = [0, 10000];

document.addEventListener('DOMContentLoaded', () => {
  initPageFromURL();
  initPriceSlider();
  initScrollEffects();
  if (window.AOS) AOS.init({ duration: 600, once: true, offset: 40 });
  applyFilters();
});

function initPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  const q = params.get('q');
  const offer = params.get('offer');

  const breadcrumb = document.getElementById('breadcrumbCat');
  const title = document.getElementById('pageTitle');
  const subtitle = document.getElementById('pageSubtitle');

  const categoryMap = {
    eyeglasses: { label: 'Eyeglasses', title: 'Prescription Glasses', sub: 'Find your perfect frames — stylish, durable, and custom-fitted.' },
    sunglasses: { label: 'Sunglasses', title: 'Sunglasses Collection', sub: '100% UV protection sunglasses for every lifestyle.' },
    contacts: { label: 'Contact Lenses', title: 'Contact Lenses', sub: 'Daily, monthly, and colored contact lenses from trusted brands.' },
    lenses: { label: 'Premium Lenses', title: 'Premium Optical Lenses', sub: 'Anti-glare, blue light, photochromic and progressive lenses.' },
    kids: { label: 'Kids\' Eyewear', title: 'Kids\' Glasses', sub: 'Safe, fun and durable eyewear for children.' },
    sport: { label: 'Sports Glasses', title: 'Sports Eyewear', sub: 'Performance eyewear for active lifestyles.' },
  };

  if (cat && categoryMap[cat]) {
    const info = categoryMap[cat];
    if (breadcrumb) breadcrumb.textContent = info.label;
    if (title) title.textContent = info.title;
    if (subtitle) subtitle.textContent = info.sub;

    const radio = document.querySelector(`input[name="category"][value="${cat}"]`);
    if (radio) radio.checked = true;
  }

  if (q && title) {
    title.textContent = `Search: "${q}"`;
    if (subtitle) subtitle.textContent = `Showing results for "${q}"`;
  }

  if (offer === 'true') {
    const saleCheck = document.getElementById('onSaleFilter');
    if (saleCheck) saleCheck.checked = true;
    if (title) title.textContent = 'Special Offers';
    if (subtitle) subtitle.textContent = 'Exclusive discounts on premium eyewear';
  }
}

function initPriceSlider() {
  const slider = document.getElementById('priceSlider');
  if (!slider || !window.noUiSlider) return;

  noUiSlider.create(slider, {
    start: [0, 10000],
    connect: true,
    range: { min: 0, max: 10000 },
    step: 100,
    format: {
      to: v => Math.round(v),
      from: v => Number(v)
    }
  });

  slider.noUiSlider.on('update', (values) => {
    priceRange = [parseInt(values[0]), parseInt(values[1])];
    document.getElementById('priceMin').textContent = `₹${parseInt(values[0]).toLocaleString('en-IN')}`;
    document.getElementById('priceMax').textContent = `₹${parseInt(values[1]).toLocaleString('en-IN')}`;
  });

  slider.noUiSlider.on('change', () => applyFilters());
}

function applyFilters() {
  currentPage = 1;

  const cat = document.querySelector('input[name="category"]:checked')?.value || 'all';
  const brands = Array.from(document.querySelectorAll('input[type="checkbox"][value]:not(#onSaleFilter):not(#newArrivalFilter):checked')).map(el => el.value);
  const minRating = parseFloat(document.querySelector('input[name="rating"]:checked')?.value || '0');
  const onSale = document.getElementById('onSaleFilter')?.checked || false;
  const newOnly = document.getElementById('newArrivalFilter')?.checked || false;
  const sort = document.getElementById('sortSelect')?.value || 'popular';

  filteredProducts = PRODUCTS.filter(p => {
    if (cat !== 'all' && p.category !== cat) return false;
    if (brands.length > 0 && !brands.includes(p.brand)) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (p.rating < minRating) return false;
    if (onSale && !p.isSale) return false;
    if (newOnly && !p.isNew) return false;
    return true;
  });

  // Sort
  switch (sort) {
    case 'price-low': filteredProducts.sort((a, b) => a.price - b.price); break;
    case 'price-high': filteredProducts.sort((a, b) => b.price - a.price); break;
    case 'rating': filteredProducts.sort((a, b) => b.rating - a.rating); break;
    case 'newest': filteredProducts.sort((a, b) => b.isNew - a.isNew); break;
    case 'discount': filteredProducts.sort((a, b) => {
      const da = a.originalPrice ? (1 - a.price / a.originalPrice) : 0;
      const db = b.originalPrice ? (1 - b.price / b.originalPrice) : 0;
      return db - da;
    }); break;
    default: filteredProducts.sort((a, b) => b.reviews - a.reviews);
  }

  renderProductsPage();
  updateResultsCount();
  updateLoadMore();
}

function renderProductsPage() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const pageItems = filteredProducts.slice(0, currentPage * ITEMS_PER_PAGE);

  if (pageItems.length === 0) {
    grid.innerHTML = `
      <div class="products-empty" style="grid-column:1/-1;">
        <i class="fas fa-search"></i>
        <h3>No products found</h3>
        <p>Try adjusting your filters or browse all products</p>
        <button class="btn btn-primary" onclick="clearAllFilters()">Clear Filters</button>
      </div>`;
    return;
  }

  grid.innerHTML = pageItems.map(p => createProductCardPage(p)).join('');

  if (window.VanillaTilt) {
    VanillaTilt.init(grid.querySelectorAll('[data-tilt]'), {
      max: 6, speed: 400, glare: true, 'max-glare': 0.1
    });
  }
}

function createProductCardPage(product) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const starsHTML = Array.from({ length: 5 }, (_, i) =>
    `<i class="fa${i < Math.floor(product.rating) ? 's' : 'r'} fa-star"></i>`
  ).join('');

  const badgeHTML = product.badge
    ? `<span class="badge badge-${product.badge}">${product.badge.toUpperCase()}</span>`
    : '';

  return `
    <div class="product-card" data-tilt data-tilt-max="5">
      <div class="product-image-wrapper">
        <div class="product-image-placeholder">${product.icon}</div>
        <div class="product-badges">
          ${badgeHTML}
          ${product.isNew ? '<span class="badge badge-new">NEW</span>' : ''}
        </div>
        <div class="product-actions">
          <button class="product-action-btn" onclick="toggleProductWishlist(${product.id}, this)">
            <i class="far fa-heart"></i>
          </button>
          <button class="product-action-btn" onclick="quickView(${product.id})">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${formatCat(product.category)}</div>
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
        <button class="product-add-to-cart" onclick="cart.addItem(PRODUCTS.find(p=>p.id===${product.id}))">
          <i class="fas fa-bag-shopping"></i> Add to Cart
        </button>
      </div>
    </div>
  `;
}

function formatCat(cat) {
  const map = { eyeglasses: 'Prescription Glasses', sunglasses: 'Sunglasses', contacts: 'Contact Lenses', lenses: 'Premium Lenses' };
  return map[cat] || cat;
}

function updateResultsCount() {
  const el = document.getElementById('resultsCount');
  if (el) el.textContent = filteredProducts.length;
}

function updateLoadMore() {
  const wrap = document.getElementById('loadMoreWrap');
  const btn = document.getElementById('loadMoreBtn');
  if (!wrap || !btn) return;
  const hasMore = filteredProducts.length > currentPage * ITEMS_PER_PAGE;
  wrap.style.display = hasMore ? 'block' : 'none';
}

function loadMore() {
  currentPage++;
  renderProductsPage();
  updateLoadMore();
}

function clearAllFilters() {
  document.querySelectorAll('input[name="category"]')[0].checked = true;
  document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
  document.querySelectorAll('input[name="rating"]').forEach((el, i) => {
    if (el.value === '0') el.checked = true; else el.checked = false;
  });
  const slider = document.getElementById('priceSlider');
  if (slider?.noUiSlider) slider.noUiSlider.reset();
  applyFilters();
}

function setView(type, btn) {
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('productsGrid');
  if (grid) {
    grid.classList.toggle('list-view', type === 'list');
  }
}

function initScrollEffects() {
  const header = document.getElementById('mainHeader');
  const scrollTop = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 80);
    if (scrollTop) scrollTop.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
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

  const overlay = document.createElement('div');
  overlay.className = 'quickview-overlay';
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(15,16,53,0.7);z-index:10000;
    display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(8px);`;

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  overlay.innerHTML = `
    <div style="background:white;border-radius:24px;max-width:680px;width:100%;
      display:grid;grid-template-columns:1fr 1fr;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,0.3);">
      <div style="background:linear-gradient(145deg,#f0f2ff,#e8ecff);display:flex;align-items:center;justify-content:center;padding:40px;">
        <div style="font-size:7rem;">${product.icon}</div>
      </div>
      <div style="padding:32px;overflow-y:auto;">
        <button onclick="this.closest('.quickview-overlay').remove();document.body.style.overflow='';"
          style="float:right;background:#f3f4f6;border:none;width:32px;height:32px;border-radius:8px;cursor:pointer;">✕</button>
        <div style="font-size:0.75rem;color:#2b3190;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">${product.brand}</div>
        <h2 style="font-family:Poppins;font-size:1.2rem;margin-bottom:12px;">${product.name}</h2>
        <p style="font-size:0.875rem;color:#5a6080;line-height:1.7;margin-bottom:20px;">${product.description}</p>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
          <span style="font-family:Poppins;font-size:1.5rem;font-weight:700;color:#2b3190;">₹${product.price.toLocaleString('en-IN')}</span>
          ${product.originalPrice ? `<span style="text-decoration:line-through;color:#9ca3af;">₹${product.originalPrice.toLocaleString('en-IN')}</span>
          <span style="background:#dcfce7;color:#166534;font-size:0.75rem;font-weight:700;padding:3px 8px;border-radius:999px;">${discount}% OFF</span>` : ''}
        </div>
        <button onclick="cart.addItem(PRODUCTS.find(p=>p.id===${id}));this.closest('.quickview-overlay').remove();document.body.style.overflow='';"
          style="width:100%;padding:14px;background:linear-gradient(135deg,#2b3190,#3d45b8);
            color:white;border:none;border-radius:12px;font-size:0.95rem;font-weight:600;cursor:pointer;">
          🛍️ Add to Cart
        </button>
      </div>
    </div>`;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) { overlay.remove(); document.body.style.overflow = ''; }
  });

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

function toggleMobileMenu() {}

window.applyFilters = applyFilters;
window.clearAllFilters = clearAllFilters;
window.loadMore = loadMore;
window.setView = setView;
window.quickView = quickView;
window.toggleProductWishlist = toggleProductWishlist;
window.toggleMobileMenu = toggleMobileMenu;
