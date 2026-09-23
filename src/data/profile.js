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
    stats: [
      { label: "Semester", value: "6th" },
      { label: "Projects", value: "10+" },
      { label: "Focus", value: "Backend & Security" }
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
