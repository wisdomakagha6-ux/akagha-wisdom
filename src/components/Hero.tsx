"use client";
import { motion } from "framer-motion";
import { fadeIn, heroAccent, heroStage } from "@/lib/variants";
import Hero3D from "./Hero3D";
import RollingButtonText from "./RollingButtonText";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-10 pt-32 pb-24 overflow-hidden border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <Hero3D />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>")',
        }}
      />
      <div className="relative z-10 max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroStage}
          className="flex items-center gap-2 mb-8 text-[12px] uppercase tracking-[0.12em]"
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
          className="font-head font-semibold leading-[0.95]"
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
          className="mt-10 max-w-md text-[15px] font-body"
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
