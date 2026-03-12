import { FaPython, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMysql, SiPhp } from "react-icons/si";

export default function Skills() {
  return (
    <section className="px-10 md:px-20 py-20 bg-slate-900">

      <h2 className="text-3xl font-bold text-cyan-400 mb-10">
        Skills
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

        <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg">
          <FaPython size={22}/>
          <span>Python</span>
        </div>

        <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg">
          <SiPhp size={22}/>
          <span>PHP</span>
        </div>

        <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg">
          <SiMysql size={22}/>
          <span>MySQL</span>
        </div>

        <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg">
          <SiNextdotjs size={22}/>
          <span>Next.js</span>
        </div>

        <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg">
          <SiTailwindcss size={22}/>
          <span>Tailwind</span>
        </div>

        <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg">
          <FaGithub size={22}/>
          <span>GitHub</span>
        </div>

      </div>

    </section>
  );
}