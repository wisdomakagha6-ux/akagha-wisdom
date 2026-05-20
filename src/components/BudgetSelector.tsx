'use client'
import { useState } from 'react'

const presets = [
  { label: 'Under $500', value: 250 },
  { label: '$500–$1,500', value: 1000 },
  { label: '$1,500–$3,000', value: 2250 },
  { label: '$3,000+', value: 4000 },
]

export default function BudgetSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [active, setActive] = useState<number | null>(null)

  const pick = (v: number, i: number) => { setActive(i); onChange(v) }

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <span className="text-[11px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>Budget</span>
        <span className="font-head text-[52px] font-semibold leading-none" style={{ color: '#EB5E28', letterSpacing: '-0.04em' }}>
          ${value.toLocaleString()}
        </span>
      </div>
      <input
        type="range" min={250} max={5000} step={50} value={value}
        onChange={e => { setActive(null); onChange(Number(e.target.value)) }}
        className="w-full budget-slider"
        style={{ accentColor: '#EB5E28' }}
      />
      <div className="flex flex-wrap gap-2 mt-5">
        {presets.map((p, i) => {
          const isActive = active === i
          return (
            <button
              key={p.label}
              onClick={() => pick(p.value, i)}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.08em] border transition-colors"
              style={{
                borderColor: isActive ? '#EB5E28' : 'var(--border)',
                color: isActive ? '#EB5E28' : 'var(--muted)',
                background: isActive ? 'rgba(235,94,40,0.04)' : 'transparent',
              }}
            >
              {p.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
