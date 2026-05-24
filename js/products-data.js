/* ── Saawariya Opticals — Product Data ── */
const PRODUCTS = [
  // Eyeglasses
  {
    id: 1, category: 'eyeglasses', name: 'Classic Aviator Frame', brand: 'Titan',
    price: 1299, originalPrice: 1999, rating: 4.8, reviews: 124,
    badge: 'bestseller', icon: '👓',
    description: 'Lightweight metal aviator frame with spring hinges. Suitable for all face shapes.',
    colors: ['Silver', 'Gold', 'Black'], shapes: ['Aviator'],
    inStock: true, isNew: false, isSale: true
  },
  {
    id: 2, category: 'eyeglasses', name: 'Round Acetate Frame', brand: 'Vincent Chase',
    price: 999, originalPrice: 1499, rating: 4.6, reviews: 89,
    badge: 'sale', icon: '🤓',
    description: 'Vintage-inspired round acetate frame. Available in tortoise and solid colors.',
    colors: ['Tortoise', 'Black', 'Havana'], shapes: ['Round'],
    inStock: true, isNew: false, isSale: true
  },
  {
    id: 3, category: 'eyeglasses', name: 'Wayfarer Premium', brand: 'Ray-Ban',
    price: 4999, originalPrice: 6500, rating: 5.0, reviews: 256,
    badge: 'hot', icon: '👓',
    description: 'Iconic Ray-Ban Wayfarer in premium acetate. Classic style that never goes out of fashion.',
    colors: ['Black', 'Tortoise', 'Blue'], shapes: ['Wayfarer'],
    inStock: true, isNew: false, isSale: true
  },
  {
    id: 4, category: 'eyeglasses', name: 'Rimless Titanium Frame', brand: 'Titan',
    price: 2499, originalPrice: 3200, rating: 4.7, reviews: 67,
    badge: 'new', icon: '🔭',
    description: 'Ultra-lightweight rimless titanium frame. Perfect for high prescriptions.',
    colors: ['Silver', 'Gold'], shapes: ['Rimless'],
    inStock: true, isNew: true, isSale: false
  },

  // Sunglasses
  {
    id: 5, category: 'sunglasses', name: 'Clubmaster Sunglasses', brand: 'Ray-Ban',
    price: 5499, originalPrice: 7000, rating: 4.9, reviews: 198,
    badge: 'bestseller', icon: '🕶️',
    description: 'Classic Ray-Ban Clubmaster with polarized lenses. 100% UV400 protection.',
    colors: ['Black-Gold', 'Tortoise-Gold'], shapes: ['Browline'],
    inStock: true, isNew: false, isSale: true
  },
  {
    id: 6, category: 'sunglasses', name: 'Sports Wrap Sunglasses', brand: 'Fastrack',
    price: 1199, originalPrice: 1699, rating: 4.4, reviews: 143,
    badge: 'sale', icon: '😎',
    description: 'Wraparound sporty design with UV400 protection. Ideal for outdoor activities.',
    colors: ['Black', 'Red-Black', 'Blue'], shapes: ['Wrap'],
    inStock: true, isNew: false, isSale: true
  },
  {
    id: 7, category: 'sunglasses', name: 'Cat Eye Retro', brand: 'Vogue',
    price: 2299, originalPrice: 3000, rating: 4.7, reviews: 112,
    badge: 'new', icon: '🕶️',
    description: 'Trendy cat-eye design for women. Polarized lenses with gradient tint.',
    colors: ['Pink', 'Black', 'Brown'], shapes: ['Cat Eye'],
    inStock: true, isNew: true, isSale: false
  },
  {
    id: 8, category: 'sunglasses', name: 'Polarized Aviator', brand: 'Oakley',
    price: 7999, originalPrice: 10000, rating: 4.9, reviews: 87,
    badge: 'hot', icon: '🕶️',
    description: 'Premium Oakley polarized aviator. Prizm lens technology for enhanced clarity.',
    colors: ['Black', 'Silver', 'Gold'], shapes: ['Aviator'],
    inStock: true, isNew: false, isSale: true
  },

  // Contact Lenses
  {
    id: 9, category: 'contacts', name: 'Daily Disposable Clear', brand: 'Acuvue',
    price: 599, originalPrice: 799, rating: 4.8, reviews: 234,
    badge: 'bestseller', icon: '🔵',
    description: 'Ultra-comfortable daily disposable contact lenses. Breathable material for all-day wear.',
    colors: ['Clear'], shapes: [],
    inStock: true, isNew: false, isSale: true
  },
  {
    id: 10, category: 'contacts', name: 'Monthly Toric Lenses', brand: 'Air Optix',
    price: 899, originalPrice: 1199, rating: 4.6, reviews: 156,
    badge: 'sale', icon: '🟡',
    description: 'Monthly toric lenses for astigmatism correction. Superior stability and comfort.',
    colors: ['Clear'], shapes: [],
    inStock: true, isNew: false, isSale: true
  },
  {
    id: 11, category: 'contacts', name: 'Colored Hazel Eyes', brand: 'FreshLook',
    price: 749, originalPrice: 999, rating: 4.5, reviews: 321,
    badge: 'hot', icon: '🟤',
    description: 'Natural-looking colored lenses. Transform your eye color beautifully.',
    colors: ['Hazel', 'Blue', 'Green', 'Grey'], shapes: [],
    inStock: true, isNew: false, isSale: true
  },
  {
    id: 12, category: 'contacts', name: 'Bi-Weekly Multifocal', brand: 'Biofinity',
    price: 1299, originalPrice: 1699, rating: 4.7, reviews: 78,
    badge: 'new', icon: '⚪',
    description: 'Biweekly multifocal lenses for presbyopia. Continuous wear comfort.',
    colors: ['Clear'], shapes: [],
    inStock: true, isNew: true, isSale: false
  },

  // Lenses
  {
    id: 13, category: 'lenses', name: 'Anti-Glare Lens (1.56)', brand: 'Essilor',
    price: 799, originalPrice: 1099, rating: 4.8, reviews: 445,
    badge: 'bestseller', icon: '💎',
    description: 'Premium anti-reflective coating. Reduces eye strain from screens and night driving.',
    colors: ['Clear'], shapes: [],
    inStock: true, isNew: false, isSale: true
  },
  {
    id: 14, category: 'lenses', name: 'Blue Light Block Lens', brand: 'Hoya',
    price: 1099, originalPrice: 1499, rating: 4.9, reviews: 287,
    badge: 'hot', icon: '🔵',
    description: 'Advanced blue light filtering for computer users. Reduces digital eye strain.',
    colors: ['Clear', 'Light Tint'], shapes: [],
    inStock: true, isNew: false, isSale: true
  },
  {
    id: 15, category: 'lenses', name: 'Progressive High Index 1.67', brand: 'Essilor',
    price: 3999, originalPrice: 5500, rating: 4.7, reviews: 134,
    badge: 'sale', icon: '👁️',
    description: 'Ultra-thin progressive lenses for presbyopia. Smooth transition from near to far.',
    colors: ['Clear', 'Photochromic'], shapes: [],
    inStock: true, isNew: false, isSale: true
  },
  {
    id: 16, category: 'lenses', name: 'Photochromic Transitions', brand: 'Transitions',
    price: 2499, originalPrice: 3200, rating: 4.8, reviews: 203,
    badge: 'new', icon: '🌓',
    description: 'Automatically darken in sunlight and clear indoors. The ultimate in convenience.',
    colors: ['Grey', 'Brown', 'Graphite Green'], shapes: [],
    inStock: true, isNew: true, isSale: false
  }
];

/* ── Prescription Lens Options ── */
const LENS_OPTIONS = {
  types: [
    { id: 'single', name: 'Single Vision', price: 0, desc: 'For one focal distance' },
    { id: 'bifocal', name: 'Bifocal', price: 500, desc: 'Two focal distances' },
    { id: 'progressive', name: 'Progressive', price: 1500, desc: 'Gradual focal transition' }
  ],
  coatings: [
    { id: 'none', name: 'No Coating', price: 0 },
    { id: 'antiglare', name: 'Anti-Glare', price: 399 },
    { id: 'bluelight', name: 'Blue Light Block', price: 599 },
    { id: 'photochromic', name: 'Photochromic', price: 999 }
  ],
  indexes: [
    { id: '1.50', name: 'Standard 1.50', price: 0, range: 'Up to ±2.00' },
    { id: '1.56', name: 'Mid Index 1.56', price: 199, range: '±2.00 to ±4.00' },
    { id: '1.60', name: 'High Index 1.60', price: 499, range: '±4.00 to ±6.00' },
    { id: '1.67', name: 'Ultra High 1.67', price: 799, range: 'Above ±6.00' }
  ]
};

window.PRODUCTS = PRODUCTS;
window.LENS_OPTIONS = LENS_OPTIONS;
