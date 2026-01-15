import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Post } from '@/lib/types';

interface Props {
    params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
    try {
        const supabase = createServerSupabase();
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error) return null;
        return data as Post;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) return { title: 'Post Not Found' };

    return {
        title: post.title,
        description: post.excerpt || `Read ${post.title}`,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    return (
        <div className="min-h-screen section-padding">
            <article className="container-narrow">
                {/* Back */}
                <Link href="/blog">
                    <Button variant="ghost" size="sm" className="mb-8 -ml-3 text-muted-foreground">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Articles
                    </Button>
                </Link>

                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        {post.published_at && (
                            <time>
                                {new Date(post.published_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        )}
                        {post.reading_time && (
                            <>
                                <span>·</span>
                                <span>{post.reading_time} min read</span>
                            </>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="text-lg text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}
                </header>

                {/* Content */}
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                    >
                        {post.content_md || ''}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
