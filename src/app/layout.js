import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PublicChrome from "../components/PublicChrome";
import Providers from "../components/Providers";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://haykhalportfolio.vercel.app'),
  title: {
    template: '%s | Mohammad Haykhal',
    default: 'Mohammad Haykhal | Backend Developer'
  },
  description: "Portfolio of Mohammad Haykhal, Backend Developer & Software Engineer.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mohammad Haykhal | Backend Developer',
    description: 'Portfolio of Mohammad Haykhal, Backend Developer & Software Engineer.',
    url: '/',
    siteName: 'Mohammad Haykhal Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Haykhal | Backend Developer',
    description: 'Portfolio of Mohammad Haykhal, Backend Developer & Software Engineer.',
  },
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
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--bg-elevated)] focus:text-[var(--text)] focus:border focus:border-[var(--accent)] font-mono text-sm">Skip to content</a>
          <PublicChrome />
          {children}
        </Providers>
      </body>
    </html>
  );
}
