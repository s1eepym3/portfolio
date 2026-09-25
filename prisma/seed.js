const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

const projectsData = [
  {
    slug: "e2ee-secure-api",
    number: 1,
    title: "Secure REST API with End-to-End Encryption",
    framing: "Files the server itself cannot read.",
    summary: "Secure backend API for encrypted file storage using MongoDB GridFS with end-to-end encryption.",
    stack: ["Node.js", "Express", "MongoDB", "GridFS"],
    image: "/projects/secureapi/logingridfs.png",
    repoUrl: "https://github.com/s1eepym3/Implementasi-E2EE-MongoDB",
    demoUrl: null,
    year: null,
    gallery: [],
    caseStudy: {
      overview: "Secure backend API for encrypted file storage using MongoDB GridFS with end-to-end encryption."
    }
  },
  {
    slug: "steganography",
    number: 2,
    title: "Image Steganography for Secure Message Embedding",
    framing: "A message hidden in plain sight.",
    summary: "Application that hides secret messages inside images using the Least Significant Bit (LSB) steganography technique.",
    stack: ["Python", "OpenCV", "PIL", "NumPy"],
    image: "/projects/Steganogrphy/overview.png",
    repoUrl: "https://github.com/s1eepym3/Project_Steganography",
    demoUrl: "https://project-steganography.vercel.app/",
    year: null,
    gallery: [
      { src: "/projects/Steganogrphy/embed.png", alt: "Image Steganography for Secure Message Embedding screenshot 1" },
      { src: "/projects/Steganogrphy/extract.png", alt: "Image Steganography for Secure Message Embedding screenshot 2" }
    ],
    caseStudy: {
      overview: "Application that hides secret messages inside images using the Least Significant Bit (LSB) steganography technique."
    }
  },
  {
    slug: "lab-inventory",
    number: 3,
    title: "Multimedia Lab Inventory Management",
    framing: "Accountability by design.",
    summary: "A professional inventory system designed to track and manage multimedia laboratory assets. Featuring role-based access control (Admin/Member), automated stock transaction logging, and a secure user approval workflow to ensure accountability and streamlined resource management.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vite"],
    image: "/projects/inventaris/login.png",
    repoUrl: "https://github.com/s1eepym3/Sistem-Inventaris-Lab-Multimedia",
    demoUrl: null,
    year: null,
    gallery: [],
    caseStudy: {
      overview: "A professional inventory system designed to track and manage multimedia laboratory assets. Featuring role-based access control (Admin/Member), automated stock transaction logging, and a secure user approval workflow to ensure accountability and streamlined resource management."
    }
  },
  {
    slug: "prostream",
    number: 4,
    title: "ProStream: Meme & Video Rescuer",
    framing: "Packaged to run anywhere.",
    summary: "A containerized media processing tool built with React and Node.js. The Express backend handles video extraction and conversion, while Docker ensures consistent deployment across any environment.",
    stack: ["React", "Node.js", "Docker", "Express", "Tailwind"],
    image: "/projects/converter/dashboard.png",
    repoUrl: "https://github.com/s1eepym3/YT_TT_Converter",
    demoUrl: null,
    year: null,
    gallery: [],
    caseStudy: {
      overview: "A containerized media processing tool built with React and Node.js. The Express backend handles video extraction and conversion, while Docker ensures consistent deployment across any environment."
    }
  }
];

const timelineData = [
  {
    year: "2025",
    role: "Participant",
    company: "ABC Challenge 2026"
  },
  {
    year: "2026",
    role: "Participant",
    company: "Gemastik 2026"
  },
  {
    year: "2023 \u2014 Present",
    role: "Informatics Student",
    company: "Universitas Malikussaleh (6th semester)"
  }
];

const capabilityData = [
  {
    number: 1,
    name: "Encryption",
    framing: "Files the server itself cannot read.",
    proofSlugs: ["e2ee-secure-api", "steganography"]
  },
  {
    number: 2,
    name: "Access control",
    framing: "Who can do what, and who approved it.",
    proofSlugs: ["lab-inventory"]
  },
  {
    number: 3,
    name: "Accountability",
    framing: "A record of what happened.",
    proofSlugs: ["lab-inventory"]
  },
  {
    number: 4,
    name: "Delivery",
    framing: "Packaged so it runs anywhere.",
    proofSlugs: ["prostream"]
  }
];

async function main() {
  console.log('Seeding database...');
  
  // 1. Projects
  for (let i = 0; i < projectsData.length; i++) {
    const p = projectsData[i];
    console.log(`Upserting project: ${p.slug}`);
    
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {
        number: p.number,
        title: p.title,
        framing: p.framing,
        summary: p.summary,
        stack: p.stack,
        image: p.image,
        year: p.year,
        repoUrl: p.repoUrl,
        demoUrl: p.demoUrl,
        order: i,
        caseStudy: {
          upsert: {
            create: {
              overview: p.caseStudy.overview || null,
              problem: p.caseStudy.problem || null,
              approach: p.caseStudy.approach || null,
              challenge: p.caseStudy.challenge || null,
              result: p.caseStudy.result || null
            },
            update: {
              overview: p.caseStudy.overview || null,
              problem: p.caseStudy.problem || null,
              approach: p.caseStudy.approach || null,
              challenge: p.caseStudy.challenge || null,
              result: p.caseStudy.result || null
            }
          }
        }
      },
      create: {
        slug: p.slug,
        number: p.number,
        title: p.title,
        framing: p.framing,
        summary: p.summary,
        stack: p.stack,
        image: p.image,
        year: p.year,
        repoUrl: p.repoUrl,
        demoUrl: p.demoUrl,
        order: i,
        caseStudy: {
          create: {
            overview: p.caseStudy.overview || null,
            problem: p.caseStudy.problem || null,
            approach: p.caseStudy.approach || null,
            challenge: p.caseStudy.challenge || null,
            result: p.caseStudy.result || null
          }
        }
      }
    });

    const projectRecord = await prisma.project.findUnique({ where: { slug: p.slug } });

    // Handle images
    // First, delete existing images to avoid duplicates, then recreate
    await prisma.projectImage.deleteMany({ where: { projectId: projectRecord.id } });
    
    for (let j = 0; j < p.gallery.length; j++) {
      const img = p.gallery[j];
      await prisma.projectImage.create({
        data: {
          projectId: projectRecord.id,
          url: img.src,
          alt: img.alt,
          sortOrder: j
        }
      });
    }
  }

  // 2. Timeline
  for (let i = 0; i < timelineData.length; i++) {
    const t = timelineData[i];
    console.log(`Upserting timeline: ${t.company}`);
    // Since TimelineEntry has no unique natural key besides ID, we will find by company+role
    const existing = await prisma.timelineEntry.findFirst({
      where: { company: t.company, role: t.role }
    });

    if (existing) {
      await prisma.timelineEntry.update({
        where: { id: existing.id },
        data: { year: t.year, order: i }
      });
    } else {
      await prisma.timelineEntry.create({
        data: {
          year: t.year,
          role: t.role,
          company: t.company,
          order: i
        }
      });
    }
  }

  // 3. Capabilities
  for (let i = 0; i < capabilityData.length; i++) {
    const c = capabilityData[i];
    console.log(`Upserting capability: ${c.name}`);
    
    // Find by number to avoid duplicates
    const existing = await prisma.capability.findFirst({
      where: { number: c.number }
    });

    if (existing) {
      await prisma.capability.update({
        where: { id: existing.id },
        data: {
          name: c.name,
          framing: c.framing,
          proofSlugs: c.proofSlugs,
          order: i
        }
      });
    } else {
      await prisma.capability.create({
        data: {
          number: c.number,
          name: c.name,
          framing: c.framing,
          proofSlugs: c.proofSlugs,
          order: i
        }
      });
    }
  }

  // 4. Site Settings
  console.log('Upserting site setting: status_pill_text');
  await prisma.siteSetting.upsert({
    where: { key: 'status_pill_text' },
    update: { value: 'Open for internship & collaboration' },
    create: { key: 'status_pill_text', value: 'Open for internship & collaboration' }
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
