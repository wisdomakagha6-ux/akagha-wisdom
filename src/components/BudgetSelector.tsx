"use client";
import { useRef, useState } from "react";
import QuickQuoteModal from "./QuickQuoteModal";
import { pricing } from "@/data/pricing";
import RollingButtonText from "./RollingButtonText";

const presets = pricing.map((p) => ({
  label: `${p.name} — $${p.price.toLocaleString()}`,
  value: p.price,
}));

export default function BudgetSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [modal, setModal] = useState<{ open: boolean; label?: string }>({ open: false });
  const sliderTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pick = (v: number, i: number) => {
    setActive(i);
    onChange(v);
    setModal({ open: true, label: presets[i].label });
  };

  const onSlide = (v: number) => {
    setActive(null);
    onChange(v);
    if (sliderTimer.current) clearTimeout(sliderTimer.current);
    sliderTimer.current = setTimeout(
      () => setModal({ open: true, label: `$${v.toLocaleString()}` }),
      700,
    );
  };

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <span className="text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--muted)" }}>
          Budget
        </span>
        <span
          className="font-head text-[52px] font-semibold leading-none"
          style={{ color: "#EB5E28", letterSpacing: "-0.04em" }}
        >
          ${value.toLocaleString()}
        </span>
      </div>
      <input
        type="range"
        min={120}
        max={5000}
        step={50}
        value={value}
        onChange={(e) => onSlide(Number(e.target.value))}
        className="w-full budget-slider"
        style={{ accentColor: "#EB5E28" }}
      />
      <div className="flex flex-wrap gap-2 mt-5">
        {presets.map((p, i) => {
          const isActive = active === i;
          return (
            <button
              key={p.label}
              onClick={() => pick(p.value, i)}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.08em] border transition-colors btn-slick"
              style={{
                borderColor: isActive ? "#EB5E28" : "var(--border)",
                color: isActive ? "#EB5E28" : "var(--muted)",
              }}
            >
              <RollingButtonText text={p.label} />
            </button>
          );
        })}
      </div>
      <QuickQuoteModal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        budget={value}
        budgetLabel={modal.label}
      />
    </div>
  );
}
