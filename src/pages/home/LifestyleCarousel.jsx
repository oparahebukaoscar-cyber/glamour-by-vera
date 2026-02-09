import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { heroImages } from "./Hero";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LifestyleCarousel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
    >
      <div className="container mx-auto px-6">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          centeredSlides={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-rose-500/40',
            bulletActiveClass: '!bg-rose-600'
          }}
          className="max-w-6xl mx-auto"
        >
          {heroImages.map((src, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-rose-500/20 bg-black/20 backdrop-blur-sm border border-rose-500/20 max-w-md"
              >
                <div className="aspect-[3/4] flex items-center justify-center p-4">
                  <img
                    src={src}
                    alt={`Lifestyle ${index + 1}`}
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev !text-rose-500 !w-12 !h-12 !bg-black/20 !backdrop-blur-sm !rounded-full !shadow-lg after:!text-sm"></div>
        <div className="swiper-button-next !text-rose-500 !w-12 !h-12 !bg-black/20 !backdrop-blur-sm !rounded-full !shadow-lg after:!text-sm"></div>
      </div>
    </motion.section>
  );
}