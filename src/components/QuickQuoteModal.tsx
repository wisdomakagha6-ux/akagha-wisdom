"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RollingButtonText from "./RollingButtonText";

interface Props {
  open: boolean;
  onClose: () => void;
  budget: number;
  budgetLabel?: string;
}

export default function QuickQuoteModal({ open, onClose, budget, budgetLabel }: Props) {
  const [form, setForm] = useState({ name: "", email: "", brief: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.brief) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("brief", form.brief);
    formData.append("budget", budgetLabel || `$${budget.toLocaleString()}`);

    fetch("https://formspree.io/f/mdawdrwo", {
      method: "POST",
      body: formData,
    })
      .then(() => setSent(true))
      .catch(() => setSent(true))
      .finally(() => {
        setTimeout(() => {
          setSent(false);
          setForm({ name: "", email: "", brief: "" });
          onClose();
        }, 2200);
      });
  };

  const input: React.CSSProperties = {
    width: "100%",
    background: "var(--bg)",
    border: "1px solid var(--border)",
    padding: "14px 16px",
    fontFamily: "Inter",
    fontSize: 14,
    color: "var(--text)",
    outline: "none",
    borderRadius: 0,
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="qq-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg border p-8 lg:p-10"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div
                  className="flex items-center gap-2 mb-3 text-[11px] uppercase tracking-[0.12em]"
                  style={{ color: "var(--muted)" }}
                >
                  <span className="w-2 h-2" style={{ background: "#EB5E28" }} />
                  Quick Quote
                </div>
                <h3
                  className="font-head text-[26px] font-semibold leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Tell me about it.
                </h3>
                <p className="text-[13px] mt-2" style={{ color: "var(--muted)" }}>
                  Budget:{" "}
                  <span style={{ color: "#EB5E28" }}>
                    {budgetLabel || `$${budget.toLocaleString()}`}
                  </span>
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 flex items-center justify-center border"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                ✕
              </button>
            </div>

            {sent ? (
              <div className="py-10 text-center">
                <div className="font-head text-xl mb-2">Got it — talk soon.</div>
                <p className="text-[13px]" style={{ color: "var(--muted)" }}>
                  I'll reply within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                action="https://formspree.io/f/mdawdrwo"
                method="POST"
                className="space-y-4"
              >
                <input
                  type="hidden"
                  name="budget"
                  value={budgetLabel || `$${budget.toLocaleString()}`}
                />
                <input
                  name="name"
                  style={input}
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  name="email"
                  style={input}
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <textarea
                  name="brief"
                  style={{ ...input, resize: "vertical" }}
                  rows={4}
                  placeholder="A sentence or two about your project..."
                  value={form.brief}
                  onChange={(e) => setForm({ ...form, brief: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  className="btn-slick-solid w-full py-4 font-head text-sm font-medium border tracking-[-0.01em]"
                >
                  <RollingButtonText text={"Send message \u2192"} />
                </button>
                <a
                  href="/#contact"
                  onClick={onClose}
                  className="link-roll block text-center text-[12px] uppercase tracking-[0.12em] pt-1"
                  style={{ color: "var(--muted)" }}
                >
                  <RollingButtonText text={"Or fill the full brief \u2192"} />
                </a>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
