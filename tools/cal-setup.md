# Cal.com Setup Guide for DentalWebPro

## Account Setup
1. Go to cal.com → Sign up (free plan)
2. Username: dentalwebpro
3. Timezone: Europe/Amsterdam

## Event Types to Create

### 1. Free Website Audit (Discovery Call)
- Duration: 15 minutes
- Title: "Free Dental Website Audit"
- Description: "I'll analyze your current website live and show you exactly what's costing you patients. No pitch, just actionable insights."
- Location: Google Meet or Zoom
- Booking questions:
  - What's your clinic name? (required)
  - What's your current website URL? (optional)
  - How many dentists work at your practice? (required)
- Buffer: 5 min before, 10 min after
- Availability: Mon-Fri 9:00-17:00 CET
- Minimum notice: 24 hours
- Max bookings per day: 4

### 2. Project Kickoff
- Duration: 30 minutes
- Title: "Website Project Kickoff"
- Description: "Let's discuss your new website — design preferences, content needs, and timeline."
- Location: Google Meet or Zoom
- Only visible after client signs contract
- Availability: Mon-Fri 10:00-16:00 CET
- Buffer: 10 min before, 10 min after
- Max bookings per day: 2

## Integration
- After setup, embed in DentalWebPro landing:
  `<a href="https://cal.com/dentalwebpro/audit" class="btn btn--primary">Book Free Audit</a>`
- Add to email signature
- Add to LinkedIn profile

## Automation (Webhooks)
- On new booking → send Telegram notification
- On booking complete → trigger follow-up email (24h later)
