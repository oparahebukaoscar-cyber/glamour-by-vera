"use client";

import { useEffect, useState } from "react";
import supabase from "../../../services/supabaseClient";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminHeader from "../../../components/AdminHeader";

export default function Dashboard() {
  const [admin, setAdmin] = useState(null);
 
  useEffect(() => {
    fetchAdmin();
  }, []);

  async function fetchAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setAdmin(data);
  }

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-6">
          <h2 className="text-2xl font-bold">
            Welcome {admin?.full_name} 👋
          </h2>
        </div>
      </div>
    </div>
  );
}
