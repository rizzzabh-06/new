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

export default function NewPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content_md: '',
        tags: '',
        published: false,
    });

    useEffect(() => {
        async function checkAuth() {
            const user = await getUser();
            if (!user) {
                router.push('/rizzabh/login');
            }
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

        const words = formData.content_md.split(/\s+/).length;
        const reading_time = Math.ceil(words / 200);

        const { error } = await supabase.from('posts').insert({
            title: formData.title,
            slug,
            excerpt: formData.excerpt,
            content_md: formData.content_md,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            published: formData.published,
            published_at: formData.published ? new Date().toISOString() : null,
            reading_time,
        });

        if (error) {
            toast.error('Failed to create post');
            setLoading(false);
            return;
        }

        toast.success('Post created successfully!');
        router.push('/rizzabh/posts');
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/rizzabh/posts">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">New Blog Post</h1>
                </div>

                <Card className="glass">
                    <CardHeader>
                        <CardTitle>Post Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-white/5 border-white/10 focus:border-neon-green"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="bg-white/5 border-white/10 focus:border-neon-green"
                                    rows={2}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content (Markdown)</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content_md}
                                    onChange={(e) => setFormData({ ...formData, content_md: e.target.value })}
                                    className="bg-white/5 border-white/10 focus:border-neon-green font-mono text-sm"
                                    rows={15}
                                    placeholder="Write your post in Markdown..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (comma-separated)</Label>
                                <Input
                                    id="tags"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="bg-white/5 border-white/10 focus:border-neon-green"
                                    placeholder="security, tutorial, web"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="rounded border-white/10"
                                />
                                <Label htmlFor="published">Publish immediately</Label>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-neon-green text-black hover:bg-neon-green/80"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {loading ? 'Creating...' : 'Create Post'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
