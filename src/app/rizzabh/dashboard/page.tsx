'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    FileText,
    Shield,
    Cpu,
    LogOut,
    Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser, signOut } from '@/lib/auth';
import { createBrowserSupabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Stats {
    projects: number;
    writeups: number;
    posts: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<unknown>(null);
    const [stats, setStats] = useState<Stats>({ projects: 0, writeups: 0, posts: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            const currentUser = await getUser();
            if (!currentUser) {
                router.push('/rizzabh/login');
                return;
            }
            setUser(currentUser);

            // Fetch stats
            const supabase = createBrowserSupabase();

            const [projectsRes, writeupsRes, postsRes] = await Promise.all([
                supabase.from('projects').select('id', { count: 'exact', head: true }),
                supabase.from('writeups').select('id', { count: 'exact', head: true }),
                supabase.from('posts').select('id', { count: 'exact', head: true }),
            ]);

            setStats({
                projects: projectsRes.count || 0,
                writeups: writeupsRes.count || 0,
                posts: postsRes.count || 0,
            });

            setLoading(false);
        }

        checkAuth();
    }, [router]);

    async function handleLogout() {
        await signOut();
        toast.success('Logged out successfully');
        router.push('/rizzabh/login');
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary">Loading...</div>
            </div>
        );
    }

    const quickLinks = [
        {
            href: '/rizzabh/posts',
            icon: FileText,
            label: 'Blog Posts',
            count: stats.posts,
            color: 'neon-magenta'
        },
        {
            href: '/rizzabh/writeups',
            icon: Shield,
            label: 'CTF Writeups',
            count: stats.writeups,
            color: 'neon-green'
        },
        {
            href: '/rizzabh/projects',
            icon: Cpu,
            label: 'Projects',
            count: stats.projects,
            color: 'cyber-blue'
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <LayoutDashboard className="w-8 h-8 text-primary" />
                            Admin Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your portfolio content
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {quickLinks.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={item.href}>
                                <Card className="glass hover:border-primary/50 transition-all cursor-pointer bg-surface border-white/5">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">
                                            {item.label}
                                        </CardTitle>
                                        <item.icon className="w-5 h-5 text-primary" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{item.count}</div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions */}
                <Card className="glass">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Link href="/rizzabh/posts/new">
                            <Button className="bg-primary hover:bg-primary-hover">
                                <Plus className="w-4 h-4 mr-2" />
                                New Blog Post
                            </Button>
                        </Link>
                        <Link href="/rizzabh/writeups/new">
                            <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                                <Plus className="w-4 h-4 mr-2" />
                                New Writeup
                            </Button>
                        </Link>
                        <Link href="/rizzabh/projects/new">
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                                <Plus className="w-4 h-4 mr-2" />
                                New Project
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
