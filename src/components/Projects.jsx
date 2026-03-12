"use client";

import { useState } from "react";
import Image from "next/image";
import projects from "../data/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Projects() {

  const [selectedProject, setSelectedProject] = useState(null);

  return (

    <section id="projects" className="px-6 md:px-20 py-20 bg-slate-900">

      <h2 className="text-3xl font-bold mb-12 text-cyan-400">
        Featured Projects
      </h2>

      {/* PROJECT GRID */}

      <div className="grid md:grid-cols-2 gap-10">

        {projects.map((project, index) => (

          <div
            key={index}
            onClick={() => setSelectedProject(project)}
            className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden cursor-pointer hover:scale-105 hover:border-cyan-500 transition"
          >

            {/* COVER IMAGE */}

            <Image
              src={project.cover}
              width={600}
              height={400}
              alt={project.title}
              className="w-full h-48 object-cover"
            />

            {/* TEXT */}

            <div className="p-6">

              <h3 className="text-xl font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-3">
                {project.description}
              </p>

              <p className="text-sm text-gray-500">
                Tech: {project.tech}
              </p>

            </div>

          </div>

        ))}

      </div>


      {/* PROJECT MODAL */}

      {selectedProject && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          
          <div className="bg-slate-900 rounded-xl max-w-4xl w-full p-8">
          

            {/* TITLE */}

            <h3 className="text-2xl font-bold mb-4">
              {selectedProject.title}
            </h3>

            {/* DESCRIPTION */}

            <p className="text-gray-400 mb-6">
              {selectedProject.description}
            </p>

{/* IMAGE GALLERY SLIDER */}

<Swiper
  spaceBetween={20}
  slidesPerView={1}
  className="mb-6"
>

  {selectedProject.images.map((img, index) => (

    <SwiperSlide key={index}>

      <Image
        src={img}
        width={900}
        height={500}
        alt="Project image"
        className="rounded-lg w-full object-cover"
      />

    </SwiperSlide>

  ))}

</Swiper>

            {/* CLOSE BUTTON */}

            <button
              onClick={() => setSelectedProject(null)}
              className="bg-cyan-500 hover:bg-cyan-400 px-6 py-2 rounded-lg transition"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </section>

  );

}