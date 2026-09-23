import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
import LanternOverlay from "../components/LanternOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mohammad Haykhal | Portfolio",
  description: "Backend Developer & Software Engineer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                var visited = sessionStorage.getItem('intro_seen');
                if (!reduced && !visited) {
                  document.documentElement.classList.add('intro-pending');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>
          <div className="grain-overlay"></div>
          <LanternOverlay />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
