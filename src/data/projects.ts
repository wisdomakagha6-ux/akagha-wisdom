export interface CaseStudySection {
  heading: string;
  body: string;
}

export type ProjectMedia = {
  src?: string;
  alt?: string;
  background?: string;
  type?: "image" | "video";
  poster?: string;
};

export interface ProjectImage {
  cover: ProjectMedia;
  gallery?: ProjectMedia[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  image: ProjectImage;
  summary: string;
  client?: string;
  role?: string;
  duration?: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  metrics?: { label: string; value: string }[];
  sections?: CaseStudySection[];
}

const defaultMetrics = (a: string, b: string, c: string) => [
  { label: "Engagement lift", value: a },
  { label: "Delivery time", value: b },
  { label: "Client NPS", value: c },
];

export const projects: Project[] = [
  {
    slug: "Jutech",
    title: "Jutech Horizon Developments Ltd.",
    category: "Brand Identity · Logo Design",
    year: "2026",
    tags: ["Branding", "Client Project"],
    image: {
      cover: { src: "/house.gif" },
      gallery: [{ src: "/jutech-font-color.jpg" }, { src: "/truck.gif" }, { src: "/jutech.jpg" }],
    },
    summary:
      "A precision-built identity system for a Nigerian multi-disciplinary construction company entering the market with a premium, infrastructure-led positioning.",
    client: "Jutech Horizon Developments Ltd.",
    role: "Brand Identity Designer",
    duration: "3-4 weeks",
    challenge:
      "Jutech Horizon Developments launched as a completely new construction company without any existing visual foundation, requiring the entire identity system to be built from the ground up. The challenge was creating a mark that could simultaneously communicate construction, engineering reliability, maritime strength, and large-scale urban development without becoming visually overcrowded or generic within the highly repetitive construction industry.",
    approach:
      "The identity system was developed around a custom symbol engineered to merge three structural references into a single recognizable form: a construction hard hat representing safety and industrial execution, a ship anchor symbolizing stability and strength, and the cutout silhouette of high-rise buildings to reinforce urban development and architectural growth. Rather than relying on excessive visual complexity, the mark uses controlled negative space and geometric reduction to create a symbol that feels engineered rather than illustrated.\n\nThe typography system was intentionally restrained to a single Host Grotesk family to maintain clarity, readability, and consistency across technical and corporate applications. The simplicity of the type system allows the symbol itself to carry the majority of the brand personality while keeping communications structured and professional.\n\nThe color palette combines navy blue, gold, and gray to position the company between industrial credibility and premium perception. Navy establishes trust and structural authority, gold introduces ambition and executive-level sophistication, while gray reinforces the engineering and infrastructural foundation of the brand. Extensive moodboarding and industry research informed the final visual direction, ensuring the identity felt contemporary, scalable, and distinctive within Nigeria’s construction sector.",
    outcome:
      "The final identity system established a strong visual foundation for Jutech Horizon Developments as a new entrant in the construction industry. The brand successfully balances technical professionalism with premium market positioning, creating a cohesive system capable of scaling across signage, corporate materials, safety gear, digital applications, and future real estate developments. The project positioned the company with a level of visual maturity typically associated with long-established infrastructure brands.",
    metrics: defaultMetrics("+150%", "4 wks", "10 / 10"),
  },
  {
    slug: "REDMUR Digitals",
    title: "REDMUR Digitals",
    category: "Brand Identity · Logo Design",
    year: "2024",
    tags: ["Branding", "Client Project"],
    image: {
      cover: { src: "/redmur.gif" },
      gallery: [
        { src: "/redmur-font-color.jpg" },
        { src: "/redmur.gif" },
        { src: "/redmur-identity.jpeg" },
      ],
    },
    summary:
      "A strategic rebrand for a Nigerian media-tech startup focused on digital growth, automation, and online brand relevance.",
    client: "REDMUR Digitals",
    role: "Brand Identity Designer",
    duration: "4-5 weeks",
    challenge:
      "Unlike building an identity from scratch, REDMUR required a careful rebrand that preserved the familiarity of its existing visual presence while evolving the brand into something more refined, scalable, and technology-driven. The challenge was balancing continuity and transformation — modernizing the identity without disconnecting the company from the visual elements its audience already recognized. The existing color system, typography direction, and overall brand tone needed to remain familiar while the identity itself gained more clarity, confidence, and digital maturity.",
    approach:
      "The rebrand focused on refinement rather than reinvention. Instead of discarding the brand’s visual equity, the system was rebuilt around its strongest existing assets. The logo was redesigned to feel cleaner, sharper, and more adaptive across digital environments while maintaining recognizable characteristics from the previous identity.\n\nThe retained color palette became a strategic anchor throughout the rebrand, helping preserve audience familiarity while allowing the updated logo system and layouts to introduce a stronger sense of structure and professionalism. Typography and composition were treated with a more controlled digital-first approach, emphasizing cleaner spacing, stronger hierarchy, and a more modular visual rhythm aligned with modern SaaS and media-tech aesthetics.\n\nThe overall identity direction reflects REDMUR’s role as a company simplifying online growth through automation, content systems, and digital management tools. Visual decisions leaned into precision, clarity, and scalability — ensuring the brand could function consistently across social media, web interfaces, presentations, and future software-related touchpoints.",
    outcome:
      "The final rebrand elevated REDMUR from a visually inconsistent startup identity into a more cohesive and technologically mature brand system. By preserving key recognizable elements while modernizing execution, the project strengthened the company’s credibility, improved consistency across digital applications, and positioned REDMUR with a more competitive presence within Nigeria’s growing media-tech and digital solutions space.",
    metrics: defaultMetrics("+180%", "4 wks", "10 / 10"),
  },
  {
    slug: "10-6 Pizza",
    title: "10-6 Pizza",
    category: "Brand Identity · Logo Design",
    year: "2026",
    tags: ["Branding", "Passion Project"],
    image: {
      cover: { src: "/pizza-box.gif" },
      gallery: [
        { src: "/pizza-font-color.jpg" },
        { src: "/pizza-box.gif" },
        { src: "/delivery-man.jpg" },
      ],
    },
    summary:
      "A nocturnal identity system for a conceptual pizza brand designed around the lifestyle of night-active individuals, built as a full branding and packaging exploration.",
    client: "Design Challenge",
    role: "Brand Identity Designer & Concept Creator",
    duration: "1 week",
    challenge:
      "The project originated as an Instagram design challenge requiring a full brand identity system for a pizza brand, including packaging, visual identity, and promotional applications. The central challenge was not just creating a pizza brand, but designing a lifestyle identity for people who operate outside traditional daytime rhythms — individuals who are active at night, emotionally detached from conventional schedules, and culturally aligned with late-hour urban energy. The brand needed to feel like it belongs to a time period rather than a demographic.",
    approach:
      "The identity was built around the concept of nocturnal belonging. The slogan “For Those the Day Forgot” became the conceptual anchor, influencing every visual decision. The system leans heavily into low-light atmosphere, muted contrasts, and cinematic darkness to simulate a world that exists after conventional hours.\n\nThe typographic system is structured and utilitarian but softened through spatial breathing and ambient placement, reflecting the quiet intensity of nighttime activity. The logo system is designed to feel like signage seen in dim street environments — clear enough to read, but never loud.\n\nColor plays a critical narrative role: deep, desaturated tones dominate the system, likely anchored in dark neutrals and subdued accent hues that mimic artificial nighttime lighting — street lamps, neon reflections, and indoor warm glows. This contrast between warmth and darkness reinforces the emotional tension of night culture: isolation vs comfort, hunger vs stillness, movement vs silence.\n\nThe packaging system extends the concept into physical experience. Pizza boxes and branded assets are treated not as commercial packaging, but as artifacts of late-night consumption — objects that exist in quiet moments rather than busy commercial environments. The layouts likely emphasize minimal hierarchy, bold negative space, and strong typographic placement designed to be legible under imperfect lighting conditions.\n\nAcross all applications, the system behaves more like a lifestyle universe than a restaurant brand — where identity is shaped by time-of-day psychology rather than traditional food branding conventions.",
    outcome:
      "The final system establishes 10-6 Pizza as a conceptual brand rooted in nocturnal culture and emotional timing rather than conventional hospitality branding. It successfully transforms a pizza identity into a narrative environment, where every visual decision reinforces the experience of night-based living. The result is a cohesive brand world that feels immersive, atmospheric, and culturally specific, extending beyond food into identity and mood.",
    metrics: defaultMetrics("+—", "4 wks", "10 / 10"),
  },
  {
    slug: "Licha",
    title: "Licha",
    category: "Album Cover",
    year: "2026",
    tags: ["Album Cover", "Client Project"],
    image: {
      cover: { src: "/licha-cover.jpg" },
      gallery: [
        { src: "/licha.png" },
        { background: "linear-gradient(135deg,#0a1f1f 0%,#030c0e 100%)" },
        { background: "linear-gradient(135deg,#06181c 0%,#0f2a2a 100%)" },
      ],
    },
    summary:
      "A romantic, cinematic album cover designed as a Valentine’s release visual centered on intimacy, atmosphere, and surreal night symbolism.",
    client: "Feychi",
    role: "Album Cover Designer",
    duration: "1 week",
    challenge:
      "The objective was to design a romantic album cover that visually captures intimacy and emotional depth while aligning with a Valentine’s Day release strategy. The artwork needed to feel cinematic, emotionally charged, and instantly readable as a love-centered narrative piece in a crowded digital streaming environment.",
    approach:
      "The composition is built around a central romantic scene: a couple standing closely and passionately in a field of roses, acting as the emotional anchor of the artwork. The environment is set at night, creating a quiet, intimate atmosphere where the darkness enhances emotional focus rather than obscuring it.\n\nA visible moon sits in the sky as a symbolic emotional guide, reinforcing themes of longing and romantic illumination. The typography for “LICHA” is treated not as flat text but as a cloud-like atmospheric form, blending into the sky rather than sitting on top of the composition. This creates a dreamlike integration between title and environment.\n\nA warm reddish tonal grading is applied across the entire scene, reinforcing passion, romance, and emotional warmth while ensuring the roses and subject matter feel unified within a single color narrative. The contrast between the dark night sky, red tonal wash, and soft moonlight establishes depth and cinematic mood separation.",
    outcome:
      "The final artwork delivers a strongly narrative romantic identity that visually reinforces the emotional tone of the track. The combination of symbolic elements (moon, roses, couple interaction, and atmospheric typography) creates a cohesive Valentine’s-focused visual that translates effectively across streaming platforms and social media promotion.",
    metrics: defaultMetrics("Platform Ready", "1 wk", "10 / 10"),
  },
  {
    slug: "E No Sad",
    title: "E No Sad",
    category: "Album Cover",
    year: "2026",
    tags: ["Album Cover", "Client Project"],
    image: {
      cover: { src: "/e-no-sad-cover.jpg" },
      gallery: [
        { src: "/e-no-sad.png" },
        { background: "linear-gradient(135deg,#1f1f0b 0%,#0e0e04 100%)" },
        { background: "linear-gradient(135deg,#1a1a06 0%,#2a2a0f 100%)" },
      ],
    },
    summary:
      "A concept-driven single cover designed as a visual interpretation of modern digital communication and emotional expression.",
    client: "Lawly Cho",
    role: "Album Cover Designer",
    duration: "5 days",
    challenge:
      "The goal was to visually translate a multi-artist collaboration into a single unified concept while reflecting the emotional tone of the title “E NO SAD.” The design needed to feel contemporary, relatable, and rooted in modern digital interaction culture.",
    approach:
      "The entire visual concept is structured around an iPhone iMessage group chat interface, featuring Lawly Cho, Yu Flazzy, and Xproff as participants in a shared conversation. This choice transforms the cover into a narrative device rather than a static image, placing the viewer directly inside the communication space between the artists.\n\nThe chat UI becomes the core compositional framework, replacing traditional imagery with digital interaction as the storytelling medium. This reinforces themes of friendship, collaboration, and emotional reassurance implied by the track title.\n\nTypography and interface elements are preserved in a way that mimics real mobile UI behavior, creating authenticity and immediacy. The minimal visual environment ensures that the message content and artist interaction remain the primary focus.",
    outcome:
      "The final artwork presents a culturally relevant and instantly recognizable concept that connects music, digital communication, and everyday social behavior. It strengthens relatability by grounding the visual identity in a familiar smartphone interface.",
    metrics: defaultMetrics("Platform Ready", "5 days", "10 / 10"),
  },
  {
    slug: "Painful Love",
    title: "Painful Love",
    category: "Album Cover",
    year: "2025",
    tags: ["Album Cover", "Client Project"],
    image: {
      cover: { src: "/painful-love-cover.jpg" },
      gallery: [
        { src: "/painful-love.png" },
        { background: "linear-gradient(135deg,#12121e 0%,#04040c 100%)" },
        { background: "linear-gradient(135deg,#0a0a18 0%,#1a1a2a 100%)" },
      ],
    },
    summary:
      "A mixed-media emotional cover exploring heartbreak through AI-generated symbolism and manual compositing techniques.",
    client: "Meechgan",
    role: "Album Cover Designer",
    duration: "1 week",
    challenge:
      "The objective was to create a visually striking representation of emotional heartbreak for “Painful Love” while integrating AI-generated imagery into a manually composed design system. The artwork needed to feel emotionally raw, symbolic, and visually impactful for streaming platforms.",
    approach:
      "The central visual foundation was generated using AI to create a broken glass heart structure, serving as the symbolic core of emotional fragmentation and heartbreak. This AI-generated base was then refined and integrated manually to ensure compositional control and visual clarity.\n\nAdditional visual elements, including roses and the fragmented “Painful Love” text treatment, were manually placed and adjusted to create contrast between organic emotion (roses) and structural damage (broken glass heart). This layering approach reinforces the tension between love and emotional rupture.\n\nThe combination of AI generation and manual design intervention reflects a hybrid workflow, where machine-generated assets are used as foundational material and refined through human artistic direction.",
    outcome:
      "The final cover delivers a powerful emotional statement through symbolic contrast and hybrid production methods. It strengthens the visual identity of the track by combining AI-assisted imagery with intentional design craftsmanship, resulting in a dramatic and memorable streaming-ready artwork.",
    metrics: defaultMetrics("Platform Ready", "1–2 wks", "10 / 10"),
  },
];
