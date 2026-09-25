"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
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
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const clickTimesRef = useRef([]);

  useEffect(() => {
    if (showAdminLogin) {
      const handleEsc = (e) => {
        if (e.key === "Escape") {
          setShowAdminLogin(false);
          setPassword("");
          setLoginError("");
          clickTimesRef.current = [];
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [showAdminLogin]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setLoginError(data?.error || "Login failed");
      } else {
        setLoginSuccess(true);
        setTimeout(() => {
          setShowAdminLogin(false);
          setLoginSuccess(false);
          setPassword("");
          router.push("/admin/timeline");
        }, 500);
      }
    } catch (err) {
      setLoginError("An error occurred. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setMenuOpen(false);
          toggleRef.current?.focus();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      // Wait for animation, then focus first link
      const timer = setTimeout(() => {
        if (menuRef.current) {
          const firstLink = menuRef.current.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      }, 100);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [menuOpen]);

  const lastScrollY = useRef(0);
  const isScrolledRef = useRef(false);
  const isHiddenRef = useRef(false);

  const isHome = pathname === "/";

  // Handle hash scrolling when arriving from another page
  useEffect(() => {
    if (isHome && window.location.hash) {
      const hash = window.location.hash;
      // Small delay to let lenis initialize
      const timer = setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(hash, { offset: -80, immediate: false });
        } else {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isHome, lenis]);

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

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    if (isHome) {
      // On home page, use lenis smooth scroll
      const hash = href.replace("/", "");
      if (lenis) {
        lenis.scrollTo(hash, { offset: -80 });
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On other pages, navigate to home with hash
      router.push(href);
    }
  };

  const handleLogo = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    // Hidden admin trigger logic
    const now = Date.now();
    let times = clickTimesRef.current || [];
    times = times.filter(t => now - t <= 3000);
    times.push(now);
    clickTimesRef.current = times;

    if (times.length >= 5) {
      setShowAdminLogin(true);
      clickTimesRef.current = [];
    }

    if (isHome) {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0 });
      }
    } else {
      router.push("/");
    }
  };

  const links = [
    { label: "Perspective", href: "/#about" },
    { label: "Foundations", href: "/#skills" },
    { label: "Works", href: "/#projects" },
    { label: "Contact", href: "/#contact" }
  ];

  // Mobile menu keeps nav visible
  const isNavHidden = !menuOpen && isHidden;

  return (
    <>
      <header 
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
        <nav className="w-full flex items-center justify-between">
        {/* LOGO */}
        <Link 
          id="navbar-logo"
          href="/" 
          onClick={handleLogo} 
          className="text-xl font-serif font-normal text-[var(--text)]"
        >
          MH.
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-sm font-mono uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          <StatusPill />
          <ThemeToggle />
          
          {/* MOBILE MENU TOGGLE */}
          <button 
            ref={toggleRef}
            className="md:hidden text-[var(--text)] p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
        </nav>
      </header>

      {/* ADMIN LOGIN MODAL */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowAdminLogin(false);
                setPassword("");
                setLoginError("");
                clickTimesRef.current = [];
              }
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--bg-elevated)] border border-[var(--line)] p-8 max-w-sm w-full font-mono relative"
            >
              <button 
                onClick={() => {
                  setShowAdminLogin(false);
                  setPassword("");
                  setLoginError("");
                  clickTimesRef.current = [];
                }}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
              
              <h2 className="text-xl font-serif text-[var(--text)] mb-6">Authorization</h2>
              
              {loginSuccess ? (
                <div className="text-[var(--success)] flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)]"></span>
                  </span>
                  Session active
                </div>
              ) : (
                <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter passphrase"
                      className="w-full bg-[var(--bg)] border border-[var(--line)] text-[var(--text)] px-4 py-3 focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-muted)]"
                      autoFocus
                    />
                  </div>
                  {loginError && (
                    <div className="text-red-400 text-sm">{loginError}</div>
                  )}
                  <button
                    type="submit"
                    disabled={isLoggingIn || !password}
                    className="w-full bg-[var(--accent)] text-black px-4 py-3 font-semibold hover:bg-[#b08b3b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingIn ? "Verifying..." : "Access"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[var(--bg)] flex flex-col p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex items-center justify-between w-full mb-12">
              <span className="text-xl font-serif font-normal text-[var(--text)]">MH.</span>
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
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="text-4xl font-serif font-normal text-[var(--text)] hover:text-[var(--accent)] transition-colors block pb-[0.1em]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
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
