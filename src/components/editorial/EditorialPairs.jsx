"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import styles from "./EditorialPairs.module.css";
import ComparisonSlider from "./ComparisonSlider";

const imageUrls = [
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261298/Lady_In_Red_Tanya_Samorukova_wear_y7d69q.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261290/Top_five_colour_pop_bags_wg68bn.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261261/ritika_gallery___souravmishra_in___abhijeetmangual_retouching___thelastminuteproduction___venugopal__1998___dear_mee_22___spsuman_mua___sharonlustosa____aliyavenger_1_dray1u.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261293/download_88_asvyjp.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261309/instagram_-_maharani_portrait_zvgcwk.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261314/Be_My_Valentine_mrizjj.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261318/download_87_dovbx9.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261301/Biba_in_Red_%EF%B8%8F_evsq3f.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261308/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%B0%D1%8F_%D1%81%D1%83%D0%BC%D0%BA%D0%B0_%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%B0%D1%8F_%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B8%D1%82_%D0%B7%D0%B0_%D1%82%D0%B5%D0%B1%D1%8F_emgowu.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261374/Dark_Cherry_Book_Leather_Tote_Bag_25_Low_Stock_1_aslghg.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261376/Dark_Cherry_Book_Leather_Tote_Bag_25_Low_Stock_xornc4.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770261381/ritika_gallery___souravmishra_in___abhijeetmangual_retouching___thelastminuteproduction___venugopal__1998___dear_mee_22___spsuman_mua___sharonlustosa____aliyavenger_dvdwwp.jpg",
];

// Pair sequential images into cards: [ [1,2], [3,4], ... ]
const pairs = [];
for (let i = 0; i < imageUrls.length; i += 2) {
  const a = imageUrls[i];
  const b = imageUrls[i + 1];
  if (a && b) pairs.push([a, b]);
}

export default function EditorialPairs() {
  return (
    <section className={styles.section} aria-labelledby="editorial-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="editorial-heading" className={styles.title}>
            Editorial Luxury — The Art of Statement Pieces
          </h2>
          <p className={styles.subtitle}>
            A curated visual narrative of bold femininity, timeless leather,
            and modern glamour.
          </p>
        </header>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className={styles.outerSwiper}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
        >
          {pairs.map((pair, idx) => (
            <SwiperSlide key={idx} className={styles.cardSlide}>
              <article className={styles.card}>
                <div className={styles.innerSwiperWrap}>
                  <div className={styles.comparisonWrap}>
                    <ComparisonSlider left={pair[0]} right={pair[1]} alt={`pair-${idx}`} />
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
