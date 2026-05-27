import { createFileRoute } from "@tanstack/react-router";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";
import CtaStrip from "@/components/CtaStrip";
import Footer from "@/components/Footer";
import { siteName, siteDescription } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    title: `${siteName} — Creative Direction, Brand Identity & Album Artwork`,
    meta: [
      { name: "description", content: siteDescription },
      {
        property: "og:title",
        content: `${siteName} — Creative Direction, Brand Identity & Album Artwork`,
      },
      { property: "og:description", content: siteDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:description", content: siteDescription },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  return (
    <main className="page-shell">
      <Nav />
      <Hero />
      <Ticker />
      <Projects />
      <Testimonials />
      <Services />
      <About />
      <Pricing />
      <ContactForm />
      <CtaStrip />
      <Footer />
    </main>
  );
}
