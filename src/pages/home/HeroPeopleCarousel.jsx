import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { heroImages } from "./Hero";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroPeopleCarousel() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-rose-600 mb-6 leading-tight tracking-wide">
            Real Women, Real Glamour
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
            Discover how our pieces transform everyday moments into extraordinary expressions of self-love and confidence
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-rose-500/40',
              bulletActiveClass: '!bg-rose-600'
            }}
            spaceBetween={40}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
            }}
            centeredSlides={true}
            className="px-6"
          >
            {heroImages.map((src, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden rounded-3xl bg-black/20 backdrop-blur-sm border border-rose-400/20 shadow-2xl hover:shadow-rose-500/30"
                >
                  <div className="aspect-[4/5] flex items-center justify-center p-6">
                    <img
                      src={src}
                      alt={`Real Glamour ${i + 1}`}
                      className="max-h-full max-w-full object-contain rounded-xl"
                    />
                  </div>
                  <div className="p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-rose-200 text-base italic font-light leading-relaxed">
                      "Every woman deserves to feel this beautiful"
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}