"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { fadeUp, sectionReveal, slowStagger } from "@/lib/variants";

export default function Projects() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <motion.section
      id="work"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={sectionReveal}
      className="px-6 lg:px-10 py-24 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <motion.div
        variants={fadeUp}
        className="mb-16 flex items-end justify-between gap-6 flex-wrap"
      >
        <div>
          <div
            className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "var(--muted)" }}
          >
            <span className="w-2 h-2" style={{ background: "#EB5E28" }} />
            Selected Work · 2024–2026
          </div>
          <h2
            className="font-head font-semibold"
            style={{ fontSize: "clamp(32px,4vw,56px)", letterSpacing: "-0.025em" }}
          >
            Things I've shipped.
          </h2>
        </div>
        <p className="max-w-sm text-[14px]" style={{ color: "var(--muted)" }}>
          A curated cross-section of recent identity, album cover, and AI marketing contents.
        </p>
      </motion.div>
      <motion.div variants={slowStagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={i}
            hoveredSlug={hoveredSlug}
            onHoverChange={setHoveredSlug}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
