// One entry per service. Each entry becomes a page at /services/<slug>/
// using the template in src/pages/services/[slug].astro.
// To add a service, add an entry here. To change a page's wording, edit its entry.

import { images } from './images';

export interface Offering {
  title: string;
  text: string;
}

/** One tile in the service page tile grid. Tiles with an `image` are photo tiles; the rest are text tiles. */
export interface ShowcaseTile {
  category: string;
  title: string;
  text: string;
  image?: string;
  /** Which part of the photo to keep when cropped, e.g. 'left center'. */
  imagePosition?: string;
  /** Short list shown in the tile's footer line. */
  items?: string[];
  /** Optional detail, e.g. sizes. */
  spec?: string;
}

/**
 * Tile grid on a service page, laid out like an editorial magazine grid:
 *   row 1: [tiles[0] wide photo] [tiles[1] photo] [tiles[2] text]
 *   row 2: [tiles[3] text] [cta: green promo tile] [tiles[4] wide photo]
 */
export interface Showcase {
  label: string;
  tiles: [ShowcaseTile, ShowcaseTile, ShowcaseTile, ShowcaseTile, ShowcaseTile];
  cta: { title: string; text: string; label: string };
}

export interface Service {
  slug: string;
  number: string;
  category: string;
  title: string;
  /** Short name used in buttons, e.g. "Discuss a waste management project". */
  shortName: string;
  /** Must match an <option> in the contact form so it can be preselected. */
  formOption: string;
  tagline: string;
  /** Short heading for the overview section. */
  headline: string;
  /** Hero heading line 2 (regular + bold), e.g. "from source to" + "disposal." */
  heroLine2: string;
  heroLine2Bold: string;
  summary: string;
  intro: string[];
  heroImage: string;
  heroAlt: string;
  /** Optional CSS object-position for the hero crop */
  heroPosition?: string;
  /** Image beside the overview. Falls back to the hero image when not set. */
  featureImage?: string;
  featureAlt?: string;
  offerings: Offering[];
  credentials: string;
  /** Optional dark photo section (e.g. fleet & equipment, or project photos). */
  showcase?: Showcase;
  /** Optional stats banner shown between "What we offer" and the tile section. */
  stats?: { value: string; label: string }[];
}

export const services: Service[] = [
  {
    slug: 'waste-management',
    number: '01',
    category: 'Environment',
    title: 'Waste management',
    shortName: 'waste management',
    formOption: 'Waste management',
    tagline: 'Responsible handling of general and hazardous waste, from separation to safe disposal.',
    headline: 'Managing waste safely, from source to disposal.',
    heroLine2: 'from source to',
    heroLine2Bold: 'disposal.',
    summary: 'Waste separation, recycling and the safe disposal of general and hazardous waste, plus waste-bin supply for suburbs and residential complexes.',
    intro: [
      'Waste management is where Musenga began in 2002, and it remains at the heart of what we do. We help public- and private-sector clients manage waste safely, responsibly and in line with regulatory requirements.',
      'From separating recyclables at source to the safe disposal of hazardous materials, our teams handle the full waste stream, so our clients can focus on running their operations.',
    ],
    // Hero: free CC0 stock photo (public/assets/stock/CREDITS.md). Overview: Musenga's own photo.
    heroImage: '/assets/stock/waste-recycling-bales.jpg',
    heroAlt: 'Bales of sorted plastic at a recycling site',
    featureImage: images.waste.src,
    featureAlt: images.waste.alt,
    offerings: [
      { title: 'Waste separation', text: 'Sorting waste at source so recyclable materials are recovered and less goes to landfill.' },
      { title: 'Recycling', text: 'Collection and processing of recyclable materials, reducing environmental impact.' },
      { title: 'General waste disposal', text: 'Reliable collection and safe disposal of general waste for sites of every size.' },
      { title: 'Hazardous waste', text: 'Safe handling and disposal of hazardous waste in line with the relevant regulations.' },
      { title: 'Waste-bin supply', text: 'Supply of waste bins to suburbs and residential complexes.' },
    ],
    credentials: 'Registered with the relevant municipal and provincial waste bodies, and backed by our ISO 9001:2015 quality management system.',
    stats: [
      { value: '2002', label: 'Providing waste services since' },
      { value: '6–28 m³', label: 'Skip sizes on offer' },
      { value: '3', label: 'Collection vehicle types' },
      { value: 'ISO 9001', label: 'Quality management' },
    ],
    showcase: {
      label: 'Fleet & equipment',
      tiles: [
        { category: 'Vehicles', title: 'Collection fleet', image: '/assets/waste/compactor-truck.jpg', text: 'Our own trucks keep collection routes and skip swaps on schedule.', items: ['Compactor truck', 'Skip loader truck', 'Collection truck'] },
        { category: 'Containers', title: 'Skips & bins', image: '/assets/waste/skip-bins.jpg', text: 'Skips placed on site and swapped when full.', spec: '6 · 11 · 18 · 28 m³' },
        { category: 'Hazardous waste', title: 'Safe handling, start to finish', text: 'Marked, closed containers keep hazardous waste separate until it is disposed of safely. We also respond to minor oil and chemical spills and asbestos clean-up.', items: ['Hazardous containers', 'Spill response', 'Asbestos clean-up'] },
        { category: 'Recycling', title: 'Separated at source', text: 'Labelled bins and bulk bags on site, with sorters where needed, so recyclables go to the right stream.', items: ['Bulk bags', 'Sorting station'] },
        { category: 'Equipment', title: 'Recycling equipment', image: '/assets/waste/baling-machine.jpg', text: 'Balers, compactors and waste scales turn sorted waste into recyclable bales.', items: ['Baling machine', 'Waste compactors', 'Waste scales', '0.5-cube Bobcat'] },
      ],
      cta: { title: 'Need a skip or a collection?', text: 'Tell us about your site and we’ll recommend the right containers and schedule.', label: 'Discuss your site' },
    },
  },
  {
    slug: 'cleaning-hygiene',
    number: '02',
    category: 'Facilities',
    title: 'Cleaning & hygiene',
    shortName: 'cleaning',
    formOption: 'Cleaning and hygiene',
    tagline: 'Commercial and industrial cleaning that keeps your sites clean, hygienic and safe.',
    headline: 'Clean, hygienic spaces, tailored to every site.',
    heroLine2: 'tailored to',
    heroLine2Bold: 'every site.',
    summary: 'Commercial and industrial cleaning and hygiene services for public- and private-sector clients, tailored to each site’s needs.',
    intro: [
      'Clean, hygienic spaces matter to the people who use them. Musenga provides commercial and industrial cleaning and hygiene services to public- and private-sector clients across a wide range of sites.',
      'Every site is different, so we tailor each service to the client’s requirements, from routine cleaning schedules to specialised hygiene needs.',
    ],
    heroImage: images.cleaning.src,
    heroAlt: images.cleaning.alt,
    heroPosition: images.cleaning.position,
    featureImage: '/assets/musenga/cleaner-emptying-bins.jpg',
    featureAlt: 'Musenga cleaner emptying waste bins in a washroom',
    offerings: [
      { title: 'Commercial cleaning', text: 'Regular cleaning for offices, public buildings and commercial spaces.' },
      { title: 'Industrial cleaning', text: 'Cleaning for industrial sites and facilities with more demanding requirements.' },
      { title: 'Hygiene services', text: 'Hygiene services that keep washrooms and shared spaces safe and sanitary.' },
      { title: 'Tailored programmes', text: 'Cleaning schedules and scopes designed around each client’s site and needs.' },
    ],
    credentials: 'Members of the relevant cleaning industry bodies, and backed by our ISO 9001:2015 quality management system.',
  },
  {
    slug: 'building-maintenance',
    number: '03',
    category: 'Built environment',
    title: 'Building & maintenance',
    shortName: 'construction',
    formOption: 'Building construction and maintenance',
    tagline: 'Turnkey construction, refurbishment and maintenance, from a single stand to a full development.',
    headline: 'From a single stand to a full development.',
    heroLine2: 'built to',
    heroLine2Bold: 'last.',
    summary: 'Turnkey construction, refurbishment and maintenance, from building on client-owned stands to full residential developments.',
    intro: [
      'Musenga’s civil and building division delivers construction, refurbishment and maintenance for public- and private-sector clients.',
      'We offer turnkey house construction, both as a developer, buying stands and building homes, and for clients who already own a stand and want it built on.',
    ],
    // Hero: free CC0 stock photo (public/assets/stock/CREDITS.md). Overview: Musenga's own photo.
    heroImage: '/assets/stock/building-site-workers.jpg',
    heroAlt: 'Two construction workers in hard hats on a building site, seen from above',
    featureImage: images.building.src,
    featureAlt: images.building.alt,
    offerings: [
      { title: 'Turnkey house construction', text: 'Complete home building as a developer, from acquiring stands to handing over finished houses.' },
      { title: 'Building on your stand', text: 'Construction for clients who already own a stand and want a home built on it.' },
      { title: 'Refurbishment', text: 'Renovation and refurbishment of existing buildings.' },
      { title: 'Building maintenance', text: 'Ongoing maintenance that keeps buildings safe, functional and in good condition.' },
      { title: 'Civil works', text: 'Civil construction delivered by a CIDB-registered contractor.' },
    ],
    credentials: 'CIDB-graded and NHBRC-registered, with registered electrical contractor status and our ISO 9001:2015 quality management system.',
    stats: [
      { value: '109', label: 'Low-cost houses for the Gauteng Province' },
      { value: '200–1 000 m²', label: 'Home sizes we build' },
      { value: 'Grade 7', label: 'CIDB civil & building' },
      { value: '2002', label: 'Building our reputation since' },
    ],
    showcase: {
      label: 'Our work',
      tiles: [
        { category: 'Foundations', title: 'Built on solid ground', image: '/assets/building/foundation-concrete-pour.jpg', text: 'Set out, reinforced and poured by our own site teams.', items: ['Reinforcement', 'Concrete pours', 'Slabs'] },
        { category: 'Buildings', title: 'Homes & buildings', image: '/assets/building/building-completed-home.jpg', text: 'Turnkey homes on estates and private stands.', spec: '200 m² – 1 000 m²' },
        { category: 'Refurbishment', title: 'Refurbishment & maintenance', text: 'Keeping existing buildings safe, sound and looking their best.', items: ['Demolition & brickwork', 'Drywalling', 'Roof repairs', 'Waterproofing', 'Painting', 'Electrical & plumbing'] },
        { category: 'Track record', title: '109 houses', text: 'Low-cost houses built for the Gauteng Provincial Government.', items: ['Public sector', 'Low-cost housing'] },
        { category: 'Roads', title: 'Roads & surfacing', image: '/assets/building/roads-asphalt-surfacing.jpg', imagePosition: 'left center', text: 'Estate and access roads, surfaced, compacted and marked for safe everyday use.', items: ['Asphalt surfacing', 'Compaction', 'Speed humps & markings'] },
      ],
      cta: { title: 'Planning a build?', text: 'From a single stand to a full development, tell us what you have in mind.', label: 'Discuss your project' },
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
