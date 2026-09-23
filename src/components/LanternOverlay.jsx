"use client";

import { useEffect, useRef } from "react";

export default function LanternOverlay() {
  const requestRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const isIdle = useRef(false);
  const idleTime = useRef(0);
  const lastTime = useRef(0);
  const angle = useRef(0);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return; // Disable lantern effect if reduced motion

    const updateCoords = (clientX, clientY) => {
      mouse.current = { x: clientX, y: clientY };
      isIdle.current = false;
      idleTime.current = 0;
    };

    const handlePointerMove = (e) => {
      updateCoords(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    
    lastTime.current = performance.now();

    // Initial center position
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    current.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const animate = (time) => {
      const dt = time - lastTime.current;
      lastTime.current = time;
      idleTime.current += dt;

      if (idleTime.current > 2000) {
        isIdle.current = true;
      }

      let targetX = mouse.current.x;
      let targetY = mouse.current.y;

      // Slow drift when idle
      if (isIdle.current) {
        angle.current += 0.001 * dt;
        targetX += Math.cos(angle.current) * 100;
        targetY += Math.sin(angle.current) * 100;
      }

      // Smooth interpolation (lerp)
      current.current.x += (targetX - current.current.x) * 0.05;
      current.current.y += (targetY - current.current.y) * 0.05;

      document.documentElement.style.setProperty("--x", `${current.current.x}px`);
      document.documentElement.style.setProperty("--y", `${current.current.y}px`);

      // Update element-local --lx and --ly coordinates for all lantern targets
      const targets = document.querySelectorAll(".lantern-target");
      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const lx = current.current.x - rect.left;
        const ly = current.current.y - rect.top;
        target.style.setProperty("--lx", `${lx}px`);
        target.style.setProperty("--ly", `${ly}px`);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return null; // purely logic component, no visual overlay yet as requested
}
