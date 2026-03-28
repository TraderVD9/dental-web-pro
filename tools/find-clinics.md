# DentalWebPro — Prospecting Guide

## How to Find Dental Clinics with Bad Websites

### Method 1: Google Maps (Best for Local)

Search queries:
- "[city] dentist"
- "[city] dental clinic"
- "[city] zahnarzt" (German)
- "[city] tandarts" (Dutch)
- "[city] стоматология" (Russian)

For each result:
1. Click through to their website
2. Run `node tools/prospect-audit.js <url>` for automated check
3. If score < 70 → qualified lead

### Priority Cities (Start Here)

**US Market (highest budget):**
1. Denver, CO
2. Austin, TX
3. Nashville, TN
4. Charlotte, NC
5. Phoenix, AZ
6. Portland, OR
7. Salt Lake City, UT
8. Raleigh, NC
9. Tampa, FL
10. San Diego, CA

**EU Market:**
1. Amsterdam, NL
2. Berlin, DE
3. Munich, DE
4. Vienna, AT
5. Zurich, CH

### Method 2: Google Search for Bad Sites

Search: `"dentist" "[city]" inurl:wix` (finds Wix sites — often outdated)
Search: `"dental" "[city]" inurl:weebly`
Search: `"dentist" "[city]" "© 2020"` (outdated copyright)
Search: `"dentist" "[city]" "under construction"`

### Method 3: Yelp / Directories

1. Go to yelp.com → search "dentist" in target city
2. Filter by: 4+ stars, 50+ reviews (established, has budget)
3. Click through to website → audit
4. Clinics with great Yelp but bad website = perfect leads

### Method 4: Dental Directories

- ADA Find-a-Dentist: ada.org/findadentist
- Jameda.de (Germany)
- Zorgkaart.nl (Netherlands)
- Doctify.com (UK/EU)

### Lead Qualification Checklist

Score each lead 1-10:

- [ ] Website older than 3 years OR no website (+3)
- [ ] No online booking (+2)
- [ ] PageSpeed < 50 (+2)
- [ ] No SSL/HTTPS (+1)
- [ ] Not mobile responsive (+2)
- [ ] Practice with 2+ dentists (has budget) (+2)
- [ ] No reviews on website (+1)
- [ ] Active on Google with 4+ stars (cares about reputation) (+1)

Score 7+ = hot lead, reach out immediately
Score 4-6 = warm lead, add to queue
Score <4 = skip

### Spreadsheet Format

| # | Clinic Name | City | State/Country | Website | Audit Score | Issues (top 3) | Dr. Name | Email | LinkedIn | Lead Score | Status |
|---|-------------|------|---------------|---------|-------------|----------------|----------|-------|----------|------------|--------|
