import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroImageCarousel({ images }) {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{ delay: 4000 }}
      loop
      className="absolute inset-0"
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <img
            src={img}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-rose-200/10" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}