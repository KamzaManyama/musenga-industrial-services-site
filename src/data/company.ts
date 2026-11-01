// Company and legal details used in the footer and the privacy policy.
// Values set to null are still to be confirmed by Musenga; they show as a highlighted placeholder.

export const company = {
  legalName: 'Musenga Investments (Pty) Ltd',
  registrationNumber: null as string | null, // e.g. '2010/123456/07' (CIPC)
  vatNumber: null as string | null,
  informationOfficer: null as string | null, // POPIA Information Officer (by default, the head of the company)
  email: 'info@musenga.co.za',
  careersEmail: 'info@musenga.co.za', // where job applications (CVs) go; change to e.g. careers@musenga.co.za
  phone: '+27 11 024 3412',
  address: '64 Dane Road, Glen Austin, Midrand, South Africa',
  privacyPolicyUpdated: '17 October 2026',
};

// Key facts shown in the home page hero's green bar. Change them here to update the site.
export const keyFacts = [
  { value: '2002', label: 'Established' },
  { value: '100%', label: 'Black woman‑owned' }, // non-breaking hyphen keeps "woman-owned" together
  { value: 'ISO 9001', label: 'Quality management' },
  { value: 'Grade 7', label: 'CIDB grading' },
];
