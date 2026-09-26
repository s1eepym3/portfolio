import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import projects from "../../../data/projects";
import Lightbox from "../../../components/Lightbox";
import prisma from "../../../lib/prisma";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true }
    });
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map((p) => ({ slug: p.slug }));
    }
  } catch (err) {
    console.error("Failed to fetch static params from DB:", err);
  }
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let project = null;
  try {
    project = await prisma.project.findUnique({
      where: { slug, published: true }
    });
  } catch (err) {}
  
  if (!project) {
    project = projects.find((p) => p.slug === slug);
  }
  if (!project) return {};
  
  return {
    title: `${project.title} — Mohammad Haykhal`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  
  let project = null;
  let nextProject = null;

  try {
    const dbProjects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      include: {
        caseStudy: true,
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    if (dbProjects && dbProjects.length > 0) {
      const projectIndex = dbProjects.findIndex((p) => p.slug === slug);
      if (projectIndex !== -1) {
        project = dbProjects[projectIndex];
        nextProject = dbProjects[(projectIndex + 1) % dbProjects.length];
      }
    }
  } catch (err) {
    console.error("Database connection failed, falling back to static data for CaseStudyPage:", err);
  }

  // Fallback to static data if DB query failed or project not found in DB
  if (!project) {
    const projectIndex = projects.findIndex((p) => p.slug === slug);
    if (projectIndex === -1) notFound();
    project = projects[projectIndex];
    nextProject = projects[(projectIndex + 1) % projects.length];
  }

  // Handle number formatting (DB int vs static string)
  const formattedNumber = typeof project.number === 'number' ? String(project.number).padStart(2, '0') : project.number;

  // STRICT SAFE DESTRUCTURING: NEVER spread the raw caseStudy object.
  // Explicitly pull ONLY the 5 safe fields so draft fields are completely omitted from the render path.
  const { overview, problem, approach, challenge, result } = project.caseStudy || {};

  const sections = [
    { label: "OVERVIEW", content: overview },
    { label: "PROBLEM", content: problem },
    { label: "APPROACH", content: approach },
    { label: "CHALLENGE", content: challenge },
    { label: "RESULT", content: result },
  ];

  // Map gallery images
  let gallery = [];
  if (project.images && Array.isArray(project.images)) {
    gallery = project.images.map(img => ({ src: img.url, alt: img.alt }));
  } else if (project.gallery && Array.isArray(project.gallery)) {
    gallery = project.gallery;
  }

  // Map links
  const repoLink = project.repoUrl || (project.links && project.links.repo);
  const demoLink = project.demoUrl || (project.links && project.links.demo);

  return (
    <main className="bg-[var(--bg)] text-[var(--text)] min-h-screen pt-[calc(var(--nav-h)+2rem)]">
      <div className="px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto pb-32">
        {/* BACK LINK */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-12"
        >
          ← All works
        </Link>

        {/* HEADER */}
        <div className="mb-12">
          <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4">
            PROJECT {formattedNumber}
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text)] pb-[0.22em] -mb-[0.22em]">
            {project.title}
          </h1>
          <p className="mt-4 text-xl lg:text-2xl italic text-[var(--accent)]">
            {project.framing}
          </p>

          {/* META ROW */}
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-[var(--text-muted)]">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
            {project.year && (
              <span className="text-[var(--line)]">· {project.year}</span>
            )}
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative aspect-[16/10] rounded-sm border border-[var(--line)] overflow-hidden mb-20 lg:mb-24">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* CASE STUDY SECTIONS */}
        <div className="flex flex-col gap-16 lg:gap-20">
          {sections.map(
            (section) =>
              section.content && (
                <div
                  key={section.label}
                  className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-12"
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                    {section.label}
                  </div>
                  <p className="text-lg leading-relaxed text-[var(--text)] max-w-[640px]">
                    {section.content}
                  </p>
                </div>
              )
          )}
        </div>

        {/* INTERACTIVE DEMO PLACEHOLDER FOR STEGANOGRAPHY */}
        {/* TODO: Add interactive steganography demo component here.
            When ready, render an interactive embed that lets visitors
            encode/decode a message in an image. For now, nothing is rendered. */}

        {/* GALLERY */}
        <Lightbox gallery={gallery} />

        {/* LINKS */}
        <div className="mt-20 lg:mt-24 pt-8 border-t border-[var(--line)] flex flex-wrap gap-6">
          {repoLink && (
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm uppercase tracking-widest text-[var(--text)] hover:text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--accent)] transition-colors"
            >
              Code →
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm uppercase tracking-widest text-[var(--text)] hover:text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--accent)] transition-colors"
            >
              Live Demo →
            </a>
          )}
        </div>

        {/* NEXT PROJECT */}
        <div className="mt-20 lg:mt-32 pt-8 border-t border-[var(--line)]">
          <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4">
            Next project
          </div>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-[var(--text)] hover:text-[var(--accent)] transition-colors pb-[0.22em] -mb-[0.22em] inline-block"
          >
            {nextProject.title} →
          </Link>
        </div>
      </div>
    </main>
  );
}
