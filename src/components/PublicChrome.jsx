"use client";

import { usePathname } from "next/navigation";
import CustomCursor from "./CustomCursor";
import LanternOverlay from "./LanternOverlay";
import Navbar from "./Navbar";

export default function PublicChrome() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <CustomCursor />
      <div className="grain-overlay"></div>
      <LanternOverlay />
      <Navbar />
    </>
  );
}
