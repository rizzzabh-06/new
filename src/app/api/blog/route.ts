import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase, createAdminSupabase } from '@/lib/supabase';

// GET - Public: Fetch published posts
export async function GET() {
    const supabase = createServerSupabase();

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// POST - Protected: Create a new post
export async function POST(request: NextRequest) {
    const supabase = createAdminSupabase();

    try {
        const body = await request.json();

        // Generate slug from title if not provided
        if (!body.slug && body.title) {
            body.slug = body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        // Calculate reading time if content provided
        if (body.content_md && !body.reading_time) {
            const words = body.content_md.split(/\s+/).length;
            body.reading_time = Math.ceil(words / 200); // ~200 words per minute
        }

        const { data, error } = await supabase
            .from('posts')
            .insert(body)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
