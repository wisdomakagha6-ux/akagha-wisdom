export type Testimonial = {
  name: string;
  role: string;
  company?: string;
  testimonial: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Mariam Adeyemi",
    role: "Founder",
    company: "Licha Studio",
    testimonial:
      "Wisdom translated a rough vision into a brand world that felt immediate, precise, and emotionally true. Every touchpoint arrived with intention.",
  },
  {
    name: "Daniel Korie",
    role: "Marketing Lead",
    company: "REDMUR Digitals",
    testimonial:
      "The rebrand gave us clarity and confidence. What stood out most was the pacing of the process and how polished the final system felt.",
  },
  {
    name: "Feychi",
    role: "Recording Artist",
    company: "Independent",
    testimonial:
      "He understood the mood before we could fully describe it. The artwork carried the same emotional weight as the music, without ever feeling overworked.",
  },
];
