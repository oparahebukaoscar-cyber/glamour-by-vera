import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
      >
        <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 shadow-md border border-rose-400/20">
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-rose-600 mb-6 leading-tight tracking-wide">
            Our Story
          </h3>

          <div className="space-y-6 text-lg leading-relaxed text-gray-200 font-light">
            <p className="text-xl italic text-gray-200 font-light">
              "Beauty isn't just about looking good — it's about feeling alive, confident, and utterly yourself."
            </p>

            <p>
              Glamour by Vera began with a simple belief: every woman deserves to feel extraordinary.
              What started as a passion for elegant design has blossomed into a sanctuary where
              luxury meets authenticity, where every piece tells a story of empowerment and grace.
            </p>

            <p>
              We curate collections that speak to the soul, services that nurture the spirit,
              and experiences that celebrate the beautiful complexity of womanhood. Here, glamour
              isn't just an aesthetic — it's a way of life, a daily affirmation of your inherent worth.
            </p>

            <p className="text-rose-500 font-medium">
              Welcome to your journey of self-love and elegance.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}