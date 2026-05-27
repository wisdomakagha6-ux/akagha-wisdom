"use client";
import { motion } from "framer-motion";
import { fadeIn, heroAccent, heroStage } from "@/lib/variants";
import HeroInteractiveBackground from "./HeroInteractiveBackground";
import RollingButtonText from "./RollingButtonText";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-10 pt-32 pb-24 overflow-hidden border-b"
      style={{ borderColor: "var(--border)", backgroundColor: theme === "dark" ? "#050505" : "#f5f0eb" }}
    >
      <HeroInteractiveBackground />
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroStage}
          className="flex items-center justify-center gap-2 mb-8 text-[12px] uppercase tracking-[0.12em]"
          style={{ color: "var(--muted)" }}
        >
          <span className="w-2 h-2" style={{ background: "#EB5E28" }} />
          Creative Director · Brand Identity · Album Cover Design
        </motion.div>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={heroStage}
          custom={1}
          className="font-head font-semibold leading-[0.95] text-center"
          style={{ fontSize: "clamp(52px, 7.5vw, 100px)", letterSpacing: "-0.035em" }}
        >
          Building visual identities
          <br />
          and album artwork
          <br />
          that{" "}
          <motion.span variants={heroAccent} className="font-accent inline-block text-[1.08em]">
            shape culture.
          </motion.span>
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={heroStage}
          custom={2}
          className="mt-10 max-w-md mx-auto text-[15px] font-body text-center"
          style={{ color: "var(--muted)" }}
        >
          Independent creative director with 5+ years of experience crafting brand systems, visual
          rebrands, and cover art for ambitious brands, startups, and music artists.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroStage}
          custom={3}
          className="mt-12"
        >
          <a
            href="/#contact"
            className="btn-slick-solid inline-flex items-center gap-3 px-8 py-4 font-head text-sm font-medium tracking-[-0.01em] border"
          >
            <RollingButtonText text={"Start a project \u2192"} />
          </a>
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroStage}
        custom={4}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.18em] font-body"
        style={{ color: "var(--muted)" }}
      >
        Scroll
      </motion.div>
    </section>
  );
}
