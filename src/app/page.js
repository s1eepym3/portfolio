import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import prisma from "../lib/prisma";
import { profileData } from "../data/profile";
import staticProjects from "../data/projects";

export const revalidate = 60;

export default async function Home() {
  let timeline = [];
  let capabilities = [];
  let projects = [];
  try {
    timeline = await prisma.timelineEntry.findMany({
      orderBy: { order: 'asc' }
    });
    capabilities = await prisma.capability.findMany({
      orderBy: { order: 'asc' }
    });
    projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      select: {
        slug: true,
        number: true,
        title: true,
        framing: true,
        summary: true,
        stack: true,
        image: true,
        year: true,
      }
    });
  } catch (err) {
    console.error("Database connection failed, falling back to static data:", err);
    timeline = profileData.about.timeline;
    capabilities = profileData.about.capabilities;
    projects = staticProjects;
  }

  // If DB returned empty projects (no rows yet), fall back to static
  if (!projects || projects.length === 0) {
    projects = staticProjects;
  }

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

      <About timeline={timeline} />

      <Skills capabilities={capabilities} />

      <Projects projects={projects} />

      <Contact />

      <Footer />

      </main>
    </>
  );
}