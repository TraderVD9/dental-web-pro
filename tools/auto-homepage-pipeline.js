#!/usr/bin/env node
/**
 * DentalWebAI — Auto FREE HOMEPAGE Pipeline
 *
 * Generates personalized homepage demos from lead data and sends emails.
 *
 * Usage:
 *   node auto-homepage-pipeline.js leads.json
 *
 * leads.json format:
 * [
 *   {
 *     "clinic": "Pine Grove Family Dental",
 *     "doctor": "Dr. Greg Harman",
 *     "address": "19700 E Parker Square Dr, Parker, CO 80134",
 *     "phone": "720.605.1696",
 *     "email": "info@pinegrove.com",
 *     "hours": "Mon-Thu 7am-5pm, Fri 7am-4pm",
 *     "stars": 4.9,
 *     "reviews": 1544,
 *     "services": ["General", "Cosmetic", "Implants", "Kids", "Emergency", "Whitening"],
 *     "tagline": "We take the dread out of dentistry",
 *     "color": "#2D7A4F",
 *     "slug": "pine-grove",
 *     "city": "Parker, CO",
 *     "lang": "en"
 *   }
 * ]
 */

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const DEMOS_DIR = path.join(__dirname, '..', 'demos');
const SITE_URL = 'https://dentalwebai.com';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', port: 587, secure: false,
  auth: { user: 'vellumcadence@gmail.com', pass: 'fhco buvj nhci rwqq' }
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

const SERVICE_ICONS = {
  'General': '🦷', 'Cosmetic': '✨', 'Implants': '🔧', 'Kids': '👧',
  'Emergency': '🚨', 'Whitening': '😁', 'Orthodontics': '📐', 'Invisalign': '🔲',
  'Sedation': '💤', 'Crowns': '👑', 'Dentures': '🦷', 'Root Canal': '🔬',
  'Veneers': '💎', 'Preventive': '🛡️', 'Family': '👨‍👩‍👧', 'Holistic': '🌿',
  'Pediatric': '🧸', 'Surgery': '⚕️', 'Braces': '📎', 'Cleaning': '🧹'
};

function generateHomepage(lead) {
  const color = lead.color || '#2563EB';
  const services = (lead.services || ['General','Cosmetic','Implants','Family','Emergency','Whitening']).slice(0, 6);
  const doctorSection = lead.doctor ?
    `<div style="background:#fff;border-radius:14px;padding:28px;text-align:center;border:1px solid ${color}15;max-width:280px;margin:0 auto">
      <div style="width:64px;height:64px;border-radius:50%;background:${color}10;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.4rem">👨‍⚕️</div>
      <h3 style="font-size:.95rem;font-weight:600;color:#0F1A2E">${lead.doctor}</h3>
      <p style="font-size:.72rem;color:#6B7A8D">${lead.tagline || 'Your trusted dentist'}</p>
    </div>` :
    `<div style="background:#fff;border-radius:14px;padding:28px;text-align:center;border:1px solid ${color}15;max-width:280px;margin:0 auto">
      <div style="width:64px;height:64px;border-radius:50%;background:${color}10;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.4rem">🦷</div>
      <h3 style="font-size:.95rem;font-weight:600;color:#0F1A2E">${lead.clinic}</h3>
      <p style="font-size:.72rem;color:#6B7A8D">${lead.tagline || 'Quality dental care'}</p>
    </div>`;

  return `<!DOCTYPE html>
<html lang="${lead.lang || 'en'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${lead.clinic} — ${lead.city}</title>
<meta name="description" content="${lead.clinic} in ${lead.city}. ${lead.tagline || 'Quality dental care for your whole family.'}">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,700;1,500&display=swap" rel="stylesheet">
<style>
:root{--ac:${color};--ac2:${color}DD;--tx:#0F1A2E;--tx2:#4A5568;--mt:#6B7A8D;--bg:#FAFBFE;--brd:${color}12}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Outfit',sans-serif;color:var(--tx);background:var(--bg);-webkit-font-smoothing:antialiased}
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:14px 40px;display:flex;justify-content:space-between;align-items:center;background:rgba(250,251,254,0.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--brd)}
.logo{font-size:1.1rem;font-weight:700;color:var(--ac);text-decoration:none}
.nav-links{display:flex;gap:24px;align-items:center}
.nav-links a{text-decoration:none;color:var(--tx2);font-size:.82rem;font-weight:400;transition:.3s}
.nav-links a:hover{color:var(--ac)}
.nav-cta{background:var(--ac)!important;color:#fff!important;padding:8px 20px!important;border-radius:100px;font-weight:600!important}
.hero{min-height:100vh;display:flex;align-items:center;padding:120px 40px 80px;background:linear-gradient(135deg,${color}08,${color}04)}
.hero-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;width:100%}
.badge{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:${color}08;border:1px solid ${color}18;border-radius:100px;font-size:.7rem;color:var(--ac);font-weight:500;letter-spacing:.06em;text-transform:uppercase;margin-bottom:18px}
.badge .dot{width:6px;height:6px;background:var(--ac);border-radius:50%;animation:p 2s infinite}
@keyframes p{0%,100%{box-shadow:0 0 0 0 ${color}40}50%{box-shadow:0 0 0 8px ${color}00}}
h1{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,4vw,3.2rem);font-weight:700;line-height:1.1;margin-bottom:16px;letter-spacing:-.02em}
h1 em{color:var(--ac);font-style:italic}
.hero-sub{font-size:1rem;color:var(--tx2);line-height:1.7;margin-bottom:24px;font-weight:300;max-width:440px}
.btn-p{background:var(--ac);color:#fff;padding:13px 28px;border-radius:100px;font-size:.88rem;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 16px ${color}30;transition:.3s}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 24px ${color}35}
.stats{display:flex;gap:32px;margin-top:28px;padding-top:20px;border-top:1px solid var(--brd)}
.stat-n{font-size:1.4rem;font-weight:700;color:var(--ac);line-height:1}
.stat-l{font-size:.6rem;color:var(--mt);text-transform:uppercase;letter-spacing:.08em;margin-top:3px}
section{padding:80px 40px;max-width:1100px;margin:0 auto}
.sl{font-size:.68rem;text-transform:uppercase;letter-spacing:.18em;color:var(--ac);font-weight:600;margin-bottom:8px;display:flex;align-items:center;gap:10px}
.sl::before{content:'';width:16px;height:1.5px;background:var(--ac)}
.st{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;margin-bottom:36px}
.srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.srv{background:#fff;border-radius:12px;padding:22px 18px;border:1px solid var(--brd);text-align:center;transition:.3s}
.srv:hover{transform:translateY(-3px);box-shadow:0 4px 20px ${color}08}
.srv-i{font-size:1.6rem;margin-bottom:10px}
.srv h3{font-size:.88rem;font-weight:600;margin-bottom:4px}
.srv p{font-size:.75rem;color:var(--tx2)}
.cta{text-align:center;padding:80px 40px}
.cta h2{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3vw,2.2rem);margin-bottom:12px}
.cta p{color:var(--tx2);margin-bottom:24px;font-weight:300}
.info{display:flex;gap:20px;justify-content:center;margin-top:20px;flex-wrap:wrap;font-size:.78rem;color:var(--tx2)}
footer{padding:28px 40px;border-top:1px solid var(--brd);display:flex;justify-content:space-between;align-items:center;max-width:1100px;margin:0 auto;font-size:.72rem;color:var(--mt);flex-wrap:wrap;gap:8px}
footer a{color:var(--ac);text-decoration:none}
.banner{position:fixed;bottom:0;left:0;right:0;background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;text-align:center;padding:10px 20px;font-size:.75rem;z-index:200}
.banner a{color:#FCD34D;text-decoration:none;font-weight:600}
@media(max-width:900px){.hero-inner{grid-template-columns:1fr}.hero-img{display:none}.srv-grid{grid-template-columns:1fr}nav{padding:12px 18px}.nav-links{display:none}.hero{padding:100px 18px 60px}section,.cta{padding:50px 18px}.stats{flex-wrap:wrap;gap:16px}.info{flex-direction:column;align-items:center}}
</style>
</head>
<body>
<nav>
  <a href="#" class="logo">🦷 ${lead.clinic}</a>
  <div class="nav-links">
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
    <a href="tel:${(lead.phone||'').replace(/[^0-9+]/g,'')}">${lead.phone || ''}</a>
    <a href="#contact" class="nav-cta">Book Appointment</a>
  </div>
</nav>
<section class="hero">
  <div class="hero-inner">
    <div>
      <div class="badge"><span class="dot"></span> Accepting New Patients</div>
      <h1>${lead.tagline ? lead.tagline.replace(/^(.+)$/,'<em>$1</em>') : `Welcome to <em>${lead.clinic}</em>`}</h1>
      <p class="hero-sub">${lead.doctor ? lead.doctor + ' and the team at ' : ''}${lead.clinic} in ${lead.city} — quality dental care${lead.reviews ? ' trusted by ' + lead.reviews.toLocaleString() + '+ patients' : ' for your whole family'}.</p>
      <a href="tel:${(lead.phone||'').replace(/[^0-9+]/g,'')}" class="btn-p">📅 Book Appointment</a>
      <div class="stats">
        ${lead.stars ? `<div><div class="stat-n">${lead.stars}</div><div class="stat-l">Google Rating</div></div>` : ''}
        ${lead.reviews ? `<div><div class="stat-n">${lead.reviews.toLocaleString()}+</div><div class="stat-l">Reviews</div></div>` : ''}
        ${lead.years ? `<div><div class="stat-n">${lead.years}+</div><div class="stat-l">Years</div></div>` : ''}
      </div>
    </div>
    <div class="hero-img">${doctorSection}</div>
  </div>
</section>
<section id="services">
  <div class="sl">Services</div>
  <div class="st">What we offer</div>
  <div class="srv-grid">
    ${services.map(s => `<div class="srv"><div class="srv-i">${SERVICE_ICONS[s] || '🦷'}</div><h3>${s}</h3><p>Professional ${s.toLowerCase()} dentistry</p></div>`).join('\n    ')}
  </div>
</section>
<section class="cta" id="contact">
  <div class="sl" style="justify-content:center">Get Started</div>
  <h2>Ready for your best smile?</h2>
  <p>New patients welcome. Call us or stop by.</p>
  <a href="tel:${(lead.phone||'').replace(/[^0-9+]/g,'')}" class="btn-p" style="font-size:.95rem;padding:14px 32px">📞 Call ${lead.phone || 'Us'}</a>
  <div class="info">
    ${lead.address ? `<span>📍 ${lead.address}</span>` : ''}
    ${lead.hours ? `<span>🕐 ${lead.hours}</span>` : ''}
  </div>
</section>
<footer>
  <p>© 2026 ${lead.clinic}. ${lead.city}.</p>
  <a href="tel:${(lead.phone||'').replace(/[^0-9+]/g,'')}">${lead.phone || ''}</a>
</footer>
<div class="banner">🎁 Free redesign concept by <a href="https://dentalwebai.com">DentalWebAI</a> — yours to keep, no strings attached.</div>
</body>
</html>`;
}

function buildEmail(lead, demoUrl) {
  const name = lead.doctor || 'there';
  return {
    subject: `I redesigned ${lead.clinic}'s homepage — free, no strings`,
    html: `<p>Hi ${name},</p>
<p>I'm a dental website specialist. I redesigned <strong>${lead.clinic}</strong>'s homepage — free, no strings.</p>
<p><strong>Here it is:</strong> <a href="${demoUrl}" style="color:#2563EB;font-weight:600">${demoUrl}</a></p>
<p>What I included:</p>
<ul>
<li>Modern, mobile-first design that loads instantly</li>
<li>Online booking button on every screen</li>
${lead.stars ? `<li>Your ${lead.stars}★ rating and ${lead.reviews}+ reviews prominently displayed</li>` : '<li>Patient trust signals and social proof</li>'}
<li>Click-to-call for mobile patients</li>
<li>SEO structure for "${lead.city} dentist" searches</li>
</ul>
<p><strong>This page is yours to keep.</strong> No charge.</p>
<p>If you want the full site (10-25 pages + booking + blog + SEO), I'd love 15 minutes of your time.</p>
<p>Best,<br>Dmytro V.<br>DentalWebAI<br><a href="https://dentalwebai.com">dentalwebai.com</a><br>+31 20 808 0888</p>`
  };
}

async function main() {
  const inputFile = process.argv[2];
  if (!inputFile) {
    console.log('Usage: node auto-homepage-pipeline.js leads.json');
    console.log('See file header for JSON format.');
    process.exit(1);
  }

  const leads = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  console.log(`\n🚀 Processing ${leads.length} leads...\n`);

  let sent = 0, generated = 0;

  for (const lead of leads) {
    const slug = lead.slug || lead.clinic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    const filename = `${slug}.html`;
    const filepath = path.join(DEMOS_DIR, filename);
    const demoUrl = `${SITE_URL}/demos/${filename}`;

    // 1. Generate homepage
    const html = generateHomepage(lead);
    fs.writeFileSync(filepath, html);
    generated++;
    console.log(`📄 Generated: demos/${filename}`);

    // 2. Send email (if email provided)
    if (lead.email) {
      const email = buildEmail(lead, demoUrl);
      try {
        await transporter.sendMail({
          from: 'Dmytro V. | DentalWebAI <hello@dentalwebai.com>',
          to: lead.email, replyTo: 'hello@dentalwebai.com',
          subject: email.subject, html: email.html
        });
        sent++;
        console.log(`✅ Sent: ${lead.clinic} → ${lead.email}`);
      } catch (err) {
        console.log(`❌ Failed: ${lead.clinic} → ${err.message}`);
      }
      await sleep(3000);
    } else {
      console.log(`⏭️  No email: ${lead.clinic} (demo generated, send manually)`);
    }
    console.log('');
  }

  console.log(`\n══════════════════════════════════════`);
  console.log(`📄 Homepages generated: ${generated}`);
  console.log(`✅ Emails sent: ${sent}`);
  console.log(`⏭️  No email: ${generated - sent}`);
  console.log(`══════════════════════════════════════\n`);
  console.log('Next: git add demos/ && git push to deploy');
}

main().catch(console.error);
