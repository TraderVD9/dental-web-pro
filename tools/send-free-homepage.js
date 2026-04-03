const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', port: 587, secure: false,
  auth: { user: 'vellumcadence@gmail.com', pass: 'fhco buvj nhci rwqq' }
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

const leads = [
  { to: 'altitudedental@gmail.com', clinic: 'Altitude Dental', doctor: 'Dr. Weaver', city: 'Salt Lake City', demo: 'https://dentalwebai.com/demos/altitude-dental.html' },
  { to: 'gentledentalcarect@gmail.com', clinic: 'Gentle Dental Care', doctor: '', city: 'Plainville, CT', demo: 'https://dentalwebai.com/demos/gentle-dental.html' },
  { to: 'northwestdental@sbcglobal.net', clinic: 'Northwest Dental Care', doctor: '', city: 'Madera, CA', demo: 'https://dentalwebai.com/demos/northwest-dental.html' },
  { to: 'holisticdentallv@gmail.com', clinic: 'Holistic Dental LV', doctor: 'Dr. Brar', city: 'Las Vegas', demo: 'https://dentalwebai.com/demos/holistic-dental.html' },
  { to: 'coopersburgdental@gmail.com', clinic: 'Coopersburg Dental', doctor: '', city: 'Coopersburg, PA', demo: 'https://dentalwebai.com/demos/coopersburg-dental.html' },
  { to: 'urbansmileschicago@gmail.com', clinic: 'Urban Smiles', doctor: 'Dr. Maeng', city: 'Chicago', demo: 'https://dentalwebai.com/demos/urban-smiles.html' },
  { to: 'lakeside1550@gmail.com', clinic: 'Lakeside Family Dental', doctor: 'Dr. Perkins', city: 'Arkansas', demo: 'https://dentalwebai.com/demos/lakeside-dental.html' },
  { to: 'grin@dallasdds.net', clinic: 'HJ Dental', doctor: '', city: 'Dallas', demo: 'https://dentalwebai.com/demos/bright-smile.html' },
];
// Note: Dr. Faber and Bright Smile Chicago don't have confirmed emails — skipped
// Pine Grove doesn't have email — need to find it

function buildEmail(lead) {
  const name = lead.doctor || 'there';
  return {
    subject: `I redesigned ${lead.clinic}'s homepage — free, no strings`,
    html: `<p>Hi ${name},</p>

<p>I'm a dental website specialist and I took the liberty of redesigning <strong>${lead.clinic}</strong>'s homepage — completely free, no strings attached.</p>

<p><strong>Here it is:</strong> <a href="${lead.demo}" style="color:#2563EB;font-weight:600">${lead.demo}</a></p>

<p>Changes I made:</p>
<ul>
<li>Modern, mobile-first design that loads instantly</li>
<li>Online booking button on every screen</li>
<li>Your real reviews and ratings prominently displayed</li>
<li>Click-to-call for mobile patients</li>
<li>SEO-optimized structure for "${lead.city} dentist" searches</li>
</ul>

<p><strong>This page is yours to keep regardless.</strong> No charge, no obligation.</p>

<p>If you like what you see and want the full site redesigned (10-25 pages with booking, blog, SEO), I'd love to discuss it — 15 minutes, your schedule.</p>

<p>Best,<br>
Dmytro V.<br>
DentalWebAI | AI-Powered Dental Websites<br>
<a href="https://dentalwebai.com">dentalwebai.com</a><br>
+31 6 2522 5150</p>`
  };
}

async function main() {
  console.log(`Sending ${leads.length} FREE HOMEPAGE emails...\n`);
  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const email = buildEmail(lead);
    try {
      await transporter.sendMail({
        from: 'Dmytro V. | DentalWebAI <hello@dentalwebai.com>',
        to: lead.to, replyTo: 'hello@dentalwebai.com',
        subject: email.subject, html: email.html
      });
      console.log(`✅ ${i+1}/${leads.length} — ${lead.clinic} → ${lead.demo}`);
    } catch (err) {
      console.log(`❌ ${i+1}/${leads.length} — ${lead.clinic}: ${err.message}`);
    }
    if (i < leads.length - 1) await sleep(3000);
  }
  console.log('\nDone! 🎯');
}
main();
