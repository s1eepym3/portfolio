"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaCode, FaAward } from "react-icons/fa";

export default function About() {
  const stats = [
    { label: "Semester", value: "6th", icon: <FaGraduationCap />, color: "text-blue-400" },
    { label: "Projects", value: "10+", icon: <FaCode />, color: "text-cyan-400" },
    { label: "Interests", value: "Backend", icon: <FaAward />, color: "text-purple-400" },
  ];

  return (
    <motion.section
      id="about"
      className="px-6 md:px-20 py-24 bg-slate-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

        {/* LEFT: TEXT CONTENT */}
        <div className="lg:w-3/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              About <span className="text-cyan-400">Me</span>
            </h2>
            <div className="h-1.5 w-20 bg-cyan-500 rounded-full"></div>
          </motion.div>

          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              I am a 6th-semester Informatics student at <span className="text-white font-semibold">Malikussaleh University</span> with a strong interest in software engineering and web development.
            </p>
            <p>
              My primary expertise lies in <span className="text-yellow-400 font-mono">Python</span>, and I have extensive experience building scalable systems using <span className="text-white font-semibold">Node.js</span>, <span className="text-white font-semibold">PHP</span>, and modern database solutions like <span className="text-blue-400">MySQL</span> and <span className="text-green-400">MongoDB</span>.
            </p>
            <p>
              Beyond coding, I enjoy exploring system architecture and security. I am currently honing my skills through challenging personal projects and participating in initiatives like the <span className="text-cyan-400 font-bold italic">ABC Challenge 2026</span> to push my technical boundaries.
            </p>
          </div>
        </div>

        {/* RIGHT: STATS & CARDS */}
        <div className="lg:w-2/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl flex items-center gap-6 backdrop-blur-sm group"
            >
              <div className={`text-4xl ${stat.color} bg-slate-900/50 p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}