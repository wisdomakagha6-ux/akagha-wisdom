'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { pricing } from '@/data/pricing'
import { fadeUp } from '@/lib/variants'
import BudgetSelector from './BudgetSelector'

export default function Pricing() {
  const [budget, setBudget] = useState(2250)

  return (
    <section id="pricing" className="px-6 lg:px-10 py-24 border-b" style={{ borderColor: 'var(--border)' }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 grid lg:grid-cols-2 gap-12 items-end">
        <div>
          <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
            <span className="w-2 h-2" style={{ background: '#EB5E28' }} />
            Pricing
          </div>
          <h2 className="font-head font-semibold" style={{ fontSize: 'clamp(32px,4vw,56px)', letterSpacing: '-0.025em' }}>
            Transparent, tiered, no surprises.
          </h2>
        </div>
        <BudgetSelector value={budget} onChange={setBudget} />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pricing.map((t, i) => {
          const inBudget = budget >= t.price
          return (
            <motion.div
              key={t.name}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className="relative p-7 border flex flex-col transition-all"
              style={{
                background: 'var(--surface)',
                borderColor: t.recommended ? '#EB5E28' : 'var(--border)',
                boxShadow: inBudget ? 'inset 0 0 0 1px rgba(235,94,40,0.2)' : 'none',
              }}
            >
              {t.recommended && (
                <span className="absolute -top-3 left-5 px-2 py-1 text-[10px] uppercase tracking-[0.12em]" style={{ background: '#EB5E28', color: '#fff' }}>
                  Recommended
                </span>
              )}
              <div className="text-[11px] uppercase tracking-[0.12em] mb-3" style={{ color: 'var(--muted)' }}>{t.category}</div>
              <div className="font-head text-xl font-medium mb-4 tracking-[-0.02em]">{t.name}</div>
              <div className="font-head text-[42px] font-semibold mb-6 leading-none" style={{ letterSpacing: '-0.04em' }}>
                ${t.price.toLocaleString()}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {t.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-[13px]">
                    <span className="mt-[5px] w-2.5 h-2.5 flex-shrink-0" style={{ background: '#EB5E28' }} />
                    <span style={{ color: 'var(--text)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`/#contact?service=${encodeURIComponent(t.service)}`}
                className="text-center py-3 border font-head text-sm font-medium transition-colors"
                style={{
                  borderColor: t.recommended ? '#EB5E28' : 'var(--border)',
                  color: t.recommended ? '#EB5E28' : 'var(--text)',
                }}
                onMouseEnter={e => { if (t.recommended) { e.currentTarget.style.background = '#EB5E28'; e.currentTarget.style.color = '#fff' } }}
                onMouseLeave={e => { if (t.recommended) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#EB5E28' } }}
              >
                Select {t.name} →
              </a>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
