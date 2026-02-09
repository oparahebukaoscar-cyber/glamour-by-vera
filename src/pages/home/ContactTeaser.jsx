import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ContactTeaser() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto text-center px-6"
      >
        <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 shadow-md border border-rose-400/20">
          <h4 className="text-4xl md:text-5xl font-serif font-bold text-rose-600 mb-6 leading-tight tracking-wide">
            Ready to Glow?
          </h4>

          <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto font-light">
            Whether you're seeking that perfect piece to complete your look or a transformative
            beauty experience, we're here to guide you on your journey to radiance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-6 py-3 bg-rose-600 text-white rounded-full font-medium text-base shadow-md hover:bg-rose-700 transition-colors duration-300"
            >
              Book Your Glow-Up
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 bg-black/20 backdrop-blur-sm text-rose-500 rounded-full font-medium text-base border border-rose-500/20 shadow-sm hover:bg-black/30 transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}