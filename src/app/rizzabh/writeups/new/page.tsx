'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/auth';
import { createBrowserSupabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function NewWriteupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        difficulty: 'Medium',
        tools: '',
        content_md: '',
        published: true,
    });

    useEffect(() => {
        async function checkAuth() {
            const user = await getUser();
            if (!user) router.push('/rizzabh/login');
        }
        checkAuth();
    }, [router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const supabase = createBrowserSupabase();

        const slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const { error } = await supabase.from('writeups').insert({
            title: formData.title,
            slug,
            category: formData.category.split(',').map(c => c.trim()).filter(Boolean),
            difficulty: formData.difficulty,
            tools: formData.tools.split(',').map(t => t.trim()).filter(Boolean),
            content_md: formData.content_md,
            published: formData.published,
        });

        if (error) {
            toast.error('Failed to create writeup');
            setLoading(false);
            return;
        }

        toast.success('Writeup created!');
        router.push('/rizzabh/writeups');
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/rizzabh/writeups">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">New CTF Writeup</h1>
                </div>

                <Card className="glass">
                    <CardHeader>
                        <CardTitle>Writeup Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Challenge Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-white/5 border-white/10 focus:border-neon-green"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Categories (comma-separated)</Label>
                                    <Input
                                        id="category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="bg-white/5 border-white/10 focus:border-neon-green"
                                        placeholder="Web, OSINT"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="difficulty">Difficulty</Label>
                                    <select
                                        id="difficulty"
                                        value={formData.difficulty}
                                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                        className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 focus:border-neon-green"
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                        <option value="Insane">Insane</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tools">Tools Used (comma-separated)</Label>
                                <Input
                                    id="tools"
                                    value={formData.tools}
                                    onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                                    className="bg-white/5 border-white/10 focus:border-neon-green"
                                    placeholder="Burp Suite, sqlmap, nmap"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Solution (Markdown)</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content_md}
                                    onChange={(e) => setFormData({ ...formData, content_md: e.target.value })}
                                    className="bg-white/5 border-white/10 focus:border-neon-green font-mono text-sm"
                                    rows={15}
                                    placeholder="Write your solution in Markdown..."
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-neon-green text-black hover:bg-neon-green/80"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {loading ? 'Creating...' : 'Create Writeup'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
