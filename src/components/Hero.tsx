'use client';

import Link from 'next/link';

export function Hero() {
    return (
        <header className="relative min-h-screen flex flex-col justify-center items-center pt-20 px-6 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 bg-grid-pattern bg-[length:32px_32px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-8 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    System Status: Online
                </div>

                {/* Profile Image - Added as requested */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative size-32 md:size-40 rounded-full border-2 border-primary/20 overflow-hidden bg-surface">
                        <img src="/profile.png" alt="Rishabh Raj Singh" className="object-cover w-full h-full" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Rishabh Raj Singh
                </h1>

                <p className="text-lg md:text-xl text-slate-400 font-mono max-w-2xl cursor-blink h-[1.5em]">
                    Cybersecurity Analyst & Computer Science Student
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link href="/projects">
                        <button className="flex items-center justify-center gap-2 h-12 px-8 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(17,98,212,0.25)] w-full sm:w-auto">
                            <span className="material-symbols-outlined !text-[20px]">security</span>
                            View Projects
                        </button>
                    </Link>
                    <a href="/resume.pdf" target="_blank">
                        <button className="flex items-center justify-center gap-2 h-12 px-8 bg-surface hover:bg-surface-highlight border border-white/10 text-white font-medium rounded-lg transition-all w-full sm:w-auto">
                            <span className="material-symbols-outlined !text-[20px]">download</span>
                            Download CV
                        </button>
                    </a>
                </div>

                {/* Terminal Component */}
                <div className="w-full max-w-2xl mt-16 text-left rounded-xl overflow-hidden border border-white/10 bg-[#0c121e] shadow-2xl">
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#1e293b] border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        <div className="ml-4 text-xs text-slate-500 font-mono">rishabh@kali-linux:~</div>
                    </div>
                    <div className="p-6 font-mono text-sm leading-relaxed text-slate-300">
                        <p className="mb-2"><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> whoami</p>
                        <p className="mb-4 text-white opacity-90 whitespace-pre-wrap">
                            {`{
  "role": "Security Researcher",
  "passion": "Threat Hunting & Secure Dev",
  "mission": "Building resilient systems"
}`}
                        </p>
                        <p><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="animate-pulse">_</span></p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Hero;
