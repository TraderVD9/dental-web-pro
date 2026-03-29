// ═══ CUSTOM CURSOR ═══
(function() {
  const cursor = document.getElementById('customCursor');
  const dot = document.getElementById('customCursorDot');
  if (!cursor || !dot || window.innerWidth < 769) return;

  let cx = 0, cy = 0, dx = 0, dy = 0;
  document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });

  function animate() {
    dx += (cx - dx) * 0.12;
    dy += (cy - dy) * 0.12;
    cursor.style.left = dx + 'px';
    cursor.style.top = dy + 'px';
    dot.style.left = cx + 'px';
    dot.style.top = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  const hoverEls = 'a, button, .portfolio__card, .package-card, .problem__card, .solution__item, .process__step, .btn, .faq__item summary, .lang-btn';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
})();

// ═══ THREE.JS HERO PARTICLES ═══
(function() {
  if (typeof THREE === 'undefined') return;
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;
  const hero = document.querySelector('.hero');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, hero.offsetWidth / hero.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(hero.offsetWidth, hero.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const count = 1200;
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    vel[i * 3] = (Math.random() - 0.5) * 0.003;
    vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
    vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    sizes[i] = Math.random() * 2.5 + 0.5;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(0x4E8AFF) },
      uColor2: { value: new THREE.Color(0x00D4AA) }
    },
    vertexShader: `
      attribute float size;
      uniform float uTime;
      varying float vAlpha;
      varying float vMix;
      void main() {
        vec3 p = position;
        p.y += sin(uTime * 0.25 + position.x * 0.4) * 0.25;
        p.x += cos(uTime * 0.2 + position.z * 0.3) * 0.2;
        p.z += sin(uTime * 0.15 + position.y * 0.5) * 0.15;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = size * (180.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
        vAlpha = smoothstep(14.0, 4.0, -mv.z) * 0.4;
        vMix = sin(position.x * 0.3 + uTime * 0.1) * 0.5 + 0.5;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying float vAlpha;
      varying float vMix;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        vec3 col = mix(uColor1, uColor2, vMix);
        gl_FragColor = vec4(col, smoothstep(0.5, 0.0, d) * vAlpha);
      }
    `,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);
  camera.position.z = 7;

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function tick() {
    requestAnimationFrame(tick);
    mat.uniforms.uTime.value += 0.008;
    camera.position.x += (mx * 0.4 - camera.position.x) * 0.015;
    camera.position.y += (-my * 0.4 - camera.position.y) * 0.015;
    camera.lookAt(0, 0, 0);

    const p = geo.attributes.position.array;
    for (let i = 0; i < count; i++) {
      p[i*3] += vel[i*3]; p[i*3+1] += vel[i*3+1]; p[i*3+2] += vel[i*3+2];
      if (Math.abs(p[i*3]) > 10) vel[i*3] *= -1;
      if (Math.abs(p[i*3+1]) > 7) vel[i*3+1] *= -1;
      if (Math.abs(p[i*3+2]) > 6) vel[i*3+2] *= -1;
    }
    geo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
  tick();

  window.addEventListener('resize', () => {
    camera.aspect = hero.offsetWidth / hero.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(hero.offsetWidth, hero.offsetHeight);
  });
})();

// ═══ BURGER MENU ═══
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

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
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.3)';
    nav.style.borderBottomColor = 'rgba(78, 138, 255, 0.1)';
  } else {
    nav.style.boxShadow = 'none';
    nav.style.borderBottomColor = 'rgba(78, 138, 255, 0.08)';
  }
});

// ═══ FORM ═══
const form = document.getElementById('contactForm');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  const info = Object.fromEntries(new FormData(form));

  const subject = encodeURIComponent('New Audit Request — DentalWebAI');
  const body = encodeURIComponent(
    `New audit request from DentalWebAI website:\n\n` +
    `Name: ${info.name}\nEmail: ${info.email}\n` +
    `Clinic: ${info.clinic || 'Not provided'}\n` +
    `Website: ${info.website || 'Not provided'}\n\n` +
    `Submitted: ${new Date().toISOString()}`
  );

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('https://api.vellumcadence.com/dental-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: info.name, email: info.email, clinic: info.clinic || '', website: info.website || '' })
    });
    if (res.ok) {
      btn.textContent = '✓ Sent!';
      btn.style.background = 'linear-gradient(135deg, #00D4AA, #00B894)';
      form.reset();
      setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; btn.disabled = false; }, 4000);
      return;
    }
  } catch {}

  window.location.href = `mailto:hello@dentalwebai.com?subject=${subject}&body=${body}`;
  btn.textContent = '✓ Opening email...';
  btn.style.background = 'linear-gradient(135deg, #00D4AA, #00B894)';
  form.reset();
  setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; btn.disabled = false; }, 3000);
});

// ═══ GSAP SCROLL ANIMATIONS ═══
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // No GSAP — make sure everything is visible
    document.querySelectorAll('.problem__card, .solution__item, .package-card, .process__step, .portfolio__card, .faq__item, .section__title, .section__sub, .testimonial-quote, .comparison__table, .cta-box, .retainer__inner, .ba-slider').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Safe from() — always ensures end state is visible
  function safeFrom(sel, vars) {
    gsap.from(sel, { ...vars, clearProps: 'opacity,transform' });
  }

  // Hero entrance
  gsap.from('.hero__badge', { opacity: 0, y: 20, duration: 0.8, delay: 0.3, clearProps: 'all' });
  gsap.from('.hero__title', { opacity: 0, y: 30, duration: 1, delay: 0.5, clearProps: 'all' });
  gsap.from('.hero__sub', { opacity: 0, y: 20, duration: 0.8, delay: 0.7, clearProps: 'all' });
  gsap.from('.hero__stats', { opacity: 0, y: 20, duration: 0.8, delay: 0.9, clearProps: 'all' });
  gsap.from('.hero__ctas', { opacity: 0, y: 20, duration: 0.8, delay: 1.1, clearProps: 'all' });

  // Scroll-triggered reveals
  const reveals = [
    '.problem__card', '.solution__item', '.package-card',
    '.process__step', '.portfolio__card', '.faq__item'
  ];

  reveals.forEach(sel => {
    gsap.utils.toArray(sel).forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 40, duration: 0.7,
        delay: (i % 4) * 0.1,
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
  });

  // Section titles & subs
  gsap.utils.toArray('.section__title, .section__sub').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 30, duration: 0.8,
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  // Other elements
  ['.testimonial-quote', '.comparison__table', '.retainer__inner', '.ba-slider'].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    gsap.from(el, {
      opacity: 0, y: 30, duration: 0.8,
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  // CTA box
  const ctaBox = document.querySelector('.cta-box');
  if (ctaBox) {
    gsap.from(ctaBox, {
      opacity: 0, y: 40, duration: 0.8,
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: ctaBox, start: 'top 80%' }
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
