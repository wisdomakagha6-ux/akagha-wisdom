"use client";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { fadeUp } from "@/lib/variants";
import RollingButtonText from "./RollingButtonText";

export default function ProjectCard({
  project,
  index,
  hoveredSlug,
  onHoverChange,
}: {
  project: Project;
  index: number;
  hoveredSlug: string | null;
  onHoverChange: (slug: string | null) => void;
}) {
  const cover = project.image.cover;
  const isAlbumCover =
    project.category.toLowerCase().includes("album") ||
    project.tags.some((t) => t.toLowerCase().includes("album"));
  const dimmed = hoveredSlug !== null && hoveredSlug !== project.slug;

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onHoverStart={() => onHoverChange(project.slug)}
      onHoverEnd={() => onHoverChange(null)}
    >
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="motion-card group relative block overflow-hidden border"
        style={{
          borderColor: hoveredSlug === project.slug ? "rgba(235, 94, 40, 0.35)" : "var(--border)",
          opacity: dimmed ? 0.42 : 1,
          transform: hoveredSlug === project.slug ? "translateY(-4px)" : "translateY(0)",
          boxShadow:
            hoveredSlug === project.slug ? "0 24px 56px rgba(0, 0, 0, 0.14)" : "none",
        }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-1 z-10 transition-transform origin-top scale-y-0 group-hover:scale-y-100 duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ background: "#EB5E28" }}
        />
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 1.05 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.14 + index * 0.06 },
            },
          }}
          className={`${isAlbumCover ? "aspect-[1/1]" : "aspect-[4/3]"} w-full overflow-hidden relative`}
          style={cover.background ? { background: cover.background } : undefined}
        >
          {cover.src && cover.type === "video" ? (
            <video
              src={cover.src}
              poster={cover.poster}
              controls
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: hoveredSlug === project.slug ? "scale(1.02)" : "scale(1)" }}
            />
          ) : cover.src ? (
            <img
              src={cover.src}
              alt={cover.alt ?? project.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: hoveredSlug === project.slug ? "scale(1.02)" : "scale(1)" }}
            />
          ) : null}
        </motion.div>
        <div className="p-6 transition-colors" style={{ background: "var(--surface)" }}>
          <div
            className="flex items-center justify-between mb-3 text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "var(--muted)" }}
          >
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="font-head text-2xl font-semibold tracking-[-0.02em] mb-3">
            <RollingButtonText text={project.title} className="link-roll-group" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-[0.12em] px-2 py-1 border transition-colors group-hover:border-[#EB5E28]/40 group-hover:text-[#EB5E28]/70"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div
          className="absolute inset-0 ring-0 group-hover:ring-1 transition-all duration-300 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 0 rgba(235,94,40,0.3)" }}
        />
      </Link>
    </motion.div>
  );
}
