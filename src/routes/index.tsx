import { createFileRoute } from '@tanstack/react-router'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Projects from '@/components/Projects'
import Services from '@/components/Services'
import About from '@/components/About'
import Pricing from '@/components/Pricing'
import ContactForm from '@/components/ContactForm'
import CtaStrip from '@/components/CtaStrip'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Ticker />
      <Projects />
      <Services />
      <About />
      <Pricing />
      <ContactForm />
      <CtaStrip />
      <Footer />
    </main>
  )
}
