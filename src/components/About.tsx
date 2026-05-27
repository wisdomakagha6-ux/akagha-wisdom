"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/variants";
import About3D from "./About3D";

const stats = [
  { n: "5+", l: "Years experience" },
  { n: "20+", l: "Creative projects" },
  { n: "24h", l: "Reply window" },
];

export default function About() {
  const [mediaError, setMediaError] = useState(false);
  const media = {
    src: "/public/profile.jpeg",
    alt: "About cover",
    type: "image" as "image" | "video",
    poster: "/images/about-cover-poster.jpg",
  };

  const showMedia = !!media.src && !mediaError;

  return (
    <section
      className="relative overflow-hidden px-6 lg:px-10 py-24 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <About3D />
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "#EB5E28" }} />
          <div
            className="aspect-[4/5] w-full ml-4 border overflow-hidden relative"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            {showMedia && media.type === "video" ? (
              <video
                src={media.src}
                poster={media.poster}
                controls
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setMediaError(true)}
              />
            ) : showMedia ? (
              <img
                src={media.src}
                alt={media.alt}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setMediaError(true)}
              />
            ) : null}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
        >
          <div
            className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "var(--muted)" }}
          >
            <span className="w-2 h-2" style={{ background: "#EB5E28" }} />
            About
          </div>

          <h2
            className="font-head font-semibold mb-8"
            style={{ fontSize: "clamp(32px,4vw,56px)", letterSpacing: "-0.025em" }}
          >
            Creative direction rooted in culture, identity, and visual storytelling.
          </h2>

          <p className="text-[15px] mb-6 max-w-xl" style={{ color: "var(--muted)" }}>
            I'm an independent creative director and brand designer with over 5 years of experience
            building visual identities, leading rebrands, and designing album artwork for emerging
            artists, startups, and ambitious companies.
          </p>

          <p className="text-[15px] mb-12 max-w-xl" style={{ color: "var(--muted)" }}>
            My experience includes leading the visual rebrand for REDMUR Digitals and creating brand
            identity systems for companies like Jutech Horizon Developments Ltd, alongside cover art
            direction for artists including Feychi, Lawly Cho, and Meechgan.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.l}
                className="p-5 border"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div
                  className="font-head text-3xl font-semibold"
                  style={{ color: "#EB5E28", letterSpacing: "-0.03em" }}
                >
                  {s.n}
                </div>
                <div
                  className="mt-2 text-[11px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--muted)" }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
