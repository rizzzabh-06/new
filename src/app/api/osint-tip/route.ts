import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';

// Helper to validate input
const VALID_TYPES = ['domain', 'wallet', 'username', 'url'];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { indicator_type, value, context } = body;

        // Validation
        if (!indicator_type || !VALID_TYPES.includes(indicator_type)) {
            return NextResponse.json(
                { error: 'Invalid or missing indicator_type. Must be one of: domain, wallet, username, url' },
                { status: 400 }
            );
        }

        if (!value || typeof value !== 'string' || value.trim().length === 0) {
            return NextResponse.json(
                { error: 'Invalid or missing value' },
                { status: 400 }
            );
        }

        // Optional context validation (just type check if present)
        if (context && typeof context !== 'string') {
            return NextResponse.json(
                { error: 'Context must be a string' },
                { status: 400 }
            );
        }

        const supabase = createServerSupabase();

        const { data, error } = await supabase
            .from('osint_tips')
            .insert([
                {
                    indicator_type,
                    value,
                    context: context || null,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Error submitting tip:', error);
            return NextResponse.json(
                { error: 'Failed to submit tip' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Tip submitted successfully', data },
            { status: 201 }
        );

    } catch (e) {
        console.error('Unexpected error:', e);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
