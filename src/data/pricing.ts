export interface PricingTier {
  category: 'Brand' | 'Album'
  name: string
  price: number
  recommended?: boolean
  service: string
  features: string[]
}

export const pricing: PricingTier[] = [
  {
    category: 'Brand',
    name: 'Brand Starter',
    price: 1200,
    service: 'Brand Identity',
    features: ['Logo system', 'Color & type tokens', '1 round of revisions', 'Basic brand guide'],
  },
  {
    category: 'Brand',
    name: 'Brand Identity',
    price: 2800,
    recommended: true,
    service: 'Brand Identity',
    features: [
      'Full identity system',
      'Logo, marks & lockups',
      'Stationery & social',
      '3 rounds of revisions',
      'Comprehensive brand guide',
    ],
  },
  {
    category: 'Album',
    name: 'Album Essential',
    price: 380,
    service: 'Album Cover Design',
    features: ['Front cover artwork', '1 concept · 2 revisions', 'Print-ready files'],
  },
  {
    category: 'Album',
    name: 'Album Premium',
    price: 780,
    recommended: true,
    service: 'Album Cover Design',
    features: ['Front + back + inner', '2 concepts · unlimited revisions', 'Streaming assets pack', 'Vinyl/CD print files'],
  },
]
