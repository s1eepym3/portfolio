"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="px-10 md:px-20 py-20 bg-slate-900"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >

      <h2 className="text-3xl font-bold mb-8 text-sky-400">
        About Me
      </h2>

      <p className="max-w-3xl text-gray-300 leading-relaxed">
        I am a 6th-semester Informatics student at Malikussaleh University with a strong interest in software engineering and backend development. My primary programming language is Python, and I also have experience working with JavaScript, Node.js, and PHP.
        I have built several web-based systems and backend projects using technologies such as MongoDB and MySQL. Through these projects, I focus on developing efficient, scalable, and reliable systems.
        I enjoy exploring topics related to backend architecture, system security, and data processing. I am also actively improving my skills through personal projects and challenges, including participation in the ABC Challenge 2026.
      </p>

    </motion.section>
  );
}