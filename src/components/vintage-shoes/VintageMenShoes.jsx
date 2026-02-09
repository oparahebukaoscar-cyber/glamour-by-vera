"use client";

import styles from "./VintageMenShoes.module.css";

const shoesImages = [
  {
    id: 1,
    url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770237902/download_82_jiaxyi.jpg",
    alt: "Vintage Boot",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770239055/download_83_tl1q1e.jpg",
    alt: "Classic Loafers",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770239057/Hand_made_loafers_zmqpio.jpg",
    alt: "Handmade Loafers",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770237898/English_boots_esp2pf.jpg",
    alt: "English Heritage Boots",
  },
];

export default function VintageMenShoes() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Crafted for the Modern Gentleman</h2>
          <p className={styles.copy}>
            Heritage meets contemporary elegance in our curated collection of
            vintage-inspired footwear. Each pair tells a story of timeless
            craftsmanship and refined masculinity.
          </p>
        </div>

        <div className={styles.gallery}>
          {/* Large feature image */}
          <div className={`${styles.imageBlock} ${styles.blockLarge}`}>
            <img src={shoesImages[0].url} alt={shoesImages[0].alt} />
          </div>

          {/* Two vertical stacked images */}
          <div className={styles.blockStack}>
            <div className={`${styles.imageBlock} ${styles.blockMedium}`}>
              <img src={shoesImages[1].url} alt={shoesImages[1].alt} />
            </div>
            <div className={`${styles.imageBlock} ${styles.blockMedium}`}>
              <img src={shoesImages[2].url} alt={shoesImages[2].alt} />
            </div>
          </div>

          {/* Wide image spanning two columns */}
          <div className={`${styles.imageBlock} ${styles.blockWide}`}>
            <img src={shoesImages[3].url} alt={shoesImages[3].alt} />
          </div>

          {/* (No final tall image) */}
        </div>
      </div>
    </section>
  );
}
