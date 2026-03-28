#!/usr/bin/env node
/**
 * Batch audit multiple dental clinic websites
 * Usage: node batch-audit.js
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

const CLINICS = [
  // US — Denver
  { name: "OG Dental Denver", city: "Denver, CO", url: "https://www.ogdentaldenver.com/" },
  { name: "Makowski Dental", city: "Denver, CO", url: "https://www.makowskidental.com/" },
  { name: "The Dentistry Place", city: "Denver, CO", url: "https://www.thedentistryplacedenver.com/" },
  { name: "Pearl Dentistry", city: "Denver, CO", url: "https://www.pearldentistrydenver.com/" },
  // US — Austin
  { name: "The Dental Centre", city: "Austin, TX", url: "https://www.dentalcentreaustin.com/" },
  { name: "ATX Family Dental", city: "Austin, TX", url: "https://www.atxfamilydental.com/" },
  { name: "Austin Dental Health", city: "Austin, TX", url: "https://austindentalhealth.com/" },
  { name: "Austin Dental Center", city: "Austin, TX", url: "https://www.smileaustin.com/" },
  // US — Nashville
  { name: "Nashville Family Dentistry", city: "Nashville, TN", url: "https://familydentistrynashville.com/" },
  { name: "Nashville Family Dentist", city: "Nashville, TN", url: "https://www.nashvillefamilydentist.com/" },
  { name: "Nunn Family Dentistry", city: "Nashville, TN", url: "https://www.nunnfamilydental.com/" },
  { name: "East Nashville Family Dentistry", city: "Nashville, TN", url: "https://enfdentistry.com/" },
  // US — Charlotte
  { name: "Charlotte Dental Associates", city: "Charlotte, NC", url: "https://charlottedentalassociatesnc.com/" },
  { name: "Park Crossing Dentistry", city: "Charlotte, NC", url: "https://www.parkcrossingdentistry.com/" },
  { name: "East Charlotte Dental", city: "Charlotte, NC", url: "https://www.eastcharlottedental.com/" },
  { name: "Dental Wellness of Charlotte", city: "Charlotte, NC", url: "https://www.dentalwellnessofcharlotte.com/" },
  // US — Portland
  { name: "Dental Care of Portland", city: "Portland, OR", url: "https://www.dentalcareofportland.com/" },
  { name: "Macadam Dental", city: "Portland, OR", url: "https://www.macadamdental.com/" },
  { name: "Portsmouth Dental Care", city: "Portland, OR", url: "https://www.portsmouthdentalcare.net/" },
  { name: "Southwest Portland Dental", city: "Portland, OR", url: "https://www.southwestportlanddental.com/" },
  // EU — Amsterdam
  { name: "Tandartspraktijk De ZuidAs", city: "Amsterdam, NL", url: "https://www.tandartspraktijk-dezuidas.nl/" },
  { name: "Tandarts Jordaan", city: "Amsterdam, NL", url: "https://tandartsjordaan.nl/" },
  { name: "Tandartspraktijk Minerva", city: "Amsterdam, NL", url: "https://www.tandartsminerva.nl/" },
  { name: "De Amsterdamse Tandarts", city: "Amsterdam, NL", url: "https://deamsterdamsetandarts.nl/" },
  // EU — Rotterdam
  { name: "Tandartspraktijk Dentia", city: "Rotterdam, NL", url: "https://www.tandartspraktijkdentia.nl/" },
  { name: "Tandarts Zalmhaven", city: "Rotterdam, NL", url: "https://tandartszalmhaven.nl/" },
  { name: "Tandzorg Kralingen", city: "Rotterdam, NL", url: "https://www.tandzorgkralingen.nl/" },
  // EU — Berlin
  { name: "Torhaus Zahnärzte", city: "Berlin, DE", url: "https://www.zahnarzt-torhaus.de/" },
  { name: "zahn&art Berlin", city: "Berlin, DE", url: "https://www.zahnarzt-berlin-mitte-zahnundart.de/" },
  // EU — Munich
  { name: "Creative Zahnärzte", city: "Munich, DE", url: "https://www.creative-zahnaerzte.de/" },
  { name: "Zahnarzt Fünfhöfe", city: "Munich, DE", url: "https://www.zahnarzt-fuenfhoefe.de/" },
  // EU — Vienna
  { name: "Dr. Viden", city: "Vienna, AT", url: "https://www.dr-viden.com/" },
  { name: "Dr. Fuchs Zahnarzt", city: "Vienna, AT", url: "https://zahnarztfuchs.at/" },
];

function fetch(url, redirects = 0) {
  if (redirects > 5) return Promise.reject(new Error('Too many redirects'));
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DentalWebAI Audit)' },
      timeout: 10000
    }, res => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        const loc = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href;
        return resolve(fetch(loc, redirects + 1));
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function auditHtml(html, url, loadTime) {
  const h = html.toLowerCase();
  let score = 100;
  const issues = [];

  if (!url.startsWith('https')) { issues.push('No SSL'); score -= 15; }
  if (loadTime > 5000) { issues.push(`Slow: ${(loadTime/1000).toFixed(1)}s`); score -= 15; }
  else if (loadTime > 3000) { issues.push(`Slow-ish: ${(loadTime/1000).toFixed(1)}s`); score -= 8; }
  if (!h.includes('viewport')) { issues.push('No mobile viewport'); score -= 15; }

  const bookKw = ['book','appointment','schedule','termin','запис','afspraak','calendly','cal.com','zocdoc'];
  if (!bookKw.some(k => h.includes(k))) { issues.push('No online booking'); score -= 12; }

  if (!h.includes('name="description"') && !h.includes("name='description'")) { issues.push('No meta description'); score -= 8; }
  if (!h.includes('schema.org') && !h.includes('application/ld+json')) { issues.push('No schema markup'); score -= 5; }
  if (!h.includes('maps.google') && !h.includes('google.com/maps') && !h.includes('maps.googleapis')) { issues.push('No Google Maps'); score -= 3; }
  if (!h.includes('tel:')) { issues.push('No click-to-call'); score -= 5; }

  const revKw = ['review','testimonial','bewertung','отзыв','beoordeling','stars'];
  if (!revKw.some(k => h.includes(k))) { issues.push('No reviews'); score -= 5; }

  const platform = h.includes('wp-content') ? 'WordPress' : h.includes('wix.com') ? 'Wix' : h.includes('squarespace') ? 'Squarespace' : 'Other';

  return { score: Math.max(0, score), issues, platform, loadTime };
}

async function run() {
  console.log('DentalWebAI — Batch Audit');
  console.log('═'.repeat(90));
  console.log(`${'#'.padEnd(3)} ${'Clinic'.padEnd(30)} ${'City'.padEnd(16)} ${'Score'.padEnd(7)} ${'Time'.padEnd(8)} ${'Platform'.padEnd(12)} Issues`);
  console.log('─'.repeat(90));

  const results = [];

  for (let i = 0; i < CLINICS.length; i++) {
    const c = CLINICS[i];
    try {
      const start = Date.now();
      const res = await fetch(c.url);
      const loadTime = Date.now() - start;
      const audit = auditHtml(res.body, c.url, loadTime);

      const row = {
        ...c,
        score: audit.score,
        loadTime: audit.loadTime,
        platform: audit.platform,
        issues: audit.issues
      };
      results.push(row);

      const scoreStr = audit.score <= 70 ? `🔴 ${audit.score}` : audit.score <= 85 ? `🟡 ${audit.score}` : `🟢 ${audit.score}`;
      console.log(`${String(i+1).padEnd(3)} ${c.name.slice(0,29).padEnd(30)} ${c.city.padEnd(16)} ${scoreStr.padEnd(7)} ${(loadTime+'ms').padEnd(8)} ${audit.platform.padEnd(12)} ${audit.issues.join(', ')}`);
    } catch (err) {
      results.push({ ...c, score: 0, loadTime: 0, platform: '?', issues: ['UNREACHABLE: ' + err.message] });
      console.log(`${String(i+1).padEnd(3)} ${c.name.slice(0,29).padEnd(30)} ${c.city.padEnd(16)} 🔴 0    —        —            UNREACHABLE`);
    }
  }

  console.log('═'.repeat(90));

  // Sort by score (worst first = best leads)
  const leads = results.filter(r => r.score > 0 && r.score <= 80).sort((a, b) => a.score - b.score);
  console.log(`\n🎯 HOT LEADS (score ≤ 80): ${leads.length}`);
  leads.forEach((l, i) => {
    console.log(`  ${i+1}. ${l.name} (${l.city}) — Score: ${l.score} — ${l.issues.join(', ')}`);
    console.log(`     ${l.url}`);
  });

  const warm = results.filter(r => r.score > 80 && r.score <= 90).sort((a, b) => a.score - b.score);
  console.log(`\n📋 WARM LEADS (score 81-90): ${warm.length}`);
  warm.forEach((l, i) => {
    console.log(`  ${i+1}. ${l.name} (${l.city}) — Score: ${l.score} — ${l.issues.join(', ')}`);
  });

  // Save CSV
  const fs = require('fs');
  const csv = ['Name,City,URL,Score,Load Time,Platform,Issues',
    ...results.map(r => `"${r.name}","${r.city}","${r.url}",${r.score},${r.loadTime},"${r.platform}","${r.issues.join('; ')}"`)
  ].join('\n');
  fs.writeFileSync('leads-audit-results.csv', csv);
  console.log('\n📄 CSV saved: leads-audit-results.csv');
}

run();
