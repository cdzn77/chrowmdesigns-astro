# Inquiry and consultation measurements

October 4, 2026. Contact form and analytics source reviewed at website main commit 282e5e5.

## Automated inquiry checks

Run `npm run test:leads`. The integrated test executes the real ContactForm script and analytics.ts against the real form markup in a local DOM. CAPTCHA and network boundaries are mocked; it never sends a real message or calls Google Analytics. The existing analytics and CAPTCHA lifecycle tests run alongside it.

Checks cover successful delivery emitting one generate_lead event with only form_id=studio_contact; HTTP400/403/429/500 and network errors preserving entered data without a lead; missing CAPTCHA and invalid email preventing delivery; duplicate pending submissions; and consent declined/unset preventing analytics. No names, email addresses or message text enter the analytics event. The contact event must never become a consultation booking event.

25 checks passed. This verifies client behavior, not live provider receipt. A production HTTP success alone does not prove Netlify stored the inquiry or that GA4 received its event.

## Live inquiry acceptance test

1. Use the existing contact form and complete its normal CAPTCHA. Opt into analytics for the tracking test.
2. Submit one clearly marked internal test inquiry using a controlled email address. Record time and page. Verify the entry in Netlify Forms and the intended inbox independently.
3. In GA4 DebugView or Realtime, verify one generate_lead event for the test and form_id=studio_contact. Inspect parameters for accidental personal information.
4. After reporting delay, refresh the Monitor Analytics window and verify that the event is included. Keep inquiry count separate from qualified leads and people.
5. Record the actual receipt and GA evidence in Monitor Settings only after both are confirmed. Local tests alone must not set the live-verification note.

No live test submission was sent by this task. Hosted browser inspection remains restricted, and source tests do not bypass that restriction.

## Consultation bookings

The owner confirmed there is no booking service yet. The booking outcome is Not configured. Do not map link clicks, contact inquiries, page views or a fabricated event to a completed booking.

When a service is chosen, use its verified booking-completed callback/webhook or supported analytics integration. Acceptance cases: confirmed booking counts once; opening/abandoning the scheduler counts zero; failed booking counts zero; duplicate callbacks do not duplicate the business record; cancel/reschedule are recorded separately; consent and privacy rules are retained. End-to-end verification requires an actual configured service and a controlled test appointment.
