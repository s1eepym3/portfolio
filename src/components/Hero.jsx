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
            "Machine Learning Enthusiast",
            2000,
          ]}
          wrapper="h2"
          speed={50}
          repeat={Infinity}
          className="text-2xl text-gray-300 mb-6"
        />

        <p className="max-w-xl text-gray-400 mb-8">
          I build scalable web systems and data-driven solutions.
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
    <div className="flex justify-center mt-10 md:mt-0">
  <Image
    src="/profile02.png"
    alt="Profile"
    width={300}
    height={300}
    className="rounded-full border-4 border-cyan-400 shadow-lg shadow-cyan-500/30"
    />
    </div>

    </section>
  );
}