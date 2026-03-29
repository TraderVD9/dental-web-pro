// ═══ CUSTOM CURSOR ═══
(function() {
  const cursor = document.getElementById('customCursor');
  const dot = document.getElementById('customCursorDot');
  if (!cursor || !dot || window.innerWidth < 769) return;

  let cx = 0, cy = 0, dx = 0, dy = 0;
  document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });

  function animate() {
    dx += (cx - dx) * 0.1;
    dy += (cy - dy) * 0.1;
    cursor.style.left = dx + 'px';
    cursor.style.top = dy + 'px';
    dot.style.left = cx + 'px';
    dot.style.top = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .portfolio__card, .package-card, .problem__card, .solution__item, .process__step, .btn, summary, .lang-btn')) {
      cursor.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .portfolio__card, .package-card, .problem__card, .solution__item, .process__step, .btn, summary, .lang-btn')) {
      cursor.classList.remove('hover');
    }
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

  const count = 1000;
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i*3] = (Math.random() - 0.5) * 18;
    pos[i*3+1] = (Math.random() - 0.5) * 14;
    pos[i*3+2] = (Math.random() - 0.5) * 10;
    vel[i*3] = (Math.random() - 0.5) * 0.002;
    vel[i*3+1] = (Math.random() - 0.5) * 0.002;
    vel[i*3+2] = (Math.random() - 0.5) * 0.002;
    sizes[i] = Math.random() * 2 + 0.5;
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
        p.y += sin(uTime * 0.3 + position.x * 0.5) * 0.25;
        p.x += cos(uTime * 0.2 + position.z * 0.4) * 0.2;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = size * (160.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
        vAlpha = smoothstep(14.0, 4.0, -mv.z) * 0.45;
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

  scene.add(new THREE.Points(geo, mat));
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
      if (Math.abs(p[i*3]) > 9) vel[i*3] *= -1;
      if (Math.abs(p[i*3+1]) > 7) vel[i*3+1] *= -1;
      if (Math.abs(p[i*3+2]) > 5) vel[i*3+2] *= -1;
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
burger.addEventListener('click', () => { burger.classList.toggle('open'); navLinks.classList.toggle('open'); });
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => { burger.classList.remove('open'); navLinks.classList.remove('open'); }));

// ═══ SMOOTH SCROLL ═══
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// ═══ NAV SCROLL ═══
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ═══ FORM ═══
const form = document.getElementById('contactForm');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  const info = Object.fromEntries(new FormData(form));
  btn.textContent = 'Sending...'; btn.disabled = true;
  try {
    const res = await fetch('https://api.vellumcadence.com/dental-audit', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: info.name, email: info.email, clinic: info.clinic || '', website: info.website || '' })
    });
    if (res.ok) { btn.textContent = '✓ Sent!'; btn.style.background = '#00D4AA'; form.reset(); setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; }, 4000); return; }
  } catch {}
  const s = encodeURIComponent('New Audit Request — DentalWebAI');
  const b = encodeURIComponent(`Name: ${info.name}\nEmail: ${info.email}\nClinic: ${info.clinic}\nWebsite: ${info.website}`);
  window.location.href = `mailto:hello@dentalwebai.com?subject=${s}&body=${b}`;
  btn.textContent = '✓ Opening email...'; form.reset();
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; }, 3000);
});

// ═══ LOADER + GSAP ANIMATIONS ═══
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    if (loader) loader.style.display = 'none';
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // === CINEMATIC ENTRANCE ===
  const tl = gsap.timeline();

  // Loader fade out
  tl.to(loader, {
    opacity: 0, duration: 0.8, delay: 1.4,
    ease: 'power2.inOut',
    onComplete: () => loader.style.display = 'none'
  })

  // Hero elements slide up one by one — like opening credits
  .from('.hero__badge', {
    opacity: 0, y: 30, duration: 1,
    ease: 'power4.out', clearProps: 'all'
  }, '-=0.3')
  .from('.hero__title', {
    opacity: 0, y: 60, duration: 1.2,
    ease: 'power4.out', clearProps: 'all'
  }, '-=0.6')
  .from('.hero__sub', {
    opacity: 0, y: 30, duration: 1,
    ease: 'power3.out', clearProps: 'all'
  }, '-=0.6')
  .from('.stat', {
    opacity: 0, y: 25, duration: 0.8,
    stagger: 0.15, ease: 'power3.out', clearProps: 'all'
  }, '-=0.5')
  .from('.hero__ctas .btn', {
    opacity: 0, y: 20, duration: 0.8,
    stagger: 0.12, ease: 'power3.out', clearProps: 'all'
  }, '-=0.4')
  .from('.scroll-indicator', {
    opacity: 0, duration: 0.8, clearProps: 'all'
  }, '-=0.2');

  // === CINEMATIC SCROLL REVEALS ===

  // Section titles — slide up with fade
  gsap.utils.toArray('.section__title').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 50, duration: 1, ease: 'power3.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  gsap.utils.toArray('.section__sub').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
      delay: 0.15, clearProps: 'opacity,transform',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  // Cards — staggered cascade (like dominoes)
  const cardGroups = [
    { sel: '.problem__card', parent: '.problem' },
    { sel: '.solution__item', parent: '.solution' },
    { sel: '.package-card', parent: '.packages' },
    { sel: '.process__step', parent: '.process' },
    { sel: '.portfolio__card', parent: '.portfolio' },
  ];

  cardGroups.forEach(({ sel, parent }) => {
    const cards = document.querySelectorAll(sel);
    if (!cards.length) return;
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0, y: 60, scale: 0.97,
        duration: 0.9,
        delay: i * 0.12,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: parent, start: 'top 75%' }
      });
    });
  });

  // FAQ — accordion slide in
  document.querySelectorAll('.faq__item').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, x: -40, duration: 0.7,
      delay: i * 0.08, ease: 'power3.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: el, start: 'top 90%' }
    });
  });

  // Big elements — dramatic scale entrance
  ['.comparison__table', '.ba-slider'].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    gsap.from(el, {
      opacity: 0, scale: 0.92, y: 40,
      duration: 1.2, ease: 'power3.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });
  });

  // Testimonial — fade in slow (emotional)
  const tq = document.querySelector('.testimonial-quote');
  if (tq) {
    gsap.from(tq, {
      opacity: 0, y: 50, duration: 1.4,
      ease: 'power2.out', clearProps: 'opacity,transform',
      scrollTrigger: { trigger: tq, start: 'top 75%' }
    });
  }
  const ts = document.querySelector('.testimonial-stars');
  if (ts) {
    gsap.from(ts, {
      opacity: 0, scale: 0.5, duration: 0.8,
      ease: 'back.out(2)', clearProps: 'opacity,transform',
      scrollTrigger: { trigger: ts, start: 'top 80%' }
    });
  }

  // Retainer
  const ret = document.querySelector('.retainer__inner');
  if (ret) {
    gsap.from(ret, {
      opacity: 0, y: 40, duration: 0.9,
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: ret, start: 'top 85%' }
    });
  }

  // CTA box — scale up like it's coming toward you
  const cta = document.querySelector('.cta-box');
  if (cta) {
    gsap.from(cta, {
      opacity: 0, scale: 0.9, y: 60,
      duration: 1.2, ease: 'power3.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: cta, start: 'top 80%' }
    });
  }

  // Hide scroll indicator on scroll
  ScrollTrigger.create({
    start: 'top -100',
    onUpdate: (self) => {
      const si = document.querySelector('.scroll-indicator');
      if (si) si.style.opacity = self.progress > 0.01 ? '0' : '1';
    }
  });
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
    line.style.left = pct * 100 + '%'; handle.style.left = pct * 100 + '%';
  }
  slider.addEventListener('mousedown', () => dragging = true);
  document.addEventListener('mouseup', () => dragging = false);
  document.addEventListener('mousemove', e => { if (dragging) update(e.clientX); });
  slider.addEventListener('touchstart', () => dragging = true);
  document.addEventListener('touchend', () => dragging = false);
  document.addEventListener('touchmove', e => { if (dragging) update(e.touches[0].clientX); });
  slider.addEventListener('click', e => update(e.clientX));
});
