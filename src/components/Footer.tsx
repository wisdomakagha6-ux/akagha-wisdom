import RollingButtonText from "./RollingButtonText";

export default function Footer() {
  const socialLinks = {
    Instagram: "https://www.instagram.com/serb.lgo/",
    Behance: "https://www.behance.net/serbastian",
    LinkedIn: "https://www.linkedin.com/in/akagha-wisdom-4b16a3213/",
    X: "https://x.com/serbmecha",
  };

  return (
    <footer
      className="px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-10 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div>
        <div className="font-head font-semibold text-[17px] mb-4 tracking-[-0.02em]">
          AW<span style={{ color: "#EB5E28" }}>.</span>
        </div>
        <a
          href="mailto:hello@yourdomain.com"
          className="link-roll text-[15px] transition-colors"
          style={{ color: "var(--muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#EB5E28")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <RollingButtonText text="akaghawisdom5@gmail.com" />
        </a>
      </div>
      <div>
        <div
          className="text-[11px] uppercase tracking-[0.12em] mb-4"
          style={{ color: "var(--muted)" }}
        >
          Navigate
        </div>
        <ul className="space-y-2 text-[14px]">
          {["Work", "Services", "Pricing", "Contact"].map((l) => (
            <li key={l}>
              <a
                href={`/#${l.toLowerCase()}`}
                className="group link-roll inline-flex items-center gap-2 transition-colors"
                style={{ color: "var(--text)" }}
              >
                <span
                  className="w-1 h-1 transition-colors"
                  style={{ background: "var(--muted)" }}
                />
                <RollingButtonText text={l} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div
          className="text-[11px] uppercase tracking-[0.12em] mb-4"
          style={{ color: "var(--muted)" }}
        >
          Elsewhere
        </div>
        <ul className="space-y-2 text-[14px]">
          {Object.entries(socialLinks).map(([name, url]) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-roll transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#EB5E28")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
              >
                <RollingButtonText text={name} />
              </a>
              ,
            </li>
          ))}
        </ul>
      </div>
      <div
        className="md:col-span-3 pt-8 border-t flex flex-wrap items-center justify-between gap-4 text-[12px]"
        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
      >
        <span>© 2026 AW. All rights reserved.</span>
        <span>Made in Lagos with love.</span>
      </div>
    </footer>
  );
}
