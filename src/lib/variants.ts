import type { Variants } from "framer-motion";

export const keynoteEase = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: keynoteEase, delay: i * 0.12 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.56, ease: "easeOut", delay: i * 0.12 },
  }),
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const slowStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.12 } },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.05,
      ease: keynoteEase,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

export const heroStage: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.92,
      ease: keynoteEase,
      delay: 0.7 + i * 0.16,
    },
  }),
};

export const heroAccent: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: [0, -3, 0],
    transition: {
      opacity: { duration: 0.8, ease: keynoteEase, delay: 1.02 },
      y: { duration: 0.92, ease: keynoteEase, delay: 1.02 },
    },
  },
};

export const slideLeft: Variants = {
  hidden: { x: 40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.72, ease: keynoteEase } },
};
