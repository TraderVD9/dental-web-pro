#!/usr/bin/env node
/**
 * DentalWebPro — Website Audit Tool
 *
 * Analyzes a dental clinic website and generates an audit report.
 * Use this to prepare personalized outreach emails.
 *
 * Usage:
 *   node prospect-audit.js https://example-dental.com
 *
 * Output: JSON audit report with issues found
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

const TARGET_URL = process.argv[2];
const SELF_MODE = process.argv.includes('--self'); // Skip Google Maps check for our own site

if (!TARGET_URL) {
  console.log('Usage: node prospect-audit.js <website-url>');
  console.log('Example: node prospect-audit.js https://smiledentalclinic.com');
  process.exit(1);
}

function fetch(url, redirects = 0) {
  if (redirects > 5) return Promise.reject(new Error('Too many redirects'));
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DentalWebPro Audit Bot)' },
      timeout: 15000
    }, res => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        const loc = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        return resolve(fetch(loc, redirects + 1));
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data, url: res.url || url }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function audit(url) {
  const report = {
    url,
    timestamp: new Date().toISOString(),
    issues: [],
    score: 100,
    details: {}
  };

  console.log(`\n🔍 Auditing: ${url}\n`);

  // Normalize URL
  if (!url.startsWith('http')) url = 'https://' + url;

  const start = Date.now();
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    report.issues.push({ severity: 'critical', issue: 'Website unreachable', detail: err.message });
    report.score = 0;
    return report;
  }
  const loadTime = Date.now() - start;
  report.details.loadTime = loadTime;
  report.details.statusCode = res.status;

  const html = res.body.toLowerCase();

  // 1. HTTPS check
  if (!url.startsWith('https://')) {
    report.issues.push({ severity: 'high', issue: 'No SSL/HTTPS', detail: 'Site is not served over HTTPS. This hurts trust and Google ranking.' });
    report.score -= 15;
  }
  console.log(`✓ SSL: ${url.startsWith('https://') ? 'Yes' : '❌ No'}`);

  // 2. Load time
  if (loadTime > 5000) {
    report.issues.push({ severity: 'high', issue: 'Very slow loading', detail: `Initial response took ${(loadTime/1000).toFixed(1)}s. 67% of patients leave after 3s.` });
    report.score -= 15;
  } else if (loadTime > 3000) {
    report.issues.push({ severity: 'medium', issue: 'Slow loading', detail: `Initial response took ${(loadTime/1000).toFixed(1)}s. Aim for under 2s.` });
    report.score -= 8;
  }
  console.log(`✓ Load time: ${loadTime}ms`);

  // 3. Mobile viewport
  const hasViewport = html.includes('viewport');
  if (!hasViewport) {
    report.issues.push({ severity: 'high', issue: 'Not mobile-friendly', detail: 'No viewport meta tag found. 60% of patients search on mobile.' });
    report.score -= 15;
  }
  report.details.mobileViewport = hasViewport;
  console.log(`✓ Mobile viewport: ${hasViewport ? 'Yes' : '❌ No'}`);

  // 4. Online booking
  const bookingKeywords = ['book', 'appointment', 'schedule', 'termin', 'запис', 'afspraak', 'calendly', 'cal.com', 'acuity', 'zocdoc'];
  const hasBooking = bookingKeywords.some(kw => html.includes(kw));
  if (!hasBooking) {
    report.issues.push({ severity: 'high', issue: 'No online booking', detail: '70% of patients prefer booking online. No booking system detected.' });
    report.score -= 12;
  }
  report.details.onlineBooking = hasBooking;
  console.log(`✓ Online booking: ${hasBooking ? 'Yes' : '❌ No'}`);

  // 5. Meta description
  const hasMetaDesc = html.includes('name="description"') || html.includes("name='description'");
  if (!hasMetaDesc) {
    report.issues.push({ severity: 'medium', issue: 'No meta description', detail: 'Missing meta description tag. This is what Google shows in search results.' });
    report.score -= 8;
  }
  console.log(`✓ Meta description: ${hasMetaDesc ? 'Yes' : '❌ No'}`);

  // 6. Schema markup
  const hasSchema = html.includes('schema.org') || html.includes('application/ld+json');
  if (!hasSchema) {
    report.issues.push({ severity: 'medium', issue: 'No structured data', detail: 'No schema.org markup found. This helps Google understand your practice and show rich results.' });
    report.score -= 5;
  }
  console.log(`✓ Schema markup: ${hasSchema ? 'Yes' : '❌ No'}`);

  // 7. Google Maps (skip for own site with --self)
  const hasMaps = html.includes('maps.google') || html.includes('google.com/maps') || html.includes('maps.googleapis');
  if (!hasMaps && !SELF_MODE) {
    report.issues.push({ severity: 'low', issue: 'No Google Maps', detail: 'No embedded Google Maps found. Helps patients find your practice easily.' });
    report.score -= 3;
  }
  console.log(`✓ Google Maps: ${hasMaps ? 'Yes' : SELF_MODE ? 'N/A (online business)' : '❌ No'}`);

  // 8. Phone number (click-to-call)
  const hasPhone = html.includes('tel:') || html.includes('href="tel');
  if (!hasPhone) {
    report.issues.push({ severity: 'medium', issue: 'No click-to-call', detail: 'No click-to-call phone link found. Mobile users should be able to call with one tap.' });
    report.score -= 5;
  }
  console.log(`✓ Click-to-call: ${hasPhone ? 'Yes' : '❌ No'}`);

  // 9. Reviews / testimonials
  const reviewKeywords = ['review', 'testimonial', 'bewertung', 'отзыв', 'beoordeling', 'patient says', 'stars'];
  const hasReviews = reviewKeywords.some(kw => html.includes(kw));
  if (!hasReviews) {
    report.issues.push({ severity: 'medium', issue: 'No patient reviews', detail: 'No reviews or testimonials section found. Social proof is critical for dental practices.' });
    report.score -= 5;
  }
  console.log(`✓ Reviews/Testimonials: ${hasReviews ? 'Yes' : '❌ No'}`);

  // 10. Contact form
  const hasForm = html.includes('<form') || html.includes('contact') || html.includes('kontakt');
  if (!hasForm) {
    report.issues.push({ severity: 'medium', issue: 'No contact form', detail: 'No contact form detected. Some patients prefer to send a message rather than call.' });
    report.score -= 5;
  }
  console.log(`✓ Contact form: ${hasForm ? 'Yes' : '❌ No'}`);

  // 11. Modern tech check
  const isWordPress = html.includes('wp-content') || html.includes('wordpress');
  const isWix = html.includes('wix.com') || html.includes('wixsite');
  const isSquarespace = html.includes('squarespace');
  report.details.platform = isWordPress ? 'WordPress' : isWix ? 'Wix' : isSquarespace ? 'Squarespace' : 'Unknown/Custom';
  console.log(`✓ Platform: ${report.details.platform}`);

  // 12. Copyright year check (outdated site indicator)
  const yearMatch = html.match(/©\s*(\d{4})|copyright\s*(\d{4})/);
  if (yearMatch) {
    const year = parseInt(yearMatch[1] || yearMatch[2]);
    report.details.copyrightYear = year;
    if (year < 2024) {
      report.issues.push({ severity: 'low', issue: 'Outdated copyright', detail: `Copyright year is ${year}. Signals an unmaintained website to visitors.` });
      report.score -= 3;
    }
    console.log(`✓ Copyright year: ${year}`);
  }

  // Clamp score
  report.score = Math.max(0, Math.min(100, report.score));

  // Summary
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`SCORE: ${report.score}/100`);
  console.log(`Issues found: ${report.issues.length}`);
  console.log(`  Critical: ${report.issues.filter(i => i.severity === 'critical').length}`);
  console.log(`  High: ${report.issues.filter(i => i.severity === 'high').length}`);
  console.log(`  Medium: ${report.issues.filter(i => i.severity === 'medium').length}`);
  console.log(`  Low: ${report.issues.filter(i => i.severity === 'low').length}`);
  console.log(`${'═'.repeat(50)}\n`);

  if (report.issues.length > 0) {
    console.log('ISSUES:');
    report.issues.forEach((iss, i) => {
      console.log(`  ${i+1}. [${iss.severity.toUpperCase()}] ${iss.issue}`);
      console.log(`     ${iss.detail}`);
    });
  } else {
    console.log('No significant issues found — this is a well-built website!');
  }

  return report;
}

audit(TARGET_URL).then(report => {
  // Save JSON report
  const fs = require('fs');
  const domain = new URL(TARGET_URL.startsWith('http') ? TARGET_URL : 'https://' + TARGET_URL).hostname.replace('www.', '');
  const filename = `audit-${domain}-${new Date().toISOString().slice(0,10)}.json`;
  fs.writeFileSync(filename, JSON.stringify(report, null, 2));
  console.log(`\n📄 Report saved: ${filename}`);
}).catch(err => {
  console.error('Error:', err.message);
});
