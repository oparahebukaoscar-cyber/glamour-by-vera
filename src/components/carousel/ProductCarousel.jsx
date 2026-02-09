import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function ProductCarousel({ images }) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 2500 }}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{ 768: { slidesPerView: 3 } }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <img
            src={img}
            className="h-80 w-full object-cover rounded-xl bg-white/50 backdrop-blur-sm"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}