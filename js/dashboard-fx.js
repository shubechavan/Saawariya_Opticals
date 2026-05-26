/* ===========================================================
   Saawariya Opticals — Dashboard Effects
   Initializes: tsParticles, Typed.js, Splitting.js, GSAP +
   ScrollTrigger, Lenis smooth scroll, Vanilla-Tilt, CountUp.
   =========================================================== */

(function () {
  'use strict';

  /* ---------- 1. Splitting.js – animated character reveal ---------- */
  if (window.Splitting) {
    try { Splitting(); } catch (e) {}
  }

  /* ---------- 2. Typed.js — rotating hero subtitle ---------- */
  const typedEl = document.getElementById('heroTyped');
  if (typedEl && window.Typed) {
    new Typed(typedEl, {
      strings: [
        'designer frames ^800',
        'sunglasses for every style ^800',
        'contact lenses in colors ^800',
        'reading glasses, ready-made ^800',
        'free eye testing ^800'
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1400,
      loop: true,
      smartBackspace: true,
      cursorChar: '|'
    });
  }

  /* ---------- 3. tsParticles — subtle hero background ---------- */
  if (document.getElementById('tsparticles') && window.tsParticles) {
    tsParticles.load({
      id: 'tsparticles',
      options: {
        fpsLimit: 60,
        fullScreen: { enable: false },
        background: { color: 'transparent' },
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: ['#2b3190', '#e8b84b', '#5d63e8'] },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0.1, max: 0.4 },
            animation: { enable: true, speed: 0.5, sync: false }
          },
          size: {
            value: { min: 1, max: 3 }
          },
          links: {
            enable: true,
            distance: 140,
            color: '#2b3190',
            opacity: 0.15,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.6,
            random: true,
            outModes: { default: 'out' }
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' }
          },
          modes: {
            grab: { distance: 180, links: { opacity: 0.4 } }
          }
        },
        detectRetina: true
      }
    });
  }

  /* ---------- 4. Lenis — buttery smooth scrolling ---------- */
  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis if both available
    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ---------- 5. GSAP + ScrollTrigger — dashboard reveal ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Dashboard cards: staggered slide-in
    gsap.utils.toArray('.dash-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.9,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Parallax on hero background blobs
    gsap.utils.toArray('.hero-circle').forEach((blob, i) => {
      gsap.to(blob, {
        y: (i + 1) * -80,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Subtle scale-in for section titles
    gsap.utils.toArray('.section-title').forEach((t) => {
      gsap.fromTo(t,
        { letterSpacing: '0.05em', opacity: 0 },
        {
          letterSpacing: '-0.02em',
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: t, start: 'top 88%' }
        }
      );
    });
  }

  /* ---------- 6. Vanilla-Tilt for dashboard cards ---------- */
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.dash-card'), {
      max: 6,
      speed: 600,
      perspective: 1400,
      glare: true,
      'max-glare': 0.18,
      'glare-prerender': false,
      scale: 1.01,
      gyroscope: true
    });
  }

  /* ---------- 7. Inject shimmer span into each card ---------- */
  document.querySelectorAll('.dash-card').forEach((c) => {
    if (!c.querySelector('.shimmer')) {
      const sh = document.createElement('span');
      sh.className = 'shimmer';
      c.appendChild(sh);
    }
  });

  /* ---------- 8. Floating WhatsApp FAB ---------- */
  if (!document.querySelector('.whatsapp-fab')) {
    const fab = document.createElement('a');
    fab.href = 'https://wa.me/919920892344?text=Hi%20Saawariya%20Opticals%2C%20I%27d%20like%20to%20enquire%20about';
    fab.target = '_blank';
    fab.rel = 'noopener';
    fab.className = 'whatsapp-fab';
    fab.title = 'Chat on WhatsApp';
    fab.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(fab);
  }

  /* ---------- 9. Site-wide contact info injection ---------- */
  const STORES = [
    { name: 'Bhayander West', phone: '9920892344', phonePretty: '99208 92344' },
    { name: 'Bhayander East', phone: '8976797674', phonePretty: '89767 97674' }
  ];

  /* 9a. Add phone numbers to announcement bar ticker */
  const ticker = document.querySelector('.announcement-bar .ticker');
  if (ticker && !ticker.querySelector('.ticker-phone')) {
    const phoneSpan = document.createElement('span');
    phoneSpan.className = 'ticker-phone';
    phoneSpan.innerHTML =
      `<i class="fas fa-phone"></i> West: <a href="tel:+91${STORES[0].phone}" style="color:inherit;text-decoration:underline;">${STORES[0].phonePretty}</a>` +
      ` &nbsp;·&nbsp; East: <a href="tel:+91${STORES[1].phone}" style="color:inherit;text-decoration:underline;">${STORES[1].phonePretty}</a>`;
    ticker.insertBefore(phoneSpan, ticker.firstChild);
  }

  /* 9b. Inject "Call Now" button into header (before hamburger) */
  const hamburger = document.getElementById('hamburger');
  if (hamburger && !document.querySelector('.header-call-btn')) {
    const callBtn = document.createElement('a');
    callBtn.href = `tel:+91${STORES[0].phone}`;
    callBtn.className = 'header-action-btn header-call-btn';
    callBtn.title = `Call ${STORES[0].name}`;
    callBtn.innerHTML = '<i class="fas fa-phone"></i><span>Call Now</span>';
    callBtn.style.cssText = 'background:linear-gradient(135deg,#10b981,#059669);color:#fff;border-color:transparent;';
    hamburger.parentNode.insertBefore(callBtn, hamburger);
  }

  /* 9c. Add contact section to bottom of mobile menu */
  const mobileNav = document.querySelector('.mobile-menu-panel nav');
  if (mobileNav && !document.getElementById('mobileContact')) {
    const contact = document.createElement('div');
    contact.id = 'mobileContact';
    contact.style.cssText =
      'margin-top:24px;padding-top:20px;border-top:1px solid var(--border);';
    contact.innerHTML = `
      <p style="font-size:0.72rem;color:var(--text-muted);margin-bottom:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">
        <i class="fas fa-phone" style="color:#10b981;"></i> Call Our Stores
      </p>
      <a href="tel:+91${STORES[0].phone}" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:#f0fdf4;border-radius:10px;margin-bottom:8px;color:var(--text-primary);text-decoration:none;">
        <div>
          <div style="font-size:0.75rem;color:var(--text-muted);font-weight:600;">Bhayander West</div>
          <div style="font-weight:700;color:#059669;font-size:0.95rem;">${STORES[0].phonePretty}</div>
        </div>
        <i class="fas fa-phone" style="color:#10b981;"></i>
      </a>
      <a href="tel:+91${STORES[1].phone}" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:#fffbeb;border-radius:10px;color:var(--text-primary);text-decoration:none;">
        <div>
          <div style="font-size:0.75rem;color:var(--text-muted);font-weight:600;">Bhayander East</div>
          <div style="font-weight:700;color:#c99a30;font-size:0.95rem;">${STORES[1].phonePretty}</div>
        </div>
        <i class="fas fa-phone" style="color:#e8b84b;"></i>
      </a>`;
    mobileNav.parentNode.appendChild(contact);
  }

  /* 9d. Replace minimal page footers with full contact footer */
  const footer = document.querySelector('footer.footer');
  if (footer && !footer.querySelector('.site-contact-footer')) {
    // Detect minimal footer (just a single <p>) vs the full homepage footer
    const isMinimal = footer.querySelectorAll('.footer-grid, .footer-brand').length === 0;
    if (isMinimal) {
      const isPagesDir = location.pathname.includes('/pages/');
      const home = isPagesDir ? '../index.html' : 'index.html';
      const storeLink = isPagesDir ? 'store-locator.html' : 'pages/store-locator.html';
      const apptLink = isPagesDir ? 'appointment.html' : 'pages/appointment.html';
      const block = document.createElement('div');
      block.className = 'site-contact-footer';
      block.innerHTML = `
        <div class="container" style="padding:50px 0 30px;">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:32px;margin-bottom:32px;">
            <div>
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
                <img src="${isPagesDir ? '../' : ''}logo.png" alt="Saawariya Opticals" style="height:40px;">
                <span style="font-family:Poppins;font-weight:700;font-size:1.05rem;color:var(--primary);">Saawariya Opticals</span>
              </div>
              <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;">15+ years of trusted eyewear &amp; eye-care service in Bhayander.</p>
            </div>
            <div>
              <h4 style="font-family:Poppins;color:var(--primary);font-size:1rem;margin-bottom:14px;">📍 Bhayander West</h4>
              <p style="color:var(--text-secondary);font-size:0.88rem;line-height:1.6;margin-bottom:10px;">Shop No. 11, Kamala Park,<br>Opp. Rajasthan Hall, 60 Ft Rd</p>
              <a href="tel:+91${STORES[0].phone}" style="display:inline-flex;align-items:center;gap:8px;color:#10b981;font-weight:700;font-size:0.95rem;"><i class="fas fa-phone"></i> +91 ${STORES[0].phonePretty}</a><br>
              <a href="https://wa.me/91${STORES[0].phone}" target="_blank" style="display:inline-flex;align-items:center;gap:8px;color:#25d366;font-weight:600;font-size:0.88rem;margin-top:6px;"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            </div>
            <div>
              <h4 style="font-family:Poppins;color:var(--primary);font-size:1rem;margin-bottom:14px;">📍 Bhayander East</h4>
              <p style="color:var(--text-secondary);font-size:0.88rem;line-height:1.6;margin-bottom:10px;">Shop No. 21, Janki Heights,<br>Near Mithalal Jain Bungalow</p>
              <a href="tel:+91${STORES[1].phone}" style="display:inline-flex;align-items:center;gap:8px;color:#c99a30;font-weight:700;font-size:0.95rem;"><i class="fas fa-phone"></i> +91 ${STORES[1].phonePretty}</a><br>
              <a href="https://wa.me/91${STORES[1].phone}" target="_blank" style="display:inline-flex;align-items:center;gap:8px;color:#25d366;font-weight:600;font-size:0.88rem;margin-top:6px;"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            </div>
            <div>
              <h4 style="font-family:Poppins;color:var(--primary);font-size:1rem;margin-bottom:14px;">Quick Links</h4>
              <div style="display:flex;flex-direction:column;gap:8px;font-size:0.9rem;">
                <a href="${home}" style="color:var(--text-secondary);">Home</a>
                <a href="${storeLink}" style="color:var(--text-secondary);">Store Locator</a>
                <a href="${apptLink}" style="color:var(--text-secondary);">Book Appointment</a>
                <p style="color:var(--text-muted);font-size:0.82rem;margin-top:4px;"><i class="fas fa-clock"></i> Mon–Sun · 10 AM – 9 PM</p>
              </div>
            </div>
          </div>
          <div style="text-align:center;padding-top:24px;border-top:1px solid var(--border-light);color:var(--text-muted);font-size:0.85rem;">
            © 2026 Saawariya Opticals · "We help you look better"
          </div>
        </div>`;
      footer.innerHTML = '';
      footer.style.background = '#f8f9ff';
      footer.style.borderTop = '1px solid var(--border-light)';
      footer.appendChild(block);
    }
  }
})();
