"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState("default"); // default, hover, view, hide

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only run on fine pointers (desktops/laptops)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isReducedMotion) {
      return;
    }

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target || !target.closest) return;

      // Check if hiding over inputs
      const isInput = target.closest("input, textarea");
      if (isInput) {
        setCursorState("hide");
        return;
      }

      // Check for specific data-cursor="view"
      const viewTarget = target.closest('[data-cursor="view"]');
      if (viewTarget) {
        setCursorState("view");
        return;
      }

      // Check if hovered over clickable elements
      const isClickable = target.closest("a, button, [role='button']");
      if (isClickable) {
        setCursorState("hover");
        return;
      }

      setCursorState("default");
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const size = cursorState === "hover" ? 40 : cursorState === "view" ? 64 : 12;
  const opacity = cursorState === "hide" ? 0 : 1;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center rounded-full border border-[var(--accent)] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        opacity,
        backgroundColor: cursorState === "default" ? "var(--accent)" : "transparent",
      }}
      aria-hidden="true"
    >
      {cursorState === "view" && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
          View
        </span>
      )}
    </motion.div>
  );
}
