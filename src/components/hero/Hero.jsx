"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./Hero.module.css";
import { Link } from "react-router-dom";
import { heroSlides } from "./heroData";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className={styles.swiper}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={styles.slide}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={styles.overlay} />

              <div className={styles.content}>
                <span className={`${styles.brand} text-white drop-shadow-md`}>
                  Glamour by Vera
                </span>

                <h1 className="text-white drop-shadow-lg">{slide.title}</h1>
                <p className="text-white/90 drop-shadow-md">{slide.category}</p>

                <Link to="/shopping" className={`${styles.cta} text-white`}>
                  Shop Collection
                  <FiArrowRight className={styles.icon} />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
