import type { Project } from "@/data/projects";

export const siteName = "AW.";
export const siteDescription =
  "AW. is a creative direction studio focused on brand systems, visual identity, product experiences, and album artwork.";
export const siteAuthor = "AW.";
export const siteEmail = "hello@yourdomain.com";
export const serviceList = [
  "Brand Identity",
  "Album Cover Design",
  "Website Design",
  "UI/UX Design",
  "Web Development",
  "Pitch Decks",
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  description: siteDescription,
  email: `mailto:${siteEmail}`,
  founder: siteAuthor,
  service: {
    "@type": "Service",
    name: "Creative direction and brand identity",
    serviceType: serviceList,
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  description: siteDescription,
};

export function getProjectSchema(project: Project, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: project.title,
    description: project.summary,
    datePublished: project.year,
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
    about: project.category,
    keywords: project.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/projects/${slug}`,
    },
  };
}
