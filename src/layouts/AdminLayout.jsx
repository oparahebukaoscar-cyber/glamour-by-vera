import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import supabase from '../services/supabaseClient';

const AdminLayout = () => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (mounted) {
          if (!session) {
            navigate('/admin/login');
          } else {
            setChecking(false);
          }
        }
      } catch (err) {
        if (mounted) navigate('/admin/login');
      }
    };
    check();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (checking) return null;

  return (
    <div className="admin-layout">
      <Outlet />
    </div>
  );
};

export default AdminLayout;