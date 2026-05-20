'use client'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'
import { fadeUp } from '@/lib/variants'

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div variants={fadeUp} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="group relative block overflow-hidden border transition-all"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 z-10 transition-transform origin-top scale-y-0 group-hover:scale-y-100 duration-500" style={{ background: '#EB5E28' }} />
        <div
          className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105"
          style={{ background: project.cover }}
        />
        <div className="p-6 transition-colors" style={{ background: 'var(--surface)' }}>
          <div className="flex items-center justify-between mb-3 text-[11px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="font-head text-2xl font-semibold tracking-[-0.02em] mb-3">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(t => (
              <span key={t} className="text-[10px] uppercase tracking-[0.12em] px-2 py-1 border transition-colors group-hover:border-[#EB5E28]/40 group-hover:text-[#EB5E28]/70" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 ring-0 group-hover:ring-1 transition-all duration-300 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 0 rgba(235,94,40,0.3)' }} />
      </Link>
    </motion.div>
  )
}
