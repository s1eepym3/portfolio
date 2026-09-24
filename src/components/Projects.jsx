"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import projects from "../data/projects";
import SectionLabel from "./ui/SectionLabel";

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Compute slide closest to center of the scroller
  const updateActiveSlide = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
    const slides = scroller.querySelectorAll("[data-slide-index]");

    let closestIdx = 0;
    let minDistance = Infinity;

    slides.forEach((slide) => {
      const idx = Number(slide.getAttribute("data-slide-index"));
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(scrollerCenter - slideCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    // Only update state when active index actually changes
    setActiveIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSlide();
          ticking = false;
        });
        ticking = true;
      }
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSlide);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSlide);
    };
  }, [updateActiveSlide]);

  const scrollToSlide = (index) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const targetSlide = scroller.querySelector(`[data-slide-index="${index}"]`);
    if (!targetSlide) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const slideRect = targetSlide.getBoundingClientRect();
    const targetScrollLeft =
      scroller.scrollLeft +
      (slideRect.left - scrollerRect.left) -
      (scrollerRect.width / 2 - slideRect.width / 2);

    scroller.scrollTo({
      left: targetScrollLeft,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (activeIndex > 0) {
        e.preventDefault();
        scrollToSlide(activeIndex - 1);
      }
    } else if (e.key === "ArrowRight") {
      if (activeIndex < projects.length - 1) {
        e.preventDefault();
        scrollToSlide(activeIndex + 1);
      }
    }
  };

  return (
    <section
      id="projects"
      className="py-8 lg:py-10 max-w-full overflow-x-clip relative flex flex-col justify-center"
      style={{ minHeight: "auto" }}
    >
      {/* HEADER: LABEL & CONTROLS */}
      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <SectionLabel number="03" label="SELECTED WORKS" />
        </div>

        {/* CAROUSEL CONTROLS */}
        <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-auto">
          {/* PROGRESS INDICATOR */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-[var(--text-muted)] min-w-[3.5rem]">
              0{activeIndex + 1} / 0{projects.length}
            </span>
            <div className="w-16 sm:w-20 h-[2px] bg-[var(--line)] rounded-full overflow-hidden">
              <div
                className={`h-full bg-[var(--accent)] ${
                  shouldReduceMotion ? "" : "transition-all duration-300 ease-out"
                }`}
                style={{
                  width: `${((activeIndex + 1) / projects.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* PREV / NEXT BUTTONS */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSlide(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="w-11 h-11 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:border-[var(--accent)] focus-visible:outline-none transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollToSlide(activeIndex + 1)}
              disabled={activeIndex === projects.length - 1}
              aria-label="Next project"
              className="w-11 h-11 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:border-[var(--accent)] focus-visible:outline-none transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* GALLERY WALL HORIZONTAL SCROLLER */}
      <div
        ref={scrollerRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Selected works gallery scroller"
        className="w-full flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-12 lg:px-24 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          scrollPaddingLeft: "1.5rem",
          scrollPaddingRight: "1.5rem",
        }}
      >
        {projects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={project.slug}
              data-slide-index={index}
              className={`relative shrink-0 snap-center w-[84vw] md:w-[min(80vw,640px)] select-none ${
                shouldReduceMotion
                  ? isActive
                    ? "opacity-100"
                    : "opacity-55"
                  : `transition-[transform,opacity] duration-400 ease-out ${
                      isActive
                        ? "opacity-100 scale-100"
                        : "opacity-55 scale-[0.96] hover:opacity-100 hover:scale-100 focus-within:opacity-100 focus-within:scale-100"
                    }`
              }`}
            >
              {/* SOFT WARM RADIAL GLOW FOR ACTIVE SLIDE (NO LARGE BLUR FILTER) */}
              <div
                aria-hidden="true"
                className={`absolute -inset-4 rounded-2xl pointer-events-none ${
                  shouldReduceMotion
                    ? isActive
                      ? "opacity-100"
                      : "opacity-0"
                    : `transition-opacity duration-500 ease-out ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-60 group-focus-within:opacity-60"
                      }`
                }`}
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(200, 169, 110, 0.18) 0%, rgba(200, 169, 110, 0.05) 50%, transparent 75%)",
                }}
              />

              {/* SINGLE LINK TO /projects/[slug] */}
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block focus-visible:outline-none"
              >
                {/* 16:10 FRAMED SCREENSHOT */}
                <div
                  className={`relative aspect-[16/10] w-full rounded-md border overflow-hidden ${
                    shouldReduceMotion
                      ? isActive
                        ? "border-[var(--accent)]"
                        : "border-[var(--line)]"
                      : `transition-colors duration-300 ${
                          isActive
                            ? "border-[var(--accent)]"
                            : "border-[var(--line)] group-hover:border-[var(--accent)] group-focus-visible:border-[var(--accent)]"
                        }`
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={index === 0}
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 84vw, 640px"
                  />
                </div>

                {/* METADATA & TITLE BELOW IMAGE */}
                <div className="mt-3 flex flex-col gap-1 px-0.5">
                  {/* NUMBER & STACK */}
                  <div className="flex items-center justify-between gap-4 font-mono text-xs">
                    <span className="text-[var(--accent)] font-medium">
                      {project.number}
                    </span>
                    <div className="flex flex-wrap gap-x-2 text-[var(--text-muted)] text-[11px] truncate">
                      {project.stack.join(" · ")}
                    </div>
                  </div>

                  {/* TITLE IN INSTRUMENT SERIF WEIGHT 400 (NEVER FONT-BOLD) */}
                  <h3 className="font-serif font-normal text-[clamp(1.5rem,2.2vw,2.25rem)] leading-tight text-[var(--text)] group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)] transition-colors min-h-[2.6rem] flex items-center pb-[0.1em]">
                    {project.title}
                  </h3>

                  {/* FRAMING LINE IN ITALIC GOLD */}
                  <p className="font-serif italic text-[var(--accent)] text-sm -mt-0.5 pb-[0.1em]">
                    {project.framing}
                  </p>

                  {/* VIEW CASE STUDY LINK */}
                  <div className="mt-0.5 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)] transition-colors">
                    <span>View case study</span>
                    <span className="transition-transform group-hover:translate-x-1 duration-200">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}