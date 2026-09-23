"use client";

import { motion } from "framer-motion";
import { profileData } from "../data/profile";

export default function About() {
  const stats = profileData.about.stats;

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
            {profileData.about.paragraphs.map((paragraph, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
            ))}
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