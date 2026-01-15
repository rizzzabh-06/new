'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUser } from '@/lib/auth';
import { createBrowserSupabase } from '@/lib/supabase';
import { Project } from '@/lib/types';
import { toast } from 'sonner';

export default function AdminProjectsPage() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init() {
            const user = await getUser();
            if (!user) {
                router.push('/rizzabh/login');
                return;
            }

            const supabase = createBrowserSupabase();
            const { data } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            setProjects(data || []);
            setLoading(false);
        }

        init();
    }, [router]);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this project?')) return;

        const supabase = createBrowserSupabase();
        const { error } = await supabase.from('projects').delete().eq('id', id);

        if (error) {
            toast.error('Failed to delete project');
            return;
        }

        setProjects(projects.filter(p => p.id !== id));
        toast.success('Project deleted');
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-neon-green">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/rizzabh/dashboard">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">Projects</h1>
                    </div>
                    <Link href="/rizzabh/projects/new">
                        <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                            <Plus className="w-4 h-4 mr-2" />
                            New Project
                        </Button>
                    </Link>
                </div>

                <div className="space-y-4">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <Card key={project.id} className="p-4 glass flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold">{project.name}</h3>
                                        {project.category && (
                                            <Badge variant="outline" className="text-cyber-blue border-cyber-blue/30">
                                                {project.category}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/rizzabh/projects/${project.id}`}>
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(project.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-16 text-muted-foreground">
                            No projects yet. Create your first one!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
