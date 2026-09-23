import { FaPython, FaGithub, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMysql, SiPhp, SiExpress, SiMongodb } from "react-icons/si";

export const skillCategories = [
  {
    title: "Backend Development",
    skills: [
      { name: "Python", icon: <FaPython className="text-yellow-400" />, level: "Advanced" },
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, level: "Intermediate" },
      { name: "PHP", icon: <SiPhp className="text-indigo-400" />, level: "Intermediate" },
      { name: "Express", icon: <SiExpress className="text-gray-300" />, level: "Intermediate" },
    ],
  },
  {
    title: "Frontend & Design",
    skills: [
      { name: "Next.js", icon: <SiNextdotjs className="text-white" />, level: "Intermediate" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, level: "Advanced" },
      { name: "React", icon: <SiNextdotjs className="text-blue-400" />, level: "Intermediate" },
    ],
  },
  {
    title: "Databases & Tools",
    skills: [
      { name: "MySQL", icon: <SiMysql className="text-blue-500" />, level: "Advanced" },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: "Intermediate" },
      { name: "GitHub", icon: <FaGithub className="text-white" />, level: "Advanced" },
    ],
  },
];
