"use client";

import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen grid md:grid-cols-2 items-center px-10 md:px-20 pt-32 md:pt-0 bg-[radial-gradient(circle_at_1px_1px,#1f2937_1px,transparent_0)] bg-[size:40px_40px]">

      {/* TEXT */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Hi, I'm <span className="text-sky-400">Mohammad Haykhal</span>
        </h1>

        <TypeAnimation
          sequence={[
            "Web Developer",
            2000,
            "Software Developer",
            2000,
          ]}
          wrapper="h2"
          speed={50}
          repeat={Infinity}
          className="text-2xl text-gray-300 mb-6"
        />

        <p className="max-w-xl text-gray-400 mb-8">
          I build things for the web and explore security in modern systems.
        </p>

        <div className="flex gap-4">
          <a href="#projects" className="bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-lg shadow-lg shadow-cyan-500/20 transition">
            View Projects
          </a>

          <a href="#contact" className="border px-6 py-3 rounded-lg">
            Contact Me
          </a>
        </div>
      </div>

      {/* FOTO */}
      <div className="flex justify-center mt-10 md:mt-0 relative group">
        {/* Efek Cahaya di Belakang (Glow) */}
        <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse"></div>

        <div className="relative p-1 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 shadow-2xl shadow-cyan-500/10 hover:scale-105 transition-transform duration-500">
          <div className="bg-slate-900 rounded-3xl overflow-hidden relative aspect-[4/5] w-[320px] md:w-[400px]">
            <Image
              src="/portfolio/profile02.JPG"
              alt="Profile"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              priority
            />
            {/* Soft Blend Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

    </section>
  );
}