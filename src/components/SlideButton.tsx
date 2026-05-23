"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: "left" | "right";
  as?: "button" | "a";
  href?: string;
  children: React.ReactNode;
}

export default function SlideButton({
  direction = "right",
  as = "button",
  href,
  children,
  className = "",
  ...rest
}: Props) {
  const [hover, setHover] = useState(false);
  const x = direction === "right" ? (hover ? 4 : 0) : hover ? -4 : 0;

  const inner = (
    <motion.span
      animate={{ x }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center justify-center w-full"
    >
      {children}
    </motion.span>
  );

  if (as === "a" || href) {
    return (
      <a
        href={href}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`inline-flex items-center justify-center relative overflow-hidden ${className}`}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`inline-flex items-center justify-center relative overflow-hidden ${className}`}
      {...rest}
    >
      {inner}
    </button>
  );
}
