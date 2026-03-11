import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {

  return (
    <main className="bg-gradient-to-b from-black via-slate-950 to-black text-white scroll-smooth">

      <Hero />

      <About />

      <Skills />

      <Projects />

      <Contact />

      <Footer />

    </main>
  );
}