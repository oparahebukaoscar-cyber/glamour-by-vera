import { motion } from "framer-motion";

export default function SectionTitle({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-14"
    >
      <h2 className="text-3xl md:text-4xl text-cocoa font-light">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-cocoa/70">{subtitle}</p>
      )}
    </motion.div>
  );
}