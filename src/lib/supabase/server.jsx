// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Create a Supabase server client for Next.js Server Components / API routes.
// This uses the official auth-helpers package and the Next `cookies()` helper.
export function createServerSupabase() {
  const cookieStore = cookies();

  return createServerComponentClient({ cookies: cookieStore });
}