"use client";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import { fadeUp, stagger } from "@/lib/variants";
import RollingButtonText from "./RollingButtonText";

export default function Services() {
  return (
    <section
      id="services"
      className="px-6 lg:px-10 py-24 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-16 max-w-3xl"
      >
        <div
          className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.12em]"
          style={{ color: "var(--muted)" }}
        >
          <span className="w-2 h-2" style={{ background: "#EB5E28" }} />
          Services
        </div>
        <h2
          className="font-head font-semibold"
          style={{ fontSize: "clamp(32px,4vw,56px)", letterSpacing: "-0.025em" }}
        >
          What I do, end to end.
        </h2>
      </motion.div>
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        {services.map((s) => (
          <motion.li key={s.num} variants={fadeUp} className="group">
            <a
              href={`/#contact?service=${encodeURIComponent(s.name)}`}
              className="link-roll flex items-center justify-between gap-6 py-7 border-b transition-colors hover:text-[#EB5E28]"
              style={{ borderColor: "var(--border)", display: "flex" }}
            >
              <div className="flex items-baseline gap-6 lg:gap-12">
                <span
                  className="font-head text-[12px] tracking-[0.1em]"
                  style={{ color: "var(--muted)" }}
                >
                  {s.num}
                </span>
                <span
                  className="font-head font-medium"
                  style={{ fontSize: "clamp(22px,3.5vw,44px)", letterSpacing: "-0.02em" }}
                >
                  <RollingButtonText text={s.name} />
                </span>
              </div>
              <span className="font-head text-2xl transition-transform group-hover:translate-x-2">
                →
              </span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
