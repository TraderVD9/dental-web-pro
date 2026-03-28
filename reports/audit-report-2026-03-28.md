# DentalWebAI — Website Audit Report
## March 28, 2026

---

## 1. East Charlotte Dental (Charlotte, NC)
**URL:** https://www.eastcharlottedental.com/
**Overall Score: 4.5/10**
**Platform:** WordPress + Imperva WAF
**Reviews:** 330+, 4.1 stars

### Critical Issues
| Issue | Impact |
|-------|--------|
| WAF blocking search engine crawlers | Google can't index the site properly — only 3 pages indexed |
| No real-time online booking | Request form only, no instant scheduling |
| 330+ positive reviews NOT shown on website | Massive wasted social proof |
| Title tag uses "Best Dentist" claim | Against Google guidelines |

### Key Findings
- Imperva/Incapsula bot protection too aggressive — returns 403 to crawlers
- Only **3 pages** indexed in Google (should be 15-30+)
- Has Spanish version (/es/) — good differentiator for Charlotte market
- 4 dentists on staff (Dr. Hollowell, Dr. Purdy, Dr. Davis, Dr. Schmidt)
- Accepts Medicaid, BCBS, Cigna, Aetna, Delta, CareCredit
- No Instagram presence
- Minimal blog content (1 post found)

### Recommendations (Priority Order)
1. Fix WAF — whitelist Googlebot and search engine crawlers
2. Add real-time booking (LocalMed, NexHealth)
3. Embed Google reviews on homepage
4. Add schema markup (Dentist, LocalBusiness, Review)
5. Optimize title tags and meta descriptions
6. Expand blog content (2-4 posts/month)

---

## 2. Dr. Fuchs Zahnarzt (Vienna, Austria)
**URL:** https://zahnarztfuchs.at/
**Overall Score: 5.5/10**
**Platform:** One.com Website Builder
**Reviews:** 173 total (Google: 130/4.0★, DocFinder: 37/4.1★, Facebook: 6/5.0★)

### Critical Issues
| Issue | Impact |
|-------|--------|
| JS-rendered — content invisible to basic crawlers | SEO risk, social previews broken |
| Broken pages returning 404 | /unsere-praxis/ and /unsere-leistungen/ are dead |
| No real online booking (just contact forms) | "Online buchen" is misleading |
| Zoom disabled on mobile | Accessibility violation (WCAG 1.4.4) |

### Key Findings
- Practice renovated in 2025 — modern physical space, outdated website
- Only **7 pages** total — extremely thin content
- Good title tag and meta description (well-crafted)
- Excellent security headers (HSTS, CSP, X-Frame-Options)
- No English version despite multilingual staff (DE/EN/RO)
- Missing schema: no Dentist/LocalBusiness/AggregateRating
- One.com builder is a budget platform limiting growth
- 173 reviews not displayed on website

### Recommendations (Priority Order)
1. Fix broken 404 pages (indexed by Google, destroying SEO)
2. Add rich schema markup (Dentist, AggregateRating)
3. Remove zoom restriction from viewport meta
4. Implement real booking system (Doctolib/Doctena)
5. Add English language support
6. Create more content pages (individual services, FAQ, team)
7. Migrate from One.com to professional platform

---

## 3. The Dentistry Place (Denver, CO)
**URL:** https://www.thedentistryplacedenver.com/
**Overall Score: 5/10**
**Platform:** WordPress + Cloudflare CDN
**Reviews:** Yelp 37, OpenCare 4.9★/13, Healthgrades 33

### Critical Issues
| Issue | Impact |
|-------|--------|
| Cloudflare bot protection blocking crawlers | Returns 403 on all pages including sitemap.xml |
| 30-second crawl delay in robots.txt | Excessively slows Google indexing |
| Homepage title missing practice name | Brand invisible in search results |
| No native online booking | Relies on Zocdoc/OpenCare third parties |

### Key Findings
- Dr. Robert Greene, DMD — since 2016, strong patient loyalty
- Contact page title is bizarre: full street address in title tag
- Conflicting business hours across platforms (Yelp vs Google vs website)
- No caching headers (Cache-Control: no-store) — poor performance
- Duplicate URL paths (/about/ vs /about-us/)
- www vs non-www canonical issue
- Instagram: 153 followers, 52 posts — very low engagement
- Offers IV sedation — premium differentiator not highlighted

### Recommendations (Priority Order)
1. Fix Cloudflare WAF — whitelist search engine bots
2. Fix sitemap.xml access (currently 403)
3. Remove 30-second crawl delay from robots.txt
4. Fix title tags — add "The Dentistry Place" to all pages
5. Integrate native booking widget
6. Reconcile business hours across all platforms
7. Fix www vs non-www canonical
8. Add structured data schema

---

## 4. Gentle Dental Care (Plainville, CT)
**URL:** https://gentledentalcarect.weebly.com/
**Overall Score: 2/10**
**Platform:** Weebly Free
**Reviews:** Yelp 14, Facebook 22 (96% recommend)

### Critical Issues
| Issue | Impact |
|-------|--------|
| Page title is "MY SITE - Home" | Default Weebly placeholder — never configured |
| Free Weebly subdomain | Destroys credibility and Google ranking |
| "Powered by Weebly" footer | Unprofessional for medical practice |
| Google Analytics broken (deprecated UA) | No traffic data since July 2023 |

### Key Findings
- Dr. Thomas Peltzer, DMD — Premier Sedation Dentist (IV Sedation)
- **Title tag literally says "MY SITE"** — worst SEO issue possible
- No meta descriptions on any page
- No office hours listed anywhere
- No online booking system
- No Google Maps on any page
- No click-to-call link
- Homepage content: ONE paragraph — "Gentle Dental Care offers gentle dentistry..."
- 5+ font families loaded (Quattrocento, Crimson Text, Montserrat, Playfair Display, Lora) — bloated
- Services page extremely thin — 3 categories with minimal descriptions
- New Patients page is empty (just a PDF download)
- Doctible review widget on About page (not homepage), JS-only (no SEO value)
- No HIPAA compliance mention, no insurance list, no payment options

### Recommendations (Priority Order)
1. **Complete website rebuild** — Weebly free is unsuitable for a medical practice
2. Get a custom domain (~$12/year)
3. Create proper content (services, team, FAQ, insurance info)
4. Add online booking system
5. Display reviews on homepage
6. Add Google Maps
7. Set up working Google Analytics (GA4)
8. Add office hours, insurance list, payment options

---

## Comparative Summary

| Metric | East Charlotte | Dr. Fuchs | Dentistry Place | Gentle Dental |
|--------|---------------|-----------|-----------------|---------------|
| **Score** | 4.5/10 | 5.5/10 | 5/10 | 2/10 |
| Platform | WordPress | One.com | WordPress | Weebly Free |
| SSL | Yes | Yes | Yes | Yes (Cloudflare) |
| Mobile | Unknown (WAF) | Broken zoom | Unknown (WAF) | Basic |
| Online Booking | No (form only) | No (form only) | No (3rd party) | No |
| Schema Markup | No | Minimal | No | No |
| Google Maps | Unknown | No | Unknown | No |
| Reviews on site | No | No | Dedicated page | Buried (JS) |
| Blog/Content | 1 post | No blog | Unknown | No |
| Hours listed | Yes (external) | Yes (external) | Conflicting | No |

## What DentalWebAI Would Deliver

For each of these practices, our **Professional package ($3,500)** would include:

- Custom responsive design (mobile-first)
- 10-15 pages with dedicated service pages
- Online appointment booking (Cal.com/Calendly integration)
- Patient reviews widget (Google Reviews integration)
- Local SEO setup (schema markup, meta tags, sitemap, Google Maps)
- Google Business Profile optimization
- Core Web Vitals optimization (sub-2-second load time)
- Blog section for ongoing SEO content
- Delivered in **7-10 business days**

**ROI:** One new patient = $1,200+ lifetime value. The website pays for itself with just 3 new patients.

---

*Report generated by DentalWebAI | https://dentalwebai.com*
*Contact: hello@dentalwebai.com*
