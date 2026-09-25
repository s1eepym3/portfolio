"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionLabel from "./ui/SectionLabel";

export default function Lightbox({ gallery }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusedThumb, setFocusedThumb] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const thumbRefs = useRef([]);
  const modalRef = useRef(null);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    if (focusedThumb) {
      setTimeout(() => focusedThumb.focus(), 0);
    }
  }, [focusedThumb]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          closeLightbox();
        } else if (e.key === "ArrowLeft") {
          prevImage();
        } else if (e.key === "ArrowRight") {
          nextImage();
        } else if (e.key === "Tab") {
          // Trap focus
          const focusable = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable && focusable.length > 0) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
              if (document.activeElement === first) {
                last.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === last) {
                first.focus();
                e.preventDefault();
              }
            }
          }
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, closeLightbox, nextImage, prevImage]);

  const openLightbox = (index) => {
    setFocusedThumb(document.activeElement);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      <div className="mt-16 lg:mt-20">
        <SectionLabel number="" label="GALLERY" />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((img, index) => (
            <button
              key={index}
              ref={(el) => (thumbRefs.current[index] = el)}
              onClick={() => openLightbox(index)}
              className="relative aspect-[4/3] w-full rounded-sm border border-[var(--line)] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] hover:border-[var(--accent)] transition-colors group p-2 bg-[var(--bg-elevated)]"
              aria-label={`Open gallery image ${index + 1}`}
            >
              <div className="relative w-full h-full rounded-sm overflow-hidden bg-black/30">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]/95 backdrop-blur-sm"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
            ref={modalRef}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--text)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] z-[101]"
              aria-label="Close"
              autoFocus
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Prev/Next Controls (only if >1 image) */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--text)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] z-[101]"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--text)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] z-[101]"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              initial={shouldReduceMotion ? false : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={shouldReduceMotion ? false : { scale: 0.95, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              className="relative w-[90vw] h-[85dvh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[currentIndex].src}
                alt={gallery[currentIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
