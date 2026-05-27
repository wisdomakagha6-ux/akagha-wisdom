"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/variants";
import { pricing } from "@/data/pricing";
import RollingButtonText from "./RollingButtonText";

const serviceOptions = [
  "UI/UX Design",
  "Website Design",
  "Web Development",
  "Brand Identity",
  "Album Cover Design",
  "AI Marketing Contents",
  "Other",
];

const tierOptions = pricing.map((p) => ({
  label: `${p.name} — $${p.price.toLocaleString()}`,
  value: String(p.price),
}));
const rangeOptions = [
  { label: "Under $700", value: "<700" },
  { label: "$700–$1,500", value: "700-1500" },
  { label: "$1,500–$2,300", value: "1500-2300" },
  { label: "$2,300+", value: "2300+" },
];
const budgetOptions = [...tierOptions, ...rangeOptions, { label: "Let's talk", value: "open" }];

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  padding: "16px 20px",
  borderRadius: 0,
  fontFamily: "Inter",
  fontSize: 15,
  color: "var(--text)",
  outline: "none",
  transition: "border-color .2s, box-shadow .2s",
};

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="px-4 py-2 text-[12px] uppercase tracking-[0.08em] border transition-colors"
      style={{
        borderColor: active ? "#EB5E28" : "var(--border)",
        color: active ? "#EB5E28" : "var(--muted)",
        background: active ? "rgba(235,94,40,0.06)" : "transparent",
        borderRadius: 0,
      }}
    >
      {children}
    </button>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", brief: "", budget: "" });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Map price to budget range
  const getPriceBudgetValue = (price: string | number): string => {
    const numPrice = typeof price === "string" ? parseInt(price, 10) : price;
    // If price matches an exact tier, return the exact price string so the matching pill is selected
    if (pricing.some((p) => p.price === numPrice)) return String(numPrice);
    if (numPrice < 700) return "<700";
    if (numPrice < 1500) return "700-1500";
    if (numPrice < 2300) return "1500-2300";
    return "2300+";
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyServiceFromHash = () => {
      const hash = window.location.hash;
      const q = hash.includes("?") ? hash.split("?")[1] : "";
      const params = new URLSearchParams(q);
      const svc = params.get("service");
      const price = params.get("price");
      if (svc && serviceOptions.includes(svc)) {
        setSelectedServices([svc]);
        if (price) {
          setSelectedPrice(price);
          // Auto-select budget based on price
          const budgetValue = getPriceBudgetValue(price);
          setForm((f) => ({ ...f, budget: budgetValue }));
        }
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    };

    applyServiceFromHash();
    window.addEventListener("hashchange", applyServiceFromHash);
    return () => window.removeEventListener("hashchange", applyServiceFromHash);
  }, []);

  const toggleService = (s: string) =>
    setSelectedServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.brief || selectedServices.length === 0) return;

    // Prepare form data for Formspree
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("services", selectedServices.join(", "));
    formData.append("budget", form.budget || "Not specified");
    formData.append("brief", form.brief);

    // Submit to Formspree
    fetch("https://formspree.io/f/mdawdrwo", {
      method: "POST",
      body: formData,
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true)); // Show success message even if there's an error (UX)
  };

  return (
    <section
      id="contact"
      className="px-6 lg:px-10 py-24 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="grid lg:grid-cols-[40fr_60fr] gap-12 lg:gap-20">
        {/* Left */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <div
            className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "var(--muted)" }}
          >
            <span className="w-2 h-2" style={{ background: "#EB5E28" }} />
            Get in Touch
          </div>
          <h2
            className="font-head font-semibold mb-6"
            style={{ fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.025em" }}
          >
            Let's build something remarkable.
          </h2>
          <p className="text-[15px] max-w-[340px] mb-10" style={{ color: "var(--muted)" }}>
            Tell me about your project — the more detail the better. I'll get back within 24 hours.
          </p>
          <div
            className="text-[12px] uppercase tracking-[0.12em] mb-4"
            style={{ color: "var(--muted)" }}
          >
            Prefer a quick chat?
          </div>
          <a
            href="https://calendly.com/akaghawisdom5/client-discovery-call"
            className="btn-slick inline-flex items-center gap-3 px-8 py-4 border font-head text-sm"
            style={{ borderColor: "var(--border)", color: "var(--text)", borderRadius: 0 }}
          >
            <RollingButtonText text="Book a 30-min call" />
          </a>
        </motion.div>

        {/* Right - form */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center min-h-[420px] border p-10"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            role="status"
            aria-live="polite"
          >
            <div
              className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.12em]"
              style={{ color: "var(--muted)" }}
            >
              <span className="w-2 h-2" style={{ background: "#EB5E28" }} />
              Message Sent
            </div>
            <h3
              className="font-head text-[28px] font-semibold mb-3"
              style={{ letterSpacing: "-0.02em" }}
            >
              I'll be in touch within 24 hours.
            </h3>
            <p className="text-[14px]" style={{ color: "var(--muted)" }}>
              Check your inbox — I might reply sooner.
            </p>
            <a
              href="/"
              className="link-roll inline-flex items-center justify-center px-8 py-4 mt-8 border font-head text-sm"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
                borderRadius: 0,
                background: "transparent",
              }}
            >
              <RollingButtonText text="Go Back" />
            </a>
          </motion.div>
        ) : (
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            onSubmit={handleSubmit}
            action="https://formspree.io/f/mdawdrwo"
            method="POST"
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <label htmlFor="contact-name" className="sr-only">
                Your name
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                style={inputBase}
                value={form.name}
                onChange={onChange}
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#EB5E28";
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(235,94,40,0.3)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <label htmlFor="contact-email" className="sr-only">
                Email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                style={inputBase}
                value={form.email}
                onChange={onChange}
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#EB5E28";
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(235,94,40,0.3)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <div
                id="contact-services-heading"
                className="text-[11px] uppercase tracking-[0.12em] mb-3"
                style={{ color: "var(--muted)" }}
              >
                What do you need?
              </div>
              <div
                role="group"
                aria-labelledby="contact-services-heading"
                className="flex flex-wrap gap-2"
              >
                {serviceOptions.map((s) => (
                  <Pill
                    key={s}
                    active={selectedServices.includes(s)}
                    onClick={() => toggleService(s)}
                  >
                    {s}
                  </Pill>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="contact-brief" className="sr-only">
                Project brief
              </label>
              <textarea
                id="contact-brief"
                name="brief"
                rows={5}
                placeholder="Tell me about your project. Goals, timeline, references..."
                style={{ ...inputBase, resize: "vertical" }}
                value={form.brief}
                onChange={onChange}
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#EB5E28";
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(235,94,40,0.3)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <div
                id="contact-budget-heading"
                className="text-[11px] uppercase tracking-[0.12em] mb-3"
                style={{ color: "var(--muted)" }}
              >
                Budget
              </div>
              <div
                role="group"
                aria-labelledby="contact-budget-heading"
                className="flex flex-wrap gap-2"
              >
                {budgetOptions.map((b) => (
                  <Pill
                    key={b.value}
                    active={form.budget === b.value}
                    onClick={() => setForm((f) => ({ ...f, budget: b.value }))}
                  >
                    {b.label}
                  </Pill>
                ))}
              </div>
            </motion.div>

            <motion.button
              variants={fadeUp}
              type="submit"
              formAction="https://formspree.io/f/mdawdrwo"
              className="btn-slick-solid w-full py-5 font-head font-medium text-sm tracking-[-0.01em] border mt-8"
            >
              <RollingButtonText text={"Send Message \u2192"} />
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
