# DentalWebAI — Unified Audit Checklist

## Категории и пункты проверки

### 1. PERFORMANCE (вес: 25%)
- [ ] First Contentful Paint (FCP) — < 1.8s
- [ ] Largest Contentful Paint (LCP) — < 2.5s
- [ ] Cumulative Layout Shift (CLS) — < 0.1
- [ ] Total Blocking Time (TBT) — < 200ms
- [ ] Page load time — < 3s
- [ ] Page size — < 3MB
- [ ] Image optimization (WebP, lazy load)
- [ ] Minified CSS/JS
- [ ] Browser caching enabled
- [ ] Gzip/Brotli compression

### 2. SEO (вес: 25%)
- [ ] Title tag (unique, < 60 chars, has practice name + city)
- [ ] Meta description (unique, < 155 chars, has CTA)
- [ ] H1 tag (one per page, descriptive)
- [ ] Heading hierarchy (H1→H2→H3)
- [ ] Schema markup (LocalBusiness/Dentist)
- [ ] AggregateRating schema (reviews)
- [ ] Open Graph tags (title, desc, image)
- [ ] Canonical URL set
- [ ] Robots.txt exists and correct
- [ ] Sitemap.xml exists and valid
- [ ] Google Search Console connected
- [ ] Google Business Profile linked
- [ ] Local keywords in content
- [ ] Internal linking structure
- [ ] No broken links (404s)

### 3. MOBILE & UX (вес: 20%)
- [ ] Viewport meta tag
- [ ] Mobile responsive design
- [ ] Touch targets ≥ 44px
- [ ] Font size ≥ 16px on mobile
- [ ] No horizontal scroll
- [ ] Click-to-call phone link
- [ ] Readable without zoom
- [ ] Fast tap response

### 4. CONVERSION (вес: 15%)
- [ ] Online booking system
- [ ] Contact form
- [ ] Phone number visible (header/footer)
- [ ] Google Maps embedded
- [ ] Patient reviews/testimonials visible
- [ ] Clear CTA on every page
- [ ] Office hours listed
- [ ] Insurance info available
- [ ] Before/after gallery (cosmetic)

### 5. SECURITY (вес: 10%)
- [ ] HTTPS (SSL certificate valid)
- [ ] HSTS header
- [ ] X-Content-Type-Options
- [ ] X-Frame-Options
- [ ] Content-Security-Policy
- [ ] Referrer-Policy
- [ ] No mixed content

### 6. ACCESSIBILITY (вес: 5%)
- [ ] Alt text on images
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Keyboard navigable
- [ ] Skip links
- [ ] Form labels
- [ ] ARIA attributes where needed
- [ ] Focus visible indicator

## Scoring
- Each check: pass = full points, fail = 0
- Weight by category
- Overall score 0-100

## Report color coding
- 🟢 90-100: Excellent
- 🟡 70-89: Good, room for improvement
- 🟠 50-69: Needs work
- 🔴 0-49: Critical — losing patients
