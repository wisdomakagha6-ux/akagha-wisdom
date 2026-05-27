"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { fadeUp, sectionReveal, slowStagger } from "@/lib/variants";

export default function Testimonials() {
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  return (
    <motion.section
      id="testimonials"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={sectionReveal}
      className="px-6 lg:px-10 py-24 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <motion.div variants={fadeUp} className="max-w-md lg:sticky lg:top-32 lg:self-start">
          <div
            className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "var(--muted)" }}
          >
            <span className="w-2 h-2" style={{ background: "#EB5E28" }} />
            What Clients Say
          </div>
          <h2
            className="font-head font-semibold"
            style={{ fontSize: "clamp(32px,4vw,56px)", letterSpacing: "-0.025em" }}
          >
            Trusted to shape work that feels{" "}
            <span className="font-accent text-[1.08em]">clear and unforgettable.</span>
          </h2>
          <p
            className="mt-6 max-w-sm text-[15px] leading-7 font-accent"
            style={{ color: "color-mix(in oklab, var(--text) 68%, transparent)" }}
          >
            Quiet confidence, strong collaboration, and visuals that stay with people.
          </p>
        </motion.div>

        <motion.div variants={slowStagger} className="space-y-5">
          {testimonials.map((item, index) => {
            const dimmed = hoveredName !== null && hoveredName !== item.name;
            const initials = item.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2);

            return (
              <motion.article
                key={item.name}
                variants={fadeUp}
                onHoverStart={() => setHoveredName(item.name)}
                onHoverEnd={() => setHoveredName(null)}
                className="motion-card group relative overflow-hidden border p-7 md:p-9"
                style={{
                  background: "color-mix(in oklab, var(--surface) 88%, transparent)",
                  borderColor:
                    hoveredName === item.name ? "rgba(235, 94, 40, 0.35)" : "var(--border)",
                  boxShadow:
                    hoveredName === item.name
                      ? "0 24px 60px rgba(0, 0, 0, 0.14)"
                      : "0 10px 30px rgba(0, 0, 0, 0.06)",
                  opacity: dimmed ? 0.48 : 1,
                  transform: hoveredName === item.name ? "translateY(-4px)" : "translateY(0)",
                  transitionDelay: `${index * 40}ms`,
                }}
              >
                <div className="mb-8 flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full border font-head text-[11px] uppercase tracking-[0.14em]"
                    style={{
                      borderColor: "var(--border)",
                      color: hoveredName === item.name ? "#EB5E28" : "var(--muted)",
                      background: "color-mix(in oklab, var(--bg) 32%, transparent)",
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div className="font-head text-[15px] font-medium tracking-[-0.02em]">
                      {item.name}
                    </div>
                    <div className="text-[13px]" style={{ color: "var(--muted)" }}>
                      {item.role}
                      {item.company ? `, ${item.company}` : ""}
                    </div>
                  </div>
                </div>

                <blockquote
                  className="font-accent text-[clamp(28px,3.2vw,42px)] leading-[1.06]"
                  style={{ color: "var(--text)" }}
                >
                  "{item.testimonial}"
                </blockquote>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
