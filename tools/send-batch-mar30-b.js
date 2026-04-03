const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', port: 587, secure: false,
  auth: { user: 'vellumcadence@gmail.com', pass: 'fhco buvj nhci rwqq' }
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

const leads = [
  // US — Wix/Weebly/GoDaddy free sites
  { to: 'kwdental@windstream.net', clinic: 'KW Dental', city: 'Hiawassee, GA', lang: 'en',
    issues: ['Your website is on a free Wix subdomain — patients see this before they see your work','No online booking — 67% of patients prefer to schedule online','No SEO — you\'re invisible when people search "dentist Hiawassee GA"'] },
  { to: 'coopersburgdental@gmail.com', clinic: 'Coopersburg Dental', city: 'Coopersburg, PA', lang: 'en',
    issues: ['Your Weebly site looks outdated compared to modern dental practices in your area','No mobile optimization — 70% of patients search on their phones','No online booking or patient reviews on your site'] },
  { to: 'urbansmileschicago@gmail.com', clinic: 'Urban Smiles Chicago', city: 'Chicago, IL', lang: 'en',
    issues: ['Your Weebly site (urbansmileschicago.weebly.com) doesn\'t match the quality of your Wicker Park practice','No schema markup — you\'re missing rich results in Google search','A modern site with booking could significantly increase appointment requests'] },
  { to: 'info@mycostamesadentist.com', clinic: 'Advanced Dental Care', city: 'Costa Mesa, CA', lang: 'en',
    issues: ['Your WordPress.com site loads slower than competitors in Costa Mesa','No click-to-call button — mobile patients need to call with one tap','A speed + design upgrade could bring 30-50% more online bookings'] },
  { to: 'bloomingtondentist@gmail.com', clinic: 'Dr. K Luke Eades DDS', city: 'Bloomington, IN', lang: 'en',
    issues: ['Your Weebly site is on a free subdomain — this hurts patient trust','No online booking — your competitors in Bloomington offer 24/7 scheduling','No Google Maps integration or patient reviews section'] },
  { to: 'advanceddentalcarerichmond@gmail.com', clinic: 'Advanced Dental Care of Richmond', city: 'Richmond, VA', lang: 'en',
    issues: ['Your Weebly site doesn\'t have online booking — patients leave to book elsewhere','No mobile-first design — over 70% of dental searches happen on phones','Your Richmond competitors have modern sites with PageSpeed 90+'] },
  { to: 'coralhillsdental@gmail.com', clinic: 'Coral Hills Dental', city: 'Kanab, UT', lang: 'en',
    issues: ['Your WordPress.com site is on a free subdomain — looks unprofessional to new patients','No SEO optimization — hard to find on Google','No online booking, no reviews section, no click-to-call'] },
  { to: 'grin@dallasdds.net', clinic: 'HJ Dental', city: 'Dallas, TX', lang: 'en',
    issues: ['Your WordPress.com site loads significantly slower than competitors','No mobile optimization or online booking','A modern redesign with SEO could put you on page 1 for "dentist Dallas"'] },

  // NL — Dutch
  { to: 'tandartspraktijk@van-kemenade.nl', clinic: 'Tandarts van Kemenade', city: 'Bladel', lang: 'nl',
    issues: ['Uw website op Weebly ziet er verouderd uit vergeleken met moderne tandartspraktijken','Geen online afspraken boeken — patiënten verwachten 24/7 te kunnen reserveren','Geen schema-markup — uw praktijk mist rijke zoekresultaten in Google'] },
  { to: 'info@veeningtandartsen.nl', clinic: 'Veening Tandartsen', city: 'Groningen', lang: 'nl',
    issues: ['Uw Weebly-website heeft geen mobiel-vriendelijk ontwerp — 70% zoekt via telefoon','Geen online boekingssysteem — uw concurrenten in Groningen bieden dit wel','Een moderne website met SEO kan 30-50% meer afspraakverzoeken opleveren'] },
];

function buildEmail(lead) {
  if (lead.lang === 'nl') {
    return {
      subject: `Korte vraag over de website van ${lead.clinic}`,
      html: `<p>Beste,</p>
<p>Ik was op zoek naar een tandarts in ${lead.city} en kwam ${lead.clinic} tegen. Ik merkte een paar dingen op aan uw website die u mogelijk nieuwe patiënten kosten:</p>
<ul>${lead.issues.map(i => `<li>${i}</li>`).join('\n')}</ul>
<p>Ik bouw high-converting websites speciaal voor tandartspraktijken — met AI-gestuurd ontwerp.</p>
<p>Drie live demo's:</p>
<ul>
<li><a href="https://dentalwebai.com/demos/bright-smile.html">Bright Smile Dental</a></li>
<li><a href="https://dentalwebai.com/demos/alpine-dental.html">Alpine Family Dentistry</a></li>
<li><a href="https://dentalwebai.com/demos/citydent.html">CityDent Clinic</a> (meertalig)</li>
</ul>
<p>Gratis audit: <a href="https://dentalwebai.com/audit.html">dentalwebai.com/audit</a></p>
<p>Heeft u interesse in een kort gesprek van 10 minuten?</p>
<p>Met vriendelijke groet,<br>Dmytro V.<br>DentalWebAI | AI-Powered Dental Websites<br><a href="https://dentalwebai.com">dentalwebai.com</a></p>`
    };
  }
  return {
    subject: `Quick question about ${lead.clinic}'s website`,
    html: `<p>Hi there,</p>
<p>I was looking for a dentist in ${lead.city} and came across ${lead.clinic}. I noticed a few things about your website that might be costing you new patients:</p>
<ul>${lead.issues.map(i => `<li>${i}</li>`).join('\n')}</ul>
<p>I build high-converting websites for dental practices using AI-powered design.</p>
<p>3 live demos:</p>
<ul>
<li><a href="https://dentalwebai.com/demos/bright-smile.html">Bright Smile Dental</a> — Premium design</li>
<li><a href="https://dentalwebai.com/demos/alpine-dental.html">Alpine Family Dentistry</a> — Clean modern</li>
<li><a href="https://dentalwebai.com/demos/citydent.html">CityDent Clinic</a> — Multilingual</li>
</ul>
<p>Free audit: <a href="https://dentalwebai.com/audit.html">dentalwebai.com/audit</a></p>
<p>Worth a 10-minute call? No pitch — just value.</p>
<p>Best,<br>Dmytro V.<br>DentalWebAI | AI-Powered Dental Websites<br><a href="https://dentalwebai.com">dentalwebai.com</a></p>`
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
        to: lead.to, replyTo: 'hello@dentalwebai.com',
        subject: email.subject, html: email.html
      });
      console.log(`✅ ${i+1}/${leads.length} — ${lead.clinic} (${lead.to})`);
    } catch (err) {
      console.log(`❌ ${i+1}/${leads.length} — ${lead.clinic}: ${err.message}`);
    }
    if (i < leads.length - 1) await sleep(3000);
  }
  console.log('\nDone!');
}
main();
