"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const { theme, toggle } = useTheme();

  return (
    <nav
      className="fixed top-0 w-full z-[100] px-6 lg:px-10 py-5 flex items-center justify-between border-b"
      style={{
        background: "color-mix(in oklab, var(--bg) 80%, transparent)",
        backdropFilter: "blur(14px)",
        borderColor: "var(--border)",
      }}
    >
      <Link to="/" className="font-head font-semibold text-[17px] tracking-[-0.02em]">
        AW<span style={{ color: "var(--accent)" }}>.</span>
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
              <a href={l.href} className="transition-colors hover:text-[#EB5E28]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
