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
  {
    to: 'admin@roachfamilydentistry.com',
    clinic: 'Roach Family Dentistry',
    city: 'Nashville, TN',
    issues: [
      'Your website is on a free Weebly subdomain (greenhillsdentist.weebly.com) — this can hurt patient trust before they even walk in',
      'No online booking — 67% of patients prefer to schedule appointments online',
      'No SEO optimization — your competitors in Nashville rank higher for "dentist Green Hills"'
    ]
  },
  {
    to: 'info@jodyjonesdds.com',
    clinic: 'Jody Jones DDS',
    city: 'Nashville, TN',
    issues: [
      'Your Wix site (jodyjonesdds.wixsite.com) still appears in search results alongside your main site — this confuses patients and splits your SEO',
      'The Wix version has no mobile optimization or schema markup',
      'Your Music Row location deserves a website that matches the quality of your cosmetic dentistry work'
    ]
  },
  {
    to: 'info@lcfdentistry.com',
    clinic: 'La Canada Flintridge Dentistry',
    city: 'La Canada, CA',
    issues: [
      'Your site is on a free Weebly subdomain — patients in La Canada expect a premium web presence',
      'No online booking integration — you\'re losing patients who want to schedule after hours',
      'No schema markup or local SEO — your practice is harder to find on Google Maps'
    ]
  },
  {
    to: 'houyoshidds@gmail.com',
    clinic: 'Steven Y. Hou DDS',
    city: 'California',
    issues: [
      'Your website is on a free Weebly subdomain — this doesn\'t reflect the quality of your practice',
      'No mobile-responsive design — over 70% of patients search on their phones',
      'No online booking, no patient reviews section, no Google Maps integration'
    ]
  },
  {
    to: 'gardengrovedental@gmail.com',
    clinic: 'Westgrove Dental Care',
    city: 'Garden Grove, CA',
    issues: [
      'Your site is on a free Weebly subdomain (gardengrovedentistry.weebly.com) — patients may question the professionalism',
      'No online booking — your competitors in Garden Grove offer 24/7 scheduling',
      'No SEO setup — you\'re invisible for "dentist Garden Grove CA" searches'
    ]
  },
  {
    to: 'grin@dallasdds.net',
    clinic: 'HJ Dental',
    city: 'Dallas, TX',
    issues: [
      'Your website is on a free WordPress.com subdomain — this hurts credibility with new patients',
      'No mobile optimization, no online booking, no schema markup',
      'Your Dallas competitors have modern sites with PageSpeed scores of 90+ — yours loads significantly slower'
    ]
  },
  {
    to: 'info@trudentistryaustin.com',
    clinic: 'TRU Dentistry Austin',
    city: 'Austin, TX',
    issues: [
      'Your old Weebly site (trudentistryaustin.weebly.com) is still live and appearing in search results — this confuses patients and splits your traffic',
      'The Weebly version has no SEO, no booking, and looks outdated compared to your main site',
      'Cleaning up your web presence could improve your Google ranking significantly'
    ]
  },
  {
    to: 'info@austindentalworks.com',
    clinic: 'Austin Dental Works',
    city: 'Austin, TX',
    issues: [
      'Your old Weebly site (austindentalworks1.weebly.com) is still live and indexable by Google — this hurts your SEO by creating duplicate content',
      'Patients searching on mobile may land on the Weebly version instead of your real site',
      'A web presence cleanup + SEO boost could bring in 30-50% more appointment requests'
    ]
  },
];

function buildEmail(lead) {
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
      await sleep(3000);
    }
  }

  console.log('\nDone!');
}

main();
