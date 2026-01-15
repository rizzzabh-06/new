'use client';

import Link from 'next/link';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/lib/types';

// Static preview projects from html.html content
const previewProjects: Project[] = [
    {
        id: '1',
        name: 'UniTie',
        description: 'A secure full-stack social platform bridging students and alumni. Features real-time messaging, encrypted data storage, and role-based access control.',
        tech: ['React', 'Node', 'MongoDB'],
        category: 'Web',
        created_at: new Date().toISOString(),
        github: 'https://github.com/rizzzabh-06/unitie',
        url: 'https://unitie.app',
        image: null,
        demo: null
    },
    {
        id: '2',
        name: 'Suricata IDS',
        description: 'High-performance Network Intrusion Detection System implementation. Configured custom rule sets for detecting anomalies and potential exploits in real-time traffic.',
        tech: ['Suricata', 'Linux', 'ELK Stack'],
        category: 'Network',
        created_at: new Date().toISOString(),
        github: 'https://github.com/rizzzabh-06/suricata-ids',
        image: null,
        demo: null
    },
    {
        id: '3',
        name: 'Agentic Wazuh SOC',
        description: 'Next-gen Security Operations Center integrating AI agents with Wazuh. Automates threat triage and incident response using LLM-driven analysis.',
        tech: ['Wazuh', 'Python', 'LLM'],
        category: 'AI/Sec',
        created_at: new Date().toISOString(),
        image: null,
        demo: null,
        github: null
    }
];

export function ProjectsPreview() {
    return (
        <section className="py-24 px-6 relative" id="projects">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Featured Deployments</h2>
                        <p className="text-slate-400">Selected works demonstrating security & engineering capabilities.</p>
                    </div>
                    <Link href="/projects" className="hidden md:flex items-center gap-1 text-primary text-sm font-semibold hover:text-white transition-colors group">
                        View all repositories <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {previewProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/projects" className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:text-white transition-colors">
                        View all repositories <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ProjectsPreview;
