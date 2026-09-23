"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionLabel from "./ui/SectionLabel";
import RevealText from "./ui/RevealText";
import MagneticLink from "./ui/MagneticLink";
import { useLenis } from "lenis/react";

export default function Hero() {
  const [showIntro, setShowIntro] = useState(false);
  const [introPhase, setIntroPhase] = useState("initial"); 
  const [logoDest, setLogoDest] = useState({ top: 20, left: 24, width: 40, height: 40 });
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeen = sessionStorage.getItem("intro_seen");

    if (!isReduced && !hasSeen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowIntro(true);
      document.documentElement.classList.remove("intro-pending");
      
      const navLogo = document.getElementById("navbar-logo");
      if (navLogo) {
        const rect = navLogo.getBoundingClientRect();
        setLogoDest({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }

      setTimeout(() => {
        setIntroPhase("shrinking");
      }, 500);

      setTimeout(() => {
        setIntroPhase("done");
        sessionStorage.setItem("intro_seen", "true");
        setShowIntro(false);
      }, 1500);
    } else {
      document.documentElement.classList.remove("intro-pending");
      setIntroPhase("done");
    }
  }, []);

  const line1Words = [
    { word: "I", className: "font-serif font-normal" },
    { word: "build", className: "font-serif font-normal" },
    { word: "what", className: "font-serif font-normal" },
  ];

  const line2Words = [
    { word: "you", className: "font-serif font-normal" },
    { word: "never", className: "font-serif font-normal italic text-[var(--accent)]" },
    { word: "see.", className: "font-serif font-normal italic text-[var(--accent)]" },
  ];

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)] pointer-events-none"
          >
            <motion.div
              initial={{ scale: 1, textShadow: "0px 0px 30px var(--accent)", color: "var(--accent)" }}
              animate={
                introPhase === "shrinking"
                  ? {
                      top: logoDest.top,
                      left: logoDest.left,
                      fontSize: "1.25rem",
                      textShadow: "0px 0px 0px var(--accent)",
                      color: "var(--text)"
                    }
                  : {
                      fontSize: "4rem",
                    }
              }
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={introPhase === "shrinking" ? { position: "absolute", margin: 0 } : { position: "relative" }}
              className="font-serif font-normal"
            >
              MH.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section 
        id="hero-content" 
        className="relative min-h-[100dvh] pt-[110px] pb-20 px-6 md:px-12 lg:px-16 flex flex-col justify-center overflow-hidden"
      >
        {/* SOFT WARM RADIAL GLOW - Independent unclipped element without rectangular bounds */}
        <div 
          aria-hidden="true"
          className="hidden md:block absolute pointer-events-none -z-0"
          style={{
            right: "calc(50vw - 420px)",
            bottom: "10%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201, 169, 97, 0.12) 0%, rgba(201, 169, 97, 0.03) 50%, transparent 70%)",
          }}
        />

        {/* DESKTOP CUTOUT PHOTO (lg screens and up) - Anchored bottom right, z-20 */}
        <div 
          className="hidden lg:flex absolute right-[calc(50vw-376px)] 2xl:right-[calc(50vw-480px)] bottom-0 z-20 pointer-events-none select-none items-end justify-center aspect-[1592/2717]"
          style={{
            height: "calc(100dvh - var(--nav-h) - 3rem)",
            width: "auto"
          }}
        >
          {/* CUTOUT IMAGE WITH FADE AND SHADOW */}
          <Image
            src="/profile-cutout.png"
            alt="Mohammad Haykhal"
            width={1592}
            height={2717}
            priority
            className="h-full w-auto object-contain object-bottom select-none"
            style={{
              filter: "drop-shadow(0 0 10px rgba(201,169,97,0.22)) drop-shadow(0 0 1px rgba(201,169,97,0.32))",
              maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
            }}
          />
        </div>

        {/* HERO CONTENT CONTAINER */}
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center relative">
          
          {/* SECTION LABEL (fits on one line on 375px) */}
          <SectionLabel label="MOHAMMAD HAYKHAL — BACKEND DEVELOPER" />

          {/* HEADLINE: Instrument Serif weight 400, tight leading, negative letter-spacing */}
          <h1 className="font-serif font-normal text-[clamp(3.1rem,13.8vw,4.5rem)] md:text-[clamp(4.2rem,10.5vw,5.5rem)] lg:text-[clamp(3.5rem,10.5vw,11rem)] leading-[0.92] tracking-[-0.02em] mb-8 select-none">
            {/* Line 1: z-10 so it extends ~40-60px behind the shoulder of the photo (z-20) on desktop */}
            <div className="relative z-10">
              {introPhase === "done" ? (
                <RevealText 
                  wordsArray={line1Words} 
                  ariaLabel="I build what" 
                  delay={0}
                  className="font-serif font-normal" 
                />
              ) : (
                <span className="opacity-0 font-serif font-normal">I build what</span>
              )}
            </div>

            {/* Line 2: z-30 so it stays fully in front of the photo (z-20) and 100% readable */}
            <div className="relative z-30 mt-1 lg:mt-2">
              {introPhase === "done" ? (
                <RevealText 
                  wordsArray={line2Words} 
                  ariaLabel="you never see." 
                  delay={0.15}
                  className="font-serif font-normal" 
                />
              ) : (
                <span className="opacity-0 font-serif font-normal">you never see.</span>
              )}
            </div>
          </h1>

          {/* SUBTITLE */}
          <p className="relative z-30 text-lg md:text-xl lg:text-2xl text-[var(--text-muted)] max-w-xl mb-10 leading-relaxed font-sans">
            APIs, databases, and encryption: the quiet parts of software that hold everything up.
          </p>

          {/* CTA BUTTON */}
          <div className="relative z-30 flex items-center">
            <MagneticLink 
              href="#projects" 
              className="group relative px-8 py-4 border border-[var(--line)] rounded-full hover:border-[var(--accent)] transition-colors overflow-hidden"
            >
              <div 
                className="absolute inset-0 bg-[var(--accent)] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" 
              />
              <span 
                className="relative z-10 group-hover:text-[var(--bg)] transition-colors duration-500 font-mono text-sm uppercase tracking-widest" 
                onClick={(e) => {
                  e.preventDefault();
                  if(lenis) lenis.scrollTo('#projects', { offset: -80 });
                  else document.querySelector('#projects')?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                See the work
              </span>
            </MagneticLink>
          </div>

          {/* TABLET / MOBILE CUTOUT PHOTO (stacked below CTA on screens < lg) */}
          <div className="lg:hidden relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[420px] mx-auto aspect-[1592/2717] mt-10 mb-4 pointer-events-none select-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(201,169,97,0.12)_0%,transparent_65%)] pointer-events-none -z-10" />
            <Image
              src="/profile-cutout.png"
              alt="Mohammad Haykhal"
              fill
              priority
              className="object-contain object-bottom select-none"
              sizes="(max-width: 768px) 380px, 480px"
              style={{
                filter: "drop-shadow(0 0 8px rgba(201,169,97,0.2)) drop-shadow(0 0 1px rgba(201,169,97,0.3))",
                maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
              }}
            />
          </div>

          {/* Mobile reduced motion / easter egg line */}
          <div className="lg:hidden mt-4 opacity-25 text-center">
            <span className="font-mono text-xs text-[var(--accent)]">
              {"// you found it. the best parts are usually hidden."}
            </span>
          </div>

        </div>

        {/* SCROLL INDICATOR - Moved to bottom of hero */}
        <div className="absolute bottom-6 left-6 md:left-12 lg:left-16 z-30 flex flex-col items-center gap-2 pointer-events-none">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)]">
            SCROLL
          </span>
          <div className="w-[1px] h-8 bg-[var(--line)] relative overflow-hidden">
            {!shouldReduceMotion ? (
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full bg-[var(--accent)]"
              />
            ) : (
              <div className="w-full h-1/2 bg-[var(--accent)]" />
            )}
          </div>
        </div>

        {/* HIDDEN LANTERN LINE - Revealed under cursor/idle lantern via element-local --lx/--ly */}
        <div className="hidden lg:block absolute bottom-8 right-12 z-20 pointer-events-none">
          <span 
            aria-hidden="true"
            className={`lantern-target font-mono text-xs text-[var(--accent)] select-none ${shouldReduceMotion ? 'opacity-30' : ''}`}
            style={!shouldReduceMotion ? {
              WebkitMaskImage: "radial-gradient(130px circle at var(--lx, -9999px) var(--ly, -9999px), black 20%, transparent 100%)",
              maskImage: "radial-gradient(130px circle at var(--lx, -9999px) var(--ly, -9999px), black 20%, transparent 100%)",
            } : {}}
          >
            {"// you found it. the best parts are usually hidden."}
          </span>
        </div>

      </section>
    </>
  );
}
