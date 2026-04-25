
const projects = [
  {
    title: "ProStream: Meme & Video Rescuer",
    description: "My personal meme-saver! I built this because I’m tired of buffering or worrying about my favorite TikToks or Youtube Video disappearing forever. This tool lets you 'rescue' videos from YT & TT directly to your storage. Slow internet? No longer a problem!",

    cover: "/projects/converter/dashboard2.png",

    images: [
      "/projects/converter/dashboard.png",
      "/projects/converter/dashboard2.png",
      "/projects/converter/convertyt.png",
      "/projects/converter/converttt.png",
    ],

    tech: ["React", "Node.js", "Docker", "Express", "Tailwind"],

    github: "https://github.com/s1eepym3/YT_TT_Converter",
    demo: ""
  },
  {
    title: "Secure REST API with End-to-End Encryption",
    description: "Secure backend API for encrypted file storage using MongoDB GridFS with end-to-end encryption.",

    cover: "/projects/secureapi/logingridfs.png",

    images: [
      "/projects/secureapi/logingridfs.png",
      "/projects/secureapi/registergridfs.png",
      "/projects/secureapi/dashboardgridfs.png",
      "/projects/secureapi/penyimpanangridfs.png",
    ],

    tech: ["Node.js", "Express", "MongoDB", "GridFS"],

    github: "https://github.com/s1eepym3/Implementasi-E2EE-MongoDB",
    demo: ""
  },

  {
    title: "Image Steganography for Secure Message Embedding",
    description: "Application that hides secret messages inside images using the Least Significant Bit (LSB) steganography technique.",

    cover: "/projects/Steganogrphy/overview.png",

    images: [
      "/projects/Steganogrphy/overview.png",
      "/projects/Steganogrphy/embed.png",
      "/projects/Steganogrphy/extract.png"
    ],

    tech: ["Python", "OpenCV", "PIL", "NumPy"],

    github: "https://github.com/s1eepym3/Project_Steganography",
    demo: "https://project-steganography.vercel.app/"
  },
  {
    title: "Multimedia Lab Inventory Management",
    description: "A professional inventory system designed to track and manage multimedia laboratory assets. Featuring role-based access control (Admin/Member), automated stock transaction logging, and a secure user approval workflow to ensure accountability and streamlined resource management.",

    cover: "/projects/inventaris/dashboardadmin.png",

    images: [
      "/projects/inventaris/login.png",
      "/projects/inventaris/registeruser.png",
      "/projects/inventaris/dashboardadmin.png",
      "/projects/inventaris/dashboarduser.png",
      "/projects/inventaris/databarang.png",
      "/projects/inventaris/barangmasuk.png",
      "/projects/inventaris/barangkeluar.png",
      "/projects/inventaris/adminkelolauser.png",
    ],

    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vite"],

    github: "https://github.com/s1eepym3/Sistem-Inventaris-Lab-Multimedia",
    demo: ""
  }
];

export default projects;