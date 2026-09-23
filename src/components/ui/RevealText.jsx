"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function RevealText({ text, className = "", delay = 0, wordsArray = null, ariaLabel = "" }) {
  const shouldReduceMotion = useReducedMotion();
  
  // If wordsArray is provided, use it (allows per-word styling), otherwise split the string
  const words = wordsArray || (typeof text === 'string' ? text.split(" ").map(w => ({ word: w })) : []);
  const label = ariaLabel || (typeof text === 'string' ? text : "");

  if (shouldReduceMotion) {
    return (
      <span className={className} aria-label={label}>
        {words.map((w, i) => (
          <span key={i} className={w.className || ""}>
            {w.word}{" "}
          </span>
        ))}
      </span>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      aria-label={label}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((item, index) => (
        <span key={index} className="overflow-hidden inline-block mr-[0.25em] pb-[0.22em] -mb-[0.22em]">
          <motion.span variants={child} className={`inline-block ${item.className || ""}`}>
            {item.word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
