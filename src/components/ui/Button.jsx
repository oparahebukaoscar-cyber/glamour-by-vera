export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`rounded-full px-6 py-3 font-light transition
        bg-rose-400 text-white hover:bg-rose-500 ${className}`}
    >
      {children}
    </button>
  );
}