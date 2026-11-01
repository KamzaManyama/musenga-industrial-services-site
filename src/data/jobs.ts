// Job openings. Each entry becomes a page at /careers/<slug>/ (template: src/pages/careers/[slug].astro).
// To add a job, add an entry. Jobs past their closing date are left out automatically when the site is built.
// The structure follows how South African roles are advertised on LinkedIn and local job boards:
// job details → about the role → key responsibilities → minimum requirements → advantageous →
// skills → what we offer → how to apply (+ response, employment equity and POPIA notices).

export interface Job {
  slug: string;
  /** Short job reference applicants quote, e.g. MUS-BM-2601 (division code + year + number). */
  reference: string;
  title: string;
  division: 'Waste management' | 'Cleaning & hygiene' | 'Building & maintenance' | 'Head office';
  location: string;
  type: 'Permanent' | 'Fixed-term contract' | 'Project-based';
  /** YYYY-MM-DD */
  closingDate: string;
  reportsTo: string;
  workingHours: string;
  salary: string;
  experienceLevel: string;
  /** One-line summary (hero intro, listings, search results). */
  summary: string;
  /** "About the role" paragraphs. */
  about: string[];
  responsibilities: string[];
  requirements: string[];
  advantageous: string[];
  skills: string[];
}

/** What Musenga offers, shown on every job page. Confirm with Musenga before launch. */
export const whatWeOffer = [
  'A market-related salary, based on your experience.',
  'On-the-job training and opportunities to grow across our three divisions.',
  'A safe, well-managed working environment.',
  'The chance to make a difference in the communities we work in.',
];

export const jobs: Job[] = [
  {
    slug: 'site-supervisor-construction',
    reference: 'MUS-BM-2601',
    title: 'Site Supervisor',
    division: 'Building & maintenance',
    location: 'Gauteng (site-based)',
    type: 'Fixed-term contract',
    closingDate: '2026-12-15',
    reportsTo: 'Project Manager',
    workingHours: 'Monday to Friday, 07:00 – 17:00, and Saturdays when the programme requires',
    salary: 'Market related',
    experienceLevel: 'Mid-level (5+ years)',
    summary: 'Lead day-to-day work on residential construction sites, keeping projects safe, on schedule and to quality standards.',
    about: [
      'Our building and maintenance division delivers turnkey residential construction, refurbishment and maintenance for public- and private-sector clients across Gauteng.',
      'As Site Supervisor you will run daily operations on site, from setting out to handover, making sure work is done safely, on time, within budget and to specification.',
    ],
    responsibilities: [
      'Oversee daily site operations from setting out through to completion and handover.',
      'Plan and allocate the daily work of site teams, and coordinate subcontractors, suppliers and site labour.',
      'Enforce health and safety on site in line with the OHS Act and Construction Regulations, including toolbox talks and inspections.',
      'Read and interpret drawings, specifications and the construction programme.',
      'Inspect workmanship and materials against plans and quality requirements.',
      'Order and manage building materials and keep track of deliveries.',
      'Keep the site diary and submit daily and weekly progress reports to the Project Manager.',
      'Identify and resolve problems on site before they affect the programme.',
    ],
    requirements: [
      'National Diploma in Building, Construction Management or a relevant trade qualification.',
      'At least 5 years’ experience on construction sites, including 3 years in a supervisory role.',
      'Experience on residential building projects.',
      'Working knowledge of the OHS Act and Construction Regulations, 2014.',
      'Ability to read and interpret building drawings.',
      'Valid Code B (08) driver’s licence and own reliable transport.',
    ],
    advantageous: [
      'Registration with the SACPCMP.',
      'Experience on NHBRC-enrolled projects.',
      'A valid first aid certificate.',
      'Experience using programme software such as MS Project.',
    ],
    skills: ['Leadership', 'Communication', 'Problem solving', 'Planning and time management', 'Computer literacy (MS Office)'],
  },
  {
    slug: 'cleaning-team-leader',
    reference: 'MUS-CH-2601',
    title: 'Cleaning Team Leader',
    division: 'Cleaning & hygiene',
    location: 'Midrand, Gauteng',
    type: 'Permanent',
    closingDate: '2026-11-30',
    reportsTo: 'Contract Manager',
    workingHours: 'Shift-based, including weekends and public holidays when required',
    salary: 'Market related',
    experienceLevel: 'Supervisory (2+ years)',
    summary: 'Lead a cleaning team at a commercial client site, making sure every area meets our cleaning and hygiene standards.',
    about: [
      'Our cleaning and hygiene division provides commercial and industrial cleaning and hygiene services to public- and private-sector clients.',
      'As Cleaning Team Leader you will lead the team at a client site in Midrand, making sure the site is cleaned to standard every day and that the client is happy with our service.',
    ],
    responsibilities: [
      'Lead, schedule and supervise a team of cleaners across shifts.',
      'Allocate daily duties and make sure cleaning schedules are followed.',
      'Carry out daily inspections and keep cleaning and hygiene checklists up to date.',
      'Train new team members on procedures, equipment and the safe use of cleaning chemicals.',
      'Manage cleaning stock, consumables and equipment, and report shortages early.',
      'Keep attendance records and complete incident reports.',
      'Act as the day-to-day contact for the client on site and resolve queries quickly.',
      'Make sure health and safety rules and PPE requirements are followed.',
    ],
    requirements: [
      'Grade 12 (Matric) or equivalent.',
      'At least 2 years’ experience in commercial cleaning, including 1 year leading a team.',
      'Knowledge of commercial cleaning equipment, chemicals and dilution ratios.',
      'Able to work shifts, weekends and public holidays when required.',
      'Reliable transport to and from the site.',
    ],
    advantageous: [
      'A valid driver’s licence.',
      'A first aid or health and safety certificate.',
      'Experience in a contract cleaning environment.',
      'Basic computer literacy for reports and checklists.',
    ],
    skills: ['Leadership', 'Client communication', 'Attention to detail', 'Organisation', 'Problem solving'],
  },
  {
    slug: 'waste-collection-driver',
    reference: 'MUS-WM-2601',
    title: 'Waste Collection Driver',
    division: 'Waste management',
    location: 'Tshwane, Gauteng',
    type: 'Permanent',
    closingDate: '2026-11-20',
    reportsTo: 'Fleet and Operations Supervisor',
    workingHours: 'Monday to Saturday, early-morning collection shifts',
    salary: 'Market related',
    experienceLevel: 'Experienced (3+ years)',
    summary: 'Drive a waste collection truck on scheduled routes, collecting general waste and recyclables safely and on time.',
    about: [
      'Our waste management division provides waste collection, separation, recycling and safe disposal for municipalities, residential complexes and businesses.',
      'As a Waste Collection Driver you will operate a collection vehicle on scheduled routes in Tshwane, leading a small crew and making sure every collection is completed safely and on time.',
    ],
    responsibilities: [
      'Drive the waste collection vehicle safely on scheduled routes.',
      'Lead the collection crew and make sure every stop on the route is serviced.',
      'Carry out daily pre-trip and post-trip vehicle inspections.',
      'Deliver collected waste and recyclables to the correct disposal or recycling facility.',
      'Complete trip sheets, weighbridge slips and route records accurately.',
      'Report vehicle defects, incidents and missed collections immediately.',
      'Follow road traffic, health and safety, and waste handling regulations at all times.',
    ],
    requirements: [
      'Valid Code C1 or EC driver’s licence with a valid Professional Driving Permit (PrDP).',
      'At least 3 years’ experience driving trucks, preferably in waste collection.',
      'A clean driving record.',
      'Grade 10 or higher.',
      'Willing to start early and work Saturdays.',
    ],
    advantageous: [
      'PrDP endorsed for dangerous goods (D).',
      'Good knowledge of routes in the Tshwane area.',
      'Experience with recyclable separation at source.',
    ],
    skills: ['Safe driving', 'Reliability', 'Teamwork', 'Time management', 'Record keeping'],
  },
  {
    slug: 'general-worker-waste-sorting',
    reference: 'MUS-WM-2602',
    title: 'General Worker – Waste Sorting',
    division: 'Waste management',
    location: 'Midrand, Gauteng',
    type: 'Project-based',
    closingDate: '2026-11-25',
    reportsTo: 'Site Supervisor',
    workingHours: 'Monday to Friday, day shift, with overtime when required',
    salary: 'Market related',
    experienceLevel: 'Entry level',
    summary: 'Sort and separate waste and recyclables at our Midrand site, helping more material get recycled instead of going to landfill.',
    about: [
      'We separate waste at source so that more material is recycled and less goes to landfill.',
      'As a General Worker you will join our sorting team at a project site in Midrand. Training is provided, and we give preference to people who live near the site.',
    ],
    responsibilities: [
      'Sort waste into recyclable streams such as plastics, paper, metals and glass.',
      'Load and unload waste and recyclable materials safely.',
      'Keep the sorting area clean, safe and organised.',
      'Wear the PPE provided and follow all health and safety rules.',
      'Report hazardous items or unsafe conditions to the supervisor straight away.',
    ],
    requirements: [
      'Able to read and write.',
      'Physically fit and able to do manual work.',
      'Willing to work overtime when required.',
      'Living in or near Midrand.',
    ],
    advantageous: [
      'Previous experience in recycling or waste sorting.',
      'Grade 10 or higher.',
    ],
    skills: ['Teamwork', 'Reliability', 'Attention to detail', 'Following safety procedures'],
  },
  {
    slug: 'bricklayer',
    reference: 'MUS-BM-2602',
    title: 'Bricklayer',
    division: 'Building & maintenance',
    location: 'Gauteng (site-based)',
    type: 'Project-based',
    closingDate: '2026-12-05',
    reportsTo: 'Site Supervisor',
    workingHours: 'Monday to Friday, 07:00 – 17:00, and Saturdays when the programme requires',
    salary: 'Market related',
    experienceLevel: 'Skilled (3+ years)',
    summary: 'Build quality block and brick walls on our residential construction projects, working to plans and site standards.',
    about: [
      'Our building and maintenance division builds homes for developers and for clients building on their own stands.',
      'As a Bricklayer you will build foundations, walls and other brickwork on residential sites, working with the site team to keep the project on schedule.',
    ],
    responsibilities: [
      'Lay bricks and blocks for foundations, walls and other structures according to drawings.',
      'Set out and check work for level, plumb and alignment.',
      'Mix mortar to the correct specification.',
      'Install lintels, wall ties and damp-proof courses where specified.',
      'Keep the work area tidy and follow site health and safety rules.',
      'Guide and support general workers on your team.',
    ],
    requirements: [
      'A bricklaying trade test, or at least 3 years’ proven bricklaying experience.',
      'Able to read basic building drawings.',
      'Experience on residential construction sites.',
      'Physically fit and able to work outdoors.',
    ],
    advantageous: [
      'An NQF qualification in bricklaying.',
      'Plastering experience.',
      'Your own basic hand tools.',
    ],
    skills: ['Accuracy', 'Quality workmanship', 'Teamwork', 'Reading drawings', 'Following safety procedures'],
  },
  {
    slug: 'sheq-officer',
    reference: 'MUS-HO-2601',
    title: 'SHEQ Officer',
    division: 'Head office',
    location: 'Midrand, Gauteng (with site travel)',
    type: 'Permanent',
    closingDate: '2026-12-10',
    reportsTo: 'SHEQ Manager',
    workingHours: 'Monday to Friday, 08:00 – 17:00, with site visits',
    salary: 'Market related',
    experienceLevel: 'Mid-level (3+ years)',
    summary: 'Support safety, health, environment and quality across our construction, cleaning and waste sites.',
    about: [
      'Safety, health, environment and quality (SHEQ) run through everything we do, backed by our ISO 9001:2015 quality management system.',
      'As SHEQ Officer you will work with our SHEQ Manager to keep every site safe and compliant, from construction projects to cleaning contracts and waste operations.',
    ],
    responsibilities: [
      'Carry out site inspections, risk assessments and safety audits.',
      'Prepare and maintain health and safety files for each project.',
      'Run safety inductions and toolbox talks for site teams.',
      'Investigate incidents, report findings and follow up corrective actions.',
      'Support the ISO 9001:2015 quality management system, including internal audits and document control.',
      'Make sure PPE, first aid and emergency procedures are in place on every site.',
      'Keep SHEQ records and reports up to date for clients and auditors.',
    ],
    requirements: [
      'National Diploma in Safety Management, Environmental Health or similar.',
      'SAMTRAC or an equivalent health and safety qualification.',
      'At least 3 years’ SHEQ experience in construction, cleaning or waste management.',
      'Good working knowledge of the OHS Act, Construction Regulations 2014 and ISO 9001.',
      'Valid Code B (08) driver’s licence and willingness to travel between sites.',
    ],
    advantageous: [
      'Registration with the SACPCMP as a Construction Health and Safety Officer.',
      'ISO 45001 or ISO 14001 internal auditor training.',
      'First aid level 2 or 3.',
    ],
    skills: ['Attention to detail', 'Report writing', 'Training and facilitation', 'Communication', 'Computer literacy (MS Office)'],
  },
  {
    slug: 'tender-administrator',
    reference: 'MUS-HO-2602',
    title: 'Tender Administrator',
    division: 'Head office',
    location: 'Midrand, Gauteng',
    type: 'Permanent',
    closingDate: '2026-11-27',
    reportsTo: 'Tender Manager',
    workingHours: 'Monday to Friday, 08:00 – 17:00, with extra hours near submission deadlines',
    salary: 'Market related',
    experienceLevel: 'Mid-level (2+ years)',
    summary: 'Prepare and submit complete, compliant tender documents for public- and private-sector opportunities.',
    about: [
      'Much of our work comes through public- and private-sector tenders, where accuracy and deadlines matter.',
      'As Tender Administrator you will support our Tender Manager in finding opportunities and preparing complete, compliant submissions on time.',
    ],
    responsibilities: [
      'Monitor eTenders, municipal websites and other portals for relevant opportunities.',
      'Prepare tender documents, including SBD and MBD forms, pricing schedules and returnable documents.',
      'Keep company compliance documents current, including CSD registration, tax compliance, B-BBEE and CIDB certificates.',
      'Attend compulsory briefing sessions and record important requirements.',
      'Track deadlines and make sure every submission is complete and delivered on time.',
      'Keep a register of submitted tenders and their outcomes.',
    ],
    requirements: [
      'Diploma in Business Administration, Procurement or a related field.',
      'At least 2 years’ experience in tender administration, preferably for public-sector tenders.',
      'Working knowledge of the CSD and eTenders, and of SBD and MBD forms.',
      'Strong MS Word and Excel skills.',
      'Valid driver’s licence.',
    ],
    advantageous: [
      'Experience with CIDB grading and construction tenders.',
      'Experience with municipal tenders in Gauteng.',
    ],
    skills: ['Attention to detail', 'Working to deadlines', 'Organisation', 'Written communication', 'Computer literacy (MS Office)'],
  },
];

/** Jobs still open at build time, soonest closing first. */
export const openJobs = () => {
  const today = new Date().toISOString().slice(0, 10);
  return jobs.filter((j) => j.closingDate >= today).sort((a, b) => a.closingDate.localeCompare(b.closingDate));
};

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso + 'T12:00:00'));
