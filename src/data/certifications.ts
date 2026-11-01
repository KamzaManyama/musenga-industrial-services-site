// Registrations and certifications, taken from Musenga's current website.
// Confirm validity and wording with Musenga before publishing.
// To add a certificate download, put the PDF in public/assets/certifications/
// and set `document` on the entry, e.g. document: '/assets/certifications/iso-9001.pdf'.

export interface Registration {
  name: string;
  body: string;
  detail: string;
  logo?: string;
  document?: string;
}

export interface Division {
  /** Matches the service slug so service pages can link to /certifications/#<id>. */
  id: string;
  title: string;
  serviceHref: string;
  registrations: Registration[];
}

export const iso = {
  name: 'ISO 9001:2015',
  title: 'Quality management system',
  detail: 'Musenga’s quality management system is compliant with ISO 9001:2015, covering waste management, cleaning and hygiene, and building construction and maintenance.',
};

export const divisions: Division[] = [
  {
    id: 'building-maintenance',
    title: 'Civil & building construction',
    serviceHref: '/services/building-maintenance/',
    registrations: [
      { name: 'CIDB 7CE PE', body: 'Construction Industry Development Board', detail: 'Grade 7 registration for civil engineering works.', logo: '/assets/certifications/cidb.png' },
      { name: 'CIDB 7GB PE', body: 'Construction Industry Development Board', detail: 'Grade 7 registration for general building works.', logo: '/assets/certifications/cidb.png' },
      { name: 'CIDB 5EB PE', body: 'Construction Industry Development Board', detail: 'Grade 5 registration for electrical engineering works (building).', logo: '/assets/certifications/cidb.png' },
      { name: 'NHBRC', body: 'National Home Builders Registration Council', detail: 'Registered home builder.', logo: '/assets/certifications/nhbrc.png' },
      { name: 'Registered Electrical Contractor', body: 'Department of Labour', detail: 'Registered with the Department of Labour as an electrical contractor.', logo: '/assets/certifications/department-of-labour.png' },
    ],
  },
  {
    id: 'cleaning-hygiene',
    title: 'Cleaning & hygiene',
    serviceHref: '/services/cleaning-hygiene/',
    registrations: [
      { name: 'NCCA', body: 'National Contract Cleaners Association', detail: 'Member of the national contract cleaning industry body.', logo: '/assets/certifications/ncca.png' },
      { name: 'BEECA', body: 'BEECA Cleaning Association', detail: 'Member of the BEECA cleaning association.', logo: '/assets/certifications/beeca.png' },
      { name: 'BCCCI', body: 'Bargaining Council for the Contract Cleaning Services Industry', detail: 'Registered with the contract cleaning industry’s bargaining council.', logo: '/assets/certifications/bccci.png' },
    ],
  },
  {
    id: 'waste-management',
    title: 'Waste management',
    serviceHref: '/services/waste-management/',
    registrations: [
      { name: 'City of Tshwane', body: 'City of Tshwane', detail: 'Registered waste service provider with the municipality.' },
      { name: 'GWIS', body: 'Gauteng Waste Information System', detail: 'Registered on the provincial waste information system.' },
      { name: 'IWMSA', body: 'Institute of Waste Management of Southern Africa', detail: 'Member of the regional waste management professional body.' },
      { name: 'Wastehub', body: 'Wastehub', detail: 'Registered on the Wastehub platform.' },
    ],
  },
];

/** Unique logos for the "Registered with" strip on the About page. */
export const logos = [
  { src: '/assets/certifications/cidb.png', alt: 'Construction Industry Development Board (CIDB)' },
  { src: '/assets/certifications/nhbrc.png', alt: 'National Home Builders Registration Council (NHBRC)' },
  { src: '/assets/certifications/department-of-labour.png', alt: 'Department of Labour' },
  { src: '/assets/certifications/ncca.png', alt: 'National Contract Cleaners Association (NCCA)' },
  { src: '/assets/certifications/beeca.png', alt: 'BEECA Cleaning Association' },
  { src: '/assets/certifications/bccci.png', alt: 'Bargaining Council for the Contract Cleaning Services Industry (BCCCI)' },
];
