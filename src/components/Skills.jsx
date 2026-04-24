"use client";

import { motion } from "framer-motion";
import { FaPython, FaGithub, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMysql, SiPhp, SiExpress, SiMongodb } from "react-icons/si";

const skillCategories = [
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-20 py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -ml-48 -mb-48"></div>

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Technical <span className="text-cyan-400">Skills</span>
          </h2>
          <div className="h-1.5 w-20 bg-cyan-500 rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-6 bg-cyan-500 rounded-full"></span>
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="group flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-transparent hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        {skill.icon}
                      </div>
                      <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold group-hover:text-cyan-400 transition-colors">
                      {skill.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}