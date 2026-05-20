import { createFileRoute, Link } from '@tanstack/react-router'
import { projects } from '@/data/projects'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/projects/$slug')({ component: ProjectDetail })

function ProjectDetail() {
  const { slug } = Route.useParams()
  const project = projects.find(p => p.slug === slug)

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
      <article className="pt-32 pb-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-[11px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
            <span className="w-2 h-2" style={{ background: '#EB5E28' }} />
            {project.category} · {project.year}
          </div>
          <h1 className="font-head font-semibold mb-8" style={{ fontSize: 'clamp(40px,6vw,84px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}>
            {project.title}
          </h1>
          <p className="text-[17px] max-w-2xl mb-16" style={{ color: 'var(--muted)' }}>
            {project.summary}
          </p>
          <div className="aspect-[16/9] w-full mb-16 border" style={{ background: project.cover, borderColor: 'var(--border)' }} />
          <div className="grid lg:grid-cols-3 gap-10 mb-20">
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--muted)' }}>Client</div>
              <div className="font-head text-lg">{project.title}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--muted)' }}>Scope</div>
              <div className="font-head text-lg">{project.tags.join(', ')}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--muted)' }}>Year</div>
              <div className="font-head text-lg">{project.year}</div>
            </div>
          </div>
          <a href="/#contact" className="inline-flex items-center gap-3 px-8 py-4 border font-head text-sm transition-colors"
             style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
             onMouseEnter={e => (e.currentTarget.style.borderColor = '#EB5E28')}
             onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
            Book a 30-min call →
          </a>
        </div>
      </article>
      <Footer />
    </main>
  )
}
