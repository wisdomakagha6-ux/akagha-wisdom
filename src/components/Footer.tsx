export default function Footer() {
  return (
    <footer className="px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-10 border-t" style={{ borderColor: 'var(--border)' }}>
      <div>
        <div className="font-head font-semibold text-[17px] mb-4 tracking-[-0.02em]">
          Studio<span style={{ color: '#EB5E28' }}>.</span>
        </div>
        <a href="mailto:hello@yourdomain.com" className="text-[15px] transition-colors" style={{ color: 'var(--muted)' }} onMouseEnter={e => (e.currentTarget.style.color = '#EB5E28')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
          hello@yourdomain.com
        </a>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--muted)' }}>Navigate</div>
        <ul className="space-y-2 text-[14px]">
          {['Work', 'Services', 'Pricing', 'Contact'].map(l => (
            <li key={l}>
              <a href={`/#${l.toLowerCase()}`} className="group inline-flex items-center gap-2 transition-colors" style={{ color: 'var(--text)' }}>
                <span className="w-1 h-1 transition-colors" style={{ background: 'var(--muted)' }} />
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--muted)' }}>Elsewhere</div>
        <ul className="space-y-2 text-[14px]">
          {['Instagram', 'Dribbble', 'LinkedIn', 'X'].map(l => (
            <li key={l}>
              <a href="#" className="transition-colors" onMouseEnter={e => (e.currentTarget.style.color = '#EB5E28')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}>{l}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-3 pt-8 border-t flex flex-wrap items-center justify-between gap-4 text-[12px]" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
        <span>© 2026 Studio. All rights reserved.</span>
        <a
          href="/source.zip"
          download
          className="btn-slick inline-flex items-center gap-2 px-5 py-2 border font-head text-[11px] uppercase tracking-[0.12em]"
          style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
        >
          <span>↓ Download source</span>
        </a>
        <span>Made deliberately.</span>
      </div>
    </footer>
  )
}
