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
