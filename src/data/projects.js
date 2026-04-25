
const projects = [
  {
    title: "ProStream: Meme & Video Rescuer",
    description: "My personal meme-saver! I built this because I’m tired of buffering or worrying about my favorite TikToks or Youtube Video disappearing forever. This tool lets you 'rescue' videos from YT & TT directly to your storage. Slow internet? No longer a problem!",

    cover: "/portfolio/projects/converter/dashboard2.png",

    images: [
      "/portfolio/projects/converter/dashboard.png",
      "/portfolio/projects/converter/dashboard2.png",
      "/portfolio/projects/converter/convertyt.png",
      "/portfolio/projects/converter/converttt.png",
    ],

    tech: ["React", "Node.js", "Docker", "Express", "Tailwind"],

    github: "https://github.com/s1eepym3/YT_TT_Converter",
    demo: ""
  },
  {
    title: "Secure REST API with End-to-End Encryption",
    description: "Secure backend API for encrypted file storage using MongoDB GridFS with end-to-end encryption.",

    cover: "/portfolio/projects/secureapi/logingridfs.png",

    images: [
      "/portfolio/projects/secureapi/logingridfs.png",
      "/portfolio/projects/secureapi/registergridfs.png",
      "/portfolio/projects/secureapi/dashboardgridfs.png",
      "/portfolio/projects/secureapi/penyimpanangridfs.png",
    ],

    tech: ["Node.js", "Express", "MongoDB", "GridFS"],

    github: "https://github.com/s1eepym3/Implementasi-E2EE-MongoDB",
    demo: ""
  },
  {
    title: "Image Steganography for Secure Message Embedding",
    description: "Application that hides secret messages inside images using the Least Significant Bit (LSB) steganography technique.",

    cover: "/portfolio/projects/Steganogrphy/overview.png",

    images: [
      "/portfolio/projects/Steganogrphy/overview.png",
      "/portfolio/projects/Steganogrphy/embed.png",
      "/portfolio/projects/Steganogrphy/extract.png"
    ],

    tech: ["Python", "OpenCV", "PIL", "NumPy"],

    github: "https://github.com/s1eepym3/Project_Steganography",
    demo: "https://project-steganography.vercel.app/"
  },
  {
    title: "Multimedia Lab Inventory Management",
    description: "A professional inventory system designed to track and manage multimedia laboratory assets. Featuring role-based access control (Admin/Member), automated stock transaction logging, and a secure user approval workflow to ensure accountability and streamlined resource management.",

    cover: "/portfolio/projects/inventaris/dashboardadmin.png",

    images: [
      "/portfolio/projects/inventaris/login.png",
      "/portfolio/projects/inventaris/registeruser.png",
      "/portfolio/projects/inventaris/dashboardadmin.png",
      "/portfolio/projects/inventaris/dashboarduser.png",
      "/portfolio/projects/inventaris/databarang.png",
      "/portfolio/projects/inventaris/barangmasuk.png",
      "/portfolio/projects/inventaris/barangkeluar.png",
      "/portfolio/projects/inventaris/adminkelolauser.png",
    ],

    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vite"],

    github: "https://github.com/s1eepym3/Sistem-Inventaris-Lab-Multimedia",
    demo: ""
  }
];

export default projects;