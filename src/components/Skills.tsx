'use client';

const arsenal = [
    {
        category: 'Security Operations',
        icon: 'shield',
        skills: ['Wazuh', 'Suricata', 'Splunk', 'Burp Suite', 'Metasploit']
    },
    {
        category: 'Development',
        icon: 'code',
        skills: ['Python', 'Bash Scripting', 'React.js', 'Node.js', 'TypeScript']
    },
    {
        category: 'Infrastructure',
        icon: 'dns',
        skills: ['Docker', 'Linux (Kali/Ubuntu)', 'AWS', 'Git']
    }
];

export function Skills() {
    return (
        <section className="py-24 px-6 relative bg-background-dark/50" id="skills">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Skills</h2>
                        <p className="text-slate-400">Tools, languages, and frameworks I work with.</p>
                    </div>
                    <div className="mt-4 md:mt-0 font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded">
                        ./skills_inventory.sh
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {arsenal.map((cat) => (
                        <div key={cat.category} className="space-y-4">
                            <h3 className="text-white font-semibold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-sm">{cat.icon}</span>
                                {cat.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-md bg-surface border border-white/5 text-xs font-mono text-slate-300 hover:border-primary/50 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
