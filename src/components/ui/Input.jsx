export default function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-xl bg-white/10 border border-white/20 
        px-4 py-3 text-white placeholder:text-neutral-400 focus:outline-none"
    />
  );
}