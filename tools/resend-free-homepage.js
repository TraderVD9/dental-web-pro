const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', port: 587, secure: false,
  auth: { user: 'vellumcadence@gmail.com', pass: 'fhco buvj nhci rwqq' }
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ALL FREE HOMEPAGE leads with email — resend with new subject
// Excluding 16 bounced addresses
const bounced = new Set([
  'paradisedental@ymail.com','admin@roachfamilydentistry.com','advanceddentalcarerichmond@gmail.com',
  'bentcreekdental@gmail.com','diamondlakesdental@gmail.com','drdanbuckley@gmail.com',
  'elitesmilenewyork@gmail.com','funtasticpediatric@gmail.com','houyoshidds@gmail.com',
  'hr@gentle-dental.com','info@smileatfirstsight.com','info@veeningtandartsen.nl',
  'info@watsondentaldds.com','shorelinedentalmtw@gmail.com','anna@lumeskin.com',
  'info@kimsnailstudio.com'
]);

const leads = [
  // Batch 1 — original FREE HOMEPAGE
  {to:'altitudedental@gmail.com',clinic:'Altitude Dental',demo:'https://dentalwebai.com/demos/altitude-dental.html',city:'Salt Lake City'},
  {to:'gentledentalcarect@gmail.com',clinic:'Gentle Dental Care',demo:'https://dentalwebai.com/demos/gentle-dental.html',city:'Plainville, CT'},
  {to:'northwestdental@sbcglobal.net',clinic:'Northwest Dental Care',demo:'https://dentalwebai.com/demos/northwest-dental.html',city:'Madera, CA'},
  {to:'holisticdentallv@gmail.com',clinic:'Holistic Dental LV',demo:'https://dentalwebai.com/demos/holistic-dental.html',city:'Las Vegas'},
  {to:'coopersburgdental@gmail.com',clinic:'Coopersburg Dental',demo:'https://dentalwebai.com/demos/coopersburg-dental.html',city:'Coopersburg, PA'},
  {to:'urbansmileschicago@gmail.com',clinic:'Urban Smiles',demo:'https://dentalwebai.com/demos/urban-smiles.html',city:'Chicago'},
  {to:'lakeside1550@gmail.com',clinic:'Lakeside Family Dental',demo:'https://dentalwebai.com/demos/lakeside-dental.html',city:'Arkansas'},
  {to:'grin@dallasdds.net',clinic:'HJ Dental',demo:'https://dentalwebai.com/demos/bright-smile.html',city:'Dallas'},

  // Batch 2 — pipeline generated
  {to:'frontdesk@midwestsmilesok.com',clinic:'Midwest Smiles',demo:'https://dentalwebai.com/demos/midwest-smiles.html',city:'Midwest City, OK'},
  {to:'PDCO1600@gmail.com',clinic:'Pediatric Dentistry of Central Ohio',demo:'https://dentalwebai.com/demos/smile-select.html',city:'Pickerington, OH'},
  {to:'riveroaks@urbndental.com',clinic:'Emergency Dentist Houston',demo:'https://dentalwebai.com/demos/bright-smile.html',city:'Houston'},
  {to:'welcome@smileselectdental.com',clinic:'Smile Select Dental',demo:'https://dentalwebai.com/demos/smile-select.html',city:'Georgia'},

  // Batch 3 — more pipeline
  {to:'hopedental900@gmail.com',clinic:'Hope & Grace Dental',demo:'https://dentalwebai.com/demos/hope-grace-dental.html',city:'USA'},
  {to:'David.A.Beber@hotmail.com',clinic:'David A. Beber DDS',demo:'https://dentalwebai.com/demos/beber-dental.html',city:'Kalispell, MT'},

  // Batch 4 — DE/NL
  {to:'info@zahnaerzte-zoo.de',clinic:'Zahnärzte am Zoo',demo:'https://dentalwebai.com/demos/zahnaerzte-am-zoo.html',city:'Düsseldorf',lang:'de'},
  {to:'tandartsmedeco@hotmail.com',clinic:'Tandartspraktijk Medeco',demo:'https://dentalwebai.com/demos/medeco-rotterdam.html',city:'Rotterdam',lang:'nl'},
  {to:'info@tptransparant.nl',clinic:'Tandartspraktijk Transparant',demo:'https://dentalwebai.com/demos/transparant-amsterdam.html',city:'Amsterdam',lang:'nl'},
  {to:'roeterseiland@studentist.nl',clinic:'Studentist',demo:'https://dentalwebai.com/demos/studentist-amsterdam.html',city:'Amsterdam',lang:'nl'},
  {to:'kontakt@zahnarzt-aschendorff.de',clinic:'Zahnarzt Aschendorff',demo:'https://dentalwebai.com/demos/aschendorff-hamburg.html',city:'Hamburg',lang:'de'},
  {to:'kontakt@zahnarzt-berlin-schoeneberg.com',clinic:'Zahnarzt Schöneberg',demo:'https://dentalwebai.com/demos/zahnarzt-schoeneberg.html',city:'Berlin',lang:'de'},
  {to:'za-georgiaursa@web.de',clinic:'Zahnarztpraxis Ursa',demo:'https://dentalwebai.com/demos/ursa-gunzburg.html',city:'Günzburg',lang:'de'},
  {to:'info@zahnspa.de',clinic:'Zahn S.P.A.',demo:'https://dentalwebai.com/demos/zahnarzt-bonn.html',city:'Bonn',lang:'de'},

  // Batch 5 — latest (already good deliverability)
  {to:'hello@dawsonmoderndentistry.com',clinic:'Dawson Modern Dentistry',demo:'https://dentalwebai.com/demos/dawson-modern-dental.html',city:'Matthews, NC'},
  {to:'allsmilesdds@yahoo.com',clinic:'All Smiles Family',demo:'https://dentalwebai.com/demos/all-smiles-clarksville.html',city:'Clarksville, TN'},
  {to:'southsidedentalpavilion@gmail.com',clinic:'Southside Dental',demo:'https://dentalwebai.com/demos/southside-dental.html',city:'Pittsburgh, PA'},
  {to:'ariadentaltx@gmail.com',clinic:'Aria Dental',demo:'https://dentalwebai.com/demos/aria-dental-sa.html',city:'San Antonio, TX'},
  {to:'graysonfamilydentalcare@gmail.com',clinic:'Grayson Family Dental',demo:'https://dentalwebai.com/demos/grayson-family-dental.html',city:'Lawrenceville, GA'},
  {to:'info@darleydentalcare.com',clinic:'Darley Dental Care',demo:'https://dentalwebai.com/demos/darley-dental.html',city:'Altamonte Springs, FL'},
  {to:'DrDimentoOffice@centralny.twcbc.com',clinic:'Syracuse Family Dental',demo:'https://dentalwebai.com/demos/syracuse-family-dental.html',city:'Syracuse, NY'},
  {to:'marinecityd@gmail.com',clinic:'Marine City Dental',demo:'https://dentalwebai.com/demos/marine-city-dental.html',city:'Marine City, MI'},
  {to:'drpalluckoffice@gmail.com',clinic:'Somerset Dental',demo:'https://dentalwebai.com/demos/somerset-dental-lv.html',city:'Las Vegas, NV'},
  {to:'MVCDTeam@gmail.com',clinic:'Montville Center for Dentistry',demo:'https://dentalwebai.com/demos/montville-dental.html',city:'Montville, NJ'},

  // Batch 6 — UK/AU/IE
  {to:'info@charltonvillagedental.co.uk',clinic:'Charlton Village Dental',demo:'https://dentalwebai.com/demos/charlton-village-dental.html',city:'London, UK'},
  {to:'admin@mirandadentalcare.com.au',clinic:'Miranda Dental Centre',demo:'https://dentalwebai.com/demos/miranda-dental-sydney.html',city:'Sydney, AU'},
  {to:'macquariedental@hotmail.com',clinic:'Macquarie Dental',demo:'https://dentalwebai.com/demos/macquarie-dental-sydney.html',city:'Sydney CBD, AU'},
  {to:'dreholistic@gmail.com',clinic:'Holistic Dental Melbourne',demo:'https://dentalwebai.com/demos/holistic-dental-melbourne.html',city:'Melbourne, AU'},
  {to:'info@artmedica.ie',clinic:'ArtMedica Dublin',demo:'https://dentalwebai.com/demos/artmedica-dublin.html',city:'Dublin, IE'},
];

// Filter out bounced
const validLeads = leads.filter(l => !bounced.has(l.to.toLowerCase()));

function buildEmail(lead) {
  const isDE = lead.lang === 'de';
  const isNL = lead.lang === 'nl';

  if (isDE) return {
    subject: `Nochmal: Kostenloser Homepage-Entwurf für ${lead.clinic}`,
    html: `<p>Guten Tag,</p><p>ich hatte Ihnen letzte Woche einen kostenlosen Homepage-Entwurf für <strong>${lead.clinic}</strong> geschickt. Vielleicht ist meine Nachricht untergegangen — deshalb hier nochmal der Link:</p><p style="font-size:1.1em"><strong>→ <a href="${lead.demo}" style="color:#2563EB">${lead.demo}</a></strong></p><p>Die Seite gehört Ihnen — kostenlos, ohne Verpflichtung.</p><p>Falls Sie Interesse an einer vollständigen Website haben, würde ich mich über 15 Minuten Ihrer Zeit freuen.</p><p>Mit freundlichen Grüßen,<br>Dmytro V.<br>DentalWebAI<br><a href="https://dentalwebai.com">dentalwebai.com</a><br>+31 6 2522 5150</p>`
  };

  if (isNL) return {
    subject: `Herinnering: gratis homepage-ontwerp voor ${lead.clinic}`,
    html: `<p>Beste,</p><p>Vorige week stuurde ik u een gratis homepage-ontwerp voor <strong>${lead.clinic}</strong>. Misschien is mijn bericht gemist — hier is de link nogmaals:</p><p style="font-size:1.1em"><strong>→ <a href="${lead.demo}" style="color:#2563EB">${lead.demo}</a></strong></p><p>De pagina is van u — gratis, vrijblijvend.</p><p>Als u interesse heeft in een volledige website, zou ik graag 15 minuten met u spreken.</p><p>Met vriendelijke groet,<br>Dmytro V.<br>DentalWebAI<br><a href="https://dentalwebai.com">dentalwebai.com</a><br>+31 6 2522 5150</p>`
  };

  return {
    subject: `Re: I redesigned ${lead.clinic}'s homepage — did you see it?`,
    html: `<p>Hi there,</p><p>I sent you a free homepage redesign for <strong>${lead.clinic}</strong> last week. In case it got buried — here's the link again:</p><p style="font-size:1.1em"><strong>→ <a href="${lead.demo}" style="color:#2563EB">${lead.demo}</a></strong></p><p>Quick recap of what's included:</p><ul><li>Modern, mobile-first design</li><li>Online booking button on every screen</li><li>Click-to-call for mobile patients</li><li>SEO optimized for "${lead.city} dentist"</li></ul><p><strong>It's yours to keep — free, no strings.</strong></p><p>If you'd like the full site (10-25 pages + booking + SEO), I'd love just 15 minutes of your time.</p><p>Best,<br>Dmytro V.<br>DentalWebAI<br><a href="https://dentalwebai.com">dentalwebai.com</a><br>+31 6 2522 5150</p>`
  };
}

async function main() {
  console.log(`\n📧 RESEND — FREE HOMEPAGE (with fixed SPF/DKIM/DMARC)`);
  console.log(`Total: ${validLeads.length} leads (${leads.length - validLeads.length} bounced removed)\n`);

  let sent = 0, failed = 0;
  for (let i = 0; i < validLeads.length; i++) {
    const lead = validLeads[i];
    const email = buildEmail(lead);
    try {
      await transporter.sendMail({
        from: 'Dmytro V. | DentalWebAI <hello@dentalwebai.com>',
        to: lead.to, replyTo: 'hello@dentalwebai.com',
        subject: email.subject, html: email.html
      });
      sent++;
      console.log(`✅ [${sent}/${validLeads.length}] ${lead.clinic} → ${lead.to}`);
    } catch (err) {
      failed++;
      console.log(`❌ ${lead.clinic}: ${err.message}`);
    }
    // 5 sec pause (safer for resend)
    if (i < validLeads.length - 1) await sleep(5000);

    // Batch pause every 15 emails
    if ((i + 1) % 15 === 0 && i < validLeads.length - 1) {
      console.log(`\n⏸  Batch pause (60 sec)...\n`);
      await sleep(60000);
    }
  }

  console.log(`\n══════════════════════════`);
  console.log(`✅ Sent: ${sent}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`══════════════════════════\n`);
}

main();
