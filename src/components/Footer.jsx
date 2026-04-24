export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-2xl font-black tracking-tighter text-white">
          M<span className="text-cyan-400">H</span>.
        </div>

        <p className="text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} <span className="text-gray-300 font-medium">Mohammad Haykhal</span>. 
          Built with <span className="text-white">Next.js</span> & <span className="text-cyan-400">Tailwind CSS</span>.
        </p>

        <div className="flex gap-6 text-gray-500 text-sm">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

      </div>
    </footer>
  );
}