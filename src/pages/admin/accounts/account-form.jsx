'use client';
import React, { useEffect, useState } from 'react';
import supabase from '../../../services/supabaseClient';

export default function AccountForm({ user }) {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    async function getProfile() {
      try {
        setLoading(true);
        const { data, error, status } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();

        if (error && status !== 406) throw error;
        if (data) {
          setFullName(data.full_name);
        }
      } catch (err) {
        console.error('Profile load error:', err);
        alert(err?.message ? `Error loading profile: ${err.message}` : 'Error loading profile');
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [supabase, user?.id]);

  async function updateProfile(e) {
    e?.preventDefault();
    if (!user?.id) return;

    try {
      setLoading(true);
      const updates = {
        id: user.id,
        full_name: fullName,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      alert('Profile updated');
    } catch (err) {
      console.error('Profile update error:', err);
      alert(err?.message ? `Error updating profile: ${err.message}` : 'Error updating profile');
    } finally {
      setLoading(false);
    }
  }

  if (!user) return <div>Please log in</div>;

  return (
    <form onSubmit={updateProfile} className="account-form">
      <fieldset disabled={loading}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={user.email || ''} disabled />

        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          type="text"
          value={fullName || ''}
          onChange={(e) => setFullName(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Update profile'}
        </button>
      </fieldset>
    </form>
  );
}