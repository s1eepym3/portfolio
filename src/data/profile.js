import { FaGraduationCap, FaCode, FaAward, FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export const profileData = {
  name: "Mohammad Haykhal",
  titles: ["Web Developer", "Software Developer"],
  description: "I build things for the web and explore security in modern systems.",
  about: {
    paragraphs: [
      "I am a 6th-semester Informatics student at <span class='text-white font-semibold'>Malikussaleh University</span> with a strong interest in software engineering and web development.",
      "My primary expertise lies in <span class='text-yellow-400 font-mono'>Python</span>, and I have extensive experience building scalable systems using <span class='text-white font-semibold'>Node.js</span>, <span class='text-white font-semibold'>PHP</span>, and modern database solutions like <span class='text-blue-400'>MySQL</span> and <span class='text-green-400'>MongoDB</span>.",
      "Beyond coding, I enjoy exploring system architecture and security. I am currently honing my skills through challenging personal projects and participating in initiatives like the <span class='text-cyan-400 font-bold italic'>ABC Challenge 2026</span> to push my technical boundaries."
    ],
    stats: [
      { label: "Semester", value: "6th", icon: <FaGraduationCap />, color: "text-blue-400" },
      { label: "Projects", value: "10+", icon: <FaCode />, color: "text-cyan-400" },
      { label: "Interests", value: "Backend", icon: <FaAward />, color: "text-purple-400" },
    ]
  },
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
        value: "+62 831-9702-7655",
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
  }
};
