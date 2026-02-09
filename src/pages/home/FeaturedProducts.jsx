import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useCartStore } from "../../store/cartStore";

import "swiper/css";
import "swiper/css/pagination";

const bagProducts = [
  {
    id: 1,
    name: "Luxury Clutch",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769979787/download_27_vcxugf.jpg",
    price: 299,
  },
  {
    id: 2,
    name: "Designer Tote",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769979787/Mulberry___Mini_Zipped_Bayswater___Oak_Small_n6je4j.jpg",
    price: 450,
  },
  {
    id: 3,
    name: "Patent Bag",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769979783/Mulberry___Bayswater___Deep_Aubergine_Patent_hmsq00.jpg",
    price: 380,
  },
  {
    id: 7,
    name: "Designer Satchel",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769984433/download_36_kvpg2l.jpg",
    price: 350,
  },
];

export default function FeaturedProducts() {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24"
      style={{ backgroundColor: "#F5EFE0" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "Playfair Display", color: "#3E2C23" }}
          >
            Curated for You
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#3E2C23" }}
          >
            Discover pieces chosen for their elegance, craftsmanship, and
            timeless appeal.
          </p>
        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            1024: { slidesPerView: 2.2 },
            1280: { slidesPerView: 3 },
          }}
        >
          {bagProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl overflow-hidden shadow-md"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(62,44,35,0.2)",
                }}
              >
                {/* Image container with safe aspect ratio */}
                <div
                  className="flex items-center justify-center p-6"
                  style={{ height: "360px" }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3
                    className="text-lg mb-2"
                    style={{ color: "#3E2C23", fontWeight: 500 }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-xl font-semibold mb-4"
                    style={{ color: "#3E2C23" }}
                  >
                    ₦{product.price}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-2 rounded-xl font-medium"
                    style={{
                      backgroundColor: "#3E2C23",
                      color: "#F5EFE0",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
}
