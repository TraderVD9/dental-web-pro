const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'vellumcadence@gmail.com',
    pass: 'fhco buvj nhci rwqq'
  }
});

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const leads = [
  // === US HOT LEADS (Wix/Weebly Free) ===
  {
    to: 'info@mooringdental.com',
    clinic: 'Mooring Dental',
    city: 'Clayton, NC',
    lang: 'en',
    issues: [
      'Your site is on a free Wix subdomain (mooringdental.wixsite.com) — patients may not trust a site that doesn\'t have its own domain',
      'No online booking option — 67% of patients prefer to book online before calling',
      'No SEO optimization — your practice is invisible on Google for "dentist in Clayton NC"'
    ]
  },
  {
    to: 'northwestdental@sbcglobal.net',
    clinic: 'Northwest Dental Care',
    city: 'Madera, CA',
    lang: 'en',
    issues: [
      'Your website is hosted on a free Wix subdomain — this hurts your credibility with new patients',
      'No mobile optimization — over 70% of patients search for dentists on their phones',
      'No online booking or click-to-call — you\'re losing patients who want to book instantly'
    ]
  },
  {
    to: 'Paradisedental@ymail.com',
    clinic: 'Paradise Family Dentistry',
    city: 'Durham, NC',
    lang: 'en',
    issues: [
      'Your site is on a free Wix subdomain — it doesn\'t reflect the quality of your practice',
      'No online booking — patients expect to schedule appointments 24/7',
      'No Google Maps integration or patient reviews on your site'
    ]
  },
  {
    to: 'directdentalutah@gmail.com',
    clinic: 'Direct Dental Utah',
    city: 'Salt Lake City, UT',
    lang: 'en',
    issues: [
      'Your website is on a free Wix subdomain (directdentalutah.wixsite.com) — patients see this as unprofessional',
      'No SEO setup — you\'re not showing up when people search "dentist Salt Lake City"',
      'No online booking, no patient reviews, no Google Maps on your site'
    ]
  },
  {
    to: 'northsaltlakedental@gmail.com',
    clinic: 'North Salt Lake Dental',
    city: 'North Salt Lake, UT',
    lang: 'en',
    issues: [
      'Your site is on a free Weebly subdomain — this is the first thing patients see when they Google you',
      'No mobile-friendly design — most patients browse on phones',
      'No online booking, no SEO, no schema markup for Google'
    ]
  },
  {
    to: 'altitudedental@gmail.com',
    clinic: 'Altitude Dental',
    city: 'Salt Lake City, UT',
    lang: 'en',
    issues: [
      'Your website is on a free WordPress.com subdomain with a 2012 theme',
      'No online booking — patients leave when they can\'t schedule in 2 clicks',
      'No mobile optimization, no SEO, no Google Maps integration'
    ]
  },
  {
    to: 'smile@hillcrestdentaltx.com',
    clinic: 'Hillcrest Dental',
    city: 'Lewisville, TX',
    lang: 'en',
    issues: [
      'You still have a Wix free subdomain site live (hillcrestdentallew.wixsite.com) — this can confuse patients and hurt SEO',
      'Your main site could benefit from better PageSpeed scores and schema markup',
      'No patient reviews section or Google Maps integration on the site'
    ]
  },
  {
    to: 'dentalcareofportland@gmail.com',
    clinic: 'Dental Care of Portland',
    city: 'Portland, OR',
    lang: 'en',
    issues: [
      'Your site is missing a meta description — Google shows a random snippet instead of what you want patients to see',
      'No schema markup — you\'re missing rich results (star ratings, hours) in Google search',
      'Site loads in 1.2 seconds — good, but your competitors in Portland load in under 0.5s'
    ]
  },

  // === EU LEADS (German / Dutch) ===
  {
    to: 'info@tandartsjordaan.nl',
    clinic: 'Tandarts Jordaan',
    city: 'Amsterdam',
    lang: 'nl',
    issues: [
      'Geen Google Maps-integratie op uw website — patiënten moeten zelf zoeken naar uw locatie',
      'Geen schema-markup — uw praktijk mist rijke zoekresultaten (sterren, openingstijden) in Google',
      'Uw concurrenten in Amsterdam laden sneller en scoren hoger op mobiel'
    ]
  },
  {
    to: 'info@zahnarzt-torhaus.de',
    clinic: 'Torhaus Zahnärzte',
    city: 'Berlin',
    lang: 'de',
    issues: [
      'Keine Google Maps-Integration auf Ihrer Website — Patienten müssen Ihre Adresse selbst suchen',
      'Kein Schema-Markup — Sie verpassen Rich Snippets (Sterne, Öffnungszeiten) in der Google-Suche',
      'Ihre Mitbewerber in Berlin laden schneller und ranken höher auf Mobilgeräten'
    ]
  },
  {
    to: 'praxis@zahnarzt-berlin-mitte.org',
    clinic: 'zahn&art Berlin',
    city: 'Berlin',
    lang: 'de',
    issues: [
      'Keine Google Maps-Einbindung — Patienten finden Ihre Praxis schwerer',
      'Kein Schema-Markup für Google — keine Sternebewertungen oder Öffnungszeiten in den Suchergebnissen',
      'Die Ladezeit könnte optimiert werden, um mobile Nutzer besser zu bedienen'
    ]
  },
  {
    to: 'info@creative-zahnaerzte.de',
    clinic: 'Creative Zahnärzte',
    city: 'München',
    lang: 'de',
    issues: [
      'Keine Google Maps auf Ihrer Website — Patienten erwarten eine eingebettete Karte',
      'Kein Schema-Markup — Sie verpassen Rich Results in der Google-Suche',
      'Ihre Münchner Konkurrenz hat modernere, schnellere Websites mit Online-Terminbuchung'
    ]
  },
];

function buildEmail(lead) {
  if (lead.lang === 'de') {
    return {
      subject: `Kurze Frage zur Website von ${lead.clinic}`,
      html: `<p>Guten Tag,</p>

<p>ich habe nach Zahnärzten in ${lead.city} gesucht und bin auf ${lead.clinic} gestoßen. Dabei sind mir einige Dinge an Ihrer Website aufgefallen, die Sie möglicherweise neue Patienten kosten:</p>

<ul>
${lead.issues.map(i => `<li>${i}</li>`).join('\n')}
</ul>

<p>Ich entwickle hochkonvertierende Websites speziell für Zahnarztpraxen — mit KI-gestütztem Design. Meine Kunden sehen typischerweise 30–50% mehr Terminanfragen innerhalb von 60 Tagen.</p>

<p>Hier sind drei Live-Demos:</p>
<ul>
<li><a href="https://dentalwebai.com/demos/bright-smile.html">Bright Smile Dental</a> — Premium-Design mit 3D-Elementen</li>
<li><a href="https://dentalwebai.com/demos/alpine-dental.html">Alpine Family Dentistry</a> — Modernes, sauberes Design</li>
<li><a href="https://dentalwebai.com/demos/citydent.html">CityDent Clinic</a> — Zweisprachig (DE/EN)</li>
</ul>

<p>Testen Sie auch unser kostenloses Website-Audit-Tool: <a href="https://dentalwebai.com/audit.html">dentalwebai.com/audit</a></p>

<p>Hätten Sie Interesse an einem kurzen 10-Minuten-Gespräch? Kein Verkaufsgespräch — nur Mehrwert.</p>

<p>Mit freundlichen Grüßen,<br>
Dmytro V.<br>
DentalWebAI | KI-gestützte Dental-Websites<br>
<a href="https://dentalwebai.com">dentalwebai.com</a></p>`
    };
  }

  if (lead.lang === 'nl') {
    return {
      subject: `Korte vraag over de website van ${lead.clinic}`,
      html: `<p>Beste,</p>

<p>Ik was op zoek naar een tandarts in ${lead.city} en kwam ${lead.clinic} tegen. Ik merkte een paar dingen op aan uw website die u mogelijk nieuwe patiënten kosten:</p>

<ul>
${lead.issues.map(i => `<li>${i}</li>`).join('\n')}
</ul>

<p>Ik bouw high-converting websites speciaal voor tandartspraktijken — met AI-gestuurd ontwerp. Mijn klanten zien doorgaans 30–50% meer afspraakverzoeken binnen 60 dagen.</p>

<p>Hier zijn drie live demo's:</p>
<ul>
<li><a href="https://dentalwebai.com/demos/bright-smile.html">Bright Smile Dental</a> — Premium ontwerp met 3D-elementen</li>
<li><a href="https://dentalwebai.com/demos/alpine-dental.html">Alpine Family Dentistry</a> — Modern, clean ontwerp</li>
<li><a href="https://dentalwebai.com/demos/citydent.html">CityDent Clinic</a> — Meertalig (DE/EN)</li>
</ul>

<p>Probeer ook onze gratis website-audit: <a href="https://dentalwebai.com/audit.html">dentalwebai.com/audit</a></p>

<p>Heeft u interesse in een kort gesprek van 10 minuten? Geen verkooppraatje — alleen waarde.</p>

<p>Met vriendelijke groet,<br>
Dmytro V.<br>
DentalWebAI | AI-Powered Dental Websites<br>
<a href="https://dentalwebai.com">dentalwebai.com</a></p>`
    };
  }

  // English
  return {
    subject: `Quick question about ${lead.clinic}'s website`,
    html: `<p>Hi there,</p>

<p>I was looking for a dentist in ${lead.city} and came across ${lead.clinic}. I noticed a few things about your website that might be costing you new patients:</p>

<ul>
${lead.issues.map(i => `<li>${i}</li>`).join('\n')}
</ul>

<p>I build high-converting websites for dental practices using AI-powered design. My clients typically see 30–50% more appointment requests within 60 days.</p>

<p>Here are 3 live dental demos I built:</p>
<ul>
<li><a href="https://dentalwebai.com/demos/bright-smile.html">Bright Smile Dental</a> — Dark premium design with 3D elements</li>
<li><a href="https://dentalwebai.com/demos/alpine-dental.html">Alpine Family Dentistry</a> — Clean modern design</li>
<li><a href="https://dentalwebai.com/demos/citydent.html">CityDent Clinic</a> — Multilingual (EN/DE)</li>
</ul>

<p>Try our free dental website audit: <a href="https://dentalwebai.com/audit.html">dentalwebai.com/audit</a></p>

<p>Would you be open to a quick 10-minute call? No pitch — just value.</p>

<p>Best,<br>
Dmytro V.<br>
DentalWebAI | AI-Powered Dental Websites<br>
<a href="https://dentalwebai.com">dentalwebai.com</a></p>`
  };
}

async function main() {
  console.log(`Sending ${leads.length} emails...\n`);

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const email = buildEmail(lead);

    try {
      await transporter.sendMail({
        from: 'Dmytro V. | DentalWebAI <hello@dentalwebai.com>',
        to: lead.to,
        replyTo: 'hello@dentalwebai.com',
        subject: email.subject,
        html: email.html
      });
      console.log(`✅ ${i + 1}/${leads.length} — ${lead.clinic} (${lead.to})`);
    } catch (err) {
      console.log(`❌ ${i + 1}/${leads.length} — ${lead.clinic} (${lead.to}): ${err.message}`);
    }

    if (i < leads.length - 1) {
      await sleep(3000); // 3 sec pause between emails
    }
  }

  console.log('\nDone!');
}

main();
