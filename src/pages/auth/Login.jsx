export default function Login() {
  return (
    <section className="py-24 px-6 bg-rose-50 text-cocoa">
      <h1 className="text-3xl mb-6">Login</h1>
      <input className="input mb-4" placeholder="Email" />
      <input className="input mb-4" type="password" placeholder="Password" />
      <button className="rounded-full bg-rose-400 text-white px-8 py-3 hover:bg-rose-500 transition">
        Login
      </button>
    </section>
  );
}