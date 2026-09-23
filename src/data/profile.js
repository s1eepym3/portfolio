import { FaGraduationCap, FaCode, FaAward, FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export const profileData = {
  name: "Mohammad Haykhal",
  university: "Universitas Malikussaleh",
  semester: "6th",
  titles: ["Backend Developer", "Software Engineer"],
  headline: "I build things for the web and explore security in modern systems.",
  // TODO: Add more detailed bio if needed
  about: {
    paragraphs: [
      "I am a 6th-semester Informatics student at Universitas Malikussaleh with a strong interest in software engineering and web development.",
      "My primary expertise lies in Python, and I have extensive experience building scalable systems using Node.js, PHP, and modern database solutions like MySQL and MongoDB.",
      "Beyond coding, I enjoy exploring system architecture and security. I am currently honing my skills through challenging personal projects and participating in initiatives like the ABC Challenge 2026 to push my technical boundaries."
    ],
    // TODO: Add past work experience or internships below. 
    // NEVER render this TODO in the UI.
    timeline: [
      {
        year: "2026",
        role: "Participant",
        company: "ABC Challenge 2026"
      },
      {
        year: "2021 — Present",
        role: "Informatics Student",
        company: "Universitas Malikussaleh (6th semester)"
      }
    ],
    capabilities: [
      {
        id: "01",
        title: "Encryption",
        description: "Files the server itself cannot read.",
        projects: [
          "Secure REST API with End-to-End Encryption",
          "Image Steganography for Secure Message Embedding"
        ]
      },
      {
        id: "02",
        title: "Access control",
        description: "Who can do what, and who approved it.",
        projects: [
          "Multimedia Lab Inventory Management"
        ]
      },
      {
        id: "03",
        title: "Accountability",
        description: "A record of what happened.",
        projects: [
          "Multimedia Lab Inventory Management"
        ]
      },
      {
        id: "04",
        title: "Delivery",
        description: "Packaged so it runs anywhere.",
        projects: [
          "ProStream: Meme & Video Rescuer"
        ]
      }
    ]
  },
  email: "mohdhaykhal67@gmail.com",
  contact: {
    description: "I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    email: "mohdhaykhal67@gmail.com",
    links: [
      {
        name: "Email",
        value: "mohdhaykhal67@gmail.com",
        href: "mailto:mohdhaykhal67@gmail.com",
        icon: <FaEnvelope />,
        color: "hover:text-red-400"
      },
      {
        name: "GitHub",
        value: "github.com/s1eepym3",
        href: "https://github.com/s1eepym3",
        icon: <FaGithub />,
        color: "hover:text-gray-400"
      },
      {
        name: "WhatsApp",
        value: "https://wa.me/6283197027655",
        href: "https://wa.me/6283197027655",
        icon: <FaWhatsapp />,
        color: "hover:text-green-400"
      },
      {
        name: "LinkedIn",
        value: "Mohammad Haykhal",
        href: "https://www.linkedin.com/in/mohammad-haykhal-a40aaa405",
        icon: <FaLinkedin />,
        color: "hover:text-blue-400"
      }
    ]
  },
  socials: {
    github: "https://github.com/s1eepym3",
    linkedin: "https://www.linkedin.com/in/mohammad-haykhal-a40aaa405",
    whatsapp: "https://wa.me/6283197027655",
    // TODO: Add Twitter/X or other links if needed
  }
};
