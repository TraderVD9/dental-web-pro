// ═══ BURGER MENU ═══
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ═══ SMOOTH SCROLL ═══
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const pos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  });
});

// ═══ NAV SCROLL EFFECT ═══
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
  lastScroll = scrollY;
});

// ═══ FORM — sends audit requests to hello@dentalwebai.com ═══
const form = document.getElementById('contactForm');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  const info = Object.fromEntries(new FormData(form));

  // Send via EmailJS-like service or direct mailto
  const subject = encodeURIComponent('New Audit Request — DentalWebAI');
  const body = encodeURIComponent(
    `New audit request from DentalWebAI website:\n\n` +
    `Name: ${info.name}\n` +
    `Email: ${info.email}\n` +
    `Clinic: ${info.clinic || 'Not provided'}\n` +
    `Website: ${info.website || 'Not provided'}\n\n` +
    `Submitted: ${new Date().toISOString()}`
  );

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Send to API → Telegram bot notification + lead saved
  try {
    const res = await fetch('https://api.vellumcadence.com/dental-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: info.name,
        email: info.email,
        clinic: info.clinic || '',
        website: info.website || ''
      })
    });

    if (res.ok) {
      btn.textContent = '✓ Sent!';
      btn.style.background = '#00D4AA';
      form.reset();
      setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; btn.disabled = false; }, 4000);
      return;
    }
  } catch {}

  // Fallback: open mailto
  window.location.href = `mailto:hello@dentalwebai.com?subject=${subject}&body=${body}`;
  btn.textContent = '✓ Opening email...';
  btn.style.background = '#00D4AA';
  form.reset();
  setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; btn.disabled = false; }, 3000);
});

// ═══ GSAP + LENIS SCROLL ANIMATIONS ═══
document.addEventListener('DOMContentLoaded', () => {
  // Init Lenis smooth scroll
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.0,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  // GSAP scroll animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered card reveals
    const cards = '.problem__card, .solution__item, .package-card, .process__step, .portfolio__card, .faq__item, .f-card';
    gsap.utils.toArray(cards).forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 40, duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 85%' },
        delay: (i % 3) * 0.12
      });
    });

    // Section titles
    gsap.utils.toArray('.section__title, .section__sub').forEach(el => {
      gsap.from(el, {
        opacity: 0, y: 30, duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    // Hero entrance
    gsap.from('.hero__badge', { opacity: 0, y: 20, duration: 0.8, delay: 0.3 });
    gsap.from('.hero__title', { opacity: 0, y: 30, duration: 1, delay: 0.5 });
    gsap.from('.hero__sub', { opacity: 0, y: 20, duration: 0.8, delay: 0.7 });
    gsap.from('.hero__stats', { opacity: 0, y: 20, duration: 0.8, delay: 0.9 });
    gsap.from('.hero__ctas', { opacity: 0, y: 20, duration: 0.8, delay: 1.1 });

    // Testimonial
    gsap.from('.testimonial-quote', {
      opacity: 0, y: 40, duration: 1,
      scrollTrigger: { trigger: '.testimonial-section', start: 'top 70%' }
    });

    // Comparison table
    gsap.from('.comparison__table', {
      opacity: 0, y: 30, duration: 0.8,
      scrollTrigger: { trigger: '.comparison__table', start: 'top 80%' }
    });

    // CTA box
    gsap.from('.cta-box', {
      opacity: 0, scale: 0.95, duration: 0.8,
      scrollTrigger: { trigger: '.cta-box', start: 'top 75%' }
    });

  } else {
    // Fallback: IntersectionObserver (no GSAP)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.problem__card, .solution__item, .package-card, .process__step, .portfolio__card, .faq__item').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.5s ease ${i % 4 * 0.1}s, transform 0.5s ease ${i % 4 * 0.1}s`;
      observer.observe(el);
    });
  }
});

// ═══ BEFORE/AFTER SLIDER ═══
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('baSlider');
  if (!slider) return;

  const line = document.getElementById('baLine');
  const handle = document.getElementById('baHandle');
  const after = slider.querySelector('.ba-after');
  let dragging = false;

  function update(x) {
    const r = slider.getBoundingClientRect();
    let pct = Math.max(0, Math.min(1, (x - r.left) / r.width));
    after.style.clipPath = `inset(0 ${(1 - pct) * 100}% 0 0)`;
    line.style.left = pct * 100 + '%';
    handle.style.left = pct * 100 + '%';
  }

  slider.addEventListener('mousedown', () => dragging = true);
  document.addEventListener('mouseup', () => dragging = false);
  document.addEventListener('mousemove', e => { if (dragging) update(e.clientX); });
  slider.addEventListener('touchstart', () => dragging = true);
  document.addEventListener('touchend', () => dragging = false);
  document.addEventListener('touchmove', e => { if (dragging) update(e.touches[0].clientX); });
  slider.addEventListener('click', e => update(e.clientX));
});
