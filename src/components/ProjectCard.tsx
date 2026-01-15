'use client';

import { Project } from '@/lib/types';
import Image from 'next/image';

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="group relative rounded-xl bg-surface border border-white/5 overflow-hidden tech-card-hover transition-all duration-300 flex flex-col h-full">
            {/* Project Image Header */}
            <div className="h-48 bg-gradient-to-br from-indigo-900 to-slate-900 relative overflow-hidden">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent"></div>
                    </>
                )}

                <div className="absolute bottom-4 left-4 p-2 bg-black/40 backdrop-blur-sm rounded border border-white/10">
                    <span className="material-symbols-outlined text-white">
                        {project.category === 'Blockchain' ? 'token' :
                            project.category === 'AI' ? 'smart_toy' :
                                project.category === 'Security' ? 'security' :
                                    'hub'}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {project.name}
                    </h3>
                    {project.category && (
                        <span className="text-xs font-mono text-slate-500 border border-slate-700 rounded px-2 py-0.5">
                            {project.category}
                        </span>
                    )}
                </div>

                <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
                    {project.description}
                </p>

                {project.tech && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((t, i) => (
                            <span key={i} className="text-[10px] font-mono uppercase tracking-wider text-slate-300 bg-white/5 px-2 py-1 rounded">
                                {t}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex gap-4 border-t border-white/5 pt-4 mt-auto">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-xl">code</span>
                        </a>
                    )}
                    {(project.demo || project.url) && (
                        <a href={project.demo || project.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-xl">open_in_new</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
