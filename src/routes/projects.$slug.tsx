"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RollingButtonText from "@/components/RollingButtonText";
import { fadeUp, stagger } from "@/lib/variants";
import { getProjectSchema, siteName } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
  head: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    const title = project ? `${project.title} | ${siteName}` : `${siteName} | Project`;
    const description = project ? project.summary : "Project case study from AW.";

    return {
      title,
      meta: [
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            getProjectSchema(
              project ?? {
                slug: params.slug,
                title: `${siteName} Project`,
                category: "Creative work",
                year: "",
                tags: [],
                image: { cover: {}, gallery: [] },
                summary: description,
              },
              params.slug,
            ),
          ),
        },
      ],
    };
  },
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const project = projects.find((p) => p.slug === slug);
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const isAlbumCover = project
    ? project.category.toLowerCase().includes("album") ||
      project.tags.some((t) => t.toLowerCase().includes("album"))
    : false;
  const isBrandIdentity = project
    ? project.category.toLowerCase().includes("brand") ||
      project.tags.some((t) => t.toLowerCase().includes("brand"))
    : false;

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1 flex items-center justify-center px-6 text-center">
          <div>
            <h1 className="font-head text-4xl font-semibold mb-4">Project not found</h1>
            <Link to="/" className="link-roll text-[#EB5E28]">
              <RollingButtonText text={"\u2190 Back home"} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Nav />
      <article className="pt-32 pb-24">
        {/* Hero */}
        <header className="px-6 lg:px-10 mb-16">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/"
              className="link-roll text-[11px] uppercase tracking-[0.12em] mb-8 inline-block"
              style={{ color: "var(--muted)" }}
            >
              <RollingButtonText text={"\u2190 Back to work"} />
            </Link>
            <div
              className="flex items-center gap-2 mb-6 text-[11px] uppercase tracking-[0.12em]"
              style={{ color: "var(--muted)" }}
            >
              <span className="w-2 h-2" style={{ background: "#EB5E28" }} />
              Case Study · {project.category} · {project.year}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-head font-semibold mb-8"
              style={{
                fontSize: "clamp(40px,6vw,92px)",
                letterSpacing: "-0.035em",
                lineHeight: 0.95,
              }}
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[20px] max-w-2xl"
              style={{ color: "var(--text)" }}
            >
              {project.summary}
            </motion.p>
          </div>
        </header>

        {/* Cover */}
        <div className="px-6 lg:px-10 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className={`${isAlbumCover ? "aspect-[1/1] max-w-4xl" : "aspect-[16/9] max-w-6xl"} mx-auto border overflow-hidden relative`}
            style={{ borderColor: "var(--border)" }}
          >
            {project.image.cover.background && (
              <div
                className="absolute inset-0"
                style={{ background: project.image.cover.background }}
              />
            )}
            {project.image.cover.src && project.image.cover.type === "video" ? (
              <video
                src={project.image.cover.src}
                poster={project.image.cover.poster}
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : project.image.cover.src ? (
              <img
                src={project.image.cover.src}
                alt={project.image.cover.alt ?? project.title}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : null}
          </motion.div>
        </div>

        {/* Meta row */}
        <section
          id="project-details"
          aria-labelledby="project-details-heading"
          className="px-6 lg:px-10 mb-20"
        >
          <h2 id="project-details-heading" className="sr-only">
            Project details
          </h2>
          <div
            className="max-w-6xl mx-auto border-y py-10"
            style={{ borderColor: "var(--border)" }}
          >
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <dt
                  className="text-[11px] uppercase tracking-[0.12em] mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Client
                </dt>
                <dd className="font-head text-[15px]">{project.client || project.title}</dd>
              </div>
              <div>
                <dt
                  className="text-[11px] uppercase tracking-[0.12em] mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Role
                </dt>
                <dd className="font-head text-[15px]">{project.role || project.tags.join(", ")}</dd>
              </div>
              <div>
                <dt
                  className="text-[11px] uppercase tracking-[0.12em] mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Duration
                </dt>
                <dd className="font-head text-[15px]">{project.duration || "—"}</dd>
              </div>
              <div>
                <dt
                  className="text-[11px] uppercase tracking-[0.12em] mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Year
                </dt>
                <dd className="font-head text-[15px]">
                  <time dateTime={project.year}>{project.year}</time>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Case study body */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="px-6 lg:px-10 mb-20"
        >
          <div className="max-w-3xl mx-auto space-y-16">
            {project.challenge && (
              <motion.div variants={fadeUp}>
                <SectionLabel>01 — The Challenge</SectionLabel>
                <p
                  className="font-head text-[24px] md:text-[28px] leading-snug"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {project.challenge}
                </p>
              </motion.div>
            )}
            {project.approach && (
              <motion.div variants={fadeUp}>
                <SectionLabel>02 — Approach</SectionLabel>
                <p
                  className="font-head text-[24px] md:text-[28px] leading-snug"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {project.approach}
                </p>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Gallery */}
        {project.image.gallery && project.image.gallery.length > 0 && (
          <section className="px-6 lg:px-10 mb-20">
            <div className="max-w-6xl mx-auto">
              {isAlbumCover ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="aspect-[16/7] border overflow-hidden relative"
                  style={{
                    borderColor: "var(--border)",
                    background: project.image.gallery[0].background ?? undefined,
                  }}
                >
                  {project.image.gallery[0].src && project.image.gallery[0].type === "video" ? (
                    <video
                      src={project.image.gallery[0].src}
                      poster={project.image.gallery[0].poster}
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : project.image.gallery[0].src ? (
                    <img
                      src={project.image.gallery[0].src}
                      alt={project.image.gallery[0].alt ?? project.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : null}
                </motion.div>
              ) : (
                <div className="grid md:grid-cols-2 gap-5">
                  {project.image.gallery.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.08 }}
                      className={`${i === 0 ? "md:col-span-2 aspect-[16/7]" : "aspect-[4/3]"} border overflow-hidden relative`}
                      style={{
                        borderColor: "var(--border)",
                        background: item.background ?? undefined,
                      }}
                    >
                      {item.src && item.type === "video" ? (
                        <video
                          src={item.src}
                          poster={item.poster}
                          controls
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : item.src ? (
                        <img
                          src={item.src}
                          alt={item.alt ?? project.title}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Outcome + metrics */}
        {project.outcome && (
          <section className="px-6 lg:px-10 mb-20">
            <div className="max-w-3xl mx-auto">
              <SectionLabel>03 — Outcome</SectionLabel>
              <p
                className="font-head text-[24px] md:text-[28px] leading-snug mb-12"
                style={{ letterSpacing: "-0.02em" }}
              >
                {project.outcome}
              </p>
              {project.metrics && (
                <div
                  className="grid grid-cols-3 gap-6 border-t pt-10"
                  style={{ borderColor: "var(--border)" }}
                >
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <div
                        className="font-head font-semibold leading-none"
                        style={{
                          fontSize: "clamp(28px,4vw,48px)",
                          color: "#EB5E28",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {m.value}
                      </div>
                      <div
                        className="text-[11px] uppercase tracking-[0.12em] mt-3"
                        style={{ color: "var(--muted)" }}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* CTAs */}
        <section className="px-6 lg:px-10 mb-20">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4">
            <a
              href="/#contact"
              className="btn-slick-solid inline-flex items-center gap-3 px-8 py-4 border font-head text-sm"
            >
              <RollingButtonText text={"Start a project \u2192"} />
            </a>
            {isBrandIdentity && (
              <a
                href="https://www.behance.net/serbastian"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-slick inline-flex items-center gap-3 px-8 py-4 border font-head text-sm"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              >
                <RollingButtonText text="View similar Brand Identity work on Behance" />
              </a>
            )}
            <a
              href="https://calendly.com/akaghawisdom5/client-discovery-call"
              className="btn-slick inline-flex items-center gap-3 px-8 py-4 border font-head text-sm"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              <RollingButtonText text="Book a 30-min call" />
            </a>
          </div>
        </section>

        {/* Next case study */}
        {next && next.slug !== project.slug && (
          <section
            className="px-6 lg:px-10 border-t pt-16"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="max-w-6xl mx-auto">
              <div
                className="text-[11px] uppercase tracking-[0.12em] mb-4"
                style={{ color: "var(--muted)" }}
              >
                Next case study
              </div>
              <Link to="/projects/$slug" params={{ slug: next.slug }} className="group block">
                <h3
                  className="font-head font-semibold mb-4 transition-colors group-hover:text-[#EB5E28]"
                  style={{ fontSize: "clamp(32px,5vw,64px)", letterSpacing: "-0.03em" }}
                >
                  <RollingButtonText text={`${next.title} \u2192`} className="link-roll-group" />
                </h3>
                <div
                  className={`${(next.category || "").toLowerCase().includes("album") || next.tags.some((t) => t.toLowerCase().includes("album")) ? "aspect-[1/1]" : "aspect-[16/7]"} border overflow-hidden relative`}
                  style={{
                    background: next.image.cover.background ?? undefined,
                    borderColor: "var(--border)",
                  }}
                >
                  {next.image.cover.src && next.image.cover.type === "video" ? (
                    <video
                      src={next.image.cover.src}
                      poster={next.image.cover.poster}
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : next.image.cover.src ? (
                    <img
                      src={next.image.cover.src}
                      alt={next.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : null}
                </div>
              </Link>
            </div>
          </section>
        )}
      </article>
      <Footer />
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-2 mb-5 text-[11px] uppercase tracking-[0.12em]"
      style={{ color: "var(--muted)" }}
    >
      <span className="w-2 h-2" style={{ background: "#EB5E28" }} />
      {children}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="text-[11px] uppercase tracking-[0.12em] mb-2"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </div>
      <div className="font-head text-[15px]">{value}</div>
    </div>
  );
}
