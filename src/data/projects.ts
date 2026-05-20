export interface CaseStudySection {
  heading: string
  body: string
}

export interface Project {
  slug: string
  title: string
  category: string
  year: string
  tags: string[]
  cover: string
  summary: string
  client?: string
  role?: string
  duration?: string
  challenge?: string
  approach?: string
  outcome?: string
  metrics?: { label: string; value: string }[]
  sections?: CaseStudySection[]
  gallery?: string[] // CSS backgrounds for visual blocks
}

const defaultMetrics = (a: string, b: string, c: string) => [
  { label: 'Engagement lift', value: a },
  { label: 'Delivery time', value: b },
  { label: 'Client NPS', value: c },
]

export const projects: Project[] = [
  {
    slug: 'hocl-labs',
    title: 'HOCL Labs',
    category: 'Brand Identity · Website',
    year: '2025',
    tags: ['Branding', 'Web'],
    cover: 'linear-gradient(135deg,#1a1a1a 0%,#3a2418 100%)',
    summary: 'A precision-driven identity system for an industrial chemistry lab.',
    client: 'HOCL Industrial',
    role: 'Brand lead, Web design',
    duration: '10 weeks',
    challenge: 'HOCL needed an identity that conveyed scientific rigor without feeling sterile — and a website that translated highly technical capabilities into something specifiers could quickly evaluate.',
    approach: 'We led discovery interviews with engineers and procurement leads, then built a modular type-and-grid system anchored by a custom monogram. The website pairs an editorial information architecture with downloadable spec sheets and a live capabilities matrix.',
    outcome: 'The new brand shipped across web, print, and trade-show collateral in 10 weeks. Inbound qualified leads rose 2.4× in the first quarter, and average sales-cycle time dropped by a third.',
    metrics: defaultMetrics('+240%', '10 wks', '9.4 / 10'),
    gallery: [
      'linear-gradient(135deg,#1a1a1a 0%,#3a2418 100%)',
      'linear-gradient(135deg,#2a1a0e 0%,#0f0a06 100%)',
      'linear-gradient(135deg,#3a2418 0%,#1a1a1a 100%)',
    ],
  },
  {
    slug: 'fragile-base',
    title: 'Fragile Base',
    category: 'Album Cover · Type',
    year: '2025',
    tags: ['Music', 'Typography'],
    cover: 'linear-gradient(135deg,#2a1a3a 0%,#0f0f1e 100%)',
    summary: 'A typographic record sleeve exploring memory and decay.',
    client: 'Independent artist',
    role: 'Art direction, Type design',
    duration: '6 weeks',
    challenge: 'The artist wanted a sleeve that felt physical and degraded — a counterpoint to the album\'s electronic textures — while remaining legible at thumbnail size on streaming platforms.',
    approach: 'We custom-drew a display face with eroded counters, then printed and scanned every cover variant on uncoated stock so the artwork carried real-world noise. A reductive grid keeps the type system disciplined across the LP, EP, and merch.',
    outcome: 'The record charted independently in three territories and the cover was featured in two design annuals.',
    metrics: defaultMetrics('+180%', '6 wks', '10 / 10'),
    gallery: [
      'linear-gradient(135deg,#2a1a3a 0%,#0f0f1e 100%)',
      'linear-gradient(135deg,#1e1428 0%,#06060f 100%)',
      'linear-gradient(135deg,#0f0f1e 0%,#2a1a3a 100%)',
    ],
  },
  {
    slug: 'aesthetic-origins',
    title: 'Aesthetic Origins',
    category: 'Pitch Deck · Brand',
    year: '2024',
    tags: ['Deck', 'Branding'],
    cover: 'linear-gradient(135deg,#3a2a1a 0%,#1a0f08 100%)',
    summary: 'Investor narrative for a beauty-tech platform.',
    client: 'Aesthetic Origins',
    role: 'Narrative + deck design',
    duration: '4 weeks',
    challenge: 'A pre-seed founder needed to convert eight weeks of customer research into a 12-slide deck that would close their first institutional round.',
    approach: 'We mapped the story to a problem → insight → wedge → ask arc, designed bespoke charts for the market data, and rehearsed delivery alongside the founder. Every visual was built to be screenshot-friendly.',
    outcome: 'The round closed 3× oversubscribed within five weeks of the deck shipping.',
    metrics: defaultMetrics('3× round', '4 wks', '10 / 10'),
    gallery: [
      'linear-gradient(135deg,#3a2a1a 0%,#1a0f08 100%)',
      'linear-gradient(135deg,#241810 0%,#080504 100%)',
      'linear-gradient(135deg,#1a0f08 0%,#3a2a1a 100%)',
    ],
  },
  {
    slug: 'tafuta',
    title: 'Tafuta',
    category: 'Product · Web App',
    year: '2024',
    tags: ['Product', 'UX'],
    cover: 'linear-gradient(135deg,#0f2a2a 0%,#06181c 100%)',
    summary: 'Search-first interface design for an African travel platform.',
    client: 'Tafuta',
    role: 'Product design lead',
    duration: '14 weeks',
    challenge: 'Tafuta\'s users were dropping out of the booking funnel because the search experience asked the same questions four times in slightly different ways.',
    approach: 'We rebuilt the funnel around a single intent-rich query bar, designed a results page that mixes editorial recommendations with live availability, and partnered with engineering on a new component library to ship the change in one release.',
    outcome: 'Search-to-booking conversion rose 38% in the first month, and the team retired three legacy flows.',
    metrics: defaultMetrics('+38%', '14 wks', '9.1 / 10'),
    gallery: [
      'linear-gradient(135deg,#0f2a2a 0%,#06181c 100%)',
      'linear-gradient(135deg,#0a1f1f 0%,#030c0e 100%)',
      'linear-gradient(135deg,#06181c 0%,#0f2a2a 100%)',
    ],
  },
  {
    slug: 'sunnakids',
    title: 'SunnaKids',
    category: 'Brand · Identity',
    year: '2024',
    tags: ['Brand', 'Illustration'],
    cover: 'linear-gradient(135deg,#2a2a0f 0%,#1a1a06 100%)',
    summary: 'A warm and playful identity for a children-focused publisher.',
    client: 'SunnaKids',
    role: 'Brand + illustration direction',
    duration: '8 weeks',
    challenge: 'A children\'s publisher needed an identity that read as both joyful and trustworthy to parents — without leaning on the visual clichés of the category.',
    approach: 'We commissioned a small illustration crew, designed a flexible wordmark with friendly counters, and built a library of character expressions that scale from packaging to in-app stickers.',
    outcome: 'Pre-orders for the launch title hit goal in four days. The system is now applied across 14 titles and a learning app.',
    metrics: defaultMetrics('+220%', '8 wks', '9.6 / 10'),
    gallery: [
      'linear-gradient(135deg,#2a2a0f 0%,#1a1a06 100%)',
      'linear-gradient(135deg,#1f1f0b 0%,#0e0e04 100%)',
      'linear-gradient(135deg,#1a1a06 0%,#2a2a0f 100%)',
    ],
  },
  {
    slug: 'real-estate-platform',
    title: 'Real Estate Platform',
    category: 'Web · Product',
    year: '2025',
    tags: ['Web', 'Product'],
    cover: 'linear-gradient(135deg,#1a1a2a 0%,#0a0a18 100%)',
    summary: 'An editorial property browsing experience.',
    client: 'Confidential',
    role: 'Design lead',
    duration: '12 weeks',
    challenge: 'A boutique brokerage wanted a browsing experience that felt closer to a design magazine than a portal — without sacrificing the search filters power users expected.',
    approach: 'We led with a long-form listing template inspired by editorial print, then layered a quiet, persistent filter rail that surfaces only when the visitor signals intent. Imagery is treated with consistent grading rules so the catalog feels curated.',
    outcome: 'Time on listing pages doubled and direct-to-agent enquiries rose 64% in the launch quarter.',
    metrics: defaultMetrics('+64%', '12 wks', '9.5 / 10'),
    gallery: [
      'linear-gradient(135deg,#1a1a2a 0%,#0a0a18 100%)',
      'linear-gradient(135deg,#12121e 0%,#04040c 100%)',
      'linear-gradient(135deg,#0a0a18 0%,#1a1a2a 100%)',
    ],
  },
]
