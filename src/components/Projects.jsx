"use client";

import { useState } from "react";
import Image from "next/image";
import projects from "../data/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="px-6 md:px-20 py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full -mr-48 -mt-48"></div>

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="h-1.5 w-20 bg-cyan-500 rounded-full"></div>
        </motion.div>

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.cover}
                  width={600}
                  height={400}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                
                {/* QUICK LINKS ON HOVER */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/40 backdrop-blur-sm">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-semibold shadow-xl hover:bg-cyan-400 hover:text-white transition"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-2">
                  {project.description}
                </p>

                {/* TECH STACK BADGES */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* BOTTOM LINKS */}
                <div className="flex items-center gap-6 pt-4 border-t border-slate-700/50">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                      <FaGithub size={20}/>
                      <span className="text-sm">Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                      <FaExternalLinkAlt size={16}/>
                      <span className="text-sm">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl shadow-cyan-500/10"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white z-10 bg-slate-800 p-2 rounded-full transition"
              >
                <FaTimes size={20}/>
              </button>

              <div className="flex flex-col md:flex-row">
                {/* LEFT: SLIDER */}
                <div className="md:w-3/5 p-6 md:p-8">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView={1}
                    className="rounded-2xl overflow-hidden shadow-2xl"
                  >
                    {selectedProject.images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className="aspect-video relative">
                          <Image
                            src={img}
                            fill
                            alt="Project screenshot"
                            className="object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* RIGHT: DETAILS */}
                <div className="md:w-2/5 p-8 md:pl-0">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tech.map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-slate-800 text-cyan-400 border border-slate-700 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-4">
                    {selectedProject.github && (
                      <a 
                        href={selectedProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl transition"
                      >
                        <FaGithub size={20}/>
                        View Source Code
                      </a>
                    )}
                    {selectedProject.demo && (
                      <a 
                        href={selectedProject.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full bg-cyan-500 hover:bg-cyan-400 text-white py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition"
                      >
                        <FaExternalLinkAlt size={16}/>
                        Live Preview
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}