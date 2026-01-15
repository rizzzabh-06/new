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
import { Post } from '@/lib/types';
import { toast } from 'sonner';

export default function AdminPostsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
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
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            setPosts(data || []);
            setLoading(false);
        }

        init();
    }, [router]);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this post?')) return;

        const supabase = createBrowserSupabase();
        const { error } = await supabase.from('posts').delete().eq('id', id);

        if (error) {
            toast.error('Failed to delete post');
            return;
        }

        setPosts(posts.filter(p => p.id !== id));
        toast.success('Post deleted');
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
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/rizzabh/dashboard">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">Blog Posts</h1>
                    </div>
                    <Link href="/rizzabh/posts/new">
                        <Button className="bg-neon-magenta hover:bg-neon-magenta/80">
                            <Plus className="w-4 h-4 mr-2" />
                            New Post
                        </Button>
                    </Link>
                </div>

                {/* Posts List */}
                <div className="space-y-4">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Card key={post.id} className="p-4 glass flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold">{post.title}</h3>
                                        <Badge variant={post.published ? 'default' : 'secondary'}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {post.slug} • {post.reading_time || 0} min read
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/rizzabh/posts/${post.id}`}>
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-16 text-muted-foreground">
                            No posts yet. Create your first one!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
