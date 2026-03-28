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

// ═══ FORM (placeholder — no backend yet) ═══
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const info = Object.fromEntries(data);

  // TODO: connect to backend API
  console.log('Form submitted:', info);

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = '✓ Sent!';
  btn.style.background = '#00D4AA';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3000);
});

// ═══ SCROLL ANIMATIONS ═══
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.problem__card, .solution__item, .package-card, .process__step, .portfolio__card, .faq__item'
  );
  animatedElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i % 4 * 0.1}s, transform 0.5s ease ${i % 4 * 0.1}s`;
    observer.observe(el);
  });
});
