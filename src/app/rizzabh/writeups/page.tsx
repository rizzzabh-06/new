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
import { Writeup } from '@/lib/types';
import { toast } from 'sonner';

export default function AdminWriteupsPage() {
    const router = useRouter();
    const [writeups, setWriteups] = useState<Writeup[]>([]);
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
                .from('writeups')
                .select('*')
                .order('created_at', { ascending: false });

            setWriteups(data || []);
            setLoading(false);
        }

        init();
    }, [router]);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this writeup?')) return;

        const supabase = createBrowserSupabase();
        const { error } = await supabase.from('writeups').delete().eq('id', id);

        if (error) {
            toast.error('Failed to delete writeup');
            return;
        }

        setWriteups(writeups.filter(w => w.id !== id));
        toast.success('Writeup deleted');
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
                        <h1 className="text-2xl font-bold">CTF Writeups</h1>
                    </div>
                    <Link href="/rizzabh/writeups/new">
                        <Button className="bg-neon-green text-black hover:bg-neon-green/80">
                            <Plus className="w-4 h-4 mr-2" />
                            New Writeup
                        </Button>
                    </Link>
                </div>

                <div className="space-y-4">
                    {writeups.length > 0 ? (
                        writeups.map((writeup) => (
                            <Card key={writeup.id} className="p-4 glass flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold">{writeup.title}</h3>
                                        {writeup.difficulty && (
                                            <Badge variant="outline">{writeup.difficulty}</Badge>
                                        )}
                                    </div>
                                    <div className="flex gap-2 text-sm text-muted-foreground">
                                        {writeup.category?.map(cat => (
                                            <span key={cat}>{cat}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/rizzabh/writeups/${writeup.id}`}>
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(writeup.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-16 text-muted-foreground">
                            No writeups yet. Create your first one!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
