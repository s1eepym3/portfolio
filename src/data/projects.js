const projects = [
  {
    slug: "e2ee-secure-api",
    number: "01",
    title: "Secure REST API with End-to-End Encryption",
    framing: "Files the server itself cannot read.",
    summary: "Secure backend API for encrypted file storage using MongoDB GridFS with end-to-end encryption.",
    stack: ["Node.js", "Express", "MongoDB", "GridFS"],
    // TODO: Add year when available
    image: "/projects/secureapi/dashboardgridfs.png",
    links: {
      repo: "https://github.com/s1eepym3/Implementasi-E2EE-MongoDB",
    },
    caseStudy: {
      // UNVERIFIED
      overview: "A backend API that ensures uploaded files are encrypted before they ever reach the server. The server stores ciphertext it cannot decrypt, so even a full database breach reveals nothing.",
      // UNVERIFIED
      problem: "Standard file-upload APIs store data in plaintext on the server. If the database or storage layer is compromised, every file is exposed.",
      // UNVERIFIED
      approach: "End-to-end encryption is applied on the client side before upload. Files are stored in MongoDB GridFS as encrypted binary, and only the original uploader holds the decryption key.",
      // TODO: Add specific challenge encountered during development
      // TODO: Add measurable result or outcome
    },
  },
  {
    slug: "steganography",
    number: "02",
    title: "Image Steganography for Secure Message Embedding",
    framing: "A message hidden in plain sight.",
    summary: "Application that hides secret messages inside images using the Least Significant Bit (LSB) steganography technique.",
    stack: ["Python", "OpenCV", "PIL", "NumPy"],
    // TODO: Add year when available
    image: "/projects/Steganogrphy/overview.png",
    links: {
      repo: "https://github.com/s1eepym3/Project_Steganography",
      demo: "https://project-steganography.vercel.app/",
    },
    caseStudy: {
      overview: "A steganography tool that embeds secret text messages into ordinary images by modifying the least significant bits of pixel data, making the changes invisible to the human eye.",
      // UNVERIFIED
      problem: "Sensitive messages sent over public channels can be intercepted. Encryption signals that something is hidden; steganography hides the fact that a message exists at all.",
      // UNVERIFIED
      approach: "The application uses the Least Significant Bit (LSB) technique to embed message data into the RGB channels of an image. The changes are imperceptible, and the resulting image looks identical to the original.",
      // TODO: Add specific challenge encountered during development
      // TODO: Add measurable result or outcome
    },
  },
  {
    slug: "lab-inventory",
    number: "03",
    title: "Multimedia Lab Inventory Management",
    framing: "Accountability by design.",
    summary: "A professional inventory system designed to track and manage multimedia laboratory assets. Featuring role-based access control (Admin/Member), automated stock transaction logging, and a secure user approval workflow to ensure accountability and streamlined resource management.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vite"],
    // TODO: Add year when available
    image: "/projects/inventaris/dashboardadmin.png",
    links: {
      repo: "https://github.com/s1eepym3/Sistem-Inventaris-Lab-Multimedia",
    },
    caseStudy: {
      overview: "A full-stack inventory system for a multimedia laboratory, built to enforce accountability at every level. Admins manage assets and approve users; members request and return items with every transaction logged automatically.",
      // UNVERIFIED
      problem: "Manual tracking of laboratory equipment leads to missing items, unclear responsibility, and no audit trail for who took what and when.",
      // UNVERIFIED
      approach: "Role-based access control separates Admin and Member capabilities. Admins manage the inventory catalog and approve new user registrations. Every stock-in and stock-out transaction is logged with timestamps and user identity, creating a complete audit trail.",
      // TODO: Add specific challenge encountered during development
      // TODO: Add measurable result or outcome
    },
  },
  {
    slug: "prostream",
    number: "04",
    title: "ProStream: Meme & Video Rescuer",
    framing: "Packaged to run anywhere.",
    summary: "A containerized media processing tool built with React and Node.js. The Express backend handles video extraction and conversion, while Docker ensures consistent deployment across any environment.",
    stack: ["React", "Node.js", "Docker", "Express", "Tailwind"],
    // TODO: Add year when available
    image: "/projects/converter/dashboard2.png",
    links: {
      repo: "https://github.com/s1eepym3/YT_TT_Converter",
    },
    caseStudy: {
      // UNVERIFIED
      overview: "A full-stack media processing application with a React frontend and Node.js/Express backend, containerized with Docker for portable, environment-independent deployment.",
      // UNVERIFIED
      problem: "Media processing tools often have complex system dependencies that break across different operating systems and server environments.",
      // UNVERIFIED
      approach: "Docker containerization wraps the entire application stack — frontend, backend, and system dependencies — into a single portable unit. The Express API handles processing logic while React provides the interface.",
      // TODO: Add specific challenge encountered during development
      // TODO: Add measurable result or outcome
    },
  },
];

export default projects;
