"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi"; // We can use react-icons if installed, let's use it

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-7 w-16" />; // placeholder to prevent layout shift
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] hover:border-[var(--accent)] transition-colors text-[var(--text)] group"
      aria-label={isDark ? "Switch to light mode (Wake)" : "Switch to dark mode (Sleep)"}
    >
      {isDark ? (
        <FiSun size={14} className="text-[var(--accent)] transition-transform group-hover:rotate-45" />
      ) : (
        <FiMoon size={14} className="text-[var(--accent)] transition-transform group-hover:-rotate-12" />
      )}
      <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">
        {isDark ? "Wake" : "Sleep"}
      </span>
    </button>
  );
}
