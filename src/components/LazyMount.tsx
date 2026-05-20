'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export default function LazyMount({ children, rootMargin = '200px' }: { children: ReactNode; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect() } },
      { rootMargin },
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [rootMargin])
  return <div ref={ref} className="w-full h-full">{show ? children : null}</div>
}
