'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/variants'

const serviceOptions = ['UI/UX Design', 'Website Design', 'Web Development', 'Brand Identity', 'Album Cover Design', 'Pitch Decks', 'Other']
const budgetOptions = [
  { label: 'Under $500', value: '<500' },
  { label: '$500–$1,500', value: '500-1500' },
  { label: '$1,500–$3,000', value: '1500-3000' },
  { label: '$3,000+', value: '3000+' },
  { label: "Let's talk", value: 'open' },
]

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  padding: '16px 20px',
  borderRadius: 0,
  fontFamily: 'Inter',
  fontSize: 15,
  color: 'var(--text)',
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 text-[12px] uppercase tracking-[0.08em] border transition-colors"
      style={{
        borderColor: active ? '#EB5E28' : 'var(--border)',
        color: active ? '#EB5E28' : 'var(--muted)',
        background: active ? 'rgba(235,94,40,0.06)' : 'transparent',
        borderRadius: 0,
      }}
    >
      {children}
    </button>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', brief: '', budget: '' })
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash
    const q = hash.includes('?') ? hash.split('?')[1] : ''
    const params = new URLSearchParams(q)
    const svc = params.get('service')
    if (svc && serviceOptions.includes(svc)) setSelectedServices([svc])
  }, [])

  const toggleService = (s: string) =>
    setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.brief || selectedServices.length === 0) return
    // TODO: POST to Formspree endpoint
    setSubmitted(true)
  }

  return (
    <section id="contact" className="px-6 lg:px-10 py-24 border-b" style={{ borderColor: 'var(--border)' }}>
      <div className="grid lg:grid-cols-[40fr_60fr] gap-12 lg:gap-20">
        {/* Left */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:sticky lg:top-32 lg:self-start">
          <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
            <span className="w-2 h-2" style={{ background: '#EB5E28' }} />
            Get in Touch
          </div>
          <h2 className="font-head font-semibold mb-6" style={{ fontSize: 'clamp(32px,4vw,52px)', letterSpacing: '-0.025em' }}>
            Let's build something remarkable.
          </h2>
          <p className="text-[15px] max-w-[340px] mb-10" style={{ color: 'var(--muted)' }}>
            Tell us about your project — the more detail the better. We'll get back within 24 hours.
          </p>
          <div className="text-[12px] uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--muted)' }}>
            Prefer a quick chat?
          </div>
          <a
            href="https://cal.com/yourname"
            className="btn-slick inline-flex items-center gap-3 px-8 py-4 border font-head text-sm"
            style={{ borderColor: 'var(--border)', color: 'var(--text)', borderRadius: 0 }}
          >
            <span>📞 Book a 30-min call</span>
          </a>
        </motion.div>

        {/* Right - form */}
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex flex-col justify-center min-h-[420px] border p-10" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
              <span className="w-2 h-2" style={{ background: '#EB5E28' }} />
              Message Sent
            </div>
            <h3 className="font-head text-[28px] font-semibold mb-3" style={{ letterSpacing: '-0.02em' }}>
              We'll be in touch within 24 hours.
            </h3>
            <p className="text-[14px]" style={{ color: 'var(--muted)' }}>
              Check your inbox — we might reply sooner.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <input style={inputBase} placeholder="Your name" name="name" value={form.name} onChange={onChange} required onFocus={e => { e.currentTarget.style.borderColor = '#EB5E28'; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(235,94,40,0.3)' }} onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <input style={inputBase} type="email" placeholder="you@email.com" name="email" value={form.email} onChange={onChange} required onFocus={e => { e.currentTarget.style.borderColor = '#EB5E28'; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(235,94,40,0.3)' }} onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }} />
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="text-[11px] uppercase tracking-[0.12em] mb-3" style={{ color: 'var(--muted)' }}>What do you need?</div>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map(s => (
                  <Pill key={s} active={selectedServices.includes(s)} onClick={() => toggleService(s)}>{s}</Pill>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <textarea
                style={{ ...inputBase, resize: 'vertical' }}
                placeholder="Tell us about your project. Goals, timeline, references..."
                name="brief"
                rows={5}
                value={form.brief}
                onChange={onChange}
                required
                onFocus={e => { e.currentTarget.style.borderColor = '#EB5E28'; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(235,94,40,0.3)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="text-[11px] uppercase tracking-[0.12em] mb-3" style={{ color: 'var(--muted)' }}>Budget</div>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map(b => (
                  <Pill key={b.value} active={form.budget === b.value} onClick={() => setForm(f => ({ ...f, budget: b.value }))}>{b.label}</Pill>
                ))}
              </div>
            </motion.div>

            <motion.button
              variants={fadeUp}
              type="submit"
              className="btn-slick-solid w-full py-5 font-head font-medium text-sm tracking-[-0.01em] border mt-8"
            >
              <span>Send Message →</span>
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
