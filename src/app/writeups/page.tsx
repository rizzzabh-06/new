'use client';

import { useState } from 'react';
import Link from 'next/link';

// Static writeups from html.html
const writeups = [
    {
        id: 1,
        title: 'HackTheBox: Retired Machine "Sauce"',
        date: 'Oct 12, 2023',
        difficulty: 'Medium',
        tags: ['PrivilegeEscalation', 'Linux', 'Web'],
        snippet: `root@sauce:~# cat /opt/trail_log\n# Exploiting request basket via SSRF...\ncurl -X POST http://127.0.0.1:55555/api/baskets/mysession`,
        tools: ['Burp Suite', 'Nmap', 'Request Baskets']
    },
    {
        id: 2,
        title: 'PicoCTF 2023: SQL Direct',
        date: 'Sep 28, 2023',
        difficulty: 'Easy',
        tags: ['SQLi', 'Database'],
        desc: 'Connecting directly to a PostgreSQL database exposed on a port to retrieve the flag from a hidden table using basic SQL queries.',
        tools: ['psql', 'Kali Linux']
    },
    {
        id: 3,
        title: 'Custom Exploit: Buffer Overflow on x64',
        date: 'Aug 15, 2023',
        difficulty: 'Hard',
        tags: ['BinaryExploitation', 'ROP'],
        snippet: `# ROP Chain construction\nrop = ROP(elf)\nrop.call(elf.symbols['puts'], [elf.got['puts']])\nrop.call(elf.symbols['main'])`,
        tools: ['GDB', 'Pwntools', 'Python']
    },
    {
        id: 4,
        title: 'OSINT: Tracking the Ghost',
        date: 'Jul 02, 2023',
        difficulty: 'Medium',
        tags: ['OSINT', 'Geolocation'],
        tools: ['Sherlock', 'Google Dorks']
    }
];

export default function WriteupsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile sidebar toggle

    return (
        <div className="flex bg-background text-foreground min-h-screen pt-16">
            {/* Mobile Sidebar Toggle Button (visible only on mobile) */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="bg-primary text-white p-3 rounded-full shadow-lg"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>

            {/* SIDEBAR */}
            <aside className={`
        w-80 shrink-0 flex flex-col border-r border-[#233348] bg-[#0d1219] h-full overflow-y-auto
        fixed md:relative z-40 transition-transform duration-300 left-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                {/* User Profile Snippet */}
                <div className="p-6 border-b border-[#233348]/50">
                    <div className="flex gap-4 items-center">
                        <div className="relative">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 ring-2 ring-primary/20 bg-surface overflow-hidden">
                                <img src="/profile.png" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-[#0d1219]"></div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white text-base font-bold leading-tight">Rishabh</h1>
                            <p className="text-slate-400 text-xs font-mono mt-1">@rishabhsec</p>
                        </div>
                    </div>
                    <p className="mt-3 text-[#92a9c9] text-xs leading-normal line-clamp-2">
                        Cybersecurity & CS Student focused on red teaming and exploit development.
                    </p>
                </div>

                {/* Search */}
                <div className="px-4 py-4">
                    <label className="relative flex items-center group">
                        <span className="absolute left-3 text-slate-500 material-symbols-outlined !text-[20px] group-focus-within:text-primary transition-colors">search</span>
                        <input className="w-full bg-[#1c2533] border border-slate-700/50 text-sm text-white rounded-lg py-2.5 pl-10 pr-12 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-slate-500" placeholder="Search logs..." type="text" />
                    </label>
                </div>

                {/* Categories */}
                <div className="flex-1 px-3 py-2 space-y-6">
                    <div className="flex flex-col gap-1">
                        <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">Categories</p>
                        <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-white w-full text-left">
                            <span className="material-symbols-outlined !text-[20px] text-primary">grid_view</span>
                            <span className="text-sm font-medium">All Writeups</span>
                        </button>
                        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white w-full text-left group">
                            <span className="material-symbols-outlined !text-[20px] group-hover:text-primary transition-colors">language</span>
                            <span className="text-sm font-medium">Web Exploitation</span>
                            <span className="ml-auto text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">12</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background">
                {/* Header */}
                <header className="shrink-0 px-8 py-8 pb-4 border-b border-[#233348]/50 bg-background/80 backdrop-blur z-10 sticky top-0">
                    <div className="max-w-5xl mx-auto w-full">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-wide uppercase">
                                <span className="material-symbols-outlined !text-[16px]">folder_open</span>
                                <span>/ root / writeups</span>
                            </div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Security Logs & CTF Archives</h2>
                            <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                                Detailed walkthroughs of CTF challenges, vulnerability research, and pentesting labs.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-6">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/50 border border-slate-700 text-xs text-slate-300">
                                <span className="material-symbols-outlined !text-[14px] text-primary">check_circle</span>
                                <span className="font-mono">42 Solved</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable List */}
                <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-20 scroll-smooth">
                    <div className="max-w-5xl mx-auto flex flex-col gap-5">
                        {writeups.map((w) => (
                            <article key={w.id} className="group relative flex flex-col gap-3 rounded-xl border border-card-border bg-card-dark p-5 hover:border-primary/40 transition-all shadow-sm hover:shadow-md hover:shadow-primary/5">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border bg-opacity-10 
                        ${w.difficulty === 'Medium' ? 'bg-orange-500 text-orange-400 border-orange-500/20' :
                                                    w.difficulty === 'Hard' ? 'bg-red-500 text-red-400 border-red-500/20' :
                                                        'bg-emerald-500 text-emerald-400 border-emerald-500/20'}`}>
                                                {w.difficulty}
                                            </span>
                                            <span className="text-xs text-slate-500 font-mono">{w.date}</span>
                                        </div>
                                        <Link href={`/writeups/${w.id}`} className="text-xl font-bold text-white group-hover:text-primary transition-colors cursor-pointer">
                                            {w.title}
                                        </Link>
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <span className="text-primary material-symbols-outlined !text-[16px]">tag</span>
                                            {w.tags.map((t, i) => (
                                                <span key={i} className="hover:text-white cursor-pointer transition-colors">#{t} {i < w.tags.length - 1 ? '• ' : ''}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="shrink-0 flex items-center justify-center size-10 rounded-full bg-slate-800 text-white group-hover:bg-primary group-hover:text-white transition-all opacity-0 group-hover:opacity-100 self-start md:self-center">
                                        <span className="material-symbols-outlined !text-[20px]">arrow_outward</span>
                                    </button>
                                </div>

                                {w.snippet && (
                                    <div className="mt-2 relative rounded-lg border border-slate-800 overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
                                        <div className="bg-[#0b1016] p-3 overflow-x-auto font-mono text-xs text-slate-300">
                                            <pre>{w.snippet}</pre>
                                        </div>
                                    </div>
                                )}

                                {w.desc && (
                                    <p className="text-sm text-slate-400 line-clamp-2">{w.desc}</p>
                                )}

                                <div className="flex items-center gap-4 mt-2 pt-3 border-t border-slate-800/50">
                                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                                        <span className="material-symbols-outlined !text-[16px]">build</span>
                                        <span>Tools:</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {w.tools.map(tool => (
                                            <span key={tool} className="text-[10px] font-medium text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/50">{tool}</span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
