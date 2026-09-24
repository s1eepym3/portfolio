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
  const labelRef = useRef(null);
  const [containerOffset, setContainerOffset] = useState(24);
  const [trailingSpace, setTrailingSpace] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Measure label left offset and compute trailing space needed for the last slide to snap to start
  useEffect(() => {
    const updateDimensions = () => {
      if (labelRef.current && scrollerRef.current) {
        const rect = labelRef.current.getBoundingClientRect();
        const offset = Math.round(rect.left);
        setContainerOffset(offset);

        // Get rendered slide width
        const firstSlide = scrollerRef.current.querySelector("[data-slide-index='0']");
        const slideWidth = firstSlide ? firstSlide.getBoundingClientRect().width : 720;
        const scrollerWidth = scrollerRef.current.clientWidth;

        // Trailing space needed so the last slide's left edge can align with containerOffset
        // scrollerWidth - slideWidth - containerOffset
        const extra = Math.max(0, Math.round(scrollerWidth - slideWidth - offset));
        setTrailingSpace(extra);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Compute slide closest to the left snapped edge of the scroller
  const updateActiveSlide = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const snapTarget = scrollerRect.left + containerOffset;
    const slides = scroller.querySelectorAll("[data-slide-index]");

    let closestIdx = 0;
    let minDistance = Infinity;

    slides.forEach((slide) => {
      const idx = Number(slide.getAttribute("data-slide-index"));
      const rect = slide.getBoundingClientRect();
      const distance = Math.abs(rect.left - snapTarget);

      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    // Only update state when active index actually changes
    setActiveIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
  }, [containerOffset]);

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

    // Target slide left edge aligns with containerOffset
    const targetScrollLeft = targetSlide.offsetLeft - containerOffset;

    scroller.scrollTo({
      left: Math.round(targetScrollLeft),
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
      <div
        className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 lg:mb-8"
      >
        <div ref={labelRef}>
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
        className="w-full flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingLeft: `${containerOffset}px`,
          paddingRight: `${Math.max(containerOffset, 24)}px`,
          scrollPaddingLeft: `${containerOffset}px`,
          scrollPaddingInlineStart: `${containerOffset}px`,
        }}
      >
        {projects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={project.slug}
              data-slide-index={index}
              className="relative shrink-0 snap-start w-[84vw] md:w-[min(80vw,720px)] select-none"
            >
              {/* SOFT WARM RADIAL GLOW FOR ACTIVE SLIDE (NO LARGE BLUR FILTER) */}
              <div
                aria-hidden="true"
                className={`absolute -inset-3 sm:-inset-4 rounded-2xl pointer-events-none ${
                  shouldReduceMotion
                    ? isActive
                      ? "opacity-100"
                      : "opacity-0"
                    : `transition-opacity duration-400 ease-out ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`
                }`}
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(200, 169, 110, 0.16) 0%, rgba(200, 169, 110, 0.04) 50%, transparent 75%)",
                }}
              />

              {/* SINGLE LINK TO /projects/[slug] */}
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block focus-visible:outline-none"
              >
                {/* GALLERY MAT: 12-16px padding in var(--bg-elevated), hairline border, small radius */}
                {/* Inactive: image area at ~0.75 opacity; Active: full opacity + gold border + glow */}
                <div
                  className={`relative p-3 sm:p-4 rounded-md bg-[var(--bg-elevated)] border transition-all duration-300 ${
                    isActive
                      ? "border-[var(--accent)] opacity-100"
                      : "border-[var(--line)] opacity-75 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:border-[var(--accent)] group-focus-visible:border-[var(--accent)]"
                  }`}
                >
                  {/* 16:10 FRAMED SCREENSHOT */}
                  <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-black/30">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={index === 0}
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 84vw, 720px"
                    />
                    {/* SUBTLE DARK OVERLAY ON ACTIVE SLIDE (DOES NOT STACK WITH INACTIVE OPACITY) */}
                    {/* Screenshot is cleanly displayed with no dark overlay */}
                  </div>
                </div>

                {/* METADATA & TITLE BELOW IMAGE: ~0.9 opacity when inactive, 1.0 when active */}
                <div
                  className={`mt-4 flex flex-col gap-1 px-0.5 transition-opacity duration-300 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-90 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  {/* NUMBER & STACK */}
                  <div className="flex items-center justify-between gap-4 font-mono text-xs">
                    <span className="text-[var(--accent)] font-medium shrink-0">
                      {project.number}
                    </span>
                    <div className="text-[var(--text-muted)] text-[11px] truncate text-right min-w-0">
                      {project.stack.join(" · ")}
                    </div>
                  </div>

                  {/* TITLE IN INSTRUMENT SERIF WEIGHT 400 (NEVER FONT-BOLD) */}
                  <h3 className="font-serif font-normal text-[clamp(1.5rem,2.2vw,2.25rem)] leading-tight text-[var(--text)] group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)] transition-colors min-h-[2.8rem] flex items-center pb-[0.1em]">
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

        {/* TRAILING SPACER ELEMENT TO ENSURE EVERY SLIDE CAN SNAP TO START */}
        {trailingSpace > 0 && (
          <div
            aria-hidden="true"
            style={{ width: `${trailingSpace}px` }}
            className="shrink-0 pointer-events-none select-none"
          />
        )}
      </div>
    </section>
  );
}