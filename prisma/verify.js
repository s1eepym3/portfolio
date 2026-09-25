const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  console.log("=== VERIFICATION SUMMARY ===");
  
  const projectCount = await prisma.project.count();
  const imageCount = await prisma.projectImage.count();
  const caseStudyCount = await prisma.caseStudy.count();
  const timelineCount = await prisma.timelineEntry.count();
  const capabilityCount = await prisma.capability.count();
  const settingCount = await prisma.siteSetting.count();

  console.log(`Projects: ${projectCount}`);
  console.log(`Project Images: ${imageCount}`);
  console.log(`Case Studies: ${caseStudyCount}`);
  console.log(`Timeline Entries: ${timelineCount}`);
  console.log(`Capabilities: ${capabilityCount}`);
  console.log(`Site Settings: ${settingCount}`);
  console.log("----------------------------");

  console.log("Fetching one complete project (steganography):");
  const project = await prisma.project.findUnique({
    where: { slug: 'steganography' },
    include: {
      images: {
        orderBy: { sortOrder: 'asc' }
      },
      caseStudy: true
    }
  });

  console.log(JSON.stringify(project, null, 2));

  await prisma.$disconnect();
}

verify().catch(console.error);
