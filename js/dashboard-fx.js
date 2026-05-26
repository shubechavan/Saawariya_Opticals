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
})();
