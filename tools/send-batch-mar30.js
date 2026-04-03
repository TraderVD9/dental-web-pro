const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', port: 587, secure: false,
  auth: { user: 'vellumcadence@gmail.com', pass: 'fhco buvj nhci rwqq' }
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

const leads = [
  {
    to: 'holisticdentallv@gmail.com',
    clinic: 'Holistic Dental LV',
    city: 'Las Vegas, NV',
    issues: [
      'Your website is on a free Wix subdomain (brardmd.wixsite.com) — patients may not trust a site without its own domain',
      'No online booking — 67% of patients prefer to schedule appointments online',
      'No SEO optimization — hard to find when people search "holistic dentist Las Vegas"'
    ]
  },
  {
    to: 'info@grovecitydental.com',
    clinic: 'Grove City Dental',
    city: 'Grove City, OH',
    issues: [
      'Your old Weebly site (grovecitydentist.weebly.com) still appears in search results alongside your main site',
      'This creates duplicate content issues and confuses patients searching on mobile',
      'A web presence cleanup + modern redesign could bring 30-50% more appointment requests'
    ]
  },
  {
    to: 'wdgfrontoffice@gmail.com',
    clinic: 'Willowbrook Dental Group',
    city: 'Houston, TX',
    issues: [
      'Your Weebly site (willlowbrookdental.weebly.com) is still live and appearing in Google results',
      'The old site has no online booking, no reviews section, and loads slowly on mobile',
      'Patients who land on the Weebly version instead of your real site may leave immediately'
    ]
  },
  {
    to: 'lakeside1550@gmail.com',
    clinic: 'Lakeside Family Dental',
    city: 'Arkansas',
    issues: [
      'Your website is on a free Wix subdomain — this hurts credibility with new patients',
      'No mobile optimization — over 70% of patients search for dentists on their phones',
      'No schema markup or Google Maps integration — you\'re harder to find on Google'
    ]
  },
  {
    to: 'PDCO1600@gmail.com',
    clinic: 'Pediatric Dentistry of Central Ohio',
    city: 'Pickerington, OH',
    issues: [
      'Your Weebly site (pdco4kids.weebly.com) still appears in search results',
      'No online appointment booking for parents — they expect to schedule 24/7',
      'The Weebly design looks outdated compared to modern pediatric dental practices'
    ]
  },
  {
    to: 'riveroaks@urbndental.com',
    clinic: 'Emergency Dentist Houston',
    city: 'Houston, TX',
    issues: [
      'Your Weebly site is still indexed by Google and competes with your main site for rankings',
      'No mobile-first design — emergency searches happen 80%+ on mobile',
      'No click-to-call button — critical for emergency dental patients who need to call immediately'
    ]
  },
  {
    to: 'info@smileatfirstsight.com',
    clinic: 'Smile Health Spa NYC',
    city: 'New York, NY',
    issues: [
      'Your Weebly site (nycinvisalign.weebly.com) is still live and indexed by Google',
      'No schema markup — you\'re missing rich results (star ratings, hours) in search',
      'A professional site redesign with SEO could significantly boost your Manhattan visibility'
    ]
  },
];

function buildEmail(lead) {
  return {
    subject: `Quick question about ${lead.clinic}'s website`,
    html: `<p>Hi there,</p>
<p>I was looking for a dentist in ${lead.city} and came across ${lead.clinic}. I noticed a few things about your website that might be costing you new patients:</p>
<ul>${lead.issues.map(i => `<li>${i}</li>`).join('\n')}</ul>
<p>I build high-converting websites for dental practices using AI-powered design. My clients typically see 30–50% more appointment requests within 60 days.</p>
<p>Here are 3 live dental demos I built:</p>
<ul>
<li><a href="https://dentalwebai.com/demos/bright-smile.html">Bright Smile Dental</a> — Premium design with 3D elements</li>
<li><a href="https://dentalwebai.com/demos/alpine-dental.html">Alpine Family Dentistry</a> — Clean modern design</li>
<li><a href="https://dentalwebai.com/demos/citydent.html">CityDent Clinic</a> — Multilingual (EN/DE)</li>
</ul>
<p>Try our free dental website audit: <a href="https://dentalwebai.com/audit.html">dentalwebai.com/audit</a></p>
<p>Would you be open to a quick 10-minute call? No pitch — just value.</p>
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
      console.log(`❌ ${i+1}/${leads.length} — ${lead.clinic} (${lead.to}): ${err.message}`);
    }
    if (i < leads.length - 1) await sleep(3000);
  }
  console.log('\nDone!');
}
main();
