import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import "swiper/css";
import "swiper/css/effect-fade";
import "./Hero.css";

const images = [
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770183922/Don_t_Miss_This_Season_s_Bag_Trends_fyuj2i.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770183917/Strathberry_Mosaic_Leather_Top_Handle_Bag_in_Oxblood_at_Nordstrom_l2xa38.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770183916/Strathberry_Mini_Mosaic_Leather_Top_Handle_Bag_in_Tan_-_Vanilla_Stitch_at_Nordstrom_q0qg6x.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770183911/Sua_moda_com_bolsas_odbgqn.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770183912/Caramel_Canvas_Book_Tote_Bag_33_g9f13h.jpg"
];

export default function Hero() {
  return (
    <section className="hero">
      {/* Background carousel */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5200, disableOnInteraction: false }}
        loop
        speed={1600}
        className="hero-swiper"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt="Luxury fashion collection" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Overlay icons */}
      <div className="hero-icons">
        <FiShoppingBag />
        <FiShoppingCart />
      </div>

      {/* Text content */}
      <div className="hero-text">
        <h1>
          Modern luxury <span>crafted</span> to move with you
        </h1>
        <p>
          Fashion-forward women’s handbags made from Italian leather,
          paired with refined men’s shoes designed for timeless elegance.
        </p>
      </div>
    </section>
  );
}
