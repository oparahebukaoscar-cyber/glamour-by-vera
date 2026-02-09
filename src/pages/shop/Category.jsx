import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../../store/cartStore";

const mockProducts = [
  {
    id: 1,
    name: "Luxury Clutch",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769979787/download_27_vcxugf.jpg",
    category: "bags",
    price: 299,
  },
  {
    id: 2,
    name: "Designer Tote",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769979787/Mulberry___Mini_Zipped_Bayswater___Oak_Small_n6je4j.jpg",
    category: "bags",
    price: 450,
  },
  {
    id: 3,
    name: "Patent Bag",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769979783/Mulberry___Bayswater___Deep_Aubergine_Patent_hmsq00.jpg",
    category: "bags",
    price: 380,
  },
  {
    id: 4,
    name: "Curly Ponytail Wig",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769979781/Explore_35_curly_braided_ponytail_hairstyles_for_dlbged.jpg",
    category: "wigs",
    price: 199,
  },
  {
    id: 5,
    name: "Designer Heels",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769979773/download_30_laeala.jpg",
    category: "shoes",
    price: 180,
  },
  {
    id: 6,
    name: "Layered Wig",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769979769/download_32_t8c4et.jpg",
    category: "wigs",
    price: 249,
  },
  {
    id: 7,
    name: "Designer Satchel",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769984433/download_36_kvpg2l.jpg",
    category: "bags",
    price: 350,
  },
  {
    id: 8,
    name: "Virgin Hair Wig",
    image:
      "https://res.cloudinary.com/daekf2xyt/image/upload/v1769984433/Hair_Type_100_Virgin_Human_Hair_Bleached_Knots_afuexa.jpg",
    category: "wigs",
    price: 280,
  },
];

export default function Category() {
  const { category } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const filteredProducts = mockProducts.filter(
    (product) => product.category === category
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-24 px-6 min-h-screen"
      style={{ backgroundColor: "#F5EFE0" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl mb-12 capitalize text-center"
          style={{
            fontFamily: "Playfair Display",
            color: "#3E2C23",
          }}
        >
          {category}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8"
        >
          {filteredProducts.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-xl overflow-hidden shadow-md"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(62,44,35,0.2)",
              }}
            >
              <Link to={`/shop/${category}/${p.id}`} className="block">
                <div
                  className="flex items-center justify-center p-4"
                  style={{ height: "260px" }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </Link>

              <div className="p-6 text-center">
                <h3
                  className="text-lg mb-2"
                  style={{ color: "#3E2C23", fontWeight: 500 }}
                >
                  {p.name}
                </h3>
                <p
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#3E2C23" }}
                >
                  ₦{p.price}
                </p>

                <button
                  onClick={() => addToCart(p)}
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
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
