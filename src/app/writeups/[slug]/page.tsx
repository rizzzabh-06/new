import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Writeup } from '@/lib/types';

interface Props {
    params: Promise<{ slug: string }>;
}

async function getWriteup(slug: string): Promise<Writeup | null> {
    try {
        const supabase = createServerSupabase();
        const { data, error } = await supabase
            .from('writeups')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error) return null;
        return data as Writeup;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const writeup = await getWriteup(slug);

    if (!writeup) return { title: 'Writeup Not Found' };

    return {
        title: writeup.title,
        description: `CTF writeup: ${writeup.title}`,
    };
}

export default async function WriteupPage({ params }: Props) {
    const { slug } = await params;
    const writeup = await getWriteup(slug);

    if (!writeup) notFound();

    return (
        <div className="min-h-screen section-padding">
            <article className="container-narrow">
                {/* Back */}
                <Link href="/writeups">
                    <Button variant="ghost" size="sm" className="mb-8 -ml-3 text-muted-foreground">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Writeups
                    </Button>
                </Link>

                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        <time>{new Date(writeup.created_at).toLocaleDateString()}</time>
                        {writeup.difficulty && (
                            <>
                                <span>·</span>
                                <span>{writeup.difficulty}</span>
                            </>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                        {writeup.title}
                    </h1>

                    {/* Categories & Tools */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {writeup.category?.map((cat: string) => (
                            <span key={cat} className="skill-tag text-sm">
                                {cat}
                            </span>
                        ))}
                    </div>

                    {writeup.tools && writeup.tools.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Tools: </span>
                            {writeup.tools.join(', ')}
                        </div>
                    )}
                </header>

                {/* Content */}
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                    >
                        {writeup.content_md || ''}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
