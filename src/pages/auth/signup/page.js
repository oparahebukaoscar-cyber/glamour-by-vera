// app/(auth)/signup/page.tsx
'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

// Server action to sign up
export async function signupAction(formData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const fullName = String(formData.get('full_name') ?? '');

  if (!email || !password || !fullName) {
    throw new Error('Email, password, and full name are required');
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: "admin",
      },
    },
  });

  if (error) {
    // Handle rate limiting and other errors
    let errorMessage = error.message;
    if (error.status === 429) {
      errorMessage = 'Too many signup attempts. Please wait a few minutes and try again.';
    }
    const params = new URLSearchParams({ error: errorMessage });
    redirect(`/signup?${params.toString()}`);
  }

  // On successful signup, redirect to a "check your email" or account page
  redirect('/check-email');
}

// Page component (React server component)
export default function SignupPage({ searchParams }) {
  const error = searchParams?.error;
  
  return (
    <div>
      <h1>Sign up</h1>
      {error && (
        <div style={{ color: 'red', padding: '10px', marginBottom: '10px', border: '1px solid red', borderRadius: '4px' }}>
          {error}
        </div>
      )}
      <form action={signupAction}>
        <div>
          <label htmlFor="full_name">Full Name</label>
          <input id="full_name" name="full_name" type="text" required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required minLength={6} />
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}