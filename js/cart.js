/* ── Saawariya Opticals — Cart System ── */

class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('so_cart') || '[]');
    this.wishlist = JSON.parse(localStorage.getItem('so_wishlist') || '[]');
    this.updateUI();
  }

  save() {
    localStorage.setItem('so_cart', JSON.stringify(this.items));
  }

  addItem(product, qty = 1) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 10);
    } else {
      this.items.push({ ...product, qty });
    }
    this.save();
    this.updateUI();
    showToast(`${product.name} added to cart!`);
  }

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.updateUI();
    renderCartItems();
  }

  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, Math.min(item.qty + delta, 10));
    if (item.qty === 0) {
      this.removeItem(id);
    } else {
      this.save();
      this.updateUI();
      renderCartItems();
    }
  }

  get totalItems() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  }

  get subtotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  updateUI() {
    const count = this.totalItems;
    document.querySelectorAll('#cartCount, #cartItemCount').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });

    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    if (subtotalEl) subtotalEl.textContent = `₹${this.subtotal.toLocaleString('en-IN')}`;
    if (totalEl) totalEl.textContent = `₹${this.subtotal.toLocaleString('en-IN')}`;

    const footer = document.getElementById('cartFooter');
    const empty = document.getElementById('cartEmpty');
    if (footer && empty) {
      footer.style.display = this.items.length > 0 ? 'block' : 'none';
      empty.style.display = this.items.length === 0 ? 'flex' : 'none';
    }
  }

  toggleWishlist(product) {
    const idx = this.wishlist.findIndex(i => i.id === product.id);
    if (idx === -1) {
      this.wishlist.push(product);
      showToast(`${product.name} added to wishlist!`);
    } else {
      this.wishlist.splice(idx, 1);
      showToast(`${product.name} removed from wishlist`);
    }
    localStorage.setItem('so_wishlist', JSON.stringify(this.wishlist));
    return idx === -1;
  }

  isInWishlist(id) {
    return this.wishlist.some(i => i.id === id);
  }

  clear() {
    this.items = [];
    this.save();
    this.updateUI();
  }
}

/* ── Global Cart Instance ── */
const cart = new Cart();

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartSidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartSidebar').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  if (cart.items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-bag-shopping"></i>
        <p>Your cart is empty</p>
        <a href="pages/products.html" class="btn btn-primary" onclick="closeCart()" style="margin-top:8px;">Shop Now</a>
      </div>`;
    return;
  }

  container.innerHTML = cart.items.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item-image">${item.icon || '👓'}</div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-variant">${item.brand} · ${item.category}</div>
        <div class="cart-item-price-row">
          <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="cart.updateQty(${item.id}, -1)">
              <i class="fas fa-minus"></i>
            </button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="cart.updateQty(${item.id}, 1)">
              <i class="fas fa-plus"></i>
            </button>
            <button class="qty-btn" onclick="cart.removeItem(${item.id})" style="color:#ef4444;margin-left:4px;">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleWishlist() {
  showToast('Sign in to access your wishlist');
}

function showToast(message) {
  if (window.Toastify) {
    Toastify({
      text: `✓  ${message}`,
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      style: {
        background: 'linear-gradient(135deg, #0f1035, #2b3190)',
        borderRadius: '12px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.875rem',
        padding: '14px 20px',
        boxShadow: '0 8px 32px rgba(43,49,144,0.3)'
      }
    }).showToast();
  } else {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toastMessage');
    if (toast && msg) {
      msg.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }
}

window.cart = cart;
window.openCart = openCart;
window.closeCart = closeCart;
window.showToast = showToast;
window.renderCartItems = renderCartItems;
window.toggleWishlist = toggleWishlist;
