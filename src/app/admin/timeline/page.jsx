import prisma from '@/lib/prisma';
import TimelineClient from './TimelineClient';

export const dynamic = 'force-dynamic';

export default async function TimelineAdminPage() {
  const entries = await prisma.timelineEntry.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div>
      <h1 className="text-3xl font-serif text-[var(--text)] mb-6">Timeline</h1>
      <TimelineClient initialEntries={entries} />
    </div>
  );
}
