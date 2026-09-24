"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(formatter.format(now));
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg)] py-12 relative overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full flex flex-col gap-10 md:gap-16 relative z-10">
        
        {/* ROW 1: COPYRIGHT, CLOCK, NAVIGATION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-8 text-sm font-mono text-[var(--text-muted)]">
          
          <div className="flex-1 text-left">
            © {new Date().getFullYear()} Mohammad Haykhal
          </div>

          <div className="shrink-0 text-left md:text-center">
            {time ? (
              <span>{time} WIB</span>
            ) : (
              <span className="invisible">00:00:00 WIB</span>
            )}
          </div>

          <div className="flex-1 flex flex-wrap justify-start md:justify-end gap-x-4 gap-y-2">
            <Link href="/#about" className="hover:text-[var(--text)] transition-colors min-h-[44px] flex items-center py-2">Perspective</Link>
            <Link href="/#skills" className="hover:text-[var(--text)] transition-colors min-h-[44px] flex items-center py-2">Foundations</Link>
            <Link href="/#projects" className="hover:text-[var(--text)] transition-colors min-h-[44px] flex items-center py-2">Works</Link>
            <Link href="/#contact" className="hover:text-[var(--text)] transition-colors min-h-[44px] flex items-center py-2">Contact</Link>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[var(--text)] transition-colors min-h-[44px] flex items-center py-2 cursor-pointer">Back to top</a>
          </div>
        </div>

        {/* ROW 2: LANTERN MESSAGE */}
        <div className="w-full border-t border-[var(--line)]/50 pt-8">
          <style dangerouslySetInnerHTML={{ __html: `
            .lantern-message {
              mask-image: radial-gradient(circle 120px at var(--lx, -100%) var(--ly, -100%), black 20%, transparent 100%);
              -webkit-mask-image: radial-gradient(circle 120px at var(--lx, -100%) var(--ly, -100%), black 20%, transparent 100%);
            }
            @media (prefers-reduced-motion: reduce) {
              .lantern-message {
                mask-image: none !important;
                -webkit-mask-image: none !important;
                opacity: 0.2;
              }
            }
          `}} />
          <div 
            className="lantern-target lantern-message inline-block opacity-100"
            aria-hidden="true"
          >
            <span className="font-mono text-[10px] md:text-xs text-[var(--accent)] tracking-widest opacity-50 block">
              {`// if you read this far, we should talk.`}
            </span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}