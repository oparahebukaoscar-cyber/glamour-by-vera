export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-white/80 backdrop-blur-sm border
      border-rose-200/30 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}