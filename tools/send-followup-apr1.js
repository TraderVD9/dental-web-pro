/**
 * Day 3 Follow-up Emails — April 1, 2026
 * For all leads who received Day 1 emails on March 29, 2026
 *
 * DO NOT RUN BEFORE APRIL 1.
 * Usage: node tools/send-followup-apr1.js
 */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'vellumcadence@gmail.com',
    pass: 'fhco buvj nhci rwqq',
  },
});

const FROM = 'Dmytro V. | DentalWebAI <hello@dentalwebai.com>';
const REPLY_TO = 'hello@dentalwebai.com';

// All leads who got Day 1 on March 29, 2026 (batch 1 + batch 2)
const leads = [
  // === BATCH 1 (March 29) ===
  {
    email: 'info@redoakfamilydentistry.com',
    clinic: 'Red Oak Family Dentistry',
    city: 'McKinney, TX',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Stonebridge Dental',
    competitorStrength: 'online booking, patient reviews, and loads in under 2 seconds',
  },
  {
    email: 'ergdentalnyc@gmail.com',
    clinic: 'E.R.G. Dental NYC',
    city: 'New York, NY',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Manhattan Bridge Dental',
    competitorStrength: 'mobile-first design, online scheduling, and 5-star Google reviews on their homepage',
  },
  {
    email: 'info@KentlandsDental.com',
    clinic: 'Kentlands Dental Group',
    city: 'Gaithersburg, MD',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Gaithersburg Dental Arts',
    competitorStrength: 'online booking, modern design, and patient testimonials front and center',
  },
  {
    email: 'pmartinggibbs@gmail.com',
    clinic: 'Gibbs & Martin Family',
    city: 'Litchfield Park, AZ',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Palm Valley Pediatric Dentistry',
    competitorStrength: 'fast-loading pages, online booking, and a mobile-first design',
  },
  {
    email: 'thedentaldepot@gmail.com',
    clinic: 'The Dental Depot',
    city: 'Miamisburg, OH',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Dental Center of Miamisburg',
    competitorStrength: 'online scheduling, patient reviews, and a modern mobile-friendly site',
  },
  {
    email: 'shorelinedentalmtw@gmail.com',
    clinic: 'Shoreline Dental',
    city: 'Manitowoc, WI',
    country: 'US',
    score: 10,
    issues: 'free Weebly subdomain, mid-2010s design',
    competitor: 'Lakeshore Family Dentistry',
    competitorStrength: 'a professional domain, online booking, and fast load times',
  },
  {
    email: 'info@galleriadentalspringfield.com',
    clinic: 'Galleria Dental',
    city: 'Springfield, MO',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Springfield Family Dentistry',
    competitorStrength: 'a modern layout, patient testimonials, and online scheduling',
  },
  {
    email: 'infoHCFDental@gmail.com',
    clinic: 'Hunt Club Family Dental',
    city: 'Gallatin, TN',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Sumner Dental Group',
    competitorStrength: 'online booking, Google reviews integration, and a fast mobile site',
  },
  {
    email: 'hello@inlandchoicedental.com',
    clinic: 'Inland Choice Dental',
    city: 'Riverside, CA',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Riverside Dental Group',
    competitorStrength: 'online scheduling, patient reviews on the homepage, and a sub-2-second load time',
  },
  {
    email: 'info@summerlinsmiles.com',
    clinic: 'Summerlin Smiles',
    city: 'Las Vegas, NV',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Summerlin Dental Solutions',
    competitorStrength: 'a modern site with online booking, virtual tour, and mobile-first design',
  },
  {
    email: 'help@smileatfirstsight.com',
    clinic: 'Smile at First Sight',
    city: 'Aberdeen, NJ',
    country: 'US',
    score: 10,
    issues: 'free Weebly subdomain, amateur design',
    competitor: 'Aberdeen Family Dental',
    competitorStrength: 'a professional domain, fast-loading pages, and online patient scheduling',
  },
  {
    email: 'breezypointsmiles@gmail.com',
    clinic: 'Breezy Point Smiles',
    city: 'Queens, NY',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Queens Modern Dental',
    competitorStrength: 'online booking, patient reviews, and a mobile-optimized site',
  },
  {
    email: 'admin@mouadentistry.com',
    clinic: 'Moua Family Dentistry',
    city: 'Maplewood, MN',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Maplewood Dental Associates',
    competitorStrength: 'online scheduling, patient testimonials, and a fast mobile-friendly layout',
  },
  {
    email: 'rbanik@comcast.net',
    clinic: 'Carolina Family Dentistry',
    city: 'North Charleston, SC',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Charleston Center for Cosmetic Dentistry',
    competitorStrength: 'a modern site with online booking, before/after galleries, and patient reviews',
  },
  {
    email: 'info@hawthornedentalnj.com',
    clinic: 'Hawthorne Dental Associates',
    city: 'Hawthorne, NJ',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Hawthorne Village Dental',
    competitorStrength: 'online booking, modern design, and integrated patient reviews',
  },
  {
    email: 'infopearland@flossdental.com',
    clinic: 'Floss Dental Pearland',
    city: 'Pearland, TX',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Pearland Modern Dentistry',
    competitorStrength: 'a sleek mobile-first site, online scheduling, and video testimonials',
  },
  {
    email: 'info@watsondentaldds.com',
    clinic: 'Douglas A Watson DDS',
    city: 'Greene, NY',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Norwich Family Dental',
    competitorStrength: 'a modern site, online booking, and patient reviews on their homepage',
  },
  {
    email: 'AgouraDental@gmail.com',
    clinic: 'Agoura Dental Group',
    city: 'Agoura Hills, CA',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Agoura Hills Family Dentistry',
    competitorStrength: 'a fast-loading modern site, online booking, and patient testimonials',
  },
  {
    email: 'axiomdental@gmail.com',
    clinic: 'Axiom Dental Group',
    city: 'Aurora, CO',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Aurora Modern Dentistry',
    competitorStrength: 'online booking, mobile-first design, and integrated Google reviews',
  },
  {
    email: 'lanudental@gmail.com',
    clinic: 'L.A.N.U. Dental',
    city: 'West Chester, OH',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'West Chester Dental Group',
    competitorStrength: 'a polished modern site, online scheduling, and patient reviews front and center',
  },
  {
    email: 'elitesmilenewyork@gmail.com',
    clinic: 'Elite Smile Dental',
    city: 'Manhattan, NY',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'NYC Smile Design',
    competitorStrength: 'a premium site with before/after galleries, online scheduling, and video testimonials',
  },
  {
    email: 'funtasticpediatric@gmail.com',
    clinic: 'FUNtastic Pediatric Dental',
    city: 'Long Beach, CA',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Long Beach Pediatric Dental',
    competitorStrength: 'a colorful mobile-first site, online booking, and parent reviews on the homepage',
  },
  {
    email: 'gaddental@yahoo.com',
    clinic: 'Gad Dental',
    city: 'La Mirada, CA',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'La Mirada Dental Studio',
    competitorStrength: 'a modern website, online scheduling, and patient testimonials',
  },
  {
    email: 'leeorangedental@gmail.com',
    clinic: 'Orange Dental Care',
    city: 'Orange, CA',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'Orange Coast Dental',
    competitorStrength: 'a fast mobile-optimized site, online booking, and 5-star review showcase',
  },
  {
    email: 'hondaplazadental@gmail.com',
    clinic: 'Honda Plaza Dental Clinic',
    city: 'Los Angeles, CA',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'LA Dental Clinic',
    competitorStrength: 'an ultra-fast site, online booking, and bilingual content',
  },
  {
    email: 'greenfielddental102@gmail.com',
    clinic: 'Greenfield Dental Corp',
    city: 'West Allis, WI',
    country: 'US',
    score: null,
    issues: 'outdated design',
    competitor: 'West Allis Family Dentistry',
    competitorStrength: 'online scheduling, patient reviews, and a modern responsive design',
  },

  // === BATCH 2 (March 29) ===
  {
    email: 'info@mooringdental.com',
    clinic: 'Mooring Dental',
    city: 'Clayton, NC',
    country: 'US',
    score: 10,
    issues: 'free Wix subdomain, template design, no SEO',
    competitor: 'Clayton Family Dentistry',
    competitorStrength: 'a professional domain, online booking, and a mobile-optimized site',
  },
  {
    email: 'northwestdental@sbcglobal.net',
    clinic: 'Northwest Dental Care',
    city: 'Madera, CA',
    country: 'US',
    score: 10,
    issues: 'free Wix subdomain despite 30 years in business',
    competitor: 'Madera Family Dental',
    competitorStrength: 'a professional domain, online scheduling, and patient reviews on the homepage',
  },
  {
    email: 'Paradisedental@ymail.com',
    clinic: 'Paradise Family Dentistry',
    city: 'Durham, NC',
    country: 'US',
    score: 10,
    issues: 'free Wix subdomain',
    competitor: 'Durham Dental Group',
    competitorStrength: 'a professional domain, online booking, and modern mobile-first design',
  },
  {
    email: 'directdentalutah@gmail.com',
    clinic: 'Direct Dental Utah',
    city: 'Salt Lake City, UT',
    country: 'US',
    score: 10,
    issues: 'free Wix subdomain',
    competitor: 'SLC Modern Dental',
    competitorStrength: 'a clean modern site, online scheduling, and integrated patient reviews',
  },
  {
    email: 'northsaltlakedental@gmail.com',
    clinic: 'North Salt Lake Dental',
    city: 'North Salt Lake, UT',
    country: 'US',
    score: 10,
    issues: 'free Weebly subdomain, basic design',
    competitor: 'Bountiful Family Dental',
    competitorStrength: 'a professional domain, fast-loading pages, and online scheduling',
  },
  {
    email: 'altitudedental@gmail.com',
    clinic: 'Altitude Dental',
    city: 'Salt Lake City, UT',
    country: 'US',
    score: 10,
    issues: 'free WordPress subdomain, 2012 theme',
    competitor: 'Salt Lake Dental Care',
    competitorStrength: 'a modern site with online booking, patient testimonials, and fast load times',
  },
  {
    email: 'smile@hillcrestdentaltx.com',
    clinic: 'Hillcrest Dental',
    city: 'Lewisville, TX',
    country: 'US',
    score: 10,
    issues: 'free Wix subdomain, template design',
    competitor: 'Castle Hills Family Dental',
    competitorStrength: 'a professional domain, online booking, and mobile-first design',
  },
  {
    email: 'dentalcareofportland@gmail.com',
    clinic: 'Dental Care of Portland',
    city: 'Portland, OR',
    country: 'US',
    score: 87,
    issues: 'no meta description, no schema markup',
    competitor: 'Portsmouth Dental Care',
    competitorStrength: 'a perfect 100 score, fast load times, and full SEO optimization',
  },
  {
    email: 'info@tandartsjordaan.nl',
    clinic: 'Tandarts Jordaan',
    city: 'Amsterdam',
    country: 'NL',
    score: 97,
    issues: 'no Google Maps integration',
    competitor: 'Tandartspraktijk De ZuidAs',
    competitorStrength: 'een perfecte score van 100, snelle laadtijden en volledige Google Maps-integratie',
  },
  {
    email: 'info@zahnarzt-torhaus.de',
    clinic: 'Torhaus Zahnärzte',
    city: 'Berlin',
    country: 'DE',
    score: 97,
    issues: 'keine Google Maps-Integration',
    competitor: 'Zahnarztpraxis am Kudamm',
    competitorStrength: 'eine perfekte Website-Bewertung, schnelle Ladezeiten und vollständige SEO-Optimierung',
  },
  {
    email: 'praxis@zahnarzt-berlin-mitte.org',
    clinic: 'zahn&art Berlin',
    city: 'Berlin',
    country: 'DE',
    score: 97,
    issues: 'keine Google Maps-Integration',
    competitor: 'Zahnarzt Fünfhöfe',
    competitorStrength: 'eine perfekte Website-Bewertung von 100, Online-Terminbuchung und schnelle Ladezeiten',
  },
  {
    email: 'info@creative-zahnaerzte.de',
    clinic: 'Creative Zahnärzte',
    city: 'München',
    country: 'DE',
    score: 97,
    issues: 'keine Google Maps-Integration',
    competitor: 'Zahnarzt Fünfhöfe',
    competitorStrength: 'eine perfekte Website-Bewertung von 100, vollständige SEO-Optimierung und extrem schnelle Ladezeiten',
  },
];

// --- Email body generators ---

function buildEnglishBody(lead) {
  return `Hi,

Just wanted to follow up on my earlier email about ${lead.clinic}'s website.

I did some research on your local market in ${lead.city}, and here's what caught my eye:

Your competitor — ${lead.competitor} — currently has ${lead.competitorStrength}. When a potential patient searches for "dentist in ${lead.city}," they're likely finding ${lead.competitor} first.

I put together a quick visual comparison of your site vs. theirs. The difference is striking — and fixable.

I can build you a modern, patient-converting website in under 10 days, at a fraction of what most agencies charge.

Worth a quick 10-minute call this week? No pitch — just a walkthrough of what I'd change and why it matters for new patient growth.

Best,
Dmytro V.
DentalWebAI | AI-Powered Dental Websites
https://dentalwebai.com`;
}

function buildGermanBody(lead) {
  return `Hallo,

ich wollte kurz an meine vorherige E-Mail bezüglich der Website von ${lead.clinic} anknüpfen.

Ich habe mir Ihren lokalen Markt in ${lead.city} genauer angeschaut, und Folgendes ist mir aufgefallen:

Ihr Mitbewerber — ${lead.competitor} — hat derzeit ${lead.competitorStrength}. Wenn ein potenzieller Patient nach "Zahnarzt in ${lead.city}" sucht, findet er wahrscheinlich zuerst ${lead.competitor}.

Ich habe einen kurzen visuellen Vergleich Ihrer Website mit der Ihres Mitbewerbers erstellt. Der Unterschied ist deutlich — und lässt sich beheben.

Ich kann Ihnen in unter 10 Tagen eine moderne, patientenorientierte Website erstellen — zu einem Bruchteil dessen, was die meisten Agenturen verlangen.

Hätten Sie diese Woche 10 Minuten Zeit für ein kurzes Gespräch? Kein Verkaufsgespräch — nur ein Überblick, was ich ändern würde und warum es für Ihre Neupatientengewinnung wichtig ist.

Mit freundlichen Grüßen,
Dmytro V.
DentalWebAI | KI-gestützte Dental-Websites
https://dentalwebai.com`;
}

function buildDutchBody(lead) {
  return `Hallo,

Ik wilde even terugkomen op mijn eerdere e-mail over de website van ${lead.clinic}.

Ik heb wat onderzoek gedaan naar uw lokale markt in ${lead.city}, en dit viel me op:

Uw concurrent — ${lead.competitor} — heeft momenteel ${lead.competitorStrength}. Wanneer een potentiële patiënt zoekt naar "tandarts in ${lead.city}," vinden ze waarschijnlijk eerst ${lead.competitor}.

Ik heb een korte visuele vergelijking gemaakt van uw website versus die van hen. Het verschil is opvallend — en op te lossen.

Ik kan een moderne, patiëntgerichte website voor u bouwen in minder dan 10 dagen, voor een fractie van wat de meeste bureaus rekenen.

Heeft u deze week 10 minuten tijd voor een kort gesprek? Geen verkooppraatje — gewoon een overzicht van wat ik zou veranderen en waarom het belangrijk is voor de groei van uw praktijk.

Met vriendelijke groet,
Dmytro V.
DentalWebAI | AI-Powered Dental Websites
https://dentalwebai.com`;
}

// --- Main ---

async function main() {
  console.log(`\n📧 Day 3 Follow-up — April 1, 2026`);
  console.log(`Total leads: ${leads.length}\n`);

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];

    let body;
    if (lead.country === 'DE' || lead.country === 'AT') {
      body = buildGermanBody(lead);
    } else if (lead.country === 'NL') {
      body = buildDutchBody(lead);
    } else {
      body = buildEnglishBody(lead);
    }

    const subject = `Re: Quick question about ${lead.clinic}'s website`;

    try {
      await transporter.sendMail({
        from: FROM,
        replyTo: REPLY_TO,
        to: lead.email,
        subject,
        text: body,
      });
      sent++;
      console.log(`✅ [${i + 1}/${leads.length}] ${lead.clinic} (${lead.email})`);
    } catch (err) {
      failed++;
      console.log(`❌ [${i + 1}/${leads.length}] ${lead.clinic} (${lead.email}) — ${err.message}`);
    }

    // 3-second pause between emails (skip after last)
    if (i < leads.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  console.log(`\n--- Done ---`);
  console.log(`Sent: ${sent} | Failed: ${failed} | Total: ${leads.length}\n`);
}

main().catch(console.error);
