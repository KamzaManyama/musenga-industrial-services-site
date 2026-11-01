// Site-wide photos, in one place so the whole site can switch photo sets with one line.
//   'musenga' – Musenga's own photos (from musenga.co.za and their project albums)
//   'local'   – the original demo photos (kept in public/assets/hero, our-work and capability)
export const IMAGE_SET: 'musenga' | 'local' = 'musenga';

export interface SiteImage { src: string; alt: string; /** CSS object-position for hero crops */ position?: string }
type Key = 'hero' | 'waste' | 'cleaning' | 'building' | 'capability';

const sets: Record<typeof IMAGE_SET, Record<Key, SiteImage>> = {
  local: {
    hero: { src: '/assets/hero/hero-image-v1.jpg', alt: 'Musenga site team reviewing building plans on a construction site' },
    waste: { src: '/assets/our-work/waste-management.jpg', alt: 'Musenga waste management team at work' },
    cleaning: { src: '/assets/our-work/cleaning-hygiene.jpg', alt: 'Musenga cleaning team at work in a washroom' },
    building: { src: '/assets/our-work/building-maintenance.jpg', alt: 'Musenga builder laying blocks on a construction site' },
    capability: { src: '/assets/capability/construction-worker-on-site.jpg', alt: 'Musenga builder laying block walls on a construction site' },
  },
  musenga: {
    hero: { src: '/assets/building/building-completed-home.jpg', alt: 'A completed Musenga double-storey home, with the site team finishing the groundworks' },
    waste: { src: '/assets/musenga/recycling-bins.jpg', alt: 'Musenga colour-coded, labelled recycling bins' },
    // Free CC0 stock photo (see public/assets/stock/CREDITS.md) until Musenga has its own cleaning photos.
    cleaning: { src: '/assets/stock/cleaning-commercial-building.jpg', alt: 'Cleaner mopping the floor of a modern commercial building', position: '50% 60%' },
    building: { src: '/assets/building/building-brickwork.jpg', alt: 'Musenga bricklayers building a double-storey house' },
    capability: { src: '/assets/building/foundation-reinforcement.jpg', alt: 'Reinforced foundations set out on a Musenga construction site' },
  },
};

export const images = sets[IMAGE_SET];
