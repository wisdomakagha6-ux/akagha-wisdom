const items = ['Brand Identity', 'Website Design', 'Album Covers', 'Pitch Decks', 'UI/UX', 'Web Development']

export default function Ticker() {
  const row = [...items, ...items, ...items]
  return (
    <section className="overflow-hidden border-b py-6" style={{ borderColor: 'var(--border)' }}>
      <div className="flex gap-10 whitespace-nowrap font-head text-[clamp(28px,4vw,48px)] font-medium" style={{ willChange: 'transform', animation: 'tickerScroll 40s linear infinite' }}>
        {row.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-10">
            {it}
            <span className="inline-block w-2 h-2" style={{ background: '#EB5E28' }} />
          </span>
        ))}
      </div>
      <style>{`@keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </section>
  )
}
