export interface Project {
  slug: string
  title: string
  category: string
  year: string
  tags: string[]
  cover: string
  summary: string
}

export const projects: Project[] = [
  {
    slug: 'hocl-labs',
    title: 'HOCL Labs',
    category: 'Brand Identity · Website',
    year: '2025',
    tags: ['Branding', 'Web'],
    cover: 'linear-gradient(135deg,#1a1a1a 0%,#3a2418 100%)',
    summary: 'A precision-driven identity system for an industrial chemistry lab.',
  },
  {
    slug: 'fragile-base',
    title: 'Fragile Base',
    category: 'Album Cover · Type',
    year: '2025',
    tags: ['Music', 'Typography'],
    cover: 'linear-gradient(135deg,#2a1a3a 0%,#0f0f1e 100%)',
    summary: 'A typographic record sleeve exploring memory and decay.',
  },
  {
    slug: 'aesthetic-origins',
    title: 'Aesthetic Origins',
    category: 'Pitch Deck · Brand',
    year: '2024',
    tags: ['Deck', 'Branding'],
    cover: 'linear-gradient(135deg,#3a2a1a 0%,#1a0f08 100%)',
    summary: 'Investor narrative for a beauty-tech platform.',
  },
  {
    slug: 'tafuta',
    title: 'Tafuta',
    category: 'Product · Web App',
    year: '2024',
    tags: ['Product', 'UX'],
    cover: 'linear-gradient(135deg,#0f2a2a 0%,#06181c 100%)',
    summary: 'Search-first interface design for an African travel platform.',
  },
  {
    slug: 'sunnakids',
    title: 'SunnaKids',
    category: 'Brand · Identity',
    year: '2024',
    tags: ['Brand', 'Illustration'],
    cover: 'linear-gradient(135deg,#2a2a0f 0%,#1a1a06 100%)',
    summary: 'A warm and playful identity for a children-focused publisher.',
  },
  {
    slug: 'real-estate-platform',
    title: 'Real Estate Platform',
    category: 'Web · Product',
    year: '2025',
    tags: ['Web', 'Product'],
    cover: 'linear-gradient(135deg,#1a1a2a 0%,#0a0a18 100%)',
    summary: 'An editorial property browsing experience.',
  },
]
