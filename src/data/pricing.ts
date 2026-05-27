export interface PricingTier {
  category: "Brand" | "Album";
  name: string;
  price: number;
  recommended?: boolean;
  service: string;
  features: string[];
}

export const pricing: PricingTier[] = [
  {
    category: "Brand",
    name: "Brand Starter",
    price: 700,
    service: "Brand Identity",
    features: [
      "Logo system",
      "Color & Typography tokens",
      "2 round of revisions",
      "Basic brand guide",
    ],
  },
  {
    category: "Brand",
    name: "Brand Identity",
    price: 2300,
    recommended: true,
    service: "Brand Identity",
    features: [
      "Full identity system",
      "Logo, marks & lockups",
      "Stationery & social",
      "3 rounds of revisions",
      "Comprehensive brand guide",
      "AI Marketing Content Generation",
    ],
  },
  {
    category: "Album",
    name: "Album Essential",
    price: 120,
    service: "Album Cover Design",
    features: ["Front cover artwork", "1 concept · 2 revisions", "Print-ready files"],
  },
  {
    category: "Album",
    name: "Album Premium",
    price: 350,
    recommended: true,
    service: "Album Cover Design",
    features: [
      "Front + back + inner",
      "2 concepts · unlimited revisions",
      "Streaming assets pack",
      "Vinyl/CD print files",
      "AI Content Generation",
    ],
  },
];
