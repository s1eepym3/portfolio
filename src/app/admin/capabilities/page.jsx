import prisma from '@/lib/prisma';
import CapabilitiesClient from './CapabilitiesClient';

export default async function CapabilitiesAdminPage() {
  const capabilities = await prisma.capability.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div>
      <h1 className="text-3xl font-serif text-[var(--text)] mb-6">Capabilities</h1>
      <CapabilitiesClient initialCapabilities={capabilities} />
    </div>
  );
}
