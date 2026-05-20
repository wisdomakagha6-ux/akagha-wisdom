'use client'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/variants'
import Hero3D from './Hero3D'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-10 pt-32 pb-24 overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
      <Hero3D />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>")' }} />
      <div className="relative z-10 max-w-6xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-2 mb-8 text-[12px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
          <span className="w-2 h-2" style={{ background: '#EB5E28' }} />
          Independent Design Studio · 2026
        </motion.div>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="font-head font-semibold leading-[0.95]"
          style={{ fontSize: 'clamp(52px, 7.5vw, 100px)', letterSpacing: '-0.035em' }}
        >
          Brand systems &<br />
          digital products,<br />
          made deliberately.
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="mt-10 max-w-md text-[15px] font-body"
          style={{ color: 'var(--muted)' }}
        >
          We design identities, websites, and album artwork for teams that care about the details.
        </motion.p>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="mt-12">
          <a
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-4 font-head text-sm font-medium tracking-[-0.01em] border transition-colors"
            style={{ background: '#EB5E28', color: '#fff', borderColor: '#EB5E28' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#EB5E28' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#EB5E28'; e.currentTarget.style.color = '#fff' }}
          >
            Start a project →
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.18em] font-body" style={{ color: 'var(--muted)' }}>
        Scroll
      </div>
    </section>
  )
}
