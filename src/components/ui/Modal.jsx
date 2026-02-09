import { motion } from "framer-motion";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-neutral-900 rounded-2xl p-6 max-w-md w-full"
      >
        {children}
        <button
          onClick={onClose}
          className="mt-6 text-rose-300 text-sm"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}