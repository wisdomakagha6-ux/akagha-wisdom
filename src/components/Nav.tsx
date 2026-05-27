"use client";
import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "@tanstack/react-router";
import RollingButtonText from "./RollingButtonText";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [isCondensed, setIsCondensed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      setIsCondensed(isScrollingDown && currentScrollY > 18);
      lastScrollY.current = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-[100] px-6 lg:px-10 flex items-center justify-between border-b"
      style={{
        paddingTop: isCondensed ? "0.9rem" : "1.25rem",
        paddingBottom: isCondensed ? "0.9rem" : "1.25rem",
        background: `color-mix(in oklab, var(--bg) ${isCondensed ? "92%" : "80%"}, transparent)`,
        backdropFilter: `blur(${isCondensed ? 22 : 14}px)`,
        borderColor: "var(--border)",
        boxShadow: isCondensed ? "0 12px 36px rgba(0, 0, 0, 0.1)" : "none",
        transition:
          "padding 560ms cubic-bezier(0.16, 1, 0.3, 1), background 560ms cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 560ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 560ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <Link
        to="/"
        className="link-roll motion-link inline-flex items-center font-head font-semibold text-[17px] tracking-[-0.02em]"
      >
        <RollingButtonText text="AW" />
        <span style={{ color: "var(--accent)" }}>.</span>
      </Link>

      <div
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 text-[11px] uppercase tracking-[0.12em]"
        style={{ color: "var(--muted)" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        02 slots open
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="w-9 h-9 flex items-center justify-center transition-colors"
          style={{ background: "transparent" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <div
            className="transition-transform duration-300"
            style={{ transform: theme === "dark" ? "rotate(0deg)" : "rotate(180deg)" }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </div>
        </button>
        <ul
          className="hidden md:flex items-center gap-7 font-head text-[13px]"
          style={{ color: "var(--muted)" }}
        >
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="link-roll motion-link transition-colors hover:text-[#EB5E28]"
              >
                <RollingButtonText text={l.label} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
