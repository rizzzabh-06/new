import { Metadata } from 'next';
import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import { Post } from '@/lib/types';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Thoughts on security, building, and continuous learning',
};

export const revalidate = 3600;

// Static posts when Supabase isn't configured
const staticPosts: Post[] = [
    {
        id: '1',
        title: 'Building a Home Lab for Security Research',
        slug: 'building-home-lab',
        excerpt: 'A comprehensive guide to setting up your own cybersecurity home lab using Proxmox, virtual machines, and open-source security tools.',
        content_md: '',
        tags: ['Security', 'Home Lab'],
        og_image: null,
        published: true,
        published_at: new Date().toISOString(),
        reading_time: 8,
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Understanding React2Shell (CVE-2025-55182)',
        slug: 'react2shell-cve',
        excerpt: 'Deep dive into the critical React Server Components vulnerability that allows unauthenticated remote code execution.',
        content_md: '',
        tags: ['Security', 'Web'],
        og_image: null,
        published: true,
        published_at: new Date().toISOString(),
        reading_time: 10,
        created_at: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'OSINT Techniques for Investigating Crypto Scams',
        slug: 'osint-crypto-scams',
        excerpt: 'How to use open-source intelligence techniques to track down cryptocurrency fraudsters.',
        content_md: '',
        tags: ['OSINT', 'Crypto'],
        og_image: null,
        published: true,
        published_at: new Date().toISOString(),
        reading_time: 12,
        created_at: new Date().toISOString(),
    },
    {
        id: '4',
        title: 'Setting Up Wazuh for EDR and SIEM',
        slug: 'wazuh-edr-siem',
        excerpt: 'Complete guide to deploying Wazuh as your open-source endpoint detection and response solution.',
        content_md: '',
        tags: ['Security', 'Blue Team'],
        og_image: null,
        published: true,
        published_at: new Date().toISOString(),
        reading_time: 15,
        created_at: new Date().toISOString(),
    },
    {
        id: '5',
        title: 'Web3 Security: Smart Contract Auditing Basics',
        slug: 'smart-contract-auditing',
        excerpt: 'Introduction to auditing Solidity smart contracts for common vulnerabilities.',
        content_md: '',
        tags: ['Web3', 'Security'],
        og_image: null,
        published: true,
        published_at: new Date().toISOString(),
        reading_time: 7,
        created_at: new Date().toISOString(),
    },
];

async function getPosts(): Promise<Post[]> {
    try {
        const supabase = createServerSupabase();
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('published', true)
            .order('published_at', { ascending: false });

        if (error || !data || data.length === 0) {
            return staticPosts;
        }

        return data as Post[];
    } catch {
        return staticPosts;
    }
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-wide uppercase mb-4">
                        <span className="material-symbols-outlined !text-[16px]">article</span>
                        <span>/ blog</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                        Blog
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Separate from writeups. More reflective, deeper pieces on security, building, and what I&apos;m learning.
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="block group"
                        >
                            <article className="p-6 rounded-xl border border-card-border bg-card-dark hover:border-primary/40 transition-all">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-3">
                                            {post.published_at && (
                                                <time className="font-mono text-xs">
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
                                                    <span className="font-mono text-xs">{post.reading_time} min read</span>
                                                </>
                                            )}
                                        </div>
                                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        {post.excerpt && (
                                            <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="hidden sm:flex items-center justify-center size-10 rounded-full bg-slate-800 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                                        <span className="material-symbols-outlined !text-[20px]">arrow_outward</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
