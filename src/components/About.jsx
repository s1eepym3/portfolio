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
        Informatics student with strong interest in backend development and machine learning systems.
        Experienced in building web-based management systems and implementing data processing workflows.
        Passionate about creating efficient, scalable, and data-driven solutions.
      </p>

    </motion.section>
  );
}