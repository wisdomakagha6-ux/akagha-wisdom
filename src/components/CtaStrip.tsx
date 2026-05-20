'use client'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/variants'
import Cta3D from './Cta3D'

export default function CtaStrip() {
  return (
    <section className="relative overflow-hidden px-6 lg:px-10 py-28 flex flex-col items-center text-center border-b" style={{ borderColor: 'var(--border)' }}>
      <Cta3D />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 max-w-3xl">
        <h2 className="font-head font-semibold mb-6" style={{ fontSize: 'clamp(36px,5vw,68px)', letterSpacing: '-0.03em', lineHeight: 1 }}>
          Have a project in mind?
        </h2>
        <p className="text-[16px] max-w-md mx-auto mb-10" style={{ color: 'var(--muted)' }}>
          We're booking new identity and product work for next quarter.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/#contact"
            className="btn-slick-solid inline-flex items-center gap-3 px-10 py-4 font-head text-sm font-medium border"
          >
            <span>Start a Project →</span>
          </a>
          <a
            href="https://cal.com/yourname"
            className="btn-slick inline-flex items-center gap-3 px-10 py-4 font-head text-sm font-medium border"
            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
          >
            <span>Book a 30-min call</span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
