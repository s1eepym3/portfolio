import prisma from '@/lib/prisma';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      caseStudy: true
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif text-[var(--text)] mb-6">Projects</h1>
      <ProjectsClient initialProjects={projects} />
    </div>
  );
}
