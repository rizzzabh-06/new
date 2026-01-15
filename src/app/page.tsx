import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { ProjectsPreview } from "@/components/ProjectsPreview";
import { About } from "@/components/About";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Skills />
      <ProjectsPreview />
      <About />

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0c121e] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold text-lg mb-1">Rishabh Raj Singh</h4>
            <p className="text-slate-500 text-sm font-mono">Securing the digital frontier, one line of code at a time.</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/rizzzabh-06" target="_blank" className="text-slate-400 hover:text-primary transition-transform hover:-translate-y-1">
              <span className="material-symbols-outlined">code</span>
            </a>
            <a href="https://linkedin.com/in/rizzzabh" target="_blank" className="text-slate-400 hover:text-primary transition-transform hover:-translate-y-1">
              <span className="material-symbols-outlined">work</span>
            </a>
            <a href="mailto:contact@rishabhrajsingh.com" className="text-slate-400 hover:text-primary transition-transform hover:-translate-y-1">
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-slate-600 text-xs">
          © {new Date().getFullYear()} Rishabh Raj Singh. All systems nominal.
        </div>
      </footer>
    </>
  );
}
