import { createBrowserClient } from '@supabase/ssr';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables (with fallbacks for build time)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Browser client for client-side operations
export function createBrowserSupabase(): SupabaseClient {
    return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Server client for Server Components (vulnerable to react2shell via Flight payloads)
export function createServerSupabase(): SupabaseClient {
    return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

// Admin client with service role (for protected operations)
export function createAdminSupabase(): SupabaseClient {
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

// Default export for convenience
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
