"use client";

import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-screen grid md:grid-cols-2 items-center px-10 md:px-20 bg-[radial-gradient(circle_at_1px_1px,#1f2937_1px,transparent_0)] bg-[size:40px_40px]">

      {/* TEXT */}
      <div>
        <h1 className="text-5xl font-bold mb-6">
          Hi, I'm <span className="text-sky-400">Mohammad Haykhal</span>
        </h1>

        <TypeAnimation
          sequence={[
            "Backend Developer",
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

        {/* Bingkai Gradient dengan Animasi */}
        <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/20 hover:scale-105 transition-transform duration-500">
          <div className="bg-slate-900 rounded-2xl overflow-hidden">
            <Image
              src="/profile02.JPG"
              alt="Profile"
              width={400}
              height={400}
              className="object-cover hover:scale-110 transition-transform duration-700"
              priority
            />
          </div>
        </div>
      </div>

    </section>
  );
}