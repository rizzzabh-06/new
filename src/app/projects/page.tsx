import { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { Project } from '@/lib/types';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'A curated collection of my work in Cybersecurity, Forensics, and Software Engineering.',
};

// Expanded list matching html.html Projects Grid
const allProjects: Project[] = [
    {
        id: '1',
        name: 'UniTie',
        description: 'A decentralized networking platform designed specifically for university students to connect, collaborate on research, and share resources securely.',
        tech: ['Next.js', 'Supabase', 'TypeScript'],
        category: 'Web Dev',
        created_at: new Date().toISOString(),
        github: 'https://github.com/rizzzabh-06/unitie',
        url: 'https://unitie.app',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd28kja6lf6PAp4LIyE1r3kNzPvOhGmtku21ytoS21LMrsQx0_VhZlt0jMNd_VkofSw43vYprNhCOvxQyk21KnQWW5Ja8dw_8W4hO6pmIAylSeAkHTKtpmrT6l7fqoicrEkJVaR7-1u2lxa335qcZY3CKxDEDLoYFFyddPIZoCQWrQ6F4XRwrezgFa2_VVGYujRcQfJkeGRM8-Yx3oMbalOmJ-AJ2OWNBzIZeAB_AkYPdwEcSXZKxlaiXY_Lwi5ZJGHCel6SAhoXUc',
        demo: null
    },
    {
        id: '2',
        name: 'ChainTrace',
        description: 'Advanced blockchain forensics tool capable of tracking illicit cryptocurrency transactions across multiple ledgers with visualization graphs.',
        tech: ['Python', 'Pandas', 'Matplotlib'],
        category: 'Forensics',
        created_at: new Date().toISOString(),
        github: '#',
        demo: '#',
        image: null
    },
    {
        id: '3',
        name: 'NetScanner CLI',
        description: 'A high-performance custom command-line tool for port scanning and automated vulnerability assessment of local networks.',
        tech: ['Golang', 'Docker', 'Linux'],
        category: 'Security',
        created_at: new Date().toISOString(),
        github: '#',
        demo: null,
        image: null
    },
    {
        id: '4',
        name: 'SecureVault',
        description: 'Encrypted file storage system implementing AES-256 encryption with granular role-based access control (RBAC).',
        tech: ['Rust', 'AES', 'Actix'],
        category: 'System',
        created_at: new Date().toISOString(),
        github: '#',
        demo: null,
        image: null
    },
    {
        id: '5',
        name: 'Agentic Wazuh SOC',
        description: 'Next-gen Security Operations Center integrating AI agents with Wazuh. Automates threat triage and incident response.',
        tech: ['Python', 'Wazuh', 'LLM'],
        category: 'AI/Sec',
        created_at: new Date().toISOString(),
        github: '#',
        demo: null,
        image: null
    },
    {
        id: '6',
        name: 'Packet Analyzer',
        description: 'Real-time network traffic analysis dashboard dissecting packet headers for educational purposes.',
        tech: ['Wireshark', 'Lua', 'C++'],
        category: 'Networking',
        created_at: new Date().toISOString(),
        github: '#',
        demo: null,
        image: null
    }
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
            {/* Header */}
            <header className="max-w-6xl mx-auto mb-12">
                <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-wide uppercase mb-4">
                    <span className="material-symbols-outlined !text-[16px]">folder_open</span>
                    <span>/ projects</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Projects</h1>
                <p className="text-slate-400 text-lg max-w-2xl">
                    A curated collection of my work in Cybersecurity, Forensics, and Software Engineering.
                </p>
            </header>

            {/* Filter Chips */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex flex-wrap gap-2">
                    <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105">
                        All
                    </button>
                    <button className="bg-surface text-slate-300 hover:bg-surface-highlight px-4 py-2 rounded-full text-sm font-medium transition-colors">
                        Security
                    </button>
                    <button className="bg-surface text-slate-300 hover:bg-surface-highlight px-4 py-2 rounded-full text-sm font-medium transition-colors">
                        Web Dev
                    </button>
                    <button className="bg-surface text-slate-300 hover:bg-surface-highlight px-4 py-2 rounded-full text-sm font-medium transition-colors">
                        Forensics
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>
        </div>
    );
}
