"use client";

import { profileData } from "../data/profile";
import SectionLabel from "./ui/SectionLabel";

export default function Skills() {
  const marqueeItems = [
    "BACKEND", "DATABASES", "FRONTEND", "SYSTEMS", "ENCRYPTION", "APIS", "SECURITY"
  ];

  return (
    <section id="skills" className="py-16 lg:py-24 overflow-hidden w-full relative bg-[var(--bg)] flex flex-col justify-center min-h-[min(100vh,800px)]">
      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full flex-1 flex flex-col justify-center">
        <SectionLabel number="02" label="FOUNDATIONS" />
        
        {/* CAPABILITIES 2x2 GRID */}
        <div className="mt-8 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-0 gap-x-12 lg:gap-x-24">
          {profileData.about.capabilities.map((cap) => (
            <div key={cap.id} className="flex flex-col border-t border-[var(--line)] pt-6 pb-8">
              <div className="font-mono text-xs text-[var(--text-muted)] mb-3">{cap.id}</div>
              <h3 className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] leading-tight text-[var(--text)] mb-2 pb-[0.22em] -mb-[0.22em]">
                {cap.title}
              </h3>
              <p className="text-[var(--text-muted)] text-sm md:text-base mt-0 mb-4">
                {cap.description}
              </p>
              
              <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2">
                {cap.projects.map((proj, i) => (
                  <a 
                    key={i} 
                    href="#projects" 
                    className="font-mono text-[12px] text-[var(--text-muted)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)] focus-visible:text-[var(--accent)] focus-visible:decoration-[var(--accent)] transition-colors py-2 -my-2 outline-none"
                  >
                    {proj}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* STACK BLOCK (TECH) */}
        <div className="mt-8 lg:mt-12 pt-8 border-t border-[var(--line)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 font-mono text-xs text-[var(--text-muted)]">
             <div className="flex flex-col gap-2">
               <span className="uppercase tracking-widest text-[var(--text)]">BACKEND</span>
               <span className="leading-relaxed">Python · Node.js · Express · PHP</span>
             </div>
             <div className="flex flex-col gap-2">
               <span className="uppercase tracking-widest text-[var(--text)]">DATA</span>
               <span className="leading-relaxed">MySQL · MongoDB · GridFS</span>
             </div>
             <div className="flex flex-col gap-2">
               <span className="uppercase tracking-widest text-[var(--text)]">FRONTEND</span>
               <span className="leading-relaxed">Next.js · React · Tailwind CSS</span>
             </div>
             <div className="flex flex-col gap-2">
               <span className="uppercase tracking-widest text-[var(--text)]">TOOLS</span>
               <span className="leading-relaxed">Git/GitHub · Docker</span>
             </div>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div 
        className="mt-12 lg:mt-16 border-y border-[var(--line)] py-3 overflow-hidden flex select-none" 
        aria-hidden="true"
      >
        <div className="flex gap-8 whitespace-nowrap marquee-track min-w-max hover:[animation-play-state:paused] motion-reduce:!animate-none">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="flex gap-8 items-center text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-[0.2em]">
              {marqueeItems.map(item => (
                <span key={item} className="flex items-center gap-8">
                  <span>{item}</span>
                  <span className="text-[var(--line)]">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}