import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohammad Haykhal',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://haykhalportfolio.vercel.app',
    jobTitle: 'Backend Developer & Software Engineer',
    sameAs: [
      'https://github.com/mohdhaykhal',
      'https://linkedin.com/in/mohdhaykhal'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="bg-[var(--bg)] text-[var(--text)] scroll-smooth">

      <Hero />

      <About />

      <Skills />

      <Projects />

      <Contact />

      <Footer />

      </main>
    </>
  );
}