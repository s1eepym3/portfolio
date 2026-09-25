# Mohammad Haykhal | Portfolio

Welcome to the repository for my professional portfolio. 

[**Live Demo**](https://haykhalportfolio.vercel.app/)

![Portfolio Screenshot](https://via.placeholder.com/1200x630?text=Portfolio+Screenshot)

## Design Concept
This portfolio is built with a **premium, dark-mode-first aesthetic**, focused on a "Wake/Sleep" contrast system. The layout uses heavily structured grid alignments, cinematic scroll reveals, and highly tuned typography (Instrument Serif and JetBrains Mono alongside Geist Sans) to establish a "Backend Developer who builds what you never see" narrative. 

Key design features:
- **Perspective Reveal:** Per-word scroll-revealed timeline text.
- **Gallery Wall:** A horizontal snap-scroll layout for selected works.
- **Micro-interactions:** A custom lag-spring cursor, subtle lantern glow tracking the mouse, and smooth page transitions via Framer Motion.
- **Accessibility:** Fully semantic HTML landmarks, full keyboard support, skip links, and `prefers-reduced-motion` fallbacks for all animations.

## Tech Stack
- **Framework:** Next.js 16 (App Router) & React 19
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion & Lenis (Smooth Scrolling)
- **Theme:** next-themes (Light/Dark mode)
- **Contact API:** Resend
- **Deployment:** Vercel

## How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/mohdhaykhal/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory based on `.env.example`:
```env
# URL where this site is hosted
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Resend API Key for the contact form
RESEND_API_KEY=re_your_api_key_here

# Contact Form delivery email
CONTACT_TO_EMAIL=your.email@gmail.com
```

### 4. Run the development server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the site.

## Production Build
```bash
npm run build
npm run start
```
