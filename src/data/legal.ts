/* =====================================================================
   Legal facts, in one place.

   Every legal page reads from here, so when a detail changes (the VAT number
   arrives, a processor is added) it is one edit, not five.

   Confirmed by Josh, 30 July 2026:
   - Processors: GoHighLevel, ServiceM8, Netlify, and Google/Meta only once
     those are actually live. Nothing else at this time.
   - Retention: unconverted enquiries 24 months, customer records 6 years.
   - Controller: Abbey Gas (Whitby) Limited, co. no. 08134722, registered in
     England & Wales, registered office 20 Skinner Street
     (`_Specs/01 OUTSTANDING FROM CLIENT.md`, marked confirmed).

   TradeHelp is not from that list: it comes from Abbey's own Home Care Plan
   brochure, which names it as the administrator of the Plans. Plan customers'
   data reaches them, so it is a processor and has to be named.

   Meta added 28 Aug 2026 (Josh): the Meta Pixel is now live on the
   boiler-draw ad landing pages, per the 30 July line above. Codebreak added
   the same day: their own tracking script and AI qualification webhooks now
   also receive landing-page enquiry data, so they are a processor in their
   own right, not covered by the earlier list.
   ===================================================================== */

/** Publication date shown on every legal page. Update when the text changes. */
export const legalUpdated = '30 July 2026';

/* ---------------------------------------------------------------------
   OUTSTANDING — the only field still missing.
   Abbey quote prices "plus VAT", so they are VAT registered, and the
   E-Commerce Regulations require the VAT number on the website. Set it here
   and it appears everywhere it should.
   --------------------------------------------------------------------- */
export const vatNumber: string | null = null;

export type Processor = {
  name: string;
  purpose: string;
  /** Shown only where the company number is part of the public record we hold. */
  companyNo?: string;
  /** True where the service only handles data for Homecare Plan customers. */
  plansOnly?: boolean;
};

/** Named in the privacy policy. Only services that actually receive data. */
export const processors: Processor[] = [
  {
    name: 'GoHighLevel',
    purpose:
      'Our customer relationship management system. Enquiries you send through the website arrive here so we can follow them up.',
  },
  {
    name: 'ServiceM8',
    purpose:
      'Our booking and job management system. It handles online bookings and the details of the visit itself.',
  },
  {
    name: 'Netlify',
    purpose:
      'Hosts this website. Its servers keep standard technical logs, such as IP addresses, so the site can be delivered and kept secure.',
  },
  {
    name: 'TradeHelp Limited',
    companyNo: '03712438',
    plansOnly: true,
    purpose:
      'Administers the Abbey Home Care Plans on our behalf, as set out in the Plan terms. Only the details needed to run your Plan are shared.',
  },
  {
    name: 'Meta',
    purpose:
      'Runs the Meta Pixel on our advertising landing pages, which measures which adverts lead to an enquiry. Used for our own advertising only.',
  },
  {
    name: 'Codebreak',
    purpose:
      'Our marketing agency. Their tracking script on the advertising landing pages measures campaign performance for their reporting to us, and enquiries from those pages are also sent to their AI qualification system.',
  },
];

export const retention = [
  {
    what: 'Enquiries that do not become a job',
    period: '24 months',
    why: 'Long enough to pick a conversation back up, and no longer.',
  },
  {
    what: 'Customer and job records, including Homecare Plans',
    period: '6 years after your last job or the end of your Plan',
    why: 'Set by our accounting obligations and by the records we must keep for gas and electrical safety work.',
  },
];
