'use client'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { fadeUp, stagger } from '@/lib/variants'

export const Route = createFileRoute('/projects/$slug')({ component: ProjectDetail })

function ProjectDetail() {
  const { slug } = Route.useParams()
  const project = projects.find(p => p.slug === slug)
  const index = projects.findIndex(p => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1 flex items-center justify-center px-6 text-center">
          <div>
            <h1 className="font-head text-4xl font-semibold mb-4">Project not found</h1>
            <Link to="/" className="text-[#EB5E28]">← Back home</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Nav />
      <article className="pt-32 pb-24">
        {/* Hero */}
        <header className="px-6 lg:px-10 mb-16">
          <div className="max-w-6xl mx-auto">
            <Link to="/" className="text-[11px] uppercase tracking-[0.12em] mb-8 inline-block" style={{ color: 'var(--muted)' }}>
              ← Back to work
            </Link>
            <div className="flex items-center gap-2 mb-6 text-[11px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
              <span className="w-2 h-2" style={{ background: '#EB5E28' }} />
              Case Study · {project.category} · {project.year}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-head font-semibold mb-8"
              style={{ fontSize: 'clamp(40px,6vw,92px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[20px] max-w-2xl"
              style={{ color: 'var(--text)' }}
            >
              {project.summary}
            </motion.p>
          </div>
        </header>

        {/* Cover */}
        <div className="px-6 lg:px-10 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="aspect-[16/9] max-w-6xl mx-auto border"
            style={{ background: project.cover, borderColor: 'var(--border)' }}
          />
        </div>

        {/* Meta row */}
        <section className="px-6 lg:px-10 mb-20">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 border-y py-10" style={{ borderColor: 'var(--border)' }}>
            <Meta label="Client" value={project.client || project.title} />
            <Meta label="Role" value={project.role || project.tags.join(', ')} />
            <Meta label="Duration" value={project.duration || '—'} />
            <Meta label="Year" value={project.year} />
          </div>
        </section>

        {/* Case study body */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger}
          className="px-6 lg:px-10 mb-20"
        >
          <div className="max-w-3xl mx-auto space-y-16">
            {project.challenge && (
              <motion.div variants={fadeUp}>
                <SectionLabel>01 — The Challenge</SectionLabel>
                <p className="font-head text-[24px] md:text-[28px] leading-snug" style={{ letterSpacing: '-0.02em' }}>{project.challenge}</p>
              </motion.div>
            )}
            {project.approach && (
              <motion.div variants={fadeUp}>
                <SectionLabel>02 — Approach</SectionLabel>
                <p className="font-head text-[24px] md:text-[28px] leading-snug" style={{ letterSpacing: '-0.02em' }}>{project.approach}</p>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="px-6 lg:px-10 mb-20">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
              {project.gallery.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className={`aspect-[4/3] border ${i === 0 ? 'md:col-span-2 aspect-[16/7]' : ''}`}
                  style={{ background: g, borderColor: 'var(--border)' }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Outcome + metrics */}
        {project.outcome && (
          <section className="px-6 lg:px-10 mb-20">
            <div className="max-w-3xl mx-auto">
              <SectionLabel>03 — Outcome</SectionLabel>
              <p className="font-head text-[24px] md:text-[28px] leading-snug mb-12" style={{ letterSpacing: '-0.02em' }}>
                {project.outcome}
              </p>
              {project.metrics && (
                <div className="grid grid-cols-3 gap-6 border-t pt-10" style={{ borderColor: 'var(--border)' }}>
                  {project.metrics.map(m => (
                    <div key={m.label}>
                      <div className="font-head font-semibold leading-none" style={{ fontSize: 'clamp(28px,4vw,48px)', color: '#EB5E28', letterSpacing: '-0.03em' }}>
                        {m.value}
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.12em] mt-3" style={{ color: 'var(--muted)' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* CTAs */}
        <section className="px-6 lg:px-10 mb-20">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4">
            <a href="/#contact" className="btn-slick-solid inline-flex items-center gap-3 px-8 py-4 border font-head text-sm">
              <span>Start a project →</span>
            </a>
            <a href="https://cal.com/yourname" className="btn-slick inline-flex items-center gap-3 px-8 py-4 border font-head text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
              <span>Book a 30-min call</span>
            </a>
          </div>
        </section>

        {/* Next case study */}
        {next && next.slug !== project.slug && (
          <section className="px-6 lg:px-10 border-t pt-16" style={{ borderColor: 'var(--border)' }}>
            <div className="max-w-6xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--muted)' }}>Next case study</div>
              <Link to="/projects/$slug" params={{ slug: next.slug }} className="group block">
                <h3 className="font-head font-semibold mb-4 transition-colors group-hover:text-[#EB5E28]" style={{ fontSize: 'clamp(32px,5vw,64px)', letterSpacing: '-0.03em' }}>
                  {next.title} →
                </h3>
                <div className="aspect-[16/7] border" style={{ background: next.cover, borderColor: 'var(--border)' }} />
              </Link>
            </div>
          </section>
        )}
      </article>
      <Footer />
    </main>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-5 text-[11px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
      <span className="w-2 h-2" style={{ background: '#EB5E28' }} />
      {children}
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--muted)' }}>{label}</div>
      <div className="font-head text-[15px]">{value}</div>
    </div>
  )
}
