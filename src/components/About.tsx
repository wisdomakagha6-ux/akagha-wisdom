'use client'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/variants'
import About3D from './About3D'

const stats = [
  { n: '12+', l: 'Years designing' },
  { n: '80+', l: 'Brands shipped' },
  { n: '24h', l: 'Reply window' },
]

export default function About() {
  return (
    <section className="relative overflow-hidden px-6 lg:px-10 py-24 border-b" style={{ borderColor: 'var(--border)' }}>
      <About3D />
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: '#EB5E28' }} />
          <div className="aspect-[4/5] w-full ml-4 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }} />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
          <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
            <span className="w-2 h-2" style={{ background: '#EB5E28' }} />
            About
          </div>
          <h2 className="font-head font-semibold mb-8" style={{ fontSize: 'clamp(32px,4vw,56px)', letterSpacing: '-0.025em' }}>
            A small studio working at the edges of brand and product.
          </h2>
          <p className="text-[15px] mb-6 max-w-xl" style={{ color: 'var(--muted)' }}>
            We're a senior duo: a designer and a developer who've spent a decade building identities and digital products for music, lifestyle, and technology companies.
          </p>
          <p className="text-[15px] mb-12 max-w-xl" style={{ color: 'var(--muted)' }}>
            We take on a small number of projects each quarter so we can stay close to the craft.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {stats.map(s => (
              <div key={s.l} className="p-5 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="font-head text-3xl font-semibold" style={{ color: '#EB5E28', letterSpacing: '-0.03em' }}>{s.n}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.1em]" style={{ color: 'var(--muted)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
