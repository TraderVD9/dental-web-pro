const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', port: 587, secure: false,
  auth: { user: 'vellumcadence@gmail.com', pass: 'fhco buvj nhci rwqq' }
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

const leads = [
  // US
  { to: 'midwestsmilesok@gmail.com', clinic: 'Midwest Smiles', city: 'Midwest City, OK', lang: 'en',
    issues: ['Your Weebly site looks outdated compared to modern dental practices in OKC metro','No online booking — patients expect to schedule 24/7 from their phone','No schema markup or Google Maps — hard to find when people search "dentist Midwest City"'] },
  { to: 'drdanbuckley@gmail.com', clinic: 'Buckley Comprehensive Dentistry', city: 'Atmore, AL', lang: 'en',
    issues: ['Your Weebly site doesn\'t have online booking — 67% of patients prefer to book online','No mobile-first design — over 70% of patients search on phones','No patient reviews or testimonials section to build trust with new visitors'] },
  { to: 'bentcreekdental@gmail.com', clinic: 'Bent Creek Dental', city: 'Auburn, AL', lang: 'en',
    issues: ['Your Weebly site doesn\'t reflect the quality of your Auburn practice','No online booking — your competitors in Auburn offer instant scheduling','No click-to-call button — mobile patients need one tap to reach you'] },
  { to: 'diamondlakesdental@gmail.com', clinic: 'Diamond Lakes Dental', city: 'Hot Springs, AR', lang: 'en',
    issues: ['Your Weebly site is on a free subdomain — this hurts patient trust','No SEO optimization — invisible when people search "dentist Hot Springs"','No online booking, reviews, or contact form'] },
  { to: 'oxforddentalidahofalls@gmail.com', clinic: 'Oxford Dental Care', city: 'Idaho Falls, ID', lang: 'en',
    issues: ['Your Weebly site looks dated — your Idaho Falls competitors have modern, fast sites','No online booking or click-to-call','No schema markup — missing rich results (star ratings, hours) in Google'] },
  // DE
  { to: 'info@zahnarzt-ebersbach.de', clinic: 'Zahnarztpraxis Baier', city: 'Ebersbach', lang: 'de',
    issues: ['Ihre Weebly-Website hat kein modernes, mobilfreundliches Design','Keine Online-Terminbuchung — Patienten erwarten 24/7 Terminvereinbarung','Kein Schema-Markup — Sie verpassen Rich Snippets in der Google-Suche'] },
  // NL
  { to: 'info@esthetisch.nl', clinic: 'Cum Laude Esthetische Tandheelkunde', city: 'Eindhoven', lang: 'nl',
    issues: ['Uw website heeft geen online afspraaksysteem — patiënten willen 24/7 kunnen boeken','Geen schema-markup — uw praktijk mist rijke zoekresultaten in Google','Een moderne website met SEO kan meer patiënten uit Eindhoven aantrekken'] },
];

function buildEmail(lead) {
  if (lead.lang === 'de') {
    return {
      subject: `Kurze Frage zur Website von ${lead.clinic}`,
      html: `<p>Guten Tag,</p><p>ich habe nach Zahnärzten in ${lead.city} gesucht und bin auf ${lead.clinic} gestoßen. Dabei sind mir einige Dinge an Ihrer Website aufgefallen:</p><ul>${lead.issues.map(i=>`<li>${i}</li>`).join('')}</ul><p>Ich entwickle Websites speziell für Zahnarztpraxen — mit KI-gestütztem Design.</p><p>Live-Demos: <a href="https://dentalwebai.com/demos/bright-smile.html">Bright Smile</a> · <a href="https://dentalwebai.com/demos/citydent.html">CityDent (DE/EN)</a></p><p>Kostenloses Audit: <a href="https://dentalwebai.com/audit.html">dentalwebai.com/audit</a></p><p>Mit freundlichen Grüßen,<br>Dmytro V.<br>DentalWebAI<br><a href="https://dentalwebai.com">dentalwebai.com</a></p>`
    };
  }
  if (lead.lang === 'nl') {
    return {
      subject: `Korte vraag over de website van ${lead.clinic}`,
      html: `<p>Beste,</p><p>Ik was op zoek naar een tandarts in ${lead.city} en kwam ${lead.clinic} tegen. Ik merkte een paar dingen op:</p><ul>${lead.issues.map(i=>`<li>${i}</li>`).join('')}</ul><p>Ik bouw websites speciaal voor tandartspraktijken — met AI-gestuurd ontwerp.</p><p>Live demo's: <a href="https://dentalwebai.com/demos/bright-smile.html">Bright Smile</a> · <a href="https://dentalwebai.com/demos/citydent.html">CityDent</a></p><p>Gratis audit: <a href="https://dentalwebai.com/audit.html">dentalwebai.com/audit</a></p><p>Met vriendelijke groet,<br>Dmytro V.<br>DentalWebAI<br><a href="https://dentalwebai.com">dentalwebai.com</a></p>`
    };
  }
  return {
    subject: `Quick question about ${lead.clinic}'s website`,
    html: `<p>Hi there,</p><p>I was looking for a dentist in ${lead.city} and came across ${lead.clinic}. I noticed a few things that might be costing you patients:</p><ul>${lead.issues.map(i=>`<li>${i}</li>`).join('')}</ul><p>I build dental websites using AI — agency quality at a fraction of the cost, delivered in 7-10 days.</p><p>Live demos: <a href="https://dentalwebai.com/demos/bright-smile.html">Bright Smile</a> · <a href="https://dentalwebai.com/demos/alpine-dental.html">Alpine Dental</a> · <a href="https://dentalwebai.com/demos/citydent.html">CityDent</a></p><p>Free audit: <a href="https://dentalwebai.com/audit.html">dentalwebai.com/audit</a></p><p>Worth a 10-minute call?</p><p>Best,<br>Dmytro V.<br>DentalWebAI<br><a href="https://dentalwebai.com">dentalwebai.com</a><br>+31 6 2522 5150</p>`
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
