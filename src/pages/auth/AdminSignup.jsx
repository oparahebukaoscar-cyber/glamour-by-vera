import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../services/supabaseClient";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const trimmedName = fullName.trim();
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: trimmedName || null,
            role: "admin",
          },
        },
      });

      if (authError) {
        if (authError.status === 429) {
          setError("Too many sign-up attempts. Please wait a minute and try again.");
        } else {
          setError(authError.message || "Unable to sign up");
        }
        return;
      }

      const userId = data?.user?.id;
      if (!userId) {
        setError("Sign up failed. Please try again.");
        return;
      }
      if (userId) {
        const baseProfile = {
          id: userId,
          full_name: trimmedName || null,
          updated_at: new Date().toISOString(),
        };

        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({ ...baseProfile, role: "admin" });

        if (profileError) {
          const message = profileError.message || "Profile creation failed";
          if (message.toLowerCase().includes("column") && message.toLowerCase().includes("role")) {
            const { error: fallbackError } = await supabase.from("profiles").upsert(baseProfile);
            if (fallbackError) {
              setError(fallbackError.message || "Profile creation failed");
              return;
            }
          } else {
            setError(message);
            return;
          }
        }
      }

      setSuccess("Admin account created. Please check your email to confirm, then log in.");
      setTimeout(() => navigate("/admin/login"), 1200);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-rose-400 min-h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl mb-6 text-rose-500 text-center">Admin Sign Up</h1>
        <form onSubmit={handleSubmit} className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-rose-500/20">
          {error && <div className="mb-4 text-sm text-red-400">{error}</div>}
          {success && <div className="mb-4 text-sm text-emerald-400">{success}</div>}
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mb-4 px-4 py-3 bg-black/20 border border-rose-500/20 rounded-full text-rose-400 placeholder-rose-400/50 focus:outline-none focus:border-rose-500"
            placeholder="Full Name"
            type="text"
          />
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
            minLength={6}
            required
          />
          <button
            type="submit"
            className="w-full rounded-full bg-rose-600 text-white px-8 py-3 hover:bg-rose-500 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </section>
  );
}
