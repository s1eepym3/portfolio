"use client";

import { useState } from "react";
import projects from "../data/projects";

export default function Projects() {

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="px-10 md:px-20 py-20 bg-slate-900">

      <h2 className="text-3xl font-bold mb-12 text-sky-400">
        Featured Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        {projects.map((project, index) => (

          <div
            key={index}
            onClick={() => setSelectedProject(project)}
            className="bg-slate-900 border border-slate-800 hover:border-cyan-500 p-8 rounded-2xl hover:scale-105 transition cursor-pointer"
          >

            <h3 className="text-2xl font-semibold mb-3">
              {project.title}
            </h3>

            <p className="text-gray-400 mb-4">
              {project.description}
            </p>

            <p className="text-sm text-gray-500">
              Tech: {project.tech}
            </p>

          </div>

        ))}

      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">

          <div className="bg-slate-900 p-10 rounded-xl max-w-lg">

            <h3 className="text-2xl font-bold mb-4">
              {selectedProject.title}
            </h3>

            <p className="text-gray-400 mb-4">
              {selectedProject.description}
            </p>

            <p className="text-gray-500 mb-6">
              Tech: {selectedProject.tech}
            </p>

            <button
              onClick={() => setSelectedProject(null)}
              className="bg-sky-500 px-5 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </section>
  );
}