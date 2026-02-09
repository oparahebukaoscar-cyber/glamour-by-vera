import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../services/supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError(authError.message || "Unable to sign in");
        return;
      }

      const user = data?.user;
      // check user role in user_metadata first
      const roleFromMeta = user?.user_metadata?.role;
      let role = roleFromMeta;

      // if no role in metadata, try profiles table (common pattern)
      if (!role && user?.id) {
        try {
          const { data: profileData, error: profileErr } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          if (!profileErr && profileData) role = profileData.role;
        } catch (e) {
          // ignore profile lookup errors - we'll fallback to blocking access
        }
      }

      if (role !== 'admin') {
        // not an admin — sign out and show error
        await supabase.auth.signOut();
        setError('You are not authorized to access the admin dashboard.');
        return;
      }

      // successful admin login -> route to admin dashboard
      navigate('/admin');
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-rose-400 min-h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl mb-6 text-rose-500 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-rose-500/20">
          {error && <div className="mb-4 text-sm text-red-400">{error}</div>}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 bg-black/20 border border-rose-500/20 rounded-full text-rose-400 placeholder-rose-400/50 focus:outline-none focus:border-rose-500"
            placeholder="Admin Email"
            type="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-3 bg-black/20 border border-rose-500/20 rounded-full text-rose-400 placeholder-rose-400/50 focus:outline-none focus:border-rose-500"
            type="password"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full rounded-full bg-rose-600 text-white px-8 py-3 hover:bg-rose-500 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}