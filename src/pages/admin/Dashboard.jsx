import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../services/supabaseClient';
import AccountForm from './accounts/account-form';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (mounted) setUser(data?.user ?? null);
      } catch (err) {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div>
        <p>Please log in</p>
        <Link to="/admin/login">Go to admin login</Link>
      </div>
    );
  }

  return <AccountForm user={user} />;
}