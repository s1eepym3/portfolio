"use client";

import { useState, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const StatusPill = () => (
  <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-xs text-[var(--text-muted)] tracking-wide">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
    </span>
    Open for internship & collaboration
  </div>
);

export default function Navbar() {
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const lastScrollY = useRef(0);
  const isScrolledRef = useRef(false);
  const isHiddenRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          
          // 1. Threshold for background & blur: 40px
          const scrolled = currentY > 40;
          if (scrolled !== isScrolledRef.current) {
            isScrolledRef.current = scrolled;
            setIsScrolled(scrolled);
          }

          // 2. Hide on scroll down, reveal on scroll up
          if (!menuOpen) {
            if (currentY > 120 && currentY > lastScrollY.current + 8) {
              // Scrolling down
              if (!isHiddenRef.current) {
                isHiddenRef.current = true;
                setIsHidden(true);
              }
            } else if (currentY < lastScrollY.current - 6 || currentY <= 40) {
              // Scrolling up or near top
              if (isHiddenRef.current) {
                isHiddenRef.current = false;
                setIsHidden(false);
              }
            }
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const handleScroll = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(id, { offset: -80 });
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { label: "Perspective", href: "#about" },
    { label: "Foundations", href: "#skills" },
    { label: "Works", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  // Mobile menu keeps nav visible
  const isNavHidden = !menuOpen && isHidden;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 transition-[background-color,border-color,padding,backdrop-filter] duration-300 ease-out flex items-center justify-between ${
          isScrolled 
            ? "bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--line)] py-4" 
            : "bg-transparent border-b border-transparent py-6 backdrop-blur-none"
        }`}
        style={{
          transform: !shouldReduceMotion && isNavHidden ? "translateY(-100%)" : "translateY(0)",
          transitionProperty: shouldReduceMotion ? "background-color, border-color, padding" : "transform, background-color, border-color, padding, backdrop-filter",
          transitionDuration: "0.4s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        
        {/* LOGO */}
        <a 
          id="navbar-logo"
          href="#" 
          onClick={(e) => handleScroll(e, "top")} 
          className="text-xl font-serif font-bold text-[var(--text)]"
        >
          MH.
        </a>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-sm font-mono uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          <StatusPill />
          <ThemeToggle />
          
          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden text-[var(--text)] p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[var(--bg)] flex flex-col p-6"
          >
            <div className="flex items-center justify-between w-full mb-12">
              <span className="text-xl font-serif font-bold text-[var(--text)]">MH.</span>
              <button 
                className="text-[var(--text)] p-2"
                onClick={() => setMenuOpen(false)}
                aria-label="Close Menu"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 items-start pl-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-4xl font-serif text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-sm text-[var(--text-muted)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                </span>
                Open for internship & collaboration
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
