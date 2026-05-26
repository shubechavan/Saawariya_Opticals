# Saawariya Opticals — Project Documentation

**Live URL:** https://saawariya-opticals.vercel.app  
**GitHub Repo:** https://github.com/shubechavan/Saawariya_Opticals  
**Branch:** `main` (auto-deploys to Vercel on every push)  
**Last Updated:** May 2026

---

## Table of Contents

1. [Business Overview](#1-business-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [Pages Reference](#5-pages-reference)
6. [JavaScript Architecture](#6-javascript-architecture)
7. [CSS Architecture](#7-css-architecture)
8. [Third-Party Libraries](#8-third-party-libraries)
9. [SEO Implementation](#9-seo-implementation)
10. [PWA (Progressive Web App)](#10-pwa-progressive-web-app)
11. [Deployment (Vercel)](#11-deployment-vercel)
12. [WhatsApp Integration](#12-whatsapp-integration)
13. [How to Make Common Changes](#13-how-to-make-common-changes)
14. [Git Workflow](#14-git-workflow)

---

## 1. Business Overview

**Saawariya Opticals** is a premium eyewear and eye-care shop based in Bhayander, Mumbai with 15+ years of experience.

### Founders
| Role | Name |
|---|---|
| Founder | Jaisingh Yadav |
| Founder | Bhupsingh Yadav |
| Co-Founder | Vinay Yadav |

### Store Locations

| Store | Address | Phone |
|---|---|---|
| **Bhayander West** | Shop No. 11, Kamala Park, Opp. Rajasthan Hall, 60 Feet Road | +91 99208 92344 |
| **Bhayander East** | Shop No. 21, Janki Heights, Near Mithalal Jain Bungalow | +91 89767 97674 |

**Hours:** Monday – Sunday, 10:00 AM – 9:00 PM  
**WhatsApp West:** wa.me/919920892344  
**WhatsApp East:** wa.me/918976797674

---

## 2. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| HTML | Plain HTML5 | No build step, instant deploy, easy to edit |
| CSS | Plain CSS3 + CSS Variables | No framework bloat, full control |
| JavaScript | Vanilla JS (ES6+) | No framework overhead |
| Hosting | Vercel (free Hobby tier) | Auto-deploy from GitHub, global CDN |
| Version Control | Git / GitHub | Branch: `main` |
| Fonts | Google Fonts (Poppins + Inter) | Free, fast CDN |
| Icons | Font Awesome 6.5.1 | Free, comprehensive |
| Animations | GSAP, AOS, Splitting.js, Typed.js | Free open-source libraries |

> **No framework, no build tool, no npm, no Node.js required.** Open any HTML file in a browser to preview locally. Edit → Save → Push → Done.

---

## 3. Project Structure

```
c:\Saawariya Opticals\
│
├── index.html                  ← Homepage (main dashboard)
│
├── pages/                      ← All inner pages
│   ├── frames.html             ← Eyeglass frames + prescription upload
│   ├── sunglasses.html         ← Sunglasses with brand filter
│   ├── contact-lenses.html     ← 5-step contact lens wizard
│   ├── reading-frames.html     ← Reading glasses selector
│   ├── store-locator.html      ← Two store cards with Google Maps
│   ├── appointment.html        ← Book appointment (Flatpickr date picker)
│   ├── frame-finder.html       ← Face shape quiz → frame recommendations
│   ├── lens-guide.html         ← Lens types, coatings, materials reference
│   ├── faq.html                ← 22 FAQs with category filter + search
│   ├── about.html              ← About the company and founders
│   └── contact.html            ← Contact page with store phone cards
│
├── css/
│   ├── style.css               ← Global styles, header, footer, hero, nav
│   └── dashboard.css           ← Dashboard cards, wizards, page heroes, mobile
│
├── js/
│   ├── dashboard-fx.js         ← Site-wide effects + contact info injection
│   ├── main.js                 ← Homepage-specific JS (counters, etc.)
│   ├── cart.js                 ← Cart utility (future use)
│   ├── products-data.js        ← Product data store
│   └── products-page.js        ← Products page rendering
│
├── images/                     ← Product/store images (add here)
├── logo.png                    ← Brand logo (used in header, footer, PWA)
├── logo.jpg                    ← Logo alternate format
├── manifest.json               ← PWA manifest (install prompt config)
├── sw.js                       ← Service Worker (offline caching)
├── robots.txt                  ← Search engine crawl rules
├── sitemap.xml                 ← All page URLs for Google indexing
└── vercel.json                 ← Vercel deployment config + cache headers
```

---

## 4. Design System

### Brand Colors

| Variable | Hex | Usage |
|---|---|---|
| `--primary` | `#2b3190` | Navy Blue — headings, buttons, links, borders |
| `--primary-light` | `#3d45b8` | Lighter navy — gradients, hover states |
| `--primary-dark` | `#1a1d5e` | Darker navy — active states |
| `--accent` | `#e8b84b` | Gold — highlights, Bhayander East color |
| `--bg` | `#f8f9ff` | Page background (light blue-white) |
| `--text-primary` | `#0f1035` | Main text (near-black with blue tint) |
| `--text-secondary` | `#5a6080` | Secondary text, descriptions |
| `--text-muted` | `#9ca3af` | Labels, placeholders, captions |
| `--border` | `#e2e5f5` | Card borders, input borders |
| `#10b981` / `#059669` | — | Green — Bhayander West phone color |
| `#c99a30` / `#e8b84b` | — | Gold — Bhayander East phone color |

### Typography

| Font | Weight | Usage |
|---|---|---|
| **Poppins** | 300–900 | Headings, buttons, labels, brand name |
| **Inter** | 300–600 | Body text, descriptions, form fields |

### Breakpoints (Mobile-First)

| Breakpoint | Rule |
|---|---|
| `1024px` | Hide desktop nav extras |
| `768px` | Hide search bar, show hamburger menu |
| `600px` | Single-column layouts |
| `380px` | Extra small phones |

### Shadows (CSS Variables)

```css
--shadow-sm:  0 1px 3px rgba(43,49,144,0.08)
--shadow-md:  0 4px 16px rgba(43,49,144,0.12)
--shadow-lg:  0 20px 60px rgba(43,49,144,0.15)
--shadow-xl:  0 32px 80px rgba(43,49,144,0.20)
```

---

## 5. Pages Reference

### `index.html` — Homepage
- Animated hero with `tsParticles` background, `Typed.js` rotating subtitle, `Splitting.js` character reveal
- 6-card service dashboard: Frames, Sunglasses, Contact Lenses, Reading Frames, Store Locator, Book Appointment
- Outlets section with phone numbers and WhatsApp buttons for both stores
- Schema.org JSON-LD: `Organization`, `Optician` ×2, `WebSite` with `SearchAction`
- Open Graph + Twitter Card meta tags

### `pages/frames.html` — Eyeglass Frames
- Tab filter: All / Full Rim / Half Rim / Rimless
- Brand chips: Rayban, Titan, Lenskart, John Jacobs, Vincent Chase, Scott, Peter Jones
- Dual CTA: Book Eye Test + Upload Prescription
- Drag-and-drop prescription upload → WhatsApp submission to West store

### `pages/sunglasses.html` — Sunglasses
- Tab bar: All / Men / Women / Kids / New Arrivals / Trending
- URL param support: `?cat=men` pre-selects the Men tab
- Brand chips: Ray-Ban, Oakley, Vogue, Carrera, Fastrack, Polaroid, Gucci, Titan
- JS-rendered product grid; card click → WhatsApp inquiry

### `pages/contact-lenses.html` — Contact Lenses
- 5-step wizard:
  1. Brand (Polylite, Freshlook, Bausch & Lomb, Acme, Copper Vision)
  2. Color (9 swatches with CSS radial-gradient preview)
  3. Power (per eye, −10.00 to +10.00 in 0.25 steps; same-power checkbox)
  4. Duration (1 day / 1 month / 3 month / 6 month / 1 year — with prices)
  5. Confirm → success banner + WhatsApp order with full details

### `pages/reading-frames.html` — Reading Frames
- 3-step: Power selection (+0.50 to +4.00) → Frame style → Confirm
- WhatsApp order with power + frame + color details

### `pages/store-locator.html` — Store Locator
- Two store cards side by side (stack on mobile)
- Each card: Google Maps iframe + address + phone link + WhatsApp button
- **West:** +91 99208 92344 → `wa.me/919920892344`
- **East:** +91 89767 97674 → `wa.me/918976797674`

### `pages/appointment.html` — Book Appointment
- 6 service type cards (Eye Test, Frames, Sunglasses, Contact Lenses, Kids Eye Test, Progressive Lenses)
- Store picker (West / East)
- Flatpickr date picker (disabled past dates + Sundays)
- Time slot grid (10 AM – 8 PM, 30-min intervals)
- Form routes to the **selected store's** WhatsApp number
- WhatsApp routing: `'Bhayander West' → 919920892344` | `'Bhayander East' → 918976797674`

### `pages/frame-finder.html` — Frame Finder Quiz
- 4-step interactive quiz:
  1. **Face Shape** — Oval, Round, Square, Heart, Diamond, Oblong (SVG illustrations)
  2. **Lifestyle** — Work/Professional, Everyday Casual, Active/Sporty, Fashion/Statement
  3. **Material** — Metal, Acetate/Plastic, Flexible TR-90, No Preference
  4. **Budget** — Under ₹1,000 / ₹1,000–3,000 / ₹3,000–7,000 / ₹7,000+
- Results show 4 recommended frame types with individual WhatsApp "Ask Us" buttons
- Restart button resets all state

### `pages/lens-guide.html` — Lens Guide
- 5-tab reference page:
  1. **Lens Types** — Single Vision, Bifocal, Progressive, Computer, Photochromic, Polarised
  2. **Coatings** — AR, UV400, Blue Light, Hard Coat, Hydrophobic, Anti-Fog, Mirror
  3. **Materials** — CR-39, Polycarbonate, Trivex, High-Index 1.60/1.67/1.74, Glass (comparison table)
  4. **Reading Your Prescription** — SPH, CYL, AXIS, ADD explained + power-to-lens guide table
  5. **Care Tips** — 7 illustrated care tips for lens longevity

### `pages/faq.html` — FAQ
- 22 questions across 5 categories: Eye Test, Frames & Lenses, Contact Lenses, Delivery & Warranty, Payment
- Category pill filter + real-time search input
- Smooth max-height accordion animation
- FAQPage JSON-LD schema for Google rich results (answer boxes in search)
- CTA section with both store phones + WhatsApp

### `pages/about.html` — About
- Company story, founders, 15+ years history
- Values section
- "Call Our Stores" section — green card (West), gold card (East)
- CTA links to frames.html, store-locator.html, appointment.html

### `pages/contact.html` — Contact
- Big gradient call cards at top: green (West), gold (East) with large phone numbers
- WhatsApp pill buttons
- Address cards for both stores
- Embedded inquiry form

---

## 6. JavaScript Architecture

### `js/dashboard-fx.js` — The Master Script

Loaded by **every page**. Handles all site-wide behavior centrally:

```
1. Splitting.js         → Character-by-character animated text reveal
2. Typed.js             → Rotating hero subtitle phrases
3. tsParticles          → Animated particle network on homepage hero
4. Lenis                → Smooth scroll with momentum easing
5. GSAP + ScrollTrigger → Dashboard card stagger reveal, parallax blobs, title animations
6. Vanilla-Tilt         → 3D tilt effect on dashboard cards
7. Shimmer spans        → CSS shimmer sweep injected into each .dash-card
8. WhatsApp FAB         → Floating action button (bottom-right, created once)
9a. Announcement bar    → Injects both phone numbers into the ticker
9b. Header Call button  → Injects green "Call Now" button before hamburger
9c. Mobile menu         → Injects "Call Our Stores" section at bottom of nav
9d. Footer replacement  → Replaces minimal footers with 4-column contact footer
```

The contact injection pattern uses guards so nothing runs twice:
```javascript
if (!document.querySelector('.whatsapp-fab')) { /* create it */ }
if (!document.getElementById('mobileContact')) { /* inject it */ }
```

### `STORES` constant (in dashboard-fx.js)

```javascript
const STORES = [
  { name: 'Bhayander West', phone: '9920892344', phonePretty: '99208 92344' },
  { name: 'Bhayander East', phone: '8976797674', phonePretty: '89767 97674' }
];
```

**To change a phone number:** Update it here — it automatically updates the announcement bar, header button, mobile menu, and footer across the entire site.

### `js/main.js` — Homepage JS
Homepage-specific logic: CountUp number animations, product slider initialization, etc.

### `js/cart.js` — Cart
Shopping cart utility (prepared for future product purchasing flow).

### `js/products-data.js` + `js/products-page.js`
Product catalogue data store and rendering engine for the products page.

---

## 7. CSS Architecture

### `css/style.css` — Global Styles
- CSS Variables (design tokens)
- Reset and base styles
- Header (`.header`, `.header-inner`, `.logo`, `.main-nav`, `.header-actions`)
- Announcement bar (`.announcement-bar`, `.ticker`)
- Mobile menu (`.mobile-menu`, `.mobile-menu-panel`) — uses `opacity/visibility/pointer-events` NOT `display:none`
- Hero section (`.hero`, `#tsparticles`, `.hero-circle`)
- Buttons (`.btn-primary`, `.btn-secondary`, `.btn-outline`)
- Footer (`.footer`, `.footer-grid`)
- Utility classes

> **Critical:** The mobile menu uses `opacity: 0; visibility: hidden; pointer-events: none` as its hidden state (NOT `display: none`). Adding class `.open` switches these to visible. This is intentional — `display: none` cannot be CSS-transitioned.

### `css/dashboard.css` — Component Styles
- `.dash-card` — glassmorphism service cards with per-card gradients and shimmer
- `.page-hero` — inner page hero section pattern
- `.wizard` — multi-step form wizard (`.wizard-steps`, `.wizard-panel`, `.option-card`)
- `.store-card` — store locator cards with map embed
- `.dropzone` — drag-and-drop prescription upload area
- `.whatsapp-fab` — floating WhatsApp button
- Mobile-first overrides at end of file (all breakpoints: 1024/768/600/380px)

---

## 8. Third-Party Libraries

All loaded from free public CDNs — no npm, no installation required.

| Library | Version | CDN | Purpose |
|---|---|---|---|
| Font Awesome | 6.5.1 | cdnjs | Icons throughout the site |
| Google Fonts | — | fonts.googleapis.com | Poppins + Inter |
| AOS | 2.3.4 | jsdelivr | Scroll-triggered fade-in animations |
| GSAP | 3.12.5 | cdnjs | Advanced animations + ScrollTrigger |
| Lenis | 1.0.42 | jsdelivr | Smooth momentum scrolling |
| Vanilla-Tilt | 1.8.1 | jsdelivr | 3D card tilt on hover |
| tsParticles | 2.12.0 | jsdelivr | Particle network on homepage hero |
| Typed.js | 2.1.0 | jsdelivr | Typewriter rotating subtitle |
| Splitting.js | latest | unpkg | Character split text animations |
| CountUp.js | 2.8.0 | jsdelivr | Animated number counters |
| Lottie-web | latest | unpkg | Lottie JSON animations |
| Flatpickr | latest | jsdelivr | Date picker on appointment page |
| Animate.css | 4.1.1 | cdnjs | CSS animation utility classes |
| Toastify | 1.12.0 | jsdelivr | Toast notifications |
| Swiper.js | — | (included) | Touch-friendly sliders |

---

## 9. SEO Implementation

### Schema.org JSON-LD (index.html)

Three schema blocks are embedded in `<head>`:

**1. Organization**
```json
{ "@type": "Organization", "name": "Saawariya Opticals", "founders": [...] }
```

**2. Optician × 2 (LocalBusiness)**
```json
{
  "@type": "Optician",
  "name": "Saawariya Opticals — Bhayander West",
  "address": { "streetAddress": "Shop No. 11, Kamala Park, 60 Feet Road" },
  "telephone": "+919920892344",
  "geo": { "latitude": 19.3068, "longitude": 72.8441 },
  "openingHoursSpecification": { "dayOfWeek": "Monday–Sunday", "opens": "10:00", "closes": "21:00" }
}
```

**3. WebSite with SearchAction**
```json
{ "@type": "WebSite", "potentialAction": { "@type": "SearchAction", "target": "...?q={search_term_string}" } }
```

### FAQPage Schema (faq.html)
4 key FAQ items embedded as `FAQPage` JSON-LD — enables Google to show answer boxes directly in search results.

### Sitemap (`sitemap.xml`)
All 12 pages listed with `<priority>` and `<changefreq>`. Priority scale:
- `1.0` — Homepage
- `0.95` — Appointment
- `0.9` — Frames, Sunglasses, Contact Lenses, Store Locator
- `0.8` — Reading Frames, Frame Finder
- `0.7` — FAQ, Lens Guide, Contact
- `0.6` — About

### Robots (`robots.txt`)
```
User-agent: *
Allow: /
Sitemap: https://saawariyaopticals.com/sitemap.xml
```

### Meta Tags (every page)
- `<meta name="description">` — unique per page
- `<meta name="theme-color" content="#2b3190">`
- Open Graph: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`
- Geo tags: `geo.region`, `geo.placename`, `ICBM` coordinates

---

## 10. PWA (Progressive Web App)

The site is PWA-ready — users can install it on their home screen like a native app.

### manifest.json
```json
{
  "name": "Saawariya Opticals",
  "short_name": "SO Opticals",
  "start_url": "/index.html",
  "display": "standalone",
  "theme_color": "#2b3190",
  "background_color": "#ffffff"
}
```

### sw.js (Service Worker)
- Cache name: `saawariya-v1.0`
- Caches: `index.html`, `style.css`, `main.js`, `cart.js`, `products-data.js`, `logo.png`, `manifest.json`
- Strategy: Cache-first for static assets, network-first for pages

> **To update cache after changes:** Bump the `CACHE_NAME` version in `sw.js` (e.g., `saawariya-v1.1`). This forces all users to re-download assets on next visit.

---

## 11. Deployment (Vercel)

### How it works
1. Push any commit to `main` branch on GitHub
2. Vercel automatically triggers a new build (takes ~10 seconds for this static site)
3. Build completes → new deployment is promoted to production automatically
4. Live at `https://saawariya-opticals.vercel.app` within ~30 seconds of push

### vercel.json
```json
{
  "version": 2,
  "builds": [{ "src": "**/*", "use": "@vercel/static" }],
  "headers": [
    { "source": "/(.*)", "headers": [security headers] },
    { "source": "/sw.js", "headers": [{ "Cache-Control": "no-cache" }] },
    { "source": "/css/(.*)", "headers": [{ "Cache-Control": "public, max-age=3600, must-revalidate" }] },
    { "source": "/js/(.*)",  "headers": [{ "Cache-Control": "public, max-age=3600, must-revalidate" }] }
  ]
}
```

**Cache policy:**
- `sw.js` → no-cache (always fresh — essential for service worker)
- CSS/JS → 1-hour cache with `must-revalidate` (browsers revalidate after each deploy)
- HTML → no cache header (Vercel defaults to short TTL for HTML)

### If production URL shows stale content
Press `Ctrl + Shift + R` in the browser (hard refresh). This bypasses the browser's local cache.

---

## 12. WhatsApp Integration

Every order, inquiry, and appointment flows to WhatsApp — no backend server required.

### URL format
```
https://wa.me/{country_code}{phone}?text={URL_encoded_message}
```

### Examples used in the codebase

| Page | WhatsApp Number | Use Case |
|---|---|---|
| All pages (FAB) | 919920892344 (West) | General inquiry |
| frames.html | 919920892344 (West) | Prescription upload |
| sunglasses.html | Dynamic based on product | Product inquiry |
| contact-lenses.html | 919920892344 (West) | Full order details |
| appointment.html | Selected store's number | Appointment booking |
| frame-finder.html | 919920892344 (West) | Frame recommendation follow-up |
| lens-guide.html | 919920892344 (West) | Lens advice |

### Message pre-population
All WhatsApp links pre-fill a message so the customer doesn't have to type. Example from contact-lenses.html:
```javascript
const msg = `Hi Saawariya Opticals! I'd like to order:
Brand: ${brand}
Color: ${color}
Power (Right): ${powerR} | Power (Left): ${powerL}
Duration: ${duration}
Please confirm availability.`;
window.open(`https://wa.me/919920892344?text=${encodeURIComponent(msg)}`);
```

---

## 13. How to Make Common Changes

### Change a phone number
1. Open `js/dashboard-fx.js`
2. Find the `STORES` constant (line ~189)
3. Update `phone` and `phonePretty` for West or East
4. Commit and push — all pages update automatically

### Add a new FAQ
1. Open `pages/faq.html`
2. Add a new `<div class="faq-item" data-cat="category">` block following the existing pattern
3. Optionally add it to the JSON-LD schema block in `<head>`

### Add product photos
1. Save optimised images (WebP preferred, max 200KB) to `images/`
2. Reference them in the relevant page's product card HTML: `<img src="../images/your-image.webp" alt="...">`

### Add a new page
1. Copy any existing inner page (e.g., `pages/faq.html`) as a template
2. Update `<title>`, `<meta name="description">`, and content
3. Add the page to `sitemap.xml`
4. Link to it from `index.html` nav or dashboard and from `dashboard-fx.js` footer quick links
5. Ensure `<script src="../js/dashboard-fx.js"></script>` is included before `</body>`

### Update store hours
1. `index.html` — update the `openingHoursSpecification` in the JSON-LD schema
2. `js/dashboard-fx.js` — update the hours text in the footer injection (section 9d)
3. `pages/store-locator.html` — update the displayed hours in both store cards

### Change the brand color
Update `--primary` in `css/style.css` `:root` block. All colors cascade from this variable.

---

## 14. Git Workflow

### Rules
- **Only `shubechavan`** as commit author — never co-authored by Claude or any AI
- Push to `main` only — no feature branches needed for this project size
- Every push auto-deploys to production

### Commit command
```bash
git add <files>
git -c user.name="shubechavan" -c user.email="shubechavan@users.noreply.github.com" commit -m "Your message here"
git push origin main
```

### Commit history (as of May 2026)
| Commit | Description |
|---|---|
| `6ab7fbb` | Add Frame Finder quiz, Lens Guide, robots.txt; fix cache headers |
| `eaf431e` | Add FAQ accordion page with 22 questions + FAQPage schema |
| `d3e459f` | Add local SEO: schema.org LocalBusiness markup + sitemap.xml |
| `06abc50` | Make phone numbers impossible to miss on Contact page |
| `c16db6b` | Surface phone numbers in every visible spot across the site |
| `cf84b70` | Wire real shop phone numbers across all pages |
| `c509af7` | Make site fully mobile-friendly across all pages |
| `7ec9ebe` | Add 6-option service dashboard with premium libraries and service pages |
| `6598924` | Initial commit: Saawariya Opticals e-commerce website |

---

*Saawariya Opticals · "We help you look better" · Bhayander, Mumbai*
