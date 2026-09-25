"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { profileData } from "../data/profile";
import SectionLabel from "./ui/SectionLabel";

const words = [
  { text: "Most", gold: false },
  { text: "people", gold: false },
  { text: "see", gold: false },
  { text: "the", gold: false },
  { text: "interface.", gold: false },
  { text: "I", gold: false },
  { text: "care", gold: false },
  { text: "about", gold: false },
  { text: "what", gold: false },
  { text: "happens", gold: false },
  { text: "after", gold: true },
  { text: "the", gold: true },
  { text: "button", gold: true },
  { text: "is", gold: true },
  { text: "pressed", gold: true },
  { text: ":", gold: false, attached: true },
  { text: "where", gold: false },
  { text: "the", gold: false },
  { text: "data", gold: false },
  { text: "goes,", gold: false },
  { text: "who", gold: false },
  { text: "can", gold: false },
  { text: "read", gold: false },
  { text: "it,", gold: false },
  { text: "and", gold: false },
  { text: "whether", gold: false },
  { text: "it", gold: false },
  { text: "survives", gold: true },
  { text: "a", gold: true },
  { text: "bad", gold: true },
  { text: "day", gold: true },
  { text: ".", gold: false, attached: true },
];

function AnimatedWord({ word, progress, index, total }) {
  const shouldReduceMotion = useReducedMotion();
  
  const start = index / total;
  const end = start + (1 / total);

  // Opacity transitions from 0.35 to 1
  const opacity = useTransform(progress, [start, end], [0.35, 1]);
  
  // Color transitions from text ivory (#EDE8DC) to gold (#C9A961) after lit
  const color = useTransform(
    progress, 
    [end, Math.min(end + 0.1, 1)], 
    word.gold ? ["#EDE8DC", "#C9A961"] : ["#EDE8DC", "#EDE8DC"]
  );

  return (
    <motion.span 
      style={shouldReduceMotion ? {} : { opacity, color }}
      className={`inline-block ${word.attached ? '' : 'mr-[0.2em]'} ${word.gold ? 'italic' : ''} ${shouldReduceMotion && word.gold ? 'text-[var(--accent)]' : ''}`}
    >
      {word.text}
    </motion.span>
  );
}

export default function About({ timeline }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "center center"]
  });

  return (
    <section
      id="about"
      ref={containerRef}
      className="px-6 md:px-12 lg:px-24 py-32 lg:py-48 max-w-[1400px] mx-auto w-full flex flex-col gap-16 relative scroll-mt-24"
    >
      <SectionLabel number="01" label="PERSPECTIVE" />

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* LEFT: STATEMENT */}
        <div className="lg:w-2/3">
          <h2 className="font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--text)] pb-[0.22em] -mb-[0.22em]">
            {words.map((word, idx) => (
              <AnimatedWord 
                key={idx} 
                word={word} 
                progress={scrollYProgress} 
                index={idx} 
                total={words.length} 
              />
            ))}
          </h2>
        </div>

        {/* RIGHT: TIMELINE */}
        <div className="lg:w-1/3 flex flex-col w-full">
          <div className="border-l border-[var(--line)] pl-6 lg:pl-8 flex flex-col gap-10">
            {(timeline || profileData.about.timeline).map((item, idx) => (
              <div key={idx} className="relative flex flex-col gap-1">
                <div className="absolute w-1.5 h-1.5 rounded-full bg-[var(--text)] -left-[27px] lg:-left-[35px] top-[0.4em] opacity-30"></div>
                <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-widest">{item.year}</div>
                <div className="text-xl text-[var(--text)]">{item.role}</div>
                <div className="text-sm text-[var(--text-muted)]">{item.company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}